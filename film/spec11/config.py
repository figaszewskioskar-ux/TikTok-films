"""BLOK 94 · SPECJAL 11.11 (poza sezonem) — parada, Kuba gubi się w tłumie, obcy zna jego imię."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'   # lektor: Victor
MODEL = 'eleven_multilingual_v2'
SETTINGS = {'stability': 0.5, 'similarity_boost': 0.8, 'style': 0.2, 'use_speaker_boost': True}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {
    'sasiad': ('rUOVqZ1ISbf2yl2Vbpwa', 'eleven_v3', V3),   # ten sam głos co Kaptur
}
TARGET = None   # specjal poza sezonem: zostaje w naturalnej długości
SQUEEZE = 0.85
SCENES = [('hook', 0, 6), ('intro', 6, 14), ('stall', 14, 24), ('phone', 24, 30), ('stranger', 30, 41), ('twist', 41, 52), ('end', 52, 60)]
SEG = [
    ['hook', 0.1, 'Zgubiłeś się w tłumie? Nie idź z obcym.'],
    ['intro', 0.4, 'Jedenasty listopada. Cała rodzina idzie na paradę niepodległości.'],
    ['stall', 0.4, 'Tłum. Flagi. Kuba zostaje przy straganie. Sam.'],
    ['stall', 5.2, 'Błąd pierwszy. Nie umówili się, gdzie się spotkać.'],
    ['phone', 0.3, 'Kuba dzwoni do mamy. Dwa procent baterii.'],
    ['stranger', 0.8, '[friendly] Zgubiłeś się, Kuba? Mama czeka przy pomniku. Chodź.', 'sasiad'],
    ['stranger', 6.4, 'Błąd drugi. Kuba idzie z obcym.'],
    ['twist', 0.4, 'Skąd obcy znał jego imię? Z breloczka na plecaku.'],
    ['twist', 6.2, 'Zgubiłeś się? Zostań w miejscu i poproś o pomoc policjanta albo ochronę.'],
    ['end', 0.3, 'Wszystkiego dobrego w Święto Niepodległości. I bezpiecznej nocy.'],   # nagranie z pierwszej wersji, przycięte
]
VFILTER = {'sasiad': 'highpass=f=90'}
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 6, 14, 24, 30, 41, 52, 59.99], [-30, -32, -30, -27, -27, -26, -32, -28]),
    loops={'crowd': ([0, 1, 6, 14, 24, 24.5, 29.5, 30, 41, 45, 46, 52, 59.99], [-90, -27, -24, -25, -26, -60, -60, -26, -26, -60, -26, -24, -30])},
    heartbeat=([0, 30, 34, 41, 45, 46, 59.99], [-90, -90, -26, -22, -22, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -18)], 'notif': [('notif', -9)], 'error': [('boom', -8)]}
