# bible-data

Open, machine-readable Bible texts in the **public domain** — 33 versions across 22 languages, with a consistent schema.

Each version is shipped in three formats:

- **`<slug>.json`** — the whole Bible in a single JSON file
- **`books/<OSIS>.json`** — one JSON per book, light and easy to stream
- **`<slug>.sqlite`** — SQLite database, indexed for fast queries

Plus a `metadata.json` per version with license, year, source, and stats.

> **Read these versions online:** [midvash.com](https://midvash.com) — a free, ad-supported Bible reader in 9 languages, with search, daily readings, commentary, and AI study tools. This repository powers the underlying data.

---

## Quick start

### JavaScript / TypeScript

```ts
// Fetch one book
const res = await fetch(
  'https://raw.githubusercontent.com/midvash/bible-data/main/versions/en/kjv/books/John.json'
);
const john = await res.json();
console.log(john.chapters[2].verses[15].text); // John 3:16
```

### Python

```python
import json, urllib.request

url = 'https://raw.githubusercontent.com/midvash/bible-data/main/versions/en/kjv/kjv.json'
bible = json.loads(urllib.request.urlopen(url).read())
john3 = next(b for b in bible['books'] if b['book'] == 'John').chapters[2]
print(john3['verses'][15]['text'])
```

### SQLite (CLI)

```bash
curl -L -o kjv.sqlite \
  https://github.com/midvash/bible-data/raw/main/versions/en/kjv/kjv.sqlite

sqlite3 kjv.sqlite "SELECT text FROM verses WHERE book_id=43 AND chapter=3 AND number=16"
```

---

## Available versions

| Lang | Slug | Name | Year | License | Reader |
|------|------|------|------|---------|--------|
| ar | `svd` | الكتاب المقدس فان دايك (Smith-Van Dyck) | 1865 | public-domain | [open](https://midvash.com/svd) |
| cs | `bkr` | Bible kralická | 1613 | public-domain | [open](https://midvash.com/bkr) |
| da | `dansk1931` | Dansk Bibel 1931 | 1931 | public-domain | [open](https://midvash.com/dansk1931) |
| de | `elb1905` | Elberfelder Bibel 1905 | 1905 | public-domain | [open](https://midvash.com/elb1905) |
| de | `luth1912` | Lutherbibel 1912 | 1912 | public-domain | [open](https://midvash.com/luth1912) |
| en | `asv` | American Standard Version | 1901 | public-domain | [open](https://midvash.com/asv) |
| en | `dra` | Douay-Rheims American Edition | 1899 | public-domain | [open](https://midvash.com/dra) |
| en | `geneva1599` | Geneva Bible 1599 | 1599 | public-domain | [open](https://midvash.com/geneva1599) |
| en | `kjv` | King James Version | 1769 | public-domain | [open](https://midvash.com/kjv) |
| en | `web` | World English Bible | 2000 | public-domain | [open](https://midvash.com/web) |
| eo | `lsb` | La Sankta Biblio | 1926 | public-domain | [open](https://midvash.com/lsb) |
| fr | `darby-fr` | Bible Darby Française | 1885 | public-domain | [open](https://midvash.com/darby-fr) |
| fr | `lsg` | Louis Segond 1910 | 1910 | public-domain | [open](https://midvash.com/lsg) |
| fr | `martin1744` | Bible David Martin 1744 | 1744 | public-domain | [open](https://midvash.com/martin1744) |
| gr | `tr` | Textus Receptus (Stephanus 1550) | 1550 | public-domain | [open](https://midvash.com/tr) |
| he | `aleppo` | Aleppo Codex | 1000 | public-domain | [open](https://midvash.com/aleppo) |
| he | `wlc` | Westminster Leningrad Codex | 2008 | wlc-license | [open](https://midvash.com/wlc) |
| hu | `kar` | Károli Biblia | 1908 | public-domain | [open](https://midvash.com/kar) |
| it | `diodati` | Bibbia Diodati 1649 | 1649 | public-domain | [open](https://midvash.com/diodati) |
| it | `riveduta` | Bibbia Riveduta 1927 | 1927 | public-domain | [open](https://midvash.com/riveduta) |
| la | `clem` | Clementine Vulgate | 1592 | public-domain | [open](https://midvash.com/clem) |
| la | `vulg` | Biblia Sacra Vulgata | 405 | public-domain | [open](https://midvash.com/vulg) |
| nb | `nb1930` | Norsk Bibel 1930 | 1930 | public-domain | [open](https://midvash.com/nb1930) |
| nl | `dutch1917` | De Heilige Schrift 1917 | 1917 | public-domain | [open](https://midvash.com/dutch1917) |
| pl | `bg` | Biblia Gdańska | 1632 | public-domain | [open](https://midvash.com/bg) |
| pt | `almeida-livre` | Almeida 1819 (Bíblia Livre) | 1819 | public-domain | [open](https://midvash.com/almeida-livre) |
| ro | `vdc` | Biblia Cornilescu | 1924 | public-domain | [open](https://midvash.com/vdc) |
| ru | `synodal` | Синодальный перевод | 1876 | public-domain | [open](https://midvash.com/synodal) |
| sv | `sv1917` | Bibeln 1917 | 1917 | public-domain | [open](https://midvash.com/sv1917) |
| uk | `kp` | Куліш-Пулюй (1905) | 1905 | public-domain | [open](https://midvash.com/kp) |
| vi | `vi1934` | Kinh Thánh 1934 | 1934 | public-domain | [open](https://midvash.com/vi1934) |
| zh | `cuv` | 和合本 (Chinese Union Version, Traditional) | 1919 | public-domain | [open](https://midvash.com/cuv) |
| zh | `cuvs` | 和合本 (Chinese Union Version, Simplified) | 1919 | public-domain | [open](https://midvash.com/cuvs) |

> The `reader` column links to that version's online interface at midvash.com.

For full licensing details and provenance per version, see [SOURCES.md](./SOURCES.md).

---

## Schema

The data follows a single consistent schema across every version. Book identifiers use [OSIS](https://wiki.crosswire.org/OSIS_Book_Abbreviations) codes.

See [SCHEMA.md](./SCHEMA.md) for the full spec, including TypeScript types and SQLite DDL.

---

## What's included

- 66-book Protestant canon (Old + New Testament) for translations.
- Original-language texts:
  - **Hebrew**: Westminster Leningrad Codex (WLC), Aleppo Codex
  - **Greek**: Textus Receptus (Stephanus 1550 / Scrivener 1894)
  - **Latin**: Vulgate, Clementine Vulgate

## What's NOT included (and why)

Modern translations with active copyright (NIV, ESV, NLT, NVI, NAA, ARA, RVR1960, Schlachter 2000, etc.) are **not** included. This repository ships only texts in the public domain or with an explicit free-redistribution license.

If you need a modern licensed translation, use the publisher's API or read it at [midvash.com](https://midvash.com).

---

## Contributing

Spotted a transcription error, missing verse, or a new public-domain translation that should be added? See [CONTRIBUTING.md](./CONTRIBUTING.md).

To report content issues with the online reader, use the [Midvash feedback form](https://midvash.com/feedback).

---

## License

- **Code** (this repository's scripts and metadata): MIT — see [LICENSE](./LICENSE).
- **Bible text data**: each version's individual license, declared in its `metadata.json` and detailed in [SOURCES.md](./SOURCES.md). All included texts are public domain or under a free-redistribution license.

---

## Related projects

- **[Midvash](https://midvash.com)** — online Bible reader and study platform powered by this dataset, in 9 languages.

---

*Data generated on 2026-05-12. This repository is regenerated periodically.*
