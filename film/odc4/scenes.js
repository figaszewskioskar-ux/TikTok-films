// BLOK 94 · „KTO TAM?” CZĘŚĆ 3 — wyłączony bezpiecznik, ciemny korytarz, klucze z numerem mieszkania.
window.EP = {
  badge: 'BLOK 94 · ODCINEK 4',
  loop: true,
  vignette: .78,
  cues(add) {
    add(0.3, 'stab');
    add(12.2, 'notif'); add(19.6, 'send'); add(22.4, 'error'); add(25.4, 'notif');
    add(36.0, 'poweroff'); add(47.0, 'breaker');
    add(56.6, 'doorlock'); add(58.6, 'error');
    add(62.6, 'boxopen'); add(66.0, 'timer'); add(68.2, 'boom');
    add(73.6, 'slam');
    add(80.4, 'notif'); add(84.6, 'boom');
  },
};

const S = [];
function scene(o) { S.push(o); return o; }
function talking(sc, who, lt) {
  return (sc.bubbles || []).some(b => b[7] === who && lt >= b[0] && lt < b[0] + Math.min(b[1] - b[0] - .2, .055 * b[2].length + .3));
}
function bigPhone(c, fn, a = 1, y = 300) {
  c.save(); c.globalAlpha *= a;
  const x = 230, w = 620, h = 1180;
  c.shadowColor = 'rgba(0,0,0,.7)'; c.shadowBlur = 50; fillRR(c, x, y, w, h, 70, '#0E0F12'); c.shadowColor = 'transparent';
  c.save(); rr(c, x + 22, y + 22, w - 44, h - 44, 52); c.clip(); fn(c, x + 22, y + 22, w - 44, h - 44); c.restore();
  fillRR(c, x + w / 2 - 70, y + 36, 140, 30, 15, '#0E0F12');
  c.restore();
}
// czat z k4ptur_94; msgs: [od (s), pokaż od czasu, typ: 'txt'|'door'|'keys', tekst, prawa strona?]
function chat(c, lt, msgs) {
  bigPhone(c, (cc, x, y, w, h) => {
    cc.fillStyle = '#0F1014'; cc.fillRect(x, y, w, h);
    fillRR(cc, x, y, w, 170, 0, '#17181E');
    circ(cc, x + 90, y + 110, 40, '#2A2C33'); circ(cc, x + 90, y + 102, 14, '#55575F'); fillRR(cc, x + 68, y + 120, 44, 20, 10, '#55575F');
    txt(cc, 'k4ptur_94', x + 150, y + 100, 36, '#FFFFFF', 900, 'left'); txt(cc, 'aktywny(-a) teraz', x + 150, y + 140, 24, 'rgba(255,255,255,.55)', 600, 'left');
    let yy = y + 230;
    for (const [t0, type, text, mine] of msgs) {
      if (lt < t0) continue;
      const p = back(clamp((lt - t0) / .3));
      const bw = type === 'txt' ? Math.min(w - 120, 40 + text.length * 17) : 380, bh = type === 'txt' ? 96 : 420;
      const bx = mine ? x + w - 30 - bw : x + 30;
      cc.save(); cc.translate(bx + (mine ? bw : 0), yy); cc.scale(p, p); cc.translate(-(bx + (mine ? bw : 0)), -yy);
      if (type === 'txt') { fillRR(cc, bx, yy, bw, bh, 40, mine ? '#3B6FE0' : '#2A2C33'); txt(cc, text, bx + 28, yy + bh / 2, 30, '#FFFFFF', 600, 'left'); }
      else {
        fillRR(cc, bx, yy, bw, bh, 30, '#2A2C33');
        cc.save(); rr(cc, bx + 10, yy + 10, bw - 20, bh - 20, 24); cc.clip();
        if (type === 'door') {
          cc.fillStyle = '#8F8C80'; cc.fillRect(bx, yy, bw, bh);
          paddedDoor(cc, bx + 90, yy + 50, 200, 380, '94');
          fillRR(cc, bx + 250, yy + 230, 30, 40, 4, '#E8D27A'); // nowy zamek
        } else {
          cc.fillStyle = '#4A4844'; cc.fillRect(bx, yy, bw, bh);
          for (let i = 0; i < 40; i++) circ(cc, bx + hash(i) * bw, yy + hash(i + 9) * bh, 2 + hash(i + 3) * 3, 'rgba(0,0,0,.25)');
          cc.save(); cc.translate(bx + bw / 2, yy + bh / 2); cc.rotate(-.4);
          cc.strokeStyle = '#D6DADF'; cc.lineWidth = 8; cc.beginPath(); cc.arc(-40, 0, 34, 0, 7); cc.stroke();
          fillRR(cc, -6, -10, 130, 20, 6, '#CFD3D8'); fillRR(cc, 90, 10, 14, 20, 3, '#CFD3D8'); fillRR(cc, 60, 10, 14, 16, 3, '#CFD3D8');
          cc.rotate(.9); fillRR(cc, -110, -40, 70, 90, 12, '#F39C12'); txt(cc, '94', -75, 5, 40, '#14161B', 900); cc.restore();
        }
        cc.restore();
      }
      cc.restore();
      yy += bh + 26;
      if (mine && lt > t0 + 1.2) { txt(cc, 'Wyświetlono', x + w - 40, yy - 8, 22, 'rgba(255,255,255,.45)', 600, 'right'); yy += 20; }
    }
    fillRR(cc, x + 30, y + h - 120, w - 60, 80, 40, '#1C1D23'); txt(cc, 'Wiadomość…', x + 80, y + h - 80, 28, 'rgba(255,255,255,.4)', 600, 'left');
  });
}
// korytarz przed drzwiami 94 ze skrzynką liczników
function meterCorridor(c, t, o = {}) {
  c.fillStyle = '#9C9A8C'; c.fillRect(0, 0, W, 1060); c.fillStyle = '#3E5A47'; c.fillRect(0, 1050, W, 350);
  for (let r = 0; r < 8; r++) for (let q = 0; q < 14; q++) { c.fillStyle = (r + q) % 2 ? '#3A3530' : '#2C2824'; c.fillRect(q * 80 - (r % 2) * 40, 1400 + r * 70, 80, 70); }
  stairsUp(c, 360, 1400, 11, 36);
  paddedDoor(c, 660, 560, 330, 840, '94', { peepDark: true });
  // skrzynka
  const bx = 400, by = 640, bw = 220, bh = 300;
  fillRR(c, bx, by, bw, bh, 6, '#7D838A'); fillRR(c, bx + 10, by + 10, bw - 20, bh - 20, 4, '#2A2D33');
  for (let i = 0; i < 4; i++) {
    const yy = by + 40 + i * 62, off = o.off && i === 3;
    txt(c, String(91 + i), bx + 50, yy + 18, 24, '#DDE1E6', 800);
    fillRR(c, bx + 100, yy, 90, 36, 6, '#CFD3D8'); fillRR(c, bx + (off ? 106 : 150), yy + 4, 34, 28, 5, off ? '#D7263D' : '#30A46C');
  }
  if (o.doorOpen) { c.fillStyle = '#868C93'; c.beginPath(); c.moveTo(bx, by); c.lineTo(bx - 120 * o.doorOpen, by + 30); c.lineTo(bx - 120 * o.doorOpen, by + bh - 30); c.lineTo(bx, by + bh); c.fill(); }
  else { c.fillStyle = 'rgba(125,131,138,.9)'; c.fillRect(bx, by, bw, bh); circ(c, bx + bw - 24, by + bh / 2, 8, '#2A2D33'); }
  // lampa na klatce
  fillRR(c, 420, 230, 240, 22, 11, o.lamp ? '#F4F1E2' : '#555');
}

// 0. HAK
scene({
  name: 'hook', start: 0, end: 6,
  cam: lt => ({ z: 1.04 + lt * 0.012 }),
  draw(c, lt) {
    hallBg(c, lt);
    person(c, 'ola', 760, 1500, 2.15, { t: lt, phone: 1, aR: 1.3, look: -1, wide: true, mouth: 'o' });
    night(c, .93, [{ x: 600, y: 1000, r: 380, a: .9, tint: 'rgba(200,220,255,.10)' }, { x: 540, y: 1425, r: 260, a: .8 }]);
    const sp = prog(lt, 0.15, 0.4), shake = lt < 1 ? (1 - lt) * 9 : 0;
    if (sp > 0) {
      c.save(); c.translate(540 + Math.sin(lt * 70) * shake, 390); const s = back(sp); c.scale(s, s); c.rotate(-0.02);
      c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 30; c.shadowOffsetY = 10;
      fillRR(c, -450, -120, 900, 240, 24, '#D7263D'); c.shadowColor = 'transparent';
      c.strokeStyle = 'rgba(255,255,255,.35)'; c.lineWidth = 4; rr(c, -436, -106, 872, 212, 16); c.stroke();
      txt(c, 'NIE WYCHODŹ', 0, -44, 92, '#FFFFFF', 900); txt(c, 'DO LICZNIKA!', 0, 54, 92, '#FFFFFF', 900);
      c.restore();
    }
  },
});
// 1. PRZYPOMNIENIE
scene({
  name: 'recap', start: 6, end: 12,
  labels: [[0.2, 6, 'ODCINEK 4', 540, 1650, 'yellow', 48]],
  draw(c, lt) { c.fillStyle = '#0B0C10'; c.fillRect(0, 0, W, H); chat(c, lt + 10, [[0, 'txt', 'ładny widok z dziewiątego.'], [0, 'txt', 'dobranoc, Ola.']]); },
});
// 2. ZDJĘCIE DRZWI — Ola odpisuje
scene({
  name: 'photo', start: 12, end: 22,
  labels: [[0.3, 4, 'NASTĘPNY WIECZÓR', 540, 200 + 60, 'dark', 40]],
  draw(c, lt) {
    c.fillStyle = '#0B0C10'; c.fillRect(0, 0, W, H);
    chat(c, lt, [[0.2, 'door'], [2.2, 'txt', 'nowy zamek? szkoda.'], [7.4, 'txt', 'kim jesteś?? zostaw mnie', true]]);
  },
});
// 3. BŁĄD 1
scene({
  name: 'err1', start: 22, end: 28,
  draw(c, lt) {
    c.fillStyle = '#0B0C10'; c.fillRect(0, 0, W, H);
    chat(c, lt + 20, [[0, 'txt', 'nowy zamek? szkoda.'], [0, 'txt', 'kim jesteś?? zostaw mnie', true], [23.4, 'txt', 'boisz się. to dobrze.']]);
  },
  post(c, lt) { if (lt > 0.3) card(c, 70, 1530, 860, 'BŁĄD 1', 'odpisała — teraz wie, że czyta\ni że się boi', lt - 0.3, '#F39C12', 40); },
});
// 4. KUBA W SŁUCHAWKACH
scene({
  name: 'kuba', start: 28, end: 35,
  labels: [[0.6, 7, 'KUBA · W SŁUCHAWKACH', 540, 300, 'orange', 40]],
  draw(c, lt) {
    c.fillStyle = '#262B3D'; c.fillRect(0, 0, W, H); c.fillStyle = '#1F1A22'; c.fillRect(0, 1380, W, 540);
    fillRR(c, 520, 1100, 520, 30, 6, '#4A3A2C'); fillRR(c, 560, 1130, 24, 260, 4, '#3A2C20'); fillRR(c, 980, 1130, 24, 260, 4, '#3A2C20');
    fillRR(c, 640, 760, 360, 240, 10, '#111'); const fl = .5 + .5 * Math.sin(lt * 13);
    fillRR(c, 652, 772, 336, 216, 6, `rgb(${40 + fl * 60},${80 + fl * 60},${160 + fl * 60})`); fillRR(c, 800, 1000, 40, 100, 4, '#111');
    person(c, 'kuba', 760, 1440, 2.0, { t: lt, headphones: true, look: 1, aL: 1.2, aR: 1.2, squash: .9 });
    person(c, 'ola', 220, 1500, 2.1, { t: lt, phone: 1, aR: .9, look: 1 });
    night(c, .7, [{ x: 820, y: 880, r: 520, a: .95, tint: 'rgba(80,140,255,.15)' }, { x: 260, y: 1150, r: 300, a: .7 }]);
  },
});
// 5. PRĄD GAŚNIE
scene({
  name: 'outage', start: 35, end: 43,
  labels: [[3.0, 8, 'PRĄD ZGASŁ TYLKO W 94', 540, 300, 'red', 44]],
  draw(c, lt) {
    hallBg(c, lt);
    person(c, 'ola', 820, 1500, 2.15, { t: lt, phone: lt > 2.0 ? 1 : 0, aR: lt > 2 ? 1.3 : .14, look: -1, wide: lt > 1, mouth: lt > 1 ? 'o' : null });
    if (lt < 1.0) night(c, .55, [{ x: 540, y: 600, r: 900, a: .8 }]);
    else if (lt < 2.0) night(c, .97, [{ x: 540, y: 1425, r: 260, a: .85 }]);
    else night(c, .95, [{ x: 640, y: 1000, r: 380, a: .9, tint: 'rgba(200,220,255,.10)' }, { x: 540, y: 1425, r: 260, a: .85 }]);
  },
});
// 6. SKRZYNKA NA KORYTARZU
scene({
  name: 'box', start: 43, end: 52,
  labels: [[0.5, 9, 'LICZNIKI NA KORYTARZU', 540, 300, 'dark', 40], [4.2, 9, 'BEZPIECZNIK 94: WYŁĄCZONY', 540, 1560, 'red', 40]],
  draw(c, lt) {
    meterCorridor(c, lt, { doorOpen: 1, off: lt > 3.9, lamp: true });
    if (lt > 2.4 && lt < 5.0) { // ręka w rękawiczce
      const p = eio(prog(lt, 2.4, 3.9));
      c.save(); c.translate(lerp(-60, 560, p), lerp(1100, 862, p)); c.rotate(-.35);
      fillRR(c, -420, -26, 420, 52, 22, '#16171B'); fillRR(c, -10, -32, 80, 64, 26, '#0D0E10'); c.restore();
    }
    night(c, .35, [{ x: 540, y: 260, r: 800, a: .8 }]);
  },
});
// 7. KUBA WYCHODZI — błąd 2
scene({
  name: 'kubaout', start: 52, end: 62,
  bubbles: [[1.4, 4.4, 'Pewnie korki wywaliło.\nZaraz włączę.', 360, 840, 560, 1010, 'kuba']],
  draw(c, lt, sc) {
    const open = lt > 4.6 ? clamp((lt - 4.6) / .6) * 150 : 0;
    hallBg(c, lt, open > 2 ? { gap: open } : {});
    const kx = lt < 4.6 ? mv(lt, 0, 1.4, 1100, 560) : mv(lt, 5.0, 6.4, 560, 560);
    person(c, 'kuba', kx, 1500, 2.1, { t: lt, phone: 1, aR: 1.2, look: -1, headphones: lt < .6, talk: talking(sc, 'kuba', lt), walk: (lt < 1.4) || (lt > 5 && lt < 6.4) ? lt * 5 : null, alpha: 1 - prog(lt, 6.2, 6.6) });
    person(c, 'ola', 900, 1500, 2.15, { t: lt, phone: 1, aR: 1.3, look: -1, wide: true, mouth: 'o' });
    night(c, .93, [{ x: kx + 70, y: 1000, r: 360, a: .9 }, { x: 940, y: 1050, r: 240, a: .7 }, { x: 540, y: 1425, r: 260, a: .8 }, { x: 570, y: 950, r: open * 3, a: .7 }]);
  },
  post(c, lt) { if (lt > 6.6) card(c, 70, 330, 860, 'BŁĄD 2', 'wyszedł w nocy na korytarz,\nbo „prąd zgasł”', lt - 6.6, '#F39C12', 44); },
});
// 8. CIEMNY KORYTARZ — ktoś na schodach
scene({
  name: 'corridor', start: 62, end: 72,
  cam: lt => ({ z: 1.0 + lt * 0.012 }),
  labels: [[6.0, 10, 'DWA STOPNIE WYŻEJ', 330, 480, 'red', 38]],
  draw(c, lt) {
    const lamp = lt < 4.0;
    meterCorridor(c, lt, { doorOpen: clamp((lt - .5) / .6), off: lt < 2.6, lamp });
    person(c, 'kaptur', 190, 1150, 1.8, { t: lt, look: 1, glow: lt > 5.8 ? 1 : 0, alpha: lt > 4.2 ? 1 : 0 });
    person(c, 'kuba', 560, 1480, 2.1, { t: lt, phone: 1, aR: 1.6, aL: lt > 1.8 && lt < 2.8 ? 1.9 : .14, look: 1, back: false });
    if (lamp) night(c, .35, [{ x: 540, y: 260, r: 800, a: .8 }]);
    else night(c, .96, [{ x: 640, y: 900, r: 330, a: .9, tint: 'rgba(200,220,255,.10)' }, { x: 190, y: 760, r: 230, a: lt > 5.8 ? .55 : .15 }]);
  },
  post(c, lt) { // świecące oczy ponad ciemnością
    if (lt < 5.8) return;
    const z = 1.0 + lt * 0.012, a = clamp((lt - 5.8) / .4) * (0.85 + 0.15 * Math.sin(lt * 6));
    const P = (x, y) => [(x - 540) * z + 540, (y - 960) * z + 960];
    for (const dx of [-16, 16]) {
      const [x, y] = P(190 + dx * 1.8, 1150 - 238 * 1.8);
      c.save(); c.globalAlpha = a; c.shadowColor = 'rgba(255,255,255,.95)'; c.shadowBlur = 30;
      ell(c, x, y, 18 * z, 11 * z, '#F4F1EA'); c.restore(); c.save(); c.globalAlpha = a; circ(c, x + 2, y, 7 * z, '#111'); c.restore();
    }
  },
});
// 9. UCIECZKA DO ŚRODKA + ZASADA
scene({
  name: 'rule', start: 72, end: 79,
  cam: lt => { const sl = lt > 1.6 && lt < 2.0 ? 16 : 0; return { z: 1.03, x: Math.sin(lt * 80) * sl }; },
  bubbles: [[0.2, 1.8, 'Kuba! Wracaj!', 520, 860, 900, 1010, 'ola']],
  draw(c, lt, sc) {
    const gap = lt < 1.6 ? 150 : mv(lt, 1.6, 1.8, 150, 0);
    hallBg(c, lt, gap > 2 ? { gap } : {});
    const kx = mv(lt, .6, 1.6, 600, 500);
    person(c, 'kuba', kx, 1500, 2.1, { t: lt, phone: 1, aR: 1.2, look: 1, walk: lt > .6 && lt < 1.6 ? lt * 14 : null, wide: true, mouth: 'o', alpha: clamp((lt - .5) / .3) });
    person(c, 'ola', 900, 1500, 2.15, { t: lt, phone: 1, aR: 1.3, look: -1, wide: true, talk: talking(sc, 'ola', lt) });
    night(c, .93, [{ x: kx + 70, y: 1000, r: 360, a: .9 }, { x: 940, y: 1050, r: 260, a: .7 }]);
  },
  post(c, lt) { if (lt > 2.6) card(c, 70, 330, 860, 'ZASADA', 'Prąd w nocy zgasł tylko u ciebie?\nNie wychodź. Dzwoń na 112.', lt - 2.6, '#F39C12', 42); },
});
// 10. KLUCZE
scene({
  name: 'end', start: 79, end: 89,
  labels: [[8.0, 10, 'ODCINEK 5 ↓', 540, 1650, 'red', 56]],
  draw(c, lt) {
    c.fillStyle = '#0B0C10'; c.fillRect(0, 0, W, H);
    chat(c, lt, [[1.4, 'keys'], [5.0, 'txt', 'zgubiłeś coś, Kuba?']]);
    if (lt > 6.4 && lt < 6.55) { c.fillStyle = 'rgba(255,255,255,.4)'; c.fillRect(0, 0, W, H); }
  },
});
