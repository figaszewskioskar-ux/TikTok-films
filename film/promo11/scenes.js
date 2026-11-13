// Rolka: DZIŚ W NOCY · 2 NOWE FILMY · 1:28 + strona (odliczanie, gra, okno 104)
window.EP = {
  badge: 'BLOK 94', loop: false, vignette: .6, hideHud: () => true,
  images: { hero: 'promo11/hero.jpg' },
  cues(add) { add(0.1, 'stab'); add(1.4, 'whoosh'); add(2.0, 'whoosh'); add(7.7, 'knock'); add(8.0, 'hit'); add(11.6, 'notif'); },
};
const S = [];
function scene(o) { S.push(o); return o; }
function door(c) { quilted(c, 0, 0, W, H, '#2A1E15', '#231910', '#5A4630', 90); c.fillStyle = 'rgba(8,10,14,.6)'; c.fillRect(0, 0, W, H); }
function ledBoard(c, lt, x, y, w, h, l1, l2, s1, s2) {
  const on = Math.floor(lt * 2) % 2 === 0;
  c.fillStyle = 'rgba(6,7,10,.95)'; c.fillRect(x - w / 2, y - h / 2, w, h);
  c.save(); c.strokeStyle = on ? '#ff3b30' : 'rgba(120,40,35,.6)'; if (on) { c.shadowColor = 'rgba(255,40,30,.95)'; c.shadowBlur = 40; } c.lineWidth = 10; c.strokeRect(x - w / 2, y - h / 2, w, h); c.restore();
  c.save(); c.shadowColor = 'rgba(255,40,30,.9)'; c.shadowBlur = 30; txt(c, l1, x, y - h * .26, s1, '#ff3b30', 900); txt(c, l2, x, y + h * .14, s2, '#ff3b30', 900); c.restore();
  c.fillStyle = 'rgba(0,0,0,.35)'; for (let gy = y - h / 2 + 4; gy < y + h / 2; gy += 7) c.fillRect(x - w / 2, gy, w, 2);
}
function mystery(c, x, y, rot, lt, t0, n) {
  const a = eout(prog(lt, t0, t0 + .5)); if (a <= 0) return;
  c.save(); c.translate(x + (1 - a) * (x < 540 ? -600 : 600), y); c.rotate(rot);
  c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 40; fillRR(c, -200, -250, 400, 500, 24, '#F3EFE6'); c.shadowColor = 'transparent';
  fillRR(c, -186, -236, 372, 472, 16, '#101219');
  c.save(); c.globalAlpha = .55 + .45 * Math.sin(lt * 5 + n); c.shadowColor = '#D7263D'; c.shadowBlur = 40; txt(c, '?', 0, -10, 240, '#D7263D', 900); c.restore();
  txt(c, 'FILM ' + n, 0, 180, 40, '#F3EFE6', 900);
  c.restore();
}
// 1. DZIŚ W NOCY · 2 NOWE FILMY · 1:28
scene({
  name: 'noc', start: 0, end: 5,
  draw(c, lt) {
    door(c);
    const a = back(clamp((lt - .1) / .35)); c.save(); c.translate(540, 360); c.scale(a, a); c.translate(-540, -360);
    ledBoard(c, lt, 540, 360, 940, 400, 'DZIŚ W NOCY', '1:28', 70, 190); c.restore();
    mystery(c, 300, 900, -.06, lt, 1.3, 1); mystery(c, 780, 940, .06, lt, 1.9, 2);
    if (lt > 2.6) label(c, '2 NOWE FILMY', 540, 1300, 'red', 76, lt - 2.6, 9);
    if (lt > 2.4) person(c, 'kaptur', 540, 1960, 1.6, { t: lt, still: true, alpha: clamp((lt - 2.4) / 1.2) * .85 });
    night(c, .35, [{ x: 540, y: 600, r: 900, a: .9 }]);
  },
});
// 2. STRONA: odliczanie, gra, okno 104
function heroAt(c, z, cx, cy, fx, fy) { const im = (window.IMGS || {}).hero; if (!im || !im.naturalWidth) return; c.save(); c.translate(cx, cy); c.scale(z, z); c.drawImage(im, -fx, -fy); c.restore(); }
scene({
  name: 'strona', start: 5, end: 11.5,
  draw(c, lt) {
    c.fillStyle = '#0A0D18'; c.fillRect(0, 0, W, H);
    const p = eio(prog(lt, 1.6, 3.2)), z = lerp(1.45, 3.2, p), fx = lerp(540, 701, p), fy = lerp(560, 47, p);
    heroAt(c, z, 540, lerp(1000, 980, p), fx, fy);
    // tablica LED na banerze (przed zbliżeniem)
    if (p < .6) { const cy = lerp(1000, 980, p); c.save(); c.globalAlpha = 1 - p / .6; ledBoard(c, lt, 540 + (540 - fx) * z, cy + (720 - fy) * z, 500 * z / 1.45, 160 * z / 1.45, 'NOWE ODCINKI', 'DZIŚ 1:28', 30 * z / 1.45, 84 * z / 1.45); c.restore(); }
    // okno 104 ze światłem i Kapturem
    const on = lt > 2.6 ? clamp((lt - 2.6) / .4) * (.85 + .15 * Math.sin(lt * 23)) : 0;
    if (on > 0) {
      const ww = 72 * z, wh = 55 * z, wx = 540 - ww / 2 + (665 - fx + 36 - 36) * z, wy = 980 + (20 - fy) * z;
      c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createRadialGradient(wx + ww / 2, wy + wh / 2, 4, wx + ww / 2, wy + wh / 2, ww * 1.7); g.addColorStop(0, `rgba(220,70,50,${.5 * on})`); g.addColorStop(1, 'rgba(220,70,50,0)'); c.fillStyle = g; c.fillRect(wx - ww * 1.5, wy - wh * 1.5, ww * 4, wh * 4); c.restore();
      c.fillStyle = `rgba(200,70,50,${.75 * on})`; c.fillRect(wx, wy, ww, wh);
      c.fillStyle = 'rgba(6,6,9,.95)'; c.beginPath(); c.arc(wx + ww * .5, wy + wh * .46, ww * .17, 0, 7); c.fill(); c.beginPath(); c.moveTo(wx + ww * .18, wy + wh); c.quadraticCurveTo(wx + ww * .5, wy + wh * .5, wx + ww * .82, wy + wh); c.fill();
      c.fillStyle = `rgba(255,245,220,${on})`; c.beginPath(); c.arc(wx + ww * .44, wy + wh * .47, ww * .03, 0, 7); c.arc(wx + ww * .56, wy + wh * .47, ww * .03, 0, 7); c.fill();
      const a = lt - 2.9; if (a > 0 && a < .6) { c.save(); c.globalAlpha = 1 - a / .6; c.strokeStyle = '#FFFFFF'; c.lineWidth = 8; c.beginPath(); c.arc(wx + ww / 2, wy + wh / 2, 60 + a * 220, 0, 7); c.stroke(); c.restore(); }
    }
  },
  post(c, lt) {
    txt(c, 'WEJDŹ NA STRONĘ', 540, 250, 84, '#FFFFFF', 900);
    [['⏳ ODLICZANIE DO 1:28', 'orange', .6], ['🎮 GRA: OTWORZYSZ CZY NIE?', 'dark', 1.0], ['👀 EASTER EGG: OKNO 104', 'red', 2.6]].forEach(([t, st, t0], i) => { if (lt > t0) label(c, t, 540, 380 + i * 110, st, 44, lt - t0, 9); });
    if (lt > 3.4) label(c, 'Ktoś tam czeka…', 540, 1700, 'dark', 48, lt - 3.4, 9);
  },
});
// 3. LINK W BIO
scene({
  name: 'cta', start: 11.5, end: 15,
  draw(c, lt) {
    door(c);
    const a = back(clamp((lt - .1) / .35)); c.save(); c.translate(540, 460); c.scale(a, a); fillRR(c, -420, -64, 840, 128, 64, '#FFFFFF'); txt(c, 'protokolocaleni.online', 0, 2, 54, '#14161B', 900); c.restore();
    if (lt > .4) label(c, 'LINK W BIO', 540, 660, 'red', 80, lt - .4, 9);
    if (lt > 1.0) label(c, 'WIDZIMY SIĘ O 1:28 🌙', 540, 820, 'orange', 56, lt - 1.0, 9);
    person(c, 'ola', 820, 1800, 1.7, { t: lt, phone: 2, aR: 2.2, mouth: 'smile' });
    person(c, 'kuba', 260, 1800, 1.7, { t: lt, aR: 2.5 + Math.sin(lt * 9) * .2, mouth: 'o', wide: true });
  },
});
