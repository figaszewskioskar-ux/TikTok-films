// node promo/make_hero.js -> promo/out/blok94-hero-bg.jpg + blok94-kaptur-sheet.png (animacja na stronie)
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
(async () => { const b = await chromium.launch(); const p = await b.newPage(); p.on('pageerror', e => console.error(e.message));
  await p.goto('file://' + path.join(__dirname, 'promo.html')); await p.evaluate(() => PROMO.ready()); const out = path.join(__dirname, 'out');
  fs.writeFileSync(path.join(out, 'blok94-hero-bg.jpg'), Buffer.from(await p.evaluate(() => PROMO.heroBg()), 'base64'));
  fs.writeFileSync(path.join(out, 'blok94-kaptur-sheet.png'), Buffer.from(await p.evaluate(() => PROMO.kapturSheet()), 'base64'));
  fs.writeFileSync(path.join(out, 'blok94-kaptur-obrot.png'), Buffer.from(await p.evaluate(() => PROMO.kapturTurn()), 'base64'));
  await b.close(); })();
