// Adds the hero "scene" to the TV-List page: a play head travels along a seek bar under the hero,
// lighting up episode squares as it passes and counting a timecode (like the taxi on the Taksi Hesap page).
import fs from "node:fs";
import path from "node:path";
const HERE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const F = path.join(HERE, "template.html");
let s = fs.readFileSync(F, "utf8");
const crlf = s.includes("\r\n"); if (crlf) s = s.replace(/\r\n/g, "\n");
if (s.includes('class="scrub"')) { console.log("already added"); process.exit(0); }
function rep(a, b) { const n = s.split(a).length - 1; if (n !== 1) throw new Error(n + " matches: " + a.slice(0, 70)); s = s.replace(a, () => b); }

const CSS = `
  /* hero scene: a play head travels along the seek bar, lighting up the episodes it passes */
  .scrub{position:absolute;left:0;right:0;bottom:34px;z-index:4;pointer-events:none}
  .scrub .wrap{max-width:1160px}
  .eps{display:grid;grid-template-columns:repeat(24,1fr);gap:6px;margin-bottom:16px}
  .eps i{aspect-ratio:1;border-radius:7px;background:var(--pale);animation:epl 12s ease-in-out infinite;animation-delay:calc(var(--i) * .4s)}
  .eps i.nx{animation-name:epn}
  @keyframes epl{0%{background:var(--pale);transform:scale(.8)}3%{background:var(--teal);transform:scale(1.15)}6%{background:var(--teal);transform:scale(1)}80%{background:var(--teal)}90%,100%{background:var(--pale);transform:scale(1)}}
  @keyframes epn{0%{background:var(--pale);transform:scale(.8)}3%{background:var(--amber);transform:scale(1.15)}6%{background:var(--amber);transform:scale(1)}80%{background:var(--amber)}90%,100%{background:var(--pale);transform:scale(1)}}
  .sbar{position:relative;height:8px;border-radius:6px;background:#dbe9e5}
  .sfill{position:absolute;left:0;top:0;bottom:0;border-radius:6px;background:var(--teal);animation:sfill 12s linear infinite}
  .shead{position:absolute;top:50%;left:0;width:30px;height:30px;margin:-15px 0 0 -15px;border-radius:50%;background:var(--teal);box-shadow:0 0 0 6px rgba(31,169,143,.2),0 10px 16px -8px rgba(11,31,26,.5);display:grid;place-items:center;animation:shead 12s linear infinite}
  .shead::before{content:"";margin-left:2px;border-left:9px solid #fff;border-top:6px solid transparent;border-bottom:6px solid transparent}
  .shead b{position:absolute;bottom:40px;left:50%;transform:translateX(-50%);white-space:nowrap;font:600 11.5px var(--mono);color:var(--ink);background:#fff;border:1px solid var(--line);border-radius:8px;padding:3px 9px;box-shadow:0 10px 14px -10px rgba(11,31,26,.5)}
  @keyframes shead{0%{left:0;opacity:1}80%{left:100%;opacity:1}88%,100%{left:100%;opacity:0}}
  @keyframes sfill{0%{width:0;opacity:1}80%{width:100%;opacity:1}88%,100%{width:100%;opacity:0}}
  @media (max-width:600px){.eps{grid-template-columns:repeat(12,1fr)}.eps i:nth-child(n+13){display:none}.eps i{animation-delay:calc(var(--i) * .8s)}}
  @media (prefers-reduced-motion:reduce){.eps i{background:var(--teal)}.eps i.nx{background:var(--amber)}.sfill{width:60%}.shead{left:60%}}
`;
rep("  /* ---------- pixel-designed compositions", CSS + "\n  /* ---------- pixel-designed compositions");
rep(".hero{position:relative;overflow:hidden;padding:150px 0 90px;", ".hero{position:relative;overflow:hidden;padding:150px 0 190px;");
rep("    .hero{padding:130px 0 70px}", "    .hero{padding:130px 0 170px}");

const MARK = `
  <div class="scrub" aria-hidden="true"><div class="wrap">
    <div class="eps" id="eps"></div>
    <div class="sbar"><i class="sfill"></i><span class="shead"><b id="stc">S02 · E09 · 00:00</b></span></div>
  </div></div>
</section>

<!-- ================= 01 track`;
rep("</section>\n\n<!-- ================= 01 track", MARK);

const JS = `
  /* ---- hero seek bar: episode squares + timecode ---- */
  (function(){
    var box = document.getElementById('eps'), tc = document.getElementById('stc'), h = '';
    if (!box) return;
    for (var i = 0; i < 24; i++) h += '<i class="' + (i === 15 ? 'nx' : '') + '" style="--i:' + i + '"></i>';
    box.innerHTML = h;
    if (reduce || !tc) return;
    setInterval(function(){
      var t = (document.timeline && document.timeline.currentTime ? document.timeline.currentTime : performance.now()) % 12000, p = Math.min(1, t / 9600), sec = Math.round(p * 44 * 60 + p * 30);
      tc.textContent = 'S02 \\u00b7 E09 \\u00b7 ' + ('0' + Math.floor(sec / 60)).slice(-2) + ':' + ('0' + (sec % 60)).slice(-2);
    }, 200);
  })();

  /* ---- hero grid: a tick drawn by watched episodes ---- */`;
rep("\n  /* ---- hero grid: a tick drawn by watched episodes ---- */", JS);
if (crlf) s = s.replace(/\n/g, "\r\n");
fs.writeFileSync(F, s);
console.log("scrub added");
