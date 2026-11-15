// Story: nasza strona + nowa gra „Telefon o 2:00” — zachęta do zagrania i napisania wyniku
window.EP = {
  badge: 'PROTOKÓŁ OCALENI',
  loop: false,
  vignette: .6,
  hideHud: () => true,
  images: { gc: 'promo14/gc.png', ga: 'promo14/ga.png' },
  cues(add) { add(0.1, 'stab'); add(0.4, 'vib'); add(2.9, 'jolt'); add(5.0, 'hit'); add(8.0, 'tap'); add(8.3, 'ok'); add(11.0, 'hit'); add(17.0, 'hit'); add(19.0, 'notif'); },
};
const S = [];
function scene(o) { S.push(o); return o; }
function img(c, k, x, y, w, h, r = 24) { const im = (window.IMGS || {})[k]; if (!im || !im.naturalWidth) return; c.save(); rr(c, x, y, w, h, r); c.clip(); const s = Math.max(w / im.naturalWidth, h / im.naturalHeight); c.drawImage(im, x + (w - im.naturalWidth * s) / 2, y, im.naturalWidth * s, im.naturalHeight * s); c.restore(); }
function phoneBody(c, x, y, rot, s, screen, glow = 'rgba(255,45,85,.6)') { c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s);
  c.shadowColor = glow; c.shadowBlur = 120; fillRR(c, -250, -430, 500, 860, 72, '#16171C'); c.shadowColor = 'transparent'; fillRR(c, -244, -424, 488, 848, 68, '#2A2C34'); fillRR(c, -236, -416, 472, 832, 62, '#0B0D14');
  c.save(); rr(c, -226, -406, 452, 812, 54); c.clip(); screen(c); c.restore(); fillRR(c, -62, -394, 124, 28, 14, '#000'); c.restore(); }
function bg(c, lt, col = '#2A0C14') { const g = c.createRadialGradient(540, 900, 60, 540, 960, 1200); g.addColorStop(0, col); g.addColorStop(1, '#040406'); c.fillStyle = g; c.fillRect(0, 0, W, H); for (let i = 0; i < 40; i++) circ(c, hash(i) * W, (hash(i + 3) * H + lt * 30) % H, 2, 'rgba(255,255,255,.12)'); }
function pill(c, t, y, col = '#F5C542', fg = '#14161B', size = 40) { font(c, size, 900); const w = c.measureText(t).width + 80; fillRR(c, 540 - w / 2, y - 38, w, 76, 38, col); txt(c, t, 540, y, size, fg, 900); }
// 1. 2:10 w nocy, dzwoni „Komisarz Nowak”
scene({
  name: 's1', start: 0, end: 5, cam: jolt([2.9]),
  draw(c, lt) { bg(c, lt); const sh = lt < 2.9 ? Math.sin(lt * 60) * 6 : 0;
    phoneBody(c, 540 + sh, 1010, -.05, 1.25, (c) => { c.fillStyle = '#0B0D14'; c.fillRect(-226, -406, 452, 812); txt(c, '02:10', 0, -280, 96, '#FFFFFF', 800); txt(c, 'połączenie przychodzące', 0, -200, 24, '#9AA2AB', 700);
      circ(c, 0, -60, 80, '#3A3F4C'); txt(c, '👮', 0, -56, 80, '#FFFFFF', 900); txt(c, 'Komisarz Nowak', 0, 70, 40, '#FFFFFF', 900); txt(c, 'numer nieznany', 0, 115, 24, '#FF3B30', 800);
      const pu = 1 + .08 * Math.sin(lt * 8); circ(c, -110, 290, 52, '#FF3B30'); c.save(); c.translate(110, 290); c.scale(pu, pu); circ(c, 0, 0, 52, '#30A46C'); c.restore(); txt(c, '✕', -110, 292, 44, '#FFFFFF', 900); txt(c, '✆', 110, 294, 50, '#FFFFFF', 900); });
    if (lt < 2.9) { c.strokeStyle = 'rgba(255,59,48,.5)'; c.lineWidth = 14; c.lineCap = 'round'; for (let k = 0; k < 3; k++) { const r = 560 + k * 70 + (lt * 120 % 70); for (const sx of [0, Math.PI]) { c.beginPath(); c.arc(540, 1010, r, sx - .35, sx + .35); c.stroke(); } } }
  },
  post(c, lt) { joltFlash(c, lt, [2.9]); pill(c, 'NOWA GRA', 230); txt(c, 'TELEFON O 2:00', 540, 360, 84, '#FFFFFF', 900); if (lt > 3.0) pill(c, 'ODBIERZESZ?', 1780, '#D7263D', '#FFFFFF', 46); },
});
// 2. ekran gry: SMS „Nie śpisz?” i 3 odpowiedzi; palec wybiera dobrą → „Tak!”
scene({
  name: 's2', start: 5, end: 11,
  draw(c, lt) { bg(c, lt, '#14203A');
    phoneBody(c, 540, 1040, 0, 1.2, (c) => { c.fillStyle = '#0E1018'; c.fillRect(-226, -406, 452, 812); txt(c, '01:12', -180, -366, 22, '#FFFFFF', 800, 'left'); txt(c, 'Nieznany numer', 0, -310, 30, '#FFFFFF', 900);
      fillRR(c, -200, -250, 300, 80, 26, '#2A2D36'); txt(c, 'Nie śpisz?', -50, -210, 32, '#FFFFFF', 800);
      txt(c, 'Jest środek nocy. Nie znasz tego numeru.', 0, -120, 18, '#9AA2AB', 700);
      const opts = ['Odpisuję „kto to?”', 'Nie odpisuję, robię zrzut\ni rano mówię rodzicom', 'Dzwonię, żeby sprawdzić'];
      opts.forEach((o, i) => { const y = -50 + i * 130, sel = i === 1 && lt > 3.0; fillRR(c, -200, y, 400, 110, 22, sel ? '#30A46C' : '#1E2230'); c.strokeStyle = sel ? '#6CFF9A' : '#3A3F4C'; c.lineWidth = 3; rr(c, -200, y, 400, 110, 22); c.stroke();
        const ls = o.split('\n'); ls.forEach((l, k) => txt(c, l, 0, y + 55 + (k - (ls.length - 1) / 2) * 30, 24, '#FFFFFF', 800)); });
      if (lt > 3.3) { fillRR(c, -200, 340, 400, 50, 16, 'rgba(48,164,108,.25)'); txt(c, 'Tak! +1 punkt', 0, 365, 26, '#6CFF9A', 900); } });
    if (lt > 2.2 && lt < 4.4) { const p = clamp((lt - 2.2) / .8); hand(c, lerp(760, 590, p), lerp(1420, 1150, p), .9, KINDS.kuba); }
  },
  post(c, lt) { pill(c, 'TY DECYDUJESZ', 230); txt(c, '12 nocnych sytuacji', 540, 350, 50, '#FFFFFF', 900); },
});
// 3. strona: PROTOKÓŁ OCALENI, wynik __/10, napisz w komentarzu
scene({
  name: 's3', start: 11, end: 17,
  draw(c, lt) { bg(c, lt, '#2A0C14'); const p = eout(clamp(lt / .5));
    c.save(); c.globalAlpha = p; c.shadowColor = 'rgba(0,0,0,.7)'; c.shadowBlur = 50; img(c, 'gc', 300, 440, 480, 480, 100); c.restore();
    c.save(); c.translate(540, 1180); c.globalAlpha = p; fillRR(c, -360, -110, 720, 220, 30, 'rgba(14,16,24,.92)'); c.strokeStyle = '#F5C542'; c.lineWidth = 4; rr(c, -360, -110, 720, 220, 30); c.stroke();
    txt(c, 'TWÓJ WYNIK', 0, -60, 30, '#9AA2AB', 900); const n = Math.min(10, Math.floor(clamp((lt - .6) / 2.2) * 8)); c.save(); c.shadowColor = '#F5C542'; c.shadowBlur = 30; txt(c, `${n}/10`, 0, 30, 110, '#F5C542', 900); c.restore(); c.restore(); },
  post(c, lt) { txt(c, 'PROTOKÓŁ', 540, 230, 76, '#FFFFFF', 900); txt(c, 'OCALENI', 540, 320, 76, '#D7263D', 900);
    if (lt > 2.6) { const q = eout(clamp((lt - 2.6) / .4)); c.save(); c.globalAlpha = q; pill(c, '💬 Napisz swój wynik w komentarzu 👇', 1480, '#FE2C55', '#FFFFFF', 38); c.restore(); }
    txt(c, 'protokolocaleni.online', 540, 1620, 44, '#FFFFFF', 900); },
});
// 4. link w bio
scene({
  name: 's4', start: 17, end: 21,
  draw(c, lt) { bg(c, lt, '#14203A'); c.save(); c.shadowColor = 'rgba(0,0,0,.7)'; c.shadowBlur = 50; img(c, 'gc', 160, 560, 360, 360, 80); img(c, 'ga', 560, 560, 360, 360, 80); c.restore();
    txt(c, 'Telefon o 2:00', 340, 970, 34, '#FFFFFF', 900); txt(c, 'Noc w bloku 94', 740, 970, 34, '#FFFFFF', 900); },
  post(c, lt) { pill(c, 'ZAGRAJ ZA DARMO', 330); const b = 1 + .06 * Math.sin(lt * 6); c.save(); c.translate(540, 1200); c.scale(b, b); fillRR(c, -330, -70, 660, 140, 70, '#FE2C55'); txt(c, 'LINK W BIO 👆', 0, 2, 64, '#FFFFFF', 900); c.restore();
    txt(c, 'protokolocaleni.online', 540, 1380, 44, '#FFFFFF', 900); txt(c, '@protokolocaleni', 540, 1460, 36, '#C9CDD2', 800); },
});
