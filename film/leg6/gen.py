import os, sys, time, urllib.parse, subprocess
sys.path.insert(0, os.path.dirname(__file__)); from prompts import P, STYLE
d = os.path.join(os.path.dirname(__file__), 'img'); os.makedirs(d, exist_ok=True)
names = sys.argv[1:] or list(P)
for i, n in enumerate(names):
    f = os.path.join(d, n + '.jpg')
    if os.path.exists(f) and os.path.getsize(f) > 20000: continue
    url = 'https://image.pollinations.ai/prompt/' + urllib.parse.quote(P[n] + STYLE) + f'?width=768&height=1344&nologo=true&seed={100 + i}&model=flux'
    for tr in range(4):
        r = subprocess.run(['curl', '-s', '-o', f, '-w', '%{http_code}', '--max-time', '170', url], capture_output=True, text=True)
        ok = r.stdout == '200' and os.path.exists(f) and os.path.getsize(f) > 20000
        print(n, r.stdout, os.path.getsize(f) if os.path.exists(f) else 0, flush=True)
        if ok: break
        time.sleep(15)
    time.sleep(6)
print('KONIEC')
