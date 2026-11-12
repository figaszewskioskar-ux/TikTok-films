// BLOK 94 · „KTO TAM?” ODC. 10 — „Nie idź sprawdzać!”: ta sama noc. Drzwi pokoju, otwarte mieszkanie,
// klucze na stole, Kuba goni po klatce, Ola dzwoni na 112, policja w 104… a nagranie z szafy.
window.EP = {
  badge: 'BLOK 94 · ODC. 10',
  loop: false,
  vignette: .8,
  cues(add) {
    add(0.2, 'stab'); add(3.0, 'creak'); add(6.2, 'whoosh'); add(17.4, 'creak'); add(21.2, 'error');
    add(25.4, 'creak'); add(29.0, 'door'); add(41.0, 'whoosh'); add(44.0, 'hit'); add(49.0, 'slam'); add(51.6, 'error');
    add(54.6, 'door'); add(55.4, 'click'); add(56.6, 'click'); add(57.6, 'vib');
    add(69.2, 'whoosh'); add(73.0, 'click'); add(81.4, 'hit');
    add(86.2, 'whoosh'); add(91.0, 'door');
    add(100.2, 'whoosh'); add(104.0, 'notif'); add(112.8, 'creak'); add(116.0, 'hit');
  },
};
const S = [];
function scene(o) { S.push(o); return o; }

// ---------- pomocnicze ----------
function bigSign(c, lt, l1, l2, y = 390) {
  const sp = prog(lt, 0.15, 0.4), shake = lt < 1 ? (1 - lt) * 9 : 0; if (sp <= 0) return;
  c.save(); c.translate(540 + Math.sin(lt * 70) * shake, y); const s = back(sp); c.scale(s, s); c.rotate(-0.02);
  c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 30; c.shadowOffsetY = 10;
  fillRR(c, -470, -120, 940, 240, 24, '#D7263D'); c.shadowColor = 'transparent';
  c.strokeStyle = 'rgba(255,255,255,.35)'; c.lineWidth = 4; rr(c, -456, -106, 912, 212, 16); c.stroke();
  txt(c, l1, 0, -44, 86, '#FFFFFF', 900); txt(c, l2, 0, 54, 86, '#FFFFFF', 900);
  c.restore();
}
// dymek nad głową mówiącej postaci: ogonek zawsze wskazuje jej głowę (px, py = stopy, s = skala postaci)
function say(a, b, text, who, px, py, s, dx = 0) {
  const top = py - 312 * s;
  return [a, b, text, clamp(px + dx, 200, 880), top - 18, px, top + 12, who];
}
// dymek z telefonu (rozmowa z 112): ogonek wskazuje telefon
function sayPhone(a, b, text, who, px, py, dx = 0, up = 60) { return [a, b, text, clamp(px + dx, 200, 880), py - up, px, py, who]; }
function talking(sc, who, lt) { return (sc.bubbles || []).some(b => b[7] === who && lt >= b[0] && lt < b[0] + Math.min(b[1] - b[0] - .2, .055 * b[2].length + .3)); }
// snop latarki z telefonu
function beam(c, x, y, ang, len = 900, spread = .32, a = .22) {
  c.save(); c.globalCompositeOperation = 'lighter'; c.translate(x, y); c.rotate(ang);
  const g = c.createLinearGradient(0, 0, len, 0); g.addColorStop(0, `rgba(255,248,220,${a})`); g.addColorStop(1, 'rgba(255,248,220,0)');
  c.fillStyle = g; c.beginPath(); c.moveTo(0, -8); c.lineTo(len, -len * spread); c.lineTo(len, len * spread); c.lineTo(0, 8); c.fill(); c.restore();
}
function breath(c, x, y, lt, k = 1) { // para z ust (zimno z klatki)
  for (let i = 0; i < 3; i++) { const p = ((lt * .7 + i / 3) % 1); c.fillStyle = `rgba(230,235,245,${.18 * (1 - p)})`; c.beginPath(); c.arc(x + p * 60 * k, y - p * 50, 10 + p * 26, 0, 7); c.fill(); }
}
function lyingOla(c, lt, o = {}) { // Ola w łóżku pod kołdrą
  person(c, 'ola', 640, 1140, 1.35, { t: lt, blink: o.blink, look: o.look ?? 1, rot: -Math.PI / 2, wide: o.wide });
  fillRR(c, 330, 1110, 520, 300, 30, '#3D4A73'); fillRR(c, 330, 1110, 520, 34, 16, '#4A5888');
  for (let i = 0; i < 5; i++) circ(c, 400 + i * 90, 1250, 9, 'rgba(255,255,255,.1)');
}
function phoneGlow(c, x, y, on) { fillRR(c, x, y, 46, 84, 8, '#15171C'); if (on) { c.save(); c.shadowColor = '#BFD9FF'; c.shadowBlur = 40; fillRR(c, x + 4, y + 6, 38, 72, 6, '#BFD9FF'); c.restore(); } }
// pokój Oli z drzwiami po prawej i szafą po lewej
function olaRoom(c, lt, o = {}) {
  ROOM(c);
  // szafa po lewej (zasłania plakat), łóżko rysujemy jeszcze raz przed nią
  const wx = 18, wy = 360, ww = 250, wh = 760;
  fillRR(c, wx - 8, wy - 14, ww + 16, 22, 4, '#4A3828');
  fillRR(c, wx, wy, ww, wh, 6, '#5E4A38'); c.strokeStyle = 'rgba(0,0,0,.3)'; c.lineWidth = 4;
  if (o.ward) { // lewe skrzydło szafy uchyla się do nas
    const g = o.ward; c.fillStyle = '#050507'; c.fillRect(wx + 8, wy + 8, ww / 2 - 8, wh - 16);
    c.fillStyle = '#6A5440'; c.beginPath(); c.moveTo(wx + 8, wy + 8); c.lineTo(wx + 8 + (ww / 2 - 8) * (1 - g), wy + 8 - 30 * g); c.lineTo(wx + 8 + (ww / 2 - 8) * (1 - g), wy + wh - 8 + 30 * g); c.lineTo(wx + 8, wy + wh - 8); c.fill();
  } else { c.strokeRect(wx + 10, wy + 10, ww / 2 - 14, wh - 20); circ(c, wx + ww / 2 - 18, wy + wh / 2, 7, '#C9A15A'); }
  c.strokeRect(wx + ww / 2 + 4, wy + 10, ww / 2 - 14, wh - 20); circ(c, wx + ww / 2 + 18, wy + wh / 2, 7, '#C9A15A');
  fillRR(c, 80, 1100, 760, 330, 30, '#3D4A73'); fillRR(c, 80, 1100, 760, 40, 20, '#4A5888'); fillRR(c, 90, 1060, 220, 120, 40, '#D9DCE6');
  // drzwi pokoju (prawa ściana)
  const dx = 880, dy = 470, dw = 180, dh = 930;
  fillRR(c, dx - 12, dy - 12, dw + 24, dh + 12, 4, '#3B2E22');
  if (o.door) { c.fillStyle = '#030305'; c.fillRect(dx, dy, dw, dh); c.fillStyle = '#5E4A38'; c.beginPath(); c.moveTo(dx + dw, dy); c.lineTo(dx + dw * o.door, dy + 26 * o.door); c.lineTo(dx + dw * o.door, dy + dh - 26 * o.door); c.lineTo(dx + dw, dy + dh); c.fill(); }
  else { fillRR(c, dx, dy, dw, dh, 4, '#5E4A38'); fillRR(c, dx + 14, dy + 470, 50, 12, 6, '#C9CDD2'); }
}
// kuchnia nocą: kafelki, szafki, okno ze śniegiem, zegar 02:58, lodówka, stół na pierwszym planie
function kitchenBg(c, lt, o = {}) {
  c.fillStyle = '#2E3640'; c.fillRect(0, 0, W, 1420);
  for (let i = 0; i < 20; i++) { c.fillStyle = 'rgba(255,255,255,.02)'; c.fillRect(i * 56, 0, 20, 760); }
  // kafelki nad blatem
  for (let r = 0; r < 7; r++) for (let q = 0; q < 19; q++) { c.fillStyle = (r + q) % 2 ? '#8FA3A8' : '#A9BBBF'; c.fillRect(q * 40 + 1, 780 + r * 40 + 1, 38, 38); }
  c.fillStyle = 'rgba(10,14,20,.35)'; c.fillRect(0, 780, 760, 280);
  // szafki górne
  for (let i = 0; i < 3; i++) { fillRR(c, 40 + i * 120, 300, 112, 330, 6, '#6B5440'); fillRR(c, 40 + i * 120 + (i % 2 ? 14 : 84), 440, 12, 50, 5, '#C9CDD2'); }
  // okno ze śniegiem i doniczką
  fillRR(c, 420, 300, 300, 400, 8, '#0D1222'); c.fillStyle = '#3A4058'; c.fillRect(565, 300, 10, 400); c.fillRect(420, 495, 300, 10);
  for (let k = 0; k < 18; k++) { const sx = 430 + (hash(k) * 280), sy = 310 + ((lt * 40 + hash(k + 9) * 380) % 380); circ(c, sx, sy, 3, 'rgba(235,240,255,.7)'); }
  fillRR(c, 410, 700, 320, 18, 4, '#D9DCE6'); fillRR(c, 470, 650, 50, 50, 8, '#B5652F'); circ(c, 482, 630, 22, '#3F7A4A'); circ(c, 508, 622, 20, '#4C8F57');
  // zegar 02:58 i kalendarz
  circ(c, 920, 260, 56, '#E8E4DA'); circ(c, 920, 260, 48, '#F6F3EA'); c.strokeStyle = '#14161B'; c.lineWidth = 7;
  const hA = (2 + 58 / 60) / 12 * Math.PI * 2 - Math.PI / 2, mA = 58 / 60 * Math.PI * 2 - Math.PI / 2;
  c.beginPath(); c.moveTo(920, 260); c.lineTo(920 + Math.cos(hA) * 24, 260 + Math.sin(hA) * 24); c.stroke(); c.lineWidth = 4; c.beginPath(); c.moveTo(920, 260); c.lineTo(920 + Math.cos(mA) * 38, 260 + Math.sin(mA) * 38); c.stroke();
  fillRR(c, 600, 150, 130, 130, 4, '#E8E4DA'); fillRR(c, 600, 150, 130, 36, 4, '#D7263D'); txt(c, 'LISTOPAD', 665, 169, 17, '#fff', 900); txt(c, '14', 665, 238, 56, '#14161B', 900);
  // blat, zlew, szafki dolne
  fillRR(c, 30, 1050, 740, 34, 4, '#8C7B6B'); for (let i = 0; i < 4; i++) { fillRR(c, 40 + i * 182, 1086, 172, 300, 6, '#6B5440'); fillRR(c, 40 + i * 182 + 70, 1110, 34, 10, 4, '#C9CDD2'); }
  fillRR(c, 250, 1040, 200, 16, 6, '#B9BDC2'); c.strokeStyle = '#B9BDC2'; c.lineWidth = 9; c.beginPath(); c.moveTo(350, 1040); c.lineTo(350, 960); c.lineTo(400, 960); c.stroke();
  // lodówka (prawa), otwarta: wnętrze świeci
  const fx = 790, fy = 380, fw = 270, fh = 1020;
  fillRR(c, fx, fy, fw, fh, 14, '#D9DCE0');
  if (o.fridge) {
    const ig = c.createLinearGradient(0, fy, 0, fy + fh); ig.addColorStop(0, '#FFF7DE'); ig.addColorStop(1, '#E8DDB8');
    fillRR(c, fx + 16, fy + 340, fw - 32, fh - 360, 8, ig);
    for (let k = 0; k < 4; k++) fillRR(c, fx + 16, fy + 470 + k * 140, fw - 32, 8, 2, 'rgba(160,170,180,.7)');
    fillRR(c, fx + 40, fy + 410, 60, 58, 6, '#E2B33C'); fillRR(c, fx + 130, fy + 395, 44, 74, 8, '#F2F2F2'); fillRR(c, fx + 60, fy + 540, 120, 60, 10, '#B23A3A');
    c.fillStyle = '#C3C7CC'; c.beginPath(); c.moveTo(fx + fw, fy + 330); c.lineTo(fx + fw + 70, fy + 300); c.lineTo(fx + fw + 70, fy + fh + 20); c.lineTo(fx + fw, fy + fh); c.fill();
    c.save(); c.globalCompositeOperation = 'lighter'; const lg = c.createRadialGradient(fx + fw / 2, fy + 650, 20, fx + fw / 2, fy + 650, 700); lg.addColorStop(0, 'rgba(255,245,210,.32)'); lg.addColorStop(1, 'rgba(255,245,210,0)'); c.fillStyle = lg; c.fillRect(0, 0, W, H); c.restore();
  } else fillRR(c, fx + 16, fy + 340, fw - 32, 6, 2, '#AEB3B9');
  fillRR(c, fx + 26, fy + 120, 14, 140, 6, '#9AA0A6');
  // podłoga: linoleum w kratkę
  c.fillStyle = '#2A2622'; c.fillRect(0, 1400, W, 520);
  for (let r = 0; r < 9; r++) for (let q = 0; q < 14; q++) { c.fillStyle = (r + q) % 2 ? '#3B3530' : '#26221F'; c.fillRect(q * 80 - (r % 2) * 0, 1400 + r * 60, 80, 60); }
}
function kitchenTable(c, lt, o = {}) {
  fillRR(c, 150, 1500, 700, 40, 8, '#7A5A3E'); c.fillStyle = '#5E4430'; c.fillRect(190, 1540, 26, 300); c.fillRect(784, 1540, 26, 300);
  fillRR(c, 150, 1486, 700, 18, 6, '#C9B48E'); // obrus
  c.save(); c.translate(560, 1470); c.rotate(-.06); fillRR(c, -110, -30, 220, 56, 3, '#F2EDE1'); txt(c, 'ODDAJĘ. MAM SWOJE.', 0, -2, 20, '#14161B', 900); c.restore();
  if (o.keys) { // klucze z brelokiem 94
    c.strokeStyle = '#D6DADF'; c.lineWidth = 5; c.beginPath(); c.arc(330, 1478, 16, 0, 7); c.stroke();
    fillRR(c, 340, 1472, 70, 14, 5, '#C9CDD2'); fillRR(c, 300, 1466, 40, 14, 5, '#B5965A');
    fillRR(c, 266, 1450, 40, 30, 6, '#D7263D'); txt(c, '94', 286, 1466, 18, '#fff', 900);
  }
}
function hallNight(c, lt, o = {}) { hallBg(c, lt, o); }
// klatka: schody w górę, poręcz, okienko z niebieskim światłem
function stairwell(c, lt, o = {}) {
  c.fillStyle = '#9C9988'; c.fillRect(0, 0, W, 1600); c.fillStyle = '#3E5A47'; c.fillRect(0, 900, W, 700); c.fillStyle = '#2E4636'; c.fillRect(0, 896, W, 8);
  fillRR(c, 700, 260, 240, 300, 6, '#0D1222'); c.fillStyle = '#3A4058'; c.fillRect(815, 260, 10, 300);
  if (o.blue) { c.fillStyle = `rgba(60,120,255,${.25 + .25 * Math.sin(lt * 14)})`; c.fillRect(700, 260, 240, 300); }
  fillRR(c, 120, 360, 110, 70, 6, '#C9CDD2'); txt(c, String(o.floor || 9), 175, 396, 34, '#14161B', 900); // tabliczka piętra
  stairsUp(c, 940, 1900, 16, 70);
  // przełącznik światła z czerwoną diodą (światło na czas)
  fillRR(c, 300, 760, 50, 70, 6, '#E8E4DA'); circ(c, 325, 795, 8, o.lightOff ? '#FF3B30' : '#4A4D57');
}

// ===================== SCENY =====================
// 0. HAK: drzwi pokoju się uchylają
scene({
  name: 'hook', start: 0, end: 6,
  draw(c, lt) {
    olaRoom(c, lt, { door: .15 + clamp((lt - 2.6) / 2) * .3 });
    lyingOla(c, lt, { look: 1, wide: true });
    phoneGlow(c, 900, 1150, true);
    night(c, .86, [{ x: 922, y: 1190, r: 300, a: .9, tint: 'rgba(190,217,255,.12)' }, { x: 640, y: 1000, r: 260, a: .5 }]);
    bigSign(c, lt, 'NIE IDŹ', 'SPRAWDZAĆ!', 330);
  },
});
// 1. POPRZEDNIO: zdjęcie łóżka zrobione z progu
scene({
  name: 'recap', start: 6, end: 11,
  labels: [[0.3, 5, 'ODC. 10', 540, 1640, 'yellow', 48]],
  draw(c, lt) {
    c.fillStyle = '#07080C'; c.fillRect(0, 0, W, H);
    bigPhone(c, (cc, x, y, w, h) => {
      cc.fillStyle = '#000'; cc.fillRect(x, y, w, h);
      cc.save(); cc.beginPath(); cc.rect(x, y + 120, w, h - 300); cc.clip(); cc.translate(x - 40, y + 60); cc.scale(.62, .62);
      olaRoom(cc, 0); lyingOla(cc, 0, { blink: true }); cc.restore(); cc.fillStyle = 'rgba(0,0,0,.35)'; cc.fillRect(x, y + 120, w, h - 300);
      fillRR(cc, x + 24, y + h - 160, w - 48, 110, 16, 'rgba(10,10,14,.9)'); txt(cc, 'Bluetooth · k4ptur_94', x + 46, y + h - 120, 22, '#AEB0C2', 800, 'left');
      txt(cc, 'zrobione: TERAZ', x + 46, y + h - 78, 34, Math.floor(lt * 3) % 2 ? '#FF3B30' : '#FF8A80', 900, 'left');
    }, 1, 300);
  },
});
// 2. POKÓJ OLI: „Kuba…? To ty?” — skrzypnięcie — Ola wstaje sprawdzić (BŁĄD 1)
scene({
  name: 'door', start: 11, end: 25,
  bubbles: [say(3.0, 5.6, 'Kuba…? To ty?', 'ola', 560, 1640, 2.0, -120)],
  draw(c, lt, sc) {
    const door = .45;
    olaRoom(c, lt, { door });
    if (lt < 2.4) { lyingOla(c, lt, { look: 1, wide: true }); }
    else { // Ola siedzi na łóżku z kołdrą na nogach, potem wstaje i idzie do drzwi
      const walk = lt > 9.4, x = walk ? mv(lt, 9.4, 13.0, 560, 900) : 560;
      person(c, 'ola', x, 1640, 2.0, { t: lt, look: 1, wide: true, phone: 2, aR: 1.6, talk: talking(sc, 'ola', lt), walk: walk ? lt * 10 : null });
      if (!walk) { fillRR(c, 80, 1460, 760, 280, 30, '#3D4A73'); fillRR(c, 80, 1460, 760, 40, 18, '#4A5888'); }
      beam(c, x + 70, 1270, -.12, 700, .26, walk ? .2 : .12);
    }
    // szpara w drzwiach: ciemność, coś się porusza
    if (lt > 6.4 && lt < 7.4) { c.fillStyle = 'rgba(0,0,0,.6)'; c.fillRect(890, 470, 120, 930); }
    night(c, .84, [{ x: 640, y: 1250, r: 420, a: .8, tint: 'rgba(190,217,255,.1)' }, { x: 780, y: 590, r: 240, a: .45 }]);
  },
  post(c, lt) {
    if (lt > 6.4 && lt < 9.0) label(c, 'SKRZYP… W PRZEDPOKOJU', 540, 300, 'dark', 40, lt - 6.4, 9.0 - lt);
    if (lt > 10.2) card(c, 70, 300, 860, 'BŁĄD 1', 'wstała i poszła sprawdzić —\nsama, po ciemku', lt - 10.2, '#F39C12', 40);
  },
});
// 3. PRZEDPOKÓJ: drzwi wejściowe uchylone, łańcuch luźno, Kuba wychodzi z pokoju
scene({
  name: 'hall', start: 25, end: 40,
  bubbles: [
    say(4.2, 6.6, 'Ola? Czemu nie śpisz?', 'kuba', 880, 1610, 1.9, -60),
    say(6.8, 9.2, 'Drzwi… były otwarte.', 'ola', 520, 1620, 1.95, 40),
    say(9.4, 13.4, 'Zamykałem je!\nNa klucz, przysięgam!', 'kuba', 880, 1610, 1.9, -80),
  ],
  draw(c, lt, sc) {
    hallNight(c, lt, { gap: 200, nochain: true });
    // łańcuch wisi luźno przy futrynie
    c.strokeStyle = '#D6DADF'; c.lineWidth = 5; for (let i = 0; i < 7; i++) { c.beginPath(); c.ellipse(542 + Math.sin(lt * 2 + i) * 2, 900 + i * 20, 6, 10, 0, 0, 7); c.stroke(); }
    // zimne powietrze z klatki
    for (let k = 0; k < 10; k++) { const p = (lt * .25 + hash(k)) % 1; c.fillStyle = `rgba(220,228,240,${.10 * (1 - p)})`; c.beginPath(); c.arc(520 - p * 300, 700 + hash(k + 3) * 600, 20 + p * 40, 0, 7); c.fill(); }
    const ox = mv(lt, 0, 2.4, 1150, 520);
    person(c, 'ola', ox, 1620, 1.95, { t: lt, flip: true, look: 1, wide: true, phone: 2, aR: 1.6, talk: talking(sc, 'ola', lt), walk: lt < 2.4 ? lt * 10 : null });
    beam(c, ox - 190, 1268, Math.PI + .06, 700, .3, .22);
    if (lt > 3.6) person(c, 'kuba', mv(lt, 3.6, 4.4, 1200, 880), 1610, 1.9, { t: lt, look: -1, wide: lt > 7, mouth: lt > 9.4 ? 'o' : null, talk: talking(sc, 'kuba', lt), walk: lt < 4.4 ? lt * 10 : null });
    night(c, .74, [{ x: 400, y: 960, r: 380, a: .7, tint: 'rgba(255,230,170,.06)' }, { x: ox - 300, y: 1200, r: 420, a: .7 }, { x: 900, y: 1100, r: lt > 3.6 ? 320 : 0, a: .5 }]);
  },
  post(c, lt) { if (lt > .6 && lt < 4.0) label(c, 'DRZWI WEJŚCIOWE: OTWARTE', 540, 300, 'red', 40, lt - .6, 4.0 - lt); },
});
// 4. KUCHNIA: otwarta lodówka, klucze Kuby na stole. Kuba wybiega (BŁĄD 2)
scene({
  name: 'kitchen', start: 40, end: 54,
  bubbles: [
    say(4.0, 6.4, 'To moje klucze…\nte, co zgubiłem.', 'kuba', 300, 1680, 1.9, 80),
    say(6.6, 8.6, 'Czyli on ma swoje.', 'ola', 760, 1690, 1.95, -60),
    say(8.8, 10.2, 'Dorwę go!', 'kuba', 300, 1680, 1.9, 60),
    say(10.4, 12.0, 'Kuba, nie!', 'ola', 760, 1690, 1.95, -60),
  ],
  draw(c, lt, sc) {
    kitchenBg(c, lt, { fridge: true });
    const run = lt > 9.4, kx = run ? mv(lt, 9.4, 10.6, 300, -200) : 300;
    person(c, 'kuba', kx, 1680, 1.9, { t: lt, look: run ? -1 : 1, wide: lt > 3.6, mouth: lt > 8.8 && lt < 10 ? 'angry' : (lt > 3.6 ? 'o' : null), keys: lt > 4.6 && !run, talk: talking(sc, 'kuba', lt), walk: run ? lt * 16 : null, aR: lt > 8.8 ? 1.2 : .14 });
    person(c, 'ola', 760, 1690, 1.95, { t: lt, look: run ? -1 : -1, wide: true, mouth: lt > 10.4 ? 'o' : null, talk: talking(sc, 'ola', lt), aL: lt > 10.4 ? 1.3 : .14 });
    kitchenTable(c, lt, { keys: lt < 4.6 });
    night(c, .66, [{ x: 925, y: 1000, r: 620, a: .95, tint: 'rgba(255,245,210,.08)' }, { x: 520, y: 1480, r: 340, a: .6 }]);
  },
  post(c, lt) {
    if (lt > 1.4 && lt < 4.4) label(c, 'KLUCZE KUBY · ZGUBIONE W ODC. 5', 540, 760, 'dark', 36, lt - 1.4, 4.4 - lt);
    if (lt > 11.0) card(c, 70, 300, 860, 'BŁĄD 2', 'Kuba pobiegł za obcym\nna klatkę', lt - 11.0, '#F39C12', 40);
  },
});
// 5. TELEFON NA 112: Ola zamyka drzwi na oba zamki, rozmowa z dyspozytorem, karta ZASADA (bez czytania)
scene({
  name: 'call', start: 54, end: 69,
  bubbles: [
    sayPhone(2.6, 5.2, 'Numer alarmowy 112.\nCo się stało?', 'policjant', 700, 1020, 120, 70),
    say(5.4, 9.4, 'Ktoś był w naszym mieszkaniu.\nBrat pobiegł za nim na klatkę.', 'ola', 640, 1620, 1.95, -40),
    sayPhone(9.6, 14.6, 'Zamknij drzwi i nie wychodź.\nPatrol już jedzie.\nZostań ze mną na linii.', 'policjant', 700, 1020, 60, 70),
  ],
  draw(c, lt, sc) {
    const l1 = clamp((lt - .6) / .4), l2 = clamp((lt - 1.6) / .4);
    hallNight(c, lt, { locks: [l1 * Math.PI / 2, l2 * Math.PI / 2] });
    // łańcuch założony
    if (lt > 2.2) { c.strokeStyle = '#D6DADF'; c.lineWidth = 5; for (let i = 0; i < 7; i++) { c.beginPath(); c.ellipse(lerp(560, 620, i / 6), 897 + Math.sin(i / 6 * Math.PI) * 18, 10, 6, 0, 0, 7); c.stroke(); } }
    person(c, 'ola', 640, 1620, 1.95, { t: lt, look: 1, wide: true, phone: 2, aR: 2.6, talk: talking(sc, 'ola', lt), aL: lt < 2.2 ? 1.5 : .14 });
    // fala dźwięku przy telefonie, gdy mówi dyspozytor
    if (talking(sc, 'policjant', lt)) for (let k = 1; k <= 3; k++) { c.strokeStyle = `rgba(190,217,255,${.5 - k * .12})`; c.lineWidth = 4; c.beginPath(); c.arc(700, 1020, 20 + k * 18 + (lt * 40) % 18, -.9, .9); c.stroke(); }
    night(c, .66, [{ x: 92, y: 620, r: 320, a: .7 }, { x: 680, y: 1060, r: 420, a: .8, tint: 'rgba(190,217,255,.06)' }]);
  },
  post(c, lt) {
    if (lt > .4 && lt < 2.4) label(c, 'ZAMEK 1… ZAMEK 2… ŁAŃCUCH', 540, 300, 'dark', 38, lt - .4, 2.4 - lt);
    if (lt > 2.4 && lt < 9.6) { fillRR(c, 380, 250, 320, 64, 32, 'rgba(30,140,70,.92)'); txt(c, 'POŁĄCZENIE 112 · ' + '00:' + String(Math.floor(lt - 2.4)).padStart(2, '0'), 540, 283, 30, '#fff', 900); }
    if (lt > 9.8) card(c, 60, 260, 900, 'ZASADA', 'Ktoś obcy był w domu? Nie sprawdzaj\ni nie goń go. Zamknij się, dzwoń\nna 112 i nie rozłączaj się.', lt - 9.8, '#F39C12', 36);
  },
});
// 6. KLATKA: Kuba biegnie w górę, światło gaśnie, 10. piętro: taśma przecięta — ręka na ramieniu (Zdzisiek)
scene({
  name: 'stairs', start: 69, end: 86,
  bubbles: [
    say(5.0, 7.6, 'Halo?! Wiem, że tu jesteś!', 'kuba', 560, 1600, 1.9, 0),
    say(13.0, 15.0, 'Chłopcze! Do domu. Ale już.', 'zdzisiek', 300, 1600, 1.85, 120),
    say(15.2, 17.0, 'On tam jest!', 'kuba', 680, 1600, 1.9, 0),
  ],
  draw(c, lt, sc) {
    if (lt < 4.0) { // 9. piętro → schody w górę
      stairwell(c, lt, { floor: 9, lightOff: lt > 3.0 });
      const p = clamp(lt / 3.6), kx = lerp(980, 260, p), ky = lerp(1900, 1900 - 16 * 70 * .62, p);
      person(c, 'kuba', kx, ky, 1.7, { t: lt, look: -1, back: false, walk: lt * 14, phone: 2, aR: 1.8 });
      beam(c, kx - 60, ky - 360, Math.PI + .5, 800, .28, .26);
      breath(c, kx - 50, ky - 420, lt, -1);
      const off = lt > 3.0;
      night(c, off ? .9 : .5, [{ x: kx - 300, y: ky - 600, r: 460, a: .9 }, { x: 175, y: 396, r: off ? 0 : 400, a: .6 }]);
      return;
    }
    // 10. piętro: drzwi 104, taśma przecięta, drzwi uchylone, światło w środku
    corridorBg(c, lt, { num: '104', num2: '103', floor: '10' });
    c.save(); c.fillStyle = '#050507'; c.fillRect(640, 560, 70, 840); c.restore(); // szpara: drzwi uchylone
    c.fillStyle = 'rgba(255,225,160,.5)'; c.fillRect(646, 560, 18, 840);
    c.strokeStyle = '#F5D90A'; c.lineWidth = 30; c.beginPath(); c.moveTo(310, 640); c.lineTo(500, 820); c.stroke(); c.beginPath(); c.moveTo(330, 1180); c.quadraticCurveTo(360, 1300, 340, 1400); c.stroke(); // taśma przecięta, zwisa
    c.save(); c.translate(400, 730); c.rotate(.75); txt(c, 'POLICJA', 0, 0, 20, '#14161B', 900); c.restore();
    const kx = lt < 9 ? mv(lt, 4.0, 6.0, 1100, 560) : (lt < 12.0 ? mv(lt, 9.0, 11.6, 560, 620) : mv(lt, 12.4, 13.0, 620, 680));
    person(c, 'kuba', kx, 1600, 1.9, { t: lt, look: lt > 12.6 ? -1 : 1, back: lt > 9 && lt < 12.4, wide: lt > 12.4, mouth: lt > 12.4 ? 'o' : null, phone: 2, aR: 1.8, talk: talking(sc, 'kuba', lt), walk: (lt < 6.0 || (lt > 9 && lt < 11.6)) ? lt * 12 : null });
    breath(c, kx + 40, 1600 - 640, lt);
    if (lt > 11.8) person(c, 'zdzisiek', mv(lt, 11.8, 12.4, -160, 300), 1600, 1.85, { t: lt, look: 1, aR: lt > 12.2 && lt < 13 ? 1.6 : .14, talk: talking(sc, 'zdzisiek', lt), walk: lt < 12.4 ? lt * 12 : null });
    if (lt > 12.2 && lt < 12.9) { // ręka na ramieniu: wstrząs
      c.fillStyle = 'rgba(255,255,255,.18)'; c.fillRect(0, 0, W, H);
    }
    night(c, .86, [{ x: 650, y: 980, r: 360, a: .8, tint: 'rgba(255,225,160,.08)' }, { x: kx + 120, y: 1000, r: 400, a: .8 }, { x: 300, y: 1000, r: lt > 11.8 ? 300 : 0, a: .6 }]);
    beam(c, kx + 80, 1250, -.08, 600, .25, .22);
  },
  post(c, lt) {
    if (lt > 3.0 && lt < 4.0) label(c, 'KLIK. ŚWIATŁO GAŚNIE', 540, 300, 'dark', 40, lt - 3.0, 4.0 - lt);
    if (lt > 8.0 && lt < 11.6) label(c, '10. PIĘTRO · TAŚMA PRZECIĘTA', 540, 300, 'red', 38, lt - 8.0, 11.6 - lt);
  },
});
// 7. POLICJA: niebieskie światła, policjanci wchodzą do 104 — „Pusto” — potem w mieszkaniu: „Dobrze, że zadzwoniłaś”
scene({
  name: 'police', start: 86, end: 100,
  bubbles: [
    say(4.4, 7.2, 'Pusto. Nikogo tu nie ma.', 'policjant', 560, 1560, 1.8, 40),
    say(9.4, 13.4, 'Dobrze, że zadzwoniłaś\ni zostałaś w środku.', 'policjant', 380, 1600, 2.0, 60),
  ],
  draw(c, lt, sc) {
    if (lt < 8.6) {
      corridorBg(c, lt, { num: '104', num2: '103', floor: '10', open: lt > 1.6 });
      const blue = .5 + .5 * Math.sin(lt * 14);
      if (lt < 4.0) person(c, 'policjant', mv(lt, .4, 2.6, 1180, 560), 1560, 1.8, { t: lt, look: -1, walk: lt < 2.6 ? lt * 10 : null, aR: 1.4 });
      else person(c, 'policjant', 560, 1560, 1.8, { t: lt, look: 1, aR: 1.4, talk: talking(sc, 'policjant', lt) });
      beam(c, lt < 4 ? mv(lt, .4, 2.6, 1100, 480) : 640, 1220, lt < 4 ? Math.PI : -.4, 600, .25, .3);
      person(c, 'kuba', 140, 1620, 1.8, { t: lt, look: 1, wide: true });
      person(c, 'zdzisiek', 330, 1620, 1.75, { t: lt, look: 1, net: false });
      night(c, .7, [{ x: 520, y: 960, r: 420, a: .8, tint: 'rgba(255,225,160,.08)' }, { x: 300, y: 900, r: 600, a: .5, tint: `rgba(60,120,255,${.22 * blue})` }]);
      return;
    }
    // mieszkanie: policjant w przedpokoju, Kuba i Ola razem
    hallNight(c, lt, {});
    person(c, 'policjant', 380, 1600, 2.0, { t: lt, look: 1, talk: talking(sc, 'policjant', lt) });
    person(c, 'ola', 720, 1610, 1.9, { t: lt, look: -1, aL: 1.0 });
    person(c, 'kuba', 900, 1620, 1.9, { t: lt, look: -1, aR: 1.0 });
    night(c, .55, [{ x: 92, y: 620, r: 360, a: .8 }, { x: 600, y: 1100, r: 520, a: .7 }]);
  },
  post(c, lt) { if (lt < 3.0) label(c, 'PATROL · 03:09', 540, 300, 'dark', 40, lt, 3.0 - lt); },
});
// 8. ZAKOŃCZENIE: Bluetooth — „nagranie” z szafy w 104. „Tu też jest szafa.” — szafa w pokoju Oli się uchyla
scene({
  name: 'end', start: 100, end: 120,
  cam: lt => { const sh = lt > 15.9 && lt < 16.5 ? (16.5 - lt) * 30 : 0; return { z: 1, x: Math.sin(lt * 90) * sh, y: 0 }; },
  labels: [[17.6, 20, 'ODC. 11 ↓', 540, 1650, 'red', 64]],
  bubbles: [say(9.4, 11.6, 'To… z szafy w 104.', 'kuba', 780, 1640, 2.0, -40)],
  draw(c, lt, sc) {
    if (lt > 4.2 && lt < 9.2) { // telefon: powiadomienie i podgląd nagrania z wnętrza szafy w 104
      c.fillStyle = '#07080C'; c.fillRect(0, 0, W, H);
      bigPhone(c, (cc, x, y, w, h) => {
        cc.fillStyle = '#0B0D14'; cc.fillRect(x, y, w, h);
        txt(cc, 'Bluetooth', x + 50, y + 70, 22, '#AEB0C2', 800, 'left'); txt(cc, '„k4ptur_94” udostępnia: nagranie', x + 50, y + 112, 26, '#FFFFFF', 900, 'left');
        // podgląd: przez szpary szafy widać policjanta z latarką
        const vx = x + 30, vy = y + 160, vw = w - 60, vh = 520; cc.fillStyle = '#05060A'; cc.fillRect(vx, vy, vw, vh);
        cc.save(); cc.beginPath(); cc.rect(vx, vy, vw, vh); cc.clip();
        cc.fillStyle = '#2B2A30'; cc.fillRect(vx, vy, vw, vh);
        person(cc, 'policjant', vx + vw * .55 + Math.sin(lt) * 20, vy + vh + 120, 1.3, { t: lt, look: -1, aR: 1.4 });
        beam(cc, vx + vw * .45, vy + vh * .55, Math.PI * .95, 300, .3, .35);
        for (let k = 0; k < 6; k++) { cc.fillStyle = '#020203'; cc.fillRect(vx, vy + k * 90 - 10, vw, 34); } // listwy drzwi szafy
        cc.restore();
        fillRR(cc, vx, vy + vh - 40, 150, 30, 6, 'rgba(215,38,61,.95)'); txt(cc, '● REC 03:11', vx + 75, vy + vh - 25, 18, '#fff', 900);
        txt(cc, 'nagrane: 104 · szafa', x + 50, y + 740, 26, '#FF8A80', 900, 'left');
      }, 1, 300);
      return;
    }
    // pokój Oli: Ola na łóżku, Kuba obok. Po lewej szafa…
    const ward = clamp((lt - 12.6) / 3.2) * .55;
    olaRoom(c, lt, { ward });
    person(c, 'ola', 470, 1640, 2.2, { t: lt, phone: 2, aR: 2.0, look: lt > 13.4 ? -1 : 1, wide: lt > 12, mouth: lt > 14.6 ? 'o' : null });
    fillRR(c, 80, 1460, 760, 280, 30, '#3D4A73'); fillRR(c, 80, 1460, 760, 40, 18, '#4A5888');
    person(c, 'kuba', 780, 1640, 2.0, { t: lt, look: lt > 13.4 ? -1 : -1, wide: lt > 9, mouth: lt > 9.4 ? 'o' : null, talk: talking(sc, 'kuba', lt) });
    if (ward > .08) { // oczy i ręka w rękawiczce w szparze szafy
      const a = clamp((lt - 13.8) / .8), big = lt > 15.9 ? 2.8 : 2.0, gx = (26 + 117 * (1 - ward) + 143) / 2;
      c.save(); c.globalAlpha = a; c.shadowColor = 'rgba(255,255,255,.95)'; c.shadowBlur = 28;
      ell(c, gx - 11 * big, 660, 7 * big, 4.6 * big, '#F8F6EE'); ell(c, gx + 11 * big, 660, 7 * big, 4.6 * big, '#F8F6EE'); circ(c, gx - 11 * big, 660, 2.2 * big, '#111'); circ(c, gx + 11 * big, 660, 2.2 * big, '#111'); c.restore();
      if (lt > 15.0) { const h = clamp((lt - 15.0) / .5); c.save(); c.globalAlpha = h; for (let f = 0; f < 4; f++) fillRR(c, 26 + 117 * (1 - ward) - 4, 800 + f * 24, 34, 16, 8, '#121316'); c.restore(); }
    }
    night(c, lt > 15.9 ? .92 : .84, [{ x: 470, y: 1250, r: 380, a: .9, tint: 'rgba(190,217,255,.12)' }, { x: 130, y: 720, r: 160 + ward * 420, a: .55, tint: 'rgba(190,217,255,.05)' }]);
    if (lt > 15.9 && lt < 16.15) { c.fillStyle = 'rgba(255,255,255,.55)'; c.fillRect(0, 0, W, H); }
    if (lt > 16.6) { c.fillStyle = `rgba(0,0,0,${clamp((lt - 16.6) / 1.2) * .88})`; c.fillRect(0, 0, W, H); }
  },
  post(c, lt) { if (lt < 3.6) label(c, '03:40 · NIKT NIE ŚPI', 540, 300, 'dark', 40, lt, 3.6 - lt); },
});
