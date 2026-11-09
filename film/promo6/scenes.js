// Relacja TikTok: nowy odcinek + gra na stronie + easter egg (szukaj Kaptura)
window.EP = {
  badge: 'BLOK 94',
  loop: false,
  vignette: .6,
  hideHud: () => true,
  images: { c3: 'promo6/okladka-a.jpg', c4: 'promo6/okladka-b.jpg', gra: 'promo6/gra.png' },
  cues(add) { add(0.1, 'stab'); add(4.0, 'notif'); add(8.6, 'knock'); add(9.6, 'boom'); add(13.0, 'notif'); },
};
const S = [];
function scene(o) { S.push(o); return o; }
function img(c, k, x, y, w, h, r = 24) { const im = (window.IMGS || {})[k]; if (!im || !im.naturalWidth) return; c.save(); rr(c, x, y, w, h, r); c.clip(); const s = Math.max(w / im.naturalWidth, h / im.naturalHeight); c.drawImage(im, x + (w - im.naturalWidth * s) / 2, y, im.naturalWidth * s, im.naturalHeight * s); c.restore(); }
function sign(c, lt, l1, l2, y) {
  const sp = prog(lt, 0.1, 0.35); if (sp <= 0) return;
  c.save(); c.translate(540, y); const s = back(sp); c.scale(s, s); c.rotate(-0.02);
  c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 30; fillRR(c, -460, -120, 920, 240, 24, '#D7263D'); c.shadowColor = 'transparent';
  txt(c, l1, 0, -44, 88, '#FFFFFF', 900); txt(c, l2, 0, 54, 88, '#FFFFFF', 900); c.restore();
}
function door(c) { quilted(c, 0, 0, W, H, '#2A1E15', '#231910', '#5A4630', 90); c.fillStyle = 'rgba(8,10,14,.55)'; c.fillRect(0, 0, W, H); }

// 1. NOWA CZĘŚĆ
scene({
  name: 'nowa', start: 0, end: 4,
  draw(c, lt) {
    door(c);
    sign(c, lt, 'NOWY ODCINEK', 'JUŻ JEST!', 330);
    const a = eout(prog(lt, 0.5, 1.2));
    c.save(); c.translate(-(1 - a) * 400, 0); c.rotate(-.05); img(c, 'c3', 110, 560, 430, 540); c.restore();
    c.save(); c.translate((1 - a) * 400, 0); c.rotate(.05); img(c, 'c4', 560, 600, 430, 540); c.restore();
    if (lt > 1.4) label(c, '„KTO TAM?” · BLOK 94', 540, 1280, 'orange', 48, lt - 1.4, 9);
    if (lt > 2.0) label(c, 'OGLĄDAJ NA PROFILU ↓', 540, 1400, 'dark', 44, lt - 2.0, 9);
  },
});
// 2. GRA
scene({
  name: 'gra', start: 4, end: 8.5,
  labels: [[0.2, 4.5, 'SPRAWDŹ SIĘ W GRZE', 540, 230, 'red', 50]],
  draw(c, lt) {
    c.fillStyle = '#0B0C10'; c.fillRect(0, 0, W, H);
    bigPhone(c, (cc, x, y, w, h) => { cc.fillStyle = '#0a0c14'; cc.fillRect(x, y, w, h); const im = (window.IMGS || {}).gra; if (im && im.naturalWidth) { const s = w / im.naturalWidth; cc.drawImage(im, 0, 0, im.naturalWidth, h / s, x, y, w, h); } }, 1, 320);
    if (lt > 1.4) label(c, 'Otworzysz czy nie?', 540, 1600, 'dark', 44, lt - 1.4, 9);
  },
});
// 3. EASTER EGG
scene({
  name: 'egg', start: 8.5, end: 13,
  cam: lt => ({ z: 1.0 + lt * 0.02 }),
  draw(c, lt) {
    c.fillStyle = '#0B0C10'; c.fillRect(0, 0, W, H);
    peepPOV(c, lt, (cc, cx, cy, r) => { cc.fillStyle = '#A9A595'; cc.fillRect(cx - r, cy - r, 2 * r, 2 * r); const p = eio(prog(lt, .8, 2.0)); cc.save(); cc.translate(cx + lerp(420, 120, p), cy + 1080); person(cc, 'kaptur', 0, 0, 4.6, { t: lt, glow: 1 }); cc.restore(); });
    sign(c, lt, 'UKRYLIŚMY', 'EASTER EGG', 300);
    if (lt > 1.2) label(c, 'z zapowiedzią kolejnego odcinka', 540, 1450, 'dark', 42, lt - 1.2, 9);
    if (lt > 2.2) label(c, 'Podpowiedź: szukaj Kaptura', 540, 1560, 'orange', 44, lt - 2.2, 9);
  },
});
// 4. STRONA
scene({
  name: 'cta', start: 13, end: 17,
  draw(c, lt) {
    door(c);
    txt(c, 'WEJDŹ NA STRONĘ', 540, 380, 92, '#FFFFFF', 900);
    const a = back(clamp((lt - .3) / .35)); c.save(); c.translate(540, 540); c.scale(a, a); fillRR(c, -420, -64, 840, 128, 64, '#FFFFFF'); txt(c, 'protokolocaleni.online', 0, 2, 54, '#14161B', 900); c.restore();
    [['GRA „KTO TAM?”', 'orange'], ['AKTA SPRAWY KAPTURA', 'dark'], ['EASTER EGG', 'red']].forEach(([t, st], i) => { if (lt > .8 + i * .4) label(c, t, 540, 760 + i * 130, st, 46, lt - .8 - i * .4, 9); });
    if (lt > 2.2) label(c, 'LINK W BIO', 540, 1240, 'red', 64, lt - 2.2, 9);
    person(c, 'ola', 860, 1640, 1.6, { t: lt, phone: 2, aR: 2.2, mouth: 'smile' });
    person(c, 'kuba', 220, 1640, 1.6, { t: lt, aR: 2.5 + Math.sin(lt * 9) * .2, mouth: 'smile' });
  },
});
