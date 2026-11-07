"""Relacja: dziękujemy za prawie 1000 obserwujących"""
VOICE = 'eodmrbuYw8DsHyDR5b6f'   # lektor: Victor
MODEL = 'eleven_multilingual_v2'
SETTINGS = {'stability': 0.45, 'similarity_boost': 0.8, 'style': 0.35, 'use_speaker_boost': True}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {'zdzisiek': ('xsSg7GkDPDhaGZpbKOLn', 'eleven_v3', V3)}
SQUEEZE = 0.8
SCENES = [('count', 0, 6), ('cast', 6, 11), ('site', 11, 16)]
SEG = [
    ['count', 0.3, 'Jest nas prawie tysiąc. Dziękujemy, że oglądacie historie z bloku dziewięćdziesiąt cztery!'],
    ['cast', 0.6, '[laughs] Ja tu znam wszystkich… a was jest już prawie tysiąc!', 'zdzisiek'],
    ['site', 0.3, 'Wpadnijcie na naszą stronę: protokół ocaleni kropka online. Czeka tam gra i wszystkie części. Link w bio!'],
]
VFILTER = {'zdzisiek': 'highpass=f=90'}
SKIP = ['tik']
AUDIO = dict(bed_file='morning', bed=([0, 15.99], [-30, -30]))
REALMAP = {'notif': [('notif', -9)], 'whoosh': [('whoosh', -18)]}
