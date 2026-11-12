// BLOK 94 · „KTO TAM?” ODC. 9 — „Nie klikaj w link!”: nagranie z wczoraj, link od k4ptur_94, Bluetooth w nocy.
window.EP = {
  badge: 'BLOK 94 · ODC. 9',
  loop: false,
  vignette: .78,
  PREVIEW: false, // true = napisy z planowanym tekstem lektora (wersja 2: więcej dialogów)
  cues(add) {
    add(0.2, 'stab'); add(6.2, 'whoosh'); add(13.6, 'creak'); add(17.4, 'hit');
    add(24.6, 'notif'); add(29.4, 'error'); add(35.0, 'click'); add(38.6, 'error');
    add(44.6, 'slam'); add(47.0, 'click'); add(55.0, 'knock'); add(63.0, 'notif');
    add(69.0, 'door'); add(76.4, 'whoosh'); add(84.4, 'vib'); add(90.0, 'notif');
    add(99.0, 'notif'); add(108.6, 'creak'); add(112.6, 'hit');
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
// dymek nad głową mówiącej postaci: ogonek wskazuje jej głowę (px, py = stopy, s = skala)
function say(a, b, text, who, px, py, s, dx = 0, lift = 0) { const top = py - 312 * s; return [a, b, text, clamp(px + dx, 200, 880), top - 18 - lift, px, top + 12, who]; }
function sayPhone(a, b, text, who, px, py, dx = 0, up = 60) { return [a, b, text, clamp(px + dx, 200, 880), py - up, px, py, who]; }
function talking(sc, who, lt) { return (sc.bubbles || []).some(b => b[7] === who && lt >= b[0] && lt < b[0] + Math.min(b[1] - b[0] - .2, .055 * b[2].length + .3)); }
function laptop(c, x, y, fn) {
  fillRR(c, x, y, 560, 360, 18, '#1B1D22'); c.save(); rr(c, x + 18, y + 18, 524, 300, 8); c.clip(); fn(c, x + 18, y + 18, 524, 300); c.restore();
  fillRR(c, x - 60, y + 360, 680, 30, 12, '#2B2E35'); circ(c, x + 280, y + 9, 4, '#111');
}
// pokój Kuby: tapeta, plakat z grą, półka z figurkami, łóżko, biurko, kaloryfer, drzwi pokoju po prawej
function kubaRoom(c, lt, o = {}) {
  c.fillStyle = '#262B3D'; c.fillRect(0, 0, W, H);
  for (let i = 0; i < 18; i++) { c.fillStyle = 'rgba(255,255,255,.025)'; c.fillRect(i * 64, 0, 26, 1400); }
  c.fillStyle = '#1F1A22'; c.fillRect(0, 1400, W, 520); fillRR(c, 0, 1396, W, 26, 0, '#171319');
  for (let r = 0; r < 10; r++) for (let q = -1; q < 12; q++) { c.fillStyle = (r + q) % 2 ? 'rgba(0,0,0,.12)' : 'rgba(255,255,255,.02)'; c.fillRect(q * 100 + (r % 2) * 50, 1424 + r * 50, 96, 46); }
  // plakat z grą i półka z figurkami
  fillRR(c, 60, 300, 210, 280, 6, '#1BB0A3'); fillRR(c, 72, 312, 186, 256, 4, '#0F2A3A'); txt(c, 'LEVEL 94', 165, 520, 28, '#F5C542', 900); circ(c, 165, 420, 52, '#E08A0B');
  fillRR(c, 300, 620, 240, 14, 3, '#5A4632'); for (let i = 0; i < 4; i++) { fillRR(c, 318 + i * 56, 560, 34, 60, 10, ['#D7263D', '#5C7DB5', '#30A46C', '#F5C542'][i]); circ(c, 335 + i * 56, 552, 14, ['#D7263D', '#5C7DB5', '#30A46C', '#F5C542'][i]); }
  // kaloryfer pod oknem
  for (let i = 0; i < 9; i++) fillRR(c, 300 + i * 26, 1230, 20, 150, 8, '#C9CDD2');
  // drzwi pokoju (prawa ściana)
  const dx = 840, dy = 520, dw = 220, dh = 880;
  fillRR(c, dx - 14, dy - 14, dw + 28, dh + 14, 4, '#3B2E22');
  if (o.door) { c.fillStyle = '#05060A'; c.fillRect(dx, dy, dw, dh); const g = c.createLinearGradient(dx, 0, dx + dw, 0); g.addColorStop(0, 'rgba(255,220,160,.0)'); g.addColorStop(1, 'rgba(255,220,160,.08)'); c.fillStyle = g; c.fillRect(dx, dy, dw, dh);
    c.fillStyle = '#6E5A44'; c.beginPath(); c.moveTo(dx, dy); c.lineTo(dx + dw * (1 - o.door), dy + 30 * o.door); c.lineTo(dx + dw * (1 - o.door), dy + dh - 30 * o.door); c.lineTo(dx, dy + dh); c.fill(); }
  else { fillRR(c, dx, dy, dw, dh, 4, '#6E5A44'); c.strokeStyle = 'rgba(0,0,0,.25)'; c.lineWidth = 4; c.strokeRect(dx + 26, dy + 40, dw - 52, 340); c.strokeRect(dx + 26, dy + 440, dw - 52, 400); fillRR(c, dx + 20, dy + 450, 60, 14, 6, '#C9CDD2'); }
  // okno ze śniegiem i zasłoną
  fillRR(c, 560, 230, 240, 330, 6, '#0D1222'); c.fillStyle = '#3A4058'; c.fillRect(675, 230, 10, 330); c.fillRect(560, 390, 240, 10);
  circ(c, 760, 280, 22, '#E8E4CF'); circ(c, 770, 274, 20, '#0D1222');
  for (let k = 0; k < 14; k++) circ(c, 570 + hash(k) * 220, 240 + ((lt * 36 + hash(k + 7) * 310) % 310), 2.6, 'rgba(235,240,255,.75)');
  c.fillStyle = '#7A2F2F'; c.beginPath(); c.moveTo(540, 220); c.lineTo(600, 220); c.quadraticCurveTo(580, 400, 610, 580); c.lineTo(540, 580); c.fill();
  fillRR(c, 540, 212, 290, 12, 6, '#2A2D36'); fillRR(c, 550, 560, 260, 14, 4, '#D9DCE6');
  // zegar ścienny 22:47
  circ(c, 420, 250, 52, '#E8E4DA'); circ(c, 420, 250, 44, '#F6F3EA'); c.strokeStyle = '#14161B'; c.lineWidth = 6;
  { const hA = (10 + 47 / 60) / 12 * Math.PI * 2 - Math.PI / 2, mA = 47 / 60 * Math.PI * 2 - Math.PI / 2; c.beginPath(); c.moveTo(420, 250); c.lineTo(420 + Math.cos(hA) * 22, 250 + Math.sin(hA) * 22); c.stroke(); c.lineWidth = 3.5; c.beginPath(); c.moveTo(420, 250); c.lineTo(420 + Math.cos(mA) * 34, 250 + Math.sin(mA) * 34); c.stroke(); }
  // karteczki na ścianie
  [[300, 300, '#F5C542', -.08], [345, 330, '#7BC8F6', .06], [300, 360, '#F28CB1', .04]].forEach(([x, y, col, r]) => { c.save(); c.translate(x, y); c.rotate(r); fillRR(c, 0, 0, 40, 40, 2, col); c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(6, 12, 26, 3); c.fillRect(6, 22, 20, 3); c.restore(); });
  // róg łóżka z kocem w kratę
  fillRR(c, -40, 1150, 170, 270, 20, '#2E4A7A'); for (let i = 0; i < 4; i++) { c.fillStyle = 'rgba(255,255,255,.08)'; c.fillRect(-40 + i * 44, 1150, 14, 270); c.fillRect(-40, 1170 + i * 60, 170, 12); }
  // dywan we wzór
  ell(c, 560, 1640, 430, 110, '#4A2F2F'); ell(c, 560, 1640, 370, 88, '#5E3B3B'); c.strokeStyle = '#C9A15A'; c.lineWidth = 4; c.beginPath(); c.ellipse(560, 1640, 300, 66, 0, 0, 7); c.stroke();
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; circ(c, 560 + Math.cos(a) * 300, 1640 + Math.sin(a) * 66, 7, '#C9A15A'); }
  // komputer pod biurkiem ze świecącym paskiem
  fillRR(c, 700, 1120, 110, 260, 8, '#15171C'); c.fillStyle = `hsl(${(lt * 60) % 360},80%,55%)`; c.fillRect(712, 1130, 6, 240); circ(c, 790, 1150, 5, '#3BFF7A');
  // lampka biurkowa z ciepłym światłem i kubek z parą (blat na 1080)
  fillRR(c, 150, 1062, 60, 18, 6, '#2A2D36'); c.strokeStyle = '#2A2D36'; c.lineWidth = 8; c.beginPath(); c.moveTo(180, 1066); c.lineTo(150, 960); c.lineTo(190, 900); c.stroke();
  c.fillStyle = '#E08A0B'; c.beginPath(); c.moveTo(165, 878); c.lineTo(222, 898); c.lineTo(212, 940); c.lineTo(160, 922); c.fill();
  c.save(); c.globalCompositeOperation = 'lighter'; const lg = c.createRadialGradient(200, 1040, 10, 200, 1040, 260); lg.addColorStop(0, 'rgba(255,200,120,.35)'); lg.addColorStop(1, 'rgba(255,200,120,0)'); c.fillStyle = lg; c.fillRect(0, 780, 520, 520); c.restore();
  fillRR(c, 880, 1030, 40, 50, 8, '#D7263D'); c.strokeStyle = '#D7263D'; c.lineWidth = 6; c.beginPath(); c.arc(924, 1052, 12, -1.3, 1.3); c.stroke();
  for (let i = 0; i < 2; i++) { const p = (lt * .5 + i * .5) % 1; c.fillStyle = `rgba(230,235,245,${.25 * (1 - p)})`; c.beginPath(); c.arc(900 + Math.sin(p * 6 + i) * 8, 1020 - p * 70, 8 + p * 10, 0, 7); c.fill(); }
  // biurko z laptopem rysuje scena
}
const LAMP = { x: 190, y: 1010, r: 300, a: .85, tint: 'rgba(255,200,120,.08)' };
// pokój Oli nocą z drzwiami (prawa ściana)
function olaRoom(c, lt, o = {}) {
  ROOM(c);
  // lampki na sznurku nad łóżkiem
  c.strokeStyle = '#2A2D36'; c.lineWidth = 3; c.beginPath(); c.moveTo(90, 900); c.quadraticCurveTo(460, 990, 840, 900); c.stroke();
  for (let i = 0; i < 11; i++) { const u = i / 10, x = lerp(90, 840, u), y = 900 + Math.sin(u * Math.PI) * 45; const on = .55 + .45 * Math.sin(lt * 2 + i); c.save(); c.shadowColor = '#FFD27A'; c.shadowBlur = 16 * on; circ(c, x, y + 10, 7, `rgba(255,210,122,${.5 + .5 * on})`); c.restore(); }
  // zegar 02:47 na ścianie
  circ(c, 470, 300, 48, '#E8E4DA'); circ(c, 470, 300, 40, '#F6F3EA'); c.strokeStyle = '#14161B'; c.lineWidth = 5;
  { const hA = (2 + 47 / 60) / 12 * Math.PI * 2 - Math.PI / 2, mA = 47 / 60 * Math.PI * 2 - Math.PI / 2; c.beginPath(); c.moveTo(470, 300); c.lineTo(470 + Math.cos(hA) * 20, 300 + Math.sin(hA) * 20); c.stroke(); c.lineWidth = 3; c.beginPath(); c.moveTo(470, 300); c.lineTo(470 + Math.cos(mA) * 31, 300 + Math.sin(mA) * 31); c.stroke(); }
  // kapcie przy łóżku
  ell(c, 380, 1470, 40, 16, '#F28CB1'); ell(c, 470, 1478, 40, 16, '#F28CB1'); ell(c, 372, 1466, 16, 8, '#FFFFFF'); ell(c, 462, 1474, 16, 8, '#FFFFFF');
  const dx = 880, dy = 470, dw = 180, dh = 930;
  fillRR(c, dx - 12, dy - 12, dw + 24, dh + 12, 4, '#3B2E22');
  if (o.door) { c.fillStyle = '#030305'; c.fillRect(dx, dy, dw, dh); c.fillStyle = '#5E4A38'; c.beginPath(); c.moveTo(dx + dw, dy); c.lineTo(dx + dw * (o.door), dy + 26 * o.door); c.lineTo(dx + dw * (o.door), dy + dh - 26 * o.door); c.lineTo(dx + dw, dy + dh); c.fill(); }
  else { fillRR(c, dx, dy, dw, dh, 4, '#5E4A38'); fillRR(c, dx + 14, dy + 470, 50, 12, 6, '#C9CDD2'); }
}
function phoneScreen(cc, x, y, w, h, lt, o = {}) {
  cc.fillStyle = '#0B0D14'; cc.fillRect(x, y, w, h);
  txt(cc, o.clock || '02:47', x + w / 2, y + 180, 110, '#F4F1EA', 300);
  txt(cc, o.date || 'piątek, 14 listopada', x + w / 2, y + 260, 30, '#AEB0C2', 600);
  // ikonka: Wi-Fi wyłączone
  txt(cc, 'Wi-Fi: wyłączone', x + w / 2, y + 60, 22, '#FF6B6B', 800);
}
// napisy podglądu (planowany tekst lektora) — tylko w wersji do akceptacji
const SUBS = {};
function sub(name, a, b, t) { (SUBS[name] = SUBS[name] || []).push([a, b, t]); }
function drawSubs(c, name, lt) {
  if (!EP.PREVIEW) return;
  for (const [a, b, t] of SUBS[name] || []) if (lt >= a && lt < b) {
    font(c, 34, 700); const lines = []; let cur = '';
    for (const w of t.split(' ')) { const tr = cur ? cur + ' ' + w : w; if (c.measureText(tr).width > 900) { lines.push(cur); cur = w; } else cur = tr; }
    lines.push(cur); const y0 = 1820 - lines.length * 44;
    c.save(); c.globalAlpha = .92; fillRR(c, 60, y0 - 34, 960, lines.length * 44 + 26, 14, 'rgba(0,0,0,.72)'); c.restore();
    lines.forEach((l, i) => txt(c, l, 540, y0 + i * 44, 34, '#FFFFFF', 700));
  }
}

// 0. HAK: link na ekranie
scene({
  name: 'hook', start: 0, end: 6,
  draw(c, lt) {
    c.fillStyle = '#0A0B10'; c.fillRect(0, 0, W, H);
    laptop(c, 260, 760, (cc, x, y, w, h) => {
      cc.fillStyle = '#121624'; cc.fillRect(x, y, w, h); fillRR(cc, x, y, w, 50, 0, '#1B2033'); txt(cc, 'k4ptur_94', x + 20, y + 26, 22, '#fff', 800, 'left');
      fillRR(cc, x + 24, y + 80, w - 140, 120, 16, '#2A2F45'); txt(cc, 'chcesz wiedzieć,', x + 44, y + 118, 26, '#fff', 700, 'left'); txt(cc, 'kto cię nagrywa?', x + 44, y + 156, 26, '#fff', 700, 'left');
      const p = .6 + .4 * Math.sin(lt * 6); fillRR(cc, x + 24, y + 216, w - 140, 54, 14, `rgba(80,140,255,${p})`); txt(cc, 'bit.ly/k-94-kamera', x + 44, y + 243, 24, '#fff', 800, 'left');
    });
    // kursor zbliża się do linku
    const cx = lerp(820, 470, eio(prog(lt, .8, 4))), cy = lerp(1300, 1040, eio(prog(lt, .8, 4)));
    c.fillStyle = '#fff'; c.beginPath(); c.moveTo(cx, cy); c.lineTo(cx, cy + 46); c.lineTo(cx + 12, cy + 34); c.lineTo(cx + 26, cy + 58); c.lineTo(cx + 34, cy + 54); c.lineTo(cx + 22, cy + 30); c.lineTo(cx + 38, cy + 30); c.closePath(); c.fill();
    night(c, .75, [{ x: 540, y: 950, r: 560, a: .9, tint: 'rgba(120,170,255,.12)' }]);
    bigSign(c, lt, 'NIE KLIKAJ', 'W LINK!', 380);
  },
});
sub('hook', .2, 6, 'Jeśli obcy przysyła ci link… nie klikaj. Nawet jeśli obiecuje odpowiedź.');
// 1. POPRZEDNIO
scene({
  name: 'recap', start: 6, end: 12,
  labels: [[0.3, 6, 'ODC. 9', 540, 1500, 'yellow', 48]],
  draw(c, lt) {
    kubaRoom(c, lt);
    fillRR(c, 160, 1080, 760, 26, 6, '#4A3A2C');
    laptop(c, 260, 700, (cc, x, y, w, h) => { cc.fillStyle = '#1A1D28'; cc.fillRect(x, y, w, h); fillRR(cc, x + w * .62, y + 20, 110, h - 20, 4, '#0A0B10'); person(cc, 'kaptur', x + w * .62 + 55, y + h + 70, .7, { t: lt, glow: 1 }); person(cc, 'kuba', x + w * .36, y + h + 190, 1.1, { t: lt, wide: true, mouth: 'o' }); circ(cc, x + 22, y + 22, 7, Math.floor(lt * 2) % 2 ? '#FF3B30' : '#7A1A16'); });
    circ(c, 540, 709, 8, '#3BFF7A');
    night(c, .78, [{ x: 540, y: 860, r: 520, a: .95, tint: 'rgba(200,220,255,.1)' }, LAMP]);
  },
});
sub('recap', .2, 6, 'Poprzednio: kamerka w laptopie zapaliła się sama. Na podglądzie ktoś stał za Kubą.');
// 2. ZWROT: nikogo za nim — to nagranie z wczoraj
scene({
  name: 'turn', start: 12, end: 24,
  cam: lt => { const sh = lt > 9.0 && lt < 9.5 ? (9.5 - lt) * 24 : 0; return { z: 1, x: Math.sin(lt * 80) * sh, y: 0 }; },
  bubbles: [
    say(0.3, 1.4, 'Ola! Chodź tu! Szybko!', 'kuba', 250, 1640, 2.0, 60, 340),
    say(3.6, 5.4, 'Kuba?! Co się stało?', 'ola', 900, 1600, 1.9, -60, 340),
    say(5.6, 7.4, 'Na kamerce…\nktoś stoi za mną.', 'kuba', 250, 1640, 2.0, 60, 340),
    say(7.6, 9.0, 'Kuba… tam nikogo nie ma.', 'ola', 900, 1600, 1.9, -80, 340),
    say(9.4, 10.8, 'To nagranie… z wczoraj.\nTrzecia dwanaście.', 'kuba', 250, 1640, 2.0, 80, 340),
    say(11.0, 12.0, 'On był… w naszym domu?', 'ola', 900, 1600, 1.9, -80, 340),
  ],
  draw(c, lt, sc) {
    kubaRoom(c, lt, { door: lt > 3.4 ? clamp((lt - 3.4) / .4) * .85 : 0 });
    fillRR(c, 160, 1080, 760, 26, 6, '#4A3A2C');
    const live = lt < 9.0;
    laptop(c, 260, 700, (cc, x, y, w, h) => {
      cc.fillStyle = '#3A4260'; cc.fillRect(x, y, w, h); fillRR(cc, x + w * .62, y + 20, 110, h - 20, 4, '#0A0B10');
      person(cc, 'kaptur', x + w * .62 + 55, y + h + (live ? 70 : 150), live ? .7 : 1.05, { t: lt, glow: 1 });
      if (live) person(cc, 'kuba', x + w * .36, y + h + 190, 1.1, { t: lt, wide: true, mouth: 'o' });
      cc.fillStyle = 'rgba(255,255,255,.05)'; for (let r = 0; r < h; r += 4) cc.fillRect(x, y + r, w, 1);
      if (lt > 9.0) { fillRR(cc, x + 16, y + 14, 290, 40, 8, 'rgba(215,38,61,.95)'); txt(cc, '▶ NAGRANIE · WCZORAJ 03:12', x + 26, y + 35, 18, '#fff', 900, 'left'); }
    });
    // Kuba odwraca się w stronę drzwi; Ola wpada
    const turned = lt > 1.4, fg = 1;
    c.save(); c.globalAlpha = fg;
    person(c, 'kuba', 250, 1640, 2.0, { t: lt, back: !turned, look: 1, wide: turned, mouth: turned && !talking(sc, 'kuba', lt) ? 'o' : null, talk: talking(sc, 'kuba', lt), rot: lt > 1.0 && lt < 1.6 ? .05 : 0 });
    if (lt > 2.6) person(c, 'ola', mv(lt, 2.6, 3.5, 1180, 900), 1600, 1.9, { t: lt, look: -1, wide: true, talk: talking(sc, 'ola', lt), walk: lt < 3.5 ? lt * 12 : null });
    c.restore();
    night(c, lt > 9.0 ? .7 : .78, [{ x: 540, y: 860, r: 520, a: .95, tint: 'rgba(200,220,255,.1)' }, LAMP, { x: 950, y: 1000, r: lt > 3.4 ? 300 : 0, a: .6 }]);
  },
  post(c, lt) {
    if (lt > 1.6 && lt < 3.4) label(c, 'NIKOGO', 950, 420, 'dark', 48, lt - 1.6, 3.4 - lt);
    if (lt > 9.2) label(c, '▶ NAGRANIE · WCZORAJ 03:12', 540, 300, 'red', 44, lt - 9.2, 9);
    drawSubs(c, 'turn', lt);
  },
});
sub('turn', .2, 3.4, 'Kuba odwraca się. W drzwiach nikogo nie ma.');
sub('turn', 5.6, 7.4, 'Ale na podglądzie… on wciąż tam stoi.');
sub('turn', 7.6, 12, 'To nie jest obraz na żywo. To nagranie. Z wczoraj, z trzeciej dwanaście. Był w ich mieszkaniu.');
// 3. ODPISUJE — błąd 1
scene({
  name: 'reply', start: 24, end: 34,
  draw(c, lt) {
    c.fillStyle = '#0B0C10'; c.fillRect(0, 0, W, H);
    chat(c, lt, [
      [0.2, 'txt', 'chcesz wiedzieć, kim jestem?', false],
      [1.4, 'txt', 'kliknij: bit.ly/k-94-kamera', false],
      [3.6, 'txt', 'KIM JESTEŚ?!', true],
      [5.6, 'txt', 'teraz wiem, że czytasz.', false],
    ]);
  },
  post(c, lt) { if (lt > 4.2 && lt < 9.6) card(c, 70, 1460, 860, 'BŁĄD 1', 'odpisał obcemu — teraz on wie,\nże Kuba czyta i się boi', lt - 4.2, '#F39C12', 40); drawSubs(c, 'reply', lt); },
});
sub('reply', .2, 3.4, 'Na laptopie wiadomość od k4ptur_94. Link.');
sub('reply', 3.6, 6.0, 'Kuba nie wytrzymuje. Odpisuje.');
sub('reply', 6.0, 10, 'Błąd pierwszy. Teraz on wie, że Kuba czyta. I że się boi.');
// 4. KLIKA — błąd 2
scene({
  name: 'click', start: 34, end: 44,
  bubbles: [
    say(0.3, 1.6, 'Ochrona konta…\nto może pomóc.', 'kuba', 420, 1640, 2.0, 60),
    say(1.7, 2.6, 'Kuba, to pułapka!', 'ola', 900, 1620, 1.9, -60),
    say(5.0, 7.6, 'Ja tego nie robię!\nKursor rusza się sam!', 'kuba', 420, 1640, 2.0, 60),
  ],
  draw(c, lt, sc) {
    kubaRoom(c, lt); fillRR(c, 160, 1080, 760, 26, 6, '#4A3A2C');
    laptop(c, 260, 700, (cc, x, y, w, h) => {
      if (lt < 2.6) { cc.fillStyle = '#E9ECF2'; cc.fillRect(x, y, w, h); txt(cc, 'Ochrona konta', x + 30, y + 50, 30, '#14161B', 900, 'left'); txt(cc, 'Sprawdź, kto cię nagrywa', x + 30, y + 92, 22, '#4A4D57', 600, 'left'); fillRR(cc, x + 30, y + 140, 220, 56, 12, '#1E7A46'); txt(cc, 'POBIERZ', x + 140, y + 168, 24, '#fff', 900); return; }
      if (lt < 4.6) { cc.fillStyle = '#E9ECF2'; cc.fillRect(x, y, w, h); txt(cc, 'Pobieranie…', x + 30, y + 60, 26, '#14161B', 800, 'left'); fillRR(cc, x + 30, y + 100, w - 60, 24, 12, '#C9CDD2'); fillRR(cc, x + 30, y + 100, (w - 60) * clamp((lt - 2.6) / 1.8), 24, 12, '#1E7A46'); return; }
      // pulpit: kursor sam przegląda zdjęcia rodziny
      cc.fillStyle = '#16213A'; cc.fillRect(x, y, w, h);
      for (let k = 0; k < 6; k++) { const px = x + 24 + (k % 3) * 166, py = y + 30 + Math.floor(k / 3) * 130; fillRR(cc, px, py, 150, 110, 6, ['#5C7DB5', '#E08A0B', '#30A46C', '#7B4FC9', '#D7263D', '#1BB0A3'][k]); txt(cc, ['wakacje', 'mama', 'klucze', 'Ola', 'blok', 'grafik'][k], px + 75, py + 92, 18, '#fff', 800); }
      const k = Math.floor((lt - 4.6) * 1.4) % 6, px = x + 24 + (k % 3) * 166 + 110, py = y + 30 + Math.floor(k / 3) * 130 + 70;
      cc.strokeStyle = '#fff'; cc.lineWidth = 4; cc.strokeRect(px - 110, py - 70, 150, 110);
      cc.fillStyle = '#fff'; cc.beginPath(); cc.moveTo(px, py); cc.lineTo(px, py + 30); cc.lineTo(px + 8, py + 22); cc.lineTo(px + 16, py + 38); cc.lineTo(px + 22, py + 35); cc.lineTo(px + 14, py + 19); cc.lineTo(px + 24, py + 19); cc.closePath(); cc.fill();
    });
    person(c, 'kuba', 420, 1640, 2.0, { t: lt, back: lt < 4.6, look: 1, wide: lt > 4.6, mouth: lt > 4.6 && !talking(sc, 'kuba', lt) ? 'o' : null, talk: talking(sc, 'kuba', lt), aR: lt < 2.6 ? 1.2 : .14 });
    person(c, 'ola', 900, 1620, 1.9, { t: lt, look: -1, wide: true, talk: talking(sc, 'ola', lt), aL: lt > 1.7 && lt < 3 ? 1.2 : .14 });
    night(c, .78, [{ x: 540, y: 860, r: 520, a: .95, tint: 'rgba(200,220,255,.1)' }, LAMP]);
  },
  post(c, lt) {
    if (lt > 2.6 && lt < 7.8) card(c, 70, 300, 860, 'BŁĄD 2', 'kliknął w link od obcego\ni pobrał „program”', lt - 2.6, '#F39C12', 40);
    if (lt > 7.8) label(c, 'KURSOR RUSZA SIĘ SAM', 540, 600, 'red', 40, lt - 7.8, 9);
    drawSubs(c, 'click', lt);
  },
});
sub('click', .2, 2.6, 'Kuba klika. „Ochrona konta. Pobierz.”');
sub('click', 2.6, 4.6, 'Błąd drugi.');
sub('click', 4.6, 10, 'Kursor zaczyna ruszać się sam. Zdjęcia. Klucze. Grafik rodziców.');
// 5. OLA ODCINA INTERNET
scene({
  name: 'ola', start: 44, end: 54,
  bubbles: [
    say(0.5, 2.3, 'Kuba, zostaw to!\nNie klikaj!', 'ola', 820, 1640, 2.0, -80),
    say(2.8, 5.6, 'Mamo, ktoś jest w naszym\nlaptopie. Wróć, proszę.', 'ola', 760, 1600, 2.0, -60),
    sayPhone(6.0, 8.4, 'Nic nie ruszajcie.\nJuż jadę.', 'mama', 950, 1110, -260, 70),
  ],
  draw(c, lt, sc) {
    if (lt < 2.4) { // Ola zatrzaskuje laptop
      kubaRoom(c, lt); fillRR(c, 160, 1080, 760, 26, 6, '#4A3A2C');
      const cl = clamp((lt - .4) / .4);
      fillRR(c, 200, 1060 - 360 * (1 - cl), 680, 360 * (1 - cl) + 10, 14, '#1B1D22'); fillRR(c, 200, 1070, 680, 30, 12, '#2B2E35');
      person(c, 'ola', 820, 1640, 2.0, { t: lt, look: -1, aL: lt < 1 ? 1.4 : .14, mouth: talking(sc, 'ola', lt) ? null : 'angry', talk: talking(sc, 'ola', lt) });
      person(c, 'kuba', 300, 1640, 1.95, { t: lt, look: 1, wide: true, mouth: 'o' });
      night(c, .72, [{ x: 540, y: 1000, r: 600, a: .85 }]);
      return;
    }
    // przedpokój: router na szafce, Ola wyciąga wtyczkę i dzwoni
    hallBg(c, lt);
    fillRR(c, 700, 1240, 120, 40, 8, '#E8E4DA'); for (let i = 0; i < 4; i++) circ(c, 718 + i * 26, 1260, 5, lt < 3.0 ? (Math.floor(lt * 6 + i) % 2 ? '#30A46C' : '#1E4D30') : '#2A2D36');
    c.strokeStyle = '#2A2D36'; c.lineWidth = 6; c.beginPath(); c.moveTo(760, 1280); c.quadraticCurveTo(760, 1360, lt < 3.0 ? 900 : 860, lt < 3.0 ? 1380 : 1340); c.stroke();
    person(c, 'ola', 760, 1600, 2.0, { t: lt, look: -1, phone: lt > 3 ? 2 : 0, aR: lt > 3 ? 2.4 : .14, aL: lt < 3 ? 1.0 : .14, talk: talking(sc, 'ola', lt) });
    person(c, 'kuba', 360, 1600, 1.95, { t: lt, look: 1, wide: true, mouth: 'o' });
    if (talking(sc, 'mama', lt)) for (let k = 1; k <= 3; k++) { c.strokeStyle = `rgba(190,217,255,${.5 - k * .12})`; c.lineWidth = 4; c.beginPath(); c.arc(950, 1110, 20 + k * 18 + (lt * 40) % 18, -.9, .9); c.stroke(); }
    night(c, .6, [{ x: 92, y: 620, r: 320, a: .7 }, { x: 760, y: 1200, r: 420, a: .8 }]);
  },
  post(c, lt) { if (lt > 2.4 && lt < 3.4) label(c, 'INTERNET: WYŁĄCZONY', 540, 300, 'red', 44, lt - 2.4, 3.4 - lt); drawSubs(c, 'ola', lt); },
});
sub('ola', .2, 2.4, 'Ola zatrzaskuje laptop.');
sub('ola', 2.4, 5.8, 'Wyciąga wtyczkę od internetu. I dzwoni do mamy.');
sub('ola', 5.8, 10, 'Dobrze. Najpierw odłączyć. Potem wezwać dorosłych.');
// 6. RANO: DZIELNICOWY + ZASADA
scene({
  name: 'police', start: 54, end: 68,
  bubbles: [
    say(1.0, 4.4, 'Nie usuwajcie niczego.\nTo są dowody.', 'policjant', 380, 1600, 2.0, 80),
    say(4.6, 6.2, 'Co mamy teraz zrobić?', 'mama', 640, 1600, 1.95, 0),
    say(6.4, 10.2, 'Hasła zmieńcie na innym\nurządzeniu. I włączcie\nweryfikację dwuetapową.', 'policjant', 380, 1600, 2.0, 100),
    say(10.4, 13.4, 'To przeze mnie…\nkliknąłem.', 'kuba', 980, 1620, 1.8, -120),
  ],
  draw(c, lt, sc) {
    hallBg(c, lt);
    person(c, 'policjant', 380, 1600, 2.0, { t: lt, look: 1, aR: 1.2, talk: talking(sc, 'policjant', lt) });
    person(c, 'kobieta', 640, 1600, 1.95, { t: lt, look: -1, talk: talking(sc, 'mama', lt) });
    person(c, 'ola', 820, 1610, 1.85, { t: lt, look: -1 });
    person(c, 'kuba', 980, 1620, 1.8, { t: lt, look: -1, mouth: talking(sc, 'kuba', lt) ? null : 'o', talk: talking(sc, 'kuba', lt) });
    // poranne światło z kuchni
    c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createLinearGradient(1080, 0, 600, 0); g.addColorStop(0, 'rgba(255,230,180,.18)'); g.addColorStop(1, 'rgba(255,230,180,0)'); c.fillStyle = g; c.fillRect(600, 0, 480, 1420); c.restore();
  },
  post(c, lt) {
    if (lt < 3) label(c, 'RANO', 540, 300, 'dark', 44, lt, 3 - lt);
    if (lt > 10.4) card(c, 60, 300, 880, 'ZASADA', 'Ktoś przejął konto? Odłącz urządzenie\nod internetu, zmień hasła na innym\nurządzeniu, włącz weryfikację dwuetapową.\nZgłoś: policja i incydent.cert.pl', lt - 10.4, '#F39C12', 34);
    drawSubs(c, 'police', lt);
  },
});
sub('police', .2, 4.8, 'Rano przychodzi dzielnicowy. Nie usuwajcie niczego. To są dowody.');
sub('police', 5.0, 14, 'Ktoś przejął konto? Odłącz urządzenie od internetu. Zmień hasła na innym urządzeniu. Włącz weryfikację dwuetapową. I zgłoś to policji oraz do CERT Polska.');
// 7. KLATKA: Zdzisiek, schody na 10. piętro, drzwi 104 z taśmą
scene({
  name: 'stairs', start: 68, end: 82,
  bubbles: [
    say(1.6, 3.8, 'W nocy ktoś chodził\npo dachu. Słyszałem.', 'zdzisiek', 820, 1580, 1.95, -40),
    say(4.0, 5.2, 'Po dachu? Przecież\nwyjście jest zamknięte.', 'ola', 540, 1590, 1.85, 0),
    say(5.3, 6.3, 'Na kłódkę. Od lat.', 'zdzisiek', 820, 1580, 1.95, -40),
  ],
  draw(c, lt, sc) {
    if (lt < 6.4) { // widok z klatki na 9. piętrze: wynoszą laptop
      corridorBg(c, lt, { num: '94', num2: '93', floor: '9' });
      person(c, 'kobieta', mv(lt, 0, 1.4, 520, 360), 1580, 1.95, { t: lt, look: 1, walk: lt < 1.4 ? lt * 10 : null, aR: .9 });
      fillRR(c, mv(lt, 0, 1.4, 520, 360) + 30, 1360, 120, 80, 8, '#1B1D22');
      person(c, 'ola', mv(lt, .3, 1.7, 600, 540), 1590, 1.85, { t: lt, look: 1, talk: talking(sc, 'ola', lt), walk: lt > .3 && lt < 1.7 ? lt * 10 : null });
      person(c, 'zdzisiek', mv(lt, .4, 1.4, 1200, 820), 1580, 1.95, { t: lt, look: -1, walk: lt > .4 && lt < 1.4 ? lt * 10 : null, talk: talking(sc, 'zdzisiek', lt), net: true });
      night(c, .45, [{ x: 540, y: 250, r: 700, a: .8 }]);
      return;
    }
    // kamera jedzie schodami w górę: 10. piętro, drzwi 104 z taśmą policyjną, światło pod drzwiami
    const l = lt - 6.4, up = eio(clamp(l / 2.4));
    c.save(); c.translate(0, up * 600 - 600);
    c.fillStyle = '#B3B0A0'; c.fillRect(0, 0, W, 1600); c.fillStyle = '#3E5A47'; c.fillRect(0, 1100, W, 500);
    stairsUp(c, 700, 2000, 14, 70);
    c.restore();
    if (l > 2.0) {
      corridorBg(c, lt, { num: '104', num2: '103', floor: '10' });
      const a = clamp((l - 2.0) / .4); c.save(); c.globalAlpha = a;
      c.strokeStyle = '#F5D90A'; c.lineWidth = 34; for (const s of [-1, 1]) { c.beginPath(); c.moveTo(310, 900 - s * 260); c.lineTo(730, 900 + s * 260); c.stroke(); }
      c.save(); c.translate(520, 900); c.rotate(.55); txt(c, 'POLICJA · NIE WCHODZIĆ', 0, 0, 22, '#14161B', 900); c.restore(); c.save(); c.translate(520, 900); c.rotate(-.55); txt(c, 'POLICJA · NIE WCHODZIĆ', 0, 0, 22, '#14161B', 900); c.restore();
      c.restore();
      const fl = l > 4.6 ? (.6 + .4 * Math.sin(l * 10)) : 0;
      c.fillStyle = `rgba(255,225,160,${fl})`; c.fillRect(330, 1388, 380, 14);
      if (fl) { const g = c.createLinearGradient(0, 1400, 0, 1600); g.addColorStop(0, `rgba(255,220,150,${.6 * fl})`); g.addColorStop(1, 'rgba(255,220,150,0)'); c.fillStyle = g; c.beginPath(); c.moveTo(330, 1400); c.lineTo(690, 1400); c.lineTo(760, 1600); c.lineTo(260, 1600); c.fill(); }
      night(c, .82, [{ x: 520, y: 1420, r: 420 * fl + 60, a: 1 }, { x: 540, y: 250, r: 300, a: .3 }]);
    }
  },
  post(c, lt) { if (lt > 9.2) label(c, 'POD DRZWIAMI 104 PALI SIĘ ŚWIATŁO', 540, 300, 'red', 38, lt - 9.2, 9); drawSubs(c, 'stairs', lt); },
});
sub('stairs', .2, 1.6, 'Mama wynosi laptop do serwisu.');
sub('stairs', 1.6, 6.2, 'Na klatce pan Zdzisiek: w nocy ktoś chodził po dachu.');
sub('stairs', 6.4, 9.0, 'Dziesiąte piętro. Mieszkanie sto cztery zaplombowane przez policję.');
sub('stairs', 9.2, 14, 'A pod drzwiami… pali się światło.');
// 8. NOC: Bluetooth
scene({
  name: 'notif', start: 82, end: 98,
  draw(c, lt) {
    if (lt < 4.0) { // Ola w łóżku, telefon na szafce zapala się
      olaRoom(c, lt);
      person(c, 'ola', 640, 1140, 1.35, { t: lt, blink: lt < 2.4, look: 1, rot: -Math.PI / 2 });
      fillRR(c, 330, 1110, 520, 300, 30, '#3D4A73'); fillRR(c, 330, 1110, 520, 34, 16, '#4A5888'); // kołdra na Oli
      const on = lt > 1.6; fillRR(c, 900, 1150, 46, 84, 8, '#15171C'); if (on) { c.save(); c.shadowColor = '#BFD9FF'; c.shadowBlur = 40; fillRR(c, 904, 1156, 38, 72, 6, '#BFD9FF'); c.restore(); }
      night(c, .9, [{ x: 922, y: 1190, r: on ? 340 : 0, a: .9, tint: 'rgba(190,217,255,.12)' }, { x: 780, y: 590, r: 260, a: .5 }]);
      return;
    }
    c.fillStyle = '#07080C'; c.fillRect(0, 0, W, H);
    bigPhone(c, (cc, x, y, w, h) => {
      phoneScreen(cc, x, y, w, h, lt, { clock: '02:47' });
      const a = clamp((lt - 4.6) / .4);
      cc.save(); cc.globalAlpha = a; fillRR(cc, x + 24, y + 340, w - 48, 200, 22, 'rgba(40,44,58,.95)');
      txt(cc, 'Bluetooth', x + 50, y + 380, 22, '#AEB0C2', 800, 'left');
      txt(cc, '„k4ptur_94” chce', x + 50, y + 425, 30, '#FFFFFF', 900, 'left'); txt(cc, 'udostępnić zdjęcie', x + 50, y + 465, 30, '#FFFFFF', 900, 'left');
      fillRR(cc, x + 50, y + 490, 200, 36, 10, '#3A3F52'); txt(cc, 'Odrzuć', x + 150, y + 508, 20, '#fff', 800); fillRR(cc, x + w - 250, y + 490, 200, 36, 10, '#2F6FE0'); txt(cc, 'Akceptuj', x + w - 150, y + 508, 20, '#fff', 800);
      cc.restore();
      if (lt > 10.4) { const p = clamp((lt - 10.4) / .3); cc.save(); cc.globalAlpha = p; cc.strokeStyle = '#fff'; cc.lineWidth = 6; rr(cc, x + w - 254, y + 486, 208, 44, 12); cc.stroke(); cc.restore(); }
    }, 1, 300);
  },
  post(c, lt) { if (lt > 6.4 && lt < 10.2) label(c, 'BLUETOOTH = KTOŚ JEST BLISKO', 540, 1640, 'red', 40, lt - 6.4, 10.2 - lt); drawSubs(c, 'notif', lt); },
});
sub('notif', .2, 4.0, 'Noc. Internet jest wyłączony. Wszyscy śpią. Telefon Oli się zapala.');
sub('notif', 4.2, 10.0, 'Bluetooth. k4ptur_94 chce udostępnić zdjęcie. Bluetooth działa tylko z bliska.');
sub('notif', 10.2, 16, 'Ola nie powinna tego otwierać. Ale palec sam dotyka ekranu.');
// 9. ZAKOŃCZENIE: zdjęcie z perspektywy drzwi — „TERAZ”, drzwi się uchylają
scene({
  name: 'end', start: 98, end: 118,
  cam: lt => { const sh = lt > 13.4 && lt < 13.9 ? (13.9 - lt) * 30 : 0; return { z: 1, x: Math.sin(lt * 90) * sh }; },
  labels: [[16.0, 20, 'ODC. 10 ↓', 540, 1650, 'red', 64]],
  draw(c, lt) {
    if (lt < 5.0) { // zdjęcie na ekranie: łóżko Oli z perspektywy drzwi
      c.fillStyle = '#07080C'; c.fillRect(0, 0, W, H);
      bigPhone(c, (cc, x, y, w, h) => {
        cc.fillStyle = '#000'; cc.fillRect(x, y, w, h);
        cc.save(); cc.beginPath(); cc.rect(x, y + 120, w, h - 300); cc.clip(); cc.translate(x - 40, y + 60); cc.scale(.62, .62);
        ROOM(cc); person(cc, 'ola', 640, 1140, 1.35, { t: 0, blink: true, rot: -Math.PI / 2 }); fillRR(cc, 330, 1110, 520, 300, 30, '#3D4A73'); fillRR(cc, 330, 1110, 520, 34, 16, '#4A5888');
        cc.restore(); cc.fillStyle = 'rgba(0,0,0,.35)'; cc.fillRect(x, y + 120, w, h - 300);
        fillRR(cc, x + 24, y + h - 160, w - 48, 110, 16, 'rgba(10,10,14,.9)'); txt(cc, 'k4ptur_94 · zdjęcie', x + 46, y + h - 120, 22, '#AEB0C2', 800, 'left');
        const bl = Math.floor(lt * 3) % 2; txt(cc, 'zrobione: TERAZ', x + 46, y + h - 78, 34, bl ? '#FF3B30' : '#FF8A80', 900, 'left');
      }, 1, 300);
      return;
    }
    // Ola na łóżku, przodem do nas, za nią po prawej drzwi pokoju powoli się uchylają
    const l = lt - 5.0, door = clamp((l - 2.0) / 5.5) * .55;
    olaRoom(c, lt, { door });
    person(c, 'ola', 420, 1640, 2.4, { t: lt, phone: 2, aR: 2.0, look: l > 5.5 ? 1 : 0, wide: true, mouth: l > 7.0 ? 'o' : null });
    fillRR(c, 60, 1440, 800, 300, 34, '#3D4A73'); fillRR(c, 60, 1440, 800, 40, 18, '#4A5888'); // kołdra na nogach Oli
    if (door > .1) {
      const ex = 880 + 180 * door * .55, a = clamp((l - 5.0) / .8);
      c.save(); c.globalAlpha = a * .9; circ(c, ex, 880, 70, '#07070A'); fillRR(c, ex - 80, 930, 160, 470, 60, '#07070A'); c.restore();
      c.save(); c.globalAlpha = a; c.shadowColor = 'rgba(255,255,255,.95)'; c.shadowBlur = 30;
      const big = l > 8.4 ? 2.2 : 1.5; ell(c, ex - 18 * big, 870, 10 * big, 6 * big, '#F8F6EE'); ell(c, ex + 18 * big, 870, 10 * big, 6 * big, '#F8F6EE'); c.restore();
      if (l > 7.6) { const h = clamp((l - 7.6) / .5); c.save(); c.globalAlpha = h; for (let f = 0; f < 4; f++) fillRR(c, 880 + 180 * door - 6, 1040 + f * 24, 30, 16, 8, '#121316'); c.restore(); }
    }
    night(c, l > 8.4 ? .9 : .82, [{ x: 420, y: 1100, r: 380, a: .9, tint: 'rgba(190,217,255,.12)' }, { x: 900, y: 900, r: door * 500, a: .4 }]);
    if (l > 8.4 && l < 8.65) { c.fillStyle = 'rgba(255,255,255,.55)'; c.fillRect(0, 0, W, H); }
    if (l > 12.6) { c.fillStyle = `rgba(0,0,0,${clamp((l - 12.6) / 1.4) * .85})`; c.fillRect(0, 0, W, H); }
  },
  post(c, lt) { const l = lt - 5; if (l > 0.4 && l < 4.0) label(c, 'DRZWI POKOJU', 900, 420, 'dark', 40, l - .4, 4 - l); drawSubs(c, 'end', lt); },
});
sub('end', .2, 5.0, 'Zdjęcie. Łóżko Oli. Z perspektywy drzwi. Zrobione… teraz.');
sub('end', 5.2, 10.4, 'Ola nie oddycha. Za jej plecami drzwi pokoju powoli się uchylają.');
sub('end', 13.4, 16, '[szept] Dobranoc, Ola.');
// napisy podglądu dla scen bez własnego post()
for (const s of S) if (!s.post) s.post = (c, lt) => drawSubs(c, s.name, lt);
