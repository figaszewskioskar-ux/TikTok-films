// BLOK 94 · ODC. 1 — "NIE OTWIERAJ KURIEROWI!"
window.EP = {
  badge: 'BLOK 94 · ODC. 1',
  errors: [19.0, 40.5, 59.75],          // momenty błędów (stara oś czasu)
  counter: { from: 2.0, to: 102 },      // licznik BŁĘDY X/3
  loop: true,
  cues(add) {
    add(0.0, 'motif'); add(0.12, 'stab'); add(0.85, 'press'); add(1.0, 'doorbuzz'); add(2.0, 'tik');
    add(11.3, 'intercom'); add(19.0, 'press'); add(19.05, 'doorbuzz');
    add(21.7, 'ding'); add(36.1, 'lock');
    for (let k = 0; k < 9; k++) add(28.0 + k * 0.33, 'step');
    for (let k = 0; k < 10; k++) add(52 + k * 0.2, 'step', { soft: 1 });
    add(75.0, 'thud');
    for (let k = 0; k < 5; k++) add(80.2 + k * 1.0, 'vibrate');
    let hb = 78; let gap = 0.85; while (hb < 87.5) { add(hb, 'heart'); hb += gap; gap = Math.max(0.42, gap * 0.95); }
    add(88.0, 'hit'); add(93.0, 'whoosh'); add(99.2, 'pluck');
    for (const a of [0.4, 3.2, 5.35, 8.25]) add(102 + a, 'tik');
    add(113.2, 'stab'); add(116.5, 'tik');
    add(120.6, 'switch'); add(121.6, 'whoosh'); add(122.1, 'motif');
  },
};
// ---------- sceny ----------
// labels: [a,b,tekst,x,y,styl,rozmiar]  bubbles: [a,b,tekst,cx,dolY,ogonX,ogonY,kto]
const S = [];
function scene(o) { S.push(o); return o; }
function talking(sc, who, lt) {
  return (sc.bubbles || []).some(b => b[7] === who && lt >= b[0] && lt < b[0] + Math.min(b[1] - b[0] - .2, .055 * b[2].length + .3));
}

// 0. HAK
scene({
  name: 'hook', start: 0, end: 5,
  cam: lt => ({ z: 1 + lt * 0.012 }),
  draw(c, lt, sc) {
    quilted(c, 0, 0, W, H, '#5E4029', '#4D3420', '#B8914E', 90);
    const g = c.createRadialGradient(540, 900, 100, 540, 900, 1000); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.55)'); c.fillStyle = g; c.fillRect(0, 0, W, H);
    const pressed = lt > 0.85;
    const [bx, by] = unifon(c, 250, 560, 580, 860, { pressed, glow: pressed ? clamp(1 - (lt - .85) * .8) + .3 : 0, feed: feedEntrance(lt + 30, { doorOpen: pressed ? prog(lt, 1.0, 1.8) : 0 }) });
    const p = eout(prog(lt, 0.05, 0.85));
    const fx = lerp(bx + 380, bx + 4, p), fy = lerp(by + 420, by + 4, p);
    hand(c, fx, fy, Math.atan2(420, 380));
    // tablica-hak
    const sp = prog(lt, 0.1, 0.35), shake = lt < 0.8 ? (1 - lt / .8) * 10 : 0;
    if (sp > 0) {
      c.save(); c.translate(540 + Math.sin(lt * 70) * shake, 380 + Math.cos(lt * 63) * shake); const s = back(sp); c.scale(s, s); c.rotate(-0.02);
      c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 30; c.shadowOffsetY = 10;
      fillRR(c, -430, -120, 860, 240, 24, '#D7263D'); c.shadowColor = 'transparent';
      c.strokeStyle = 'rgba(255,255,255,.35)'; c.lineWidth = 4; rr(c, -416, -106, 832, 212, 16); c.stroke();
      txt(c, 'NIE OTWIERAJ', 0, -44, 92, '#FFFFFF', 900); txt(c, 'KURIEROWI!', 0, 52, 92, '#FFFFFF', 900);
      c.restore();
    }
    // wyzwanie
    if (lt > 2.0) {
      const a = lt - 2.0, s = a < .3 ? back(a / .3) : 1;
      c.save(); c.translate(540, 1500); c.scale(s, s);
      c.shadowColor = 'rgba(0,0,0,.5)'; c.shadowBlur = 24;
      fillRR(c, -400, -95, 800, 190, 22, 'rgba(14,16,21,.94)'); c.shadowColor = 'transparent';
      txt(c, 'Kuba zrobi 3 błędy.', 0, -36, 54, '#FFFFFF', 800);
      txt(c, 'Znajdziesz wszystkie?', 0, 38, 54, '#F5C542', 900);
      c.restore();
    }
  },
});
// 1. BLOK NOCĄ
scene({
  name: 'ext', start: 5, end: 11,
  cam: lt => ({ z: 1.0 + lt * 0.014 }),
  labels: [
    [0.3, 6, 'KASZTANOWA 12 · KLATKA II', 540, 300, 'dark', 42],
    [0.7, 6, '21:47', 540, 380, 'yellow', 40],
    [3.6, 6, 'KURIER? O TEJ GODZINIE?', 540, 1300, 'red', 40],
  ],
  draw(c, lt, sc) {
    const m = blockBg(c, lt);
    person(c, 'kurier', 600, 1505, 0.42, { box: true, t: lt });
    if (lt > 1.6) {
      const a = lt - 1.6, wx = m.bx + 5 * m.cw + m.cw / 2, wy = m.by + 40 + 1 * m.rh + (m.rh - 34) / 2;
      c.save(); c.strokeStyle = '#F39C12'; c.lineWidth = 6; c.beginPath(); c.arc(wx, wy, 52 * back(clamp(a / .3)), 0, 7); c.stroke();
      c.beginPath(); c.moveTo(wx - 10, wy + 52); c.lineTo(wx - 40, wy + 120); c.stroke(); c.restore();
      label(c, 'MIESZKANIE KUBY · 9 PIĘTRO', 520, wy + 150, 'orange', 38, a, 9);
    }
    snow(c, lt + 5);
  },
});
// 2. MIESZKANIE — domofon
scene({
  name: 'flat', start: 11, end: 21.5,
  cam: lt => ({ z: 1.0 + lt * 0.006 }),
  bubbles: [
    [1.0, 5.0, 'Paczka do 71.\nNikt nie otwiera.\nWpuści pan?', 330, 1000, 420, 800, 'kurier'],
    [6.6, 8.6, 'Dobra, otwieram.', 520, 1010, 640, 1060, 'kuba'],
  ],
  labels: [
    [4.6, 6.4, 'KURIER DO SĄSIADKI?', 540, 265, 'red', 40],
    [5.4, 7.6, 'MECZ ZA 2 MINUTY', 760, 1250, 'yellow', 38],
  ],
  draw(c, lt, sc) {
    // ściana i podłoga
    c.fillStyle = '#C8B69A'; c.fillRect(0, 0, W, 1420);
    for (let i = 0; i < 20; i++) { c.fillStyle = 'rgba(150,120,80,.18)'; c.fillRect(i * 60, 0, 22, 1420); }
    c.fillStyle = '#6A4E36'; c.fillRect(0, 1420, W, 500);
    for (let i = 0; i < 12; i++) { c.fillStyle = 'rgba(0,0,0,.12)'; c.fillRect(0, 1440 + i * 44, W, 3); }
    fillRR(c, 0, 1400, W, 26, 0, '#4E3826');
    paddedDoor(c, 40, 560, 340, 860, '94');
    // poświata TV
    const fl = 0.6 + 0.4 * Math.sin(lt * 9) * Math.sin(lt * 3.3);
    const g = c.createRadialGradient(1120, 1000, 40, 1120, 1000, 600);
    g.addColorStop(0, `rgba(110,170,255,${0.45 * fl})`); g.addColorStop(1, 'rgba(110,170,255,0)');
    c.fillStyle = g; c.fillRect(500, 300, 580, 1400);
    const pressT = 8.0, pressed = lt > pressT;
    const [ubx, uby] = unifon(c, 440, 760, 150, 230, { pressed, glow: pressed ? clamp(1 - (lt - pressT)) : 0, feed: feedEntrance(lt, { talk: talking(sc, 'kurier', lt) }) });
    const look = lt > 5.3 && lt < 7.4 ? 1 : -0.8;
    const aL = lt < 7.6 ? 0.14 : mv(lt, 7.6, 8.0, 0.14, 2.35);
    person(c, 'kuba', 700, 1500, 2.2, { t: lt, look, aL, talk: talking(sc, 'kuba', lt), lookY: look < 0 ? -0.6 : 0 });
    // powiększenie monitora
    const zin = prog(lt, 0.2, 0.6) * (1 - prog(lt, 9.8, 10.3));
    if (zin > 0) {
      c.save(); c.globalAlpha = zin;
      c.strokeStyle = 'rgba(255,255,255,.35)'; c.lineWidth = 3; c.setLineDash([10, 8]);
      c.beginPath(); c.moveTo(180, 770); c.lineTo(455, 775); c.moveTo(900, 770); c.lineTo(575, 775); c.stroke(); c.setLineDash([]);
      c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 30; fillRR(c, 168, 318, 744, 464, 18, '#2A2C30'); c.shadowColor = 'transparent';
      c.beginPath(); c.roundRect(180, 330, 720, 440, 10); c.save(); c.clip();
      feedEntrance(lt, { talk: talking(sc, 'kurier', lt), doorOpen: prog(lt, 8.2, 8.8), cx: lt > 8.6 ? mv(lt, 8.6, 9.8, 540, 600) : 540, calpha: 1 - prog(lt, 9.2, 9.8), look: lt > 8.3 ? 0.6 : 0 })(c, 180, 330, 720, 440);
      c.restore(); c.restore();
    }
  },
});
// 3. KLATKA — kurier w środku
scene({
  name: 'lobby1', start: 21.5, end: 34,
  cam: lt => ({ z: 1.0 + lt * 0.004 }),
  labels: [
    [1.6, 3.1, 'TEN SAM', 260, 820, 'red', 42],
    [7.0, 10.6, 'IDZIE SCHODAMI.\nNIE WINDĄ?', 560, 760, 'yellow', 40],
  ],
  bubbles: [[3.2, 6.2, 'Dzięki, szefie!\nCiężkie to.', 360, 830, 260, 1000, 'kurier']],
  draw(c, lt, sc) {
    const kx = lt < 1.2 ? 545 : lt < 9.5 ? mv(lt, 1.2, 2.8, 545, 660) : mv(lt, 9.5, 12, 660, 1260, x => x);
    const kwalk = (lt > 1.2 && lt < 2.8) || lt > 9.5 ? lt * 9 : null;
    const ks = lt < 1.2 ? 1.8 : mv(lt, 1.2, 2.8, 1.8, 2.0);
    const ky = lt < 1.2 ? 1395 : mv(lt, 1.2, 2.8, 1395, 1480);
    lobbyBg(c, lt, {
      elevOpen: mv(lt, 0.2, 0.9, 0, 1) * (1 - prog(lt, 3.4, 4.2)), floor: '0',
      inCab: lt < 1.2 ? (cc => person(cc, 'kuba', 545, 1395, 1.8, { t: lt, bag: true })) : null,
    });
    // kurier
    const cl = prog(lt, 6.5, 9.5);
    const cx = lerp(250, 40, cl), cy = lerp(1480, 1180, cl), cs = lerp(2.0, 1.75, cl);
    person(c, 'kurier', cx, cy, cs, { t: lt, box: true, walk: cl > 0 && cl < 1 ? lt * 8 : null, talk: talking(sc, 'kurier', lt), look: lt < 6.5 ? 1 : -1, alpha: 1 - prog(lt, 8.8, 9.5) });
    if (lt >= 1.2) person(c, 'kuba', kx, ky, ks, { t: lt, bag: true, walk: kwalk, look: lt < 9.5 ? -1 : 1 });
  },
});
// 4. DRZWI — KAPTUR wchodzi
scene({
  name: 'door', start: 34, end: 45,
  cam: lt => ({ z: 1.02 + lt * 0.004 }),
  labels: [
    [3.0, 5.6, 'TUŻ ZA NIM', 220, 1240, 'red', 42],
    [7.0, 10.4, 'OBCY NIE MA KLUCZY', 540, 330, 'red', 44],
  ],
  bubbles: [
    [4.4, 6.4, 'Przytrzymasz?', 260, 860, 210, 990, 'kaptur'],
    [6.0, 7.8, 'Jasne!', 690, 860, 730, 1010, 'kuba'],
  ],
  draw(c, lt, sc) {
    entranceBg(c, lt, { doorOpen: mv(lt, 2.1, 2.7, 0, 1) });
    const kin = prog(lt, 7.4, 9.6);
    const kpx = lt < 2.5 ? -260 : lt < 5 ? mv(lt, 2.5, 4.6, -260, 210) : lerp(210, 540, kin);
    const kps = lerp(2.15, 1.6, kin), kpy = lerp(1540, 1440, kin);
    // Kaptur wchodzi do środka (rysowany przed Kubą)
    person(c, 'kaptur', kpx, kpy, kps, { t: lt, walk: (lt > 2.5 && lt < 4.6) || (kin > 0 && kin < 1) ? lt * 8 : null, look: 1, alpha: 1 - prog(lt, 9.0, 9.6) });
    const kx = lt < 2 ? mv(lt, 0, 2.0, -200, 520) : mv(lt, 5.8, 6.4, 520, 730);
    const aL = mv(lt, 6.2, 6.6, 0.14, 1.6);
    person(c, 'kuba', kx, 1530, 2.1, { t: lt, walk: lt < 2 || (lt > 5.8 && lt < 6.4) ? lt * 9 : null, keys: lt < 2.4, aL, look: lt > 3.2 ? -1 : 0.3, talk: talking(sc, 'kuba', lt) });
    snow(c, lt + 34);
  },
});
// 5. KLATKA — Zdzisiek i błąd 3
scene({
  name: 'lobby2', start: 45, end: 66,
  cam: lt => ({ z: 1.0 + lt * 0.002 }),
  labels: [
    [2.4, 5.0, 'PAN ZDZISIEK · 2 PIĘTRO', 650, 300, 'orange', 40],
    [15.0, 18.0, 'SŁUCHA', 150, 640, 'red', 40],
  ],
  bubbles: [
    [3.2, 6.3, 'Kuba! A ten w kapturze\nto do kogo?', 560, 850, 860, 1090, 'zdzisiek'],
    [6.5, 9.0, 'Nie wiem…\nKurierowi otworzyłem.', 520, 850, 660, 1070, 'kuba'],
    [9.2, 11.6, 'Ja tu znam wszystkich.\nJego nie znam.', 560, 850, 860, 1090, 'zdzisiek'],
    [12.3, 14.7, 'Pani z 71 nie otwiera.\nKiedy wraca?', 460, 850, 340, 1070, 'kurier'],
    [14.75, 17.4, 'Nie ma jej, wyjechała\ndo córki! Do niedzieli.', 520, 850, 660, 1070, 'kuba'],
    [18.4, 21, 'Kurier bez paczki?\nI schodami?', 560, 850, 860, 1090, 'zdzisiek'],
  ],
  draw(c, lt, sc) {
    lobbyBg(c, lt, { floor: '0', callLit: lt > 0.5 });
    // Kaptur na schodach w półcieniu
    const ka = 1 - prog(lt, 19.2, 20.4);
    const kup = prog(lt, 18.8, 20.4);
    person(c, 'kaptur', lerp(150, 20, kup), lerp(1260, 1110, kup), 1.75, { t: lt, look: lt < 18.8 ? 1 : -1, glow: lt > 15 && lt < 16 ? 1 : 0, alpha: ka, walk: kup > 0 && kup < 1 ? lt * 8 : null });
    c.fillStyle = 'rgba(0,0,20,.18)'; c.fillRect(0, 700, 300, 700);
    // kurier schodzi i wraca
    const dn = prog(lt, 10.6, 12.1), up = prog(lt, 17.4, 19.2);
    if (lt > 10.6) {
      const cx = up > 0 ? lerp(330, 30, up) : lerp(40, 330, dn), cy = up > 0 ? lerp(1480, 1170, up) : lerp(1180, 1480, dn);
      const cs = up > 0 ? lerp(2, 1.75, up) : lerp(1.75, 2, dn);
      person(c, 'kurier', cx, cy, cs, { t: lt, walk: (dn > 0 && dn < 1) || (up > 0 && up < 1) ? lt * 8 : null, talk: talking(sc, 'kurier', lt), look: up > 0 ? -1 : 1, alpha: 1 - prog(lt, 18.6, 19.2) });
    }
    person(c, 'kuba', 660, 1480, 2.0, { t: lt, look: lt < 3 ? -0.5 : lt > 12.4 && lt < 17.2 ? -1 : 1, talk: talking(sc, 'kuba', lt), aR: lt < 0.8 ? mv(lt, 0, .4, .14, 1.2) : .14 });
    const zx = mv(lt, 0.3, 2.4, 1250, 870);
    person(c, 'zdzisiek', zx, 1495, 2.05, { t: lt, net: true, walk: lt > .3 && lt < 2.4 ? lt * 8 : null, look: lt > 11 && lt < 15 ? -1 : -0.6, talk: talking(sc, 'zdzisiek', lt), squint: lt > 18.2 });
  },
});
// 6. PRZEKRÓJ BLOKU
scene({
  name: 'section', start: 66, end: 74,
  cam: lt => ({ z: 1 }),
  labels: [
    [0.3, 5.6, 'KTO GDZIE JEST?', 540, 300, 'dark', 42],
    [5.6, 8, 'MIESZKANIE 71 „PUSTE”', 540, 300, 'red', 42],
  ],
  draw(c, lt, sc) {
    c.fillStyle = '#0D111C'; c.fillRect(0, 0, W, H);
    const x0 = 250, x1 = 830, top = 400, fh = 98;
    const fy = f => top + (10 - f) * fh;
    for (let f = 0; f <= 10; f++) {
      const y = fy(f);
      c.fillStyle = f % 2 ? '#1A2132' : '#1D2538'; c.fillRect(x0, y, x1 - x0, fh - 4);
      txt(c, String(f), x0 - 36, y + fh / 2, 30, '#7C8AA8', 700);
      fillRR(c, x0 + 150, y + 14, 150, fh - 32, 4, '#26304A');
      fillRR(c, x0 + 370, y + 14, 200, fh - 32, 4, '#26304A');
    }
    // szyb windy
    c.fillStyle = '#0A0D16'; c.fillRect(x0 + 316, top, 40, 11 * fh);
    c.strokeStyle = '#3A4462'; c.lineWidth = 2; c.beginPath(); c.moveTo(x0 + 336, top); c.lineTo(x0 + 336, top + 11 * fh); c.stroke();
    // klatka schodowa – zygzak
    c.strokeStyle = '#3A4462'; c.lineWidth = 4; c.beginPath();
    for (let f = 0; f <= 10; f++) { const y = fy(f) + fh - 6; c.moveTo(x0 + 10, y); c.lineTo(x0 + 130, y - fh + 10); }
    c.stroke();
    const hl = (f, side, col, text, a) => {
      const y = fy(f), bx = side ? x0 + 370 : x0 + 150, bw = side ? 200 : 150;
      const pa = clamp((lt - a) / .3);
      if (pa <= 0) return;
      c.save(); c.globalAlpha = pa; c.strokeStyle = col; c.lineWidth = 5; rr(c, bx, y + 14, bw, fh - 32, 4); c.stroke();
      fillRR(c, bx + 3, y + 17, bw - 6, fh - 38, 3, col + '33');
      c.restore();
      label(c, text, side ? x1 + 0 : x0 - 10, y + fh / 2, side ? 'orange' : 'red', 26, lt - a, 9);
    };
    hl(9, 1, '#F39C12', 'KUBA · 94', 0.6);
    hl(7, 0, '#D7263D', 'PANI HALINA · 71', 1.0);
    hl(2, 1, '#F5C542', 'ZDZISIEK', 1.4);
    // kropki
    const ev = prog(lt, 0.8, 4.0);
    const ely = lerp(fy(0), fy(9), eio(ev)) + fh / 2;
    fillRR(c, x0 + 320, ely - 30, 32, 60, 4, '#F39C12');
    const stair = (p, f0, f1) => { const fpos = lerp(f0, f1, p); const f = Math.floor(fpos), fr = fpos - f; const y = fy(f) + fh - 10 - fr * (fh - 10); const x = x0 + 10 + (f % 2 ? (1 - fr) : fr) * 120; return [x, y]; };
    const p1 = eio(prog(lt, 1.2, 5.2)), p2 = eio(prog(lt, 1.6, 5.6));
    const [ax, ay] = stair(p1, 0, 7), [bx2, by2] = stair(p2, 0, 7);
    circ(c, ax, ay - 10, 16, '#E8A33D'); circ(c, bx2, by2 - 10, 16, '#D7263D');
    if (lt > 1.2) { txt(c, 'KURIER', ax + 70, ay - 30, 22, '#E8A33D', 800, 'left'); }
    if (lt > 1.6) { txt(c, 'KAPTUR', bx2 + 70, by2 + 8, 22, '#FF6B7A', 800, 'left'); }
    // Zdzisiek dzwoni
    if (lt > 4.2) {
      const y = fy(2) + fh / 2, pr = (lt * 1.6) % 1;
      c.save(); c.strokeStyle = `rgba(245,197,66,${1 - pr})`; c.lineWidth = 4; c.beginPath(); c.arc(x0 + 470, y, 20 + pr * 60, 0, 7); c.stroke(); c.restore();
      circ(c, x0 + 470, y, 14, '#F5C542');
      label(c, 'DZWONI DO KOGOŚ…', 540, fy(0) + fh + 70, 'yellow', 34, lt - 4.2, 9);
    }
  },
});
// 7. KORYTARZ 7 PIĘTRO
scene({
  name: 'floor7', start: 74, end: 88,
  cam: lt => ({ z: 1.0 + lt * 0.004 }),
  labels: [
    [0.3, 3.4, '7 PIĘTRO · 23:04', 540, 300, 'dark', 42],
    [1.7, 4.3, 'PUSTY KARTON', 600, 1250, 'red', 44],
    [4.8, 7.2, 'WYTRYCH', 700, 1180, 'red', 38],
    [5.4, 9.0, '1 MINUTA', 540, 300, 'dark', 44],
    [9.0, 13.9, '2 MINUTY', 540, 300, 'dark', 44],
  ],
  bubbles: [[2.4, 4.5, 'Pusto. Dawaj.', 780, 860, 830, 1030, 'kurier']],
  draw(c, lt, sc) {
    corridorBg(c, lt, { peepDark: lt > 11.4 });
    // karton
    const tip = eio(prog(lt, 1.0, 1.5));
    c.save(); c.translate(500, 1470); c.rotate(-tip * 1.35);
    fillRR(c, 0, -150, 200, 150, 6, '#B07A45'); c.fillStyle = '#D9B57E'; c.fillRect(0, -120, 200, 14);
    txt(c, '71', 150, -50, 40, '#1E1E1E', 900);
    if (tip > 0.6) { c.fillStyle = '#4A3018'; c.fillRect(8, -142, 184, 134); c.fillStyle = '#9A6838'; c.fillRect(0, -150, 200, 8); }
    c.restore();
    // kurier
    const kick = lt > 0.9 && lt < 1.3;
    person(c, 'kurier', 850, 1500, 2.0, { t: lt, talk: talking(sc, 'kurier', lt), look: lt < 5 ? -1 : -0.5, rot: kick ? -0.08 : 0 });
    // kaptur przy zamku
    const kx = mv(lt, 3.0, 4.0, 220, 560), crouch = mv(lt, 4.0, 4.4, 1, 0.8);
    person(c, 'kaptur', kx, 1500, 2.0, { t: lt, squash: crouch, walk: lt > 3 && lt < 4 ? lt * 8 : null, aR: lt > 4.2 ? 2.0 + Math.sin(lt * 14) * 0.06 : 0.14, tool: lt > 4.2, look: 1 });
    // telefon Zdziśka (wstawka)
    const pa = prog(lt, 6.0, 6.3) * (1 - prog(lt, 10.6, 11.0));
    if (pa > 0) {
      c.save(); c.globalAlpha = pa; c.translate(60, 380); c.rotate(-0.04 + Math.sin(lt * 40) * 0.01);
      c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 30; fillRR(c, 0, 0, 300, 560, 40, '#111317'); c.shadowColor = 'transparent';
      const g = c.createLinearGradient(0, 20, 0, 540); g.addColorStop(0, '#2B3A63'); g.addColorStop(1, '#151B2E');
      fillRR(c, 14, 14, 272, 532, 30, g);
      txt(c, 'Zdzisiek dzwoni do…', 150, 90, 24, '#AFC0E8', 700);
      const pr = (lt * 1.4) % 1; c.strokeStyle = `rgba(255,140,180,${1 - pr})`; c.lineWidth = 5; c.beginPath(); c.arc(150, 250, 60 + pr * 50, 0, 7); c.stroke();
      circ(c, 150, 250, 60, '#F28AB2'); txt(c, 'H', 150, 252, 60, '#FFFFFF', 900);
      txt(c, 'HALINKA', 150, 360, 42, '#FFFFFF', 900);
      txt(c, '7 piętro', 150, 405, 26, '#AFC0E8', 600);
      circ(c, 90, 480, 30, '#E5484D'); circ(c, 210, 480, 30, '#30A46C');
      c.restore();
    }
  },
});
// 8. ZWROT AKCJI
scene({
  name: 'twist', start: 88, end: 98,
  cam: lt => { const sh = lt < .6 ? (1 - lt / .6) * 22 : 0; return { z: 1.04, x: Math.sin(lt * 80) * sh, y: Math.cos(lt * 67) * sh }; },
  labels: [[0.5, 3.6, 'HALINA NIE WYJECHAŁA', 540, 300, 'red', 56]],
  bubbles: [
    [1.7, 6.3, 'Kawalerze… ja słyszę\nWSZYSTKO przez domofon.', 520, 830, 540, 920, 'halina'],
    [6.6, 9.8, 'I nie wracajcie!\nA ty, Kuba, też dostaniesz!', 520, 830, 540, 920, 'halina'],
  ],
  draw(c, lt, sc) {
    corridorBg(c, lt, { open: true });
    person(c, 'halina', 520, 1420, 2.25, { t: lt, aR: 2.75 + Math.sin(lt * 6) * .08, pin: true, talk: talking(sc, 'halina', lt), mouth: 'angry', look: lt < 6 ? 1 : -1 });
    const run = prog(lt, 5.0, 6.4);
    const lines = (x, y) => { c.strokeStyle = 'rgba(255,255,255,.5)'; c.lineWidth = 5; for (let i = 0; i < 5; i++) { c.beginPath(); c.moveTo(x + 120 + i * 10, y - 500 + i * 90); c.lineTo(x + 280 + i * 30, y - 500 + i * 90); c.stroke(); } };
    const kx = lerp(240, -420, eio(run)), cx = lerp(870, -260, eio(run));
    person(c, 'kaptur', kx, 1500, 2.0, { t: lt, rot: run > 0 ? -0.15 : 0.1, walk: run > 0 ? lt * 16 : null, glow: 0, look: run > 0 ? -1 : 1 });
    person(c, 'kurier', cx, 1500, 2.0, { t: lt, rot: run > 0 ? -0.15 : 0.12, walk: run > 0 ? lt * 16 : null, mouth: 'o', wide: true, look: run > 0 ? -1 : -1 });
    if (run > 0 && run < 1) { lines(kx, 1500); lines(cx, 1500); }
    if (lt < 0.12) { c.fillStyle = `rgba(255,255,255,${1 - lt / .12})`; c.fillRect(-100, -100, W + 200, H + 200); }
  },
});
// 9. ZDZISIEK — pożegnanie
scene({
  name: 'zdz', start: 98, end: 102,
  cam: lt => ({ z: 1.0 + lt * .01 }),
  bubbles: [[1.0, 4.0, 'Do widzenia\npanom kurierom!', 560, 860, 760, 1090, 'zdzisiek']],
  draw(c, lt, sc) {
    lobbyBg(c, lt, { floor: '7' });
    const r = prog(lt, 0.0, 1.3);
    person(c, 'kaptur', lerp(60, 1300, r), lerp(1200, 1520, r), 2.0, { t: lt, walk: lt * 16, rot: 0.12 });
    person(c, 'kurier', lerp(-200, 1250, prog(lt, .2, 1.5)), 1530, 2.0, { t: lt, walk: lt * 16, rot: 0.12, mouth: 'o' });
    person(c, 'zdzisiek', 760, 1495, 2.05, { t: lt, net: true, aL: 2.6 + Math.sin(lt * 10) * .25, talk: talking(sc, 'zdzisiek', lt), mouth: 'smile' });
  },
});
// 10. ODPOWIEDZI
scene({
  name: 'reveal', start: 102, end: 119,
  cam: lt => ({ z: 1 }),
  draw(c, lt, sc) {
    quilted(c, 0, 0, W, H, '#2A1E15', '#231910', '#5A4630', 90);
    c.fillStyle = 'rgba(8,10,14,.72)'; c.fillRect(0, 0, W, H);
    label(c, lt < 11.2 ? 'ODPOWIEDZI' : 'ZAPAMIĘTAJ', 540, 320, 'yellow', 52, lt < 11.2 ? lt : lt - 11.2, 9);
    const out = prog(lt, 10.8, 11.2);
    if (out < 1) {
      c.save(); c.globalAlpha = 1 - out; c.translate(-out * 200, 0);
      let y = 420;
      const items = [
        [0.4, 'BŁĄD 1 · ' + fmt(ERRN[0]), 'wpuścił „kuriera” do cudzego\nmieszkania'],
        [3.2, 'BŁĄD 2 · ' + fmt(ERRN[1]), 'przytrzymał drzwi obcemu'],
        [5.35, 'BŁĄD 3 · ' + fmt(ERRN[2]), 'powiedział, że sąsiadki nie ma'],
        [8.25, 'BŁĄD 4 · ???', 'był na samym początku.\nZnalazłeś? Napisz w komentarzu ↓'],
      ];
      for (const [a, t1, t2] of items) { if (lt > a) y += card(c, 70, y, 860, t1, t2, lt - a, a > 8 ? '#D7263D' : '#F39C12', 44) + 30; }
      c.restore();
    }
    if (lt > 11.2) {
      const a = lt - 11.2;
      card(c, 80, 470, 840, 'ZASADA', 'Kurier dzwoni do adresata.\nNie do ciebie.', a, '#F39C12', 54);
      if (lt > 14.5) {
        const b = lt - 14.5, s = b < .3 ? back(b / .3) : 1;
        c.save(); c.translate(540, 960); c.scale(s, s);
        txt(c, 'Otworzyłbyś?', 0, 0, 64, '#FFFFFF', 900);
        fillRR(c, -330, 70, 300, 110, 24, '#D7263D'); txt(c, 'A · TAK', -180, 126, 50, '#FFFFFF', 900);
        fillRR(c, 30, 70, 300, 110, 24, '#30A46C'); txt(c, 'B · NIE', 180, 126, 50, '#FFFFFF', 900);
        txt(c, 'Odpowiedz w komentarzu', 0, 250, 36, '#C9CFDA', 700);
        c.restore();
      }
    }
  },
});
// 11. KONIEC — KAPTUR i pętla
scene({
  name: 'end', start: 119, end: 124,
  cam: lt => ({ z: 1.35 + lt * .03, y: 120 }),
  labels: [[3.1, 5, 'ODC. 2 →', 540, 620, 'orange', 64]],
  draw(c, lt, sc) {
    blockBg(c, lt, { off94: lt > 1.6 });
    const front = lt > 2.6;
    person(c, 'kaptur', 540, 1640, 1.6, { t: lt, back: !front, glow: front ? clamp((lt - 2.6) * 2) : 0, look: 0 });
    snow(c, lt + 119);
  },
});
