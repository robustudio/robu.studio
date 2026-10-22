// Adds the hero "scene" to the Yip page: a cat chases a rolling yarn ball along the tape measure,
// and the ball unwinds a green thread behind it (like the taxi on the Taksi Hesap page).
import fs from "node:fs";
import path from "node:path";
const HERE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const F = path.join(HERE, "template.html");
let s = fs.readFileSync(F, "utf8");
const crlf = s.includes("\r\n"); if (crlf) s = s.replace(/\r\n/g, "\n");
if (s.includes('class="walker"')) { console.log("already added"); process.exit(0); }
function rep(a, b) { const n = s.split(a).length - 1; if (n !== 1) throw new Error(n + " matches: " + a.slice(0, 70)); s = s.replace(a, () => b); }

const CSS = `
  /* hero scene: a cat chases a yarn ball along the tape measure, unwinding a thread */
  .walker{position:absolute;left:0;bottom:84px;width:560px;height:110px;z-index:5;pointer-events:none;animation:walk 34s linear infinite;will-change:transform}
  @keyframes walk{from{transform:translateX(-600px)}to{transform:translateX(calc(100vw + 60px))}}
  .walker .cat{position:absolute;left:0;bottom:0;width:190px;height:104px;animation:bobc .5s ease-in-out infinite alternate}
  @keyframes bobc{to{transform:translateY(-3px)}}
  .walker .leg{transform-box:fill-box;transform-origin:50% 0;animation:legs .5s ease-in-out infinite alternate}
  .walker .leg.b{animation-direction:alternate-reverse}
  @keyframes legs{from{transform:rotate(-26deg)}to{transform:rotate(26deg)}}
  .walker .tail{transform-box:fill-box;transform-origin:0 100%;animation:tailw 1.3s ease-in-out infinite alternate}
  @keyframes tailw{from{transform:rotate(-10deg)}to{transform:rotate(14deg)}}
  .walker .ball{position:absolute;left:300px;bottom:0;width:86px;height:86px;animation:rollb 3.6s linear infinite}
  @keyframes rollb{to{transform:rotate(360deg)}}
  .walker .string{position:absolute;left:150px;bottom:30px;width:190px;height:50px;overflow:visible}
  .trail{position:absolute;left:0;bottom:88px;height:5px;width:0;z-index:4;pointer-events:none;border-radius:3px;background:repeating-linear-gradient(90deg,#34c77b 0 16px,#2fb36d 16px 22px);animation:trailw 34s linear infinite;box-shadow:0 2px 0 rgba(11,90,53,.25)}
  @keyframes trailw{from{width:0}to{width:calc(100vw + 330px)}}
  @media (max-width:600px){.walker{transform-origin:0 100%;scale:.62}.trail{bottom:70px}}
  @media (prefers-reduced-motion:reduce){.walker{animation:none;transform:translateX(30vw)}.trail{animation:none;width:calc(30vw + 330px)}.walker .cat,.walker .leg,.walker .tail,.walker .ball{animation:none}}
`;
rep("  .tape{position:absolute;left:-20px;right:-20px;bottom:44px;", CSS + "  .tape{position:absolute;left:-20px;right:-20px;bottom:44px;");

const WALKER = `  <div class="trail" aria-hidden="true"></div>
  <div class="walker" aria-hidden="true">
    <svg class="cat" viewBox="0 0 190 104" fill="none">
      <g class="tail"><path d="M20 58 C 0 44, 4 16, 20 12" stroke="#1d2a21" stroke-width="12" stroke-linecap="round"/><path d="M20 58 C 0 44, 4 16, 20 12" stroke="#f4ead2" stroke-width="6" stroke-linecap="round"/></g>
      <g class="leg b"><rect x="38" y="66" width="14" height="34" rx="7" fill="#f4ead2" stroke="#1d2a21" stroke-width="3.5"/></g>
      <g class="leg"><rect x="58" y="66" width="14" height="34" rx="7" fill="#f4ead2" stroke="#1d2a21" stroke-width="3.5"/></g>
      <ellipse cx="86" cy="58" rx="62" ry="32" fill="#f4ead2" stroke="#1d2a21" stroke-width="4"/>
      <path d="M52 40 C 70 30, 100 30, 120 42" stroke="#34c77b" stroke-width="7" stroke-linecap="round" fill="none"/>
      <g class="leg"><rect x="98" y="66" width="14" height="34" rx="7" fill="#f4ead2" stroke="#1d2a21" stroke-width="3.5"/></g>
      <g class="leg b"><rect x="118" y="66" width="14" height="34" rx="7" fill="#f4ead2" stroke="#1d2a21" stroke-width="3.5"/></g>
      <path d="M134 34 L142 8 L158 26 M170 24 L182 6 L190 34" fill="#f4ead2" stroke="#1d2a21" stroke-width="4" stroke-linejoin="round"/>
      <circle cx="158" cy="48" r="28" fill="#f4ead2" stroke="#1d2a21" stroke-width="4"/>
      <path d="M142 14 L148 28 L136 30z" fill="#f4a3b3"/>
      <circle cx="149" cy="44" r="3.6" fill="#1d2a21"/><circle cx="168" cy="44" r="3.6" fill="#1d2a21"/>
      <path d="M154 54 L158 58 L162 54 Z" fill="#e0533b"/><path d="M158 58 Q153 65 147 62M158 58 Q163 65 169 62" stroke="#1d2a21" stroke-width="2.6" fill="none" stroke-linecap="round"/>
      <path d="M132 52 L112 48M132 57 L112 60M184 52 L194 48" stroke="#1d2a21" stroke-width="2" stroke-linecap="round"/>
    </svg>
    <svg class="string" viewBox="0 0 190 50" fill="none"><path d="M0 40 C 30 10, 60 52, 96 26 S 160 14, 190 30" stroke="#34c77b" stroke-width="4" stroke-linecap="round"/></svg>
    <svg class="ball" viewBox="0 0 140 140" style="--c:#34c77b;--d:#1b9e5a"><use href="#yarn"/></svg>
  </div>
`;
rep('  <div class="tape" aria-hidden="true">', WALKER + '  <div class="tape" aria-hidden="true">');
if (crlf) s = s.replace(/\n/g, "\r\n");
fs.writeFileSync(F, s);
console.log("walker added");
