// Consistency checks for the whole dataset. Exits 1 on any failure.
//
//   node scripts/check.mjs
//
// 1. Chapter count of every book matches the KJV, except the differences
//    listed in KNOWN_DIFFERENCES (versification) and `missingChapters` declared
//    in metadata.json (gaps in the source text).
// 2. Chapter numbers are 1..n with no holes besides the declared ones.
// 3. books/<OSIS>.json is identical to the matching book in <slug>.json.
// 4. <slug>.sqlite has the indexes from SCHEMA.md and the same rows as the JSON.
// 5. metadata.json stats and license fields are coherent.
// 6. The READMEs and SOURCES.md list exactly the versions on disk, and the
//    headline counts match.
import { DatabaseSync } from 'node:sqlite';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, listVersions, readJson, flattenVerses, SQLITE_INDEXES } from './lib.mjs';

// Versification that legitimately differs from the KJV: slug -> { OSIS: chapters }.
const KNOWN_DIFFERENCES = {
  dra: { Esth: 16, Dan: 14 }, // Greek additions to Esther and Daniel
  clem: { Esth: 16, Dan: 14 },
  wlc: { Joel: 4, Mal: 3 }, // Hebrew chapter division
  'darby-fr': { Joel: 4, Mal: 3 },
};

// Partial canons: slug -> allowed bookId range.
const PARTIAL_CANON = {
  aleppo: [1, 39],
  wlc: [1, 39],
  tr: [40, 66],
};

const LICENSE_TAGS = new Set(['public-domain', 'cc0', 'cc-by', 'cc-by-sa', 'wlc-license']);

const errors = [];
const fail = (msg) => errors.push(msg);

const kjv = readJson(join(ROOT, 'versions/en/kjv/kjv.json'));
const kjvChapters = new Map(kjv.books.map((b) => [b.bookId, b.chapters.length]));

const versions = listVersions();

for (const { slug, dir } of versions) {
  const bible = readJson(join(dir, `${slug}.json`));
  const meta = readJson(join(dir, 'metadata.json'));
  const known = KNOWN_DIFFERENCES[slug] ?? {};
  const missing = meta.missingChapters ?? {};

  // 1 + 2. Chapters against the KJV.
  const [minBook, maxBook] = PARTIAL_CANON[slug] ?? [1, 66];
  const bookIds = bible.books.map((b) => b.bookId);
  const expectedIds = [];
  for (let id = minBook; id <= maxBook; id++) expectedIds.push(id);
  if (bookIds.join() !== expectedIds.join()) {
    fail(`${slug}: books are ${bookIds.length}, expected ids ${minBook}-${maxBook} in order`);
  }

  for (const book of bible.books) {
    const expected = known[book.book] ?? kjvChapters.get(book.bookId);
    const gaps = missing[book.book] ?? [];
    const want = [];
    for (let c = 1; c <= expected; c++) if (!gaps.includes(c)) want.push(c);
    const have = book.chapters.map((c) => c.chapter);
    if (have.join() !== want.join()) {
      const absent = want.filter((c) => !have.includes(c));
      const extra = have.filter((c) => !want.includes(c));
      fail(
        `${slug} ${book.book}: ${have.length} chapters, expected ${want.length}` +
          (absent.length ? `; missing ${absent.join(',')}` : '') +
          (extra.length ? `; unexpected ${extra.join(',')}` : ''),
      );
    }
  }
  for (const osis of Object.keys(missing)) {
    if (!bible.books.some((b) => b.book === osis)) fail(`${slug}: missingChapters names unknown book ${osis}`);
  }

  // 3. Per-book files.
  const bookFiles = readdirSync(join(dir, 'books')).filter((f) => f.endsWith('.json')).sort();
  const expectedFiles = bible.books.map((b) => `${b.book}.json`).sort();
  if (bookFiles.join() !== expectedFiles.join()) fail(`${slug}: books/ does not match ${slug}.json`);
  for (const book of bible.books) {
    let file;
    try {
      file = readJson(join(dir, 'books', `${book.book}.json`));
    } catch {
      continue; // already reported above
    }
    if (JSON.stringify(file.chapters) !== JSON.stringify(book.chapters)) {
      fail(`${slug}: books/${book.book}.json differs from ${slug}.json`);
    }
  }

  // 4. SQLite.
  const rows = flattenVerses(bible);
  const db = new DatabaseSync(join(dir, `${slug}.sqlite`), { readOnly: true });
  const indexes = new Set(
    db.prepare("SELECT name FROM sqlite_master WHERE type = 'index' AND tbl_name = 'verses'").all().map((r) => r.name),
  );
  for (const name of SQLITE_INDEXES) if (!indexes.has(name)) fail(`${slug}.sqlite: missing index ${name}`);
  const dbRows = db.prepare('SELECT book_id, chapter, number, text FROM verses ORDER BY id').all();
  db.close();
  if (dbRows.length !== rows.length) {
    fail(`${slug}.sqlite: ${dbRows.length} rows, JSON has ${rows.length}`);
  } else {
    const firstDiff = rows.findIndex(
      (r, i) =>
        r.bookId !== dbRows[i].book_id ||
        r.chapter !== dbRows[i].chapter ||
        r.number !== dbRows[i].number ||
        r.text !== dbRows[i].text,
    );
    if (firstDiff !== -1) fail(`${slug}.sqlite: row ${firstDiff + 1} differs from JSON`);
  }

  // 5. Metadata.
  const chapters = bible.books.reduce((n, b) => n + b.chapters.length, 0);
  const s = meta.stats ?? {};
  if (s.books !== bible.books.length || s.chapters !== chapters || s.verses !== rows.length) {
    fail(`${slug}: metadata stats ${JSON.stringify(s)} != {books:${bible.books.length},chapters:${chapters},verses:${rows.length}}`);
  }
  if (meta.slug !== slug || bible.version !== slug) fail(`${slug}: slug mismatch in metadata/JSON`);
  if (!LICENSE_TAGS.has(meta.license)) fail(`${slug}: unknown license tag ${meta.license}`);
  if (meta.license !== bible.license) fail(`${slug}: license differs between metadata (${meta.license}) and JSON (${bible.license})`);
  if (meta.license.startsWith('cc-by') && !meta.attribution) fail(`${slug}: ${meta.license} requires attribution`);
  if (typeof meta.sourceVerified !== 'boolean') fail(`${slug}: metadata.sourceVerified must be true or false`);
  if (meta.sourceVerified && !meta.sourceUrl) fail(`${slug}: sourceVerified without sourceUrl`);
}

// 6. Docs list exactly what is on disk.
const slugs = versions.map((v) => v.slug).sort();
const languages = new Set(versions.map((v) => v.lang)).size;
for (const doc of ['README.md', 'README.pt-BR.md', 'README.es.md', 'SOURCES.md']) {
  const text = readFileSync(join(ROOT, doc), 'utf8');
  const listed = [...text.matchAll(/^\| [a-z]{2} \| `([^`]+)` \|/gm)].map((m) => m[1]).sort();
  if (listed.join() !== slugs.join()) {
    const extra = listed.filter((s) => !slugs.includes(s));
    const absent = slugs.filter((s) => !listed.includes(s));
    fail(`${doc}: version table out of sync (extra: ${extra.join(',') || '-'}; missing: ${absent.join(',') || '-'})`);
  }
}
for (const doc of ['README.md', 'README.pt-BR.md', 'README.es.md', 'SCHEMA.md']) {
  const text = readFileSync(join(ROOT, doc), 'utf8');
  for (const m of text.matchAll(/\b(\d+) (versions|versões|versiones)\b/g)) {
    if (Number(m[1]) !== versions.length) fail(`${doc}: says "${m[0]}", there are ${versions.length}`);
  }
  // Only the dataset headline ("32 versions across 21 languages"); "9 languages" elsewhere is the reader.
  for (const m of text.matchAll(/\b(?:versions|versões|versiones) (?:across|em|en) (\d+) (?:languages|idiomas)\b/g)) {
    if (Number(m[1]) !== languages) fail(`${doc}: says "${m[0]}", there are ${languages}`);
  }
}

if (errors.length) {
  console.error(`✗ ${errors.length} problem(s):\n` + errors.map((e) => `  - ${e}`).join('\n'));
  process.exit(1);
}
console.log(`✓ ${versions.length} versions, ${languages} languages: all checks passed`);
