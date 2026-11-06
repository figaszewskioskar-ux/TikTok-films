"""Syntetyczna ścieżka dźwiękowa do BLOK 94 · ODC. 1.
Czyta out/cues.json (eksport z film.js) i zapisuje out/audio.wav (48 kHz, stereo)."""
import json, wave, os
import numpy as np

SR = 48000
HERE = os.path.dirname(os.path.abspath(__file__))
info = json.load(open(os.path.join(HERE, 'out', 'cues.json')))
DUR = info['DUR']
N = int(DUR * SR)
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
    return np.convolve(x, np.ones(k) / k, mode='same')


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


# ---------- tło: dron + wiatr, poziom wg sekcji ----------
tt = np.arange(N) / SR
lvl = np.interp(tt, [0, 5, 11, 21, 34, 45, 66, 74, 87.6, 88.0, 98, 102, 114, 119],
                [.55, .6, .5, .5, .55, .5, .8, 1.0, 1.0, 0.0, .45, .2, .35, .7])
drone = (np.sin(2 * np.pi * 55 * tt) + 0.6 * np.sin(2 * np.pi * 82.4 * tt + np.sin(tt * .3))
         + 0.3 * np.sin(2 * np.pi * 110.5 * tt)) * (0.75 + 0.25 * np.sin(2 * np.pi * 0.11 * tt))
wind = lowpass(rng.standard_normal(N), 60) * (0.6 + 0.4 * np.sin(tt * 0.7))
outdoor = np.interp(tt, [0, 4.9, 5, 11, 11.1, 33.9, 34, 45, 45.1, 113.9, 114, 119], [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1])
bg = drone * 0.06 * lvl + wind * 0.5 * (0.15 + outdoor * 0.6) * np.maximum(lvl, .3)
L += bg; R += bg * 0.97
# zegar w podsumowaniu
for k in range(int((114 - 102) / 0.5)):
    add(tik() * 0.4, 102 + k * 0.5, pan=(-.3 if k % 2 else .3))

FX = dict(tik=tik, stab=stab, error=error, hit=hit, whoosh=whoosh, doorbuzz=doorbuzz, intercom=intercom,
          press=press, ding=ding, lock=lock, thud=thud, heart=heart, vibrate=vibrate, pluck=pluck,
          switch=switch, motif=motif)
GAIN = dict(tik=.5, whoosh=.6, voice=1.0, heart=1.0, error=1.0)
for cue in info['cues']:
    ty = cue['type']
    if ty == 'voice':
        add(voice(cue['who'], cue['dur']), cue['t'], 1.0, pan=rng.uniform(-.2, .2))
    elif ty == 'step':
        add(step(cue.get('soft', 0)), cue['t'], 1.0, pan=rng.uniform(-.4, .4))
    else:
        add(FX[ty](), cue['t'], GAIN.get(ty, 0.9))

mix = np.stack([L, R], 1)
mix = np.tanh(mix * 1.4) / np.tanh(1.4)
mix /= max(1e-9, np.abs(mix).max()) / 0.89
fade = int(0.02 * SR); mix[:fade] *= np.linspace(0, 1, fade)[:, None]
with wave.open(os.path.join(HERE, 'out', 'audio.wav'), 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((mix * 32767).astype('<i2').tobytes())
print('audio.wav OK', DUR, 's')
