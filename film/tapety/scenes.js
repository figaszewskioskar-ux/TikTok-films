window.EP = { badge: '', loop: false, vignette: .7, hideHud: () => true, cues() {} };
const S = [
 { name: 'okno', start: 0, end: 1, draw(c, lt) {
   blockBg(c, 2, { night: true });
   // okno 94 świeci na niebiesko
   const bx = 110, by = 400, cw = 860 / 8, rh = (1100 - 120) / 11, x = bx + 5 * cw + 18, y = by + 40 + 1 * rh;
   c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createRadialGradient(x + 35, y + 25, 5, x + 35, y + 25, 200); g.addColorStop(0, 'rgba(120,170,255,.8)'); g.addColorStop(1, 'rgba(120,170,255,0)'); c.fillStyle = g; c.fillRect(x - 200, y - 200, 470, 450); c.restore();
   person(c, 'kaptur', 540, 1760, 2.2, { t: 1, back: true });
   txt(c, 'KTO TAM?', 540, 140, 120, '#F4F1EA', 900);
   fillRR(c, 380, 196, 320, 64, 32, '#D7263D'); txt(c, 'BLOK 94', 540, 228, 40, '#FFFFFF', 900);
 } },
 { name: 'wizjer', start: 1, end: 2, draw(c, lt) {
   peepPOV(c, 1, (cc, cx, cy, r) => { cc.fillStyle = '#7d7a70'; cc.fillRect(cx - r, cy - r, 2 * r, 2 * r); person(cc, 'kaptur', cx, cy + 960, 3.6, { t: 1, glow: 1 }); });
   txt(c, 'NIE OTWIERAJ.', 540, 1530, 96, '#F4F1EA', 900);
   fillRR(c, 380, 1610, 320, 64, 32, '#D7263D'); txt(c, 'BLOK 94', 540, 1642, 40, '#FFFFFF', 900);
 } },
];
