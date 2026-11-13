const { chromium } = require('playwright'); const path = require('path');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1600, height: 1000 } });
  await p.goto('file://' + path.join(__dirname, 'logo.html')); await p.evaluate(() => document.fonts.ready);
  for (const id of ['A', 'B', 'C', 'H']) { await p.evaluate(id => { document.querySelectorAll('.v').forEach(v => v.classList.toggle('on', v.id === id)); }, id);
    await (await p.$('#' + id)).screenshot({ path: path.join(__dirname, 'logo_' + id + '.png') }); }
  await b.close(); })();
