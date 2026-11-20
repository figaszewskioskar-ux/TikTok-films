"""Narracja lektora (styl oryginału: jeden głos opowiada całą historię).
1) generuje każdy fragment głosem z ElevenLabs (cache w out/narr),
2) liczy, ile trzeba rozciągnąć każdą scenę, żeby narracja się zmieściła,
3) zapisuje <odc>/timeline.js i <odc>/out/narr/lines.json.
Użycie: python3 narr.py odc2"""
import json, os, subprocess, urllib.request

import sys, importlib.util
HERE = os.path.dirname(os.path.abspath(__file__))
EP = sys.argv[1] if len(sys.argv) > 1 else 'odc1'
EPD = os.path.join(HERE, EP)
spec = importlib.util.spec_from_file_location('cfg', os.path.join(EPD, 'config.py')); cfg = importlib.util.module_from_spec(spec); spec.loader.exec_module(cfg)
OUT = os.path.join(EPD, 'out', 'narr')
os.makedirs(OUT, exist_ok=True)
VOICE, MODEL, SETTINGS, SCENES, SEG = cfg.VOICE, cfg.MODEL, cfg.SETTINGS, cfg.SCENES, cfg.SEG
VOICES = getattr(cfg, 'VOICES', {})  # kto -> (voice_id, model, settings) dla kwestii postaci

def tts(text, prev, nxt, path, voice=None, model=None, settings=None):
    voice, model, settings = voice or VOICE, model or MODEL, settings or SETTINGS
    body = {'text': text, 'model_id': model, 'voice_settings': settings, 'language_code': 'pl'}
    if model == 'eleven_v3':
        prev = nxt = None
    if prev: body['previous_text'] = prev
    if nxt: body['next_text'] = nxt
    req = urllib.request.Request(f'https://api.elevenlabs.io/v1/text-to-speech/{voice}?output_format=mp3_44100_128',
                                 data=json.dumps(body).encode(),
                                 headers={'Content-Type': 'application/json', 'xi-api-key': os.environ.get('ELEVEN_API_KEY', 'proxy-injected')})
    with urllib.request.urlopen(req, timeout=180) as r:
        open(path, 'wb').write(r.read())


def dur(p):
    return float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p]))


segs = []
for i, seg in enumerate(SEG):
    sc, a, text = seg[:3]
    who = seg[3] if len(seg) > 3 else 'lektor'
    v, m, st = VOICES.get(who, (VOICE, MODEL, SETTINGS))
    key = text + v + m + json.dumps(st)
    # nagrania zapisywane po treści (hash), nie po numerze: zmiana kolejności SEG nie wymusza ponownego nagrania
    import hashlib, glob, shutil
    mp3 = os.path.join(OUT, 'h_' + hashlib.md5(key.encode()).hexdigest()[:12] + '.mp3'); meta = mp3 + '.txt'; wav = mp3[:-4] + '.wav'
    if not os.path.exists(mp3):
        for mt in glob.glob(os.path.join(OUT, 'n*.mp3.txt')):
            if open(mt).read() == key and os.path.exists(mt[:-4]):
                shutil.copy(mt[:-4], mp3); open(meta, 'w').write(key); break
    nb = lambda j: SEG[j][2] if 0 <= j < len(SEG) and (len(SEG[j]) < 4 or SEG[j][3] == who) else None
    if not (os.path.exists(mp3) and os.path.exists(meta) and open(meta).read() == key):
        tts(text, nb(i - 1), nb(i + 1), mp3, v, m, st)
        open(meta, 'w').write(key)
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', mp3, '-af',
                    'silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse',
                    '-ar', '48000', '-ac', '1', wav], check=True)
    segs.append({'scene': sc, 'a': a, 'text': text, 'file': wav, 'dur': dur(wav), 'who': who})

# rozciąganie scen odcinkami: każdy odcinek między kolejnymi wejściami lektora dostaje tyle czasu,
# ile trwa jego kwestia; odcinki bez narracji są lekko przyspieszane
SQUEEZE = getattr(cfg, 'SQUEEZE', 0.75)
timeline, t = [], 0.0
for name, s0, s1 in SCENES:
    L = s1 - s0
    ss = sorted([x for x in segs if x['scene'] == name], key=lambda x: x['a'])
    olds = [0.0] + [x['a'] for x in ss] + [L]
    news = [0.0]
    for j in range(len(olds) - 1):
        o = olds[j + 1] - olds[j]
        if j == 0:
            n = o if o <= 1.5 else max(o * SQUEEZE, 1.5)
        else:
            x = ss[j - 1]
            n = max(o * SQUEEZE, x['dur'] + (0.5 if j == len(olds) - 2 else 0.22))
        news.append(news[-1] + n)
    knots = [[round(o, 4), round(n, 4)] for o, n in zip(olds, news)]
    timeline.append({'name': name, 'oStart': s0, 'oEnd': s1, 'start': round(t, 3), 'end': round(t + news[-1], 3), 'knots': knots})
    for j, x in enumerate(ss):
        x['t'] = round(t + news[j + 1], 3)
    t += news[-1]
# wydłużenie do docelowej długości (TARGET w config.py): równe rozciągnięcie scen, max MAXK razy
TARGET = getattr(cfg, 'TARGET', 118)   # domyślnie każda nowa część ma ok. 2 minut
if TARGET and t < TARGET:
    k = min(getattr(cfg, 'MAXK', 1.4), TARGET / t)
    t2 = 0.0
    for sc in timeline:
        sc['knots'] = [[o, round(n * k, 4)] for o, n in sc['knots']]
        L = sc['knots'][-1][1]
        old = sc['start']; sc['start'] = round(t2, 3); sc['end'] = round(t2 + L, 3)
        for x in segs:
            if x['scene'] == sc['name']:
                x['t'] = round(t2 + (x['t'] - old) * k, 3)
        t2 += L
    print(f'wydłużono x{k:.2f}: {t:.1f} s -> {t2:.1f} s')
    t = t2
for x in timeline:
    print(f"{x['name']:8s} {x['oEnd'] - x['oStart']:5.1f}s -> {x['end'] - x['start']:5.1f}s")
print(f'RAZEM {t:.1f} s')
json.dump(segs, open(os.path.join(OUT, 'lines.json'), 'w'), indent=1, ensure_ascii=False)
open(os.path.join(EPD, 'timeline.js'), 'w').write('window.TIMELINE = ' + json.dumps(timeline) + ';\n')
