const { chromium } = require('playwright'); const path = require('path');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 2560, height: 1440 } });
  await p.goto('file://' + path.join(__dirname, 'banner_yt2.html')); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500);
  await p.screenshot({ path: path.join(__dirname, 'out/baner_yt2.png') }); await b.close(); })();
