// Relacja: podziękowanie za prawie 1000 obserwujących + zaproszenie na stronę
window.EP = {
  badge: 'BLOK 94',
  loop: false,
  vignette: .55,
  hideHud: () => true,
  cues(add) { add(0.1, 'motif'); add(4.4, 'pluck'); add(11.0, 'notif'); },
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
    const n = Math.round(lerp(0, 899, eout(prog(lt, 0.3, 3.4))));
    fillRR(c, 140, 560, 800, 300, 30, '#0D0F13');
    c.save(); c.shadowColor = 'rgba(255,59,48,.8)'; c.shadowBlur = 30; txt(c, String(n), 540, 710, 230, '#FF3B30', 900); c.restore();
    txt(c, 'OBSERWUJĄCYCH', 540, 920, 52, '#FFFFFF', 900);
    if (lt > 3.5) {
      const p = eout(prog(lt, 3.5, 4.4));
      fillRR(c, 190, 1010, 700, 40, 20, '#22263a'); fillRR(c, 190, 1010, 700 * .899 * p, 40, 20, '#F39C12');
      txt(c, 'BRAKUJE 101 DO 1000', 540, 1110, 46, '#F5C542', 900);
    }
    if (lt > 4.3) { confetti(c, lt - 4.3); label(c, 'PRAWIE 1000! DZIĘKUJEMY', 540, 380, 'red', 58, lt - 4.3, 9); }
  },
});
scene({
  name: 'cast', start: 6, end: 11,
  bubbles: [[0.6, 4.6, 'Ja tu znam wszystkich…\na was jest już prawie tysiąc!', 540, 830, 760, 1020, 'zdzisiek']],
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
scene({
  name: 'site', start: 11, end: 16,
  draw(c, lt) {
    c.fillStyle = '#0B0C10'; c.fillRect(0, 0, W, H);
    quilted(c, 0, 0, W, H, '#2A1E15', '#231910', '#5A4630', 90);
    c.fillStyle = 'rgba(8,10,14,.5)'; c.fillRect(0, 0, W, H);
    txt(c, 'WPADNIJ DO NAS', 540, 360, 96, '#FFFFFF', 900);
    const a = back(clamp((lt - .3) / .35));
    c.save(); c.translate(540, 520); c.scale(a, a); fillRR(c, -420, -64, 840, 128, 64, '#FFFFFF'); txt(c, 'protokolocaleni.online', 0, 2, 54, '#14161B', 900); c.restore();
    const items = [['GRA „KTO TAM?”', 'orange'], ['WSZYSTKIE CZĘŚCI', 'dark'], ['ZASADY Z BLOKU 94', 'dark']];
    items.forEach(([t, st], i) => { if (lt > 1.0 + i * .5) label(c, t, 540, 760 + i * 130, st, 46, lt - 1.0 - i * .5, 9); });
    if (lt > 2.8) label(c, 'LINK W BIO', 540, 1240, 'red', 64, lt - 2.8, 9);
    person(c, 'ola', 860, 1640, 1.6, { t: lt, phone: 2, aR: 2.2, mouth: 'smile' });
    person(c, 'kuba', 220, 1640, 1.6, { t: lt, aR: 2.5 + Math.sin(lt * 9) * .2, mouth: 'smile' });
  },
});
