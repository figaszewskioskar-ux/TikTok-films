window.EP = { badge: '', loop: false, vignette: 0, hideHud: () => true, cues() {} };
const S = []; function scene(o) { S.push(o); return o; }
scene({ name: 'a', start: 0, end: 1, draw(c) { c.fillStyle = '#C9C4B4'; c.fillRect(0, 0, W, H);
  person(c, 'kuba', 200, 1500, 3.0, { t: .3, still: true }); person(c, 'kuba', 560, 1500, 3.0, { t: .3, still: true, home: true, wide: true, mouth: 'o' }); person(c, 'kuba', 900, 1500, 3.0, { t: .3, still: true, home: true, phone: 2, aR: 2.0, mouth: 'smile' }); } });
