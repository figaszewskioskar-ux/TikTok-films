const { chromium } = require('playwright'); const fs = require('fs'); const { spawn } = require('child_process');
const D = __dirname, mode = process.argv[2];
const du = (f) => 'data:image/png;base64,' + fs.readFileSync(D + '/' + f).toString('base64');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } }); p.on('pageerror', e => console.error('ERR', e.message));
  await p.goto('file:///home/user/TikTok-films/film/film.html?ep=klasa4'); await p.waitForFunction(() => window.FILM); await p.evaluate(() => window.FILM.ready);
  await p.addScriptTag({ path: D + '/draw.js' }); await p.evaluate((s) => YT.load(s), { qr: du('qr.png'), gra: du('site_gra.png'), home: du('site_home.png') });
  const grab = (fn, w, h, t, type) => p.evaluate(([fn, w, h, t, type]) => { const cv = window._yc || (window._yc = document.createElement('canvas')); cv.width = w; cv.height = h; const c = cv.getContext('2d'); YT[fn](c, t); return cv.toDataURL(type, .95).split(',')[1]; }, [fn, w, h, t, type]);
  if (mode === 'stills') { fs.writeFileSync(D + '/sides.png', Buffer.from(await grab('sides', 1920, 1080, 1, 'image/png'), 'base64')); fs.writeFileSync(D + '/thumb_yt.jpg', Buffer.from(await grab('thumb', 1280, 720, 1, 'image/jpeg'), 'base64'));
    for (const t of [2, 6, 9.5, 13]) fs.writeFileSync(D + `/ins_${t}.jpg`, Buffer.from(await grab('insert', 1920, 1080, t, 'image/jpeg'), 'base64')); }
  if (mode === 'sidesvid') { const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', '30', '-c:v', 'png', '-i', '-', '-c:v', 'qtrle', D + '/sides_loop.mov'], { stdio: ['pipe', 'inherit', 'inherit'] });
    for (let i = 0; i < 300; i++) { ff.stdin.write(Buffer.from(await grab('sides', 1920, 1080, i / 30, 'image/png'), 'base64')); } ff.stdin.end(); await new Promise(r => ff.on('close', r)); }
  if (mode === 'insert') { const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', '30', '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-crf', '16', '-pix_fmt', 'yuv420p', D + '/insert_v.mp4'], { stdio: ['pipe', 'inherit', 'inherit'] });
    for (let i = 0; i < 14 * 30; i++) { ff.stdin.write(Buffer.from(await grab('insert', 1920, 1080, i / 30, 'image/jpeg'), 'base64')); } ff.stdin.end(); await new Promise(r => ff.on('close', r)); }
  await b.close(); })();
