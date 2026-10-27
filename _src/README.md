# _src — sources of the hand-built app pages

Folders that start with `_` are not published by GitHub Pages. Everything the visitor sees is the finished
HTML in the repo root; this folder only holds what is needed to change those pages comfortably.

| Folder | Builds | How |
|---|---|---|
| `taksi-hesap/` | `../t-hesap.html` | `node _src/taksi-hesap/build.mjs` (no dependencies) |
| `yip/` | `../yip.html` | `node _src/yip/build.mjs` (no dependencies) |
| `tv-list/` | `../tv-list.html` | `node _src/tv-list/build.mjs` (no dependencies) |
| `pagely/` | `../pagely.html` | `node _src/pagely/build.mjs` (no dependencies) |
| `pigeon/` | `../pigeon.html` | `node _src/pigeon/build.mjs` (no dependencies; the dotted world map is baked by `make-map.mjs` into `map-dots.txt`, Natural Earth public-domain data) |
| `taksi-filo/` | `../taksi-filo.html` | `node _src/taksi-filo/build.mjs` (no dependencies; `taxi.txt` = the Taksi Hesap taxi SVG, screens in `assets/taksi-filo/` come from `Taksi-Filo/store-screenshots/ads/{tr,en}-light`, resized to 520 px) |
| `shared/` | — | pieces used by several pages (the Noot "ROBU" wordmark font) |

- Words (EN / ES / TR): `<app>/copy.json`. Layout, CSS and motion: `<app>/template.html`.
- Rebuilding without edits reproduces the live page byte for byte.
- Each app page is designed on its own (not from one shared template). The old all-pages generator was retired on
  purpose — do not recreate it; it would overwrite hand-built pages and the hub (`index.html`, the studio's own design).
- Please do not touch `yip/` (the Yip web app, built elsewhere) or `legal/`, `privacy/`, `iplik/` (published legal pages).

Taksi Hesap (T-Hesap) is now called **Taksi Hesap**; the file names (`t-hesap.html`, `legal/t-hesap/`) stay as they are
because store listings link to them.
