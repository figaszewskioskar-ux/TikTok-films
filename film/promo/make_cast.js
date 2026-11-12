// node promo/make_cast.js -> promo/out/blok94-anim-<postać>.png (arkusze klatek bohaterów do strony)
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
(async () => { const b = await chromium.launch(); const p = await b.newPage(); p.on('pageerror', e => console.error(e.message));
  await p.goto('file://' + path.join(__dirname, 'promo.html')); await p.evaluate(() => PROMO.ready());
  const cast = { ola: {}, kuba: {}, zdzisiek: {}, kaptur: {} };
  for (const [k, o] of Object.entries(cast)) fs.writeFileSync(path.join(__dirname, 'out', `blok94-anim-${k}.png`), Buffer.from(await p.evaluate(([k, o]) => PROMO.charSheet(k, o), [k, o]), 'base64'));
  await b.close(); })();
