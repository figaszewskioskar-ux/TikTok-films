"""GRUPA KLASOWA · ODC. 2 — „Nie kasuj dowodów!” (Kuba, Zuzia, Bartek, Lena, p. Wiśniewska, dyrektorka, rodzice). PODGLĄD BEZ LEKTORA."""
PREVIEW_NO_VOICE = True
TARGET = None
SCENES = [('hook', 0, 5), ('morning', 5, 13), ('bartek', 13, 24), ('director', 24, 37), ('parents', 37, 49), ('delete', 49, 58), ('lena', 58, 69), ('rule', 69, 82), ('end', 82, 108)]
SEG = []
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 107.99], [-34, -34]),
    loops={'groza': ([0, .3, 4.5, 5.5, 13, 24, 37, 49, 58, 69, 82, 91.6, 94.6, 99.75, 99.9, 102, 107.99],
                     [-60, -14, -14, -26, -22, -18, -16, -14, -14, -24, -12, -8, -6, -4, -70, -26, -34]),
           'tension': ([0, 24, 37, 58, 69, 82, 99.75, 99.9, 107.99], [-34, -24, -20, -16, -26, -14, -9, -60, -60]),
           'drone': ([0, 49, 69, 82, 99.75, 99.9, 107.99], [-34, -26, -32, -18, -10, -60, -60]),
           'roomtone': ([0, 107.99], [-38, -38])},
    heartbeat=([0, 82, 91.6, 99.7, 99.8, 107.99], [-90, -90, -8, -5, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -18)], 'hit': [('boom', -3)], 'jolt': [('jolt', -2)], 'tap': [('tap', -6)], 'notif': [('notif', -9)], 'bell': [('ring', -10)], 'door': [('doorclose', -12)]}
EXTRA = [(99.8, 'hit_low', 0), (99.8, 'sting', -3), (95.8, 'riser', -6), (91.6, 'sting', -5), (31.4, 'sting', -7)] + [(t, 'hit_low', -6) for t in (0.2, 5, 13, 24, 37, 49, 58, 69, 82)]
