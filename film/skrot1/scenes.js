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
    const open = (o.open13 && num === 13 ? o.open13 : 0) || (o.openNum === num ? o.openAmt : 0), inside = num === 13 ? o.inside13 : o.insideN, darkIn = o.openNum === num && o.darkInside;
    // drzwi blaszane z przetłoczeniami
    const dh = 420 * (1 - open);
    if (open > 0) { c.fillStyle = inside && !darkIn ? '#E8C27A' : '#07080C'; c.fillRect(gx + 30, 940, 240, 420);
      if (inside && !darkIn) { for (let k = 0; k < 4; k++) fillRR(c, gx + 40 + k * 56, 960, 44, 20, 3, '#B89A60'); fillRR(c, gx + 200, 1180, 56, 180, 6, '#6A5640'); circ(c, gx + 228, 1220, 6, '#2A2D36'); c.strokeStyle = '#3A3020'; c.lineWidth = 3; c.beginPath(); c.moveTo(gx + 150, 940); c.lineTo(gx + 150, 990); c.stroke(); circ(c, gx + 150, 998, 12, '#FFF3C4');
        const g = c.createRadialGradient(gx + 150, 1000, 6, gx + 150, 1200, 330); g.addColorStop(0, 'rgba(255,220,140,.6)'); g.addColorStop(1, 'rgba(255,220,140,0)'); c.fillStyle = g; c.fillRect(gx - 200, 900, 700, 700); }
      if (inside) { c.save(); c.beginPath(); c.rect(gx + 30, 940, 240, 420); c.clip(); inside(c, gx + 150, 1360); c.restore(); } }
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
// mapa w aplikacji: kwartały bloków z nazwami ulic, park, sklep 24h, rząd garaży, latarnie (działające / zepsute),
// ludzie na ulicy, niebieska kropka „Ty”, trasy rysują się po kolei, na dole karty wyboru trasy
function routeMap(c, lt, pick) {
  c.fillStyle = '#0B0E18'; c.fillRect(0, 0, W, H);
  bigPhone(c, (cc, x, y, w, h) => {
    cc.save(); cc.beginPath(); cc.rect(x, y, w, h); cc.clip();
    cc.fillStyle = '#E9E6DE'; cc.fillRect(x, y, w, h); // tło mapy (tryb dzienny aplikacji, ciemny kadr filmu)
    const hh = h - 400, X = v => x + v * w, Y = v => y + 160 + v * hh;
    // park
    fillRR(cc, X(.05), Y(.36), w * .32, hh * .17, 18, '#BFD8B0'); for (let i = 0; i < 9; i++) circ(cc, X(.09 + (i % 3) * .1), Y(.39 + Math.floor(i / 3) * .05), 12, '#9CC48A'); txt(cc, 'Park', X(.21), Y(.445), 20, '#4F7A42', 800);
    // kwartały bloków
    const blocks = [[.05, .08, .26, .2], [.36, .08, .24, .12], [.65, .08, .3, .2], [.42, .36, .2, .17], [.68, .36, .27, .17], [.05, .6, .3, .16], [.68, .6, .27, .16], [.05, .82, .26, .12]];
    for (const [bx, by, bw, bh] of blocks) { fillRR(cc, X(bx), Y(by), w * bw, hh * bh, 10, '#D7D2C6'); for (let i = 0; i < 3; i++) fillRR(cc, X(bx) + 14 + i * (w * bw - 28) / 3, Y(by) + 14, (w * bw - 28) / 3 - 10, hh * bh - 28, 6, '#CBC5B6'); }
    // ulice (białe) z nazwami
    cc.fillStyle = '#FFFFFF'; cc.fillRect(X(.31), y, w * .05, h); cc.fillRect(X(.62), y, w * .06, h); cc.fillRect(x, Y(.29), w, hh * .07); cc.fillRect(x, Y(.54), w, hh * .06); cc.fillRect(x, Y(.77), w, hh * .05);
    cc.save(); cc.translate(X(.335), Y(.7)); cc.rotate(-Math.PI / 2); txt(cc, 'ul. Długa', 0, 0, 18, '#8A8F9A', 800); cc.restore();
    txt(cc, 'ul. Kasztanowa', X(.82), Y(.325), 18, '#8A8F9A', 800); txt(cc, 'ul. Szkolna', X(.18), Y(.57), 18, '#8A8F9A', 800);
    // rząd garaży między halą a domem
    for (let i = 0; i < 7; i++) fillRR(cc, X(.4) + i * 30, Y(.62), 26, 40, 3, i === 3 ? '#C9A08A' : '#A9AEB8'); txt(cc, 'GARAŻE', X(.52), Y(.705), 18, '#6E7380', 900);
    // hala, sklep, dom
    fillRR(cc, X(.07), Y(.83), w * .22, hh * .09, 12, '#1E5AA8'); txt(cc, 'HALA', X(.18), Y(.875), 24, '#fff', 900);
    fillRR(cc, X(.7), Y(.62), w * .14, hh * .06, 10, '#30A46C'); txt(cc, '24h', X(.77), Y(.65), 20, '#fff', 900);
    fillRR(cc, X(.7), Y(.12), w * .22, hh * .1, 12, '#2E2E3A'); txt(cc, 'DOM', X(.81), Y(.17), 24, '#fff', 900);
    const P = (a, b) => [X(a), Y(b)];
    const street = [P(.18, .83), P(.18, .795), P(.65, .795), P(.65, .325), P(.81, .325), P(.81, .22)];
    const cut = [P(.18, .83), P(.38, .68), P(.58, .6), P(.58, .42), P(.74, .24), P(.81, .22)];
    function path(pts, prog, col, wdt, dash) { const L = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; }
      let left = tot * prog; cc.strokeStyle = col; cc.lineWidth = wdt; cc.lineCap = 'round'; cc.lineJoin = 'round'; cc.setLineDash(dash || []); cc.beginPath(); cc.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length && left > 0; i++) { const f = Math.min(1, left / L[i - 1]); cc.lineTo(lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)); left -= L[i - 1]; } cc.stroke(); cc.setLineDash([]); }
    const p1 = eio(clamp((lt - .3) / 2)), p2 = eio(clamp((lt - 2.8) / 1.6));
    path(street, p1, 'rgba(0,0,0,.15)', 18); path(street, p1, '#2F7BF6', 12);
    path(cut, p2, '#E8343F', 10, [18, 14]);
    // latarnie: na ulicy świecą, przy garażach zepsute
    if (p1 > .3) for (const [lx, ly] of [[.3, .79], [.5, .79], [.66, .65], [.66, .45], [.76, .32]]) { cc.save(); cc.globalAlpha = clamp((p1 - .3) * 3); circ(cc, X(lx), Y(ly), 14, 'rgba(255,200,80,.45)'); circ(cc, X(lx), Y(ly), 6, '#F5B82E'); cc.restore(); }
    if (p2 > .3) for (const [lx, ly] of [[.45, .65], [.58, .5]]) { cc.save(); cc.globalAlpha = clamp((p2 - .3) * 3); circ(cc, X(lx), Y(ly), 8, '#8A8F9A'); cc.strokeStyle = '#E8343F'; cc.lineWidth = 3; cc.beginPath(); cc.moveTo(X(lx) - 7, Y(ly) - 7); cc.lineTo(X(lx) + 7, Y(ly) + 7); cc.moveTo(X(lx) + 7, Y(ly) - 7); cc.lineTo(X(lx) - 7, Y(ly) + 7); cc.stroke(); cc.restore(); }
    // ludzie na ulicy
    if (p1 > .6) for (const [px, py] of [[.42, .81], [.68, .5]]) { circ(cc, X(px), Y(py) - 10, 6, '#4A4F5C'); fillRR(cc, X(px) - 6, Y(py) - 4, 12, 16, 5, '#4A4F5C'); }
    // niebieska kropka „Ty”
    const pu = .5 + .5 * Math.sin(lt * 5); circ(cc, X(.18), Y(.83), 22 + pu * 10, 'rgba(47,123,246,.2)'); circ(cc, X(.18), Y(.83), 12, '#fff'); circ(cc, X(.18), Y(.83), 8, '#2F7BF6');
    // pasek wyszukiwania i bateria
    fillRR(cc, x + 24, y + 70, w - 48, 70, 35, '#FFFFFF'); txt(cc, '🔍  Dom · Kasztanowa 12', x + 60, y + 105, 24, '#2A2D36', 700, 'left');
    txt(cc, '21:48', x + 40, y + 34, 22, '#2A2D36', 900, 'left'); fillRR(cc, x + w - 110, y + 20, 70, 28, 6, '#2A2D36'); fillRR(cc, x + w - 106, y + 24, 6, 20, 2, '#E8343F'); txt(cc, '4%', x + w - 64, y + 35, 18, '#E8343F', 900);
    // karty wyboru trasy
    const cy0 = y + h - 230; fillRR(cc, x, cy0, w, 230, 30, '#FFFFFF');
    const opt = (ox, title, sub, col, sel) => { fillRR(cc, ox, cy0 + 30, w / 2 - 36, 170, 20, sel ? col : '#F1F2F5'); txt(cc, title, ox + (w / 2 - 36) / 2, cy0 + 90, 40, sel ? '#fff' : col, 900); txt(cc, sub, ox + (w / 2 - 36) / 2, cy0 + 140, 18, sel ? '#fff' : '#6E7380', 800); };
    opt(x + 24, '15 min', 'ulicą · światło, ludzie', '#2F7BF6', false); opt(x + w / 2 + 12, '5 min', 'garaże · nieoświetlone', '#E8343F', pick);
    if (lt > 3.8 && lt < 5.0) { const a = clamp((lt - 3.8) / .3), fx = x + w * .75, fy = cy0 + 120; cc.save(); cc.globalAlpha = a; circ(cc, fx, fy, 30 + (lt - 4.4 > 0 ? (lt - 4.4) * 60 : 0), 'rgba(0,0,0,.12)'); circ(cc, fx, fy, 18, 'rgba(40,40,50,.55)'); cc.restore(); }
    if (pick) { fillRR(cc, x + 30, y + 150, w - 60, 60, 16, '#E8343F'); txt(cc, '⚠ Trasa przez nieoświetlony teren', x + w / 2, y + 180, 22, '#fff', 900); }
    cc.restore();
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
// 0. HAK: w głębi garaży, w oświetlonym garażu 13, stoi ktoś i się uśmiecha. Maja idzie prosto tam.
scene({
  name: 'hook', start: 0, end: 6,
  draw(c, lt) {
    garagesBg(c, lt, { first: 11, open13: .9, noBin: true, inside13: (cc, gx, gy) => person(cc, 'obcy', gx, gy, 1.3, { t: lt, mouth: 'grin', still: true, aR: lt > 3 ? 2.3 + Math.sin(lt * 5) * .4 : null }) });
    person(c, 'maja', 300, 1760, 2.2, { t: lt, back: true, walk: lt * 8 });
    night(c, .7, [{ x: 750, y: 1150, r: 420, a: .95 }, { x: 945, y: 1100, r: 300, a: .6 }]);
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
    circ(c, 560, 1620, 40, '#E8833A'); c.strokeStyle = '#3A2010'; c.lineWidth = 4; c.beginPath(); c.arc(560, 1620, 40, 0, 7); c.moveTo(520, 1620); c.lineTo(600, 1620); c.moveTo(560, 1580); c.lineTo(560, 1660); c.stroke();
    c.save(); c.globalAlpha = .45; person(c, 'kurier', 650, 1120, 1.0, { t: lt, still: true, aR: 2.3 + Math.sin(lt * 4) * .3 }); c.restore();
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
    garagesBg(c, lt, { first: 11, scroll: sc2, noBin: true, open13: lt > 3.0 ? clamp((lt - 3.0) / 1.2) * .9 : .1, inside13(cc, gx, gy) { person(cc, 'obcy', gx, gy, 1.3, { t: lt, look: -1, mouth: lt > 9 ? 'grin' : null, talk: talking(sc, 'obcy', lt), still: true }); fillRR(cc, gx - 120, gy - 140, 70, 140, 6, '#5A4A3A'); } });
    person(c, 'maja', 200, 1700, 2.0, { t: lt, walk: lt < 3.6 || lt > 12.4 ? lt * 9 : null, look: lt > 3.6 ? 1 : 1, wide: lt > 9, talk: talking(sc, 'maja', lt), mouth: lt > 12 ? 'o' : null });
    night(c, .55, [{ x: 945, y: 1100, r: 420, a: .8 }, { x: 760, y: 1150, r: 380, a: .9 }]);
  },
  post(c, lt) { if (lt > 12.6 && lt < 14.6) label(c, 'SKĄD ZNA JEJ IMIĘ?', 540, 300, 'red', 44, lt - 12.6, 14.6 - lt); if (lt > 13.6) card(c, 70, 1460, 860, 'BŁĄD 2', 'nikt nie wiedział, którędy idzie,\na telefon miał 4% baterii', lt - 13.6, '#F39C12', 40); },
});
// 4. POŚCIG: Obcy idzie za nią — wolno, pewnie. Na końcu garaży brama na kłódkę. Maja szarpie, odwraca się:
// on stoi i się uśmiecha. Wchodzi do ciemnego garażu 21. Maja przebiega obok — z ciemności patrzą jego oczy.
function gate(c, lt, shake) {
  const sx = Math.sin(lt * 60) * shake * 8;
  c.save(); c.translate(sx, 0);
  c.fillStyle = '#4A505C'; c.fillRect(760, 900, 22, 520); c.fillRect(1060, 900, 22, 520); // słupki
  fillRR(c, 782, 930, 278, 16, 3, '#7E8794'); fillRR(c, 782, 1380, 278, 14, 3, '#7E8794'); fillRR(c, 782, 1150, 278, 12, 3, '#7E8794');
  c.strokeStyle = '#8E97A4'; c.lineWidth = 9; for (let i = 0; i < 9; i++) { c.beginPath(); c.moveTo(800 + i * 31, 940); c.lineTo(800 + i * 31, 1386); c.stroke(); }
  c.lineWidth = 12; c.beginPath(); c.moveTo(790, 1380); c.lineTo(1050, 940); c.stroke(); // ukośne wzmocnienie
  c.strokeStyle = '#6E7682'; c.lineWidth = 3; for (let i = 0; i < 14; i++) { c.beginPath(); c.moveTo(770 + i * 22, 900); c.lineTo(780 + i * 22, 884); c.lineTo(790 + i * 22, 900); c.stroke(); } // drut kolczasty
  c.strokeStyle = '#C9CDD2'; c.lineWidth = 6; for (let i = 0; i < 6; i++) { c.beginPath(); c.ellipse(900 + i * 14, 1160 + (i % 2) * 6, 9, 6, .5, 0, 7); c.stroke(); } // łańcuch
  fillRR(c, 930, 1170, 44, 54, 8, '#C9A15A'); c.strokeStyle = '#C9A15A'; c.lineWidth = 6; c.beginPath(); c.arc(952, 1170, 14, Math.PI, 0); c.stroke(); circ(c, 952, 1196, 5, '#2A2D36');
  fillRR(c, 800, 990, 240, 80, 6, '#E8E4DA'); txt(c, 'TEREN PRYWATNY', 920, 1018, 22, '#D7263D', 900); txt(c, 'ZAKAZ PRZEJŚCIA', 920, 1048, 20, '#14161B', 900);
  c.restore();
}
// widok zza bramy: alejka garaży w perspektywie, na końcu jasna ulica
const VP = [540, 860], FOC = 760, CAMH = 1.15;
function pj(X, Y, Z) { return [VP[0] + X * FOC / Z, VP[1] + (CAMH - Y) * FOC / Z]; }
function quad(c, a, b, d, e, col) { c.fillStyle = col; c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.lineTo(d[0], d[1]); c.lineTo(e[0], e[1]); c.closePath(); c.fill(); }
function alleyPOV(c, lt, o = {}) {
  const sky = c.createLinearGradient(0, 0, 0, VP[1]); sky.addColorStop(0, '#03050B'); sky.addColorStop(1, '#151B2C'); c.fillStyle = sky; c.fillRect(0, 0, W, H);
  // jasna ulica na końcu alejki
  const g = c.createRadialGradient(VP[0], VP[1] - 20, 4, VP[0], VP[1] - 20, 260); g.addColorStop(0, 'rgba(255,215,140,.9)'); g.addColorStop(1, 'rgba(255,215,140,0)'); c.fillStyle = g; c.fillRect(VP[0] - 260, VP[1] - 280, 520, 520);
  fillRR(c, VP[0] - 40, VP[1] - 60, 80, 60, 4, '#F7D79A');
  // asfalt
  quad(c, pj(-1.7, 0, 1.0), pj(1.7, 0, 1.0), pj(1.7, 0, 30), pj(-1.7, 0, 30), '#15181E');
  for (const [px, pz, pw] of [[-.6, 2.4, .8], [.5, 4.2, .9]]) { const a = pj(px, 0, pz), b = pj(px + pw, 0, pz + .6); c.save(); c.globalAlpha = .5; fillRR(c, a[0], b[1], b[0] - a[0], a[1] - b[1], 20, '#2A3550'); c.restore(); }
  // ściany garaży po obu stronach, od najdalszych
  for (const side of [-1, 1]) {
    for (let k = 9; k >= 0; k--) {
      const z0 = 1.3 + k * 1.1, z1 = z0 + 1.0, X = side * 1.7;
      if (o.gapSide === side && o.gapK === k) { // przejście między garażami: na końcu jasna ulica, latarnia, strzałka
        quad(c, pj(X, 0, z0), pj(X, 2.1, z0), pj(X, 2.1, z1 + .1), pj(X, 0, z1 + .1), '#0B0E16');
        const gc = pj(X, 1.0, (z0 + z1) / 2), gw = 900 / z0; const lg = c.createRadialGradient(gc[0], gc[1], 6, gc[0], gc[1], gw); lg.addColorStop(0, 'rgba(255,225,160,1)'); lg.addColorStop(1, 'rgba(255,215,140,0)');
        c.save(); c.beginPath(); const q1 = pj(X, 0, z0), q2 = pj(X, 2.1, z0), q3 = pj(X, 2.1, z1 + .1), q4 = pj(X, 0, z1 + .1); c.moveTo(q1[0], q1[1]); c.lineTo(q2[0], q2[1]); c.lineTo(q3[0], q3[1]); c.lineTo(q4[0], q4[1]); c.closePath(); c.clip();
        c.fillStyle = lg; c.fillRect(gc[0] - gw, gc[1] - gw, gw * 2, gw * 2); const ls = pj(X, 1.6, (z0 + z1) / 2); c.fillStyle = '#20242F'; c.fillRect(ls[0] - 3, ls[1], 6, 260 / z0); c.restore();
        quad(c, pj(X, 0, z0), pj(X * 1.6, 0, z0), pj(X * 1.6, 0, z1 + .1), pj(X, 0, z1 + .1), '#1B1F27'); // ścieżka
        if (o.gapSign) { const sp = pj(X * .97, 1.75, z0 + .25), ss2 = 420 / z0; fillRR(c, sp[0] - ss2 * .9, sp[1] - ss2 * .28, ss2 * 1.1, ss2 * .45, 6, '#30A46C'); txt(c, '→ ULICA', sp[0] - ss2 * .35, sp[1] - ss2 * .05, ss2 * .2, '#fff', 900); }
        continue;
      }
      quad(c, pj(X, 0, z0), pj(X, 2.1, z0), pj(X, 2.1, z1 + .1), pj(X, 0, z1 + .1), '#3A404C'); // ściana
      const open = o.openSide === side && o.openK === k ? o.openAmt : 0;
      const dTop = 1.9, dBot = 0, dh = dTop - (dTop - dBot) * 0; // drzwi
      quad(c, pj(X * .995, 0, z0 + .08), pj(X * .995, dTop, z0 + .08), pj(X * .995, dTop, z1 - .08), pj(X * .995, 0, z1 - .08), '#07080C');
      const dy = dTop * open;
      quad(c, pj(X * .99, dy, z0 + .08), pj(X * .99, dTop, z0 + .08), pj(X * .99, dTop, z1 - .08), pj(X * .99, dy, z1 - .08), k === 3 && side === -1 ? '#5E5248' : '#6A727E');
      for (let r = 1; r < 6; r++) { const yy = dy + (dTop - dy) * r / 6; const a = pj(X * .985, yy, z0 + .08), b = pj(X * .985, yy, z1 - .08); c.strokeStyle = 'rgba(0,0,0,.2)'; c.lineWidth = Math.max(1, 6 / z0); c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke(); }
      const n = pj(X * .98, 2.0, (z0 + z1) / 2); const sz = 120 / z0; fillRR(c, n[0] - sz * .5, n[1] - sz * .3, sz, sz * .55, 3, '#E8E4DA'); txt(c, String(side < 0 ? 26 - k * 2 : 25 - k * 2), n[0], n[1] - sz * .03, sz * .38, '#14161B', 900);
      if (o.insideEyes && o.openSide === side && o.openK === k && open > .5) { const m = pj(X * .8, 1.5, (z0 + z1) / 2), es = 150 / ((z0 + z1) / 2);
        c.save(); c.shadowColor = 'rgba(255,255,255,.9)'; c.shadowBlur = 20; ell(c, m[0] - es * .25, m[1], es * .13, es * .09, '#F4F1EA'); ell(c, m[0] + es * .25, m[1], es * .13, es * .09, '#F4F1EA'); c.restore(); circ(c, m[0] - es * .25, m[1], es * .05, '#111'); circ(c, m[0] + es * .25, m[1], es * .05, '#111');
        c.fillStyle = '#0E0809'; c.beginPath(); c.moveTo(m[0] - es * .45, m[1] + es * .45); c.quadraticCurveTo(m[0], m[1] + es * .75, m[0] + es * .45, m[1] + es * .45); c.quadraticCurveTo(m[0], m[1] + es * .6, m[0] - es * .45, m[1] + es * .45); c.fill(); }
    }
    // dach
    quad(c, pj(side * 1.7, 2.1, 1.3), pj(side * 2.4, 2.4, 1.3), pj(side * 2.4, 2.4, 13), pj(side * 1.7, 2.1, 13), '#2A2F3A');
  }
  // migająca latarnia w połowie alejki
  const lp = pj(1.5, 3.0, 5.5), fl = o.lampOff ? 0 : (hash(Math.floor(lt * 9)) > .35 ? 1 : .15);
  const lb = pj(1.5, 0, 5.5); c.strokeStyle = '#20242F'; c.lineWidth = 6; c.beginPath(); c.moveTo(lb[0], lb[1]); c.lineTo(lp[0], lp[1]); c.stroke();
  if (fl > .2) { const lg = c.createRadialGradient(lp[0], lp[1], 4, lp[0], lb[1], 340); lg.addColorStop(0, `rgba(255,200,120,${.4 * fl})`); lg.addColorStop(1, 'rgba(255,200,120,0)'); c.fillStyle = lg; c.fillRect(lp[0] - 340, lp[1], 680, 600); }
  for (let k = 0; k < 50; k++) circ(c, hash(k) * W, (hash(k + 9) * 1700 + lt * 70) % 1700 + 150, 1.6 + hash(k + 3) * 2.4, 'rgba(235,240,255,.55)');
}
// pierwszy plan: kraty bramy na całą szerokość (patrzymy zza bramy)
function gateFront(c, lt, shake) {
  const sx = Math.sin(lt * 60) * shake * 10;
  c.save(); c.translate(sx, 0);
  c.fillStyle = '#2E333C'; c.fillRect(0, 400, 46, 1520); c.fillRect(W - 46, 400, 46, 1520); // słupki
  fillRR(c, 0, 420, W, 22, 4, '#59616E'); fillRR(c, 0, 1560, W, 22, 4, '#59616E');
  for (let i = 0; i < 9; i++) { const x = 110 + i * 108; const g = c.createLinearGradient(x - 6, 0, x + 6, 0); g.addColorStop(0, '#3E4550'); g.addColorStop(.5, '#A3ACB7'); g.addColorStop(1, '#3E4550'); c.fillStyle = g; c.fillRect(x - 6, 430, 12, 1490); }
  c.strokeStyle = 'rgba(89,97,110,.9)'; c.lineWidth = 12; c.beginPath(); c.moveTo(46, 1560); c.lineTo(W - 46, 440); c.stroke();
  c.strokeStyle = '#7E8794'; c.lineWidth = 3; for (let i = 0; i < 26; i++) { c.beginPath(); c.moveTo(i * 44, 420); c.lineTo(i * 44 + 22, 392); c.lineTo(i * 44 + 44, 420); c.stroke(); } // drut kolczasty
  c.strokeStyle = '#C9CDD2'; c.lineWidth = 9; for (let i = 0; i < 6; i++) { c.beginPath(); c.ellipse(450 + i * 30, 1572 + (i % 2) * 10, 16, 10, .4, 0, 7); c.stroke(); }
  fillRR(c, 500, 1590, 86, 100, 14, '#C9A15A'); c.strokeStyle = '#C9A15A'; c.lineWidth = 11; c.beginPath(); c.arc(543, 1592, 26, Math.PI, 0); c.stroke(); circ(c, 543, 1642, 9, '#2A2D36');
  c.save(); c.translate(240, 1700); c.rotate(-.04); fillRR(c, -170, -56, 340, 112, 8, '#E8E4DA'); txt(c, 'TEREN PRYWATNY', 0, -18, 32, '#D7263D', 900); txt(c, 'ZAKAZ PRZEJŚCIA', 0, 24, 28, '#14161B', 900); c.restore();
  c.restore();
}
scene({
  name: 'chase', start: 44, end: 58,
  cam: lt => { const sh = lt > 9.4 && lt < 9.9 ? (9.9 - lt) * 26 : 0; return { z: 1, x: Math.sin(lt * 90) * sh, y: 0 }; },
  draw(c, lt) {
    if (lt >= 7.0) { // WIDOK ZZA BRAMY: z prawej boczne przejście między garażami → ulica
      alleyPOV(c, lt, { lampOff: false, gapSide: 1, gapK: 2, gapSign: lt > 10.2 });
      // Obcy: z głębi zbliża się z uśmiechem; staje; gdy Maja ucieka, rusza powoli w stronę bramy
      const oz = lt < 9.6 ? lerp(11, 6.6, clamp((lt - 7) / 2.6)) : lt < 11.8 ? 6.6 : lerp(6.6, 5.0, clamp((lt - 11.8) / 2.2)), op = pj(-.45, 0, oz), os = 4.4 / oz;
      person(c, 'obcy', op[0], op[1], os, { t: lt, walk: lt < 9.6 || lt > 11.8 ? lt * 8 : null, look: lt > 11.4 ? .8 : 0, mouth: 'grin', still: lt >= 9.6 && lt <= 11.8 });
      { c.save(); c.globalCompositeOperation = 'lighter'; for (const dx of [-16, 16]) { const ex = op[0] + dx * os, ey = op[1] - 232 * os; const g = c.createRadialGradient(ex, ey, 0, ex, ey, 20 * os); g.addColorStop(0, 'rgba(255,240,210,.45)'); g.addColorStop(1, 'rgba(255,240,210,0)'); c.fillStyle = g; c.fillRect(ex - 20 * os, ey - 20 * os, 40 * os, 40 * os); } c.restore(); }
      // Maja: biegnie do kamery → szarpie kraty → odwraca się, widzi go → dostrzega przejście z prawej → ucieka tam
      let mz = 1.7, mxw = .35, back = false, walkM = lt * 14, aR = null, aL = null, look = 0, ma = 1;
      if (lt < 8.4) mz = lerp(4.2, 1.7, (lt - 7) / 1.4);
      else if (lt < 9.6) { walkM = null; aR = 2.9 + Math.sin(lt * 34) * .15; aL = 2.9 + Math.sin(lt * 34 + 1) * .15; }
      else if (lt < 10.6) { walkM = null; back = true; }
      else if (lt < 11.2) { walkM = null; look = 1; } // spojrzenie w prawo: przejście
      else { const q = clamp((lt - 11.2) / 1.8); mz = lerp(1.7, 4.0, q); mxw = lerp(.35, 2.3, q); look = 1; walkM = lt * 16; ma = 1 - clamp((q - .7) / .3); }
      const mp = pj(mxw, 0, mz); if (ma > 0) person(c, 'maja', mp[0], mp[1], 3.2 / mz, { t: lt, walk: walkM, back, look, wide: true, mouth: 'o', aR, aL, alpha: ma });
      const gp = pj(1.7, 1.0, 4.0);
      night(c, .45, [{ x: VP[0], y: VP[1], r: 360, a: .8 }, { x: mp[0], y: mp[1] - 300, r: 460, a: .75, tint: 'rgba(170,210,255,.08)' }, { x: op[0], y: op[1] - 300 * os, r: 300, a: .8, tint: 'rgba(255,140,120,.06)' }, { x: gp[0], y: gp[1], r: 300, a: .9 }]);
      gateFront(c, lt, lt > 8.4 && lt < 9.6 ? 1 : 0);
      return;
    }
    const stop = 7.0, scroll = Math.min(lt, stop) * 200;
    const intoGarage = lt > 10.6 ? clamp((lt - 10.6) / 1.0) : 0;
    garagesBg(c, lt, { first: 15, scroll, lampOff: lt > 5.2, noBin: true, openNum: 21, openAmt: lt > 9.8 ? clamp((lt - 9.8) / .8) * .92 : 0, darkInside: true,
      insideN: (cc, gx, gy) => { if (intoGarage >= 1) { cc.save(); cc.shadowColor = 'rgba(255,255,255,.9)'; cc.shadowBlur = 24; ell(cc, gx - 18, gy - 330, 9, 6, '#F4F1EA'); ell(cc, gx + 18, gy - 330, 9, 6, '#F4F1EA'); cc.restore(); circ(cc, gx - 18, gy - 330, 3.5, '#111'); circ(cc, gx + 18, gy - 330, 3.5, '#111');
        cc.fillStyle = '#0E0809'; cc.beginPath(); cc.moveTo(gx - 34, gy - 290); cc.quadraticCurveTo(gx, gy - 262, gx + 34, gy - 290); cc.quadraticCurveTo(gx, gy - 274, gx - 34, gy - 290); cc.fill(); } } });
    if (lt > 6.4) gate(c, lt, lt > 8.4 && lt < 9.6 ? 1 : 0);
    // Obcy: wolno, pewnie, cały czas widoczny; po odwróceniu Mai stoi, potem wchodzi w ciemny garaż 21 (x≈430)
    let fx, fy = 1620, walkO = lt * 10;
    if (lt < 7.0) fx = lerp(-160, 180, clamp((lt - .6) / 6.4)); else if (lt < 10.6) { fx = lerp(180, 260, clamp((lt - 7) / 2)); walkO = lt < 9 ? lt * 10 : null; } else fx = lerp(260, 430, intoGarage);
    if (intoGarage < 1) {
      c.save(); c.translate(0, 3240); c.scale(1, -1); c.globalAlpha = .28; person(c, 'obcy', fx, fy, 1.8, { t: lt, walk: walkO, mouth: 'grin' }); c.restore(); // odbicie w kałuży
      person(c, 'obcy', fx, fy, 1.8, { t: lt, walk: walkO, look: 1, mouth: 'grin', alpha: lt > 10.6 ? 1 - intoGarage * .9 : 1, still: lt > 9 });
    }
    // Maja: biegnie w prawo → brama (stoi, szarpie) → odwraca się → czeka, aż on wejdzie do garażu → biegnie w lewo obok
    let mx = 620, look = 1, walkM = lt * 14, aR = 1.6, phone = 2;
    if (lt > 7.0 && lt < 8.4) { mx = lerp(620, 720, (lt - 7) / 1.4); }
    else if (lt >= 8.4 && lt < 9.6) { mx = 720; walkM = null; aR = 2.6 + Math.sin(lt * 30) * .2; phone = 0; }
    else if (lt >= 9.6 && lt < 11.6) { mx = 720; walkM = null; look = -1; aR = null; phone = 0; }
    else if (lt >= 11.6) { mx = lerp(720, -220, clamp((lt - 11.6) / 2.2)); look = -1; aR = null; phone = 0; walkM = lt * 16; }
    person(c, 'maja', mx, 1700, 2.0, { t: lt, walk: walkM, look, wide: true, mouth: 'o', phone, aR });
    night(c, lt > 5.2 ? .8 : .6, [{ x: mx, y: 1300, r: 420, a: .85, tint: 'rgba(170,210,255,.08)' }, { x: fx, y: 1250, r: 360, a: intoGarage < 1 ? .8 : 0, tint: 'rgba(255,120,120,.06)' }, { x: 920, y: 1100, r: 300, a: lt > 6.4 ? .7 : 0 }]);
  },
  post(c, lt) {
    if (lt > 0.4 && lt < 3.4) label(c, 'KROKI', 540, 300, 'dark', 48, lt - .4, 3.4 - lt);
    if (lt > 4.6 && lt < 6.8) label(c, 'TELEFON: 1% · WYŁĄCZA SIĘ', 540, 300, 'red', 40, lt - 4.6, 6.8 - lt);
    if (lt > 8.4 && lt < 9.8) label(c, 'BRAMA ZAMKNIĘTA', 540, 300, 'red', 48, lt - 8.4, 9.8 - lt);
    if (lt > 9.8 && lt < 10.8) label(c, 'ON STOI. I SIĘ UŚMIECHA.', 540, 300, 'dark', 42, lt - 9.8, 10.8 - lt);
    if (lt > 10.8) label(c, 'PRZEJŚCIE MIĘDZY GARAŻAMI → ULICA', 540, 300, 'yellow', 36, lt - 10.8, 14 - lt);
  },
});
// nocna pizzeria z zewnątrz: neon, witryna z ludźmi w środku, markiza, śnieg, latarnia
function pizzeriaFront(c, lt) {
  const sky = c.createLinearGradient(0, 0, 0, 1200); sky.addColorStop(0, '#04060D'); sky.addColorStop(1, '#151B2E'); c.fillStyle = sky; c.fillRect(0, 0, W, H);
  fillRR(c, 0, 360, W, 1060, 0, '#5A3A2E'); for (let r = 0; r < 26; r++) for (let q = 0; q < 10; q++) { c.fillStyle = (r + q) % 2 ? 'rgba(0,0,0,.08)' : 'rgba(255,255,255,.03)'; c.fillRect(q * 120 - (r % 2) * 60, 360 + r * 40, 116, 36); } // cegła
  // neon
  const on = .85 + .15 * Math.sin(lt * 9) * (hash(Math.floor(lt * 6)) > .1 ? 1 : 0);
  c.save(); c.shadowColor = `rgba(255,80,60,${on})`; c.shadowBlur = 40; fillRR(c, 160, 420, 760, 130, 20, '#1A0E0C'); txt(c, 'PIZZERIA NOCNA', 540, 486, 70, `rgba(255,110,90,${on})`, 900); c.restore();
  txt(c, 'czynne do 2:00', 540, 580, 30, '#F5C542', 800);
  // markiza w paski
  for (let i = 0; i < 12; i++) { c.fillStyle = i % 2 ? '#E8E4DA' : '#C23A3A'; c.beginPath(); c.moveTo(100 + i * 73, 640); c.lineTo(173 + i * 73, 640); c.lineTo(173 + i * 73, 710); c.quadraticCurveTo(136 + i * 73, 740, 100 + i * 73, 710); c.fill(); }
  // witryna: ciepłe wnętrze, ludzie przy stolikach
  fillRR(c, 100, 740, 560, 520, 6, '#F6D08A'); c.save(); c.beginPath(); c.rect(100, 740, 560, 520); c.clip();
  fillRR(c, 120, 1060, 200, 16, 4, '#6B4A2F'); fillRR(c, 420, 1060, 200, 16, 4, '#6B4A2F');
  person(c, 'sasiad', 190, 1250, .9, { t: lt, look: 1, talk: Math.sin(lt * 2) > 0 }); person(c, 'kobieta', 290, 1250, .9, { t: lt, look: -1, mouth: 'smile' }); person(c, 'kurier', 520, 1250, .9, { t: lt, box: true, look: -1, boxNum: ' ' });
  c.fillStyle = 'rgba(255,255,255,.12)'; c.fillRect(100, 740, 560, 520); c.restore();
  c.strokeStyle = '#2A1A14'; c.lineWidth = 14; c.strokeRect(100, 740, 560, 520);
  // drzwi
  fillRR(c, 720, 740, 260, 680, 6, '#2A1A14'); fillRR(c, 740, 760, 220, 400, 4, '#F6D08A'); fillRR(c, 930, 1180, 16, 60, 6, '#C9A15A'); txt(c, 'OTWARTE', 850, 1200, 26, '#30A46C', 900);
  { const g = c.createRadialGradient(540, 1000, 40, 540, 1200, 700); g.addColorStop(0, 'rgba(255,200,120,.35)'); g.addColorStop(1, 'rgba(255,200,120,0)'); c.fillStyle = g; c.fillRect(0, 600, W, 1300); }
  c.fillStyle = '#DDE2EC'; c.fillRect(0, 1420, W, 500); c.fillStyle = 'rgba(255,200,120,.25)'; c.fillRect(0, 1420, W, 160);
  snowfall(c, lt, 80, .75);
}
// pizzeria w środku: piec z ogniem, tablica menu, lada z kasą i ladówką, stoliki, klienci, kurier z pudełkiem, para na szybie
function pizzeriaIn(c, lt, o = {}) {
  c.fillStyle = '#E9DFC9'; c.fillRect(0, 0, W, 1440);
  for (let r = 0; r < 4; r++) for (let q = 0; q < 14; q++) { c.fillStyle = (r + q) % 2 ? '#1E6B4A' : '#F2EEE4'; c.fillRect(q * 80, 1300 + r * 36, 80, 36); } // kafelki
  // tablica z menu
  fillRR(c, 80, 280, 560, 330, 14, '#1E2228'); txt(c, 'MENU', 360, 330, 44, '#F5C542', 900);
  [['Margherita', '24 zł'], ['Pepperoni', '29 zł'], ['Hawajska', '28 zł'], ['Kebab z frytkami', '22 zł']].forEach(([n, pz], i) => { txt(c, n, 120, 390 + i * 52, 30, '#FFFFFF', 700, 'left'); txt(c, pz, 600, 390 + i * 52, 30, '#F5C542', 900, 'right'); });
  // piec z ogniem
  fillRR(c, 700, 260, 340, 380, 170, '#8A3E2A'); for (let i = 0; i < 9; i++) for (let j = 0; j < 4; j++) fillRR(c, 720 + i * 36 - (j % 2) * 18, 300 + j * 40, 32, 34, 3, '#A04A32');
  fillRR(c, 780, 480, 180, 130, 70, '#1A0A06'); for (let k = 0; k < 6; k++) { const fx = 800 + k * 26, fh = 50 + 30 * Math.abs(Math.sin(lt * 7 + k)); c.fillStyle = k % 2 ? '#FFB020' : '#FF6A2A'; c.beginPath(); c.moveTo(fx, 600); c.quadraticCurveTo(fx + 12, 600 - fh, fx + 24, 600); c.fill(); }
  { const g = c.createRadialGradient(870, 560, 10, 870, 560, 420); g.addColorStop(0, 'rgba(255,150,60,.35)'); g.addColorStop(1, 'rgba(255,150,60,0)'); c.fillStyle = g; c.fillRect(450, 200, 830, 800); }
  // witryna z parą na szybie i ulicą
  fillRR(c, 0, 680, 300, 560, 0, '#0B0F1C'); c.save(); c.beginPath(); c.rect(0, 680, 300, 560); c.clip(); c.fillStyle = '#DDE2EC'; c.fillRect(0, 1100, 300, 140); c.fillStyle = '#2A2D36'; c.fillRect(210, 820, 8, 300);
  { const lg = c.createRadialGradient(214, 840, 6, 214, 1000, 260); lg.addColorStop(0, 'rgba(255,190,110,.45)'); lg.addColorStop(1, 'rgba(255,190,110,0)'); c.fillStyle = lg; c.fillRect(0, 760, 300, 480); }
  if (o.outside) { c.save(); c.globalAlpha = o.outside; person(c, 'obcy', 130, 1240, .75, { t: lt, mouth: 'grin', look: 1, still: true }); c.restore(); }
  for (let k = 0; k < 16; k++) circ(c, hash(k) * 300, 690 + ((hash(k + 5) * 540 + lt * 60) % 540), 2.4, 'rgba(235,240,255,.7)');
  c.fillStyle = 'rgba(230,236,245,.22)'; c.fillRect(0, 680, 300, 560); for (let k = 0; k < 12; k++) { c.fillStyle = 'rgba(255,255,255,.12)'; c.fillRect(20 + hash(k) * 260, 700 + hash(k + 3) * 200, 3, 60 + hash(k + 7) * 160); } c.restore();
  c.strokeStyle = '#5A3D26'; c.lineWidth = 16; c.strokeRect(0, 680, 300, 560);
  // lada z kasą, ladówka z napojami, pudełka po pizzy
  fillRR(c, 560, 1040, 520, 270, 10, '#6B4A2F'); fillRR(c, 560, 1030, 520, 24, 6, '#8C6B4B');
  fillRR(c, 600, 960, 110, 74, 8, '#2A2D36'); fillRR(c, 610, 970, 90, 40, 4, '#5FD0FF'); txt(c, '24,00', 655, 990, 18, '#0B2030', 900);
  for (let i = 0; i < 3; i++) fillRR(c, 900, 1010 - i * 22, 150, 20, 4, ['#F2EEE4', '#E8DFC8', '#F2EEE4'][i]);
  // stolik z klientami po lewej
  fillRR(c, 330, 1180, 220, 18, 4, '#5A3D26'); c.fillStyle = '#4A3424'; c.fillRect(430, 1198, 18, 120);
  circ(c, 400, 1170, 30, '#F2C14E'); for (let i = 0; i < 5; i++) circ(c, 388 + (i % 3) * 12, 1160 + Math.floor(i / 3) * 14, 4, '#C23A3A'); // pizza
  // lampy wiszące
  for (const lx of [400, 820]) { c.fillStyle = '#2A2D36'; c.fillRect(lx - 2, 0, 4, 200); c.beginPath(); c.moveTo(lx - 60, 240); c.lineTo(lx + 60, 240); c.lineTo(lx + 30, 200); c.lineTo(lx - 30, 200); c.fillStyle = '#1E6B4A'; c.fill();
    const g = c.createRadialGradient(lx, 260, 6, lx, 600, 420); g.addColorStop(0, 'rgba(255,225,160,.35)'); g.addColorStop(1, 'rgba(255,225,160,0)'); c.fillStyle = g; c.fillRect(lx - 420, 240, 840, 900); }
  c.fillStyle = '#B8A88A'; c.fillRect(0, 1440, W, 480); for (let i = 0; i < 12; i++) { c.fillStyle = 'rgba(0,0,0,.05)'; c.fillRect(i * 90, 1440, 4, 480); }
}
// 5. PIZZERIA NOCNA: Maja wbiega z ulicy. W środku ludzie, ciepło, pracownica dzwoni na 112. (ZASADA)
scene({
  name: 'shop', start: 58, end: 72,
  bubbles: [
    say(1.6, 4.2, 'Ktoś szedł za mną\nprzez garaże!', 'maja', 600, 1700, 2.0, -40),
    say(4.6, 7.2, 'Siadaj tu, przy ladzie.\nDzwonię na 112.', 'kasjerka', 940, 1700, 2.0, -120),
    say(7.6, 9.6, 'I podłącz telefon.', 'kasjerka', 940, 1700, 2.0, -120),
  ],
  draw(c, lt, sc) {
    if (lt < 1.4) { // z zewnątrz: Maja wbiega do pizzerii
      pizzeriaFront(c, lt); person(c, 'maja', lerp(-120, 850, lt / 1.4), 1640, 1.8, { t: lt, walk: lt * 16, look: 1, wide: true, mouth: 'o' });
      night(c, .35, [{ x: 540, y: 1000, r: 800, a: .9 }]); return;
    }
    pizzeriaIn(c, lt, { outside: lt > 9.6 && lt < 12.2 ? clamp((lt - 9.6) / .4) * clamp((12.2 - lt) / .4) * .9 : 0 });
    // klienci przy stoliku i kurier z pudełkiem — patrzą na Maję
    person(c, 'sasiad', 380, 1500, 1.4, { t: lt, look: 1, mouth: lt > 2 ? 'o' : null });
    person(c, 'kurier', 780, 1420, 1.25, { t: lt, box: true, boxNum: ' ', look: -1 });
    person(c, 'maja', lt < 2.0 ? lerp(-100, 600, (lt - 1.4) / .6) : 600, 1700, 2.0, { t: lt, walk: lt < 2.0 ? lt * 14 : null, look: 1, wide: true, talk: talking(sc, 'maja', lt) });
    person(c, 'kobieta', 940, 1700, 2.0, { t: lt, look: -1, talk: talking(sc, 'kasjerka', lt), phone: lt > 6 ? 2 : 0, aR: lt > 6 ? 2.0 : null });
    fillRR(c, 940 - 72, 1700 - 2.0 * 175, 144, 2.0 * 95, 14, '#C23A3A'); txt(c, 'PIZZA', 940, 1700 - 2.0 * 130, 30, '#FFFFFF', 900); // fartuch
    c.save(); c.translate(940, 1700 - 2.0 * 300); fillRR(c, -56, -30, 112, 26, 8, '#C23A3A'); c.restore(); // czapka
    night(c, .08, []);
  },
  post(c, lt) { if (lt < 1.4) label(c, 'ŚWIATŁO. LUDZIE.', 540, 300, 'yellow', 44, lt, 1.4 - lt); if (lt > 9.6 && lt < 12.2) label(c, 'ZA SZYBĄ', 150, 640, 'red', 32, lt - 9.6, 12.2 - lt); if (lt > 10.0) card(c, 60, 300, 900, 'ZASADA', 'Wracasz po zmroku? Wybieraj oświetloną\ndrogę, gdzie są ludzie. Napisz komuś,\nktórędy idziesz, i naładuj telefon.', lt - 10.0, '#F39C12', 36); },
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
    majaRoom(c, lt, { open13: open, dark, lampOff: true, inside13: (cc, gx, gy) => { person(cc, 'obcy', gx, gy, 1.3, { t: lt, mouth: 'grin', aR: lt > 12 ? 2.4 + Math.sin(lt * 6) * .5 : null, still: true }); } });
    person(c, 'maja', 230, 1700, 2.1, { t: lt, look: lt > 8.6 ? 1 : 0, wide: lt > 4, mouth: lt > 4 ? 'o' : null, aR: lt > 3 && lt < 9 ? 1.8 : null });
    if (lt > 3.0 && lt < 9.0) keyTag(c, 470, 1180, 1.4, clamp((lt - 3.0) / .3));
    night(c, dark ? .9 : .55, [{ x: 780, y: 660, r: dark ? 260 : 420, a: .9 }]);
    if (lt > 15.6 && lt < 15.85) { c.fillStyle = 'rgba(255,255,255,.55)'; c.fillRect(0, 0, W, H); }
    if (lt > 16.6) { c.fillStyle = `rgba(0,0,0,${clamp((lt - 16.6) / 1.2) * .88})`; c.fillRect(0, 0, W, H); }
  },
  post(c, lt) { if (lt > 3.4 && lt < 8.6) label(c, 'KLUCZ Z NUMEREM 13. NIE JEJ.', 540, 300, 'red', 40, lt - 3.4, 8.6 - lt); if (lt > 9.4 && lt < 13.2) label(c, 'GARAŻ 13 SIĘ OTWIERA', 540, 300, 'dark', 44, lt - 9.4, 13.2 - lt); },
});
