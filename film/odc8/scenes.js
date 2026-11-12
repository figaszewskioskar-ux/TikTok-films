// BLOK 94 · „KTO TAM?” CZĘŚĆ 7 — oczy w szafie to kamera; konto Kuby z hasłem „kuba94”.
window.EP = {
  badge: 'BLOK 94 · ODC. 8',
  loop: true,
  vignette: .8,
  cues(add) {
    add(0.3, 'stab'); add(15.6, 'error'); add(18.4, 'creak');
    add(20.6, 'slam'); add(30.4, 'creak'); add(32.6, 'hit');
    add(40.0, 'notif'); add(42.6, 'boom'); add(52.4, 'error');
    add(60.0, 'boom'); add(68.4, 'notif'); add(72.6, 'hit');
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
function talking(sc, who, lt) { return (sc.bubbles || []).some(b => b[7] === who && lt >= b[0] && lt < b[0] + Math.min(b[1] - b[0] - .2, .055 * b[2].length + .3)); }
// szafa w pokoju Oli; o.gap – szpara, o.eyes – świecące punkty, o.open – otwarta (kamera na półce)
function wardrobe(c, lt, o = {}) {
  fillRR(c, 200, 300, 620, 1120, 10, '#4B3A2C'); c.fillStyle = '#3A2C20'; c.fillRect(506, 300, 8, 1120);
  if (o.open) {
    c.fillStyle = '#120E0B'; c.fillRect(214, 314, 592, 1092);
    fillRR(c, 214, 700, 592, 16, 2, '#5A4632');
    for (let i = 0; i < 5; i++) fillRR(c, 260 + i * 100, 330, 70, 340, 20, ['#E9B52C', '#5C7DB5', '#7B4FC9', '#D9DCE6', '#30A46C'][i]);
    // kamera
    fillRR(c, 470, 640, 90, 60, 10, '#1A1C21'); circ(c, 515, 670, 20, '#0A0B0E'); circ(c, 515, 670, 10, '#2A3A5A');
    const blink = Math.floor(lt * 2) % 2 ? 1 : .4;
    c.save(); c.shadowColor = '#ff3b30'; c.shadowBlur = 20 * blink; circ(c, 488, 652, 6, `rgba(255,59,48,${blink})`); circ(c, 542, 652, 6, `rgba(255,255,255,${blink})`); c.restore();
  } else {
    const gap = o.gap || 4;
    c.fillStyle = '#020203'; c.fillRect(510, 320, gap, 1080);
    fillRR(c, 470, 820, 14, 70, 6, '#C9CDD2'); fillRR(c, 536 + gap, 820, 14, 70, 6, '#C9CDD2');
    if (o.eyes) { c.save(); c.globalAlpha = o.eyes; c.shadowColor = '#fff'; c.shadowBlur = 24; ell(c, 518, 670, 11, 11, '#FF5A4E'); ell(c, 518 + Math.max(14, gap * .6), 670, 11, 11, '#F4F1EA'); c.restore(); }
  }
}
function roomBg(c) { c.fillStyle = '#262B3D'; c.fillRect(0, 0, W, H); c.fillStyle = '#1F1A22'; c.fillRect(0, 1420, W, 500);
  for (let i = 0; i < 18; i++) { c.fillStyle = 'rgba(255,255,255,.025)'; c.fillRect(i * 64, 0, 26, 1420); }
  fillRR(c, 0, 1396, W, 28, 0, '#171319');
  // plakat i półka nad łóżkiem po prawej
  fillRR(c, 870, 360, 170, 230, 6, '#E9B52C'); fillRR(c, 880, 370, 150, 210, 4, '#7B4FC9'); circ(c, 955, 455, 38, '#F4C29C');
  fillRR(c, 860, 660, 200, 12, 3, '#5A4632'); for (let i = 0; i < 5; i++) fillRR(c, 872 + i * 34, 580 + hash(i) * 26, 26, 80 - hash(i) * 26, 3, ['#D7263D', '#1BB0A3', '#F5C542', '#5C7DB5', '#E8E4DA'][i]);
  // łóżko po prawej (za postaciami)
  fillRR(c, 840, 1180, 260, 250, 24, '#3D4A73'); fillRR(c, 850, 1150, 200, 70, 30, '#D9DCE6');
  // dywan
  ell(c, 520, 1640, 420, 90, '#3B2F4A'); ell(c, 520, 1640, 360, 70, '#4A3C5C');
}
function laptop(c, x, y, fn) {
  fillRR(c, x, y, 560, 360, 18, '#1B1D22'); c.save(); rr(c, x + 18, y + 18, 524, 300, 8); c.clip(); fn(c, x + 18, y + 18, 524, 300); c.restore();
  fillRR(c, x - 60, y + 360, 680, 30, 12, '#2B2E35'); circ(c, x + 280, y + 9, 4, '#111');
}

// 0. HAK
scene({
  name: 'hook', start: 0, end: 6,
  cam: lt => ({ z: 1.05 + lt * 0.02 }),
  draw(c, lt) { roomBg(c); wardrobe(c, lt, { gap: 60, eyes: 1 }); night(c, .85, [{ x: 540, y: 860, r: 520, a: .6 }]); bigSign(c, lt, 'COŚ NIE TAK?', 'WYJDŹ Z DOMU!'); },
});
// 1. PRZYPOMNIENIE
scene({
  name: 'recap', start: 6, end: 11,
  labels: [[0.2, 5, 'ODC. 8', 540, 1650, 'yellow', 48]],
  draw(c, lt) {
    ROOM(c);
    c.save(); c.translate(780, 560); c.rotate(.06); fillRR(c, -86, -70, 172, 140, 4, '#F5E36A'); txt(c, 'DOBRANOC,', 0, -18, 28, '#222', 900); txt(c, 'SĄSIADKO', 0, 20, 28, '#222', 900); c.restore();
    night(c, .75, [{ x: 780, y: 560, r: 300, a: .9 }]);
  },
});
// 2. KUBA IDZIE SPRAWDZIĆ — błąd 1
scene({
  name: 'check', start: 11, end: 20,
  bubbles: [[5.2, 7.6, 'Kuba, nie!', 640, 860, 900, 1010, 'ola']],
  draw(c, lt, sc) {
    roomBg(c); wardrobe(c, lt, { gap: 60, eyes: lt < 4 ? 1 : .6 });
    const kx = mv(lt, 1.0, 5.0, 1000, 700);
    person(c, 'kuba', kx, 1500, 2.1, { t: lt, aR: 2.3, look: -1, walk: lt > 1 && lt < 5 ? lt * 3 : null, mouth: 'angry' });
    // lampka w ręce
    c.save(); c.translate(kx + 80, 1080); fillRR(c, -10, -40, 20, 80, 6, '#C9CDD2'); circ(c, 0, -50, 22, '#F5E9B0'); c.restore();
    person(c, 'ola', 980, 1500, 2.1, { t: lt, phone: 1, aR: .9, aL: lt > 5 ? 1.5 : .14, look: -1, wide: true, talk: talking(sc, 'ola', lt) });
    night(c, .82, [{ x: kx + 80, y: 1040, r: 380, a: .9, tint: 'rgba(255,240,190,.1)' }]);
  },
  post(c, lt) { if (lt > 4.4) card(c, 70, 330, 860, 'BŁĄD 1', 'chciał sam sprawdzić,\nkto jest w szafie', lt - 4.4, '#F39C12', 44); },
});
// 3. WYCHODZĄ — zasada 1
scene({
  name: 'leave', start: 20, end: 28,
  cam: lt => { const s = lt > .5 && lt < .9 ? 14 : 0; return { z: 1.02, x: Math.sin(lt * 80) * s }; },
  draw(c, lt) {
    lobbyBg(c, lt, { floor: '2' });
    person(c, 'ola', mv(lt, 0.4, 2.4, 120, 520), 1500, 2.0, { t: lt, phone: 2, aR: .9, walk: lt > .4 && lt < 2.4 ? lt * 10 : null, look: 1 });
    person(c, 'kuba', mv(lt, 0.6, 2.6, 0, 360), 1500, 2.0, { t: lt, walk: lt > .6 && lt < 2.6 ? lt * 10 : null, look: 1 });
    person(c, 'policjant', 820, 1500, 2.1, { t: lt, look: -1, aL: lt > 2.6 ? 1.2 : .14 });
    night(c, .4, [{ x: 540, y: 300, r: 900, a: .8 }]);
  },
  post(c, lt) { if (lt > 2.8) card(c, 70, 330, 860, 'ZASADA', 'Ktoś może być w domu? Nie sprawdzaj.\nWyjdź i dzwoń na 112 z bezpiecznego miejsca.', lt - 2.8, '#F39C12', 38); },
});
// 4. POLICJA OTWIERA SZAFĘ
scene({
  name: 'open', start: 28, end: 38,
  cam: lt => ({ z: 1.0 + (lt > 4.6 ? (lt - 4.6) * .05 : 0), y: lt > 4.6 ? -(lt - 4.6) * 30 : 0 }),
  labels: [[4.8, 10, 'KAMERA', 515, 560, 'red', 48]],
  draw(c, lt) {
    roomBg(c); const op = lt > 2.4;
    wardrobe(c, lt, op ? { open: true } : { gap: mv(lt, 0, 2.4, 60, 120), eyes: 1 });
    person(c, 'policjant', 960, 1500, 2.1, { t: lt, aL: 1.3, look: -1 });
    night(c, .8, [{ x: 600, y: 760, r: 460, a: .95, tint: 'rgba(255,250,210,.12)' }]);
    if (lt > 2.4 && lt < 2.55) { c.fillStyle = 'rgba(255,255,255,.4)'; c.fillRect(0, 0, W, H); }
  },
});
// 5. KONTO — „to twoje konto”
scene({
  name: 'account', start: 38, end: 48,
  bubbles: [[3.0, 5.6, 'Kuba… to twoje konto.', 420, 820, 300, 1010, 'policjant'], [5.8, 9.6, 'Moje? Nigdy tego\nnie instalowałem!', 640, 820, 860, 1010, 'kuba']],
  draw(c, lt, sc) {
    c.fillStyle = '#0B0C10'; c.fillRect(0, 0, W, H);
    bigPhone(c, (cc, x, y, w, h) => {
      cc.fillStyle = '#121318'; cc.fillRect(x, y, w, h);
      txt(cc, 'Kamera: „pokój”', x + 40, y + 120, 34, '#FFFFFF', 800, 'left');
      txt(cc, '● NA ŻYWO', x + 40, y + 170, 26, '#FF3B30', 800, 'left');
      fillRR(cc, x + 30, y + 210, w - 60, 330, 14, '#2A2F44'); txt(cc, '[obraz z kamery]', x + w / 2, y + 375, 26, '#7C8AA8', 700);
      txt(cc, 'Połączone konto:', x + 40, y + 620, 28, '#AEB0C2', 700, 'left');
      const a = clamp((lt - 1.4) / .4); cc.save(); cc.globalAlpha = a; fillRR(cc, x + 30, y + 650, w - 60, 90, 16, '#3A1218'); txt(cc, 'kuba94@…', x + w / 2, y + 697, 40, '#FF6B7A', 900); cc.restore();
    }, 1, 240);
    if (lt > 3) { person(c, 'policjant', 230, 1760, 1.5, { t: lt, talk: talking(sc, 'policjant', lt) }); person(c, 'kuba', 860, 1760, 1.5, { t: lt, wide: true, talk: talking(sc, 'kuba', lt) }); }
  },
});
// 6. HASŁO kuba94 — błąd 2
scene({
  name: 'pass', start: 48, end: 58,
  draw(c, lt) {
    c.fillStyle = '#0B0C10'; c.fillRect(0, 0, W, H);
    const sites = ['Poczta', 'Chmura ze zdjęciami', 'Gra online', 'Kalendarz rodziny', 'Konto społecznościowe'];
    sites.forEach((s, i) => {
      if (lt < 0.4 + i * .6) return; const a = clamp((lt - .4 - i * .6) / .3);
      c.save(); c.globalAlpha = a; const y = 360 + i * 220;
      fillRR(c, 120, y, 840, 180, 20, '#1B2034'); txt(c, s, 160, y + 50, 32, '#AEB0C2', 700, 'left');
      fillRR(c, 160, y + 82, 760, 70, 12, '#0D0F13'); txt(c, 'hasło:  kuba94', 190, y + 118, 40, '#FF3B30', 900, 'left');
      c.restore();
    });
  },
  post(c, lt) { if (lt > 4.2) card(c, 70, 1500, 860, 'BŁĄD 2', 'jedno hasło do wszystkiego: kuba94', lt - 4.2, '#F39C12', 44); },
});
// 7. WSZYSTKO SIĘ ŁĄCZY — zasada 2
scene({
  name: 'explain', start: 58, end: 66,
  draw(c, lt) {
    c.fillStyle = '#0B0C10'; c.fillRect(0, 0, W, H);
    const items = [['ZDJĘCIE KLUCZY Z „94”', 'z chmury'], ['RELACJA „SAMA NA CHACIE”', 'z konta'], ['RODZICE: NOCE PON–CZW', 'z kalendarza'], ['GDZIE JEST KUBA', 'z lokalizacji']];
    items.forEach((it, i) => { if (lt > 0.3 + i * .7) { label(c, it[0], 540, 380 + i * 200, 'red', 40, lt - .3 - i * .7, 9); txt(c, it[1], 540, 450 + i * 200, 28, '#AEB0C2', 700); } });
  },
  post(c, lt) { if (lt > 3.6) card(c, 70, 1260, 860, 'ZASADA', 'Inne hasło do każdego konta\ni weryfikacja dwuetapowa.', lt - 3.6, '#F39C12', 44); },
});
// 8. NOC — kamerka laptopa zapala się sama
scene({
  name: 'end', start: 66, end: 78,
  cam: lt => ({ z: 1.0 + lt * 0.03 }),
  labels: [[10.2, 12, 'ODC. 9 ↓', 540, 1650, 'red', 56]],
  draw(c, lt) {
    roomBg(c);
    fillRR(c, 160, 900, 760, 30, 6, '#4A3A2C');
    laptop(c, 260, 520, (cc, x, y, w, h) => {
      cc.fillStyle = '#E9ECF2'; cc.fillRect(x, y, w, h);
      txt(cc, 'Zmień hasło', x + 30, y + 40, 26, '#14161B', 800, 'left');
      fillRR(cc, x + 30, y + 70, w - 60, 50, 8, '#FFFFFF'); txt(cc, '•'.repeat(Math.min(14, Math.floor(lt * 4))), x + 44, y + 96, 26, '#14161B', 800, 'left');
      if (lt > 6.6) { const a = clamp((lt - 6.6) / .3); cc.save(); cc.globalAlpha = a; fillRR(cc, x + 40, y + 150, w - 80, 110, 14, '#1B1D22'); txt(cc, 'k4ptur_94:', x + 60, y + 185, 22, '#AEB0C2', 700, 'left'); txt(cc, 'za późno, kuba.', x + 60, y + 228, 34, '#FFFFFF', 800, 'left'); cc.restore(); }
    });
    // dioda kamerki
    if (lt > 4.4) { const b = .6 + .4 * Math.sin(lt * 8); c.save(); c.shadowColor = '#3BFF7A'; c.shadowBlur = 30; circ(c, 540, 529, 8, `rgba(59,255,122,${b})`); c.restore(); }
    person(c, 'kuba', 540, 1640, 2.0, { t: lt, back: lt < 4.4, wide: true, mouth: lt > 7 ? 'o' : null });
    night(c, .8, [{ x: 540, y: 700, r: 560, a: .95, tint: 'rgba(200,220,255,.12)' }]);
    if (lt > 4.4) label(c, 'KAMERKA WŁĄCZYŁA SIĘ SAMA', 540, 400, 'red', 38, lt - 4.4, 9);
  },
});
