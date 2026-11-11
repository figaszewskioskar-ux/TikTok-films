// Rolka: ponad 2000 obserwujących (2301) — dziękujemy, nowy easter egg (okno 94), zaproszenie na stronę
window.EP = {
  badge: 'BLOK 94',
  loop: false,
  vignette: .55,
  hideHud: () => true,
  images: { hero: 'promo7/hero.jpg', odc7: 'promo7/odc7.jpg' },
  cues(add) { add(0.1, 'motif'); add(4.4, 'pluck'); add(11.2, 'stab'); add(13.0, 'knock'); add(13.5, 'knock'); add(14.0, 'knock'); add(15.2, 'hit'); add(19.0, 'notif'); },
};
const S = [];
function scene(o) { S.push(o); return o; }
function confetti(c, t, n = 90) {
  const cols = ['#F39C12', '#D7263D', '#7B4FC9', '#1BB0A3', '#F5C542', '#FFFFFF'];
  for (let i = 0; i < n; i++) {
    const x = (hash(i) * W + Math.sin(t * 2 + i) * 40) % W, y = ((hash(i + 7) * H) + t * (220 + hash(i + 3) * 200)) % H;
    c.save(); c.translate(x, y); c.rotate(t * 3 + i); fillRR(c, -8, -4, 16, 8, 2, cols[i % cols.length]); c.restore();
  }
}

scene({
  name: 'count', start: 0, end: 6,
  cam: lt => ({ z: 1.0 + lt * 0.01 }),
  draw(c, lt) {
    blockBg(c, lt, { night: true });
    c.fillStyle = 'rgba(7,9,16,.55)'; c.fillRect(0, 0, W, H);
    const n = Math.round(lerp(0, 2301, eout(prog(lt, 0.3, 3.4))));
    fillRR(c, 140, 560, 800, 300, 30, '#0D0F13');
    c.save(); c.shadowColor = 'rgba(255,59,48,.8)'; c.shadowBlur = 30; txt(c, String(n), 540, 710, 230, '#FF3B30', 900); c.restore();
    txt(c, 'OBSERWUJĄCYCH', 540, 920, 52, '#FFFFFF', 900);
    if (lt > 3.5) {
      const p = eout(prog(lt, 3.5, 4.4));
      fillRR(c, 190, 1010, 700, 40, 20, '#22263a'); fillRR(c, 190, 1010, 700 * .4602 * p, 40, 20, '#F39C12');
      txt(c, 'NASTĘPNY CEL: 5000', 540, 1110, 46, '#F5C542', 900);
    }
    if (lt > 4.6) { label(c, '29,7 TYS. POLUBIEŃ', 540, 1260, 'dark', 44, lt - 4.6, 9); if (lt > 5.0) label(c, '581 TYS. WYŚWIETLEŃ ODC. 2', 540, 1370, 'dark', 44, lt - 5.0, 9);
    }
    if (lt > 4.3) { confetti(c, lt - 4.3); label(c, 'PONAD 2000! DZIĘKUJEMY', 540, 380, 'red', 58, lt - 4.3, 9); }
  },
});
scene({
  name: 'cast', start: 6, end: 11,
  bubbles: [[0.6, 4.6, 'Ja tu znam wszystkich…\na was już ponad 2000!', 540, 830, 760, 1020, 'zdzisiek']],
  draw(c, lt, sc) {
    lobbyBg(c, lt, { floor: '9' });
    person(c, 'kuba', 230, 1500, 1.9, { t: lt, aR: 2.5 + Math.sin(lt * 9) * .25, mouth: 'smile' });
    person(c, 'ola', 480, 1500, 1.9, { t: lt, aL: 2.4 + Math.sin(lt * 8 + 1) * .25, mouth: 'smile' });
    person(c, 'zdzisiek', 760, 1500, 1.95, { t: lt, net: true, aL: 2.6 + Math.sin(lt * 10) * .25, talk: (sc.bubbles || []).some(b => lt > b[0] && lt < b[0] + 2.6) });
    const peek = eio(prog(lt, 2.4, 3.4)) * (1 - eio(prog(lt, 4.2, 4.8)));
    person(c, 'kaptur', lerp(1200, 1010, peek), 1480, 1.9, { t: lt, glow: .5, look: -1 });
    confetti(c, lt + 3, 50);
  },
});
function heroImg(c, z, cx, cy) { const im = (window.IMGS || {}).hero; if (!im || !im.naturalWidth) return; c.save(); c.translate(cx, cy); c.scale(z, z); c.drawImage(im, -701, -136); c.restore(); }
// NOWY EASTER EGG: okno 94
scene({
  name: 'egg', start: 11, end: 19,
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
      txt(c, 'ŚCIŚLE TAJNE · ODC. 7', 0, 0, 40, '#FFFFFF', 900);
      c.restore();
    }
  },
  post(c, lt) {
    if (lt > 0.2) label(c, 'NOWY EASTER EGG', 540, 300, 'red', 64, lt - .2, 9);
    if (lt > 2.0 && lt < 4.2) label(c, 'PUK. PUK. PUK.', 540, 640, 'dark', 50, lt - 2.0, 4.2 - lt);
    if (lt > 1.2) label(c, 'zapukaj 3× w okno 94 na stronie', 540, 430, 'orange', 44, lt - 1.2, 9);
  },
});
scene({
  name: 'site', start: 19, end: 27,
  draw(c, lt) {
    c.fillStyle = '#0B0C10'; c.fillRect(0, 0, W, H);
    quilted(c, 0, 0, W, H, '#2A1E15', '#231910', '#5A4630', 90);
    c.fillStyle = 'rgba(8,10,14,.5)'; c.fillRect(0, 0, W, H);
    txt(c, 'WPADNIJ DO NAS', 540, 360, 96, '#FFFFFF', 900);
    const a = back(clamp((lt - .3) / .35));
    c.save(); c.translate(540, 520); c.scale(a, a); fillRR(c, -420, -64, 840, 128, 64, '#FFFFFF'); txt(c, 'protokolocaleni.online', 0, 2, 54, '#14161B', 900); c.restore();
    const items = [['GRA „KTO TAM?”', 'orange'], ['AKTA SPRAWY KAPTURA', 'dark'], ['NOWY EASTER EGG: OKNO 94', 'red']];
    items.forEach(([t, st], i) => { if (lt > 1.0 + i * .5) label(c, t, 540, 760 + i * 130, st, 46, lt - 1.0 - i * .5, 9); });
    if (lt > 2.8) label(c, 'LINK W BIO', 540, 1240, 'red', 64, lt - 2.8, 9);
    person(c, 'ola', 860, 1800, 1.6, { t: lt, phone: 2, aR: 2.2, mouth: 'smile' });
    person(c, 'kuba', 220, 1800, 1.6, { t: lt, aR: 2.5 + Math.sin(lt * 9) * .2, mouth: 'smile' });
  },
});
