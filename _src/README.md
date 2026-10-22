# _src — sources of the hand-built app pages

Folders that start with `_` are not published by GitHub Pages. Everything the visitor sees is the finished
HTML in the repo root; this folder only holds what is needed to change those pages comfortably.

| Folder | Builds | How |
|---|---|---|
| `taksi-hesap/` | `../t-hesap.html` | `node _src/taksi-hesap/build.mjs` (no dependencies) |
| `yip/` | `../yip.html` | `node _src/yip/build.mjs` (no dependencies) |
| `shared/` | — | pieces used by several pages (the Noot "ROBU" wordmark font) |

- Words (EN / ES / TR): `<app>/copy.json`. Layout, CSS and motion: `<app>/template.html`.
- Rebuilding without edits reproduces the live page byte for byte.
- Each app page is designed on its own (not from one shared template). The old all-pages generator was retired on
  purpose — do not recreate it; it would overwrite hand-built pages and the hub (`index.html`, the studio's own design).
- Please do not touch `yip/` (the Yip web app, built elsewhere) or `legal/`, `privacy/`, `iplik/` (published legal pages).

Taksi Hesap (T-Hesap) is now called **Taksi Hesap**; the file names (`t-hesap.html`, `legal/t-hesap/`) stay as they are
because store listings link to them.
