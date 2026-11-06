// BLOK 94 · ODC. 1 — "NIE OTWIERAJ KURIEROWI!"
// Cała animacja rysowana na canvasie 1080×1920. renderFrame(t) rysuje klatkę dla czasu t (sekundy).
'use strict';
const W = 1080, H = 1920, FPS = 30, DUR = 119;
const ERR = [19.0, 40.5, 59.5];          // momenty błędów (licznik BŁĘDY)
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
  let x = clamp(cx - w / 2, 40, 900 - w), y = by - h;
  const sc = age < 0.25 ? back(age / 0.25) : 1, al = clamp(left / 0.15);
  c.save(); c.globalAlpha *= al;
  const ox = tx, oy = ty; c.translate(ox, oy); c.scale(sc, sc); c.translate(-ox, -oy);
  c.shadowColor = 'rgba(0,0,0,.4)'; c.shadowBlur = 20; c.shadowOffsetY = 8;
  // ogonek
  const below = ty > y + h;
  const bx = clamp(tx, x + 50, x + w - 50);
  c.beginPath();
  if (below) { c.moveTo(bx - 22, y + h - 2); c.lineTo(bx + 22, y + h - 2); c.lineTo(lerp(bx, tx, .55), Math.min(ty - 20, y + h + 70)); }
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
};
function arm(c, sx, sy, a, side, k, len = 92) {
  c.save(); c.translate(sx, sy); c.rotate(-side * a);
  fillRR(c, -12, -8, 24, len + 8, 12, k.jacket);
  circ(c, 0, len + 2, 13, k.skin);
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
  if (o.rot) c.rotate(o.rot);
  c.scale(s * (o.flip ? -1 : 1), s * (o.squash ?? 1));
  const ph = o.walk;
  const sw = ph == null ? 0 : Math.sin(ph);
  const bob = ph == null ? Math.sin(t * 2.1 + x) * 1.5 : -Math.abs(sw) * 7;
  const aL = (o.aL ?? 0.14) + sw * 0.35, aR = (o.aR ?? 0.14) - sw * 0.35;
  // nogi
  if (kind !== 'halina') {
    for (const side of [-1, 1]) {
      const lift = Math.max(0, side * sw) * 14, dx = side * sw * 6;
      fillRR(c, side * 15 - 10 + dx, -86 - lift, 20, 82, 8, k.pants);
      fillRR(c, side * 15 - 13 + dx + (side > 0 ? 2 : -6), -12 - lift, 30, 13, 6, k.shoes);
    }
  } else {
    fillRR(c, -26, -12, 22, 12, 6, k.shoes); fillRR(c, 4, -12, 22, 12, 6, k.shoes);
    fillRR(c, -20, -34, 14, 24, 6, k.skin); fillRR(c, 6, -34, 14, 24, 6, k.skin);
  }
  c.translate(0, bob);
  const back_ = !!o.back;
  // ciało
  if (kind === 'halina') {
    rr(c, -48, -192, 96, 162, 26); c.fillStyle = k.jacket; c.fill();
    fillRR(c, -48, -120, 96, 12, 6, k.dark);
    c.fillStyle = k.dark; c.beginPath(); c.moveTo(-20, -190); c.lineTo(0, -140); c.lineTo(20, -190); c.fill();
  } else {
    fillRR(c, -45, -192, 90, 122, 24, k.jacket);
    if (kind === 'kuba') { c.fillStyle = k.dark; c.fillRect(-2, -180, 4, 104); }
    if (kind === 'kaptur' && !back_) { fillRR(c, -26, -128, 52, 30, 10, k.dark); }
    if (kind === 'kurier') {
      fillRR(c, -40, -186, 80, 104, 14, '#E8A33D');
      c.fillStyle = '#F6E7BE'; c.fillRect(-40, -134, 80, 9);
      c.fillStyle = '#C9862A'; c.fillRect(-2, -186, 4, 104);
    }
    if (kind === 'zdzisiek') { c.fillStyle = k.dark; c.fillRect(-2, -180, 4, 104); fillRR(c, -36, -110, 20, 16, 4, k.dark); }
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
  if (o.tool) { c.strokeStyle = '#D4D7DC'; c.lineWidth = 4; c.beginPath(); c.moveTo(hr[0], hr[1]); c.lineTo(hr[0] + 30, hr[1] - 26); c.stroke(); }
  // szalik / kołnierz
  if (kind === 'kuba') { fillRR(c, -36, -202, 72, 24, 11, '#1BB0A3'); if (!back_) fillRR(c, 12, -192, 18, 52, 8, '#169A8F'); }
  // głowa
  const hy = -242;
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
    circ(c, 0, hy, 50, k.skin);
    if (back_) { /* tył głowy */ }
    else {
      const lk = (o.look || 0) * 7, ly = (o.lookY || 0) * 5;
      const blink = o.blink || ((t * 1000 + x * 37) % 3900) < 110;
      if (kind === 'kuba' || kind === 'halina') { ell(c, -27, hy + 16, 9, 6, 'rgba(240,110,110,.35)'); ell(c, 27, hy + 16, 9, 6, 'rgba(240,110,110,.35)'); }
      if (o.squint) { c.strokeStyle = '#1E1E24'; c.lineWidth = 5; for (const sx of [-17, 17]) { c.beginPath(); c.moveTo(sx - 9 + lk, hy - 2); c.lineTo(sx + 9 + lk, hy - 2); c.stroke(); } }
      else if (blink) { c.strokeStyle = '#1E1E24'; c.lineWidth = 4; for (const sx of [-17, 17]) { c.beginPath(); c.moveTo(sx - 6, hy - 2); c.lineTo(sx + 6, hy - 2); c.stroke(); } }
      else for (const sx of [-17, 17]) circ(c, sx + lk, hy - 2 + ly, o.wide ? 8 : 6, '#1E1E24');
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
    // nakrycia głowy
    if (kind === 'kuba') {
      c.beginPath(); c.arc(0, hy - 8, 53, Math.PI, 0); c.fillStyle = '#F39C12'; c.fill();
      fillRR(c, -56, hy - 18, 112, 22, 10, '#E08A0B');
      circ(c, 0, hy - 64, 15, '#F7B23B');
    } else if (kind === 'kurier') {
      c.beginPath(); c.arc(0, hy - 18, 51, Math.PI, 0); c.fillStyle = '#2C3E66'; c.fill();
      fillRR(c, -54, hy - 26, back_ ? 108 : 124, 14, 7, '#22335A');
    } else if (kind === 'zdzisiek') {
      ell(c, 0, hy - 30, 54, 24, '#3B3B3B'); fillRR(c, -50, hy - 22, 116, 12, 6, '#2E2E2E');
    } else if (kind === 'halina') {
      c.beginPath(); c.arc(0, hy - 10, 52, Math.PI, 0); c.fillStyle = '#8C7B6B'; c.fill();
      const cols = ['#F28AB2', '#7EC8E3', '#F28AB2', '#7EC8E3'];
      for (let i = 0; i < 4; i++) { c.save(); c.translate(-36 + i * 24, hy - 50 + Math.abs(i - 1.5) * 8); c.rotate(0.2 * (i - 1.5)); fillRR(c, -11, -9, 22, 18, 7, cols[i]); c.restore(); }
    }
  }
  c.restore();
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
  fillRR(c, x + w - 70, y + h * 0.52, 50, 14, 7, '#C9CDD2');
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
  fillRR(c, 30, 520, 90, 54, 8, '#16181C'); txt(c, '7', 75, 548, 36, '#FF3B30', 900);
  // drzwi 72 po prawej
  paddedDoor(c, 930, 560, 300, 840, '72');
  // drzwi 71
  const dx = 330, dy = 560, dw = 380, dh = 840;
  if (o.open) {
    fillRR(c, dx - 16, dy - 16, dw + 32, dh + 16, 4, '#3C2A1C');
    const ig = c.createLinearGradient(0, dy, 0, dy + dh); ig.addColorStop(0, '#F6D58E'); ig.addColorStop(1, '#C98F45');
    c.fillStyle = ig; c.fillRect(dx, dy, dw, dh);
    c.fillStyle = 'rgba(120,70,30,.35)'; c.fillRect(dx + 40, dy + 120, 120, 200); // obrazek
    // skrzydło drzwi otwarte do środka
    c.fillStyle = '#5A3C23'; c.beginPath(); c.moveTo(dx, dy); c.lineTo(dx + 70, dy + 40); c.lineTo(dx + 70, dy + dh - 30); c.lineTo(dx, dy + dh); c.fill();
    // światło na podłogę
    c.fillStyle = 'rgba(246,213,142,.25)'; c.beginPath(); c.moveTo(dx, 1400); c.lineTo(dx + dw, 1400); c.lineTo(dx + dw + 160, 1920); c.lineTo(dx - 160, 1920); c.fill();
  } else paddedDoor(c, dx, dy, dw, dh, '71', { peepDark: o.peepDark });
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
    if (hv > 0.86) col = '#F2C14E'; else if (hv > 0.8) col = '#7FB2E5';
    if (floor === 9 && q === 5) col = o.off94 ? '#161C2E' : '#F7C948';
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

// ---------- sceny ----------
// labels: [a,b,tekst,x,y,styl,rozmiar]  bubbles: [a,b,tekst,cx,dolY,ogonX,ogonY,kto]
const S = [];
function scene(o) { S.push(o); return o; }
function talking(sc, who, lt) {
  return (sc.bubbles || []).some(b => b[7] === who && lt >= b[0] && lt < b[0] + Math.min(b[1] - b[0] - .2, .055 * b[2].length + .3));
}

// 0. HAK
scene({
  name: 'hook', start: 0, end: 5,
  cam: lt => ({ z: 1 + lt * 0.012 }),
  draw(c, lt, sc) {
    quilted(c, 0, 0, W, H, '#5E4029', '#4D3420', '#B8914E', 90);
    const g = c.createRadialGradient(540, 900, 100, 540, 900, 1000); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.55)'); c.fillStyle = g; c.fillRect(0, 0, W, H);
    const pressed = lt > 0.85;
    const [bx, by] = unifon(c, 250, 560, 580, 860, { pressed, glow: pressed ? clamp(1 - (lt - .85) * .8) + .3 : 0, feed: feedEntrance(lt + 30, { doorOpen: pressed ? prog(lt, 1.0, 1.8) : 0 }) });
    const p = eout(prog(lt, 0.05, 0.85));
    const fx = lerp(bx + 380, bx + 4, p), fy = lerp(by + 420, by + 4, p);
    hand(c, fx, fy, Math.atan2(420, 380));
    // tablica-hak
    const sp = prog(lt, 0.1, 0.35), shake = lt < 0.8 ? (1 - lt / .8) * 10 : 0;
    if (sp > 0) {
      c.save(); c.translate(540 + Math.sin(lt * 70) * shake, 380 + Math.cos(lt * 63) * shake); const s = back(sp); c.scale(s, s); c.rotate(-0.02);
      c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 30; c.shadowOffsetY = 10;
      fillRR(c, -430, -120, 860, 240, 24, '#D7263D'); c.shadowColor = 'transparent';
      c.strokeStyle = 'rgba(255,255,255,.35)'; c.lineWidth = 4; rr(c, -416, -106, 832, 212, 16); c.stroke();
      txt(c, 'NIE OTWIERAJ', 0, -44, 92, '#FFFFFF', 900); txt(c, 'KURIEROWI!', 0, 52, 92, '#FFFFFF', 900);
      c.restore();
    }
    // wyzwanie
    if (lt > 2.0) {
      const a = lt - 2.0, s = a < .3 ? back(a / .3) : 1;
      c.save(); c.translate(540, 1500); c.scale(s, s);
      c.shadowColor = 'rgba(0,0,0,.5)'; c.shadowBlur = 24;
      fillRR(c, -400, -95, 800, 190, 22, 'rgba(14,16,21,.94)'); c.shadowColor = 'transparent';
      txt(c, 'Kuba zrobi 3 błędy.', 0, -36, 54, '#FFFFFF', 800);
      txt(c, 'Znajdziesz wszystkie?', 0, 38, 54, '#F5C542', 900);
      c.restore();
    }
  },
});
// 1. BLOK NOCĄ
scene({
  name: 'ext', start: 5, end: 11,
  cam: lt => ({ z: 1.0 + lt * 0.014 }),
  labels: [
    [0.3, 6, 'KASZTANOWA 12 · KLATKA II', 540, 300, 'dark', 42],
    [0.7, 6, '21:47', 540, 380, 'yellow', 40],
    [3.6, 6, 'KURIER? O TEJ GODZINIE?', 540, 1300, 'red', 40],
  ],
  draw(c, lt, sc) {
    const m = blockBg(c, lt);
    person(c, 'kurier', 600, 1505, 0.42, { box: true, t: lt });
    if (lt > 1.6) {
      const a = lt - 1.6, wx = m.bx + 5 * m.cw + m.cw / 2, wy = m.by + 40 + 1 * m.rh + (m.rh - 34) / 2;
      c.save(); c.strokeStyle = '#F39C12'; c.lineWidth = 6; c.beginPath(); c.arc(wx, wy, 52 * back(clamp(a / .3)), 0, 7); c.stroke();
      c.beginPath(); c.moveTo(wx - 10, wy + 52); c.lineTo(wx - 40, wy + 120); c.stroke(); c.restore();
      label(c, 'MIESZKANIE KUBY · 9 PIĘTRO', 520, wy + 150, 'orange', 38, a, 9);
    }
    snow(c, lt + 5);
  },
});
// 2. MIESZKANIE — domofon
scene({
  name: 'flat', start: 11, end: 21.5,
  cam: lt => ({ z: 1.0 + lt * 0.006 }),
  bubbles: [
    [1.0, 5.0, 'Paczka do 71.\nNikt nie otwiera.\nWpuści pan?', 330, 1000, 420, 800, 'kurier'],
    [6.6, 8.6, 'Dobra, otwieram.', 520, 1010, 640, 1060, 'kuba'],
  ],
  labels: [
    [4.6, 6.4, 'KURIER DO SĄSIADKI?', 540, 265, 'red', 40],
    [5.4, 7.6, 'MECZ ZA 2 MINUTY', 760, 1250, 'yellow', 38],
  ],
  draw(c, lt, sc) {
    // ściana i podłoga
    c.fillStyle = '#C8B69A'; c.fillRect(0, 0, W, 1420);
    for (let i = 0; i < 20; i++) { c.fillStyle = 'rgba(150,120,80,.18)'; c.fillRect(i * 60, 0, 22, 1420); }
    c.fillStyle = '#6A4E36'; c.fillRect(0, 1420, W, 500);
    for (let i = 0; i < 12; i++) { c.fillStyle = 'rgba(0,0,0,.12)'; c.fillRect(0, 1440 + i * 44, W, 3); }
    fillRR(c, 0, 1400, W, 26, 0, '#4E3826');
    paddedDoor(c, 40, 560, 340, 860, '94');
    // poświata TV
    const fl = 0.6 + 0.4 * Math.sin(lt * 9) * Math.sin(lt * 3.3);
    const g = c.createRadialGradient(1120, 1000, 40, 1120, 1000, 600);
    g.addColorStop(0, `rgba(110,170,255,${0.45 * fl})`); g.addColorStop(1, 'rgba(110,170,255,0)');
    c.fillStyle = g; c.fillRect(500, 300, 580, 1400);
    const pressT = 8.0, pressed = lt > pressT;
    const [ubx, uby] = unifon(c, 440, 760, 150, 230, { pressed, glow: pressed ? clamp(1 - (lt - pressT)) : 0, feed: feedEntrance(lt, { talk: talking(sc, 'kurier', lt) }) });
    const look = lt > 5.3 && lt < 7.4 ? 1 : -0.8;
    const aL = lt < 7.6 ? 0.14 : mv(lt, 7.6, 8.0, 0.14, 2.35);
    person(c, 'kuba', 700, 1500, 2.2, { t: lt, look, aL, talk: talking(sc, 'kuba', lt), lookY: look < 0 ? -0.6 : 0 });
    // powiększenie monitora
    const zin = prog(lt, 0.2, 0.6) * (1 - prog(lt, 9.8, 10.3));
    if (zin > 0) {
      c.save(); c.globalAlpha = zin;
      c.strokeStyle = 'rgba(255,255,255,.35)'; c.lineWidth = 3; c.setLineDash([10, 8]);
      c.beginPath(); c.moveTo(180, 770); c.lineTo(455, 775); c.moveTo(900, 770); c.lineTo(575, 775); c.stroke(); c.setLineDash([]);
      c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 30; fillRR(c, 168, 318, 744, 464, 18, '#2A2C30'); c.shadowColor = 'transparent';
      c.beginPath(); c.roundRect(180, 330, 720, 440, 10); c.save(); c.clip();
      feedEntrance(lt, { talk: talking(sc, 'kurier', lt), doorOpen: prog(lt, 8.2, 8.8), cx: lt > 8.6 ? mv(lt, 8.6, 9.8, 540, 600) : 540, calpha: 1 - prog(lt, 9.2, 9.8), look: lt > 8.3 ? 0.6 : 0 })(c, 180, 330, 720, 440);
      c.restore(); c.restore();
    }
  },
});
// 3. KLATKA — kurier w środku
scene({
  name: 'lobby1', start: 21.5, end: 34,
  cam: lt => ({ z: 1.0 + lt * 0.004 }),
  labels: [
    [1.6, 3.1, 'TEN SAM', 260, 820, 'red', 42],
    [7.0, 10.6, 'IDZIE SCHODAMI.\nNIE WINDĄ?', 560, 760, 'yellow', 40],
  ],
  bubbles: [[3.2, 6.2, 'Dzięki, szefie!\nCiężkie to.', 360, 830, 260, 1000, 'kurier']],
  draw(c, lt, sc) {
    const kx = lt < 1.2 ? 545 : lt < 9.5 ? mv(lt, 1.2, 2.8, 545, 660) : mv(lt, 9.5, 12, 660, 1260, x => x);
    const kwalk = (lt > 1.2 && lt < 2.8) || lt > 9.5 ? lt * 9 : null;
    const ks = lt < 1.2 ? 1.8 : mv(lt, 1.2, 2.8, 1.8, 2.0);
    const ky = lt < 1.2 ? 1395 : mv(lt, 1.2, 2.8, 1395, 1480);
    lobbyBg(c, lt, {
      elevOpen: mv(lt, 0.2, 0.9, 0, 1) * (1 - prog(lt, 3.4, 4.2)), floor: '0',
      inCab: lt < 1.2 ? (cc => person(cc, 'kuba', 545, 1395, 1.8, { t: lt, bag: true })) : null,
    });
    // kurier
    const cl = prog(lt, 6.5, 9.5);
    const cx = lerp(250, 40, cl), cy = lerp(1480, 1180, cl), cs = lerp(2.0, 1.75, cl);
    person(c, 'kurier', cx, cy, cs, { t: lt, box: true, walk: cl > 0 && cl < 1 ? lt * 8 : null, talk: talking(sc, 'kurier', lt), look: lt < 6.5 ? 1 : -1, alpha: 1 - prog(lt, 8.8, 9.5) });
    if (lt >= 1.2) person(c, 'kuba', kx, ky, ks, { t: lt, bag: true, walk: kwalk, look: lt < 9.5 ? -1 : 1 });
  },
});
// 4. DRZWI — KAPTUR wchodzi
scene({
  name: 'door', start: 34, end: 45,
  cam: lt => ({ z: 1.02 + lt * 0.004 }),
  labels: [
    [3.0, 5.6, 'TUŻ ZA NIM', 220, 1240, 'red', 42],
    [7.0, 10.4, 'OBCY NIE MA KLUCZY', 540, 330, 'red', 44],
  ],
  bubbles: [
    [4.4, 6.4, 'Przytrzymasz?', 260, 860, 210, 990, 'kaptur'],
    [6.0, 7.8, 'Jasne!', 690, 860, 730, 1010, 'kuba'],
  ],
  draw(c, lt, sc) {
    entranceBg(c, lt, { doorOpen: mv(lt, 2.1, 2.7, 0, 1) });
    const kin = prog(lt, 7.4, 9.6);
    const kpx = lt < 2.5 ? -260 : lt < 5 ? mv(lt, 2.5, 4.6, -260, 210) : lerp(210, 540, kin);
    const kps = lerp(2.15, 1.6, kin), kpy = lerp(1540, 1440, kin);
    // Kaptur wchodzi do środka (rysowany przed Kubą)
    person(c, 'kaptur', kpx, kpy, kps, { t: lt, walk: (lt > 2.5 && lt < 4.6) || (kin > 0 && kin < 1) ? lt * 8 : null, look: 1, alpha: 1 - prog(lt, 9.0, 9.6) });
    const kx = lt < 2 ? mv(lt, 0, 2.0, -200, 520) : mv(lt, 5.8, 6.4, 520, 730);
    const aL = mv(lt, 6.2, 6.6, 0.14, 1.6);
    person(c, 'kuba', kx, 1530, 2.1, { t: lt, walk: lt < 2 || (lt > 5.8 && lt < 6.4) ? lt * 9 : null, keys: lt < 2.4, aL, look: lt > 3.2 ? -1 : 0.3, talk: talking(sc, 'kuba', lt) });
    snow(c, lt + 34);
  },
});
// 5. KLATKA — Zdzisiek i błąd 3
scene({
  name: 'lobby2', start: 45, end: 66,
  cam: lt => ({ z: 1.0 + lt * 0.002 }),
  labels: [
    [2.4, 5.0, 'PAN ZDZISIEK · 2 PIĘTRO', 650, 300, 'orange', 40],
    [15.0, 18.0, 'SŁUCHA', 150, 640, 'red', 40],
  ],
  bubbles: [
    [3.2, 6.3, 'Kuba! A ten w kapturze\nto do kogo?', 560, 850, 860, 1090, 'zdzisiek'],
    [6.5, 9.0, 'Nie wiem…\nKurierowi otworzyłem.', 520, 850, 660, 1070, 'kuba'],
    [9.2, 11.6, 'Ja tu znam wszystkich.\nJego nie znam.', 560, 850, 860, 1090, 'zdzisiek'],
    [12.6, 14.4, 'Pani z 71 nie otwiera.\nKiedy wraca?', 460, 850, 340, 1070, 'kurier'],
    [14.5, 17.2, 'Nie ma jej, wyjechała\ndo córki! Do niedzieli.', 520, 850, 660, 1070, 'kuba'],
    [18.4, 21, 'Kurier… bez paczki…\ni nie jeździ windą?', 560, 850, 860, 1090, 'zdzisiek'],
  ],
  draw(c, lt, sc) {
    lobbyBg(c, lt, { floor: '0', callLit: lt > 0.5 });
    // Kaptur na schodach w półcieniu
    const ka = 1 - prog(lt, 19.2, 20.4);
    const kup = prog(lt, 18.8, 20.4);
    person(c, 'kaptur', lerp(150, 20, kup), lerp(1260, 1110, kup), 1.75, { t: lt, look: lt < 18.8 ? 1 : -1, glow: lt > 15 && lt < 16 ? 1 : 0, alpha: ka, walk: kup > 0 && kup < 1 ? lt * 8 : null });
    c.fillStyle = 'rgba(0,0,20,.18)'; c.fillRect(0, 700, 300, 700);
    // kurier schodzi i wraca
    const dn = prog(lt, 11.0, 12.5), up = prog(lt, 17.4, 19.2);
    if (lt > 11) {
      const cx = up > 0 ? lerp(330, 30, up) : lerp(40, 330, dn), cy = up > 0 ? lerp(1480, 1170, up) : lerp(1180, 1480, dn);
      const cs = up > 0 ? lerp(2, 1.75, up) : lerp(1.75, 2, dn);
      person(c, 'kurier', cx, cy, cs, { t: lt, walk: (dn > 0 && dn < 1) || (up > 0 && up < 1) ? lt * 8 : null, talk: talking(sc, 'kurier', lt), look: up > 0 ? -1 : 1, alpha: 1 - prog(lt, 18.6, 19.2) });
    }
    person(c, 'kuba', 660, 1480, 2.0, { t: lt, look: lt < 3 ? -0.5 : lt > 12.4 && lt < 17.2 ? -1 : 1, talk: talking(sc, 'kuba', lt), aR: lt < 0.8 ? mv(lt, 0, .4, .14, 1.2) : .14 });
    const zx = mv(lt, 0.3, 2.4, 1250, 870);
    person(c, 'zdzisiek', zx, 1495, 2.05, { t: lt, net: true, walk: lt > .3 && lt < 2.4 ? lt * 8 : null, look: lt > 11 && lt < 15 ? -1 : -0.6, talk: talking(sc, 'zdzisiek', lt), squint: lt > 18.2 });
  },
});
// 6. PRZEKRÓJ BLOKU
scene({
  name: 'section', start: 66, end: 74,
  cam: lt => ({ z: 1 }),
  labels: [
    [0.3, 5.6, 'KTO GDZIE JEST?', 540, 300, 'dark', 42],
    [5.6, 8, 'MIESZKANIE 71 „PUSTE”', 540, 300, 'red', 42],
  ],
  draw(c, lt, sc) {
    c.fillStyle = '#0D111C'; c.fillRect(0, 0, W, H);
    const x0 = 250, x1 = 830, top = 400, fh = 98;
    const fy = f => top + (10 - f) * fh;
    for (let f = 0; f <= 10; f++) {
      const y = fy(f);
      c.fillStyle = f % 2 ? '#1A2132' : '#1D2538'; c.fillRect(x0, y, x1 - x0, fh - 4);
      txt(c, String(f), x0 - 36, y + fh / 2, 30, '#7C8AA8', 700);
      fillRR(c, x0 + 150, y + 14, 150, fh - 32, 4, '#26304A');
      fillRR(c, x0 + 370, y + 14, 200, fh - 32, 4, '#26304A');
    }
    // szyb windy
    c.fillStyle = '#0A0D16'; c.fillRect(x0 + 316, top, 40, 11 * fh);
    c.strokeStyle = '#3A4462'; c.lineWidth = 2; c.beginPath(); c.moveTo(x0 + 336, top); c.lineTo(x0 + 336, top + 11 * fh); c.stroke();
    // klatka schodowa – zygzak
    c.strokeStyle = '#3A4462'; c.lineWidth = 4; c.beginPath();
    for (let f = 0; f <= 10; f++) { const y = fy(f) + fh - 6; c.moveTo(x0 + 10, y); c.lineTo(x0 + 130, y - fh + 10); }
    c.stroke();
    const hl = (f, side, col, text, a) => {
      const y = fy(f), bx = side ? x0 + 370 : x0 + 150, bw = side ? 200 : 150;
      const pa = clamp((lt - a) / .3);
      if (pa <= 0) return;
      c.save(); c.globalAlpha = pa; c.strokeStyle = col; c.lineWidth = 5; rr(c, bx, y + 14, bw, fh - 32, 4); c.stroke();
      fillRR(c, bx + 3, y + 17, bw - 6, fh - 38, 3, col + '33');
      c.restore();
      label(c, text, side ? x1 + 0 : x0 - 10, y + fh / 2, side ? 'orange' : 'red', 26, lt - a, 9);
    };
    hl(9, 1, '#F39C12', 'KUBA · 94', 0.6);
    hl(7, 0, '#D7263D', 'PANI HALINA · 71', 1.0);
    hl(2, 1, '#F5C542', 'ZDZISIEK', 1.4);
    // kropki
    const ev = prog(lt, 0.8, 4.0);
    const ely = lerp(fy(0), fy(9), eio(ev)) + fh / 2;
    fillRR(c, x0 + 320, ely - 30, 32, 60, 4, '#F39C12');
    const stair = (p, f0, f1) => { const fpos = lerp(f0, f1, p); const f = Math.floor(fpos), fr = fpos - f; const y = fy(f) + fh - 10 - fr * (fh - 10); const x = x0 + 10 + (f % 2 ? (1 - fr) : fr) * 120; return [x, y]; };
    const p1 = eio(prog(lt, 1.2, 5.2)), p2 = eio(prog(lt, 1.6, 5.6));
    const [ax, ay] = stair(p1, 0, 7), [bx2, by2] = stair(p2, 0, 7);
    circ(c, ax, ay - 10, 16, '#E8A33D'); circ(c, bx2, by2 - 10, 16, '#D7263D');
    if (lt > 1.2) { txt(c, 'KURIER', ax + 70, ay - 30, 22, '#E8A33D', 800, 'left'); }
    if (lt > 1.6) { txt(c, 'KAPTUR', bx2 + 70, by2 + 8, 22, '#FF6B7A', 800, 'left'); }
    // Zdzisiek dzwoni
    if (lt > 4.2) {
      const y = fy(2) + fh / 2, pr = (lt * 1.6) % 1;
      c.save(); c.strokeStyle = `rgba(245,197,66,${1 - pr})`; c.lineWidth = 4; c.beginPath(); c.arc(x0 + 470, y, 20 + pr * 60, 0, 7); c.stroke(); c.restore();
      circ(c, x0 + 470, y, 14, '#F5C542');
      label(c, 'DZWONI DO KOGOŚ…', 540, fy(0) + fh + 70, 'yellow', 34, lt - 4.2, 9);
    }
  },
});
// 7. KORYTARZ 7 PIĘTRO
scene({
  name: 'floor7', start: 74, end: 88,
  cam: lt => ({ z: 1.0 + lt * 0.004 }),
  labels: [
    [0.3, 3.4, '7 PIĘTRO · 23:04', 540, 300, 'dark', 42],
    [1.7, 4.3, 'PUSTY KARTON', 600, 1250, 'red', 44],
    [4.8, 7.2, 'WYTRYCH', 700, 1180, 'red', 38],
    [5.4, 9.0, '1 MINUTA', 540, 300, 'dark', 44],
    [9.0, 13.9, '2 MINUTY', 540, 300, 'dark', 44],
  ],
  bubbles: [[2.4, 4.5, 'Pusto. Dawaj.', 780, 860, 830, 1030, 'kurier']],
  draw(c, lt, sc) {
    corridorBg(c, lt, { peepDark: lt > 11.4 });
    // karton
    const tip = eio(prog(lt, 1.0, 1.5));
    c.save(); c.translate(500, 1470); c.rotate(-tip * 1.35);
    fillRR(c, 0, -150, 200, 150, 6, '#B07A45'); c.fillStyle = '#D9B57E'; c.fillRect(0, -120, 200, 14);
    txt(c, '71', 150, -50, 40, '#1E1E1E', 900);
    if (tip > 0.6) { c.fillStyle = '#4A3018'; c.fillRect(8, -142, 184, 134); c.fillStyle = '#9A6838'; c.fillRect(0, -150, 200, 8); }
    c.restore();
    // kurier
    const kick = lt > 0.9 && lt < 1.3;
    person(c, 'kurier', 850, 1500, 2.0, { t: lt, talk: talking(sc, 'kurier', lt), look: lt < 5 ? -1 : -0.5, rot: kick ? -0.08 : 0 });
    // kaptur przy zamku
    const kx = mv(lt, 3.0, 4.0, 220, 560), crouch = mv(lt, 4.0, 4.4, 1, 0.8);
    person(c, 'kaptur', kx, 1500, 2.0, { t: lt, squash: crouch, walk: lt > 3 && lt < 4 ? lt * 8 : null, aR: lt > 4.2 ? 2.0 + Math.sin(lt * 14) * 0.06 : 0.14, tool: lt > 4.2, look: 1 });
    // telefon Zdziśka (wstawka)
    const pa = prog(lt, 6.0, 6.3) * (1 - prog(lt, 10.6, 11.0));
    if (pa > 0) {
      c.save(); c.globalAlpha = pa; c.translate(60, 380); c.rotate(-0.04 + Math.sin(lt * 40) * 0.01);
      c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 30; fillRR(c, 0, 0, 300, 560, 40, '#111317'); c.shadowColor = 'transparent';
      const g = c.createLinearGradient(0, 20, 0, 540); g.addColorStop(0, '#2B3A63'); g.addColorStop(1, '#151B2E');
      fillRR(c, 14, 14, 272, 532, 30, g);
      txt(c, 'Zdzisiek dzwoni do…', 150, 90, 24, '#AFC0E8', 700);
      const pr = (lt * 1.4) % 1; c.strokeStyle = `rgba(255,140,180,${1 - pr})`; c.lineWidth = 5; c.beginPath(); c.arc(150, 250, 60 + pr * 50, 0, 7); c.stroke();
      circ(c, 150, 250, 60, '#F28AB2'); txt(c, 'H', 150, 252, 60, '#FFFFFF', 900);
      txt(c, 'HALINKA', 150, 360, 42, '#FFFFFF', 900);
      txt(c, '7 piętro', 150, 405, 26, '#AFC0E8', 600);
      circ(c, 90, 480, 30, '#E5484D'); circ(c, 210, 480, 30, '#30A46C');
      c.restore();
    }
  },
});
// 8. ZWROT AKCJI
scene({
  name: 'twist', start: 88, end: 98,
  cam: lt => { const sh = lt < .6 ? (1 - lt / .6) * 22 : 0; return { z: 1.04, x: Math.sin(lt * 80) * sh, y: Math.cos(lt * 67) * sh }; },
  labels: [[0.5, 3.6, 'HALINA NIE WYJECHAŁA', 540, 300, 'red', 56]],
  bubbles: [
    [1.7, 5.0, 'Kawalerze… ja słyszę\nWSZYSTKO przez domofon.', 520, 830, 540, 920, 'halina'],
    [6.6, 9.8, 'I nie wracajcie!\nA ty, Kuba, też dostaniesz!', 520, 830, 540, 920, 'halina'],
  ],
  draw(c, lt, sc) {
    corridorBg(c, lt, { open: true });
    person(c, 'halina', 520, 1420, 2.25, { t: lt, aR: 2.75 + Math.sin(lt * 6) * .08, pin: true, talk: talking(sc, 'halina', lt), mouth: 'angry', look: lt < 6 ? 1 : -1 });
    const run = prog(lt, 5.0, 6.4);
    const lines = (x, y) => { c.strokeStyle = 'rgba(255,255,255,.5)'; c.lineWidth = 5; for (let i = 0; i < 5; i++) { c.beginPath(); c.moveTo(x + 120 + i * 10, y - 500 + i * 90); c.lineTo(x + 280 + i * 30, y - 500 + i * 90); c.stroke(); } };
    const kx = lerp(240, -420, eio(run)), cx = lerp(870, -260, eio(run));
    person(c, 'kaptur', kx, 1500, 2.0, { t: lt, rot: run > 0 ? -0.15 : 0.1, walk: run > 0 ? lt * 16 : null, glow: 0, look: run > 0 ? -1 : 1 });
    person(c, 'kurier', cx, 1500, 2.0, { t: lt, rot: run > 0 ? -0.15 : 0.12, walk: run > 0 ? lt * 16 : null, mouth: 'o', wide: true, look: run > 0 ? -1 : -1 });
    if (run > 0 && run < 1) { lines(kx, 1500); lines(cx, 1500); }
    if (lt < 0.12) { c.fillStyle = `rgba(255,255,255,${1 - lt / .12})`; c.fillRect(-100, -100, W + 200, H + 200); }
  },
});
// 9. ZDZISIEK — pożegnanie
scene({
  name: 'zdz', start: 98, end: 102,
  cam: lt => ({ z: 1.0 + lt * .01 }),
  bubbles: [[1.0, 4.0, 'Do widzenia\npanom kurierom!', 560, 860, 760, 1090, 'zdzisiek']],
  draw(c, lt, sc) {
    lobbyBg(c, lt, { floor: '7' });
    const r = prog(lt, 0.0, 1.3);
    person(c, 'kaptur', lerp(60, 1300, r), lerp(1200, 1520, r), 2.0, { t: lt, walk: lt * 16, rot: 0.12 });
    person(c, 'kurier', lerp(-200, 1250, prog(lt, .2, 1.5)), 1530, 2.0, { t: lt, walk: lt * 16, rot: 0.12, mouth: 'o' });
    person(c, 'zdzisiek', 760, 1495, 2.05, { t: lt, net: true, aL: 2.6 + Math.sin(lt * 10) * .25, talk: talking(sc, 'zdzisiek', lt), mouth: 'smile' });
  },
});
// 10. ODPOWIEDZI
scene({
  name: 'reveal', start: 102, end: 114,
  cam: lt => ({ z: 1 }),
  draw(c, lt, sc) {
    quilted(c, 0, 0, W, H, '#2A1E15', '#231910', '#5A4630', 90);
    c.fillStyle = 'rgba(8,10,14,.72)'; c.fillRect(0, 0, W, H);
    label(c, lt < 7 ? 'ODPOWIEDZI' : 'ZAPAMIĘTAJ', 540, 320, 'yellow', 52, lt < 7 ? lt : lt - 7, 9);
    const out = prog(lt, 6.6, 7.0);
    if (out < 1) {
      c.save(); c.globalAlpha = 1 - out; c.translate(-out * 200, 0);
      let y = 420;
      const items = [
        [0.4, 'BŁĄD 1 · 0:19', 'wpuścił „kuriera” do cudzego\nmieszkania'],
        [1.8, 'BŁĄD 2 · 0:40', 'przytrzymał drzwi obcemu'],
        [3.2, 'BŁĄD 3 · 0:59', 'powiedział, że sąsiadki nie ma'],
        [4.6, 'BŁĄD 4 · ???', 'jest w pierwszych 20 sekundach.\nZnalazłeś? Napisz w komentarzu ↓'],
      ];
      for (const [a, t1, t2] of items) { if (lt > a) y += card(c, 70, y, 860, t1, t2, lt - a, a > 4 ? '#D7263D' : '#F39C12', 44) + 30; }
      c.restore();
    }
    if (lt > 7) {
      const a = lt - 7;
      card(c, 80, 470, 840, 'ZASADA', 'Kurier dzwoni do adresata.\nNie do ciebie.', a, '#F39C12', 54);
      if (lt > 8.6) {
        const b = lt - 8.6, s = b < .3 ? back(b / .3) : 1;
        c.save(); c.translate(540, 960); c.scale(s, s);
        txt(c, 'Otworzyłbyś?', 0, 0, 64, '#FFFFFF', 900);
        fillRR(c, -330, 70, 300, 110, 24, '#D7263D'); txt(c, 'A · TAK', -180, 126, 50, '#FFFFFF', 900);
        fillRR(c, 30, 70, 300, 110, 24, '#30A46C'); txt(c, 'B · NIE', 180, 126, 50, '#FFFFFF', 900);
        txt(c, 'Odpowiedz w komentarzu', 0, 250, 36, '#C9CFDA', 700);
        c.restore();
      }
    }
  },
});
// 11. KONIEC — KAPTUR i pętla
scene({
  name: 'end', start: 114, end: 119,
  cam: lt => ({ z: 1.35 + lt * .03, y: 120 }),
  labels: [[3.1, 5, 'ODC. 2 →', 540, 620, 'orange', 64]],
  draw(c, lt, sc) {
    blockBg(c, lt, { off94: lt > 1.6 });
    const front = lt > 2.6;
    person(c, 'kaptur', 540, 1640, 1.6, { t: lt, back: !front, glow: front ? clamp((lt - 2.6) * 2) : 0, look: 0 });
    snow(c, lt + 114);
  },
});
const CHALLENGE_T = 2.0;

// ---------- nakładki ----------
let grain = [];
function makeGrain() {
  for (let k = 0; k < 4; k++) {
    const g = document.createElement('canvas'); g.width = 540; g.height = 960;
    const gc = g.getContext('2d'); const im = gc.createImageData(540, 960);
    for (let i = 0; i < im.data.length; i += 4) { const v = Math.random() * 255; im.data[i] = im.data[i + 1] = im.data[i + 2] = v; im.data[i + 3] = 22; }
    gc.putImageData(im, 0, 0); grain.push(g);
  }
}
function overlays(c, t, frame) {
  // winieta
  const g = c.createRadialGradient(540, 960, 520, 540, 960, 1250);
  g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.6)');
  c.fillStyle = g; c.fillRect(0, 0, W, H);
  c.drawImage(grain[frame % 4], 0, 0, W, H);
  // REC
  fillRR(c, 40, 150, 170, 52, 26, 'rgba(14,16,21,.85)');
  if (Math.floor(t * 1.5) % 2 === 0) circ(c, 70, 176, 9, '#FF3B30');
  const mm = Math.floor(t / 60), ss = Math.floor(t % 60);
  txt(c, `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`, 140, 177, 28, '#F39C12', 800);
  fillRR(c, 222, 150, 250, 52, 26, 'rgba(14,16,21,.85)');
  txt(c, 'BLOK 94 · ODC. 1', 347, 177, 26, '#FFFFFF', 800);
  // licznik błędów
  if (t >= CHALLENGE_T && t < 102) {
    const n = ERR.filter(e => t >= e).length;
    const last = ERR.filter(e => t >= e).pop();
    const fl = last != null ? clamp(1 - (t - last) / 1.2) : 0;
    const pop = Math.min(1, (t - CHALLENGE_T) / .3);
    c.save(); c.translate(860, 176); const s = back(pop) * (1 + 0.35 * fl * (0.5 + 0.5 * Math.sin((t - (last || 0)) * 25))); c.scale(s, s);
    fillRR(c, -150, -28, 300, 56, 28, fl > 0 ? '#D7263D' : 'rgba(14,16,21,.85)');
    txt(c, `BŁĘDY ${n}/3`, 0, 1, 30, fl > 0 ? '#FFFFFF' : '#F5C542', 900);
    c.restore();
  }
}

// ---------- render ----------
const cv = document.getElementById('cv');
const ctx = cv.getContext('2d');
let loopFrame = null;
function drawAt(c, t, frame) {
  c.setTransform(1, 0, 0, 1, 0, 0);
  c.fillStyle = '#0E1015'; c.fillRect(0, 0, W, H);
  const sc = S.find(s => t >= s.start && t < s.end) || S[S.length - 1];
  const lt = t - sc.start;
  c.save();
  const cam = sc.cam ? sc.cam(lt) : { z: 1 };
  c.translate(W / 2 + (cam.x || 0), H / 2 + (cam.y || 0)); c.scale(cam.z, cam.z); c.translate(-W / 2, -H / 2);
  sc.draw(c, lt, sc);
  for (const L of sc.labels || []) { const [a, b, s, x, y, st, sz] = L; if (lt >= a && lt < b) label(c, s, x, y, st, sz, lt - a, b - lt); }
  for (const B of sc.bubbles || []) { const [a, b, s, x, y, tx, ty] = B; if (lt >= a && lt < b) bubble(c, s, x, y, tx, ty, lt - a, b - lt); }
  c.restore();
  if (lt < 0.12 && sc.start > 0) { c.fillStyle = `rgba(0,0,0,${0.75 * (1 - lt / .12)})`; c.fillRect(0, 0, W, H); }
  overlays(c, t, frame);
}
function renderFrame(t) {
  const frame = Math.round(t * FPS);
  drawAt(ctx, t, frame);
  // płynna pętla: ostatnie 0,6 s przechodzi w pierwszą klatkę
  if (t > DUR - 0.6) {
    if (!loopFrame) { loopFrame = document.createElement('canvas'); loopFrame.width = W; loopFrame.height = H; drawAt(loopFrame.getContext('2d'), 0, 0); }
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = prog(t, DUR - 0.6, DUR - 0.05); ctx.drawImage(loopFrame, 0, 0); ctx.globalAlpha = 1;
  }
}

// ---------- wskazówki dźwiękowe ----------
function buildCues() {
  const q = [];
  const add = (t, type, extra = {}) => q.push({ t: +t.toFixed(3), type, ...extra });
  for (const sc of S) {
    if (sc.start > 0) add(sc.start, 'whoosh');
    for (const L of sc.labels || []) add(sc.start + L[0], 'tik');
    for (const B of sc.bubbles || []) add(sc.start + B[0], 'voice', { who: B[7], dur: Math.min(B[1] - B[0] - .2, .055 * B[2].length + .3) });
  }
  add(0.0, 'motif'); add(0.12, 'stab'); add(0.85, 'press'); add(1.0, 'doorbuzz'); add(2.0, 'tik');
  add(11.3, 'intercom'); add(19.0, 'press'); add(19.05, 'doorbuzz');
  add(21.7, 'ding'); add(36.1, 'lock');
  for (let k = 0; k < 9; k++) add(28.0 + k * 0.33, 'step');
  for (let k = 0; k < 10; k++) add(52 + k * 0.2, 'step', { soft: 1 });
  add(75.0, 'thud');
  for (let k = 0; k < 5; k++) add(80.2 + k * 1.0, 'vibrate');
  let hb = 78; let gap = 0.85; while (hb < 87.5) { add(hb, 'heart'); hb += gap; gap = Math.max(0.42, gap * 0.95); }
  add(88.0, 'hit'); add(93.0, 'whoosh'); add(99.2, 'pluck');
  for (const a of [0.4, 1.8, 3.2, 4.6]) add(102 + a, 'tik');
  add(109.0, 'stab'); add(110.6, 'tik');
  add(115.6, 'switch'); add(116.6, 'whoosh'); add(117.1, 'motif');
  for (const e of ERR) add(e, 'error');
  return q.sort((a, b) => a.t - b.t);
}

window.FILM = { W, H, FPS, DUR, renderFrame, cues: buildCues(), ready: (async () => {
  await document.fonts.load(`800 40px ${FONT}`); await document.fonts.load(`900 40px ${FONT}`); await document.fonts.load(`700 40px ${FONT}`); await document.fonts.load(`600 40px ${FONT}`);
  makeGrain();
  return true;
})() };
