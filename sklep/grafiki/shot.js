const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({args:['--allow-file-access-from-files']});const p=await b.newPage({viewport:{width:1280,height:720}});
await p.goto('file://'+process.argv[2],{waitUntil:'networkidle'});await p.waitForTimeout(500);await p.locator('#c').screenshot({path:process.argv[3],type:'jpeg',quality:88});await b.close();})();
