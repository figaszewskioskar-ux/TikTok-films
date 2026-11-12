// Silnik BLOK 94: narzędzia, napisy, postacie, tła. Odcinki dokładają sceny w <odc>/scenes.js.
// Cała animacja rysowana na canvasie 1080×1920. renderFrame(t) rysuje klatkę dla czasu t (sekundy).
'use strict';
const W = 1080, H = 1920, FPS = 30;
let DUR = 60;
const FONT = 'Inter';

// ---------- narzędzia ----------
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const lerp = (a, b, t) => a + (b - a) * t;
const prog = (t, a, b) => clamp((t - a) / (b - a));
const eio = t => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const eout = t => 1 - Math.pow(1 - t, 3);
const back = t => { const c1 = 1.9, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); };
const hash = n => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const mv = (t, a, b, v0, v1, e = eio) => lerp(v0, v1, e(prog(t, a, b)));

function rr(c, x, y, w, h, r) { c.beginPath(); c.roundRect(x, y, w, h, r); }
function fillRR(c, x, y, w, h, r, col) { rr(c, x, y, w, h, r); c.fillStyle = col; c.fill(); }
function circ(c, x, y, r, col) { c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fillStyle = col; c.fill(); }
function ell(c, x, y, rx, ry, col) { c.beginPath(); c.ellipse(x, y, Math.max(.1, rx), Math.max(.1, ry), 0, 0, Math.PI * 2); c.fillStyle = col; c.fill(); }
function font(c, size, weight = 800) { c.font = `${weight} ${size}px ${FONT}`; }
function txt(c, s, x, y, size, col, weight = 800, align = 'center') {
  font(c, size, weight); c.fillStyle = col; c.textAlign = align; c.textBaseline = 'middle'; c.fillText(s, x, y);
}

// ---------- napisy / etykiety ----------
const LSTYLE = {
  dark: ['rgba(14,16,21,0.92)', '#FFFFFF'],
  red: ['#D7263D', '#FFFFFF'],
  yellow: ['#F5C542', '#14161B'],
  orange: ['#F39C12', '#14161B'],
  white: ['#FFFFFF', '#14161B'],
};
function label(c, s, x, y, st = 'dark', size = 44, age = 9, left = 9) {
  const [bg, fg] = LSTYLE[st];
  const lines = s.split('\n');
  font(c, size, 800);
  const w = Math.max(...lines.map(l => c.measureText(l).width)) + size * 1.1;
  const lh = size * 1.18, h = lines.length * lh + size * 0.55;
  const sc = age < 0.28 ? back(age / 0.28) : 1;
  const al = clamp(left / 0.18);
  c.save(); c.globalAlpha *= al; c.translate(x, y); c.scale(sc, sc);
  c.shadowColor = 'rgba(0,0,0,.45)'; c.shadowBlur = 18; c.shadowOffsetY = 6;
  fillRR(c, -w / 2, -h / 2, w, h, Math.min(h / 2, 26), bg);
  c.shadowColor = 'transparent';
  lines.forEach((l, i) => txt(c, l, 0, -h / 2 + size * 0.28 + lh * (i + .5), size, fg, 800));
  c.restore();
}
function bubble(c, s, cx, by, tx, ty, age = 9, left = 9, size = 42) {
  const lines = s.split('\n');
  font(c, size, 700);
  const w = Math.max(...lines.map(l => c.measureText(l).width)) + 70;
  const lh = size * 1.25, h = lines.length * lh + 46;
  let x = clamp(cx - w / 2, 40, 1040 - w), y = by - h;
  const sc = age < 0.25 ? back(age / 0.25) : 1, al = clamp(left / 0.15);
  c.save(); c.globalAlpha *= al;
  const ox = tx, oy = ty; c.translate(ox, oy); c.scale(sc, sc); c.translate(-ox, -oy);
  c.shadowColor = 'rgba(0,0,0,.4)'; c.shadowBlur = 20; c.shadowOffsetY = 8;
  // ogonek
  const below = ty > y + h;
  const bx = clamp(tx, x + 50, x + w - 50);
  c.beginPath();
  if (below) { c.moveTo(bx - 22, y + h - 2); c.lineTo(bx + 22, y + h - 2); c.lineTo(lerp(bx, tx, .55), ty - 20); } // ogonek sięga głowy mówiącego
  else { c.moveTo(bx - 22, y + 2); c.lineTo(bx + 22, y + 2); c.lineTo(lerp(bx, tx, .55), Math.max(ty + 20, y - 70)); }
  c.closePath(); c.fillStyle = '#FFFFFF'; c.fill();
  fillRR(c, x, y, w, h, 22, '#FFFFFF');
  c.shadowColor = 'transparent';
  c.setLineDash([9, 7]); c.lineWidth = 3; c.strokeStyle = '#2A2D35';
  rr(c, x + 9, y + 9, w - 18, h - 18, 16); c.stroke(); c.setLineDash([]);
  lines.forEach((l, i) => txt(c, l, x + w / 2, y + 23 + lh * (i + .5), size, '#14161B', 700));
  c.restore();
}
function card(c, x, y, w, title, body, age, accent = '#F39C12', size = 42) {
  const lines = body.split('\n');
  const lh = size * 1.25, h = 92 + lines.length * lh;
  const p = eout(clamp(age / 0.35));
  c.save(); c.globalAlpha *= p; c.translate((1 - p) * -120, 0);
  c.shadowColor = 'rgba(0,0,0,.5)'; c.shadowBlur = 24; c.shadowOffsetY = 8;
  fillRR(c, x, y, w, h, 16, 'rgba(18,20,26,0.96)');
  c.shadowColor = 'transparent';
  fillRR(c, x, y, 12, h, 6, accent);
  txt(c, title, x + 44, y + 44, 30, accent, 800, 'left');
  lines.forEach((l, i) => txt(c, l, x + 44, y + 86 + lh * (i + .5) - 4, size, '#FFFFFF', 700, 'left'));
  c.restore();
  return h;
}

// ---------- postacie ----------
const KINDS = {
  kuba: { jacket: '#6E7B3B', dark: '#5B672F', pants: '#2A2E3A', skin: '#F2B48A', shoes: '#1B1D22' },
  kaptur: { jacket: '#22242A', dark: '#17191E', pants: '#16181C', skin: '#45464E', shoes: '#0E0F12' },
  kurier: { jacket: '#46536A', dark: '#3A465A', pants: '#2A2E3A', skin: '#E3A47A', shoes: '#1B1D22' },
  zdzisiek: { jacket: '#A62B2E', dark: '#8A2326', pants: '#2B3550', skin: '#F0B08A', shoes: '#222428' },
  halina: { jacket: '#7D4DA3', dark: '#673E89', pants: '#7D4DA3', skin: '#F2BC98', shoes: '#E77FA8' },
  ola: { jacket: '#E9B52C', dark: '#C9971A', pants: '#5C7DB5', skin: '#F4C29C', shoes: '#E8E4DA' },
  sasiad: { jacket: '#2F343F', dark: '#22262F', pants: '#1A1D24', skin: '#E3AC88', shoes: '#0E0F12' },
  policjant: { jacket: '#1F2C4C', dark: '#16203A', pants: '#1A2440', skin: '#E9B08A', shoes: '#0E0F12' },
  kobieta: { jacket: '#BFA27E', dark: '#A68A66', pants: '#BFA27E', skin: '#EDBE9C', shoes: '#2A2420' },
};
function shade(hex, f) { const n = parseInt(hex.slice(1), 16); const r = n >> 16, g = (n >> 8) & 255, b = n & 255; const m = v => Math.max(0, Math.min(255, Math.round(f < 0 ? v * (1 + f) : v + (255 - v) * f))); return '#' + ((1 << 24) + (m(r) << 16) + (m(g) << 8) + m(b)).toString(16).slice(1); }
function arm(c, sx, sy, a, side, k, len = 92) {
  c.save(); c.translate(sx, sy); c.rotate(-side * a);
  fillRR(c, -12, -8, 24, len + 8, 12, k.jacket);
  fillRR(c, side > 0 ? 2 : -12, -4, 10, len, 6, 'rgba(0,0,0,.12)');
  fillRR(c, -12, len - 14, 24, 10, 4, shade(k.jacket, -.25));
  circ(c, 0, len + 2, 13, k.skin); circ(c, -3, len - 1, 5, 'rgba(255,255,255,.18)');
  c.restore();
  return [sx + side * Math.sin(a) * (len + 2), sy + Math.cos(a) * (len + 2)];
}
function person(c, kind, x, y, s, o = {}) {
  const k = KINDS[kind], t = o.t || 0;
  c.save();
  c.globalAlpha *= (o.alpha ?? 1);
  c.translate(x, y);
  // cień
  ell(c, 0, 0, 62 * s, 11 * s, 'rgba(0,0,0,.28)');
  const ph = o.walk;
  // ruch w spoczynku: kołysanie, głowa, wzrok, gesty przy mówieniu (o.still = bez ruchu)
  const seed = o.seed ?? (kind.length * 1.7 + (kind.charCodeAt(0) % 7)), idle = !o.still && ph == null && !o.rot;
  if (o.rot) c.rotate(o.rot);
  else if (idle) c.rotate(0.014 * Math.sin(t * 0.9 + seed) + (o.talk ? 0.008 * Math.sin(t * 2.6 + seed) : 0));
  c.scale(s * (o.flip ? -1 : 1), s * (o.squash ?? 1));
  const sw = ph == null ? 0 : Math.sin(ph);
  const bob = ph == null ? Math.sin(t * 2.1 + x) * 1.5 : -Math.abs(sw) * 7;
  const gR = idle && o.talk && o.aR == null ? 0.22 + 0.22 * Math.sin(t * 3.1 + seed) : 0, gL = idle && o.talk && o.aL == null ? 0.1 + 0.1 * Math.sin(t * 2.3 + seed + 1) : 0;
  const aL = (o.aL ?? 0.14) + sw * 0.35 + gL, aR = (o.aR ?? 0.14) - sw * 0.35 + gR;
  // nogi
  const LONG = kind === 'halina' || kind === 'kobieta';
  if (!LONG) {
    for (const side of [-1, 1]) {
      const lift = Math.max(0, side * sw) * 14, dx = side * sw * 6;
      fillRR(c, side * 15 - 10 + dx, -86 - lift, 20, 82, 8, k.pants);
      fillRR(c, side * 15 + (side > 0 ? 2 : -10) + dx, -84 - lift, 8, 78, 4, 'rgba(0,0,0,.14)');
      fillRR(c, side * 15 - 13 + dx + (side > 0 ? 2 : -6), -12 - lift, 30, 13, 6, k.shoes);
      fillRR(c, side * 15 - 13 + dx + (side > 0 ? 2 : -6), -3 - lift, 30, 4, 2, 'rgba(255,255,255,.22)');
    }
  } else {
    fillRR(c, -26, -12, 22, 12, 6, k.shoes); fillRR(c, 4, -12, 22, 12, 6, k.shoes);
    fillRR(c, -20, -34, 14, 24, 6, kind === 'kobieta' ? '#2A2420' : k.skin); fillRR(c, 6, -34, 14, 24, 6, kind === 'kobieta' ? '#2A2420' : k.skin);
  }
  c.translate(0, bob);
  const back_ = !!o.back;
  // ciało
  if (LONG) {
    rr(c, -48, -192, 96, 162, 26); c.fillStyle = k.jacket; c.fill();
    fillRR(c, -48, -120, 96, 12, 6, k.dark);
    c.fillStyle = k.dark; c.beginPath(); c.moveTo(-20, -190); c.lineTo(0, -140); c.lineTo(20, -190); c.fill();
  } else {
    fillRR(c, -45, -192, 90, 122, 24, k.jacket);
    c.save(); rr(c, -45, -192, 90, 122, 24); c.clip();
    c.fillStyle = 'rgba(0,0,0,.13)'; c.fillRect(18, -192, 30, 122);
    c.fillStyle = 'rgba(255,255,255,.07)'; c.fillRect(-45, -192, 22, 122);
    c.fillStyle = shade(k.jacket, -.22); c.fillRect(-45, -82, 90, 12);
    if (kind !== 'policjant' && kind !== 'kurier' && kind !== 'ola') { fillRR(c, -36, -112, 22, 4, 2, 'rgba(0,0,0,.2)'); fillRR(c, 14, -112, 22, 4, 2, 'rgba(0,0,0,.2)'); }
    c.restore();
    if (kind === 'kuba') { c.fillStyle = k.dark; c.fillRect(-2, -180, 4, 104); }
    if (kind === 'kaptur' && !back_) { fillRR(c, -26, -128, 52, 30, 10, k.dark); }
    if (kind === 'kurier') {
      fillRR(c, -40, -186, 80, 104, 14, '#E8A33D');
      c.fillStyle = '#F6E7BE'; c.fillRect(-40, -134, 80, 9);
      c.fillStyle = '#C9862A'; c.fillRect(-2, -186, 4, 104);
    }
    if (kind === 'zdzisiek') { c.fillStyle = k.dark; c.fillRect(-2, -180, 4, 104); fillRR(c, -36, -110, 20, 16, 4, k.dark); }
    if (kind === 'policjant') {
      fillRR(c, -14, -190, 28, 40, 6, '#9DB8DA');
      if (!back_) { fillRR(c, -42, -176, 32, 96, 10, '#D8E23A'); fillRR(c, 10, -176, 32, 96, 10, '#D8E23A'); }
      else fillRR(c, -42, -176, 84, 96, 12, '#D8E23A');
      fillRR(c, -44, -136, 88, 22, 3, '#1E3A8A'); txt(c, 'POLICJA', 0, -125, 15, '#FFFFFF', 900);
      c.fillStyle = 'rgba(230,236,240,.9)'; c.fillRect(-44, -104, 88, 5); c.fillRect(-44, -96 + 2, 88, 0);
      fillRR(c, 16, -172, 16, 18, 3, '#D9B84A');
      c.fillStyle = '#0E1530'; c.fillRect(-45, -86, 90, 10);
    }
    if (kind === 'ola') { fillRR(c, -30, -118, 60, 30, 10, k.dark); c.strokeStyle = '#FFFFFF'; c.lineWidth = 3; c.beginPath(); c.moveTo(-10, -186); c.lineTo(-12, -150); c.moveTo(10, -186); c.lineTo(12, -150); c.stroke(); }
  }
  // pudełko (kurier)
  let armA = [aL, aR];
  if (o.box) armA = [0.55, 0.55];
  // ręce
  const hl = arm(c, -40, -178, armA[0], -1, k);
  const hr = arm(c, 40, -178, armA[1], 1, k);
  if (o.box) {
    fillRR(c, -78, -172, 156, 104, 6, '#B07A45');
    c.fillStyle = '#D9B57E'; c.fillRect(-78, -150, 156, 12);
    c.fillStyle = '#9A6838'; c.fillRect(-78, -172, 156, 6);
    txt(c, '71', 34, -105, 38, '#1E1E1E', 900);
    circ(c, -78, -110, 13, k.skin); circ(c, 78, -110, 13, k.skin);
  }
  if (o.bag) { ell(c, hr[0] + 6, hr[1] + 40, 34, 42, '#121317'); c.fillStyle = '#121317'; c.fillRect(hr[0] - 4, hr[1], 12, 14); }
  if (o.keys) {
    c.strokeStyle = '#CFD3D8'; c.lineWidth = 3; c.beginPath(); c.arc(hr[0], hr[1] + 16, 8, 0, 7); c.stroke();
    fillRR(c, hr[0] - 3, hr[1] + 22, 6, 18, 2, '#CFD3D8');
  }
  if (o.net) {
    const bx = hr[0], by = hr[1];
    c.strokeStyle = '#E8E1C9'; c.lineWidth = 2.5;
    c.beginPath(); c.moveTo(bx, by); c.lineTo(bx - 26, by + 26); c.moveTo(bx, by); c.lineTo(bx + 26, by + 26); c.stroke();
    fillRR(c, bx - 9, by + 4, 18, 70, 5, '#D8E4E8'); fillRR(c, bx - 5, by - 6, 10, 14, 3, '#3B7A4A');
    ell(c, bx + 16, by + 56, 18, 14, '#E5B567');
    c.beginPath();
    for (let i = 0; i < 5; i++) { c.moveTo(bx - 30 + i * 15, by + 26); c.lineTo(bx - 26 + i * 13, by + 86); }
    for (let j = 0; j < 4; j++) { c.moveTo(bx - 30, by + 30 + j * 16); c.lineTo(bx + 30, by + 30 + j * 16); }
    c.stroke();
  }
  if (o.pin) {
    c.save(); c.translate(hr[0], hr[1]); c.rotate(-0.5);
    fillRR(c, -70, -13, 140, 26, 12, '#C08A52'); fillRR(c, -96, -6, 30, 12, 5, '#9B6A3A'); fillRR(c, 66, -6, 30, 12, 5, '#9B6A3A');
    circ(c, 0, 0, 13, k.skin); c.restore();
  }
  if (o.phone) {
    c.save(); c.translate(hr[0], hr[1] - 6);
    fillRR(c, -11, -22, 22, 40, 5, '#15171C'); fillRR(c, -8, -18, 16, 32, 3, o.phone === 2 ? '#3FB27F' : '#BFD9FF');
    c.restore();
  }
  if (o.tool) { c.strokeStyle = '#D4D7DC'; c.lineWidth = 4; c.beginPath(); c.moveTo(hr[0], hr[1]); c.lineTo(hr[0] + 30, hr[1] - 26); c.stroke(); }
  // szalik / kołnierz
  if (kind === 'kuba') { fillRR(c, -36, -202, 72, 24, 11, '#1BB0A3'); if (!back_) fillRR(c, 12, -192, 18, 52, 8, '#169A8F'); }
  // głowa
  const hy = -242;
  if (kind !== 'kaptur') { fillRR(c, -14, hy + 34, 28, 28, 8, shade(k.skin, -.18)); }
  c.save(); c.translate(0, hy + 40);
  if (idle) { c.rotate(0.06 * Math.sin(t * 0.75 + seed) + (o.talk ? 0.05 * Math.sin(t * 4.2 + seed) : 0)); c.translate(0, o.talk ? Math.sin(t * 6 + seed) * 2 : 0); }
  c.scale(.93, .93); c.translate(0, -(hy + 40));
  if (kind === 'kaptur') {
    circ(c, 0, hy + 2, 66, '#1A1C21');
    if (back_) {
      c.strokeStyle = '#0F1013'; c.lineWidth = 4; c.beginPath(); c.moveTo(0, hy - 60); c.lineTo(0, hy + 60); c.stroke();
    } else {
      ell(c, 0, hy + 12, 43, 47, k.skin);
      const g = c.createLinearGradient(0, hy - 40, 0, hy + 30);
      g.addColorStop(0, 'rgba(10,10,14,.98)'); g.addColorStop(.55, 'rgba(10,10,14,.82)'); g.addColorStop(1, 'rgba(10,10,14,0.1)');
      c.save(); c.beginPath(); c.ellipse(0, hy + 12, 43, 47, 0, 0, 7); c.clip(); c.fillStyle = g; c.fillRect(-50, hy - 40, 100, 110); c.restore();
      const lk = (o.look || 0) * 6, glow = o.glow || 0;
      for (const sx of [-16, 16]) {
        c.save();
        if (glow) { c.shadowColor = 'rgba(255,255,255,.9)'; c.shadowBlur = 25 * glow; }
        ell(c, sx, hy + 4, 10, 6.5, '#F4F1EA'); c.restore();
        circ(c, sx + lk, hy + 4, 4, '#111');
      }
      c.fillStyle = 'rgba(60,40,35,.7)'; c.fillRect(-9, hy + 34, 18, 3);
    }
    c.lineWidth = 5; c.strokeStyle = '#2B2E35'; c.beginPath(); c.arc(0, hy + 2, 64, Math.PI * 1.08, Math.PI * 1.92); c.stroke();
  } else {
    if (kind === 'halina') { circ(c, 0, hy - 6, 56, '#8C7B6B'); }
    if (kind === 'sasiad') { fillRR(c, -50, hy + 26, 100, 40, 18, '#262A33'); }
    if (kind === 'ola') { circ(c, 0, hy - 4, 58, '#7B4FC9'); fillRR(c, -58, hy - 10, 116, 70, 24, '#7B4FC9'); }
    if (kind === 'kobieta') { circ(c, 0, hy - 4, 58, '#3B2A22'); fillRR(c, -60, hy - 10, 120, 120, 26, '#3B2A22'); }
    if (kind !== 'ola' && kind !== 'kobieta' && kind !== 'halina') { circ(c, -49, hy + 4, 11, shade(k.skin, -.12)); circ(c, 49, hy + 4, 11, shade(k.skin, -.12)); }
    circ(c, 0, hy, 50, k.skin);
    c.save(); c.beginPath(); c.arc(0, hy, 50, 0, 7); c.clip(); c.fillStyle = 'rgba(0,0,0,.08)'; c.beginPath(); c.arc(20, hy + 8, 50, 0, 7); c.fill(); c.restore();
    if (back_) { /* tył głowy */ }
    else {
      const lk = (o.look || 0) * 7 + (idle ? 2.5 * Math.sin(t * 0.45 + seed * 2) : 0), ly = (o.lookY || 0) * 5 + (idle ? 1.2 * Math.sin(t * 0.33 + seed) : 0);
      const blink = o.blink || ((t * 1000 + x * 37) % 3900) < 110;
      if (kind === 'kuba' || kind === 'halina' || kind === 'ola' || kind === 'kobieta') { ell(c, -27, hy + 16, 9, 6, 'rgba(240,110,110,.35)'); ell(c, 27, hy + 16, 9, 6, 'rgba(240,110,110,.35)'); }
      if (o.squint) { c.strokeStyle = '#1E1E24'; c.lineWidth = 5; for (const sx of [-17, 17]) { c.beginPath(); c.moveTo(sx - 9 + lk, hy - 2); c.lineTo(sx + 9 + lk, hy - 2); c.stroke(); } }
      else if (blink) { c.strokeStyle = '#1E1E24'; c.lineWidth = 4; for (const sx of [-17, 17]) { c.beginPath(); c.moveTo(sx - 6, hy - 2); c.lineTo(sx + 6, hy - 2); c.stroke(); } }
      else for (const sx of [-17, 17]) { circ(c, sx + lk, hy - 2 + ly, o.wide ? 8 : 6, '#1E1E24'); circ(c, sx + lk + 2, hy - 4 + ly, 2, 'rgba(255,255,255,.85)'); }
      if (kind !== 'zdzisiek' && kind !== 'halina') { c.strokeStyle = 'rgba(40,28,24,.75)'; c.lineWidth = 3.5; c.lineCap = 'round'; const br = o.mouth === 'angry' ? 6 : o.wide ? -5 : 0;
        for (const sd of [-1, 1]) { c.beginPath(); c.moveTo(sd * 25, hy - 17 + (o.mouth === 'angry' ? -3 : 0)); c.lineTo(sd * 10, hy - 18 + br); c.stroke(); } }
      if (kind !== 'zdzisiek') ell(c, 2, hy + 12, 5, 4, shade(k.skin, -.18));
      if (kind === 'zdzisiek') {
        c.strokeStyle = '#3A2A22'; c.lineWidth = 6;
        for (const sx of [-17, 17]) { c.beginPath(); c.moveTo(sx - 12, hy - 18 + (o.squint ? 4 : 0)); c.lineTo(sx + 12, hy - 16); c.stroke(); }
        ell(c, -26, hy + 14, 10, 7, 'rgba(225,70,70,.45)'); ell(c, 26, hy + 14, 10, 7, 'rgba(225,70,70,.45)');
        for (let i = 0; i < 14; i++) circ(c, -24 + hash(i) * 48, hy + 30 + hash(i + 9) * 14, 1.6, 'rgba(60,40,30,.45)');
      }
      if (kind === 'halina') {
        c.strokeStyle = '#3A2E40'; c.lineWidth = 3.5;
        for (const sx of [-17, 17]) { c.beginPath(); c.arc(sx, hy - 2, 13, 0, 7); c.stroke(); }
        c.beginPath(); c.moveTo(-4, hy - 2); c.lineTo(4, hy - 2); c.stroke();
      }
      // usta
      const my = hy + 26;
      if (o.talk) { const oh = 4 + 6 * Math.abs(Math.sin(t * 17 + x)); ell(c, 0, my, 9, oh, '#6B2B2B'); }
      else if (o.mouth === 'o') ell(c, 0, my, 8, 10, '#6B2B2B');
      else if (o.mouth === 'angry') { c.strokeStyle = '#6B2B2B'; c.lineWidth = 4; c.beginPath(); c.arc(0, my + 10, 11, Math.PI * 1.2, Math.PI * 1.8); c.stroke(); }
      else if (o.mouth === 'smile') { c.strokeStyle = '#6B2B2B'; c.lineWidth = 4; c.beginPath(); c.arc(0, my - 6, 11, 0.2 * Math.PI, 0.8 * Math.PI); c.stroke(); }
      else { c.fillStyle = '#6B2B2B'; c.fillRect(-8, my - 2, 16, 4); }
      if (kind === 'zdzisiek') circ(c, 0, hy + 12, 10, '#E04848');
    }
    if (o.headphones) {
      c.strokeStyle = '#15161A'; c.lineWidth = 10; c.beginPath(); c.arc(0, hy - 6, 60, Math.PI * 1.08, Math.PI * 1.92); c.stroke();
      fillRR(c, -66, hy - 18, 22, 44, 10, '#15161A'); fillRR(c, 44, hy - 18, 22, 44, 10, '#15161A');
      fillRR(c, -63, hy - 10, 6, 26, 3, '#3FD0FF'); fillRR(c, 57, hy - 10, 6, 26, 3, '#3FD0FF');
    }
    // nakrycia głowy
    if (kind === 'kuba') {
      c.beginPath(); c.arc(0, hy - 16, 53, Math.PI, 0); c.fillStyle = '#F39C12'; c.fill();
      c.fillStyle = 'rgba(0,0,0,.1)'; c.beginPath(); c.arc(0, hy - 16, 53, Math.PI * 1.5, 0); c.lineTo(0, hy - 16); c.fill();
      fillRR(c, -56, hy - 30, 112, 22, 10, '#E08A0B');
      for (let i = 0; i < 7; i++) c.fillRect(-48 + i * 15, hy - 28, 3, 18);
      circ(c, 0, hy - 72, 15, '#F7B23B');
    } else if (kind === 'kurier') {
      c.beginPath(); c.arc(0, hy - 18, 51, Math.PI, 0); c.fillStyle = '#2C3E66'; c.fill();
      fillRR(c, -54, hy - 26, back_ ? 108 : 124, 14, 7, '#22335A');
    } else if (kind === 'zdzisiek') {
      ell(c, 0, hy - 30, 54, 24, '#3B3B3B'); fillRR(c, -50, hy - 22, 116, 12, 6, '#2E2E2E');
    } else if (kind === 'sasiad') {
      c.beginPath(); c.arc(0, hy - 24, 51, Math.PI, 0); c.fillStyle = '#231B17'; c.fill(); fillRR(c, -52, hy - 30, 40, 22, 8, '#231B17');
    } else if (kind === 'policjant') {
      fillRR(c, -54, hy - 70, 108, 46, 10, '#1F2C4C'); fillRR(c, -56, hy - 30, 120, 12, 6, '#0E1530'); circ(c, 0, hy - 50, 10, '#D9B84A');
    } else if (kind === 'ola') {
      c.beginPath(); c.arc(0, hy - 26, 50, Math.PI, 0); c.fillStyle = '#7B4FC9'; c.fill();
      fillRR(c, -50, hy - 34, 64, 18, 9, '#7B4FC9');
    } else if (kind === 'kobieta') {
      c.beginPath(); c.arc(0, hy - 28, 50, Math.PI, 0); c.fillStyle = '#3B2A22'; c.fill();
    } else if (kind === 'halina') {
      c.beginPath(); c.arc(0, hy - 10, 52, Math.PI, 0); c.fillStyle = '#8C7B6B'; c.fill();
      const cols = ['#F28AB2', '#7EC8E3', '#F28AB2', '#7EC8E3'];
      for (let i = 0; i < 4; i++) { c.save(); c.translate(-36 + i * 24, hy - 50 + Math.abs(i - 1.5) * 8); c.rotate(0.2 * (i - 1.5)); fillRR(c, -11, -9, 22, 18, 7, cols[i]); c.restore(); }
    }
  }
  c.restore();
  c.restore();
}

// ---------- noc: ciemność z punktami światła ----------
let _nightCv = null;
function night(c, dark, lights = []) {
  if (!_nightCv) { _nightCv = document.createElement('canvas'); _nightCv.width = W; _nightCv.height = H; }
  const n = _nightCv.getContext('2d');
  n.setTransform(1, 0, 0, 1, 0, 0); n.globalCompositeOperation = 'source-over'; n.clearRect(0, 0, W, H);
  n.fillStyle = `rgba(3,5,14,${dark})`; n.fillRect(0, 0, W, H);
  n.globalCompositeOperation = 'destination-out';
  for (const L of lights) {
    const g = n.createRadialGradient(L.x, L.y, 0, L.x, L.y, L.r);
    g.addColorStop(0, `rgba(0,0,0,${L.a ?? 1})`); g.addColorStop(1, 'rgba(0,0,0,0)');
    n.fillStyle = g; n.fillRect(L.x - L.r, L.y - L.r, L.r * 2, L.r * 2);
  }
  c.save(); c.setTransform(1, 0, 0, 1, 0, 0); c.drawImage(_nightCv, 0, 0); c.restore();
  for (const L of lights) if (L.tint) { const g = c.createRadialGradient(L.x, L.y, 0, L.x, L.y, L.r); g.addColorStop(0, L.tint); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(L.x - L.r, L.y - L.r, L.r * 2, L.r * 2); }
}
function stairsUp(c, x0 = 330, y0 = 1400, n = 9, st = 38) {
  c.fillStyle = '#5B5752';
  c.beginPath(); c.moveTo(0, y0); c.lineTo(x0, y0);
  for (let i = 0; i < n; i++) { const sx = x0 - i * st, sy = y0 - i * st; c.lineTo(sx, sy - st); c.lineTo(sx - st, sy - st); }
  c.lineTo(0, y0 - n * st); c.closePath(); c.fill();
  c.strokeStyle = '#77726B'; c.lineWidth = 4; c.beginPath();
  for (let i = 0; i < n; i++) { const sx = x0 - i * st, sy = y0 - i * st; c.moveTo(sx, sy - st); c.lineTo(sx - st, sy - st); }
  c.stroke();
  c.strokeStyle = '#2E2B28'; c.lineWidth = 9; c.beginPath(); c.moveTo(x0 + 30, y0 - 250); c.lineTo(0, y0 - 610); c.stroke();
}

// ---------- tła ----------
function quilted(c, x, y, w, h, base = '#6B4A2F', line = '#583B24', dot = '#C9A15A', step = 64) {
  c.save(); rr(c, x, y, w, h, 0); c.clip();
  c.fillStyle = base; c.fillRect(x, y, w, h);
  c.strokeStyle = line; c.lineWidth = 3;
  c.beginPath();
  for (let i = -h; i < w + h; i += step) { c.moveTo(x + i, y); c.lineTo(x + i + h, y + h); c.moveTo(x + i, y + h); c.lineTo(x + i + h, y); }
  c.stroke();
  for (let i = -h; i < w + h; i += step) for (let j = 0; j <= h; j += step) {
    circ(c, x + i + j, y + j, 4, dot);
    circ(c, x + i + j + step / 2, y + j + step / 2, 4, dot);
  }
  c.restore();
}
function paddedDoor(c, x, y, w, h, num, o = {}) {
  fillRR(c, x - 16, y - 16, w + 32, h + 16, 4, '#3C2A1C');
  quilted(c, x, y, w, h, '#6E4B2E', '#5A3C23', '#C9A15A', 70);
  // wizjer
  circ(c, x + w / 2, y + h * 0.3, 14, '#2A2420'); circ(c, x + w / 2, y + h * 0.3, 8, o.peepDark ? '#050505' : '#9FB4C4');
  // numer
  fillRR(c, x + w / 2 - 44, y + h * 0.18 - 26, 88, 52, 26, '#C9A15A');
  txt(c, num, x + w / 2, y + h * 0.18, 34, '#3A2A1A', 900);
  // klamka + zamek
  c.save(); c.translate(x + w - 60, y + h * 0.52 + 7); c.rotate(o.handle || 0); fillRR(c, -10, -7, 50, 14, 7, '#C9CDD2'); c.restore();
  circ(c, x + w - 46, y + h * 0.52 + 50, 9, '#C9CDD2');
}
function lobbyBg(c, t, o = {}) {
  // ściany
  c.fillStyle = '#B9B6A6'; c.fillRect(0, 0, W, 1100);
  c.fillStyle = '#3F5E4A'; c.fillRect(0, 1060, W, 340);
  c.fillStyle = '#2F4838'; c.fillRect(0, 1056, W, 8);
  // brud / pęknięcia
  c.strokeStyle = 'rgba(40,50,40,.35)'; c.lineWidth = 2;
  c.beginPath(); c.moveTo(860, 1120); c.lineTo(880, 1160); c.lineTo(870, 1200); c.moveTo(150, 1300); c.lineTo(180, 1330); c.stroke();
  // podłoga szachownica
  const fy = 1400;
  for (let r = 0; r < 8; r++) for (let q = 0; q < 14; q++) {
    c.fillStyle = (r + q) % 2 ? '#3A3530' : '#2C2824';
    c.fillRect(q * 80 - (r % 2) * 40, fy + r * 70, 80, 70);
  }
  c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(0, fy, W, 18);
  // lampa
  fillRR(c, 380, 250, 320, 26, 13, '#E8EDE6');
  const g = c.createRadialGradient(540, 270, 20, 540, 270, 700);
  g.addColorStop(0, 'rgba(255,250,220,.28)'); g.addColorStop(1, 'rgba(255,250,220,0)');
  c.fillStyle = g; c.fillRect(0, 0, W, 1400);
  // schody po lewej
  c.fillStyle = '#5B5752';
  c.beginPath(); c.moveTo(0, 1400); c.lineTo(330, 1400);
  for (let i = 0; i < 9; i++) { const sx = 330 - i * 38, sy = 1400 - i * 38; c.lineTo(sx, sy - 38); c.lineTo(sx - 38, sy - 38); }
  c.lineTo(0, 1400 - 9 * 38); c.closePath(); c.fill();
  c.strokeStyle = '#77726B'; c.lineWidth = 4; c.beginPath();
  for (let i = 0; i < 9; i++) { const sx = 330 - i * 38, sy = 1400 - i * 38; c.moveTo(sx, sy - 38); c.lineTo(sx - 38, sy - 38); }
  c.stroke();
  c.strokeStyle = '#2E2B28'; c.lineWidth = 9; c.beginPath(); c.moveTo(360, 1150); c.lineTo(0, 790); c.stroke();
  c.lineWidth = 4; c.beginPath(); for (let i = 0; i < 9; i++) { const bx = 350 - i * 40; c.moveTo(bx, 1140 - i * 40); c.lineTo(bx, 1395 - i * 38); } c.stroke();
  // tablica ogłoszeń
  fillRR(c, 70, 520, 190, 150, 6, '#B8925A');
  c.save(); c.translate(100, 540); c.rotate(-0.05); fillRR(c, 0, 0, 70, 90, 2, '#F2EEDF'); c.restore();
  fillRR(c, 180, 548, 60, 70, 2, '#E9E3CF');
  // skrzynki
  for (let i = 0; i < 3; i++) for (let j = 0; j < 4; j++) {
    fillRR(c, 820 + j * 52, 880 + i * 62, 48, 56, 3, '#8E959C');
    c.fillStyle = '#6E757C'; c.fillRect(828 + j * 52, 892 + i * 62, 32, 6);
  }
  // winda
  const ex = 380, ew = 330, ey = 640;
  fillRR(c, ex - 26, ey - 26, ew + 52, 1400 - ey + 26, 6, '#8C939C');
  const p = o.elevOpen || 0;
  // kabina
  c.fillStyle = '#6E7680'; c.fillRect(ex, ey, ew, 1400 - ey);
  const cg = c.createLinearGradient(0, ey, 0, 1400); cg.addColorStop(0, 'rgba(255,255,230,.35)'); cg.addColorStop(1, 'rgba(0,0,0,.2)');
  c.fillStyle = cg; c.fillRect(ex, ey, ew, 1400 - ey);
  c.fillStyle = '#9AA2AB'; c.fillRect(ex + 20, ey + 380, ew - 40, 10);
  if (o.inCab) o.inCab(c);
  const dw = ew / 2 * (1 - p);
  const dg = c.createLinearGradient(ex, 0, ex + ew, 0); dg.addColorStop(0, '#A9B1BA'); dg.addColorStop(.5, '#C3CAD1'); dg.addColorStop(1, '#A3ABB4');
  c.fillStyle = dg; c.fillRect(ex, ey, dw, 1400 - ey); c.fillRect(ex + ew - dw, ey, dw, 1400 - ey);
  c.fillStyle = '#7D858E'; c.fillRect(ex + dw - 2, ey, 4, 1400 - ey); c.fillRect(ex + ew - dw - 2, ey, 4, 1400 - ey);
  // wyświetlacz
  fillRR(c, 495, 540, 100, 60, 8, '#16181C');
  txt(c, o.floor ?? '0', 545, 572, 40, '#FF3B30', 900);
  // przycisk przywołania
  fillRR(c, 740, 980, 40, 70, 6, '#7F868E'); circ(c, 760, 1015, 10, o.callLit ? '#FFB020' : '#C9CDD2');
}
function corridorBg(c, t, o = {}) {
  c.fillStyle = '#B3B0A0'; c.fillRect(0, 0, W, 1060);
  c.fillStyle = '#3E5A47'; c.fillRect(0, 1050, W, 350);
  c.fillStyle = '#2E4636'; c.fillRect(0, 1046, W, 8);
  for (let r = 0; r < 8; r++) for (let q = 0; q < 14; q++) { c.fillStyle = (r + q) % 2 ? '#3A3530' : '#2C2824'; c.fillRect(q * 80 - (r % 2) * 40, 1400 + r * 70, 80, 70); }
  // lampa (migocze)
  const fl = 0.75 + 0.25 * (hash(Math.floor(t * 12)) > 0.15 ? 1 : 0);
  fillRR(c, 420, 230, 240, 22, 11, '#E8EDE6');
  const g = c.createRadialGradient(540, 250, 20, 540, 250, 760);
  g.addColorStop(0, `rgba(255,248,215,${0.3 * fl})`); g.addColorStop(1, 'rgba(255,248,215,0)');
  c.fillStyle = g; c.fillRect(0, 0, W, 1400);
  // winda po lewej
  fillRR(c, -60, 600, 230, 800, 4, '#8C939C'); c.fillStyle = '#B3BAC2'; c.fillRect(-40, 630, 190, 770); c.fillStyle = '#7D858E'; c.fillRect(54, 630, 4, 770);
  fillRR(c, 30, 520, 90, 54, 8, '#16181C'); txt(c, o.floor || '7', 75, 548, 36, '#FF3B30', 900);
  // drzwi 72 po prawej
  paddedDoor(c, 930, 560, 300, 840, o.num2 || '72');
  // skrzynka z licznikami i gaśnica
  fillRR(c, 760, 300, 130, 180, 6, '#8E969E'); c.fillStyle = '#6F777F'; c.fillRect(770, 310, 110, 4); fillRR(c, 860, 380, 12, 30, 4, '#3A3F46');
  fillRR(c, 210, 1240, 40, 110, 14, '#C0392B'); fillRR(c, 220, 1220, 20, 26, 4, '#2A2D36');
  // drzwi 71
  const dx = 330, dy = 560, dw = 380, dh = 840;
  if (o.open) {
    fillRR(c, dx - 16, dy - 16, dw + 32, dh + 16, 4, '#3C2A1C');
    const ig = c.createLinearGradient(0, dy, 0, dy + dh); ig.addColorStop(0, '#F6D58E'); ig.addColorStop(1, '#C98F45');
    c.fillStyle = ig; c.fillRect(dx, dy, dw, dh);
    c.fillStyle = 'rgba(120,70,30,.35)'; c.fillRect(dx + 40, dy + 120, 120, 200); // obrazek
    // skrzydło drzwi otwarte do środka
    c.fillStyle = '#5A3C23'; c.beginPath(); c.moveTo(dx, dy); c.lineTo(dx + 70, dy + 40); c.lineTo(dx + 70, dy + dh - 30); c.lineTo(dx, dy + dh); c.fill();
    fillRR(c, dx + dw / 2 - 44, dy - 70, 88, 48, 24, '#C9A15A'); txt(c, o.num || '71', dx + dw / 2, dy - 46, 30, '#3A2A1A', 900);
    // światło na podłogę
    c.fillStyle = 'rgba(246,213,142,.25)'; c.beginPath(); c.moveTo(dx, 1400); c.lineTo(dx + dw, 1400); c.lineTo(dx + dw + 160, 1920); c.lineTo(dx - 160, 1920); c.fill();
  } else paddedDoor(c, dx, dy, dw, dh, o.num || '71', { peepDark: o.peepDark });
}
function entranceBg(c, t, o = {}) {
  // ściana bloku nocą
  c.fillStyle = '#323A50'; c.fillRect(0, 0, W, H);
  for (let i = 0; i < 26; i++) { c.fillStyle = 'rgba(0,0,0,.08)'; c.fillRect(0, i * 60, W, 2); }
  // drzwi wejściowe
  const dx = 330, dy = 600, dw = 420, dh = 860;
  fillRR(c, dx - 30, dy - 30, dw + 60, dh + 30, 6, '#5B6475');
  const p = o.doorOpen || 0;
  // wnętrze (zawsze pod spodem)
  const ig = c.createLinearGradient(0, dy, 0, dy + dh); ig.addColorStop(0, '#E8E2C8'); ig.addColorStop(1, '#8F8A70');
  c.fillStyle = ig; c.fillRect(dx, dy, dw, dh);
  c.fillStyle = '#3F5E4A'; c.fillRect(dx, dy + dh * 0.6, dw, dh * 0.4);
  // skrzydło
  const lw = dw * (1 - p * 0.82);
  c.fillStyle = '#4A5263'; c.fillRect(dx, dy, lw, dh);
  if (lw > 60) {
    c.fillStyle = 'rgba(232,226,200,.85)'; c.fillRect(dx + 30, dy + 40, lw - 60, dh * 0.5);
    c.strokeStyle = '#4A5263'; c.lineWidth = 8; c.beginPath(); c.moveTo(dx + lw / 2, dy + 40); c.lineTo(dx + lw / 2, dy + 40 + dh * .5); c.stroke();
    fillRR(c, dx + lw - 50, dy + dh * 0.6, 16, 90, 8, '#C9CDD2');
  }
  if (o.ghost) { // KAPTUR odbity w szybie (easter egg)
    c.save(); c.globalAlpha = o.ghost; c.translate(dx + 120, dy + 540); c.scale(.55, .55); person(c, 'kaptur', 0, 0, 1, { t }); c.restore();
  }
  // tabliczka
  fillRR(c, 470, 470, 140, 50, 6, '#2F5DA8'); txt(c, 'KLATKA II', 540, 495, 24, '#FFFFFF', 800);
  // lampa
  fillRR(c, 500, 420, 80, 30, 8, '#DDE3E8');
  const g = c.createRadialGradient(540, 440, 10, 540, 700, 700);
  g.addColorStop(0, 'rgba(255,240,190,.55)'); g.addColorStop(1, 'rgba(255,240,190,0)');
  c.fillStyle = g; c.fillRect(0, 300, W, 1400);
  // domofon
  fillRR(c, 800, 880, 100, 200, 8, '#9AA1A8'); fillRR(c, 812, 896, 76, 34, 4, '#2D5F3E');
  for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) circ(c, 822 + j * 28, 952 + i * 30, 9, '#D9DDE1');
  // kosze
  fillRR(c, -40, 1180, 170, 260, 10, '#2E6B3F'); fillRR(c, -50, 1160, 190, 34, 8, '#245633');
  // chodnik + śnieg
  c.fillStyle = '#1B2030'; c.fillRect(0, 1460, W, 460);
  c.fillStyle = '#DCE4EE'; c.fillRect(0, 1450, W, 22);
  for (let i = 0; i < 12; i++) ell(c, hash(i + 70) * W, 1470, 60 + hash(i) * 60, 14, '#DCE4EE');
}
function blockBg(c, t, o = {}) {
  const sky = c.createLinearGradient(0, 0, 0, H); sky.addColorStop(0, '#070A16'); sky.addColorStop(1, '#1B2338');
  c.fillStyle = sky; c.fillRect(0, 0, W, H);
  for (let i = 0; i < 70; i++) { const tw = 0.5 + 0.5 * Math.sin(t * 2 + i); circ(c, hash(i) * W, hash(i + 5) * 600, 1 + hash(i + 2) * 2, `rgba(255,255,255,${0.3 + 0.5 * tw})`); }
  // księżyc
  circ(c, 860, 300, 46, '#F3EED8'); circ(c, 884, 284, 42, '#0B0F1E');
  // blok
  const bx = 110, by = 400, bw = 860, bh = 1100, cols = 8, rows = 11;
  c.fillStyle = '#2A3350'; c.fillRect(bx, by, bw, bh);
  c.fillStyle = '#323C5C'; c.fillRect(bx, by, bw, 18);
  const cw = bw / cols, rh = (bh - 120) / rows;
  for (let r = 0; r < rows; r++) for (let q = 0; q < cols; q++) {
    const floor = 10 - r;
    let col = '#161C2E';
    const hv = hash(r * 13 + q * 7);
    if (o.night ? hv > 0.975 : hv > 0.86) col = '#F2C14E'; else if (!o.night && hv > 0.8) col = '#7FB2E5';
    if (floor === 9 && q === 5) col = o.off94 ? '#161C2E' : o.night ? '#5C7FB8' : '#F7C948';
    if (floor === 0 && (q === 3 || q === 4)) continue;
    fillRR(c, bx + q * cw + 18, by + 40 + r * rh, cw - 36, rh - 34, 3, col);
  }
  // wejście
  c.fillStyle = '#C9C2A0'; c.fillRect(bx + 3 * cw + 20, by + bh - 150, 2 * cw - 40, 150);
  fillRR(c, bx + 3 * cw, by + bh - 175, 2 * cw, 26, 4, '#46506E');
  const g = c.createRadialGradient(540, by + bh - 160, 10, 540, by + bh - 80, 360);
  g.addColorStop(0, 'rgba(255,235,170,.45)'); g.addColorStop(1, 'rgba(255,235,170,0)'); c.fillStyle = g; c.fillRect(0, by + bh - 500, W, 700);
  // drzewa
  for (const [tx, ty, r] of [[60, 1300, 130], [150, 1380, 100], [1010, 1330, 140], [930, 1420, 90]]) circ(c, tx, ty, r, '#0D1220');
  // ziemia
  c.fillStyle = '#121725'; c.fillRect(0, by + bh, W, H - by - bh);
  c.fillStyle = '#C9D3E0'; c.fillRect(0, by + bh, W, 16);
  // samochód
  fillRR(c, 90, 1530, 260, 70, 22, '#2B3247'); fillRR(c, 140, 1490, 150, 60, 20, '#2B3247'); circ(c, 145, 1600, 22, '#0A0C12'); circ(c, 295, 1600, 22, '#0A0C12');
  // lampa uliczna
  c.fillStyle = '#20263A'; c.fillRect(800, 1150, 10, 370); fillRR(c, 770, 1140, 70, 16, 8, '#3A4360');
  const lg = c.createRadialGradient(805, 1160, 5, 805, 1300, 260); lg.addColorStop(0, 'rgba(255,220,150,.35)'); lg.addColorStop(1, 'rgba(255,220,150,0)'); c.fillStyle = lg; c.fillRect(500, 1100, 600, 500);
  return { bx, by, cw, rh };
}
function snow(c, t, n = 110, a = 0.8) {
  for (let i = 0; i < n; i++) {
    const sp = 70 + hash(i + 9) * 110;
    const x = ((hash(i) * W + Math.sin(t * 0.9 + i) * 26 + t * 18) % W + W) % W;
    const y = (hash(i + 50) * H + t * sp) % H;
    circ(c, x, y, 2 + hash(i + 3) * 4, `rgba(235,242,255,${a * (0.4 + hash(i + 4) * 0.6)})`);
  }
}
function unifon(c, x, y, w, h, o = {}) {
  c.save();
  c.shadowColor = 'rgba(0,0,0,.5)'; c.shadowBlur = 40; c.shadowOffsetY = 16;
  fillRR(c, x, y, w, h, w * 0.08, '#E6E0D2'); c.shadowColor = 'transparent';
  fillRR(c, x + w * .04, y + w * .04, w * .92, h - w * .08, w * .06, '#DDD6C6');
  const sx = x + w * .1, sy = y + w * .1, sw = w * .8, sh = sw * .72;
  fillRR(c, sx - 8, sy - 8, sw + 16, sh + 16, 14, '#2A2C30');
  c.save(); rr(c, sx, sy, sw, sh, 8); c.clip();
  c.fillStyle = '#05070A'; c.fillRect(sx, sy, sw, sh);
  if (o.feed) o.feed(c, sx, sy, sw, sh);
  c.restore();
  // głośnik
  for (let i = 0; i < 4; i++) for (let j = 0; j < 9; j++) circ(c, x + w / 2 - 4 * w * .045 * 2 + j * w * .045 * 1, y + sh + w * .26 + i * w * .045, w * .011, '#9C9483');
  // przycisk z kluczem
  const bx = x + w / 2, by = y + h - w * .36, br = w * .14;
  if (o.glow) { c.save(); c.shadowColor = 'rgba(80,255,140,.9)'; c.shadowBlur = 60 * o.glow; circ(c, bx, by, br, '#3FA066'); c.restore(); }
  circ(c, bx, by + (o.pressed ? 0 : 5), br, '#2B6E46');
  circ(c, bx, by + (o.pressed ? 4 : 0), br * .93, o.pressed ? '#2E8A55' : '#3FA066');
  // ikona klucza
  c.save(); c.translate(bx, by + (o.pressed ? 4 : 0)); c.strokeStyle = '#FFFFFF'; c.lineWidth = br * .12;
  c.beginPath(); c.arc(-br * .3, 0, br * .22, 0, 7); c.stroke();
  c.beginPath(); c.moveTo(-br * .08, 0); c.lineTo(br * .45, 0); c.moveTo(br * .3, 0); c.lineTo(br * .3, br * .2); c.moveTo(br * .44, 0); c.lineTo(br * .44, br * .16); c.stroke();
  c.restore();
  c.restore();
  return [bx, by];
}
function feedEntrance(t, opt = {}) {
  return (c, sx, sy, sw, sh) => {
    c.save(); c.translate(sx, sy); const sc = sw / 600; c.scale(sc, sc); c.translate(-240, -(opt.y0 ?? 1000));
    entranceBg(c, t, { doorOpen: opt.doorOpen || 0 });
    if (opt.courier !== false) person(c, 'kurier', opt.cx ?? 540, 1490, 1.55, { box: opt.box ?? true, t, talk: opt.talk, look: opt.look ?? 0, alpha: opt.calpha ?? 1 });
    snow(c, t, 50, .7);
    c.restore();
    c.save(); c.globalCompositeOperation = 'multiply'; c.fillStyle = '#9FD8C4'; c.fillRect(sx, sy, sw, sh); c.restore();
    c.fillStyle = 'rgba(0,0,0,.18)'; for (let yy = sy; yy < sy + sh; yy += 5) c.fillRect(sx, yy, sw, 2);
    txt(c, 'CAM 1 · WEJŚCIE', sx + 16, sy + 24, sw * .045, '#DFFFEF', 700, 'left');
    if (Math.floor(t * 2) % 2) circ(c, sx + sw - 24, sy + 24, sw * .015, '#FF3B30');
  };
}
function hand(c, fx, fy, ang, k = KINDS.kuba) {
  c.save(); c.translate(fx, fy); c.rotate(ang);
  fillRR(c, 170, -70, 700, 140, 50, k.jacket);
  fillRR(c, 150, -78, 60, 156, 20, k.dark);
  fillRR(c, 40, -56, 150, 112, 46, k.skin);
  fillRR(c, -6, -18, 90, 38, 19, k.skin);
  ell(c, 8, 0, 12, 13, '#F7C7A3');
  c.restore();
}


// ---------- tła nocne (ODC. 2+) ----------
function hallBg(c, t, o = {}) {
  c.fillStyle = '#3B3A44'; c.fillRect(0, 0, W, 1420);
  for (let i = 0; i < 20; i++) { c.fillStyle = 'rgba(0,0,0,.08)'; c.fillRect(i * 60, 0, 22, 1420); }
  c.fillStyle = 'rgba(255,255,255,.035)'; for (let y = 60; y < 1380; y += 120) for (let x = 30 + ((y / 120) % 2) * 30; x < W; x += 60) { c.beginPath(); c.moveTo(x, y - 12); c.lineTo(x + 8, y); c.lineTo(x, y + 12); c.lineTo(x - 8, y); c.fill(); }
  c.fillStyle = '#2E241C'; c.fillRect(0, 1420, W, 500);
  for (let r = 0; r < 12; r++) for (let q = -1; q < 12; q++) { c.fillStyle = (r + q) % 2 ? 'rgba(0,0,0,.14)' : 'rgba(255,255,255,.025)'; c.save(); c.translate(q * 100 + (r % 2) * 50, 1430 + r * 44); c.fillRect(0, 0, 96, 40); c.restore(); }
  fillRR(c, 0, 1396, W, 28, 0, '#241B14'); c.fillStyle = 'rgba(255,255,255,.06)'; c.fillRect(0, 1396, W, 3);
  // kinkiet z ciepłym światłem
  fillRR(c, 64, 560, 56, 20, 6, '#6B5A44'); c.beginPath(); c.moveTo(70, 580); c.lineTo(114, 580); c.lineTo(126, 640); c.lineTo(58, 640); c.closePath(); c.fillStyle = '#E9D9A8'; c.fill();
  { const lg = c.createRadialGradient(92, 620, 4, 92, 620, 260); lg.addColorStop(0, 'rgba(255,220,150,.28)'); lg.addColorStop(1, 'rgba(255,220,150,0)'); c.fillStyle = lg; c.fillRect(0, 360, 360, 520); }
  // lustro nad szafką
  fillRR(c, 650, 560, 150, 230, 70, '#6B5A44'); { const mg = c.createLinearGradient(660, 570, 790, 780); mg.addColorStop(0, '#7E8AA3'); mg.addColorStop(1, '#3E465C'); fillRR(c, 662, 572, 126, 206, 60, mg); } c.fillStyle = 'rgba(255,255,255,.18)'; c.fillRect(690, 600, 10, 140);
  // szafka na buty i buty
  fillRR(c, 640, 1300, 420, 104, 6, '#5A4632'); c.fillStyle = '#4A3828'; c.fillRect(648, 1350, 404, 4); fillRR(c, 836, 1312, 28, 10, 4, '#C9A15A');
  for (const [x, col] of [[680, '#20232B'], [740, '#B23A3A'], [930, '#2C3B5A'], [990, '#E8E4DA']]) { fillRR(c, x, 1282, 46, 20, 8, col); }
  // dywanik przed drzwiami
  if (!o.gap) { fillRR(c, 190, 1440, 400, 110, 10, '#7A2F2F'); c.strokeStyle = '#C9A15A'; c.lineWidth = 4; rr(c, 204, 1452, 372, 86, 6); c.stroke(); for (let i = 0; i < 9; i++) circ(c, 230 + i * 42, 1495, 6, '#C9A15A'); }
  // wieszak z kurtką Kuby
  c.fillStyle = '#5A4632'; c.fillRect(840, 540, 160, 16);
  fillRR(c, 860, 550, 60, 200, 20, '#6E7B3B'); fillRR(c, 930, 550, 50, 150, 20, '#E08A0B');
  const dx = 180, dy = 520, dw = 420, dh = 900;
  if (o.gap) { // drzwi uchylone na łańcuch
    fillRR(c, dx - 16, dy - 16, dw + 32, dh + 16, 4, '#2A1E14');
    const gx = dx + dw - o.gap;
    c.fillStyle = '#07080B'; c.fillRect(gx, dy, o.gap, dh);
    // słaba poświata klatki w szparze
    const g = c.createLinearGradient(gx, 0, gx + o.gap, 0); g.addColorStop(0, 'rgba(255,230,170,.0)'); g.addColorStop(1, 'rgba(255,230,170,.18)');
    c.fillStyle = g; c.fillRect(gx, dy, o.gap, dh);
    quilted(c, dx, dy, dw - o.gap, dh, '#5E4029', '#4D3420', '#B8914E', 70);
    // łańcuch
    if (!o.nochain) {
    const cy = dy + dh * 0.42, x1 = gx - 40, x2 = dx + dw + 20;
    fillRR(c, x2 - 6, cy - 22, 30, 44, 4, '#B9BDC2'); fillRR(c, x1 - 30, cy - 10, 40, 20, 4, '#B9BDC2');
    c.strokeStyle = '#D6DADF'; c.lineWidth = 6;
    for (let i = 0; i < 8; i++) { const xx = lerp(x1, x2, i / 8) + 10; c.beginPath(); c.ellipse(xx, cy + Math.sin(i + t * 20) * (o.rattle || 0), 12, 7, 0, 0, 7); c.stroke(); }
    }
  } else {
    paddedDoor(c, dx, dy, dw, dh, '94', { peepDark: true, handle: o.handle });
    if (o.locks) o.locks.forEach((ang, i) => { // gałki zamków od środka
      const lx = dx + dw - 60, ly = dy + dh * (0.4 + i * 0.2);
      circ(c, lx, ly, 26, '#B9BDC2'); circ(c, lx, ly, 20, '#9CA1A7');
      c.save(); c.translate(lx, ly); c.rotate(ang); fillRR(c, -6, -22, 12, 44, 5, '#E2E5E8'); c.restore();
    });
    // łańcuch zawieszony
    c.strokeStyle = '#C9CDD2'; c.lineWidth = 5;
    for (let i = 0; i < 6; i++) { c.beginPath(); c.ellipse(dx + dw - 10, dy + dh * .42 + i * 18, 6, 10, 0, 0, 7); c.stroke(); }
  }
  // pasek światła pod drzwiami
  const sy = dy + dh;
  c.fillStyle = o.gap ? '#000' : '#FFE7A8'; c.fillRect(dx + 6, sy - 6, dw - 12, 8);
  const lg = c.createLinearGradient(0, sy, 0, sy + 180); lg.addColorStop(0, 'rgba(255,225,160,.35)'); lg.addColorStop(1, 'rgba(255,225,160,0)');
  if (!o.gap) { c.fillStyle = lg; c.beginPath(); c.moveTo(dx, sy); c.lineTo(dx + dw, sy); c.lineTo(dx + dw + 90, sy + 180); c.lineTo(dx - 90, sy + 180); c.fill(); }
  if (o.feet) { // cienie stóp pod drzwiami
    c.fillStyle = `rgba(0,0,0,${o.feet})`;
    c.fillRect(dx + 120, sy - 6, 70, 8); c.fillRect(dx + 230, sy - 6, 70, 8);
    c.beginPath(); c.moveTo(dx + 120, sy); c.lineTo(dx + 190, sy); c.lineTo(dx + 210, sy + 170); c.lineTo(dx + 90, sy + 170); c.fill();
    c.beginPath(); c.moveTo(dx + 230, sy); c.lineTo(dx + 300, sy); c.lineTo(dx + 340, sy + 170); c.lineTo(dx + 220, sy + 170); c.fill();
  }
}
function peepPOV(c, t, inner) {
  c.fillStyle = '#050608'; c.fillRect(0, 0, W, H);
  quilted(c, 0, 0, W, H, '#1E150E', '#160F09', '#3A2C1A', 90);
  const cx = 540, cy = 900, r = 380;
  c.save(); c.beginPath(); c.arc(cx, cy, r, 0, 7); c.clip();
  c.fillStyle = '#000'; c.fillRect(cx - r, cy - r, r * 2, r * 2);
  if (inner) inner(c, cx, cy, r);
  const vg = c.createRadialGradient(cx, cy, r * .55, cx, cy, r); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,.85)');
  c.fillStyle = vg; c.fillRect(cx - r, cy - r, r * 2, r * 2);
  c.restore();
  c.strokeStyle = '#9C7B3E'; c.lineWidth = 26; c.beginPath(); c.arc(cx, cy, r + 10, 0, 7); c.stroke();
  c.strokeStyle = '#5C4522'; c.lineWidth = 6; c.beginPath(); c.arc(cx, cy, r + 25, 0, 7); c.stroke();
  txt(c, 'WIZJER', cx, cy + r + 70, 30, 'rgba(255,255,255,.55)', 800);
}
function tapeTexture(c, cx, cy, r, a = 1) {
  c.save(); c.globalAlpha = a;
  c.fillStyle = '#0B0A09'; c.fillRect(cx - r, cy - r, 2 * r, 2 * r);
  c.strokeStyle = 'rgba(255,255,255,.05)'; c.lineWidth = 2;
  for (let i = 0; i < 40; i++) { c.beginPath(); c.moveTo(cx - r + hash(i) * 2 * r, cy - r); c.lineTo(cx - r + hash(i + 3) * 2 * r, cy + r); c.stroke(); }
  c.restore();
}

function roomDecor(c) {
  // plakat i półka z książkami
  fillRR(c, 60, 360, 200, 270, 6, '#E9B52C'); fillRR(c, 72, 372, 176, 246, 4, '#7B4FC9'); circ(c, 160, 470, 46, '#F4C29C'); txt(c, 'BAND', 160, 580, 30, '#F4F1EA', 900);
  fillRR(c, 300, 700, 260, 14, 3, '#5A4632'); for (let i = 0; i < 7; i++) fillRR(c, 312 + i * 34, 600 + hash(i) * 30, 26, 100 - hash(i) * 30, 3, ['#D7263D', '#1BB0A3', '#F5C542', '#5C7DB5', '#E8E4DA', '#30A46C', '#E08A0B'][i]);
  // dywan
  ell(c, 540, 1600, 420, 90, '#3B2F4A'); ell(c, 540, 1600, 360, 70, '#4A3C5C');
}
const ROOM = (c) => {
  c.fillStyle = '#262B3D'; c.fillRect(0, 0, W, H);
  roomDecor(c);
  // okno z księżycem
  fillRR(c, 620, 380, 320, 420, 8, '#0D1222'); circ(c, 860, 470, 40, '#E8E4CF'); circ(c, 878, 458, 36, '#0D1222');
  c.fillStyle = '#3A4058'; c.fillRect(775, 380, 10, 420); c.fillRect(620, 585, 320, 10);
  for (let i = 0; i < 6; i++) fillRR(c, 650 + i * 45, 640 + hash(i) * 120, 22, 160, 3, '#141A2C');
  c.fillStyle = '#1F1A22'; c.fillRect(0, 1380, W, 540);
  // łóżko z kołdrą i poduszką
  fillRR(c, 80, 1100, 760, 330, 30, '#3D4A73'); fillRR(c, 80, 1100, 760, 40, 20, '#4A5888'); fillRR(c, 90, 1060, 220, 120, 40, '#D9DCE6');
  for (let i = 0; i < 6; i++) circ(c, 380 + i * 80, 1250, 10, 'rgba(255,255,255,.12)');
  // biurko i lampka
  fillRR(c, 880, 1080, 200, 24, 4, '#5A4632'); c.fillStyle = '#4A3828'; c.fillRect(900, 1104, 16, 300); c.fillRect(1050, 1104, 16, 300);
  fillRR(c, 960, 1000, 10, 80, 4, '#2A2D36'); c.beginPath(); c.moveTo(930, 1000); c.lineTo(1000, 1000); c.lineTo(985, 960); c.lineTo(945, 960); c.fillStyle = '#F5C542'; c.fill();
};

// ---------- telefon i czat (CZĘŚĆ 3+) ----------
function chat(c, lt, msgs) {
  bigPhone(c, (cc, x, y, w, h) => {
    cc.fillStyle = '#0F1014'; cc.fillRect(x, y, w, h);
    fillRR(cc, x, y, w, 170, 0, '#17181E');
    circ(cc, x + 90, y + 110, 40, '#2A2C33'); circ(cc, x + 90, y + 102, 14, '#55575F'); fillRR(cc, x + 68, y + 120, 44, 20, 10, '#55575F');
    txt(cc, 'k4ptur_94', x + 150, y + 100, 36, '#FFFFFF', 900, 'left'); txt(cc, 'aktywny(-a) teraz', x + 150, y + 140, 24, 'rgba(255,255,255,.55)', 600, 'left');
    let yy = y + 230;
    for (const [t0, type, text, mine] of msgs) {
      if (lt < t0) continue;
      const p = back(clamp((lt - t0) / .3));
      const bw = type === 'txt' ? Math.min(w - 120, 40 + text.length * 17) : 380, bh = type === 'txt' ? 96 : 420;
      const bx = mine ? x + w - 30 - bw : x + 30;
      cc.save(); cc.translate(bx + (mine ? bw : 0), yy); cc.scale(p, p); cc.translate(-(bx + (mine ? bw : 0)), -yy);
      if (type === 'txt') { fillRR(cc, bx, yy, bw, bh, 40, mine ? '#3B6FE0' : '#2A2C33'); txt(cc, text, bx + 28, yy + bh / 2, 30, '#FFFFFF', 600, 'left'); }
      else {
        fillRR(cc, bx, yy, bw, bh, 30, '#2A2C33');
        cc.save(); rr(cc, bx + 10, yy + 10, bw - 20, bh - 20, 24); cc.clip();
        if (type === 'door') {
          cc.fillStyle = '#8F8C80'; cc.fillRect(bx, yy, bw, bh);
          paddedDoor(cc, bx + 90, yy + 50, 200, 380, '94');
          fillRR(cc, bx + 250, yy + 230, 30, 40, 4, '#E8D27A'); // nowy zamek
        } else {
          cc.fillStyle = '#4A4844'; cc.fillRect(bx, yy, bw, bh);
          for (let i = 0; i < 40; i++) circ(cc, bx + hash(i) * bw, yy + hash(i + 9) * bh, 2 + hash(i + 3) * 3, 'rgba(0,0,0,.25)');
          cc.save(); cc.translate(bx + bw / 2, yy + bh / 2); cc.rotate(-.4);
          cc.strokeStyle = '#D6DADF'; cc.lineWidth = 8; cc.beginPath(); cc.arc(-40, 0, 34, 0, 7); cc.stroke();
          fillRR(cc, -6, -10, 130, 20, 6, '#CFD3D8'); fillRR(cc, 90, 10, 14, 20, 3, '#CFD3D8'); fillRR(cc, 60, 10, 14, 16, 3, '#CFD3D8');
          cc.rotate(.9); fillRR(cc, -110, -40, 70, 90, 12, '#F39C12'); txt(cc, '94', -75, 5, 40, '#14161B', 900); cc.restore();
        }
        cc.restore();
      }
      cc.restore();
      yy += bh + 26;
      if (mine && lt > t0 + 1.2) { txt(cc, 'Wyświetlono', x + w - 40, yy - 8, 22, 'rgba(255,255,255,.45)', 600, 'right'); yy += 20; }
    }
    fillRR(cc, x + 30, y + h - 120, w - 60, 80, 40, '#1C1D23'); txt(cc, 'Wiadomość…', x + 80, y + h - 80, 28, 'rgba(255,255,255,.4)', 600, 'left');
  });
}
function bigPhone(c, fn, a = 1, y = 300) {
  c.save(); c.globalAlpha *= a;
  const x = 230, w = 620, h = 1180;
  c.shadowColor = 'rgba(0,0,0,.7)'; c.shadowBlur = 50; fillRR(c, x, y, w, h, 70, '#0E0F12'); c.shadowColor = 'transparent';
  c.save(); rr(c, x + 22, y + 22, w - 44, h - 44, 52); c.clip(); fn(c, x + 22, y + 22, w - 44, h - 44); c.restore();
  fillRR(c, x + w / 2 - 70, y + 36, 140, 30, 15, '#0E0F12');
  c.restore();
}
