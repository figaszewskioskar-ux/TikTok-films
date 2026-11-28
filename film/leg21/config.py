"""PRZESTROGA · GRA — historia o internetowej „grze” z zadaniami: mechanizm manipulacji (tajemnica, zadania, izolacja, groźby), bez żadnych treści o krzywdzie; koniec: powiedz dorosłemu, 116 111."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'  # Victor
MODEL = 'eleven_v3'
SETTINGS = {'stability': 0.4, 'similarity_boost': 0.85}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {'kuba': ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3), 'mama': ('Xb7hH8MSUJpSbSDYk0k2', 'eleven_v3', V3)}
VFILTER = {'lektor': 'highpass=f=70,acompressor=threshold=-20dB:ratio=2.5,aecho=0.5:0.3:35:0.08'}
TEMPO = {'lektor': 1.08}
MAXK = 1.6
PREVIEW_NO_VOICE = True
TARGET = 118
SQUEEZE = 0.75
SCENES = [('hak', 0, 4.4), ('nowy', 4.4, 8.0), ('zaproszenie', 8.0, 11.8), ('zasady', 11.8, 16.4), ('z1', 16.4, 19.8), ('z2', 19.8, 23.4), ('z3', 23.4, 27.2), ('z4', 27.2, 30.6), ('zmeczony', 30.6, 34.2), ('mama', 34.2, 37.2), ('nic', 37.2, 39.6), ('dziala', 39.6, 43.8), ('dosc', 43.8, 46.8), ('grozba', 46.8, 50.8), ('strach', 50.8, 54.0), ('t420', 54.0, 57.6), ('budzi', 57.6, 60.8), ('pokaz', 60.8, 63.8), ('przytula', 63.8, 67.8), ('mama2', 67.8, 71.6), ('policja', 71.6, 75.0), ('prawda', 75.0, 79.6), ('ola', 79.6, 83.4), ('ola2', 83.4, 86.6), ('epilog', 86.6, 93.2), ('end', 93.2, 98.2)]
SEG = [
    ['hak', 0.15, '[whispering, tense] Mówili, że to tylko gra.'],
    ['nowy', 0.15, '[storytelling, sad] Byłem nowy w szkole. Na przerwach siedziałem sam.'],
    ['zaproszenie', 0.15, '[whispering] Pewnej nocy ktoś napisał: chcesz zagrać w grę? Tylko dla wybranych.'],
    ['zasady', 0.15, '[storytelling, tense] Zasady były trzy. Zadania codziennie o czwartej dwadzieścia. Wyślij dowód. I nikomu ani słowa.'],
    ['z1', 0.15, '[storytelling] Pierwsze zadanie: wstań o czwartej dwadzieścia.'],
    ['z2', 0.15, '[storytelling, tense] Drugie: obejrzyj straszny film. Sam. Po ciemku.'],
    ['z3', 0.15, '[storytelling, sad] Trzecie: nie odzywaj się do mamy przez cały dzień.'],
    ['z4', 0.15, '[storytelling, sad] Czwarte: usuń znajomych.'],
    ['zmeczony', 0.15, '[storytelling, sad, slow] Byłem coraz bardziej zmęczony. I coraz bardziej sam.'],
    ['mama', 0.15, '[mother, worried] Kuba, co się dzieje?', 'mama'],
    ['nic', 0.15, '[boy, tired, quiet] Nic, mamo.', 'kuba'],
    ['dziala', 0.15, '[storytelling, serious, slow] Tak to działa. Najpierw zabierają ci sen. Potem ludzi.'],
    ['dosc', 0.15, '[storytelling, tense] W końcu napisałem: nie chcę już grać.'],
    ['grozba', 0.15, '[whispering, tense] Odpisał: z gry się nie wychodzi. Wiem, gdzie mieszkasz. I przysłał zdjęcie mojego bloku.'],
    ['strach', 0.15, '[storytelling, scared] Bałem się powiedzieć komukolwiek.'],
    ['t420', 0.15, '[storytelling, tense, slow] O czwartej dwadzieścia telefon znowu zawibrował. Ale tym razem…'],
    ['budzi', 0.15, '[storytelling, urgent] …obudziłem mamę.'],
    ['pokaz', 0.15, '[boy, crying, scared] Mamo, muszę ci coś pokazać.', 'kuba'],
    ['przytula', 0.15, '[storytelling, warm] Mama nie krzyczała. Przytuliła mnie. I zrobiła zrzuty ekranu.'],
    ['mama2', 0.15, '[mother, warm, calm] Dobrze, że mi powiedziałeś. To nie twoja wina.', 'mama'],
    ['policja', 0.15, '[storytelling] Rano przyjechała policja.'],
    ['prawda', 0.15, '[storytelling, serious, slow] Za kontem nie stał żaden duch. Tylko obcy dorosły. Pisał do wielu dzieci naraz.'],
    ['ola', 0.15, '[whispering] A gdzieś indziej, o czwartej dwadzieścia, ktoś znowu napisał.'],
    ['ola2', 0.15, '[whispering, creepy] Cześć, Ola. Chcesz zagrać? Tylko dla wybranych.'],
    ['epilog', 0.15, '[storytelling, serious, warm] Jeśli ktoś każe ci wykonywać zadania i trzymać to w tajemnicy, to nie jest gra. Nie rób nic. Zrób zrzut ekranu i powiedz dorosłemu. Telefon zaufania dla dzieci i młodzieży: sto szesnaście, sto jedenaście.'],
    ['end', 0.15, '[whispering] Udostępnij to komuś, kto powinien to zobaczyć.'],
]
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 98.19], [-34, -34]),
    loops={'groza': ([0, .2, 4.4, 11.8, 39.6, 46.8, 63.8, 79.6, 86.6, 98.19], [-60, -14, -30, -16, -12, -6, -34, -10, -40, -50]),
           'tension': ([0, 4.4, 16.4, 46.8, 63.8, 79.6, 86.6, 98.19], [-20, -34, -20, -6, -36, -8, -40, -50]),
           'drone': ([0, 16.4, 46.8, 63.8, 79.6, 86.6], [-40, -24, -8, -40, -10, -40]),
           'roomtone': ([0, 98.19], [-34, -34])},
    heartbeat=([0, 46.8, 50.8, 63.8, 98.19], [-90, -8, -6, -90, -90]),
)
REALMAP = {'stab': [('boom', -8)], 'hit': [('boom', -4)], 'msg': [('notif', -8)], 'buzz': [('vibrate', -6)], 'siren': [('siren', -12)]}
EXTRA = [(0.1, 'hit_low', -4), (14.4, 'hit_low', -2), (16.4, 'hit_low', -8), (19.8, 'hit_low', -8), (23.4, 'hit_low', -8), (27.2, 'hit_low', -8), (39.6, 'hit_low', -4), (45.8, 'riser', -7), (49.1, 'hit_low', 0), (49.1, 'sting', -3), (54.0, 'hit_low', -4), (78.1, 'riser', -7), (84.4, 'hit_low', -1), (84.4, 'sting', -3), (93.2, 'hit_low', -4)]
