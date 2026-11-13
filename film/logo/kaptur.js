const { chromium } = require('playwright'); const path = require('path');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1800, height: 1000 } });
  await p.goto('file://' + path.join(__dirname, 'kaptur.html')); await p.evaluate(async () => { await document.fonts.load('40px Anton', 'PROTOKÓŁ'); await document.fonts.ready; });
  for (const id of ['D', 'E', 'F', 'HD', 'DT']) { await p.evaluate(id => document.querySelectorAll('.v').forEach(v => v.classList.toggle('on', v.id === id)), id);
    await (await p.$('#' + id + ' svg')).screenshot({ path: path.join(__dirname, 'k_' + id + '.png') }); }
  await b.close(); })();
