// BLOK 94 · SPECJAL 11.11 (poza sezonem) — parada w mieście, Kuba gubi się w tłumie, obcy zna jego imię.
window.EP = {
  badge: 'BLOK 94 · 11.11',
  loop: false,
  vignette: .6,
  cues(add) {
    add(0.2, 'stab'); add(6.4, 'whoosh'); add(24.3, 'notif'); add(27.6, 'error');
    add(36.4, 'error'); add(41.4, 'stab'); add(47.0, 'whoosh'); add(57.4, 'stab');
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
// flaga na kiju; s skala, dir kierunek
function flag(c, x, y, s = 1, lt = 0, dir = 1) {
  c.save(); c.translate(x, y); c.scale(s * dir, s);
  c.strokeStyle = '#8C8F99'; c.lineWidth = 5; c.beginPath(); c.moveTo(0, 0); c.lineTo(0, -150); c.stroke();
  const wv = Math.sin(lt * 4 + x * .01) * 7;
  c.beginPath(); c.moveTo(0, -150); c.quadraticCurveTo(45, -158 + wv, 90, -150); c.lineTo(90, -118); c.quadraticCurveTo(45, -126 + wv, 0, -118); c.closePath(); c.fillStyle = '#F4F1EA'; c.fill();
  c.beginPath(); c.moveTo(0, -118); c.quadraticCurveTo(45, -126 + wv, 90, -118); c.lineTo(90, -86); c.quadraticCurveTo(45, -94 + wv, 0, -86); c.closePath(); c.fillStyle = '#D7263D'; c.fill();
  c.restore();
}
// flaga zwisająca z balkonu kamienicy
function hangFlag(c, x, y, lt) {
  const wv = Math.sin(lt * 2 + x) * 5;
  c.fillStyle = '#F4F1EA'; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 70, y); c.lineTo(x + 70 + wv, y + 90); c.lineTo(x + wv, y + 90); c.fill();
  c.fillStyle = '#D7263D'; c.beginPath(); c.moveTo(x + wv, y + 90); c.lineTo(x + 70 + wv, y + 90); c.lineTo(x + 70 + wv * 1.4, y + 180); c.lineTo(x + wv * 1.4, y + 180); c.fill();
}
// rynek: kamienice, flagi, pomnik
function cityBg(c, lt, o = {}) {
  const sky = c.createLinearGradient(0, 0, 0, 900); sky.addColorStop(0, '#5D6B82'); sky.addColorStop(1, '#A9B2BF'); c.fillStyle = sky; c.fillRect(0, 0, W, 1000);
  const cols = ['#B98E6A', '#8E9A8B', '#C9B48E', '#A07B6A', '#9AA3B2'];
  for (let i = 0; i < 5; i++) {
    const x = -40 + i * 240, h = 640 + hash(i + 2) * 160, y = 1150 - h;
    c.fillStyle = cols[i]; c.fillRect(x, y, 236, h); c.fillStyle = 'rgba(0,0,0,.15)'; c.fillRect(x, y, 236, 16);
    for (let r = 0; r < 4; r++) for (let q = 0; q < 3; q++) fillRR(c, x + 30 + q * 68, y + 60 + r * 140, 40, 80, 4, '#3C4352');
    if (i % 2 === 0) hangFlag(c, x + 90, y + 200, lt);
  }
  if (!o.noMonument) { // pomnik
    fillRR(c, 440, 820, 200, 340, 6, '#6E7380'); fillRR(c, 420, 800, 240, 30, 4, '#7C8190'); fillRR(c, 470, 520, 140, 290, 30, '#555A66'); circ(c, 540, 500, 46, '#555A66');
    c.strokeStyle = '#4A4F5A'; c.lineWidth = 14; c.beginPath(); c.moveTo(580, 600); c.lineTo(640, 520); c.stroke();
    flag(c, 640, 540, 1.3, lt);
  }
  c.fillStyle = '#8D8A84'; c.fillRect(0, 1150, W, H - 1150);
  c.strokeStyle = 'rgba(0,0,0,.1)'; c.lineWidth = 3; for (let i = 0; i < 12; i++) { c.beginPath(); c.moveTo(0, 1180 + i * 64); c.lineTo(W, 1180 + i * 64); c.stroke(); }
}
// tłum: rząd uproszczonych postaci z flagami (dx — przesunięcie, idą w prawo/lewo)
const CROWD = ['#3B4258', '#6B3A3A', '#2F4A3E', '#5A5148', '#3E3A52', '#7A6A55', '#2E3340', '#5B2F3F'];
function crowd(c, lt, y, s, seed, dx = 0, n = 9, flags = .4) {
  for (let i = 0; i < n; i++) {
    const h = hash(i + seed), x = ((i * 150 + h * 90 + dx) % (W + 300) + W + 300) % (W + 300) - 150;
    const bob = Math.sin(lt * 5 + i * 1.7) * 4 * s, yy = y + bob;
    c.save(); c.translate(x, yy); c.scale(s, s);
    fillRR(c, -48, -230, 96, 230, 40, CROWD[(i + seed) % CROWD.length]);
    circ(c, 0, -268, 44, hash(i + seed + 5) > .5 ? '#E2AE8A' : '#C8946E');
    fillRR(c, -46, -320, 92, 40, 18, hash(i + seed + 9) > .5 ? '#2A2D36' : '#6B4B32');
    if (hash(i + seed + 3) < flags) flag(c, 40, -150, .9, lt, 1);
    c.restore();
  }
}
// stragan z flagami
function stall(c, lt, x = 760) {
  fillRR(c, x - 200, 1210, 400, 210, 8, '#6B4B32');
  for (let i = 0; i < 8; i++) { c.fillStyle = i % 2 ? '#D7263D' : '#F4F1EA'; c.beginPath(); c.moveTo(x - 220 + i * 55, 980); c.lineTo(x - 220 + (i + 1) * 55, 980); c.lineTo(x - 220 + (i + 1) * 55, 1060); c.lineTo(x - 220 + i * 55, 1060); c.fill(); }
  c.fillStyle = '#4A3424'; c.fillRect(x - 210, 1060, 14, 160); c.fillRect(x + 196, 1060, 14, 160);
  for (let i = 0; i < 6; i++) flag(c, x - 150 + i * 60, 1220, .7, lt + i, 1);
}
// plecak Kuby z breloczkiem „KUBA”
function backpack(c, lt, glow = 0) {
  c.fillStyle = '#4C5A2A'; c.fillRect(0, 0, W, H);
  fillRR(c, 140, 260, 800, 1400, 120, '#6E7B3B'); fillRR(c, 220, 820, 640, 640, 70, '#5B672F');
  c.strokeStyle = '#2E3418'; c.lineWidth = 10; c.beginPath(); c.moveTo(260, 860); c.lineTo(820, 860); c.stroke();
  fillRR(c, 500, 836, 40, 60, 10, '#C9CDD2');
  const sw = Math.sin(lt * 3) * .12;
  c.save(); c.translate(520, 896); c.rotate(sw);
  c.strokeStyle = '#C9CDD2'; c.lineWidth = 8; c.beginPath(); c.arc(0, 40, 26, 0, 7); c.stroke();
  if (glow) { c.shadowColor = '#F5C542'; c.shadowBlur = 50 * glow; }
  fillRR(c, -150, 66, 300, 130, 22, '#F5C542'); c.shadowColor = 'transparent';
  txt(c, 'KUBA', 0, 133, 92, '#14161B', 900);
  c.restore();
}

// 0. HAK
scene({
  name: 'hook', start: 0, end: 6,
  cam: lt => ({ z: 1.0 + lt * 0.02 }),
  draw(c, lt) {
    cityBg(c, lt, { noMonument: true });
    crowd(c, lt, 1500, 2.2, 3, lt * 60, 7, .5);
    crowd(c, lt, 1900, 2.8, 7, -lt * 90, 6, .3);
    c.save(); c.fillStyle = 'rgba(10,12,18,.35)'; c.fillRect(0, 0, W, H); c.restore();
    bigSign(c, lt, 'ZGUBIŁEŚ SIĘ?', 'NIE IDŹ Z OBCYM!');
  },
});
// 1. PARADA
scene({
  name: 'intro', start: 6, end: 14,
  labels: [[0.4, 8, '11 LISTOPADA · PARADA', 540, 300, 'orange', 46], [1.6, 8, 'SPECJAL · POZA SEZONEM', 540, 1760, 'yellow', 40]],
  draw(c, lt) {
    cityBg(c, lt);
    crowd(c, lt, 1260, 1.0, 1, lt * 30, 12, .6);
    const x = mv(lt, 0, 8, 160, 560);
    person(c, 'kobieta', x, 1500, 1.9, { t: lt, walk: lt * 5, look: 1 });
    person(c, 'ola', x + 190, 1500, 1.8, { t: lt, walk: lt * 5 + 1, look: 1, phone: 2, aR: .9 });
    person(c, 'kuba', x + 360, 1500, 1.8, { t: lt, walk: lt * 5 + 2, look: 1, aR: 1.2 });
    flag(c, x + 440, 1300, 1, lt);
    crowd(c, lt, 2300, 2.4, 4, lt * 50, 7, .4);
  },
});
// 2. STRAGAN — błąd 1
scene({
  name: 'stall', start: 14, end: 24,
  draw(c, lt) {
    cityBg(c, lt, { noMonument: true });
    stall(c, lt);
    const mx = mv(lt, 0.5, 4.5, 360, -400);
    person(c, 'kobieta', mx, 1500, 1.9, { t: lt, walk: lt * 5, look: -1 });
    person(c, 'ola', mx - 180, 1500, 1.8, { t: lt, walk: lt * 5 + 1, look: -1, phone: 2, aR: .9 });
    person(c, 'kuba', 760, 1560, 2.0, { t: lt, look: lt < 5 ? 1 : -1, aL: lt < 5 ? 1.0 : .14, wide: lt > 6, mouth: lt > 6 ? 'o' : 'smile' });
    if (lt > 2.4) crowd(c, lt, 2300, 2.4, 9, lt * 140, 7, .5);
  },
  post(c, lt) {
    if (lt > 1.2 && lt < 5) label(c, 'KUBA OGLĄDA FLAGI', 540, 300, 'dark', 42, lt - 1.2, 5 - lt);
    if (lt > 5.2 && lt < 9.8) card(c, 70, 300, 860, 'BŁĄD 1', 'nie umówili się, gdzie się spotkać,\njeśli ktoś się zgubi', lt - 5.2, '#F39C12', 40);
  },
});
// 3. TELEFON 2%
scene({
  name: 'phone', start: 24, end: 30,
  draw(c, lt) {
    c.fillStyle = '#2A2D36'; c.fillRect(0, 0, W, H);
    bigPhone(c, (cc, x, y, w, h) => {
      const dead = lt > 3.6;
      cc.fillStyle = dead ? '#000' : '#10131B'; cc.fillRect(x, y, w, h);
      if (dead) return;
      fillRR(cc, x + w - 120, y + 30, 70, 30, 6, '#3A0F12'); fillRR(cc, x + w - 116, y + 34, 6, 22, 2, '#FF3B30'); txt(cc, '2%', x + w - 170, y + 46, 30, '#FF3B30', 800);
      circ(cc, x + w / 2, y + 340, 90, '#2E3446'); txt(cc, 'M', x + w / 2, y + 344, 80, '#F4F1EA', 900);
      txt(cc, 'Mama', x + w / 2, y + 500, 56, '#F4F1EA', 800); txt(cc, 'łączenie…', x + w / 2, y + 570, 36, '#9AA0AE', 600);
      circ(cc, x + w / 2, y + h - 180, 60, '#E5484D');
    }, 1, 360);
  },
  post(c, lt) { if (lt > 3.8) label(c, 'TELEFON PADŁ', 540, 960, 'red', 60, lt - 3.8, 9); },
});
// 4. OBCY — błąd 2
scene({
  name: 'stranger', start: 30, end: 41,
  bubbles: [[0.8, 5.4, 'Zgubiłeś się, Kuba?\nMama czeka przy pomniku.\nChodź.', 380, 840, 400, 1010, 'sasiad']],
  draw(c, lt, sc) {
    cityBg(c, lt);
    crowd(c, lt, 1240, 1.0, 12, lt * 25, 12, .5);
    const go = lt > 6.0 ? mv(lt, 6.0, 10.5, 0, -620) : 0;
    const sx = mv(lt, 0, 1.0, -150, 340) + go;
    person(c, 'sasiad', sx, 1500, 2.0, { t: lt, look: 1, mouth: 'smile', talk: talking(sc, 'sasiad', lt), aR: lt > 2 && lt < 6 ? .9 : .14, walk: (lt < 1 || lt > 6) ? lt * 6 : null });
    person(c, 'kuba', 720 + go, 1520, 1.9, { t: lt, look: -1, wide: lt < 6, mouth: lt < 6 ? 'o' : 'smile', walk: lt > 6.3 ? lt * 6 : null });
    crowd(c, lt, 2300, 2.4, 15, -lt * 60, 7, .3);
  },
  post(c, lt) { if (lt > 6.4 && lt < 10.8) card(c, 70, 300, 860, 'BŁĄD 2', 'poszedł z obcym, bo „zna mamę”', lt - 6.4, '#F39C12', 42); },
});
// 5. SKĄD ZNAŁ IMIĘ + POLICJANT + ZASADA
scene({
  name: 'twist', start: 41, end: 52,
  draw(c, lt) {
    if (lt < 4.2) { backpack(c, lt, clamp((lt - .6) / .6)); night(c, .35, [{ x: 520, y: 1030, r: 420, a: .8 }]); return; }
    const l = lt - 4.2;
    cityBg(c, lt);
    crowd(c, lt, 1240, 1.0, 21, lt * 25, 12, .5);
    const sx = l < 1.6 ? 300 : mv(l, 1.6, 3.4, 300, -260);
    person(c, l > 1.0 ? 'kaptur' : 'sasiad', sx, 1500, 2.0, { t: lt, look: l > 1.0 ? -1 : 1, walk: l > 1.6 ? lt * 7 : null, glow: l > 1.0 ? .6 : 0 });
    person(c, 'kuba', 560, 1520, 1.9, { t: lt, look: 1, wide: true, mouth: 'o' });
    const px = mv(l, 0, .9, 1250, 840);
    person(c, 'policjant', px, 1500, 2.0, { t: lt, look: -1, aR: l > .9 && l < 3 ? 1.4 : .14, walk: l < .9 ? lt * 6 : null });
  },
  post(c, lt) {
    if (lt > .6 && lt < 4.0) label(c, 'IMIĘ NA PLECAKU', 540, 330, 'red', 54, lt - .6, 4.0 - lt);
    if (lt > 5.0 && lt < 6.8) label(c, 'POLICJA. WSZYSTKO OK?', 760, 900, 'dark', 40, lt - 5.0, 6.8 - lt);
    if (lt > 6.2 && lt < 11) card(c, 70, 300, 860, 'ZASADA', 'Zgubiłeś się? Zostań w miejscu i poproś\no pomoc policjanta albo ochronę.', lt - 6.2, '#F39C12', 38);
  },
});
// 6. ŻYCZENIA + KTOŚ W TŁUMIE
scene({
  name: 'end', start: 52, end: 60,
  draw(c, lt) {
    cityBg(c, lt);
    crowd(c, lt, 1240, 1.0, 31, lt * 20, 12, .7);
    // w tłumie: ktoś w kapturze odwraca się
    const k = lt > 4.6 ? clamp((lt - 4.6) / .4) : 0;
    if (k) { c.save(); c.globalAlpha = k; person(c, 'kaptur', 880, 1250, 1.0, { t: lt, glow: 1 }); c.restore(); }
    person(c, 'kobieta', 330, 1500, 1.9, { t: lt, look: 1, aR: 1.6, aL: 1.6 });
    person(c, 'kuba', 470, 1520, 1.8, { t: lt, look: -1, mouth: 'smile' });
    person(c, 'ola', 640, 1500, 1.8, { t: lt, look: -1, phone: 2, aR: .9, mouth: 'smile' });
    flag(c, 720, 1330, 1.1, lt);
    if (lt > 7.0) { c.save(); c.globalAlpha = clamp((lt - 7.0) / .8) * .85; c.fillStyle = '#000'; c.fillRect(0, 0, W, H); c.restore(); }
  },
  post(c, lt) {
    if (lt > 0.3 && lt < 4.6) bigSign(c, lt - .3, 'WSZYSTKIEGO', 'DOBREGO 11.11!', 330);
    if (lt > 5.0 && lt < 7.2) label(c, 'KTO TO?', 880, 900, 'red', 44, lt - 5.0, 7.2 - lt);
    if (lt > 7.2) label(c, 'BLOK 94 · WRACAMY Z ODC. 5', 540, 960, 'yellow', 46, lt - 7.2, 9);
  },
});
