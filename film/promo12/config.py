"""Story: nowa seria SAM W DOMU · odc. 1 „Nie przytrzymuj drzwi!” — dziś 17:00 (bez lektora)"""
PREVIEW_NO_VOICE = True
TARGET = None
SCENES = [('s1', 0, 5), ('s2', 5, 10), ('s3', 10, 16)]
SEG = []
SKIP = ['tik']
AUDIO = dict(bed=([0, 15.99], [-30, -30]),
             loops={'tension': ([0, 9.9, 10.1, 15.99], [-22, -12, -40, -30]), 'drone': ([0, 10, 15.99], [-26, -18, -26]), 'roomtone': ([0, 15.99], [-38, -38])},
             heartbeat=([0, 5, 9.9, 10, 15.99], [-90, -12, -6, -90, -90]))
REALMAP = {'stab': [('boom', -5)], 'hit': [('boom', -3)], 'jolt': [('jolt', -2)], 'door': [('doorclose', -10)], 'knock': [('knock', -3)], 'notif': [('notif', -9)]}
EXTRA = [(10.0, 'hit_low', 0), (10.0, 'sting', -4), (7.6, 'sting', -6), (0.1, 'hit_low', -4)]
