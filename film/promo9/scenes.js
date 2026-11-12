// Story: strona BLOK 94 — 3 gry, akta sprawy i easter egg, wsparcie od 2 zł, link w bio.
window.EP = {
  badge: 'BLOK 94',
  loop: false,
  vignette: .55,
  hideHud: () => true,
  images: { menu: 'promo9/s_menu.png', wizjer: 'promo9/s_wizjer.png', akta: 'promo9/s_akta.png', tip: 'promo9/s_tip.png' },
  cues(add) { add(0.1, 'stab'); add(4.0, 'whoosh'); add(6.6, 'knock'); add(9.0, 'whoosh'); add(13.0, 'notif'); add(17.5, 'whoosh'); },
};
const S = [];
function scene(o) { S.push(o); return o; }
function sign(c, lt, l1, l2, y, col = '#D7263D') {
  const sp = prog(lt, 0.1, 0.35); if (sp <= 0) return;
  c.save(); c.translate(540, y); const s = back(sp); c.scale(s, s); c.rotate(-0.02);
  c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 30; fillRR(c, -460, -110, 920, 220, 24, col); c.shadowColor = 'transparent';
  txt(c, l1, 0, -40, 80, '#FFFFFF', 900); txt(c, l2, 0, 50, 80, '#FFFFFF', 900); c.restore();
}
function shot(cc, k, x, y, w, h, fromY = 0) { const im = (window.IMGS || {})[k]; if (!im || !im.naturalWidth) return; const s = w / im.naturalWidth; cc.drawImage(im, 0, fromY / s, im.naturalWidth, h / s, x, y, w, h); }
function door(c) { quilted(c, 0, 0, W, H, '#2A1E15', '#231910', '#5A4630', 90); c.fillStyle = 'rgba(8,10,14,.55)'; c.fillRect(0, 0, W, H); }
function chips(c, lt, items, y0, t0) { items.forEach(([t, st], i) => { if (lt > t0 + i * .35) label(c, t, 540, y0 + i * 112, st, 42, lt - t0 - i * .35, 9); }); }

// 1. ZAPROSZENIE
scene({
  name: 'site', start: 0, end: 4,
  draw(c, lt) {
    blockBg(c, lt, { night: true });
    c.fillStyle = 'rgba(7,9,16,.35)'; c.fillRect(0, 0, W, H);
    sign(c, lt, 'WPADNIJ DO', 'BLOKU 94', 340);
    const a = back(clamp((lt - .6) / .35)); c.save(); c.translate(540, 560); c.scale(a, a); fillRR(c, -400, -60, 800, 120, 60, '#FFFFFF'); txt(c, 'protokolocaleni.online', 0, 2, 50, '#14161B', 900); c.restore();
  },
});
// 2. GRY
scene({
  name: 'gry', start: 4, end: 9,
  draw(c, lt) {
    c.fillStyle = '#0B0C10'; c.fillRect(0, 0, W, H);
    const k = lt < 2.4 ? 'menu' : 'wizjer';
    const sl = lt > 2.2 && lt < 2.6 ? (lt - 2.2) / .4 : 0;
    bigPhone(c, (cc, x, y, w, h) => { cc.fillStyle = '#0a0c14'; cc.fillRect(x, y, w, h); shot(cc, k, x - sl * 60, y, w, h); }, 1, 430);
    sign(c, lt, '3 GRY', 'ZA DARMO', 220, '#F39C12');
    chips(c, lt, [['KTO TAM?', 'dark'], ['NOC W BLOKU 94', 'dark'], ['WIZJER: 3 SEKUNDY', 'red']], 1660, 1.0);
  },
});
// 3. AKTA + EASTER EGG
scene({
  name: 'akta', start: 9, end: 13,
  draw(c, lt) {
    c.fillStyle = '#0B0C10'; c.fillRect(0, 0, W, H);
    bigPhone(c, (cc, x, y, w, h) => { cc.fillStyle = '#0a0c14'; cc.fillRect(x, y, w, h); shot(cc, 'akta', x, y, w, h, lt * 40); }, 1, 430);
    sign(c, lt, 'AKTA SPRAWY', 'KAPTURA', 220);
    chips(c, lt, [['KTO JEST KAPTUREM?', 'dark'], ['EASTER EGG: OKNO 94 👀', 'orange']], 1660, .9);
  },
});
// 4. WSPARCIE
scene({
  name: 'wesprzyj', start: 13, end: 17.5,
  draw(c, lt) {
    door(c);
    sign(c, lt, 'WESPRZYJ', 'BLOK 94', 260);
    const a = eout(clamp((lt - .4) / .5)), im = (window.IMGS || {}).tip;
    if (im && im.naturalWidth) { const w = 760, s = w / im.naturalWidth, h = Math.min(im.naturalHeight * s, 980); c.save(); c.globalAlpha = a; c.translate(540, 480 + (1 - a) * 80); c.rotate(-.015); c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 40; rr(c, -w / 2, 0, w, h, 26); c.clip(); c.drawImage(im, 0, 0, im.naturalWidth, h / s, -w / 2, 0, w, h); c.restore(); }
    if (lt > 1.4) label(c, 'JUŻ OD 2 ZŁ ❤️', 540, 1580, 'red', 60, lt - 1.4, 9);
    if (lt > 2.0) label(c, 'każda złotówka = kolejne odcinki', 540, 1700, 'dark', 40, lt - 2.0, 9);
  },
});
// 5. LINK W BIO
scene({
  name: 'cta', start: 17.5, end: 21.5,
  draw(c, lt) {
    door(c);
    txt(c, 'WEJDŹ NA STRONĘ', 540, 380, 92, '#FFFFFF', 900);
    const a = back(clamp((lt - .3) / .35)); c.save(); c.translate(540, 540); c.scale(a, a); fillRR(c, -420, -64, 840, 128, 64, '#FFFFFF'); txt(c, 'protokolocaleni.online', 0, 2, 54, '#14161B', 900); c.restore();
    chips(c, lt, [['🎮 GRY', 'orange'], ['📁 AKTA SPRAWY', 'dark'], ['❤️ WSPARCIE', 'red']], 760, .7);
    if (lt > 2.0) label(c, 'LINK W BIO', 540, 1180, 'red', 64, lt - 2.0, 9);
    person(c, 'ola', 860, 1800, 1.6, { t: lt, phone: 2, aR: 2.2, mouth: 'smile' });
    person(c, 'kuba', 220, 1800, 1.6, { t: lt, aR: 2.5 + Math.sin(lt * 9) * .2, mouth: 'smile' });
  },
});
