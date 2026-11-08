"""Konfiguracja BLOK 94 · „Kto tam?” CZĘŚĆ 5 — „Nie mów, kiedy jesteś sam!”"""
VOICE = 'eodmrbuYw8DsHyDR5b6f'   # lektor: Victor
MODEL = 'eleven_multilingual_v2'
SETTINGS = {'stability': 0.5, 'similarity_boost': 0.8, 'style': 0.2, 'use_speaker_boost': True}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {
    'ola':      ('d4Z5Fvjohw3zxGpV8XUV', 'eleven_v3', V3),   # Maria
    'kuba':     ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3),   # Kamil
    'zdzisiek': ('xsSg7GkDPDhaGZpbKOLn', 'eleven_v3', V3),   # Tomasz Z
    'sasiad':   ('rUOVqZ1ISbf2yl2Vbpwa', 'eleven_v3', V3),   # Ryszard — ten sam głos co Kaptur
}
SQUEEZE = 0.8
SCENES = [('hook', 0, 6), ('recap', 6, 11), ('day', 11, 20), ('talk', 20, 30), ('inside', 30, 40), ('leave', 40, 48),
          ('tell', 48, 56), ('zdz', 56, 64), ('wall', 64, 76), ('end', 76, 86)]
SEG = [
    ['hook', 0.1, 'Jeśli obcy pyta, kiedy jesteś sam w domu… nie odpowiadaj.'],
    ['hook', 3.2, 'Nawet jeśli mówi, że jest sąsiadem.'],
    ['recap', 0.2, 'Część piąta. W nocy Ola słyszała pukanie. Z sufitu. Z mieszkania sto cztery.'],
    ['day', 0.3, 'Następnego dnia. Ktoś puka.'],
    ['day', 1.6, 'W wizjerze uśmiechnięty chłopak. Kuba otwiera.'],
    ['day', 3.6, '[friendly] Cześć! Jestem nowy, z sto cztery. Pożyczycie śrubokręt?', 'sasiad'],
    ['talk', 0.5, '[casual] Jasne! Rodzice i tak pracują na noce. Od poniedziałku do czwartku.', 'kuba'],
    ['talk', 4.2, 'Błąd pierwszy.'],
    ['talk', 4.6, '[friendly] Na noce? Super. To cicho tu u was.', 'sasiad'],
    ['inside', 0.3, 'Kuba wpuszcza go do środka. Na chwilę.'],
    ['inside', 2.0, 'Błąd drugi.'],
    ['inside', 2.8, 'Chłopak się rozgląda. Zamki. Klucze na wieszaku. Drzwi.'],
    ['leave', 0.6, '[softly] Dzięki. Dobranoc, sąsiadko.', 'sasiad'],
    ['leave', 2.6, 'Ola zamiera. Zna ten głos.'],
    ['leave', 4.2, 'Na korytarzu chłopak zakłada kaptur.'],
    ['tell', 0.4, 'Tym razem Ola nie czeka. Dzwoni do mamy. I idzie do pana Zdziśka.'],
    ['tell', 3.2, 'Nowy sąsiad? Bądź miły przez drzwi. Ale nie mów, kiedy jesteś sam, i nie wpuszczaj do środka.'],
    ['zdz', 0.6, '[surprised] Sto cztery? Tam nikt nie mieszka od pół roku! Właściciel jest w Norwegii.', 'zdzisiek'],
    ['zdz', 5.0, 'Wieczorem administrator otwiera mieszkanie sto cztery. Z policją.'],
    ['wall', 0.4, 'Mieszkanie jest puste. Prawie.'],
    ['wall', 2.0, 'Na ścianie wiszą zdjęcia drzwi z całego bloku. Pod każdym notatka.'],
    ['wall', 5.6, 'Dziewięćdziesiąt cztery: rodzice, noce, od poniedziałku do czwartku. Siedemdziesiąt jeden: wyjechała.'],
    ['end', 0.3, 'Ostatnie zdjęcie ktoś zrobił dzisiaj.'],
    ['end', 2.0, 'Drzwi numer dwadzieścia dwa. Mieszkanie pana Zdziśka. Podpis: sam.'],
    ['end', 5.8, 'Tej nocy pan Zdzisiek słyszy pukanie.'],
]
VFILTER = {'ola': 'highpass=f=110', 'kuba': 'highpass=f=100', 'zdzisiek': 'highpass=f=90', 'sasiad': 'highpass=f=90'}
VGAIN = {'sasiad': 1.1}
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 6, 11, 20, 30, 40, 42.4, 48, 56, 64, 76, 78.4, 78.6, 86], [-28, -30, -34, -33, -30, -27, -24, -30, -31, -26, -24, -60, -24, -22]),
    loops={'roomtone': ([0, 85.99], [-40, -40])},
    heartbeat=([0, 40, 42, 48, 64, 70, 76, 78.4, 78.5, 82, 85.99], [-90, -90, -27, -30, -90, -28, -24, -20, -90, -26, -22]),
)
REALMAP = {'knock': [('knock', -4)], 'doorlock': [('doorlock', -9)], 'boom': [('boom', -6)], 'stab': [('boom', -5)],
           'whoosh': [('whoosh', -18)], 'error': [('boom', -7)], 'hit': [('boom', -1)]}
EXTRA = [(44.2, 'breath', -17), (82.0, 'breath', -15)]

TARGET = None   # gotowy film: zostaje w długości, w jakiej powstał
