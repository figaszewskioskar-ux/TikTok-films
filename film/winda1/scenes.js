// SAM W DOMU · ODC. 1 — „Nie wsiadaj do windy!”: 22:50, Kuba wraca z treningu. Winda zjeżdża z 9. piętra. W środku obcy.
window.EP = {
  badge: 'SAM W DOMU · ODC. 1',
  loop: false,
  vignette: .8,
  cues(add) {
    add(0.2, 'stab'); add(1.0, 'click'); add(3.4, 'ding'); add(3.6, 'jolt'); add(5.2, 'whoosh'); add(5.6, 'door'); add(11.4, 'click'); add(17.6, 'ding');
    add(19.2, 'jolt'); add(27.4, 'doors'); add(33.0, 'click'); add(37.4, 'jolt'); add(39.0, 'hit'); add(42.6, 'alarm'); add(44.2, 'ding'); add(45.4, 'doors');
    add(55.4, 'whoosh'); add(57.0, 'run'); add(62.0, 'click'); add(64.6, 'jolt'); add(70.4, 'ding'); add(71.0, 'doors'); add(78.0, 'keys'); add(80.4, 'keys');
    add(85.4, 'jolt'); add(92.0, 'click'); add(101.6, 'jolt');
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

function cabMini(c, x, y, w, h, lt, o = {}, who) { c.save(); c.translate(x + w / 2, y); c.scale(w / 760, h / 1560); c.translate(-540, -160); cabFull(c, lt, o); if (who) who(c); c.restore(); }
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
    const open = (o.open13 && num === 13 ? o.open13 : 0) || (o.openNum === num ? o.openAmt : 0), inside = (o.openNum === num && o.insideN) || (num === 13 ? o.inside13 : null), darkIn = o.openNum === num && o.darkInside;
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


// ===== nowe tła odc. 2 =====
// telefon: czat z nieznanym numerem (wiadomości wpadają po kolei)
function chatPhone(c, lt, msgs, o = {}) {
  bigPhone(c, (cc, x, y, w, h) => {
    cc.fillStyle = '#0F1014'; cc.fillRect(x, y, w, h);
    fillRR(cc, x, y, w, 170, 0, '#17181E'); circ(cc, x + 90, y + 110, 40, '#2A2C33'); txt(cc, '?', x + 90, y + 112, 40, '#8A8F9A', 900);
    txt(cc, o.title || 'Nieznany numer', x + 150, y + 100, 32, '#FFFFFF', 900, 'left'); txt(cc, o.sub || '+48 7•• ••• •13', x + 150, y + 140, 22, 'rgba(255,255,255,.55)', 600, 'left');
    let yy = y + 220;
    for (const [t0, text, mine] of msgs) { if (lt < t0) continue; const p = back(clamp((lt - t0) / .3)); const lines = text.split('\n'), bw = Math.min(w - 100, 60 + Math.max(...lines.map(l => l.length)) * 16), bh = 40 + lines.length * 40, bx = mine ? x + w - 30 - bw : x + 30;
      cc.save(); cc.translate(bx + (mine ? bw : 0), yy); cc.scale(p, p); cc.translate(-(bx + (mine ? bw : 0)), -yy);
      fillRR(cc, bx, yy, bw, bh, 30, mine ? '#3B6FE0' : '#2A2C33'); lines.forEach((l, i) => txt(cc, l, bx + 26, yy + 40 + i * 40, 29, '#FFFFFF', 600, 'left')); cc.restore(); yy += bh + 20; }
    if (o.typing && lt > o.typing) { fillRR(cc, x + 30, yy, 120, 60, 30, '#2A2C33'); for (let i = 0; i < 3; i++) circ(cc, x + 62 + i * 28, yy + 30, 7, `rgba(255,255,255,${.3 + .6 * Math.abs(Math.sin(lt * 5 + i))})`); }
    fillRR(cc, x + 30, y + h - 120, w - 60, 80, 40, '#1C1D23'); txt(cc, 'Wiadomość…', x + 80, y + h - 80, 28, 'rgba(255,255,255,.4)', 600, 'left');
  }, 1, 300);
}
// zawieszka na torbie: imię, numer i telefon — widać z daleka
function bagTag(c, x, y, s = 1, glow = 0) {
  c.save(); c.translate(x, y); c.scale(s, s);
  fillRR(c, -300, 40, 600, 300, 80, '#1E5AA8'); fillRR(c, -200, 0, 400, 80, 40, '#16478A'); txt(c, 'MAJA · 7', 0, 200, 70, '#FFFFFF', 900);
  c.strokeStyle = '#C9CDD2'; c.lineWidth = 8; c.beginPath(); c.moveTo(200, 80); c.quadraticCurveTo(260, 160, 250, 230); c.stroke();
  c.save(); c.translate(250, 300); c.rotate(-.12); if (glow) { c.shadowColor = '#FFE36A'; c.shadowBlur = 40 * glow; } fillRR(c, -150, -70, 300, 150, 16, '#F5C542'); c.shadowColor = 'transparent';
  txt(c, 'MAJA K.', 0, -28, 36, '#14161B', 900); txt(c, 'tel. 512 ••• 417', 0, 22, 30, '#14161B', 800); txt(c, 'KS SOKÓŁ · nr 7', 0, 58, 22, '#14161B', 700); c.restore();
  c.restore();
}
// korytarz szkolny: szafki z numerami, okna z dniem, tablica ogłoszeń, zegar 14:35, kosz
function schoolBg(c, lt) {
  c.fillStyle = '#E4E0D2'; c.fillRect(0, 0, W, 1420); c.fillStyle = '#3E6B8A'; c.fillRect(0, 1000, W, 420);
  for (let i = 0; i < 3; i++) { fillRR(c, 80 + i * 340, 300, 260, 300, 6, '#BFE0F2'); c.fillStyle = '#E8E4DA'; c.fillRect(205 + i * 340, 300, 10, 300); c.fillRect(80 + i * 340, 445, 260, 10); for (let k = 0; k < 3; k++) circ(c, 120 + i * 340 + k * 70, 560 - hash(i * 3 + k) * 60, 30, '#7FB069'); }
  circ(c, 960, 200, 50, '#FFFFFF'); c.strokeStyle = '#2A2D36'; c.lineWidth = 6; c.beginPath(); c.arc(960, 200, 50, 0, 7); c.moveTo(960, 200); c.lineTo(960, 168); c.moveTo(960, 200); c.lineTo(990, 214); c.stroke(); txt(c, '14:35', 960, 280, 26, '#2A2D36', 900);
  fillRR(c, 80, 650, 420, 300, 8, '#B8875A'); for (let i = 0; i < 5; i++) { c.save(); c.translate(130 + (i % 3) * 120, 700 + Math.floor(i / 3) * 130); c.rotate((hash(i) - .5) * .2); fillRR(c, 0, 0, 100, 110, 3, ['#FFFFFF', '#F5C542', '#9FD3F5', '#F28CB1', '#FFFFFF'][i]); c.restore(); }
  txt(c, 'TRENING: PN, ŚR, PT 20:00–21:45', 290, 980, 20, '#14161B', 900);
  for (let i = 0; i < 9; i++) { const lx = 540 + (i % 5) * 104, ly = i < 5 ? 640 : 1020; if (ly === 1020 && i >= 9) continue; }
  for (let i = 0; i < 5; i++) { fillRR(c, 560 + i * 100, 660, 92, 740, 6, ['#C23A3A', '#1E5AA8', '#C23A3A', '#1E5AA8', '#C23A3A'][i]); for (let k = 0; k < 4; k++) c.fillRect(580 + i * 100, 690 + k * 14, 52, 5); fillRR(c, 630 + i * 100, 980, 10, 40, 4, '#C9CDD2'); txt(c, String(21 + i), 606 + i * 100, 760, 24, '#FFFFFF', 900); }
  c.fillStyle = '#C9C2AE'; c.fillRect(0, 1420, W, 500); for (let i = 0; i < 12; i++) { c.fillStyle = 'rgba(0,0,0,.05)'; c.fillRect(i * 90, 1420, 4, 500); }
}
// radiowóz z boku z migającymi światłami
function policeCar(c, lt, x, y, s = 1) {
  c.save(); c.translate(x, y); c.scale(s, s);
  fillRR(c, -330, -120, 660, 140, 40, '#F2F2EE'); fillRR(c, -200, -220, 380, 120, 40, '#F2F2EE'); fillRR(c, -180, -200, 160, 90, 14, '#1A2030'); fillRR(c, 0, -200, 160, 90, 14, '#1A2030');
  fillRR(c, -330, -70, 660, 40, 0, '#1E3E8A'); txt(c, 'POLICJA', 0, -48, 34, '#FFFFFF', 900);
  const on = Math.floor(lt * 5) % 2; fillRR(c, -80, -250, 70, 30, 8, on ? '#3C7BFF' : '#1A3060'); fillRR(c, 10, -250, 70, 30, 8, on ? '#4A1018' : '#FF3B4E');
  circ(c, -200, 20, 56, '#141518'); circ(c, -200, 20, 26, '#8A8F9A'); circ(c, 210, 20, 56, '#141518'); circ(c, 210, 20, 26, '#8A8F9A');
  c.restore();
}


// ===== odc. 2 v2: pokój Mai nocą, telefon na szafce, drzwi mieszkania od środka =====
function nightstandPhone(c, lt, o = {}) { // zbliżenie: szafka nocna, lampka, budzik 01:12, telefon wibruje
  c.fillStyle = '#141A26'; c.fillRect(0, 0, W, H);
  for (let r = 0; r < 20; r++) { c.fillStyle = 'rgba(255,255,255,.025)'; c.fillRect(0, r * 96, W, 3); }
  fillRR(c, 60, 1160, 960, 760, 20, '#5A3D26'); fillRR(c, 60, 1160, 960, 40, 12, '#6B4A2F'); fillRR(c, 120, 1320, 840, 220, 10, '#4A3220'); fillRR(c, 500, 1410, 80, 20, 8, '#C9A15A');
  fillRR(c, 120, 980, 200, 180, 30, '#1E1E24'); txt(c, '01:12', 220, 1070, 64, '#FF3B30', 900); // budzik
  c.fillStyle = '#2A2D36'; c.fillRect(870, 900, 12, 260); c.beginPath(); c.moveTo(800, 900); c.lineTo(950, 900); c.lineTo(920, 820); c.lineTo(830, 820); c.fillStyle = '#5A4A2A'; c.fill(); // lampka zgaszona
  const vib = o.vib ? Math.sin(lt * 70) * 6 : 0;
  c.save(); c.translate(540 + vib, 1110); c.rotate(-.06); fillRR(c, -170, -300, 340, 600, 40, '#0E0F12'); fillRR(c, -156, -286, 312, 572, 30, o.screen ? '#1B2133' : '#05060A');
  if (o.screen) { txt(c, '01:12', 0, -200, 64, '#FFFFFF', 300); fillRR(c, -140, -100, 280, 150, 22, 'rgba(255,255,255,.14)'); txt(c, 'Nieznany numer', -120, -60, 22, '#FFFFFF', 900, 'left'); txt(c, o.screen, -120, -10, 24, '#FFFFFF', 600, 'left'); }
  c.restore();
  if (o.screen) { const g = c.createRadialGradient(540, 1100, 20, 540, 1100, 600); g.addColorStop(0, 'rgba(160,190,255,.28)'); g.addColorStop(1, 'rgba(160,190,255,0)'); c.save(); c.globalCompositeOperation = 'lighter'; c.fillStyle = g; c.fillRect(0, 500, W, 1300); c.restore(); }
}
function flatDoorInside(c, lt, o = {}) { // przedpokój Mai: drzwi z zamkiem, łańcuchem i wizjerem, wieszak, buty, lustro, pasek światła pod drzwiami
  c.fillStyle = '#2E3A44'; c.fillRect(0, 0, W, 1420); for (let r = 0; r < 18; r++) for (let q = 0; q < 9; q++) { c.fillStyle = 'rgba(255,255,255,.035)'; c.fillRect(q * 120 + (r % 2) * 60, r * 80, 50, 4); }
  c.fillStyle = '#3A2A20'; c.fillRect(0, 1420, W, 500); for (let i = 0; i < 12; i++) { c.fillStyle = 'rgba(0,0,0,.08)'; c.fillRect(0, 1440 + i * 40, W, 3); }
  quilted(c, 330, 520, 420, 900, '#6B4A2F', '#583B24', '#C9A15A', 64); c.strokeStyle = '#3A2818'; c.lineWidth = 14; c.strokeRect(330, 520, 420, 900);
  circ(c, 540, 760, 18, '#1B1C22'); c.strokeStyle = '#C9A15A'; c.lineWidth = 6; c.beginPath(); c.arc(540, 760, 22, 0, 7); c.stroke(); // wizjer
  fillRR(c, 680, 1000, 46, 90, 8, '#C9A15A'); circ(c, 703, 1060, 8, '#2A1A10'); // zamek
  const kr = o.lockTurn || 0; c.save(); c.translate(703, 1060); c.rotate(kr * Math.PI / 2); fillRR(c, -4, -14, 8, 28, 3, '#2A1A10'); c.restore();
  fillRR(c, 640, 1140, 90, 26, 10, '#C9A15A'); // klamka
  c.strokeStyle = '#C9CDD2'; c.lineWidth = 6; for (let i = 0; i < 6; i++) { c.beginPath(); c.ellipse(640 + i * 16, 900 + Math.sin(i / 5 * Math.PI) * 28, 9, 6, .3, 0, 7); c.stroke(); } fillRR(c, 720, 880, 26, 40, 6, '#C9CDD2'); // łańcuch założony
  fillRR(c, 820, 560, 200, 18, 6, '#5A3D26'); for (let i = 0; i < 3; i++) { fillRR(c, 840 + i * 60, 578, 10, 40, 4, '#2A2D36'); } fillRR(c, 830, 610, 70, 220, 24, '#C23A3A'); fillRR(c, 910, 610, 70, 180, 24, '#1E5AA8'); // wieszak z kurtkami
  fillRR(c, 60, 560, 200, 300, 12, '#9FB3C2'); fillRR(c, 72, 572, 176, 276, 8, '#C9D6E0'); // lustro
  for (let i = 0; i < 3; i++) fillRR(c, 820 + i * 70, 1380, 60, 30, 10, ['#F2F2EE', '#2A2D36', '#C23A3A'][i]); // buty
  if (o.underLight) { c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createLinearGradient(0, 1400, 0, 1560); g.addColorStop(0, `rgba(255,220,150,${.75 * o.underLight})`); g.addColorStop(1, 'rgba(255,220,150,0)'); c.fillStyle = g; c.fillRect(330, 1400, 420, 160); c.restore();
    if (o.feet) { fillRR(c, 460, 1404, 54, 14, 4, 'rgba(10,8,12,.92)'); fillRR(c, 560, 1404, 54, 14, 4, 'rgba(10,8,12,.92)'); } }
}


// ===== SAMA W DOMU: tła i rekwizyty =====
function cat(c, x, y, s = 1, o = {}) { // kot Pączek: rudy, śpi zwinięty albo siedzi i patrzy
  c.save(); c.translate(x, y); c.scale(s, s);
  if (o.sleep) { ell(c, 0, 0, 90, 46, '#D9822B'); ell(c, -60, -18, 36, 30, '#D9822B'); c.fillStyle = '#D9822B'; c.beginPath(); c.moveTo(-86, -38); c.lineTo(-78, -66); c.lineTo(-64, -42); c.fill(); c.beginPath(); c.moveTo(-50, -44); c.lineTo(-40, -70); c.lineTo(-32, -40); c.fill();
    c.strokeStyle = '#B5651D'; c.lineWidth = 6; for (let i = 0; i < 3; i++) { c.beginPath(); c.arc(10 + i * 26, -10, 22, Math.PI * 1.1, Math.PI * 1.6); c.stroke(); } c.strokeStyle = '#3A2010'; c.lineWidth = 3; c.beginPath(); c.arc(-70, -18, 6, 0, Math.PI); c.stroke(); c.beginPath(); c.arc(-50, -18, 6, 0, Math.PI); c.stroke();
    c.strokeStyle = '#D9822B'; c.lineWidth = 16; c.lineCap = 'round'; c.beginPath(); c.moveTo(80, 10); c.quadraticCurveTo(110, 40, 60, 46); c.stroke(); c.lineCap = 'butt'; }
  else { ell(c, 0, 0, 56, 70, '#D9822B'); circ(c, 0, -90, 44, '#D9822B'); c.fillStyle = '#D9822B'; c.beginPath(); c.moveTo(-40, -110); c.lineTo(-30, -150); c.lineTo(-10, -124); c.fill(); c.beginPath(); c.moveTo(40, -110); c.lineTo(30, -150); c.lineTo(10, -124); c.fill();
    const blink = o.t != null && (o.t % 3.4) < .12; for (const ex of [-16, 16]) { if (blink) { c.fillStyle = '#3A2010'; c.fillRect(ex - 8, -94, 16, 3); } else { ell(c, ex, -94, 9, 11, '#C9E36A'); ell(c, ex, -94, 3, 9, '#14161B'); } }
    c.fillStyle = '#E87C8C'; c.beginPath(); c.moveTo(-5, -78); c.lineTo(5, -78); c.lineTo(0, -72); c.fill(); }
  c.restore();
}
// pokój Niny: łóżko z kołdrą we wzór, lampki LED, plakaty, roślina, biurko z laptopem, okno na blok naprzeciw, zegar
function ninaRoom(c, lt, o = {}) {
  c.fillStyle = '#3A4A5E'; c.fillRect(0, 0, W, 1420); for (let r = 0; r < 24; r++) for (let q = 0; q < 10; q++) { c.fillStyle = 'rgba(255,255,255,.04)'; c.fillRect(q * 110 + (r % 2) * 55, r * 64, 6, 6); }
  // okno na blok naprzeciw
  fillRR(c, 600, 300, 400, 520, 8, '#070A14'); for (let r = 0; r < 7; r++) for (let q = 0; q < 4; q++) { const lit = hash(r * 4 + q + 3) > .72; fillRR(c, 630 + q * 92, 330 + r * 70, 56, 40, 2, lit ? '#E8B860' : '#121828'); }
  c.strokeStyle = '#E8E4DA'; c.lineWidth = 14; c.strokeRect(600, 300, 400, 520); c.fillStyle = '#E8E4DA'; c.fillRect(793, 300, 14, 520); c.fillStyle = 'rgba(230,225,215,.28)'; for (let i = 0; i < 5; i++) c.fillRect(600 + i * 20, 300, 12, 520);
  // lampki LED na sznurku
  for (let i = 0; i < 14; i++) { const lx = 60 + i * 70, ly = 230 + Math.sin(i * .9) * 26; const on = .6 + .4 * Math.sin(lt * 2 + i); circ(c, lx, ly, 9, `rgba(255,${190 + (i % 3) * 20},${120 + (i % 2) * 80},${on})`); }
  c.strokeStyle = 'rgba(40,40,40,.6)'; c.lineWidth = 2; c.beginPath(); for (let i = 0; i < 14; i++) c.lineTo(60 + i * 70, 230 + Math.sin(i * .9) * 26); c.stroke();
  // plakaty i zegar
  fillRR(c, 80, 320, 200, 260, 4, '#2E2A4A'); circ(c, 180, 420, 60, '#F28CB1'); txt(c, 'K-POP', 180, 540, 30, '#FFFFFF', 900); fillRR(c, 320, 360, 160, 200, 4, '#E8E4DA'); c.fillStyle = '#30A46C'; c.beginPath(); c.moveTo(340, 540); c.lineTo(400, 420); c.lineTo(460, 540); c.fill();
  circ(c, 400, 660, 50, '#E8E4DA'); c.strokeStyle = '#2A2D36'; c.lineWidth = 5; c.beginPath(); c.moveTo(400, 660); c.lineTo(400, 622); c.moveTo(400, 660); c.lineTo(436, 674); c.stroke();
  // biurko z laptopem i kubkiem, roślina
  fillRR(c, 600, 900, 440, 24, 4, '#B8875A'); c.fillStyle = '#9A6F48'; c.fillRect(620, 924, 16, 480); c.fillRect(1004, 924, 16, 480);
  fillRR(c, 700, 820, 200, 84, 6, '#2A2D36'); fillRR(c, 680, 896, 240, 10, 4, '#3A3F4C'); fillRR(c, 950, 850, 40, 50, 8, '#E85A4F');
  fillRR(c, 80, 1000, 90, 90, 10, '#B0603A'); for (let i = 0; i < 6; i++) { c.save(); c.translate(125, 1000); c.rotate(-1.2 + i * .48); ell(c, 0, -60, 16, 50, '#3F8A4E'); c.restore(); }
  // łóżko z kołdrą w kratkę
  fillRR(c, 60, 1180, 620, 260, 30, '#2E4A7A'); for (let r = 0; r < 4; r++) for (let q = 0; q < 8; q++) if ((r + q) % 2) fillRR(c, 80 + q * 74, 1200 + r * 56, 70, 52, 6, '#3B5E96'); fillRR(c, 80, 1120, 200, 90, 30, '#E8E4DA');
  c.fillStyle = '#2E2430'; c.fillRect(0, 1440, W, 480); fillRR(c, 160, 1560, 760, 240, 120, '#C24E6A'); for (let i = 0; i < 6; i++) circ(c, 280 + i * 104, 1680, 22, 'rgba(255,255,255,.18)'); // okrągły dywan
  if (o.dark) { c.fillStyle = 'rgba(4,6,12,.45)'; c.fillRect(0, 0, W, H); }
}
// salon: meblościanka z szufladą, telewizor, kanapa, dywan, akwarium, zegar ścienny
function livingRoom(c, lt, o = {}) {
  c.fillStyle = '#4A3E36'; c.fillRect(0, 0, W, 1420); for (let r = 0; r < 18; r++) { c.fillStyle = 'rgba(255,255,255,.035)'; c.fillRect(0, r * 80, W, 3); }
  fillRR(c, 80, 300, 920, 1100, 6, '#6B4A2F'); for (let r = 0; r < 3; r++) fillRR(c, 100, 330 + r * 150, 600, 130, 4, '#5A3D26');
  for (let i = 0; i < 12; i++) fillRR(c, 120 + i * 46, 350 + hash(i) * 30, 34, 100 - hash(i) * 30, 3, ['#E85A4F', '#4FA8E8', '#F5C542', '#30A46C', '#7B4FC9', '#E8E4DA'][i % 6]);
  for (let i = 0; i < 4; i++) { c.save(); c.translate(160 + i * 140, 560); fillRR(c, -26, -40, 52, 70, 8, ['#C9D6E0', '#E8D27A', '#C9D6E0', '#E8D27A'][i]); c.restore(); } // kryształy
  fillRR(c, 740, 330, 240, 420, 4, '#2A2D36'); fillRR(c, 756, 346, 208, 150, 4, '#0B0F1C'); txt(c, '00:51', 860, 420, 34, '#5FD0FF', 800); // telewizor/dekoder
  // szuflady
  for (let i = 0; i < 3; i++) { const open = o.drawer && i === 1 ? o.drawer : 0; fillRR(c, 100, 820 + i * 150 + 0, 600, 130, 4, '#5A3D26'); if (open) { fillRR(c, 90, 830 + i * 150, 620, 140 + 40 * open, 6, '#7A5634'); fillRR(c, 300, 840 + i * 150, 200, 90, 6, '#F2E6C0'); txt(c, 'NA WAKACJE', 400, 885 + i * 150, 22, '#7A2E2E', 900); } fillRR(c, 360, 880 + i * 150 + (open ? 40 : 0), 80, 16, 8, '#C9A15A'); }
  // akwarium z rybkami
  fillRR(c, 740, 820, 240, 170, 8, '#2A6A8A'); for (let k = 0; k < 4; k++) { const fx = 760 + ((lt * 30 + k * 60) % 200), fy = 860 + k * 28; ell(c, fx, fy, 12, 7, ['#F5A142', '#E85A4F', '#F5C542', '#FFFFFF'][k]); }
  c.fillStyle = '#3A2A20'; c.fillRect(0, 1420, W, 500); fillRR(c, 120, 1500, 840, 300, 20, '#8E2F3A'); for (let i = 0; i < 6; i++) { c.strokeStyle = '#E8C77A'; c.lineWidth = 5; c.beginPath(); c.moveTo(200 + i * 130, 1560); c.lineTo(250 + i * 130, 1650); c.lineTo(200 + i * 130, 1740); c.lineTo(150 + i * 130, 1650); c.closePath(); c.stroke(); }
  { const g = c.createRadialGradient(860, 420, 20, 860, 600, 600); g.addColorStop(0, 'rgba(95,208,255,.18)'); g.addColorStop(1, 'rgba(95,208,255,0)'); c.save(); c.globalCompositeOperation = 'lighter'; c.fillStyle = g; c.fillRect(200, 200, 880, 1000); c.restore(); }
}
// ekran połączenia: zdjęcie kontaktu, imię, czas rozmowy, przyciski
function callScreen(c, lt, o = {}) {
  bigPhone(c, (cc, x, y, w, h) => {
    const g = cc.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, '#2A2F45'); g.addColorStop(1, '#0E1018'); cc.fillStyle = g; cc.fillRect(x, y, w, h);
    txt(cc, o.sub || 'połączenie przychodzące', x + w / 2, y + 120, 26, 'rgba(255,255,255,.6)', 600);
    circ(cc, x + w / 2, y + 300, 120, '#E8C4A8'); circ(cc, x + w / 2, y + 260, 60, '#F2C6A6'); c.save(); cc.beginPath(); cc.arc(x + w / 2, y + 300, 120, 0, 7); cc.clip(); fillRR(cc, x + w / 2 - 90, y + 330, 180, 120, 60, '#7A2E52'); circ(cc, x + w / 2, y + 230, 66, '#3B2A22'); circ(cc, x + w / 2, y + 262, 50, '#F2C6A6'); cc.restore(); // zdjęcie mamy
    txt(cc, o.name || 'Mama ❤', x + w / 2, y + 480, 52, '#FFFFFF', 900);
    if (o.timer != null) txt(cc, '00:' + String(Math.floor(o.timer)).padStart(2, '0'), x + w / 2, y + 540, 30, 'rgba(255,255,255,.7)', 700);
    if (o.wave) for (let i = 0; i < 18; i++) { const hh = 10 + Math.abs(Math.sin(lt * 9 + i * .8)) * 60 * o.wave; fillRR(cc, x + 120 + i * 22, y + 640 - hh / 2, 12, hh, 6, 'rgba(255,255,255,.7)'); }
    if (o.incoming) { const p = .5 + .5 * Math.sin(lt * 6); circ(cc, x + 150, y + h - 200, 60 + p * 10, 'rgba(232,52,63,.3)'); circ(cc, x + 150, y + h - 200, 56, '#E8343F'); circ(cc, x + w - 150, y + h - 200, 60 + p * 10, 'rgba(48,164,108,.3)'); circ(cc, x + w - 150, y + h - 200, 56, '#30A46C'); txt(cc, '✆', x + w - 150, y + h - 198, 50, '#fff', 900); txt(cc, '✆', x + 150, y + h - 198, 50, '#fff', 900); }
    else { circ(cc, x + w / 2, y + h - 200, 56, '#E8343F'); txt(cc, '✆', x + w / 2, y + h - 198, 50, '#fff', 900); for (let i = 0; i < 3; i++) { circ(cc, x + 140 + i * 170, y + h - 380, 44, 'rgba(255,255,255,.14)'); } }
  }, 1, o.y ?? 300);
}
// wesele w okienku: parkiet, światła disco, stoły z obrusem, tort
function weddingInset(c, lt, x, y, w, h, talk) {
  fillRR(c, x - 14, y - 14, w + 28, h + 28, 24, '#0E0F12'); c.save(); c.beginPath(); c.roundRect(x, y, w, h, 16); c.clip();
  c.fillStyle = '#2A1E3A'; c.fillRect(x, y, w, h); for (let k = 0; k < 8; k++) { const cx2 = x + hash(k) * w, cy2 = y + hash(k + 3) * h * .6; circ(c, cx2, cy2, 30 + 20 * Math.sin(lt * 3 + k), `rgba(${['255,90,160', '90,200,255', '255,220,90'][k % 3]},.35)`); }
  fillRR(c, x, y + h * .7, w, h * .3, 0, '#4A2A20'); fillRR(c, x + 20, y + h * .62, w * .5, 30, 6, '#F2F2EE'); circ(c, x + w * .2, y + h * .55, 30, '#F5E6C8');
  person(c, 'kobieta', x + w * .7, y + h + 120, 1.0, { t: lt, look: -1, phone: 2, aR: 2.0, talk, mouth: talk ? null : 'smile' }); fillRR(c, x + w * .7 - 40, y + h + 120 - 175, 80, 24, 8, '#7A2E52');
  c.restore(); txt(c, 'WESELE CIOCI · RADOM', x + w / 2, y + h + 44, 22, '#F5C542', 900);
}


// ===== SAM W DOMU: tła i rekwizyty =====
// widok z okna Kuby: blok naprzeciw z numerem 12, szyld „SKLEP U ZBYSZKA 24h”, przystanek KASZTANOWA, latarnia, śnieg, auta
function streetView(c, lt, x, y, w, h, o = {}) {
  c.save(); c.beginPath(); c.rect(x, y, w, h); c.clip(); c.translate(x, y); c.scale(w / 1080, h / 1080);
  const sky = c.createLinearGradient(0, 0, 0, 600); sky.addColorStop(0, '#05070F'); sky.addColorStop(1, '#141A2E'); c.fillStyle = sky; c.fillRect(0, 0, 1080, 1080);
  fillRR(c, 120, 60, 760, 560, 0, '#232A42'); for (let r = 0; r < 6; r++) for (let q = 0; q < 7; q++) { const lit = hash(r * 7 + q + 11) > .7; fillRR(c, 150 + q * 104, 90 + r * 84, 60, 50, 3, lit ? '#E8B860' : '#111628'); }
  fillRR(c, 820, 80, 60, 40, 4, '#E8E4DA'); txt(c, '12', 850, 101, 26, '#1E5AA8', 900); // numer bloku
  c.fillStyle = '#1A2034'; c.fillRect(120, 560, 760, 60);
  // sklep na parterze z szyldem
  fillRR(c, 160, 600, 420, 200, 4, '#2A2E38'); fillRR(c, 180, 680, 380, 120, 4, '#F2F6E8'); const on = .8 + .2 * Math.sin(lt * 9); fillRR(c, 170, 610, 400, 60, 8, `rgba(40,200,120,${on})`); txt(c, 'SKLEP U ZBYSZKA 24h', 370, 641, 30, '#FFFFFF', 900);
  c.fillStyle = '#DDE2EC'; c.fillRect(0, 800, 1080, 280); c.fillStyle = '#121624'; c.fillRect(0, 900, 1080, 180);
  // przystanek
  fillRR(c, 680, 700, 200, 16, 4, '#5E6670'); c.fillStyle = '#9AA3AE'; c.fillRect(690, 716, 8, 100); c.fillRect(862, 716, 8, 100); fillRR(c, 900, 640, 50, 50, 25, '#F5C542'); txt(c, 'A', 925, 666, 28, '#14161B', 900); c.fillStyle = '#9AA3AE'; c.fillRect(922, 690, 6, 130); txt(c, 'KASZTANOWA', 780, 690, 22, '#E8E4DA', 900);
  // latarnia i postać pod nią (opcjonalnie)
  c.fillStyle = '#20242F'; c.fillRect(600, 520, 10, 300); fillRR(c, 572, 512, 66, 14, 7, '#2A2F3C'); { const g = c.createRadialGradient(605, 530, 6, 605, 800, 300); g.addColorStop(0, 'rgba(255,200,120,.45)'); g.addColorStop(1, 'rgba(255,200,120,0)'); c.fillStyle = g; c.fillRect(300, 520, 610, 480); }
  if (o.man) { person(c, 'sasiad', 640, 860, .85, { t: lt, mouth: 'grin', look: 0, lookY: -1, still: true, aR: 2.6 + Math.sin(lt * 5) * .2, phone: 1 }); const hx = 640 + 40, hy2 = 860 - 230; const g = c.createRadialGradient(hx, hy2, 2, hx, hy2, 70); g.addColorStop(0, 'rgba(220,235,255,.95)'); g.addColorStop(1, 'rgba(220,235,255,0)'); c.save(); c.globalCompositeOperation = 'lighter'; c.fillStyle = g; c.fillRect(hx - 70, hy2 - 70, 140, 140); c.restore(); }
  // auta
  for (const [ax, col] of [[60, '#3A4052'], [330, '#5A2A30']]) { fillRR(c, ax, 840, 230, 60, 22, col); fillRR(c, ax + 40, 805, 140, 50, 18, col); c.fillStyle = '#E8EDF5'; c.fillRect(ax + 40, 798, 140, 9); }
  for (let k = 0; k < 60; k++) circ(c, hash(k) * 1080, (hash(k + 9) * 1080 + lt * 70) % 1080, 2 + hash(k + 3) * 3, 'rgba(235,240,255,.75)');
  c.restore();
}
// pokój Kuby: biurko gamingowe z monitorem i podświetleniem RGB, fotel, plakat nad łóżkiem, półka z figurkami, okno na ulicę
function kubaRoom(c, lt, o = {}) {
  c.fillStyle = '#2C3346'; c.fillRect(0, 0, W, 1440); for (let r = 0; r < 20; r++) { c.fillStyle = 'rgba(255,255,255,.03)'; c.fillRect(0, r * 76, W, 3); }
  // okno
  fillRR(c, 60, 320, 380, 520, 6, '#05070F'); streetView(c, lt, 60, 320, 380, 520, { man: o.man });
  c.strokeStyle = '#E8E4DA'; c.lineWidth = 14; c.strokeRect(60, 320, 380, 520); c.fillStyle = '#E8E4DA'; c.fillRect(243, 320, 14, 520); c.fillStyle = 'rgba(230,225,215,.22)'; for (let i = 0; i < 4; i++) c.fillRect(60 + i * 20, 320, 12, 520);
  fillRR(c, 40, 840, 420, 22, 4, '#E8E4DA'); for (let i = 0; i < 8; i++) fillRR(c, 80 + i * 44, 870, 30, 120, 6, '#D6D1C2'); // kaloryfer
  // plakat nad łóżkiem (gra) i półka z figurkami
  fillRR(c, 520, 220, 260, 180, 4, '#1A1030'); c.fillStyle = '#7B4FC9'; c.beginPath(); c.moveTo(560, 380); c.lineTo(650, 250); c.lineTo(740, 380); c.fill(); txt(c, 'LEVEL 94', 650, 300, 26, '#F5C542', 900);
  fillRR(c, 820, 260, 220, 14, 3, '#6B4A2F'); for (let i = 0; i < 4; i++) { circ(c, 850 + i * 52, 236, 14, ['#E85A4F', '#4FA8E8', '#F5C542', '#30A46C'][i]); fillRR(c, 840 + i * 52, 244, 20, 18, 4, ['#E85A4F', '#4FA8E8', '#F5C542', '#30A46C'][i]); }
  // biurko z monitorem, klawiatura RGB, myszka, puszka
  fillRR(c, 500, 1000, 560, 26, 4, '#1E1E24'); c.fillStyle = '#16161A'; c.fillRect(520, 1026, 16, 400); c.fillRect(1024, 1026, 16, 400);
  fillRR(c, 560, 640, 440, 290, 12, '#0E0F12'); fillRR(c, 574, 654, 412, 250, 6, o.screen ? '#0B1420' : '#1A2A40'); c.fillStyle = '#16161A'; c.fillRect(770, 930, 20, 70); fillRR(c, 720, 990, 120, 12, 4, '#16161A');
  if (o.screen) o.screen(c, 574, 654, 412, 250); else { fillRR(c, 574, 780, 412, 124, 0, '#2E4A2E'); for (let i = 0; i < 5; i++) fillRR(c, 600 + i * 76, 720 - hash(i) * 60, 50, 60 + hash(i) * 60, 3, '#4A5A70'); }
  for (let i = 0; i < 10; i++) fillRR(c, 600 + i * 24, 976, 20, 14, 3, `hsl(${(lt * 120 + i * 36) % 360},80%,60%)`); fillRR(c, 900, 974, 30, 20, 10, '#2A2D36'); fillRR(c, 960, 960, 24, 36, 6, '#30A46C');
  { const g = c.createLinearGradient(0, 1026, 0, 1080); g.addColorStop(0, `hsla(${(lt * 120) % 360},80%,60%,.5)`); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(500, 1026, 560, 54); }
  // podłoga, dywan, łóżko z kocem
  c.fillStyle = '#3A2E28'; c.fillRect(0, 1440, W, 480); fillRR(c, 120, 1540, 800, 260, 20, '#3E5A7A'); for (let i = 0; i < 9; i++) c.fillRect(140 + i * 90, 1540, 30, 260);
  if (o.dark) { c.fillStyle = 'rgba(3,5,10,.5)'; c.fillRect(0, 0, W, H); }
  // poświata monitora
  c.save(); c.globalCompositeOperation = 'lighter'; const mg = c.createRadialGradient(780, 780, 20, 780, 900, 700); mg.addColorStop(0, 'rgba(120,170,255,.28)'); mg.addColorStop(1, 'rgba(120,170,255,0)'); c.fillStyle = mg; c.fillRect(100, 300, 980, 1300); c.restore();
}
// fotel gamingowy (z tyłu postaci siedzącej)
function gamingChair(c, x, y) { fillRR(c, x - 90, y - 420, 180, 330, 40, '#1E1E24'); fillRR(c, x - 60, y - 400, 120, 40, 16, '#D7263D'); fillRR(c, x - 100, y - 120, 200, 40, 16, '#1E1E24'); c.fillStyle = '#16161A'; c.fillRect(x - 8, y - 80, 16, 70); fillRR(c, x - 80, y - 14, 160, 14, 6, '#16161A'); }
// czat w grze (na monitorze lub w dużym ujęciu)
function gameChat(c, lt, msgs, x, y, w, h, o = {}) {
  fillRR(c, x, y, w, h, 18, 'rgba(10,12,20,.94)'); fillRR(c, x, y, w, 70, 18, '#1B2133'); circ(c, x + 44, y + 35, 22, '#30A46C'); txt(c, o.name || 'Szymek_14', x + 80, y + 35, 30, '#FFFFFF', 900, 'left');
  txt(c, o.status || '● online · rozmowa głosowa', x + w - 24, y + 35, 22, o.off ? '#8A8F9A' : '#30A46C', 800, 'right');
  let yy = y + 100; for (const [t0, text, mine] of msgs) { if (lt < t0) continue; const p = back(clamp((lt - t0) / .3)); const bw = Math.min(w - 80, 60 + text.length * 15), bx = mine ? x + w - 30 - bw : x + 30;
    c.save(); c.translate(bx + (mine ? bw : 0), yy); c.scale(p, p); c.translate(-(bx + (mine ? bw : 0)), -yy); fillRR(c, bx, yy, bw, 64, 30, mine ? '#3B6FE0' : '#2A2C38'); txt(c, text, bx + 24, yy + 33, 28, '#FFFFFF', 700, 'left'); c.restore(); yy += 80; }
  if (o.photo && lt > o.photo) { const p = back(clamp((lt - o.photo) / .3)); c.save(); c.translate(x + w - 30, yy); c.scale(p, p); c.translate(-(x + w - 30), -yy); streetView(c, lt, x + w - 330, yy, 300, 300); c.strokeStyle = '#3B6FE0'; c.lineWidth = 6; c.strokeRect(x + w - 330, yy, 300, 300); c.restore(); }
}
// lornetka (POV z bloku naprzeciw): dwa koła, w środku okno Kuby
function binocularPOV(c, lt, inner) {
  c.fillStyle = '#020204'; c.fillRect(0, 0, W, H);
  c.save(); c.beginPath(); c.arc(360, 960, 330, 0, 7); c.arc(720, 960, 330, 0, 7); c.clip(); inner(c); const vg = c.createRadialGradient(540, 960, 260, 540, 960, 560); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,.9)'); c.fillStyle = vg; c.fillRect(0, 600, W, 720); c.restore();
  c.strokeStyle = 'rgba(255,255,255,.12)'; c.lineWidth = 2; c.beginPath(); c.moveTo(540, 900); c.lineTo(540, 1020); c.moveTo(480, 960); c.lineTo(600, 960); c.stroke();
}


// ===== WINDA: bardzo szczegółowe tła =====
const FL = 9; // piętro Kuby
// ściana klatki: kremowa góra, zielona lamperia, odpryski, rysy
function stairWall(c, x, y, w, h, split) {
  c.fillStyle = '#D8D2BE'; c.fillRect(x, y, w, h); c.fillStyle = '#3F6B55'; c.fillRect(x, y + split, w, h - split); c.fillStyle = '#2F5543'; c.fillRect(x, y + split, w, 10);
  for (let i = 0; i < 26; i++) { const px = x + hash(i + 3) * w, py = y + split + 20 + hash(i + 7) * (h - split - 40); c.fillStyle = 'rgba(230,225,210,.35)'; c.beginPath(); c.ellipse(px, py, 4 + hash(i) * 10, 3 + hash(i + 1) * 6, hash(i + 2), 0, 7); c.fill(); }
  c.strokeStyle = 'rgba(60,50,40,.15)'; c.lineWidth = 2; for (let i = 0; i < 10; i++) { const px = x + hash(i + 40) * w, py = y + hash(i + 50) * split; c.beginPath(); c.moveTo(px, py); c.lineTo(px + 30 + hash(i) * 50, py + hash(i + 9) * 10); c.stroke(); }
}
function terrazzo(c, x, y, w, h) { c.fillStyle = '#8E8676'; c.fillRect(x, y, w, h); for (let i = 0; i < 260; i++) { c.fillStyle = ['#B8AE98', '#6E6658', '#D1C7B0', '#5A544A'][i % 4]; c.beginPath(); c.arc(x + hash(i) * w, y + hash(i + 300) * h, 2 + hash(i + 600) * 4, 0, 7); c.fill(); } c.strokeStyle = 'rgba(0,0,0,.15)'; c.lineWidth = 3; for (let q = 0; q < 8; q++) { c.beginPath(); c.moveTo(x + q * 160, y); c.lineTo(x + q * 160 - 80, y + h); c.stroke(); } }
// lampa sufitowa w kratce, migocząca, z ćmą
function cageLamp(c, x, y, lt, on = 1, flick = 0) {
  const f = on * (flick && hash(Math.floor(lt * 13)) > .65 ? .15 : 1);
  fillRR(c, x - 50, y - 10, 100, 20, 6, '#5E6670'); c.fillStyle = `rgba(255,245,210,${.35 + .65 * f})`; c.beginPath(); c.ellipse(x, y + 34, 40, 30, 0, 0, 7); c.fill();
  c.strokeStyle = '#3A3F4C'; c.lineWidth = 4; for (let i = -2; i <= 2; i++) { c.beginPath(); c.moveTo(x + i * 16, y + 4); c.quadraticCurveTo(x + i * 20, y + 60, x + i * 10, y + 66); c.stroke(); }
  if (f > .2) { c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createRadialGradient(x, y + 40, 8, x, y + 300, 700); g.addColorStop(0, `rgba(255,235,180,${.45 * f})`); g.addColorStop(1, 'rgba(255,235,180,0)'); c.fillStyle = g; c.fillRect(x - 700, y, 1400, 1100); c.restore();
    const mx = x + Math.sin(lt * 7) * 40, my = y + 50 + Math.cos(lt * 5) * 20; c.fillStyle = 'rgba(60,50,40,.8)'; c.beginPath(); c.ellipse(mx, my, 5, 3, lt * 9, 0, 7); c.fill(); }
}
// drzwi windy (na korytarzu): rama, dwa skrzydła, rysy, okienko, wyświetlacz, przyciski wezwania, tabliczka
function elevDoor(c, lt, x, y, w, h, o = {}) {
  fillRR(c, x - 34, y - 34, w + 68, h + 34, 6, '#7D858E'); fillRR(c, x - 20, y - 20, w + 40, h + 20, 4, '#9AA2AB');
  const p = o.open || 0, dw = w / 2 * (1 - p);
  c.fillStyle = '#2A2D36'; c.fillRect(x, y, w, h);
  if (p > 0 && o.inCab) { c.save(); c.beginPath(); c.rect(x, y, w, h); c.clip(); o.inCab(c, x, y, w, h); c.restore(); }
  const dg = c.createLinearGradient(x, 0, x + w, 0); dg.addColorStop(0, '#A9B1BA'); dg.addColorStop(.5, '#CBD2D9'); dg.addColorStop(1, '#A3ABB4');
  c.fillStyle = dg; c.fillRect(x, y, dw, h); c.fillRect(x + w - dw, y, dw, h);
  c.strokeStyle = 'rgba(80,88,98,.35)'; c.lineWidth = 2; for (let i = 0; i < 9; i++) { const sx = x + hash(i + 70) * w; if (sx < x + dw || sx > x + w - dw) { c.beginPath(); c.moveTo(sx, y + 80 + hash(i) * 300); c.lineTo(sx + 26, y + 120 + hash(i + 3) * 300); c.stroke(); } }
  c.fillStyle = '#6E7680'; c.fillRect(x + dw - 2, y, 4, h); c.fillRect(x + w - dw - 2, y, 4, h);
  if (dw > 30) { fillRR(c, x + dw - 60, y + 160, 40, 90, 6, 'rgba(30,34,42,.7)'); fillRR(c, x + w - dw + 20, y + 160, 40, 90, 6, 'rgba(30,34,42,.7)'); }
  // wyświetlacz nad drzwiami
  fillRR(c, x + w / 2 - 70, y - 120, 140, 70, 8, '#101216'); txt(c, String(o.floor ?? 0), x + w / 2 + 14, y - 84, 46, '#FF3B30', 900);
  if (o.dir) { c.fillStyle = '#FF3B30'; c.beginPath(); if (o.dir < 0) { c.moveTo(x + w / 2 - 50, y - 96); c.lineTo(x + w / 2 - 30, y - 96); c.lineTo(x + w / 2 - 40, y - 74); } else { c.moveTo(x + w / 2 - 50, y - 76); c.lineTo(x + w / 2 - 30, y - 76); c.lineTo(x + w / 2 - 40, y - 96); } c.fill(); }
  // panel wezwania
  const px = x + w + 70; fillRR(c, px - 30, y + 260, 60, 130, 8, '#7F868E'); fillRR(c, px - 22, y + 270, 44, 110, 6, '#9AA2AB');
  circ(c, px, y + 325, 18, o.called ? '#FFB020' : '#D4D7DC'); if (o.called) { c.save(); c.shadowColor = '#FFB020'; c.shadowBlur = 20; circ(c, px, y + 325, 12, '#FFD27A'); c.restore(); }
  c.fillStyle = '#2A2D36'; c.beginPath(); c.moveTo(px - 7, y + 330); c.lineTo(px + 7, y + 330); c.lineTo(px, y + 318); c.fill();
  // tabliczka udźwigu
  fillRR(c, x + w + 40, y + 90, 120, 70, 4, '#E8E4DA'); txt(c, 'UDŹWIG', x + w + 100, y + 108, 14, '#14161B', 900); txt(c, '630 kg', x + w + 100, y + 128, 16, '#14161B', 900); txt(c, '8 osób', x + w + 100, y + 147, 14, '#14161B', 700);
}
// parter: drzwi wejściowe z siatką w szybie, skrzynki, tablica, kwiatek, kaloryfer, schody w górę, winda
function lobbyFull(c, lt, o = {}) {
  stairWall(c, 0, 0, W, 1440, 820);
  terrazzo(c, 0, 1440, W, 480);
  // drzwi wejściowe (lewo) — szyba z siatką, za nią śnieg
  fillRR(c, 20, 640, 210, 800, 6, '#5A3D26'); fillRR(c, 44, 680, 162, 420, 4, '#0C1220');
  c.save(); c.beginPath(); c.rect(44, 680, 162, 420); c.clip(); for (let k = 0; k < 20; k++) circ(c, 44 + hash(k) * 162, 680 + ((hash(k + 3) * 420 + lt * 60) % 420), 2.5, 'rgba(235,240,255,.8)'); c.strokeStyle = 'rgba(200,210,220,.35)'; c.lineWidth = 2; for (let i = 0; i < 12; i++) { c.beginPath(); c.moveTo(44 + i * 16, 680); c.lineTo(44 + i * 16 - 160, 1100); c.moveTo(44 + i * 16, 680); c.lineTo(44 + i * 16 + 160, 1100); c.stroke(); } c.restore();
  fillRR(c, 190, 1120, 24, 60, 6, '#C9A15A'); txt(c, '12', 125, 660, 22, '#E8E4DA', 900);
  if (o.doorOpen) { c.fillStyle = 'rgba(180,200,230,.12)'; c.fillRect(20, 640, 210, 800); }
  // skrzynki na listy z numerami i wystającymi listami
  fillRR(c, 270, 560, 300, 260, 6, '#6E7680'); for (let r = 0; r < 4; r++) for (let q = 0; q < 4; q++) { const n = 80 + r * 4 + q; fillRR(c, 282 + q * 72, 572 + r * 60, 64, 52, 3, '#8C939C'); c.fillStyle = '#2A2D36'; c.fillRect(290 + q * 72, 590 + r * 60, 48, 5); txt(c, String(n + 12), 314 + q * 72, 612 + r * 60, 13, '#14161B', 900); if (hash(n) > .6) fillRR(c, 296 + q * 72, 580 + r * 60, 34, 12, 2, '#F2EEE4'); }
  // tablica ogłoszeń
  fillRR(c, 290, 260, 280, 250, 6, '#B8875A'); const notes = [['PRZEGLĄD WINDY', '12.11 · 8–14'], ['ZAGINĄŁ KOT', 'rudy, „Pączek”'], ['ZEBRANIE', 'wspólnoty 20.11'], ['ZAKAZ', 'palenia na klatce']];
  notes.forEach(([a, b], i) => { c.save(); c.translate(310 + (i % 2) * 130, 280 + Math.floor(i / 2) * 110); c.rotate((hash(i + 5) - .5) * .12); fillRR(c, 0, 0, 120, 96, 3, ['#FFFFFF', '#F5E07A', '#CDE6F5', '#FFFFFF'][i]); txt(c, a, 60, 30, 12, '#14161B', 900); txt(c, b, 60, 56, 11, '#3A3F4C', 700); circ(c, 60, 6, 5, '#D7263D'); c.restore(); });
  // winda w środku
  elevDoor(c, lt, 640, 560, 300, 880, { open: o.elevOpen || 0, floor: o.floor ?? 0, dir: o.dir, called: o.called, inCab: o.inCab });
  // kaloryfer i kwiatek w donicy
  fillRR(c, 260, 1180, 260, 180, 8, '#E8E4DA'); for (let i = 0; i < 9; i++) fillRR(c, 268 + i * 28, 1190, 20, 160, 6, '#D6D1C2');
  fillRR(c, 520, 1300, 90, 120, 12, '#B0603A'); for (let i = 0; i < 7; i++) { c.save(); c.translate(565, 1300); c.rotate(-1.3 + i * .43); ell(c, 0, -80, 20, 70, i % 2 ? '#3F8A4E' : '#357A43'); c.restore(); }
  // wycieraczka i mokre ślady butów
  fillRR(c, 30, 1450, 220, 70, 8, '#3A2E24'); if (o.prints) for (let i = 0; i < 7; i++) ell(c, 260 + i * 60, 1560 + (i % 2) * 26, 16, 9, 'rgba(60,70,90,.35)');
  // kosz i graffiti
  fillRR(c, 1000, 1280, 60, 150, 8, '#2A2D36'); txt(c, 'KS SOKÓŁ', 1010, 1100, 22, 'rgba(40,40,60,.35)', 900);
  cageLamp(c, 540, 40, lt, o.lightOff ? 0 : 1, o.flick);
}
// wnętrze kabiny: stal szczotkowana, lustro, poręcz, panel z Braille’em, ALARM, STOP, wyświetlacz, naklejka UDT, kratka wentylatora, graffiti
function cabFull(c, lt, o = {}) {
  c.fillStyle = '#8C939C'; c.fillRect(0, 0, W, H);
  c.strokeStyle = 'rgba(255,255,255,.08)'; c.lineWidth = 2; for (let i = 0; i < 120; i++) { c.beginPath(); c.moveTo(0, i * 16); c.lineTo(W, i * 16 + 4); c.stroke(); }
  // sufit z panelem świetlnym i wentylatorem
  fillRR(c, 0, 0, W, 170, 0, '#5E6670'); const fl = o.flicker && hash(Math.floor(lt * 14)) > .55 ? .15 : 1; fillRR(c, 220, 50, 640, 70, 12, `rgba(255,252,235,${fl})`); c.strokeStyle = 'rgba(0,0,0,.2)'; for (let i = 0; i < 12; i++) { c.beginPath(); c.moveTo(220 + i * 54, 50); c.lineTo(220 + i * 54, 120); c.stroke(); }
  circ(c, 960, 90, 40, '#3A3F4C'); for (let i = 0; i < 6; i++) { c.save(); c.translate(960, 90); c.rotate(lt * 8 + i); fillRR(c, -4, -34, 8, 30, 3, '#5E6670'); c.restore(); }
  // lustro (lewa ściana) z odbiciem
  fillRR(c, 60, 260, 360, 1000, 8, '#5E6670'); fillRR(c, 76, 276, 328, 968, 6, '#B8C6D0'); if (o.mirror) { c.save(); c.beginPath(); c.rect(76, 276, 328, 968); c.clip(); c.globalAlpha = .55; o.mirror(c); c.restore(); } c.fillStyle = 'rgba(255,255,255,.22)'; c.beginPath(); c.moveTo(100, 276); c.lineTo(160, 276); c.lineTo(100, 400); c.fill();
  // poręcz
  fillRR(c, 40, 1130, 1000, 22, 11, '#C9CDD2'); for (const hx of [80, 1000]) fillRR(c, hx, 1130, 14, 60, 4, '#9AA2AB');
  // panel
  const px = 780, py = 420; fillRR(c, px, py, 200, 560, 12, '#5E6670'); fillRR(c, px + 12, py + 12, 176, 536, 8, '#9AA2AB');
  fillRR(c, px + 30, py + 26, 140, 60, 6, '#101216'); txt(c, String(o.floor ?? 0), px + 100, py + 57, 40, '#FF3B30', 900);
  for (let n = 0; n <= 10; n++) { const col = n % 2, row = Math.floor(n / 2), bx = px + 60 + col * 80, by = py + 140 + row * 58; const lit = (o.lit || []).includes(n); circ(c, bx, by, 22, lit ? '#FFB020' : '#D4D7DC'); if (lit) { c.save(); c.shadowColor = '#FFB020'; c.shadowBlur = 14; circ(c, bx, by, 15, '#FFD27A'); c.restore(); } txt(c, String(n), bx, by + 1, 18, '#14161B', 900); for (let d = 0; d < 3; d++) circ(c, bx + 28, by - 6 + d * 6, 1.6, '#2A2D36'); }
  fillRR(c, px + 30, py + 470, 60, 50, 10, o.alarm ? '#FFE36A' : '#F5C542'); txt(c, '🔔', px + 60, py + 496, 24, '#14161B', 900);
  fillRR(c, px + 110, py + 470, 60, 50, 10, o.stop ? '#FF3B30' : '#C23A3A'); txt(c, 'STOP', px + 140, py + 496, 14, '#FFFFFF', 900);
  for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) circ(c, px + 70 + i * 20, py + 548 + j * 10, 2.5, '#3A3F4C'); // głośnik
  // naklejki: UDT i instrukcja awaryjna
  fillRR(c, 800, 1010, 160, 90, 6, '#E8E4DA'); txt(c, 'UDT', 880, 1030, 18, '#1E5AA8', 900); txt(c, 'przegląd: 10.2026', 880, 1056, 13, '#14161B', 800); txt(c, 'nr 94/12', 880, 1078, 13, '#14161B', 700);
  fillRR(c, 470, 300, 220, 120, 6, '#FFF3C4'); txt(c, 'W RAZIE AWARII', 580, 330, 15, '#C23A3A', 900); txt(c, 'naciśnij ALARM', 580, 356, 15, '#14161B', 800); txt(c, 'i czekaj na pomoc', 580, 380, 14, '#14161B', 700);
  c.strokeStyle = 'rgba(40,40,60,.35)'; c.lineWidth = 4; c.beginPath(); c.moveTo(500, 560); c.lineTo(560, 540); c.lineTo(600, 580); c.stroke(); txt(c, 'Ola+?', 560, 620, 22, 'rgba(40,40,60,.35)', 900);
  // podłoga z gumy w paski
  c.fillStyle = '#3A3F4C'; c.fillRect(0, 1440, W, 480); c.fillStyle = 'rgba(0,0,0,.25)'; for (let i = 0; i < 30; i++) c.fillRect(i * 38, 1440, 14, 480);
}
// klatka: schody (półpiętro), poręcz, okno, numer piętra, włącznik z pomarańczowym światełkiem, lampa, drzwi mieszkań
function stairFull(c, lt, floor, o = {}) {
  stairWall(c, 0, 0, W, 1440, 860); terrazzo(c, 0, 1440, W, 480);
  txt(c, String(floor), 170, 470, 160, 'rgba(40,60,50,.6)', 900); txt(c, 'PIĘTRO', 170, 570, 30, 'rgba(40,60,50,.6)', 900);
  // okno na półpiętrze
  fillRR(c, 720, 140, 300, 340, 6, '#0B1020'); for (let r = 0; r < 4; r++) for (let q = 0; q < 3; q++) if (hash(r * 3 + q + floor) > .55) fillRR(c, 750 + q * 90, 170 + r * 76, 46, 36, 2, '#E8B860'); for (let k = 0; k < 12; k++) circ(c, 720 + hash(k) * 300, 140 + ((hash(k + 3) * 340 + lt * 50) % 340), 2.2, 'rgba(235,240,255,.75)');
  c.strokeStyle = '#E8E4DA'; c.lineWidth = 14; c.strokeRect(720, 140, 300, 340); c.fillStyle = '#E8E4DA'; c.fillRect(864, 140, 12, 340);
  // schody: stopnie z nosami, cienie
  for (let i = 0; i < 13; i++) { const sx = 60 + i * 64, sy = 1460 - i * 62; fillRR(c, sx, sy, 300, 18, 3, '#A49C88'); c.fillStyle = '#7A7262'; c.fillRect(sx, sy + 18, 300, 44); c.fillStyle = 'rgba(0,0,0,.12)'; c.fillRect(sx, sy + 18, 300, 8); }
  // poręcz: metalowe tralki + drewniany pochwyt
  c.strokeStyle = '#2A2D36'; c.lineWidth = 6; for (let i = 0; i < 13; i++) { c.beginPath(); c.moveTo(70 + i * 64, 1240 - i * 62); c.lineTo(70 + i * 64, 1460 - i * 62); c.stroke(); }
  c.strokeStyle = '#6B4A2F'; c.lineWidth = 16; c.lineCap = 'round'; c.beginPath(); c.moveTo(40, 1260); c.lineTo(900, 440); c.stroke(); c.lineCap = 'butt';
  // włącznik z pomarańczową lampką (czasowy)
  fillRR(c, 40, 760, 54, 74, 8, '#E8E4DA'); fillRR(c, 52, 772, 30, 50, 6, '#D6D1C2'); const sw = o.switchGlow ?? 1; c.save(); c.shadowColor = '#FF9A2A'; c.shadowBlur = 16 * sw; circ(c, 67, 812, 6, sw ? '#FF9A2A' : '#7A4A20'); c.restore();
  // licznik/skrzynka elektryczna
  fillRR(c, 960, 560, 100, 150, 6, '#8C939C'); txt(c, '⚡', 1010, 630, 40, '#F5C542', 900);
  cageLamp(c, 540, 40, lt, o.lightOff ? 0 : 1, o.flick);
}
// korytarz 9. piętra: drzwi 93, 94 (Kuby), 95, winda, wycieraczki, numer piętra
function landing9(c, lt, o = {}) {
  stairWall(c, 0, 0, W, 1440, 860); terrazzo(c, 0, 1440, W, 480);
  txt(c, '9', 540, 200, 120, 'rgba(40,60,50,.55)', 900);
  elevDoor(c, lt, 60, 600, 280, 840, { open: o.elevOpen || 0, floor: o.floor ?? 9, inCab: o.inCab, called: false });
  // drzwi 94
  quilted(c, 560, 560, 300, 880, '#6B4A2F', '#583B24', '#C9A15A', 60); c.strokeStyle = '#3A2818'; c.lineWidth = 12; c.strokeRect(560, 560, 300, 880);
  fillRR(c, 670, 600, 80, 44, 22, '#C9A15A'); txt(c, '94', 710, 623, 26, '#3A2A1A', 900); circ(c, 710, 700, 12, '#1B1C22'); fillRR(c, 800, 1000, 40, 70, 6, '#C9A15A'); fillRR(c, 790, 1100, 60, 18, 8, '#C9A15A');
  fillRR(c, 560, 1440, 300, 50, 8, '#7A5634'); txt(c, 'WITAMY', 710, 1466, 22, '#C9A15A', 900);
  // drzwi 95 (prawo, kawałek)
  quilted(c, 950, 560, 200, 880, '#4A3A30', '#3A2E24', '#9C7A43', 60); fillRR(c, 960, 600, 60, 36, 18, '#C9A15A'); txt(c, '95', 990, 619, 20, '#3A2A1A', 900);
  fillRR(c, 20, 760, 54, 74, 8, '#E8E4DA'); c.save(); const sw = o.switchGlow ?? 1; c.shadowColor = '#FF9A2A'; c.shadowBlur = 16 * sw; circ(c, 47, 812, 6, sw ? '#FF9A2A' : '#7A4A20'); c.restore();
  cageLamp(c, 540, 40, lt, o.lightOff ? 0 : 1, o.flick);
}

function cabMini(c, x, y, w, h, lt, o = {}, who) { c.save(); c.translate(x + w / 2, y); c.scale(w / 760, h / 1560); c.translate(-540, -160); cabFull(c, lt, o); if (who) who(c); c.restore(); }
// ===================== SCENY =====================
// 0. HAK: przycisk wezwania świeci, wyświetlacz liczy w dół 9…0. Drzwi się otwierają — w środku obcy trzyma drzwi i się uśmiecha.
scene({
  name: 'hook', start: 0, end: 5, cam: jolt([3.6]),
  draw(c, lt) {
    const fl = Math.max(0, 9 - Math.floor(lt / 3.3 * 10));
    stairWall(c, 0, 0, W, H, 1100); terrazzo(c, 0, 1500, W, 420);
    c.save(); c.translate(540, 1000); c.scale(1.35, 1.35); c.translate(-540, -1000);
    elevDoor(c, lt, 390, 520, 300, 880, { open: lt > 3.4 ? clamp((lt - 3.4) / .5) : 0, floor: fl, dir: lt < 3.3 ? -1 : 0, called: lt > .9, inCab: (cc, x, y, w, h) => { cabMini(cc, x, y, w, h, lt, { floor: 0 }); person(cc, 'sasiad', x + w / 2, y + h - 10, 2.2, { t: lt, mouth: 'grin', look: 0, aR: 1.5, still: true }); } });
    c.restore();
    night(c, .5, [{ x: 540, y: 1000, r: 620, a: .9 }]);
    bigSign(c, lt, 'NIE WSIADAJ', 'DO WINDY!', 1640);
  },
  post(c, lt) { joltFlash(c, lt, [3.6]); if (lt > .9 && lt < 3.4) label(c, 'WINDA ZJEŻDŻA Z 9. PIĘTRA', 540, 300, 'dark', 36, lt - .9, 3.4 - lt); },
});
// 1. PARTER, 22:50: Kuba wchodzi z mrozu, śnieg na ramionach, torba sportowa.
scene({
  name: 'ctx', start: 5, end: 11,
  draw(c, lt) { lobbyFull(c, lt, { doorOpen: lt < 1.2, prints: lt > 1, floor: 9 }); const kx = lerp(120, 470, clamp(lt / 2.6));
    person(c, 'kuba', kx, 1720, 2.0, { t: lt, walk: lt < 2.6 ? lt * 10 : null, look: 1, duffel: true }); if (lt < 4) breathPuff(c, kx + 30, 1720 - 2.0 * 250, lt);
    for (let k = 0; k < 6; k++) circ(c, kx - 40 + hash(k) * 80, 1720 - 2.0 * 190 + hash(k + 3) * 20, 4, 'rgba(240,245,255,.9)'); // śnieg na ramionach
    night(c, .3, [{ x: 540, y: 600, r: 900, a: .9 }]); },
  post(c, lt) { if (lt > .3) label(c, '22:50 · KUBA WRACA Z TRENINGU', 540, 300, 'yellow', 38, lt - .3, 9); if (lt > 2.4) label(c, 'MIESZKA NA 9. PIĘTRZE', 540, 410, 'dark', 32, lt - 2.4, 9); },
});
// 2. WEZWANIE: Kuba wciska przycisk. Na wyświetlaczu winda zjeżdża… z jego piętra.
scene({
  name: 'call', start: 11, end: 19,
  draw(c, lt) { const fl = lt < 1 ? 9 : Math.max(0, 9 - Math.floor((lt - 1) / 6.4 * 10));
    lobbyFull(c, lt, { called: lt > .6, floor: fl, dir: fl > 0 ? -1 : 0, prints: true });
    person(c, 'kuba', 470, 1720, 2.0, { t: lt, look: 1, duffel: true, aR: lt > .3 && lt < 1.2 ? 1.5 : null, lookY: lt > 2 ? -1 : 0 });
    night(c, .3, [{ x: 540, y: 600, r: 900, a: .9 }]); },
  post(c, lt) { if (lt > 1.4) label(c, 'SKĄD ZJEŻDŻA? Z 9. PIĘTRA. Z JEGO PIĘTRA.', 540, 300, 'red', 32, lt - 1.4, 9); },
});
// 3. DRZWI SIĘ OTWIERAJĄ: obcy w środku, trzyma drzwi. „Wsiadasz? Na które?”
scene({
  name: 'open', start: 19, end: 27, cam: jolt([.2]),
  bubbles: [say(1.6, 4.6, 'Wsiadasz? Na które?', 'obcy', 790, 1440, 2.0, -40)],
  draw(c, lt) { lobbyFull(c, lt, { elevOpen: 1, floor: 0, prints: true, inCab: (cc, x, y, w, h) => { cabMini(cc, x, y, w, h, lt, { floor: 0 }); } });
    person(c, 'sasiad', 790, 1440, 2.0, { t: lt, mouth: lt > 4.6 ? 'grin' : null, talk: lt > 1.6 && lt < 4.4, look: -1, aR: 1.5 });
    person(c, 'kuba', 380, 1720, 2.1, { t: lt, look: 1, duffel: true, wide: true, mouth: lt > 4.6 ? 'o' : null });
    night(c, .3, [{ x: 790, y: 1000, r: 520, a: .9 }, { x: 380, y: 1300, r: 400, a: .8 }]); },
  post(c, lt) { joltFlash(c, lt, [.2]); if (lt > 5.0) label(c, 'COŚ JEST NIE TAK', 540, 300, 'dark', 44, lt - 5, 9); },
});
// 4. W KABINIE: Kuba jednak wsiada (BŁĄD 1). Obcy stoi przy panelu. „Dziewiąte” (BŁĄD 2).
scene({
  name: 'cab', start: 27, end: 37,
  bubbles: [say(3.6, 5.6, 'Dziewiąte.', 'kuba', 320, 1720, 2.1, 40), say(6.0, 8.6, 'Dziewiąte. Jak ja.', 'obcy', 760, 1720, 2.1, -60)],
  draw(c, lt) { const fl = lt < 7 ? 0 : Math.min(2, Math.floor((lt - 7) * .8));
    cabFull(c, lt, { floor: fl, lit: lt > 6 ? [9] : [], mirror: (cc) => { person(cc, 'kuba', 240, 1200, 1.3, { t: lt, look: 1, duffel: true }); } });
    person(c, 'kuba', 320, 1720, 2.1, { t: lt, look: 1, duffel: true, wide: lt > 6, talk: lt > 3.6 && lt < 5.4 });
    person(c, 'sasiad', 760, 1720, 2.1, { t: lt, look: -1, mouth: lt > 8.6 ? 'grin' : null, talk: lt > 6 && lt < 8.4, aR: lt > 5.6 && lt < 6.4 ? 1.9 : null });
    night(c, .1, []); },
  post(c, lt) { if (lt > .6 && lt < 3.4) card(c, 70, 300, 860, 'BŁĄD 1', 'wsiadł z obcym, choć czuł,\nże coś jest nie tak', lt - .6, '#F39C12', 38); if (lt > 6.4) card(c, 70, 300, 860, 'BŁĄD 2', 'powiedział obcemu,\nna którym piętrze mieszka', lt - 6.4, '#F39C12', 38); },
});
// 5. STOP między 2. a 3. piętrem. Światło miga. „Ładna torba. KS Sokół?” Kuba wciska ALARM. Winda rusza, drzwi na 3.
scene({
  name: 'stop', start: 37, end: 47, cam: jolt([.4, 5.6]),
  bubbles: [say(1.4, 4.2, 'Ups. Ładna torba.\nKS Sokół, numer siedem?', 'obcy', 760, 1720, 2.1, -80)],
  draw(c, lt) { cabFull(c, lt, { floor: lt < 7 ? '2' : '3', lit: [9], stop: lt > .3 && lt < 7, flicker: lt > .3 && lt < 7, alarm: lt > 5.4 && lt < 7.2 });
    person(c, 'kuba', 300, 1720, 2.1, { t: lt, look: 1, duffel: true, wide: true, mouth: 'o', aR: lt > 5.2 && lt < 6.4 ? 1.6 : null, walk: lt > 8 ? lt * 14 : null });
    person(c, 'sasiad', 760, 1720, 2.1, { t: lt, look: -1, mouth: 'grin', talk: lt > 1.4 && lt < 4.0, aL: lt < .8 ? 1.6 : null });
    if (lt > 7.6) { c.fillStyle = '#C9D0D8'; const op = clamp((lt - 7.6) / .6); c.fillRect(0, 0, 20 + 0 * op, H); }
    night(c, lt > .3 && lt < 7 ? .45 : .1, [{ x: 540, y: 90, r: 700, a: .7 }]); },
  post(c, lt) { joltFlash(c, lt, [.4, 5.6]); if (lt > .4 && lt < 1.4) label(c, 'STOP. MIĘDZY 2. A 3. PIĘTREM', 540, 300, 'red', 38, lt - .4, 1.4 - lt); if (lt > 5.4 && lt < 7.2) label(c, 'KUBA WCISKA ALARM', 540, 300, 'yellow', 44, lt - 5.4, 7.2 - lt); if (lt > 7.4) label(c, '3. PIĘTRO · DRZWI SIĘ OTWIERAJĄ', 540, 300, 'dark', 38, lt - 7.4, 10 - lt); },
});
// 6. KUBA WYBIEGA NA 3. PIĘTRZE (ZASADA). Drzwi windy zamykają się za nim. Obcy jedzie dalej.
scene({
  name: 'out', start: 47, end: 55,
  draw(c, lt) { stairFull(c, lt, 3, {}); c.save(); c.translate(600, 0); elevDoor(c, lt, 0, 600, 260, 840, { open: lt < 2 ? 1 - clamp(lt / 2) * 0 : clamp(1 - (lt - 2) / .8), floor: 3, inCab: (cc, x, y, w, h) => { cabMini(cc, x, y, w, h, lt, { floor: 3, lit: [9] }); person(cc, 'sasiad', x + w / 2, y + h - 10, 1.9, { t: lt, mouth: 'grin', look: -1, still: true }); } }); c.restore();
    person(c, 'kuba', lerp(560, 300, clamp(lt / 1.4)), 1740, 2.1, { t: lt, walk: lt < 1.4 ? lt * 14 : null, look: 1, duffel: true, wide: true, mouth: 'o' }); night(c, .2, []); },
  post(c, lt) { if (lt > 1.6) card(c, 60, 300, 900, 'ZASADA', 'Źle się czujesz z kimś przy windzie?\nNie wsiadaj — poczekaj albo idź schodami.\nJuż jedziesz? Wciśnij ALARM i wysiądź.', lt - 1.6, '#F39C12', 34); },
});
// 7. SCHODY: Kuba biegnie w górę, piętro po piętrze. Światło na czasowy wyłącznik gaśnie. Na wyświetlaczu winda stoi na 9.
scene({
  name: 'stairs', start: 55, end: 70, cam: jolt([9.6]),
  draw(c, lt) { const f = Math.min(8, 4 + Math.floor(lt / 2.6)), ph = (lt % 2.6) / 2.6, off = lt > 7.0 && lt < 9.4;
    stairFull(c, lt, f, { lightOff: off, switchGlow: 1 });
    person(c, 'kuba', lerp(170, 790, ph), lerp(1462, 840, ph), 1.6, { t: lt, walk: lt * 16, look: 1, duffel: true, wide: true, mouth: 'o' });
    fillRR(c, 880, 900, 160, 70, 8, '#101216'); txt(c, '9', 960, 936, 46, '#FF3B30', 900); txt(c, 'WINDA', 960, 990, 20, 'rgba(40,40,40,.6)', 900);
    if (off) { c.fillStyle = 'rgba(2,3,8,.86)'; c.fillRect(0, 0, W, H); c.save(); c.shadowColor = '#FF9A2A'; c.shadowBlur = 24; circ(c, 67, 812, 7, '#FF9A2A'); c.restore(); }
    night(c, off ? .9 : .2, off ? [{ x: 67, y: 812, r: 120, a: .9 }] : []); },
  post(c, lt) { joltFlash(c, lt, [9.6]); if (lt < 7) label(c, 'SCHODAMI. 4… 5… 6…', 540, 300, 'yellow', 40, lt, 7 - lt); if (lt > 7.0 && lt < 9.4) label(c, 'ŚWIATŁO GAŚNIE', 540, 300, 'dark', 44, lt - 7, 9.4 - lt); if (lt > 9.6) label(c, 'WINDA CZEKA NA 9. PIĘTRZE', 540, 300, 'red', 40, lt - 9.6, 15 - lt); },
});
// 8. 9. PIĘTRO: drzwi windy otwarte, kabina pusta. Kuba przy drzwiach 94, klucze wypadają z ręki.
scene({
  name: 'landing', start: 70, end: 85,
  draw(c, lt) { landing9(c, lt, { elevOpen: lt > .6 ? clamp((lt - .6) / .7) : 0, floor: 9, inCab: (cc, x, y, w, h) => { cabMini(cc, x, y, w, h, lt, { floor: 9, lit: [], flicker: true }); } });
    const kx = lt < 4 ? lerp(-100, 640, clamp(lt / 4)) : 640; person(c, 'kuba', kx, 1760, 2.0, { t: lt, walk: lt < 4 ? lt * 12 : null, look: lt > 4 && lt < 7 ? -1 : 1, duffel: true, wide: true, keys: lt > 6 && lt < 10.2, aR: lt > 6 && lt < 10.2 ? 1.2 : null });
    if (lt > 10.4) { c.save(); c.translate(720, 1700); c.rotate(.4); c.strokeStyle = '#D6DADF'; c.lineWidth = 6; c.beginPath(); c.arc(0, 0, 18, 0, 7); c.stroke(); fillRR(c, 14, -5, 70, 10, 4, '#CFD3D8'); c.restore(); }
    night(c, .3, [{ x: 200, y: 1000, r: 420, a: .9 }, { x: 640, y: 1300, r: 420, a: .8 }]); },
  post(c, lt) { if (lt > 1.2 && lt < 4.4) label(c, 'KABINA PUSTA', 540, 300, 'dark', 44, lt - 1.2, 4.4 - lt); if (lt > 6 && lt < 10.2) label(c, 'RĘCE SIĘ TRZĘSĄ', 540, 300, 'dark', 40, lt - 6, 10.2 - lt); if (lt > 10.4) label(c, 'KLUCZE WYPADAJĄ', 540, 300, 'red', 44, lt - 10.4, 15 - lt); },
});
// 9. ZAKOŃCZENIE: w lustrze pustej kabiny widać, że ktoś stoi tuż za Kubą. Światło gaśnie. Szept. Twarz obcego w kamerę.
scene({
  name: 'end', start: 85, end: 108, cam: jolt([.4, 13.0, 16.6]),
  labels: [[19.4, 23, 'ODC. 2 ↓', 540, 1650, 'red', 64]],
  draw(c, lt) {
    if (lt < 7.0) { cabFull(c, lt, { floor: 9, flicker: true, mirror: (cc) => { person(cc, 'kuba', 180, 1200, 1.3, { t: lt, back: true, duffel: true }); person(cc, 'sasiad', 310, 1170, 1.4, { t: lt, mouth: 'grin', look: 0, still: true }); } });
      night(c, .35, [{ x: 240, y: 760, r: 420, a: .9 }]); return; }
    const l = lt - 7.0;
    if (l < 6.0) { landing9(c, lt, { floor: 9, switchGlow: 1 }); person(c, 'kuba', 640, 1760, 2.0, { t: lt, look: -1, wide: true, mouth: 'o', still: true, duffel: true });
      if (l > 1.2) person(c, 'sasiad', 330, 1760, 2.1, { t: lt, mouth: 'grin', look: 1, still: true, alpha: clamp((l - 1.2) / .6) });
      if (l > 3) { c.fillStyle = 'rgba(2,3,8,.9)'; c.fillRect(0, 0, W, H); c.save(); c.shadowColor = '#FF9A2A'; c.shadowBlur = 30; circ(c, 47, 812, 8, '#FF9A2A'); c.restore();
        c.save(); c.globalAlpha = .55; person(c, 'sasiad', 330, 1760, 2.1, { t: lt, mouth: 'grin', look: 1, still: true }); c.restore();
        c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createRadialGradient(47, 812, 4, 47, 812, 520); g.addColorStop(0, 'rgba(255,140,40,.35)'); g.addColorStop(1, 'rgba(255,140,40,0)'); c.fillStyle = g; c.fillRect(0, 300, 700, 1100); c.restore(); }
      else night(c, .4, [{ x: 540, y: 1100, r: 600, a: .9 }]); return; }
    // twarz obcego w kamerę, w pomarańczowym świetle włącznika
    c.fillStyle = '#05060A'; c.fillRect(0, 0, W, H); person(c, 'sasiad', 540, 2700, 5.2, { t: lt, mouth: 'grin', look: 0, wide: true, still: true });
    c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createRadialGradient(200, 1000, 20, 200, 1000, 900); g.addColorStop(0, 'rgba(255,150,60,.35)'); g.addColorStop(1, 'rgba(255,150,60,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H); c.restore();
    night(c, .5, [{ x: 400, y: 1100, r: 640, a: .9 }]);
    if (l > 10.6) { c.fillStyle = `rgba(0,0,0,${clamp((l - 10.6) / .6)})`; c.fillRect(0, 0, W, H); }
  },
  post(c, lt) { joltFlash(c, lt, [.4, 13.0, 16.6]); if (lt > .6 && lt < 7) label(c, 'LUSTRO W KABINIE', 540, 300, 'red', 44, lt - .6, 7 - lt); const l = lt - 7; if (l > 1.4 && l < 3) label(c, 'ZA NIM', 540, 300, 'red', 48, l - 1.4, 3 - l); if (l > 3.2 && l < 6) label(c, 'ŚWIATŁO GAŚNIE', 540, 300, 'dark', 44, l - 3.2, 6 - l); if (l > 6.4 && l < 10.6) label(c, '„DZIEWIĄTE. JAK JA.”', 540, 300, 'red', 44, l - 6.4, 10.6 - l); },
});
