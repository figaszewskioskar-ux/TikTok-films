// CO SIĘ STANIE, GDY…? · PEŁNY ODCINEK — „…w bloku zgaśnie prąd o 3:00”. Forma pełnego odcinka (ok. 7–8 min), własna historia.
// CO ZROBISZ? · ODC. 1 — „Obcy w aucie zna twoje imię”. Styl: narracja w 2. osobie, szybkie cięcia, napisy słowo po słowie, zegar i licznik.
window.EP = {
  badge: '',
  loop: false,
  vignette: .75,
  hud: 'coz', captions: false, cut: 'flash', capY: 1600,
  hl: ['imię', 'imie', 'auto', 'auta', 'obcy', 'uciekasz', 'hasło', 'hasło?', 'zdjęcia', 'torba', 'drzwi', 'policja', 'sklep', 'cisza', 'nagle', 'nie', 'syreny', 'kuba', 'kuba?', 'kuby'],
  clock(t) { if (t < 8) return null; const m = Math.floor((t - 8) / 14); return `3:${String(m).padStart(2, '0')}`; },
  timer(t) { if (t >= 8 && t < 72) return ['ZOSTAŁO', Math.max(0, 60 - (t - 8) * 60 / 64), t > 58]; return null; },
  cues(add) { },
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
  c.save(); c.translate(700, 1153); c.rotate(o.handle || 0); fillRR(c, -60, -13, 90, 26, 10, '#C9A15A'); c.restore(); circ(c, 700, 1153, 16, '#B08A48'); // klamka (o.handle = obrót)
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

// ===================== v2: „Nie przytrzymuj drzwi!” — nowe tła =====================
function bricks(c, x, y, w, h) {
  c.save(); c.beginPath(); c.rect(x, y, w, h); c.clip(); c.fillStyle = '#4A2219'; c.fillRect(x, y, w, h);
  const bw = 72, bh = 28; for (let r = 0; r * bh < h; r++) for (let q = -1; q * bw < w + bw; q++) { const bx = x + q * bw + (r % 2) * bw / 2, by = y + r * bh;
    c.fillStyle = ['#7E3E2C', '#6C3324', '#8A4834', '#5E2B1F', '#764030'][Math.floor(hash(r * 31 + q * 7) * 5)]; c.fillRect(bx + 3, by + 3, bw - 6, bh - 6); }
  c.restore();
}
// drzwi windy v2: ościeżnica w trzech warstwach, szczotkowana stal, refleks, odciski palców, naklejka, listwa, próg z rowkami,
// wyświetlacz ze strzałką, panel wezwania ▲▼ z Braille’em, tabliczka pożarowa, udźwig
function elevDoor2(c, lt, x, y, w, h, o = {}) {
  fillRR(c, x - 64, y - 200, w + 128, h + 200, 4, '#B4AD9B');
  for (let i = 1; i < 7; i++) { c.fillStyle = 'rgba(0,0,0,.08)'; c.fillRect(x - 64, y - 200 + i * (h + 200) / 7, w + 128, 2); }
  c.fillStyle = 'rgba(0,0,0,.08)'; c.fillRect(x + w / 2 - 1, y - 200, 2, 180);
  fillRR(c, x - 30, y - 30, w + 60, h + 30, 4, '#5E6670'); fillRR(c, x - 22, y - 22, w + 44, h + 22, 3, '#AEB6BF'); fillRR(c, x - 8, y - 8, w + 16, h + 8, 2, '#6E7680');
  const p = o.open || 0, dw = w / 2 * (1 - p);
  c.fillStyle = '#14161B'; c.fillRect(x, y, w, h);
  if (p > 0) { c.save(); c.beginPath(); c.rect(x, y, w, h); c.clip(); if (o.inCab) o.inCab(c, x, y, w, h); else { c.fillStyle = '#C8C4B4'; c.fillRect(x, y, w, h); } c.restore(); }
  c.save(); c.beginPath(); c.rect(x, y, dw, h); c.rect(x + w - dw, y, dw, h); c.clip();
  const g = c.createLinearGradient(x, 0, x + w, 0); g.addColorStop(0, '#949CA6'); g.addColorStop(.3, '#C6CDD4'); g.addColorStop(.5, '#D9DEE3'); g.addColorStop(.7, '#C0C7CE'); g.addColorStop(1, '#8E96A0');
  c.fillStyle = g; c.fillRect(x, y, w, h);
  c.strokeStyle = 'rgba(255,255,255,.09)'; c.lineWidth = 1; for (let k = 0; k < w; k += 4) { c.beginPath(); c.moveTo(x + k, y); c.lineTo(x + k, y + h); c.stroke(); }
  c.fillStyle = 'rgba(255,255,255,.14)'; c.beginPath(); c.moveTo(x + w * .18, y); c.lineTo(x + w * .34, y); c.lineTo(x + w * .08, y + h); c.lineTo(x - w * .08, y + h); c.fill();
  for (let i = 0; i < 9; i++) ell(c, x + w / 2 + (hash(i + 11) - .5) * w * .7, y + h * .42 + hash(i + 12) * h * .22, 9, 13, 'rgba(80,70,60,.13)');
  c.strokeStyle = 'rgba(70,76,86,.35)'; c.lineWidth = 2; for (let i = 0; i < 6; i++) { const sx = x + hash(i + 70) * w, sy = y + h * .6 + hash(i) * h * .3; c.beginPath(); c.moveTo(sx, sy); c.lineTo(sx + 22, sy + 30); c.stroke(); }
  c.restore();
  if (dw > 60) { const sx = x + dw - 50; c.fillStyle = '#F5C542'; c.beginPath(); c.moveTo(sx, y + 360); c.lineTo(sx + 36, y + 360); c.lineTo(sx + 18, y + 328); c.fill(); txt(c, '!', sx + 18, y + 350, 18, '#14161B', 900); }
  if (dw > 2) { c.fillStyle = '#23262E'; c.fillRect(x + dw - 6, y, 6, h); c.fillRect(x + w - dw, y, 6, h); }
  // próg z rowkami
  fillRR(c, x - 24, y + h - 6, w + 48, 24, 2, '#B8BEC5'); c.fillStyle = '#7D858E'; for (let i = 0; i < (w + 40) / 12; i++) c.fillRect(x - 18 + i * 12, y + h + 2, 5, 12);
  if (p > 0 && !o.dark) { c.save(); c.globalCompositeOperation = 'lighter'; c.globalAlpha = .5 * p; const lg = c.createLinearGradient(0, y + h, 0, y + h + 360); lg.addColorStop(0, 'rgba(255,248,225,.55)'); lg.addColorStop(1, 'rgba(255,248,225,0)'); c.fillStyle = lg; c.beginPath(); c.moveTo(x, y + h + 10); c.lineTo(x + w, y + h + 10); c.lineTo(x + w + 140, y + h + 360); c.lineTo(x - 140, y + h + 360); c.fill(); c.restore(); }
  // wyświetlacz nad drzwiami
  const dx = x + w / 2; fillRR(c, dx - 92, y - 156, 184, 96, 10, '#3A3F4C'); fillRR(c, dx - 82, y - 146, 164, 76, 6, '#07080B');
  c.save(); c.shadowColor = '#FF3B30'; c.shadowBlur = 16; txt(c, String(o.floor ?? 0), dx + 24, y - 106, 54, '#FF3B30', 900);
  if (o.dir) { c.fillStyle = '#FF3B30'; c.beginPath(); if (o.dir < 0) { c.moveTo(dx - 58, y - 122); c.lineTo(dx - 26, y - 122); c.lineTo(dx - 42, y - 92); } else { c.moveTo(dx - 58, y - 94); c.lineTo(dx - 26, y - 94); c.lineTo(dx - 42, y - 124); } c.fill(); }
  c.restore();
  // tabliczka udźwigu na ościeżnicy
  fillRR(c, dx - 60, y - 52, 120, 26, 3, '#E8E4DA'); txt(c, 'UDŹWIG 630 kg · 8 OSÓB', dx, y - 39, 11, '#14161B', 900);
  // panel wezwania
  const px = o.panelLeft ? x - 64 - 40 : x + w + 64 + 40, py = y + 300;
  fillRR(c, px - 34, py, 68, 190, 8, '#6E7680'); fillRR(c, px - 27, py + 7, 54, 176, 6, '#B3BAC2');
  for (const [k, dir] of [[0, 1], [1, -1]]) { const by = py + 50 + k * 80, lit = o.called && (o.called === dir || o.called === true);
    c.save(); if (lit) { c.shadowColor = '#FFB020'; c.shadowBlur = 22; } circ(c, px, by, 20, lit ? '#FFB020' : '#8C939C'); c.restore(); circ(c, px, by, 15, lit ? '#FFD27A' : '#D4D7DC');
    c.fillStyle = '#2A2D36'; c.beginPath(); if (dir > 0) { c.moveTo(px - 7, by + 5); c.lineTo(px + 7, by + 5); c.lineTo(px, by - 7); } else { c.moveTo(px - 7, by - 5); c.lineTo(px + 7, by - 5); c.lineTo(px, by + 7); } c.fill();
    for (let d = 0; d < 3; d++) circ(c, px + 22, by - 6 + d * 6, 1.6, '#2A2D36'); }
  fillRR(c, px - 30, py - 130, 60, 112, 4, '#FFFFFF'); c.strokeStyle = '#C23A3A'; c.lineWidth = 4; c.strokeRect(px - 26, py - 126, 52, 104);
  txt(c, 'W RAZIE', px, py - 106, 9, '#C23A3A', 900); txt(c, 'POŻARU', px, py - 92, 9, '#C23A3A', 900); txt(c, '🔥', px, py - 66, 20, '#C23A3A', 900); txt(c, 'NIE UŻYWAĆ', px, py - 38, 8, '#14161B', 900);
}
// okno nocą z widokiem na blok naprzeciwko i śnieg
function nightWindow(c, lt, x, y, w, h, seed = 0) {
  fillRR(c, x - 16, y - 16, w + 32, h + 32, 4, '#E8E4DA'); c.fillStyle = '#081022'; c.fillRect(x, y, w, h);
  c.save(); c.beginPath(); c.rect(x, y, w, h); c.clip();
  c.fillStyle = '#1A2238'; c.fillRect(x + w * .12, y + h * .25, w * .8, h); for (let r = 0; r < 6; r++) for (let q = 0; q < 5; q++) fillRR(c, x + w * .16 + q * w * .15, y + h * .3 + r * h * .13, w * .09, h * .07, 2, hash(r * 5 + q + seed) > .62 ? '#E8B860' : '#121A2C');
  for (let k = 0; k < 16; k++) circ(c, x + hash(k + seed) * w, y + ((hash(k + 3) * h + lt * 55) % h), 2.2, 'rgba(235,240,255,.8)');
  c.restore(); c.strokeStyle = '#E8E4DA'; c.lineWidth = 12; c.beginPath(); c.moveTo(x + w / 2, y); c.lineTo(x + w / 2, y + h); c.moveTo(x, y + h * .32); c.lineTo(x + w, y + h * .32); c.stroke();
  fillRR(c, x - 30, y + h + 14, w + 60, 18, 4, '#CFC8B4'); for (let i = 0; i < 3; i++) ell(c, x + w * (.2 + i * .3), y + h + 10, 30, 8, 'rgba(255,255,255,.9)');
}
function timerSwitch(c, x, y, glow = 1) { fillRR(c, x, y, 58, 78, 8, '#E8E4DA'); fillRR(c, x + 12, y + 12, 34, 54, 6, '#D6D1C2'); c.save(); c.shadowColor = '#FF9A2A'; c.shadowBlur = 18 * glow; circ(c, x + 29, y + 52, 6, glow ? '#FF9A2A' : '#7A4A20'); c.restore(); txt(c, '⏱', x + 29, y + 30, 16, '#8C8676', 900); }
// KLATKA: winda tuż obok schodów, w jednym kadrze. Schody z lastryka, poręcz z tralkami, lamperia po skosie, okno na półpiętrze,
// hydrant pod biegiem, skrzynka elektryczna, wyłącznik czasowy, numer piętra na ścianie
const SFY = 1400, SX0 = 440, SRUN = 60, SRISE = 64, SN = 10;
function stairFootY(x) { const i = clamp(Math.floor((x - SX0) / SRUN), -1, SN - 1); return i < 0 ? SFY : SFY - (i + 1) * SRISE; }
function stairElev(c, lt, floor, o = {}) {
  const sl = SRISE / SRUN, topX = SX0 + SN * SRUN, topY = SFY - SN * SRISE;
  c.fillStyle = '#D8D2BE'; c.fillRect(0, 0, W, SFY);
  c.fillStyle = '#C6BFA8'; c.fillRect(0, 0, W, 54); c.fillStyle = 'rgba(0,0,0,.12)'; c.fillRect(0, 54, W, 4);
  // lamperia: pozioma przy windzie, ukośna wzdłuż schodów
  const LH = 560; c.fillStyle = '#3F6B55'; c.beginPath(); c.moveTo(0, SFY - LH); c.lineTo(SX0, SFY - LH); c.lineTo(topX, topY - LH); c.lineTo(W, topY - LH); c.lineTo(W, SFY); c.lineTo(0, SFY); c.fill();
  c.strokeStyle = '#2C4F3E'; c.lineWidth = 10; c.beginPath(); c.moveTo(0, SFY - LH); c.lineTo(SX0, SFY - LH); c.lineTo(topX, topY - LH); c.lineTo(W, topY - LH); c.stroke();
  for (let i = 0; i < 22; i++) { const px = hash(i + 3) * W, py = SFY - 60 - hash(i + 7) * 420; c.fillStyle = 'rgba(230,225,210,.3)'; c.beginPath(); c.ellipse(px, py, 4 + hash(i) * 10, 3 + hash(i + 1) * 6, hash(i + 2), 0, 7); c.fill(); }
  c.strokeStyle = 'rgba(60,50,40,.16)'; c.lineWidth = 2; for (let i = 0; i < 8; i++) { const px = hash(i + 40) * W, py = 90 + hash(i + 50) * 400; c.beginPath(); c.moveTo(px, py); c.lineTo(px + 30 + hash(i) * 50, py + hash(i + 9) * 14); c.lineTo(px + 50 + hash(i) * 60, py + 20); c.stroke(); }
  // numer piętra malowany na ścianie
  txt(c, floor === 0 ? 'P' : String(floor), 160, 345, 96, 'rgba(40,60,50,.55)', 900); txt(c, floor === 0 ? 'PARTER' : 'PIĘTRO', 160, 418, 24, 'rgba(40,60,50,.55)', 900);
  // okno na półpiętrze
  nightWindow(c, lt, 770, 150, 250, 330, floor);
  // skrzynka elektryczna nad poręczą
  fillRR(c, 520, 470, 150, 190, 6, '#8C939C'); fillRR(c, 530, 480, 130, 170, 4, '#9EA5AD'); txt(c, '⚡', 595, 540, 40, '#F5C542', 900); fillRR(c, 640, 560, 10, 30, 3, '#5E6670'); txt(c, 'NIE DOTYKAĆ', 595, 620, 11, '#C23A3A', 900);
  // bieg schodów: bryła, spód, stopnie
  c.fillStyle = '#B3AC97'; c.beginPath(); c.moveTo(SX0, SFY);
  for (let i = 0; i < SN; i++) { c.lineTo(SX0 + i * SRUN, SFY - (i + 1) * SRISE); c.lineTo(SX0 + (i + 1) * SRUN, SFY - (i + 1) * SRISE); }
  c.lineTo(W, topY); c.lineTo(W, topY + 150); const uy = (x) => SFY + 150 - (x - SX0) * sl; c.lineTo(W, Math.max(topY + 150, uy(W))); c.lineTo(SX0 + 150 / sl, SFY); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(0,0,0,.25)'; c.lineWidth = 8; c.beginPath(); c.moveTo(SX0 + 150 / sl, SFY); c.lineTo(topX, uy(topX)); c.lineTo(W, uy(topX)); c.stroke();
  for (let i = 0; i < SN; i++) { const sx = SX0 + i * SRUN, sy = SFY - (i + 1) * SRISE;
    fillRR(c, sx - 4, sy - 12, SRUN + 8, 16, 3, '#A49C88'); for (let k = 0; k < 5; k++) circ(c, sx + hash(i * 9 + k) * SRUN, sy - 6 + hash(k + i) * 6, 2, ['#D1C7B0', '#6E6658'][k % 2]);
    c.fillStyle = '#4E4A40'; c.fillRect(sx - 4, sy + 2, SRUN + 8, 5); c.fillStyle = 'rgba(0,0,0,.14)'; c.fillRect(sx, sy + 7, 10, SRISE - 7); }
  fillRR(c, topX - 4, topY - 12, W - topX + 10, 16, 3, '#A49C88');
  // hydrant pod biegiem
  fillRR(c, 860, 1160, 150, 220, 6, '#C23A3A'); fillRR(c, 872, 1172, 126, 196, 4, '#D94A4A'); c.strokeStyle = '#F2F2EE'; c.lineWidth = 5; c.beginPath(); c.arc(935, 1270, 38, 0, 7); c.stroke(); c.beginPath(); c.arc(935, 1270, 22, 0, 7); c.stroke();
  txt(c, 'HYDRANT', 935, 1195, 16, '#FFFFFF', 900); fillRR(c, 980, 1250, 10, 40, 3, '#8A2020');
  if (o.mid) o.mid(c); // postać na schodach — za poręczą
  // poręcz: tralki + drewniany pochwyt + słupek z zawijasem
  c.strokeStyle = '#23262E'; c.lineWidth = 6; for (let i = 0; i < SN; i++) { const bx = SX0 + i * SRUN + SRUN / 2, by = SFY - (i + 1) * SRISE - 8; c.beginPath(); c.moveTo(bx, by); c.lineTo(bx, by - 230); c.stroke(); }
  for (let bx = topX + 30; bx < W; bx += 60) { c.beginPath(); c.moveTo(bx, topY - 8); c.lineTo(bx, topY - 238); c.stroke(); }
  c.lineWidth = 4; c.beginPath(); c.moveTo(SX0, SFY - 100); c.lineTo(topX, topY - 100); c.lineTo(W, topY - 100); c.stroke();
  c.strokeStyle = '#6B4A2F'; c.lineWidth = 18; c.lineCap = 'round'; c.beginPath(); c.moveTo(SX0 - 10, SFY - 250); c.lineTo(topX, topY - 246); c.lineTo(W + 20, topY - 246); c.stroke();
  c.strokeStyle = 'rgba(255,220,170,.25)'; c.lineWidth = 5; c.beginPath(); c.moveTo(SX0 - 10, SFY - 256); c.lineTo(topX, topY - 252); c.lineTo(W + 20, topY - 252); c.stroke(); c.lineCap = 'butt';
  fillRR(c, SX0 - 22, SFY - 270, 22, 270, 4, '#23262E'); c.strokeStyle = '#6B4A2F'; c.lineWidth = 14; c.beginPath(); c.arc(SX0 - 26, SFY - 238, 16, -1.6, 2.6); c.stroke();
  // podłoga
  terrazzo(c, 0, SFY, W, H - SFY); c.fillStyle = '#3A3A34'; c.fillRect(0, SFY - 14, SX0, 14);
  // winda — tuż obok schodów
  elevDoor2(c, lt, 50, 640, 220, 760, { open: o.elevOpen || 0, floor: o.elevFloor ?? floor, dir: o.dir, called: o.called, inCab: o.inCab });
  timerSwitch(c, 6, 980, o.switchGlow ?? 1);
  if (o.lightOff) { c.fillStyle = 'rgba(2,3,8,.88)'; c.fillRect(0, 0, W, H);
    c.save(); c.shadowColor = '#FF9A2A'; c.shadowBlur = 30; circ(c, 35, 1032, 7, '#FF9A2A'); c.shadowColor = '#FF3B30'; c.shadowBlur = 24; txt(c, String(o.elevFloor ?? floor), 184, 534, 54, '#FF3B30', 900); c.restore();
    c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createRadialGradient(160, 520, 10, 160, 520, 320); g.addColorStop(0, 'rgba(255,60,40,.22)'); g.addColorStop(1, 'rgba(255,60,40,0)'); c.fillStyle = g; c.fillRect(0, 200, 600, 700); c.restore();
    const wg = c.createRadialGradient(895, 315, 20, 895, 315, 300); wg.addColorStop(0, 'rgba(120,150,210,.18)'); wg.addColorStop(1, 'rgba(120,150,210,0)'); c.fillStyle = wg; c.fillRect(600, 0, 480, 700);
  } else cageLamp(c, 540, 40, lt, 1, o.flick);
}
// PARTER: winda obok schodów + skrzynki pocztowe, tablica ogłoszeń, drzwi wejściowe z boku
function lobbyStairs(c, lt, o = {}) {
  stairElev(c, lt, 0, Object.assign({ lightOff: false }, o));
  // tablica ogłoszeń nad skrzynką elektryczną zamiast niej
  fillRR(c, 500, 420, 200, 250, 6, '#B8875A'); [['PRZEGLĄD WINDY', '12.11'], ['ZAGINĄŁ KOT', '„Pączek”'], ['ZEBRANIE', '20.11'], ['NIE WPUSZCZAĆ', 'OBCYCH!']].forEach(([a, b], i) => {
    c.save(); c.translate(512 + (i % 2) * 94, 434 + Math.floor(i / 2) * 116); c.rotate((hash(i + 5) - .5) * .14); fillRR(c, 0, 0, 86, 100, 3, ['#FFFFFF', '#F5E07A', '#CDE6F5', '#FFD0D0'][i]); txt(c, a, 43, 34, 9, i === 3 ? '#C23A3A' : '#14161B', 900); txt(c, b, 43, 60, 10, '#3A3F4C', 800); circ(c, 43, 7, 4, '#D7263D'); c.restore(); });
  if (o.lightOff) { c.fillStyle = 'rgba(2,3,8,.88)'; c.fillRect(0, 0, W, H); }
}
// WEJŚCIE DO BLOKU z bliska: cegła, daszek ze śniegiem, drzwi z siatką w szybie (otwierane do nas), domofon z klawiaturą, numer, stopnie, ślady
function entranceFull(c, lt, o = {}) {
  c.fillStyle = '#2E3550'; c.fillRect(0, 0, W, 560);
  for (const [wx, on] of [[40, 1], [820, 0]]) { fillRR(c, wx, 110, 220, 300, 4, '#D8D2BE'); fillRR(c, wx + 14, 124, 192, 272, 2, on ? '#E8B860' : '#121A2C'); if (on) { c.fillStyle = 'rgba(160,60,50,.55)'; c.fillRect(wx + 14, 124, 50, 272); c.fillRect(wx + 156, 124, 50, 272); } c.fillStyle = '#D8D2BE'; c.fillRect(wx + 106, 124, 8, 272); fillRR(c, wx - 10, 404, 240, 16, 3, '#CFC8B4'); ell(c, wx + 110, 400, 100, 9, 'rgba(255,255,255,.9)'); }
  bricks(c, 0, 560, W, 900);
  // daszek ze śniegiem i lampą
  fillRR(c, 200, 560, 680, 70, 4, '#9A9484'); c.fillStyle = 'rgba(0,0,0,.3)'; c.fillRect(200, 626, 680, 8); for (let i = 0; i < 14; i++) ell(c, 210 + i * 50, 556, 34, 16, '#EEF2F8');
  fillRR(c, 500, 640, 80, 26, 8, '#DDE3E8'); c.save(); c.globalCompositeOperation = 'lighter'; const lg = c.createRadialGradient(540, 660, 10, 540, 1000, 700); lg.addColorStop(0, 'rgba(255,236,190,.5)'); lg.addColorStop(1, 'rgba(255,236,190,0)'); c.fillStyle = lg; c.fillRect(0, 600, W, 1300); c.restore();
  // drzwi: rama aluminiowa, skrzydło z siatką w szybie, naświetle
  const dx = 300, dy = 690, dw = 300, dh = 770; fillRR(c, dx - 26, dy - 26, 460, dh + 26, 4, '#2E3440');
  const inside = (cc, x0, y0, w0, h0) => { cc.save(); cc.beginPath(); cc.rect(x0, y0, w0, h0); cc.clip(); cc.fillStyle = '#D8D2BE'; cc.fillRect(x0, y0, w0, h0); cc.fillStyle = '#3F6B55'; cc.fillRect(x0, y0 + h0 * .55, w0, h0); fillRR(cc, x0 + 30, y0 + h0 * .2, 160, 150, 4, '#6E7680'); for (let r = 0; r < 3; r++) for (let q = 0; q < 3; q++) fillRR(cc, x0 + 38 + q * 50, y0 + h0 * .2 + 8 + r * 46, 44, 40, 2, '#8C939C'); cc.fillStyle = '#8E8676'; cc.fillRect(x0, y0 + h0 * .9, w0, h0); cc.restore(); };
  inside(c, dx, dy, 410, dh);
  const p = o.doorOpen || 0, th = p * 1.25, L = dw * Math.cos(th), e = 70 * Math.sin(th);
  c.fillStyle = '#3A4150'; c.beginPath(); c.moveTo(dx, dy); c.lineTo(dx + L, dy - e); c.lineTo(dx + L, dy + dh + e); c.lineTo(dx, dy + dh); c.fill();
  if (L > 40) { const gx = dx + L * .1, gw = L * .8, gy = dy + 50, gh = dh * .55;
    c.save(); c.beginPath(); c.moveTo(gx, gy - e * .1); c.lineTo(gx + gw, gy - e * .9); c.lineTo(gx + gw, gy + gh + e * .9); c.lineTo(gx, gy + gh + e * .1); c.clip();
    if (p < .05) inside(c, gx, gy, gw, gh); else { c.fillStyle = 'rgba(40,46,66,.9)'; c.fillRect(gx, gy - e, gw, gh + 2 * e); }
    if (o.reflect) { c.globalAlpha = o.reflect; person(c, 'obcy', gx + gw * .7, gy + gh + 80, 1.1, { t: lt, still: true, mouth: 'grin' }); c.globalAlpha = 1; }
    c.strokeStyle = 'rgba(200,210,220,.4)'; c.lineWidth = 2; for (let i = -12; i < 14; i++) { c.beginPath(); c.moveTo(gx + i * 22, gy - e); c.lineTo(gx + i * 22 + gh, gy + gh + e); c.moveTo(gx + i * 22, gy - e); c.lineTo(gx + i * 22 - gh, gy + gh + e); c.stroke(); }
    c.restore(); fillRR(c, dx + L - 40, dy + dh * .58, 16, 120, 8, '#C9CDD2'); }
  // stałe skrzydło boczne
  fillRR(c, dx + 310, dy, 100, dh, 2, '#3A4150'); c.save(); c.beginPath(); c.rect(dx + 322, dy + 50, 76, dh * .55); c.clip(); inside(c, dx + 322, dy + 50, 76, dh * .55); c.strokeStyle = 'rgba(200,210,220,.4)'; c.lineWidth = 2; for (let i = -6; i < 8; i++) { c.beginPath(); c.moveTo(dx + 322 + i * 22, dy + 50); c.lineTo(dx + 322 + i * 22 + 400, dy + 450); c.stroke(); } c.restore();
  // numer i tabliczka klatki
  fillRR(c, 720, 720, 120, 60, 6, '#2F5DA8'); txt(c, '12', 780, 750, 34, '#FFFFFF', 900); fillRR(c, 720, 790, 120, 40, 4, '#E8E4DA'); txt(c, 'm. 81–120', 780, 810, 16, '#14161B', 900);
  // domofon z klawiaturą
  const ix = 790, iy = 900; fillRR(c, ix - 6, iy - 6, 132, 262, 10, '#5E6670'); fillRR(c, ix, iy, 120, 250, 8, '#B3BAC2'); fillRR(c, ix + 12, iy + 12, 96, 40, 4, '#0E2A1A'); txt(c, o.lcd || 'KOD', ix + 60, iy + 33, 18, '#6CFF9A', 900);
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '🔔']; keys.forEach((k, i) => { const kx = ix + 24 + (i % 3) * 36, ky = iy + 76 + Math.floor(i / 3) * 34; circ(c, kx, ky, 14, o.press === k ? '#6CFF9A' : '#D4D7DC'); txt(c, k, kx, ky + 1, 13, '#14161B', 900); });
  circ(c, ix + 60, iy + 222, 14, '#2A2D36'); c.strokeStyle = '#6CFF9A'; c.lineWidth = 2; c.beginPath(); c.arc(ix + 60, iy + 222, 9, 0, 7); c.stroke();
  // stopnie, śnieg, ślady butów, rower, kosze
  fillRR(c, 220, 1460, 640, 40, 3, '#8C8676'); fillRR(c, 180, 1500, 720, 44, 3, '#7A7466'); c.fillStyle = '#E4EAF2'; c.fillRect(0, 1544, W, H - 1544); for (let i = 0; i < 16; i++) ell(c, hash(i + 70) * W, 1550, 50 + hash(i) * 60, 12, '#F2F5FA');
  for (let i = 0; i < 8; i++) ell(c, 520 + (i % 2) * 50 + Math.sin(i) * 20, 1880 - i * 46, 18, 9, 'rgba(90,100,130,.35)');
  c.strokeStyle = '#1E222C'; c.lineWidth = 8; c.beginPath(); c.arc(80, 1600, 60, 0, 7); c.stroke(); c.beginPath(); c.arc(230, 1600, 60, 0, 7); c.stroke(); c.beginPath(); c.moveTo(80, 1600); c.lineTo(150, 1520); c.lineTo(230, 1600); c.moveTo(150, 1520); c.lineTo(200, 1510); c.stroke(); ell(c, 150, 1500, 30, 8, '#F2F5FA');
  fillRR(c, 930, 1330, 140, 220, 10, '#2E6B3F'); fillRR(c, 920, 1310, 160, 30, 8, '#245633'); ell(c, 1000, 1306, 76, 12, '#F2F5FA');
}
// zbliżenie: domofon z klawiaturą zajmuje kadr, z lewej szyba drzwi — odbija się w niej sylwetka za plecami
function keypadClose(c, lt, o = {}) {
  bricks(c, 0, 0, W, H);
  c.fillStyle = '#2E3440'; c.fillRect(0, 0, 300, H); c.fillStyle = '#1A2034'; c.fillRect(30, 0, 250, H);
  c.save(); c.beginPath(); c.rect(30, 0, 250, H); c.clip();
  if (o.fig) { c.globalAlpha = o.fig * .7; person(c, 'obcy', 150, 1900, 3.2 + o.fig * .6, { t: lt, still: true, mouth: o.grin ? 'grin' : null }); c.globalAlpha = 1; }
  c.fillStyle = 'rgba(140,160,200,.12)'; c.beginPath(); c.moveTo(60, 0); c.lineTo(160, 0); c.lineTo(40, H); c.lineTo(-60, H); c.fill();
  c.strokeStyle = 'rgba(200,210,220,.35)'; c.lineWidth = 3; for (let i = -40; i < 40; i++) { c.beginPath(); c.moveTo(30 + i * 40, 0); c.lineTo(30 + i * 40 + H, H); c.moveTo(30 + i * 40, 0); c.lineTo(30 + i * 40 - H, H); c.stroke(); }
  c.restore();
  const ix = 400, iy = 260, iw = 560, ih = 1340; fillRR(c, ix - 20, iy - 20, iw + 40, ih + 40, 30, '#5E6670'); fillRR(c, ix, iy, iw, ih, 24, '#B3BAC2');
  c.strokeStyle = 'rgba(255,255,255,.12)'; c.lineWidth = 1; for (let k = 0; k < iw; k += 5) { c.beginPath(); c.moveTo(ix + k, iy); c.lineTo(ix + k, iy + ih); c.stroke(); }
  for (let i = 0; i < 5; i++) for (let j = 0; j < 9; j++) circ(c, ix + 120 + j * 40, iy + 70 + i * 30, 6, '#5E6670');
  fillRR(c, ix + 60, iy + 240, iw - 120, 160, 12, '#0E2A1A'); c.save(); c.shadowColor = '#6CFF9A'; c.shadowBlur = 18; txt(c, o.lcd || 'WPISZ KOD', ix + iw / 2, iy + 320, 60, '#6CFF9A', 900); c.restore();
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '🔔']; keys.forEach((k, i) => { const kx = ix + 130 + (i % 3) * 150, ky = iy + 520 + Math.floor(i / 3) * 150, pr = o.press === k;
    circ(c, kx, ky + 6, 58, '#6E7680'); circ(c, kx, ky + (pr ? 6 : 0), 54, pr ? '#9CFFBE' : '#E2E5E9'); txt(c, k, kx, ky + (pr ? 7 : 1), 50, '#14161B', 900); });
  circ(c, ix + iw / 2, iy + 1200, 60, '#2A2D36'); c.strokeStyle = '#6CFF9A'; c.lineWidth = 6; c.beginPath(); c.arc(ix + iw / 2, iy + 1200, 38, 0, 7); c.stroke(); txt(c, 'BRELOK', ix + iw / 2, iy + 1290, 22, '#3A3F4C', 900);
  txt(c, 'DOMOFON · KLATKA 12', ix + iw / 2, iy + 200, 26, '#3A3F4C', 900);
}
// 9. PIĘTRO v2: winda (lewo), drzwi 94 z wycieraczką, 95, schody w dół przy prawej krawędzi, okienko, włącznik
function landing9b(c, lt, o = {}) {
  c.fillStyle = '#D8D2BE'; c.fillRect(0, 0, W, 1400); c.fillStyle = '#C6BFA8'; c.fillRect(0, 0, W, 54);
  c.fillStyle = '#3F6B55'; c.fillRect(0, 840, W, 560); c.fillStyle = '#2C4F3E'; c.fillRect(0, 840, W, 10);
  for (let i = 0; i < 18; i++) { c.fillStyle = 'rgba(230,225,210,.3)'; c.beginPath(); c.ellipse(hash(i + 3) * W, 880 + hash(i + 7) * 480, 4 + hash(i) * 9, 3 + hash(i + 1) * 5, hash(i + 2), 0, 7); c.fill(); }
  txt(c, '9', 540, 210, 120, 'rgba(40,60,50,.55)', 900); txt(c, 'PIĘTRO', 540, 300, 28, 'rgba(40,60,50,.55)', 900);
  terrazzo(c, 0, 1400, W, 520);
  elevDoor2(c, lt, 50, 640, 220, 760, { open: o.elevOpen || 0, floor: o.floor ?? 9, inCab: o.inCab, dark: o.cabDark });
  timerSwitch(c, 6, 980, o.switchGlow ?? 1);
  quilted(c, 500, 560, 290, 840, '#6B4A2F', '#583B24', '#C9A15A', 60); c.strokeStyle = '#3A2818'; c.lineWidth = 12; c.strokeRect(500, 560, 290, 840);
  fillRR(c, 605, 600, 80, 44, 22, '#C9A15A'); txt(c, '94', 645, 623, 26, '#3A2A1A', 900); circ(c, 645, 720, 12, '#1B1C22'); c.strokeStyle = '#C9A15A'; c.lineWidth = 4; c.beginPath(); c.arc(645, 720, 16, 0, 7); c.stroke();
  fillRR(c, 730, 980, 38, 70, 6, '#C9A15A'); circ(c, 749, 1030, 6, '#2A1A10'); fillRR(c, 720, 1090, 60, 18, 8, '#C9A15A');
  fillRR(c, 500, 1404, 290, 46, 8, '#7A5634'); txt(c, 'WITAMY', 645, 1428, 22, '#C9A15A', 900);
  if (o.open94) { c.fillStyle = '#040508'; c.fillRect(506, 566, 278, 834); const g = c.createLinearGradient(506, 0, 784, 0); g.addColorStop(0, 'rgba(30,36,60,.5)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(506, 566, 278, 834);
    c.fillStyle = '#583B24'; c.beginPath(); c.moveTo(500, 560); c.lineTo(440, 520); c.lineTo(440, 1450); c.lineTo(500, 1400); c.fill(); fillRR(c, 446, 1000, 10, 50, 4, '#C9A15A');
    for (let i = 0; i < 4; i++) ell(c, 560 + i * 50, 1420 + (i % 2) * 14, 14, 7, 'rgba(90,100,130,.4)'); }
  fillRR(c, 820, 700, 70, 90, 4, '#FFFFFF'); txt(c, 'DZWONEK', 855, 724, 10, '#14161B', 900); circ(c, 855, 760, 12, '#E8E4DA');
  // schody w dół przy prawej krawędzi
  c.fillStyle = '#8E8676'; c.fillRect(900, 1400, 180, 520); for (let i = 0; i < 8; i++) { const sy = 1400 + i * 64, sx = 900 + i * 40; fillRR(c, sx, sy, W - sx, 14, 3, '#A49C88'); c.fillStyle = '#6E6658'; c.fillRect(sx, sy + 14, W - sx, 50); }
  c.strokeStyle = '#23262E'; c.lineWidth = 6; for (let i = 0; i < 6; i++) { const bx = 920 + i * 40, by = 1400 + i * 64; c.beginPath(); c.moveTo(bx, by); c.lineTo(bx, by - 230); c.stroke(); }
  c.strokeStyle = '#6B4A2F'; c.lineWidth = 18; c.lineCap = 'round'; c.beginPath(); c.moveTo(880, 1150); c.lineTo(1120, 1150 + 240 * 1.6); c.stroke(); c.lineCap = 'butt';
  fillRR(c, 870, 1150, 20, 250, 4, '#23262E');
  if (o.lightOff) { c.fillStyle = 'rgba(2,3,8,.9)'; c.fillRect(0, 0, W, H); c.save(); c.shadowColor = '#FF9A2A'; c.shadowBlur = 30; circ(c, 35, 1032, 7, '#FF9A2A'); c.shadowColor = '#FF3B30'; c.shadowBlur = 24; txt(c, String(o.floor ?? 9), 184, 534, 54, '#FF3B30', 900); c.restore(); }
  else cageLamp(c, 540, 40, lt, 1, o.flick);
}


// ULICA PRZED BLOKIEM (bliżej): fasada z oknami (9. piętro u góry, okno 94 ciemne), parter z cegły, daszek klatki, latarnie, auta pod śniegiem, drzewo
function streetBlock(c, lt, o = {}) {
  const sky = c.createLinearGradient(0, 0, 0, 300); sky.addColorStop(0, '#05080F'); sky.addColorStop(1, '#141B2E'); c.fillStyle = sky; c.fillRect(0, 0, W, 300);
  c.fillStyle = '#394157'; c.fillRect(0, 110, W, 1150); c.fillStyle = '#2E354A'; c.fillRect(0, 110, W, 14);
  for (let i = 0; i < 9; i++) { c.fillStyle = 'rgba(0,0,0,.12)'; c.fillRect(0, 248 + i * 128, W, 3); } for (let q = 1; q < 6; q++) { c.fillStyle = 'rgba(0,0,0,.08)'; c.fillRect(q * 180 - 2, 110, 3, 1150); }
  for (let r = 0; r < 8; r++) for (let q = 0; q < 6; q++) { const x = 36 + q * 180, y = 140 + r * 128, hv = hash(r * 7 + q * 13 + 3), is94 = r === 0 && q === 3, lit = o.lit94 && is94 ? true : (!is94 && hv > .5);
    fillRR(c, x - 6, y - 6, 120, 92, 3, '#C9C2A8'); fillRR(c, x, y, 108, 80, 2, lit ? (hv > .9 ? '#7FA8E0' : '#E8B860') : '#111827');
    if (lit && hv <= .9) { c.fillStyle = 'rgba(150,60,50,.55)'; c.fillRect(x, y, 22, 80); c.fillRect(x + 86, y, 22, 80); if (hv > .75) { c.fillStyle = 'rgba(60,40,30,.6)'; fillRR(c, x + 40, y + 40, 26, 40, 8, 'rgba(50,35,30,.7)'); } }
    if (lit && hv > .9) { c.fillStyle = `rgba(160,200,255,${.15 + .15 * Math.sin(lt * 9 + q)})`; c.fillRect(x, y, 108, 80); }
    c.fillStyle = '#C9C2A8'; c.fillRect(x + 52, y, 4, 80); fillRR(c, x - 10, y + 80, 128, 9, 2, '#5A6278'); ell(c, x + 54, y + 79, 54, 6, 'rgba(240,245,255,.9)');
    if (is94 && o.mark) { c.save(); c.strokeStyle = '#FF3B30'; c.lineWidth = 6; c.setLineDash([14, 10]); c.beginPath(); c.arc(x + 54, y + 40, 80, 0, 7); c.stroke(); c.restore(); } }
  txt(c, '9 →', 0 + 18, 180, 22, 'rgba(255,255,255,.35)', 900, 'left');
  bricks(c, 0, 1160, W, 360);
  // daszek klatki 12 z lampą, drzwi z siatką
  fillRR(c, 700, 1300, 300, 220, 2, '#2E3440'); fillRR(c, 720, 1320, 120, 200, 2, '#3A4150'); c.fillStyle = 'rgba(232,226,200,.75)'; c.fillRect(732, 1334, 96, 110); fillRR(c, 860, 1320, 120, 200, 2, '#3A4150');
  fillRR(c, 660, 1270, 380, 40, 3, '#9A9484'); for (let i = 0; i < 8; i++) ell(c, 680 + i * 48, 1266, 30, 12, '#EEF2F8'); fillRR(c, 800, 1310, 60, 18, 6, '#DDE3E8'); fillRR(c, 1010, 1200, 60, 36, 4, '#2F5DA8'); txt(c, '12', 1040, 1218, 22, '#FFFFFF', 900);
  c.save(); c.globalCompositeOperation = 'lighter'; const eg = c.createRadialGradient(830, 1320, 10, 830, 1500, 420); eg.addColorStop(0, 'rgba(255,236,190,.5)'); eg.addColorStop(1, 'rgba(255,236,190,0)'); c.fillStyle = eg; c.fillRect(380, 1200, 700, 600); c.restore();
  // chodnik, krawężnik, śnieg, ślady
  c.fillStyle = '#DCE3EC'; c.fillRect(0, 1520, W, 400); c.fillStyle = '#B8C2CF'; c.fillRect(0, 1760, W, 14); c.fillStyle = '#1A1E28'; c.fillRect(0, 1774, W, 146); for (let i = 0; i < 12; i++) ell(c, hash(i + 30) * W, 1525, 60, 10, '#F2F5FA');
  for (let i = 0; i < 14; i++) ell(c, 40 + i * 52, 1690 + (i % 2) * 20, 15, 8, 'rgba(90,100,130,.3)');
  // drzewo + ktoś pod nim
  c.fillStyle = '#1A140F'; c.fillRect(560, 1180, 26, 360); for (const [tx, ty, r] of [[573, 1120, 120], [500, 1180, 80], [650, 1170, 90]]) { circ(c, tx, ty, r, '#0E1420'); ell(c, tx, ty - r * .6, r * .7, r * .25, 'rgba(235,240,250,.55)'); }
  if (o.fig) { c.save(); c.globalAlpha = o.fig; person(c, 'obcy', 620, 1560, 1.0, { t: lt, still: true, look: -1 }); c.restore(); }
  // latarnia
  c.fillStyle = '#1E2330'; c.fillRect(140, 980, 14, 560); fillRR(c, 100, 970, 90, 22, 10, '#2E3446'); c.save(); c.globalCompositeOperation = 'lighter'; const lg = c.createRadialGradient(146, 990, 6, 146, 1300, 520); lg.addColorStop(0, 'rgba(255,214,140,.55)'); lg.addColorStop(1, 'rgba(255,214,140,0)'); c.fillStyle = lg; c.beginPath(); c.moveTo(130, 990); c.lineTo(160, 990); c.lineTo(420, 1600); c.lineTo(-140, 1600); c.fill(); c.restore();
  // auto pod śniegiem na pierwszym planie
  fillRR(c, 600, 1720, 520, 170, 50, '#5E2A2A'); fillRR(c, 700, 1640, 320, 110, 40, '#4A2222'); fillRR(c, 720, 1655, 130, 80, 16, '#121826'); fillRR(c, 870, 1655, 130, 80, 16, '#121826'); ell(c, 860, 1640, 170, 26, '#F2F5FA'); ell(c, 860, 1720, 260, 18, '#F2F5FA'); circ(c, 700, 1890, 44, '#0A0C12'); circ(c, 1010, 1890, 44, '#0A0C12'); fillRR(c, 1080, 1760, 30, 30, 8, '#FFB070');
}
// ZBLIŻENIE: zamek drzwi 94, klucz w drżącej dłoni trafia w zamek
function lockClose(c, lt, l) {
  quilted(c, 0, 0, W, H, '#6B4A2F', '#583B24', '#C9A15A', 120);
  fillRR(c, 380, 520, 320, 760, 30, '#C9A15A'); fillRR(c, 400, 540, 280, 720, 24, '#B08A48'); c.strokeStyle = 'rgba(255,240,200,.35)'; c.lineWidth = 6; c.beginPath(); c.moveTo(420, 560); c.lineTo(420, 1240); c.stroke();
  circ(c, 540, 760, 70, '#A07A3A'); circ(c, 540, 760, 56, '#C9A15A'); fillRR(c, 532, 720, 16, 80, 6, '#1B120A'); circ(c, 540, 726, 12, '#1B120A');
  c.strokeStyle = 'rgba(60,40,20,.5)'; c.lineWidth = 3; for (let i = 0; i < 9; i++) { const a = hash(i) * 6.28; c.beginPath(); c.moveTo(540 + Math.cos(a) * 30, 760 + Math.sin(a) * 30); c.lineTo(540 + Math.cos(a) * (60 + hash(i + 4) * 40), 760 + Math.sin(a) * (60 + hash(i + 4) * 40)); c.stroke(); }
  fillRR(c, 480, 1040, 120, 50, 20, '#D4AE62'); fillRR(c, 330, 1040, 200, 50, 22, '#D4AE62');
  const ins = l > 2.0, miss = l < 2.0 ? [[-90, 60], [70, -40], [-30, 20]][Math.floor(l / .7) % 3] : [0, 0], sh = ins ? 0 : 1, jx = Math.sin(lt * 47) * 7 * sh, jy = Math.cos(lt * 39) * 6 * sh;
  const kx = 540 + miss[0] * (ins ? 0 : 1) + jx, ky = 790 + miss[1] * (ins ? 0 : 1) + jy, rot = ins ? clamp((l - 2.4) / .5) * 1.4 : 0;
  c.save(); c.translate(kx, ky); c.rotate(rot);
  if (!ins) { c.fillStyle = '#D6DADF'; c.beginPath(); c.moveTo(-8, 0); c.lineTo(8, 0); c.lineTo(8, -70); c.lineTo(-2, -82); c.lineTo(-8, -70); c.fill(); for (let i = 0; i < 4; i++) c.fillRect(8, -20 - i * 14, 6, 8); }
  fillRR(c, -36, 0, 72, 90, 30, '#C9CDD2'); circ(c, 0, 60, 12, '#6B4A2F'); c.restore();
  c.strokeStyle = '#C9CDD2'; c.lineWidth = 8; c.beginPath(); c.arc(kx + 10, ky + 150, 46, 0, 7); c.stroke(); fillRR(c, kx + 40, ky + 170, 30, 110, 10, '#2F5DA8'); fillRR(c, kx - 30, ky + 180, 24, 90, 8, '#C23A3A');
  hand(c, kx + 40, ky + 110, 1.15, KINDS.kuba);
}
function shot(c, cx, cy, k, fn) { c.save(); c.translate(540, 960); c.scale(k, k); c.translate(-cx, -cy); fn(c); c.restore(); }



// ===================== MIESZKANIE KUBY (dopracowane) =====================
// przedpokój Kuby: tapeta w pasy z ornamentem, boazeria, lampa z kloszem, wieszak z kurtkami (mamy i Kuby), szafka na buty, lustro w ramie,
// unifon na ścianie, kalendarz, zdjęcia rodzinne, kaloryfer, parkiet w jodełkę, chodnik we wzór, drzwi obite z dwoma zamkami, łańcuchem i wizjerem
function kubaHall(c, lt, o = {}) {
  c.fillStyle = '#B9A47E'; c.fillRect(0, 0, W, 1420);
  for (let x = 0; x < W; x += 60) { c.fillStyle = 'rgba(120,90,50,.16)'; c.fillRect(x, 0, 22, 1100); for (let y = 30; y < 1100; y += 90) { c.fillStyle = 'rgba(255,240,210,.18)'; c.beginPath(); c.ellipse(x + 41, y + (x / 60 % 2) * 45, 7, 12, 0, 0, 7); c.fill(); } }
  c.fillStyle = '#6B4A2F'; c.fillRect(0, 1100, W, 320); for (let x = 0; x < W; x += 90) { c.fillStyle = 'rgba(0,0,0,.15)'; c.fillRect(x, 1100, 4, 320); } c.fillStyle = '#4E3420'; c.fillRect(0, 1092, W, 16);
  c.fillStyle = '#E8E0CC'; c.fillRect(0, 0, W, 50); c.fillStyle = 'rgba(0,0,0,.15)'; c.fillRect(0, 50, W, 6);
  // lampa sufitowa z kloszem
  c.fillStyle = '#3A2A1A'; c.fillRect(538, 50, 4, 70); c.fillStyle = o.lampOn ? '#F6D9A0' : '#C9B590'; c.beginPath(); c.moveTo(470, 190); c.lineTo(610, 190); c.lineTo(580, 120); c.lineTo(500, 120); c.fill(); fillRR(c, 470, 186, 140, 10, 4, '#8A6A3A');
  if (o.lampOn) { c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createRadialGradient(540, 200, 10, 540, 500, 800); g.addColorStop(0, 'rgba(255,220,160,.35)'); g.addColorStop(1, 'rgba(255,220,160,0)'); c.fillStyle = g; c.fillRect(0, 0, W, 1420); c.restore(); }
  // wieszak z kurtkami i szalikiem, szafka na buty, buty, klucze w misce
  fillRR(c, 20, 470, 270, 26, 6, '#5A3D26'); for (let i = 0; i < 4; i++) fillRR(c, 45 + i * 66, 494, 12, 40, 4, '#C9A15A');
  fillRR(c, 30, 520, 100, 380, 36, '#B03A3A'); fillRR(c, 44, 540, 72, 30, 10, '#8A2A2A'); fillRR(c, 140, 520, 90, 330, 32, '#4A6A3A'); fillRR(c, 168, 540, 30, 220, 8, '#C9CDD2');
  for (let i = 0; i < 6; i++) fillRR(c, 235, 520 + i * 40, 40, 20, 4, i % 2 ? '#2CB5A8' : '#F2F2EE'); // szalik w paski
  fillRR(c, 20, 1180, 290, 230, 8, '#7A5634'); fillRR(c, 32, 1196, 128, 200, 6, '#8A6440'); fillRR(c, 170, 1196, 128, 200, 6, '#8A6440'); circ(c, 148, 1296, 6, '#C9A15A'); circ(c, 182, 1296, 6, '#C9A15A');
  ell(c, 230, 1170, 50, 14, '#D9D2C2'); fillRR(c, 210, 1150, 16, 20, 4, '#C9CDD2'); fillRR(c, 232, 1156, 20, 14, 4, '#2F5DA8');
  for (const [x, col] of [[50, '#F2F2EE'], [120, '#2A2D36'], [190, '#C23A3A']]) { fillRR(c, x, 1150, 56, 26, 10, col); }
  // zdjęcia rodzinne i kalendarz
  for (const [x, y, w, h] of [[60, 230, 110, 140], [190, 260, 90, 110]]) { fillRR(c, x, y, w, h, 4, '#5A3D26'); fillRR(c, x + 10, y + 10, w - 20, h - 20, 2, '#9FB3C2'); circ(c, x + w / 2, y + h / 2 - 6, 16, '#E3AC88'); fillRR(c, x + w / 2 - 22, y + h / 2 + 10, 44, 30, 10, '#2F5DA8'); }
  fillRR(c, 800, 170, 150, 200, 4, '#FFFFFF'); fillRR(c, 800, 170, 150, 46, 4, '#C23A3A'); txt(c, 'LISTOPAD', 875, 194, 18, '#FFFFFF', 900); for (let r = 0; r < 4; r++) for (let q = 0; q < 5; q++) txt(c, String(r * 5 + q + 3), 822 + q * 26, 240 + r * 32, 14, r === 2 && q === 2 ? '#C23A3A' : '#3A3F4C', 800);
  // lustro w ramie, konsola z telefonem, unifon
  fillRR(c, 790, 420, 230, 380, 16, '#6B4A2F'); fillRR(c, 806, 436, 198, 348, 10, '#B8C6D0'); c.fillStyle = 'rgba(255,255,255,.3)'; c.beginPath(); c.moveTo(830, 436); c.lineTo(880, 436); c.lineTo(830, 520); c.fill();
  if (o.mirror) { c.save(); c.beginPath(); c.rect(806, 436, 198, 348); c.clip(); c.globalAlpha = .5; o.mirror(c); c.restore(); }
  fillRR(c, 780, 860, 260, 26, 6, '#5A3D26'); fillRR(c, 800, 886, 14, 200, 4, '#4E3420'); fillRR(c, 1006, 886, 14, 200, 4, '#4E3420');
  fillRR(c, 840, 820, 80, 40, 10, '#E8E4DA'); fillRR(c, 850, 806, 60, 20, 8, '#D6D1C2'); // telefon stacjonarny
  fillRR(c, 960, 620, 70, 170, 12, '#E8E4DA'); fillRR(c, 970, 636, 50, 100, 8, '#D6D1C2'); circ(c, 995, 760, 10, '#3FA066'); c.strokeStyle = '#B8B2A2'; c.lineWidth = 4; c.beginPath(); c.moveTo(995, 736); c.quadraticCurveTo(1010, 790, 990, 820); c.stroke(); // unifon
  // kaloryfer
  fillRR(c, 800, 1130, 220, 170, 8, '#E8E4DA'); for (let i = 0; i < 8; i++) fillRR(c, 808 + i * 26, 1140, 18, 150, 6, '#D6D1C2');
  // włącznik przy drzwiach
  fillRR(c, 770, 960, 40, 60, 6, '#F2EEE4'); fillRR(c, 780, 972, 20, 36, 4, '#E0DACB');
  // podłoga: parkiet w jodełkę + chodnik we wzór
  c.fillStyle = '#7A5634'; c.fillRect(0, 1420, W, 500); for (let r = 0; r < 12; r++) for (let q = 0; q < 14; q++) { c.save(); c.translate(q * 80 + (r % 2) * 40, 1430 + r * 44); c.rotate(r % 2 ? .5 : -.5); fillRR(c, -36, -9, 72, 18, 2, (q + r) % 3 ? '#8A6440' : '#74522F'); c.restore(); }
  fillRR(c, 260, 1470, 560, 420, 10, '#7A2A2A'); c.strokeStyle = '#D9B26A'; c.lineWidth = 8; c.strokeRect(290, 1500, 500, 360); c.lineWidth = 4; c.strokeRect(320, 1530, 440, 300);
  for (let i = 0; i < 5; i++) { c.save(); c.translate(540, 1680); c.rotate(i * Math.PI / 5); c.strokeStyle = 'rgba(217,178,106,.7)'; c.beginPath(); c.ellipse(0, 0, 120, 40, 0, 0, 7); c.stroke(); c.restore(); }
  for (let i = 0; i < 14; i++) { fillRR(c, 266 + i * 40, 1884, 8, 26, 3, '#D9B26A'); }
  fillRR(c, 360, 1440, 70, 30, 12, '#2CB5A8'); fillRR(c, 440, 1446, 70, 30, 12, '#2CB5A8'); // kapcie Kuby
  // drzwi: ościeżnica, obicie, dwa zamki, wizjer, łańcuch, klamka
  fillRR(c, 300, 490, 480, 940, 6, '#3A2818'); fillRR(c, 312, 502, 456, 924, 4, '#5A3D26');
  quilted(c, 330, 520, 420, 900, '#6B4A2F', '#583B24', '#C9A15A', 64); c.strokeStyle = '#3A2818'; c.lineWidth = 14; c.strokeRect(330, 520, 420, 900);
  circ(c, 540, 760, 18, '#1B1C22'); c.strokeStyle = '#C9A15A'; c.lineWidth = 6; c.beginPath(); c.arc(540, 760, 22, 0, 7); c.stroke();
  fillRR(c, 680, 840, 46, 70, 8, '#C9A15A'); circ(c, 703, 880, 7, '#2A1A10'); // górny zamek
  fillRR(c, 680, 1000, 46, 90, 8, '#C9A15A'); circ(c, 703, 1060, 8, '#2A1A10'); const kr = o.lockTurn || 0; c.save(); c.translate(703, 1060); c.rotate(kr * Math.PI / 2); fillRR(c, -4, -14, 8, 28, 3, '#2A1A10'); c.restore();
  c.save(); c.translate(700, 1153); c.rotate(o.handle || 0); fillRR(c, -60, -13, 90, 26, 10, '#C9A15A'); c.restore(); circ(c, 700, 1153, 16, '#B08A48');
  if (!o.noChain) { c.strokeStyle = '#C9CDD2'; c.lineWidth = 6; for (let i = 0; i < 6; i++) { c.beginPath(); c.ellipse(640 + i * 16, 920 + Math.sin(i / 5 * Math.PI) * 28, 9, 6, .3, 0, 7); c.stroke(); } fillRR(c, 720, 900, 26, 40, 6, '#C9CDD2'); }
  if (o.underLight) { c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createLinearGradient(0, 1410, 0, 1560); g.addColorStop(0, `rgba(255,220,150,${.75 * o.underLight})`); g.addColorStop(1, 'rgba(255,220,150,0)'); c.fillStyle = g; c.fillRect(330, 1410, 420, 150); c.restore();
    if (o.feet) { fillRR(c, 460, 1414, 54, 14, 4, 'rgba(10,8,12,.92)'); fillRR(c, 560, 1414, 54, 14, 4, 'rgba(10,8,12,.92)'); } }
}
// pokój Kuby nocą (dopracowany): okno z widokiem, biurko z monitorem i klawiaturą RGB, fotel gamingowy, łóżko z kocem w kratę, plakaty, półka z figurkami, lampka nocna, dywan
function kubaRoom2(c, lt, o = {}) {
  c.fillStyle = '#2E3A52'; c.fillRect(0, 0, W, 1420); for (let x = 0; x < W; x += 80) { c.fillStyle = 'rgba(255,255,255,.03)'; c.fillRect(x, 0, 40, 1420); }
  c.fillStyle = '#3A2A20'; c.fillRect(0, 1420, W, 500); for (let i = 0; i < 12; i++) { c.fillStyle = 'rgba(0,0,0,.1)'; c.fillRect(0, 1440 + i * 40, W, 3); }
  // okno
  fillRR(c, 360, 260, 380, 520, 6, '#E8E4DA'); fillRR(c, 380, 280, 340, 480, 2, '#0B1020'); for (let r = 0; r < 5; r++) for (let q = 0; q < 4; q++) fillRR(c, 400 + q * 80, 300 + r * 80, 40, 40, 2, hash(r * 4 + q) > .65 ? '#E8B860' : '#121A2C'); snowfall(c, lt, 0); for (let k = 0; k < 14; k++) circ(c, 380 + hash(k) * 340, 280 + ((hash(k + 3) * 480 + lt * 50) % 480), 2.4, 'rgba(235,240,255,.8)');
  c.fillStyle = '#E8E4DA'; c.fillRect(544, 280, 12, 480); fillRR(c, 340, 780, 420, 26, 4, '#D6D1C2'); for (const x of [300, 740]) { c.fillStyle = 'rgba(70,90,140,.85)'; c.fillRect(x, 230, 60, 600); }
  // plakaty i półka
  fillRR(c, 60, 260, 220, 300, 6, '#1E1A2E'); c.fillStyle = '#8A5CF5'; c.beginPath(); c.moveTo(170, 300); c.lineTo(250, 500); c.lineTo(90, 500); c.fill(); txt(c, 'LEVEL 94', 170, 530, 26, '#F5C542', 900);
  fillRR(c, 820, 260, 200, 260, 6, '#C23A3A'); txt(c, 'KS', 920, 340, 70, '#FFFFFF', 900); txt(c, 'SOKÓŁ', 920, 420, 46, '#FFFFFF', 900); txt(c, '#7', 920, 480, 36, '#F5C542', 900);
  fillRR(c, 800, 600, 230, 16, 4, '#5A3D26'); for (let i = 0; i < 4; i++) { fillRR(c, 820 + i * 52, 560, 30, 40, 8, ['#D7263D', '#2F6FEB', '#F5C542', '#30A46C'][i]); circ(c, 835 + i * 52, 552, 12, ['#D7263D', '#2F6FEB', '#F5C542', '#30A46C'][i]); }
  // biurko z monitorem, klawiatura RGB
  fillRR(c, 40, 1000, 480, 26, 6, '#2A2D36'); fillRR(c, 60, 1026, 16, 300, 4, '#1E1E24'); fillRR(c, 480, 1026, 16, 300, 4, '#1E1E24');
  fillRR(c, 110, 720, 340, 230, 12, '#14161B'); fillRR(c, 124, 734, 312, 200, 8, o.screen ? '#1A2C50' : '#0A0C12'); fillRR(c, 266, 950, 30, 50, 4, '#14161B');
  for (let i = 0; i < 12; i++) fillRR(c, 130 + i * 24, 970, 18, 14, 3, `hsl(${(i * 30 + lt * 120) % 360},90%,60%)`);
  // fotel gamingowy
  fillRR(c, 200, 1040, 170, 300, 40, '#1E1E24'); fillRR(c, 230, 1060, 110, 40, 16, '#D7263D'); fillRR(c, 180, 1300, 210, 40, 16, '#1E1E24');
  // łóżko z kocem w kratę, poduszka
  fillRR(c, 600, 1180, 460, 220, 20, '#5A3D26'); fillRR(c, 610, 1140, 440, 140, 30, '#3A5A9A'); for (let i = 0; i < 6; i++) { c.fillStyle = 'rgba(255,255,255,.12)'; c.fillRect(620 + i * 72, 1140, 14, 140); c.fillRect(610, 1150 + i * 22, 440, 6); }
  fillRR(c, 900, 1100, 140, 70, 30, '#E8E4DA');
  // lampka nocna
  fillRR(c, 560, 1060, 30, 120, 6, '#2A2D36'); c.fillStyle = '#F6D9A0'; c.beginPath(); c.moveTo(530, 1060); c.lineTo(620, 1060); c.lineTo(600, 1010); c.lineTo(550, 1010); c.fill();
  if (o.lamp) { c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createRadialGradient(575, 1060, 10, 575, 1060, 420); g.addColorStop(0, 'rgba(255,210,140,.4)'); g.addColorStop(1, 'rgba(255,210,140,0)'); c.fillStyle = g; c.fillRect(150, 640, 860, 860); c.restore(); }
  // dywan
  ell(c, 540, 1660, 420, 150, '#3A4A7A'); c.strokeStyle = 'rgba(255,255,255,.18)'; c.lineWidth = 8; c.beginPath(); c.ellipse(540, 1660, 360, 120, 0, 0, 7); c.stroke();
  // światło z okna (księżyc + latarnia)
  c.save(); c.globalCompositeOperation = 'lighter'; const wg = c.createLinearGradient(550, 780, 550, 1700); wg.addColorStop(0, 'rgba(150,180,255,.22)'); wg.addColorStop(1, 'rgba(150,180,255,0)'); c.fillStyle = wg; c.beginPath(); c.moveTo(380, 800); c.lineTo(720, 800); c.lineTo(900, 1700); c.lineTo(200, 1700); c.fill(); c.restore();
}

// ===================== ODC. 2 (kontynuacja): tła =====================
// przedpokój: drzwi uchylone na łańcuch — szpara z ciemnym korytarzem, łańcuch napięty
function doorOnChain(c, lt, o = {}) {
  kubaHall(c, lt, { underLight: 0, noChain: true });
  const gap = o.gap ?? 60, gx = 750 - gap;
  c.fillStyle = '#05060A'; c.fillRect(gx, 520, gap + 4, 900); // ciemna szpara
  if (o.lit) { const g = c.createLinearGradient(gx, 0, gx + gap, 0); g.addColorStop(0, 'rgba(255,230,180,.25)'); g.addColorStop(1, 'rgba(255,230,180,.05)'); c.fillStyle = g; c.fillRect(gx, 520, gap, 900); }
  if (o.inGap) { c.save(); c.beginPath(); c.rect(gx, 520, gap, 900); c.clip(); o.inGap(c, gx, gap); c.restore(); }
  c.fillStyle = '#4A3220'; c.fillRect(gx - 14, 520, 14, 900); // krawędź skrzydła
  // łańcuch napięty przez szparę
  c.strokeStyle = '#D6DADF'; c.lineWidth = 7; for (let i = 0; i < 7; i++) { const x = gx - 60 + i * ((gap + 80) / 7); c.beginPath(); c.ellipse(x, 900, 10, 6, 0, 0, 7); c.stroke(); }
  fillRR(c, gx - 80, 884, 30, 34, 6, '#C9CDD2'); fillRR(c, 752, 884, 30, 34, 6, '#C9CDD2');
  if (o.grab) { const k = o.grab; for (let f = 0; f < 4; f++) { const fy = 860 + f * 30; fillRR(c, gx - 50 * k, fy, 60 + 40 * k, 26, 12, '#16171C'); ell(c, gx + 6, fy + 8, 9, 5, 'rgba(255,255,255,.18)'); } }
}
// widok z okna 9. piętra w dół: podwórko w śniegu, drzewo, latarnia, auta pod śniegiem, ślady prowadzące pod drzewo, postać patrzy w górę
function yardFromWindow(c, lt, o = {}) {
  c.fillStyle = '#0A0D16'; c.fillRect(0, 0, W, H);
  c.save(); c.beginPath(); c.rect(120, 260, 840, 1260); c.clip();
  // dalej: blok naprzeciwko z oknami, ulica z autami pod śniegiem
  c.fillStyle = '#1A2032'; c.fillRect(120, 260, 840, 260); for (let r = 0; r < 3; r++) for (let q = 0; q < 8; q++) fillRR(c, 140 + q * 104, 280 + r * 80, 60, 46, 2, hash(r * 8 + q) > .7 ? '#E8B860' : '#0E1322');
  c.fillStyle = '#2A2F3C'; c.fillRect(120, 520, 840, 120); for (const [x, col] of [[230, '#3A4A6A'], [470, '#6A2A2A'], [760, '#2A2E36']]) { fillRR(c, x - 80, 560, 160, 50, 16, col); fillRR(c, x - 50, 535, 100, 36, 12, col); ell(c, x, 534, 52, 9, '#EEF2F8'); ell(c, x, 560, 76, 7, '#EEF2F8'); circ(c, x - 50, 612, 13, '#0A0C12'); circ(c, x + 50, 612, 13, '#0A0C12'); }
  // podwórko w śniegu (z góry, pod kątem)
  const gg = c.createLinearGradient(0, 640, 0, 1520); gg.addColorStop(0, '#9AA6B8'); gg.addColorStop(1, '#D5DCE6'); c.fillStyle = gg; c.fillRect(120, 640, 840, 880);
  c.fillStyle = '#6A7284'; c.beginPath(); c.moveTo(380, 1520); c.lineTo(520, 640); c.lineTo(580, 640); c.lineTo(560, 1520); c.fill(); // chodnik
  for (let i = 0; i < 10; i++) ell(c, 560 + i * 12 - (i % 2) * 14, 1500 - i * 26, 7, 4, 'rgba(60,70,90,.55)'); // ślady w stronę drzewa
  // latarnia z plamą światła
  const lp = c.createRadialGradient(780, 1180, 10, 780, 1180, 300); lp.addColorStop(0, 'rgba(255,214,140,.5)'); lp.addColorStop(1, 'rgba(255,214,140,0)'); c.fillStyle = lp; c.fillRect(480, 880, 600, 600);
  c.fillStyle = '#1E2330'; c.fillRect(774, 860, 12, 320); fillRR(c, 740, 850, 80, 18, 8, '#2E3446'); circ(c, 780, 872, 10, '#FFE0A0');
  // ławka
  fillRR(c, 200, 1280, 170, 22, 4, '#4A3426'); fillRR(c, 210, 1302, 10, 40, 2, '#2A2D36'); fillRR(c, 350, 1302, 10, 40, 2, '#2A2D36'); ell(c, 285, 1278, 80, 6, '#EEF2F8');
  // drzewo: pień, korona w śniegu, cień
  ell(c, 430, 1200, 140, 30, 'rgba(40,50,70,.35)'); c.fillStyle = '#1A140F'; c.fillRect(420, 900, 22, 300); for (const [x, y, r] of [[430, 850, 120], [360, 900, 80], [505, 895, 85]]) { circ(c, x, y, r, '#141A24'); ell(c, x - 10, y - r * .5, r * .8, r * .32, 'rgba(235,240,250,.6)'); }
  if (o.fig) { c.save(); c.globalAlpha = o.fig; ell(c, 530, 1300, 50, 12, 'rgba(20,24,36,.5)'); person(c, 'obcy', 530, 1300, 1.0, { t: lt, look: 0, still: true, mouth: o.grin ? 'grin' : null, aR: o.wave ? 2.6 + Math.sin(lt * 4) * .35 : null }); c.restore(); }
  snow(c, lt, 70, .7); c.restore();
  c.strokeStyle = '#E8E4DA'; c.lineWidth = 34; c.strokeRect(120, 260, 840, 1260); c.lineWidth = 22; c.beginPath(); c.moveTo(540, 260); c.lineTo(540, 640); c.stroke(); c.beginPath(); c.moveTo(120, 640); c.lineTo(960, 640); c.stroke();
  fillRR(c, 60, 1520, 960, 60, 8, '#D6D1C2'); fillRR(c, 820, 1420, 90, 110, 14, '#B0603A'); for (let i = 0; i < 6; i++) { c.save(); c.translate(865, 1420); c.rotate(-1.2 + i * .48); ell(c, 0, -60, 16, 54, i % 2 ? '#3F8A4E' : '#357A43'); c.restore(); }
  for (const x of [0, 960]) { c.fillStyle = 'rgba(230,226,214,.55)'; c.fillRect(x, 200, 120, 1400); for (let k = 0; k < 6; k++) { c.fillStyle = 'rgba(0,0,0,.06)'; c.fillRect(x + k * 20, 200, 6, 1400); } }
  const fog = c.createRadialGradient(540, 890, 300, 540, 890, 760); fog.addColorStop(0, 'rgba(255,255,255,0)'); fog.addColorStop(1, 'rgba(220,228,238,.3)'); c.fillStyle = fog; c.fillRect(120, 260, 840, 1260);
}
function callOverlay(c, lt, who, sub, y = 1500) { fillRR(c, 140, y, 800, 150, 30, 'rgba(14,16,24,.94)'); circ(c, 230, y + 75, 46, who === '112' ? '#C23A3A' : '#2F6FEB'); txt(c, who === '112' ? '112' : '📞', 230, y + 77, who === '112' ? 30 : 34, '#FFFFFF', 900);
  txt(c, who === '112' ? 'Numer alarmowy 112' : who, 300, y + 55, 32, '#FFFFFF', 900, 'left'); txt(c, sub, 300, y + 100, 26, '#6CFF9A', 800, 'left'); }


// ===================== ODC. 2 „klucze”: tła i rekwizyty =====================
// pęk kluczy z czerwonym breloczkiem „94” (rysowany w punkcie zawieszenia, kołysze się)
function keyRing(c, x, y, s, lt, sw = 1) { c.save(); c.translate(x, y); c.scale(s, s); c.rotate(Math.sin(lt * 2.4) * .18 * sw);
  c.strokeStyle = '#C9CDD2'; c.lineWidth = 8; c.beginPath(); c.arc(0, 60, 40, 0, 7); c.stroke();
  c.save(); c.translate(-20, 96); c.rotate(.5); fillRR(c, -10, 0, 20, 90, 6, '#D6DADF'); for (let i = 0; i < 4; i++) fillRR(c, 10, 30 + i * 14, 8, 8, 2, '#D6DADF'); circ(c, 0, 0, 18, '#B8BEC5'); c.restore();
  c.save(); c.translate(22, 98); c.rotate(-.35); fillRR(c, -8, 0, 16, 80, 5, '#C9A15A'); circ(c, 0, 0, 16, '#B08A48'); c.restore();
  c.save(); c.translate(0, 100); c.rotate(.1); fillRR(c, -44, 0, 88, 120, 22, '#C23A3A'); fillRR(c, -34, 10, 68, 100, 16, '#D94A4A'); txt(c, '94', 0, 62, 50, '#FFFFFF', 900); circ(c, 0, 0, 10, '#7A1A1A'); c.restore();
  c.restore(); }
// zbliżenie: drzwi 94 od zewnątrz, klucz wetknięty w zamek, pęk z breloczkiem kołysze się, drzwi uchylone, w środku pali się światło
function keysDoor(c, lt, o = {}) {
  c.fillStyle = '#3F6B55'; c.fillRect(0, 0, W, H);
  const aj = o.ajar ?? 1; // szpara uchylenia
  c.fillStyle = '#05060A'; c.fillRect(760, 0, 40 + 120 * aj, H);
  if (o.light !== 0) { c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createLinearGradient(760, 0, 900, 0); g.addColorStop(0, `rgba(255,220,150,${.55 * (o.light ?? 1)})`); g.addColorStop(1, 'rgba(255,220,150,0)'); c.fillStyle = g; c.fillRect(760, 0, 40 + 120 * aj, H); c.restore(); }
  if (o.eyes) creepyFace(c, 828, 800, .9 + .5 * (o.push || 0), o.eyes, lt);
  quilted(c, 0, 0, 760, H, '#6B4A2F', '#583B24', '#C9A15A', 120); c.fillStyle = '#4A3220'; c.fillRect(740, 0, 20, H);
  fillRR(c, 520, 700, 150, 330, 30, '#C9A15A'); fillRR(c, 534, 714, 122, 302, 24, '#B08A48'); circ(c, 595, 820, 52, '#A07A3A'); circ(c, 595, 820, 40, '#C9A15A');
  fillRR(c, 586, 790, 18, 60, 4, '#D6DADF'); fillRR(c, 572, 836, 46, 40, 14, '#C9CDD2'); // klucz w zamku
  keyRing(c, 595, 868, 1.4, lt, o.swing ?? 1);
  fillRR(c, 480, 1180, 260, 60, 26, '#D4AE62'); // klamka
  fillRR(c, 260, 260, 180, 90, 40, '#C9A15A'); txt(c, '94', 350, 306, 60, '#3A2A1A', 900);
}

// przerażająca twarz w szparze: blada, zapadnięte oczodoły, wytrzeszczone białka z maleńkimi źrenicami, nienaturalnie szeroki uśmiech
function creepyFace(c, x, y, s, a, lt) { c.save(); c.globalAlpha = a; c.translate(x, y); c.scale(s, s); c.rotate(-.12 + Math.sin(lt * .7) * .02);
  const fg = c.createRadialGradient(-10, -20, 10, 0, 0, 170); fg.addColorStop(0, '#C9C6B4'); fg.addColorStop(.7, '#7E7C70'); fg.addColorStop(1, 'rgba(30,30,28,0)'); c.fillStyle = fg; c.beginPath(); c.ellipse(0, 0, 130, 170, 0, 0, 7); c.fill();
  for (const ex of [-52, 52]) { const og = c.createRadialGradient(ex, -40, 4, ex, -40, 48); og.addColorStop(0, '#1A1814'); og.addColorStop(1, 'rgba(26,24,20,0)'); c.fillStyle = og; c.beginPath(); c.ellipse(ex, -40, 50, 40, 0, 0, 7); c.fill();
    c.save(); c.shadowColor = '#FFFFFF'; c.shadowBlur = 14; ell(c, ex, -40, 26, 20, '#F2EFE2'); c.restore(); c.strokeStyle = 'rgba(160,40,40,.6)'; c.lineWidth = 1.5; for (let k = 0; k < 4; k++) { c.beginPath(); c.moveTo(ex + (k < 2 ? -24 : 24), -40 + (k % 2 ? 8 : -8)); c.lineTo(ex + (k < 2 ? -10 : 10), -40 + (k % 2 ? 3 : -3)); c.stroke(); }
    const blink = (lt % 4.3) < .12; if (!blink) { circ(c, ex + 2, -38, 5, '#000'); } else { c.fillStyle = '#7E7C70'; c.fillRect(ex - 28, -62, 56, 40); } }
  c.fillStyle = '#100C0A'; c.beginPath(); c.moveTo(-118, 34); c.quadraticCurveTo(0, 150, 118, 34); c.quadraticCurveTo(0, 74, -118, 34); c.fill();
  c.fillStyle = '#EDE8D6'; for (let k = -9; k <= 9; k++) { const tx = k * 12, top = 44 + Math.abs(k) * -1.2 + (k * k) * .25; c.beginPath(); c.moveTo(tx - 5, top + 6); c.lineTo(tx + 5, top + 6); c.lineTo(tx, top + 28 - Math.abs(k) * .8); c.fill(); }
  for (let k = -8; k <= 8; k++) { const tx = k * 13, bot = 112 - Math.abs(k) * 4.2; c.beginPath(); c.moveTo(tx - 5, bot); c.lineTo(tx + 5, bot); c.lineTo(tx, bot - 22 + Math.abs(k)); c.fill(); }
  c.strokeStyle = 'rgba(30,26,22,.6)'; c.lineWidth = 3; for (const sx of [-1, 1]) { c.beginPath(); c.moveTo(sx * 118, 34); c.quadraticCurveTo(sx * 140, 10, sx * 132, -6); c.stroke(); }
  c.restore(); }
// czat SMS (pełny ekran telefonu)
function smsScreen(c, lt, msgs, o = {}) {
  c.fillStyle = '#05060A'; c.fillRect(0, 0, W, H); fillRR(c, 90, 140, 900, 1660, 70, '#16171C'); fillRR(c, 110, 160, 860, 1620, 56, '#0E1018');
  txt(c, o.time || '16:32', 160, 210, 28, '#FFFFFF', 800, 'left'); fillRR(c, 860, 196, 60, 26, 7, '#FFFFFF');
  circ(c, 540, 300, 50, '#3A3F4C'); txt(c, '?', 540, 304, 54, '#FFFFFF', 900); txt(c, 'Nieznany numer', 540, 390, 34, '#FFFFFF', 900); txt(c, '+48 7** *** 112', 540, 432, 24, '#9AA2AB', 700);
  let y = 500; for (const [me, t, ok] of msgs) { const lines = t.split('\n'); font(c, 34, 700); const tw = Math.min(700, Math.max(...lines.map(l => c.measureText(l).width)) + 56), th = 30 + lines.length * 46;
    fillRR(c, me ? 930 - tw : 150, y, tw, th, 28, me ? '#2F6FEB' : '#2A2D36'); lines.forEach((l, i) => txt(c, l, me ? 930 - tw + 28 : 178, y + 38 + i * 46, 34, '#FFFFFF', 700, 'left')); y += th + 26; }
  if (o.typing) { fillRR(c, 150, y, 130, 70, 30, '#2A2D36'); for (let i = 0; i < 3; i++) circ(c, 185 + i * 30, y + 35, 9, `rgba(255,255,255,${.4 + .5 * ((Math.floor(lt * 4) + i) % 3 === 0)})`); }
  fillRR(c, 150, 1640, 780, 90, 45, '#1E2230'); txt(c, o.draft || 'Wiadomość', 200, 1686, 30, o.draft ? '#FFFFFF' : '#5E6670', 700, 'left'); circ(c, 880, 1686, 34, '#2F6FEB'); txt(c, '↑', 880, 1688, 34, '#FFFFFF', 900);
}
// ławka przy drzewie (do streetBlock)
function bench(c, x, y) { fillRR(c, x - 120, y - 70, 240, 22, 6, '#5A3D26'); fillRR(c, x - 120, y - 120, 240, 18, 6, '#5A3D26'); fillRR(c, x - 110, y - 50, 14, 50, 3, '#2A2D36'); fillRR(c, x + 96, y - 50, 14, 50, 3, '#2A2D36'); ell(c, x, y - 72, 110, 8, '#EEF2F8'); }
function chatCard(c, lt, x, y, w, rows, bat) { fillRR(c, x, y, w, 70 + rows.length * 96, 26, 'rgba(14,16,24,.94)'); txt(c, 'Mama ❤', x + 30, y + 36, 28, '#FFFFFF', 900, 'left'); txt(c, `🔋 ${bat}%`, x + w - 30, y + 36, 24, bat < 10 ? '#FF3B30' : '#9AA2AB', 800, 'right');
  rows.forEach(([me, t], i) => { const ry = y + 70 + i * 96; font(c, 26, 800); const tw = Math.min(w - 80, c.measureText(t).width + 40); fillRR(c, me ? x + w - 20 - tw : x + 20, ry, tw, 76, 22, me ? '#2F6FEB' : '#2A2D36'); txt(c, t, me ? x + w - 20 - tw / 2 : x + 20 + tw / 2, ry + 38, 26, '#FFFFFF', 800); }); }



// ===================== GRUPA KLASOWA: postacie, czat, pokoje =====================
KINDS.bartek = Object.assign({}, KINDS.zuzia, { jacket: '#2A2D36', dark: '#1E2028', pants: '#2F3A52', skin: '#EDB58C', shoes: '#F2F2EE' });
// Bartek: klasowy błazen — czarna bluza z nadrukiem, czapka z daszkiem tył-na-przód, rozczochrane włosy
function personB(c, x, y, s, o = {}) { person(c, 'bartek', x, y, s, o); if (o.alpha === 0) return; const hy = y - 238 * s + (o.sit ? 40 * s : 0);
  c.save(); if (o.alpha != null) c.globalAlpha = o.alpha;
  c.fillStyle = '#3A2414'; c.beginPath(); c.ellipse(x, hy - 22 * s, 54 * s, 38 * s, 0, Math.PI, 0); c.fill(); for (let i = -3; i <= 3; i++) { c.beginPath(); c.moveTo(x + i * 14 * s - 8 * s, hy - 30 * s); c.lineTo(x + i * 14 * s, hy - 6 * s); c.lineTo(x + i * 14 * s + 8 * s, hy - 30 * s); c.fill(); }
  c.fillStyle = '#C23A3A'; c.beginPath(); c.ellipse(x, hy - 40 * s, 50 * s, 26 * s, 0, Math.PI, 0); c.fill(); fillRR(c, x + 20 * s, hy - 46 * s, 50 * s, 12 * s, 6 * s, '#9A2A2A'); circ(c, x, hy - 66 * s, 5 * s, '#9A2A2A');
  if (!o.back) { const py = y - 130 * s + (o.sit ? 40 * s : 0); fillRR(c, x - 30 * s, py, 60 * s, 30 * s, 8 * s, '#F5C542'); txt(c, 'LOL', x, py + 16 * s, 18 * s, '#14161B', 900); }
  c.restore(); }
// czat grupowy (pełny ekran): nagłówek grupy, wiadomości z imionami w kolorach, zdjęcia, wiadomości systemowe
const NC = { Bartek: '#E0533A', Zuzia: '#1E9E8E', Lena: '#6A7FD6', Kuba: '#F2A51E', 'Nowy Uczeń': '#FF3B30', 'p. Wiśniewska': '#8A5CF5', Ty: '#2F6FEB' };
function groupChat(c, lt, title, msgs, o = {}) {
  c.fillStyle = '#05060A'; c.fillRect(0, 0, W, H); fillRR(c, 70, 110, 940, 1700, 70, '#16171C'); fillRR(c, 90, 130, 900, 1660, 56, '#0E1018');
  txt(c, o.time || '20:14', 140, 178, 26, '#FFFFFF', 800, 'left'); fillRR(c, 880, 166, 56, 24, 7, '#FFFFFF');
  circ(c, 170, 250, 40, o.avatar || '#3A5AA8'); txt(c, o.ava || '8B', 170, 252, 30, '#FFFFFF', 900); txt(c, title, 230, 238, 34, '#FFFFFF', 900, 'left'); txt(c, o.sub || '27 członków', 230, 276, 22, '#9AA2AB', 700, 'left');
  c.fillStyle = '#23262E'; c.fillRect(90, 310, 900, 2);
  let y = 340; const vis = msgs.slice(-(o.max || 9)); const pop = o.pop ?? 1;
  vis.forEach((m, mi) => { const [who, text, kind] = m; const last = mi === vis.length - 1 && pop < 1; if (last) { c.save(); c.globalAlpha = pop; c.translate(0, (1 - pop) * 40); }
    if (who === 'sys') { const red = kind === 'red'; font(c, 22, 800); const tw = c.measureText(text).width + 50; fillRR(c, 540 - tw / 2, y, tw, 46, 23, red ? 'rgba(255,59,48,.25)' : '#23262E'); txt(c, text, 540, y + 24, 22, red ? '#FF6B6B' : '#9AA2AB', 800); y += 66; if (last) c.restore(); return; }
    const me = who === 'Ty'; const lines = text.split('\n'); font(c, 30, 700); const tw = Math.min(680, Math.max(...lines.map(l => c.measureText(l).width), kind === 'photo' ? 520 : 0) + 50);
    const ph = kind === 'photo' ? 320 : 0, th = (me ? 24 : 58) + lines.length * 40 + ph + 16;
    if (!me) { circ(c, 140, y + 30, 26, NC[who] || '#666'); txt(c, who === 'Nowy Uczeń' ? '?' : who[0], 140, y + 32, 24, '#FFFFFF', 900); }
    const bx = me ? 950 - tw : 180; fillRR(c, bx, y, tw, th, 24, me ? '#2F6FEB' : (who === 'Nowy Uczeń' ? '#2A1416' : '#23262E'));
    if (!me) txt(c, who, bx + 22, y + 28, 22, NC[who] || '#AAA', 900, 'left');
    if (kind === 'photo' && m[3]) { c.save(); rr(c, bx + 14, y + (me ? 14 : 48), tw - 28, ph - 20, 16); c.clip(); m[3](c, bx + 14, y + (me ? 14 : 48), tw - 28, ph - 20); c.restore(); }
    lines.forEach((l, i) => txt(c, l, bx + 22, y + (me ? 38 : 72) + ph + i * 40, 30, '#FFFFFF', 700, 'left'));
    txt(c, (o.time || '20:14') + (me ? ' ✓✓' : ''), bx + tw - 16, y + th - 14, 16, me ? 'rgba(255,255,255,.7)' : '#6E7680', 700, 'right');
    if (!me) circ(c, 160, y + 50, 7, who === 'Nowy Uczeń' ? '#FF3B30' : '#30A46C');
    y += th + 20; if (last) c.restore(); });
  if (o.typing) { circ(c, 140, y + 30, 26, NC[o.typing] || '#666'); txt(c, o.typing === 'Nowy Uczeń' ? '?' : o.typing[0], 140, y + 32, 24, '#FFFFFF', 900); fillRR(c, 180, y + 4, 140, 56, 26, '#23262E'); for (let i = 0; i < 3; i++) circ(c, 220 + i * 30, y + 32, 8, `rgba(255,255,255,${.4 + .5 * ((Math.floor(lt * 4) + i) % 3 === 0)})`); }
  fillRR(c, 130, 1690, 820, 76, 38, '#1E2230'); txt(c, o.draft || 'Wiadomość', 180, 1728, 28, o.draft ? '#FFFFFF' : '#5E6670', 700, 'left');
}
// zdjęcia w czacie
function photoWindow(c, x, y, w, h) { c.fillStyle = '#0A1022'; c.fillRect(x, y, w, h); c.fillStyle = '#2A3350'; c.fillRect(x + w * .1, y + h * .1, w * .8, h); for (let r = 0; r < 4; r++) for (let q = 0; q < 5; q++) fillRR(c, x + w * .14 + q * w * .15, y + h * .16 + r * h * .2, w * .09, h * .12, 2, r === 0 && q === 3 ? '#FFD36A' : '#141A2C'); c.strokeStyle = 'rgba(255,59,48,.9)'; c.lineWidth = 4; c.beginPath(); c.arc(x + w * .14 + 3 * w * .15 + w * .045, y + h * .16 + h * .06, w * .07, 0, 7); c.stroke(); for (let k = 0; k < 20; k++) circ(c, x + hash(k) * w, y + hash(k + 3) * h, 2, 'rgba(255,255,255,.6)'); }
function photoStop(c, x, y, w, h) { c.fillStyle = '#5A6878'; c.fillRect(x, y, w, h); c.fillStyle = '#C9D2DE'; c.fillRect(x, y + h * .7, w, h * .3); fillRR(c, x + w * .1, y + h * .15, w * .5, h * .55, 4, 'rgba(180,210,230,.4)'); fillRR(c, x + w * .65, y + h * .1, 30, h * .6, 3, '#2A2D36'); fillRR(c, x + w * .6, y + h * .1, 80, 50, 6, '#F5C542'); txt(c, '17', x + w * .6 + 40, y + h * .1 + 26, 30, '#14161B', 900);
  c.save(); c.beginPath(); c.rect(x, y, w, h); c.clip(); person(c, 'zuzia', x + w * .35, y + h * .95, .6, { t: 0, look: 1, still: true }); fillRR(c, x + w * .35 - 30, y + h * .95 - 120, 60, 70, 12, '#C23A3A'); c.restore(); c.fillStyle = 'rgba(0,0,0,.2)'; c.fillRect(x, y, w, h); }
function photoDoor3(c, x, y, w, h) { c.fillStyle = '#3F6B55'; c.fillRect(x, y, w, h); quilted(c, x + w * .25, y + h * .05, w * .5, h * .95, '#5A4636', '#4A3828', '#9C7A43', 30); fillRR(c, x + w * .44, y + h * .14, w * .12, h * .1, 8, '#C9A15A'); txt(c, '3', x + w * .5, y + h * .19, 26, '#3A2A1A', 900); circ(c, x + w * .5, y + h * .34, 6, '#1B1C22');
  c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(x, y, w, h); txt(c, 'Kwiatowa 12', x + w - 16, y + h - 20, 20, 'rgba(255,255,255,.7)', 800, 'right'); }
// pokój z odcieniem (dla Zuzi, Bartka, Leny) — ten sam detal co pokój Kuby, inna kolorystyka i ozdoby
function teenRoom(c, lt, tint, deco) { kubaRoom2(c, lt, { lamp: true }); fillRR(c, 820, 260, 200, 260, 6, '#2A2D36'); c.fillStyle = tint; c.beginPath(); c.arc(920, 360, 60, 0, 7); c.fill(); txt(c, '♪', 920, 362, 70, '#14161B', 900); txt(c, 'TOUR 2026', 920, 470, 26, '#FFFFFF', 900); fillRR(c, 60, 260, 220, 300, 6, '#F2EEE4'); for (let i = 0; i < 6; i++) fillRR(c, 80 + (i % 3) * 66, 280 + Math.floor(i / 3) * 130, 56, 110, 4, ['#E8B860', '#9FB3C2', '#F6C9DA'][i % 3]); c.save(); c.globalCompositeOperation = 'multiply'; c.fillStyle = tint; c.fillRect(0, 0, W, H); c.restore(); if (deco) deco(c); }
// dzielony ekran: 2 lub 3 pokoje jeden pod drugim, każdy z postacią z telefonem
function splitRooms(c, lt, panels) { const n = panels.length, h = H / n;
  panels.forEach(([name, col, draw, cy], i) => { c.save(); c.beginPath(); c.rect(0, i * h, W, h); c.clip(); c.translate(0, i * h - (cy || 760)); draw(c); c.restore();
    font(c, 30, 900); const tw = c.measureText(name).width + 40; fillRR(c, 30, i * h + (i ? 30 : 230), tw, 52, 26, col); txt(c, name, 30 + tw / 2, i * h + (i ? 56 : 256), 30, '#FFFFFF', 900);
    if (i) { c.fillStyle = '#05060A'; c.fillRect(0, i * h - 5, W, 10); } }); }

function banner(c, lt, t0, app, title, text, y = 300) { if (lt < t0 || lt > t0 + 3.2) return; const p = eout(clamp((lt - t0) / .35)) * (1 - clamp((lt - t0 - 2.8) / .4)); c.save(); c.globalAlpha = p; c.translate(0, (1 - p) * -60);
  c.shadowColor = 'rgba(0,0,0,.5)'; c.shadowBlur = 30; fillRR(c, 60, y, 960, 150, 34, 'rgba(240,242,245,.97)'); c.shadowColor = 'transparent'; fillRR(c, 90, y + 30, 90, 90, 22, title.startsWith('Nowy') ? '#FF3B30' : '#3A5AA8'); txt(c, title.startsWith('Nowy') ? '?' : '8B', 135, y + 76, 34, '#FFFFFF', 900);
  txt(c, app, 205, y + 48, 24, '#65676B', 800, 'left'); txt(c, 'teraz', 990, y + 48, 22, '#65676B', 700, 'right'); txt(c, title, 205, y + 86, 28, '#14161B', 900, 'left'); txt(c, text, 205, y + 122, 28, '#14161B', 700, 'left'); c.restore(); }
function popT(lt, ts) { let last = -9; for (const t of ts) if (lt >= t) last = t; return clamp((lt - last) / .3); }
const sitP = (kind, tint, o = {}) => (lt) => (c) => { if (kind === 'kuba') kubaRoom2(c, lt, { lamp: true, screen: true }); else teenRoom(c, lt, tint);
  const po = Object.assign({ t: lt, sit: true, phone: true, look: -1 }, o.p ? o.p(lt) : {}); if (kind === 'bartek') personB(c, 760, 1330, 1.7, po); else person(c, kind, 760, 1330, 1.7, Object.assign(kind === 'kuba' ? { home: true } : {}, po));
  c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createRadialGradient(740, 990, 10, 740, 990, 220); g.addColorStop(0, 'rgba(160,200,255,.4)'); g.addColorStop(1, 'rgba(160,200,255,0)'); c.fillStyle = g; c.fillRect(500, 760, 480, 480); c.restore(); night(c, .45, [{ x: 740, y: 990, r: 360, a: .8 }]); };
const PK = sitP('kuba'), PZ = sitP('zuzia', '#F6C9DA'), PB = sitP('bartek', '#F6DDB8'), PL = sitP('nina', '#CFCBF6');

// ===================== GRUPA KLASOWA ODC. 2: klasa, łazienka =====================
// sala lekcyjna od frontu: tablica z tematem, zegar, okna ze śniegiem, gazetka, mapa, ławki w dwóch rzędach
function classroom(c, lt, o = {}) {
  c.fillStyle = '#E6DCC4'; c.fillRect(0, 0, W, 1400); c.fillStyle = '#9DB89A'; c.fillRect(0, 900, W, 500); c.fillStyle = '#7E9C7A'; c.fillRect(0, 892, W, 12);
  c.fillStyle = '#F2EEE4'; c.fillRect(0, 0, W, 60);
  for (let i = 0; i < 2; i++) { const lx = 300 + i * 480; c.fillStyle = '#E8E4DA'; c.fillRect(lx, 60, 200, 14); c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createRadialGradient(lx + 100, 80, 10, lx + 100, 300, 500); g.addColorStop(0, 'rgba(255,255,240,.25)'); g.addColorStop(1, 'rgba(255,255,240,0)'); c.fillStyle = g; c.fillRect(lx - 400, 60, 1000, 900); c.restore(); }
  // okno (lewo) ze śniegiem
  fillRR(c, 20, 180, 200, 560, 4, '#F2EEE4'); c.fillStyle = '#9FB8D0'; c.fillRect(36, 196, 168, 528); for (let k = 0; k < 18; k++) circ(c, 36 + hash(k) * 168, 196 + ((hash(k + 3) * 528 + lt * 60) % 528), 3, 'rgba(255,255,255,.9)'); c.fillStyle = '#F2EEE4'; c.fillRect(114, 196, 12, 528); c.fillRect(36, 450, 168, 12);
  for (let i = 0; i < 6; i++) fillRR(c, 40 + i * 28, 740, 20, 14, 3, '#3F8A4E');
  // tablica z tematem
  fillRR(c, 270, 180, 560, 330, 6, '#5A3D26'); fillRR(c, 284, 194, 532, 302, 4, '#2E4A3A'); c.fillStyle = 'rgba(255,255,255,.06)'; for (let i = 0; i < 6; i++) c.fillRect(300 + i * 90, 210, 40, 270);
  txt(c, o.board || 'Temat: Bezpieczeństwo w sieci', 550, 250, 26, 'rgba(240,240,230,.9)', 700); txt(c, o.board2 || '1. Nie podawaj adresu', 550, 300, 22, 'rgba(240,240,230,.75)', 700); txt(c, '2. Nie odpisuj obcym', 550, 340, 22, 'rgba(240,240,230,.75)', 700); txt(c, '17.11.2026', 760, 470, 18, 'rgba(240,240,230,.7)', 700);
  fillRR(c, 284, 496, 532, 14, 3, '#7A5634'); fillRR(c, 320, 486, 40, 12, 3, '#F2F2EE'); fillRR(c, 380, 488, 30, 10, 3, '#F5C542');
  // zegar, gazetka, godło-free: mapa Polski jako prostokąt z konturem, plakat „8B”
  circ(c, 920, 230, 60, '#F2EEE4'); c.strokeStyle = '#2A2D36'; c.lineWidth = 6; c.beginPath(); c.arc(920, 230, 60, 0, 7); c.stroke(); c.lineWidth = 6; c.beginPath(); c.moveTo(920, 230); c.lineTo(920, 186); c.moveTo(920, 230); c.lineTo(948, 240); c.stroke();
  fillRR(c, 860, 330, 200, 260, 6, '#B8875A'); [['#FFFFFF', 'DYŻURY'], ['#F5E07A', 'WYCIECZKA'], ['#CDE6F5', 'OCENY'], ['#FFD0D0', '8B ❤']].forEach(([col, t], i) => { c.save(); c.translate(874 + (i % 2) * 92, 346 + Math.floor(i / 2) * 116); c.rotate((hash(i) - .5) * .12); fillRR(c, 0, 0, 82, 100, 3, col); txt(c, t, 41, 50, 12, '#14161B', 900); c.restore(); });
  // ławki: tylny rząd (mniejszy), przedni rząd
  for (const [y, s] of [[1180, .8], [1560, 1.0]]) for (let i = 0; i < 3; i++) { const x = 180 + i * 360; fillRR(c, x - 150 * s, y - 40 * s, 300 * s, 40 * s, 6, '#B08A58'); fillRR(c, x - 150 * s, y, 300 * s, 160 * s, 4, '#8A6A40'); c.fillStyle = '#5A5E66'; c.fillRect(x - 140 * s, y + 160 * s, 10, 120 * s); c.fillRect(x + 130 * s, y + 160 * s, 10, 120 * s); }
  c.fillStyle = '#B9A47E'; c.fillRect(0, 1400, W, 520); for (let i = 0; i < 14; i++) { c.fillStyle = 'rgba(0,0,0,.06)'; c.fillRect(0, 1420 + i * 36, W, 3); }
}
// uczniowie w ławkach: rysowani ZA blatem (najpierw postać, potem blat) — zwraca funkcję do rysowania blatów
function deskRow(c, lt, row) { // row: [[x, kind, opts], ...], y blatu i skala
  const { y, s, kids } = row; for (const [x, kind, o] of kids) { if (!kind) continue; const po = Object.assign({ t: lt, sit: true, still: true }, o || {}); if (kind === 'bartek') personB(c, x, y + 120 * s, 2.0 * s, po); else person(c, kind, x, y + 120 * s, 2.0 * s, po); }
  for (const [x] of kids) { fillRR(c, x - 150 * s, y - 40 * s, 300 * s, 40 * s, 6, '#B08A58'); fillRR(c, x - 150 * s, y, 300 * s, 160 * s, 4, '#8A6A40'); } }
// szkolna łazienka: kafelki, umywalki, lustra, kabiny, migająca świetlówka
function schoolBathroom(c, lt, o = {}) {
  c.fillStyle = '#D8DEE2'; c.fillRect(0, 0, W, 1420); for (let r = 0; r < 24; r++) for (let q = 0; q < 14; q++) { c.strokeStyle = 'rgba(120,130,140,.25)'; c.lineWidth = 2; c.strokeRect(q * 80, r * 60, 80, 60); }
  c.fillStyle = '#6A9AB0'; c.fillRect(0, 780, W, 20);
  const fl = hash(Math.floor(lt * 9)) > .85 ? .4 : 1; fillRR(c, 300, 40, 480, 26, 6, `rgba(240,250,255,${fl})`);
  for (let i = 0; i < 3; i++) { const x = 560 + i * 170; fillRR(c, x, 1000, 3, 420, 0, '#9AA2AB'); }
  for (let i = 0; i < 3; i++) { const x = 600 + i * 170; fillRR(c, x - 70, 200, 150, 820, 6, '#8FB0C0'); fillRR(c, x + 50, 600, 12, 40, 4, '#C9CDD2'); }
  for (let i = 0; i < 2; i++) { const x = 140 + i * 230; fillRR(c, x - 80, 420, 160, 200, 8, '#B8C6D0'); c.fillStyle = 'rgba(255,255,255,.3)'; c.beginPath(); c.moveTo(x - 60, 430); c.lineTo(x - 20, 430); c.lineTo(x - 60, 500); c.fill(); fillRR(c, x - 90, 760, 180, 60, 20, '#F2F2EE'); fillRR(c, x - 10, 720, 20, 40, 6, '#C9CDD2'); }
  c.fillStyle = '#9AA6AE'; c.fillRect(0, 1420, W, 500); for (let r = 0; r < 8; r++) for (let q = 0; q < 14; q++) { c.strokeStyle = 'rgba(80,90,100,.25)'; c.strokeRect(q * 80 + (r % 2) * 40, 1420 + r * 64, 80, 64); }
}

Object.assign(NC, { 'Mama Bartka': '#E0533A', 'Tata Zuzi': '#1E9E8E', 'Mama Maji': '#C23A6A', 'Mama Kuby': '#F2A51E', 'Mama Leny': '#6A7FD6', Lena: '#6A7FD6' });
function photoUnderWindow(c, x, y, w, h) { c.fillStyle = '#0A1022'; c.fillRect(x, y, w, h); c.fillStyle = '#C9D2DE'; c.fillRect(x, y + h * .62, w, h * .38);
  const lp = c.createRadialGradient(x + w * .6, y + h * .7, 5, x + w * .6, y + h * .7, w * .5); lp.addColorStop(0, 'rgba(255,214,140,.55)'); lp.addColorStop(1, 'rgba(255,214,140,0)'); c.fillStyle = lp; c.fillRect(x, y, w, h);
  c.fillStyle = '#1E2330'; c.fillRect(x + w * .6, y + h * .2, 6, h * .5); circ(c, x + w * .6 + 3, y + h * .2, 8, '#FFE0A0');
  c.save(); c.beginPath(); c.rect(x, y, w, h); c.clip(); person(c, 'obcy', x + w * .45, y + h * .9, .55, { t: 0, look: 0, still: true, aR: 2.6 }); c.restore();
  for (let k = 0; k < 20; k++) circ(c, x + hash(k) * w, y + hash(k + 3) * h, 2, 'rgba(255,255,255,.6)'); c.strokeStyle = 'rgba(230,226,214,.6)'; c.lineWidth = 6; c.strokeRect(x + 3, y + 3, w - 6, h - 6); c.beginPath(); c.moveTo(x + w / 2, y); c.lineTo(x + w / 2, y + h); c.stroke(); }
function capSilhouette(c, x, y, s) { c.save(); c.translate(x, y); c.scale(s, s); c.fillStyle = '#0A0B10'; c.beginPath(); c.ellipse(0, 0, 90, 110, 0, 0, 7); c.fill(); c.beginPath(); c.moveTo(-200, 260); c.quadraticCurveTo(0, 90, 200, 260); c.fill();
  c.fillStyle = '#C23A3A'; c.beginPath(); c.ellipse(0, -60, 92, 50, 0, Math.PI, 0); c.fill(); fillRR(c, 40, -70, 100, 22, 10, '#9A2A2A'); c.restore(); }

// ===================== SCENY: GRUPA KLASOWA · ODC. 3 „Nie otwieraj znajomemu głosowi!” (wzór wirala: noc, pukanie, wizjer) =====================
// DYLEMAT na koniec każdego filmu: pytanie do widza + 3 odpowiedzi do wpisania w komentarzu
function dilemma(c, lt, q, opts, t0) { if (lt < t0) return; const p = eout(clamp((lt - t0) / .5)); c.save(); c.globalAlpha = p; c.fillStyle = 'rgba(0,0,0,.6)'; c.fillRect(0, 0, W, H);
  c.translate(0, (1 - p) * 40); fillRR(c, 60, 360, 960, 1140, 40, 'rgba(14,16,24,.96)'); c.strokeStyle = '#F5C542'; c.lineWidth = 4; rr(c, 60, 360, 960, 1140, 40); c.stroke();
  fillRR(c, 300, 330, 480, 64, 32, '#F5C542'); txt(c, 'KTO TO JEST?', 540, 362, 34, '#14161B', 900);
  q.split('\n').forEach((l, i) => txt(c, l, 540, 470 + i * 52, 42, '#FFFFFF', 900));
  opts.forEach(([k, t], i) => { const y = 640 + i * 220, a = clamp((lt - t0 - .6 - i * .5) / .4); c.save(); c.globalAlpha = p * a; c.translate((1 - a) * 60, 0);
    fillRR(c, 110, y, 860, 180, 28, ['#2F6FEB', '#30A46C', '#D7263D'][i]); circ(c, 200, y + 90, 56, 'rgba(255,255,255,.2)'); txt(c, k, 200, y + 92, 64, '#FFFFFF', 900);
    t.split('\n').forEach((l, j, arr) => txt(c, l, 290, y + 90 + (j - (arr.length - 1) / 2) * 44, 36, '#FFFFFF', 800, 'left')); c.restore(); });
  const b = 1 + .05 * Math.sin(lt * 6); c.save(); c.translate(540, 1400); c.scale(b, b); txt(c, '👇 Typuj w komentarzu: A, B czy C', 0, -10, 38, '#F5C542', 900); txt(c, 'Odpowiedź w odcinku 4…', 0, 44, 30, '#FF6B6B', 800); c.restore(); c.restore(); }
function waveCompare(c, lt, x, y, w) { const bars = 46, seed = 7; for (const [row, lab] of [[0, '1. RAZ'], [1, '2. RAZ']]) { const yy = y + row * 150; fillRR(c, x - 20, yy - 70, w + 40, 130, 20, 'rgba(14,16,24,.92)'); txt(c, lab, x, yy - 44, 22, '#F5C542', 900, 'left'); txt(c, '0:04', x + w, yy - 44, 20, '#9AA2AB', 800, 'right');
  for (let i = 0; i < bars; i++) { const h = 10 + Math.abs(Math.sin(i * 1.7 + seed) * 30 + Math.sin(i * .43) * 18), bx = x + i * (w / bars); const played = i / bars < ((lt * .5) % 1); fillRR(c, bx, yy - h / 2 + 10, w / bars - 4, h, 3, played ? '#FF3B30' : '#6E7680'); } }
  txt(c, '=', x + w / 2, y + 74, 40, '#FF3B30', 900); }
function wallClock(c, x, y, r, hh, mm) { circ(c, x, y, r + 8, '#5A3D26'); circ(c, x, y, r, '#F2EEE4'); for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283; fillRR(c, x + Math.sin(a) * r * .82 - 3, y - Math.cos(a) * r * .82 - 8, 6, 16, 2, '#2A2D36'); }
  c.strokeStyle = '#14161B'; c.lineCap = 'round'; c.lineWidth = 8; const ha = ((hh % 12) + mm / 60) / 12 * 6.283, ma = mm / 60 * 6.283; c.beginPath(); c.moveTo(x, y); c.lineTo(x + Math.sin(ha) * r * .5, y - Math.cos(ha) * r * .5); c.stroke(); c.lineWidth = 5; c.beginPath(); c.moveTo(x, y); c.lineTo(x + Math.sin(ma) * r * .78, y - Math.cos(ma) * r * .78); c.stroke(); c.lineCap = 'butt'; circ(c, x, y, 7, '#C23A3A'); }
function phoneCall(c, lt, name, sub, o = {}) { c.fillStyle = '#05060A'; c.fillRect(0, 0, W, H); c.save(); c.translate(540, 980); c.rotate(-.03); c.shadowColor = 'rgba(120,150,255,.4)'; c.shadowBlur = 90; fillRR(c, -330, -560, 660, 1120, 70, '#16171C'); c.shadowColor = 'transparent'; fillRR(c, -312, -542, 624, 1084, 56, '#0B0D14');
  txt(c, '01:14', -250, -500, 24, '#FFFFFF', 800, 'left'); fillRR(c, 200, -510, 50, 22, 6, '#FFFFFF'); fillRR(c, 202, -508, 18, 18, 4, '#FF3B30'); txt(c, '18%', 190, -498, 20, '#FF6B6B', 800, 'right');
  c.save(); c.beginPath(); c.arc(0, -260, 130, 0, 7); c.clip(); c.fillStyle = '#CFCBF6'; c.fillRect(-130, -390, 260, 260); person(c, 'nina', 0, 130, 1.55, { t: lt, look: 0, still: true, mouth: 'smile' }); c.restore(); c.strokeStyle = '#6A7FD6'; c.lineWidth = 6; c.beginPath(); c.arc(0, -260, 134, 0, 7); c.stroke();
  txt(c, name, 0, -60, 56, '#FFFFFF', 900); txt(c, sub, 0, 0, 30, o.red ? '#FF3B30' : '#9AA2AB', 800);
  if (o.wave) for (let k = 0; k < 3; k++) { c.strokeStyle = `rgba(48,164,108,${.6 - k * .18})`; c.lineWidth = 6; c.beginPath(); c.arc(0, -260, 150 + k * 26 + (lt * 50 % 26), 0, 7); c.stroke(); }
  for (const [x, col, ic] of [[-160, '#3A3F4C', '🔇'], [0, '#3A3F4C', '⌨'], [160, '#3A3F4C', '🔊']]) { circ(c, x, 220, 56, col); txt(c, ic, x, 224, 40, '#FFFFFF', 900); } circ(c, 0, 400, 66, '#FF3B30'); txt(c, '✆', 0, 404, 54, '#FFFFFF', 900); c.restore(); }
const tapedPeep = (cc, cx, cy, r, lt, o = {}) => { cc.fillStyle = '#030305'; cc.fillRect(cx - r, cy - r, r * 2, r * 2);
  for (let i = -3; i <= 3; i++) { cc.save(); cc.translate(cx, cy + i * 110); cc.rotate(-.18 + i * .05); const g = cc.createLinearGradient(0, -50, 0, 50); g.addColorStop(0, '#1A1B20'); g.addColorStop(.45, '#3A3C44'); g.addColorStop(.55, '#2A2C33'); g.addColorStop(1, '#141519'); cc.fillStyle = g; cc.fillRect(-r * 1.4, -50, r * 2.8, 100); cc.strokeStyle = 'rgba(255,255,255,.06)'; cc.lineWidth = 2; for (let k = 0; k < 30; k++) { cc.beginPath(); cc.moveTo(-r * 1.4 + k * 30, -50); cc.lineTo(-r * 1.4 + k * 30 + 10, 50); cc.stroke(); } cc.restore(); }
  cc.strokeStyle = 'rgba(80,80,90,.35)'; cc.lineWidth = 3; for (let i = -6; i < 7; i++) { cc.beginPath(); cc.moveTo(cx - r, cy + i * 40 + Math.sin(i) * 10); cc.lineTo(cx + r, cy + i * 40 - 20); cc.stroke(); }
  if (o.peel) { cc.save(); cc.beginPath(); cc.moveTo(cx + r, cy - r); cc.lineTo(cx + r - o.peel * 2 * r, cy - r); cc.lineTo(cx + r, cy - r + o.peel * 2 * r); cc.closePath(); cc.clip(); cc.save(); cc.translate(cx, cy); cc.scale(.62, .62); cc.translate(-540, -1000); stairElev(cc, lt, 9, { flick: true }); cc.restore(); cc.restore(); } };
const hallKnock = (c, lt, ks, o = {}) => { const sh = ks.some(k => lt > k && lt < k + .12) ? 9 : 0; c.save(); c.translate(sh, 0); kubaHall(c, lt, Object.assign({ underLight: 1 }, o)); c.restore(); };
// 0. ODPOWIEDŹ Z ODC. 3: nagranie z monitoringu klatki Kuby, 01:10 — kaptur, klucze. B: obcy z klatki.
// 0. HAK: pikowane drzwi 94 z bliska, czarny wizjer. PUK. PUK. PUK.
// 1. 01:12 — Kuba sam. Mama na nocnej zmianie. Telefon milczy.
// 2. PUKANIE. Nikt nie dzwonił domofonem — ktoś już jest w klatce.
// 3. WIZJER: czarno. Zaklejony od zewnątrz.
// 4. GŁOS LENY: „Kuba! To ja, Lena! Uciekłam mu! Otwórz, proszę!” — „Lena?!” (BŁĄD 1)
// 5. TELEFON: Kuba dzwoni do Leny. Za drzwiami odzywa się dzwonek jej telefonu.
// 6. PUŁAPKA: znowu ten sam głos, słowo w słowo. Kuba przekręca zamek (BŁĄD 2)… i zamiera. To nagranie.
// 7. Najpierw MAMA LENY (sprawdzenie, czy to naprawdę Lena): „Lena śpi obok mnie. Telefon zgubiła wczoraj w szkole.”
// 8. Potem 112 + ZASADA
// rękawiczka (czarna, bez skóry) — ręka obcego
const GLOVE = { jacket: '#1A1B22', dark: '#0E0F14', skin: '#24252C' };
function glove(c, fx, fy, ang, s = 1) { c.save(); c.translate(fx, fy); c.scale(s, s); c.rotate(ang); fillRR(c, 170, -70, 700, 140, 50, GLOVE.jacket); fillRR(c, 150, -78, 60, 156, 20, GLOVE.dark); fillRR(c, 40, -56, 150, 112, 46, GLOVE.skin); fillRR(c, -6, -18, 90, 38, 19, GLOVE.skin); c.strokeStyle = 'rgba(255,255,255,.08)'; c.lineWidth = 3; for (let i = 0; i < 3; i++) { c.beginPath(); c.moveTo(60, -30 + i * 30); c.lineTo(170, -30 + i * 30); c.stroke(); } c.restore(); }
// szkolna szatnia: kafelki, kraty boksów, wieszaki z kurtkami, ławka, buty, świetlówka, plan lekcji, zegar
function szatnia(c, lt, o = {}) {
  c.fillStyle = '#C9CFC4'; c.fillRect(0, 0, W, 1420); for (let r = 0; r < 24; r++) for (let q = 0; q < 14; q++) { c.strokeStyle = 'rgba(110,120,110,.22)'; c.lineWidth = 2; c.strokeRect(q * 80, r * 60, 80, 60); }
  c.fillStyle = '#5E7F6A'; c.fillRect(0, 980, W, 440); c.fillStyle = '#4A6A56'; c.fillRect(0, 972, W, 12);
  const fl = (o.flick && hash(Math.floor(lt * 9)) > .7) ? .25 : 1; fillRR(c, 300, 30, 480, 26, 6, `rgba(240,250,255,${fl})`); c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createRadialGradient(540, 60, 10, 540, 500, 900); g.addColorStop(0, `rgba(230,245,255,${.2 * fl})`); g.addColorStop(1, 'rgba(230,245,255,0)'); c.fillStyle = g; c.fillRect(0, 0, W, 1400); c.restore();
  fillRR(c, 60, 140, 260, 70, 8, '#2F6FEB'); txt(c, 'SZATNIA 8B', 190, 176, 30, '#FFFFFF', 900);
  fillRR(c, 380, 120, 220, 300, 6, '#F2EEE4'); txt(c, 'PLAN LEKCJI', 490, 150, 18, '#14161B', 900); for (let i = 0; i < 7; i++) { fillRR(c, 396, 172 + i * 34, 188, 24, 3, ['#CDE6F5', '#F5E07A', '#FFD0D0', '#D4F0D0'][i % 4]); }
  wallClock(c, 700, 230, 60, o.hh ?? 2, o.mm ?? 20); fillRR(c, 820, 130, 160, 220, 6, '#FFFFFF'); txt(c, 'ZGUBIONE', 900, 160, 18, '#C23A3A', 900); txt(c, 'RZECZY', 900, 184, 18, '#C23A3A', 900); fillRR(c, 840, 210, 120, 120, 8, '#9AA2AB');
  fillRR(c, 0, 610, W, 22, 4, '#8A6A40'); const jk = ['#C0392B', '#2E86C1', null, '#1E8449', '#B9770E', '#34495E'];
  for (let i = 0; i < 6; i++) { const x = 90 + i * 180; fillRR(c, x - 6, 620, 12, 40, 4, '#9AA2AB'); if (!jk[i]) continue; c.save(); c.translate(x, 660); c.rotate((hash(i) - .5) * .06); fillRR(c, -70, 0, 140, 420, 30, jk[i]); fillRR(c, -40, -10, 80, 50, 20, 'rgba(0,0,0,.25)'); c.fillStyle = 'rgba(0,0,0,.18)'; c.fillRect(-3, 40, 6, 370); for (let k = 0; k < 4; k++) circ(c, 14, 70 + k * 80, 6, 'rgba(255,255,255,.4)'); c.restore(); }
  // kurtka Leny: fioletowa, brelok „L”, kieszeń
  if (o.lenaJacket !== false) { c.save(); c.translate(450, 660); fillRR(c, -80, 0, 160, 450, 34, '#9B6BC9'); fillRR(c, -46, -10, 92, 56, 22, '#7E50A8'); c.fillStyle = 'rgba(0,0,0,.18)'; c.fillRect(-3, 46, 6, 390); fillRR(c, -70, 270, 64, 90, 10, '#7E50A8'); circ(c, 50, 120, 14, '#F5C542'); txt(c, 'L', 50, 121, 16, '#14161B', 900); c.restore(); }
  fillRR(c, 40, 1240, 1000, 40, 8, '#B08A58'); c.fillStyle = '#5A5E66'; c.fillRect(80, 1280, 14, 140); c.fillRect(986, 1280, 14, 140);
  for (let i = 0; i < 4; i++) { const x = 220 + i * 230; fillRR(c, x - 46, 1130, 92, 110, 28, ['#2A2D36', '#C0392B', '#2E86C1', '#1E8449'][i]); c.strokeStyle = 'rgba(255,255,255,.4)'; c.lineWidth = 3; c.beginPath(); c.moveTo(x - 20, 1130); c.lineTo(x, 1110); c.lineTo(x + 20, 1130); c.stroke(); }
  c.strokeStyle = 'rgba(60,70,70,.7)'; c.lineWidth = 4; for (let x = 900; x < W; x += 34) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, 1420); c.stroke(); } for (let y = 0; y < 1420; y += 34) { c.beginPath(); c.moveTo(900, y); c.lineTo(W, y); c.stroke(); }
  c.fillStyle = '#9AA6AE'; c.fillRect(0, 1420, W, 500); for (let r = 0; r < 8; r++) for (let q = 0; q < 14; q++) { c.strokeStyle = 'rgba(80,90,100,.25)'; c.strokeRect(q * 80 + (r % 2) * 40, 1420 + r * 64, 80, 64); }
}
// telefon Leny: ekran blokady
function lenaLock(c, x, y, s, a = 0) { c.save(); c.translate(x, y); c.rotate(a); c.scale(s, s); fillRR(c, -60, -110, 120, 220, 18, '#16171C'); fillRR(c, -54, -104, 108, 208, 14, '#3B2A5A'); txt(c, '14:20', 0, -60, 26, '#FFFFFF', 900); fillRR(c, -44, -20, 88, 34, 8, 'rgba(255,255,255,.2)'); txt(c, '💬 8B klasa', 0, -3, 12, '#FFFFFF', 800); txt(c, 'Lena 💜', 0, 70, 14, '#FFFFFF', 800); c.restore(); }
// czerwona czapka z daszkiem wystająca z kieszeni (trop A) i pęk kluczy z żółtym brelokiem (trop B)
function capInPocket(c, x, y, s) { c.save(); c.translate(x, y); c.scale(s, s); c.rotate(-.3); c.fillStyle = '#C23A3A'; c.beginPath(); c.ellipse(0, 0, 44, 26, 0, Math.PI, 0); c.fill(); fillRR(c, 10, -6, 56, 14, 7, '#9A2A2A'); c.restore(); }
// zakapturzony: postać bez twarzy (czarna plama w kapturze)
function hooded(c, x, y, s, o = {}) { person(c, 'kaptur', x, y, s, Object.assign({ still: true }, o)); if (!o.back) { const hy = y - 238 * s; c.fillStyle = '#060608'; c.beginPath(); c.ellipse(x, hy + 4 * s, 40 * s, 46 * s, 0, 0, 7); c.fill(); if (o.eyes) { circ(c, x - 14 * s, hy, 3.5 * s, `rgba(255,255,255,${o.eyes})`); circ(c, x + 14 * s, hy, 3.5 * s, `rgba(255,255,255,${o.eyes})`); } } }
// 9. WCZORAJ, SZATNIA: Lena wiesza kurtkę (telefon w kieszeni), Zuzia obok, Bartek nagrywa. Dzwonek. Wszyscy wychodzą.
//    Ktoś zostaje: kaptur, bez twarzy. Z kieszeni wystaje czerwony daszek, u pasa klucze z żółtym brelokiem. Zabiera telefon.
// 10. 00:41 — z telefonu Leny ktoś pisze na grupie klasowej. Bartek, Zuzia… i Kuba odpisuje.
// ekran telefonu: wiadomości głosowe Leny pocięte i sklejone w jedno nagranie
function spliceScreen(c, lt, x, y, s, a) { c.save(); c.translate(x, y); c.rotate(a); c.scale(s, s); c.shadowColor = 'rgba(120,150,255,.5)'; c.shadowBlur = 50; fillRR(c, -200, -340, 400, 680, 44, '#16171C'); c.shadowColor = 'transparent'; fillRR(c, -186, -326, 372, 652, 34, '#0B0D14');
  txt(c, 'Lena 💜 · wiadomości głosowe', 0, -280, 20, '#C9CDD2', 800);
  const msgs = [['„…Kuba!…”', '0:01'], ['„…to ja, Lena…”', '0:02'], ['„…uciekłam mu…”', '0:02'], ['„…otwórz, proszę…”', '0:02']];
  msgs.forEach(([t, d], i) => { const yy = -220 + i * 86, on = lt > .6 + i * .5; fillRR(c, -160, yy, 320, 66, 20, on ? '#7E50A8' : '#2A2D36'); txt(c, '▶', -132, yy + 33, 22, '#FFFFFF', 900); txt(c, t, -104, yy + 33, 20, '#FFFFFF', 800, 'left'); txt(c, d, 146, yy + 33, 16, 'rgba(255,255,255,.7)', 800, 'right'); });
  txt(c, '✂  ✂  ✂', 0, 150, 30, '#F5C542', 900); fillRR(c, -160, 190, 320, 90, 18, '#1E2230'); for (let k = 0; k < 40; k++) { const h = 8 + Math.abs(Math.sin(k * 1.7) * 30 + Math.sin(k * .5) * 10); fillRR(c, -150 + k * 7.5, 235 - h / 2, 4, h, 2, k / 40 < clamp(lt / 3.2) ? '#FF4D6D' : '#5A5E66'); }
  txt(c, 'nagranie_kuba.m4a  0:07', 0, 300, 18, '#C9CDD2', 800); c.restore(); }
// 11. 01:10 — KILKA MINUT PRZED PUKANIEM: zakapturzony idzie po schodach na klatce Kuby, w ręku sklejone nagranie, klucze dzwonią.
//     Pod drzwiami Kuby (nr 3) zakleja wizjer taśmą.
// 9. DRUGIE NAPIĘCIE: cienie pod drzwiami wracają. Pod drzwiami wsuwa się kartka: „WIEM, ŻE SŁUCHASZ.”
// 10. ZAKOŃCZENIE: wizjer jaśnieje — taśma schodzi. Oko i uśmiech tuż przy szkle. Głos Leny… który przechodzi w męski: „Dobranoc, Kuba.”

// ===================== SCENY: GRUPA KLASOWA · ODC. 4 „Nie zostawaj sam w szatni!” =====================
KINDS.szatniarz = Object.assign({}, KINDS.obcy, { jacket: '#56606B', dark: '#454E58', pants: '#2A2D36', shoes: '#111214' });
// pan z szatni: szary fartuch roboczy, identyfikator, klucze u pasa
function szatniarz(c, x, y, s, o = {}) { person(c, 'szatniarz', x, y, s, Object.assign({ still: true }, o)); if (o.back) return; c.save(); if (o.alpha != null) c.globalAlpha = o.alpha;
  fillRR(c, x + 18 * s, y - 196 * s, 46 * s, 30 * s, 4 * s, '#F2EEE4'); fillRR(c, x + 18 * s, y - 196 * s, 46 * s, 9 * s, 3 * s, '#2F6FEB'); c.restore();
  if (o.keys !== false) keyRing(c, x - 40 * s, y - 128 * s, .32 * s, o.t || 0, 1.2); }
// pudło „ZGUBIONE RZECZY” z bliska: szalik, rękawiczka, piórnik, czerwona czapka Bartka, telefon Leny
function lostBox(c, lt, o = {}) { c.fillStyle = '#5E7F6A'; c.fillRect(0, 0, W, H); for (let r = 0; r < 20; r++) for (let q = 0; q < 10; q++) { c.strokeStyle = 'rgba(0,0,0,.08)'; c.lineWidth = 2; c.strokeRect(q * 120, r * 100, 120, 100); }
  fillRR(c, 120, 820, 840, 820, 10, '#9C7347'); // tył pudła
  // rzeczy
  c.save(); c.translate(260, 860); c.rotate(-.2); for (let i = 0; i < 6; i++) fillRR(c, i * 46, 0, 46, 220, 8, i % 2 ? '#2E86C1' : '#F2EEE4'); c.restore();
  fillRR(c, 640, 900, 150, 190, 60, '#1E8449'); fillRR(c, 600, 960, 70, 90, 30, '#1E8449');
  fillRR(c, 300, 1060, 300, 90, 30, '#F5C542'); txt(c, '✏', 450, 1105, 40, '#14161B', 900);
  // czerwona czapka z daszkiem i metką
  c.save(); c.translate(720, 1120); c.rotate(.15); c.fillStyle = '#C23A3A'; c.beginPath(); c.ellipse(0, 0, 150, 92, 0, Math.PI, 0); c.fill(); fillRR(c, 40, -18, 210, 44, 22, '#9A2A2A'); fillRR(c, -60, -70, 120, 40, 6, '#F2EEE4'); txt(c, 'B. K. 8B', 0, -50, 26, '#14161B', 900); c.restore();
  // telefon Leny: fioletowe etui z naklejką „L”
  if (!o.phoneGone) { c.save(); c.translate(460, 1010); c.rotate(-.12); fillRR(c, -110, -190, 220, 380, 34, '#9B6BC9'); fillRR(c, -96, -176, 192, 352, 26, '#0B0D14'); circ(c, 0, 120, 26, '#F5C542'); txt(c, 'L', 0, 122, 30, '#14161B', 900);
    if (o.glow) { c.globalAlpha = o.glow; fillRR(c, -96, -176, 192, 352, 26, '#3B2A5A'); txt(c, '14:36', 0, -110, 40, '#FFFFFF', 900); c.globalAlpha = 1; } c.restore(); }
  fillRR(c, 80, 1180, 920, 520, 14, '#B98A55'); fillRR(c, 80, 1180, 920, 30, 8, '#A47A49'); c.fillStyle = 'rgba(0,0,0,.12)'; c.fillRect(530, 1210, 6, 490);
  c.save(); c.translate(540, 1420); c.rotate(-.04); txt(c, 'ZGUBIONE', 0, -40, 84, '#1B1C22', 900); txt(c, 'RZECZY', 0, 50, 84, '#1B1C22', 900); c.restore();
  c.fillStyle = '#3E4E44'; c.fillRect(0, 1700, W, 220); }
// duży telefon Leny w dłoni Kuby: powiadomienia (z możliwym zdjęciem)
function phoneBig(c, lt, msgs, o = {}) { c.fillStyle = '#05060A'; c.fillRect(0, 0, W, H); if (o.bg) o.bg(c);
  const sh = o.shake ? Math.sin(lt * 80) * o.shake : 0; c.save(); c.translate(540 + sh, 980); c.rotate(-.03);
  c.shadowColor = 'rgba(160,120,255,.45)'; c.shadowBlur = 90; fillRR(c, -340, -600, 680, 1200, 80, o.caseCol || '#9B6BC9'); c.shadowColor = 'transparent'; fillRR(c, -312, -572, 624, 1144, 60, '#0B0D14');
  const bg = c.createLinearGradient(0, -572, 0, 572); bg.addColorStop(0, o.scr1 || '#3B2A5A'); bg.addColorStop(1, '#0B0D14'); fillRR(c, -312, -572, 624, 1144, 60, bg);
  txt(c, o.time || '14:36', 0, -440, 120, '#FFFFFF', 800); txt(c, o.date || 'czwartek, 19 listopada', 0, -350, 30, 'rgba(255,255,255,.8)', 700);
  let yy = -270; msgs.forEach(([from, text, photo, ts], i) => { const y = yy; yy += (photo ? 420 : 180) + 30; const a = clamp((lt - (ts || 0)) / .3); if (a <= 0) return; c.save(); c.globalAlpha = a; c.translate(0, (1 - a) * -30);
    const hgt = photo ? 420 : 180; fillRR(c, -290, y, 580, hgt, 36, 'rgba(40,42,52,.92)'); circ(c, -236, y + 56, 30, from === 'Nowy Uczeń' ? '#FF3B30' : '#5A5E66'); txt(c, from[0], -236, y + 58, 30, '#FFFFFF', 900);
    txt(c, from, -190, y + 44, 28, '#FFFFFF', 900, 'left'); txt(c, 'teraz', 270, y + 44, 22, 'rgba(255,255,255,.6)', 700, 'right');
    text.split('\n').forEach((l, j) => txt(c, l, -190, y + 96 + j * 40, 32, '#E8E8EE', 700, 'left'));
    if (photo) { c.save(); c.beginPath(); rr(c, -250, y + 150, 500, 250, 20); c.clip(); photo(c, -250, y + 150, 500, 250); c.restore(); }
    c.restore(); });
  c.restore(); if (o.hand !== false) hand(c, 830 + sh, 1500, 1.15, o.handKind || KINDS.kuba);
  if (o.shake) { c.strokeStyle = 'rgba(255,255,255,.35)'; c.lineWidth = 5; for (const sx of [-1, 1]) for (let k = 0; k < 3; k++) { c.beginPath(); c.arc(540 + sx * 380, 980, 30 + k * 26, sx > 0 ? -.6 : Math.PI - .6, sx > 0 ? .6 : Math.PI + .6); c.stroke(); } } }
// zdjęcie: Kuba śpi — zrobione z wnętrza jego pokoju, nocą, z datownikiem
function photoSleep(c, x, y, w, h) { c.fillStyle = '#0B1020'; c.fillRect(x, y, w, h); fillRR(c, x + w * .08, y + h * .45, w * .84, h * .45, 8, '#2A3350'); fillRR(c, x + w * .12, y + h * .4, w * .3, h * .2, 10, '#C9D2DE'); circ(c, x + w * .27, y + h * .44, h * .11, '#E3AC88'); c.fillStyle = '#F5C542'; c.beginPath(); c.ellipse(x + w * .27, y + h * .37, h * .12, h * .07, 0, Math.PI, 0); c.fill(); fillRR(c, x + w * .35, y + h * .5, w * .55, h * .3, 10, '#3A5A9A');
  fillRR(c, x + w * .62, y + h * .08, w * .28, h * .26, 3, '#1B2340'); c.fillStyle = 'rgba(160,200,255,.12)'; c.fillRect(x, y, w, h); txt(c, '02:14', x + w - 10, y + h - 14, h * .1, '#FF9A2A', 900, 'right'); }
// tablica na zapleczu: zdjęcia połączone czerwoną nitką, lista klasy, dorobione klucze na biurku
function backWall(c, lt, o = {}) { c.fillStyle = '#4A4F58'; c.fillRect(0, 0, W, H); for (let i = 0; i < 14; i++) { c.fillStyle = 'rgba(0,0,0,.08)'; c.fillRect(i * 80, 0, 40, 1500); }
  fillRR(c, 60, 180, 960, 1060, 12, '#7A5634'); fillRR(c, 80, 200, 920, 1020, 8, '#B88B5A'); for (let k = 0; k < 220; k++) circ(c, 80 + hash(k) * 920, 200 + hash(k + 7) * 1020, 2, 'rgba(90,60,30,.35)');
  const P = [[130, 250, 300, 220, photoDoor3, 'Kwiatowa 12/3'], [620, 240, 330, 220, photoUnderWindow, 'okno Leny'], [140, 640, 300, 210, photoStop, 'przystanek'], [640, 650, 300, 210, photoWindow, '8B · 3 piętro'], [380, 440, 320, 220, photoSleep, '???']];
  const ctr = P.map(([x, y, w, h]) => [x + w / 2, y + h / 2]); c.strokeStyle = '#D7263D'; c.lineWidth = 5; c.beginPath(); c.moveTo(...ctr[0]); c.lineTo(...ctr[1]); c.lineTo(...ctr[3]); c.lineTo(...ctr[2]); c.lineTo(...ctr[0]); c.moveTo(...ctr[0]); c.lineTo(540, 1000); c.stroke();
  P.forEach(([x, y, w, h, fn, cap], i) => { const a = clamp((lt - (o.t0 || 0) - i * .6) / .3); c.save(); c.globalAlpha = Math.max(.15, a); c.translate(x + w / 2, y + h / 2); c.rotate((hash(i + 3) - .5) * .12); fillRR(c, -w / 2 - 12, -h / 2 - 12, w + 24, h + 70, 4, '#F2EEE4'); fn(c, -w / 2, -h / 2, w, h); txt(c, cap, 0, h / 2 + 30, 24, '#14161B', 800); c.restore(); circ(c, x + w / 2, y - 6, 10, '#D7263D'); });
  // lista klasy z zakreślonymi imionami
  c.save(); c.translate(540, 1030); c.rotate(.04); fillRR(c, -150, -120, 300, 240, 4, '#FFFFFF'); txt(c, 'KLASA 8B', 0, -90, 26, '#14161B', 900); ['Bartek K.', 'Kuba S.', 'Lena W.', 'Zuzia M.'].forEach((n, i) => { txt(c, n, -120, -44 + i * 44, 24, '#14161B', 700, 'left'); if (i === 1 || i === 2) { c.strokeStyle = '#D7263D'; c.lineWidth = 4; c.beginPath(); c.ellipse(-60, -44 + i * 44, 80, 22, 0, 0, 7); c.stroke(); } }); c.restore(); circ(c, 540, 905, 10, '#D7263D');
  // biurko: nowe klucze świeżo dorobione, przywieszka „3”
  fillRR(c, 0, 1500, W, 420, 0, '#5A3D26'); fillRR(c, 0, 1490, W, 24, 4, '#7A5634');
  if (o.desk !== false) { for (let i = 0; i < 3; i++) { c.save(); c.translate(600 + i * 120, 1640 + (i % 2) * 30); c.rotate(-.5 + i * .3); fillRR(c, -10, 0, 22, 110, 6, '#E6C76A'); for (let k = 0; k < 4; k++) fillRR(c, 12, 30 + k * 16, 10, 9, 2, '#E6C76A'); circ(c, 0, 0, 22, '#D4B355'); circ(c, 0, 0, 8, '#5A3D26'); c.restore(); }
    c.save(); c.translate(300, 1680); c.rotate(-.1); fillRR(c, -90, -40, 180, 80, 10, '#F5C542'); txt(c, '3', 0, 2, 50, '#14161B', 900); c.restore(); }
}
// pusta czarna szatnia z latarkami policji
function flashBeams(c, lt) { c.save(); c.globalCompositeOperation = 'lighter'; for (let i = 0; i < 2; i++) { const a = Math.sin(lt * 1.3 + i * 2) * .4, x = 300 + i * 500; const g = c.createRadialGradient(x, 1900, 10, x + Math.sin(a) * 600, 900, 500); g.addColorStop(0, 'rgba(255,250,220,.35)'); g.addColorStop(1, 'rgba(255,250,220,0)'); c.fillStyle = g; c.beginPath(); c.moveTo(x - 20, 1920); c.lineTo(x + Math.sin(a) * 900 - 300, 500); c.lineTo(x + Math.sin(a) * 900 + 300, 500); c.lineTo(x + 20, 1920); c.fill(); } c.restore(); }
// budynek szkoły z zewnątrz (zmierzch), radiowóz
function schoolOutside(c, lt) { const sky = c.createLinearGradient(0, 0, 0, 900); sky.addColorStop(0, '#1A2340'); sky.addColorStop(1, '#5A4A6A'); c.fillStyle = sky; c.fillRect(0, 0, W, H);
  fillRR(c, -20, 300, 1120, 900, 0, '#C9A27A'); c.fillStyle = '#B08A62'; for (let r = 0; r < 16; r++) c.fillRect(-20, 300 + r * 56, 1120, 3);
  fillRR(c, 300, 230, 480, 100, 8, '#E8E4DA'); txt(c, 'SZKOŁA PODSTAWOWA NR 8', 540, 282, 30, '#14161B', 900);
  for (let r = 0; r < 3; r++) for (let q = 0; q < 5; q++) { const lit = hash(r * 5 + q) > .4; fillRR(c, 60 + q * 200, 380 + r * 230, 140, 160, 4, lit ? '#F2D08A' : '#2A3350'); c.fillStyle = '#E8E4DA'; c.fillRect(126 + q * 200, 380 + r * 230, 8, 160); }
  fillRR(c, 420, 980, 240, 220, 6, '#5A3D26'); fillRR(c, 440, 1000, 200, 200, 4, '#F2D08A');
  c.fillStyle = '#2A2D36'; c.fillRect(0, 1200, W, 720); c.fillStyle = '#3A3F48'; c.fillRect(0, 1200, W, 120); snow(c, lt, 60, .6); }

const S4 = 'GRUPA KLASOWA · ODC. 4';
// monitoring z prawdziwą godziną (01:10:ss)
function cctvAt(c, lt, label, hm) { cctv(c, lt, label); c.fillStyle = 'rgba(40,44,42,.92)'; c.fillRect(50, 274, 300, 38); const sec = 4 + Math.floor(lt); txt(c, hm + ':' + String(sec).padStart(2, '0'), 60, 292, 28, '#E8F0E8', 700, 'left'); }
// 0. HAK: pudło „ZGUBIONE RZECZY” — telefon Leny i czerwona czapka Bartka.
// 1. RANO W KLASIE: wszyscy patrzą na Bartka (czerwona czapka). Bartek się broni. Lena milczy. Maja… się uśmiecha.
// 2. PRZERWA: Lena mówi Kubie prawdę — wysyłała „Nowemu Uczniowi” głosówki.
// 3. ZUZIA COŚ WIDZIAŁA: zdjęcie z wczoraj — nowy pan z szatni fotografuje kurtki.
// 2. Pudło rzeczy znalezionych: telefon Leny i czapka Bartka.
// 3. Telefon Leny się świeci: „Znalazłeś 🙂 Zostań tam. Zaraz przyjdę.”
// 4. Pan z szatni: szeroki uśmiech, klucze u pasa. „Zgubiłeś coś, Kuba? Chodź na zaplecze.”
// 5. Te same klucze: teraz (pas pana z szatni) i wczoraj (zakapturzony w szatni).
// 6. Kuba: „To pan zabrał telefon Leny!” Uśmiech znika. Światło gaśnie. „Nikt cię tu nie usłyszy, Kuba.”
// 7. Ucieczka na korytarz, do p. Wiśniewskiej. ZASADA.
// 8. Policja. Szatnia pusta. Monitoring z klatki Kuby: ten sam człowiek. ODPOWIEDŹ Z ODC. 3: B.
// 9. Zaplecze: tablica ze zdjęciami (drzwi Kuby, okno Leny, przystanek), lista klasy, dorobione klucze.
// 10. Grupa klasowa: Bartek niewinny, Lena dziękuje, Zuzia przeprasza… a Maja wychodzi z grupy.
// pytanie-zagadka (wersja z własnym nagłówkiem i stopką)
function dilemma4(c, lt, pill, q, opts, t0, foot) { if (lt < t0) return; const p = eout(clamp((lt - t0) / .5)); c.save(); c.globalAlpha = p; c.fillStyle = 'rgba(0,0,0,.6)'; c.fillRect(0, 0, W, H);
  c.translate(0, (1 - p) * 40); fillRR(c, 60, 360, 960, 1140, 40, 'rgba(14,16,24,.96)'); c.strokeStyle = '#F5C542'; c.lineWidth = 4; rr(c, 60, 360, 960, 1140, 40); c.stroke();
  fillRR(c, 300, 330, 480, 64, 32, '#F5C542'); txt(c, pill, 540, 362, 34, '#14161B', 900);
  q.split('\n').forEach((l, i) => txt(c, l, 540, 470 + i * 52, 42, '#FFFFFF', 900));
  opts.forEach(([k, t], i) => { const y = 640 + i * 220, a = clamp((lt - t0 - .6 - i * .5) / .4); c.save(); c.globalAlpha = p * a; c.translate((1 - a) * 60, 0);
    fillRR(c, 110, y, 860, 180, 28, ['#2F6FEB', '#30A46C', '#D7263D'][i]); circ(c, 200, y + 90, 56, 'rgba(255,255,255,.2)'); txt(c, k, 200, y + 92, 64, '#FFFFFF', 900);
    t.split('\n').forEach((l, j, arr) => txt(c, l, 290, y + 90 + (j - (arr.length - 1) / 2) * 44, 36, '#FFFFFF', 800, 'left')); c.restore(); });
  const b = 1 + .05 * Math.sin(lt * 6); c.save(); c.translate(540, 1400); c.scale(b, b); txt(c, '👇 Typuj w komentarzu: A, B czy C', 0, -10, 38, '#F5C542', 900); txt(c, foot, 0, 44, 30, '#FF6B6B', 800); c.restore(); c.restore(); }
// 11. ZAKOŃCZENIE: wieczór, mama w domu, spokój… SMS: zdjęcie okna Kuby. „Zgubiłem klucze 🙂 Ale dorobiłem zapasowe.” Zamek w drzwiach się przekręca. Ciemność.

// ===================== CO ZROBISZ? · ODC. 1 „Obcy w aucie zna twoje imię” =====================
KINDS.kierowca = Object.assign({}, KINDS.sasiad, { jacket: '#5A3A28', dark: '#47301F', pants: '#22252B', skin: '#E8B48E' });
// ciemny sedan z boku (przodem w lewo); o.win: szyba kierowcy opuszczona (0..1), o.driver: rysuj kierowcę, o.mouth, o.door: tylne drzwi otwarte (0..1), o.lights
function carSide(c, lt, x, y, s, o = {}) { c.save(); c.translate(x, y); c.scale(s, s);
  if (o.lights) { c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createRadialGradient(-470, -150, 10, -900, -100, 700); g.addColorStop(0, 'rgba(255,240,200,.55)'); g.addColorStop(1, 'rgba(255,240,200,0)'); c.fillStyle = g; c.beginPath(); c.moveTo(-460, -170); c.lineTo(-1500, -420); c.lineTo(-1500, 120); c.lineTo(-460, -110); c.fill(); c.restore(); }
  ell(c, 0, 8, 470, 24, 'rgba(0,0,0,.5)');
  c.fillStyle = '#1C2030'; c.beginPath(); c.moveTo(-460, -60); c.lineTo(-460, -170); c.quadraticCurveTo(-440, -230, -330, -250); c.lineTo(-230, -260); c.lineTo(-140, -400); c.quadraticCurveTo(-120, -420, -90, -420); c.lineTo(200, -420); c.quadraticCurveTo(240, -420, 260, -390); c.lineTo(330, -260); c.lineTo(430, -245); c.quadraticCurveTo(470, -235, 470, -170); c.lineTo(470, -60); c.closePath(); c.fill();
  c.fillStyle = 'rgba(255,255,255,.06)'; c.fillRect(-440, -215, 900, 10);
  // okna: przednie (kierowca) i tylne
  const fw = [-210, -395, 0, -265], rw = [20, -395, 230, -265];
  const winPath = (cc, [x0, y0, x1, y1], slant) => { cc.beginPath(); cc.moveTo(x0 + (slant ? 70 : 0), y0); cc.lineTo(x1 - (slant ? 0 : 50), y0); cc.lineTo(x1, y1); cc.lineTo(x0, y1); cc.closePath(); };
  c.save(); winPath(c, fw, true); c.clip(); c.fillStyle = '#05060A'; c.fillRect(-230, -420, 260, 180);
  if (o.driver !== false) { c.save(); c.globalAlpha = 1; person(c, 'kierowca', -105, -330 + 238 * 1.0 + 40, 1.0, { t: lt, look: 1, mouth: o.mouth === undefined ? 'grin' : o.mouth, still: true }); c.restore(); }
  const gl = 1 - (o.win || 0); if (gl > 0) { c.fillStyle = 'rgba(30,40,60,.88)'; c.fillRect(-230, -420, 260, 160 * gl + 5); c.fillStyle = 'rgba(160,190,230,.12)'; c.beginPath(); c.moveTo(-150, -395); c.lineTo(-100, -395); c.lineTo(-170, -395 + 150 * gl); c.lineTo(-210, -395 + 150 * gl); c.fill(); }
  c.restore(); c.strokeStyle = '#2C3246'; c.lineWidth = 8; winPath(c, fw, true); c.stroke();
  c.save(); winPath(c, rw, false); c.clip(); c.fillStyle = '#0B0D14'; c.fillRect(0, -420, 260, 180); c.fillStyle = 'rgba(30,40,60,.85)'; c.fillRect(0, -420, 260, 180); if (o.photosVisible) { for (let k = 0; k < 3; k++) fillRR(c, 60 + k * 50, -320 + k * 8, 40, 30, 3, 'rgba(240,235,220,.6)'); } c.restore(); c.strokeStyle = '#2C3246'; winPath(c, rw, false); c.stroke();
  // drzwi, klamki
  c.strokeStyle = 'rgba(0,0,0,.45)'; c.lineWidth = 5; c.beginPath(); c.moveTo(10, -400); c.lineTo(10, -70); c.moveTo(-230, -260); c.lineTo(-240, -70); c.moveTo(330, -260); c.lineTo(330, -70); c.stroke();
  fillRR(c, -120, -200, 60, 14, 6, '#3A4058'); fillRR(c, 120, -200, 60, 14, 6, '#3A4058');
  if (o.door) { const d = o.door; c.fillStyle = '#05060A'; c.beginPath(); c.moveTo(12, -398); c.lineTo(328, -262); c.lineTo(328, -72); c.lineTo(12, -72); c.fill(); c.save(); c.translate(330, 0); c.scale(1 - d * .7, 1); c.fillStyle = '#232838'; c.beginPath(); c.moveTo(0, -260); c.lineTo(d * 180, -250); c.lineTo(d * 180, -70); c.lineTo(0, -70); c.fill(); c.restore(); }
  // koła, światła
  for (const wx of [-290, 300]) { circ(c, wx, -40, 78, '#0A0B10'); circ(c, wx, -40, 40, '#3A4058'); circ(c, wx, -40, 14, '#1C2030'); }
  fillRR(c, -470, -175, 40, 34, 10, o.lights ? '#FFF4D0' : '#8A8F98'); fillRR(c, 440, -180, 34, 40, 8, '#C21B2A');
  if (o.brake) { c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createRadialGradient(460, -160, 5, 460, -160, 140); g.addColorStop(0, 'rgba(255,40,40,.6)'); g.addColorStop(1, 'rgba(255,40,40,0)'); c.fillStyle = g; c.fillRect(320, -300, 300, 300); c.restore(); }
  c.restore(); }
// ulica nocą z chodnikiem (do scen z autem)
function nightStreet(c, lt, o = {}) { streetBg(c, lt, {}); snowfall(c, lt, 70, .7); c.fillStyle = '#3A3F4A'; c.fillRect(0, 1500, W, 50); c.fillStyle = '#1A1D24'; c.fillRect(0, 1550, W, 370); for (let i = 0; i < 6; i++) fillRR(c, ((i * 260 - (o.road || 0) * 1) % 1300 + 1300) % 1300 - 100, 1760, 140, 12, 4, 'rgba(230,230,210,.4)'); }
// zdjęcie Kuby zrobione z ukrycia (pod halą, nocą) z datownikiem
function photoKuba(c, x, y, w, h, stamp, ang = 0) { c.save(); c.translate(x, y); c.rotate(ang); fillRR(c, -w / 2 - 14, -h / 2 - 14, w + 28, h + 60, 4, '#F2EEE4');
  c.save(); c.beginPath(); c.rect(-w / 2, -h / 2, w, h); c.clip(); c.fillStyle = '#0E1322'; c.fillRect(-w / 2, -h / 2, w, h); const g = c.createRadialGradient(-w * .2, -h * .3, 5, -w * .2, -h * .1, w * .6); g.addColorStop(0, 'rgba(255,200,120,.45)'); g.addColorStop(1, 'rgba(255,200,120,0)'); c.fillStyle = g; c.fillRect(-w / 2, -h / 2, w, h);
  c.fillStyle = '#2A3350'; c.fillRect(-w / 2, h * .25, w, h * .25); person(c, 'kuba', w * .08, h * .42, h / 620, { t: 0, look: -1, duffel: true, still: true }); c.restore();
  txt(c, stamp, w / 2 - 8, h / 2 + 30, Math.max(16, h * .09), '#E8590C', 900, 'right'); c.restore(); }
// tylne siedzenie z bliska: zdjęcia Kuby rozłożone na kanapie
function backSeat(c, lt) { c.fillStyle = '#0B0D14'; c.fillRect(0, 0, W, H); fillRR(c, -40, 700, W + 80, 900, 80, '#22252E'); fillRR(c, 60, 360, 420, 420, 60, '#2A2D38'); fillRR(c, 600, 360, 420, 420, 60, '#2A2D38'); c.strokeStyle = 'rgba(0,0,0,.4)'; c.lineWidth = 6; for (let i = 0; i < 4; i++) { c.beginPath(); c.moveTo(0, 900 + i * 120); c.lineTo(W, 900 + i * 120); c.stroke(); }
  [['PN 21:47', 300, 980, -.2], ['ŚR 21:46', 640, 940, .12], ['PT 21:48', 470, 1260, -.05], ['PN 21:45', 820, 1250, .2]].forEach(([s, x, y, a], i) => photoKuba(c, x, y, 300, 220, s, a));
  c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createRadialGradient(560, 1100, 10, 560, 1100, 520); g.addColorStop(0, 'rgba(255,230,180,.18)'); g.addColorStop(1, 'rgba(255,230,180,0)'); c.fillStyle = g; c.fillRect(0, 500, W, 1200); c.restore(); }
// sklep całodobowy z zewnątrz
function shopFront(c, lt, o = {}) { nightStreet(c, lt); fillRR(c, 80, 560, 920, 960, 0, '#3A3F4A'); c.fillStyle = '#2E333D'; for (let r = 0; r < 14; r++) c.fillRect(80, 560 + r * 70, 920, 3);
  fillRR(c, 140, 600, 800, 120, 10, '#1E8449'); txt(c, 'SKLEP 24h', 540, 662, 72, '#FFFFFF', 900);
  fillRR(c, 140, 780, 500, 700, 6, '#F2E9C8'); for (let i = 0; i < 4; i++) { fillRR(c, 170, 830 + i * 150, 440, 14, 3, '#B9A47E'); for (let k = 0; k < 9; k++) fillRR(c, 180 + k * 48, 790 + i * 150, 36, 40, 4, ['#C0392B', '#2E86C1', '#F5C542', '#1E8449'][(k + i) % 4]); }
  fillRR(c, 680, 780, 240, 720, 6, '#C9D6DE'); c.fillStyle = 'rgba(255,255,255,.3)'; c.fillRect(780, 780, 6, 720); txt(c, '24h', 800, 900, 44, '#1E8449', 900);
  c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createRadialGradient(400, 1100, 20, 400, 1300, 700); g.addColorStop(0, 'rgba(255,240,190,.45)'); g.addColorStop(1, 'rgba(255,240,190,0)'); c.fillStyle = g; c.fillRect(0, 700, W, 1220); c.restore(); }
// domofon z ekranem: na ekranie mężczyzna z torbą Kuby
function intercom(c, lt, o = {}) { c.fillStyle = '#CFC6B0'; c.fillRect(0, 0, W, H); for (let x = 0; x < W; x += 60) { c.fillStyle = 'rgba(120,90,50,.08)'; c.fillRect(x, 0, 22, H); }
  fillRR(c, 170, 360, 740, 1220, 40, '#E8E4DA'); fillRR(c, 200, 390, 680, 1160, 30, '#2A2D36'); fillRR(c, 240, 430, 600, 760, 16, '#0A0D14');
  c.save(); c.beginPath(); rr(c, 240, 430, 600, 760, 16); c.clip(); c.fillStyle = '#1B2236'; c.fillRect(240, 430, 600, 760); c.fillStyle = '#2A3048'; c.fillRect(240, 980, 600, 210);
  person(c, 'kierowca', 560, 1340 + 120, 2.6, { t: lt, look: 0, mouth: o.mouth ?? 'grin', still: true });
  if (o.bag !== false) { fillRR(c, 300, 1050, 300, 150, 20, '#1E5AA8'); fillRR(c, 410, 1030, 80, 30, 10, '#123C70'); c.save(); c.translate(560, 1110); c.rotate(.1); fillRR(c, -60, -24, 120, 48, 8, '#F2EEE4'); txt(c, 'KUBA', 0, 2, 26, '#14161B', 900); c.restore(); }
  c.fillStyle = 'rgba(160,220,255,.1)'; c.fillRect(240, 430, 600, 760); c.fillStyle = 'rgba(255,255,255,.05)'; for (let y = 430; y < 1190; y += 6) c.fillRect(240, y, 600, 2); c.restore();
  txt(c, 'KAMERA · WEJŚCIE', 290, 465, 20, '#9AE6B4', 800, 'left'); if (Math.floor(lt * 2) % 2) circ(c, 810, 460, 9, '#FF3B30');
  fillRR(c, 260, 1240, 260, 120, 24, '#3A4058'); txt(c, '🔔', 390, 1300, 54, '#FFFFFF', 900); fillRR(c, 560, 1240, 260, 120, 24, o.pressGlow ? '#30A46C' : '#3A4058'); txt(c, '🔑 OTWÓRZ', 690, 1300, 32, '#FFFFFF', 900); }
// linie prędkości (bieg)
function speedLines(c, lt, a = .5) { c.strokeStyle = `rgba(255,255,255,${a})`; c.lineWidth = 4; for (let k = 0; k < 26; k++) { const y = hash(k) * H, x = ((hash(k + 5) * W + lt * 2400) % (W + 400)) - 200; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 160 + hash(k + 2) * 200, y); c.stroke(); } }
// wielka twarz z bliska (postać przeskalowana; głowa ok. y)
function faceClose(c, lt, kind, x, y, s, o = {}) { person(c, kind, x, y + 238 * s, s, Object.assign({ t: lt, still: true }, o)); }

KINDS.kasjerka = Object.assign({}, KINDS.kobieta, { jacket: '#1E8449', dark: '#176A3A', pants: '#1E8449', skin: '#F0C4A0' });
const P = (z1 = 1.08, d = 3) => push(1, z1, d);
// ---------- POSTACIE Z BLISKA (HD): szczegółowe twarze do zbliżeń ----------
// o.kind: kuba | kierowca | kasjerka | mama ; o.expr: neutral | fear | shock | smile | grin | cold | angry | talk ; o.look (-1..1), o.lookY, o.t, o.sweat, o.tears, o.dark
function faceHD(c, x, y, s, o = {}) { const t = o.t || 0, kd = o.kind || 'kuba', ex = o.expr || 'neutral'; c.save(); c.translate(x, y); c.scale(s, s);
  const SK = o.skin || { kuba: '#F3C3A0', kierowca: '#E2AE88', kasjerka: '#F0C4A0', mama: '#EFC09C', zosia: '#F6CDB0', policjant: '#E6B08A', babcia: '#F0C8B0', strazak: '#E2AE88', sasiad: '#D9A47E' }[kd], SKD = shade(SK, -.14);
  // tułów i ubranie
  const cloth = o.cloth || (o.home && kd === 'kuba' ? '#2F4A7A' : { kuba: '#5E7A3A', kierowca: '#5A3A28', kasjerka: '#1E8449', mama: '#D98CA8', zosia: '#B79CE0', policjant: '#1F2C4C', babcia: '#8A3A4A', strazak: '#1E2A40', sasiad: '#4A6A8A' }[kd]);
  if (!o.noBody) {
  c.fillStyle = cloth; c.beginPath(); c.moveTo(-430, 900); c.quadraticCurveTo(-420, 380, -150, 330); c.lineTo(150, 330); c.quadraticCurveTo(420, 380, 430, 900); c.fill();
  c.fillStyle = shade(cloth, -.18); c.beginPath(); c.moveTo(-430, 900); c.quadraticCurveTo(-410, 520, -260, 420); c.lineTo(-230, 900); c.fill();
  if (kd === 'kuba' && o.home) { c.fillStyle = 'rgba(255,255,255,.18)'; for (let k = 0; k < 6; k++) c.fillRect(-430, 420 + k * 80, 860, 26); fillRR(c, -90, 330, 180, 70, 30, '#24395E'); }
  if (kd === 'kuba' && !o.home) { c.strokeStyle = '#3E5426'; c.lineWidth = 6; c.beginPath(); c.moveTo(0, 360); c.lineTo(0, 900); c.stroke(); fillRR(c, -240, 440, 120, 100, 14, '#4E6830'); fillRR(c, 170, 420, 110, 64, 10, '#F5C542'); txt(c, '94', 225, 453, 40, '#14161B', 900);
    // szalik w paski
    for (let k = 0; k < 7; k++) { fillRR(c, -190 + k * 54, 300, 54, 110, 20, k % 2 ? '#F2EEE4' : '#1E9E8E'); } fillRR(c, 60, 360, 90, 260, 30, '#1E9E8E'); for (let k = 0; k < 4; k++) fillRR(c, 60, 400 + k * 56, 90, 22, 6, '#F2EEE4'); }
  if (kd === 'kierowca') { c.fillStyle = '#47301F'; c.beginPath(); c.moveTo(-170, 320); c.lineTo(-40, 520); c.lineTo(-120, 560); c.lineTo(-260, 380); c.fill(); c.beginPath(); c.moveTo(170, 320); c.lineTo(40, 520); c.lineTo(120, 560); c.lineTo(260, 380); c.fill(); fillRR(c, -60, 320, 120, 200, 10, '#2A2D36'); c.strokeStyle = 'rgba(255,255,255,.12)'; c.lineWidth = 4; for (let k = 0; k < 5; k++) { c.beginPath(); c.moveTo(-380 + k * 30, 600 + k * 50); c.lineTo(-300 + k * 30, 640 + k * 50); c.stroke(); } }
  if (kd === 'zosia') { for (let k = 0; k < 14; k++) txt(c, '★', -360 + (k % 7) * 120, 520 + Math.floor(k / 7) * 140, 50, 'rgba(255,240,180,.7)', 900); fillRR(c, -110, 330, 220, 60, 30, '#F2EEE4'); }
  if (kd === 'mama') { c.fillStyle = '#C47292'; c.beginPath(); c.moveTo(-170, 330); c.lineTo(0, 620); c.lineTo(170, 330); c.lineTo(110, 330); c.lineTo(0, 520); c.lineTo(-110, 330); c.fill(); }
  if (kd === 'policjant') { fillRR(c, -60, 330, 120, 260, 6, '#9BB0D0'); fillRR(c, -330, 520, 660, 90, 10, '#D8E84A'); fillRR(c, 140, 420, 170, 70, 8, '#F2EEE4'); txt(c, 'POLICJA', 225, 455, 30, '#1F2C4C', 900); }
  if (kd === 'kasjerka') { fillRR(c, -120, 330, 240, 80, 20, '#F2EEE4'); fillRR(c, 150, 420, 160, 60, 8, '#F2EEE4'); txt(c, 'KASA 1', 230, 452, 28, '#1E8449', 900); }
  // szyja
  fillRR(c, -70, 200, 140, 160, 40, SKD);
  }
  // włosy z tyłu (mama, kasjerka)
  if (kd === 'mama') { c.fillStyle = '#3B2A22'; c.beginPath(); c.ellipse(0, -20, 300, 340, 0, 0, 7); c.fill(); fillRR(c, -300, -20, 600, 420, 120, '#3B2A22'); }
  if (kd === 'kasjerka') { c.fillStyle = '#5A3A26'; circ(c, 0, -300, 90, '#5A3A26'); c.beginPath(); c.ellipse(0, -40, 280, 300, 0, 0, 7); c.fill(); }
  // uszy
  for (const sx of [-1, 1]) { ell(c, sx * 255, 20, 40, 62, SK); ell(c, sx * 258, 22, 20, 34, SKD); }
  // głowa z cieniowaniem
  const g = c.createRadialGradient(-80, -100, 40, 0, 0, 320); g.addColorStop(0, shade(SK, .06)); g.addColorStop(1, SKD); c.fillStyle = g; c.beginPath(); c.ellipse(0, 0, 250, 285, 0, 0, 7); c.fill();
  // zarost i zmarszczki (kierowca)
  if (kd === 'kierowca') { for (let k = 0; k < 160; k++) { const a = Math.PI * (.12 + .76 * hash(k)), r = 150 + hash(k + 9) * 110; circ(c, Math.cos(a) * r * .95, 40 + Math.sin(a) * r * .9, 3.2, 'rgba(70,50,40,.45)'); }
    c.strokeStyle = 'rgba(120,70,50,.35)'; c.lineWidth = 5; for (let k = 0; k < 3; k++) { c.beginPath(); c.moveTo(-110, -170 - k * 26); c.quadraticCurveTo(0, -182 - k * 26, 110, -170 - k * 26); c.stroke(); } }
  if (o.creepy) { for (const sx of [-1, 1]) { const g2 = c.createRadialGradient(sx * 100, -20, 20, sx * 100, -20, 110); g2.addColorStop(0, 'rgba(60,20,30,.55)'); g2.addColorStop(1, 'rgba(60,20,30,0)'); c.fillStyle = g2; c.fillRect(sx * 100 - 120, -140, 240, 240); const g3 = c.createRadialGradient(sx * 150, 120, 10, sx * 150, 120, 110); g3.addColorStop(0, 'rgba(70,50,50,.35)'); g3.addColorStop(1, 'rgba(70,50,50,0)'); c.fillStyle = g3; c.fillRect(sx * 150 - 120, 0, 240, 240); }
    c.strokeStyle = 'rgba(90,50,40,.45)'; c.lineWidth = 5; for (let k = 0; k < 5; k++) { c.beginPath(); c.moveTo(-150, -150 - k * 24); c.quadraticCurveTo(0, -165 - k * 24, 150, -150 - k * 24); c.stroke(); } for (const sx of [-1, 1]) { c.beginPath(); c.moveTo(sx * 60, 80); c.quadraticCurveTo(sx * 110, 170, sx * 90, 230); c.stroke(); c.beginPath(); c.moveTo(sx * 190, -40); c.lineTo(sx * 225, -20); c.moveTo(sx * 190, -15); c.lineTo(sx * 222, 0); c.stroke(); } }
  // policzki, piegi
  if (!o.creepy) { ell(c, -150, 90, 52, 34, 'rgba(235,110,110,.28)'); ell(c, 150, 90, 52, 34, 'rgba(235,110,110,.28)'); }
  if (kd === 'kuba') for (let k = 0; k < 14; k++) circ(c, (k % 2 ? 1 : -1) * (120 + hash(k) * 70), 50 + hash(k + 3) * 70, 5, 'rgba(160,90,60,.55)');
  // oczy
  const lx = (o.look || 0) * 14, ly = (o.lookY || 0) * 10 + (ex === 'fear' ? -2 : 0); const wide = ex === 'shock' || ex === 'fear'; const blink = !o.noBlink && (t % 4) > 3.85;
  for (const sx of [-1, 1]) { const ex0 = sx * 100, ey0 = -20; c.save();
    if (kd === 'kierowca') { c.fillStyle = 'rgba(80,50,60,.35)'; c.beginPath(); c.ellipse(ex0, ey0 + 34, 62, 30, 0, 0, Math.PI); c.fill(); }
    const rw = wide ? 60 : 52, rh = blink ? 4 : wide ? 56 : (ex === 'cold' ? 28 : ex === 'grin' ? 34 : 44);
    c.beginPath(); c.ellipse(ex0, ey0, rw, rh, 0, 0, 7); c.fillStyle = '#FBFAF6'; c.fill(); c.clip();
    if (o.blood) { c.strokeStyle = 'rgba(200,40,40,.55)'; c.lineWidth = 3; for (let k = 0; k < 6; k++) { c.beginPath(); c.moveTo(ex0 + sx * 60, ey0 + (k - 3) * 12); c.quadraticCurveTo(ex0 + sx * 30, ey0 + (k - 3) * 6, ex0 + sx * 18, ey0 + (k - 3) * 3); c.stroke(); } }
    const ir = wide ? 20 : 24, ic = { kuba: '#5A3A22', kierowca: '#6A7A8A', kasjerka: '#4A6A3A', mama: '#5A3A22' }[kd];
    circ(c, ex0 + lx, ey0 + ly, ir, ic); circ(c, ex0 + lx, ey0 + ly, wide ? 9 : 12, '#0B0C10'); circ(c, ex0 + lx - 7, ey0 + ly - 8, 6, '#FFFFFF');
    c.restore(); c.strokeStyle = o.creepy ? 'rgba(170,40,50,.8)' : 'rgba(40,25,20,.6)'; c.lineWidth = o.creepy ? 8 : 5; c.beginPath(); c.ellipse(ex0, ey0, rw, rh, 0, o.creepy ? 0 : Math.PI * 1.05, o.creepy ? 7 : Math.PI * 1.95); c.stroke();
    if (ex === 'cold' || ex === 'grin') { c.fillStyle = SK; c.beginPath(); c.ellipse(ex0, ey0 - rh * .6, rw + 4, rh * .7, 0, Math.PI, 0); c.fill(); c.strokeStyle = 'rgba(40,25,20,.7)'; c.beginPath(); c.moveTo(ex0 - rw, ey0 - rh * .55); c.lineTo(ex0 + rw, ey0 - rh * .55); c.stroke(); } }
  // brwi
  const brow = { neutral: [0, 0], fear: [.32, -10], shock: [.1, -26], smile: [-.1, -6], grin: [-.25, 4], cold: [-.3, 10], angry: [-.42, 8], talk: [0, 0] }[ex] || [0, 0];
  const bc = { kuba: '#6A4A2A', kierowca: '#2A1E18', kasjerka: '#5A3A26', mama: '#3B2A22', zosia: '#7A5030', policjant: '#3A2A1E', babcia: '#B8B8B8', strazak: '#3A2A1E', sasiad: o.hair || '#2A1E18' }[kd];
  for (const sx of [-1, 1]) { c.save(); c.translate(sx * 100, -100 + brow[1]); c.rotate(sx * brow[0]); fillRR(c, -56, -11, 112, 22, 11, bc); c.restore(); }
  // nos
  c.fillStyle = shade(SK, -.2); c.beginPath(); c.ellipse(0, 60, 30, 22, 0, 0, Math.PI); c.fill(); circ(c, -12, 66, 5, 'rgba(60,30,20,.4)'); circ(c, 12, 66, 5, 'rgba(60,30,20,.4)');
  // usta
  const talkO = (o.talk ? Math.abs(Math.sin(t * 14)) : 0);
  c.save(); c.translate(0, 150);
  if (ex === 'shock' || ex === 'fear' && !o.talk) { const h = ex === 'shock' ? 56 : 34; c.fillStyle = '#5A1E1E'; c.beginPath(); c.ellipse(0, 0, ex === 'shock' ? 40 : 46, h, 0, 0, 7); c.fill(); c.fillStyle = '#C0505A'; c.beginPath(); c.ellipse(0, h * .5, 26, h * .35, 0, 0, 7); c.fill(); }
  else if (ex === 'grin') { c.fillStyle = '#3A1414'; c.beginPath(); c.moveTo(-130, -20); c.quadraticCurveTo(0, 90, 130, -20); c.quadraticCurveTo(0, 30, -130, -20); c.fill(); c.fillStyle = '#F6F2E6'; c.beginPath(); c.moveTo(-118, -14); c.quadraticCurveTo(0, 70, 118, -14); c.quadraticCurveTo(0, 18, -118, -14); c.fill(); c.strokeStyle = 'rgba(80,60,50,.5)'; c.lineWidth = 3; for (let k = -5; k <= 5; k++) { c.beginPath(); c.moveTo(k * 20, 8 - Math.abs(k) * 2); c.lineTo(k * 20, 40 - Math.abs(k) * 5); c.stroke(); } c.strokeStyle = 'rgba(60,30,25,.8)'; c.lineWidth = 6; c.beginPath(); c.moveTo(-140, -26); c.quadraticCurveTo(-135, -10, -122, -12); c.moveTo(140, -26); c.quadraticCurveTo(135, -10, 122, -12); c.stroke(); }
  else if (ex === 'smile') { c.strokeStyle = '#7A2A2A'; c.lineWidth = 9; c.lineCap = 'round'; c.beginPath(); c.moveTo(-70, -10); c.quadraticCurveTo(0, 40 + talkO * 10, 70, -10); c.stroke(); }
  else if (ex === 'angry') { c.fillStyle = '#5A1E1E'; fillRR(c, -60, -14, 120, 30 + talkO * 26, 14, '#5A1E1E'); fillRR(c, -54, -12, 108, 12, 4, '#F6F2E6'); }
  else { if (o.talk) { c.fillStyle = '#5A1E1E'; c.beginPath(); c.ellipse(0, 0, 44, 8 + talkO * 30, 0, 0, 7); c.fill(); } else { c.strokeStyle = '#7A2A2A'; c.lineWidth = 8; c.lineCap = 'round'; c.beginPath(); c.moveTo(-50, 0); c.quadraticCurveTo(0, ex === 'cold' ? 2 : 8, 50, 0); c.stroke(); } }
  c.restore();
  // pot, łzy
  if (o.sweat) { c.fillStyle = 'rgba(180,220,255,.8)'; c.beginPath(); const sy = -120 + ((t * 60) % 140); c.moveTo(200, sy); c.quadraticCurveTo(220, sy + 30, 200, sy + 40); c.quadraticCurveTo(180, sy + 30, 200, sy); c.fill(); }
  if (o.tears) { c.fillStyle = 'rgba(160,210,255,.75)'; for (const sx of [-1, 1]) fillRR(c, sx * 100 - 8, 30, 16, 60 + (t * 40 % 60), 8, 'rgba(160,210,255,.7)'); }
  // włosy / czapka
  if (kd === 'kuba' && o.home) { c.fillStyle = '#6A4A2A'; c.beginPath(); c.moveTo(-255, -40); c.quadraticCurveTo(-260, -300, 0, -305); c.quadraticCurveTo(260, -300, 255, -40); c.quadraticCurveTo(200, -150, 120, -170); for (let k = 0; k < 7; k++) { const xx = 120 - k * 40; c.lineTo(xx - 20, -260 + (k % 2) * 50); c.lineTo(xx - 40, -175); } c.quadraticCurveTo(-200, -150, -255, -40); c.fill(); for (let k = 0; k < 5; k++) { c.beginPath(); c.moveTo(-120 + k * 60, -290); c.lineTo(-100 + k * 60, -360 + (k % 2) * 20); c.lineTo(-80 + k * 60, -290); c.fill(); } }
  if (kd === 'zosia') { c.fillStyle = '#7A5030'; c.beginPath(); c.moveTo(-255, -20); c.quadraticCurveTo(-260, -300, 0, -300); c.quadraticCurveTo(260, -300, 255, -20); c.quadraticCurveTo(140, -210, 0, -200); c.quadraticCurveTo(-140, -210, -255, -20); c.fill(); for (const sx of [-1, 1]) { c.beginPath(); c.ellipse(sx * 300, 40, 70, 150, sx * .2, 0, 7); c.fill(); c.save(); c.translate(sx * 270, -110); fillRR(c, -50, -24, 100, 48, 24, '#FF6B9A'); circ(c, 0, 0, 20, '#E0507A'); c.restore(); } }
  if (kd === 'policjant') { fillRR(c, -230, -150, 460, 60, 16, '#16203A'); c.fillStyle = '#1F2C4C'; c.beginPath(); c.moveTo(-270, -150); c.quadraticCurveTo(-240, -330, 0, -340); c.quadraticCurveTo(240, -330, 270, -150); c.fill(); fillRR(c, -280, -165, 560, 30, 12, '#2A3A5E'); circ(c, 0, -240, 34, '#F5C542'); txt(c, '★', 0, -237, 40, '#7A5A20', 900); }
  if (kd === 'babcia') { c.fillStyle = '#D8D8D8'; c.beginPath(); c.moveTo(-255, -30); c.quadraticCurveTo(-260, -300, 0, -300); c.quadraticCurveTo(260, -300, 255, -30); c.quadraticCurveTo(170, -200, 0, -190); c.quadraticCurveTo(-170, -200, -255, -30); c.fill(); circ(c, 0, -330, 80, '#D0D0D0'); for (let k = 0; k < 6; k++) { c.strokeStyle = 'rgba(150,150,150,.6)'; c.lineWidth = 4; c.beginPath(); c.arc(0, -330, 30 + k * 8, k, k + 2); c.stroke(); }
    c.strokeStyle = '#7A5A3A'; c.lineWidth = 9; for (const sx of [-1, 1]) { c.beginPath(); c.arc(sx * 100, -20, 70, 0, 7); c.stroke(); } c.beginPath(); c.moveTo(-30, -24); c.lineTo(30, -24); c.stroke(); c.strokeStyle = 'rgba(120,70,50,.3)'; c.lineWidth = 4; for (const sx of [-1, 1]) for (let k = 0; k < 3; k++) { c.beginPath(); c.moveTo(sx * 175, -40 + k * 18); c.lineTo(sx * 215, -50 + k * 18); c.stroke(); } }
  if (kd === 'strazak') { c.fillStyle = '#F5C542'; c.beginPath(); c.ellipse(0, -170, 300, 200, 0, Math.PI, 0); c.fill(); fillRR(c, -320, -190, 640, 50, 20, '#D9A82A'); c.fillStyle = '#C21B2A'; fillRR(c, -40, -360, 80, 180, 20, '#E8B83A'); fillRR(c, -120, -300, 240, 60, 10, '#C21B2A'); txt(c, 'PSP', 0, -268, 44, '#FFFFFF', 900); if (o.mask) { fillRR(c, -150, 60, 300, 200, 80, '#2A2D36'); circ(c, 0, 170, 50, '#4A4F58'); } }
  if (kd === 'sasiad') { c.fillStyle = o.hair || '#2A1E18'; c.beginPath(); c.moveTo(-252, -60); c.quadraticCurveTo(-260, -300, 0, -300); c.quadraticCurveTo(260, -300, 252, -60); c.quadraticCurveTo(160, -210, 0, -205); c.quadraticCurveTo(-160, -210, -252, -60); c.fill(); if (o.cap) { fillRR(c, -270, -250, 540, 140, 60, o.cap); } }
  if (kd === 'kuba' && !o.home) { c.fillStyle = '#6A4A2A'; for (let k = 0; k < 6; k++) { c.beginPath(); c.moveTo(-200 + k * 70, -170); c.lineTo(-170 + k * 70, -110); c.lineTo(-140 + k * 70, -170); c.fill(); }
    c.fillStyle = '#F2A51E'; c.beginPath(); c.ellipse(0, -190, 270, 190, 0, Math.PI, 0); c.fill(); fillRR(c, -280, -230, 560, 90, 40, '#D98E12'); c.strokeStyle = 'rgba(160,100,10,.5)'; c.lineWidth = 6; for (let k = -6; k <= 6; k++) { c.beginPath(); c.moveTo(k * 40, -226); c.lineTo(k * 40, -146); c.stroke(); } circ(c, 0, -390, 64, '#F5C542'); for (let k = 0; k < 10; k++) circ(c, Math.cos(k) * 40, -390 + Math.sin(k * 1.7) * 40, 14, '#E8B13A'); }
  if (kd === 'kierowca' && o.bald) { c.fillStyle = 'rgba(255,255,255,.12)'; c.beginPath(); c.ellipse(-60, -200, 110, 40, -.3, 0, 7); c.fill(); c.strokeStyle = 'rgba(120,70,50,.35)'; c.lineWidth = 5; c.beginPath(); c.moveTo(80, -150); c.lineTo(150, -60); c.stroke(); }
  if (kd === 'kierowca' && !o.bald) { c.fillStyle = '#2A1E18'; c.beginPath(); c.moveTo(-250, -60); c.quadraticCurveTo(-270, -300, 0, -300); c.quadraticCurveTo(250, -300, 255, -80); c.quadraticCurveTo(200, -210, 40, -200); c.quadraticCurveTo(-120, -230, -250, -60); c.fill(); c.fillStyle = 'rgba(255,255,255,.08)'; c.beginPath(); c.ellipse(-60, -250, 120, 22, -.2, 0, 7); c.fill(); }
  if (kd === 'kasjerka') { c.fillStyle = '#5A3A26'; c.beginPath(); c.moveTo(-255, -40); c.quadraticCurveTo(-250, -290, 0, -295); c.quadraticCurveTo(250, -290, 255, -40); c.quadraticCurveTo(160, -200, 0, -190); c.quadraticCurveTo(-160, -200, -255, -40); c.fill(); }
  if (kd === 'mama') { c.fillStyle = '#3B2A22'; c.beginPath(); c.moveTo(-260, 0); c.quadraticCurveTo(-250, -300, 0, -300); c.quadraticCurveTo(250, -300, 260, 0); c.quadraticCurveTo(170, -190, 0, -200); c.quadraticCurveTo(-170, -190, -260, 0); c.fill(); }
  if (o.dark) { c.fillStyle = `rgba(4,5,10,${o.dark})`; c.fillRect(-600, -700, 1200, 1700); }
  c.restore(); }
// czerwony celownik z podpisem (jak oznaczenie dowodu)
function target(c, lt, x, y, w, h, lab, t0 = 0) { if (lt < t0) return; const p = eout(clamp((lt - t0) / .25)); const k = 1.4 - .4 * p; c.save(); c.translate(x, y); c.scale(k, k); c.globalAlpha = p; c.strokeStyle = '#FF2A35'; c.lineWidth = 7; const L = Math.min(w, h) * .28;
  for (const [sx, sy] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) { c.beginPath(); c.moveTo(sx * w / 2, sy * h / 2 - sy * L); c.lineTo(sx * w / 2, sy * h / 2); c.lineTo(sx * w / 2 - sx * L, sy * h / 2); c.stroke(); }
  c.lineWidth = 3; c.beginPath(); c.moveTo(-16, 0); c.lineTo(16, 0); c.moveTo(0, -16); c.lineTo(0, 16); c.stroke();
  if (lab) { c.font = '900 40px ' + FONT; const tw = c.measureText(lab).width + 30; fillRR(c, -tw / 2, h / 2 + 16, tw, 56, 6, 'rgba(120,0,10,.85)'); c.strokeStyle = '#FF2A35'; c.lineWidth = 3; rr(c, -tw / 2, h / 2 + 16, tw, 56, 6); c.stroke(); txt(c, lab, 0, h / 2 + 45, 34, '#FF5A62', 900); } c.restore(); }
// czerwona przekrzywiona etykieta „ZASADA #n”
function ruleTag(c, lt, n, t0 = 0, x = 540, y = 470) { if (lt < t0) return; const p = back(clamp((lt - t0) / .3)); c.save(); c.translate(x, y); c.rotate(-.06); c.scale(p, p); fillRR(c, -170, -42, 340, 84, 10, '#D7263D'); c.strokeStyle = '#FFFFFF'; c.lineWidth = 4; rr(c, -160, -32, 320, 64, 6); c.stroke(); txt(c, 'ZASADA #' + n, 0, 3, 46, '#FFFFFF', 900); c.restore(); }
const FACE = (kd, ex, o = {}) => (c, lt) => { const bg = o.bg || '#0E1220'; c.fillStyle = bg; c.fillRect(0, 0, W, H); if (o.scene) o.scene(c, lt); faceHD(c, 540, o.y || 900, o.s || 1.25, Object.assign({ kind: kd, expr: ex, t: lt }, o)); if (o.night !== false) night(c, o.n ?? .3, [{ x: 540, y: o.y || 900, r: 640, a: .9 }]); };

// ---------- POSTAĆ HD w całości (duża głowa, ubranie ze wzorem) ----------
// y = stopy; s = skala (s=1 → ok. 1000 px wysokości). o: kind, expr, home, look, talk, walk, arms ('down'|'up'|'phone'|'reach'|'hold'), item ('teddy'|'phone'|'flash')
function personHD(c, x, y, s, o = {}) { const kd = o.kind || 'kuba', t = o.t || 0; c.save(); c.translate(x, y); c.scale(s, s); if (o.flip) c.scale(-1, 1);
  const cloth = o.cloth || (o.home && kd === 'kuba' ? '#2F4A7A' : { kuba: '#5E7A3A', kierowca: '#5A3A28', mama: '#D98CA8', zosia: '#B79CE0', policjant: '#1F2C4C', kasjerka: '#1E8449', babcia: '#8A3A4A', strazak: '#1E2A40', sasiad: '#4A6A8A' }[kd]);
  const pants = o.pants || (o.home && kd === 'kuba' ? '#2F4A7A' : { kuba: '#2F3A52', kierowca: '#22252B', mama: '#D98CA8', zosia: '#B79CE0', policjant: '#16203A', kasjerka: '#2A2D36', babcia: '#5A4A5A', strazak: '#1E2A40', sasiad: '#2A2D36' }[kd]);
  const SK = o.skin || { kuba: '#F3C3A0', kierowca: '#E2AE88', kasjerka: '#F0C4A0', mama: '#EFC09C', zosia: '#F6CDB0', policjant: '#E6B08A', babcia: '#F0C8B0', strazak: '#E2AE88', sasiad: '#D9A47E' }[kd];
  const wk = o.walk != null ? Math.sin(o.walk) : 0, bob = o.walk != null ? Math.abs(Math.cos(o.walk)) * 10 : Math.sin(t * 2) * 3; const small = kd === 'zosia' ? .8 : 1;
  c.scale(small, small);
  ell(c, 0, 0, 170, 22, 'rgba(0,0,0,.35)');
  // nogi + kapcie/buty
  for (const [sx, ph] of [[-1, wk], [1, -wk]]) { c.save(); c.translate(sx * 60, -330); c.rotate(ph * .35); fillRR(c, -48, 0, 96, 300, 40, pants); if (o.home && kd === 'kuba') { c.fillStyle = 'rgba(255,255,255,.18)'; for (let k = 0; k < 4; k++) c.fillRect(-48, 40 + k * 70, 96, 20); } fillRR(c, -60, 280, 130, 60, 30, o.home || kd === 'zosia' || kd === 'mama' ? '#E8DCC8' : '#14161B'); c.restore(); }
  // tułów
  c.translate(0, -bob); const ty = -720, th = 420; const g = c.createLinearGradient(-170, 0, 170, 0); g.addColorStop(0, shade(cloth, .08)); g.addColorStop(1, shade(cloth, -.15)); c.fillStyle = g; c.beginPath(); c.moveTo(-170, ty + 80); c.quadraticCurveTo(-170, ty, -90, ty); c.lineTo(90, ty); c.quadraticCurveTo(170, ty, 170, ty + 80); c.lineTo(kd === 'mama' || kd === 'zosia' ? 210 : 160, ty + th + (kd === 'mama' || kd === 'zosia' ? 90 : 0)); c.lineTo(kd === 'mama' || kd === 'zosia' ? -210 : -160, ty + th + (kd === 'mama' || kd === 'zosia' ? 90 : 0)); c.closePath(); c.fill();
  c.save(); c.clip(); if (o.home && kd === 'kuba') { c.fillStyle = 'rgba(255,255,255,.18)'; for (let k = 0; k < 6; k++) c.fillRect(-200, ty + 40 + k * 70, 400, 22); }
  if (kd === 'zosia') for (let k = 0; k < 10; k++) txt(c, '★', -150 + (k % 4) * 100, ty + 80 + Math.floor(k / 4) * 120, 44, 'rgba(255,240,180,.75)', 900);
  if (kd === 'mama') { c.fillStyle = '#C47292'; c.beginPath(); c.moveTo(-90, ty); c.lineTo(20, ty + 300); c.lineTo(60, ty + 300); c.lineTo(-30, ty); c.fill(); fillRR(c, -180, ty + 250, 360, 40, 10, '#C47292'); }
  if (kd === 'policjant') { fillRR(c, -170, ty + 210, 340, 70, 0, '#D8E84A'); fillRR(c, 40, ty + 90, 110, 50, 6, '#F2EEE4'); txt(c, 'POLICJA', 95, ty + 115, 20, '#1F2C4C', 900); }
  if (kd === 'kierowca') { c.strokeStyle = 'rgba(0,0,0,.35)'; c.lineWidth = 6; c.beginPath(); c.moveTo(0, ty); c.lineTo(0, ty + th); c.stroke(); }
  if (kd === 'strazak') { for (const yy of [ty + 200, ty + 300]) fillRR(c, -170, yy, 340, 30, 0, '#D8E84A'); fillRR(c, -170, ty + 214, 340, 6, 0, '#C9CDD2'); }
  if (kd === 'babcia') { for (let k = 0; k < 5; k++) circ(c, 0, ty + 60 + k * 70, 10, '#E8D8B0'); c.strokeStyle = 'rgba(255,255,255,.12)'; c.lineWidth = 6; for (let k = 0; k < 8; k++) { c.beginPath(); c.moveTo(-170 + k * 45, ty); c.lineTo(-170 + k * 45, ty + th + 90); c.stroke(); } }
  if (o.vest) { fillRR(c, -170, ty + 30, 340, 340, 20, '#F2C200'); fillRR(c, -170, ty + 200, 340, 30, 0, '#C9CDD2'); fillRR(c, -120, ty + 90, 240, 70, 8, '#F2EEE4'); txt(c, o.vest, 0, ty + 125, 26, '#14161B', 900); }
  c.restore();
  // ręce
  const arm = (sx, ang, len = 300) => { c.save(); c.translate(sx * 160, ty + 60); c.rotate(ang); fillRR(c, -42, 0, 84, len, 40, shade(cloth, -.05)); if (o.home && kd === 'kuba') { c.fillStyle = 'rgba(255,255,255,.18)'; for (let k = 0; k < 4; k++) c.fillRect(-42, 40 + k * 66, 84, 18); } circ(c, 0, len + 10, 44, SK); c.restore(); };
  const A = o.arms || 'down', sw = o.walk != null ? Math.sin(o.walk) * .4 : 0;
  if (A === 'up') { arm(-1, 2.6); arm(1, -2.6); } else if (A === 'reach') { arm(-1, sw * .3); arm(1, -1.3, 320); } else if (A === 'hold' || A === 'phone') { arm(-1, .1 + sw * .3); arm(1, -2.3, 240); } else { arm(-1, .12 + sw); arm(1, -.12 - sw); }
  // głowa (faceHD bez tułowia)
  faceHD(c, 0, ty - 150, .62, Object.assign({}, o, { noBody: true }));
  // rekwizyty
  if (o.item === 'teddy') { c.save(); c.translate(-140, ty + 260); circ(c, 0, 0, 80, '#B0773A'); circ(c, 0, -100, 64, '#B0773A'); circ(c, -48, -150, 24, '#B0773A'); circ(c, 48, -150, 24, '#B0773A'); circ(c, -22, -108, 8, '#14161B'); circ(c, 22, -108, 8, '#14161B'); ell(c, 0, -84, 20, 14, '#E8C79A'); c.restore(); }
  if (o.item === 'phone' || A === 'phone') { c.save(); c.translate(160 + Math.sin(-2.3) * -240 * 0 + 120, ty - 40); fillRR(c, -36, -64, 72, 128, 12, '#14161B'); fillRR(c, -30, -58, 60, 116, 8, '#5FD0FF'); c.restore(); }
  if (o.item === 'flash') { c.save(); c.translate(320, ty + 80); fillRR(c, -20, -60, 40, 120, 10, '#14161B'); c.globalCompositeOperation = 'lighter'; const lg = c.createRadialGradient(0, -60, 5, 0, -500, 500); lg.addColorStop(0, 'rgba(255,250,220,.6)'); lg.addColorStop(1, 'rgba(255,250,220,0)'); c.fillStyle = lg; c.beginPath(); c.moveTo(-14, -60); c.lineTo(-300, -900); c.lineTo(300, -900); c.lineTo(14, -60); c.fill(); c.restore(); }
  c.restore(); }
// łazienka w bloku: kafelki, wanna, umywalka, lustro, pralka, drzwi z zamkiem i szparą światła
function homeBath(c, lt, o = {}) { c.fillStyle = '#D9E4E8'; c.fillRect(0, 0, W, 1450); for (let r = 0; r < 26; r++) for (let q = 0; q < 14; q++) { c.strokeStyle = 'rgba(110,130,140,.25)'; c.lineWidth = 2; c.strokeRect(q * 80, r * 56, 80, 56); } c.fillStyle = '#5A8AA0'; c.fillRect(0, 760, W, 16);
  fillRR(c, 40, 980, 560, 440, 40, '#F2F2EE'); fillRR(c, 60, 1000, 520, 80, 30, '#DDE6EA'); fillRR(c, 460, 860, 20, 140, 8, '#C9CDD2');
  fillRR(c, 700, 380, 260, 330, 14, '#B8CAD4'); c.fillStyle = 'rgba(255,255,255,.3)'; c.beginPath(); c.moveTo(720, 400); c.lineTo(800, 400); c.lineTo(720, 520); c.fill(); fillRR(c, 680, 900, 300, 80, 30, '#F2F2EE'); fillRR(c, 810, 850, 20, 60, 6, '#C9CDD2'); fillRR(c, 700, 980, 260, 440, 10, '#E8E8E4'); circ(c, 830, 1180, 90, '#9AA6AE'); circ(c, 830, 1180, 70, '#3A4A5A');
  fillRR(c, 300, 300, 30, 160, 6, '#C9CDD2'); for (let k = 0; k < 3; k++) fillRR(c, 260, 330 + k * 40, 110, 26, 6, ['#FF8A8A', '#8AC8FF', '#FFD86A'][k]);
  c.fillStyle = '#B9C4C8'; c.fillRect(0, 1450, W, 470); for (let r = 0; r < 8; r++) for (let q = 0; q < 14; q++) { c.strokeStyle = 'rgba(80,90,100,.25)'; c.strokeRect(q * 80 + (r % 2) * 40, 1450 + r * 60, 80, 60); }
  if (o.dark) { c.fillStyle = `rgba(2,3,8,${o.dark})`; c.fillRect(0, 0, W, H); } }
// drzwi łazienki od środka (z bliska): zamek, szpara pod drzwiami ze światłem i cieniem stóp
function bathDoor(c, lt, o = {}) { c.fillStyle = '#D9E4E8'; c.fillRect(0, 0, W, H); fillRR(c, 180, 120, 720, 1500, 6, '#EDE7DA'); c.strokeStyle = 'rgba(0,0,0,.15)'; c.lineWidth = 6; c.strokeRect(240, 200, 600, 560); c.strokeRect(240, 840, 600, 680);
  fillRR(c, 760, 860, 50, 110, 10, '#C9CDD2'); fillRR(c, 700, 960, 130, 24, 10, '#C9CDD2'); circ(c, 785, 1040, 22, '#9AA2AB'); c.save(); c.translate(785, 1040); c.rotate(o.locked ? Math.PI / 2 : 0); fillRR(c, -6, -18, 12, 36, 4, '#5A5E66'); c.restore();
  const gl = o.gap ?? 1; c.fillStyle = `rgba(255,220,150,${.8 * gl})`; c.fillRect(180, 1620, 720, 20); if (o.feet) { fillRR(c, 400, 1620, 90, 20, 4, 'rgba(10,8,12,.95)'); fillRR(c, 560, 1620, 90, 20, 4, 'rgba(10,8,12,.95)'); }
  c.fillStyle = '#B9C4C8'; c.fillRect(0, 1640, W, 280); if (o.dark) { c.fillStyle = `rgba(2,3,8,${o.dark})`; c.fillRect(0, 0, W, H); if (o.feet || gl > 0) { c.fillStyle = `rgba(255,220,150,${.8 * gl})`; c.fillRect(180, 1620, 720, 20); if (o.feet) { fillRR(c, 400, 1620, 90, 20, 4, 'rgba(10,8,12,1)'); fillRR(c, 560, 1620, 90, 20, 4, 'rgba(10,8,12,1)'); } } } }
// sypialnia mamy: łóżko, szafka, lampka, zasłony
function momRoom(c, lt, o = {}) { c.fillStyle = '#3A3550'; c.fillRect(0, 0, W, 1420); for (let x = 0; x < W; x += 90) { c.fillStyle = 'rgba(255,255,255,.03)'; c.fillRect(x, 0, 40, 1420); } fillRR(c, 600, 200, 380, 520, 8, '#1B2236'); c.fillStyle = '#7A4A6A'; c.fillRect(560, 180, 90, 580); c.fillRect(930, 180, 90, 580); for (let k = 0; k < 20; k++) circ(c, 620 + hash(k) * 340, 220 + hash(k + 4) * 480, 3, 'rgba(255,255,255,.7)');
  fillRR(c, 80, 1100, 900, 360, 30, '#8A6A50'); fillRR(c, 100, 1060, 860, 220, 40, '#E8DCC8'); fillRR(c, 120, 1020, 260, 120, 40, '#F2EEE4'); fillRR(c, 360, 1110, 600, 260, 40, '#C47292');
  fillRR(c, 40, 900, 160, 200, 10, '#6A4A30'); fillRR(c, 80, 820, 80, 80, 30, '#F5D58A'); if (o.lamp) { c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createRadialGradient(120, 850, 10, 120, 850, 600); g.addColorStop(0, 'rgba(255,220,150,.45)'); g.addColorStop(1, 'rgba(255,220,150,0)'); c.fillStyle = g; c.fillRect(0, 300, W, 1200); c.restore(); }
  c.fillStyle = '#2A2438'; c.fillRect(0, 1420, W, 500); }
// klawiatura telefonu z numerem (z bliska, w dłoni)
function dialPad(c, lt, num, o = {}) { c.fillStyle = '#0B0D14'; c.fillRect(0, 0, W, H); if (o.bg) o.bg(c); c.save(); c.translate(540, 980); c.rotate(-.04); fillRR(c, -330, -600, 660, 1200, 80, '#16171C'); fillRR(c, -306, -576, 612, 1152, 60, '#0E1018');
  txt(c, o.time || '23:33', -230, -520, 30, '#FFFFFF', 800); txt(c, num, 0, -380, 110, '#FFFFFF', 700); if (o.sub) txt(c, o.sub, 0, -280, 34, o.subCol || '#30D158', 800);
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#']; keys.forEach((k, i) => { const kx = -190 + (i % 3) * 190, ky = -150 + Math.floor(i / 3) * 170; const hot = o.hot && o.hot.includes(k) && Math.floor(lt * 4) % 2 === 0; circ(c, kx, ky, 70, hot ? '#5A6070' : '#2A2D36'); txt(c, k, kx, ky + 2, 56, '#FFFFFF', 700); });
  circ(c, 0, 520, 70, o.endCall ? '#FF3B30' : '#30D158'); txt(c, '📞', 0, 522, 54, '#FFFFFF', 900); c.restore(); hand(c, 900, 1560, 1.15, o.hk || KINDS.kobieta); }
const D = (fn) => fn;

// ===== rekwizyty i tła pełnego odcinka =====
const NIGHT = (c, a = .5, x = 540, y = 1100, r = 640) => night(c, a, [{ x, y, r, a: .9 }]);
// latarka telefonu (stożek światła)
function flashCone(c, x, y, ang = -Math.PI / 2, a = .5) { c.save(); c.globalCompositeOperation = 'lighter'; c.translate(x, y); c.rotate(ang + Math.PI / 2); const g = c.createRadialGradient(0, 0, 10, 0, -500, 700); g.addColorStop(0, `rgba(255,250,225,${a})`); g.addColorStop(1, 'rgba(255,250,225,0)'); c.fillStyle = g; c.beginPath(); c.moveTo(-20, 0); c.lineTo(-420, -1100); c.lineTo(420, -1100); c.lineTo(20, 0); c.fill(); c.restore(); }
// przedpokój po ciemku z latarką
function hallDark(c, lt, o = {}) { kubaHall(c, lt, Object.assign({ underLight: 0 }, o)); c.fillStyle = `rgba(2,3,8,${o.dark ?? .82})`; c.fillRect(0, 0, W, H); if (o.flash !== false) flashCone(c, o.fx ?? 540, o.fy ?? 1900, o.fa ?? -1.75, .55); }
// dym (warstwy kłębów)
function smoke(c, lt, a = .6, y0 = 0) { for (let k = 0; k < 26; k++) { const x = (hash(k) * W + Math.sin(lt * .5 + k) * 60 + lt * 30 * (hash(k + 3) - .5)) % (W + 200) - 100, y = y0 + hash(k + 7) * (H - y0) - (lt * 40 * hash(k + 1)) % 400; const r = 120 + hash(k + 2) * 180; const g = c.createRadialGradient(x, y, 10, x, y, r); g.addColorStop(0, `rgba(150,150,155,${a * .5})`); g.addColorStop(1, 'rgba(150,150,155,0)'); c.fillStyle = g; c.fillRect(x - r, y - r, r * 2, r * 2); } }
// wóz strażacki z boku
function fireTruck(c, lt, x, y, s = 1) { c.save(); c.translate(x, y); c.scale(s, s); ell(c, 0, 10, 640, 30, 'rgba(0,0,0,.45)'); fillRR(c, -620, -420, 1240, 380, 20, '#C21B2A'); fillRR(c, -620, -420, 330, 380, 30, '#D62635'); fillRR(c, -590, -390, 250, 150, 14, '#AFC6E0'); fillRR(c, -260, -400, 840, 40, 6, '#9AA2AB'); for (let k = 0; k < 12; k++) fillRR(c, -240 + k * 68, -440, 14, 60, 4, '#C9CDD2'); fillRR(c, -240, -470, 820, 26, 6, '#C9CDD2');
  fillRR(c, -620, -150, 1240, 40, 0, '#F2EEE4'); txt(c, 'STRAŻ POŻARNA · 998', 0, -128, 34, '#C21B2A', 900); for (let k = 0; k < 4; k++) fillRR(c, -200 + k * 190, -330, 150, 150, 8, '#9E1824'); for (const wx of [-430, 180, 430]) { circ(c, wx, -30, 80, '#0A0B10'); circ(c, wx, -30, 38, '#9AA2AB'); }
  const on = Math.floor(lt * 6) % 2; fillRR(c, -560, -470, 160, 40, 10, on ? '#3A8AFF' : '#1A3A8A'); c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createRadialGradient(-480, -450, 10, -480, -450, 600); g.addColorStop(0, on ? 'rgba(60,120,255,.5)' : 'rgba(255,40,40,.35)'); g.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = g; c.fillRect(-1200, -1200, 2400, 1600); c.restore(); c.restore(); }
// drzwi od strony klatki z tabliczką
function doorOutside(c, lt, o = {}) { photoDoor3(c, 0, 0, W, H); c.save(); c.translate(540, 520); fillRR(c, -220, -60, 440, 120, 8, '#C9A15A'); c.strokeStyle = '#7A5A20'; c.lineWidth = 4; rr(c, -210, -50, 420, 100, 6); c.stroke(); txt(c, 'KOWALSCY', 0, -14, 40, '#3A2A10', 900); txt(c, 'Anna · Kuba · Zosia', 0, 30, 30, '#3A2A10', 800); c.restore(); if (o.note) { const p = clamp(o.note); c.save(); c.translate(540, 1880 - p * 160); fillRR(c, -150, -10, 300, 200, 4, '#F2EEE4'); c.restore(); } }
// kartka wsunięta pod drzwi (z bliska, od środka)
function noteClose(c, lt, p = 1) { c.fillStyle = '#5A3D26'; c.fillRect(0, 0, W, H); c.fillStyle = '#4A3220'; for (let i = 0; i < 12; i++) c.fillRect(0, i * 170, W, 4); c.save(); c.translate(540, 1100 - p * 120); c.rotate(-.06); fillRR(c, -330, -230, 660, 460, 6, '#F2EEE4'); c.strokeStyle = 'rgba(0,0,0,.08)'; c.lineWidth = 2; for (let k = 0; k < 9; k++) { c.beginPath(); c.moveTo(-300, -170 + k * 48); c.lineTo(300, -170 + k * 48); c.stroke(); } txt(c, 'WYJDŹCIE.', 0, -50, 96, '#14161B', 900); txt(c, 'GAZ!', 0, 80, 120, '#C23A3A', 900); c.restore(); }
// dziurka od klucza z wytrychem
function keyholePick(c, lt) { c.fillStyle = '#4A3220'; c.fillRect(0, 0, W, H); fillRR(c, 360, 560, 360, 800, 40, '#C9A15A'); fillRR(c, 380, 580, 320, 760, 30, '#B8904A'); c.fillStyle = '#14161B'; c.beginPath(); c.arc(540, 900, 60, 0, 7); c.fill(); c.fillRect(515, 900, 50, 180); const j = Math.sin(lt * 26) * 10; c.save(); c.translate(540 + j, 950); c.rotate(.3 + Math.sin(lt * 18) * .08); fillRR(c, -8, -20, 16, 420, 6, '#9AA2AB'); fillRR(c, -8, -20, 60, 14, 4, '#9AA2AB'); c.restore(); c.save(); c.translate(560 - j, 990); c.rotate(-.2); fillRR(c, -6, 0, 12, 380, 6, '#7A8088'); c.restore(); }
// router: diody gasną
function routerClose(c, lt, off) { c.fillStyle = '#1B2236'; c.fillRect(0, 0, W, H); fillRR(c, 140, 900, 800, 240, 40, '#E8E4DA'); for (let k = 0; k < 6; k++) circ(c, 260 + k * 110, 1020, 18, off ? '#3A3F48' : (Math.floor(lt * 8 + k) % 3 ? '#30D158' : '#9AE6B4')); fillRR(c, 300, 660, 20, 260, 8, '#C9CDD2'); fillRR(c, 760, 660, 20, 260, 8, '#C9CDD2'); }
// krzesło pod klamką
function chairAtDoor(c, x, y, s = 1, ang = -.35) { c.save(); c.translate(x, y); c.scale(s, s); c.rotate(ang); c.strokeStyle = '#6A4A2A'; c.lineWidth = 26; c.lineCap = 'round'; c.beginPath(); c.moveTo(-120, 0); c.lineTo(-120, -420); c.moveTo(120, 0); c.lineTo(120, -200); c.moveTo(-120, -200); c.lineTo(160, -200); c.stroke(); fillRR(c, -150, -230, 330, 40, 10, '#8A6A40'); c.restore(); }
// miś z bliska: szew, w środku mikrofon z czerwoną diodą
function teddyClose(c, lt, o = {}) { c.fillStyle = '#2E3A52'; c.fillRect(0, 0, W, H); const B = '#B0773A'; circ(c, 540, 1240, 380, B); circ(c, 540, 760, 260, B); circ(c, 360, 560, 90, B); circ(c, 720, 560, 90, B); circ(c, 360, 560, 50, '#E8C79A'); circ(c, 720, 560, 50, '#E8C79A'); ell(c, 540, 840, 90, 64, '#E8C79A'); circ(c, 460, 740, 22, '#14161B'); circ(c, 620, 740, 22, '#14161B'); circ(c, 540, 820, 20, '#3A2010');
  c.strokeStyle = '#3A2010'; c.lineWidth = 6; for (let k = 0; k < 9; k++) { c.beginPath(); c.moveTo(440 + k * 28, 1120); c.lineTo(456 + k * 28, 1160); c.stroke(); } c.strokeStyle = '#2A1408'; c.lineWidth = 4; c.beginPath(); c.moveTo(430, 1140); c.lineTo(700, 1140); c.stroke();
  if (o.open) { c.fillStyle = '#F2E8D0'; c.beginPath(); c.ellipse(560, 1150, 150, 70 * o.open, 0, 0, 7); c.fill(); fillRR(c, 500, 1120, 120, 60, 8, '#14161B'); if (Math.floor(lt * 3) % 2 === 0) { circ(c, 590, 1135, 9, '#FF3B30'); c.save(); c.globalCompositeOperation = 'lighter'; circ(c, 590, 1135, 40, 'rgba(255,40,40,.35)'); c.restore(); } } }
function deviceClose(c, lt) { c.fillStyle = '#1B1408'; c.fillRect(0, 0, W, H); fillRR(c, 240, 760, 600, 360, 30, '#14161B'); fillRR(c, 270, 790, 540, 300, 20, '#22252E'); for (let k = 0; k < 7; k++) for (let q = 0; q < 4; q++) circ(c, 330 + k * 60, 860 + q * 50, 10, '#0B0C10'); fillRR(c, 700, 830, 70, 40, 6, '#2A2D36'); const on = Math.floor(lt * 3) % 2 === 0; circ(c, 735, 1050, 18, on ? '#FF3B30' : '#5A1010'); if (on) { c.save(); c.globalCompositeOperation = 'lighter'; circ(c, 735, 1050, 90, 'rgba(255,40,40,.3)'); c.restore(); } txt(c, 'REC', 670, 1052, 28, on ? '#FF3B30' : '#5A1010', 900, 'right'); c.strokeStyle = '#C21B2A'; c.lineWidth = 6; c.beginPath(); c.moveTo(270, 1100); c.quadraticCurveTo(160, 1300, 60, 1350); c.stroke(); }
// mokry ręcznik pod drzwiami
function towelGap(c, lt, p = 1) { bathDoor(c, lt, { locked: true, gap: 1 - p, dark: .4 }); c.save(); c.globalAlpha = p; fillRR(c, 160, 1570, 760, 90, 30, '#5A8AC8'); c.strokeStyle = 'rgba(255,255,255,.3)'; c.lineWidth = 6; for (let k = 0; k < 8; k++) { c.beginPath(); c.moveTo(200 + k * 90, 1580); c.lineTo(220 + k * 90, 1650); c.stroke(); } for (let k = 0; k < 6; k++) circ(c, 220 + k * 120, 1680 + ((lt * 80 + k * 30) % 60), 6, 'rgba(160,210,255,.8)'); c.restore(); }
// tłum sąsiadów pod blokiem (różne postacie)
const NEIGH = [{ kind: 'sasiad', cloth: '#4A6A8A', hair: '#2A1E18' }, { kind: 'babcia' }, { kind: 'sasiad', cloth: '#7A3A2A', hair: '#8A6A40', skin: '#F0C4A0' }, { kind: 'sasiad', cloth: '#2F5A3A', hair: '#14161B', skin: '#C08060' }, { kind: 'sasiad', cloth: '#5A4A7A', hair: '#B0B0B0' }, { kind: 'sasiad', cloth: '#8A6A2A', hair: '#3A2A1E', cap: '#2A3A5E' }];
function crowd(c, lt, y, s, idx = [0, 2, 3, 4, 5], o = {}) { idx.forEach((k, i) => { const n = NEIGH[k]; personHD(c, 120 + i * (840 / Math.max(1, idx.length - 1)), y + (i % 2) * 30, s, Object.assign({ t: lt + i, expr: o.expr || 'fear', look: (i % 2 ? -1 : 1) * .5, arms: i % 3 === 1 ? 'hold' : 'down' }, n)); }); }
const PEEP = (fn) => (c, lt) => peepPOV(c, lt, (cc, cx, cy, r) => { cc.fillStyle = '#3A4058'; cc.fillRect(cx - r, cy - r, r * 2, r * 2); fn(cc, cx, cy, r, lt); });
// ===== OTWARCIE jak we wzorze: twarz z bliska → „Proste.” → 1:00 → blok z jednym oknem =====
function villainFace(c, lt, s = 1.5, ex = 'cold') { c.fillStyle = '#0E120E'; c.fillRect(0, 0, W, H); for (let x = 0; x < W; x += 70) { c.fillStyle = 'rgba(60,80,60,.18)'; c.fillRect(x, 0, 30, H); } faceHD(c, 540, 860, s, { kind: 'kierowca', bald: true, expr: ex, t: lt, blood: true, look: 0, cloth: '#2F3A2A', noBlink: true, creepy: true, skin: '#D8C0A8' }); NIGHT(c, .35, 540, 860, 720); }
function lcdCard(c, lt, str, sub) { c.fillStyle = '#050507'; c.fillRect(0, 0, W, H); const p = back(clamp(lt / .35)); c.save(); c.translate(540, 900); c.scale(p, p); c.strokeStyle = '#FF2A2A'; c.lineWidth = 14; c.shadowColor = '#FF2A2A'; c.shadowBlur = 40; c.beginPath(); c.arc(0, 0, 300, 0, 7); c.stroke(); c.lineWidth = 6; for (let k = 0; k < 60; k++) { const a = k / 60 * 6.283; c.beginPath(); c.moveTo(Math.cos(a) * 270, Math.sin(a) * 270); c.lineTo(Math.cos(a) * (k % 5 ? 255 : 240), Math.sin(a) * (k % 5 ? 255 : 240)); c.stroke(); } c.font = `900 170px ${FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = '#FF3B30'; c.fillText(str, 0, -10); c.shadowBlur = 0; c.font = `900 50px ${FONT}`; c.fillStyle = '#FF8A8A'; c.fillText(sub, 0, 140); c.restore(); }
// blok nocą: ciemne okna, jedno świeci (latarka) — zbliżenie kamerą przez shot()
function blockNight(c, lt, o = {}) { const sky = c.createLinearGradient(0, 0, 0, H); sky.addColorStop(0, '#05070F'); sky.addColorStop(1, '#161C2E'); c.fillStyle = sky; c.fillRect(0, 0, W, H); snowfall(c, lt, 80, .6); fillRR(c, 60, 120, 960, 1800, 0, '#232A3A'); for (let r = 0; r < 11; r++) for (let q = 0; q < 5; q++) { const x = 120 + q * 176, y = 180 + r * 160, lit = r === 6 && q === 2; fillRR(c, x - 8, y - 8, 136, 116, 4, '#3A4256'); fillRR(c, x, y, 120, 100, 3, lit ? '#F5C878' : '#0A0E1A'); fillRR(c, x - 12, y + 104, 144, 12, 3, '#4A5266'); if (lit) { c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createRadialGradient(x + 60, y + 50, 5, x + 60, y + 50, 260); g.addColorStop(0, 'rgba(255,210,140,.45)'); g.addColorStop(1, 'rgba(255,210,140,0)'); c.fillStyle = g; c.fillRect(x - 260, y - 260, 640, 620); c.restore(); c.fillStyle = 'rgba(40,30,30,.85)'; circ(c, x + 40, y + 50, 16, 'rgba(40,30,30,.85)'); fillRR(c, x + 26, y + 64, 28, 36, 8, 'rgba(40,30,30,.85)'); circ(c, x + 82, y + 58, 12, 'rgba(40,30,30,.85)'); fillRR(c, x + 72, y + 70, 22, 30, 6, 'rgba(40,30,30,.85)'); } } }
// okno kuchni od zewnątrz: rama, firanka, w środku mama, Kuba i Zosia ze światłem telefonu
function familyWindow(c, lt, o = {}) { c.fillStyle = '#1B2236'; c.fillRect(0, 0, W, H); snowfall(c, lt, 60, .7); fillRR(c, 90, 330, 900, 1280, 10, '#E8E4DA'); c.save(); c.beginPath(); c.rect(130, 370, 820, 1200); c.clip(); c.fillStyle = '#2A2028'; c.fillRect(130, 370, 820, 1200); c.fillStyle = '#7A3A3A'; c.fillRect(130, 370, 110, 1200); c.fillRect(840, 370, 110, 1200); wallClock(c, 760, 480, 46, 3, 0);
  personHD(c, 380, 1880, .95, { kind: 'mama', expr: o.expr || 'fear', t: lt, look: 1, arms: 'phone' }); personHD(c, 640, 1900, .8, { kind: 'kuba', home: true, expr: o.expr || 'fear', t: lt, look: -1 }); personHD(c, 820, 1940, .65, { kind: 'zosia', expr: 'neutral', t: lt, item: 'teddy', look: -1 });
  c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createRadialGradient(560, 1000, 10, 560, 1000, 520); g.addColorStop(0, 'rgba(200,220,255,.35)'); g.addColorStop(1, 'rgba(200,220,255,0)'); c.fillStyle = g; c.fillRect(0, 300, W, 1400); c.restore(); c.fillStyle = 'rgba(160,190,230,.08)'; c.fillRect(130, 370, 820, 1200); c.restore(); fillRR(c, 525, 330, 30, 1280, 4, '#E8E4DA'); fillRR(c, 90, 960, 900, 26, 4, '#E8E4DA'); fillRR(c, 60, 1600, 960, 40, 6, '#C9C2A8'); for (let k = 0; k < 10; k++) circ(c, 120 + k * 90, 1596, 10, 'rgba(255,255,255,.9)'); }

// ===================== SCENY =====================
const HD = (c, lt, o = {}) => hallDark(c, lt, o);
const VILL = (o = {}) => Object.assign({ kind: 'kierowca', bald: true, cloth: '#2F3A2A', creepy: true, skin: '#D8C0A8' }, o);
scene({ name: 'twarz', start: 0, end: 4.2, cam: (lt) => ({ z: 1 + lt * .05 }), draw(c, lt) { villainFace(c, lt, 1.55, lt < 2.6 ? 'cold' : 'grin'); } });
scene({ name: 'proste', start: 4.2, end: 5.8, cam: P(1.1, 1.6), draw(c, lt) { kubaHall(c, lt, { underLight: 1 }); c.fillStyle = 'rgba(2,3,8,.75)'; c.fillRect(0, 0, W, H); c.save(); c.globalCompositeOperation = 'lighter'; c.fillStyle = 'rgba(255,220,150,.5)'; c.fillRect(300, 1400, 480, 26); c.restore(); } });
scene({ name: 'minuta', start: 5.8, end: 8.0, cam: jolt([.1]), draw(c, lt) { lcdCard(c, lt, '1:00', 'MINUTA'); } });
scene({ name: 'blok', start: 8.0, end: 10.4, cam: (lt) => ({ z: 1 + clamp(lt / 2.2) * 1.6, x: -(1 + clamp(lt / 2.2) * 1.6 - 1) * 0, y: -clamp(lt / 2.2) * 420 }), draw(c, lt) { blockNight(c, lt); } });
scene({ name: 'okno', start: 10.4, end: 12.6, cam: P(1.08, 2.2), draw(c, lt) { familyWindow(c, lt); } });
scene({ name: 'nikt', start: 12.6, end: 14.8, cam: P(1.15, 1.8), draw(c, lt) { familyWindow(c, lt, { expr: 'fear' }); } });
scene({ name: 'zamek', start: 14.8, end: 17.0, cam: P(1.12, 1.8), draw(c, lt) { shot(c, 690, 980, 2.6, (cc) => kubaHall(cc, lt, { underLight: 1 })); NIGHT(c, .5, 540, 1000, 560); }, post(c, lt) { target(c, lt, 540, 940, 560, 420, 'ŁAŃCUCH', .5); } });
scene({ name: 'puk', start: 17.0, end: 19.2, cam: jolt([.2, .6, 1.0]), draw(c, lt) { HD(c, lt, { fx: 300 }); }, post(c, lt) { joltFlash(c, lt, [.2, .6, 1.0]); } });
scene({ name: 'glos', start: 19.2, end: 21.4, cam: P(1.1, 2.6), draw(c, lt) { HD(c, lt, { fx: 300, dark: .78 }); for (let k = 0; k < 3; k++) { c.strokeStyle = `rgba(255,255,255,${.4 - k * .1})`; c.lineWidth = 5; c.beginPath(); c.arc(540, 900, 60 + k * 30 + (lt * 50 % 30), -2.4, -.7); c.stroke(); } } });
scene({ name: 'mama', start: 21.4, end: 23.6, cam: P(1.1, 2), draw: TFACE('mama', 'fear', { talk: true, look: 1, bg: '#1A1418', n: .5 }) });
scene({ name: 'czarny', start: 23.6, end: 25.8, cam: P(1.15, 2), draw: PEEP((cc, cx, cy, r, lt) => { cc.fillStyle = '#05060A'; cc.fillRect(cx - r, cy - r, r * 2, r * 2); }) });
scene({ name: 'oko', start: 25.8, end: 28.0, cam: jolt([.15]), draw(c, lt) { c.fillStyle = '#05060A'; c.fillRect(0, 0, W, H); peepPOV(c, lt, (cc, cx, cy, r) => { cc.fillStyle = '#C9B8A0'; cc.fillRect(cx - r, cy - r, r * 2, r * 2); cc.save(); cc.translate(cx, cy); cc.scale(r / 70, r / 70); circ(cc, 0, 0, 60, '#FFFFFF'); cc.strokeStyle = 'rgba(200,40,50,.7)'; cc.lineWidth = 2; for (let k = 0; k < 9; k++) { cc.beginPath(); cc.moveTo(Math.cos(k) * 60, Math.sin(k) * 60); cc.lineTo(Math.cos(k) * 28, Math.sin(k) * 28); cc.stroke(); } circ(cc, 0, 0, 26, '#8AA0B0'); circ(cc, 0, 0, 10, '#05060A'); circ(cc, -6, -8, 5, '#FFFFFF'); cc.fillStyle = '#B8A088'; cc.beginPath(); cc.ellipse(0, -70, 90, 30, 0, 0, 7); cc.fill(); cc.restore(); }); }, post(c, lt) { joltFlash(c, lt, [.15]); } });
scene({ name: 'admin', start: 28.0, end: 30.2, cam: P(1.06, 2.4), draw(c, lt) { dialPad(c, lt, 'Administracja 24h', { sub: lt < .8 ? 'łączenie…' : 'połączono', time: '3:01', endCall: lt > .8 }); } });
scene({ name: 'nikogo', start: 30.2, end: 32.4, cam: jolt([.3]), draw(c, lt) { dialPad(c, lt, 'Administracja 24h', { sub: 'połączono · 00:09', time: '3:01', endCall: true }); }, post(c, lt) { joltFlash(c, lt, [.3]); target(c, lt, 540, 640, 760, 300, 'NIKOGO NIE WYSYŁALI', .4); } });
scene({ name: 'wizjer', start: 32.4, end: 34.6, draw: PEEP((cc, cx, cy, r, lt) => { personHD(cc, cx, cy + r * 1.5, r / 470, VILL({ expr: 'grin', t: lt, vest: 'ADMINISTRACJA' })); }), post(c, lt) { target(c, lt, 540, 1080, 360, 140, 'FLAMASTER', .8); } });
scene({ name: 'imiona', start: 34.6, end: 36.8, cam: P(1.14, 2.6), draw(c, lt) { villainFace(c, lt, 1.25, 'grin'); c.fillStyle = 'rgba(2,3,8,.45)'; c.fillRect(0, 0, W, H); } });
scene({ name: 'tabliczka', start: 36.8, end: 39.0, cam: P(1.15, 2), draw(c, lt) { doorOutside(c, lt); NIGHT(c, .4, 540, 600, 520); }, post(c, lt) { target(c, lt, 540, 520, 480, 160, 'WASZE IMIONA', .4); } });
scene({ name: 'tel112', start: 39.0, end: 41.2, cam: P(1.08, 2), draw(c, lt) { dialPad(c, lt, lt < .4 ? '1' : lt < .8 ? '11' : '112', { hot: ['1', '2'], time: '3:02' }); } });
scene({ name: 'policja10', start: 41.2, end: 43.4, draw(c, lt) { dialPad(c, lt, '112', { sub: 'połączono · 00:1' + Math.floor(lt), time: '3:02', endCall: true }); }, post(c, lt) { target(c, lt, 540, 640, 680, 280, 'POLICJA ZA 10 MIN', .4); } });
scene({ name: 'wytrych', start: 43.4, end: 45.6, cam: (lt) => ({ z: 1.1, x: Math.sin(lt * 40) * 4 }), draw(c, lt) { keyholePick(c, lt); NIGHT(c, .3, 540, 900, 560); } });
scene({ name: 'krzeslo', start: 45.6, end: 47.8, cam: jolt([.3]), draw(c, lt) { HD(c, lt, { fx: 800, fa: -1.9 }); chairAtDoor(c, lerp(260, 640, clamp(lt / .5)), 1600, 1.6, -.25); personHD(c, 880, 1900, .95, { kind: 'kuba', home: true, expr: 'angry', t: lt, arms: 'reach', look: -1 }); }, post(c, lt) { joltFlash(c, lt, [.3]);  } });
scene({ name: 'cien', start: 47.8, end: 50.0, cam: P(1.2, 2), draw(c, lt) { c.fillStyle = '#3A2818'; c.fillRect(0, 0, W, H); c.fillStyle = '#4A3220'; for (let i = 0; i < 8; i++) c.fillRect(0, i * 160, W, 4); c.fillStyle = '#2A1E14'; c.fillRect(0, 1180, W, 740); c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createLinearGradient(0, 1150, 0, 1300); g.addColorStop(0, 'rgba(255,215,140,.75)'); g.addColorStop(1, 'rgba(255,215,140,0)'); c.fillStyle = g; c.fillRect(0, 1150, W, 150); c.restore(); fillRR(c, 0, 1140, W, 30, 0, 'rgba(255,225,160,.9)'); const sh = Math.sin(lt * 2) * 6; fillRR(c, 300 + sh, 1136, 170, 40, 8, '#05060A'); fillRR(c, 600 + sh, 1136, 170, 40, 8, '#05060A'); c.fillStyle = 'rgba(5,6,10,.6)'; c.beginPath(); c.moveTo(300 + sh, 1176); c.lineTo(160, 1500); c.lineTo(480, 1500); c.lineTo(470 + sh, 1176); c.fill(); c.beginPath(); c.moveTo(600 + sh, 1176); c.lineTo(560, 1500); c.lineTo(900, 1500); c.lineTo(770 + sh, 1176); c.fill(); NIGHT(c, .3, 540, 1160, 600); } });
scene({ name: 'kartka', start: 50.0, end: 52.2, cam: P(1.12, 2.2), draw(c, lt) { noteClose(c, lt, clamp(lt / 1)); NIGHT(c, .35, 540, 1000, 600); } });
scene({ name: 'gaz', start: 52.2, end: 54.4, cam: P(1.1, 2.2), draw: TFACE('mama', 'cold', { look: 0, bg: '#1A1418', n: .5 }), post(c, lt) {  } });
scene({ name: 'dym', start: 54.4, end: 56.6, cam: P(1.15, 2.2), draw(c, lt) { shot(c, 540, 1420, 1.8, (cc) => kubaHall(cc, lt, { underLight: 1 })); c.fillStyle = 'rgba(2,3,8,.6)'; c.fillRect(0, 0, W, H); smoke(c, lt, .5 + lt * .1, 1100); } });
scene({ name: 'dymkuba', start: 56.6, end: 58.8, cam: jolt([.1]), draw: TFACE('kuba', 'shock', { home: true, talk: true, look: -1, bg: '#1A1418', n: .45, scene: (c, lt) => smoke(c, lt, .4, 0) }), post(c, lt) { joltFlash(c, lt, [.1]); } });
scene({ name: 'z5', start: 58.8, end: 61.0, cam: P(1.06, 2.4), draw(c, lt) { towelGap(c, lt, clamp(lt / 1.2)); smoke(c, lt, .25, 1300); }, post(c, lt) {  } });
scene({ name: 'swiecicie', start: 61.0, end: 63.2, cam: P(1.08, 2.2), draw(c, lt) { familyWindow(c, lt); flashCone(c, 640, 1300, -Math.PI / 2 + Math.sin(lt * 6) * .5, .6); } });
scene({ name: 'na_dole', start: 63.2, end: 65.4, cam: P(1.15, 2.4), draw(c, lt) { entranceFull(c, lt, {}); snowfall(c, lt, 90, .7); c.fillStyle = 'rgba(2,3,8,.5)'; c.fillRect(0, 0, W, H); personHD(c, 790, 1500, .5, VILL({ expr: 'grin', t: lt, arms: lt % 1 > .5 ? 'up' : 'down', look: 0 })); NIGHT(c, .35, 790, 1250, 420);
  c.fillStyle = '#E8E4DA'; c.fillRect(0, 0, W, 60); c.fillRect(0, 0, 60, H); c.fillRect(W - 60, 0, 60, H); c.fillRect(0, H - 60, W, 60); c.fillRect(510, 0, 60, H); c.fillRect(0, 900, W, 50); c.fillStyle = 'rgba(160,190,230,.08)'; c.fillRect(0, 0, W, H); }, post(c, lt) { target(c, lt, 790, 1250, 280, 560, 'ON', .5); } });
scene({ name: 'zosia', start: 65.4, end: 67.6, cam: P(1.1, 1.8), draw: TFACE('zosia', 'fear', { tears: true, look: 1, bg: '#1A1418', n: .5 }) });
scene({ name: 'straz', start: 67.6, end: 69.8, cam: P(1.06, 2.2), draw(c, lt) { yardFromWindow(c, lt, {}); fireTruck(c, lt, 540, 1700, .55); NIGHT(c, .3, 540, 1500, 700); } });
scene({ name: 'strazak', start: 69.8, end: 72.0, cam: jolt([.2]), draw(c, lt) { HD(c, lt, { fx: 400 }); smoke(c, lt, .3, 0); c.save(); c.globalCompositeOperation = 'lighter'; c.fillStyle = Math.floor(lt * 5) % 2 ? 'rgba(255,40,40,.4)' : 'rgba(40,90,255,.4)'; c.fillRect(300, 1400, 480, 26); c.restore(); }, post(c, lt) { joltFlash(c, lt, [.2]); } });
scene({ name: 'z6', start: 72.0, end: 74.2, cam: P(1.1, 2.2), draw(c, lt) { yardFromWindow(c, lt, {}); fireTruck(c, lt, 540, 1700, .55); NIGHT(c, .3, 540, 1500, 700); }, post(c, lt) { target(c, lt, 540, 1560, 620, 300, 'PRAWDZIWA STRAŻ', .2);  } });
scene({ name: 'schody', start: 74.2, end: 76.4, cam: (lt) => ({ z: 1.08, y: lt * 20 }), draw(c, lt) { stairElev(c, lt, 3, { flick: true }); smoke(c, lt, .35, 0); personHD(c, 300, 1800, .8, { kind: 'strazak', mask: true, expr: 'neutral', t: lt, item: 'flash', walk: lt * 8 }); personHD(c, 620, 1700, .7, { kind: 'kuba', home: true, expr: 'fear', t: lt, walk: lt * 8 }); personHD(c, 820, 1640, .6, { kind: 'zosia', expr: 'fear', t: lt, walk: lt * 8 }); NIGHT(c, .4, 500, 1300, 700); } });
scene({ name: 'mis', start: 76.4, end: 78.6, cam: P(1.15, 1.8), draw(c, lt) { stairElev(c, lt, 3, {}); smoke(c, lt, .4, 0); c.save(); c.translate(540, 1500 + clamp(lt / .6) * 200); c.rotate(clamp(lt / .6) * 1.5); circ(c, 0, 0, 60, '#B0773A'); circ(c, 0, -76, 46, '#B0773A'); circ(c, -36, -112, 18, '#B0773A'); circ(c, 36, -112, 18, '#B0773A'); c.restore(); NIGHT(c, .4, 540, 1600, 500); }, post(c, lt) { target(c, lt, 540, 1640, 300, 300, 'MIŚ', .7); } });
scene({ name: 'pod_blokiem', start: 78.6, end: 80.8, cam: P(1.06, 2.4), draw(c, lt) { entranceFull(c, lt, {}); snowfall(c, lt, 80, .7); fireTruck(c, lt, 900, 1500, .5); crowd(c, lt, 1900, .62, [0, 2, 3, 1, 4]); NIGHT(c, .25, 540, 1400, 760); } });
scene({ name: 'widzisz', start: 80.8, end: 83.0, cam: jolt([.1]), draw: TFACE('kuba', 'shock', { home: true, look: 1, bg: '#101420', scene: (c, lt) => snowfall(c, lt, 60, .6), n: .35 }), post(c, lt) { joltFlash(c, lt, [.1]); } });
scene({ name: 'w_tlumie', start: 83.0, end: 85.2, cam: P(1.18, 2.4), draw(c, lt) { entranceFull(c, lt, {}); snowfall(c, lt, 80, .7); crowd(c, lt, 1900, .62, [0, 2, 3, 4]); personHD(c, 560, 1820, .66, VILL({ expr: 'grin', t: lt, item: 'teddy', look: 1, cloth: '#1E2228' })); NIGHT(c, .35, 560, 1400, 520); }, post(c, lt) { target(c, lt, 560, 1450, 340, 760, 'ON', .4); } });
scene({ name: 'ciii', start: 85.2, end: 87.4, cam: P(1.2, 2.2), draw(c, lt) { villainFace(c, lt, 1.3, 'cold'); c.save(); c.translate(540, 0); fillRR(c, -24, 940, 48, 190, 24, '#D9C2A8'); fillRR(c, -14, 940, 28, 16, 8, '#E8D2BE'); circ(c, 4, 1180, 70, '#D9C2A8'); circ(c, -20, 1210, 60, '#CDB49A'); c.restore(); c.fillStyle = 'rgba(2,3,8,.25)'; c.fillRect(0, 0, W, H); } });
scene({ name: 'z7', start: 87.4, end: 89.6, cam: P(1.06, 2.2), draw(c, lt) { entranceFull(c, lt, {}); snowfall(c, lt, 80, .7); personHD(c, 330, 1900, .85, { kind: 'kuba', home: true, expr: 'angry', talk: true, t: lt, arms: 'reach', look: 1 }); personHD(c, 760, 1900, .9, { kind: 'policjant', expr: 'neutral', t: lt, look: -1 }); NIGHT(c, .3, 540, 1400, 700); }, post(c, lt) {  } });
scene({ name: 'ucieka', start: 89.6, end: 91.8, cam: (lt) => ({ z: 1.08, x: -lt * 30 }), draw(c, lt) { garagesBg(c, lt, {}); speedLines(c, lt, .2); personHD(c, lerp(500, 1100, clamp(lt / 1.8)), 1800, .7, VILL({ expr: 'grin', t: lt, walk: lt * 16, cloth: '#1E2228', back: true })); NIGHT(c, .45, 600, 1400, 600); } });
scene({ name: 'snieg', start: 91.8, end: 94.0, cam: P(1.15, 2), draw(c, lt) { garagesBg(c, lt, {}); c.save(); c.translate(540, 1620); circ(c, 0, 0, 70, '#B0773A'); circ(c, 0, -90, 54, '#B0773A'); circ(c, -40, -130, 20, '#B0773A'); circ(c, 40, -130, 20, '#B0773A'); c.restore(); NIGHT(c, .45, 540, 1560, 420); }, post(c, lt) { target(c, lt, 540, 1580, 300, 300, 'MIŚ ZOSTAŁ', .4); } });
scene({ name: 'rano', start: 94.0, end: 96.2, cam: P(1.06, 2.4), draw(c, lt) { kubaRoom2(c, lt, { lamp: true }); personHD(c, 540, 1900, .8, { kind: 'zosia', expr: 'smile', t: lt, item: 'teddy', look: 0 }); NIGHT(c, .35, 540, 1300, 600); } });
scene({ name: 'szew', start: 96.2, end: 98.4, cam: P(1.15, 2), draw(c, lt) { teddyClose(c, lt, {}); NIGHT(c, .3, 540, 1100, 600); }, post(c, lt) { target(c, lt, 560, 1140, 360, 160, 'NOWY SZEW', .4); } });
scene({ name: 'miga', start: 98.4, end: 100.6, cam: jolt([.3]), draw(c, lt) { teddyClose(c, lt, { open: clamp(lt / .6) }); NIGHT(c, .4, 540, 1140, 500); }, post(c, lt) { joltFlash(c, lt, [.3]); } });
scene({ name: 'mikrofon', start: 100.6, end: 102.8, cam: P(1.2, 2), draw(c, lt) { deviceClose(c, lt); NIGHT(c, .3, 540, 960, 600); }, post(c, lt) { target(c, lt, 540, 940, 620, 380, 'MIKROFON', .3); } });
scene({ name: 'szept', start: 102.8, end: 105.0, cam: P(1.25, 2.6), draw(c, lt) { villainFace(c, lt, 1.6, 'grin'); c.fillStyle = 'rgba(2,3,8,.35)'; c.fillRect(0, 0, W, H); } });
scene({ name: 'drzwi_pokoju', start: 105.0, end: 107.2, cam: jolt([.8]), draw(c, lt) { c.fillStyle = '#05060A'; c.fillRect(0, 0, W, H); fillRR(c, 260, 260, 560, 1500, 6, '#1A1E2A'); const g = 20 + clamp(lt / 1.2) * 70; c.fillStyle = '#000'; c.fillRect(520, 260, g, 1500); if (lt > .8) { c.save(); c.shadowColor = '#FF3B30'; c.shadowBlur = 30; for (const dx of [-22, 22]) { ell(c, 520 + g / 2 + dx, 860, 16, 10, '#FFE8E0'); circ(c, 520 + g / 2 + dx, 860, 5, '#05060A'); } c.restore(); } }, post(c, lt) { joltFlash(c, lt, [.8]); } });
scene({ name: 'end', start: 107.2, end: 112.8, labels: [[1.0, 6, 'CZĘŚĆ 2 ↓', 540, 1200, 'red', 80]], draw(c, lt) { c.fillStyle = '#000'; c.fillRect(0, 0, W, H); if (lt > .3) { const p = eout(clamp((lt - .3) / .5)); c.save(); c.globalAlpha = p; txt(c, 'OBSERWUJ,', 540, 820, 80, '#FFD23F', 900); txt(c, 'ŻEBY ZOBACZYĆ CZĘŚĆ 2', 540, 920, 64, '#FFFFFF', 900); c.restore(); } } });

EP.cues = (add) => { [[0.1, 'stab'], [2.6, 'hit'], [4.2, 'hit'], [5.8, 'jolt'], [5.8, 'hit'], [8.0, 'whoosh'], [17.2, 'knock'], [17.6, 'knock'], [18.0, 'knock'], [25.95, 'jolt'], [25.95, 'hit'], [30.5, 'hit'], [32.4, 'hit'], [34.6, 'hit'], [43.4, 'pick'], [45.9, 'jolt'], [48.0, 'hit'], [50.0, 'paper'], [54.4, 'hit'], [56.6, 'jolt'], [58.8, 'water'], [63.2, 'hit'], [67.6, 'siren'], [70.0, 'knock'], [70.4, 'knock'], [76.4, 'hit'], [80.8, 'jolt'], [83.0, 'hit'], [85.2, 'hit'], [89.6, 'steps'], [98.7, 'jolt'], [98.7, 'hit'], [102.8, 'hit'], [105.0, 'creak'], [105.8, 'jolt'], [105.8, 'hit']].forEach(([t, n]) => add(t, n)); };

// ===================== POSTACIE W STYLU „TOON” (czysty wektor, jak we wzorze; własne projekty) =====================
// Głowa = zaokrąglony kwadrat bez szyi, oczy = białe kółka z czarną źrenicą, cienkie brwi, mała kropka nosa, rumieńce.
const TOON = {
  kuba:    { skin: '#F1C9A5', hair: '#7A4A2A', top: '#3E6FB0', top2: '#2E5A94', pants: '#3E6FB0', shoe: '#E8DCC8', print: 'stripes' },
  kubaOut: { skin: '#F1C9A5', hair: '#7A4A2A', top: '#5E7A3A', top2: '#4E6830', pants: '#2F3A52', shoe: '#14161B', print: 'zip' },
  mama:    { skin: '#F2C7A8', hair: '#8A3A22', top: '#D98CA8', top2: '#C47292', pants: '#D98CA8', shoe: '#E8DCC8', print: 'robe' },
  zosia:   { skin: '#F6D0B4', hair: '#8A5A30', top: '#B79CE0', top2: '#A288D0', pants: '#B79CE0', shoe: '#E8DCC8', print: 'stars' },
  zly:     { skin: '#D9C2A8', hair: null, top: '#3A4234', top2: '#2E3529', pants: '#22252B', shoe: '#14161B', print: 'zip' },
  policjant: { skin: '#E6B890', hair: '#3A2A1E', top: '#22325A', top2: '#1A2848', pants: '#1A2848', shoe: '#0E0F12', print: 'police' },
  strazak: { skin: '#E6B890', hair: '#3A2A1E', top: '#1E2A40', top2: '#16203A', pants: '#1E2A40', shoe: '#0E0F12', print: 'fire' },
  babcia:  { skin: '#F2CDB6', hair: '#D4D4D4', top: '#8A3A4A', top2: '#74303E', pants: '#5A4A5A', shoe: '#3A2A2A', print: 'cardigan' },
  sasiad:  { skin: '#E0AE88', hair: '#2A1E18', top: '#4A6A8A', top2: '#3A5A7A', pants: '#2A2D36', shoe: '#14161B', print: 'zip' },
};
function toonPal(o) { const k = o.kind === 'kuba' ? (o.home === false ? 'kubaOut' : 'kuba') : o.kind === 'kierowca' ? 'zly' : o.kind; const P0 = TOON[k] || TOON.sasiad; return Object.assign({}, P0, o.skin ? { skin: o.skin } : {}, o.cloth ? { top: o.cloth, top2: shade(o.cloth, -.12) } : {}, o.hair ? { hair: o.hair } : {}); }
// głowa w układzie: środek (0,0), szer. 300, wys. 290; dla „zly” dłuższa i z detalami
function toonHead(c, o, P) { const kd = o.kind === 'kierowca' ? 'zly' : o.kind, ex = o.expr || 'neutral', t = o.t || 0, villain = kd === 'zly';
  const hw = villain ? 150 : 150, hh = villain ? 175 : 145, r = villain ? 120 : 110;
  // włosy z tyłu
  if (kd === 'mama') { c.fillStyle = P.hair; fillRR(c, -hw - 14, -hh - 10, hw * 2 + 28, hh * 1.6, 90, P.hair); c.save(); c.translate(hw - 10, 40); c.rotate(.25 + Math.sin(t * 1.5) * .03); fillRR(c, -26, 0, 62, 260, 30, shade(P.hair, -.08)); c.restore(); }
  if (kd === 'zosia') { for (const sx of [-1, 1]) { c.save(); c.translate(sx * (hw + 10), 10); c.rotate(sx * .25); fillRR(c, -34, -20, 68, 150, 34, P.hair); c.restore(); } }
  if (kd === 'babcia') { circ(c, 0, -hh - 30, 58, P.hair); }
  // uszy
  for (const sx of [-1, 1]) { ell(c, sx * (hw - 4), 6, 22, 30, shade(P.skin, -.06)); }
  // twarz (squircle) + cień z prawej
  fillRR(c, -hw, -hh, hw * 2, hh * 2, r, P.skin); c.save(); rr(c, -hw, -hh, hw * 2, hh * 2, r); c.clip(); c.fillStyle = 'rgba(120,60,40,.10)'; c.beginPath(); c.ellipse(hw + 20, 20, 80, hh * 1.3, 0, 0, 7); c.fill(); c.restore();
  // detale złoczyńcy: oczodoły, zmarszczki, zarost, policzki zapadnięte
  if (villain) { for (const sx of [-1, 1]) { const g = c.createRadialGradient(sx * 62, -6, 10, sx * 62, -6, 70); g.addColorStop(0, 'rgba(70,25,35,.55)'); g.addColorStop(1, 'rgba(70,25,35,0)'); c.fillStyle = g; c.fillRect(sx * 62 - 80, -86, 160, 160); }
    c.strokeStyle = 'rgba(110,70,55,.45)'; c.lineWidth = 3; for (let k = 0; k < 5; k++) { c.beginPath(); c.moveTo(-90, -110 - k * 13); c.quadraticCurveTo(0, -120 - k * 13, 90, -110 - k * 13); c.stroke(); } for (const sx of [-1, 1]) { c.beginPath(); c.moveTo(sx * 30, 50); c.quadraticCurveTo(sx * 70, 110, sx * 60, 150); c.stroke(); for (let k = 0; k < 3; k++) { c.beginPath(); c.moveTo(sx * 112, -20 + k * 12); c.lineTo(sx * 132, -26 + k * 12); c.stroke(); } }
    for (let k = 0; k < 140; k++) { const a = Math.PI * (.1 + .8 * hash(k)), rr2 = 90 + hash(k + 9) * 70; circ(c, Math.cos(a) * rr2, 40 + Math.sin(a) * rr2 * .9, 2.2, 'rgba(70,55,45,.5)'); }
    c.fillStyle = 'rgba(255,255,255,.12)'; c.beginPath(); c.ellipse(-50, -130, 60, 22, -.3, 0, 7); c.fill(); }
  // rumieńce
  if (!villain) { circ(c, -92, 52, 26, 'rgba(240,120,120,.32)'); circ(c, 92, 52, 26, 'rgba(240,120,120,.32)'); }
  // oczy
  const lx = (o.look || 0) * 8, ly = (o.lookY || 0) * 6; const blink = !o.noBlink && (t % 4.2) > 4.05;
  const ew = ex === 'shock' || ex === 'fear' ? 30 : 25, eh = blink ? 3 : (ex === 'shock' ? 32 : ex === 'fear' ? 29 : 25);
  for (const sx of [-1, 1]) { const ex0 = sx * 60, ey0 = villain ? -4 : 2; c.save(); c.beginPath(); c.ellipse(ex0, ey0, ew, eh, 0, 0, 7); c.fillStyle = '#FFFFFF'; c.fill(); c.clip();
    if (villain || o.blood) { c.strokeStyle = 'rgba(200,40,50,.6)'; c.lineWidth = 2.5; for (let k = 0; k < 7; k++) { c.beginPath(); c.moveTo(ex0 + sx * 30, ey0 + (k - 3) * 8); c.quadraticCurveTo(ex0 + sx * 16, ey0 + (k - 3) * 4, ex0 + sx * 6, ey0 + (k - 3) * 2); c.stroke(); } if (villain) circ(c, ex0 + lx, ey0 + ly, 11, '#8AA0B0'); }
    circ(c, ex0 + lx, ey0 + ly, villain ? 5 : (ex === 'shock' ? 8 : 10), '#14161B'); circ(c, ex0 + lx - 3, ey0 + ly - 4, 3, '#FFFFFF');
    if (ex === 'tired' || ex === 'cold' || (villain && ex !== 'shock')) { c.fillStyle = P.skin; c.fillRect(ex0 - 40, ey0 - 40, 80, 40 - eh * (ex === 'cold' ? .2 : .35)); }
    c.restore(); if (villain) { c.strokeStyle = 'rgba(190,50,60,.85)'; c.lineWidth = 5; c.beginPath(); c.ellipse(ex0, ey0, ew + 1, eh + 1, 0, 0, 7); c.stroke(); }
    if (ex === 'tired' || ex === 'cold' || villain) { c.strokeStyle = 'rgba(60,35,30,.7)'; c.lineWidth = 3; c.beginPath(); c.moveTo(ex0 - ew, ey0 - eh * (ex === 'cold' || villain ? .8 : .65) + 22 * (villain ? .5 : .6)); c.lineTo(ex0 + ew, ey0 - eh * (ex === 'cold' || villain ? .8 : .65) + 22 * (villain ? .5 : .6)); c.stroke(); } }
  // brwi
  const B = { neutral: [0, 0], tired: [.08, 4], fear: [.28, -6], shock: [.05, -16], smile: [-.06, -4], grin: [-.22, 4], cold: [-.25, 6], angry: [-.38, 6] }[ex] || [0, 0];
  for (const sx of [-1, 1]) { c.save(); c.translate(sx * 60, (villain ? -58 : -48) + B[1]); c.rotate(sx * B[0]); fillRR(c, -26, -4, 52, 8, 4, villain ? '#4A3A30' : shade(P.hair || '#5A4030', -.15)); c.restore(); }
  // nos
  ell(c, 0, villain ? 46 : 40, villain ? 12 : 8, villain ? 9 : 6, shade(P.skin, -.18));
  // usta
  const tk = o.talk ? Math.abs(Math.sin(t * 13)) : 0; c.save(); c.translate(0, villain ? 98 : 82);
  if (ex === 'grin') { c.fillStyle = '#3A1414'; c.beginPath(); c.moveTo(-80, -8); c.quadraticCurveTo(0, 56, 80, -8); c.quadraticCurveTo(0, 16, -80, -8); c.fill(); c.fillStyle = '#F2EEE0'; c.beginPath(); c.moveTo(-72, -4); c.quadraticCurveTo(0, 44, 72, -4); c.quadraticCurveTo(0, 12, -72, -4); c.fill(); c.strokeStyle = 'rgba(90,70,60,.55)'; c.lineWidth = 2; for (let k = -4; k <= 4; k++) { c.beginPath(); c.moveTo(k * 15, 6 - Math.abs(k)); c.lineTo(k * 15, 26 - Math.abs(k) * 3); c.stroke(); } }
  else if (ex === 'shock' || (ex === 'fear' && !o.talk)) { const h = ex === 'shock' ? 22 : 14; ell(c, 0, 0, ex === 'shock' ? 16 : 12, h, '#6A1E24'); }
  else if (ex === 'smile') { c.strokeStyle = '#6A2A2A'; c.lineWidth = 6; c.lineCap = 'round'; c.beginPath(); c.moveTo(-26, -4); c.quadraticCurveTo(0, 16 + tk * 6, 26, -4); c.stroke(); }
  else if (o.talk) { ell(c, 0, 0, 16, 4 + tk * 14, '#6A1E24'); }
  else if (ex === 'angry') { fillRR(c, -26, -6, 52, 14, 6, '#6A1E24'); fillRR(c, -22, -6, 44, 5, 2, '#F2EEE0'); }
  else { c.strokeStyle = '#6A2A2A'; c.lineWidth = 6; c.lineCap = 'round'; c.beginPath(); c.moveTo(-18, 0); c.lineTo(18, ex === 'cold' ? 0 : 2); c.stroke(); }
  c.restore();
  if (o.tears) { for (const sx of [-1, 1]) fillRR(c, sx * 60 - 6, 28, 12, 30 + (t * 40 % 40), 6, 'rgba(150,200,255,.75)'); }
  if (o.sweat) { const sy = -60 + ((t * 50) % 90); c.fillStyle = 'rgba(170,215,255,.85)'; c.beginPath(); c.moveTo(130, sy); c.quadraticCurveTo(144, sy + 22, 130, sy + 28); c.quadraticCurveTo(116, sy + 22, 130, sy); c.fill(); }
  // włosy / nakrycia głowy (z przodu)
  if (P.hair && kd !== 'zly') { c.save(); c.globalAlpha = .0; c.restore(); }
  if (kd === 'kuba') { c.fillStyle = P.hair; c.beginPath(); c.moveTo(-hw - 6, -20); c.quadraticCurveTo(-hw - 6, -hh - 10, 0, -hh - 16); c.quadraticCurveTo(hw + 6, -hh - 10, hw + 6, -20); c.quadraticCurveTo(hw - 10, -80, 60, -88); c.lineTo(20, -60); c.lineTo(-10, -92); c.quadraticCurveTo(-90, -80, -hw - 6, -20); c.fill(); for (const [px, h] of [[-50, 60], [0, 78], [50, 58]]) { c.beginPath(); c.moveTo(px - 30, -hh); c.lineTo(px + 6, -hh - h); c.lineTo(px + 30, -hh); c.fill(); } }
  if (kd === 'mama') { c.fillStyle = P.hair; c.beginPath(); c.moveTo(-hw - 8, 10); c.quadraticCurveTo(-hw - 10, -hh - 14, 10, -hh - 16); c.quadraticCurveTo(hw + 10, -hh - 12, hw + 8, 10); c.quadraticCurveTo(hw - 10, -70, 40, -96); c.quadraticCurveTo(-60, -60, -hw + 10, -40); c.lineTo(-hw - 8, 10); c.fill(); }
  if (kd === 'zosia') { c.fillStyle = P.hair; c.beginPath(); c.moveTo(-hw - 6, -10); c.quadraticCurveTo(-hw - 6, -hh - 12, 0, -hh - 14); c.quadraticCurveTo(hw + 6, -hh - 12, hw + 6, -10); c.quadraticCurveTo(hw - 20, -88, 0, -84); c.quadraticCurveTo(-hw + 20, -88, -hw - 6, -10); c.fill(); for (const sx of [-1, 1]) { c.save(); c.translate(sx * (hw + 6), -40); fillRR(c, -26, -14, 52, 28, 14, '#FF6B9A'); circ(c, 0, 0, 11, '#E0507A'); c.restore(); } }
  if (kd === 'babcia') { c.fillStyle = P.hair; c.beginPath(); c.moveTo(-hw - 6, 0); c.quadraticCurveTo(-hw - 6, -hh - 10, 0, -hh - 12); c.quadraticCurveTo(hw + 6, -hh - 10, hw + 6, 0); c.quadraticCurveTo(hw - 20, -80, 0, -80); c.quadraticCurveTo(-hw + 20, -80, -hw - 6, 0); c.fill(); c.strokeStyle = '#8A6A4A'; c.lineWidth = 5; for (const sx of [-1, 1]) { c.beginPath(); c.arc(sx * 60, 2, 38, 0, 7); c.stroke(); } c.beginPath(); c.moveTo(-22, -2); c.lineTo(22, -2); c.stroke(); }
  if (kd === 'sasiad') { c.fillStyle = P.hair; c.beginPath(); c.moveTo(-hw - 4, -30); c.quadraticCurveTo(-hw - 4, -hh - 10, 0, -hh - 12); c.quadraticCurveTo(hw + 4, -hh - 10, hw + 4, -30); c.quadraticCurveTo(hw - 20, -90, 0, -92); c.quadraticCurveTo(-hw + 20, -90, -hw - 4, -30); c.fill(); if (o.cap) { fillRR(c, -hw - 10, -hh - 30, hw * 2 + 20, 90, 40, o.cap); } }
  if (['kuba', 'mama', 'zosia', 'sasiad', 'babcia'].includes(kd)) { c.strokeStyle = 'rgba(255,255,255,.22)'; c.lineWidth = 8; c.lineCap = 'round'; c.beginPath(); c.arc(-30, -hh + 70, 90, Math.PI * 1.15, Math.PI * 1.45); c.stroke(); }
  if (kd === 'policjant') { fillRR(c, -hw - 14, -hh - 40, hw * 2 + 28, 70, 20, '#1A2848'); fillRR(c, -hw - 30, -hh + 20, hw * 2 + 60, 26, 13, '#0E1630'); circ(c, 0, -hh - 6, 20, '#F5C542'); }
  if (kd === 'strazak') { c.fillStyle = '#F5C542'; c.beginPath(); c.ellipse(0, -hh + 20, hw + 30, 120, 0, Math.PI, 0); c.fill(); fillRR(c, -hw - 40, -hh + 10, hw * 2 + 80, 30, 15, '#D9A82A'); fillRR(c, -60, -hh - 60, 120, 36, 8, '#C21B2A'); txt(c, 'PSP', 0, -hh - 42, 26, '#FFFFFF', 900); if (o.mask) { fillRR(c, -90, 30, 180, 120, 50, '#2A2D36'); circ(c, 0, 96, 30, '#4A4F58'); } }
}
// cała postać: y = stopy, s = skala (s=1 ≈ 1000 px)
function toon(c, x, y, s, o = {}) { const P = toonPal(o), kd = o.kind === 'kierowca' ? 'zly' : o.kind, t = o.t || 0; c.save(); c.translate(x, y); c.scale(s, s); const small = kd === 'zosia' ? .78 : 1; c.scale(small, small);
  const wk = o.walk != null ? Math.sin(o.walk) : 0, bob = o.walk != null ? Math.abs(Math.cos(o.walk)) * 10 : Math.sin(t * 2.2) * 3;
  ell(c, 0, 0, 160, 20, 'rgba(0,0,0,.3)');
  // nogi (krótkie) i buty
  for (const [sx, ph] of [[-1, wk], [1, -wk]]) { c.save(); c.translate(sx * 52, -250); c.rotate(ph * .3); fillRR(c, -42, 0, 84, 230, 36, P.pants); if (P.print === 'stripes') { c.fillStyle = 'rgba(255,255,255,.22)'; for (let k = 0; k < 4; k++) c.fillRect(-42, 30 + k * 52, 84, 16); } fillRR(c, -50, 210, 112, 52, 26, P.shoe); c.restore(); }
  c.translate(0, -bob);
  // tułów: miękka bryła, szersza u dołu
  const ty = -640, bw = kd === 'mama' || kd === 'zosia' || kd === 'babcia' ? 210 : 175; const g = c.createLinearGradient(-200, 0, 200, 0); g.addColorStop(0, shade(P.top, .06)); g.addColorStop(.6, P.top); g.addColorStop(1, P.top2); c.fillStyle = g;
  c.beginPath(); c.moveTo(-130, ty); c.quadraticCurveTo(-178, ty + 8, -178, ty + 90); c.lineTo(-bw, -230); c.quadraticCurveTo(0, -205, bw, -230); c.lineTo(178, ty + 90); c.quadraticCurveTo(178, ty + 8, 130, ty); c.closePath(); c.fill();
  c.save(); c.clip();
  if (P.print === 'stripes') { c.fillStyle = 'rgba(255,255,255,.2)'; for (let k = 0; k < 7; k++) c.fillRect(-220, ty + 50 + k * 58, 440, 18); }
  if (P.print === 'stars') for (let k = 0; k < 12; k++) txt(c, '★', -150 + (k % 4) * 100, ty + 80 + Math.floor(k / 4) * 120, 38, 'rgba(255,245,200,.8)', 900);
  if (P.print === 'robe') { c.fillStyle = P.top2; c.beginPath(); c.moveTo(-70, ty); c.lineTo(30, ty + 300); c.lineTo(70, ty + 300); c.lineTo(-20, ty); c.fill(); fillRR(c, -200, ty + 250, 400, 36, 10, P.top2); }
  if (P.print === 'zip') { c.strokeStyle = 'rgba(0,0,0,.35)'; c.lineWidth = 5; c.beginPath(); c.moveTo(0, ty + 30); c.lineTo(0, -210); c.stroke(); fillRR(c, -150, ty + 230, 100, 70, 10, P.top2); fillRR(c, 50, ty + 230, 100, 70, 10, P.top2); }
  if (P.print === 'police') { fillRR(c, -200, ty + 210, 400, 64, 0, '#D8E84A'); fillRR(c, -200, ty + 230, 400, 8, 0, '#C9CDD2'); fillRR(c, 30, ty + 90, 110, 46, 6, '#F2EEE4'); txt(c, 'POLICJA', 85, ty + 113, 18, '#1A2848', 900); }
  if (P.print === 'fire') { for (const yy of [ty + 200, ty + 300]) { fillRR(c, -200, yy, 400, 26, 0, '#D8E84A'); fillRR(c, -200, yy + 10, 400, 6, 0, '#C9CDD2'); } }
  if (P.print === 'cardigan') { for (let k = 0; k < 5; k++) circ(c, -16, ty + 70 + k * 70, 9, '#E8D8B0'); c.strokeStyle = 'rgba(255,255,255,.14)'; c.lineWidth = 5; for (let k = 0; k < 9; k++) { c.beginPath(); c.moveTo(-200 + k * 48, ty); c.lineTo(-200 + k * 48, -200); c.stroke(); } }
  if (o.vest) { fillRR(c, -180, ty + 20, 360, 380, 16, '#F2C200'); fillRR(c, -180, ty + 220, 360, 26, 0, '#C9CDD2'); fillRR(c, -120, ty + 80, 240, 64, 8, '#F2EEE4'); txt(c, o.vest, 0, ty + 112, 24, '#14161B', 900); }
  c.restore();
  c.save(); c.globalAlpha = .18; ell(c, 0, ty + 14, 150, 40, '#000'); c.restore(); c.strokeStyle = 'rgba(0,0,0,.12)'; c.lineWidth = 6; c.lineCap = 'round'; for (const [a1, b1, a2, b2] of [[-120, ty + 300, -80, -260], [110, ty + 330, 70, -250], [-40, ty + 380, -30, -240]]) { c.beginPath(); c.moveTo(a1, b1); c.quadraticCurveTo((a1 + a2) / 2 + 20, (b1 + b2) / 2, a2, b2); c.stroke(); }
  // kołnierz
  if (kd === 'kuba' || kd === 'zosia') { c.fillStyle = 'rgba(255,255,255,.85)'; c.beginPath(); c.moveTo(-70, ty + 2); c.lineTo(0, ty + 70); c.lineTo(70, ty + 2); c.lineTo(40, ty + 2); c.lineTo(0, ty + 44); c.lineTo(-40, ty + 2); c.fill(); }
  if (kd === 'zly' || kd === 'sasiad') { c.fillStyle = P.top2; c.beginPath(); c.moveTo(-110, ty - 6); c.lineTo(-20, ty + 80); c.lineTo(-60, ty + 100); c.lineTo(-140, ty + 20); c.fill(); c.beginPath(); c.moveTo(110, ty - 6); c.lineTo(20, ty + 80); c.lineTo(60, ty + 100); c.lineTo(140, ty + 20); c.fill(); }
  // ręce: rękaw + mitenkowa dłoń z kciukiem
  const hand = (hx, hy) => { circ(c, hx, hy, 34, P.skin); ell(c, hx + 22, hy - 14, 12, 16, P.skin); };
  const sleeve = (x0, y0, x1, y1) => { c.strokeStyle = shade(P.top, -.04); c.lineWidth = 74; c.lineCap = 'round'; c.beginPath(); c.moveTo(x0, y0); c.quadraticCurveTo((x0 + x1) / 2 + (x0 < 0 ? -30 : 30), (y0 + y1) / 2, x1, y1); c.stroke(); if (P.print === 'stripes') { c.strokeStyle = 'rgba(255,255,255,.18)'; c.lineWidth = 74; c.setLineDash([16, 40]); c.beginPath(); c.moveTo(x0, y0); c.quadraticCurveTo((x0 + x1) / 2 + (x0 < 0 ? -30 : 30), (y0 + y1) / 2, x1, y1); c.stroke(); c.setLineDash([]); } };
  const A = o.arms || (o.item ? 'hold' : 'down'), sw = o.walk != null ? Math.sin(o.walk) * 60 : 0;
  const L = A === 'up' ? [-230, ty - 160] : A === 'hold' || A === 'phone' ? [-60, ty + 230] : [-200 - sw * .3, -300 + sw], R = A === 'up' ? [230, ty - 160] : A === 'reach' || A === 'point' ? [330, ty + 120] : A === 'hold' ? [60, ty + 230] : A === 'phone' ? [120, ty + 40] : [200 + sw * .3, -300 - sw];
  sleeve(-150, ty + 70, L[0], L[1] - 30); sleeve(150, ty + 70, R[0], R[1] - 30);
  if (o.item === 'teddy') { c.save(); c.translate(0, ty + 230); circ(c, 0, 0, 74, '#B0773A'); circ(c, 0, -92, 58, '#B0773A'); circ(c, -44, -136, 22, '#B0773A'); circ(c, 44, -136, 22, '#B0773A'); circ(c, -20, -98, 7, '#14161B'); circ(c, 20, -98, 7, '#14161B'); ell(c, 0, -78, 18, 12, '#E8C79A'); c.restore(); }
  if (o.item === 'mug') { fillRR(c, -50, ty + 160, 100, 110, 16, '#F2EEE4'); }
  if (A === 'phone' || o.item === 'phone') { c.save(); c.translate(R[0] - 10, R[1] - 80); fillRR(c, -30, -56, 60, 112, 10, '#14161B'); fillRR(c, -24, -50, 48, 100, 6, '#5FD0FF'); c.restore(); }
  if (o.item === 'flash') { c.save(); c.translate(R[0], R[1] - 40); fillRR(c, -18, -50, 36, 100, 10, '#14161B'); c.globalCompositeOperation = 'lighter'; const lg = c.createRadialGradient(0, -50, 5, 0, -500, 500); lg.addColorStop(0, 'rgba(255,250,220,.55)'); lg.addColorStop(1, 'rgba(255,250,220,0)'); c.fillStyle = lg; c.beginPath(); c.moveTo(-12, -50); c.lineTo(-280, -900); c.lineTo(280, -900); c.lineTo(12, -50); c.fill(); c.restore(); }
  hand(L[0], L[1]); hand(R[0], R[1]);
  // głowa osadzona na ramionach (bez szyi)
  c.save(); c.translate(0, ty - 140); toonHead(c, Object.assign({ kind: kd }, o), P); c.restore();
  c.restore(); }
// zbliżenie (głowa + ramiona), jak we wzorze
function toonClose(c, lt, kind, expr, o = {}) { const bg = o.bg || '#1A1E2A'; c.fillStyle = bg; c.fillRect(0, 0, W, H); if (o.scene) o.scene(c, lt); toon(c, 540, (o.y || 880) + 780 * (o.s || 2.0), o.s || 2.0, Object.assign({ kind, expr, t: lt }, o)); if (o.night !== false) night(c, o.n ?? .3, [{ x: 540, y: o.y || 880, r: 700, a: .9 }]); }
// podmiana: wszystkie postacie w odcinku rysuje „toon”
function personHD(c, x, y, s, o = {}) { toon(c, x, y, s, o); }
function villainFace(c, lt, s = 1.5, ex = 'cold') { c.fillStyle = '#0E120E'; c.fillRect(0, 0, W, H); for (let x = 0; x < W; x += 70) { c.fillStyle = 'rgba(60,80,60,.18)'; c.fillRect(x, 0, 30, H); } toon(c, 540, 860 + 780 * s * 1.45, s * 1.45, { kind: 'kierowca', expr: ex, t: lt, look: 0, noBlink: true }); NIGHT(c, .3, 540, 860, 760); }

function TFACE(kd, ex, o = {}) { return (c, lt) => toonClose(c, lt, kd === 'kierowca' ? 'kierowca' : kd, ex, o); }
