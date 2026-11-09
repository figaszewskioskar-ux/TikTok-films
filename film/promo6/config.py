"""Relacja: nowy odcinek, gra i easter egg na stronie (bez wydłużania do 2 min)"""
VOICE = 'eodmrbuYw8DsHyDR5b6f'
MODEL = 'eleven_multilingual_v2'
SETTINGS = {'stability': 0.45, 'similarity_boost': 0.8, 'style': 0.3, 'use_speaker_boost': True}
TARGET = None
SQUEEZE = 0.85
SCENES = [('nowa', 0, 4), ('gra', 4, 8.5), ('egg', 8.5, 13), ('cta', 13, 17)]
SEG = [
    ['nowa', 0.2, 'Nowe odcinki już są! Oglądaj na profilu.'],
    ['gra', 0.3, 'A potem sprawdź się w naszej grze. Otworzysz czy nie?'],
    ['egg', 0.3, 'Na stronie ukryliśmy easter egg z zapowiedzią kolejnego odcinka. Szukaj Kaptura.'],
    ['cta', 0.3, 'Protokół ocaleni kropka online. Link w bio.'],
]
SKIP = ['tik']
AUDIO = dict(bed=([0, 8.5, 13, 16.99], [-28, -26, -28, -27]), loops={'roomtone': ([0, 16.99], [-40, -40])})
REALMAP = {'stab': [('boom', -5)], 'notif': [('notif', -9)], 'knock': [('knock', -5)], 'boom': [('boom', -6)], 'whoosh': [('whoosh', -16)]}
