// BLOK 94 · SPECJAL 11.11 (poza sezonem) — niewypał na placu zabaw, wyrzutnia przy Oli, życzenia i Kaptur na dachu.
window.EP = {
  badge: 'BLOK 94 · 11.11',
  loop: false,
  vignette: .75,
  cues(add) {
    add(0.2, 'stab'); add(6.6, 'whoosh');
    add(30.6, 'fuse'); add(31.6, 'pop');
    add(38.1, 'fuse2'); add(38.7, 'pop3'); add(39.4, 'pop3'); add(40.1, 'pop3'); add(41.95, 'pop2');
    add(54.4, 'pop3'); add(54.6, 'stab');
  },
};
const S = [];
function scene(o) { S.push(o); return o; }
function talking(sc, who, lt) { return (sc.bubbles || []).some(b => b[7] === who && lt >= b[0] && lt < b[0] + Math.min(b[1] - b[0] - .2, .055 * b[2].length + .3)); }
function bigSign(c, lt, l1, l2, y = 390, col = '#D7263D') {
  const sp = prog(lt, 0.15, 0.4), shake = lt < 1 ? (1 - lt) * 9 : 0; if (sp <= 0) return;
  c.save(); c.translate(540 + Math.sin(lt * 70) * shake, y); const s = back(sp); c.scale(s, s); c.rotate(-0.02);
  c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 30; c.shadowOffsetY = 10;
  fillRR(c, -470, -120, 940, 240, 24, col); c.shadowColor = 'transparent';
  c.strokeStyle = 'rgba(255,255,255,.35)'; c.lineWidth = 4; rr(c, -456, -106, 912, 212, 16); c.stroke();
  txt(c, l1, 0, -44, 84, '#FFFFFF', 900); txt(c, l2, 0, 54, 84, '#FFFFFF', 900);
  c.restore();
}
// fajerwerki: [t0, x, y, kolor, promień]
function fireworks(c, lt, list) {
  for (const [t0, x, y, col, R] of list) {
    const a = lt - t0; if (a < -0.6 || a > 2.4) continue;
    if (a < 0) { // smuga wznoszenia
      const p = 1 + a / 0.6; c.save(); c.globalAlpha = .8; circ(c, x, lerp(y + 700, y, p), 5, '#FFE7B0'); c.restore(); continue;
    }
    const r = R * (1 - Math.exp(-a * 3.2)), drop = a * a * 26, al = Math.max(0, 1 - a / 2.4);
    c.save(); c.globalCompositeOperation = 'lighter';
    if (a < 0.25) { const g = c.createRadialGradient(x, y, 0, x, y, R * 1.6); g.addColorStop(0, `rgba(255,255,255,${.5 * (1 - a / .25)})`); g.addColorStop(1, 'rgba(255,255,255,0)'); c.fillStyle = g; c.fillRect(x - R * 2, y - R * 2, R * 4, R * 4); }
    c.lineCap = 'round';
    for (let i = 0; i < 60; i++) {
      const an = i / 60 * Math.PI * 2 + hash(i + t0 * 7) * .1, rr2 = r * (0.78 + hash(i * 3 + t0) * .22);
      const px = x + Math.cos(an) * rr2, py = y + Math.sin(an) * rr2 + drop;
      const qx = x + Math.cos(an) * rr2 * .72, qy = y + Math.sin(an) * rr2 * .72 + drop * .7;
      const cc = i % 2 ? col : '#FFFFFF';
      c.globalAlpha = al * .55; c.strokeStyle = cc; c.lineWidth = 5; c.beginPath(); c.moveTo(qx, qy); c.lineTo(px, py); c.stroke();
      c.globalAlpha = al * (0.7 + 0.3 * Math.sin(lt * 30 + i)); circ(c, px, py, 7 * (1 - a / 3.2), cc);
    }
    c.restore();
  }
}
// błysk nieba od fajerwerków (do oświetlenia sceny)
function skyGlow(lt, list) { let g = 0; for (const [t0] of list) { const a = lt - t0; if (a >= 0 && a < 1.2) g = Math.max(g, 1 - a / 1.2); } return g; }
// mała flaga biało-czerwona
function flag(c, x, y, s = 1, lt = 0) {
  c.save(); c.translate(x, y); c.scale(s, s);
  c.strokeStyle = '#C9CDD2'; c.lineWidth = 4; c.beginPath(); c.moveTo(0, 0); c.lineTo(34, -46); c.stroke();
  const wv = Math.sin(lt * 4 + x) * 4;
  c.beginPath(); c.moveTo(34, -46); c.quadraticCurveTo(58, -50 + wv, 82, -46); c.lineTo(82, -26); c.quadraticCurveTo(58, -30 + wv, 34, -26); c.closePath(); c.fillStyle = '#F4F1EA'; c.fill();
  c.beginPath(); c.moveTo(34, -26); c.quadraticCurveTo(58, -30 + wv, 82, -26); c.lineTo(82, -6); c.quadraticCurveTo(58, -10 + wv, 34, -6); c.closePath(); c.fillStyle = '#D7263D'; c.fill();
  c.restore();
}
// flagi w oknach bloku z blockBg (siatka 8x11)
function blockFlags(c, lt) {
  const bx = 110, by = 400, cw = 860 / 8, rh = (1100 - 120) / 11;
  for (const [r, q] of [[1, 5], [2, 1], [3, 6], [4, 3], [5, 0], [6, 5], [7, 2], [8, 7], [9, 4]]) flag(c, bx + q * cw + 22, by + 40 + r * rh + rh - 30, .85, lt);
}
// petarda: o.spark (0..1) iskry z lontu, o.smoke
function petarda(c, x, y, ang, lt, o = {}) {
  c.save(); c.translate(x, y); c.rotate(ang); const s = o.s || 1; c.scale(s, s);
  ell(c, 4, 30, 70, 12, 'rgba(0,0,0,.35)');
  fillRR(c, -60, -18, 120, 36, 10, '#C21F33'); c.fillStyle = '#F4F1EA'; c.fillRect(-20, -18, 16, 36); c.fillStyle = '#8E1424'; c.fillRect(-60, 10, 120, 8);
  fillRR(c, 56, -12, 10, 24, 4, '#8A7F6A');
  c.strokeStyle = '#3A3226'; c.lineWidth = 4; c.beginPath(); c.moveTo(66, 0); c.quadraticCurveTo(92, -6, 104, -26); c.stroke();
  if (o.spark) {
    c.save(); c.globalCompositeOperation = 'lighter';
    const g = c.createRadialGradient(104, -26, 0, 104, -26, 90 * o.spark); g.addColorStop(0, 'rgba(255,210,120,.9)'); g.addColorStop(1, 'rgba(255,150,40,0)'); c.fillStyle = g; c.fillRect(0, -130, 210, 210);
    for (let i = 0; i < 14; i++) { const an = hash(i + Math.floor(lt * 20)) * 6.28, d = 10 + hash(i * 5 + Math.floor(lt * 20)) * 50 * o.spark; circ(c, 104 + Math.cos(an) * d, -26 + Math.sin(an) * d, 3, '#FFE7A0'); }
    c.restore();
  } else if (o.ember) { c.save(); c.shadowColor = '#FF7A2A'; c.shadowBlur = 18; circ(c, 104, -26, 5, `rgba(255,120,40,${.4 + .3 * Math.sin(lt * 6)})`); c.restore(); }
  c.restore();
  if (o.smoke) for (let i = 0; i < 4; i++) { const a = (lt * .4 + i / 4) % 1; c.save(); c.globalAlpha = (1 - a) * .18 * o.smoke; circ(c, x + 40 + Math.sin(a * 6 + i) * 20, y - 40 - a * 220, 20 + a * 50, '#B8BCC8'); c.restore(); }
}
// plac zabaw pod blokiem 94, noc
function yardBg(c, lt, fw, o = {}) {
  const sky = c.createLinearGradient(0, 0, 0, 1300); sky.addColorStop(0, '#060914'); sky.addColorStop(1, '#151C30'); c.fillStyle = sky; c.fillRect(0, 0, W, 1300);
  fireworks(c, lt, fw);
  // blok w tle
  c.fillStyle = '#20283F'; c.fillRect(120, 520, 840, 760);
  for (let r = 0; r < 7; r++) for (let q = 0; q < 7; q++) { const hv = hash(r * 11 + q * 5 + 3); fillRR(c, 150 + q * 118, 560 + r * 100, 70, 58, 3, hv > .8 ? '#F2C14E' : '#141A2B'); }
  flag(c, 150 + 4 * 118 + 6, 560 + 1 * 100 + 54, .9, lt); flag(c, 150 + 1 * 118 + 6, 560 + 3 * 100 + 54, .9, lt); flag(c, 150 + 6 * 118 + 6, 560 + 5 * 100 + 54, .9, lt);
  // ziemia
  c.fillStyle = '#17150F'; c.fillRect(0, 1280, W, H - 1280);
  c.fillStyle = '#25221A'; for (let i = 0; i < 40; i++) circ(c, hash(i) * W, 1300 + hash(i + 9) * 600, 3 + hash(i + 4) * 5, '#2E2A20');
  // huśtawka
  c.strokeStyle = '#4A5068'; c.lineWidth = 12; c.beginPath(); c.moveTo(40, 1420); c.lineTo(110, 1080); c.lineTo(180, 1420); c.moveTo(110, 1080); c.lineTo(360, 1080); c.moveTo(290, 1420); c.lineTo(360, 1080); c.lineTo(430, 1420); c.stroke();
  const sw = Math.sin(lt * 1.3) * .08; c.save(); c.translate(235, 1086); c.rotate(sw); c.strokeStyle = '#6A7088'; c.lineWidth = 4; c.beginPath(); c.moveTo(-30, 0); c.lineTo(-30, 230); c.moveTo(30, 0); c.lineTo(30, 230); c.stroke(); fillRR(c, -44, 226, 88, 14, 4, '#B04A3A'); c.restore();
  // ławka
  if (!o.noBench) { fillRR(c, 820, 1380, 220, 20, 4, '#5A4632'); fillRR(c, 830, 1400, 14, 70, 3, '#3A2E22'); fillRR(c, 1016, 1400, 14, 70, 3, '#3A2E22'); fillRR(c, 820, 1330, 220, 16, 4, '#5A4632'); }
  // latarnia
  fillRR(c, 1010, 900, 14, 520, 4, '#2E3346'); fillRR(c, 980, 890, 74, 18, 6, '#3A4058');
}

const FW1 = [[0.6, 300, 260, '#E8344E', 210], [1.6, 760, 200, '#FFFFFF', 240], [2.7, 520, 330, '#E8344E', 260], [3.8, 240, 180, '#FFFFFF', 200], [4.6, 820, 300, '#E8344E', 230], [5.8, 540, 170, '#FFFFFF', 280], [6.9, 330, 290, '#E8344E', 220], [8.0, 760, 230, '#FFFFFF', 250]];

// 0. HAK: niewypał na asfalcie
scene({
  name: 'hook', start: 0, end: 6,
  cam: lt => ({ z: 1.08 + lt * 0.015 }),
  draw(c, lt) {
    c.fillStyle = '#1A1A1E'; c.fillRect(0, 0, W, H);
    for (let i = 0; i < 260; i++) circ(c, hash(i) * W, hash(i + 3) * H, 2 + hash(i + 7) * 4, hash(i + 1) > .5 ? '#232328' : '#141418');
    const fl = skyGlow(lt + 2, FW1);
    c.save(); c.globalAlpha = .03 + fl * .07; c.fillStyle = Math.floor(lt * 1.3) % 2 ? '#E8344E' : '#FFFFFF'; c.fillRect(0, 0, W, H); c.restore();
    petarda(c, 520, 1080, -0.25, lt, { s: 2.6, ember: 1, smoke: 1 });
    night(c, .75, [{ x: 600, y: 1060, r: 520, a: .8 }]);
    bigSign(c, lt, 'NIE PODNOŚ', 'NIEWYPAŁU!');
  },
});
// 1. 11 LISTOPADA: blok w biało-czerwonych fajerwerkach
scene({
  name: 'intro', start: 6, end: 15,
  labels: [[0.4, 9, '11 LISTOPADA · 21:40', 540, 300, 'orange', 46], [1.4, 9, 'SPECJAL · POZA SEZONEM', 540, 1720, 'yellow', 40]],
  draw(c, lt) {
    blockBg(c, lt, { night: true });
    blockFlags(c, lt);
    fireworks(c, lt, FW1);
    const g = skyGlow(lt, FW1);
    if (g) { c.save(); c.globalAlpha = g * .12; c.fillStyle = '#FFE9E9'; c.fillRect(0, 0, W, H); c.restore(); }
    person(c, 'kuba', 430, 1700, 1.0, { t: lt, back: true });
    person(c, 'ola', 560, 1700, 1.0, { t: lt, back: true, phone: 2, aR: 2.4 });
    person(c, 'zdzisiek', 700, 1700, 1.0, { t: lt, back: true });
  },
});
const FW2 = [[0.2, 260, 230, '#E8344E', 190], [2.2, 820, 180, '#FFFFFF', 210], [4.4, 480, 260, '#E8344E', 220], [6.6, 760, 300, '#FFFFFF', 200], [8.8, 300, 200, '#E8344E', 220], [11, 700, 220, '#FFFFFF', 220]];
// 2. NIEWYPAŁ NA PLACU ZABAW — błąd 1
scene({
  name: 'find', start: 15, end: 27,
  labels: [[0.6, 4.2, 'NIE WYBUCHŁA', 470, 1290, 'dark', 40]],
  bubbles: [[3.4, 6.6, 'Niewypał!\nBiorę na pamiątkę.', 640, 900, 690, 1060, 'kuba']],
  draw(c, lt, sc) {
    yardBg(c, lt, FW2);
    petarda(c, 470, 1460, 0.1, lt, { s: 1.1, ember: 1 });
    const kx = mv(lt, 0.2, 2.6, 1100, 640);
    const reach = lt > 5.0 ? mv(lt, 5.0, 6.2, .14, .95) : .14;
    person(c, 'kuba', kx, 1500, 2.1, { t: lt, look: -1, walk: lt > .2 && lt < 2.6 ? lt * 5 : null, aL: reach, squash: lt > 5 ? mv(lt, 5, 6.2, 1, .9) : 1, talk: talking(sc, 'kuba', lt), mouth: lt < 6 ? 'smile' : null });
    const g = skyGlow(lt, FW2);
    night(c, .78 - g * .12, [{ x: 1017, y: 900, r: 360, a: .7 }, { x: 470, y: 1440, r: 200, a: .45 }, { x: kx, y: 1150, r: 330, a: .6 }]);
  },
  post(c, lt) { if (lt > 6.6 && lt < 11.6) card(c, 70, 1520, 860, 'BŁĄD 1', 'chciał podnieść niewypał\n— może wybuchnąć w każdej chwili', lt - 6.6, '#F39C12', 40); },
});
// 3. ZDZISIEK + WYBUCH + ZASADA
scene({
  name: 'zdz', start: 27, end: 38,
  cam: lt => { const sh = lt > 4.6 && lt < 5.3 ? (5.3 - lt) * 40 : 0; return { z: 1.0, x: Math.sin(lt * 90) * sh, y: Math.cos(lt * 70) * sh }; },
  bubbles: [[0.3, 3.0, 'Kuba, zostaw to!', 330, 880, 230, 1040, 'zdzisiek']],
  draw(c, lt, sc) {
    yardBg(c, lt, FW2.map(f => [f[0] + 9, f[1], f[2], f[3], f[4]]));
    const boom = lt >= 4.6;
    if (!boom) petarda(c, 470, 1460, 0.1, lt, { s: 1.1, ember: lt < 3.6 ? 1 : 0, spark: lt > 3.6 ? clamp((lt - 3.6) / .6) : 0 });
    else { // czarny ślad + dym
      ell(c, 470, 1470, 110, 26, '#0A0907');
      for (let i = 0; i < 7; i++) { const a = clamp((lt - 4.6) / 4); c.save(); c.globalAlpha = (1 - a) * .5; circ(c, 470 + (hash(i) - .5) * 220 * (a + .3), 1430 - a * 360 - hash(i + 2) * 120, 60 + a * 140, '#9EA3B0'); c.restore(); }
    }
    const kx = lt < 1.0 ? 640 : mv(lt, 1.0, 1.8, 640, 880);
    person(c, 'kuba', kx, 1500, 2.1, { t: lt, look: -1, wide: true, mouth: 'o', walk: lt > 1 && lt < 1.8 ? lt * 9 : null, aL: lt > 4.6 && lt < 6 ? 2.4 : .14, aR: lt > 4.6 && lt < 6 ? 2.4 : .14 });
    const zx = mv(lt, 0, .8, -120, 200);
    person(c, 'zdzisiek', zx, 1500, 2.0, { t: lt, look: 1, aR: lt < 3 ? 1.6 : .14, talk: talking(sc, 'zdzisiek', lt), mouth: lt < 3 ? 'angry' : 'o' });
    night(c, .8, [{ x: 1017, y: 900, r: 360, a: .7 }, { x: 470, y: 1440, r: boom ? 0 : 140 + (lt > 3.6 ? 200 : 0), a: .8 }, { x: kx, y: 1150, r: 300, a: .5 }, { x: zx, y: 1150, r: 300, a: .5 }]);
  },
  post(c, lt) {
    if (lt > 4.6 && lt < 5.4) { c.save(); c.globalAlpha = 1 - (lt - 4.6) / .8; c.fillStyle = '#FFF4DE'; c.fillRect(0, 0, W, H); c.restore(); }
    if (lt > 4.9 && lt < 6.4) label(c, 'BUM.', 540, 820, 'red', 90, lt - 4.9, 6.4 - lt);
    if (lt > 6.0 && lt < 11) card(c, 70, 1490, 860, 'ZASADA', 'Niewypał? Nie dotykaj.\nOdczekaj min. 15 minut i zalej wodą.', lt - 6.0, '#F39C12', 40);
  },
});
// 4. OLA PRZY WYRZUTNI — błąd 2
scene({
  name: 'battery', start: 38, end: 48,
  cam: lt => { const sh = lt > 3.3 && lt < 3.9 ? (3.9 - lt) * 30 : 0; return { z: 1.0, x: Math.sin(lt * 80) * sh }; },
  draw(c, lt) {
    yardBg(c, lt, [[1.2, 520, 260, '#E8344E', 200], [1.9, 640, 220, '#FFFFFF', 180], [2.6, 420, 240, '#E8344E', 190]], { noBench: true });
    // wyrzutnia (bateria) na ziemi
    const tilt = lt > 3.3 ? -mv(lt, 3.3, 3.6, 0, .55) : 0;
    c.save(); c.translate(420, 1480); c.rotate(tilt);
    fillRR(c, -80, -110, 160, 110, 6, '#B0302A'); c.fillStyle = '#F4F1EA'; c.fillRect(-80, -80, 160, 26);
    for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) circ(c, -48 + i * 48, -96 + j * 8, 10, '#3A1410');
    c.restore();
    // strzały: najpierw w górę, potem jeden w bok — w stronę Oli
    for (const [t0, dx] of [[.6, 0], [1.3, 20], [2.0, -10]]) { const a = lt - t0; if (a > 0 && a < .6) { c.save(); c.globalCompositeOperation = 'lighter'; circ(c, 420 + dx * a, 1370 - a * 1800, 7, '#FFE7B0'); c.restore(); } }
    if (lt > 3.4 && lt < 4.0) { const a = (lt - 3.4) / .6; c.save(); c.globalCompositeOperation = 'lighter'; circ(c, lerp(380, 840, a), 1360 - Math.sin(a * 3.14) * 120, 12, '#FFD58A'); c.restore(); }
    if (lt > 3.95 && lt < 5) { const a = (lt - 3.95); c.save(); c.globalCompositeOperation = 'lighter'; for (let i = 0; i < 30; i++) { const an = i / 30 * 6.28; circ(c, 860 + Math.cos(an) * a * 260, 1330 + Math.sin(an) * a * 260 + a * a * 80, 5, i % 2 ? '#E8344E' : '#FFF'); } c.restore(); }
    // lont palący się
    if (lt < .6) { c.save(); c.globalCompositeOperation = 'lighter'; circ(c, 500, 1470, 10 + Math.sin(lt * 40) * 3, '#FFB060'); c.restore(); }
    const ox = lt < 3.9 ? 640 : mv(lt, 3.9, 4.5, 640, 960);
    person(c, 'ola', ox, 1500, 2.1, { t: lt, look: -1, phone: 2, aR: lt < 3.9 ? 2.2 : 1.0, aL: lt > 3.9 && lt < 5 ? 2.4 : .14, wide: lt > 3.4, mouth: lt > 3.4 ? 'o' : 'smile', walk: lt > 3.9 && lt < 4.5 ? lt * 10 : null });
    const g = lt > 3.95 && lt < 4.6 ? 1 - (lt - 3.95) / .65 : 0;
    night(c, .8 - g * .3, [{ x: 420, y: 1420, r: 260 + (lt < 2.6 ? 120 : 0), a: .8 }, { x: ox, y: 1150, r: 320, a: .6 }, { x: 1017, y: 900, r: 300, a: .6 }]);
  },
  post(c, lt) {
    if (lt > 0.3 && lt < 3.2) label(c, 'NAGRYWA Z BLISKA', 540, 300, 'dark', 42, lt - .3, 3.2 - lt);
    if (lt > 4.8 && lt < 9.8) card(c, 70, 1520, 860, 'BŁĄD 2', 'stała tuż przy odpalonej wyrzutni\n— może się przewrócić i strzelić w bok', lt - 4.8, '#F39C12', 38);
  },
});
const FW3 = [[0.3, 300, 240, '#E8344E', 230], [1.5, 780, 200, '#FFFFFF', 250], [2.8, 540, 300, '#E8344E', 260], [4.1, 260, 190, '#FFFFFF', 220], [5.2, 820, 280, '#E8344E', 230], [6.4, 540, 150, '#FFFFFF', 340], [8.2, 330, 260, '#E8344E', 220], [9.2, 760, 210, '#FFFFFF', 240]];
// 5. ŻYCZENIA + KAPTUR NA DACHU
scene({
  name: 'end', start: 48, end: 60,
  cam: lt => ({ z: 1.0 + lt * 0.006 }),
  draw(c, lt) {
    blockBg(c, lt, { night: true });
    blockFlags(c, lt);
    fireworks(c, lt, FW3);
    const g = skyGlow(lt, FW3);
    if (g) { c.save(); c.globalAlpha = g * .14; c.fillStyle = '#FFE9E9'; c.fillRect(0, 0, W, H); c.restore(); }
    // Kaptur na dachu — widoczny tylko w błysku
    const k = lt > 6.3 ? clamp((lt - 6.3) / .3) * (lt < 10.5 ? 1 : clamp((11 - lt) / .5)) : 0;
    if (k > 0) { c.save(); c.globalAlpha = k; const hg = c.createRadialGradient(820, 300, 10, 820, 300, 260); hg.addColorStop(0, 'rgba(255,240,230,.55)'); hg.addColorStop(1, 'rgba(255,240,230,0)'); c.fillStyle = hg; c.fillRect(520, 0, 600, 600); person(c, 'kaptur', 820, 404, .85, { t: lt, glow: 1 }); c.restore(); }
    person(c, 'kuba', 430, 1700, 1.0, { t: lt, back: true });
    person(c, 'ola', 560, 1700, 1.0, { t: lt, back: true, phone: 2, aR: 2.4 });
    person(c, 'zdzisiek', 700, 1700, 1.0, { t: lt, back: true });
    if (lt > 10.6) { c.save(); c.globalAlpha = clamp((lt - 10.6) / 1.2) * .85; c.fillStyle = '#000'; c.fillRect(0, 0, W, H); c.restore(); }
  },
  post(c, lt) {
    if (lt > 0.3 && lt < 6.2) { const a = Math.min(1, lt - .3, 6.2 - lt) ; c.save(); c.globalAlpha = clamp(a * 3); bigSign(c, lt - .3, 'WSZYSTKIEGO', 'DOBREGO 11.11!', 1250); c.restore(); }
    if (lt > 6.6 && lt < 10.8) label(c, 'NA DACHU?', 820, 520, 'red', 44, lt - 6.6, 10.8 - lt);
    if (lt > 10.9) label(c, 'BLOK 94 · WRACAMY Z ODC. 5', 540, 960, 'yellow', 46, lt - 10.9, 9);
  },
});
