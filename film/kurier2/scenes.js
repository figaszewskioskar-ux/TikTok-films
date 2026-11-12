// NIE OTWIERAJ KURIEROWI! · CZĘŚĆ 2 — fałszywy kurier wraca z „paczką za pobraniem” dla Kuby. Pani Halina rozpoznaje głos.
window.EP = {
  badge: 'KURIER · CZĘŚĆ 2',
  loop: false,
  vignette: .84,
  cues(add) {
    add(0.2, 'stab'); add(1.0, 'buzz'); add(6.2, 'whoosh'); add(12.6, 'buzz'); add(21.4, 'error');
    add(24.4, 'whoosh'); add(30.0, 'dial'); add(34.4, 'whoosh'); add(36.0, 'ding'); add(43.0, 'error');
    add(46.4, 'ding'); add(52.6, 'hit'); add(57.4, 'slam'); add(62.4, 'siren'); add(74.4, 'whoosh');
    add(86.4, 'buzz'); add(92.0, 'knock'); add(93.2, 'knock'); add(94.4, 'knock'); add(96.6, 'hit');
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
// mieszkanie 94 wieczorem: ściana, drzwi, poświata TV, unifon
function flat94(c, lt) {
  c.fillStyle = '#C8B69A'; c.fillRect(0, 0, W, 1420);
  for (let i = 0; i < 20; i++) { c.fillStyle = 'rgba(150,120,80,.18)'; c.fillRect(i * 60, 0, 22, 1420); }
  c.fillStyle = '#6A4E36'; c.fillRect(0, 1420, W, 500);
  for (let i = 0; i < 12; i++) { c.fillStyle = 'rgba(0,0,0,.12)'; c.fillRect(0, 1440 + i * 44, W, 3); }
  fillRR(c, 0, 1400, W, 26, 0, '#4E3826');
  paddedDoor(c, 40, 560, 340, 860, '94');
  // wieszak, lampa, zegar 22:14
  c.fillStyle = '#5A4632'; c.fillRect(860, 470, 170, 14); fillRR(c, 880, 480, 56, 190, 20, '#6E7B3B'); fillRR(c, 950, 480, 50, 150, 20, '#E9B52C');
  circ(c, 640, 330, 52, '#E8E4DA'); circ(c, 640, 330, 44, '#F6F3EA'); c.strokeStyle = '#14161B'; c.lineWidth = 6;
  { const hA = (10 + 14 / 60) / 12 * Math.PI * 2 - Math.PI / 2, mA = 14 / 60 * Math.PI * 2 - Math.PI / 2; c.beginPath(); c.moveTo(640, 330); c.lineTo(640 + Math.cos(hA) * 22, 330 + Math.sin(hA) * 22); c.stroke(); c.lineWidth = 3.5; c.beginPath(); c.moveTo(640, 330); c.lineTo(640 + Math.cos(mA) * 34, 330 + Math.sin(mA) * 34); c.stroke(); }
  const fl = 0.6 + 0.4 * Math.sin(lt * 9) * Math.sin(lt * 3.3);
  const g = c.createRadialGradient(1120, 1000, 40, 1120, 1000, 600); g.addColorStop(0, `rgba(110,170,255,${0.4 * fl})`); g.addColorStop(1, 'rgba(110,170,255,0)'); c.fillStyle = g; c.fillRect(500, 300, 580, 1400);
}
// kabina windy od środka: metal, przyciski, wyświetlacz piętra
function cabin(c, lt, floor, y0 = 0, h = 960) {
  c.save(); c.beginPath(); c.rect(0, y0, W, h); c.clip();
  const g = c.createLinearGradient(0, y0, W, y0); g.addColorStop(0, '#7D858E'); g.addColorStop(.5, '#B3BAC2'); g.addColorStop(1, '#7D858E'); c.fillStyle = g; c.fillRect(0, y0, W, h);
  for (let i = 0; i < 6; i++) { c.fillStyle = 'rgba(0,0,0,.06)'; c.fillRect(i * 180 + 40, y0, 4, h); }
  c.fillStyle = '#4A4F58'; c.fillRect(0, y0 + h - 110, W, 110);
  fillRR(c, 820, y0 + 260, 150, 330, 10, '#5E6670'); for (let i = 0; i < 10; i++) circ(c, 860 + (i % 2) * 70, y0 + 300 + Math.floor(i / 2) * 56, 18, i === 0 ? '#F5C542' : '#C9CDD2');
  fillRR(c, 400, y0 + 60, 280, 100, 10, '#0B0C10'); txt(c, String(floor), 540, y0 + 112, 64, '#FF3B30', 900);
  c.fillStyle = 'rgba(255,248,220,.18)'; c.fillRect(0, y0, W, 40);
  c.restore();
}
// mieszkanie pani Haliny: kwiecista tapeta, unifon, telefon stacjonarny
function halinaFlat(c, lt) {
  c.fillStyle = '#8C6F86'; c.fillRect(0, 0, W, 1420);
  for (let y = 40; y < 1400; y += 120) for (let x = (y / 120 % 2) * 60; x < W; x += 120) { circ(c, x, y, 16, 'rgba(242,140,177,.35)'); circ(c, x, y, 6, 'rgba(255,230,160,.5)'); }
  c.fillStyle = '#4A3828'; c.fillRect(0, 1420, W, 500);
  fillRR(c, 0, 1400, W, 26, 0, '#3A2C20');
  fillRR(c, 700, 560, 300, 700, 8, '#6B5440'); for (let i = 0; i < 3; i++) fillRR(c, 720, 600 + i * 210, 260, 180, 6, '#7A6048'); // kredens
  fillRR(c, 760, 500, 60, 60, 8, '#B23A3A'); fillRR(c, 840, 470, 110, 90, 10, '#2A2D36'); // radio i telefon
  fillRR(c, 120, 700, 140, 210, 10, '#E8E4DA'); fillRR(c, 140, 720, 100, 70, 6, '#2F3A3A'); for (let i = 0; i < 4; i++) circ(c, 160 + i * 20, 830, 6, '#5E6670'); // unifon
  { const lg = c.createRadialGradient(540, 300, 20, 540, 300, 700); lg.addColorStop(0, 'rgba(255,220,150,.25)'); lg.addColorStop(1, 'rgba(255,220,150,0)'); c.fillStyle = lg; c.fillRect(0, 0, W, 1400); }
}

// ===================== SCENY =====================
// 0. HAK
scene({
  name: 'hook', start: 0, end: 6,
  draw(c, lt) {
    quilted(c, 0, 0, W, H, '#5E4029', '#4D3420', '#B8914E', 90);
    const g = c.createRadialGradient(540, 900, 100, 540, 900, 1000); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.6)'); c.fillStyle = g; c.fillRect(0, 0, W, H);
    unifon(c, 250, 620, 580, 860, { glow: .6 + .4 * Math.sin(lt * 8), feed: feedEntrance(lt + 20, { look: 0, boxNum: '94' }) });
    bigSign(c, lt, 'NIE SCHODŹ', 'PO PACZKĘ!', 380);
    if (lt > 2.2) label(c, 'NIE OTWIERAJ KURIEROWI! · CZĘŚĆ 2', 540, 1620, 'yellow', 40, lt - 2.2, 9);
  },
});
// 1. POPRZEDNIO: fałszywy kurier i Kaptur uciekają przed panią Haliną
scene({
  name: 'recap', start: 6, end: 12,
  labels: [[0.3, 5.6, 'POPRZEDNIO', 540, 300, 'dark', 44]],
  draw(c, lt) {
    corridorBg(c, lt, { open: true });
    person(c, 'halina', 520, 1420, 2.2, { t: lt, aR: 2.6, pin: true, mouth: 'angry' });
    const run = prog(lt, .6, 3.0);
    person(c, 'kaptur', lerp(240, -420, eio(run)), 1500, 2.0, { t: lt, walk: run < 1 ? lt * 16 : null, look: -1, rot: -.12 });
    person(c, 'kurier', lerp(870, -260, eio(run)), 1500, 2.0, { t: lt, walk: run < 1 ? lt * 16 : null, look: -1, rot: -.12, wide: true, mouth: 'o' });
    night(c, .45, [{ x: 540, y: 1000, r: 700, a: .8 }]);
  },
});
// 2. MIESZKANIE 94: domofon, paczka „za pobraniem” dla Kuby (BŁĄD 1)
scene({
  name: 'flat', start: 12, end: 24,
  bubbles: [
    sayAt(1.0, 4.4, 'Paczka dla Kuby. Za pobraniem,\n89 zł. Zejdzie pan na dół?', 'kurier', 515, 870, 0, 40),
    say(4.6, 6.4, 'Nic nie zamawialiśmy…', 'ola', 980, 1500, 2.0, -120),
    say(6.6, 9.0, 'Może od wujka?\nZaraz zejdę!', 'kuba', 700, 1500, 2.1, 0),
  ],
  draw(c, lt, sc) {
    flat94(c, lt);
    unifon(c, 440, 760, 150, 230, { glow: lt < 1 ? .8 : 0, feed: feedEntrance(lt, { boxNum: '94', talk: talking(sc, 'kurier', lt) }) });
    const zin = prog(lt, 0.4, 0.8) * (1 - prog(lt, 4.4, 4.8));
    person(c, 'kuba', 700, 1500, 2.1, { t: lt, look: lt < 4.6 ? -.8 : 1, talk: talking(sc, 'kuba', lt), mouth: lt > 9 ? 'smile' : null });
    person(c, 'ola', 980, 1500, 2.0, { t: lt, look: -1, talk: talking(sc, 'ola', lt), wide: lt > 6.6, phone: 1 });
    if (zin > 0) { c.save(); c.globalAlpha = zin; c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 30; fillRR(c, 168, 318, 744, 464, 18, '#2A2C30'); c.shadowColor = 'transparent';
      c.beginPath(); c.roundRect(180, 330, 720, 440, 10); c.save(); c.clip(); feedEntrance(lt, { boxNum: '94', talk: talking(sc, 'kurier', lt), look: 0 })(c, 180, 330, 720, 440); c.restore(); c.restore(); }
    night(c, .35, [{ x: 540, y: 300, r: 900, a: .8 }]);
  },
  post(c, lt) { if (lt > 9.4) card(c, 70, 300, 860, 'BŁĄD 1', 'zgodził się zejść w nocy\npo paczkę, której nie zamawiał', lt - 9.4, '#F39C12', 40); },
});
// 3. PANI HALINA słyszy wszystko przez domofon (jak w części 1)
scene({
  name: 'halina', start: 24, end: 34,
  labels: [[0.3, 3.0, '7 PIĘTRO · MIESZKANIE 71', 540, 300, 'dark', 40]],
  bubbles: [
    say(1.2, 3.6, 'Ten głos… ja go znam.', 'halina', 480, 1480, 2.2, 60),
    say(3.8, 6.4, 'To ten sam „kurier”\nco wtedy!', 'halina', 480, 1480, 2.2, 60),
    say(6.8, 9.4, 'Halo, Ola? Nie puszczaj\nbrata na dół!', 'halina', 480, 1480, 2.2, 60),
  ],
  draw(c, lt, sc) {
    halinaFlat(c, lt);
    person(c, 'halina', 480, 1480, 2.2, { t: lt, look: lt < 6 ? -1 : 1, aR: lt > 6.4 ? 2.4 : .14, phone: lt > 6.4 ? 1 : 0, talk: talking(sc, 'halina', lt), wide: lt > 3.6 && lt < 6.4 });
    night(c, .3, [{ x: 540, y: 300, r: 900, a: .8 }]);
  },
});
// 4. DZIELONY EKRAN: Kuba w windzie (BŁĄD 2: sam, bez telefonu) / Ola odbiera telefon
scene({
  name: 'split', start: 34, end: 46,
  bubbles: [
    sayAt(2.0, 4.4, 'Pani Halino? Co się stało?', 'ola', 640, 1350, 0, 160),
    sayAt(7.6, 10.4, 'Kuba! Telefon zostawił\nna szafce…', 'ola', 640, 1350, 0, 160),
  ],
  draw(c, lt, sc) {
    const fl = Math.max(0, 9 - Math.floor(prog(lt, .4, 10.6) * 9));
    cabin(c, lt, fl, 0, 940);
    person(c, 'kuba', 400, 880, 1.5, { t: lt, look: 1, mouth: 'smile' });
    fillRR(c, 0, 940, W, 40, 0, '#0B0C10');
    c.save(); c.beginPath(); c.rect(0, 980, W, 940); c.clip(); c.translate(0, 980 - 560); flat94(c, lt);
    person(c, 'ola', 640, 1500, 1.9, { t: lt, look: -1, phone: 2, aR: 2.4, wide: lt > 4.4, talk: talking(sc, 'ola', lt) });
    if (lt > 6.4) { fillRR(c, 860, 1200, 46, 84, 8, '#15171C'); c.save(); c.shadowColor = '#BFD9FF'; c.shadowBlur = 30; fillRR(c, 864, 1206, 38, 72, 6, '#BFD9FF'); c.restore(); }
    c.restore();
    txt(c, 'WINDA · KUBA', 40, 70, 30, '#FFFFFF', 900, 'left'); txt(c, 'MIESZKANIE 94 · OLA', 40, 1030, 30, '#FFFFFF', 900, 'left');
  },
  post(c, lt) { if (lt > 8.0) card(c, 70, 1700, 860, 'BŁĄD 2', 'zjechał sam, a telefon\nzostawił w domu', lt - 8.0, '#F39C12', 40); },
});
// 5. PARTER: kurier z paczką, w cieniu schodów Kaptur. Pani Halina krzyczy z klatki
scene({
  name: 'lobby', start: 46, end: 62,
  cam: lt => { const sh = lt > 11.4 && lt < 11.9 ? (11.9 - lt) * 20 : 0; return { z: 1, x: Math.sin(lt * 80) * sh, y: 0 }; },
  labels: [[6.4, 9.6, 'W CIENIU SCHODÓW', 220, 760, 'red', 38]],
  bubbles: [
    say(1.6, 3.6, 'Kuba? Podpis tutaj.\nI 89 złotych.', 'kurier', 820, 1480, 2.0, -100),
    say(3.8, 5.6, 'Skąd pan zna\nmoje imię?', 'kuba', 545, 1395, 1.8, 0),
    sayAt(10.0, 12.4, 'Kuba, uciekaj! Policja\njuż jedzie!', 'halina', 120, 640, 260, 40),
  ],
  draw(c, lt, sc) {
    const out = lt > 1.2;
    lobbyBg(c, lt, { elevOpen: mv(lt, 0.2, 0.9, 0, 1), floor: '0', inCab: out ? null : (cc => person(cc, 'kuba', 545, 1395, 1.8, { t: lt })) });
    const kp = prog(lt, 6.0, 10.0), back_ = prog(lt, 12.0, 13.0);
    person(c, 'kaptur', lerp(-120, 200, kp), lerp(1180, 1480, kp), lerp(1.7, 2.0, kp), { t: lt, glow: kp > .2 ? .8 : 0, walk: kp > 0 && kp < 1 ? lt * 8 : null, look: 1, alpha: 1 - prog(lt, 12.6, 13.4) });
    if (out) person(c, 'kuba', lt < 12 ? 545 : mv(lt, 12, 12.8, 545, 560), 1395, 1.8, { t: lt, look: lt > 9.6 ? -1 : 1, wide: lt > 3.6, mouth: talking(sc, 'kuba', lt) ? null : (lt > 6 ? 'o' : null), talk: talking(sc, 'kuba', lt) });
    const run = prog(lt, 12.4, 14.4);
    person(c, 'kurier', lerp(820, 1300, eio(run)), 1480, 2.0, { t: lt, box: run === 0, boxNum: '94', look: run > 0 ? 1 : -1, talk: talking(sc, 'kurier', lt), walk: run > 0 && run < 1 ? lt * 16 : null });
    if (run > 0) fillRR(c, 760, 1430, 156, 104, 6, '#B07A45');
    night(c, .55, [{ x: 545, y: 900, r: 520, a: .9 }, { x: 820, y: 1000, r: 380, a: .7 }]);
  },
});
// 6. POLICJA + ZASADA (bez czytania)
scene({
  name: 'police', start: 62, end: 74,
  bubbles: [
    say(0.8, 3.8, 'Nic nie zamawiałeś?\nTo po co schodzisz?', 'policjant', 300, 1500, 2.0, 80),
    say(4.0, 5.8, 'Myślałem, że to od wujka…', 'kuba', 620, 1500, 1.9, 0),
    say(6.2, 9.0, 'Kawalerze, drugi raz\nmamy tego samego „kuriera”.', 'halina', 880, 1500, 2.0, -120),
  ],
  draw(c, lt, sc) {
    lobbyBg(c, lt, { floor: '0' });
    person(c, 'policjant', 300, 1500, 2.0, { t: lt, look: 1, talk: talking(sc, 'policjant', lt) });
    person(c, 'kuba', 620, 1500, 1.9, { t: lt, look: -1, talk: talking(sc, 'kuba', lt) });
    person(c, 'halina', 880, 1500, 2.0, { t: lt, look: -1, talk: talking(sc, 'halina', lt), pin: lt > 6, aR: lt > 6 ? 2.6 : .14 });
    fillRR(c, 440, 1600, 156, 104, 6, '#B07A45'); c.fillStyle = '#D9B57E'; c.fillRect(440, 1622, 156, 12);
    const on = Math.floor(lt * 5) % 2; night(c, .4, [{ x: 540, y: 900, r: 800, a: .85, tint: on ? 'rgba(60,120,255,.12)' : 'rgba(255,50,50,.1)' }]);
  },
  post(c, lt) { if (lt > 9.2) card(c, 60, 260, 900, 'ZASADA', 'Paczka, której nie zamawiałeś? Nie schodź\npo nią w nocy. Sprawdź przesyłkę\nw oficjalnej aplikacji przewoźnika,\npodejrzanego kuriera zgłoś na 112.', lt - 9.2, '#F39C12', 34); },
});
// 7. W DOMU: skąd znał imię? Paczka w rękach policji. Na niej: „94”
scene({
  name: 'home', start: 74, end: 86,
  bubbles: [
    say(0.6, 3.0, 'Skąd on wiedział,\njak mam na imię?', 'kuba', 380, 1500, 2.0, 60),
    say(3.4, 6.2, 'Kuba… podpisałeś się\nna domofonie.', 'ola', 820, 1500, 2.0, -80),
  ],
  draw(c, lt, sc) {
    flat94(c, lt);
    person(c, 'kuba', 380, 1500, 2.0, { t: lt, look: 1, talk: talking(sc, 'kuba', lt), wide: lt > 3.4 });
    person(c, 'ola', 820, 1500, 2.0, { t: lt, look: -1, talk: talking(sc, 'ola', lt) });
    if (lt > 6.4) { // lista lokatorów na domofonie
      const a = clamp((lt - 6.4) / .4); c.save(); c.globalAlpha = a; fillRR(c, 240, 420, 600, 420, 14, '#E8E4DA');
      ['71 · H. NOWAK', '93 · ---', '94 · KUBA I OLA', '104 · ---'].forEach((t, i) => { fillRR(c, 270, 450 + i * 92, 540, 72, 8, i === 2 ? '#F5C542' : '#C9CDD2'); txt(c, t, 300, 486 + i * 92, 34, '#14161B', 900, 'left'); });
      c.restore(); }
    night(c, .4, [{ x: 540, y: 600, r: 800, a: .8 }]);
  },
  post(c, lt) { if (lt > 6.8) label(c, 'IMIONA NA DOMOFONIE', 540, 300, 'red', 40, lt - 6.8, 9); },
});
// 8. ZAKOŃCZENIE: 3:00, domofon dzwoni — na ekranie pusto. Pukanie. Wizjer: paczka i stopy pod drzwiami
scene({
  name: 'end', start: 86, end: 104,
  cam: lt => { const sh = lt > 10.6 && lt < 11.2 ? (11.2 - lt) * 30 : 0; return { z: 1, x: Math.sin(lt * 90) * sh, y: 0 }; },
  labels: [[0.3, 3, '03:00', 540, 300, 'yellow', 48], [14.0, 18, 'CZĘŚĆ 3 ↓', 540, 1650, 'red', 64]],
  bubbles: [sayAt(2.6, 5.6, 'Kuba… paczka już jest\nna górze.', 'kurier', 515, 870, 0, 40)],
  draw(c, lt, sc) {
    if (lt < 6.4) {
      flat94(c, lt);
      unifon(c, 440, 760, 150, 230, { glow: .8, feed: feedEntrance(lt, { courier: false }) });
      c.save(); c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 30; fillRR(c, 168, 318, 744, 464, 18, '#2A2C30'); c.shadowColor = 'transparent';
      c.beginPath(); c.roundRect(180, 330, 720, 440, 10); c.save(); c.clip(); feedEntrance(lt, { courier: false })(c, 180, 330, 720, 440); c.restore(); c.restore();
      person(c, 'kuba', 700, 1500, 2.1, { t: lt, look: -.8, wide: true, mouth: 'o' });
      night(c, .82, [{ x: 540, y: 560, r: 520, a: .9, tint: 'rgba(160,220,200,.08)' }]);
      if (lt > 1.4) label(c, 'NA EKRANIE NIKOGO', 360, 860, 'red', 38, lt - 1.4, 6.4 - lt);
      return;
    }
    // widok przez wizjer: paczka z napisem 94 na wycieraczce, pod drzwiami cienie stóp
    const l = lt - 6.4;
    peepPOV(c, lt, (cc, cx, cy, r) => {
      cc.fillStyle = '#A9A595'; cc.fillRect(cx - r, cy - r, 2 * r, 2 * r); cc.fillStyle = '#3E5A47'; cc.fillRect(cx - r, cy + r * .2, 2 * r, r);
      cc.fillStyle = '#2C2824'; cc.fillRect(cx - r, cy + r * .6, 2 * r, r);
      fillRR(cc, cx - 90, cy + r * .45, 180, 120, 8, '#B07A45'); cc.fillStyle = '#D9B57E'; cc.fillRect(cx - 90, cy + r * .45 + 24, 180, 14); txt(cc, '94', cx, cy + r * .45 + 80, 44, '#14161B', 900);
      if (l > 3.0) { const a = clamp((l - 3.0) / .6); cc.save(); cc.globalAlpha = a; person(cc, 'kurier', cx + 40, cy + 720, 2.6, { t: lt, mouth: 'grin', look: 0, still: true }); cc.restore(); }
    });
    night(c, l > 4.2 ? .78 : .8, [{ x: 540, y: 900, r: 420, a: .8 }]);
    if (l > 4.2 && l < 4.45) { c.fillStyle = 'rgba(255,255,255,.55)'; c.fillRect(0, 0, W, H); }
    if (l > 6.4) { c.fillStyle = `rgba(0,0,0,${clamp((l - 6.4) / 1.2) * .88})`; c.fillRect(0, 0, W, H); }
  },
  post(c, lt) { const l = lt - 6.4; if (l > 0.8 && l < 3.0) label(c, 'PUK. PUK. PUK.', 540, 300, 'dark', 48, l - .8, 3.0 - l); },
});
