"""Konfiguracja BLOK 94 · „Kto tam?” CZĘŚĆ 3 — „Nie wychodź do licznika!”"""
VOICE = 'eodmrbuYw8DsHyDR5b6f'   # lektor: Victor
MODEL = 'eleven_multilingual_v2'
SETTINGS = {'stability': 0.5, 'similarity_boost': 0.8, 'style': 0.2, 'use_speaker_boost': True}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {
    'ola':    ('d4Z5Fvjohw3zxGpV8XUV', 'eleven_v3', V3),   # Maria
    'kuba':   ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3),   # Kamil - Expressive, Joyful
    'kaptur': ('rUOVqZ1ISbf2yl2Vbpwa', 'eleven_v3', V3),   # Ryszard
}
SQUEEZE = 0.8
SCENES = [('hook', 0, 6), ('recap', 6, 12), ('photo', 12, 22), ('err1', 22, 28), ('kuba', 28, 35), ('outage', 35, 43),
          ('box', 43, 52), ('kubaout', 52, 62), ('corridor', 62, 72), ('rule', 72, 79), ('end', 79, 89)]
SEG = [
    ['hook', 0.1, 'Jeśli w nocy prąd gaśnie tylko u ciebie… nie wychodź na korytarz sprawdzić licznika.'],
    ['hook', 3.4, 'Ktoś właśnie na to czeka.'],
    ['recap', 0.2, 'Część trzecia. Po wiadomości od k4ptur_94 Ola nie spała do rana.'],
    ['recap', 3.2, 'Rano zgłosiła konto i zrobiła zrzuty ekranu. Dobrze.'],
    ['photo', 0.3, 'Następnego wieczoru przychodzi kolejna wiadomość. Zdjęcie.'],
    ['photo', 3.4, 'Jej drzwi. Zrobione z klatki. Dzisiaj. Z nowym zamkiem.'],
    ['photo', 6.4, 'Ola nie wytrzymuje. Odpisuje.'],
    ['err1', 0.3, 'Błąd pierwszy. Teraz on wie, że ona czyta. I że się boi.'],
    ['err1', 3.4, '[whispers] Boisz się. To dobrze.', 'kaptur'],
    ['kuba', 0.3, 'Tym razem Ola nie jest sama. Kuba wrócił.'],
    ['kuba', 2.8, 'Tylko że gra w słuchawkach. I nic nie słyszy.'],
    ['outage', 0.3, 'Za dwie dwunasta.'],
    ['outage', 1.2, 'Ciemność.'],
    ['outage', 2.4, 'Ale pod drzwiami wciąż świeci pasek światła z klatki. Prąd zgasł… tylko u nich.'],
    ['box', 0.3, 'Liczniki w tym bloku wiszą na korytarzu. Skrzynki nikt nie zamyka.'],
    ['box', 4.2, 'Wystarczy jeden ruch, żeby wyłączyć prąd w jednym mieszkaniu.'],
    ['box', 7.0, 'I poczekać, aż ktoś wyjdzie sprawdzić.'],
    ['kubaout', 0.2, 'Kuba zdejmuje słuchawki.'],
    ['kubaout', 1.4, '[casual] Pewnie korki wywaliło. Zaraz włączę.', 'kuba'],
    ['kubaout', 4.6, 'Otwiera drzwi. Wychodzi na ciemny korytarz.'],
    ['kubaout', 6.6, 'Błąd drugi.'],
    ['corridor', 0.3, 'Kuba otwiera skrzynkę. Bezpiecznik dziewięćdziesiąt cztery jest wyłączony. Ręcznie.'],
    ['corridor', 4.0, 'Światło na klatce gaśnie. Automat.'],
    ['corridor', 5.8, 'A na schodach, dwa stopnie wyżej… ktoś stoi.'],
    ['rule', 0.2, '[shouting] Kuba! Wracaj!', 'ola'],
    ['rule', 1.6, 'Kuba wpada do środka. Drzwi. Zamek. Łańcuch.'],
    ['rule', 4.2, 'Prąd zgasł tylko u ciebie? Nie wychodź. Dzwoń na sto dwanaście.'],
    ['end', 0.3, 'Cisza. A potem telefon Kuby wibruje.'],
    ['end', 2.2, 'Zdjęcie. Klucze Kuby. Z breloczkiem dziewięćdziesiąt cztery.'],
    ['end', 5.0, 'Wypadły mu przy skrzynce.'],
    ['end', 6.4, '[whispers] Do zobaczenia.', 'kaptur'],
]
VFILTER = {'kaptur': 'lowpass=f=3800', 'ola': 'highpass=f=110', 'kuba': 'highpass=f=100'}
VGAIN = {'kaptur': 1.4, 'ola': 0.95}
SFX = {
    'poweroff': (3,  False, 'electricity cut off in apartment at night, fridge hum and electronics power down, sudden silence'),
    'breaker':  (1.5, False, 'electrical circuit breaker switch flipped down, loud metal click'),
    'boxopen':  (2,  False, 'metal electricity meter cabinet door opened in stairwell, squeaky hinge'),
    'timer':    (1.5, False, 'stairwell light timer switch clicking off, relay click'),
    'send':     (1,  False, 'phone message sent swoosh, short'),
    'gaming':   (20, True,  'muffled video game sounds leaking from headphones in a quiet room'),
    'doorlock': (2,  False, 'apartment door unlocked and opened quietly'),
}
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 12, 22, 28, 35, 36, 43, 52, 62, 66, 68, 72, 72.3, 79, 84.4, 84.6, 88.99],
         [-28, -30, -27, -31, -31, -24, -26, -24, -23, -21, -20, -20, -28, -29, -24, -60, -26]),
    loops={'roomtone': ([0, 35.9, 36.1, 88.99], [-38, -38, -90, -90]),
           'gaming': ([0, 27.9, 28, 34.9, 35, 35.9, 36, 88.99], [-90, -90, -34, -34, -38, -38, -90, -90])},
    heartbeat=([0, 52, 54, 66, 71.5, 72, 79, 84, 88.99], [-90, -90, -28, -22, -18, -26, -28, -22, -90]),
)
REALMAP = {
    'notif': [('notif', -8)], 'send': [('send', -12)], 'poweroff': [('poweroff', -6)], 'breaker': [('breaker', -6)],
    'boxopen': [('boxopen', -9)], 'timer': [('timer', -7)], 'doorlock': [('doorlock', -9)], 'slam': [('slam', -3), ('boom', -9)],
    'boom': [('boom', -6)], 'stab': [('boom', -5)], 'whoosh': [('whoosh', -18)], 'error': [('boom', -7)], 'hit': [('boom', -1)],
}
EXTRA = [(67.4, 'breath', -16)]

TARGET = 118
MAXK = 1.4
