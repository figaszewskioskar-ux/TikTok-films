"""Rolka: ponad 2000 obserwujących (2290) + nowy easter egg. Narracja z promo2/promo4, bez nowego nagrania."""
TARGET = None
VOICE = 'eodmrbuYw8DsHyDR5b6f'   # lektor: Victor
MODEL = 'eleven_multilingual_v2'
SETTINGS = {'stability': 0.45, 'similarity_boost': 0.8, 'style': 0.35, 'use_speaker_boost': True}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {'zdzisiek': ('xsSg7GkDPDhaGZpbKOLn', 'eleven_v3', V3)}
SQUEEZE = 0.8
SCENES = [('count', 0, 6), ('cast', 6, 11), ('egg', 11, 19), ('site', 19, 27)]
SEG = [
    ['count', 0.3, 'Jest nas prawie tysiąc. Dziękujemy, że oglądacie historie z bloku dziewięćdziesiąt cztery!'],
    ['cast', 0.6, '[laughs] Ja tu znam wszystkich… a was jest już prawie tysiąc!', 'zdzisiek'],
    ['site', 0.3, 'Wpadnijcie na naszą stronę: protokół ocaleni kropka online. Czeka tam gra i wszystkie części. Link w bio!'],
]
VFILTER = {'zdzisiek': 'highpass=f=90'}
SKIP = ['tik']
AUDIO = dict(bed_file='morning', bed=([0, 11, 11.3, 19, 26.99], [-30, -30, -26, -30, -30]))
REALMAP = {'knock': [('knock', -5)], 'stab': [('boom', -8)], 'notif': [('notif', -9)], 'whoosh': [('whoosh', -18)]}
