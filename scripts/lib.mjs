// Shared helpers for the export and check scripts. No dependencies: Node >= 22.13.
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const VERSIONS_DIR = join(ROOT, 'versions');

/** Every version on disk: [{ lang, slug, dir }], sorted by lang then slug. */
export function listVersions() {
  const out = [];
  for (const lang of readdirSync(VERSIONS_DIR).sort()) {
    const langDir = join(VERSIONS_DIR, lang);
    for (const slug of readdirSync(langDir).sort()) {
      const dir = join(langDir, slug);
      if (existsSync(join(dir, 'metadata.json'))) out.push({ lang, slug, dir });
    }
  }
  return out;
}

export function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

/** Verses of a whole-Bible JSON as flat rows, in canonical order. */
export function flattenVerses(bible) {
  const rows = [];
  for (const book of bible.books) {
    for (const chapter of book.chapters) {
      for (const verse of chapter.verses) {
        rows.push({ bookId: book.bookId, chapter: chapter.chapter, number: verse.number, text: verse.text });
      }
    }
  }
  return rows;
}

// The SQLite contract documented in SCHEMA.md. Keep both in sync.
export const SQLITE_DDL = `
CREATE TABLE verses (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  book_id  INTEGER NOT NULL,
  chapter  INTEGER NOT NULL,
  number   INTEGER NOT NULL,
  text     TEXT    NOT NULL
);

CREATE UNIQUE INDEX idx_unique_verse ON verses (book_id, chapter, number);
CREATE        INDEX idx_chapter      ON verses (book_id, chapter);
`;

export const SQLITE_INDEXES = ['idx_unique_verse', 'idx_chapter'];
