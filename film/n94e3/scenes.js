// NOCNY N94 · ODC. 3 — „Nie zapalaj światła!”: on wysiada z Olą, ale nie idzie za nią. Czeka, aż zapali się okno.
window.EP = {
  badge: 'NOCNY N94 · ODC. 3',
  loop: false,
  vignette: .84,
  cues(add) {
    add(0.2, 'stab'); add(2.4, 'click'); add(6.2, 'whoosh'); add(12.4, 'whoosh'); add(17.0, 'notif'); add(19.6, 'hit'); add(22.6, 'door');
    add(26.4, 'whoosh'); add(31.0, 'hit'); add(42.4, 'whoosh'); add(45.0, 'buzz'); add(47.4, 'door'); add(50.6, 'hit');
    add(54.4, 'whoosh'); add(58.8, 'click'); add(60.2, 'hit'); add(68.4, 'whoosh'); add(70.4, 'dial'); add(78.4, 'click'); add(79.6, 'hit');
    add(82.4, 'whoosh'); add(84.0, 'siren'); add(90.0, 'hit'); add(96.4, 'whoosh'); add(101.0, 'notif'); add(106.0, 'knock'); add(106.6, 'knock'); add(107.2, 'knock'); add(109.6, 'click'); add(111.6, 'hit');
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

// ===== nowe tła =====
// blok 94 od frontu nocą: 10 pięter x 8 okien, klatka z daszkiem, domofon, latarnia po drugiej stronie, śnieg, auta, ślady
const BF = { x: 60, top: 300, w: 960, fh: 82, cols: 8 };
function winRect(floor, col) { const y = BF.top + (10 - floor) * BF.fh + 18, x = BF.x + col * (BF.w / BF.cols) + 22; return [x, y, BF.w / BF.cols - 44, BF.fh - 34]; }
function blockFront(c, lt, o = {}) {
  const sky = c.createLinearGradient(0, 0, 0, 1300); sky.addColorStop(0, '#03050B'); sky.addColorStop(1, '#141A2E'); c.fillStyle = sky; c.fillRect(0, 0, W, H);
  for (let i = 0; i < 50; i++) circ(c, hash(i) * W, hash(i + 3) * 280, 1 + hash(i + 7) * 1.6, `rgba(255,255,255,${.25 + .4 * Math.sin(lt * 2 + i) ** 2})`);
  // fasada z płyt
  c.fillStyle = '#262D45'; c.fillRect(BF.x, BF.top - 20, BF.w, 10 * BF.fh + 260);
  c.strokeStyle = 'rgba(0,0,0,.25)'; c.lineWidth = 3; for (let f = 0; f <= 10; f++) { c.beginPath(); c.moveTo(BF.x, BF.top + f * BF.fh); c.lineTo(BF.x + BF.w, BF.top + f * BF.fh); c.stroke(); }
  fillRR(c, BF.x - 10, BF.top - 40, BF.w + 20, 26, 4, '#1C2236'); txt(c, '94', BF.x + BF.w - 60, BF.top - 70, 34, 'rgba(255,255,255,.35)', 900);
  for (let f = 1; f <= 10; f++) for (let q = 0; q < BF.cols; q++) {
    const [x, y, w, h] = winRect(f, q); const is94 = f === 9 && q === 4;
    let col = '#111628'; const hv = hash(f * 17 + q * 5);
    if (!is94 && hv > (o.allDark ? 2 : .9)) col = hv > .95 ? '#E8B860' : '#5C7FB8';
    if (is94 && o.lit) col = '#FFD27A';
    fillRR(c, x, y, w, h, 3, col); c.fillStyle = 'rgba(255,255,255,.06)'; c.fillRect(x + w / 2 - 2, y, 4, h);
    fillRR(c, x - 6, y + h, w + 12, 8, 2, '#1A2034'); // parapet
    if (is94 && o.lit) { c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createRadialGradient(x + w / 2, y + h / 2, 4, x + w / 2, y + h / 2, 160); g.addColorStop(0, `rgba(255,210,120,${.55 * o.lit})`); g.addColorStop(1, 'rgba(255,210,120,0)'); c.fillStyle = g; c.fillRect(x - 160, y - 160, w + 320, h + 320); c.restore();
      if (o.silhouette) { c.fillStyle = 'rgba(20,16,24,.85)'; c.beginPath(); c.arc(x + w * .62, y + h * .42, 9, 0, 7); c.fill(); fillRR(c, x + w * .62 - 12, y + h * .55, 24, h * .45, 6, 'rgba(20,16,24,.85)'); } }
    if (o.pick && is94) { c.strokeStyle = '#FF3B30'; c.lineWidth = 5; c.strokeRect(x - 8, y - 8, w + 16, h + 16); }
  }
  // parter: klatka
  const gy = BF.top + 10 * BF.fh; c.fillStyle = '#1D2337'; c.fillRect(BF.x, gy, BF.w, 240);
  fillRR(c, 400, gy + 20, 280, 30, 4, '#3A4362'); // daszek
  { const lg = c.createRadialGradient(540, gy + 60, 5, 540, gy + 160, 300); lg.addColorStop(0, 'rgba(255,235,170,.55)'); lg.addColorStop(1, 'rgba(255,235,170,0)'); c.fillStyle = lg; c.fillRect(200, gy, 680, 400); }
  circ(c, 540, gy + 58, 10, '#FFF3C4');
  fillRR(c, 450, gy + 70, 180, 170, 4, o.doorOpen ? '#F2DFA8' : '#4A5876'); c.fillStyle = 'rgba(200,220,240,.25)'; c.fillRect(462, gy + 82, 156, 70); fillRR(c, 600, gy + 150, 14, 30, 4, '#C9CDD2');
  fillRR(c, 650, gy + 110, 40, 64, 6, '#D9D4C4'); fillRR(c, 656, gy + 118, 28, 18, 3, '#1E2A2A'); for (let i = 0; i < 6; i++) circ(c, 661 + (i % 3) * 9, gy + 146 + Math.floor(i / 3) * 10, 3, '#8C887C');
  txt(c, 'KASZTANOWA 12', 540, gy + 254, 18, 'rgba(255,255,255,.4)', 900);
  // śnieg, chodnik, jezdnia
  c.fillStyle = '#DDE2EC'; c.fillRect(0, gy + 240, W, 260); c.fillStyle = '#121624'; c.fillRect(0, gy + 500, W, 400);
  for (let i = 0; i < 6; i++) fillRR(c, i * 200 + 40, gy + 680, 110, 12, 4, 'rgba(230,230,210,.35)');
  // auta pod blokiem
  for (const [ax, col] of [[40, '#3A4052'], [250, '#5A2A30']]) { fillRR(c, ax, gy + 400, 280, 80, 26, col); fillRR(c, ax + 50, gy + 360, 170, 60, 22, col); fillRR(c, ax + 64, gy + 370, 66, 40, 8, '#1A2030'); fillRR(c, ax + 140, gy + 370, 66, 40, 8, '#1A2030'); c.fillStyle = '#E8EDF5'; c.fillRect(ax + 50, gy + 352, 170, 10); circ(c, ax + 60, gy + 482, 24, '#0A0C12'); circ(c, ax + 220, gy + 482, 24, '#0A0C12'); }
  // ślady butów do klatki
  if (o.prints) for (let i = 0; i < 9; i++) { const p = i / 8, px = lerp(o.prints[0], 540, p) + (i % 2 ? 14 : -14), py = lerp(o.prints[1], gy + 260, p); ell(c, px, py, 9, 16, 'rgba(80,90,120,.55)'); }
  // drzewa, latarnia po drugiej stronie (prawy dół)
  for (const [tx, ty, r] of [[20, gy + 200, 110], [1060, gy + 180, 120]]) circ(c, tx, ty, r, '#0A0E1A');
}
function streetLamp(c, x, y, h = 700) { c.fillStyle = '#20242F'; c.fillRect(x, y - h, 14, h); fillRR(c, x - 40, y - h - 10, 100, 18, 8, '#2A2F3C'); circ(c, x + 6, y - h + 14, 10, '#FFE8B0');
  const g = c.createRadialGradient(x + 6, y - h + 20, 8, x + 6, y, 420); g.addColorStop(0, 'rgba(255,200,120,.45)'); g.addColorStop(1, 'rgba(255,200,120,0)'); c.fillStyle = g; c.fillRect(x - 420, y - h, 860, h + 200); }
// pokój Oli: dywan we wzór, kaloryfer, okno z firanką, meblościanka, lampa z kloszem, zegar, plakat, włącznik przy drzwiach
function olaRoom(c, lt, lit = 0, o = {}) {
  c.fillStyle = '#3B3550'; c.fillRect(0, 0, W, 1420);
  for (let r = 0; r < 16; r++) for (let q = 0; q < 9; q++) { c.fillStyle = 'rgba(255,255,255,.05)'; c.beginPath(); c.arc(60 + q * 120 + (r % 2) * 60, 120 + r * 84, 8, 0, 7); c.fill(); }
  // okno z widokiem na latarnię
  fillRR(c, 90, 420, 420, 560, 8, '#0B1020'); for (let k = 0; k < 18; k++) circ(c, 100 + hash(k) * 400, 430 + ((hash(k + 4) * 540 + lt * 40) % 540), 2.4, 'rgba(235,240,255,.75)');
  if (o.outside) o.outside(c);
  c.strokeStyle = '#D9DCE6'; c.lineWidth = 16; c.strokeRect(90, 420, 420, 560); c.fillStyle = '#D9DCE6'; c.fillRect(292, 420, 16, 560);
  c.fillStyle = 'rgba(230,225,215,.28)'; for (let i = 0; i < 5; i++) c.fillRect(90 + i * 22 + Math.sin(lt * .8 + i) * 3, 420, 12, 560);
  fillRR(c, 60, 975, 480, 26, 4, '#E8E4DA'); for (let i = 0; i < 9; i++) fillRR(c, 110 + i * 44, 1010, 30, 140, 6, '#D6D1C2'); // kaloryfer
  // meblościanka
  fillRR(c, 600, 420, 440, 980, 6, '#6B4A2F'); for (let r = 0; r < 3; r++) fillRR(c, 620, 450 + r * 150, 400, 130, 4, '#5A3D26');
  for (let i = 0; i < 9; i++) fillRR(c, 640 + i * 40, 470 + hash(i) * 30, 28, 90 - hash(i) * 30, 3, ['#E85A4F', '#4FA8E8', '#F5C542', '#30A46C', '#7B4FC9', '#E8E4DA', '#D96A1E', '#1BB0A3', '#F28CB1'][i]);
  circ(c, 700, 790, 40, '#C9A15A'); fillRR(c, 800, 760, 160, 70, 10, '#2A2D36'); fillRR(c, 620, 900, 400, 470, 4, '#5A3D26'); fillRR(c, 810, 1100, 20, 60, 6, '#C9A15A');
  // zegar 01:28 i plakat
  circ(c, 330, 250, 56, '#E8E4DA'); c.strokeStyle = '#2A2D36'; c.lineWidth = 6; c.beginPath(); c.moveTo(330, 250); c.lineTo(330 + Math.cos(-Math.PI / 2 + 1.4) * 40, 250 + Math.sin(-Math.PI / 2 + 1.4) * 40); c.moveTo(330, 250); c.lineTo(330 + Math.cos(-Math.PI / 2 + 2.9) * 30, 250 + Math.sin(-Math.PI / 2 + 2.9) * 30); c.stroke();
  fillRR(c, 640, 180, 200, 200, 4, '#E85A4F'); circ(c, 740, 260, 50, '#F5C542');
  // lampa sufitowa z kloszem
  c.fillStyle = '#2A2D36'; c.fillRect(538, 0, 4, 120); c.beginPath(); c.moveTo(480, 170); c.lineTo(600, 170); c.lineTo(570, 120); c.lineTo(510, 120); c.fillStyle = lit ? '#F5D58A' : '#7A6A50'; c.fill();
  // podłoga i dywan we wzór
  c.fillStyle = '#4A3326'; c.fillRect(0, 1420, W, 500); fillRR(c, 120, 1500, 840, 300, 20, '#8E2F3A');
  for (let i = 0; i < 6; i++) { c.strokeStyle = '#E8C77A'; c.lineWidth = 6; c.beginPath(); c.moveTo(200 + i * 130, 1560); c.lineTo(250 + i * 130, 1650); c.lineTo(200 + i * 130, 1740); c.lineTo(150 + i * 130, 1650); c.closePath(); c.stroke(); }
  // włącznik
  fillRR(c, o.switchX ?? 560, 1060, 50, 70, 6, '#E8E4DA'); fillRR(c, (o.switchX ?? 560) + 15, 1072 + (lit ? 0 : 22), 20, 24, 4, '#C9C4B4');
  if (lit) { c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createRadialGradient(540, 180, 20, 540, 700, 1100); g.addColorStop(0, `rgba(255,220,150,${.32 * lit})`); g.addColorStop(1, 'rgba(255,220,150,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H); c.restore(); }
}
// szkic schodów/klatki przy wejściu do mieszkania
function homeDoorInside(c, lt) {
  c.fillStyle = '#2F2A3C'; c.fillRect(0, 0, W, 1420); c.fillStyle = '#3A2A20'; c.fillRect(0, 1420, W, 500);
  paddedDoor(c, 340, 560, 400, 860, '94', {}); fillRR(c, 700, 980, 60, 22, 8, '#C9A15A');
  for (let i = 0; i < 4; i++) fillRR(c, 820, 700 + i * 70, 180, 14, 4, '#5A3D26'); fillRR(c, 840, 640, 40, 60, 6, '#30A46C'); // wieszak
  c.strokeStyle = '#C9CDD2'; c.lineWidth = 6; for (let i = 0; i < 5; i++) { c.beginPath(); c.ellipse(720, 800 + i * 18, 10, 6, 0, 0, 7); c.stroke(); } // łańcuch
}

// ===================== SCENY =====================
// 0. HAK: blok nocą, zapala się jedno okno. Pod latarnią ktoś patrzy w górę.
scene({
  name: 'hook', start: 0, end: 6,
  draw(c, lt) {
    blockFront(c, lt, { lit: lt > 2.4 ? clamp((lt - 2.4) / .2) : 0, allDark: true, pick: lt > 3.6 && Math.floor(lt * 4) % 2 });
    streetLamp(c, 930, 1880, 820);
    person(c, 'pasazer', 900, 1880, 1.7, { t: lt, back: lt < 3.0, look: -1, lookY: -1, mouth: 'grin', still: true });
    snowfall(c, lt, 80, .75);
    night(c, .55, [{ x: 540, y: 1000, r: 900, a: .7 }, { x: 930, y: 1300, r: 500, a: .9 }]);
    bigSign(c, lt, 'NIE ZAPALAJ', 'ŚWIATŁA!', 1010);
  },
  post(c, lt) { if (lt > 3.6) label(c, 'DZIEWIĄTE PIĘTRO. PIĄTE OKNO.', 540, 1290, 'dark', 38, lt - 3.6, 9); },
});
// 1. POPRZEDNIO: autobus pod oknem, „Jutro też wracasz nocnym… Ola?”
scene({
  name: 'recap', start: 6, end: 12,
  labels: [[0.3, 5.5, 'POPRZEDNIO · NOCNY N94 · ODC. 2', 540, 1660, 'yellow', 40]],
  draw(c, lt) { windowView(c, lt, { bus: 860, man: true, led: 'N94 · OLA' }); night(c, .5, [{ x: 540, y: 1000, r: 600, a: .7 }]);
    const a = clamp((lt - 1.4) / .4); c.save(); c.globalAlpha = a; fillRR(c, 90, 1420, 900, 150, 24, 'rgba(30,32,42,.96)'); txt(c, 'Wiadomość · nieznany', 130, 1465, 24, '#AEB0C2', 800, 'left'); txt(c, 'Jutro też wracasz nocnym?', 130, 1520, 40, '#FFFFFF', 900, 'left'); c.restore(); },
});
// 2. AUTOBUS: następna noc. Z tyłu on. SMS od mamy. Wysiadają oboje (BŁĄD 1)
scene({
  name: 'bus', start: 12, end: 26,
  bubbles: [
    sayAt(5.0, 7.4, 'Dobry wieczór… Ola.', 'pasazer', 470, 1010, -60, 70),
    say(7.8, 9.6, 'Tylko nie on…', 'ola', 860, 1330 - 0, 1.6, -60, 30),
  ],
  draw(c, lt, sc) {
    if (lt < 10.0) {
      busInside(c, lt, { led: lt > 6 ? 'NASTĘPNY: KASZTANOWA' : 'NASTĘPNY: ŁĄKOWA', speed: lt > 8.5 ? .3 : 1 });
      for (const x of SEATS) seatBack(c, x);
      seated(c, 'pasazer', 410, lt, { look: 1, mouth: lt > 4 ? 'grin' : null, talk: talking(sc, 'pasazer', lt), still: true });
      seated(c, 'ola', 800, lt, { look: lt > 5 ? -1 : 0, wide: lt > 5, phone: 2, aR: 2.0, mouth: lt > 9.4 ? 'o' : null, talk: talking(sc, 'ola', lt) });
      for (const x of SEATS) seatBase(c, x);
      // telefon Oli: SMS od mamy
      night(c, .35, [{ x: 540, y: 900, r: 800, a: .7 }]);
      if (lt > 1.0 && lt < 4.8) { const a = clamp((lt - 1.0) / .3) * clamp((4.8 - lt) / .3); c.save(); c.globalAlpha = a; fillRR(c, 90, 1480, 900, 200, 28, 'rgba(30,32,42,.97)'); txt(c, 'SMS · Mama · 01:16', 140, 1530, 28, '#AEB0C2', 800, 'left'); txt(c, 'Jestem na nocce. Idź prosto do domu ❤', 140, 1610, 38, '#FFFFFF', 900, 'left'); c.restore(); }
    } else { // przystanek: drzwi się otwierają, wysiadają oboje
      const l = lt - 10.0;
      stopBg(c, lt, { led: 'N94  KASZTANOWA  ←' }); busOutside(c, lt, { x: 1500, open: true });
      person(c, 'ola', lerp(1180, 820, clamp(l / 1.4)), 1600, 1.8, { t: lt, walk: l < 1.4 ? lt * 10 : null, look: -1 });
      if (l > 1.6) person(c, 'pasazer', lerp(1180, 980, clamp((l - 1.6) / 1.2)), 1600, 1.8, { t: lt, walk: l > 1.6 && l < 2.8 ? lt * 10 : null, look: -1, mouth: 'grin', still: l > 2.8 });
      snowfall(c, lt, 60, .7); night(c, .45, [{ x: 920, y: 900, r: 600, a: .8 }]);
    }
  },
  post(c, lt) { if (lt > 12.2) card(c, 70, 300, 860, 'BŁĄD 1', 'wysiadła na swoim przystanku,\nchoć on wysiadł razem z nią', lt - 12.2, '#F39C12', 40); },
});
// 3. DROGA: Ola idzie przez osiedle. On zostaje na przystanku. Nie musi iść.
scene({
  name: 'walk', start: 26, end: 42,
  bubbles: [
    say(5.6, 8.0, 'Został na przystanku…\nuff.', 'ola', 540, 1640, 2.0, 0),
  ],
  draw(c, lt, sc) {
    streetBg(c, lt, {});
    // ślady butów Oli w śniegu
    const ox = lt < 4.4 ? lerp(-60, 540, lt / 4.4) : lt > 10 ? lerp(540, 1200, clamp((lt - 10) / 4)) : 540;
    for (let i = 0; i < 14; i++) { const px = ox - 40 - i * 46; if (px < -20) break; ell(c, px, 1700 + (i % 2) * 18, 10, 6, 'rgba(90,100,130,.45)'); }
    // w oddali, pod wiatą: on stoi i patrzy (mały)
    if (lt > 3.0) { c.save(); c.globalAlpha = .9; person(c, 'pasazer', 120, 1180, .7, { t: lt, look: 1, mouth: 'grin', still: true }); c.restore(); }
    person(c, 'ola', ox, 1700, 2.0, { t: lt, walk: (lt < 4.4 || lt > 10) ? lt * 9 : null, look: lt > 4.4 && lt < 10 ? -1 : 1, talk: talking(sc, 'ola', lt) });
    if (lt > 4.4 && lt < 10) breathPuff(c, ox + 20, 1640 - 2.0 * 250, lt);
    snowfall(c, lt, 90, .8);
    night(c, .55, [{ x: 126, y: 1100, r: 420, a: .9 }, { x: 786, y: 1100, r: 420, a: .9 }]);
  },
  post(c, lt) { if (lt > 3.4 && lt < 5.4) label(c, 'ODWRACA SIĘ', 540, 300, 'dark', 40, lt - 3.4, 5.4 - lt); if (lt > 10.6) label(c, 'ON NIE MUSI IŚĆ ZA NIĄ', 540, 300, 'red', 44, lt - 10.6, 16 - lt); },
});
// 4. KLATKA: Ola wchodzi, kod i klucz. Po drugiej stronie ulicy, pod latarnią, staje on.
scene({
  name: 'entrance', start: 42, end: 54,
  draw(c, lt) {
    blockFront(c, lt, { allDark: true, doorOpen: lt > 4.8 && lt < 6.4 });
    if (lt < 6.0) person(c, 'ola', lt < 2.4 ? lerp(240, 560, lt / 2.4) : 560, 1340, .9, { t: lt, walk: lt < 2.4 || lt > 4.8 ? lt * 9 : null, back: lt > 2.4, alpha: lt > 5.4 ? clamp((6.0 - lt) / .6) : 1 });
    if (lt > 2.6 && lt < 4.6) { label(c, 'KOD: 94 · KLUCZ', 760, 1150, 'dark', 26, lt - 2.6, 4.6 - lt); }
    streetLamp(c, 930, 1880, 820);
    if (lt > 6.4) person(c, 'pasazer', lerp(1180, 900, clamp((lt - 6.4) / 1.6)), 1880, 1.7, { t: lt, walk: lt < 8 ? lt * 8 : null, back: true });
    snowfall(c, lt, 80, .75);
    night(c, .55, [{ x: 540, y: 1180, r: 360, a: .8 }, { x: 930, y: 1300, r: 500, a: .9 }]);
  },
  post(c, lt) { if (lt > 8.4) label(c, '80 OKIEN. WSZYSTKIE CIEMNE.', 540, 230, 'dark', 40, lt - 8.4, 12 - lt); },
});
// 5. WŁĄCZNIK: podzielony ekran — Ola w ciemnym pokoju / on pod blokiem. Klik. (BŁĄD 2)
scene({
  name: 'switch', start: 54, end: 68,
  bubbles: [
    sayAt(7.8, 10.6, 'Dziewiąte piętro…\npiąte okno.', 'pasazer', 800, 1290, -140, 60),
  ],
  draw(c, lt, sc) {
    const lit = lt > 4.4 ? 1 : 0;
    // góra: pokój Oli
    c.save(); c.beginPath(); c.rect(0, 0, W, 950); c.clip(); c.translate(0, -330);
    olaRoom(c, lt, lit, { switchX: 640 });
    person(c, 'ola', 520, 1560, 2.0, { t: lt, look: 1, aR: lt > 3.4 && lt < 5.0 ? 1.6 : null, walk: lt < 3.0 ? lt * 9 : null });
    if (!lit) night(c, .88, [{ x: 300, y: 700, r: 300, a: .7, tint: 'rgba(190,217,255,.12)' }]);
    c.restore();
    fillRR(c, 0, 940, W, 24, 0, '#0B0C10');
    // dół: on pod blokiem patrzy w górę
    c.save(); c.beginPath(); c.rect(0, 964, W, 956); c.clip(); c.translate(-426, 964 - 374); c.scale(1.4, 1.4);
    blockFront(c, lt, { lit, allDark: true, pick: lt > 5.4 && Math.floor(lt * 4) % 2 });
    c.restore();
    person(c, 'pasazer', 800, 1940, 2.3, { t: lt, back: lt < 5.2, look: -.5, lookY: -1, mouth: lt > 5.2 ? 'grin' : null, talk: talking(sc, 'pasazer', lt), aR: lt > 7.6 && lt < 11 ? 2.6 : null, still: true });
    night(c, .35, [{ x: 540, y: 1400, r: 700, a: .7 }]);
    txt(c, 'MIESZKANIE 94', 40, 140, 30, '#FFFFFF', 900, 'left'); txt(c, 'POD BLOKIEM', 40, 1010, 30, '#FFFFFF', 900, 'left');
  },
  post(c, lt) { if (lt > 4.4 && lt < 5.6) label(c, 'KLIK', 760, 520, 'yellow', 56, lt - 4.4, 5.6 - lt); if (lt > 11.0) card(c, 70, 300, 860, 'BŁĄD 2', 'poszła prosto do domu i zapaliła\nświatło — pokazała mu okno', lt - 11.0, '#F39C12', 38); },
});
// 6. TELEFON: Ola widzi go przez firankę. Dzwoni na 112. Gasi światło. (ZASADA)
scene({
  name: 'call', start: 68, end: 82,
  bubbles: [
    say(2.4, 5.2, 'On stoi pod blokiem.\nJechał za mną autobusem.', 'ola', 760, 1640, 2.1, -60),
    say(5.6, 8.6, 'Zgaś światło, odejdź od okna\ni nikomu nie otwieraj.', 'dyspozytor', 760, 1640, 2.1, -120, 160),
    say(8.8, 10.2, 'Radiowóz już jedzie.', 'dyspozytor', 760, 1640, 2.1, -120, 160),
  ],
  draw(c, lt, sc) {
    const lit = lt < 10.4 ? 1 : 0;
    olaRoom(c, lt, lit, { switchX: 640, outside(cc) { // za oknem: latarnia i on
      cc.save(); cc.beginPath(); cc.rect(90, 420, 420, 560); cc.clip(); cc.fillStyle = '#DDE2EC'; cc.fillRect(90, 860, 420, 120); streetLamp(cc, 380, 900, 360);
      if (lt < 12) person(cc, 'pasazer', 360, 900, .55, { t: lt, look: 0, lookY: -1, mouth: 'grin', aR: lt > 1 && lt < 4 ? 2.4 + Math.sin(lt * 6) * .4 : null, still: true }); cc.restore(); } });
    person(c, 'ola', 760, 1640, 2.1, { t: lt, look: -1, phone: 2, aR: 2.0, wide: true, talk: talking(sc, 'ola', lt), walk: lt > 10.4 && lt < 11.6 ? lt * 9 : null });
    if (lt > 10.2 && lt < 10.6) label(c, 'KLIK', 660, 1000, 'yellow', 44, lt - 10.2, 10.6 - lt);
    if (!lit) night(c, .9, [{ x: 300, y: 700, r: 320, a: .8, tint: 'rgba(190,217,255,.12)' }]); else night(c, .2, []);
  },
  post(c, lt) { if (lt > 11.0) card(c, 60, 300, 900, 'ZASADA', 'Ktoś idzie za tobą? Nie prowadź go\npod dom. Wejdź tam, gdzie są ludzie\ni światło, i dzwoń na 112.', lt - 11.0, '#F39C12', 36); },
});
// 7. POLICJA: latarnia pusta. Ślady prowadzą… do klatki.
scene({
  name: 'police', start: 82, end: 96,
  bubbles: [
    say(4.4, 7.0, 'Pod latarnią nikogo.\nAle są ślady.', 'policjant', 300, 1880, 1.7, 60),
    say(7.4, 10.4, 'Prowadzą do klatki.\nKtoś go wpuścił.', 'policjant', 300, 1880, 1.7, 60),
  ],
  draw(c, lt, sc) {
    blockFront(c, lt, { allDark: true, prints: [930, 1880 - 1.0 * 0 - 120] });
    streetLamp(c, 930, 1880, 820); policeLights(c, lt, 0, 1080);
    person(c, 'policjant', 300, 1880, 1.7, { t: lt, look: 1, talk: talking(sc, 'policjant', lt), aR: lt > 7.4 ? 1.4 : null });
    // latarka policjanta: snop na ślady
    c.save(); c.globalCompositeOperation = 'lighter'; c.fillStyle = 'rgba(255,250,220,.16)'; c.beginPath(); c.moveTo(360, 1500); c.lineTo(980, 1700); c.lineTo(860, 1880); c.closePath(); c.fill(); c.restore();
    snowfall(c, lt, 70, .7);
    night(c, .5, [{ x: 600, y: 1700, r: 500, a: .9 }, { x: 930, y: 1300, r: 500, a: .9 }]);
  },
  post(c, lt) { if (lt > 0.6 && lt < 4.2) label(c, 'PUSTO', 930, 1500, 'dark', 44, lt - .6, 4.2 - lt); if (lt > 10.6) label(c, 'ŚLADY PROWADZĄ DO KLATKI', 540, 230, 'red', 42, lt - 10.6, 14 - lt); },
});
// 8. ZAKOŃCZENIE: 01:28. Wiadomość ze zdjęciem jej okna. Pukanie. Światło na korytarzu zapala się samo. Szept.
scene({
  name: 'end', start: 96, end: 118,
  cam: lt => { const sh = lt > 15.6 && lt < 16.2 ? (16.2 - lt) * 30 : 0; return { z: 1, x: Math.sin(lt * 90) * sh, y: 0 }; },
  labels: [[18.4, 22, 'ODC. 4 ↓', 540, 1650, 'red', 64]],
  draw(c, lt) {
    if (lt < 9.0) {
      c.fillStyle = '#07080C'; c.fillRect(0, 0, W, H);
      bigPhone(c, (cc, x, y, w, h) => {
        cc.fillStyle = '#0F1014'; cc.fillRect(x, y, w, h);
        txt(cc, 'nieznany numer', x + w / 2, y + 90, 30, '#FFFFFF', 900); txt(cc, '01:28', x + w / 2, y + 130, 22, '#AEB0C2', 700);
        if (lt > 1.0) { const a = clamp((lt - 1.0) / .3); cc.save(); cc.globalAlpha = a; fillRR(cc, x + 30, y + 190, w - 60, 520, 26, '#2A2C33');
          cc.save(); rr(cc, x + 44, y + 204, w - 88, 492, 20); cc.clip(); cc.translate(x + 44 - 380, y + 204 - 300); cc.scale(1.3, 1.3); blockFront(cc, lt, { lit: 1, allDark: true, silhouette: true }); cc.restore(); cc.restore(); }
        if (lt > 3.4) { const a = clamp((lt - 3.4) / .3); cc.save(); cc.globalAlpha = a; fillRR(cc, x + 30, y + 740, w - 60, 100, 40, '#2A2C33'); txt(cc, 'Czemu zgasiłaś światło, Ola?', x + 60, y + 790, 32, '#FFFFFF', 700, 'left'); cc.restore(); }
      }, 1, 300);
      night(c, .35, [{ x: 540, y: 900, r: 800, a: .8 }]);
      return;
    }
    const l = lt - 9.0;
    homeDoorInside(c, lt);
    person(c, 'ola', 260, 1640, 2.1, { t: lt, look: 1, wide: true, mouth: 'o', still: true });
    // światło z korytarza pod drzwiami + cienie stóp
    const under = l > 3.2 ? 1 : 0; if (under) { c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createLinearGradient(0, 1400, 0, 1560); g.addColorStop(0, 'rgba(255,220,150,.75)'); g.addColorStop(1, 'rgba(255,220,150,0)'); c.fillStyle = g; c.fillRect(340, 1400, 400, 160); c.restore(); c.fillStyle = 'rgba(10,8,12,.9)'; fillRR(c, 470, 1404, 50, 14, 4, 'rgba(10,8,12,.9)'); fillRR(c, 560, 1404, 50, 14, 4, 'rgba(10,8,12,.9)'); }
    night(c, under ? .82 : .9, [{ x: 540, y: 1420, r: under ? 520 : 1, a: .9 }]);
    if (l > 6.6 && l < 6.85) { c.fillStyle = 'rgba(255,255,255,.55)'; c.fillRect(0, 0, W, H); }
    if (l > 7.6) { c.fillStyle = `rgba(0,0,0,${clamp((l - 7.6) / 1.2) * .9})`; c.fillRect(0, 0, W, H); }
  },
  post(c, lt) { const l = lt - 9.0; if (l > 0 && l < 2.6) label(c, 'PUK. PUK. PUK.', 540, 300, 'dark', 48, l, 2.6 - l); if (l > 3.2 && l < 6.6) label(c, 'ŚWIATŁO NA KORYTARZU ZAPALA SIĘ SAMO', 540, 300, 'red', 34, l - 3.2, 6.6 - l); },
});
