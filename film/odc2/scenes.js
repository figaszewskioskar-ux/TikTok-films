// BLOK 94 · ODC. 2 — "NIE PYTAJ »KTO TAM?«"
// Noc, Ola sama w domu, zaklejony wizjer, płacz jako przynęta. Bez humoru, realistyczny strach.
window.EP = {
  badge: 'BLOK 94 · ODC. 2',
  loop: true,
  vignette: .75,
  cues(add) {
    add(0.25, 'knock'); add(0.3, 'stab');
    add(11.4, 'knock');
    add(28.4, 'boom'); add(31.0, 'boom');
    add(35.4, 'error'); add(54.5, 'chain'); add(55.4, 'error');
    add(59.6, 'glove'); add(62.2, 'slam');
    add(66.0, 'boom'); add(70.4, 'boom');
    add(73.5, 'dial');
    add(97.0, 'boom'); add(99.3, 'paper');
    add(106.4, 'tape'); add(109.6, 'hit');
  },
};

// ---------- tła tego odcinka ----------
function hallBg(c, t, o = {}) {
  c.fillStyle = '#3B3A44'; c.fillRect(0, 0, W, 1420);
  for (let i = 0; i < 20; i++) { c.fillStyle = 'rgba(0,0,0,.08)'; c.fillRect(i * 60, 0, 22, 1420); }
  c.fillStyle = '#2E241C'; c.fillRect(0, 1420, W, 500);
  for (let i = 0; i < 12; i++) { c.fillStyle = 'rgba(0,0,0,.18)'; c.fillRect(0, 1440 + i * 44, W, 3); }
  fillRR(c, 0, 1400, W, 24, 0, '#241B14');
  // wieszak z kurtką Kuby
  c.fillStyle = '#5A4632'; c.fillRect(840, 640, 160, 16);
  fillRR(c, 860, 650, 60, 220, 20, '#6E7B3B'); fillRR(c, 930, 650, 50, 160, 20, '#E08A0B');
  const dx = 330, dy = 520, dw = 420, dh = 900;
  if (o.gap) { // drzwi uchylone na łańcuch
    fillRR(c, dx - 16, dy - 16, dw + 32, dh + 16, 4, '#2A1E14');
    const gx = dx + dw - o.gap;
    c.fillStyle = '#07080B'; c.fillRect(gx, dy, o.gap, dh);
    // słaba poświata klatki w szparze
    const g = c.createLinearGradient(gx, 0, gx + o.gap, 0); g.addColorStop(0, 'rgba(255,230,170,.0)'); g.addColorStop(1, 'rgba(255,230,170,.18)');
    c.fillStyle = g; c.fillRect(gx, dy, o.gap, dh);
    quilted(c, dx, dy, dw - o.gap, dh, '#5E4029', '#4D3420', '#B8914E', 70);
    // łańcuch
    const cy = dy + dh * 0.42, x1 = gx - 40, x2 = dx + dw + 20;
    fillRR(c, x2 - 6, cy - 22, 30, 44, 4, '#B9BDC2'); fillRR(c, x1 - 30, cy - 10, 40, 20, 4, '#B9BDC2');
    c.strokeStyle = '#D6DADF'; c.lineWidth = 6;
    for (let i = 0; i < 8; i++) { const xx = lerp(x1, x2, i / 8) + 10; c.beginPath(); c.ellipse(xx, cy + Math.sin(i + t * 20) * (o.rattle || 0), 12, 7, 0, 0, 7); c.stroke(); }
  } else {
    paddedDoor(c, dx, dy, dw, dh, '94', { peepDark: true });
    // łańcuch zawieszony
    c.strokeStyle = '#C9CDD2'; c.lineWidth = 5;
    for (let i = 0; i < 6; i++) { c.beginPath(); c.ellipse(dx + dw - 10, dy + dh * .42 + i * 18, 6, 10, 0, 0, 7); c.stroke(); }
  }
  // pasek światła pod drzwiami
  const sy = dy + dh;
  c.fillStyle = o.gap ? '#000' : '#FFE7A8'; c.fillRect(dx + 6, sy - 6, dw - 12, 8);
  const lg = c.createLinearGradient(0, sy, 0, sy + 180); lg.addColorStop(0, 'rgba(255,225,160,.35)'); lg.addColorStop(1, 'rgba(255,225,160,0)');
  if (!o.gap) { c.fillStyle = lg; c.beginPath(); c.moveTo(dx, sy); c.lineTo(dx + dw, sy); c.lineTo(dx + dw + 90, sy + 180); c.lineTo(dx - 90, sy + 180); c.fill(); }
  if (o.feet) { // cienie stóp pod drzwiami
    c.fillStyle = `rgba(0,0,0,${o.feet})`;
    c.fillRect(dx + 120, sy - 6, 70, 8); c.fillRect(dx + 230, sy - 6, 70, 8);
    c.beginPath(); c.moveTo(dx + 120, sy); c.lineTo(dx + 190, sy); c.lineTo(dx + 210, sy + 170); c.lineTo(dx + 90, sy + 170); c.fill();
    c.beginPath(); c.moveTo(dx + 230, sy); c.lineTo(dx + 300, sy); c.lineTo(dx + 340, sy + 170); c.lineTo(dx + 220, sy + 170); c.fill();
  }
}
function peepPOV(c, t, inner) {
  c.fillStyle = '#050608'; c.fillRect(0, 0, W, H);
  quilted(c, 0, 0, W, H, '#1E150E', '#160F09', '#3A2C1A', 90);
  const cx = 540, cy = 900, r = 380;
  c.save(); c.beginPath(); c.arc(cx, cy, r, 0, 7); c.clip();
  c.fillStyle = '#000'; c.fillRect(cx - r, cy - r, r * 2, r * 2);
  if (inner) inner(c, cx, cy, r);
  const vg = c.createRadialGradient(cx, cy, r * .55, cx, cy, r); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,.85)');
  c.fillStyle = vg; c.fillRect(cx - r, cy - r, r * 2, r * 2);
  c.restore();
  c.strokeStyle = '#9C7B3E'; c.lineWidth = 26; c.beginPath(); c.arc(cx, cy, r + 10, 0, 7); c.stroke();
  c.strokeStyle = '#5C4522'; c.lineWidth = 6; c.beginPath(); c.arc(cx, cy, r + 25, 0, 7); c.stroke();
  txt(c, 'WIZJER', cx, cy + r + 70, 30, 'rgba(255,255,255,.55)', 800);
}
function tapeTexture(c, cx, cy, r, a = 1) {
  c.save(); c.globalAlpha = a;
  c.fillStyle = '#0B0A09'; c.fillRect(cx - r, cy - r, 2 * r, 2 * r);
  c.strokeStyle = 'rgba(255,255,255,.05)'; c.lineWidth = 2;
  for (let i = 0; i < 40; i++) { c.beginPath(); c.moveTo(cx - r + hash(i) * 2 * r, cy - r); c.lineTo(cx - r + hash(i + 3) * 2 * r, cy + r); c.stroke(); }
  c.restore();
}

// ---------- sceny ----------
const S = [];
function scene(o) { S.push(o); return o; }
function talking(sc, who, lt) {
  return (sc.bubbles || []).some(b => b[7] === who && lt >= b[0] && lt < b[0] + Math.min(b[1] - b[0] - .2, .055 * b[2].length + .3));
}
const ROOM = (c) => {
  c.fillStyle = '#262B3D'; c.fillRect(0, 0, W, H);
  // okno z księżycem
  fillRR(c, 620, 380, 320, 420, 8, '#0D1222'); circ(c, 860, 470, 40, '#E8E4CF'); circ(c, 878, 458, 36, '#0D1222');
  c.fillStyle = '#3A4058'; c.fillRect(775, 380, 10, 420); c.fillRect(620, 585, 320, 10);
  for (let i = 0; i < 6; i++) fillRR(c, 650 + i * 45, 640 + hash(i) * 120, 22, 160, 3, '#141A2C');
  c.fillStyle = '#1F1A22'; c.fillRect(0, 1380, W, 540);
  // łóżko
  fillRR(c, 80, 1100, 760, 330, 30, '#3D4A73'); fillRR(c, 90, 1060, 220, 120, 40, '#D9DCE6');
};

// 0. HAK — puka, wizjer czarny
scene({
  name: 'hook', start: 0, end: 5,
  cam: lt => { const k = [0.25, 0.55, 0.85].reduce((a, k0) => a + (lt > k0 && lt < k0 + .15 ? 1 : 0), 0); return { z: 1.06 + lt * 0.01, x: k ? Math.sin(lt * 90) * 8 : 0 }; },
  labels: [[0.25, 2.2, 'PUK.  PUK.  PUK.', 540, 1430, 'dark', 50]],
  draw(c, lt) {
    quilted(c, 0, 0, W, H, '#5E4029', '#4D3420', '#B8914E', 110);
    // wizjer z bliska
    circ(c, 540, 900, 120, '#2A2420'); circ(c, 540, 900, 96, '#9C7B3E'); circ(c, 540, 900, 70, '#000');
    c.fillStyle = 'rgba(255,255,255,.08)'; c.beginPath(); c.arc(520, 880, 40, 3.6, 4.6); c.lineTo(520, 880); c.fill();
    fillRR(c, 440, 640, 200, 80, 40, '#C9A15A'); txt(c, '94', 540, 680, 52, '#3A2A1A', 900);
    night(c, .55, [{ x: 540, y: 1700, r: 900, a: .8 }]);
    const sp = prog(lt, 0.15, 0.4), shake = lt < 1 ? (1 - lt) * 9 : 0;
    if (sp > 0) {
      c.save(); c.translate(540 + Math.sin(lt * 70) * shake, 380); const s = back(sp); c.scale(s, s); c.rotate(-0.02);
      c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 30; c.shadowOffsetY = 10;
      fillRR(c, -440, -120, 880, 240, 24, '#D7263D'); c.shadowColor = 'transparent';
      c.strokeStyle = 'rgba(255,255,255,.35)'; c.lineWidth = 4; rr(c, -426, -106, 852, 212, 16); c.stroke();
      txt(c, 'NIE PYTAJ', 0, -44, 96, '#FFFFFF', 900); txt(c, '„KTO TAM?”', 0, 54, 96, '#FFFFFF', 900);
      c.restore();
    }
  },
});
// 1. BLOK NOCĄ
scene({
  name: 'ext', start: 5, end: 11,
  cam: lt => ({ z: 1.0 + lt * 0.02 }),
  labels: [[0.3, 6, '02:47', 540, 300, 'yellow', 44], [3.4, 6, 'OLA · SAMA W DOMU', 520, 720, 'orange', 38]],
  draw(c, lt) {
    const m = blockBg(c, lt, { night: true });
    const wx = m.bx + 5 * m.cw + m.cw / 2, wy = m.by + 40 + m.rh + (m.rh - 34) / 2;
    const pr = 0.5 + 0.5 * Math.sin(lt * 7) * Math.sin(lt * 2.3);
    circ(c, wx, wy, 30 + pr * 6, `rgba(120,160,230,${0.25 + 0.15 * pr})`);
    if (lt > 3.2) { c.strokeStyle = '#F39C12'; c.lineWidth = 6; c.beginPath(); c.arc(wx, wy, 52, 0, 7); c.stroke(); c.beginPath(); c.moveTo(wx - 10, wy + 52); c.lineTo(wx - 30, wy + 120); c.stroke(); }
    night(c, .35, [{ x: 540, y: 1450, r: 500, a: .6 }]);
    snow(c, lt + 5, 70, .5);
  },
});
// 2. POKÓJ — pukanie
scene({
  name: 'bed', start: 11, end: 19,
  cam: lt => ({ z: 1.0 + lt * 0.012 }),
  labels: [[4.6, 8, 'NIKT NIE DZWONIŁ\nDOMOFONEM', 540, 330, 'red', 44], [0.4, 2.6, 'PUK. PUK. PUK.', 300, 820, 'dark', 40]],
  draw(c, lt) {
    ROOM(c);
    // drzwi pokoju po lewej
    fillRR(c, 40, 560, 220, 830, 4, '#4A3A2C'); circ(c, 230, 990, 10, '#BFC3C8');
    const sit = lt > 1.0;
    person(c, 'ola', 450, sit ? 1300 : 1330, 1.9, { t: lt, phone: 1, aR: 0.9, look: lt > 1 ? -1 : 0.3, wide: lt > .5, mouth: lt > .6 ? 'o' : null, squash: sit ? 1 : .92 });
    fillRR(c, 80, 1250, 760, 200, 30, '#4A5A8A'); // kołdra
    night(c, .72, [{ x: 560, y: 1080, r: 420, a: .95, tint: 'rgba(120,170,255,.12)' }, { x: 780, y: 560, r: 260, a: .5 }]);
  },
});
// 3. PRZEDPOKÓJ — podchodzi do drzwi
scene({
  name: 'hall', start: 19, end: 27,
  cam: lt => ({ z: 1.0 + lt * 0.015 }),
  draw(c, lt) {
    hallBg(c, lt);
    const x = mv(lt, 0.2, 4.5, 980, 660);
    person(c, 'ola', x, 1500, 2.15, { t: lt, phone: 1, aR: 0.9, walk: lt > .2 && lt < 4.5 ? lt * 4 : null, look: -1, wide: true });
    night(c, .78, [{ x: x + 70, y: 1180, r: 520, a: .95, tint: 'rgba(120,170,255,.10)' }, { x: 540, y: 1425, r: 300, a: .7 }]);
  },
});
// 4. WIZJER — czarno
scene({
  name: 'peep1', start: 27, end: 33,
  cam: lt => ({ z: 1.0 + lt * 0.02 }),
  labels: [[1.2, 6, 'CZARNO', 540, 300, 'dark', 48], [3.7, 6, 'ZAKLEJONY OD ZEWNĄTRZ', 540, 1440, 'red', 44]],
  draw(c, lt) {
    peepPOV(c, lt, (cc, cx, cy, r) => tapeTexture(cc, cx, cy, r));
  },
});
// 5. "KTO TAM?" — błąd 1
scene({
  name: 'ask', start: 33, end: 41,
  cam: lt => ({ z: 1.08 - lt * 0.005 }),
  bubbles: [[0.6, 2.4, 'Kto tam?', 380, 900, 600, 1020, 'ola']],
  draw(c, lt, sc) {
    hallBg(c, lt);
    person(c, 'ola', 640, 1500, 2.15, { t: lt, phone: 1, aR: 0.9, look: -1, talk: talking(sc, 'ola', lt), wide: true });
    night(c, .78, [{ x: 710, y: 1180, r: 520, a: .95, tint: 'rgba(120,170,255,.10)' }, { x: 540, y: 1425, r: 300, a: .7 }]);
  },
  post(c, lt) { if (lt > 2.4) card(c, 70, 1150, 860, 'BŁĄD 1', 'odezwała się — teraz wiedzą,\nże ktoś jest w domu', lt - 2.4, '#F39C12', 44); },
});
// 6. PŁACZ za drzwiami
scene({
  name: 'cry', start: 41, end: 53,
  cam: lt => ({ z: 1.0 + lt * 0.012 }),
  labels: [[0.4, 3.0, 'ZA DRZWIAMI: PŁACZ', 540, 300, 'dark', 42]],
  bubbles: [[2.6, 7.0, 'Proszę… otwórz…\nOn za mną idzie…', 400, 840, 520, 960, 'kobieta']],
  draw(c, lt) {
    hallBg(c, lt);
    const reach = mv(lt, 8.0, 10.5, 0.14, 1.75);
    const x = mv(lt, 7.6, 9.0, 660, 600);
    person(c, 'ola', x, 1500, 2.15, { t: lt, phone: 1, aR: 0.9, aL: reach, look: -1, wide: true, mouth: 'o' });
    night(c, .78, [{ x: x + 70, y: 1180, r: 520, a: .95, tint: 'rgba(120,170,255,.10)' }, { x: 540, y: 1425, r: 300, a: .7 }]);
  },
});
// 7. ŁAŃCUCH — błąd 2, ręka w rękawiczce
scene({
  name: 'chain', start: 53, end: 63,
  cam: lt => { const sl = lt > 9.2 && lt < 9.6 ? 14 : 0; return { z: 1.05 + lt * 0.01, x: Math.sin(lt * 80) * sl }; },
  draw(c, lt) {
    const gap = lt < 9.2 ? mv(lt, 0.0, 0.8, 0, 110) : mv(lt, 9.2, 9.4, 110, 0);
    hallBg(c, lt, gap > 2 ? { gap, rattle: lt < 1.4 ? 3 : 0 } : {});
    // ręka w rękawiczce
    if (lt > 5.8 && lt < 9.25) {
      const p = eio(prog(lt, 5.8, 8.8));
      const gx = 330 + 420 - gap, cy = 520 + 900 * 0.42;
      c.save(); c.beginPath(); c.rect(0, 0, gx + gap, H); c.clip();
      c.translate(gx + gap + 40 - p * 200, cy - 70 + p * 40); c.rotate(-0.25);
      fillRR(c, 0, -26, 300, 52, 22, '#16171B');
      fillRR(c, -70, -32, 90, 64, 26, '#0D0E10');
      for (let i = 0; i < 4; i++) fillRR(c, -110 + (i % 2) * 6, -30 + i * 16, 60, 14, 7, '#0D0E10');
      c.restore();
    }
    person(c, 'ola', 860, 1500, 2.15, { t: lt, phone: 1, aR: 0.9, aL: lt < 9 ? 1.5 : 0.4, look: -1, wide: true, mouth: lt > 6 ? 'o' : null });
    night(c, .8, [{ x: 760, y: 1000, r: 420, a: .9, tint: 'rgba(120,170,255,.10)' }]);
  },
  post(c, lt) { if (lt > 1.3 && lt < 5.6) card(c, 70, 330, 860, 'BŁĄD 2', 'otworzyła na łańcuch — łańcuch\nnie zatrzyma dorosłego', lt - 1.3, '#F39C12', 44); },
});
// 8. PRZEKRÓJ — przynęta
scene({
  name: 'bait', start: 63, end: 73,
  cam: lt => ({ z: 1.0 + lt * 0.006 }),
  labels: [[1.0, 10, 'PRZYNĘTA', 760, 760, 'red', 42], [4.6, 10, 'CZEKAŁ PIĘTRO WYŻEJ', 260, 470, 'red', 36]],
  draw(c, lt) {
    c.fillStyle = '#9C9A8C'; c.fillRect(0, 0, W, 1060);
    c.fillStyle = '#3E5A47'; c.fillRect(0, 1050, W, 350);
    for (let r = 0; r < 8; r++) for (let q = 0; q < 14; q++) { c.fillStyle = (r + q) % 2 ? '#3A3530' : '#2C2824'; c.fillRect(q * 80 - (r % 2) * 40, 1400 + r * 70, 80, 70); }
    stairsUp(c, 420, 1400, 11, 38);
    paddedDoor(c, 640, 560, 330, 840, '94');
    // taśma na wizjerze od zewnątrz
    c.save(); c.translate(805, 812); c.rotate(.2); fillRR(c, -34, -12, 68, 24, 3, '#2B2B2B'); c.restore();
    // kobieta przy ścianie, poza zasięgiem wizjera
    person(c, 'kobieta', 540, 1470, 2.0, { t: lt, look: 1, mouth: lt > 7.2 ? 'smile' : null });
    // kaptur na półpiętrze
    person(c, 'kaptur', 170, 1080, 1.75, { t: lt, look: 1, glow: lt > 4.5 ? .6 : 0 });
    night(c, .5, [{ x: 540, y: 260, r: 700, a: .8 }]);
  },
});
// 9. 112
scene({
  name: 'call', start: 73, end: 83,
  cam: lt => ({ z: 1.0 + lt * 0.006 }),
  labels: [[0.6, 10, '112 · POŁĄCZENIE', 540, 300, 'dark', 42], [6.4, 10, 'POLICJA: 8 MINUT', 540, 390, 'yellow', 40]],
  draw(c, lt) {
    hallBg(c, lt);
    person(c, 'ola', 780, 1560, 2.0, { t: lt, phone: 2, aR: 2.5, look: -1, squash: .78, talk: lt > 4 && lt < 6.5 && Math.sin(lt * 3) > 0 });
    night(c, .82, [{ x: 780, y: 1050, r: 380, a: .95, tint: 'rgba(80,220,150,.10)' }, { x: 540, y: 1425, r: 300, a: .7 }]);
  },
  post(c, lt) { if (lt > 1.8) card(c, 70, 1180, 860, 'ZASADA', 'Ktoś w nocy prosi o pomoc? Nie otwieraj.\nZadzwoń na 112 i mów przez drzwi.', lt - 1.8, '#F39C12', 40); },
});
// 10. ZDZISIEK pamięta
scene({
  name: 'zdz', start: 83, end: 91,
  cam: lt => ({ z: 1.0 + lt * 0.01 }),
  labels: [[0.4, 8, '2 PIĘTRO · PAN ZDZISIEK', 540, 300, 'orange', 40], [4.0, 8, 'TYDZIEŃ TEMU · 7 PIĘTRO', 540, 420, 'dark', 38]],
  draw(c, lt) {
    c.fillStyle = '#2D2A33'; c.fillRect(0, 0, W, H); c.fillStyle = '#211B16'; c.fillRect(0, 1420, W, 500);
    paddedDoor(c, 120, 560, 360, 860, '22');
    person(c, 'zdzisiek', 700, 1500, 2.1, { t: lt, look: -1, squint: lt > 2 });
    night(c, .7, [{ x: 300, y: 830, r: 260, a: .8 }, { x: 700, y: 1000, r: 360, a: .5 }]);
    // wspomnienie
    const a = prog(lt, 4.0, 4.5);
    if (a > 0) {
      c.save(); c.globalAlpha = a; c.translate(560, 560); c.rotate(.03);
      c.shadowColor = 'rgba(0,0,0,.7)'; c.shadowBlur = 30; fillRR(c, 0, 0, 380, 470, 6, '#EDE6D6'); c.shadowColor = 'transparent';
      c.save(); c.beginPath(); c.rect(18, 18, 344, 380); c.clip(); c.translate(18, 18); c.scale(.32, .32); c.translate(-80, -380);
      corridorBg(c, lt, { open: true }); person(c, 'kobieta', 330, 1450, 2.1, { t: lt, look: 1 });
      c.restore();
      c.globalCompositeOperation = 'multiply'; c.fillStyle = '#C9A877'; c.fillRect(18, 18, 344, 380); c.globalCompositeOperation = 'source-over';
      txt(c, 'ta sama kobieta', 190, 432, 26, '#333', 700);
      c.restore();
    }
  },
});
// 11. CZEKANIE — cienie pod drzwiami, kartka
scene({
  name: 'wait', start: 91, end: 101,
  cam: lt => ({ z: 1.0 + lt * 0.012, y: -lt * 4 }),
  labels: [[0.4, 3.6, '5 MINUT… 6…', 540, 300, 'dark', 42]],
  draw(c, lt) {
    hallBg(c, lt, { feet: lt > 5.8 ? clamp((lt - 5.8) / 0.6) * .95 : 0 });
    // kartka wsuwana pod drzwi
    if (lt > 8.2) {
      const p = eout(prog(lt, 8.2, 9.4));
      c.save(); c.translate(560, 1440 + p * 120); c.rotate(-0.08 + p * 0.05); c.scale(1, .55);
      fillRR(c, -120, -60, 240, 150, 4, '#EDEAE0'); c.restore();
    }
    person(c, 'ola', 900, 1560, 2.0, { t: lt, phone: 2, aR: 1.0, look: -1, squash: .78, wide: lt > 5.8, mouth: lt > 6 ? 'o' : null });
    night(c, .84, [{ x: 900, y: 1150, r: 300, a: .9 }, { x: 540, y: 1430, r: 320, a: .8 }]);
  },
});
// 12. KARTKA
scene({
  name: 'note', start: 101, end: 105,
  cam: lt => ({ z: 1.0 + lt * 0.03 }),
  draw(c, lt) {
    c.fillStyle = '#1E1712'; c.fillRect(0, 0, W, H);
    for (let i = 0; i < 16; i++) { c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(0, i * 130, W, 4); }
    c.save(); c.translate(540, 950); c.rotate(-0.06);
    c.shadowColor = 'rgba(0,0,0,.7)'; c.shadowBlur = 40; fillRR(c, -400, -260, 800, 520, 6, '#EEEAE0'); c.shadowColor = 'transparent';
    c.strokeStyle = 'rgba(80,110,170,.25)'; c.lineWidth = 2; for (let i = 0; i < 9; i++) { c.beginPath(); c.moveTo(-400, -200 + i * 55); c.lineTo(400, -200 + i * 55); c.stroke(); }
    const words = ['WIEMY,', 'ŻE JESTEŚ', 'SAMA.'];
    words.forEach((w, i) => { c.save(); c.translate(0, -110 + i * 120); c.rotate((hash(i + 3) - .5) * .08); txt(c, w, 0, 0, 104, '#141414', 900); c.restore(); });
    c.restore();
    night(c, .6, [{ x: 560, y: 950, r: 620, a: .95, tint: 'rgba(120,170,255,.08)' }]);
  },
});
// 13. WIZJER — ktoś odkleja taśmę
scene({
  name: 'peep2', start: 105, end: 112,
  cam: lt => { const sh = lt > 4.6 && lt < 5.2 ? (5.2 - lt) * 24 : 0; return { z: 1.0 + lt * 0.015 + (lt > 4.6 ? .08 : 0), x: Math.sin(lt * 80) * sh }; },
  draw(c, lt) {
    peepPOV(c, lt, (cc, cx, cy, r) => {
      // klatka za drzwiami w rybim oku
      const lit = prog(lt, 1.4, 4.4);
      cc.fillStyle = '#A9A595'; cc.fillRect(cx - r, cy - r, 2 * r, 2 * r);
      cc.fillStyle = '#3E5A47'; cc.fillRect(cx - r, cy + 60, 2 * r, r);
      if (lt > 4.6) { // twarz tuż przy wizjerze
        cc.save(); cc.translate(cx, cy + 1080);
        person(cc, 'kaptur', 0, 0, 4.6, { t: lt, glow: 1, look: 0 });
        cc.restore();
      }
      // taśma odklejana od dołu do góry
      cc.save(); cc.beginPath(); cc.rect(cx - r, cy - r, 2 * r, 2 * r * (1 - eio(lit))); cc.clip(); tapeTexture(cc, cx, cy, r); cc.restore();
      if (lit > 0 && lit < 1) { const ey = cy - r + 2 * r * (1 - eio(lit)); cc.fillStyle = 'rgba(255,255,255,.25)'; cc.fillRect(cx - r, ey - 4, 2 * r, 8); }
    });
    if (lt > 4.6 && lt < 4.75) { c.fillStyle = 'rgba(255,255,255,.7)'; c.fillRect(0, 0, W, H); }
  },
});
// 14. KONIEC
scene({
  name: 'end', start: 112, end: 117,
  labels: [[2.6, 5, 'CZĘŚĆ 2 ↓', 540, 1380, 'red', 56]],
  draw(c, lt) {
    c.fillStyle = '#000'; c.fillRect(0, 0, W, H);
    const a = 1 - prog(lt, 0.0, 1.2);
    if (a > 0) { c.save(); c.globalAlpha = a; peepPOV(c, lt, (cc, cx, cy, r) => { cc.fillStyle = '#A9A595'; cc.fillRect(cx - r, cy - r, 2 * r, 2 * r); cc.save(); cc.translate(cx, cy + 1080); person(cc, 'kaptur', 0, 0, 4.6, { t: lt, glow: 1 }); cc.restore(); }); c.restore(); }
    if (lt > 1.4) { const b = prog(lt, 1.4, 2.0); c.save(); c.globalAlpha = b; txt(c, 'Wiem, że patrzysz.', 540, 940, 64, '#E6E6E6', 700); c.restore(); }
  },
});
