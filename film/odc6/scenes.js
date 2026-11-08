// BLOK 94 · „KTO TAM?” CZĘŚĆ 5 — „nowy sąsiad” z 104, ściana ze zdjęciami, następny cel: Zdzisiek.
window.EP = {
  badge: 'BLOK 94 · ODC. 6',
  loop: true,
  vignette: .72,
  cues(add) {
    add(0.3, 'stab'); add(6.4, 'knock');
    add(11.4, 'knock'); add(24.2, 'error'); add(35.2, 'error');
    add(42.4, 'boom'); add(46.0, 'boom');
    add(61.0, 'boom'); add(64.6, 'doorlock'); add(68.0, 'boom');
    add(78.6, 'hit'); add(84.4, 'knock');
  },
};
const S = [];
function scene(o) { S.push(o); return o; }
function talking(sc, who, lt) {
  return (sc.bubbles || []).some(b => b[7] === who && lt >= b[0] && lt < b[0] + Math.min(b[1] - b[0] - .2, .055 * b[2].length + .3));
}
function bigSign(c, lt, l1, l2, y = 390) {
  const sp = prog(lt, 0.15, 0.4), shake = lt < 1 ? (1 - lt) * 9 : 0; if (sp <= 0) return;
  c.save(); c.translate(540 + Math.sin(lt * 70) * shake, y); const s = back(sp); c.scale(s, s); c.rotate(-0.02);
  c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 30; c.shadowOffsetY = 10;
  fillRR(c, -460, -120, 920, 240, 24, '#D7263D'); c.shadowColor = 'transparent';
  c.strokeStyle = 'rgba(255,255,255,.35)'; c.lineWidth = 4; rr(c, -446, -106, 892, 212, 16); c.stroke();
  txt(c, l1, 0, -44, 90, '#FFFFFF', 900); txt(c, l2, 0, 54, 90, '#FFFFFF', 900);
  c.restore();
}
// otwarte drzwi 94 widziane od środka (dzień)
function openDoorHall(c, lt, gap) {
  hallBg(c, lt, gap > 2 ? { gap } : {});
}
// zdjęcie przypięte do ściany
function photo(c, x, y, w, h, rot, door, note, red) {
  c.save(); c.translate(x, y); c.rotate(rot);
  c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 16; fillRR(c, -w / 2, -h / 2, w, h, 3, '#F2EEE4'); c.shadowColor = 'transparent';
  c.save(); c.beginPath(); c.rect(-w / 2 + 10, -h / 2 + 10, w - 20, h - 60); c.clip();
  c.fillStyle = '#8F8C80'; c.fillRect(-w / 2, -h / 2, w, h);
  paddedDoor(c, -w * .22, -h / 2 + 26, w * .44, h - 80, door);
  c.restore();
  txt(c, note, 0, h / 2 - 26, 22, red ? '#C21E2E' : '#222', 800);
  circ(c, 0, -h / 2 + 6, 9, red ? '#D7263D' : '#3B6FE0');
  c.restore();
}

// 0. HAK
scene({
  name: 'hook', start: 0, end: 6,
  cam: lt => ({ z: 1.03 + lt * 0.01 }),
  draw(c, lt) {
    openDoorHall(c, lt, 150);
    person(c, 'sasiad', 520, 1500, 2.1, { t: lt, mouth: 'smile', look: 1, aR: .4 });
    person(c, 'kuba', 900, 1500, 2.1, { t: lt, look: -1, talk: lt > 1 && lt < 4 });
    night(c, .35, [{ x: 640, y: 900, r: 700, a: .7 }]);
    bigSign(c, lt, 'NIE MÓW, KIEDY', 'JESTEŚ SAM!');
  },
});
// 1. PRZYPOMNIENIE — pukanie z sufitu
scene({
  name: 'recap', start: 6, end: 11,
  labels: [[0.2, 5, 'ODC. 6', 540, 1650, 'yellow', 48], [0.6, 4, 'PUK. PUK. PUK.', 540, 420, 'dark', 48]],
  draw(c, lt) {
    ROOM(c); c.fillStyle = '#1D2130'; c.fillRect(0, 0, W, 260);
    person(c, 'ola', 450, 1300, 1.9, { t: lt, lookY: -1, wide: true, mouth: 'o' });
    fillRR(c, 80, 1250, 760, 200, 30, '#4A5A8A');
    night(c, .82, [{ x: 780, y: 560, r: 260, a: .5 }, { x: 450, y: 900, r: 300, a: .5 }]);
  },
});
// 2. DZIEŃ — „nowy sąsiad”
scene({
  name: 'day', start: 11, end: 20,
  labels: [[0.3, 4, 'NASTĘPNY DZIEŃ · 16:20', 540, 300, 'dark', 40]],
  bubbles: [[3.6, 8.6, 'Cześć! Jestem nowy, z 104.\nPożyczycie śrubokręt?', 520, 860, 500, 1000, 'sasiad']],
  draw(c, lt, sc) {
    const gap = mv(lt, 2.4, 3.2, 0, 150);
    openDoorHall(c, lt, gap);
    if (gap > 100) person(c, 'sasiad', 520, 1500, 2.1, { t: lt, mouth: 'smile', look: 1, talk: talking(sc, 'sasiad', lt), alpha: clamp((gap - 100) / 50) });
    person(c, 'kuba', mv(lt, 0.4, 2.2, 1100, 900), 1500, 2.1, { t: lt, look: -1, walk: lt > .4 && lt < 2.2 ? lt * 5 : null, aL: lt > 2 && lt < 3 ? 1.5 : .14 });
    night(c, .3, [{ x: 640, y: 900, r: 700, a: .7 }]);
  },
});
// 3. ROZMOWA — błąd 1
scene({
  name: 'talk', start: 20, end: 30,
  bubbles: [[0.5, 4.0, 'Jasne! Rodzice i tak pracują\nna noce, od poniedziałku do czwartku.', 560, 860, 860, 1000, 'kuba'], [4.6, 7.8, 'Na noce? Super.\nTo cicho tu u was.', 480, 860, 500, 1000, 'sasiad']],
  draw(c, lt, sc) {
    openDoorHall(c, lt, 150);
    person(c, 'sasiad', 520, 1500, 2.1, { t: lt, mouth: 'smile', look: 1, talk: talking(sc, 'sasiad', lt) });
    person(c, 'kuba', 900, 1500, 2.1, { t: lt, look: -1, talk: talking(sc, 'kuba', lt) });
    night(c, .3, [{ x: 640, y: 900, r: 700, a: .7 }]);
  },
  post(c, lt) { if (lt > 4.2) card(c, 70, 330, 860, 'BŁĄD 1', 'zdradził obcemu, kiedy w domu\nnie ma dorosłych', lt - 4.2, '#F39C12', 44); },
});
// 4. W ŚRODKU — błąd 2
scene({
  name: 'inside', start: 30, end: 40,
  labels: [[2.6, 9, 'ROZGLĄDA SIĘ', 540, 300, 'red', 44]],
  draw(c, lt) {
    hallBg(c, lt);
    const sx = mv(lt, 0.3, 2.0, 500, 760);
    const look = lt < 3 ? 1 : lt < 5 ? -1 : lt < 7 ? 1 : -1;
    person(c, 'sasiad', sx, 1500, 2.1, { t: lt, mouth: 'smile', look, walk: lt > .3 && lt < 2 ? lt * 5 : null });
    person(c, 'kuba', mv(lt, 1.0, 2.6, 900, 1180), 1500, 2.1, { t: lt, look: 1, walk: lt > 1 && lt < 2.6 ? lt * 5 : null });
    // „skan” wzroku: zamki, wieszak z kluczami, okno
    const tags = [[3.0, 560, 930, 'ZAMKI'], [4.6, 930, 620, 'KLUCZE'], [6.2, 390, 520, 'DRZWI']];
    for (const [t0, x, y, s] of tags) if (lt > t0) { const a = clamp((lt - t0) / .3); c.save(); c.globalAlpha = a; c.strokeStyle = '#D7263D'; c.lineWidth = 6; c.beginPath(); c.arc(x, y, 60, 0, 7); c.stroke(); c.restore(); label(c, s, x, y - 90, 'red', 30, lt - t0, 9); }
    night(c, .3, [{ x: 640, y: 900, r: 700, a: .7 }]);
  },
  post(c, lt) { if (lt > 2.0 && lt < 5.6) card(c, 70, 1450, 860, 'BŁĄD 2', 'wpuścił obcego do mieszkania', lt - 2.0, '#F39C12', 44); },
});
// 5. „DOBRANOC, SĄSIADKO” — kaptur
scene({
  name: 'leave', start: 40, end: 48,
  labels: [[2.4, 8, 'TEN GŁOS', 540, 300, 'red', 56]],
  bubbles: [[0.6, 3.0, 'Dzięki. Dobranoc, sąsiadko.', 480, 860, 500, 1000, 'sasiad']],
  draw(c, lt, sc) {
    openDoorHall(c, lt, lt < 3.2 ? 150 : mv(lt, 3.2, 3.5, 150, 0));
    const hood = lt > 5.0;
    if (lt < 3.3) person(c, 'sasiad', 520, 1500, 2.1, { t: lt, mouth: 'smile', look: 1, talk: talking(sc, 'sasiad', lt) });
    person(c, 'ola', 900, 1500, 2.15, { t: lt, phone: 1, aR: .9, look: -1, wide: lt > 1.2, mouth: lt > 1.4 ? 'o' : null });
    // wizjer w rogu: on na korytarzu zakłada kaptur
    if (lt > 3.8) {
      const a = clamp((lt - 3.8) / .3);
      c.save(); c.globalAlpha = a; c.translate(270, 560);
      c.beginPath(); c.arc(0, 0, 200, 0, 7); c.save(); c.clip();
      c.fillStyle = '#A9A595'; c.fillRect(-200, -200, 400, 400); c.fillStyle = '#3E5A47'; c.fillRect(-200, 40, 400, 200);
      c.save(); c.translate(0, 330); person(c, hood ? 'kaptur' : 'sasiad', 0, 0, 1.25, { t: lt, glow: hood ? 1 : 0, mouth: 'smile', back: false }); c.restore();
      c.restore(); c.strokeStyle = '#9C7B3E'; c.lineWidth = 16; c.beginPath(); c.arc(0, 0, 204, 0, 7); c.stroke(); c.restore();
      if (hood) label(c, 'KAPTUR', 270, 820, 'red', 38, lt - 5.0, 9);
    }
    night(c, .45, [{ x: 760, y: 1000, r: 600, a: .8 }, { x: 270, y: 560, r: 260, a: .8 }]);
  },
});
// 6. OLA MÓWI DOROSŁYM — zasada
scene({
  name: 'tell', start: 48, end: 56,
  labels: [[0.4, 8, 'TYM RAZEM OLA NIE CZEKA', 540, 300, 'dark', 40]],
  draw(c, lt) {
    hallBg(c, lt);
    person(c, 'ola', 760, 1500, 2.1, { t: lt, phone: 2, aR: 2.5, look: -1, talk: lt > .6 && lt < 4 && Math.sin(lt * 3) > -0.3 });
    person(c, 'kuba', 360, 1500, 2.1, { t: lt, look: 1, mouth: 'o', wide: true });
    night(c, .45, [{ x: 640, y: 900, r: 700, a: .75 }]);
  },
  post(c, lt) { if (lt > 3.0) card(c, 70, 1360, 860, 'ZASADA', 'Nowy sąsiad? Bądź miły przez drzwi. Nie mów,\nkiedy jesteś sam, i nie wpuszczaj do środka.', lt - 3.0, '#F39C12', 38); },
});
// 7. ZDZISIEK — 104 jest puste
scene({
  name: 'zdz', start: 56, end: 64,
  bubbles: [[0.6, 4.6, 'Sto cztery? Tam nikt nie mieszka\nod pół roku! Właściciel jest w Norwegii.', 540, 830, 760, 1010, 'zdzisiek']],
  draw(c, lt, sc) {
    lobbyBg(c, lt, { floor: '9' });
    person(c, 'zdzisiek', 760, 1500, 2.05, { t: lt, net: true, talk: talking(sc, 'zdzisiek', lt), squint: lt > 4.8 });
    person(c, 'ola', 330, 1500, 2.0, { t: lt, phone: 1, aR: .9, look: 1, wide: true });
    if (lt > 5) label(c, 'MIESZKANIE 104: PUSTE', 540, 300, 'red', 44, lt - 5, 9);
    night(c, .35, [{ x: 540, y: 300, r: 900, a: .8 }]);
  },
});
// 8. MIESZKANIE 104 — ściana ze zdjęciami
scene({
  name: 'wall', start: 64, end: 76,
  cam: lt => ({ z: 1.0 + lt * 0.02, y: -lt * 6 }),
  labels: [[0.4, 4, 'MIESZKANIE 104', 540, 280, 'dark', 44]],
  draw(c, lt) {
    c.fillStyle = '#6B6A60'; c.fillRect(0, 0, W, H);
    for (let i = 0; i < 18; i++) { c.fillStyle = 'rgba(0,0,0,.06)'; c.fillRect(i * 64, 0, 24, H); }
    c.fillStyle = '#2B2520'; c.fillRect(0, 1500, W, 420);
    const P = [[260, 560, -.06, '94', 'noce pon–czw', true], [560, 520, .04, '71', 'wyjechała', false], [840, 590, -.03, '31', 'babcia sama', false], [300, 930, .05, '81', 'urlop do 15.11', false], [600, 960, -.04, '92', 'pies, uwaga', false], [870, 940, .06, '103', 'pusto w weekend', false]];
    P.forEach((p, i) => { if (lt > 0.6 + i * .35) photo(c, p[0], p[1], 240, 300, p[2], p[3], p[4], p[5]); });
    // nitki
    if (lt > 3) { c.strokeStyle = 'rgba(215,38,61,.8)'; c.lineWidth = 3; c.beginPath(); c.moveTo(260, 420); c.lineTo(560, 380); c.lineTo(840, 450); c.moveTo(300, 790); c.lineTo(600, 820); c.lineTo(870, 800); c.stroke(); }
    night(c, .55, [{ x: 560, y: 760, r: 520, a: .95, tint: 'rgba(255,240,200,.06)' }]);
  },
});
// 9. OSTATNIE ZDJĘCIE — 22 · SAM
scene({
  name: 'end', start: 76, end: 86,
  cam: lt => ({ z: 1.0 + lt * 0.03 }),
  labels: [[8.2, 10, 'ODC. 7 ↓', 540, 1650, 'red', 56]],
  draw(c, lt) {
    if (lt < 5.6) {
      c.fillStyle = '#6B6A60'; c.fillRect(0, 0, W, H);
      photo(c, 540, 860, 560, 700, -.03, '22', 'SAM · DZIŚ 21:40', true);
      night(c, .5, [{ x: 540, y: 860, r: 600, a: .95 }]);
    } else {
      c.fillStyle = '#2D2A33'; c.fillRect(0, 0, W, H); c.fillStyle = '#211B16'; c.fillRect(0, 1420, W, 500);
      c.save(); if (lt > 7 && lt < 7.8) c.translate(Math.sin(lt * 90) * 8, 0); paddedDoor(c, 300, 560, 480, 860, '22'); c.restore();
      night(c, .7, [{ x: 540, y: 1425, r: 420, a: .9 }, { x: 540, y: 900, r: 420, a: .55 }]);
      if (lt > 7.0) label(c, 'PUK. PUK. PUK.', 540, 400, 'red', 54, lt - 7.0, 9);
    }
  },
});
