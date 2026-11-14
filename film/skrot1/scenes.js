// SKRÓTEM · ODC. 1 — „Nie idź na skróty!”: Maja wraca z treningu przez ciemne garaże. W garażu 13 ktoś jest.
window.EP = {
  badge: 'SKRÓTEM · ODC. 1',
  loop: false,
  vignette: .84,
  cues(add) {
    add(0.2, 'stab'); add(6.2, 'whoosh'); add(7.0, 'door'); add(14.0, 'notif'); add(18.4, 'whoosh'); add(23.0, 'hit');
    add(28.4, 'whoosh'); add(32.0, 'creak'); add(36.0, 'hit'); add(41.0, 'error'); add(44.4, 'whoosh'); add(47.0, 'creak'); add(50.0, 'hit'); add(53.0, 'slam');
    add(58.4, 'whoosh'); add(60.0, 'door'); add(66.0, 'dial'); add(72.4, 'whoosh'); add(74.0, 'door'); add(84.4, 'whoosh'); add(90.0, 'keys'); add(95.0, 'creak'); add(99.6, 'hit');
  },
};
const S = [];
function scene(o) { S.push(o); return o; }
function bigSign(c, lt, l1, l2, y = 390) {
  const sp = prog(lt, 0.15, 0.4), shake = lt < 1 ? (1 - lt) * 9 : 0; if (sp <= 0) return;
  c.save(); c.translate(540 + Math.sin(lt * 70) * shake, y); const s = back(sp); c.scale(s, s); c.rotate(-0.02);
  c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 30; c.shadowOffsetY = 10;
  fillRR(c, -470, -120, 940, 240, 24, '#D7263D'); c.shadowColor = 'transparent';
  c.strokeStyle = 'rgba(255,255,255,.35)'; c.lineWidth = 4; rr(c, -456, -106, 912, 212, 16); c.stroke();
  txt(c, l1, 0, -44, 86, '#FFFFFF', 900); txt(c, l2, 0, 54, 86, '#FFFFFF', 900);
  c.restore();
}
function say(a, b, text, who, px, py, s, dx = 0, lift = 0) { const top = py - 312 * s; return [a, b, text, clamp(px + dx, 200, 880), top - 18 - lift, px, top + 12, who]; }
function sayAt(a, b, text, who, px, py, dx = 0, up = 60) { return [a, b, text, clamp(px + dx, 200, 880), py - up, px, py, who]; }
function talking(sc, who, lt) { return (sc.bubbles || []).some(b => b[7] === who && lt >= b[0] && lt < b[0] + Math.min(b[1] - b[0] - .2, .055 * b[2].length + .3)); }
function snowfall(c, lt, n = 70, a = .75) { for (let k = 0; k < n; k++) { const x = (hash(k) * W + Math.sin(lt * .8 + k) * 20) % W, y = (hash(k + 50) * H + lt * (60 + hash(k + 9) * 80)) % H; circ(c, x, y, 1.6 + hash(k + 3) * 2.4, `rgba(235,240,255,${a})`); } }
// ujęcie jak z kamery monitoringu
function cctv(c, lt, label) {
  c.save(); c.globalCompositeOperation = 'saturation'; c.fillStyle = '#808080'; c.fillRect(0, 0, W, H); c.restore();
  c.fillStyle = 'rgba(70,110,90,.16)'; c.fillRect(0, 0, W, H);
  c.fillStyle = 'rgba(255,255,255,.04)'; for (let y = 0; y < H; y += 6) c.fillRect(0, y, W, 2);
  const g = c.createRadialGradient(540, 960, 500, 540, 960, 1150); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.7)'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  txt(c, label, 60, 250, 30, '#E8F0E8', 800, 'left');
  const sec = Math.floor(lt) % 60; txt(c, '00:' + (52 + Math.floor(lt / 60)) + ':' + String(sec).padStart(2, '0'), 60, 292, 28, '#E8F0E8', 700, 'left');
  if (Math.floor(lt * 2) % 2) { circ(c, 1000, 250, 10, '#FF3B30'); } txt(c, 'REC', 980, 252, 26, '#FF3B30', 900, 'right');
}
// przystanek nocą: wiata, rozkład, reklama, latarnia, bloki w tle, śnieg
function stopBg(c, lt, o = {}) {
  const sky = c.createLinearGradient(0, 0, 0, 1200); sky.addColorStop(0, '#05070F'); sky.addColorStop(1, '#141A2E'); c.fillStyle = sky; c.fillRect(0, 0, W, H);
  for (let b = 0; b < 4; b++) { const bx = -40 + b * 290, bh = 520 + hash(b) * 220; fillRR(c, bx, 1150 - bh, 250, bh, 0, '#0E1220');
    for (let r = 0; r < 8; r++) for (let q = 0; q < 4; q++) { if (hash(b * 40 + r * 4 + q) > .72) { fillRR(c, bx + 20 + q * 56, 1150 - bh + 30 + r * 62, 32, 36, 2, hash(b + r) > .5 ? '#E8B860' : '#7A9AD0'); } } }
  c.fillStyle = '#1E2230'; c.fillRect(0, 1150, W, 250); // chodnik
  c.fillStyle = '#0D0F16'; c.fillRect(0, 1400, W, 520); // jezdnia
  for (let i = 0; i < 6; i++) fillRR(c, ((i * 260 - (o.road || 0)) % 1300 + 1300) % 1300 - 100, 1640, 140, 14, 4, 'rgba(230,230,210,.5)');
  // latarnia z plamą światła
  c.fillStyle = '#2A2D36'; c.fillRect(940, 360, 14, 800); fillRR(c, 880, 350, 100, 18, 8, '#2A2D36');
  { const lg = c.createRadialGradient(920, 420, 10, 920, 900, 700); lg.addColorStop(0, 'rgba(255,190,110,.35)'); lg.addColorStop(1, 'rgba(255,190,110,0)'); c.fillStyle = lg; c.fillRect(300, 360, 780, 1100); }
  // wiata przystankowa
  c.fillStyle = '#9AA3AE'; c.fillRect(120, 620, 14, 560); c.fillRect(760, 620, 14, 560); fillRR(c, 100, 600, 700, 30, 6, '#5E6670');
  c.fillStyle = 'rgba(170,200,230,.12)'; c.fillRect(134, 640, 626, 520); c.strokeStyle = 'rgba(200,220,240,.35)'; c.lineWidth = 3; c.strokeRect(134, 640, 626, 520);
  fillRR(c, 200, 1010, 460, 26, 6, '#4A4F58'); c.fillStyle = '#3A3F48'; c.fillRect(230, 1036, 12, 120); c.fillRect(620, 1036, 12, 120);
  // podświetlana reklama i rozkład jazdy
  { const ag = c.createLinearGradient(0, 680, 0, 960); ag.addColorStop(0, '#F2E8D0'); ag.addColorStop(1, '#D9C9A6'); fillRR(c, 560, 680, 180, 280, 6, ag); txt(c, 'MLEKO', 650, 760, 30, '#1E5AA8', 900); circ(c, 650, 860, 46, '#FFFFFF'); }
  fillRR(c, 160, 680, 170, 240, 4, '#E8E4DA'); txt(c, 'N94', 245, 714, 34, '#D7263D', 900); for (let i = 0; i < 6; i++) { txt(c, ['00:17', '00:47', '01:17', '01:47', '02:17', '02:47'][i], 200, 760 + i * 26, 20, i === 1 ? '#D7263D' : '#2A2D36', 800, 'left'); }
  fillRR(c, 40, 470, 80, 80, 40, '#F5C542'); txt(c, 'A', 80, 512, 44, '#14161B', 900); c.fillStyle = '#9AA3AE'; c.fillRect(76, 550, 8, 610);
  txt(c, 'PARK LEŚNY', 80, 590, 22, '#E8E4DA', 900);
  // tablica elektroniczna
  fillRR(c, 300, 520, 360, 64, 8, '#0B0C10'); txt(c, o.led || 'N94  KASZTANOWA  2 min', 480, 553, 26, '#FFB020', 900);
}
// autobus z zewnątrz: o.x — przód autobusu, o.open — drzwi otwarte
function busOutside(c, lt, o = {}) {
  const x = o.x ?? 200, y = 880, L = 1500;
  c.save(); c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 30; fillRR(c, x - L, y, L, 520, 36, '#C8202F'); c.restore();
  fillRR(c, x - L, y + 380, L, 24, 0, '#9E1824');
  for (let i = 0; i < 6; i++) { const wx = x - L + 60 + i * 240; fillRR(c, wx, y + 80, 200, 220, 10, '#F3D99A'); c.fillStyle = 'rgba(0,0,0,.15)'; c.fillRect(wx, y + 80, 200, 30); }
  fillRR(c, x - 180, y + 70, 160, 300, 16, '#AFC6E0'); // przednia szyba
  fillRR(c, x - 420, y + 60, 200, 440, 6, o.open ? '#F6E2A8' : '#2A2D36'); if (!o.open) { c.fillStyle = '#4A4F58'; c.fillRect(x - 322, y + 60, 4, 440); }
  fillRR(c, x - 560, y + 20, 380, 46, 6, '#0B0C10'); txt(c, 'N94  KASZTANOWA', x - 370, y + 43, 26, '#FFB020', 900);
  for (const wx of [x - 1300, x - 300]) { circ(c, wx, y + 520, 70, '#141518'); circ(c, wx, y + 520, 34, '#5E6670'); }
  circ(c, x - 30, y + 440, 18, '#FFF3C4');
  const hg = c.createRadialGradient(x + 40, y + 440, 10, x + 300, y + 460, 520); hg.addColorStop(0, 'rgba(255,240,190,.35)'); hg.addColorStop(1, 'rgba(255,240,190,0)'); c.fillStyle = hg; c.fillRect(x, y + 200, 700, 600);
}
// wnętrze autobusu z boku: siedzenia przodem w prawo, okna z przesuwającymi się światłami miasta
const SEATS = [150, 410, 670, 930];
function busInside(c, lt, o = {}) {
  c.fillStyle = '#2A2E3A'; c.fillRect(0, 0, W, H);
  // okna
  fillRR(c, 0, 470, W, 470, 0, '#05070D');
  const sp = o.speed ?? 1;
  for (let k = 0; k < 14; k++) { const xx = ((k * 170 - lt * 520 * sp) % 2380 + 2380) % 2380 - 300, yy = 560 + hash(k) * 300;
    if (hash(k + 4) > .5) { const g = c.createRadialGradient(xx, yy, 2, xx, yy, 90); g.addColorStop(0, 'rgba(255,190,110,.75)'); g.addColorStop(1, 'rgba(255,190,110,0)'); c.fillStyle = g; c.fillRect(xx - 90, yy - 90, 180, 180); }
    else { fillRR(c, xx, yy, 120, 240, 4, '#0F1424'); for (let r = 0; r < 5; r++) if (hash(k * 9 + r) > .5) fillRR(c, xx + 20, yy + 20 + r * 44, 26, 26, 2, '#E8B860'); } }
  if (o.reflect) { c.save(); c.globalAlpha = o.reflect; person(c, 'pasazer', o.reflectX || 700, 1180, 1.25, { t: lt, look: -1, mouth: 'grin', still: true }); c.restore(); }
  c.fillStyle = 'rgba(160,190,230,.08)'; c.fillRect(0, 470, W, 470);
  c.fillStyle = '#3A3F4C'; for (let i = 0; i < 6; i++) c.fillRect(i * 260 - 20, 470, 26, 470);
  c.fillStyle = '#3A3F4C'; c.fillRect(0, 440, W, 34); c.fillRect(0, 936, W, 30);
  // sufit: poręcz, uchwyty, wyświetlacz
  c.fillStyle = '#C9CDD2'; c.fillRect(0, 330, W, 10); for (let i = 0; i < 8; i++) { c.fillStyle = '#C9CDD2'; c.fillRect(70 + i * 140, 330, 6, 50); c.strokeStyle = '#C9CDD2'; c.lineWidth = 6; c.beginPath(); c.arc(73 + i * 140, 400, 20, 0, 7); c.stroke(); }
  fillRR(c, 260, 236, 560, 80, 10, '#0B0C10'); txt(c, o.led || 'NASTĘPNY: ŁĄKOWA', 540, 277, 32, '#FFB020', 900);
  // podłoga
  c.fillStyle = '#1E2028'; c.fillRect(0, 1400, W, 520); for (let i = 0; i < 12; i++) { c.fillStyle = 'rgba(255,255,255,.03)'; c.fillRect(0, 1420 + i * 40, W, 3); }
  // pionowe poręcze z czerwonym przyciskiem STOP
  for (const px of [540]) { c.fillStyle = '#E2C14A'; c.fillRect(px, 300, 14, 1100); fillRR(c, px - 14, 900, 42, 54, 10, '#D7263D'); txt(c, 'STOP', px + 7, 927, 14, '#fff', 900); }
}
function seatBack(c, x) { fillRR(c, x - 34, 1010, 46, 300, 16, '#2E4A8A'); fillRR(c, x - 34, 1010, 46, 30, 12, '#3A5AA8'); for (let i = 0; i < 4; i++) circ(c, x - 11, 1070 + i * 60, 5, 'rgba(255,255,255,.12)'); }
function seatBase(c, x) { fillRR(c, x - 34, 1280, 230, 40, 12, '#2E4A8A'); c.fillStyle = '#5E6670'; c.fillRect(x + 60, 1320, 14, 80); }
// siedzący pasażer (bez nóg — zasłania je siedzenie)
function seated(c, kind, x, lt, o = {}) { person(c, kind, x + 60, 1330, 1.6, Object.assign({ t: lt, sit: true }, o)); }
// ulica nocą: śnieg, latarnie, bloki, w oddali blok 94, po prawej sklep 24h
function streetBg(c, lt, o = {}) {
  const sky = c.createLinearGradient(0, 0, 0, 1100); sky.addColorStop(0, '#04060D'); sky.addColorStop(1, '#121829'); c.fillStyle = sky; c.fillRect(0, 0, W, H);
  // blok 94 w oddali
  fillRR(c, 380, 300, 300, 820, 0, '#0C1020'); for (let r = 0; r < 12; r++) for (let q = 0; q < 5; q++) if (hash(r * 5 + q + 7) > .78 || (r === 2 && q === 3)) fillRR(c, 400 + q * 56, 330 + r * 64, 30, 34, 2, r === 2 && q === 3 ? '#7AA2FF' : '#E8B860');
  txt(c, '94', 530, 1080, 30, 'rgba(255,255,255,.25)', 900);
  c.fillStyle = '#E6EAF2'; c.fillRect(0, 1150, W, 770); // śnieg
  c.fillStyle = 'rgba(120,130,160,.25)'; c.fillRect(0, 1150, W, 12);
  for (const lx of [120, 780]) { c.fillStyle = '#2A2D36'; c.fillRect(lx, 520, 12, 640); fillRR(c, lx - 30, 510, 80, 16, 8, '#2A2D36');
    const lg = c.createRadialGradient(lx + 6, 560, 10, lx + 6, 1250, 520); lg.addColorStop(0, 'rgba(255,190,110,.35)'); lg.addColorStop(1, 'rgba(255,190,110,0)'); c.fillStyle = lg; c.fillRect(lx - 500, 520, 1000, 1100); }
  if (o.shop) { // sklep 24h po prawej
    fillRR(c, 860, 760, 260, 400, 4, '#2A2E38'); fillRR(c, 880, 900, 200, 240, 4, '#F2F6E8'); for (let i = 0; i < 3; i++) fillRR(c, 890 + i * 64, 930, 50, 180, 3, ['#E85A4F', '#4FA8E8', '#F5C542'][i]);
    const on = .8 + .2 * Math.sin(lt * 10); fillRR(c, 870, 780, 240, 90, 10, `rgba(40,200,120,${on})`); txt(c, 'SKLEP 24h', 990, 826, 36, '#FFFFFF', 900);
    const sg = c.createRadialGradient(990, 950, 20, 990, 1050, 500); sg.addColorStop(0, 'rgba(220,255,230,.3)'); sg.addColorStop(1, 'rgba(220,255,230,0)'); c.fillStyle = sg; c.fillRect(500, 600, 600, 1100);
  }
}
// sklep całodobowy od środka: półki, lodówka, lada, monitor kamer, witryna z ulicą
function shopBg(c, lt, o = {}) {
  c.fillStyle = '#E8ECE4'; c.fillRect(0, 0, W, 1420); c.fillStyle = '#C9CFC4'; c.fillRect(0, 1420, W, 500);
  for (let r = 0; r < 10; r++) for (let q = 0; q < 14; q++) { c.fillStyle = (r + q) % 2 ? 'rgba(0,0,0,.04)' : 'rgba(255,255,255,.05)'; c.fillRect(q * 80, 1420 + r * 50, 80, 50); }
  // świetlówki
  for (let i = 0; i < 3; i++) { const fl = o.flicker && hash(Math.floor(lt * 14) + i) > .6 ? .25 : 1; fillRR(c, 100 + i * 330, 120, 220, 18, 9, `rgba(255,255,245,${fl})`); }
  // witryna po lewej: ulica w nocy
  fillRR(c, 0, 360, 420, 760, 0, '#0B0F1C'); c.fillStyle = '#E6EAF2'; c.fillRect(0, 1000, 420, 120); c.fillStyle = '#2A2D36'; c.fillRect(300, 560, 10, 460);
  { const lg = c.createRadialGradient(305, 600, 10, 305, 900, 300); lg.addColorStop(0, 'rgba(255,190,110,.4)'); lg.addColorStop(1, 'rgba(255,190,110,0)'); c.fillStyle = lg; c.fillRect(0, 560, 420, 560); }
  if (o.outside) { c.save(); c.globalAlpha = o.outside; person(c, 'pasazer', 250, 1100, 1.2, { t: lt, look: 1, mouth: 'grin' }); c.restore(); }
  for (let k = 0; k < 16; k++) circ(c, hash(k) * 420, 380 + (hash(k + 5) * 700 + lt * 70) % 700, 2.4, 'rgba(235,240,255,.7)');
  c.fillStyle = 'rgba(200,220,240,.12)'; c.fillRect(0, 360, 420, 760); c.fillStyle = '#9AA3AE'; c.fillRect(410, 360, 14, 760); c.fillRect(0, 350, 424, 14);
  // regały z towarem
  for (let sh = 0; sh < 4; sh++) { const y = 420 + sh * 170; fillRR(c, 460, y + 130, 360, 14, 3, '#9AA3AE'); for (let i = 0; i < 9; i++) fillRR(c, 470 + i * 38, y + 40 + hash(sh * 9 + i) * 30, 30, 90 - hash(sh * 9 + i) * 30, 4, ['#E85A4F', '#4FA8E8', '#F5C542', '#30A46C', '#7B4FC9', '#F28CB1', '#E8E4DA', '#D96A1E', '#1BB0A3'][i]); }
  // lodówka z napojami
  fillRR(c, 860, 360, 220, 760, 8, '#BFC6CC'); fillRR(c, 876, 380, 188, 720, 6, '#DDF2FF'); for (let r = 0; r < 5; r++) for (let i = 0; i < 4; i++) fillRR(c, 890 + i * 44, 410 + r * 140, 30, 100, 8, ['#E85A4F', '#30A46C', '#F5C542', '#4FA8E8'][(r + i) % 4]);
  // lada z kasą i monitorem kamer
  fillRR(c, 380, 1180, 700, 240, 8, '#6B5440'); fillRR(c, 380, 1170, 700, 24, 6, '#8C7B6B');
  fillRR(c, 860, 1060, 160, 110, 8, '#1B1D22'); fillRR(c, 870, 1070, 140, 86, 4, '#2F3A3A'); for (let i = 0; i < 4; i++) fillRR(c, 872 + (i % 2) * 70, 1072 + Math.floor(i / 2) * 43, 66, 40, 2, '#4A5A55');
  fillRR(c, 560, 1100, 120, 70, 8, '#2A2D36'); txt(c, '24h', 620, 1136, 24, '#30A46C', 900);
}

function breathPuff(c, x, y, lt) { for (let i = 0; i < 3; i++) { const p = ((lt * .7 + i / 3) % 1); c.fillStyle = `rgba(230,235,245,${.2 * (1 - p)})`; c.beginPath(); c.arc(x + p * 60, y - p * 50, 10 + p * 26, 0, 7); c.fill(); } }
// drzwi zaplecza w sklepie (prawa strona, obok lodówki), o.swing 0..1 — uchylone, wpada śnieg
function backDoor(c, lt, swing = 0) {
  fillRR(c, 690, 560, 160, 600, 4, '#9AA3AE'); txt(c, 'ZAPLECZE', 770, 600, 20, '#14161B', 900);
  if (swing > 0) { c.fillStyle = '#05070D'; c.fillRect(700, 620, 140, 530); for (let k = 0; k < 10; k++) { const p = (lt * .6 + hash(k)) % 1; circ(c, 700 + hash(k + 3) * 140 - p * 120, 640 + p * 480, 3, `rgba(235,240,255,${1 - p})`); }
    const g = swing * (.7 + .3 * Math.sin(lt * 3)); c.fillStyle = '#C3C9CF'; c.beginPath(); c.moveTo(700, 620); c.lineTo(700 + 140 * (1 - g), 610); c.lineTo(700 + 140 * (1 - g), 1160); c.lineTo(700, 1150); c.fill(); }
  else { fillRR(c, 700, 620, 140, 530, 3, '#C3C9CF'); fillRR(c, 810, 880, 20, 10, 4, '#5E6670'); }
}
function policeLights(c, lt, x0 = 0, w = 420) { const on = Math.floor(lt * 5) % 2; c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createRadialGradient(x0 + w / 2, 900, 20, x0 + w / 2, 900, 600); g.addColorStop(0, on ? 'rgba(60,120,255,.45)' : 'rgba(255,50,50,.4)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(x0, 360, w + 300, 900); c.restore(); }
// plecak z dużym napisem OLA
function backpack(c, x, y, s = 1, glow = 0) { c.save(); c.translate(x, y); c.scale(s, s); fillRR(c, -70, -90, 140, 180, 30, '#5C7DB5'); fillRR(c, -50, 0, 100, 70, 14, '#4A68A0');
  if (glow) { c.shadowColor = '#FFE36A'; c.shadowBlur = 30 * glow; } fillRR(c, -54, -70, 108, 54, 10, '#F5C542'); txt(c, 'OLA', 0, -42, 40, '#14161B', 900); c.restore(); }
// wnętrze samochodu od przodu: przednia szyba, lusterko, deska rozdzielcza, kierownica
function carInside(c, lt) {
  c.fillStyle = '#0B0D14'; c.fillRect(0, 0, W, H);
  // widok za tylną szybą: przesuwające się latarnie
  for (let k = 0; k < 8; k++) { const xx = ((k * 220 + lt * 380) % 1500) - 200; const g = c.createRadialGradient(xx, 640, 2, xx, 640, 120); g.addColorStop(0, 'rgba(255,190,110,.5)'); g.addColorStop(1, 'rgba(255,190,110,0)'); c.fillStyle = g; c.fillRect(xx - 120, 520, 240, 240); }
  fillRR(c, 0, 760, W, 600, 0, '#1C1F28'); // wnętrze
  fillRR(c, 120, 820, 360, 560, 40, '#2A2E3A'); fillRR(c, 600, 820, 360, 560, 40, '#2A2E3A'); // fotele
  c.fillStyle = '#3A3F4C'; c.fillRect(0, 300, W, 30); fillRR(c, 470, 330, 140, 50, 10, '#14161B'); // lusterko
  c.strokeStyle = '#5E6670'; c.lineWidth = 3; c.beginPath(); c.moveTo(540, 380); c.lineTo(540, 450); c.stroke(); c.save(); c.translate(540, 470); c.rotate(Math.sin(lt * 2) * .2); fillRR(c, -18, -10, 36, 50, 8, '#30A46C'); c.restore();
}
function dashboard(c, lt) { fillRR(c, -40, 1380, W + 80, 600, 30, '#14161B'); c.strokeStyle = '#2A2D36'; c.lineWidth = 28; c.beginPath(); c.arc(300, 1560, 170, Math.PI * 1.05, Math.PI * 1.95); c.stroke();
  fillRR(c, 460, 1440, 160, 60, 8, '#0B2030'); txt(c, '01:31', 540, 1470, 32, '#5FD0FF', 800); fillRR(c, 700, 1430, 200, 80, 10, '#1E2230'); }
// widok z okna pokoju Oli na 9. piętrze: ulica, przystanek Kasztanowa, autobus
function windowView(c, lt, o = {}) {
  c.fillStyle = '#05060B'; c.fillRect(0, 0, W, H);
  c.save(); c.beginPath(); c.rect(140, 300, 800, 1060); c.clip();
  const sky = c.createLinearGradient(0, 300, 0, 1360); sky.addColorStop(0, '#05070F'); sky.addColorStop(1, '#141A2E'); c.fillStyle = sky; c.fillRect(140, 300, 800, 1060);
  for (let b = 0; b < 3; b++) { fillRR(c, 150 + b * 280, 420 + hash(b) * 100, 240, 500, 0, '#0E1220'); for (let r = 0; r < 7; r++) for (let q = 0; q < 4; q++) if (hash(b * 30 + r * 4 + q) > .75) fillRR(c, 170 + b * 280 + q * 54, 450 + hash(b) * 100 + r * 64, 30, 34, 2, '#E8B860'); }
  c.fillStyle = '#E6EAF2'; c.fillRect(140, 1040, 800, 320); c.fillStyle = '#1A1E2A'; c.fillRect(140, 1150, 800, 110);
  c.fillStyle = '#2A2D36'; c.fillRect(300, 900, 8, 150); { const lg = c.createRadialGradient(304, 920, 5, 304, 1080, 260); lg.addColorStop(0, 'rgba(255,190,110,.4)'); lg.addColorStop(1, 'rgba(255,190,110,0)'); c.fillStyle = lg; c.fillRect(100, 880, 420, 400); }
  fillRR(c, 360, 1000, 180, 14, 4, '#5E6670'); txt(c, 'KASZTANOWA', 450, 990, 16, '#E8E4DA', 900);
  if (o.bus != null) { // autobus w dole: oświetlone okna, w jednym stoi on
    c.save(); c.translate(o.bus, 770); c.scale(.42, .42); busOutside(c, lt, { x: 0, open: false });
    if (o.man) { c.save(); c.beginPath(); c.rect(-1200, 960, 200, 220); c.clip(); c.fillStyle = '#F3D99A'; c.fillRect(-1200, 960, 200, 220); person(c, 'pasazer', -1100, 1230, .62, { t: lt, mouth: 'grin', aR: 2.2 + Math.sin(lt * 4) * .5, still: true }); c.restore(); }
    if (o.led) { fillRR(c, -560, 900, 380, 46, 6, '#0B0C10'); txt(c, o.led, -370, 923, 26, '#FFB020', 900); }
    c.restore();
  }
  snowfall(c, lt, 50, .7);
  c.restore();
  // rama okna, parapet, firanka
  c.strokeStyle = '#D9DCE6'; c.lineWidth = 24; c.strokeRect(140, 300, 800, 1060); c.fillStyle = '#D9DCE6'; c.fillRect(528, 300, 24, 1060);
  fillRR(c, 100, 1360, 880, 40, 6, '#E8E4DA'); c.fillStyle = 'rgba(230,225,215,.35)'; for (let i = 0; i < 6; i++) c.fillRect(140 + i * 24 + Math.sin(lt + i) * 4, 300, 14, 1060);
}

// ===================== SCENY =====================

// ===== tła serii SKRÓTEM =====
// szereg garaży: blaszane drzwi z numerami, graffiti, kałuże z odbiciem, kontener, płot, za garażami blok, migająca latarnia
function garagesBg(c, lt, o = {}) {
  const sky = c.createLinearGradient(0, 0, 0, 1000); sky.addColorStop(0, '#04060C'); sky.addColorStop(1, '#151B2C'); c.fillStyle = sky; c.fillRect(0, 0, W, H);
  // blok za garażami
  fillRR(c, 120, 220, 840, 640, 0, '#0E1322'); for (let r = 0; r < 8; r++) for (let q = 0; q < 8; q++) if (hash(r * 8 + q + 31) > .8) fillRR(c, 150 + q * 102, 250 + r * 74, 50, 40, 2, hash(r + q) > .5 ? '#E8B860' : '#5C7FB8');
  const off = o.scroll || 0, first = o.first ?? 11;
  // dach garaży
  c.fillStyle = '#2A2F3A'; c.fillRect(0, 820, W, 40);
  for (let i = -1; i < 5; i++) {
    const gx = i * 300 - (off % 300), num = first + i + Math.floor(off / 300);
    c.fillStyle = '#3A404C'; c.fillRect(gx, 860, 300, 520);
    const open = o.open13 && num === 13 ? o.open13 : 0;
    // drzwi blaszane z przetłoczeniami
    const dh = 420 * (1 - open);
    if (open > 0) { c.fillStyle = o.inside13 ? '#E8C27A' : '#05060A'; c.fillRect(gx + 30, 940, 240, 420); if (o.inside13) o.inside13(c, gx + 150, 1360); }
    const dg = c.createLinearGradient(gx + 30, 0, gx + 270, 0); dg.addColorStop(0, num === 13 ? '#5E5248' : '#6E7682'); dg.addColorStop(1, num === 13 ? '#4A4038' : '#58606C');
    c.fillStyle = dg; c.fillRect(gx + 30, 940, 240, dh);
    c.fillStyle = 'rgba(0,0,0,.18)'; for (let k = 0; k < 8; k++) c.fillRect(gx + 30, 950 + k * 52, 240, 6);
    if (dh > 380) { fillRR(c, gx + 136, 1300, 28, 12, 4, '#2A2D36'); }
    fillRR(c, gx + 110, 890, 80, 40, 6, '#E8E4DA'); txt(c, String(num), gx + 150, 911, 28, num === 13 ? '#D7263D' : '#14161B', 900);
    if (hash(num) > .55 && num !== 13) { c.strokeStyle = ['#E85A4F', '#4FA8E8', '#30A46C'][num % 3]; c.lineWidth = 8; c.beginPath(); c.moveTo(gx + 60, 1100 + hash(num + 2) * 80); c.bezierCurveTo(gx + 110, 1040, gx + 170, 1160, gx + 240, 1080); c.stroke(); }
  }
  // asfalt z kałużami (odbicia)
  c.fillStyle = '#16191F'; c.fillRect(0, 1380, W, 540);
  for (const [px, pw] of [[160, 220], [620, 300]]) { const x = ((px - off * .4) % 1300 + 1300) % 1300 - 100; c.save(); c.globalAlpha = .55; fillRR(c, x, 1600, pw, 50, 25, '#2A3550'); c.restore(); }
  // kontener
  if (!o.noBin) { fillRR(c, ((860 - off * .5) % 1400 + 1400) % 1400 - 200, 1240, 200, 180, 8, '#2E5A3A'); }
  // latarnia: zepsuta, miga
  const fl = o.lampOff ? 0 : (hash(Math.floor(lt * 9)) > .35 ? 1 : .15);
  c.fillStyle = '#20242F'; c.fillRect(940, 700, 12, 700); fillRR(c, 900, 690, 90, 16, 8, '#2A2F3C');
  if (fl > .2) { const g = c.createRadialGradient(945, 720, 6, 945, 1200, 520); g.addColorStop(0, `rgba(255,200,120,${.35 * fl})`); g.addColorStop(1, 'rgba(255,200,120,0)'); c.fillStyle = g; c.fillRect(420, 700, 660, 1000); }
  for (let k = 0; k < 40; k++) circ(c, hash(k) * W, ((hash(k + 9) * 1500 + lt * 60) % 1500) + 200, 1.6 + hash(k + 3) * 2, 'rgba(235,240,255,.55)');
}
// wyjście z hali sportowej: drzwi z szybą, napis HALA, zegar 21:47, kosz, świetlówka
function gymExit(c, lt) {
  c.fillStyle = '#0B0F1C'; c.fillRect(0, 0, W, H);
  fillRR(c, 0, 300, W, 1100, 0, '#C9C4B4'); for (let r = 0; r < 14; r++) for (let q = 0; q < 8; q++) { c.fillStyle = (r + q) % 2 ? 'rgba(0,0,0,.05)' : 'rgba(255,255,255,.05)'; c.fillRect(q * 140 + (r % 2) * 70, 300 + r * 78, 140, 78); }
  fillRR(c, 260, 360, 560, 90, 10, '#1E5AA8'); txt(c, 'HALA SPORTOWA', 540, 405, 52, '#FFFFFF', 900);
  fillRR(c, 300, 520, 480, 860, 6, '#8A939E'); fillRR(c, 320, 540, 210, 600, 4, '#F2E6C0'); fillRR(c, 550, 540, 210, 600, 4, '#F2E6C0');
  c.strokeStyle = '#E85A4F'; c.lineWidth = 6; c.beginPath(); c.arc(430, 760, 60, 0, 7); c.stroke(); c.beginPath(); c.moveTo(430, 700); c.lineTo(430, 820); c.moveTo(370, 760); c.lineTo(490, 760); c.stroke(); // piłka na plakacie
  fillRR(c, 860, 460, 180, 120, 10, '#14161B'); txt(c, '21:47', 950, 520, 52, '#FF3B30', 900);
  c.fillStyle = '#1A1E2A'; c.fillRect(0, 1380, W, 540); c.fillStyle = '#DDE2EC'; c.fillRect(0, 1380, W, 30);
  const g = c.createRadialGradient(540, 500, 20, 540, 900, 800); g.addColorStop(0, 'rgba(255,250,230,.25)'); g.addColorStop(1, 'rgba(255,250,230,0)'); c.fillStyle = g; c.fillRect(0, 300, W, 1300);
}
// mapa dwóch dróg: ulica (oświetlona, 15 min) vs garaże (ciemno, 5 min)
function routeMap(c, lt, pick) {
  c.fillStyle = '#0F1320'; c.fillRect(0, 0, W, H);
  bigPhone(c, (cc, x, y, w, h) => {
    cc.fillStyle = '#1A2030'; cc.fillRect(x, y, w, h);
    for (let i = 0; i < 9; i++) { cc.fillStyle = '#232B40'; cc.fillRect(x, y + 120 + i * 120, w, 50); cc.fillRect(x + 40 + i * 70, y, 30, h); }
    // blok domu i hala
    fillRR(cc, x + 60, y + 980, 120, 90, 10, '#1E5AA8'); txt(cc, 'HALA', x + 120, y + 1025, 22, '#fff', 900);
    fillRR(cc, x + w - 180, y + 180, 120, 90, 10, '#30A46C'); txt(cc, 'DOM', x + w - 120, y + 225, 22, '#fff', 900);
    const sx = x + 180, sy = y + 1020, ex = x + w - 180, ey = y + 230;
    // trasa ulicą: dookoła, złota
    cc.strokeStyle = '#F5C542'; cc.lineWidth = 14; cc.setLineDash([]); cc.beginPath(); cc.moveTo(sx, sy); cc.lineTo(x + w - 80, sy); cc.lineTo(x + w - 80, ey + 40); cc.lineTo(ex, ey + 40); cc.stroke();
    fillRR(cc, x + w - 300, y + 640, 200, 70, 14, '#F5C542'); txt(cc, '15 min', x + w - 200, y + 665, 26, '#14161B', 900); txt(cc, 'światło, ludzie', x + w - 200, y + 695, 18, '#14161B', 800);
    // skrót przez garaże: na skos, czerwony przerywany
    cc.strokeStyle = '#E8343F'; cc.lineWidth = 14; cc.setLineDash([26, 18]); cc.beginPath(); cc.moveTo(sx, sy); cc.lineTo(ex, ey + 40); cc.stroke(); cc.setLineDash([]);
    fillRR(cc, x + w / 2 - 150, y + 560, 200, 70, 14, '#E8343F'); txt(cc, '5 min', x + w / 2 - 50, y + 585, 26, '#fff', 900); txt(cc, 'GARAŻE · ciemno', x + w / 2 - 50, y + 615, 18, '#fff', 800);
    if (pick) { const a = .5 + .5 * Math.sin(lt * 8); cc.strokeStyle = `rgba(255,255,255,${a})`; cc.lineWidth = 6; rr(cc, x + w / 2 - 160, y + 550, 220, 90, 18); cc.stroke(); }
    // bateria
    fillRR(cc, x + w - 130, y + 40, 90, 40, 8, '#2A2D36'); fillRR(cc, x + w - 126, y + 44, 10, 32, 4, '#E8343F'); txt(cc, '4%', x + w - 70, y + 61, 22, '#E8343F', 900);
  }, 1, 300);
}
// pokój Mai: okno na garaże, biurko z lampką, plakat koszykówki, łóżko, dywan, kaloryfer, torba sportowa
function majaRoom(c, lt, o = {}) {
  c.fillStyle = '#2E4A5A'; c.fillRect(0, 0, W, 1420);
  for (let r = 0; r < 16; r++) { c.fillStyle = 'rgba(255,255,255,.04)'; c.fillRect(0, r * 90, W, 4); }
  fillRR(c, 560, 360, 440, 600, 8, '#05070D'); // okno
  c.save(); c.beginPath(); c.rect(560, 360, 440, 600); c.clip(); c.translate(560, 360); c.scale(440 / W, 600 / 1400); garagesBg(c, lt, { first: 11, open13: o.open13 || 0, inside13: o.inside13, lampOff: o.lampOff, noBin: true }); c.restore();
  c.strokeStyle = '#E8E4DA'; c.lineWidth = 16; c.strokeRect(560, 360, 440, 600); c.fillStyle = '#E8E4DA'; c.fillRect(772, 360, 16, 600);
  fillRR(c, 530, 955, 500, 26, 4, '#E8E4DA'); for (let i = 0; i < 9; i++) fillRR(c, 580 + i * 44, 990, 30, 140, 6, '#D6D1C2');
  fillRR(c, 80, 260, 240, 320, 6, '#E8833A'); circ(c, 200, 420, 80, '#C25E1E'); c.strokeStyle = '#2A1A10'; c.lineWidth = 6; c.beginPath(); c.arc(200, 420, 80, 0, 7); c.moveTo(120, 420); c.lineTo(280, 420); c.moveTo(200, 340); c.lineTo(200, 500); c.stroke(); txt(c, 'MVP', 200, 300, 36, '#fff', 900);
  fillRR(c, 60, 1080, 440, 26, 6, '#6B4A2F'); c.fillStyle = '#5A3D26'; c.fillRect(80, 1106, 18, 300); c.fillRect(460, 1106, 18, 300);
  fillRR(c, 380, 1000, 10, 80, 4, '#2A2D36'); c.beginPath(); c.moveTo(350, 1000); c.lineTo(420, 1000); c.lineTo(405, 960); c.lineTo(365, 960); c.fillStyle = o.dark ? '#5A4A2A' : '#F5C542'; c.fill();
  c.fillStyle = '#3A2A20'; c.fillRect(0, 1420, W, 500); fillRR(c, 140, 1520, 800, 280, 20, '#2E6B8A'); for (let i = 0; i < 7; i++) circ(c, 220 + i * 110, 1660, 26, 'rgba(255,255,255,.15)');
  // torba sportowa
  fillRR(c, 640, 1440, 300, 150, 40, '#1E5AA8'); fillRR(c, 700, 1410, 180, 40, 20, '#16478A'); txt(c, 'MAJA · 7', 790, 1520, 30, '#FFFFFF', 900);
  if (!o.dark) { c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createRadialGradient(390, 1000, 20, 390, 1000, 700); g.addColorStop(0, 'rgba(255,220,150,.3)'); g.addColorStop(1, 'rgba(255,220,150,0)'); c.fillStyle = g; c.fillRect(0, 300, W, 1500); c.restore(); }
}
function keyTag(c, x, y, s = 1, a = 1) { c.save(); c.globalAlpha = a; c.translate(x, y); c.scale(s, s); c.strokeStyle = '#C9CDD2'; c.lineWidth = 8; c.beginPath(); c.arc(0, 0, 26, 0, 7); c.stroke(); fillRR(c, 20, -8, 120, 16, 4, '#C9CDD2'); fillRR(c, 110, 6, 12, 22, 3, '#C9CDD2'); fillRR(c, 86, 6, 12, 16, 3, '#C9CDD2');
  c.rotate(.5); fillRR(c, -90, -30, 70, 90, 10, '#E8343F'); txt(c, '13', -55, 15, 40, '#fff', 900); c.restore(); }

// ===================== SCENY =====================
// 0. HAK: w głębi garaży stoi ktoś. Maja idzie prosto na niego.
scene({
  name: 'hook', start: 0, end: 6,
  draw(c, lt) {
    garagesBg(c, lt, { first: 11, open13: .35 });
    person(c, 'obcy', 540, 1380, 1.4, { t: lt, mouth: 'grin', still: true, glow: 0 });
    person(c, 'maja', 300, 1760, 2.2, { t: lt, back: true, walk: lt * 8 });
    night(c, .7, [{ x: 945, y: 1100, r: 420, a: .8 }, { x: 540, y: 1250, r: 180, a: .5 }]);
    bigSign(c, lt, 'NIE IDŹ', 'NA SKRÓTY!', 420);
  },
  post(c, lt) { if (lt > 2.4) label(c, 'NOWA SERIA · SKRÓTEM', 540, 640, 'yellow', 40, lt - 2.4, 9); },
});
// 1. HALA: koniec treningu. Zuzia ostrzega. 4% baterii.
scene({
  name: 'gym', start: 6, end: 18,
  bubbles: [
    say(2.2, 4.8, 'Idziesz garażami?\nTam nie ma świateł.', 'zuzia', 780, 1660, 2.0, -40),
    say(5.2, 7.8, 'Tak szybciej. Pięć minut\ni jestem w domu.', 'maja', 320, 1660, 2.0, 40),
  ],
  draw(c, lt, sc) {
    gymExit(c, lt);
    person(c, 'maja', 320, 1660, 2.0, { t: lt, look: 1, talk: talking(sc, 'maja', lt), phone: lt > 8 ? 2 : 0, aR: lt > 8 ? 2.0 : null });
    person(c, 'zuzia', 780, 1660, 2.0, { t: lt, look: -1, talk: talking(sc, 'zuzia', lt), wide: lt > 5 });
    fillRR(c, 120, 1500, 220, 110, 30, '#1E5AA8'); txt(c, 'MAJA · 7', 230, 1560, 24, '#fff', 900); // torba
    night(c, .25, [{ x: 540, y: 800, r: 900, a: .7 }]);
    if (lt > 8.2) { const a = clamp((lt - 8.2) / .3); c.save(); c.globalAlpha = a; fillRR(c, 90, 300, 900, 150, 24, 'rgba(30,32,42,.96)'); txt(c, 'Bateria: 4%', 140, 350, 34, '#FF5A66', 900, 'left'); txt(c, 'Włącz tryb oszczędzania energii', 140, 405, 26, '#AEB0C2', 700, 'left'); c.restore(); }
  },
});
// 2. WYBÓR: dwie drogi. Wybiera garaże. (BŁĄD 1)
scene({
  name: 'choice', start: 18, end: 28,
  draw(c, lt) { routeMap(c, lt, lt > 4.6); night(c, .3, [{ x: 540, y: 900, r: 800, a: .8 }]); },
  post(c, lt) { if (lt > 6.0) card(c, 70, 1460, 860, 'BŁĄD 1', 'wybrała ciemny skrót zamiast\noświetlonej drogi z ludźmi', lt - 6.0, '#F39C12', 40); },
});
// 3. GARAŻE: garaż 13 uchylony, w środku ktoś. „Zgubiłaś się?” (BŁĄD 2)
scene({
  name: 'garages', start: 28, end: 44,
  bubbles: [
    say(4.2, 6.6, 'Zgubiłaś się, mała?', 'obcy', 760, 1360, 1.7, -40),
    say(7.0, 8.8, 'Nie… idę do domu.', 'maja', 200, 1700, 2.0, 60),
    say(9.2, 12.0, 'Do dwunastki? Odprowadzę cię,\nMaja.', 'obcy', 760, 1360, 1.7, -80),
  ],
  draw(c, lt, sc) {
    const sc2 = Math.min(lt, 3.6) * 40;
    garagesBg(c, lt, { first: 11, scroll: sc2, noBin: true, open13: lt > 3.0 ? clamp((lt - 3.0) / 1.2) * .9 : .1, inside13(cc, gx, gy) { person(cc, 'obcy', gx, gy, 1.45, { t: lt, look: -1, mouth: lt > 9 ? 'grin' : null, talk: talking(sc, 'obcy', lt), still: true }); fillRR(cc, gx - 120, gy - 140, 70, 140, 6, '#5A4A3A'); } });
    person(c, 'maja', 200, 1700, 2.0, { t: lt, walk: lt < 3.6 || lt > 12.4 ? lt * 9 : null, look: lt > 3.6 ? 1 : 1, wide: lt > 9, talk: talking(sc, 'maja', lt), mouth: lt > 12 ? 'o' : null });
    night(c, .55, [{ x: 945, y: 1100, r: 420, a: .8 }, { x: 760, y: 1150, r: 380, a: .9 }]);
  },
  post(c, lt) { if (lt > 12.6 && lt < 14.6) label(c, 'SKĄD ZNA JEJ IMIĘ?', 540, 300, 'red', 44, lt - 12.6, 14.6 - lt); if (lt > 13.6) card(c, 70, 1460, 860, 'BŁĄD 2', 'nikt nie wiedział, którędy idzie,\na telefon miał 4% baterii', lt - 13.6, '#F39C12', 40); },
});
// 4. POŚCIG: kroki z tyłu, w kałuży odbicie, brama zamknięta. Telefon gaśnie.
scene({
  name: 'chase', start: 44, end: 58,
  cam: lt => { const sh = lt > 9.0 && lt < 9.6 ? (9.6 - lt) * 26 : 0; return { z: 1, x: Math.sin(lt * 90) * sh, y: 0 }; },
  draw(c, lt) {
    garagesBg(c, lt, { first: 15, scroll: lt * 200, lampOff: lt > 6 });
    const fx = lt > 2 ? lerp(-200, 120, clamp((lt - 2) / 6)) : -300;
    // odbicie w kałuży: postać za Mają
    c.save(); c.translate(0, 3240); c.scale(1, -1); c.globalAlpha = .3; person(c, 'obcy', fx, 1620, 1.8, { t: lt, walk: lt * 9 }); c.restore();
    person(c, 'obcy', fx, 1620, 1.8, { t: lt, walk: lt * 9, alpha: lt > 4 ? .9 : .0 });
    person(c, 'maja', 620, 1700, 2.0, { t: lt, walk: lt * 14, look: lt > 4.2 && lt < 5.4 ? -1 : 1, wide: true, mouth: 'o', phone: 2, aR: 1.6 });
    // brama z kłódką na końcu
    if (lt > 8.2) { const a = clamp((lt - 8.2) / .4); c.save(); c.globalAlpha = a; c.strokeStyle = '#8A939E'; c.lineWidth = 10; for (let i = 0; i < 9; i++) { c.beginPath(); c.moveTo(780 + i * 34, 1000); c.lineTo(780 + i * 34, 1420); c.stroke(); } c.fillRect(770, 1000, 300, 12); fillRR(c, 900, 1180, 50, 60, 10, '#C9A15A'); c.restore(); }
    night(c, lt > 6 ? .82 : .6, [{ x: 620, y: 1300, r: 420, a: .8, tint: 'rgba(170,210,255,.08)' }]);
  },
  post(c, lt) { if (lt > 0.4 && lt < 3.4) label(c, 'KROKI', 540, 300, 'dark', 48, lt - .4, 3.4 - lt); if (lt > 5.2 && lt < 7.6) label(c, 'TELEFON: 1% · WYŁĄCZA SIĘ', 540, 300, 'red', 40, lt - 5.2, 7.6 - lt); if (lt > 8.4) label(c, 'BRAMA ZAMKNIĘTA', 540, 300, 'red', 48, lt - 8.4, 14 - lt); },
});
// 5. SKLEP: Maja wraca na oświetloną ulicę i wpada do sklepu 24h. Kasjerka dzwoni na 112. (ZASADA)
scene({
  name: 'shop', start: 58, end: 72,
  bubbles: [
    say(1.6, 4.2, 'Ktoś szedł za mną\nprzez garaże!', 'maja', 600, 1640, 2.0, 0),
    say(4.6, 7.2, 'Siadaj tu, przy ladzie.\nDzwonię na 112.', 'kasjerka', 940, 1640, 1.9, -120),
    say(7.6, 9.6, 'I podłącz telefon.', 'kasjerka', 940, 1640, 1.9, -120),
  ],
  draw(c, lt, sc) {
    shopBg(c, lt, { outside: lt > 9.6 && lt < 12 ? .9 : 0 });
    person(c, 'maja', lt < 1.2 ? lerp(100, 600, lt / 1.2) : 600, 1640, 2.0, { t: lt, walk: lt < 1.2 ? lt * 12 : null, look: 1, wide: true, talk: talking(sc, 'maja', lt) });
    person(c, 'kobieta', 940, 1640, 1.9, { t: lt, look: -1, talk: talking(sc, 'kasjerka', lt), phone: lt > 6 ? 2 : 0, aR: lt > 6 ? 2.0 : null }); fillRR(c, 940 - 70, 1640 - 1.9 * 175, 140, 1.9 * 95, 14, '#30A46C'); txt(c, '24h', 940, 1640 - 1.9 * 130, 34, '#FFFFFF', 900);
    night(c, .1, []);
  },
  post(c, lt) { if (lt > 10.0) card(c, 60, 300, 900, 'ZASADA', 'Wracasz po zmroku? Wybieraj oświetloną\ndrogę, gdzie są ludzie. Napisz komuś,\nktórędy idziesz, i naładuj telefon.', lt - 10.0, '#F39C12', 36); },
});
// 6. MAMA: przyjeżdża po nią.
scene({
  name: 'mama', start: 72, end: 84,
  bubbles: [
    say(1.2, 4.0, 'Następnym razem napisz,\nktórędy wracasz.', 'mama', 360, 1640, 2.0, 40),
    say(4.4, 6.6, 'I żadnych skrótów\nprzez garaże.', 'mama', 360, 1640, 2.0, 40),
    say(7.0, 8.6, 'Obiecuję, mamo.', 'maja', 740, 1640, 2.0, -40),
  ],
  draw(c, lt, sc) {
    streetBg(c, lt, { shop: true });
    person(c, 'kobieta', 360, 1640, 2.0, { t: lt, look: 1, talk: talking(sc, 'mama', lt) });
    person(c, 'maja', 740, 1640, 2.0, { t: lt, look: -1, talk: talking(sc, 'maja', lt) });
    breathPuff(c, 380, 1640 - 2.0 * 250, lt); breathPuff(c, 760, 1640 - 2.0 * 250, lt + .5);
    snowfall(c, lt, 70, .75); night(c, .45, [{ x: 990, y: 950, r: 520, a: .9 }, { x: 126, y: 1100, r: 420, a: .9 }]);
  },
});
// 7. ZAKOŃCZENIE: w kieszeni torby klucz z numerem 13. W oknie garaż 13 się otwiera. Światło gaśnie. Szept.
scene({
  name: 'end', start: 84, end: 104,
  cam: lt => { const sh = lt > 15.6 && lt < 16.2 ? (16.2 - lt) * 30 : 0; return { z: 1, x: Math.sin(lt * 90) * sh, y: 0 }; },
  labels: [[17.0, 20, 'ODC. 2 ↓', 540, 1650, 'red', 64]],
  draw(c, lt) {
    const open = lt > 9.0 ? clamp((lt - 9.0) / 3) * .8 : 0, dark = lt > 13.4;
    majaRoom(c, lt, { open13: open, dark, lampOff: true, inside13: (cc, gx, gy) => { person(cc, 'obcy', gx, gy, 1.7, { t: lt, mouth: 'grin', aR: lt > 12 ? 2.4 + Math.sin(lt * 6) * .5 : null, still: true }); } });
    person(c, 'maja', 230, 1700, 2.1, { t: lt, look: lt > 8.6 ? 1 : 0, wide: lt > 4, mouth: lt > 4 ? 'o' : null, aR: lt > 3 && lt < 9 ? 1.8 : null });
    if (lt > 3.0 && lt < 9.0) keyTag(c, 470, 1180, 1.4, clamp((lt - 3.0) / .3));
    night(c, dark ? .9 : .55, [{ x: 780, y: 660, r: dark ? 260 : 420, a: .9 }]);
    if (lt > 15.6 && lt < 15.85) { c.fillStyle = 'rgba(255,255,255,.55)'; c.fillRect(0, 0, W, H); }
    if (lt > 16.6) { c.fillStyle = `rgba(0,0,0,${clamp((lt - 16.6) / 1.2) * .88})`; c.fillRect(0, 0, W, H); }
  },
  post(c, lt) { if (lt > 3.4 && lt < 8.6) label(c, 'KLUCZ Z NUMEREM 13. NIE JEJ.', 540, 300, 'red', 40, lt - 3.4, 8.6 - lt); if (lt > 9.4 && lt < 13.2) label(c, 'GARAŻ 13 SIĘ OTWIERA', 540, 300, 'dark', 44, lt - 9.4, 13.2 - lt); },
});
