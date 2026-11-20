// Silnik BLOK 94: oś czasu (dopasowana do lektora), nakładki, render i wskazówki dźwiękowe.
const EPC = window.EP || {};
function pw(knots, x, from, to) {
  for (let i = 1; i < knots.length; i++) {
    const a = knots[i - 1], b = knots[i];
    if (x <= b[from] || i === knots.length - 1) return a[to] + (b[to] - a[to]) * clamp((x - a[from]) / ((b[from] - a[from]) || 1));
  }
  return x;
}
for (const sc of S) {
  sc.oStart = sc.start; sc.oEnd = sc.end;
  const m = window.TIMELINE && window.TIMELINE.find(x => x.name === sc.name);
  if (m) { sc.start = m.start; sc.end = m.end; sc.knots = m.knots; } else sc.knots = [[0, 0], [sc.oEnd - sc.oStart, sc.oEnd - sc.oStart]];
}
DUR = S[S.length - 1].end;
function G(old) { const sc = S.find(s => old >= s.oStart && old < s.oEnd) || S[S.length - 1]; return sc.start + pw(sc.knots, old - sc.oStart, 0, 1); }
const ERRN = (EPC.errors || []).map(G);
const fmt = t => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;

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
  const g = c.createRadialGradient(540, 960, 520, 540, 960, 1250);
  g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, `rgba(0,0,0,${EPC.vignette ?? .6})`);
  c.fillStyle = g; c.fillRect(0, 0, W, H);
  c.drawImage(grain[frame % 4], 0, 0, W, H);
  if (EPC.captions && window.LINES) captions(c, t);
  if (EPC.hideHud && EPC.hideHud(t)) return;
  if (EPC.hud === 'coz') { hudCoz(c, t); return; }
  fillRR(c, 40, 150, 170, 52, 26, 'rgba(14,16,21,.85)');
  if (Math.floor(t * 1.5) % 2 === 0) circ(c, 70, 176, 9, '#FF3B30');
  const mm = Math.floor(t / 60), ss = Math.floor(t % 60);
  txt(c, `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`, 140, 177, 28, '#F39C12', 800);
  const bdg = EPC.badge || 'BLOK 94'; c.save(); font(c, 26, 800); const bw = Math.max(250, c.measureText(bdg).width + 48); c.restore();
  fillRR(c, 222, 150, bw, 52, 26, 'rgba(14,16,21,.85)');
  txt(c, bdg, 222 + bw / 2, 177, 26, '#FFFFFF', 800);
  if (EPC.counter && t >= G(EPC.counter.from) && t < G(EPC.counter.to)) {
    const T0 = G(EPC.counter.from);
    const n = ERRN.filter(e => t >= e).length;
    const last = ERRN.filter(e => t >= e).pop();
    const fl = last != null ? clamp(1 - (t - last) / 1.2) : 0;
    const pop = Math.min(1, (t - T0) / .3);
    c.save(); c.translate(860, 176); const s = back(pop) * (1 + 0.35 * fl * (0.5 + 0.5 * Math.sin((t - (last || 0)) * 25))); c.scale(s, s);
    fillRR(c, -150, -28, 300, 56, 28, fl > 0 ? '#D7263D' : 'rgba(14,16,21,.85)');
    txt(c, `BŁĘDY ${n}/${ERRN.length}`, 0, 1, 30, fl > 0 ? '#FFFFFF' : '#F5C542', 900);
    c.restore();
  }
}


// ---------- styl „CO ZROBISZ?”: napisy słowo po słowie + zegar i licznik ----------
// LINES (z narr.py): [{t, dur, text, who}]. Tekst bez [tagów]; dzielony na kawałki po 1–3 słowa, czas proporcjonalny do liter.
const CAPS = (() => { const out = []; for (const L of (window.LINES || [])) { const clean = L.text.replace(/\[[^\]]*\]/g, '').replace(/\s+/g, ' ').trim(); if (!clean) continue;
  const q = L.who && L.who !== 'lektor'; const words = clean.split(' '); const chunks = []; let cur = [];
  for (const w of words) { cur.push(w); const len = cur.join(' ').length; if (cur.length >= 3 || len >= 14 || /[.,!?…:]$/.test(w)) { chunks.push(cur); cur = []; } } if (cur.length) chunks.push(cur);
  const tot = chunks.reduce((a, ch) => a + ch.join(' ').length + 2, 0); let tt = L.t;
  chunks.forEach((ch, i) => { const d = L.dur * (ch.join(' ').length + 2) / tot; out.push({ a: tt, b: tt + d + (i === chunks.length - 1 ? .25 : 0), words: ch, q, first: i === 0, last: i === chunks.length - 1 }); tt += d; }); }
  return out; })();
function captions(c, t) { const C = CAPS.filter(x => t >= x.a && t < x.b).pop(); if (!C) return;
  const hl = (EPC.hl || []).map(w => w.toLowerCase()); const norm = w => w.toLowerCase().replace(/[^a-ząćęłńóśźż0-9]/g, '');
  let hi = C.words.findIndex(w => hl.includes(norm(w))); const red = hi >= 0; if (!red) { let best = -1; C.words.forEach((w, i) => { if (norm(w).length >= 5 && (best < 0 || norm(w).length > norm(C.words[best]).length)) best = i; }); hi = best; }
  const words = C.words.map(w => w.toUpperCase()); if (C.q) { if (C.first) words[0] = '„' + words[0]; if (C.last) words[words.length - 1] += '”'; }
  const sz = 82, y = EPC.capY || 1560; c.save(); font(c, sz, 900); const sp = c.measureText(' ').width; const ws = words.map(w => c.measureText(w).width); let tw = ws.reduce((a, b) => a + b, 0) + sp * (ws.length - 1);
  const k = Math.min(1, 960 / tw); const p = clamp((t - C.a) / .12), s = (0.85 + 0.15 * back(p)) * k; c.translate(540, y); c.scale(s, s); let x = -tw / 2;
  c.lineJoin = 'round'; c.textBaseline = 'middle'; c.textAlign = 'left';
  words.forEach((w, i) => { c.lineWidth = 14; c.strokeStyle = 'rgba(0,0,0,.9)'; c.strokeText(w, x, 0); c.fillStyle = i === hi ? (red ? '#FF3B47' : '#FFD23F') : '#FFFFFF'; c.fillText(w, x, 0); x += ws[i] + sp; });
  c.restore(); }
function hudCoz(c, t) { const sc = S.find(s => t >= s.start && t < s.end) || S[S.length - 1]; const told = sc.oStart + pw(sc.knots, t - sc.start, 1, 0);
  const clk = EPC.clock ? EPC.clock(told) : null, tm = EPC.timer ? EPC.timer(told) : null;
  const lcd = (str, x, y, sz) => { c.save(); c.font = `900 ${sz}px ${FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = 'rgba(255,40,40,.12)'; c.fillText(str.replace(/[0-9]/g, '8'), x, y); c.shadowColor = '#FF2A2A'; c.shadowBlur = 18; c.fillStyle = '#FF3B30'; c.fillText(str, x, y); c.restore(); };
  if (clk) { fillRR(c, 40, 142, 230, 76, 12, 'rgba(8,8,12,.9)'); c.strokeStyle = 'rgba(255,60,60,.35)'; c.lineWidth = 3; rr(c, 40, 142, 230, 76, 12); c.stroke(); lcd(clk, 155, 182, 50); }
  const bdg = EPC.badge || ''; if (bdg) { c.save(); font(c, 24, 800); const bw = c.measureText(bdg).width + 40; c.restore(); fillRR(c, 540 - bw / 2, 236, bw, 46, 23, 'rgba(10,11,16,.75)'); txt(c, bdg, 540, 260, 24, '#F5C542', 800); }
  if (tm) { const [lab, sec, urgent] = tm; const m = Math.floor(sec / 60), ss = Math.floor(sec % 60); const bl = urgent && Math.floor(t * 4) % 2; fillRR(c, 790, 130, 250, 100, 12, 'rgba(8,8,12,.92)'); c.strokeStyle = bl ? '#FF3B30' : 'rgba(255,60,60,.6)'; c.lineWidth = bl ? 6 : 3; rr(c, 790, 130, 250, 100, 12); c.stroke(); txt(c, lab, 915, 152, 20, '#FF8A8A', 900); lcd(`${String(m).padStart(2, '0')}:${String(ss).padStart(2, '0')}`, 915, 198, 50); } }

// ---------- render ----------
const cv = document.getElementById('cv');
const ctx = cv.getContext('2d');
let loopFrame = null;
function drawAt(c, t, frame) {
  c.setTransform(1, 0, 0, 1, 0, 0);
  c.fillStyle = '#0E1015'; c.fillRect(0, 0, W, H);
  const sc = S.find(s => t >= s.start && t < s.end) || S[S.length - 1];
  const lt = pw(sc.knots, t - sc.start, 1, 0);
  c.save();
  const cam = sc.cam ? sc.cam(lt) : { z: 1 };
  c.translate(W / 2 + (cam.x || 0), H / 2 + (cam.y || 0)); if (cam.r) c.rotate(cam.r); c.scale(cam.z, cam.z); c.translate(-W / 2, -H / 2);
  sc.draw(c, lt, sc);
  for (const L of sc.labels || []) { const [a, b, s, x, y, st, sz] = L; if (lt >= a && lt < b) label(c, s, x, y, st, sz, lt - a, b - lt); }
  for (const B of sc.bubbles || []) { const [a, b, s, x, y, tx, ty] = B; if (lt >= a && lt < b) bubble(c, s, x, y, tx, ty, lt - a, b - lt); }
  c.restore();
  if (sc.post) sc.post(c, lt, t);
  if (EPC.cut === 'flash') { if (lt < 0.1 && sc.start > 0 && !sc.noDip) { c.fillStyle = `rgba(255,255,255,${0.35 * (1 - lt / .1)})`; c.fillRect(0, 0, W, H); } }
  else if (lt < 0.12 && sc.start > 0 && !sc.noDip) { c.fillStyle = `rgba(0,0,0,${0.75 * (1 - lt / .12)})`; c.fillRect(0, 0, W, H); }
  overlays(c, t, frame);
}
function renderFrame(t) {
  const frame = Math.round(t * FPS);
  drawAt(ctx, t, frame);
  if (EPC.loop !== false && t > DUR - 0.6) {
    if (!loopFrame) { loopFrame = document.createElement('canvas'); loopFrame.width = W; loopFrame.height = H; drawAt(loopFrame.getContext('2d'), 0, 0); }
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = prog(t, DUR - 0.6, DUR - 0.05); ctx.drawImage(loopFrame, 0, 0); ctx.globalAlpha = 1;
  }
}

// ---------- wskazówki dźwiękowe (czasy w starej osi -> G) ----------
function buildCues() {
  const q = [];
  const add = (t, type, extra = {}) => q.push({ t: +G(t).toFixed(3), type, ...extra });
  for (const sc of S) {
    if (sc.oStart > 0 && !sc.noWhoosh) add(sc.oStart, 'whoosh');
    for (const L of sc.labels || []) add(sc.oStart + L[0], 'tik');
    for (const B of sc.bubbles || []) add(sc.oStart + B[0], 'voice', { bubble: B[2], who: B[7], dur: Math.min(B[1] - B[0] - .2, .055 * B[2].length + .3) });
  }
  if (EPC.cues) EPC.cues(add);
  for (const e of EPC.errors || []) add(e, 'error');
  return q.sort((a, b) => a.t - b.t);
}

window.FILM = { W, H, FPS, DUR, renderFrame, timeline: S.map(({ name, oStart, oEnd, start, end, knots }) => ({ name, oStart, oEnd, start, end, knots })), cues: buildCues(), ready: (async () => {
  await document.fonts.load(`800 40px ${FONT}`); await document.fonts.load(`900 40px ${FONT}`); await document.fonts.load(`700 40px ${FONT}`); await document.fonts.load(`600 40px ${FONT}`);
  if (EPC.images) await Promise.all(Object.entries(EPC.images).map(([k, src]) => new Promise(r => { const i = new Image(); i.onload = i.onerror = () => r(); i.src = src; (window.IMGS = window.IMGS || {})[k] = i; })));
  makeGrain();
  return true;
})() };
