// Awatar: koncepty ze scen serii (kwadrat 1080x1080 od y=420)
window.EP = { badge: '', loop: false, vignette: .0, hideHud: () => true, cues() {} };
const S = []; function scene(o) { S.push(o); return o; }
function eyes(c, x, y, s, col = '255,240,200', a = .45) { c.save(); c.globalCompositeOperation = 'lighter'; for (const dx of [-16, 16]) { const g = c.createRadialGradient(x + dx * s, y, 0, x + dx * s, y, 16 * s); g.addColorStop(0, `rgba(${col},${a})`); g.addColorStop(1, `rgba(${col},0)`); c.fillStyle = g; c.fillRect(x + dx * s - 16 * s, y - 16 * s, 32 * s, 32 * s); } c.restore(); }
function vign(c, a = .85) { const g = c.createRadialGradient(540, 960, 300, 540, 960, 780); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, `rgba(0,0,0,${a})`); c.fillStyle = g; c.fillRect(0, 420, W, 1080); }
function light(c, x, y, r, rgb, a) { c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, `rgba(${rgb},${a})`); g.addColorStop(1, `rgba(${rgb},0)`); c.fillStyle = g; c.fillRect(x - r, y - r, 2 * r, 2 * r); c.restore(); }
// 9: OKNO 94 — dzieci w oknie, w szybie odbija się Kaptur
scene({ name: 'a', start: 0, end: 1, draw(c) {
  c.fillStyle = '#2A3350'; c.fillRect(0, 0, W, H);
  for (let i = 0; i < 9; i++) c.fillRect(0, 420 + i * 130, W, 3);
  fillRR(c, 150, 560, 780, 820, 10, '#E9E4D6');
  c.save(); c.beginPath(); c.rect(180, 590, 720, 760); c.clip();
  c.fillStyle = '#F4C978'; c.fillRect(180, 590, 720, 760); light(c, 540, 700, 600, '255,220,150', .4);
  c.fillStyle = '#B04A3C'; c.fillRect(180, 590, 110, 760); c.fillRect(790, 590, 110, 760);
  person(c, 'kuba', 330, 1600, 2.2, { t: .4, still: true, look: 0, wide: true, mouth: 'o' });
  person(c, 'ola', 520, 1600, 2.2, { t: .1, still: true, look: 0, wide: true, mouth: 'o' });
  // odbicie Kaptura w szybie
  c.globalAlpha = .45; person(c, 'kaptur', 760, 1640, 3.4, { t: .2, still: true, glow: .9 }); c.globalAlpha = 1; eyes(c, 760, 1640 - 3.4 * 236 + 14, 3.4, '255,255,255', .5);
  c.fillStyle = 'rgba(160,190,230,.10)'; c.fillRect(180, 590, 720, 760);
  c.restore();
  c.fillStyle = '#E9E4D6'; c.fillRect(530, 560, 20, 820); c.fillRect(150, 960, 780, 18);
  fillRR(c, 120, 1370, 840, 40, 6, '#D7D1C2');
  for (let i = 0; i < 80; i++) circ(c, hash(i) * W, 420 + hash(i + 9) * 1080, 2 + hash(i + 3) * 4, 'rgba(255,255,255,.75)');
  vign(c, .75);
} });
// 10: DRZWI NA ŁAŃCUCHU — dzieci w szparze, z ciemności wyciąga się ręka
scene({ name: 'b', start: 1, end: 2, draw(c) {
  c.fillStyle = '#08090d'; c.fillRect(0, 0, W, H);
  quilted(c, 0, 420, 520, 1080, '#3a2819', '#2c1e12', '#9c7a43', 80); c.fillStyle = 'rgba(0,0,0,.55)'; c.fillRect(0, 420, 520, 1080);
  c.save(); c.beginPath(); c.rect(520, 420, 260, 1080); c.clip();
  c.fillStyle = '#F4C978'; c.fillRect(520, 420, 260, 1080); light(c, 650, 900, 500, '255,210,140', .35);
  person(c, 'ola', 610, 1840, 2.6, { t: .1, still: true, look: .8, wide: true, mouth: 'o' });
  person(c, 'kuba', 740, 1900, 2.6, { t: .4, still: true, look: .8, wide: true, mouth: 'o' });
  c.restore();
  quilted(c, 780, 420, 300, 1080, '#3a2819', '#2c1e12', '#9c7a43', 80); c.fillStyle = 'rgba(0,0,0,.4)'; c.fillRect(780, 420, 300, 1080);
  // łańcuch
  c.strokeStyle = '#C9CDD2'; c.lineWidth = 8; for (let i = 0; i < 7; i++) { c.beginPath(); c.ellipse(560 + i * 34, 830 + Math.sin(i / 6 * Math.PI) * 40, 18, 10, .2, 0, 7); c.stroke(); }
  // ręka z ciemności
  circ(c, 470, 1180, 46, '#454652'); fillRR(c, 300, 1150, 170, 70, 30, '#22252c');
  light(c, 380, 760, 180, '255,240,200', .25);
  c.save(); c.shadowColor = 'rgba(255,255,255,.9)'; c.shadowBlur = 30; ell(c, 330, 760, 22, 14, '#F4F1EA'); ell(c, 410, 760, 22, 14, '#F4F1EA'); c.restore(); circ(c, 336, 760, 8, '#111'); circ(c, 416, 760, 8, '#111');
  vign(c, .8);
} });
// 11: WINDA — drzwi się otwierają, w środku dzieci, przed windą Kaptur tyłem
scene({ name: 'c', start: 2, end: 3, draw(c) {
  lobbyBg(c, .5, { elevOpen: .75, floor: '9', inCab(cc) { person(cc, 'kuba', 470, 1400, 2.0, { t: .4, still: true, wide: true, mouth: 'o' }); person(cc, 'ola', 625, 1400, 2.0, { t: .1, still: true, wide: true, mouth: 'o' }); } });
  night(c, .7, [{ x: 545, y: 1000, r: 420, a: .9 }]);
  person(c, 'kaptur', 545, 2350, 4.6, { t: .2, still: true, back: true });
  vign(c, .8);
} });
// 12: DOMOFON — Kaptur na ekranie, dzieci w niebieskiej poświacie
scene({ name: 'd', start: 3, end: 4, draw(c) {
  c.fillStyle = '#0b0c10'; c.fillRect(0, 0, W, H); quilted(c, 0, 0, W, H, '#2a1d12', '#21170e', '#6e5530', 90); c.fillStyle = 'rgba(0,0,0,.6)'; c.fillRect(0, 0, W, H);
  c.save(); c.translate(540, 900); c.scale(.82, .82); c.translate(-540, -700); fillRR(c, 250, 470, 580, 460, 30, '#E6E0D2'); fillRR(c, 280, 500, 520, 340, 14, '#0a0d12');
  c.save(); c.beginPath(); c.rect(280, 500, 520, 340); c.clip(); c.fillStyle = '#5d7b78'; c.fillRect(280, 500, 520, 340);
  person(c, 'kaptur', 540, 1500, 3.2, { t: .2, still: true, glow: .9 }); eyes(c, 540, 1500 - 3.2 * 236 + 13, 3.2);
  c.fillStyle = 'rgba(0,30,20,.25)'; for (let y = 500; y < 840; y += 6) c.fillRect(280, y, 520, 2); c.restore();
  circ(c, 760, 880, 18, '#E04848'); c.restore();
  light(c, 540, 900, 620, '120,200,190', .3);
  person(c, 'kuba', 330, 1990, 2.6, { t: .4, still: true, look: .3, lookY: -1, wide: true, mouth: 'o' });
  person(c, 'ola', 760, 1990, 2.6, { t: .1, still: true, look: -.3, lookY: -1, wide: true, mouth: 'o' });
  light(c, 540, 1400, 600, '120,200,190', .18);
  vign(c, .8);
} });
