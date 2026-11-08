// BLOK 94 · „KTO TAM?” CZĘŚĆ 2 — fałszywa policja, prawdziwy radiowóz, relacja „sama na chacie”.
window.EP = {
  badge: 'BLOK 94 · ODCINEK 3',
  loop: true,
  vignette: .75,
  cues(add) {
    add(0.3, 'stab');
    add(20.3, 'bang'); add(33.0, 'unlock'); add(33.4, 'error');
    add(45.4, 'boom'); add(50.4, 'handle'); add(56.2, 'siren'); add(59.5, 'run');
    add(64.4, 'radio'); add(88.2, 'error'); add(94.3, 'notif'); add(97.8, 'boom');
  },
};

const S = [];
function scene(o) { S.push(o); return o; }
function talking(sc, who, lt) {
  return (sc.bubbles || []).some(b => b[7] === who && lt >= b[0] && lt < b[0] + Math.min(b[1] - b[0] - .2, .055 * b[2].length + .3));
}
// telefon z bliska (ekran rysuje fn)
function bigPhone(c, fn, a = 1, y = 330) {
  c.save(); c.globalAlpha *= a;
  const x = 230, w = 620, h = 1180;
  c.shadowColor = 'rgba(0,0,0,.7)'; c.shadowBlur = 50; fillRR(c, x, y, w, h, 70, '#0E0F12'); c.shadowColor = 'transparent';
  c.save(); rr(c, x + 22, y + 22, w - 44, h - 44, 52); c.clip(); fn(c, x + 22, y + 22, w - 44, h - 44); c.restore();
  fillRR(c, x + w / 2 - 70, y + 36, 140, 30, 15, '#0E0F12');
  c.restore();
}
function windowView(c, x, y, w, h) {
  const g = c.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, '#0A0F22'); g.addColorStop(1, '#1D2540'); c.fillStyle = g; c.fillRect(x, y, w, h);
  c.fillStyle = '#20283F'; c.fillRect(x + 40, y + h * .35, w * .55, h * .65); c.fillRect(x + w * .62, y + h * .5, w * .4, h * .5);
  for (let i = 0; i < 28; i++) { const lit = hash(i + 40) > .8; fillRR(c, x + 60 + (i % 7) * 44, y + h * .4 + Math.floor(i / 7) * 60, 26, 34, 2, lit ? '#E9BE55' : '#151B2E'); }
  circ(c, x + w * .8, y + h * .15, 26, '#E8E4CF');
  // ramka okna z dziewiątego piętra
  c.strokeStyle = 'rgba(217,214,206,.5)'; c.lineWidth = 8; c.strokeRect(x + 8, y + 8, w - 16, h - 16); c.beginPath(); c.moveTo(x + w / 2, y); c.lineTo(x + w / 2, y + h); c.stroke();
}

// 0. HAK — oko w wizjerze (koniec części 1)
scene({
  name: 'hook', start: 0, end: 6,
  cam: lt => ({ z: 1.04 + lt * 0.01 }),
  labels: [[1.4, 6, 'ODCINEK 3', 540, 1480, 'yellow', 48]],
  draw(c, lt) {
    peepPOV(c, lt, (cc, cx, cy, r) => { cc.fillStyle = '#A9A595'; cc.fillRect(cx - r, cy - r, 2 * r, 2 * r); cc.save(); cc.translate(cx, cy + 1080); person(cc, 'kaptur', 0, 0, 4.6, { t: lt, glow: 1 }); cc.restore(); });
    const sp = prog(lt, 0.15, 0.4), shake = lt < 1 ? (1 - lt) * 9 : 0;
    if (sp > 0) {
      c.save(); c.translate(540 + Math.sin(lt * 70) * shake, 390); const s = back(sp); c.scale(s, s); c.rotate(-0.02);
      c.shadowColor = 'rgba(0,0,0,.6)'; c.shadowBlur = 30; c.shadowOffsetY = 10;
      fillRR(c, -450, -120, 900, 240, 24, '#D7263D'); c.shadowColor = 'transparent';
      c.strokeStyle = 'rgba(255,255,255,.35)'; c.lineWidth = 4; rr(c, -436, -106, 872, 212, 16); c.stroke();
      txt(c, 'NIE OTWIERAJ', 0, -44, 92, '#FFFFFF', 900); txt(c, '„POLICJI”!', 0, 54, 92, '#FFFFFF', 900);
      c.restore();
    }
  },
});
// 1. PRZYPOMNIENIE — Ola odskakuje
scene({
  name: 'recap', start: 6, end: 12,
  cam: lt => ({ z: 1.0 + lt * 0.01 }),
  draw(c, lt) {
    hallBg(c, lt);
    const x = lt < 3.4 ? 640 : mv(lt, 3.4, 3.9, 640, 880, eout);
    person(c, 'ola', x, 1500, 2.15, { t: lt, phone: 2, aR: 0.9, look: -1, wide: true, mouth: 'o' });
    night(c, .8, [{ x: x + 70, y: 1180, r: 480, a: .95, tint: 'rgba(80,220,150,.08)' }, { x: 540, y: 1425, r: 300, a: .7 }]);
  },
});
// 2. 112 NA LINII
scene({
  name: 'call', start: 12, end: 20,
  cam: lt => ({ z: 1.0 + lt * 0.008 }),
  labels: [[0.5, 8, '112 · POŁĄCZENIE TRWA', 540, 300, 'dark', 40], [2.0, 8, 'PATROL: 5 MINUT', 540, 390, 'yellow', 40]],
  bubbles: [[2.2, 5.4, 'Proszę się nie rozłączać.\nPatrol już jedzie.', 470, 880, 780, 1010, 'dyspozytorka']],
  draw(c, lt) {
    hallBg(c, lt);
    person(c, 'ola', 780, 1560, 2.0, { t: lt, phone: 2, aR: 2.5, look: -1, squash: .78 });
    night(c, .82, [{ x: 780, y: 1050, r: 380, a: .95, tint: 'rgba(80,220,150,.10)' }, { x: 540, y: 1425, r: 300, a: .7 }]);
  },
});
// 3. "POLICJA!"
scene({
  name: 'bang', start: 20, end: 30,
  cam: lt => { const b = [0.3, 0.75, 1.2].some(k => lt > k && lt < k + .16); return { z: 1.02 + lt * 0.006, x: b ? Math.sin(lt * 95) * 16 : 0, y: b ? Math.cos(lt * 80) * 8 : 0 }; },
  labels: [[0.3, 1.6, 'BUM!  BUM!  BUM!', 540, 300, 'dark', 50]],
  bubbles: [[1.6, 4.8, 'Policja!\nProszę otworzyć drzwi!', 420, 880, 520, 1000, 'falszywy']],
  draw(c, lt) {
    hallBg(c, lt);
    const up = mv(lt, 5.0, 5.8, .78, 1);
    person(c, 'ola', 780, lerp(1560, 1500, (up - .78) / .22), 2.0 + (up - .78) * .7, { t: lt, phone: 2, aR: up < 1 ? 2.5 : 0.9, look: -1, squash: up, wide: true, mouth: lt > 5 ? 'smile' : 'o' });
    night(c, .8, [{ x: 780, y: 1050, r: 400, a: .95, tint: 'rgba(80,220,150,.08)' }, { x: 540, y: 1425, r: 320, a: .8 }]);
  },
});
// 4. ODBLOKOWANIE — błąd 1
scene({
  name: 'unlock', start: 30, end: 38,
  cam: lt => ({ z: 1.0 + lt * 0.015 }),
  draw(c, lt) {
    hallBg(c, lt);
    const x = mv(lt, 0.4, 2.4, 820, 760);
    person(c, 'ola', x, 1500, 2.15, { t: lt, phone: 2, aR: 0.9, aL: mv(lt, 2.2, 2.9, .14, 1.55), walk: lt > .4 && lt < 2.4 ? lt * 5 : null, look: -1, mouth: 'smile' });
    if (lt > 3.0) { const p = prog(lt, 3.0, 3.3); c.save(); c.translate(705, 1000); c.rotate(p * 1.57); fillRR(c, -8, -30, 16, 60, 6, '#E2E5E8'); c.restore(); }
    night(c, .78, [{ x: x + 70, y: 1180, r: 480, a: .95, tint: 'rgba(80,220,150,.08)' }, { x: 540, y: 1425, r: 300, a: .7 }]);
  },
  post(c, lt) { if (lt > 3.5) card(c, 70, 330, 860, 'BŁĄD 1', 'otworzyła zamek, nie sprawdzając,\nkto stoi za drzwiami', lt - 3.5, '#F39C12', 44); },
});
// 5. SPRAWDZENIE PRZEZ 112
scene({
  name: 'verify', start: 38, end: 48,
  cam: lt => ({ z: 1.0 }),
  labels: [[7.3, 10, 'TO NIE JEST POLICJA', 540, 1620, 'red', 52]],
  draw(c, lt) {
    c.fillStyle = '#07080C'; c.fillRect(0, 0, W, H);
    bigPhone(c, (cc, x, y, w, h) => {
      const g = cc.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, '#13361F'); g.addColorStop(1, '#0B1410'); cc.fillStyle = g; cc.fillRect(x, y, w, h);
      txt(cc, '112', x + w / 2, y + 220, 120, '#FFFFFF', 900);
      txt(cc, 'Centrum Powiadamiania Ratunkowego', x + w / 2, y + 310, 26, '#9FD7B5', 600);
      const sec = 252 + Math.floor(lt);
      txt(cc, `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`, x + w / 2, y + 370, 40, '#CFEBDB', 700);
      const pr = (lt * .9) % 1; cc.strokeStyle = `rgba(80,220,150,${.6 * (1 - pr)})`; cc.lineWidth = 4; cc.beginPath(); cc.arc(x + w / 2, y + 640, 90 + pr * 70, 0, 7); cc.stroke();
      circ(cc, x + w / 2, y + 640, 90, '#1E5A36'); txt(cc, 'GŁOŚNIK', x + w / 2, y + 645, 26, '#CFEBDB', 800);
      circ(cc, x + w / 2, y + h - 150, 64, '#E5484D'); fillRR(cc, x + w / 2 - 34, y + h - 158, 68, 16, 8, '#FFFFFF');
    });
    // dymki rozmowy
    const B = (a, b, s, y, st) => { if (lt >= a && lt < b) bubble(c, s, 540, y, st === 'l' ? 330 : 750, y + 120, lt - a, b - lt, 40); };
    B(0.3, 3.0, 'Czy policja jest już\npod moimi drzwiami?', 980, 'l');
    B(3.0, 7.4, 'Nie. Patrol jest 4 minuty\nod pani. Proszę nie otwierać.', 1260, 'r');
  },
});
// 6. KLAMKA
scene({
  name: 'handle', start: 48, end: 56,
  cam: lt => ({ z: 1.08 + lt * 0.01 }),
  draw(c, lt) {
    const hd = lt < 2.4 ? 0 : lt < 5.2 ? eio(prog(lt, 2.4, 4.6)) * .65 : mv(lt, 5.2, 5.5, .65, 0);
    hallBg(c, lt, { handle: hd });
    if (lt < 1.6) { const p = prog(lt, 0.5, 0.9); c.save(); c.translate(705, 1000); c.rotate((1 - p) * 1.57); fillRR(c, -8, -30, 16, 60, 6, '#E2E5E8'); c.restore(); }
    const x = lt < 2.0 ? 760 : mv(lt, 2.6, 3.6, 760, 900);
    person(c, 'ola', x, 1500, 2.15, { t: lt, phone: 2, aR: 0.9, aL: lt < 1.4 ? 1.55 : .14, look: -1, wide: true, mouth: lt > 2.6 ? 'o' : null });
    night(c, .8, [{ x: x + 70, y: 1180, r: 460, a: .95, tint: 'rgba(80,220,150,.08)' }, { x: 610, y: 1000, r: 220, a: .6 }, { x: 540, y: 1425, r: 300, a: .7 }]);
  },
  post(c, lt) { if (lt > 5.4) card(c, 70, 330, 860, 'ZASADA', 'Ktoś mówi, że jest z policji?\nZapytaj 112, czy patrol jest pod drzwiami.', lt - 5.4, '#F39C12', 40); },
});
// 7. RADIOWÓZ
scene({
  name: 'sirens', start: 56, end: 64,
  cam: lt => ({ z: 1.0 + lt * 0.02 }),
  labels: [[0.5, 8, 'PRAWDZIWA POLICJA', 540, 300, 'dark', 42]],
  draw(c, lt) {
    blockBg(c, lt, { night: true });
    const cx = mv(lt, 0, 2.2, -300, 420, eout);
    fillRR(c, cx - 170, 1560, 340, 90, 26, '#E8ECF0'); fillRR(c, cx - 100, 1505, 200, 70, 24, '#E8ECF0');
    c.fillStyle = '#1F4FA8'; c.fillRect(cx - 170, 1592, 340, 22); txt(c, 'POLICJA', cx, 1603, 22, '#FFFFFF', 900);
    circ(c, cx - 110, 1652, 28, '#0A0C12'); circ(c, cx + 110, 1652, 28, '#0A0C12');
    const on = Math.floor(lt * 6) % 2;
    fillRR(c, cx - 50, 1490, 44, 18, 6, on ? '#3A7BFF' : '#1B2A55'); fillRR(c, cx + 6, 1490, 44, 18, 6, on ? '#2A3048' : '#FF3B3B');
    night(c, .45, [{ x: cx, y: 1500, r: 700, a: .7, tint: on ? 'rgba(60,120,255,.35)' : 'rgba(255,50,50,.25)' }]);
    snow(c, lt + 56, 70, .5);
  },
});
// 8. KLATKA — kobieta zatrzymana
scene({
  name: 'stairs', start: 64, end: 74,
  cam: lt => ({ z: 1.0 + lt * 0.006 }),
  labels: [[1.0, 10, 'ZATRZYMANA', 620, 760, 'red', 42], [4.0, 10, 'KAPTUR: UCIEKŁ', 540, 300, 'dark', 44]],
  draw(c, lt) {
    c.fillStyle = '#9C9A8C'; c.fillRect(0, 0, W, 1060); c.fillStyle = '#3E5A47'; c.fillRect(0, 1050, W, 350);
    for (let r = 0; r < 8; r++) for (let q = 0; q < 14; q++) { c.fillStyle = (r + q) % 2 ? '#3A3530' : '#2C2824'; c.fillRect(q * 80 - (r % 2) * 40, 1400 + r * 70, 80, 70); }
    stairsUp(c, 420, 1400, 11, 38);
    fillRR(c, 700, 520, 130, 54, 8, '#16181C'); txt(c, '3', 765, 548, 36, '#FF3B30', 900);
    person(c, 'kobieta', 600, 1480, 2.0, { t: lt, look: 1, aL: .5, aR: .5 });
    person(c, 'policjant', 820, 1490, 2.1, { t: lt, look: -1, aL: 1.2 });
    person(c, 'policjant', 270, 1240, 1.9, { t: lt, look: 1 });
    const on = Math.floor(lt * 6) % 2;
    night(c, .45, [{ x: 540, y: 300, r: 800, a: .8 }, { x: 1080, y: 900, r: 500, a: .6, tint: on ? 'rgba(60,120,255,.18)' : 'rgba(255,50,50,.12)' }]);
  },
});
// 9. RANO — pytanie policjanta
scene({
  name: 'morning', start: 74, end: 82,
  cam: lt => ({ z: 1.0 + lt * 0.008 }),
  bubbles: [[2.6, 7.6, 'Skąd oni wiedzieli,\nże jesteś sama?', 330, 840, 260, 1010, 'policjant']],
  draw(c, lt, sc) {
    ROOM(c);
    const sky = c.createLinearGradient(0, 380, 0, 800); sky.addColorStop(0, '#9FC6EA'); sky.addColorStop(1, '#F3D9B0');
    fillRR(c, 620, 380, 320, 420, 8, sky); circ(c, 860, 470, 34, '#FFF2C4');
    c.fillStyle = '#C9CDD6'; c.fillRect(775, 380, 10, 420); c.fillRect(620, 585, 320, 10);
    c.fillStyle = 'rgba(255,220,170,.10)'; c.fillRect(0, 0, W, H);
    fillRR(c, 40, 560, 220, 830, 4, '#4A3A2C');
    person(c, 'policjant', 260, 1500, 2.15, { t: lt, look: 1, talk: talking(sc, 'policjant', lt) });
    person(c, 'ola', 520, 1300, 1.9, { t: lt, look: -1, phone: 1, aR: .9, wide: lt > 7 });
    fillRR(c, 80, 1250, 760, 200, 30, '#4A5A8A');
    const g = c.createRadialGradient(780, 560, 50, 780, 560, 900); g.addColorStop(0, 'rgba(255,214,150,.35)'); g.addColorStop(1, 'rgba(255,214,150,0)'); c.fillStyle = g; c.fillRect(0, 0, W, H);
  },
});
// 10. RELACJA Z WCZORAJ — błąd 2
scene({
  name: 'story', start: 82, end: 94,
  cam: lt => ({ z: 1.0 }),
  draw(c, lt) {
    c.fillStyle = '#0B0C10'; c.fillRect(0, 0, W, H);
    const list = lt > 7.6;
    bigPhone(c, (cc, x, y, w, h) => {
      if (!list) {
        windowView(cc, x, y, w, h);
        for (let i = 0; i < 3; i++) fillRR(cc, x + 20 + i * ((w - 40) / 3), y + 50, (w - 40) / 3 - 8, 6, 3, i === 0 ? '#FFFFFF' : 'rgba(255,255,255,.4)');
        circ(cc, x + 50, y + 100, 26, '#7B4FC9'); txt(cc, 'ola', x + 90, y + 100, 28, '#FFFFFF', 800, 'left'); txt(cc, '22:13', x + 150, y + 100, 26, 'rgba(255,255,255,.7)', 600, 'left');
        if (lt > 3.4) {
          const p = back(clamp((lt - 3.4) / .3));
          cc.save(); cc.translate(x + w / 2, y + h * .42); cc.scale(p, p); cc.rotate(-.05);
          fillRR(cc, -250, -60, 500, 120, 14, '#FFFFFF'); txt(cc, 'sama na chacie do rana', 0, 2, 38, '#111', 900); cc.restore();
          cc.save(); cc.translate(x + w / 2, y + h * .56); cc.scale(p, p); fillRR(cc, -200, -36, 400, 72, 36, 'rgba(255,255,255,.92)'); circ(cc, -150, -6, 14, '#D7263D'); cc.fillStyle = '#D7263D'; cc.beginPath(); cc.moveTo(-162, 0); cc.lineTo(-138, 0); cc.lineTo(-150, 22); cc.fill(); circ(cc, -150, -6, 5, '#FFFFFF'); txt(cc, 'KASZTANOWA 12', 10, 2, 34, '#B0302A', 900); cc.restore();
        }
      } else {
        cc.fillStyle = '#121318'; cc.fillRect(x, y, w, h);
        txt(cc, 'Wyświetlenia: 40', x + 40, y + 110, 36, '#FFFFFF', 800, 'left');
        const names = ['kuba.94', 'zuzia_k', 'mati.04', 'ania.b', 'kacper_w', 'julka.m', 'k4ptur_94'];
        const sc = clamp((lt - 8.0) / 2.5);
        names.forEach((n, i) => {
          const yy = y + 200 + i * 120 - sc * 0;
          const last = i === names.length - 1;
          if (last && lt > 9.6) fillRR(cc, x + 16, yy - 52, w - 32, 104, 16, 'rgba(215,38,61,.25)');
          circ(cc, x + 80, yy, 40, last ? '#2A2C33' : ['#E9B52C', '#E77FA8', '#5C7DB5', '#30A46C', '#F39C12', '#9B6ADB'][i]);
          if (last) { circ(cc, x + 80, yy - 8, 14, '#55575F'); fillRR(cc, x + 58, yy + 10, 44, 20, 10, '#55575F'); }
          txt(cc, n, x + 150, yy, 34, '#FFFFFF', last ? 900 : 600, 'left');
        });
      }
    });
  },
  post(c, lt) { if (lt > 6.0 && lt < 7.6) card(c, 70, 1530, 860, 'BŁĄD 2', 'napisała w relacji, że jest sama —\nz lokalizacją', lt - 6.0, '#F39C12', 40); },
});
// 11. WIADOMOŚĆ
scene({
  name: 'end', start: 94, end: 101,
  cam: lt => ({ z: 1.0 + lt * 0.012 }),
  labels: [[5.0, 7, 'ODCINEK 4 ↓', 540, 1650, 'red', 56]],
  draw(c, lt) {
    c.fillStyle = '#0B0C10'; c.fillRect(0, 0, W, H);
    bigPhone(c, (cc, x, y, w, h) => {
      cc.fillStyle = '#0F1014'; cc.fillRect(x, y, w, h);
      fillRR(cc, x, y, w, 170, 0, '#17181E');
      circ(cc, x + 90, y + 110, 40, '#2A2C33'); circ(cc, x + 90, y + 102, 14, '#55575F'); fillRR(cc, x + 68, y + 120, 44, 20, 10, '#55575F');
      txt(cc, 'k4ptur_94', x + 150, y + 100, 36, '#FFFFFF', 900, 'left'); txt(cc, 'aktywny(-a) teraz', x + 150, y + 140, 24, 'rgba(255,255,255,.55)', 600, 'left');
      if (lt > 0.4) {
        const p = back(clamp((lt - 0.4) / .3));
        cc.save(); cc.translate(x + 40, y + 520); cc.scale(p, p);
        fillRR(cc, 0, -60, 470, 120, 40, '#2A2C33'); txt(cc, 'ładny widok z dziewiątego.', 30, 2, 32, '#FFFFFF', 600, 'left');
        cc.restore();
        txt(cc, 'teraz', x + 60, y + 620, 22, 'rgba(255,255,255,.45)', 600, 'left');
      }
      if (lt > 4.2) {
        const p = back(clamp((lt - 4.2) / .3));
        cc.save(); cc.translate(x + 40, y + 700); cc.scale(p, p);
        fillRR(cc, 0, -60, 420, 120, 40, '#2A2C33'); txt(cc, 'dobranoc, Ola.', 30, 2, 32, '#FFFFFF', 600, 'left');
        cc.restore();
      }
      fillRR(cc, x + 30, y + h - 120, w - 60, 80, 40, '#1C1D23'); txt(cc, 'Wiadomość…', x + 80, y + h - 80, 28, 'rgba(255,255,255,.4)', 600, 'left');
    }, 1, 280);
    if (lt < 0.6) { const p = clamp(lt / .25) * (1 - clamp((lt - .4) / .2)); fillRR(c, 120, 140, 840, 130, 30, `rgba(240,240,240,${.95 * p})`); c.save(); c.globalAlpha = p; txt(c, 'k4ptur_94 wysłał(-a) ci wiadomość', 540, 205, 32, '#111', 800); c.restore(); }
  },
});
