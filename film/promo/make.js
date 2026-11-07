// node promo/make.js -> promo/out/*.png|jpg
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  p.on('pageerror', e => console.error(e.message));
  await p.goto('file://' + path.join(__dirname, 'promo.html')); await p.evaluate(() => PROMO.ready());
  const out = path.join(__dirname, 'out');
  const chars = { kuba: {}, ola: { phone: 1, aR: .9 }, kaptur: { glow: 1 }, zdzisiek: { net: true } };
  for (const [k, o] of Object.entries(chars)) fs.writeFileSync(path.join(out, `blok94-${k}.png`), Buffer.from(await p.evaluate(([k, o]) => PROMO.char(k, o), [k, o]), 'base64'));
  fs.writeFileSync(path.join(out, 'blok94-hero.jpg'), Buffer.from(await p.evaluate(() => PROMO.hero()), 'base64'));
  await b.close();
})();
