// BLOK 94 · „KTO TAM?” CZĘŚĆ 4 — klucz w zamku o 3:12, Zdzisiek z latarką, Kaptur ucieka w górę.
window.EP = {
  badge: 'BLOK 94 · CZĘŚĆ 4',
  loop: true,
  vignette: .78,
  cues(add) {
    add(0.3, 'stab'); add(0.6, 'keyturn');
    add(20.8, 'error');
    add(23.4, 'scrape');
    add(31.0, 'keyturn'); add(34.6, 'keyturn');
    add(40.4, 'chain'); add(44.6, 'slam');
    add(48.6, 'boom');
    add(58.8, 'doorlock'); add(60.6, 'error');
    add(66.6, 'stairsup'); add(71.4, 'doorclose');
    add(77.0, 'knock'); add(80.2, 'boom');
  },
};

const S = [];
function scene(o) { S.push(o); return o; }
function talking(sc, who, lt) {
  return (sc.bubbles || []).some(b => b[7] === who && lt >= b[0] && lt < b[0] + Math.min(b[1] - b[0] - .2, .055 * b[2].length + .3));
}
function lockCloseup(c, lt, ang) {
  quilted(c, 0, 0, W, H, '#5E4029', '#4D3420', '#B8914E', 110);
  circ(c, 540, 900, 170, '#8E9399'); circ(c, 540, 900, 140, '#B9BDC2'); circ(c, 540, 900, 120, '#A3A8AE');
  c.save(); c.translate(540, 900); c.rotate(ang); fillRR(c, -34, -130, 68, 260, 30, '#E2E5E8'); fillRR(c, -14, -100, 28, 200, 12, '#C9CDD2'); c.restore();
}
function stairwellZdz(c, lt, o = {}) {
  c.fillStyle = '#9C9A8C'; c.fillRect(0, 0, W, 1060); c.fillStyle = '#3E5A47'; c.fillRect(0, 1050, W, 350);
  for (let r = 0; r < 8; r++) for (let q = 0; q < 14; q++) { c.fillStyle = (r + q) % 2 ? '#3A3530' : '#2C2824'; c.fillRect(q * 80 - (r % 2) * 40, 1400 + r * 70, 80, 70); }
  stairsUp(c, 420, 1400, 11, 38);
  paddedDoor(c, 640, 560, 330, 840, '94', { peepDark: true });
  fillRR(c, 420, 230, 240, 22, 11, '#555');
}

// 0. HAK — gałka zamka obraca się sama
scene({
  name: 'hook', start: 0, end: 6,
  cam: lt => ({ z: 1.0 + lt * 0.015 }),
  draw(c, lt) {
    lockCloseup(c, lt, mv(lt, 0.6, 1.6, 0, Math.PI / 2));
    night(c, .6, [{ x: 540, y: 900, r: 600, a: .9, tint: 'rgba(200,220,255,.06)' }]);
    const sp = prog(lt, 0.15, 0.4), shake = lt < 1 ? (1 - lt) * 9 : 0;
    if (sp > 0) {
      c.save(); c.translate(540 + Math.sin(lt * 70) * shake, 390); const s = back(sp); c.scale(s, s); c.rotate(-0.02);
      c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 30; c.shadowOffsetY = 10;
      fillRR(c, -450, -120, 900, 240, 24, '#D7263D'); c.shadowColor = 'transparent';
      c.strokeStyle = 'rgba(255,255,255,.35)'; c.lineWidth = 4; rr(c, -436, -106, 872, 212, 16); c.stroke();
      txt(c, 'NIE CZEKAJ', 0, -44, 96, '#FFFFFF', 900); txt(c, 'DO RANA!', 0, 54, 96, '#FFFFFF', 900);
      c.restore();
    }
  },
});
// 1. PRZYPOMNIENIE — klucze
scene({
  name: 'recap', start: 6, end: 12,
  labels: [[0.2, 6, 'CZĘŚĆ 4', 540, 1650, 'yellow', 48]],
  draw(c, lt) { c.fillStyle = '#0B0C10'; c.fillRect(0, 0, W, H); chat(c, lt + 10, [[0, 'keys'], [0, 'txt', 'zgubiłeś coś, Kuba?']]); },
});
// 2. DECYZJA — błąd 1
scene({
  name: 'decide', start: 12, end: 22,
  bubbles: [
    [0.4, 3.2, 'Zadzwońmy na policję…', 640, 860, 860, 1010, 'ola'],
    [3.4, 6.4, 'I co powiemy? Że zgubiłem\nklucze? Rano wymienimy zamek.', 420, 860, 360, 1010, 'kuba'],
    [6.6, 8.6, 'Mamy łańcuch. Nic się nie stanie.', 440, 860, 360, 1010, 'kuba'],
  ],
  draw(c, lt, sc) {
    hallBg(c, lt);
    person(c, 'kuba', 360, 1500, 2.1, { t: lt, look: 1, talk: talking(sc, 'kuba', lt) });
    person(c, 'ola', 860, 1500, 2.15, { t: lt, phone: 1, aR: .9, look: -1, talk: talking(sc, 'ola', lt) });
    night(c, .35, [{ x: 540, y: 300, r: 900, a: .8 }]);
  },
  post(c, lt) { if (lt > 8.8) card(c, 70, 330, 860, 'BŁĄD 1', 'ktoś ma ich klucze, a oni\nczekają do rana', lt - 8.8, '#F39C12', 44); },
});
// 3. NOC — 3:12
scene({
  name: 'night', start: 22, end: 30,
  cam: lt => ({ z: 1.0 + lt * 0.012 }),
  labels: [[0.3, 8, '03:12', 540, 300, 'yellow', 48], [1.6, 8, 'METAL W ZAMKU', 540, 400, 'red', 40]],
  draw(c, lt) {
    ROOM(c);
    fillRR(c, 40, 560, 220, 830, 4, '#4A3A2C'); circ(c, 230, 990, 10, '#BFC3C8');
    person(c, 'ola', 450, lt < 1.4 ? 1330 : 1300, 1.9, { t: lt, look: -1, wide: lt > 1.4, mouth: lt > 1.8 ? 'o' : null, squash: lt < 1.4 ? .92 : 1, blink: lt < 1.2 });
    fillRR(c, 80, 1250, 760, 200, 30, '#4A5A8A');
    night(c, .8, [{ x: 780, y: 560, r: 260, a: .5 }, { x: 450, y: 1000, r: 260, a: .45 }]);
  },
});
// 4. ZAMKI SIĘ OBRACAJĄ
scene({
  name: 'locks', start: 30, end: 40,
  labels: [[1.2, 10, 'KLUCZ PASUJE', 540, 300, 'red', 46]],
  draw(c, lt) {
    hallBg(c, lt, { locks: [mv(lt, 1.0, 1.8, 0, Math.PI / 2), mv(lt, 4.6, 5.4, 0, Math.PI / 2)] });
    person(c, 'kuba', 890, 1500, 2.0, { t: lt, phone: 1, aR: 1.3, look: -1, wide: true, mouth: 'o' });
    person(c, 'ola', 1010, 1520, 1.9, { t: lt, phone: 1, aR: 1.0, look: -1, wide: true, mouth: 'o' });
    night(c, .9, [{ x: 720, y: 1000, r: 440, a: .9, tint: 'rgba(200,220,255,.08)' }, { x: 540, y: 1425, r: 260, a: .8 }]);
  },
});
// 5. ŁAŃCUCH TRZYMA — Kuba dociska drzwi
scene({
  name: 'chain', start: 40, end: 48,
  cam: lt => { const sl = lt > 4.4 && lt < 4.9 ? 18 : 0; return { z: 1.05, x: Math.sin(lt * 80) * sl }; },
  labels: [[1.2, 4.4, 'ŁAŃCUCH TRZYMA. NA RAZIE.', 540, 300, 'dark', 42]],
  draw(c, lt) {
    const gap = lt < 4.4 ? mv(lt, 0.2, 0.7, 0, 110) : mv(lt, 4.4, 4.6, 110, 0);
    hallBg(c, lt, gap > 2 ? { gap, rattle: lt < 4.4 ? 4 : 0 } : {});
    if (lt > 1.4 && lt < 4.5) {
      const p = eio(prog(lt, 1.4, 4.0)), gx = 330 + 420 - gap, cy = 520 + 900 * 0.42;
      c.save(); c.beginPath(); c.rect(0, 0, gx + gap, H); c.clip();
      c.translate(gx + gap + 40 - p * 180, cy - 70 + p * 40); c.rotate(-0.25);
      fillRR(c, 0, -26, 300, 52, 22, '#16171B'); fillRR(c, -70, -32, 90, 64, 26, '#0D0E10'); c.restore();
    }
    const kx = lt < 3.8 ? 860 : mv(lt, 3.8, 4.4, 860, 640);
    person(c, 'kuba', kx, 1500, 2.1, { t: lt, phone: 1, aR: 1.3, aL: lt > 3.8 ? 1.6 : .14, look: -1, wide: true, mouth: 'angry', rot: lt > 4 && lt < 4.8 ? -.12 : 0 });
    person(c, 'ola', 990, 1500, 2.1, { t: lt, phone: 2, aR: 2.5, look: -1, wide: true });
    night(c, .9, [{ x: kx + 60, y: 1000, r: 400, a: .9 }, { x: 990, y: 1000, r: 240, a: .7, tint: 'rgba(80,220,150,.08)' }]);
  },
});
// 6. ZDZISIEK Z LATARKĄ
scene({
  name: 'zdz', start: 48, end: 58,
  cam: lt => ({ z: 1.0 + lt * 0.008 }),
  bubbles: [[2.2, 5.6, 'Ej, ty! Ja tu znam wszystkich.\nCiebie też poznam!', 600, 820, 860, 1010, 'zdzisiek']],
  draw(c, lt, sc) {
    stairwellZdz(c, lt);
    const run = prog(lt, 6.0, 7.6);
    person(c, 'kaptur', lerp(560, 120, run), lerp(1470, 1060, run), lerp(2.0, 1.7, run), { t: lt, look: run > 0 ? -1 : 1, walk: run > 0 && run < 1 ? lt * 14 : null, glow: lt > 1.0 ? .7 : 0, alpha: 1 - prog(lt, 7.2, 7.6) });
    person(c, 'zdzisiek', 880, 1500, 2.05, { t: lt, aR: 1.5, talk: talking(sc, 'zdzisiek', lt), look: -1, mouth: 'angry' });
    const beamA = clamp((lt - 0.8) / .3);
    night(c, .9, [{ x: 640, y: 1100, r: 520 * beamA + 1, a: .95, tint: `rgba(255,240,190,${.18 * beamA})` }, { x: 900, y: 1050, r: 260, a: .7 }]);
    if (beamA > 0) { c.save(); c.globalAlpha = .18 * beamA; c.fillStyle = '#FFF4CC'; c.beginPath(); c.moveTo(980, 1000); c.lineTo(lerp(560, 200, run) - 160, 900); c.lineTo(lerp(560, 200, run) + 60, 1420); c.closePath(); c.fill(); c.restore(); }
  },
});
// 7. KUBA CHCE GONIĆ — błąd 2 + zasada
scene({
  name: 'chase', start: 58, end: 66,
  bubbles: [[1.2, 3.8, 'Kuba, stój! Nie goń!', 560, 820, 860, 1010, 'zdzisiek']],
  draw(c, lt, sc) {
    stairwellZdz(c, lt);
    const kx = lt < 1.2 ? mv(lt, 0.2, 1.2, 800, 520) : 520;
    person(c, 'kuba', kx, 1480, 2.1, { t: lt, look: -1, walk: lt > .2 && lt < 1.2 ? lt * 12 : null, mouth: 'angry', aR: lt > 1.2 ? .14 : .14 });
    person(c, 'zdzisiek', 880, 1500, 2.05, { t: lt, aL: lt > 1.2 ? 1.6 : .14, talk: talking(sc, 'zdzisiek', lt), look: -1 });
    night(c, .55, [{ x: 640, y: 1000, r: 700, a: .9, tint: 'rgba(255,240,190,.08)' }]);
  },
  post(c, lt) {
    if (lt > 2.4 && lt < 4.6) card(c, 70, 330, 860, 'BŁĄD 2', 'chciał gonić obcego\npo ciemnej klatce', lt - 2.4, '#F39C12', 44);
    if (lt > 4.6) card(c, 70, 330, 860, 'ZASADA', 'Ktoś ma twoje klucze? Zamek wymień\ntej samej nocy. Do tego czasu: 112.', lt - 4.6, '#F39C12', 40);
  },
});
// 8. PRZEKRÓJ — ucieka w górę
scene({
  name: 'up', start: 66, end: 74,
  labels: [[0.4, 8, 'NIE NA DÓŁ. W GÓRĘ.', 540, 300, 'red', 44]],
  draw(c, lt) {
    c.fillStyle = '#0D111C'; c.fillRect(0, 0, W, H);
    const x0 = 230, x1 = 850, top = 520, fh = 210;
    const rows = [[10, ['101', '102', '103', '104']], [9, ['91', '92', '93', '94']], [8, ['81', '82', '83', '84']]];
    rows.forEach(([f, aps], i) => {
      const y = top + i * fh;
      c.fillStyle = i % 2 ? '#1A2132' : '#1D2538'; c.fillRect(x0, y, x1 - x0, fh - 8);
      txt(c, String(f), x0 - 40, y + fh / 2, 34, '#7C8AA8', 800);
      aps.forEach((a, j) => {
        const bx = x0 + 150 + j * 115, hot = (a === '94') || (a === '104' && lt > 4.2);
        fillRR(c, bx, y + 30, 100, fh - 70, 6, hot ? (a === '94' ? '#3A2A10' : '#3A1218') : '#26304A');
        if (hot) { c.strokeStyle = a === '94' ? '#F39C12' : '#D7263D'; c.lineWidth = 5; rr(c, bx, y + 30, 100, fh - 70, 6); c.stroke(); }
        txt(c, a, bx + 50, y + fh / 2 - 6, 30, hot ? '#FFFFFF' : '#7C8AA8', 800);
      });
    });
    // klatka schodowa
    c.strokeStyle = '#3A4462'; c.lineWidth = 4; c.beginPath();
    for (let i = 0; i < 3; i++) { const y = top + i * fh + fh - 10; c.moveTo(x0 + 10, y); c.lineTo(x0 + 130, y - fh + 20); }
    c.stroke();
    const p = eio(prog(lt, 1.0, 3.6)), y = lerp(top + fh + fh - 30, top + fh - 30, p), x = lerp(x0 + 20, x0 + 120, p);
    circ(c, x, y, 18, '#D7263D'); if (lt > 1) txt(c, 'KAPTUR', x + 40, y - 30, 24, '#FF6B7A', 800, 'left');
    if (lt > 4.2) label(c, 'NAD POKOJEM OLI', 600, top - 70, 'red', 34, lt - 4.2, 9);
  },
});
// 9. SUFIT — pukanie z góry
scene({
  name: 'end', start: 74, end: 84,
  cam: lt => ({ z: 1.0 + lt * 0.012, y: lt * 6 }),
  labels: [[3.0, 6, 'PUK.  PUK.  PUK.', 540, 420, 'dark', 50], [8.4, 10, 'CZĘŚĆ 5 ↓', 540, 1650, 'red', 56]],
  draw(c, lt) {
    ROOM(c);
    c.fillStyle = '#1D2130'; c.fillRect(0, 0, W, 260); c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(0, 250, W, 14);
    const sh = (lt > 3.0 && lt < 4.2) ? Math.sin(lt * 90) * 3 : 0;
    fillRR(c, 470 + sh, 230, 140, 24, 6, '#2B2F42'); // lampa sufitowa drży
    person(c, 'ola', 450, 1300, 1.9, { t: lt, look: 0, lookY: -1, wide: true, mouth: 'o' });
    fillRR(c, 80, 1250, 760, 200, 30, '#4A5A8A');
    night(c, .82, [{ x: 780, y: 560, r: 260, a: .5 }, { x: 450, y: 900, r: 300, a: .5 }]);
  },
});
