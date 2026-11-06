// Użycie:
//   node render.js stills 0.5 12 30     -> PNG wybranych klatek do out/stills
//   node render.js cues                  -> out/cues.json (wskazówki dźwiękowe)
//   node render.js video [workers]       -> out/video_noaudio.mp4
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs'), path = require('path');
const OUT = path.join(__dirname, 'out');
fs.mkdirSync(OUT, { recursive: true });
const URL = 'file://' + path.join(__dirname, 'film.html');

async function openPage(browser) {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  page.on('pageerror', e => console.error('PAGE ERROR', e.message));
  await page.goto(URL);
  await page.evaluate(() => window.FILM.ready);
  return page;
}
const grab = (page, t, type = 'jpeg') => page.evaluate(([t, type]) => {
  FILM.renderFrame(t);
  return document.getElementById('cv').toDataURL(type === 'png' ? 'image/png' : 'image/jpeg', 0.93).split(',')[1];
}, [t, type]);

(async () => {
  const mode = process.argv[2];
  const browser = await chromium.launch({ args: ['--disable-gpu-vsync'] });
  if (mode === 'stills') {
    const page = await openPage(browser);
    const SD = path.join(OUT, 'stills'); fs.mkdirSync(SD, { recursive: true }); for (const f of fs.readdirSync(SD)) fs.unlinkSync(path.join(SD, f));
    for (const s of process.argv.slice(3)) {
      const b = await grab(page, parseFloat(s), 'jpeg');
      fs.writeFileSync(path.join(OUT, 'stills', `t${String(s).padStart(6, '0')}.jpg`), Buffer.from(b, 'base64'));
    }
  } else if (mode === 'cues') {
    const page = await openPage(browser);
    const info = await page.evaluate(() => ({ cues: FILM.cues, DUR: FILM.DUR, FPS: FILM.FPS, timeline: FILM.timeline }));
    fs.writeFileSync(path.join(OUT, 'cues.json'), JSON.stringify(info, null, 1));
  } else if (mode === 'video') {
    const N = parseInt(process.argv[3] || '4');
    const page0 = await openPage(browser);
    const { DUR, FPS } = await page0.evaluate(() => ({ DUR: FILM.DUR, FPS: FILM.FPS }));
    await page0.close();
    const total = Math.round(DUR * FPS);
    const per = Math.ceil(total / N);
    const t0 = Date.now();
    let done = 0;
    await Promise.all([...Array(N).keys()].map(async w => {
      const page = await openPage(browser);
      const a = w * per, b = Math.min(total, a + per);
      const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
        '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', '-pix_fmt', 'yuv420p', path.join(OUT, `seg${w}.mp4`)], { stdio: ['pipe', 'inherit', 'inherit'] });
      for (let f = a; f < b; f++) {
        const buf = Buffer.from(await grab(page, f / FPS), 'base64');
        if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
        if (++done % 300 === 0) console.log(`${done}/${total} klatek, ${((Date.now() - t0) / 1000).toFixed(0)} s`);
      }
      ff.stdin.end();
      await new Promise(r => ff.on('close', r));
    }));
    fs.writeFileSync(path.join(OUT, 'segs.txt'), [...Array(N).keys()].map(w => `file 'seg${w}.mp4'`).join('\n'));
    await new Promise(r => spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', path.join(OUT, 'segs.txt'), '-c', 'copy', path.join(OUT, 'video_noaudio.mp4')], { stdio: 'inherit' }).on('close', r));
    console.log('Gotowe w', ((Date.now() - t0) / 1000).toFixed(0), 's');
  }
  await browser.close();
})();
