// Bakes the dotted world map used on the Pigeon page into map-dots.txt (one SVG path, round-capped zero-length dashes).
//   node _src/pigeon/make-map.mjs <ne_110m_land.geojson>
// Source: Natural Earth 110m land (public domain), https://www.naturalearthdata.com
// Map space: viewBox 1100 x 409.4, equirectangular, lon -180..180, lat 78..-56. Keep these numbers in template.html in sync.
import fs from "node:fs";
import path from "node:path";

const HERE = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const src = process.argv[2];
if (!src) throw new Error("usage: node make-map.mjs ne_110m_land.geojson");
const gj = JSON.parse(fs.readFileSync(src, "utf8"));

const W = 1100, LAT_TOP = 78, LAT_BOT = -56;
const H = (W * (LAT_TOP - LAT_BOT)) / 360;
const STEP = 2.1; // degrees between dots

const polys = [];
for (const f of gj.features) {
  const g = f.geometry;
  if (g.type === "Polygon") polys.push(g.coordinates);
  else if (g.type === "MultiPolygon") for (const p of g.coordinates) polys.push(p);
}
const inRing = (x, y, ring) => {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i], [xj, yj] = ring[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
};
const onLand = (lon, lat) => {
  for (const p of polys) {
    if (!inRing(lon, lat, p[0])) continue;
    let hole = false;
    for (let k = 1; k < p.length; k++) if (inRing(lon, lat, p[k])) hole = true;
    if (!hole) return true;
  }
  return false;
};

let d = "", n = 0;
for (let lat = LAT_TOP - STEP / 2; lat > LAT_BOT; lat -= STEP) {
  for (let lon = -180 + STEP / 2; lon < 180; lon += STEP) {
    if (!onLand(lon, lat)) continue;
    const x = ((lon + 180) / 360) * W, y = ((LAT_TOP - lat) / (LAT_TOP - LAT_BOT)) * H;
    d += `M${x.toFixed(0)} ${y.toFixed(0)}h0`;
    n++;
  }
}
fs.writeFileSync(path.join(HERE, "map-dots.txt"), d);
console.log("dots", n, "bytes", d.length, "viewBox", W, H.toFixed(1));
