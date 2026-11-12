"""BLOK 94 · „Kto tam?” ODC. 10 — „Nie idź sprawdzać!”. Wersja do akceptacji: bez lektora i głosów (PREVIEW)."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'   # lektor: Victor
MODEL = 'eleven_multilingual_v2'
SETTINGS = {'stability': 0.32, 'similarity_boost': 0.85, 'style': 0.55, 'use_speaker_boost': True, 'speed': 0.9}   # lektor B
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {
    'ola':       ('d4Z5Fvjohw3zxGpV8XUV', 'eleven_v3', V3),
    'kuba':      ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3),
    'zdzisiek':  ('xsSg7GkDPDhaGZpbKOLn', 'eleven_v3', V3),
    'kaptur':    ('rUOVqZ1ISbf2yl2Vbpwa', 'eleven_v3', V3),
    'policjant': ('JWUOwsYG4XgR9Od3eeon', 'eleven_v3', V3),
}
PREVIEW_NO_VOICE = True   # po akceptacji: usuń, dopisz SEG i usuń odc10/timeline.js
SCENES = [('hook', 0, 6), ('recap', 6, 11), ('door', 11, 25), ('hall', 25, 40), ('kitchen', 40, 54), ('call', 54, 69),
          ('stairs', 69, 86), ('police', 86, 100), ('end', 100, 120)]
SEG = []
VFILTER = {'ola': 'highpass=f=110', 'kuba': 'highpass=f=100', 'zdzisiek': 'highpass=f=90', 'policjant': 'highpass=f=90', 'kaptur': 'lowpass=f=3400,aecho=0.6:0.4:30:0.3'}
VGAIN = {'kaptur': 1.6}
MAXK = 1.5
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 119.99], [-34, -34]),
    # muzyka grozy: narasta przy akcji, opada w spokojnych chwilach, cisza po uderzeniu
    loops={'groza': ([0, .3, 5.5, 6.5, 11, 16, 18, 21, 25, 26, 29, 33, 40, 43, 45, 49, 52, 54, 56, 63, 69, 72, 74, 79, 81.2, 83, 86,
                      90, 93, 95, 100, 104, 108, 112, 115.9, 116.05, 117, 119.99],
                     [-60, -12, -12, -22, -20, -14, -9, -12, -18, -12, -10, -16, -20, -12, -14, -8, -9, -16, -18, -20, -14, -10, -8, -9, -4, -16, -20,
                      -16, -18, -24, -26, -18, -14, -9, -4, -70, -22, -30]),
           'tension': ([0, 119.99], [-30, -30]),
           'drone': ([0, 100, 115.9, 116.05, 119.99], [-30, -24, -14, -60, -60]),
           'roomtone': ([0, 119.99], [-40, -40])},
    heartbeat=([0, 11, 13, 25, 40, 44, 54, 69, 72, 86, 100, 108, 115.9, 116.0, 119.99], [-90, -90, -18, -20, -90, -16, -90, -90, -14, -90, -90, -16, -6, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -18)], 'creak': [('creak', -8)], 'hit': [('boom', -3)],
           'notif': [('notif', -9)], 'error': [('boom', -8)], 'click': [('tap', -8)], 'slam': [('slam', -5)],
           'knock': [('knock', -5)], 'door': [('doorclose', -10)], 'vib': [('vibrate', -8)]}
EXTRA = [(115.95, 'hit_low', 0), (115.95, 'sting', -3), (111.9, 'riser', -6), (81.2, 'hit_low', -1), (81.2, 'sting', -8),
         (17.4, 'breath', -12), (30.0, 'breath', -12), (75.0, 'breath', -10), (108.0, 'breath', -8)] + \
        [(t, 'hit_low', -6) for t in (0.2, 6, 11, 25, 40, 54, 69, 86, 100)] + [(t, 'hit_low', -3) for t in (21.2, 51.6)]
