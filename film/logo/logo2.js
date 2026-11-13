const { chromium } = require('playwright'); const path = require('path');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1000, height: 1000 } });
  await p.goto('file://' + path.join(__dirname, 'logo2.html')); await p.evaluate(async () => { await document.fonts.load('40px Anton', 'PROTOKÓŁ'); await document.fonts.load('800 40px Inter'); await document.fonts.ready; });
  for (const id of ['M1', 'M2', 'M3', 'M4']) { await p.evaluate(id => document.querySelectorAll('.v').forEach(v => v.classList.toggle('on', v.id === id)), id); await p.waitForTimeout(200);
    await (await p.$('#' + id + ' svg')).screenshot({ path: path.join(__dirname, 'l2_' + id + '.png') }); }
  await b.close(); })();
