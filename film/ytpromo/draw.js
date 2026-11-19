// Grafiki do filmu na YouTube: boczne panele (promocja strony + stojące postacie), wstawka „wbijaj na stronę”, miniaturka 1280x720.
// Uruchamiane w film.html?ep=klasa4 (dostęp do person, creepyFace, keyRing, txt, fillRR…). Obrazy przekazywane jako data URL.
window.YT = {};
const IMG = {};
YT.load = async (srcs) => { for (const [k, v] of Object.entries(srcs)) { const im = new Image(); im.src = v; await im.decode(); IMG[k] = im; } };
function ysnow(c, lt, x0, w, h, n, a) { for (let k = 0; k < n; k++) { const x = x0 + (hash(k) * w + Math.sin(lt * .8 + k) * 14) % w, y = (hash(k + 50) * h + lt * (40 + hash(k + 9) * 60)) % h; circ(c, x, y, 1.4 + hash(k + 3) * 2.2, `rgba(235,240,255,${a})`); } }
function blockBgY(c, x0, w, h) { const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#05070F'); g.addColorStop(1, '#141A2E'); c.fillStyle = g; c.fillRect(x0, 0, w, h);
  c.fillStyle = '#1B2236'; c.fillRect(x0 + 20, 120, w - 40, h); for (let r = 0; r < 12; r++) for (let q = 0; q < 6; q++) { const hv = hash(x0 + r * 7 + q * 13); fillRR(c, x0 + 46 + q * ((w - 92) / 6), 150 + r * 76, (w - 92) / 6 - 18, 44, 3, hv > .72 ? '#E8B860' : hv > .66 ? '#7FA8E0' : '#0E1322'); }
  c.fillStyle = 'rgba(5,6,10,.55)'; c.fillRect(x0, 0, w, h); }
function urlBox(c, x, y, w, s = 1) { c.save(); c.translate(x, y); c.scale(s, s); fillRR(c, -w / 2, -40, w, 80, 40, '#F5C542'); txt(c, 'protokolocaleni.online', 0, 2, 38, '#14161B', 900); c.restore(); }
// ---------- boczne panele (1920x1080, środek przezroczysty: 656..1264) ----------
YT.sides = (c, lt) => { c.clearRect(0, 0, 1920, 1080);
  for (const x0 of [0, 1264]) { blockBgY(c, x0, 656, 1080); ysnow(c, lt, x0, 656, 1080, 60, .6); }
  // LEWY: strona + gra + QR
  fillRR(c, 60, 150, 536, 64, 32, '#F5C542'); txt(c, 'PROTOKÓŁ OCALENI', 328, 182, 32, '#14161B', 900);
  txt(c, 'Wbijaj na naszą stronę!', 328, 268, 40, '#FFFFFF', 900);
  urlBox(c, 328, 340, 520, 1);
  c.save(); c.shadowColor = 'rgba(245,197,66,.4)'; c.shadowBlur = 30; c.drawImage(IMG.qr, 228, 392, 200, 200); c.restore();
  [['🎮', 'Gra: przetrwaj noc w bloku 94'], ['📱', 'Gra: telefon o 2:00'], ['❤️', 'Wesprzyj serię']].forEach(([e, t], i) => { fillRR(c, 70, 612 + i * 58, 516, 48, 14, 'rgba(14,16,24,.88)'); txt(c, e + '  ' + t, 328, 637 + i * 58, 25, '#E9E6DC', 800); });
  person(c, 'kuba', 150, 1150, 1.05, { t: lt, look: 1, phone: true }); person(c, 'nina', 510, 1150, 1.0, { t: lt, look: -1 });
  // PRAWY: kanał, codziennie 17:00, postacie
  fillRR(c, 1324, 150, 536, 64, 32, '#D7263D'); txt(c, 'GRUPA KLASOWA', 1592, 182, 32, '#FFFFFF', 900);
  txt(c, 'Nowy odcinek', 1592, 268, 40, '#FFFFFF', 900); txt(c, 'codziennie 17:00', 1592, 318, 44, '#F5C542', 900);
  fillRR(c, 1352, 370, 480, 70, 35, '#FE2C55'); txt(c, 'TikTok @protokolocaleni', 1592, 406, 30, '#FFFFFF', 900);
  fillRR(c, 1392, 462, 400, 64, 32, '#FF0033'); txt(c, '🔔 Subskrybuj', 1592, 495, 30, '#FFFFFF', 900);
  txt(c, 'Kto ma zapasowe klucze?', 1592, 586, 30, '#C9CDD2', 800); txt(c, 'Pisz w komentarzu 👇', 1592, 626, 30, '#C9CDD2', 800);
  personB(c, 1400, 1150, 1.05, { t: lt, look: 1 }); person(c, 'zuzia', 1640, 1150, 1.0, { t: lt, look: -1 });
  c.save(); c.globalAlpha = .9; szatniarz(c, 1845, 1160, 1.15, { t: lt, mouth: 'grin', look: -1, keys: false }); c.restore(); c.fillStyle = 'rgba(5,6,10,.35)'; c.fillRect(1760, 700, 160, 380);
  // ramka wokół filmu
  c.fillStyle = 'rgba(245,197,66,.8)'; c.fillRect(652, 0, 4, 1080); c.fillRect(1264, 0, 4, 1080); };
// ---------- wstawka 14 s ----------
YT.insert = (c, t) => { c.fillStyle = '#05060A'; c.fillRect(0, 0, 1920, 1080); blockBgY(c, 0, 1920, 1080); ysnow(c, t, 0, 1920, 1080, 140, .7);
  // latarka
  c.save(); c.globalCompositeOperation = 'lighter'; const lx = 560 + Math.sin(t * .9) * 120; const g = c.createRadialGradient(lx, 520, 20, lx, 520, 520); g.addColorStop(0, 'rgba(255,240,200,.22)'); g.addColorStop(1, 'rgba(255,240,200,0)'); c.fillStyle = g; c.fillRect(0, 0, 1920, 1080); c.restore();
  // telefon ze stroną (najpierw gra, potem strona główna)
  const pin = eout(clamp(t / .7)), px = 520, py = 560 + (1 - pin) * 700;
  c.save(); c.translate(px, py); c.rotate(-.05 + Math.sin(t * 1.3) * .015); c.shadowColor = 'rgba(160,120,255,.5)'; c.shadowBlur = 80; fillRR(c, -230, -470, 460, 940, 60, '#16171C'); c.shadowColor = 'transparent';
  c.beginPath(); rr(c, -210, -450, 420, 900, 44); c.clip(); const im = t < 7 ? IMG.gra : IMG.home; const sc = 420 / im.width, sy = t < 7 ? -clamp((t - 2.5) / 4) * 500 : -clamp((t - 7) / 4) * 300; c.drawImage(im, -210, -450 + sy, 420, im.height * sc); c.restore();
  // Kuba z boku, przerażony / zaciekawiony
  person(c, 'kuba', 170, 1180, 1.7, { t, look: 1, wide: t > 3.6, mouth: t > 3.6 ? 'o' : null });
  // teksty
  const R = 1340;
  if (t > .5) { const a = eout(clamp((t - .5) / .4)); c.save(); c.globalAlpha = a; txt(c, 'PRZETRWASZ NOC', R, 220, 84, '#FFFFFF', 900); txt(c, 'W BLOKU 94?', R, 310, 84, '#D7263D', 900); c.restore(); }
  if (t > 4.6) { const a = eout(clamp((t - 4.6) / .4)); c.save(); c.globalAlpha = a; c.translate(R, 430); c.scale(.8 + .2 * a, .8 + .2 * a); fillRR(c, -330, -50, 660, 100, 50, '#F5C542'); txt(c, '🎮 ZAGRAJ W NASZĄ GRĘ', 0, 2, 44, '#14161B', 900); c.restore(); }
  if (t > 7.2) { const a = eout(clamp((t - 7.2) / .4)); c.save(); c.globalAlpha = a; txt(c, 'Wbijaj na stronę:', R, 560, 46, '#FFFFFF', 900); urlBox(c, R, 640, 700, 1.25 + .03 * Math.sin(t * 6)); c.restore(); }
  if (t > 8.6) { const a = eout(clamp((t - 8.6) / .4)); c.save(); c.globalAlpha = a; c.drawImage(IMG.qr, R - 260, 740, 220, 220); ['🎮 2 gry', '🎬 Wszystkie serie', '❤️ Wsparcie'].forEach((s, i) => txt(c, s, R + 60, 780 + i * 66, 38, '#E9E6DC', 800, 'left')); c.restore(); }
  if (t > 10.8) { const a = clamp((t - 10.8) / .3); c.save(); c.globalAlpha = a; fillRR(c, R - 250, 990, 500, 64, 32, '#FF0033'); txt(c, 'LINK W OPISIE ↓', R, 1023, 34, '#FFFFFF', 900); c.restore(); }
  // straszny akcent: w oknie za Kubą uśmiech
  if (t > 12.6) { const a = clamp((t - 12.6) / .2); c.save(); c.globalAlpha = a; creepyFace(c, 1820, 160, .6, 1, t); c.restore(); }
  const vg = c.createRadialGradient(960, 540, 400, 960, 540, 1150); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,.6)'); c.fillStyle = vg; c.fillRect(0, 0, 1920, 1080); };
// ---------- miniaturka 1280x720 ----------
YT.thumb = (c) => { c.save(); c.scale(1280 / 1920, 720 / 1080); const t = 1;
  szatnia_wide(c); person(c, 'kuba', 330, 1500, 2.9, { t, look: 1, wide: true, mouth: 'o', phone: true, still: true });
  c.save(); c.globalCompositeOperation = 'lighter'; const kg = c.createRadialGradient(360, 760, 20, 360, 760, 420); kg.addColorStop(0, 'rgba(160,190,255,.35)'); kg.addColorStop(1, 'rgba(160,190,255,0)'); c.fillStyle = kg; c.fillRect(0, 300, 900, 780); c.restore();
  creepyFace(c, 1560, 620, 2.3, 1, t); keyRing(c, 1760, 900, 1.0, 0, 0);
  // dymek z czatu
  c.save(); c.translate(960, 300); c.rotate(-.03); c.shadowColor = 'rgba(0,0,0,.7)'; c.shadowBlur = 30; fillRR(c, -300, -70, 600, 140, 34, '#FFFFFF'); c.shadowColor = 'transparent'; circ(c, -240, 0, 40, '#FF3B30'); txt(c, 'N', -240, 2, 40, '#FFFFFF', 900); txt(c, 'Nie śpisz, Kuba? 🙂', 50, 0, 46, '#14161B', 900); c.restore();
  // tytuł
  fillRR(c, 700, 470, 520, 70, 35, '#F5C542'); txt(c, 'CAŁA SERIA · ODC. 1–4', 960, 506, 38, '#14161B', 900);
  c.save(); c.translate(960, 700); c.rotate(-.03); c.shadowColor = 'rgba(0,0,0,.8)'; c.shadowBlur = 40; fillRR(c, -430, -130, 860, 260, 24, '#D7263D'); c.shadowColor = 'transparent'; txt(c, 'GRUPA', 0, -50, 120, '#FFFFFF', 900); txt(c, 'KLASOWA', 0, 70, 120, '#FFFFFF', 900); c.restore();
  const vg = c.createRadialGradient(960, 540, 300, 960, 540, 1100); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,.65)'); c.fillStyle = vg; c.fillRect(0, 0, 1920, 1080); c.restore(); };
function szatnia_wide(c) { c.fillStyle = '#0B0C11'; c.fillRect(0, 0, 1920, 1080); c.save(); c.translate(0, -560); c.scale(1.0, 1.0); szatnia(c, 1, { lenaJacket: true }); c.translate(1080, 0); szatnia(c, 1, { lenaJacket: false }); c.restore(); c.fillStyle = 'rgba(2,3,8,.72)'; c.fillRect(0, 0, 1920, 1080); }
