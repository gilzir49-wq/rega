// Dependency-free PWA icon generator for רגע.
// Draws a calm "breathing" mark — concentric sage circles on a warm sand
// background — at 192 / 512 / maskable-512. Pure Node (zlib only).
//
// Usage: node scripts/gen-pwa-icons.mjs [outDir]
import { deflateSync } from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

const OUT = join(resolve(process.argv[2] || 'public'), 'icons');
mkdirSync(OUT, { recursive: true });

const SAND = [244, 239, 228]; // #F4EFE4 warm background
const SAGE = [126, 155, 130]; // #7E9B82
const SAGE_DEEP = [94, 122, 99]; // #5E7A63
const SAGE_SOFT = [207, 220, 208]; // #CFDCD0

const CRC = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
const crc32 = (b) => {
  let c = 0xffffffff;
  for (let i = 0; i < b.length; i++) c = CRC[(c ^ b[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};
const chunk = (type, data) => {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([len, body, crc]);
};

const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));

// nx, ny in 0..1. `s` scales the mark (smaller for maskable safe-zone).
function pixel(nx, ny, s) {
  const dx = (nx - 0.5) / s;
  const dy = (ny - 0.5) / s;
  const d = Math.hypot(dx, dy); // 0 at center, ~0.5 at edge of scaled mark
  // soft anti-aliased bands: center dot + two rings (breathing)
  const band = (lo, hi, col) => {
    const aa = 0.012;
    if (d > lo - aa && d < hi + aa) {
      // feather edges
      const inner = Math.min(1, (d - (lo - aa)) / aa);
      const outer = Math.min(1, (hi + aa - d) / aa);
      const a = Math.max(0, Math.min(inner, outer, 1));
      return { col, a };
    }
    return null;
  };
  let out = SAND;
  const layers = [
    band(0, 0.12, SAGE_DEEP), // center dot
    band(0.2, 0.26, SAGE), // ring 1
    band(0.34, 0.385, SAGE_SOFT), // ring 2
  ];
  for (const l of layers) if (l) out = mix(out, l.col, l.a);
  return out;
}

function makePNG(size, scale) {
  const rowLen = size * 4;
  const raw = Buffer.alloc((rowLen + 1) * size);
  for (let y = 0; y < size; y++) {
    raw[y * (rowLen + 1)] = 0;
    for (let x = 0; x < size; x++) {
      const [r, g, b] = pixel((x + 0.5) / size, (y + 0.5) / size, scale);
      const o = y * (rowLen + 1) + 1 + x * 4;
      raw[o] = r;
      raw[o + 1] = g;
      raw[o + 2] = b;
      raw[o + 3] = 255;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

// standard icons: mark fills ~78% of the tile
for (const size of [192, 512])
  writeFileSync(join(OUT, `icon-${size}.png`), makePNG(size, 0.78));
// maskable: shrink the mark into the safe zone (~60%)
writeFileSync(join(OUT, 'icon-maskable-512.png'), makePNG(512, 0.6));
console.log(`wrote רגע icons to ${OUT}`);
