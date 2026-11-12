// Story: nowe filmy (ODC. 7 + NOCNY N94) · ODC. 8 jutro 00:00 · nowy easter egg: okno 104
window.EP = {
  badge: 'BLOK 94',
  loop: false,
  vignette: .6,
  hideHud: () => true,
  images: { c7: 'promo10/c7.jpg', n94: 'promo10/n94.jpg', hero: 'promo10/hero.jpg', odc8: 'promo10/odc8.jpg' },
  cues(add) { add(0.1, 'stab'); add(5.0, 'hit'); add(9.6, 'stab'); add(12.2, 'knock'); add(13.6, 'hit'); add(17.6, 'notif'); },
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
function card2(c, k, x, y, rot, tag, st, lt, t0) {
  const a = eout(prog(lt, t0, t0 + .6)); if (a <= 0) return;
  c.save(); c.translate(x + (1 - a) * (x < 540 ? -500 : 500), y); c.rotate(rot);
  c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 40; fillRR(c, -222, -278, 444, 556, 26, '#F3EFE6'); c.shadowColor = 'transparent';
  img(c, k, -210, -266, 420, 525, 18); c.restore();
  if (lt > t0 + .5) label(c, tag, x, y + 330, st, 36, lt - t0 - .5, 9);
}
// 1. NOWE FILMY JUŻ NA KANALE
scene({
  name: 'nowe', start: 0, end: 5,
  draw(c, lt) {
    door(c);
    sign(c, lt, 'NOWE FILMY', 'JUŻ NA KANALE!', 300);
    card2(c, 'c7', 290, 820, -.05, 'BLOK 94 · ODC. 7', 'orange', lt, .5);
    card2(c, 'n94', 790, 860, .05, 'NOWA SERIA · NOCNY N94', 'red', lt, 1.1);
    if (lt > 2.4) label(c, 'OGLĄDAJ NA PROFILU ↓', 540, 1340, 'dark', 48, lt - 2.4, 9);
    if (lt > 1.6) person(c, 'kuba', 200, 1900, 1.3, { t: lt, mouth: 'o', wide: true, aR: 2.4 + Math.sin(lt * 9) * .2 });
    if (lt > 1.6) person(c, 'ola', 880, 1900, 1.3, { t: lt, phone: 2, aR: 2.2, mouth: 'smile' });
  },
});
// 2. ODC. 8 JUTRO 00:00 — tablica LED jak na stronie
scene({
  name: 'jutro', start: 5, end: 9.5,
  draw(c, lt) {
    c.fillStyle = '#07080C'; c.fillRect(0, 0, W, H);
    const a = back(clamp((lt - .1) / .35)); c.save(); c.translate(540, 760); c.scale(a, a);
    const on = Math.floor(lt * 2) % 2 === 0;
    c.fillStyle = 'rgba(6,7,10,.95)'; c.fillRect(-470, -230, 940, 460);
    c.save(); c.strokeStyle = on ? '#ff3b30' : 'rgba(120,40,35,.6)'; if (on) { c.shadowColor = 'rgba(255,40,30,.95)'; c.shadowBlur = 40; } c.lineWidth = 10; c.strokeRect(-470, -230, 940, 460); c.restore();
    c.save(); c.shadowColor = 'rgba(255,40,30,.9)'; c.shadowBlur = 30;
    txt(c, 'NASTĘPNY ODCINEK', 0, -140, 64, '#ff3b30', 900);
    // odliczanie do 00:00 (minuty i sekundy lecą)
    const s = Math.max(0, 59 - Math.floor(lt * 3) % 60);
    txt(c, lt < 2.2 ? '23:59:' + String(s).padStart(2, '0') : 'JUTRO 00:00', 0, 30, lt < 2.2 ? 170 : 124, '#ff3b30', 900);
    c.restore();
    c.fillStyle = 'rgba(0,0,0,.35)'; for (let gy = -226; gy < 230; gy += 7) c.fillRect(-470, gy, 940, 2);
    c.restore();
    if (lt > 1.0) label(c, 'BLOK 94 · ODC. 8', 540, 1130, 'orange', 56, lt - 1.0, 9);
    if (lt > 2.2) label(c, 'PIĄTEK 13.11', 540, 1270, 'red', 64, lt - 2.2, 9);
    if (lt > 1.4) person(c, 'kaptur', 540, 1900, 1.7, { t: lt, still: true, alpha: clamp((lt - 1.4) / 1.5) * .9 });
    night(c, .5, [{ x: 540, y: 760, r: 700, a: .9 }]);
  },
});
// 3. NOWY EASTER EGG: okno 104 (Kaptur w oknie)
function heroAt(c, z, cx, cy, fx, fy) { const im = (window.IMGS || {}).hero; if (!im || !im.naturalWidth) return; c.save(); c.translate(cx, cy); c.scale(z, z); c.drawImage(im, -fx, -fy); c.restore(); }
scene({
  name: 'egg', start: 9.5, end: 17.5,
  draw(c, lt) {
    c.fillStyle = '#0A0D18'; c.fillRect(0, 0, W, H);
    const p = eio(prog(lt, 0.4, 2.2)), z = lerp(1, 3.2, p), fx = 701, fy = lerp(675, 47, p);
    heroAt(c, z, 540, lerp(960, 900, p), fx, fy);
    // światło w oknie 104 i sylwetka Kaptura
    const on = lt > 2.4 ? clamp((lt - 2.4) / .4) * (.85 + .15 * Math.sin(lt * 23)) : 0;
    if (on > 0) {
      const ww = 72 * z, wh = 55 * z, wx = 540 - ww / 2 + (665 + 36 - fx - 36) * z, wy = 900 + (20 - fy) * z;
      c.save(); c.globalCompositeOperation = 'lighter'; const g = c.createRadialGradient(wx + ww / 2, wy + wh / 2, 4, wx + ww / 2, wy + wh / 2, ww * 1.7); g.addColorStop(0, `rgba(220,70,50,${.5 * on})`); g.addColorStop(1, 'rgba(220,70,50,0)'); c.fillStyle = g; c.fillRect(wx - ww * 1.5, wy - wh * 1.5, ww * 4, wh * 4); c.restore();
      c.fillStyle = `rgba(200,70,50,${.75 * on})`; c.fillRect(wx, wy, ww, wh);
      c.fillStyle = 'rgba(6,6,9,.95)'; c.beginPath(); c.arc(wx + ww * .5, wy + wh * .46, ww * .17, 0, 7); c.fill(); c.beginPath(); c.moveTo(wx + ww * .18, wy + wh); c.quadraticCurveTo(wx + ww * .5, wy + wh * .5, wx + ww * .82, wy + wh); c.fill();
      if (!(lt > 4.6 && lt < 4.75)) { c.fillStyle = `rgba(255,245,220,${on})`; c.beginPath(); c.arc(wx + ww * .44, wy + wh * .47, ww * .03, 0, 7); c.arc(wx + ww * .56, wy + wh * .47, ww * .03, 0, 7); c.fill(); }
      // kliknięcie
      const a = lt - 2.7; if (a > 0 && a < .6) { c.save(); c.globalAlpha = 1 - a / .6; c.strokeStyle = '#FFFFFF'; c.lineWidth = 8; c.beginPath(); c.arc(wx + ww / 2, wy + wh / 2, 60 + a * 220, 0, 7); c.stroke(); c.restore(); }
      if (lt > 2.7 && lt < 3.4) { c.save(); c.translate(wx + ww * .8, wy + wh * 1.1); c.fillStyle = '#FFFFFF'; c.beginPath(); c.moveTo(0, 0); c.lineTo(0, 70); c.lineTo(18, 54); c.lineTo(32, 84); c.lineTo(44, 78); c.lineTo(30, 50); c.lineTo(54, 50); c.closePath(); c.fill(); c.restore(); }
    }
    // podgląd tajnej zapowiedzi (rozmyty)
    if (lt > 4.1) {
      const a = back(clamp((lt - 4.1) / .4)), im = (window.IMGS || {}).odc8;
      c.save(); c.translate(540, 1460); c.scale(a, a); c.rotate(-.04);
      fillRR(c, -270, -180, 540, 360, 20, '#16120e');
      if (im && im.naturalWidth) { c.save(); rr(c, -250, -160, 500, 320, 12); c.clip(); c.filter = 'blur(12px)'; c.drawImage(im, -250, -300, 500, 500 * im.naturalHeight / im.naturalWidth); c.filter = 'none'; c.restore(); }
      c.strokeStyle = '#D7263D'; c.lineWidth = 6; rr(c, -250, -160, 500, 320, 12); c.stroke();
      txt(c, 'ZAPOWIEDŹ · ODC. 8', 0, 0, 44, '#FFFFFF', 900);
      c.restore();
    }
  },
  post(c, lt) {
    if (lt > 0.2) label(c, 'NOWY EASTER EGG', 540, 300, 'red', 64, lt - .2, 9);
    if (lt > 1.0) label(c, 'kliknij okno 104, gdy zapali się światło', 540, 430, 'orange', 40, lt - 1.0, 9);
    if (lt > 5.2) label(c, 'Ktoś tam czeka…', 540, 1720, 'dark', 46, lt - 5.2, 9);
  },
});
// 4. STRONA
scene({
  name: 'cta', start: 17.5, end: 21.5,
  draw(c, lt) {
    door(c);
    txt(c, 'WEJDŹ NA STRONĘ', 540, 380, 92, '#FFFFFF', 900);
    const a = back(clamp((lt - .3) / .35)); c.save(); c.translate(540, 540); c.scale(a, a); fillRR(c, -420, -64, 840, 128, 64, '#FFFFFF'); txt(c, 'protokolocaleni.online', 0, 2, 54, '#14161B', 900); c.restore();
    [['ODLICZANIE DO ODC. 8', 'orange'], ['NOWE FILMY NA KANALE', 'dark'], ['EASTER EGG: OKNO 104', 'red']].forEach(([t, st], i) => { if (lt > .8 + i * .4) label(c, t, 540, 760 + i * 130, st, 46, lt - .8 - i * .4, 9); });
    if (lt > 2.2) label(c, 'LINK W BIO', 540, 1240, 'red', 64, lt - 2.2, 9);
    person(c, 'ola', 860, 1900, 1.6, { t: lt, phone: 2, aR: 2.2, mouth: 'smile' });
    person(c, 'kuba', 220, 1900, 1.6, { t: lt, aR: 2.5 + Math.sin(lt * 9) * .2, mouth: 'smile' });
  },
});
