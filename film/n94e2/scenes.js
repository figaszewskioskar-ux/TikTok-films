// NOCNY N94 · ODC. 2 — „Nie pisz, gdzie jesteś!”: skąd znał jej imię? Imię na plecaku i relacja „wracam sama N94”.
window.EP = {
  badge: 'NOCNY N94 · ODC. 2',
  loop: false,
  vignette: .84,
  cues(add) {
    add(0.2, 'stab'); add(6.2, 'whoosh'); add(13.0, 'hit'); add(16.0, 'creak'); add(23.8, 'door');
    add(26.4, 'whoosh'); add(36.4, 'hit'); add(38.0, 'error'); add(44.4, 'whoosh'); add(47.0, 'notif'); add(51.8, 'error');
    add(60.4, 'door'); add(76.4, 'whoosh'); add(81.0, 'click'); add(83.0, 'click'); add(85.2, 'click'); add(88.0, 'notif');
    add(99.0, 'whoosh'); add(105.0, 'door'); add(108.4, 'notif'); add(111.6, 'hit');
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
// 0. HAK
scene({
  name: 'hook', start: 0, end: 6,
  draw(c, lt) {
    c.fillStyle = '#07080C'; c.fillRect(0, 0, W, H);
    bigPhone(c, (cc, x, y, w, h) => { cc.fillStyle = '#1A1D28'; cc.fillRect(x, y, w, h); cc.save(); cc.beginPath(); cc.rect(x, y, w, h); cc.clip(); cc.translate(x - 60, y + 60); cc.scale(.6, .6); stopBg(cc, lt, { led: 'N94  KASZTANOWA  2 min' }); cc.restore();
      fillRR(cc, x + 40, y + 520, w - 80, 70, 12, 'rgba(0,0,0,.6)'); txt(cc, 'wracam sama N94', x + w / 2, y + 555, 30, '#fff', 900); fillRR(cc, x + w / 2 - 110, y + 620, 220, 50, 25, '#fff'); txt(cc, 'PARK LEŚNY', x + w / 2, y + 645, 24, '#14161B', 900); }, 1, 560);
    night(c, .4, [{ x: 540, y: 1100, r: 700, a: .8 }]);
    bigSign(c, lt, 'NIE PISZ,', 'GDZIE JESTEŚ!', 340);
  },
});
// 1. POPRZEDNIO: monitor kamer
scene({
  name: 'recap', start: 6, end: 12,
  labels: [[0.3, 5.5, 'NOCNY N94 · ODC. 2', 540, 1640, 'yellow', 44]],
  draw(c, lt) {
    c.fillStyle = '#050607'; c.fillRect(0, 0, W, H); fillRR(c, 40, 420, 1000, 1040, 20, '#1B1D22');
    c.save(); c.beginPath(); c.rect(60, 440, 960, 1000); c.clip(); c.translate(60, 440); c.scale(960 / W, 1000 / H);
    shopBg(c, lt, {}); person(c, 'ola', 560, 1600, 1.9, { t: lt, look: 1 }); person(c, 'pasazer', 360, 1600, 1.9, { t: lt, look: 1, mouth: 'grin', still: true }); c.restore();
    c.save(); c.globalCompositeOperation = 'saturation'; c.fillStyle = '#808080'; c.fillRect(60, 440, 960, 1000); c.restore(); c.fillStyle = 'rgba(70,110,90,.18)'; c.fillRect(60, 440, 960, 1000);
    txt(c, 'CAM 2', 80, 470, 26, '#E8F0E8', 800, 'left');
    night(c, .45, [{ x: 540, y: 940, r: 700, a: .6 }]);
  },
});
// 2. ODWRACA SIĘ: nikogo. Drzwi zaplecza uchylone, wpada śnieg
scene({
  name: 'turn', start: 12, end: 26,
  cam: lt => { const sh = lt > 1.0 && lt < 1.5 ? (1.5 - lt) * 22 : 0; return { z: 1, x: Math.sin(lt * 90) * sh, y: 0 }; },
  bubbles: [
    say(2.6, 5.0, 'Był tu… na monitorze.\nTuż za tobą.', 'kasjerka', 940, 1600, 1.9, -100),
    say(6.4, 8.6, 'Tylne drzwi…\nbyły zamknięte.', 'kasjerka', 940, 1600, 1.9, -100),
    say(9.6, 11.6, 'Proszę… niech pani\nje zamknie.', 'ola', 460, 1600, 1.9, 40),
  ],
  draw(c, lt, sc) {
    shopBg(c, lt, {}); backDoor(c, lt, lt < 11.8 ? clamp((lt - 4.0) / .8) : clamp(1 - (lt - 11.8) / .6));
    person(c, 'ola', 460, 1600, 1.9, { t: lt, look: lt < 1.0 ? 1 : -1, wide: true, mouth: talking(sc, 'ola', lt) ? null : 'o', talk: talking(sc, 'ola', lt) });
    const kx = lt < 11.4 ? 940 : mv(lt, 11.4, 12.4, 940, 780);
    person(c, 'kobieta', kx, 1600, 1.9, { t: lt, look: lt > 5.6 && lt < 12 ? 1 : -1, wide: lt > 4.0, talk: talking(sc, 'kasjerka', lt), walk: lt > 11.4 && lt < 12.4 ? lt * 9 : null });
    night(c, .12, []);
  },
  post(c, lt) { if (lt > 1.0 && lt < 2.6) label(c, 'NIKOGO', 540, 760, 'dark', 48, lt - 1.0, 2.6 - lt); if (lt > 4.2 && lt < 6.2) label(c, 'DRZWI ZAPLECZA OTWARTE', 540, 420, 'red', 40, lt - 4.2, 6.2 - lt); },
});
// 3. POLICJA: opis, imię na plecaku (BŁĄD 1)
scene({
  name: 'police', start: 26, end: 44,
  bubbles: [
    say(0.6, 2.4, 'Jak wyglądał?', 'policjant', 300, 1600, 2.0, 80),
    say(2.6, 5.4, 'Płaszcz, kapelusz…\ni ten uśmiech.', 'ola', 640, 1600, 1.9, 0),
    say(5.6, 7.8, 'Powiedział twoje imię?\nSkąd je znał?', 'policjant', 300, 1600, 2.0, 80),
    say(10.4, 13.0, 'Stąd. Każdy w autobusie\nto widział.', 'policjant', 300, 1600, 2.0, 80),
  ],
  draw(c, lt, sc) {
    shopBg(c, lt, {}); policeLights(c, lt);
    person(c, 'policjant', 300, 1600, 2.0, { t: lt, look: 1, aR: lt > 10.2 ? 1.5 : null, talk: talking(sc, 'policjant', lt) });
    person(c, 'ola', 640, 1600, 1.9, { t: lt, look: -1, wide: lt > 8, mouth: lt > 11 && !talking(sc, 'ola', lt) ? 'o' : null, talk: talking(sc, 'ola', lt), flip: lt > 8.4 });
    if (lt > 8.4) backpack(c, 640 + 130, 1260, 1.1, lt > 10.2 ? .6 + .4 * Math.sin(lt * 8) : 0);
    person(c, 'kobieta', 940, 1600, 1.85, { t: lt, look: -1 });
    night(c, .15, []);
  },
  post(c, lt) { if (lt > 12.0) card(c, 70, 300, 860, 'BŁĄD 1', 'imię na plecaku — widzi je\nkażdy obcy w autobusie', lt - 12.0, '#F39C12', 40); },
});
// 4. RELACJA: „wracam sama N94” — pierwsze wyświetlenie: pasazer_n94 (BŁĄD 2)
scene({
  name: 'story', start: 44, end: 60,
  draw(c, lt) {
    c.fillStyle = '#07080C'; c.fillRect(0, 0, W, H);
    bigPhone(c, (cc, x, y, w, h) => {
      cc.fillStyle = '#0F1014'; cc.fillRect(x, y, w, h);
      txt(cc, 'Twoja relacja · 00:40', x + 40, y + 70, 26, '#AEB0C2', 800, 'left');
      cc.save(); cc.beginPath(); cc.rect(x + 40, y + 100, w - 80, 380); cc.clip(); cc.translate(x - 20, y + 60); cc.scale(.45, .45); stopBg(cc, lt, { led: 'N94  KASZTANOWA  2 min' }); cc.restore();
      fillRR(cc, x + 60, y + 360, w - 120, 50, 10, 'rgba(0,0,0,.6)'); txt(cc, 'wracam sama N94', x + w / 2, y + 385, 24, '#fff', 900); fillRR(cc, x + w / 2 - 90, y + 420, 180, 40, 20, '#fff'); txt(cc, 'PARK LEŚNY', x + w / 2, y + 440, 18, '#14161B', 900);
      txt(cc, 'Wyświetlenia', x + 40, y + 530, 26, '#FFFFFF', 900, 'left');
      const rows = [['pasazer_n94', '00:41', true], ['zuzia.r', '00:52'], ['kuba_94', '01:03']];
      rows.forEach((r, i) => { const a = clamp((lt - .6 - i * .5) / .3); if (a <= 0) return; cc.save(); cc.globalAlpha = a; const yy = y + 570 + i * 90;
        circ(cc, x + 70, yy + 30, 26, r[2] ? '#2A2D36' : ['#C2562B', '#F39C12'][i - 1]); if (r[2]) { cc.fillStyle = '#CFC8BE'; cc.beginPath(); cc.arc(x + 70, yy + 32, 14, 0, 7); cc.fill(); fillRR(cc, x + 48, yy + 12, 44, 8, 3, '#14161B'); }
        txt(cc, r[0], x + 110, yy + 30, 26, r[2] ? '#FF6B7A' : '#FFFFFF', 800, 'left'); txt(cc, r[1], x + w - 40, yy + 30, 22, '#AEB0C2', 700, 'right'); cc.restore(); });
      if (lt > 3.0) { const a = clamp((lt - 3.0) / .4); cc.save(); cc.globalAlpha = a; cc.strokeStyle = '#FF3B30'; cc.lineWidth = 5; rr(cc, x + 30, y + 562, w - 60, 76, 12); cc.stroke(); cc.restore(); }
    }, 1, 300);
    night(c, .3, [{ x: 540, y: 1000, r: 800, a: .8 }]);
  },
  post(c, lt) { if (lt > 3.4 && lt < 7.4) label(c, '00:41 — ZANIM WSIADŁ', 540, 1600, 'red', 40, lt - 3.4, 7.4 - lt); if (lt > 7.8) card(c, 70, 1460, 860, 'BŁĄD 2', 'relacja z drogi na żywo:\n„wracam sama” + lokalizacja', lt - 7.8, '#F39C12', 40); },
});
// 5. SAMOCHÓD MAMY: rozmowa, ZASADA (bez czytania)
scene({
  name: 'car', start: 60, end: 76,
  bubbles: [
    say(0.8, 3.0, 'Już dobrze, córcia.\nJesteś bezpieczna.', 'mama', 300, 1500, 1.9, 80),
    say(3.4, 5.8, 'Następnym razem dzwoń.\nPrzyjadę po ciebie.', 'mama', 300, 1500, 1.9, 80),
    say(6.0, 7.4, 'Dobrze, mamo.', 'ola', 780, 1500, 1.9, -60),
  ],
  draw(c, lt, sc) {
    carInside(c, lt);
    person(c, 'kobieta', 300, 1500, 1.9, { t: lt, look: 1, talk: talking(sc, 'mama', lt) });
    person(c, 'ola', 780, 1500, 1.9, { t: lt, look: -1, talk: talking(sc, 'ola', lt) });
    dashboard(c, lt);
    night(c, .55, [{ x: 540, y: 1300, r: 600, a: .7, tint: 'rgba(95,208,255,.05)' }]);
  },
  post(c, lt) { if (lt > 8.0) card(c, 60, 260, 900, 'ZASADA', 'Wracasz nocą? Relację wrzuć dopiero\nw domu. Lokalizację udostępniaj tylko\nbliskim, nie publicznie.', lt - 8.0, '#F39C12', 36); },
});
// 6. DOM: usuwa relację, konto prywatne, blokuje
scene({
  name: 'home', start: 76, end: 96,
  draw(c, lt) {
    if (lt < 4.0) { ROOM(c); person(c, 'ola', 520, 1640, 2.2, { t: lt, look: 0, phone: 2, aR: 2.0 }); night(c, .82, [{ x: 600, y: 1100, r: 420, a: .9, tint: 'rgba(190,217,255,.12)' }]); return; }
    c.fillStyle = '#07080C'; c.fillRect(0, 0, W, H);
    const l = lt - 4.0;
    bigPhone(c, (cc, x, y, w, h) => {
      cc.fillStyle = '#0F1014'; cc.fillRect(x, y, w, h);
      const items = [['Relacja „wracam sama N94”', l > 1.0 ? 'USUNIĘTA' : 'usuń…', l > 1.0], ['Konto prywatne', l > 3.0 ? 'WŁ.' : 'WYŁ.', l > 3.0], ['pasazer_n94', l > 5.2 ? 'ZABLOKOWANY' : 'zablokuj…', l > 5.2]];
      items.forEach((it, i) => { const yy = y + 160 + i * 150; fillRR(cc, x + 30, yy, w - 60, 110, 16, '#1B1D26'); txt(cc, it[0], x + 60, yy + 40, 26, '#FFFFFF', 800, 'left'); fillRR(cc, x + 60, yy + 62, 260, 34, 17, it[2] ? '#1E7A46' : '#3A3F52'); txt(cc, it[1], x + 190, yy + 79, 20, '#fff', 900); });
      if (l > 8.0) { const a = clamp((l - 8.0) / .4); cc.save(); cc.globalAlpha = a; fillRR(cc, x + 30, y + 680, w - 60, 120, 16, 'rgba(40,44,58,.95)'); txt(cc, 'Ola, idź już spać.', x + 60, y + 725, 26, '#fff', 800, 'left'); txt(cc, '— mama', x + 60, y + 765, 22, '#AEB0C2', 700, 'left'); cc.restore(); }
    }, 1, 300);
  },
  post(c, lt) { if (lt < 3.6) label(c, '01:52 · KASZTANOWA 12 · M. 94', 540, 300, 'dark', 38, lt, 3.6 - lt); },
});
// 7. ZAKOŃCZENIE: pod blokiem staje pusty N94. W oknie on macha. Tablica: N94 · OLA
scene({
  name: 'end', start: 96, end: 120,
  cam: lt => { const sh = lt > 15.6 && lt < 16.2 ? (16.2 - lt) * 30 : 0; return { z: 1, x: Math.sin(lt * 90) * sh, y: 0 }; },
  labels: [[18.0, 24, 'ODC. 3 ↓', 540, 1650, 'red', 64]],
  draw(c, lt) {
    if (lt < 3.0) { ROOM(c); person(c, 'ola', mv(lt, .4, 2.6, 300, 700), 1640, 2.2, { t: lt, look: 1, walk: lt > .4 && lt < 2.6 ? lt * 10 : null, wide: true }); night(c, .86, [{ x: 780, y: 590, r: 300, a: .6 }]); return; }
    const l = lt - 3.0, bx = lt < 6.0 ? lerp(1500, 860, eout(clamp(l / 3))) : 860;
    const led = l > 7.4 ? (Math.floor(lt * 3) % 2 ? 'N94 · OLA' : 'N94 · OLA') : 'N94  KASZTANOWA';
    windowView(c, lt, { bus: bx, man: l > 3.6, led });
    // odbicie Oli w szybie
    c.save(); c.globalAlpha = .08; person(c, 'ola', 540, 1500, 2.0, { t: lt, look: 0, wide: true, mouth: 'o', still: true }); c.restore();
    night(c, l > 12.6 ? .9 : .5, [{ x: 540, y: 1000, r: 600, a: .7 }]);
    if (l > 9.4) { // wiadomość na telefonie w dole kadru
      const a = clamp((l - 9.4) / .4); c.save(); c.globalAlpha = a; fillRR(c, 90, 1520, 900, 150, 24, 'rgba(30,32,42,.96)'); txt(c, 'Wiadomość · nieznany', 130, 1565, 24, '#AEB0C2', 800, 'left'); txt(c, 'Jutro też wracasz nocnym?', 130, 1620, 40, '#FFFFFF', 900, 'left'); c.restore();
    }
    if (l > 12.6 && l < 12.85) { c.fillStyle = 'rgba(255,255,255,.55)'; c.fillRect(0, 0, W, H); }
    if (l > 13.6) { c.fillStyle = `rgba(0,0,0,${clamp((l - 13.6) / 1.2) * .88})`; c.fillRect(0, 0, W, H); }
  },
  post(c, lt) { const l = lt - 3.0; if (l > 2.0 && l < 5.6) label(c, 'NA PRZYSTANKU NIKT NIE CZEKA', 540, 230, 'dark', 36, l - 2.0, 5.6 - l); if (l > 7.6 && l < 12.6) label(c, 'TABLICA: N94 · OLA', 540, 230, 'red', 40, l - 7.6, 12.6 - l); },
});
