// Rolka: zaproszenie do gry BLOK 94 (protokolocaleni.online → Graj)
window.EP = {
  badge: 'BLOK 94 · GRA',
  loop: false,
  vignette: .7,
  hideHud: () => true,
  images: { menu: 'promo1/gra-menu.png', wizjer: 'promo1/gra-wizjer.png', noc: 'promo1/gra-noc.png' },
  cues(add) { add(0.2, 'knock'); add(0.3, 'stab'); add(4.0, 'notif'); add(10.0, 'notif'); add(16.0, 'boom'); },
};
const S = [];
function scene(o) { S.push(o); return o; }
function shot(c, key, x, y, w, h, pan) {
  const im = (window.IMGS || {})[key]; if (!im || !im.naturalWidth) return;
  const s = w / im.naturalWidth, vh = h / s, sy = clamp(pan, 0, 1) * Math.max(0, im.naturalHeight - vh);
  c.drawImage(im, 0, sy, im.naturalWidth, Math.min(vh, im.naturalHeight - sy), x, y, w, Math.min(h, (im.naturalHeight - sy) * s));
}
function bigSign(c, lt, l1, l2, y = 360) {
  const sp = prog(lt, 0.1, 0.35); if (sp <= 0) return;
  c.save(); c.translate(540, y); const s = back(sp); c.scale(s, s); c.rotate(-0.02);
  c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 30; c.shadowOffsetY = 10;
  fillRR(c, -450, -120, 900, 240, 24, '#D7263D'); c.shadowColor = 'transparent';
  txt(c, l1, 0, -44, 92, '#FFFFFF', 900); txt(c, l2, 0, 54, 92, '#FFFFFF', 900);
  c.restore();
}

scene({
  name: 'hook', start: 0, end: 4,
  cam: lt => ({ z: 1.04 + lt * 0.02 }),
  labels: [[0.2, 4, 'PUK.  PUK.  PUK.', 540, 1500, 'dark', 50]],
  draw(c, lt) { peepPOV(c, lt, (cc, cx, cy, r) => tapeTexture(cc, cx, cy, r)); bigSign(c, lt, 'KTOŚ PUKA.', 'CO ROBISZ?'); },
});
scene({
  name: 'mode1', start: 4, end: 10,
  labels: [[0.2, 6, 'TRYB 1 · KTO TAM?', 540, 230, 'orange', 44]],
  draw(c, lt) {
    c.fillStyle = '#0B0C10'; c.fillRect(0, 0, W, H);
    bigPhone(c, (cc, x, y, w, h) => { cc.fillStyle = '#0a0c14'; cc.fillRect(x, y, w, h); shot(cc, 'wizjer', x, y, w, h, prog(lt, 1.0, 5.5) * .5); }, 1, 300);
  },
});
scene({
  name: 'mode2', start: 10, end: 16,
  labels: [[0.2, 6, 'TRYB 2 · NOC W BLOKU 94', 540, 230, 'red', 44]],
  draw(c, lt) {
    c.fillStyle = '#0B0C10'; c.fillRect(0, 0, W, H);
    bigPhone(c, (cc, x, y, w, h) => { cc.fillStyle = '#0a0c14'; cc.fillRect(x, y, w, h); shot(cc, 'noc', x, y, w, h, prog(lt, 1.0, 5.5) * .45); }, 1, 300);
  },
});
scene({
  name: 'cta', start: 16, end: 23,
  cam: lt => ({ z: 1.0 + lt * 0.01 }),
  draw(c, lt) {
    c.fillStyle = '#0B0C10'; c.fillRect(0, 0, W, H);
    quilted(c, 0, 0, W, H, '#2A1E15', '#231910', '#5A4630', 90);
    c.fillStyle = 'rgba(8,10,14,.55)'; c.fillRect(0, 0, W, H);
    bigSign(c, lt, 'ZAGRAJ', 'ZA DARMO', 380);
    if (lt > 0.8) {
      const a = back(clamp((lt - .8) / .35));
      c.save(); c.translate(540, 690); c.scale(a, a);
      fillRR(c, -400, -60, 800, 120, 60, '#FFFFFF'); txt(c, 'protokolocaleni.online', 0, 2, 52, '#14161B', 900); c.restore();
    }
    if (lt > 1.6) label(c, '→ przycisk „GRAJ”', 540, 820, 'orange', 44, lt - 1.6, 9);
    person(c, 'kuba', 300, 1500, 2.0, { t: lt, aR: 2.4 + Math.sin(lt * 8) * .2, mouth: 'smile' });
    person(c, 'ola', 780, 1500, 2.0, { t: lt, phone: 2, aR: 2.2, mouth: 'smile' });
    if (lt > 2.4) label(c, 'LINK W BIO', 540, 1640, 'red', 60, lt - 2.4, 9);
  },
});
