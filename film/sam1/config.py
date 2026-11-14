"""SAM W DOMU · ODC. 1 — „Nie wysyłaj zdjęcia z okna!” (nowa seria, Kuba). PODGLĄD BEZ LEKTORA do akceptacji."""
PREVIEW_NO_VOICE = True
TARGET = None
VOICE = 'eodmrbuYw8DsHyDR5b6f'
MODEL = 'eleven_multilingual_v2'
SETTINGS = {'stability': 0.32, 'similarity_boost': 0.85, 'style': 0.55, 'use_speaker_boost': True, 'speed': 0.9}
SCENES = [('hook', 0, 5), ('ctx', 5, 11), ('chat', 11, 21), ('photo', 21, 31), ('zoom', 31, 41), ('alone', 41, 51), ('window', 51, 63), ('call', 63, 75), ('wait', 75, 90), ('end', 90, 108)]
# Plan lektora (nagrywamy dopiero po akceptacji obrazu):
SEG_PLAN = [
    ['hook', 0.1, 'Jeśli obcy z gry prosi: pokaż, jak u ciebie pada śnieg… nie wysyłaj zdjęcia z okna.'],
    ['hook', 3.4, 'Właśnie pokazujesz mu, gdzie mieszkasz.'],
]
SEG = []
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 107.99], [-34, -34]),
    loops={'groza': ([0, .3, 4.5, 5.5, 11, 21, 29, 31, 37, 41, 47, 51, 56, 60, 63, 70, 75, 82, 88, 90, 96, 100, 103.55, 103.7, 105, 107.99],
                     [-60, -12, -12, -22, -22, -16, -10, -14, -9, -16, -10, -14, -8, -10, -16, -18, -14, -10, -12, -16, -12, -8, -4, -70, -22, -30]),
           'tension': ([0, 21, 51, 63, 75, 90, 103.55, 103.7, 107.99], [-32, -24, -16, -22, -18, -16, -12, -60, -60]),
           'drone': ([0, 75, 103.55, 103.7, 107.99], [-30, -22, -14, -60, -60]),
           'roomtone': ([0, 107.99], [-38, -38])},
    heartbeat=([0, 31, 34, 41, 51, 54, 63, 90, 96, 103.5, 103.6, 107.99], [-90, -90, -14, -90, -90, -10, -90, -90, -12, -6, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -18)], 'hit': [('boom', -3)], 'notif': [('notif', -9)], 'click': [('tap', -8)], 'error': [('boom', -8)],
           'dial': [('dial', -12)], 'buzz': [('buzz', -8)], 'siren': [('siren', -12)]}
EXTRA = [(103.6, 'hit_low', 0), (103.6, 'sting', -3), (99.6, 'riser', -6), (29.0, 'hit_low', -2), (37.0, 'sting', -9), (56.0, 'hit_low', -1), (56.0, 'sting', -6),
         (96.0, 'breath', -8)] + [(t, 'hit_low', -6) for t in (0.2, 5, 11, 21, 31, 41, 51, 63, 75, 90)]
