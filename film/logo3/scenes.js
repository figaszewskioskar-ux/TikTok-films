// Awatar kanału w stylu serii — każda „scena” to jedna propozycja (kadr kwadratowy 1080x1080 z y=420)
window.EP = { badge: '', loop: false, vignette: .0, hideHud: () => true, cues() {} };
const S = []; function scene(o) { S.push(o); return o; }
const CY = 960; // środek kwadratu
function rimGlow(c, x, y, r, col, a) { const g = c.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, col.replace('A', a)); g.addColorStop(1, col.replace('A', 0)); c.fillStyle = g; c.fillRect(x - r, y - r, 2 * r, 2 * r); }
function eyes(c, x, y, s, col = '255,240,200') { c.save(); c.globalCompositeOperation = 'lighter'; for (const dx of [-16, 16]) { const g = c.createRadialGradient(x + dx * s, y, 0, x + dx * s, y, 16 * s); g.addColorStop(0, `rgba(${col},.45)`); g.addColorStop(1, `rgba(${col},0)`); c.fillStyle = g; c.fillRect(x + dx * s - 16 * s, y - 16 * s, 32 * s, 32 * s); } c.restore(); }
// A: KAPTUR — portret, czerwone światło z boku
scene({ name: 'a', start: 0, end: 1, draw(c, lt) {
  const g = c.createRadialGradient(760, 700, 50, 540, CY, 900); g.addColorStop(0, '#5a1420'); g.addColorStop(.45, '#1a0a10'); g.addColorStop(1, '#050507'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  blockBg && 0;
  person(c, 'kaptur', 540, 2050, 5.2, { t: .3, still: true, glow: .9 });
  eyes(c, 540, 2050 - 5.2 * 236 + 5.2 * 4, 5.2);
  c.save(); c.globalCompositeOperation = 'lighter'; rimGlow(c, 900, 700, 520, 'rgba(255,50,70,A)', .35); c.restore();
} });
// B: TRÓJKA — Ola i Kuba, za nimi Kaptur
scene({ name: 'b', start: 1, end: 2, draw(c, lt) {
  corridorBg(c, .5, {});
  night(c, .78, [{ x: 540, y: 1250, r: 520, a: .9 }]);
  person(c, 'kaptur', 540, 1500, 3.0, { t: .2, still: true, glow: .9, alpha: .95 });
  eyes(c, 540, 1500 - 3.0 * 236 + 12, 3.0);
  person(c, 'kuba', 300, 1640, 2.4, { t: .4, still: true, look: 1, wide: true, mouth: 'o' });
  person(c, 'ola', 790, 1640, 2.4, { t: .1, still: true, look: -1, wide: true, mouth: 'o', phone: 2, aR: 2.2 });
} });
// C: WIZJER — Kaptur przez wizjer
scene({ name: 'c', start: 2, end: 3, draw(c, lt) {
  peepPOV(c, .5, (cc, cx, cy, r) => {
    const g = cc.createRadialGradient(cx, cy - 120, 20, cx, cy, r); g.addColorStop(0, '#d8d2bb'); g.addColorStop(1, '#5b594c'); cc.fillStyle = g; cc.fillRect(cx - r, cy - r, 2 * r, 2 * r);
    cc.fillStyle = '#3a3c34'; cc.fillRect(cx - r, cy + 150, 2 * r, r);
    person(cc, 'kaptur', cx, cy + 860, 3.2, { t: .3, still: true, glow: .9 });
    eyes(cc, cx, cy + 860 - 3.2 * 236 + 13, 3.2);
  });
  c.save(); quilted(c, 0, 1340, W, 120, '#1E150E', '#160F09', '#3A2C1A', 90); c.restore();
} });
// D: KAPTUR UŚMIECHNIĘTY (pasażer N94) — niepokojący „miły” obcy
scene({ name: 'd', start: 3, end: 4, draw(c, lt) {
  const g = c.createRadialGradient(540, 820, 50, 540, CY, 900); g.addColorStop(0, '#26304a'); g.addColorStop(1, '#040508'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  person(c, 'pasazer', 540, 2080, 5.0, { t: .3, still: true, mouth: 'grin', wide: true });
  night(c, .35, [{ x: 540, y: 820, r: 700, a: .9 }]);
} });
