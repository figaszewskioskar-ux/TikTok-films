"""Syntetyczna ścieżka dźwiękowa do BLOK 94 · ODC. 1.
Czyta out/cues.json (eksport z film.js) i zapisuje out/audio.wav (48 kHz, stereo)."""
import json, wave, os, subprocess
import numpy as np

SR = 48000
import sys, importlib.util
HERE = os.path.dirname(os.path.abspath(__file__))
EP = sys.argv[1] if len(sys.argv) > 1 else 'odc1'
EPD = os.path.join(HERE, EP)
spec = importlib.util.spec_from_file_location('cfg', os.path.join(EPD, 'config.py')); cfg = importlib.util.module_from_spec(spec); spec.loader.exec_module(cfg)
info = json.load(open(os.path.join(EPD, 'out', 'cues.json')))
DUR = info['DUR']
N = int(DUR * SR)
TL = info.get('timeline') or []


def G(old):
    for sc in TL:
        if sc['oStart'] <= old < sc['oEnd'] or sc is TL[-1]:
            k = sc['knots']; x = old - sc['oStart']
            return sc['start'] + float(np.interp(x, [p[0] for p in k], [p[1] for p in k]))
    return old


def Gs(lst):
    return [G(v) for v in lst]
L = np.zeros(N); R = np.zeros(N)
rng = np.random.default_rng(94)


def t_(d):
    return np.arange(int(d * SR)) / SR


def env(n, a=0.005, r=None):
    e = np.ones(n)
    na = max(1, int(a * SR)); e[:na] = np.linspace(0, 1, na)
    if r:
        nr = min(n, int(r * SR)); e[-nr:] *= np.linspace(1, 0, nr)
    return e


def lowpass(x, k):
    k = max(1, int(k))
    if k == 1:
        return x
    c = np.cumsum(np.concatenate([np.zeros(k // 2 + 1), x, np.full(k, x[-1])]))
    return (c[k:k + len(x)] - c[:len(x)]) / k


def add(sig, at, gain=1.0, pan=0.0):
    i = int(at * SR)
    if i >= N:
        return
    sig = sig[: N - i]
    L[i:i + len(sig)] += sig * gain * (1 - max(0, pan))
    R[i:i + len(sig)] += sig * gain * (1 + min(0, pan))


# ---------- dźwięki ----------
def tik():
    t = t_(0.05); return np.sin(2 * np.pi * 2400 * t) * np.exp(-t * 90) * 0.5


def stab():
    t = t_(0.9)
    s = sum(np.sign(np.sin(2 * np.pi * f * t)) * 0.12 for f in (220, 233, 330, 349))
    s = lowpass(s, 6) * np.exp(-t * 4)
    s += np.sin(2 * np.pi * 55 * t) * np.exp(-t * 5) * 0.8
    return s * 0.7


def error():
    t = t_(1.1)
    s = sum(np.sin(2 * np.pi * f * t + np.sin(2 * np.pi * 5 * t)) for f in (196, 207.6, 293.7))
    s = s / 3 * np.exp(-t * 3)
    s += np.sin(2 * np.pi * 48 * t * (1 - t * .2)) * np.exp(-t * 4) * 0.9
    return s * 0.8


def hit():
    t = t_(2.5)
    boom = np.sin(2 * np.pi * (70 * np.exp(-t * 3) + 30) * t) * np.exp(-t * 1.6)
    nz = lowpass(rng.standard_normal(len(t)), 4) * np.exp(-t * 6) * 0.5
    br = sum(np.sign(np.sin(2 * np.pi * f * t)) for f in (110, 116.5, 164.8)) * np.exp(-t * 2.5) * 0.08
    return (boom + nz + lowpass(br, 5)) * 0.95


def whoosh(d=0.45):
    t = t_(d); n = rng.standard_normal(len(t))
    e = np.sin(np.pi * t / d) ** 2
    return lowpass(n, 18) * e * 0.35


def doorbuzz():
    t = t_(0.7)
    s = np.sign(np.sin(2 * np.pi * 110 * t)) * (0.6 + 0.4 * np.sign(np.sin(2 * np.pi * 50 * t)))
    return lowpass(s, 8) * env(len(t), .01, .05) * 0.18


def intercom():
    out = []
    for f in (880, 698):
        t = t_(0.35); out.append((np.sin(2 * np.pi * f * t) + 0.3 * np.sin(2 * np.pi * 2 * f * t)) * np.exp(-t * 7))
    return np.concatenate(out) * 0.35


def press():
    t = t_(0.06); return lowpass(rng.standard_normal(len(t)), 3) * np.exp(-t * 120) * 0.5


def ding():
    t = t_(1.2); return (np.sin(2 * np.pi * 1318 * t) + 0.4 * np.sin(2 * np.pi * 2637 * t)) * np.exp(-t * 3.5) * 0.25


def lock():
    a = press(); t = t_(0.18)
    b = np.sin(2 * np.pi * 140 * t) * np.exp(-t * 30) * 0.5
    return np.concatenate([a, np.zeros(int(.08 * SR)), b, np.zeros(int(.15 * SR)), a * .8])


def step(soft=0):
    t = t_(0.12); return np.sin(2 * np.pi * 90 * t) * np.exp(-t * 45) * (0.25 if soft else 0.4) + lowpass(rng.standard_normal(len(t)), 6) * np.exp(-t * 60) * 0.12


def thud():
    t = t_(0.5); return (np.sin(2 * np.pi * 75 * t) * np.exp(-t * 14) + lowpass(rng.standard_normal(len(t)), 10) * np.exp(-t * 25) * .5) * 0.8


def heart():
    t = t_(0.5)
    b = np.sin(2 * np.pi * 52 * t) * np.exp(-t * 18)
    sh = int(0.2 * SR); b[sh:] += (np.sin(2 * np.pi * 48 * t) * np.exp(-t * 20))[: len(b) - sh] * 0.7
    return b * 0.9


def vibrate():
    t = t_(0.5); return np.sin(2 * np.pi * 160 * t) * (np.sin(2 * np.pi * 25 * t) > 0) * env(len(t), .01, .03) * 0.18


def pluck():
    out = np.zeros(int(1.2 * SR))
    for k, f in enumerate((523, 659, 784, 1046)):
        t = t_(0.5); s = np.sin(2 * np.pi * f * t) * np.exp(-t * 9) * 0.25
        i = int(k * 0.11 * SR); out[i:i + len(s)] += s
    return out


def switch():
    return press() * 1.2


def motif():
    out = np.zeros(int(2.2 * SR))
    for k, f in enumerate((329.6, 349.2, 493.9)):  # E–F–H: motyw serii
        t = t_(1.3)
        s = sum(np.sin(2 * np.pi * f * h * t) / h for h in (1, 2, 3)) * np.exp(-t * 2.8) * 0.3
        i = int(k * 0.22 * SR); out[i:i + len(s)] += s
    return out


VOICE = {'kuba': (230, 0.0), 'kurier': (140, 0.1), 'zdzisiek': (125, 0.25), 'halina': (330, 0.05), 'kaptur': (0, 1.0)}


def voice(who, dur):
    base, rough = VOICE.get(who, (200, 0))
    out = np.zeros(int((dur + .2) * SR)); pos = 0.0; k = 0
    while pos < dur:
        sl = 0.07 + rng.random() * 0.07
        t = t_(sl)
        if who == 'kaptur':
            s = lowpass(rng.standard_normal(len(t)), 3) * 0.35
        else:
            f = base * (1 + 0.25 * np.sin(k * 1.7) + 0.1 * rng.random())
            s = np.sign(np.sin(2 * np.pi * f * t)) * 0.5 + np.sin(2 * np.pi * 2 * f * t) * 0.3
            s = lowpass(s, 10) + rough * lowpass(rng.standard_normal(len(t)), 4)
        s *= np.sin(np.pi * np.arange(len(t)) / len(t)) * 0.22
        i = int(pos * SR); out[i:i + len(s)] += s[: len(out) - i]
        pos += sl + 0.015; k += 1
    return out


# ---------- prawdziwe efekty (ElevenLabs, wspólna biblioteka cache/sfx) ----------
tt = np.arange(N) / SR
SFXD = os.path.join(HERE, 'cache', 'sfx')
AU = cfg.AUDIO


def db2a(d):
    return 10 ** (d / 20)


def load(name, rms_db=None, peak_db=None, flt=None):
    args = ['ffmpeg', '-v', 'error', '-i', os.path.join(SFXD, name + '.wav')]
    if flt:
        args += ['-af', flt]
    raw = subprocess.check_output(args + ['-f', 's16le', '-ac', '1', '-ar', str(SR), '-'])
    v = np.frombuffer(raw, dtype='<i2').astype(float) / 32768
    if rms_db is not None:
        loud = v[np.abs(v) > np.abs(v).max() * 0.05]
        v = v / (np.sqrt(np.mean(loud ** 2)) + 1e-9) * db2a(rms_db)
    if peak_db is not None:
        v = v / (np.abs(v).max() + 1e-9) * db2a(peak_db)
    return v


def loop_to(v, n, xf=int(0.5 * SR)):
    out = np.zeros(n); pos = 0; ramp = np.linspace(0, 1, xf)
    while pos < n:
        seg = v.copy(); seg[:xf] *= ramp; seg[-xf:] *= ramp[::-1]
        m = min(len(seg), n - pos); out[pos:pos + m] += seg[:m]; pos += len(seg) - xf
    return out


def env_db(times, dbs):
    return db2a(np.interp(tt, Gs(times), dbs))


def mask(spec):
    return np.interp(tt, Gs(spec[0]), spec[1])


BG = loop_to(load(AU.get('bed_file', 'bed'), rms_db=0), N) * env_db(*AU['bed'])
if 'outdoor' in AU:
    BG += loop_to(load('wind', rms_db=0), N) * db2a(AU.get('wind_db', -33)) * lowpass(mask(AU['outdoor']), int(.15 * SR))
if 'tv' in AU:
    BG += loop_to(load('tv', rms_db=0, flt='lowpass=f=1800'), N) * db2a(-36) * mask(AU['tv'])
for name, spec in AU.get('loops', {}).items():   # dodatkowe pętle tła: nazwa -> (czasy, dB)
    BG += loop_to(load(name, rms_db=0), N) * env_db(*spec)
if 'heartbeat' in AU:
    hb = loop_to(load('heartbeat', rms_db=0), N) * env_db(*AU['heartbeat'])
    L += hb; R += hb
if 'clock' in AU:
    c0, c1 = G(AU['clock'][0]), G(AU['clock'][1])
    for k in range(int((c1 - c0) / 0.5)):
        add(tik() * 0.25, c0 + k * 0.5, pan=(-.3 if k % 2 else .3))
REALMAP = getattr(cfg, 'REALMAP', {})
for t0, name, pk in getattr(cfg, 'EXTRA', []):
    add(load(name, peak_db=pk), G(t0), 1.0, pan=rng.uniform(-.25, .25))

FX = dict(tik=tik, stab=stab, error=error, hit=hit, whoosh=whoosh, doorbuzz=doorbuzz, intercom=intercom,
          press=press, ding=ding, lock=lock, thud=thud, heart=heart, vibrate=vibrate, pluck=pluck,
          switch=switch, motif=motif)
# ---------- dubbing (jeśli jest) ----------
DUB = os.path.join(EPD, 'out', 'narr', 'lines.json')
dub = json.load(open(DUB)) if os.path.exists(DUB) else []
duck = np.ones(N)
VGAIN = getattr(cfg, 'VGAIN', {})
VFILTER = getattr(cfg, 'VFILTER', {})
for ln in dub:
    f = ln['file']
    flt = VFILTER.get(ln.get('who'), 'acompressor=threshold=-20dB:ratio=3,highpass=f=70')  # l03 słychać przez domofon
    raw = subprocess.check_output(['ffmpeg', '-v', 'error', '-i', f, '-af', flt, '-f', 's16le', '-ac', '1', '-ar', str(SR), '-'])
    v = np.frombuffer(raw, dtype='<i2').astype(float) / 32768
    loud = v[np.abs(v) > np.abs(v).max() * 0.05]
    v = v / (np.sqrt(np.mean(loud ** 2)) + 1e-9) * db2a(-17)
    i0 = int(ln['t'] * SR)
    add(v, ln['t'], VGAIN.get(ln.get('who'), 1.0))
    a, b = max(0, i0 - int(.1 * SR)), min(N, i0 + len(v) + int(.15 * SR))
    duck[a:b] = np.minimum(duck[a:b], 0.5)
duck = lowpass(duck, int(0.08 * SR))

GAIN = dict(tik=.35, whoosh=.6, voice=1.0, heart=1.0, error=0.8)
SKIP_REAL = {'heart', 'vibrate', 'step', 'ding'} | set(getattr(cfg, 'SKIP', []))
for cue in info['cues']:
    ty = cue['type']
    if ty == 'voice':
        if dub:
            continue
        add(voice(cue['who'], cue['dur']), cue['t'], 1.0, pan=rng.uniform(-.2, .2))
    elif ty in SKIP_REAL:
        continue
    elif ty in REALMAP:
        for name, pk in REALMAP[ty]:
            add(load(name, peak_db=pk), cue['t'], 1.0)
        if ty == 'error':
            add(FX[ty](), cue['t'], 0.6)  # sygnaturowy akord licznika zostaje
    elif ty == 'step':
        add(step(cue.get('soft', 0)), cue['t'], 1.0, pan=rng.uniform(-.4, .4))
    else:
        add(FX[ty](), cue['t'], GAIN.get(ty, 0.9))

L += BG * duck; R += BG * 0.97 * duck
mix = np.stack([L, R], 1)
pk = np.abs(mix).max()
if pk > 0.95:
    mix = np.tanh(mix / pk * 1.2) / np.tanh(1.2) * 0.95
fade = int(0.02 * SR); mix[:fade] *= np.linspace(0, 1, fade)[:, None]
with wave.open(os.path.join(EPD, 'out', 'audio.wav'), 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((mix * 32767).astype('<i2').tobytes())
print('audio.wav OK', DUR, 's')
