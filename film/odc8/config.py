"""Konfiguracja BLOK 94 · „Kto tam?” CZĘŚĆ 7 — „Coś nie tak? Wyjdź z domu!”"""
VOICE = 'eodmrbuYw8DsHyDR5b6f'   # lektor: Victor
MODEL = 'eleven_multilingual_v2'
SETTINGS = {'stability': 0.32, 'similarity_boost': 0.85, 'style': 0.55, 'use_speaker_boost': True, 'speed': 0.9}   # lektor B
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {
    'ola':       ('d4Z5Fvjohw3zxGpV8XUV', 'eleven_v3', V3),
    'kuba':      ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3),
    'policjant': ('JWUOwsYG4XgR9Od3eeon', 'eleven_v3', V3),
    'kaptur':    ('rUOVqZ1ISbf2yl2Vbpwa', 'eleven_v3', V3),
}
SQUEEZE = 0.8
SCENES = [('hook', 0, 6), ('recap', 6, 11), ('check', 11, 20), ('leave', 20, 28), ('open', 28, 38), ('account', 38, 48),
          ('pass', 48, 58), ('explain', 58, 66), ('end', 66, 78)]
SEG = [
    # wersja 2: więcej dialogów; lektor nie czyta zasad ani błędów (są tylko na kartach)
    ['hook', 0.1, 'Szafa w pokoju Oli. Dwa światełka w ciemności.'],
    ['recap', 0.2, 'Poprzednio: karteczka na szybie od środka. I uchylona szafa.'],
    ['check', 0.2, '[angry] Dość. Sprawdzę, co tam jest.', 'kuba'],
    ['check', 5.2, '[scared] Kuba, nie!', 'ola'],
    ['check', 7.0, '[whispers] To… nie są oczy.', 'kuba'],
    ['leave', 0.2, 'Ola wyciąga brata z mieszkania. Policja jest jeszcze w bloku.'],
    ['leave', 2.6, '[scared] Proszę pana! Ktoś jest w naszym mieszkaniu!', 'ola'],
    ['leave', 4.2, 'Zostańcie tutaj. Ja sprawdzę.', 'policjant'],
    ['open', 0.3, 'Policjant otwiera szafę.'],
    ['open', 5.2, 'To kamera. Ktoś ją tu zamontował.', 'policjant'],
    ['account', 0.3, 'Policjant sprawdza, z jakim kontem jest połączona.'],
    ['account', 3.0, 'Kuba… to twoje konto.', 'policjant'],
    ['account', 5.8, '[shocked] Moje? Nigdy tego nie instalowałem!', 'kuba'],
    ['pass', 0.4, 'Kuba ma jedno hasło. Do wszystkiego.'],
    ['pass', 2.4, '[ashamed] Wszędzie mam to samo… Kuba dziewięćdziesiąt cztery.', 'kuba'],
    ['pass', 5.6, '[angry] Kuba! Każdy mógł to zgadnąć!', 'ola'],
    ['explain', 0.3, 'Mieszkanie sto cztery. Ktoś zgadł hasło. I wie już wszystko.'],
    ['explain', 4.6, '[whispers] Klucze… relacja… grafik rodziców. Dziękuję, Kuba.', 'kaptur'],
    ['end', 0.3, 'W nocy Kuba zmienia wszystkie hasła.'],
    ['end', 4.4, 'Kamerka w laptopie zapala się sama.'],
    ['end', 5.6, 'Na podglądzie… ktoś stoi za Kubą.'],
    ['end', 7.6, '[whispers] Za późno, Kuba.', 'kaptur'],
]
VFILTER = {'ola': 'highpass=f=110', 'kuba': 'highpass=f=100', 'policjant': 'highpass=f=90', 'kaptur': 'lowpass=f=3400,aecho=0.6:0.4:30:0.3'}
VGAIN = {'kaptur': 1.5}
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 77.99], [-34, -34]),
    # muzyka grozy: narasta przy akcji, opada po niej, cisza po uderzeniu
    loops={'groza': ([0, .3, 6, 11, 15.6, 17, 20, 24, 28, 30.4, 32.6, 36, 38, 42.6, 46, 48, 52.4, 56, 58, 62, 66, 70, 73.55, 73.7, 75, 77.99],
                     [-60, -12, -22, -20, -10, -12, -16, -14, -16, -10, -6, -12, -16, -10, -12, -16, -10, -14, -12, -9, -14, -10, -4, -70, -22, -30]),
           'tension': ([0, 11, 28, 58, 66, 73.55, 73.7, 77.99], [-30, -24, -22, -20, -18, -14, -60, -60]),
           'drone': ([0, 62, 70, 73.55, 73.7, 75, 77.99], [-60, -30, -20, -12, -60, -60, -60]),
           'roomtone': ([0, 77.99], [-40, -40])},
    heartbeat=([0, 11, 13, 20, 28, 32.4, 32.5, 58, 66, 70, 73.5, 73.6, 77.99], [-90, -90, -16, -90, -18, -12, -90, -16, -14, -10, -4, -90, -90]),
)
REALMAP = {'creak': [('creak', -10)], 'slam': [('slam', -4)], 'notif': [('notif', -8)], 'boom': [('boom', -6)], 'stab': [('boom', -5)],
           'whoosh': [('whoosh', -18)], 'error': [('boom', -7)], 'hit': [('boom', -1)]}
EXTRA = [(73.6, 'hit_low', 0), (73.6, 'sting', -3), (69.6, 'riser', -6), (12.0, 'breath', -14), (62.6, 'breath', -10)] + [(t, 'hit_low', -6) for t in (0.2, 6, 11, 20, 28, 38, 48, 58, 66)] + [(t, 'hit_low', -2) for t in (15.4, 32.6, 52.4)] + [(32.6, 'sting', -9), (62.0, 'sting', -10)]

# poprawiony na prośbę użytkownika: ok. 2 minut (TARGET domyślnie 118 s)
MAXK = 1.5
