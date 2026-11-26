"""LEGENDY GROZY · MOMO — własna historia (zimowe kolonie w górach) na podstawie internetowej legendy; postać narysowana od nowa."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'  # Victor
MODEL = 'eleven_v3'
SETTINGS = {'stability': 0.4, 'similarity_boost': 0.85}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {'kuba': ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3), 'bartek': ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3), 'mama': ('Xb7hH8MSUJpSbSDYk0k2', 'eleven_v3', V3), 'ewa': ('6qkrzTbAj75WW5U8X5mB', 'eleven_v3', V3), 'momo': ('d4Z5Fvjohw3zxGpV8XUV', 'eleven_v3', V3)}
VFILTER = {'lektor': 'highpass=f=70,acompressor=threshold=-20dB:ratio=2.5,aecho=0.5:0.3:35:0.08', 'bartek': 'asetrate=48000*0.93,aresample=48000,atempo=1.07',
           'momo': 'asetrate=48000*0.88,aresample=48000,atempo=1.1,highpass=f=180,aecho=0.7:0.6:60|140:0.5|0.35'}
TEMPO = {'lektor': 1.1}
MAXK = 1.6
PREVIEW_NO_VOICE = False
TARGET = 118
SQUEEZE = 0.75
SCENES = [('karta', 0, 4.4), ('autokar', 4.4, 8.0), ('mama', 8.0, 12.2), ('kuba0', 12.2, 14.8), ('osrodek', 14.8, 18.4), ('plotka', 18.4, 22.2), ('bartek', 22.2, 25.2), ('noc', 25.2, 28.6), ('wiad', 28.6, 32.2), ('odpis', 32.2, 35.6), ('gra', 35.6, 38.6), ('nie', 38.6, 41.2), ('foto', 41.2, 44.8), ('moje', 44.8, 49.0), ('okno', 49.0, 52.6), ('bartekspi', 52.6, 55.6), ('blok', 55.6, 58.4), ('nowy', 58.4, 61.8), ('dzwoni', 61.8, 64.8), ('dzwoni2', 64.8, 67.8), ('gasnie', 67.8, 70.2), ('tv', 70.2, 73.8), ('odwroc', 73.8, 76.6), ('biegne', 76.6, 79.8), ('ewa', 79.8, 84.2), ('pilnuje', 84.2, 87.6), ('rano', 87.6, 90.6), ('ewatel', 90.6, 94.6), ('zdjecie', 94.6, 98.8), ('zaczela', 98.8, 102.2), ('epilog', 102.2, 108.4), ('end', 108.4, 113.4)]
SEG = [
    ['karta', 0.15, '[storytelling, tense, slow] To jest Momo.'],
    ['autokar', 0.15, '[storytelling] Na zimowe kolonie jechaliśmy autokarem w góry.'],
    ['mama', 0.15, '[mother, serious, warning] Kuba, jak napisze do ciebie ktoś obcy, nie odpisuj. Od razu powiedz pani.', 'mama'],
    ['kuba0', 0.15, '[boy, annoyed] Wiem, mamo. Nie jestem dzieckiem.', 'kuba'],
    ['osrodek', 0.15, '[storytelling, tense] Ośrodek stał sam, w środku lasu. Zasięg był tylko przy oknie.'],
    ['plotka', 0.15, '[storytelling, tense] Pierwszej nocy Bartek opowiadał o Momo. Że pisze do dzieci z nieznanego numeru.'],
    ['bartek', 0.15, '[boy, whispering, creepy] Kto jej odpisze, ten już nie wraca do domu.', 'bartek'],
    ['noc', 0.15, '[storytelling, tense] O trzeciej trzy zawibrował mój telefon.'],
    ['wiad', 0.15, '[whispering] Nieznany numer. Cześć, Kuba. Jestem Momo.'],
    ['odpis', 0.15, '[storytelling] Myślałem, że to Bartek robi sobie żarty. Odpisałem.'],
    ['gra', 0.15, '[whispering, creepy] Chcesz zagrać w grę?', 'momo'],
    ['nie', 0.15, '[storytelling] Napisałem: nie.'],
    ['foto', 0.15, '[storytelling, tense, slow] Odpisała: za późno. I przysłała zdjęcie.'],
    ['moje', 0.15, '[storytelling, tense, slow] To był nasz ośrodek. Zdjęcie z lasu, zrobione przed chwilą. Świeciło się tylko nasze okno.'],
    ['okno', 0.15, '[whispering] Wyjrzałem. Między drzewami świecił się czyjś telefon.'],
    ['bartekspi', 0.15, '[storytelling, tense] Bartek spał. Jego telefon był wyłączony.'],
    ['blok', 0.15, '[storytelling, urgent] Zablokowałem numer.'],
    ['nowy', 0.15, '[whispering] Po minucie napisał inny numer. Blokowanie nie pomoże, Kuba.'],
    ['dzwoni', 0.15, '[storytelling, urgent] Zadzwoniła. Połączenie wideo.'],
    ['dzwoni2', 0.15, '[storytelling, tense] Nie odebrałem. A telefon dzwonił. I dzwonił.'],
    ['gasnie', 0.15, '[storytelling] Aż padła bateria.'],
    ['tv', 0.15, '[storytelling, tense, slow] W ciemności sam włączył się stary telewizor.'],
    ['odwroc', 0.15, '[whispering, creepy, slow] Odwróć się, Kuba.', 'momo'],
    ['biegne', 0.15, '[storytelling, urgent] Nie odwróciłem się. Pobiegłem korytarzem do pani Ewy.'],
    ['ewa', 0.15, '[woman, scared, calm] Dobrze, że przyszedłeś. Nie odpisuj. Rano dzwonimy na policję i do rodziców.', 'ewa'],
    ['pilnuje', 0.15, '[storytelling] Pani Ewa zabrała mój telefon. Do rana siedziała pod naszymi drzwiami.'],
    ['rano', 0.15, '[storytelling, tense] Rano zawibrował jej telefon.'],
    ['ewatel', 0.15, '[whispering] Dzień dobry, pani Ewo. I zdjęcie.'],
    ['zdjecie', 0.15, '[storytelling, tense, slow] Na zdjęciu spaliśmy. Ktoś zrobił je w nocy. Z wnętrza naszego pokoju.'],
    ['zaczela', 0.15, '[whispering, creepy, slow] Gra… dopiero się zaczęła.', 'momo'],
    ['epilog', 0.15, '[storytelling] Momo okazała się internetowym oszustwem. Ale zasada jest prawdziwa. Nie odpisuj obcym, blokuj i od razu mów dorosłym.'],
    ['end', 0.15, '[whispering, creepy] Odpiszesz… mi?', 'momo'],
]
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 113.39], [-34, -34]),
    loops={'groza': ([0, .2, 4.4, 18.4, 25.2, 41.2, 61.8, 76.6, 84.2, 90.6, 102.2, 113.39], [-60, -10, -28, -16, -12, -6, -4, -12, -24, -4, -16, -40]),
           'tension': ([0, 4.4, 18.4, 41.2, 70.2, 84.2, 90.6, 102.2, 113.39], [-18, -32, -18, -8, -5, -26, -5, -24, -40]),
           'drone': ([0, 18.4, 41.2, 70.2, 84.2, 90.6, 102.2, 108.4], [-40, -22, -8, -6, -28, -6, -26, -30]),
           'wind': ([0, 4.4, 14.8, 18.4, 49.0, 52.6, 102.2, 113.39], [-30, -24, -20, -32, -18, -32, -60, -60]),
           'roomtone': ([0, 113.39], [-34, -34])},
    heartbeat=([0, 41.2, 70.2, 79.8, 90.6, 102.2, 113.39], [-90, -12, -5, -90, -6, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'hit': [('boom', -3)], 'jolt': [('jolt', -2)], 'msg': [('notif', -8)], 'buzz': [('vibrate', -6)], 'ring': [('ring', -8)], 'static': [('tv', -8)]}
EXTRA = [(0.1, 'hit_low', -4), (22.6, 'hit_low', -4), (42.4, 'hit_low', -1), (42.4, 'sting', -4), (51.4, 'hit_low', -1), (51.4, 'sting', -4), (53.4, 'hit_low', -3), (59.6, 'hit_low', -2), (68.8, 'hit_low', 0), (69.2, 'riser', -7), (72.0, 'hit_low', 0), (72.0, 'sting', -2), (92.6, 'riser', -6), (92.6, 'hit_low', 0), (96.8, 'hit_low', -1), (96.8, 'sting', -2), (101.5, 'hit_low', 0), (101.5, 'sting', 0), (108.4, 'hit_low', -2), (8.0, 'hit_low', -9), (14.8, 'hit_low', -9), (25.2, 'hit_low', -9), (55.6, 'hit_low', -9), (76.6, 'hit_low', -9), (84.2, 'hit_low', -9), (87.6, 'hit_low', -9)]
