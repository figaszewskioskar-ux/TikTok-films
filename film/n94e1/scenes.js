// NOCNY N94 · ODC. 1 — „Nie siadaj z tyłu!”: Ola wraca nocnym autobusem. Na każdym przystanku ten sam pasażer siada bliżej.
window.EP = {
  badge: 'NOCNY N94 · ODC. 1',
  loop: false,
  vignette: .84,
  cues(add) {
    add(0.2, 'stab'); add(16.2, 'whoosh'); add(29.0, 'door'); add(36.2, 'error');
    add(41.0, 'door'); add(46.0, 'hit'); add(55.0, 'door'); add(59.0, 'creak'); add(63.0, 'hit'); add(66.4, 'error');
    add(70.0, 'click'); add(72.6, 'door'); add(76.0, 'hit');
    add(83.0, 'error'); add(90.0, 'whoosh'); add(97.0, 'door'); add(105.0, 'notif');
    add(112.4, 'whoosh'); add(120.0, 'creak'); add(124.4, 'hit');
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

// ===================== SCENY =====================
// 0. HAK: w pustym autobusie ktoś siedzi tuż za Olą
scene({
  name: 'hook', start: 0, end: 6,
  draw(c, lt) {
    busInside(c, lt, { led: 'N94 · KASZTANOWA' });
    person(c, 'pasazer', 70, 1520, 1.9, { t: lt, look: 1, mouth: 'grin', still: true }); // stoi tuż za nią
    seatBack(c, SEATS[0]); seated(c, 'ola', SEATS[0], lt, { look: -1, wide: true }); seatBase(c, SEATS[0]);
    for (const x of SEATS.slice(1)) { seatBack(c, x); seatBase(c, x); }
    night(c, .62, [{ x: 300, y: 1000, r: 500, a: .8, tint: 'rgba(255,240,200,.06)' }]);
    bigSign(c, lt, 'NIE SIADAJ', 'Z TYŁU!', 360);
  },
});
// 1. IMPREZA: urodziny Zuzi, Ola wychodzi sama na nocny autobus
scene({
  name: 'party', start: 6, end: 16,
  labels: [[0.3, 3.6, '00:38 · URODZINY ZUZI', 540, 300, 'dark', 38]],
  bubbles: [
    say(1.4, 3.6, 'Na pewno nie zostaniesz\nna noc?', 'zuzia', 470, 1560, 1.85, -40),
    say(3.8, 6.0, 'Obiecałam mamie.\nZłapię nocny.', 'ola', 800, 1560, 1.9, -40),
    say(6.2, 7.4, 'Napisz, jak dojedziesz!', 'zuzia', 470, 1560, 1.85, -40),
    say(7.5, 8.2, 'Jasne!', 'ola', 800, 1560, 1.9, -40),
  ],
  draw(c, lt, sc) {
    const open = lt < 8.4;
    corridorBg(c, lt, { open, num: '52', num2: '51', floor: '5' });
    if (open) { // impreza w środku: kolorowe światła, balony, tańczący znajomi
      c.save(); c.beginPath(); c.rect(330, 560, 380, 840); c.clip();
      const hue = (lt * 90) % 360; c.fillStyle = `hsla(${hue},80%,55%,.35)`; c.fillRect(330, 560, 380, 840);
      for (let k = 0; k < 3; k++) { const dx = 380 + k * 120, bob = Math.sin(lt * 7 + k * 2) * 14; c.save(); c.globalAlpha = .7; person(c, ['sasiad', 'kurier', 'sasiad'][k], dx, 1300 + bob, 1.1, { t: lt, aL: 1.6 + Math.sin(lt * 7 + k) * .4, aR: 1.6 - Math.sin(lt * 7 + k) * .4, still: true }); c.restore(); }
      for (let k = 0; k < 4; k++) { circ(c, 360 + k * 95, 620 + Math.sin(lt * 1.5 + k) * 10, 26, ['#E85A4F', '#F5C542', '#4FA8E8', '#F28CB1'][k]); c.strokeStyle = 'rgba(255,255,255,.5)'; c.lineWidth = 2; c.beginPath(); c.moveTo(360 + k * 95, 646); c.lineTo(360 + k * 95, 740); c.stroke(); }
      c.restore();
      // nuty muzyki wylatują przez drzwi
      for (let k = 0; k < 5; k++) { const p = (lt * .4 + k / 5) % 1; txt(c, '♪', 700 + p * 260, 900 - p * 300 + Math.sin(p * 9 + k) * 20, 40, `rgba(255,230,160,${1 - p})`, 900); }
      person(c, 'zuzia', 470, 1560, 1.85, { t: lt, look: 1, mouth: talking(sc, 'zuzia', lt) ? null : 'smile', talk: talking(sc, 'zuzia', lt), aR: lt > 6.2 && lt < 7.4 ? 2.2 : null });
    }
    const ox = lt < 8.6 ? 800 : mv(lt, 8.6, 10, 800, 1180);
    person(c, 'ola', ox, 1560, 1.9, { t: lt, look: lt < 8.4 ? -1 : 1, mouth: talking(sc, 'ola', lt) ? null : (lt < 8.4 ? 'smile' : null), talk: talking(sc, 'ola', lt), walk: lt > 8.6 ? lt * 9 : null });
    night(c, open ? .45 : .8, [{ x: 520, y: 1000, r: open ? 600 : 200, a: .9, tint: open ? 'rgba(255,120,200,.10)' : null }, { x: ox, y: 1100, r: 320, a: .5 }]);
  },
  post(c, lt) { if (lt > 8.4 && lt < 10) label(c, 'DRZWI SIĘ ZAMYKAJĄ. CISZA.', 540, 300, 'dark', 38, lt - 8.4, 10 - lt); },
});
// 1. PRZYSTANEK: 00:45, telefon 3%, wiadomość do mamy
scene({
  name: 'stop', start: 16, end: 28,
  labels: [[0.3, 4, '00:45 · PRZYSTANEK PARK LEŚNY', 540, 300, 'dark', 38]],
  bubbles: [say(4.2, 7.6, 'Mamo, jestem na przystanku.\nN94 za dwie minuty.', 'ola', 470, 1400, 1.9, 40)],
  draw(c, lt, sc) {
    stopBg(c, lt, { led: lt < 8 ? 'N94  KASZTANOWA  2 min' : 'N94  KASZTANOWA  >>>' });
    person(c, 'ola', 470, 1400, 1.9, { t: lt, phone: 2, aR: 2.4, look: 1, talk: talking(sc, 'ola', lt) });
    breathPuff(c, 520, 1400 - 560, lt);
    snowfall(c, lt);
    night(c, .55, [{ x: 920, y: 900, r: 560, a: .8, tint: 'rgba(255,190,110,.06)' }, { x: 450, y: 900, r: 420, a: .6 }]);
  },
  post(c, lt) { if (lt > 8.4) { fillRR(c, 380, 1560, 320, 74, 37, 'rgba(10,10,14,.85)'); txt(c, 'BATERIA 3%', 540, 1598, 40, Math.floor(lt * 2) % 2 ? '#FF3B30' : '#FF8A80', 900); } },
});
function breathPuff(c, x, y, lt) { for (let i = 0; i < 3; i++) { const p = ((lt * .7 + i / 3) % 1); c.fillStyle = `rgba(230,235,245,${.2 * (1 - p)})`; c.beginPath(); c.arc(x + p * 60, y - p * 50, 10 + p * 26, 0, 7); c.fill(); } }
// 2. WSIADA: autobus podjeżdża, kierowca, Ola idzie na sam koniec (BŁĄD 1)
scene({
  name: 'board', start: 28, end: 40,
  bubbles: [say(5.4, 6.6, 'Dobry wieczór.', 'kierowca', 900, 1500, 1.8, -60), say(6.8, 7.8, 'Dobry wieczór.', 'ola', 560, 1520, 1.9, 0)],
  draw(c, lt, sc) {
    if (lt < 4.6) { // autobus podjeżdża pod wiatę, drzwi się otwierają
      stopBg(c, lt, { led: 'N94  KASZTANOWA  >>>', road: lt * 300 });
      busOutside(c, lt, { x: lerp(2200, 1300, eout(clamp(lt / 2.8))), open: lt > 3.2 });
      person(c, 'ola', 470, 1400, 1.9, { t: lt, look: 1, phone: 2, aR: .9 });
      snowfall(c, lt);
      night(c, .5, [{ x: 920, y: 900, r: 560, a: .8 }, { x: 900, y: 1150, r: 500, a: .7 }]);
      return;
    }
    // w środku: kierowca w kabinie po prawej, Ola idzie na tył (w lewo)
    busInside(c, lt, { led: 'NASTĘPNY: ŁĄKOWA', speed: lt < 7 ? 0 : clamp((lt - 7) / 2) });
    for (const x of SEATS.slice(0, 3)) { seatBack(c, x); seatBase(c, x); }
    fillRR(c, 820, 900, 260, 520, 10, '#1E2028'); fillRR(c, 840, 1000, 220, 30, 6, '#3A3F4C'); // kabina kierowcy
    person(c, 'kurier', 900, 1500, 1.8, { t: lt, look: -1, talk: talking(sc, 'kierowca', lt) });
    const ox = lt < 7.8 ? 560 : mv(lt, 7.8, 10.4, 560, SEATS[0] + 90);
    if (lt < 10.4) person(c, 'ola', ox, 1520, 1.9, { t: lt, look: lt < 7.8 ? 1 : -1, walk: lt > 7.8 ? lt * 10 : null, talk: talking(sc, 'ola', lt) });
    else { seatBack(c, SEATS[0]); seated(c, 'ola', SEATS[0], lt, { look: 1 }); seatBase(c, SEATS[0]); }
    night(c, .45, [{ x: 540, y: 300, r: 900, a: .8 }]);
  },
  post(c, lt) { if (lt > 9.6) card(c, 70, 300, 860, 'BŁĄD 1', 'usiadła na samym końcu,\ndaleko od kierowcy', lt - 9.6, '#F39C12', 40); },
});
// 3. ŁĄKOWA: wsiada pasażer. Pusty autobus — a on siada blisko
scene({
  name: 'ride1', start: 40, end: 54,
  draw(c, lt) {
    const cam = lt > 7.6;
    busInside(c, lt, { led: lt < 6 ? 'PRZYSTANEK: ŁĄKOWA' : 'NASTĘPNY: OGRODOWA', speed: lt < 5 ? 0 : 1 });
    for (const x of SEATS) { seatBack(c, x); }
    seated(c, 'ola', SEATS[0], lt, { look: 1, wide: lt > 4 });
    if (lt < 4.6) person(c, 'pasazer', mv(lt, 1.0, 4.6, 1180, SEATS[3] + 90), 1500, 1.9, { t: lt, look: -1, walk: lt > 1 ? lt * 8 : null, mouth: 'grin' });
    else seated(c, 'pasazer', SEATS[3], lt, { look: -1, mouth: 'grin' });
    for (const x of SEATS) seatBase(c, x);
    night(c, .45, [{ x: 540, y: 300, r: 900, a: .8 }]);
    if (cam) cctv(c, lt, 'CAM 3 · N94 · TYŁ');
  },
  post(c, lt) { if (lt > 5.0 && lt < 9.0) label(c, 'CAŁY AUTOBUS PUSTY', 540, 420, 'dark', 40, lt - 5.0, 9.0 - lt); },
});
// 4. OGRODOWA: przesiada się bliżej. „Zimno dziś, prawda?” — odbicie w szybie, telefon gaśnie
scene({
  name: 'ride2', start: 54, end: 68,
  bubbles: [say(4.4, 6.4, 'Zimno dziś, prawda?', 'pasazer', SEATS[1] + 60, 1394, 1.6, 60), say(6.6, 7.6, '…Tak.', 'ola', SEATS[0] + 60, 1394, 1.6, 40)],
  draw(c, lt, sc) {
    if (lt < 9.0) {
      busInside(c, lt, { led: lt < 2 ? 'PRZYSTANEK: OGRODOWA' : 'NASTĘPNY: KASZTANOWA', speed: lt < 1.6 ? 0 : 1 });
      for (const x of SEATS) seatBack(c, x);
      seated(c, 'ola', SEATS[0], lt, { look: 1, wide: true, mouth: talking(sc, 'ola', lt) ? null : 'o', talk: talking(sc, 'ola', lt) });
      const px = lt < 1.0 ? SEATS[3] : lt < 3.4 ? null : SEATS[1];
      if (px === null) person(c, 'pasazer', mv(lt, 1.0, 3.4, SEATS[3] + 90, SEATS[1] + 90), 1500, 1.9, { t: lt, look: -1, walk: lt * 8, mouth: 'grin' });
      else seated(c, 'pasazer', px, lt, { look: -1, mouth: 'grin', talk: talking(sc, 'pasazer', lt) });
      for (const x of SEATS) seatBase(c, x);
      night(c, .5, [{ x: 400, y: 1000, r: 600, a: .8 }]);
      return;
    }
    // odbicie w ciemnej szybie: on nie odrywa od niej wzroku. Telefon: 1% → gaśnie
    const l = lt - 9.0;
    busInside(c, lt, { led: 'NASTĘPNY: KASZTANOWA', reflect: .45, reflectX: 680 });
    c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(0, 960, W, 960);
    bigPhone(c, (cc, x, y, w, h) => {
      cc.fillStyle = l < 3.4 ? '#0F1014' : '#000'; cc.fillRect(x, y, w, h); if (l >= 3.4) return;
      fillRR(cc, x + 24, y + 120, w - 48, 90, 16, '#2F6FE0'); txt(cc, 'Mamo, ktoś dziwny w autobusie', x + 44, y + 165, 24, '#fff', 800, 'left');
      txt(cc, 'Wysyłanie…', x + w - 40, y + 240, 22, '#AEB0C2', 700, 'right');
      fillRR(cc, x + w / 2 - 90, y + h - 160, 180, 60, 30, 'rgba(215,38,61,.95)'); txt(cc, 'BATERIA 1%', x + w / 2, y + h - 130, 30, '#fff', 900);
    }, 1, 1000);
  },
  post(c, lt) { const l = lt - 9.0; if (l > 3.6) label(c, 'TELEFON SIĘ WYŁĄCZYŁ', 540, 420, 'red', 40, l - 3.6, 9); },
});
// 5. KASZTANOWA: Ola wciska STOP. On też wstaje. Wysiadają razem
scene({
  name: 'getoff', start: 68, end: 80,
  draw(c, lt) {
    if (lt < 6.4) {
      busInside(c, lt, { led: 'PRZYSTANEK: KASZTANOWA', speed: lt < 3 ? 1 - lt / 3 : 0 });
      for (const x of SEATS) seatBack(c, x);
      if (lt < 1.8) seated(c, 'ola', SEATS[0], lt, { look: 1, wide: true }); else person(c, 'ola', mv(lt, 1.8, 4.6, SEATS[0] + 90, 640), 1520, 1.9, { t: lt, look: 1, wide: true, walk: lt > 2.2 ? lt * 10 : null, aR: lt > 1.8 && lt < 2.4 ? 1.6 : .14 });
      if (lt < 3.2) seated(c, 'pasazer', SEATS[1], lt, { look: -1, mouth: 'grin' }); else person(c, 'pasazer', mv(lt, 3.2, 6.0, SEATS[1] + 90, 420), 1520, 1.9, { t: lt, look: 1, mouth: 'grin', walk: lt * 8 });
      for (const x of SEATS) seatBase(c, x);
      night(c, .45, [{ x: 540, y: 300, r: 900, a: .8 }]);
      if (lt > 1.8 && lt < 2.1) { c.fillStyle = 'rgba(255,60,60,.25)'; c.fillRect(0, 0, W, H); }
      return;
    }
    // z zewnątrz: autobus odjeżdża, na przystanku zostają oboje
    const l = lt - 6.4;
    stopBg(c, lt, { led: 'KASZTANOWA' });
    busOutside(c, lt, { x: lerp(1300, 3400, eio(clamp(l / 3))) });
    person(c, 'ola', 640, 1400, 1.9, { t: lt, look: -1, wide: true, mouth: 'o' });
    person(c, 'pasazer', 260, 1400, 1.9, { t: lt, look: 1, mouth: 'grin' });
    snowfall(c, lt);
    night(c, .55, [{ x: 920, y: 900, r: 560, a: .8 }, { x: 450, y: 1000, r: 420, a: .6 }]);
  },
  post(c, lt) { if (lt > 3.4 && lt < 6.4) label(c, 'ON TEŻ WSTAJE', 540, 420, 'red', 44, lt - 3.4, 6.4 - lt); },
});
// 6. ULICA: Ola idzie w stronę bloku (BŁĄD 2), on za nią. Skręca do sklepu 24h
scene({
  name: 'street', start: 80, end: 96,
  bubbles: [say(8.6, 10.6, 'Nie do domu…\nnie do domu.', 'ola', 640, 1500, 1.7, -60)],
  draw(c, lt, sc) {
    streetBg(c, lt, { shop: lt > 6 });
    // ślady na śniegu
    for (let k = 0; k < 10; k++) { const fx = 80 + k * 60, fy = 1560 + (k % 2) * 30; ell(c, fx, fy, 14, 7, 'rgba(90,100,130,.35)'); }
    const ox = lt < 8.4 ? mv(lt, 0, 8.4, 200, 640) : lt < 10.8 ? 640 : mv(lt, 10.8, 15.2, 640, 980);
    person(c, 'ola', ox, 1500, 1.7, { t: lt, look: lt > 4 && lt < 6 ? -1 : 1, wide: lt > 4, walk: lt < 8.4 || lt > 10.8 ? lt * 9 : null, talk: talking(sc, 'ola', lt) });
    const px = lt < 10.8 ? mv(lt, 0, 10.8, -260, 260) : mv(lt, 10.8, 15.6, 260, 560);
    person(c, 'pasazer', px, 1500, 1.7, { t: lt, look: 1, mouth: 'grin', walk: lt * 7 });
    // długie cienie na śniegu
    c.save(); c.globalAlpha = .25; c.fillStyle = '#0A0C14'; c.beginPath(); c.ellipse(px + 160, 1520, 220, 22, 0, 0, 7); c.fill(); c.restore();
    snowfall(c, lt, 60, .7);
    night(c, .62, [{ x: 126, y: 900, r: 460, a: .6 }, { x: 786, y: 900, r: 460, a: .6 }, { x: 990, y: 950, r: lt > 6 ? 460 : 0, a: .8 }]);
  },
  post(c, lt) {
    if (lt > 1.0 && lt < 6.0) card(c, 70, 300, 860, 'BŁĄD 2', 'szła prosto do domu,\na on szedł za nią', lt - 1.0, '#F39C12', 40);
    if (lt > 4.2 && lt < 6.0) label(c, 'KROKI ZA NIĄ', 540, 760, 'red', 38, lt - 4.2, 6.0 - lt);
  },
});
// 7. SKLEP 24h: kasjerka dzwoni na policję. On stoi pod latarnią i patrzy. ZASADA (bez czytania)
scene({
  name: 'shop', start: 96, end: 112,
  bubbles: [
    say(1.4, 4.4, 'Przepraszam… ktoś za mną idzie.\nMogę tu zostać?', 'ola', 560, 1600, 1.9, 0),
    say(4.6, 7.4, 'Siadaj tu, kochanie.\nDzwonię na policję.', 'kasjerka', 900, 1600, 1.9, -60),
  ],
  draw(c, lt, sc) {
    shopBg(c, lt, { outside: lt > .4 && lt < 13.0 ? clamp((lt - .4) / .6) * (lt > 12 ? (13 - lt) : 1) : 0 });
    person(c, 'kobieta', 900, 1600, 1.9, { t: lt, look: -1, phone: lt > 7 ? 2 : 0, aR: lt > 7 ? 2.4 : .14, talk: talking(sc, 'kasjerka', lt) });
    person(c, 'ola', mv(lt, 0, 1.2, 300, 560), 1600, 1.9, { t: lt, look: lt > 9 ? -1 : 1, wide: true, walk: lt < 1.2 ? lt * 10 : null, talk: talking(sc, 'ola', lt) });
    night(c, .12, []);
  },
  post(c, lt) {
    if (lt > 8.2) card(c, 60, 260, 900, 'ZASADA', 'Ktoś idzie za tobą? Nie prowadź go\npod dom. Wejdź tam, gdzie są ludzie\ni światło, i dzwoń na 112.', lt - 8.2, '#F39C12', 36);
    if (lt > 12.6 && lt < 15.6) label(c, 'POSZEDŁ SOBIE?', 540, 760, 'dark', 40, lt - 12.6, 15.6 - lt);
  },
});
// 8. ZAKOŃCZENIE: monitor kamer — CAM 1 pusto, CAM 2: on stoi w sklepie, tuż za Olą
scene({
  name: 'end', start: 112, end: 130,
  cam: lt => { const sh = lt > 12.4 && lt < 13.0 ? (13.0 - lt) * 30 : 0; return { z: 1, x: Math.sin(lt * 90) * sh, y: 0 }; },
  labels: [[15.0, 18, 'ODC. 2 ↓', 540, 1650, 'red', 64]],
  bubbles: [say(0.6, 2.6, 'Poszedł sobie.\nJuż dobrze.', 'kasjerka', 900, 1600, 1.9, -60)],
  draw(c, lt, sc) {
    if (lt < 3.0) {
      shopBg(c, lt, {});
      person(c, 'kobieta', 900, 1600, 1.9, { t: lt, look: -1, talk: talking(sc, 'kasjerka', lt) });
      person(c, 'ola', 560, 1600, 1.9, { t: lt, look: 1 });
      return;
    }
    // monitor kamer w dużym planie: cztery okna
    const l = lt - 3.0;
    c.fillStyle = '#050607'; c.fillRect(0, 0, W, H);
    fillRR(c, 40, 420, 1000, 1040, 20, '#1B1D22');
    const cells = [[60, 440], [550, 440], [60, 950], [550, 950]], cw = 470, ch = 490;
    cells.forEach(([x, y], i) => {
      c.save(); c.beginPath(); c.rect(x, y, cw, ch); c.clip();
      c.translate(x, y); c.scale(cw / W, ch / H);
      if (i === 0) { streetBg(c, lt, { shop: true }); } // CAM 1: ulica — pusto
      else if (i === 1) { // CAM 2: alejka — Ola przy ladzie, za nią on
        shopBg(c, lt, { flicker: l > 6.4 }); person(c, 'ola', 560, 1600, 1.9, { t: lt, look: 1 });
        const a = clamp((l - 2.2) / 1.6); if (a > 0) { c.save(); c.globalAlpha = a; person(c, 'pasazer', 360, 1600, 1.9, { t: lt, look: 1, mouth: 'grin', still: true }); c.restore(); }
      } else if (i === 2) { shopBg(c, lt, {}); } // CAM 3: zaplecze
      else { stopBg(c, lt, { led: 'KASZTANOWA' }); } // CAM 4: przystanek
      c.restore();
      c.save(); c.globalCompositeOperation = 'saturation'; c.fillStyle = '#808080'; c.fillRect(x, y, cw, ch); c.restore();
      c.fillStyle = 'rgba(70,110,90,.18)'; c.fillRect(x, y, cw, ch);
      txt(c, 'CAM ' + (i + 1), x + 14, y + 26, 22, '#E8F0E8', 800, 'left');
    });
    if (l > 2.2) { c.strokeStyle = Math.floor(lt * 4) % 2 ? '#FF3B30' : 'rgba(255,59,48,.3)'; c.lineWidth = 6; c.strokeRect(552, 442, cw - 4, ch - 4); }
    night(c, l > 6.4 ? .55 : .3, [{ x: 540, y: 940, r: 700, a: .6 }]);
    if (l > 9.4 && l < 9.65) { c.fillStyle = 'rgba(255,255,255,.55)'; c.fillRect(0, 0, W, H); }
    if (l > 10.2) { c.fillStyle = `rgba(0,0,0,${clamp((l - 10.2) / 1.2) * .88})`; c.fillRect(0, 0, W, H); }
  },
  post(c, lt) { const l = lt - 3.0; if (l > 2.6 && l < 6.0) label(c, 'CAM 2 · ZA NIĄ', 540, 330, 'red', 42, l - 2.6, 6.0 - l); },
});
