// BLOK 94 · SPECJAL 11.11 — „Nie otwieraj zbiórce!” Fałszywa zbiórka, lista z godzinami, 22:58 i kartka pod drzwiami.
window.EP = {
  badge: 'BLOK 94 · 11.11',
  loop: false,
  vignette: .8,
  cues(add) {
    add(0.2, 'stab'); add(10.6, 'notif'); add(16.3, 'ring'); add(20.2, 'whoosh');
    add(26.3, 'unlock'); add(28.0, 'error'); add(34.4, 'error');
    add(38.2, 'paper'); add(44.4, 'door'); add(50.4, 'stab'); add(56.4, 'whoosh'); add(60.4, 'hit');
    add(68.4, 'knock'); add(71.4, 'paper'); add(76.6, 'hit'); add(79.0, 'stab');
  },
};
const S = [];
function scene(o) { S.push(o); return o; }
function talking(sc, who, lt) { return (sc.bubbles || []).some(b => b[7] === who && lt >= b[0] && lt < b[0] + Math.min(b[1] - b[0] - .2, .055 * b[2].length + .3)); }
function bigSign(c, lt, l1, l2, y = 390) {
  const sp = prog(lt, 0.15, 0.4), shake = lt < 1 ? (1 - lt) * 9 : 0; if (sp <= 0) return;
  c.save(); c.translate(540 + Math.sin(lt * 70) * shake, y); const s = back(sp); c.scale(s, s); c.rotate(-0.02);
  c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 30; c.shadowOffsetY = 10;
  fillRR(c, -470, -120, 940, 240, 24, '#D7263D'); c.shadowColor = 'transparent';
  c.strokeStyle = 'rgba(255,255,255,.35)'; c.lineWidth = 4; rr(c, -456, -106, 912, 212, 16); c.stroke();
  txt(c, l1, 0, -44, 84, '#FFFFFF', 900); txt(c, l2, 0, 54, 84, '#FFFFFF', 900);
  c.restore();
}
// mała flaga w oknie
function flagSmall(c, x, y, s = 1, lt = 0) {
  c.save(); c.translate(x, y); c.scale(s, s);
  c.strokeStyle = '#C9CDD2'; c.lineWidth = 4; c.beginPath(); c.moveTo(0, 0); c.lineTo(34, -46); c.stroke();
  const wv = Math.sin(lt * 4 + x) * 4;
  c.beginPath(); c.moveTo(34, -46); c.quadraticCurveTo(58, -50 + wv, 82, -46); c.lineTo(82, -26); c.quadraticCurveTo(58, -30 + wv, 34, -26); c.closePath(); c.fillStyle = '#F4F1EA'; c.fill();
  c.beginPath(); c.moveTo(34, -26); c.quadraticCurveTo(58, -30 + wv, 82, -26); c.lineTo(82, -6); c.quadraticCurveTo(58, -10 + wv, 34, -6); c.closePath(); c.fillStyle = '#D7263D'; c.fill();
  c.restore();
}
function blockFlags(c, lt) {
  const bx = 110, by = 400, cw = 860 / 8, rh = (1100 - 120) / 11;
  for (const [r, q] of [[1, 5], [2, 1], [3, 6], [4, 3], [5, 0], [6, 5], [7, 2], [8, 7], [9, 4]]) flagSmall(c, bx + q * cw + 22, by + 40 + r * rh + rh - 30, .85, lt);
}
// zbierający: postać + biało-czerwona opaska + puszka
function collector(c, kind, x, y, s, o = {}) {
  person(c, kind, x, y, s, o);
  const aR = o.aR ?? 0.14, side = o.flip ? -1 : 1;
  // opaska na lewym ramieniu
  c.save(); c.translate(x - 44 * s, y - 150 * s); c.rotate(.1);
  fillRR(c, -15 * s, -10 * s, 30 * s, 10 * s, 2, '#F4F1EA'); fillRR(c, -15 * s, 0, 30 * s, 10 * s, 2, '#D7263D'); c.restore();
  if (o.can) { // puszka w prawej ręce
    const hx = x + side * s * (40 + Math.sin(aR) * 94), hy = y + s * (-178 + Math.cos(aR) * 94);
    c.save(); c.translate(hx, hy - 10 * s);
    fillRR(c, -20 * s, -34 * s, 40 * s, 62 * s, 6 * s, '#C9CDD2'); fillRR(c, -20 * s, -14 * s, 40 * s, 12 * s, 2, '#D7263D'); fillRR(c, -10 * s, -38 * s, 20 * s, 6 * s, 2, '#55575F');
    c.restore();
  }
}
// kartka z listą: rows = [[mieszkanie, tekst, kolor?]]
function listPaper(c, x, y, w, rows, lt, o = {}) {
  c.save(); c.translate(x, y); c.rotate(o.rot || 0);
  if (o.board) { fillRR(c, -30, -60, w + 60, 1060, 20, '#7A5634'); fillRR(c, w / 2 - 90, -80, 180, 60, 12, '#B9BDC2'); }
  fillRR(c, 0, 0, w, 960, 6, '#F3EFE3');
  c.strokeStyle = 'rgba(80,110,160,.35)'; c.lineWidth = 2; for (let i = 0; i < 12; i++) { c.beginPath(); c.moveTo(20, 150 + i * 70); c.lineTo(w - 20, 150 + i * 70); c.stroke(); }
  txt(c, o.title || 'ZBIÓRKA – ZNICZE DLA KOMBATANTÓW', w / 2, 70, 30, '#2A2D36', 900);
  rows.forEach((r, i) => {
    const show = r[3] == null ? 1 : clamp((lt - r[3]) / .8);
    if (show <= 0) return;
    c.save(); c.beginPath(); c.rect(0, 100 + i * 70, 50 + (w - 50) * show, 70); c.clip();
    c.save(); c.translate(40, 140 + i * 70); c.transform(1, 0, -0.18, 1, 0, 0);
    txt(c, r[0], 0, 0, 38, r[2] || '#1F3A7A', 700, 'left'); txt(c, r[1], 110, 0, 38, r[2] || '#1F3A7A', 700, 'left');
    c.restore(); c.restore();
  });
  if (o.circles) for (const i of o.circles) { const a = clamp((lt - o.circlesAt) / .5); if (a > 0) { c.save(); c.globalAlpha = a; c.strokeStyle = '#D7263D'; c.lineWidth = 6; c.beginPath(); c.ellipse(w - 140, 140 + i * 70, 110, 40, 0, 0, 6.28 * a); c.stroke(); c.restore(); } }
  c.restore();
}
const ROWS = [['12', 'sama – do 22:00'], ['31', 'babcia sama'], ['47', 'wracają po 24:00'], ['71', 'wyjechała'], ['88', 'sam – do 23:30']];

// 0. HAK: w wizjerze dwie osoby z puszką
scene({
  name: 'hook', start: 0, end: 6,
  cam: lt => ({ z: 1.04 + lt * 0.015 }),
  draw(c, lt) {
    peepPOV(c, lt, (cc, cx, cy, r) => {
      cc.fillStyle = '#9C988A'; cc.fillRect(cx - r, cy - r, 2 * r, 2 * r);
      collector(cc, 'kobieta', cx - 130, cy + 700, 2.3, { t: lt, mouth: 'smile' });
      collector(cc, 'sasiad', cx + 140, cy + 720, 2.5, { t: lt, mouth: 'smile', can: true, aR: .9 });
    });
    bigSign(c, lt, 'NIE OTWIERAJ', 'ZBIÓRCE!', 1520);
  },
});
// 1. 11.11, rodzice u babci + SMS
scene({
  name: 'intro', start: 6, end: 16,
  labels: [[0.4, 4.6, '11 LISTOPADA · 20:40', 540, 300, 'orange', 46], [0.9, 4.6, 'SPECJAL · POZA SEZONEM', 540, 1760, 'yellow', 40]],
  draw(c, lt) {
    if (lt < 4.8) { blockBg(c, lt, { night: true }); blockFlags(c, lt); return; }
    c.fillStyle = '#14161E'; c.fillRect(0, 0, W, H);
    bigPhone(c, (cc, x, y, w, h) => {
      cc.fillStyle = '#0F1014'; cc.fillRect(x, y, w, h); fillRR(cc, x, y, w, 170, 0, '#17181E');
      circ(cc, x + 90, y + 110, 40, '#E07A7A'); txt(cc, 'M', x + 90, y + 112, 40, '#fff', 900);
      txt(cc, 'Mama', x + 150, y + 100, 36, '#FFFFFF', 900, 'left'); txt(cc, 'u babci', x + 150, y + 140, 24, 'rgba(255,255,255,.55)', 600, 'left');
      const a = clamp((lt - 5.4) / .4); cc.save(); cc.globalAlpha = a;
      fillRR(cc, x + 30, y + 240, w - 120, 150, 26, '#2A2C33');
      txt(cc, 'Wracamy o 23:00.', x + 60, y + 290, 34, '#fff', 700, 'left'); txt(cc, 'Nie otwierajcie nikomu ❤️', x + 60, y + 345, 34, '#fff', 700, 'left'); cc.restore();
    }, 1, 360);
  },
});
// 2. DZWONEK + WIZJER
scene({
  name: 'ring', start: 16, end: 26,
  bubbles: [[6.6, 10, 'Dobry wieczór! Zbiórka na znicze\ndla kombatantów. Wpiszecie się\nna listę?', 540, 520, 640, 640, 'sasiad']],
  draw(c, lt, sc) {
    if (lt < 4.0) {
      hallBg(c, lt);
      person(c, 'ola', mv(lt, 1.2, 3.4, 900, 760), 1500, 2.1, { t: lt, phone: 1, aR: .9, look: -1, walk: lt > 1.2 && lt < 3.4 ? lt * 5 : null });
      person(c, 'kuba', 1000, 1520, 1.9, { t: lt, look: -1 });
      night(c, .7, [{ x: 760, y: 1100, r: 420, a: .8 }, { x: 390, y: 1420, r: 260, a: .5 }]);
      if (lt > .3 && lt < 2.6) label(c, 'DING-DONG', 540, 420, 'dark', 60, lt - .3, 2.6 - lt);
      return;
    }
    peepPOV(c, lt, (cc, cx, cy, r) => {
      cc.fillStyle = '#9C988A'; cc.fillRect(cx - r, cy - r, 2 * r, 2 * r);
      collector(cc, 'kobieta', cx - 130, cy + 700, 2.3, { t: lt, mouth: 'smile' });
      collector(cc, 'sasiad', cx + 140, cy + 720, 2.5, { t: lt, mouth: 'smile', can: true, aR: .9, talk: talking(sc, 'sasiad', lt) });
    });
    if (lt > 4.6 && lt < 6.6) label(c, 'OPASKI. PUSZKA.', 540, 1440, 'red', 44, lt - 4.6, 6.6 - lt);
  },
});
// 3. OLA OTWIERA, KUBA SIĘ WPISUJE — błąd 1 i 2
scene({
  name: 'open', start: 26, end: 38,
  bubbles: [[4.6, 8.2, '94. Rodzice wracają o 23.', 820, 860, 900, 1010, 'kuba']],
  draw(c, lt, sc) {
    const gap = mv(lt, 0, .6, 0, 150);
    hallBg(c, lt, gap > 2 ? { gap, nochain: true } : {});
    if (gap > 100) {
      collector(c, 'kobieta', 380, 1480, 1.8, { t: lt, mouth: 'smile', alpha: clamp((gap - 100) / 50) });
      collector(c, 'sasiad', 560, 1500, 2.0, { t: lt, mouth: 'smile', can: true, aR: .4, alpha: clamp((gap - 100) / 50) });
    }
    person(c, 'ola', 790, 1500, 2.1, { t: lt, look: -1, aL: lt < 1 ? 1.5 : .14 });
    person(c, 'kuba', 960, 1520, 2.0, { t: lt, look: -1, aL: lt > 3.6 && lt < 8 ? 1.2 : .14, talk: talking(sc, 'kuba', lt) });
    if (lt > 3.6 && lt < 8) { c.save(); c.translate(830, 1300); c.rotate(-.2); fillRR(c, -50, -70, 100, 140, 6, '#7A5634'); fillRR(c, -42, -60, 84, 124, 3, '#F3EFE3'); c.restore(); }
    night(c, .65, [{ x: 800, y: 1100, r: 480, a: .8 }, { x: 520, y: 1100, r: 300, a: .5 }]);
  },
  post(c, lt) {
    if (lt > 1.6 && lt < 5.6) card(c, 70, 300, 860, 'BŁĄD 1', 'otworzyła obcym, bo mieli opaski i puszkę', lt - 1.6, '#F39C12', 38);
    if (lt > 8.2 && lt < 12) card(c, 70, 300, 860, 'BŁĄD 2', 'wpisał numer mieszkania i godzinę,\nkiedy wracają rodzice', lt - 8.2, '#F39C12', 38);
  },
});
// 4. LISTA Z BLISKA
scene({
  name: 'list', start: 38, end: 44,
  cam: lt => ({ z: 1.0 + lt * 0.02 }),
  draw(c, lt) {
    c.fillStyle = '#2A221A'; c.fillRect(0, 0, W, H);
    listPaper(c, 160, 420, 760, [...ROWS, ['94', 'rodzice wracają 23:00', '#1F3A7A', 1.0]], lt, { board: true, rot: -.03 });
    night(c, .35, [{ x: 540, y: 900, r: 700, a: .8 }]);
  },
});
// 5. ZDZISIEK + ZASADA
scene({
  name: 'zdz', start: 44, end: 56,
  bubbles: [[2.2, 6.0, 'Jaka zbiórka?\nNikt tu nic nie zgłaszał.', 560, 820, 700, 1000, 'zdzisiek']],
  draw(c, lt, sc) {
    hallBg(c, lt, { gap: 150, nochain: true });
    person(c, 'zdzisiek', mv(lt, 0, 1.6, 300, 520), 1500, 2.0, { t: lt, look: 1, walk: lt < 1.6 ? lt * 5 : null, mouth: 'angry', talk: talking(sc, 'zdzisiek', lt) });
    person(c, 'ola', 780, 1500, 2.1, { t: lt, look: -1, wide: lt > 3, mouth: lt > 3 ? 'o' : null });
    person(c, 'kuba', 950, 1520, 2.0, { t: lt, look: -1, wide: lt > 3, mouth: lt > 3 ? 'o' : null });
    night(c, .6, [{ x: 700, y: 1100, r: 520, a: .8 }]);
  },
  post(c, lt) { if (lt > 6.2 && lt < 12) card(c, 70, 300, 860, 'ZASADA', 'Zbiórka publiczna musi być na zbiorki.gov.pl.\nNie wpuszczaj obcych. Wesprzeć możesz online.', lt - 6.2, '#F39C12', 34); },
});
// 6. ZDJĘCIE LISTY: jeden charakter pisma, godziny samotności
scene({
  name: 'photo', start: 56, end: 66,
  draw(c, lt) {
    c.fillStyle = '#121318'; c.fillRect(0, 0, W, H);
    bigPhone(c, (cc, x, y, w, h) => {
      cc.fillStyle = '#000'; cc.fillRect(x, y, w, h);
      const z = 1 + clamp((lt - 2) / 6) * .25;
      cc.save(); cc.translate(x + w / 2, y + h / 2); cc.scale(z * .72, z * .72); cc.translate(-380, -520);
      listPaper(cc, 0, 0, 760, [...ROWS, ['94', 'rodzice wracają 23:00']], lt, { circles: [0, 1, 2, 3, 4, 5], circlesAt: 4.2 });
      cc.restore();
    }, 1, 360);
  },
  post(c, lt) {
    if (lt > 2.2 && lt < 9.6) label(c, 'JEDEN CHARAKTER PISMA', 540, 260, 'red', 46, lt - 2.2, 9.6 - lt);
    if (lt > 5.0 && lt < 9.6) label(c, 'KIEDY KTOŚ ZOSTAJE SAM', 540, 1640, 'dark', 44, lt - 5.0, 9.6 - lt);
  },
});
// 7. 22:58 — pukanie, czarny wizjer, kartka pod drzwiami
scene({
  name: 'end', start: 66, end: 80,
  cam: lt => ({ z: 1.0 + lt * 0.01 }),
  draw(c, lt) {
    if (lt < 4.2) {
      hallBg(c, lt, { feet: lt > 1.6 ? .7 : 0 });
      person(c, 'ola', 780, 1500, 2.1, { t: lt, look: -1, phone: 1, aR: .9, wide: true, mouth: 'o' });
      person(c, 'kuba', 950, 1520, 2.0, { t: lt, look: -1, wide: true, mouth: 'o' });
      night(c, .9, [{ x: 390, y: 1420, r: 280, a: .6 }, { x: 800, y: 1100, r: 300, a: .5 }]);
      if (lt > .3) label(c, '22:58', 540, 330, 'red', 70, lt - .3, 4.2 - lt);
      if (lt > 2.2) label(c, 'PUK. PUK. PUK.', 540, 470, 'dark', 50, lt - 2.2, 4.2 - lt);
      return;
    }
    if (lt < 7.0) { peepPOV(c, lt, (cc, cx, cy, r) => tapeTexture(cc, cx, cy, r)); if (lt > 4.6) label(c, 'ZAKLEJONY', 540, 1440, 'red', 46, lt - 4.6, 7 - lt); return; }
    // kartka pod drzwiami
    const l = lt - 7.0;
    c.fillStyle = '#1A1612'; c.fillRect(0, 0, W, H);
    c.fillStyle = '#FFE7A8'; c.fillRect(0, 300, W, 10); // szpara pod drzwiami
    const slide = eout(clamp(l / 1.2));
    listPaper(c, 160, lerp(-700, 380, slide), 760, [...ROWS, ['94', 'rodzice wracają 23:00'], ['94', '22:58 ✔', '#C21F33', 2.6]], l, { rot: .02 });
    night(c, .55, [{ x: 540, y: 1100, r: 600, a: .8 }]);
    if (l > 5.6) { c.save(); c.globalAlpha = clamp((l - 5.6) / 1.2) * .9; c.fillStyle = '#000'; c.fillRect(0, 0, W, H); c.restore(); }
  },
  post(c, lt) {
    if (lt > 10.2 && lt < 12.6) label(c, 'DOPISANE PRZED CHWILĄ', 540, 300, 'red', 46, lt - 10.2, 12.6 - lt);
    if (lt > 12.8) label(c, 'CIĄG DALSZY…?', 540, 960, 'yellow', 56, lt - 12.8, 9);
  },
});
