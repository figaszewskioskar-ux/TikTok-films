window.EP = { badge: 'POSTACIE', loop: false, vignette: .3, hideHud: () => true, cues() {} };
const S = [{ name: 'a', start: 0, end: 2, draw(c, lt) {
  hallBg(c, 0);
  const K = [['ola', { phone: 2, aR: .9, mouth: 'smile' }], ['kuba', { mouth: 'smile' }], ['zdzisiek', { net: true }], ['policjant', {}], ['kaptur', { glow: 1 }], ['sasiad', { mouth: 'smile' }], ['kobieta', {}], ['halina', {}]];
  K.slice(0, 4).forEach(([k, o], i) => person(c, k, 150 + i * 260, 1150, 1.45, Object.assign({ t: 1 }, o)));
  K.slice(4).forEach(([k, o], i) => person(c, k, 150 + i * 260, 1800, 1.45, Object.assign({ t: 1 }, o)));
} }];
