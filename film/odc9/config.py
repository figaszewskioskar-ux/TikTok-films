"""BLOK 94 · „Kto tam?” ODC. 9 — „Nie klikaj w link!”. Wersja do akceptacji: bez lektora (PREVIEW)."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'   # lektor: Victor
MODEL = 'eleven_multilingual_v2'
SETTINGS = {'stability': 0.5, 'similarity_boost': 0.8, 'style': 0.2, 'use_speaker_boost': True}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {
    'ola':       ('d4Z5Fvjohw3zxGpV8XUV', 'eleven_v3', V3),
    'kuba':      ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3),
    'zdzisiek':  ('xsSg7GkDPDhaGZpbKOLn', 'eleven_v3', V3),
    'kaptur':    ('rUOVqZ1ISbf2yl2Vbpwa', 'eleven_v3', V3),
}
PREVIEW_NO_VOICE = True   # po akceptacji: usuń, dopisz SEG i usuń odc9/timeline.js
SCENES = [('hook', 0, 6), ('recap', 6, 12), ('turn', 12, 24), ('reply', 24, 34), ('click', 34, 44), ('ola', 44, 54),
          ('police', 54, 68), ('stairs', 68, 82), ('notif', 82, 98), ('end', 98, 118)]
SEG = []
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 6, 12, 24, 44, 54, 68, 82, 98, 111, 111.2, 117.99], [-27, -30, -26, -27, -26, -30, -26, -24, -22, -18, -60, -26]),
    loops={'drone': ([0, 98, 104, 111.3, 111.45, 113, 117.99], [-90, -90, -24, -12, -40, -26, -60]),
           'roomtone': ([0, 117.99], [-39, -39])},
    heartbeat=([0, 12, 16, 24, 82, 88, 98, 111.3, 111.4, 117.99], [-90, -90, -26, -90, -90, -26, -22, -14, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -18)], 'creak': [('creak', -10)], 'hit': [('boom', -3)],
           'notif': [('notif', -9)], 'error': [('boom', -8)], 'click': [('tap', -10)], 'slam': [('slam', -5)],
           'knock': [('knock', -5)], 'door': [('doorclose', -10)], 'vib': [('vibrate', -8)]}
EXTRA = [(111.35, 'boom', -1)]
