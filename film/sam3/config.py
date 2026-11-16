"""SAM W DOMU · ODC. 3 — „Nie wrzucaj tego na grupę!” (Kuba, mama, pan Zdzisiek, pani Halina, policjant). PODGLĄD BEZ LEKTORA."""
PREVIEW_NO_VOICE = True
TARGET = None
SCENES = [('hook', 0, 5), ('refuse', 5, 14), ('mama', 14, 25), ('post', 25, 36), ('comments', 36, 50), ('morning', 50, 60), ('zdzis', 60, 69), ('police', 69, 82), ('sorry', 82, 90), ('end', 90, 114)]
SEG = []
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 113.99], [-34, -34]),
    loops={'groza': ([0, .3, 4.5, 5.5, 14, 25, 36, 50, 60, 69, 82, 90, 99, 104, 108.35, 108.5, 110, 113.99],
                     [-60, -12, -12, -20, -18, -20, -16, -12, -16, -18, -24, -14, -8, -6, -4, -70, -24, -32]),
           'tension': ([0, 25, 36, 50, 69, 82, 90, 108.35, 108.5, 113.99], [-32, -26, -20, -16, -24, -30, -14, -9, -60, -60]),
           'drone': ([0, 50, 82, 90, 108.35, 108.5, 113.99], [-32, -24, -34, -18, -10, -60, -60]),
           'roomtone': ([0, 113.99], [-38, -38])},
    heartbeat=([0, 90, 99, 103, 108.3, 108.4, 113.99], [-90, -90, -10, -6, -5, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -18)], 'hit': [('boom', -3)], 'jolt': [('jolt', -2)], 'tap': [('tap', -6)], 'type': [('tap', -16)], 'notif': [('notif', -8)],
           'door': [('doorclose', -10)], 'run': [('stairs', -6)], 'dial': [('dial', -12)], 'creak': [('creak', -8)], 'bell': [('ring', -4)]}
EXTRA = [(108.4, 'hit_low', 0), (108.4, 'sting', -3), (104.4, 'riser', -6), (99.0, 'sting', -5), (50.4, 'sting', -6)] + [(t, 'hit_low', -6) for t in (0.2, 5, 14, 25, 36, 50, 60, 69, 90)]
