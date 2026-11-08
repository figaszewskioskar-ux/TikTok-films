// BLOK 94 · „KTO TAM?” CZĘŚĆ 6 — balkon u Zdziśka był przynętą. Prawdziwy cel: pusty pokój Oli.
window.EP = {
  badge: 'BLOK 94 · CZĘŚĆ 6',
  loop: true,
  vignette: .8,
  cues(add) {
    add(0.3, 'stab'); add(19.4, 'error');
    add(20.4, 'knock'); add(24.0, 'knock');
    add(30.6, 'tap'); add(31.4, 'hit'); add(33.0, 'tap');
    add(38.6, 'doorlock'); add(40.0, 'dial');
    add(47.0, 'run'); add(50.6, 'error');
    add(55.0, 'siren'); add(60.4, 'boom');
    add(62.4, 'paper'); add(66.4, 'boom'); add(71.0, 'boom');
    add(77.0, 'creak'); add(80.6, 'hit');
  },
};
const S = [];
function scene(o) { S.push(o); return o; }
function bigSign(c, lt, l1, l2, y = 390) {
  const sp = prog(lt, 0.15, 0.4), shake = lt < 1 ? (1 - lt) * 9 : 0; if (sp <= 0) return;
  c.save(); c.translate(540 + Math.sin(lt * 70) * shake, y); const s = back(sp); c.scale(s, s); c.rotate(-0.02);
  c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 30; c.shadowOffsetY = 10;
  fillRR(c, -460, -120, 920, 240, 24, '#D7263D'); c.shadowColor = 'transparent';
  c.strokeStyle = 'rgba(255,255,255,.35)'; c.lineWidth = 4; rr(c, -446, -106, 892, 212, 16); c.stroke();
  txt(c, l1, 0, -44, 90, '#FFFFFF', 900); txt(c, l2, 0, 54, 90, '#FFFFFF', 900);
  c.restore();
}
// pokój Zdziśka: fotel, drzwi balkonowe z firanką
function zdzRoom(c, lt, o = {}) {
  c.fillStyle = '#3A3530'; c.fillRect(0, 0, W, H);
  for (let i = 0; i < 20; i++) { c.fillStyle = 'rgba(0,0,0,.07)'; c.fillRect(i * 58, 0, 20, 1420); }
  c.fillStyle = '#2A211A'; c.fillRect(0, 1420, W, 500);
  // drzwi balkonowe
  const bx = 560, by = 360, bw = 420, bh = 1060;
  fillRR(c, bx - 16, by - 16, bw + 32, bh + 16, 6, '#E6E1D6');
  const g = c.createLinearGradient(0, by, 0, by + bh); g.addColorStop(0, '#2C3A60'); g.addColorStop(1, '#46557A'); c.fillStyle = g; c.fillRect(bx, by, bw, bh);
  circ(c, bx + 320, by + 120, 30, '#E8E4CF'); circ(c, bx + 334, by + 110, 27, '#0A0E1C');
  c.fillStyle = '#D9D4C8'; c.fillRect(bx + bw / 2 - 6, by, 12, bh);
  if (o.open) { c.fillStyle = 'rgba(0,0,0,.55)'; c.fillRect(bx + bw / 2 + 6, by, 26, bh); }
  // firanka
  const sway = (o.sway || 0) * Math.sin(lt * 3);
  c.save(); c.globalAlpha = .55;
  for (let i = 0; i < 14; i++) { const x = bx + i * 32 + Math.sin(i * .9 + lt * 2) * 6 * (o.sway || 0) + sway * (i / 14) * 30; c.fillStyle = i % 2 ? '#EFEBE0' : '#E2DDCF'; c.fillRect(x, by, 30, bh); }
  c.restore();
  if (o.shadow) {
    c.save(); c.globalAlpha = .85 * o.shadow; c.translate(bx + bw * .7, by + bh - 20);
    c.fillStyle = '#05060A'; c.beginPath(); c.arc(0, -560, 120, 0, 7); c.fill(); fillRR(c, -150, -470, 300, 470, 70, '#05060A');
    c.restore();
    if (o.eyes) { c.save(); c.globalAlpha = o.eyes; c.shadowColor = '#fff'; c.shadowBlur = 24; ell(c, bx + bw * .7 - 40, by + bh - 580, 18, 11, '#F4F1EA'); ell(c, bx + bw * .7 + 40, by + bh - 580, 18, 11, '#F4F1EA'); c.restore(); }
  }
  // fotel i lampka
  fillRR(c, 80, 1080, 400, 360, 60, '#5A2E2A'); fillRR(c, 60, 1180, 80, 260, 30, '#4A2522'); fillRR(c, 420, 1180, 80, 260, 30, '#4A2522');
}
function bathroom(c) {
  c.fillStyle = '#B9C4C6'; c.fillRect(0, 0, W, H);
  for (let y = 0; y < 1420; y += 90) for (let x = 0; x < W; x += 90) { c.strokeStyle = 'rgba(0,0,0,.12)'; c.lineWidth = 3; c.strokeRect(x, y, 90, 90); }
  c.fillStyle = '#7C8A8C'; c.fillRect(0, 1420, W, 500);
  fillRR(c, 700, 860, 300, 560, 40, '#EEF2F2'); fillRR(c, 80, 600, 260, 330, 10, '#9FB0B4');
}

// 0. HAK
scene({
  name: 'hook', start: 0, end: 6,
  cam: lt => ({ z: 1.04 + lt * 0.015 }),
  draw(c, lt) {
    zdzRoom(c, lt, { shadow: .9, eyes: lt > 2.5 ? .9 : 0, sway: 1 });
    night(c, .5, [{ x: 770, y: 880, r: 620, a: .85 }]);
    bigSign(c, lt, 'ZAMKNIJ BALKON', 'NA NOC!');
  },
});
// 1. PRZYPOMNIENIE
scene({
  name: 'recap', start: 6, end: 11,
  labels: [[0.2, 5, 'CZĘŚĆ 6', 540, 1650, 'yellow', 48]],
  draw(c, lt) {
    c.fillStyle = '#6B6A60'; c.fillRect(0, 0, W, H);
    c.save(); c.translate(540, 860); c.rotate(-.03);
    c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 16; fillRR(c, -280, -350, 560, 700, 3, '#F2EEE4'); c.shadowColor = 'transparent';
    c.save(); c.beginPath(); c.rect(-270, -340, 540, 640); c.clip(); c.fillStyle = '#8F8C80'; c.fillRect(-280, -350, 560, 700); paddedDoor(c, -120, -310, 240, 560, '22'); c.restore();
    txt(c, 'SAM · DZIŚ 21:40', 0, 324, 26, '#C21E2E', 800); c.restore();
    night(c, .5, [{ x: 540, y: 860, r: 600, a: .95 }]);
  },
});
// 2. ZDZISIEK CZEKA — błąd 1
scene({
  name: 'zdz', start: 11, end: 20,
  labels: [[0.3, 5, '23:40 · 2 PIĘTRO', 540, 280, 'dark', 40]],
  draw(c, lt) {
    zdzRoom(c, lt, { open: lt > 3.2, sway: lt > 3.4 ? .4 : 0 });
    const zx = lt < 2.8 ? mv(lt, 0.4, 2.6, 280, 760) : lt < 4 ? 760 : mv(lt, 4, 6, 760, 280);
    person(c, 'zdzisiek', zx, lt > 6 ? 1360 : 1500, 2.0, { t: lt, aR: lt > 2.6 && lt < 4 ? 1.6 : .14, walk: (lt > .4 && lt < 2.6) || (lt > 4 && lt < 6) ? lt * 5 : null, squash: lt > 6 ? .82 : 1, look: lt > 6 ? 1 : 0 });
    night(c, .65, [{ x: 300, y: 1000, r: 420, a: .9, tint: 'rgba(255,210,140,.10)' }, { x: 770, y: 900, r: 380, a: .6 }]);
  },
  post(c, lt) { if (lt > 7.2) card(c, 70, 330, 860, 'BŁĄD 1', 'zostawił uchylony balkon na noc —\ndrugie piętro to nie dziewiąte', lt - 7.2, '#F39C12', 42); },
});
// 3. PUKANIE — Zdzisiek nie odpowiada
scene({
  name: 'knock', start: 20, end: 28,
  cam: lt => { const k = (lt > 0.4 && lt < 1.0) || (lt > 4.0 && lt < 4.6); return { z: 1.02, x: k ? Math.sin(lt * 90) * 9 : 0 }; },
  labels: [[0.4, 3, 'PUK. PUK. PUK.', 540, 300, 'dark', 48], [5.0, 8, 'NIE ODZYWA SIĘ. DOBRZE.', 540, 300, 'yellow', 40]],
  draw(c, lt) {
    c.fillStyle = '#2D2A33'; c.fillRect(0, 0, W, H); c.fillStyle = '#211B16'; c.fillRect(0, 1420, W, 500);
    paddedDoor(c, 120, 560, 380, 860, '22', { peepDark: true });
    person(c, 'zdzisiek', 760, 1500, 2.05, { t: lt, look: -1, squint: true });
    night(c, .78, [{ x: 310, y: 1425, r: 280, a: .8 }, { x: 760, y: 1000, r: 320, a: .55 }]);
  },
});
// 4. FIRANKA — ktoś na balkonie
scene({
  name: 'curtain', start: 28, end: 38,
  cam: lt => { const j = lt > 3.4 && lt < 3.9; return { z: 1.0 + lt * 0.02 + (lt > 3.4 ? .06 : 0), x: j ? Math.sin(lt * 90) * 14 : 0 }; },
  labels: [[4.2, 10, 'KTOŚ STOI NA BALKONIE', 540, 380, 'red', 44]],
  draw(c, lt) {
    zdzRoom(c, lt, { open: true, sway: lt > 1.2 ? 1 : .2, shadow: clamp((lt - 2.4) / 1.0), eyes: lt > 6 ? .9 : 0 });
    person(c, 'zdzisiek', 280, 1360, 2.0, { t: lt, squash: .82, look: 1, wide: lt > 3.4, mouth: lt > 3.4 ? 'o' : null });
    night(c, .6, [{ x: 300, y: 1000, r: 380, a: .85, tint: 'rgba(255,210,140,.08)' }, { x: 770, y: 880, r: 520, a: .85 }]);
    if (lt > 3.4 && lt < 3.55) { c.fillStyle = 'rgba(255,255,255,.5)'; c.fillRect(0, 0, W, H); }
  },
});
// 5. ŁAZIENKA — 112 i telefon do Oli
scene({
  name: 'call', start: 38, end: 46,
  labels: [[1.4, 8, '112 · POŁĄCZENIE', 540, 300, 'dark', 42]],
  bubbles: [[2.4, 6.4, 'Halo, sto dwanaście?\nKtoś jest na moim balkonie!', 520, 820, 520, 1000, 'zdzisiek']],
  draw(c, lt, sc) {
    bathroom(c);
    person(c, 'zdzisiek', 520, 1500, 2.1, { t: lt, aR: 2.5, phone: 2, wide: true, talk: lt > 2.4 && lt < 6.4 });
    night(c, .6, [{ x: 520, y: 1000, r: 500, a: .9, tint: 'rgba(80,220,150,.08)' }]);
  },
});
// 6. OLA I KUBA WYBIEGAJĄ — błąd 2
scene({
  name: 'run', start: 46, end: 54,
  draw(c, lt) {
    hallBg(c, lt, { gap: 150, nochain: true });
    const k = mv(lt, 0.4, 2.2, 1100, 560), o = mv(lt, 0.8, 2.6, 1180, 640);
    person(c, 'kuba', k, 1500, 2.1, { t: lt, walk: lt > .4 && lt < 2.2 ? lt * 14 : null, look: -1, alpha: 1 - prog(lt, 2.0, 2.4) });
    person(c, 'ola', o, 1500, 2.1, { t: lt, phone: 2, aR: .9, walk: lt > .8 && lt < 2.6 ? lt * 14 : null, look: -1, alpha: 1 - prog(lt, 2.4, 2.8) });
    night(c, .6, [{ x: 680, y: 1000, r: 600, a: .8 }]);
    if (lt > 3.2) label(c, 'DRZWI ZOSTAJĄ OTWARTE', 540, 300, 'red', 44, lt - 3.2, 9);
  },
  post(c, lt) { if (lt > 4.6) card(c, 70, 1380, 860, 'BŁĄD 2', 'wybiegli w nocy na klatkę\ni nie zamknęli mieszkania', lt - 4.6, '#F39C12', 42); },
});
// 7. POLICJA NA BALKONIE — zasada
scene({
  name: 'police', start: 54, end: 62,
  labels: [[0.4, 5, 'PO 4 MINUTACH', 540, 280, 'dark', 40]],
  draw(c, lt) {
    c.fillStyle = '#0B1020'; c.fillRect(0, 0, W, H);
    for (let i = 0; i < 40; i++) circ(c, hash(i) * W, hash(i + 3) * 700, 2, 'rgba(255,255,255,.5)');
    fillRR(c, 0, 1100, W, 30, 0, '#9AA1A8'); for (let i = 0; i < 18; i++) c.fillRect(i * 64, 1130, 10, 300); c.fillStyle = '#8D949B'; c.fillRect(0, 1420, W, 500);
    person(c, 'policjant', 540, 1480, 2.2, { t: lt, aR: 1.4, look: lt < 2.5 ? -1 : 1 });
    const on = Math.floor(lt * 6) % 2;
    night(c, .5, [{ x: 760, y: 1200, r: 420, a: .9, tint: 'rgba(255,250,210,.15)' }, { x: 1080, y: 700, r: 500, a: .6, tint: on ? 'rgba(60,120,255,.2)' : 'rgba(255,50,50,.15)' }]);
    if (lt > 2.8) { c.save(); c.translate(830, 1105); c.rotate(-.08); fillRR(c, -70, -44, 140, 88, 3, '#F2EEE4'); c.restore(); label(c, 'KARTKA', 830, 1000, 'red', 30, lt - 2.8, 9); }
  },
  post(c, lt) { if (lt > 4.4) card(c, 70, 330, 860, 'ZASADA', 'Sąsiad w niebezpieczeństwie? Dzwoń na 112.\nNie wybiegaj w nocy. Zawsze zamykaj drzwi.', lt - 4.4, '#F39C12', 38); },
});
// 8. KARTKA
scene({
  name: 'note', start: 62, end: 66,
  cam: lt => ({ z: 1.0 + lt * 0.04 }),
  draw(c, lt) {
    c.fillStyle = '#1E1712'; c.fillRect(0, 0, W, H);
    c.save(); c.translate(540, 950); c.rotate(-0.05);
    c.shadowColor = 'rgba(0,0,0,.7)'; c.shadowBlur = 40; fillRR(c, -420, -260, 840, 520, 6, '#EEEAE0'); c.shadowColor = 'transparent';
    ['NIE CIEBIE', 'SZUKAŁEM.'].forEach((w, i) => { c.save(); c.translate(0, -70 + i * 140); c.rotate((hash(i + 5) - .5) * .06); txt(c, w, 0, 0, 118, '#141414', 900); c.restore(); });
    c.restore();
    night(c, .55, [{ x: 560, y: 950, r: 620, a: .95, tint: 'rgba(255,250,210,.08)' }]);
  },
});
// 9. POWRÓT DO 94 — karteczka na szybie od środka
scene({
  name: 'back', start: 66, end: 76,
  labels: [[1.0, 6, 'DRZWI 94: OTWARTE', 540, 300, 'red', 44]],
  draw(c, lt) {
    if (lt < 4.6) {
      hallBg(c, lt, { gap: 150, nochain: true });
      person(c, 'ola', mv(lt, 0.2, 2.0, 520, 760), 1500, 2.1, { t: lt, phone: 1, aR: .9, walk: lt < 2 ? lt * 6 : null, look: 1, wide: true });
      person(c, 'kuba', mv(lt, 0.6, 2.4, 420, 980), 1500, 2.1, { t: lt, walk: lt > .6 && lt < 2.4 ? lt * 6 : null, look: 1 });
      night(c, .7, [{ x: 760, y: 1000, r: 420, a: .9 }]);
    } else {
      ROOM(c);
      // karteczka na szybie od środka
      c.save(); c.translate(780, 560); c.rotate(.06); fillRR(c, -86, -70, 172, 140, 4, '#F5E36A'); txt(c, 'DOBRANOC,', 0, -18, 28, '#222', 900); txt(c, 'SĄSIADKO', 0, 20, 28, '#222', 900); c.restore();
      person(c, 'ola', 420, 1500, 2.1, { t: lt, phone: 1, aR: 1.3, look: 1, wide: true, mouth: 'o' });
      night(c, .75, [{ x: 520, y: 1100, r: 380, a: .9, tint: 'rgba(200,220,255,.08)' }, { x: 780, y: 560, r: 260, a: .85 }]);
      label(c, 'OD ŚRODKA', 780, 420, 'red', 34, lt - 4.6, 9);
    }
  },
});
// 10. SZAFA
scene({
  name: 'end', start: 76, end: 86,
  cam: lt => ({ z: 1.0 + lt * 0.035, x: -lt * 6 }),
  labels: [[8.4, 10, 'CZĘŚĆ 7 ↓', 540, 1650, 'red', 56]],
  draw(c, lt) {
    c.fillStyle = '#262B3D'; c.fillRect(0, 0, W, H); c.fillStyle = '#1F1A22'; c.fillRect(0, 1420, W, 500);
    // szafa
    fillRR(c, 200, 300, 620, 1120, 10, '#4B3A2C'); c.fillStyle = '#3A2C20'; c.fillRect(506, 300, 8, 1120);
    const gap = mv(lt, 1.0, 4.0, 4, 70);
    c.fillStyle = '#020203'; c.fillRect(510, 320, gap, 1080);
    fillRR(c, 470, 820, 14, 70, 6, '#C9CDD2'); fillRR(c, 536 + gap, 820, 14, 70, 6, '#C9CDD2');
    if (lt > 4.6) {
      const a = clamp((lt - 4.6) / .4);
      c.save(); c.globalAlpha = a; c.shadowColor = 'rgba(255,255,255,.9)'; c.shadowBlur = 24;
      ell(c, 528 + gap * .28, 700, 14, 9, '#F4F1EA'); ell(c, 528 + gap * .78, 700, 14, 9, '#F4F1EA'); c.restore();
    }
    night(c, .88, [{ x: 540, y: 860, r: 520, a: .6 }]);
    if (lt > 4.6 && lt < 4.75) { c.fillStyle = 'rgba(255,255,255,.35)'; c.fillRect(0, 0, W, H); }
  },
});
