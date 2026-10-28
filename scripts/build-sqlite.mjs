// Rebuilds <slug>.sqlite from <slug>.json (table + indexes from SCHEMA.md) and
// refreshes the `stats` block in metadata.json.
//
//   node scripts/build-sqlite.mjs            # every version
//   node scripts/build-sqlite.mjs kjv vdc    # only these slugs
import { DatabaseSync } from 'node:sqlite';
import { rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { listVersions, readJson, flattenVerses, SQLITE_DDL } from './lib.mjs';

const only = new Set(process.argv.slice(2));
const versions = listVersions().filter((v) => only.size === 0 || only.has(v.slug));
if (only.size > 0 && versions.length !== only.size) {
  const found = new Set(versions.map((v) => v.slug));
  console.error(`Unknown slug(s): ${[...only].filter((s) => !found.has(s)).join(', ')}`);
  process.exit(1);
}

for (const { slug, dir } of versions) {
  const bible = readJson(join(dir, `${slug}.json`));
  const rows = flattenVerses(bible);

  const dbPath = join(dir, `${slug}.sqlite`);
  rmSync(dbPath, { force: true });
  const db = new DatabaseSync(dbPath);
  db.exec(SQLITE_DDL);
  const insert = db.prepare('INSERT INTO verses (book_id, chapter, number, text) VALUES (?, ?, ?, ?)');
  db.exec('BEGIN');
  for (const r of rows) insert.run(r.bookId, r.chapter, r.number, r.text);
  db.exec('COMMIT');
  db.exec('VACUUM');
  db.close();

  const metaPath = join(dir, 'metadata.json');
  const meta = readJson(metaPath);
  meta.stats = {
    books: bible.books.length,
    chapters: bible.books.reduce((n, b) => n + b.chapters.length, 0),
    verses: rows.length,
  };
  writeFileSync(metaPath, JSON.stringify(meta, null, 2) + '\n');

  console.log(`${slug}: ${rows.length} verses`);
}
