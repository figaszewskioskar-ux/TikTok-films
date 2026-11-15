"""SAM W DOMU · ODC. 2 — „Nie otwieraj na łańcuch!” (Kuba, kontynuacja odc. 1). PODGLĄD BEZ LEKTORA do akceptacji."""
PREVIEW_NO_VOICE = True
TARGET = None
SCENES = [('hook', 0, 5), ('knock', 5, 13), ('tag', 13, 19), ('speak', 19, 30), ('call', 30, 41), ('quiet', 41, 48), ('police', 48, 58), ('chain', 58, 68), ('rule', 68, 78), ('real', 78, 88), ('end', 88, 110)]
SEG = []
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 109.99], [-34, -34]),
    loops={'groza': ([0, .3, 4.5, 5.5, 13, 19, 30, 41, 48, 58, 61, 68, 78, 88, 95, 100, 106.55, 106.7, 108, 109.99],
                     [-60, -12, -12, -18, -16, -12, -14, -10, -9, -8, -5, -14, -22, -16, -8, -6, -4, -70, -24, -32]),
           'tension': ([0, 13, 30, 48, 58, 68, 78, 88, 106.55, 106.7, 109.99], [-30, -24, -20, -14, -10, -18, -26, -16, -9, -60, -60]),
           'drone': ([0, 41, 78, 88, 106.55, 106.7, 109.99], [-30, -20, -30, -16, -10, -60, -60]),
           'roomtone': ([0, 109.99], [-38, -38])},
    heartbeat=([0, 5, 13, 41, 48, 58, 63, 68, 88, 95, 106.5, 106.6, 109.99], [-90, -12, -14, -10, -8, -6, -5, -90, -90, -8, -5, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -18)], 'hit': [('boom', -3)], 'jolt': [('jolt', -2)], 'chain': [('chain', -6)], 'handle': [('handle', -3)], 'knock': [('knock', -1)],
           'dial': [('dial', -10)], 'creak': [('creak', -8)], 'lock': [('keyturn', -6)], 'unlock': [('unlock', -6)], 'bang': [('bang', -3)], 'slam': [('slam', -2)], 'siren': [('siren', -10)], 'notif': [('notif', -6)]}
EXTRA = [(106.6, 'hit_low', 0), (106.6, 'sting', -3), (102.6, 'riser', -6), (95.6, 'sting', -5), (60.6, 'sting', -4), (100.0, 'hit_low', -2)] + [(t, 'hit_low', -6) for t in (0.2, 5, 13, 19, 30, 48, 58, 68, 88)]
