// Awatar: Ola, Kuba i Kaptur — kolejne kompozycje (kwadrat 1080x1080 od y=420)
window.EP = { badge: '', loop: false, vignette: .0, hideHud: () => true, cues() {} };
const S = []; function scene(o) { S.push(o); return o; }
function eyes(c, x, y, s, col = '255,240,200', a = .45) { c.save(); c.globalCompositeOperation = 'lighter'; for (const dx of [-16, 16]) { const g = c.createRadialGradient(x + dx * s, y, 0, x + dx * s, y, 16 * s); g.addColorStop(0, `rgba(${col},${a})`); g.addColorStop(1, `rgba(${col},0)`); c.fillStyle = g; c.fillRect(x + dx * s - 16 * s, y - 16 * s, 32 * s, 32 * s); } c.restore(); }
function vign(c, a = .85) { const g = c.createRadialGradient(540, 960, 300, 540, 960, 780); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, `rgba(0,0,0,${a})`); c.fillStyle = g; c.fillRect(0, 420, W, 1080); }
function light(c, x, y, r, rgb, a) { c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, `rgba(${rgb},${a})`); g.addColorStop(1, `rgba(${rgb},0)`); c.fillStyle = g; c.fillRect(x - r, y - r, 2 * r, 2 * r); c.restore(); }
function onlyEyes(c, x, y, s) { c.save(); c.shadowColor = 'rgba(255,255,255,.9)'; c.shadowBlur = 30 * s; for (const dx of [-16, 16]) { ell(c, x + dx * s, y, 10 * s, 6.5 * s, '#F4F1EA'); } c.restore(); for (const dx of [-16, 16]) circ(c, x + dx * s, y, 4 * s, '#111'); eyes(c, x, y, s); }
// 5: Kaptur tyłem na pierwszym planie, dzieci w świetle drzwi 94
scene({ name: 'a', start: 0, end: 1, draw(c) {
  c.fillStyle = '#0a0b10'; c.fillRect(0, 0, W, H);
  corridorBg(c, .5, { num: '94', num2: '93' }); night(c, .93, []);
  // otwarte drzwi z ciepłym światłem
  c.fillStyle = '#FFD9A0'; c.fillRect(330, 520, 420, 900); light(c, 540, 1000, 700, '255,190,110', .35);
  person(c, 'kuba', 440, 1420, 2.2, { t: .4, still: true, look: 0, wide: true, mouth: 'o' });
  person(c, 'ola', 650, 1420, 2.2, { t: .1, still: true, look: 0, wide: true, mouth: 'o' });
  person(c, 'kaptur', 560, 2500, 5.0, { t: .2, still: true, back: true });
  vign(c, .8);
} });
// 6: ciemność, telefon oświetla twarze od dołu, nad nimi tylko oczy Kaptura
scene({ name: 'b', start: 1, end: 2, draw(c) {
  c.fillStyle = '#030305'; c.fillRect(0, 0, W, H);
  person(c, 'kuba', 380, 1930, 3.2, { t: .4, still: true, look: .3, wide: true, mouth: 'o' });
  person(c, 'ola', 700, 1930, 3.2, { t: .1, still: true, look: -.3, wide: true, mouth: 'o', phone: 2, aR: 1.2 });
  c.fillStyle = 'rgba(0,0,0,.72)'; c.fillRect(0, 0, W, H);
  light(c, 560, 1500, 520, '170,210,255', .42);
  onlyEyes(c, 540, 700, 2.2);
  vign(c, .9);
} });
// 7: wielka głowa Kaptura, dzieci wychylają się z dołu
scene({ name: 'c', start: 2, end: 3, draw(c) {
  const g = c.createRadialGradient(540, 850, 50, 540, 960, 800); g.addColorStop(0, '#2a2f40'); g.addColorStop(1, '#06070b'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  person(c, 'kaptur', 540, 2380, 6.2, { t: .2, still: true, glow: .9 }); eyes(c, 540, 2380 - 6.2 * 236 + 25, 6.2);
  person(c, 'kuba', 190, 1960, 2.6, { t: .4, still: true, look: 1, lookY: -1, wide: true, mouth: 'o' });
  person(c, 'ola', 890, 1960, 2.6, { t: .1, still: true, look: -1, lookY: -1, wide: true, mouth: 'o' });
  vign(c, .7);
} });
// 8: kinowe światło — czerwone z lewej, niebieskie z prawej
scene({ name: 'd', start: 3, end: 4, draw(c) {
  corridorBg(c, .5, { num: '94', num2: '93' }); night(c, .92, []);
  person(c, 'kaptur', 540, 1800, 3.8, { t: .2, still: true, glow: .9 }); eyes(c, 540, 1800 - 3.8 * 236 + 15, 3.8);
  person(c, 'kuba', 280, 2000, 2.8, { t: .4, still: true, look: .8, wide: true, mouth: 'o' });
  person(c, 'ola', 800, 2000, 2.8, { t: .1, still: true, look: -.8, wide: true, mouth: 'o' });
  light(c, 0, 1100, 760, '255,40,60', .42); light(c, W, 1100, 760, '60,120,255', .42);
  vign(c, .75);
} });
