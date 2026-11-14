window.EP = { badge: '', loop: false, vignette: 0, hideHud: () => true, cues() {} };
const S = []; function scene(o) { S.push(o); return o; }
scene({ name: 'a', start: 0, end: 1, draw(c) { c.fillStyle = '#C9C4B4'; c.fillRect(0, 0, W, H);
  person(c, 'nina', 220, 1500, 3.0, { t: .3, still: true }); person(c, 'nina', 560, 1500, 3.0, { t: .3, still: true, wide: true, mouth: 'o', phone: 2, aR: 2.0 }); person(c, 'nina', 900, 1500, 3.0, { t: .3, still: true, back: true }); } });
