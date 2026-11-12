// BLOK 94 · plakat: latarka za palcem nad banerem, mgła i paralaksa. Działa tylko na stronie głównej.
(function () {
  var fig = document.querySelector('#b94 .hero figure'); if (!fig) return;
  var RM = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  // mgła przy ziemi
  ['a', 'b'].forEach(function (k) { var f = document.createElement('div'); f.className = 'pl-fog pl-fog-' + k; f.setAttribute('aria-hidden', 'true'); fig.appendChild(f); });
  var st = document.createElement('style');
  st.textContent = '#b94 .hero figure .pl-fog{position:absolute;left:-30%;right:-30%;bottom:18%;height:240px;pointer-events:none;z-index:2;background:radial-gradient(ellipse at 30% 60%,rgba(160,170,200,.20),transparent 60%),radial-gradient(ellipse at 70% 70%,rgba(160,170,200,.16),transparent 55%);animation:plFog 18s linear infinite alternate}'
    + '#b94 .hero figure .pl-fog-b{animation-duration:26s;animation-direction:alternate-reverse;bottom:8%;opacity:.7}'
    + '@keyframes plFog{from{transform:translateX(-8%)}to{transform:translateX(8%)}}'
    + '#b94 .hero figure .pl-dark{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:3}'
    + '#b94 .hero figure .pl-hint{position:absolute;top:18px;left:50%;transform:translateX(-50%);z-index:4;font:600 10px Inter,sans-serif;letter-spacing:.3em;color:rgba(242,238,230,.55);text-transform:uppercase;white-space:nowrap;pointer-events:none}'
    + '#b94 .hero figure .okno{z-index:5}';
  document.head.appendChild(st);
  // ciemność z latarką
  var cv = document.createElement('canvas'); cv.className = 'pl-dark'; cv.setAttribute('aria-hidden', 'true'); fig.appendChild(cv);
  var hint = document.createElement('div'); hint.className = 'pl-hint'; hint.textContent = 'Przesuń palcem · latarka'; fig.appendChild(hint);
  var ctx = cv.getContext('2d'), dpr = 1, lx = .6, ly = .45, touched = 0;
  function size() { cv.width = fig.clientWidth * dpr; cv.height = fig.clientHeight * dpr; }
  size(); addEventListener('resize', size); if ('ResizeObserver' in window) new ResizeObserver(size).observe(fig);
  function move(e) { var r = fig.getBoundingClientRect(), p = e.touches ? e.touches[0] : e; lx = (p.clientX - r.left) / r.width; ly = (p.clientY - r.top) / r.height; touched = performance.now(); hint.style.opacity = 0; }
  fig.addEventListener('pointermove', move); fig.addEventListener('pointerdown', move); fig.addEventListener('touchmove', move, { passive: true });
  var vis = true; if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { vis = e[0].isIntersecting; }).observe(fig);
  var lastF = 0;
  function frame(t) {
    if (vis && t - lastF > 33) { lastF = t;
      if (performance.now() - touched > 3000) { lx = .5 + Math.sin(t / 1700) * .3; ly = .42 + Math.sin(t / 950) * .14; }
      var w = cv.width, h = cv.height, cx = lx * w, cy = ly * h, R = Math.min(w, h) * .5, fl = Math.random() < .04 ? .6 : .92;
      ctx.globalCompositeOperation = 'source-over'; ctx.clearRect(0, 0, w, h); ctx.fillStyle = 'rgba(2,3,8,.6)'; ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'destination-out'; var g = ctx.createRadialGradient(cx, cy, R * .05, cx, cy, R);
      g.addColorStop(0, 'rgba(0,0,0,' + fl + ')'); g.addColorStop(.6, 'rgba(0,0,0,' + fl * .55 + ')'); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.fill();
      ctx.globalCompositeOperation = 'source-over'; var wg = ctx.createRadialGradient(cx, cy, 2, cx, cy, R); wg.addColorStop(0, 'rgba(255,240,200,.10)'); wg.addColorStop(1, 'rgba(255,240,200,0)'); ctx.fillStyle = wg; ctx.fillRect(cx - R, cy - R, R * 2, R * 2);
    }
    if (!RM) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  // paralaksa: baner przesuwa się wolniej niż strona
  // paralaksa wyłączona: na iPhonie przewijanie zacinało się na banerze
})();
// Bohaterowie: animowane wersje (arkusze klatek z silnika filmów), pętla tam i z powrotem, zamiast statycznych obrazków
(function () {
  var imgs = document.querySelectorAll('#b94 .who img, #b94 .chars img'); if (!imgs.length) return;
  var RM = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches; if (RM) return;
  var FW = 420, FH = 500, N = 24, all = [];
  imgs.forEach(function (im) {
    var m = (im.getAttribute('src') || '').match(/blok94-(ola|kuba|zdzisiek|kaptur)\.png/); if (!m) return;
    var url = im.getAttribute('src').split('?')[0].replace('blok94-' + m[1] + '.png', 'blok94-anim-' + m[1] + '.webp') + '?v=3';
    var sheet = new Image(); sheet.decoding = 'async';
    sheet.onload = function () {
      var cv = document.createElement('canvas'), dpr = Math.min(2, window.devicePixelRatio || 1), inChars = !!im.closest('.chars'), h = inChars ? 190 : (im.clientHeight || 200), w = Math.round(h * FW / FH);
      cv.width = w * dpr; cv.height = h * dpr; cv.style.width = w + 'px'; cv.style.height = h + 'px'; cv.style.display = 'block'; cv.style.margin = inChars ? '0' : '0 auto 6px'; if (inChars) { cv.style.filter = 'drop-shadow(0 10px 20px rgba(0,0,0,.45))'; }
      cv.setAttribute('role', 'img'); cv.setAttribute('aria-label', im.alt || m[1]);
      var frames = []; for (var i = 0; i < N; i++) { var fc = document.createElement('canvas'); fc.width = cv.width; fc.height = cv.height; fc.getContext('2d').drawImage(sheet, i * FW, 0, FW, FH, 0, 0, fc.width, fc.height); frames.push(fc); }
      im.replaceWith(cv); var a0 = { cv: cv, ctx: cv.getContext('2d'), frames: frames, off: Math.floor(Math.random() * N), vis: true }; a0.ctx.drawImage(frames[0], 0, 0); all.push(a0);
      if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { es.forEach(function (e) { all.forEach(function (a) { if (a.cv === e.target) a.vis = e.isIntersecting; }); }); }).observe(cv);
    };
    sheet.src = url;
  });
  var last = 0;
  function frame(t) {
    if (t - last > 1000 / 16) { last = t;
      all.forEach(function (a) { if (!a.vis) return; var f = Math.floor(t / (1000 / 16) + a.off) % N;
        a.ctx.clearRect(0, 0, a.cv.width, a.cv.height); a.ctx.drawImage(a.frames[f], 0, 0); }); }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();

// strzałki „→” w linkach: osobny element, żeby mogły się ruszać
(function () { document.querySelectorAll('#b94 .part a, #b94 .pc-go, #b94 a').forEach(function (a) { if (a.children.length || a.textContent.indexOf('→') < 0) return; a.innerHTML = a.textContent.replace('→', '<span class="pl-arrow" aria-hidden="true">→</span>'); }); })();
