# bible-data

> 🌐 [English](./README.md) · **Português (BR)** · [Español](./README.es.md)

Textos bíblicos abertos e legíveis por máquina em **domínio público** — 33 versões em 22 idiomas, com um schema consistente.

Cada versão é distribuída em três formatos:

- **`<slug>.json`** — a Bíblia inteira num único arquivo JSON
- **`books/<OSIS>.json`** — um JSON por livro, leve e fácil de transmitir
- **`<slug>.sqlite`** — banco de dados SQLite, indexado para consultas rápidas

Mais um `metadata.json` por versão com licença, ano, fonte e estatísticas.

> **Leia estas versões online:** [midvash.com](https://midvash.com) — um leitor bíblico gratuito e mantido por anúncios em 9 idiomas, com busca, leituras diárias, comentários e ferramentas de estudo com IA. Este repositório alimenta os dados subjacentes.

---

## Início rápido

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

## Versões disponíveis

| Idioma | Slug | Nome | Ano | Licença | Leitor |
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

> A coluna `leitor` aponta para a interface online de cada versão em midvash.com.

Para detalhes completos de licenciamento e proveniência por versão, veja [SOURCES.md](./SOURCES.md).

---

## Schema

Os dados seguem um único schema consistente em todas as versões. Os identificadores de livros usam códigos [OSIS](https://wiki.crosswire.org/OSIS_Book_Abbreviations).

Veja [SCHEMA.md](./SCHEMA.md) para a especificação completa, incluindo tipos TypeScript e DDL SQLite.

---

## O que está incluído

- Cânon protestante de 66 livros (Antigo + Novo Testamento) para as traduções.
- Textos nos idiomas originais:
  - **Hebraico**: Westminster Leningrad Codex (WLC), Aleppo Codex
  - **Grego**: Textus Receptus (Stephanus 1550 / Scrivener 1894)
  - **Latim**: Vulgata, Vulgata Clementina

## O que NÃO está incluído (e por quê)

Traduções modernas com direitos autorais ativos (NIV, ESV, NLT, NVI, NAA, ARA, RVR1960, Schlachter 2000, etc.) **não** estão incluídas. Este repositório distribui apenas textos em domínio público ou com uma licença explícita de livre redistribuição.

Se você precisa de uma tradução moderna licenciada, use a API da editora ou leia em [midvash.com](https://midvash.com).

---

## Como contribuir

Encontrou um erro de transcrição, um versículo faltando, ou uma nova tradução de domínio público que deveria ser adicionada? Veja [CONTRIBUTING.md](./CONTRIBUTING.md).

Para reportar problemas de conteúdo no leitor online, use o [formulário de feedback do Midvash](https://midvash.com/feedback).

---

## Licença

- **Código** (os scripts e metadados deste repositório): MIT — veja [LICENSE](./LICENSE).
- **Dados de texto bíblico**: a licença individual de cada versão, declarada em seu `metadata.json` e detalhada em [SOURCES.md](./SOURCES.md). Todos os textos incluídos são de domínio público ou estão sob uma licença de livre redistribuição.

---

## Projetos relacionados

- **[Midvash](https://midvash.com)** — leitor bíblico online e plataforma de estudo alimentada por este dataset, em 9 idiomas.

---

*Dados gerados em 2026-05-12. Este repositório é regenerado periodicamente.*

## O ecossistema Midvash

Faz parte do [**Midvash**](https://midvash.com) — uma plataforma gratuita de leitura e estudo bíblico. Tudo é aberto e se interliga:

| | |
|---|---|
| 📖 **Leitor (web)** | [midvash.com](https://midvash.com) — 9 idiomas |
| 📱 **App iOS** | [midvash.app/ios](https://midvash.app/ios) |
| 🔌 **API** | [api.midvash.com](https://api.midvash.com) · [`bible-api`](https://github.com/midvash/bible-api) |
| 🤖 **Servidor MCP** | [mcp.midvash.com](https://mcp.midvash.com) · [`bible-mcp`](https://github.com/midvash/bible-mcp) |
| 🧩 **Plugin WordPress** | [midvash.app/wordpress-plugin](https://midvash.app/wordpress-plugin) · [`bible-wordpress-plugin`](https://github.com/midvash/bible-wordpress-plugin) |
| 🧩 **Plugin EmDash** | [midvash.app/emdash-plugin](https://midvash.app/emdash-plugin) · [`emdash-plugin-bible`](https://github.com/midvash/emdash-plugin-bible) |
| 🌐 **Extensão Chrome** | [midvash.app/chrome-extension](https://midvash.app/chrome-extension) · [`bible-chrome-extension`](https://github.com/midvash/bible-chrome-extension) |
| 📦 **Dados abertos** | [`bible-data`](https://github.com/midvash/bible-data) · [`bible-data-js`](https://github.com/midvash/bible-data-js) · [`bible-cross-references`](https://github.com/midvash/bible-cross-references) |

<sub>Gratuito e aberto, feito pela [Midvash](https://midvash.com) · [midvash.com](https://midvash.com) · [midvash.app](https://midvash.app)</sub>
