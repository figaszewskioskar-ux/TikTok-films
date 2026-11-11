// Story: nowe odcinki (5 i 6) + gra + easter egg w oknie 94 (zwiastun ODC. 7) + strona
window.EP = {
  badge: 'BLOK 94',
  loop: false,
  vignette: .6,
  hideHud: () => true,
  images: { c3: 'promo8/okladka-a.jpg', c4: 'promo8/okladka-b.jpg', gra: 'promo8/gra.png', hero: 'promo8/hero.jpg', odc7: 'promo8/odc7.jpg' },
  cues(add) { add(0.1, 'stab'); add(4.0, 'notif'); add(8.6, 'stab'); add(10.5, 'knock'); add(11.0, 'knock'); add(11.5, 'knock'); add(12.7, 'hit'); add(16.6, 'notif'); },
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
    sign(c, lt, 'NOWE ODCINKI', 'JUŻ SĄ!', 330);
    const a = eout(prog(lt, 0.5, 1.2));
    c.save(); c.translate(-(1 - a) * 400, 0); c.rotate(-.05); img(c, 'c3', 110, 560, 430, 540); c.restore();
    c.save(); c.translate((1 - a) * 400, 0); c.rotate(.05); img(c, 'c4', 560, 600, 430, 540); c.restore();
    if (lt > 1.4) label(c, 'BLOK 94', 540, 1280, 'orange', 48, lt - 1.4, 9);
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
// 3. EASTER EGG: okno 94
function heroImg(c, z, cx, cy) { const im = (window.IMGS || {}).hero; if (!im || !im.naturalWidth) return; c.save(); c.translate(cx, cy); c.scale(z, z); c.drawImage(im, -701, -136); c.restore(); }
// NOWY EASTER EGG: okno 94
scene({
  name: 'egg', start: 8.5, end: 16.5,
  draw(c, lt) {
    c.fillStyle = '#0A0D18'; c.fillRect(0, 0, W, H);
    const z = lerp(1, 2.2, eio(prog(lt, 0.6, 2.0)));
    heroImg(c, z, lerp(701, 540, eio(prog(lt, .6, 2))), lerp(421, 900, eio(prog(lt, .6, 2))));
    // pukanie w okno
    for (const [t0, i] of [[2.0, 0], [2.5, 1], [3.0, 2]]) { const a = lt - t0; if (a > 0 && a < .5) { c.save(); c.globalAlpha = 1 - a / .5; c.strokeStyle = '#8CB4FF'; c.lineWidth = 8; c.beginPath(); c.arc(540, 900, 90 + a * 160, 0, 7); c.stroke(); c.restore(); } }
    if (lt > 4.2) { const g = clamp((lt - 4.2) / .3) * (0.6 + 0.4 * Math.sin(lt * 8)); c.save(); c.globalCompositeOperation = 'lighter'; const gr = c.createRadialGradient(540, 900, 10, 540, 900, 420); gr.addColorStop(0, `rgba(140,180,255,${.7 * g})`); gr.addColorStop(1, 'rgba(140,180,255,0)'); c.fillStyle = gr; c.fillRect(0, 400, W, 1000); c.restore(); }
    // podgląd tajnej zapowiedzi (rozmyty)
    if (lt > 4.6) {
      const a = back(clamp((lt - 4.6) / .4)), im = (window.IMGS || {}).odc7;
      c.save(); c.translate(540, 1420); c.scale(a, a); c.rotate(-.04);
      fillRR(c, -250, -170, 500, 340, 20, '#16120e');
      if (im && im.naturalWidth) { c.save(); rr(c, -230, -150, 460, 300, 12); c.clip(); c.filter = 'blur(10px)'; c.drawImage(im, -230, -230, 460, 575); c.filter = 'none'; c.restore(); }
      c.strokeStyle = '#D7263D'; c.lineWidth = 6; rr(c, -230, -150, 460, 300, 12); c.stroke();
      txt(c, 'ZAPOWIEDŹ · ODC. 7', 0, 0, 40, '#FFFFFF', 900);
      c.restore();
    }
  },
  post(c, lt) {
    if (lt > 0.2) label(c, 'NOWY EASTER EGG', 540, 300, 'red', 64, lt - .2, 9);
    if (lt > 2.0 && lt < 4.2) label(c, 'PUK. PUK. PUK.', 540, 640, 'dark', 50, lt - 2.0, 4.2 - lt);
    if (lt > 1.2) label(c, 'zapukaj 3× w okno 94 na stronie', 540, 430, 'orange', 44, lt - 1.2, 9);
  },
});
// 4. STRONA
scene({
  name: 'cta', start: 16.5, end: 20.5,
  draw(c, lt) {
    door(c);
    txt(c, 'WEJDŹ NA STRONĘ', 540, 380, 92, '#FFFFFF', 900);
    const a = back(clamp((lt - .3) / .35)); c.save(); c.translate(540, 540); c.scale(a, a); fillRR(c, -420, -64, 840, 128, 64, '#FFFFFF'); txt(c, 'protokolocaleni.online', 0, 2, 54, '#14161B', 900); c.restore();
    [['GRA', 'orange'], ['AKTA SPRAWY KAPTURA', 'dark'], ['EASTER EGG: OKNO 94', 'red']].forEach(([t, st], i) => { if (lt > .8 + i * .4) label(c, t, 540, 760 + i * 130, st, 46, lt - .8 - i * .4, 9); });
    if (lt > 2.2) label(c, 'LINK W BIO', 540, 1240, 'red', 64, lt - 2.2, 9);
    person(c, 'ola', 860, 1640, 1.6, { t: lt, phone: 2, aR: 2.2, mouth: 'smile' });
    person(c, 'kuba', 220, 1640, 1.6, { t: lt, aR: 2.5 + Math.sin(lt * 9) * .2, mouth: 'smile' });
  },
});
