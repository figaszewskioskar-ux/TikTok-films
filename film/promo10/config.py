"""Story: nowe filmy na kanale (ODC. 7 + NOCNY N94), ODC. 8 jutro 00:00, nowy easter egg w oknie 104"""
VOICE = 'eodmrbuYw8DsHyDR5b6f'
MODEL = 'eleven_multilingual_v2'
SETTINGS = {'stability': 0.45, 'similarity_boost': 0.8, 'style': 0.3, 'use_speaker_boost': True}
TARGET = None
SQUEEZE = 0.85
SCENES = [('nowe', 0, 5), ('jutro', 5, 9.5), ('egg', 9.5, 17.5), ('cta', 17.5, 21.5)]
SEG = [
    ['nowe', 0.2, 'Nowe filmy już na kanale! Odcinek siódmy Bloku dziewięćdziesiąt cztery i nowa seria: Nocny N94.'],
    ['jutro', 0.3, 'Następny odcinek już jutro o północy. W piątek trzynastego.'],
    ['egg', 0.3, 'A na stronie nowy easter egg. Gdy w oknie sto cztery zapali się światło, kliknij je. Ktoś tam czeka.'],
    ['cta', 0.3, 'Protokół ocaleni kropka online. Link w bio.'],
]
SKIP = ['tik']
AUDIO = dict(bed=([0, 9.5, 17.5, 21.49], [-28, -26, -28, -27]), loops={'roomtone': ([0, 21.49], [-40, -40]), 'tension': ([0, 9.5, 17.5, 21.49], [-34, -26, -30, -34])})
REALMAP = {'stab': [('boom', -5)], 'notif': [('notif', -9)], 'knock': [('knock', -5)], 'hit': [('boom', -4)], 'whoosh': [('whoosh', -16)]}
