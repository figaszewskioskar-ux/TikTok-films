"""Podgląd bez lektora dla stylu z napisami: timeline.js z pustą osią i szacowanymi LINES (czas = start sceny + a)."""
import sys, os, json, re, importlib.util
ep = sys.argv[1]; d = os.path.join(os.path.dirname(os.path.abspath(__file__)), ep)
sp = importlib.util.spec_from_file_location('cfg', os.path.join(d, 'config.py')); cfg = importlib.util.module_from_spec(sp); sp.loader.exec_module(cfg)
st = {n: a for n, a, b in cfg.SCENES}
L = []
for s in cfg.SEG:
    clean = re.sub(r'\[[^\]]*\]', '', s[2]).strip()
    L.append({'t': round(st[s[0]] + s[1], 3), 'dur': round(0.068 * len(clean) + .3, 3), 'text': s[2], 'who': s[3] if len(s) > 3 else 'lektor'})
open(os.path.join(d, 'timeline.js'), 'w').write('window.TIMELINE = [];\nwindow.LINES = ' + json.dumps(L, ensure_ascii=False) + ';\n')
print('ok', len(L))
