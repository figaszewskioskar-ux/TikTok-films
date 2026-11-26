"""LEGENDY GROZY · MOMO — własna historia na podstawie internetowej legendy; postać narysowana od nowa."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'  # Victor
MODEL = 'eleven_v3'
SETTINGS = {'stability': 0.4, 'similarity_boost': 0.85}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {'kuba': ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3), 'mama': ('Xb7hH8MSUJpSbSDYk0k2', 'eleven_v3', V3), 'momo': ('d4Z5Fvjohw3zxGpV8XUV', 'eleven_v3', V3)}
VFILTER = {'lektor': 'highpass=f=70,acompressor=threshold=-20dB:ratio=2.5,aecho=0.5:0.3:35:0.08',
           'momo': 'asetrate=48000*0.88,aresample=48000,atempo=1.1,highpass=f=180,aecho=0.7:0.6:60|140:0.5|0.35'}
TEMPO = {'lektor': 1.1}
MAXK = 1.6
PREVIEW_NO_VOICE = False
TARGET = 118
SQUEEZE = 0.75
SCENES = [('karta', 0, 4.4), ('plotka', 4.4, 8.0), ('pisala', 8.0, 11.4), ('dziwne', 11.4, 15.0), ('mama', 15.0, 19.2), ('kuba0', 19.2, 21.8), ('noc', 21.8, 25.2), ('wiad', 25.2, 28.8), ('odpis', 28.8, 32.2), ('gra', 32.2, 35.2), ('nie', 35.2, 37.8), ('foto', 37.8, 41.4), ('moje', 41.4, 45.4), ('okno', 45.4, 49.0), ('blok', 49.0, 51.8), ('nowy', 51.8, 55.2), ('dzwoni', 55.2, 58.4), ('dzwoni2', 58.4, 61.4), ('gasnie', 61.4, 64.0), ('monitor', 64.0, 67.6), ('odwroc', 67.6, 70.4), ('biegne', 70.4, 73.4), ('mama2', 73.4, 77.8), ('spalem', 77.8, 80.8), ('rano', 80.8, 84.0), ('mamatel', 84.0, 88.0), ('zdjecie', 88.0, 92.2), ('zaczela', 92.2, 95.6), ('epilog', 95.6, 101.8), ('end', 101.8, 106.8)]
SEG = [
    ['karta', 0.15, '[storytelling, tense, slow] To jest Momo.'],
    ['plotka', 0.15, '[storytelling, tense] Kiedyś po szkołach krążyła plotka o Momo.'],
    ['pisala', 0.15, '[whispering] Pisała do dzieci z nieznanego numeru. Zawsze w nocy.'],
    ['dziwne', 0.15, '[whispering] Kto odpisał, dostawał coraz dziwniejsze wiadomości.'],
    ['mama', 0.15, '[mother, serious, warning] Kuba, jak napisze do ciebie ktoś obcy, nie odpisuj. Od razu mi pokaż.', 'mama'],
    ['kuba0', 0.15, '[boy, annoyed] Wiem, mamo. Nie jestem dzieckiem.', 'kuba'],
    ['noc', 0.15, '[storytelling, tense] Tej nocy telefon zawibrował o trzeciej trzy.'],
    ['wiad', 0.15, '[whispering] Nieznany numer. Cześć, Kuba. Jestem Momo.'],
    ['odpis', 0.15, '[storytelling, tense] Powinienem był pokazać to mamie. Ale odpisałem.'],
    ['gra', 0.15, '[whispering, creepy] Chcesz zagrać w grę?', 'momo'],
    ['nie', 0.15, '[storytelling] Napisałem: nie.'],
    ['foto', 0.15, '[storytelling, tense, slow] Odpisała: za późno. I przysłała zdjęcie.'],
    ['moje', 0.15, '[storytelling, tense, slow] To był mój blok. Zdjęcie zrobione przed chwilą. Zapalone było tylko moje okno.'],
    ['okno', 0.15, '[whispering] Wyjrzałem. Na placu zabaw w ciemności świecił się czyjś telefon.'],
    ['blok', 0.15, '[storytelling, urgent] Zablokowałem numer.'],
    ['nowy', 0.15, '[whispering] Po minucie napisał inny numer. Blokowanie nie pomoże, Kuba.'],
    ['dzwoni', 0.15, '[storytelling, urgent] Zadzwoniła. Połączenie wideo.'],
    ['dzwoni2', 0.15, '[storytelling, tense] Nie odebrałem. A telefon dzwonił. I dzwonił.'],
    ['gasnie', 0.15, '[storytelling] Aż padła bateria.'],
    ['monitor', 0.15, '[storytelling, tense, slow] W ciemności sam włączył się mój komputer.'],
    ['odwroc', 0.15, '[whispering, creepy, slow] Odwróć się, Kuba.', 'momo'],
    ['biegne', 0.15, '[storytelling, urgent] Nie odwróciłem się. Pobiegłem do mamy.'],
    ['mama2', 0.15, '[mother, scared, calm] Dobrze, że mi powiedziałeś. Nie odpisuj. Rano zgłosimy to na policję.', 'mama'],
    ['spalem', 0.15, '[storytelling] Mama zabrała mój telefon. Zasnąłem u niej.'],
    ['rano', 0.15, '[storytelling, tense] Rano zawibrował telefon mamy.'],
    ['mamatel', 0.15, '[whispering] Dzień dobry, mamo Kuby. I zdjęcie.'],
    ['zdjecie', 0.15, '[storytelling, tense, slow] Na zdjęciu spaliśmy. Ktoś zrobił je w nocy. Z wnętrza pokoju.'],
    ['zaczela', 0.15, '[whispering, creepy, slow] Gra… dopiero się zaczęła.', 'momo'],
    ['epilog', 0.15, '[storytelling] Momo okazała się internetowym oszustwem. Ale zasada jest prawdziwa. Nie odpisuj obcym, blokuj i od razu mów dorosłym.'],
    ['end', 0.15, '[whispering, creepy] Odpiszesz… mi?', 'momo'],
]
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 106.78999999999999], [-34, -34]),
    loops={'groza': ([0, .2, 15.0, 21.8, 37.8, 55.2, 70.4, 77.8, 84.0, 95.6, 106.78999999999999], [-60, -10, -26, -14, -8, -4, -12, -24, -4, -16, -40]),
           'tension': ([0, 15.0, 21.8, 37.8, 64.0, 77.8, 84.0, 95.6, 106.78999999999999], [-18, -30, -18, -8, -5, -26, -5, -24, -40]),
           'drone': ([0, 21.8, 37.8, 64.0, 77.8, 84.0, 95.6, 101.8], [-40, -20, -8, -6, -28, -6, -26, -30]),
           'roomtone': ([0, 106.78999999999999], [-34, -34])},
    heartbeat=([0, 37.8, 64.0, 73.4, 84.0, 95.6, 106.78999999999999], [-90, -12, -5, -90, -6, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'hit': [('boom', -3)], 'jolt': [('jolt', -2)], 'msg': [('notif', -8)], 'buzz': [('vibrate', -6)], 'ring': [('ring', -8)]}
EXTRA = [(0.1, 'hit_low', -4), (13.0, 'hit_low', -4), (39.0, 'hit_low', -1), (39.0, 'sting', -4), (46.8, 'hit_low', -3), (53.0, 'hit_low', -2), (62.4, 'hit_low', 0), (63.0, 'riser', -7), (65.2, 'hit_low', 0), (65.2, 'sting', -2), (86.0, 'riser', -6), (86.0, 'hit_low', 0), (90.2, 'hit_low', -1), (90.2, 'sting', -2), (94.9, 'hit_low', 0), (94.9, 'sting', 0), (101.8, 'hit_low', -2), (15.0, 'hit_low', -9), (21.8, 'hit_low', -9), (49.0, 'hit_low', -9), (70.4, 'hit_low', -9), (77.8, 'hit_low', -9), (80.8, 'hit_low', -9)]
