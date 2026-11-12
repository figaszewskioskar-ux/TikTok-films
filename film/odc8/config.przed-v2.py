"""Konfiguracja BLOK 94 · „Kto tam?” CZĘŚĆ 7 — „Coś nie tak? Wyjdź z domu!”"""
VOICE = 'eodmrbuYw8DsHyDR5b6f'   # lektor: Victor
MODEL = 'eleven_multilingual_v2'
SETTINGS = {'stability': 0.45, 'similarity_boost': 0.8, 'style': 0.25, 'use_speaker_boost': True}
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
    ['hook', 0.1, 'Wracasz, a w domu coś jest nie tak? Nie sprawdzaj. Wyjdź.'],
    ['recap', 0.2, 'Poprzednio: karteczka na szybie od środka. I uchylona szafa.'],
    ['check', 0.4, 'Kuba łapie lampkę. Idzie sprawdzić.'],
    ['check', 4.4, 'Błąd pierwszy.'],
    ['check', 5.2, '[scared] Kuba, nie!', 'ola'],
    ['leave', 0.2, 'Ola wyciąga brata z mieszkania. Policja jest jeszcze w bloku.'],
    ['leave', 3.0, 'Ktoś może być w domu? Wyjdź i dzwoń na sto dwanaście.'],
    ['open', 0.3, 'Policjant otwiera szafę.'],
    ['open', 2.6, 'Nikogo. Tylko dwa światełka.'],
    ['open', 4.8, 'Kamera. Skierowana na łóżko Oli.'],
    ['account', 0.3, 'Policjant sprawdza, z jakim kontem jest połączona.'],
    ['account', 3.0, 'Kuba… to twoje konto.', 'policjant'],
    ['account', 5.8, '[shocked] Moje? Nigdy tego nie instalowałem!', 'kuba'],
    ['pass', 0.4, 'Kuba ma jedno hasło. Do wszystkiego. Kuba dziewięćdziesiąt cztery.'],
    ['pass', 4.2, 'Błąd drugi.'],
    ['explain', 0.3, 'Ktoś je zgadł. Stąd wiedział o kluczach. O relacji Oli. O grafiku rodziców.'],
    ['explain', 3.6, 'Inne hasło do każdego konta. I weryfikacja dwuetapowa.'],
    ['end', 0.3, 'W nocy Kuba zmienia wszystkie hasła.'],
    ['end', 4.4, 'Kamerka w laptopie zapala się sama.'],
    ['end', 7.6, '[whispers] Za późno, Kuba.', 'kaptur'],
    ['end', 5.6, 'Na podglądzie z kamerki… ktoś stoi za Kubą.'],
    ['check', 7.4, 'Szafa skrzypi. Coś w środku świeci.'],
    ['leave', 5.6, 'Na klatce Kuba się trzęsie. Ola nie puszcza jego ręki.'],
    ['open', 7.4, 'Ktoś ją tu zamontował. I ktoś ją podłączył.'],
    ['account', 8.0, 'Kuba przegląda historię logowań. Dziesiątki nocy. Zawsze o tej samej godzinie.'],
    ['pass', 6.6, 'Poczta. Chmura ze zdjęciami. Kalendarz rodziny. Wszędzie to samo hasło.'],
    ['explain', 6.0, 'Policjant zabiera kamerę jako dowód. Ale konto Kuby wciąż jest otwarte.'],
]
VFILTER = {'ola': 'highpass=f=110', 'kuba': 'highpass=f=100', 'policjant': 'highpass=f=90', 'kaptur': 'lowpass=f=3400,aecho=0.6:0.4:30:0.3'}
VGAIN = {'kaptur': 1.5}
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 6, 11, 20, 28, 32.4, 32.6, 38, 48, 58, 66, 72.4, 72.6, 77.99], [-27, -30, -26, -30, -26, -60, -22, -27, -26, -28, -26, -60, -22, -24]),
    loops={'drone': ([0, 62, 70, 73.55, 73.7, 75, 77.99], [-90, -90, -24, -12, -40, -26, -60]), 'roomtone': ([0, 77.99], [-39, -39])},
    heartbeat=([0, 11, 13, 20, 28, 32.4, 32.5, 66, 70, 73.5, 73.6, 77.99], [-90, -90, -26, -90, -26, -20, -90, -90, -24, -14, -90, -90]),
)
REALMAP = {'creak': [('creak', -10)], 'slam': [('slam', -4)], 'notif': [('notif', -8)], 'boom': [('boom', -6)], 'stab': [('boom', -5)],
           'whoosh': [('whoosh', -18)], 'error': [('boom', -7)], 'hit': [('boom', -1)]}
EXTRA = [(73.6, 'boom', -1), (12.0, 'breath', -16)]

# poprawiony na prośbę użytkownika: ok. 2 minut (TARGET domyślnie 118 s)
MAXK = 1.5
