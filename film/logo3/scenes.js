// Awatar: Ola, Kuba i Kaptur — warianty kadru (kwadrat 1080x1080 od y=420)
window.EP = { badge: '', loop: false, vignette: .0, hideHud: () => true, cues() {} };
const S = []; function scene(o) { S.push(o); return o; }
function eyes(c, x, y, s, col = '255,240,200', a = .45) { c.save(); c.globalCompositeOperation = 'lighter'; for (const dx of [-16, 16]) { const g = c.createRadialGradient(x + dx * s, y, 0, x + dx * s, y, 16 * s); g.addColorStop(0, `rgba(${col},${a})`); g.addColorStop(1, `rgba(${col},0)`); c.fillStyle = g; c.fillRect(x + dx * s - 16 * s, y - 16 * s, 32 * s, 32 * s); } c.restore(); }
function vign(c, a = .85) { const g = c.createRadialGradient(540, 960, 300, 540, 960, 780); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, `rgba(0,0,0,${a})`); c.fillStyle = g; c.fillRect(0, 420, W, 1080); }
function warm(c, x, y, r, a) { c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, `rgba(255,190,110,${a})`); g.addColorStop(1, 'rgba(255,190,110,0)'); c.fillStyle = g; c.fillRect(x - r, y - r, 2 * r, 2 * r); c.restore(); }
// 1: zbliżenie — dwie twarze na dole, Kaptur góruje nad nimi
scene({ name: 'a', start: 0, end: 1, draw(c) {
  corridorBg(c, .5, { num: '94', num2: '93' }); night(c, .88, [{ x: 540, y: 1300, r: 600, a: .9 }]);
  person(c, 'kaptur', 540, 1960, 4.6, { t: .2, still: true, glow: .9 }); eyes(c, 540, 1960 - 4.6 * 236 + 4.6 * 4, 4.6);
  person(c, 'kuba', 300, 2120, 3.4, { t: .4, still: true, look: .6, wide: true, mouth: 'o' });
  person(c, 'ola', 790, 2120, 3.4, { t: .1, still: true, look: -.6, wide: true, mouth: 'o' });
  warm(c, 540, 1500, 520, .18); vign(c);
} });
// 2: Kaptur pochylony od góry, dzieci patrzą w obiektyw
scene({ name: 'b', start: 1, end: 2, draw(c) {
  corridorBg(c, .5, { num: '94', num2: '93' }); night(c, .9, [{ x: 540, y: 1250, r: 520, a: .9 }]);
  c.save(); c.translate(540, 1500); c.rotate(.0); person(c, 'kaptur', 0, 420, 4.0, { t: .2, still: true, glow: .9 }); c.restore();
  eyes(c, 540, 1920 - 4.0 * 236 + 16, 4.0);
  person(c, 'kuba', 340, 1900, 2.9, { t: .4, still: true, look: 0, wide: true, mouth: 'o' });
  person(c, 'ola', 740, 1900, 2.9, { t: .1, still: true, look: 0, wide: true, mouth: 'o' });
  warm(c, 540, 1450, 460, .16); vign(c);
} });
// 3: światło z telefonu Oli od dołu, Kaptur z ciemności z boku
scene({ name: 'c', start: 2, end: 3, draw(c) {
  c.fillStyle = '#07080c'; c.fillRect(0, 0, W, H); corridorBg(c, .5, { num: '94', num2: '93' }); night(c, .95, [{ x: 600, y: 1400, r: 380, a: .95, tint: 'rgba(170,210,255,.10)' }]);
  person(c, 'kaptur', 760, 1880, 4.2, { t: .2, still: true, glow: .9 }); eyes(c, 760, 1880 - 4.2 * 236 + 17, 4.2);
  person(c, 'kuba', 290, 1990, 2.8, { t: .4, still: true, look: .8, wide: true, mouth: 'o' });
  person(c, 'ola', 540, 1990, 2.8, { t: .1, still: true, look: .8, wide: true, mouth: 'o', phone: 2, aR: 1.4 });
  c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createRadialGradient(520, 1600, 0, 520, 1450, 520); g.addColorStop(0, 'rgba(170,210,255,.35)'); g.addColorStop(1, 'rgba(170,210,255,0)'); c.fillStyle = g; c.fillRect(0, 900, W, 1000); c.restore();
  vign(c, .9);
} });
// 4: Kaptur za ich plecami, dzieci odwracają głowy
scene({ name: 'd', start: 3, end: 4, draw(c) {
  corridorBg(c, .5, { num: '94', num2: '93' }); night(c, .86, [{ x: 540, y: 1250, r: 560, a: .9 }]);
  person(c, 'kaptur', 540, 1830, 3.6, { t: .2, still: true, glow: .9 }); eyes(c, 540, 1830 - 3.6 * 236 + 14, 3.6);
  person(c, 'kuba', 290, 2040, 3.0, { t: .4, still: true, look: 1, lookY: -1, wide: true, mouth: 'o' });
  person(c, 'ola', 800, 2040, 3.0, { t: .1, still: true, look: -1, lookY: -1, wide: true, mouth: 'o' });
  warm(c, 540, 1550, 520, .15); vign(c);
} });
