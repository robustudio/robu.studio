// Builds ../../pagely.html from template.html + copy.json (EN / ES / TR).
//   node _src/pagely/build.mjs               -> writes pagely.html in the repo root
//   node _src/pagely/build.mjs out.html      -> writes somewhere else (to compare first)
// No dependencies. Edit the words in copy.json, the layout / CSS / motion in template.html, then rebuild.
import fs from "node:fs";
import path from "node:path";

const HERE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const ROOT = path.join(HERE, "..", "..");
const OUT = process.argv[2] || path.join(ROOT, "pagely.html");

const D = JSON.parse(fs.readFileSync(path.join(HERE, "copy.json"), "utf8"));

// footer icons (same set as the rest of the site); YouTube / X / LinkedIn stay non-clickable until the accounts exist
const open = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
const IC = {
  ig: open + '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="0.6" fill="currentColor"/></svg>',
  mail: open + '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M4.5 8l7.5 5.5L19.5 8"/></svg>',
  yt: open + '<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10 9.5l5 2.5-5 2.5z" fill="currentColor"/></svg>',
  x: open + '<path d="M4 4h4.2L20 20h-4.2z"/><path d="M19.5 4l-6.6 7.3M4.5 20l6.6-7.3"/></svg>',
  li: open + '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10.5V16M8 7.8v.01M11.5 16v-5.5M11.5 13c0-1.6 1-2.6 2.4-2.6s2.1 1 2.1 2.5V16"/></svg>',
};
const social = [
  `      <a href="https://www.instagram.com/studio.robu/" target="_blank" rel="noopener noreferrer" aria-label="Instagram @studio.robu" title="@studio.robu">${IC.ig}</a>`,
  `      <span role="img" aria-label="YouTube" title="YouTube">${IC.yt}</span>`,
  `      <span role="img" aria-label="X" title="X">${IC.x}</span>`,
  `      <span role="img" aria-label="LinkedIn" title="LinkedIn">${IC.li}</span>`,
  `      <a href="mailto:hello@robu.studio" aria-label="hello@robu.studio" title="hello@robu.studio">${IC.mail}</a>`,
].join("\n");

let html = fs.readFileSync(path.join(HERE, "template.html"), "utf8");
html = html.replace("{{FONT}}", () => fs.readFileSync(path.join(ROOT, "_src", "shared", "noot-font.css"), "utf8"));
html = html.replace("{{SOCIAL}}", () => social);
html = html.replace(/\{\{([a-zA-Z0-9_.]+)\}\}/g, (m, k) => {
  if (k === "DICT") return m;
  if (!D[k]) throw new Error("missing copy: " + k);
  return D[k].en;
});
html = html.replace("{{DICT}}", () => JSON.stringify(D));
for (const m of html.matchAll(/data-i18n="([^"]+)"/g)) if (!D[m[1]]) throw new Error("unknown data-i18n key " + m[1]);
if (!D["rc.read"]) throw new Error("missing rc.read");
fs.writeFileSync(OUT, html);
console.log("built", OUT, Math.round(html.length / 1024) + " KB");
