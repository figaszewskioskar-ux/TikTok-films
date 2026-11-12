"""Story: gry, akta sprawy, easter egg i wsparcie na stronie BLOK 94."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'
MODEL = 'eleven_multilingual_v2'
SETTINGS = {'stability': 0.45, 'similarity_boost': 0.8, 'style': 0.3, 'use_speaker_boost': True}
TARGET = None   # story, nie odcinek
SQUEEZE = 0.85
SCENES = [('site', 0, 4), ('gry', 4, 9), ('akta', 9, 13), ('wesprzyj', 13, 17.5), ('cta', 17.5, 21.5)]
SEG = [
    ['site', 0.2, 'Wpadnij do bloku dziewięćdziesiąt cztery na naszej stronie.'],
    ['gry', 0.3, 'Czekają tam trzy gry. Sprawdź, czy otworzysz drzwi właściwej osobie.'],
    ['akta', 0.3, 'Są akta sprawy Kaptura i ukryty easter egg z zapowiedzią kolejnego odcinka.'],
    ['wesprzyj', 0.3, 'A jeśli chcesz, możesz nas wesprzeć. Już od dwóch złotych.'],
    ['cta', 0.3, 'Protokół ocaleni kropka online. Link w bio!'],
]
SKIP = ['tik']
AUDIO = dict(bed=([0, 13, 17.5, 21.49], [-28, -26, -27, -27]), loops={'roomtone': ([0, 21.49], [-40, -40])})
REALMAP = {'stab': [('boom', -6)], 'notif': [('notif', -9)], 'knock': [('knock', -5)], 'whoosh': [('whoosh', -16)]}
