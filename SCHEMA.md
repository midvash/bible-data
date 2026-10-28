# Schema

This document specifies the data format for every version in this repository. The same shape applies across all 32 versions.

## Directory layout

```
versions/
└── <lang>/                 ISO 639-1 language code (en, pt, es, de, fr, …)
    └── <slug>/             version slug — short, lowercase, dash-separated
        ├── metadata.json
        ├── <slug>.json     whole Bible
        ├── <slug>.sqlite   SQLite database
        └── books/
            ├── Gen.json
            ├── Exod.json
            └── …           one per book, OSIS-coded filename
```

## Book identifiers

Books use **[OSIS](https://wiki.crosswire.org/OSIS_Book_Abbreviations) codes**, the de facto standard for biblical reference markup.

| OSIS | English          | book_id |
|------|------------------|---------|
| Gen  | Genesis          | 1       |
| Exod | Exodus           | 2       |
| Lev  | Leviticus        | 3       |
| …    | …                | …       |
| Matt | Matthew          | 40      |
| …    | …                | …       |
| Rev  | Revelation       | 66      |

The numeric `book_id` (1–66) is also exposed for convenience.

## `metadata.json`

```json
{
  "slug": "kjv",
  "shortName": "KJV",
  "name": "King James Version",
  "language": "en",
  "year": 1769,
  "license": "public-domain",
  "licenseNote": "Public domain worldwide (1611, Oxford 1769 standard text).",
  "attribution": null,
  "sourceUrl": null,
  "sourceVerified": false,
  "stats": { "books": 66, "chapters": 1189, "verses": 31102 },
  "readerUrl": "https://midvash.com/kjv",
  "schema": "https://github.com/midvash/bible-data/blob/main/SCHEMA.md"
}
```

| Field | Meaning |
|-------|---------|
| `license` | One of the `LicenseTag` values below. |
| `attribution` | Credit line to reproduce with the text. Required (non-null) for `cc-by` and `cc-by-sa`. |
| `sourceUrl` | Page of the file the text was imported from, or `null` when it was not recorded. |
| `sourceVerified` | `true` when the source and its license were checked. `false` means the public-domain claim is still open (see SOURCES.md). |
| `stats` | Counts of books, chapters and verses actually present in the files. |
| `missingChapters` | Optional. `{ "<OSIS>": [chapter, …] }` for chapters the source text does not have. Those chapters are absent from every file (not renumbered), so `chapters[i]` is not always chapter `i + 1`: look chapters up by their `chapter` field. |

## `<slug>.json` (whole Bible)

```ts
interface BibleFile {
  version: string;        // slug, e.g. "kjv"
  name: string;           // full name
  language: string;       // ISO 639-1
  license: LicenseTag;
  books: Book[];
}

interface Book {
  book: string;           // OSIS code, e.g. "John"
  bookId: number;         // 1–66
  englishName: string;    // "John"
  testament: 'OT' | 'NT';
  chapters: Chapter[];
}

interface Chapter {
  chapter: number;        // 1-indexed
  verses: Verse[];
}

interface Verse {
  number: number;         // 1-indexed
  text: string;
}

type LicenseTag =
  | 'public-domain'
  | 'cc0'
  | 'cc-by'
  | 'cc-by-sa'
  | 'wlc-license';
```

## `books/<OSIS>.json`

Same shape as `Book` above, plus the `version` slug at the top level:

```ts
interface BookFile {
  version: string;
  book: string;           // OSIS
  bookId: number;
  englishName: string;
  testament: 'OT' | 'NT';
  chapters: Chapter[];
}
```

## `<slug>.sqlite`

A SQLite 3 database with a single table and two indexes (built by `scripts/build-sqlite.mjs`, checked by `scripts/check.mjs`):

```sql
CREATE TABLE verses (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  book_id  INTEGER NOT NULL,
  chapter  INTEGER NOT NULL,
  number   INTEGER NOT NULL,
  text     TEXT    NOT NULL
);

CREATE UNIQUE INDEX idx_unique_verse ON verses (book_id, chapter, number);
CREATE        INDEX idx_chapter      ON verses (book_id, chapter);
```

`book_id` matches the 1–66 numbering documented above.

## OT-only and NT-only versions

Original-language texts cover only part of the canon. The shape is identical; the `books` array simply contains fewer entries.

- **WLC, Aleppo Codex**: `book_id` 1–39 (Old Testament only)
- **Textus Receptus**: `book_id` 40–66 (New Testament only)

## Notes

- Look chapters up by their `chapter` field, not by array position: a version with `missingChapters` skips the number (e.g. `vdc` John goes 10, 12, 13…).

- Verse text is stored as-is from the source, including original punctuation and casing. No editorial normalization is applied beyond Unicode NFC.
- Chapter and verse numbers follow the Protestant/Masoretic numbering. Versification differences across traditions (LXX/Vulgate Psalm numbering, etc.) are **not** normalized — each version uses its own conventional numbering.
- Some early translations (Geneva 1599, Diodati 1649, etc.) use archaic spelling preserved verbatim.
