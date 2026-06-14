# bible-data

> 🌐 [English](./README.md) · [Português (BR)](./README.pt-BR.md) · **Español**

Textos bíblicos abiertos y legibles por máquina en **dominio público** — 33 versiones en 22 idiomas, con un esquema consistente.

Cada versión se distribuye en tres formatos:

- **`<slug>.json`** — la Biblia entera en un único archivo JSON
- **`books/<OSIS>.json`** — un JSON por libro, ligero y fácil de transmitir
- **`<slug>.sqlite`** — base de datos SQLite, indexada para consultas rápidas

Más un `metadata.json` por versión con licencia, año, fuente y estadísticas.

> **Lee estas versiones en línea:** [midvash.com](https://midvash.com) — un lector bíblico gratuito y sostenido con publicidad en 9 idiomas, con búsqueda, lecturas diarias, comentarios y herramientas de estudio con IA. Este repositorio alimenta los datos subyacentes.

---

## Inicio rápido

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

## Versiones disponibles

| Idioma | Slug | Nombre | Año | Licencia | Lector |
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

> La columna `lector` enlaza a la interfaz en línea de cada versión en midvash.com.

Para los detalles completos de licenciamiento y procedencia por versión, consulta [SOURCES.md](./SOURCES.md).

---

## Esquema

Los datos siguen un único esquema consistente en todas las versiones. Los identificadores de libros usan códigos [OSIS](https://wiki.crosswire.org/OSIS_Book_Abbreviations).

Consulta [SCHEMA.md](./SCHEMA.md) para la especificación completa, incluyendo tipos TypeScript y DDL SQLite.

---

## Qué está incluido

- Canon protestante de 66 libros (Antiguo + Nuevo Testamento) para las traducciones.
- Textos en los idiomas originales:
  - **Hebreo**: Westminster Leningrad Codex (WLC), Aleppo Codex
  - **Griego**: Textus Receptus (Stephanus 1550 / Scrivener 1894)
  - **Latín**: Vulgata, Vulgata Clementina

## Qué NO está incluido (y por qué)

Las traducciones modernas con derechos de autor vigentes (NIV, ESV, NLT, NVI, NAA, ARA, RVR1960, Schlachter 2000, etc.) **no** están incluidas. Este repositorio distribuye únicamente textos en dominio público o con una licencia explícita de libre redistribución.

Si necesitas una traducción moderna con licencia, usa la API de la editorial o léela en [midvash.com](https://midvash.com).

---

## Cómo contribuir

¿Detectaste un error de transcripción, un versículo faltante, o una nueva traducción de dominio público que debería añadirse? Consulta [CONTRIBUTING.md](./CONTRIBUTING.md).

Para reportar problemas de contenido en el lector en línea, usa el [formulario de feedback de Midvash](https://midvash.com/feedback).

---

## Licencia

- **Código** (los scripts y metadatos de este repositorio): MIT — consulta [LICENSE](./LICENSE).
- **Datos de texto bíblico**: la licencia individual de cada versión, declarada en su `metadata.json` y detallada en [SOURCES.md](./SOURCES.md). Todos los textos incluidos son de dominio público o están bajo una licencia de libre redistribución.

---

## Proyectos relacionados

- **[Midvash](https://midvash.com)** — lector bíblico en línea y plataforma de estudio alimentada por este dataset, en 9 idiomas.

---

*Datos generados el 2026-05-12. Este repositorio se regenera periódicamente.*

## El ecosistema Midvash

Parte de [**Midvash**](https://midvash.com) — una plataforma gratuita de lectura y estudio bíblico. Todo es abierto y se interconecta:

| | |
|---|---|
| 📖 **Lector (web)** | [midvash.com](https://midvash.com) — 9 idiomas |
| 📱 **App iOS** | [midvash.app/ios](https://midvash.app/ios) |
| 🔌 **API** | [api.midvash.com](https://api.midvash.com) · [`bible-api`](https://github.com/midvash/bible-api) |
| 🤖 **Servidor MCP** | [mcp.midvash.com](https://mcp.midvash.com) · [`bible-mcp`](https://github.com/midvash/bible-mcp) |
| 🧩 **Plugin de WordPress** | [midvash.app/wordpress-plugin](https://midvash.app/wordpress-plugin) · [`bible-wordpress-plugin`](https://github.com/midvash/bible-wordpress-plugin) |
| 🧩 **Plugin de EmDash** | [midvash.app/emdash-plugin](https://midvash.app/emdash-plugin) · [`emdash-plugin-bible`](https://github.com/midvash/emdash-plugin-bible) |
| 🌐 **Extensión de Chrome** | [midvash.app/chrome-extension](https://midvash.app/chrome-extension) · [`bible-chrome-extension`](https://github.com/midvash/bible-chrome-extension) |
| 📦 **Datos abiertos** | [`bible-data`](https://github.com/midvash/bible-data) · [`bible-data-js`](https://github.com/midvash/bible-data-js) · [`bible-cross-references`](https://github.com/midvash/bible-cross-references) |

<sub>Gratuito y abierto, hecho por [Midvash](https://midvash.com) · [midvash.com](https://midvash.com) · [midvash.app](https://midvash.app)</sub>
