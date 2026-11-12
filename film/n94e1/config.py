"""NOCNY N94 · ODC. 1 — „Nie siadaj z tyłu!”. Wersja do akceptacji: bez lektora i głosów (PREVIEW)."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'   # lektor: Victor (ustawienia B)
MODEL = 'eleven_multilingual_v2'
SETTINGS = {'stability': 0.32, 'similarity_boost': 0.85, 'style': 0.55, 'use_speaker_boost': True, 'speed': 0.9}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {
    'ola':      ('d4Z5Fvjohw3zxGpV8XUV', 'eleven_v3', V3),
}
PREVIEW_NO_VOICE = True   # po akceptacji: usuń, dopisz SEG i usuń n94e1/timeline.js
SCENES = [('hook', 0, 6), ('stop', 6, 18), ('board', 18, 30), ('ride1', 30, 44), ('ride2', 44, 58), ('getoff', 58, 70),
          ('street', 70, 86), ('shop', 86, 102), ('end', 102, 120)]
SEG = []
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 119.99], [-34, -34]),
    loops={'groza': ([0, .3, 5.5, 6.5, 18, 22, 28, 30, 34, 37, 44, 48, 50, 53, 56, 58, 62, 66, 70, 75, 80, 86, 90, 98, 102, 106, 110, 114.35, 114.5, 116, 119.99],
                     [-60, -12, -12, -24, -22, -20, -16, -18, -14, -10, -16, -12, -9, -7, -9, -12, -9, -7, -14, -10, -8, -12, -16, -22, -24, -16, -10, -4, -70, -22, -30]),
           'tension': ([0, 30, 58, 102, 114.35, 114.5, 119.99], [-32, -26, -22, -20, -14, -60, -60]),
           'drone': ([0, 104, 114.35, 114.5, 119.99], [-30, -24, -14, -60, -60]),
           'wind': ([0, 6, 18, 18.1, 58, 58.1, 86, 86.1, 119.99], [-90, -30, -30, -90, -90, -30, -30, -90, -90]),
           'roomtone': ([0, 119.99], [-40, -40])},
    heartbeat=([0, 30, 34, 44, 48, 58, 70, 86, 102, 108, 114.35, 114.45, 119.99], [-90, -90, -18, -16, -12, -12, -14, -90, -90, -14, -6, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -18)], 'creak': [('creak', -8)], 'hit': [('boom', -3)],
           'notif': [('notif', -9)], 'error': [('boom', -8)], 'click': [('tap', -8)], 'door': [('doorclose', -10)]}
EXTRA = [(114.4, 'hit_low', 0), (114.4, 'sting', -3), (110.4, 'riser', -6), (36.0, 'hit_low', -2), (53.0, 'hit_low', -2), (66.0, 'hit_low', -2),
         (48.0, 'breath', -12), (75.0, 'breath', -12), (108.0, 'breath', -8)] + [(t, 'hit_low', -6) for t in (0.2, 6, 18, 30, 44, 58, 70, 86, 102)]
MAXK = 1.5
