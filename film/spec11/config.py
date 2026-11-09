"""BLOK 94 · SPECJAL 11.11 (poza sezonem) — niewypał na placu zabaw i wyrzutnia przy Oli."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'   # lektor: Victor
MODEL = 'eleven_multilingual_v2'
SETTINGS = {'stability': 0.5, 'similarity_boost': 0.8, 'style': 0.2, 'use_speaker_boost': True}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {
    'kuba':     ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3),
    'zdzisiek': ('xsSg7GkDPDhaGZpbKOLn', 'eleven_v3', V3),
    'kaptur':   ('rUOVqZ1ISbf2yl2Vbpwa', 'eleven_v3', V3),
}
TARGET = None   # specjal poza sezonem: zostaje w naturalnej długości
SQUEEZE = 0.85
SCENES = [('hook', 0, 6), ('intro', 6, 15), ('find', 15, 27), ('zdz', 27, 38), ('battery', 38, 48), ('end', 48, 60)]
SEG = [
    ['hook', 0.1, 'Jeśli petarda nie wybuchła… nie podchodź do niej.'],
    ['intro', 0.4, 'Jedenasty listopada. Nad blokiem dziewięćdziesiąt cztery biało-czerwone fajerwerki.'],
    ['find', 0.4, 'Na placu zabaw leży petarda. Nie wybuchła.'],
    ['find', 3.4, '[excited] Niewypał! Biorę na pamiątkę.', 'kuba'],
    ['find', 6.6, 'Błąd pierwszy. Niewypał może wybuchnąć w każdej chwili.'],
    ['zdz', 0.3, '[shouting] Kuba, zostaw to!', 'zdzisiek'],
    ['zdz', 6.0, 'Niewypał? Nie dotykaj. Odczekaj co najmniej kwadrans i zalej go wodą.'],
    ['battery', 0.3, 'Ola chce nagrać fajerwerki z bliska. Tuż przy wyrzutni.'],
    ['battery', 4.8, 'Błąd drugi. Wyrzutnia może się przewrócić i strzelić w bok.'],
    ['end', 0.3, 'Wszystkiego dobrego w Święto Niepodległości. I bezpiecznej nocy.'],
    ['end', 6.8, '[whispers] Ładne fajerwerki, Ola.', 'kaptur'],
]
VFILTER = {'kuba': 'highpass=f=100', 'zdzisiek': 'highpass=f=90,aecho=0.6:0.4:40:0.25', 'kaptur': 'lowpass=f=3200,aecho=0.7:0.6:60:0.35'}
VGAIN = {'kaptur': 1.4}
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 6, 15, 27, 31.5, 31.7, 38, 48, 54, 59.99], [-28, -30, -30, -27, -24, -60, -28, -30, -27, -26]),
    loops={'fireworks': ([0, 1, 6, 15, 27, 31.4, 33, 38, 48, 59.99], [-90, -34, -22, -27, -28, -32, -30, -26, -21, -24]),
           'wind': ([0, 59.99], [-40, -40])},
    heartbeat=([0, 27, 29, 31.5, 31.6, 59.99], [-90, -90, -24, -18, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -18)], 'fuse': [('fuse', -10)], 'pop': [('petarda', -1)],
           'fuse2': [('fuse', -14)], 'pop2': [('petarda', -4)], 'pop3': [('petarda', -6)]}
