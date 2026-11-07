"""Rolka: zaproszenie do gry BLOK 94"""
VOICE = 'eodmrbuYw8DsHyDR5b6f'   # lektor: Victor
MODEL = 'eleven_multilingual_v2'
SETTINGS = {'stability': 0.5, 'similarity_boost': 0.8, 'style': 0.25, 'use_speaker_boost': True}
SQUEEZE = 0.8
SCENES = [('hook', 0, 4), ('mode1', 4, 10), ('mode2', 10, 16), ('cta', 16, 23)]
SEG = [
    ['hook', 0.2, 'Ktoś puka. Wizjer jest czarny. Co robisz?'],
    ['mode1', 0.3, 'Sprawdź się w naszej grze. Dziesięć osób puka do drzwi, a ty decydujesz, komu otworzyć.'],
    ['mode2', 0.3, 'Albo przetrwaj noc w bloku dziewięćdziesiąt cztery. Do szóstej rano.'],
    ['cta', 0.4, 'Gra jest za darmo na naszej stronie. Link w bio. Pochwal się wynikiem w komentarzu!'],
]
SKIP = ['tik']
AUDIO = dict(bed=([0, 4, 16, 22.99], [-28, -30, -28, -26]), loops={'roomtone': ([0, 22.99], [-40, -40])})
REALMAP = {'knock': [('knock', -4)], 'stab': [('boom', -5)], 'notif': [('notif', -9)], 'boom': [('boom', -6)], 'whoosh': [('whoosh', -16)]}
