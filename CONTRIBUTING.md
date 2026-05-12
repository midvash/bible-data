# Contributing

This repository is **automatically generated** from the source data that powers [Midvash](https://midvash.com). Direct PRs that hand-edit JSON or SQLite files will be closed — those changes get overwritten on the next regeneration.

## Useful contributions

### 1. Report a transcription error

If a verse looks wrong (typo, missing word, wrong number), open an issue with:

- Version slug (e.g. `kjv`, `lsg`)
- Reference (e.g. `John 3:16`)
- Current text in this repo
- What it should say, with a citation if possible

You can also fix it directly in the online reader feedback form at https://midvash.com/feedback — that fix propagates back here on the next regeneration.

### 2. Suggest a new public-domain version

We'd love to add more. Open an issue with:

- Translation name and year
- Language
- Evidence of public-domain status (or a free-redistribution license)
- A pointer to a clean source text we can ingest

We're especially looking for high-quality public-domain texts in **Spanish, Japanese, Korean, Indonesian, Swahili, Turkish, Persian, Hindi, Tamil**, and other underrepresented languages.

### 3. Improve the tooling

The export pipeline lives in the Midvash codebase (private). The schema, OSIS mapping, and metadata structure documented in [SCHEMA.md](./SCHEMA.md) are the public contract — PRs proposing schema additions (extra metadata fields, new export formats, alternative book identifiers) are welcome as issues.

### 4. Build something with it

If you build a tool, library, app, or research project using this data, tell us! Open an issue tagged `showcase` and we'll add a link.

## Code of conduct

Be kind. Disagree about translations, traditions, and textual variants in good faith.

## Questions about Midvash

For anything about the online reader (account, feedback, API, partnerships), see https://midvash.com or email **contact@midvash.com**.
