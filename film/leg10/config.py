"""POLSKIE LEGENDY GROZY · CZARNA WOŁGA — własna historia na podstawie miejskiej legendy z PRL (wzór: BEBOK). Podgląd bez lektora."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'  # Victor
MODEL = 'eleven_v3'
SETTINGS = {'stability': 0.4, 'similarity_boost': 0.85}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {'kuba': ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3), 'mama': ('Xb7hH8MSUJpSbSDYk0k2', 'eleven_v3', V3), 'kierowca': ('bX8ZXtFbQtanSpI1KPZ1', 'eleven_v3', V3)}
VFILTER = {'lektor': 'highpass=f=70,acompressor=threshold=-20dB:ratio=2.5,aecho=0.5:0.3:35:0.08', 'mama': 'highpass=f=300,lowpass=f=3400,acompressor=threshold=-18dB:ratio=3',
           'kierowca': 'asetrate=48000*0.94,aresample=48000,atempo=1.06,aecho=0.6:0.5:40|90:0.3|0.2'}
TEMPO = {'lektor': 1.1}
MAXK = 1.6
PREVIEW_NO_VOICE = True
TARGET = 118
SQUEEZE = 0.75
SCENES = [('karta', 0, 4.4), ('nocauto', 4.4, 7.8), ('kierowca', 7.8, 10.8), ('porywa', 10.8, 14.2), ('mowiono', 14.2, 18.0), ('imie0', 18.0, 21.0), ('ja', 21.0, 24.2), ('mama1', 24.2, 27.8), ('kuba1', 27.8, 30.2), ('przystanek', 30.2, 33.2), ('swiatla', 33.2, 36.2), ('jelen', 36.2, 39.2), ('staje', 39.2, 41.8), ('szyba', 41.8, 44.6), ('kierowca2', 44.6, 48.2), ('imie', 48.2, 51.0), ('cukierek', 51.0, 54.0), ('drzwi', 54.0, 56.8), ('rekawiczka', 56.8, 59.8), ('nie', 59.8, 62.6), ('usmiech', 62.6, 65.6), ('dzwoni', 65.6, 68.4), ('mama2', 68.4, 72.0), ('patrzy', 72.0, 74.4), ('pusto', 74.4, 77.4), ('slady', 77.4, 80.8), ('mamaprzy', 80.8, 84.0), ('noc', 84.0, 86.8), ('okno', 86.8, 89.6), ('pod', 89.6, 92.8), ('okulary', 92.8, 96.0), ('sms', 96.0, 99.6), ('szept', 99.6, 102.6), ('epilog', 102.6, 107.2), ('end', 107.2, 112.2)]
SEG = [
    ['karta', 0.15, '[storytelling, tense, slow] To jest czarna wołga.'],
    ['nocauto', 0.15, '[storytelling, tense] Czarne auto z białymi firankami w oknach. Jeździ powoli. Bez świateł.'],
    ['kierowca', 0.15, '[storytelling, tense] Za kierownicą siedzi blady pan w kapeluszu i ciemnych okularach.'],
    ['porywa', 0.15, '[storytelling, tense] Mówiono, że zabiera dzieci. Został po nich tylko tornister na chodniku.'],
    ['mowiono', 0.15, '[storytelling] W PRL-u każda mama powtarzała: nie wsiadaj do obcych, bo czarna wołga cię zabierze.'],
    ['imie0', 0.15, '[whispering] A czarna wołga… zawsze zna twoje imię.'],
    ['ja', 0.15, '[storytelling] Myślałem, że to bajka z czasów babci. Do tamtej zimy.'],
    ['mama1', 0.15, '[mother, warm but firm] Kuba, jadę po ciebie. Czekaj na przystanku. Do nikogo nie wsiadaj.', 'mama'],
    ['kuba1', 0.15, '[boy, cheerful] Dobra, mamo. Czekam.', 'kuba'],
    ['przystanek', 0.15, '[storytelling] Przystanek był pusty. Śnieg sypał coraz mocniej.'],
    ['swiatla', 0.15, '[storytelling, tense] Z końca ulicy wyjechały dwa okrągłe światła.'],
    ['jelen', 0.15, '[storytelling, tense] Czarne auto. Na masce srebrny jeleń.'],
    ['staje', 0.15, '[whispering] Zatrzymało się tuż przy mnie.'],
    ['szyba', 0.15, '[storytelling, tense] Szyba zjechała w dół. Powoli.'],
    ['kierowca2', 0.15, '[creepy, friendly, smooth man] Kuba? Mama prosiła, żebym cię odebrał. Wsiadaj, zimno.', 'kierowca'],
    ['imie', 0.15, '[storytelling, tense] Znał moje imię.'],
    ['cukierek', 0.15, '[storytelling, tense] Podał mi cukierka. Kukułkę. Moje ulubione.'],
    ['drzwi', 0.15, '[whispering] Tylne drzwi same się uchyliły.'],
    ['rekawiczka', 0.15, '[storytelling, tense] Na siedzeniu leżała dziecięca rękawiczka. Mokra.'],
    ['nie', 0.15, '[scared, trying to be brave] Nie, dziękuję. Poczekam na mamę.', 'kuba'],
    ['usmiech', 0.15, '[whispering] Uśmiech kierowcy robił się coraz szerszy. Za szeroki.'],
    ['dzwoni', 0.15, '[storytelling, urgent] Zadzwoniłem do mamy.'],
    ['mama2', 0.15, '[mother, worried, confused] Kuba? Jestem jeszcze w pracy. Nikogo po ciebie nie wysyłałam.', 'mama'],
    ['patrzy', 0.15, '[storytelling, tense] Odwróciłem się do auta.'],
    ['pusto', 0.15, '[whispering] Ale ulica była pusta. Żadnego dźwięku silnika.'],
    ['slady', 0.15, '[storytelling, tense, slow] A na świeżym śniegu… nie było ani jednego śladu opon.'],
    ['mamaprzy', 0.15, '[storytelling] Mama przyjechała pół godziny później. Nie puszczała mojej ręki do samego domu.'],
    ['noc', 0.15, '[storytelling, tense] W nocy obudził mnie cichy pomruk silnika.'],
    ['okno', 0.15, '[whispering] Podszedłem do okna.'],
    ['pod', 0.15, '[storytelling, tense] Pod blokiem stała czarna wołga. Bez świateł.'],
    ['okulary', 0.15, '[whispering] Kierowca spojrzał prosto w moje okno. I zdjął okulary.'],
    ['sms', 0.15, '[storytelling, tense] Telefon zawibrował. Numer nieznany.'],
    ['szept', 0.15, '[whispering, creepy, smooth man] Jutro… odbiorę cię ze szkoły.', 'kierowca'],
    ['epilog', 0.15, '[storytelling] W latach siedemdziesiątych i osiemdziesiątych rodzice w całej Polsce straszyli dzieci czarną wołgą.'],
    ['end', 0.15, '[whispering, creepy, smooth man] Wsiadaj… zimno.', 'kierowca'],
]
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 112.19], [-34, -34]),
    loops={'groza': ([0, .2, 21.0, 33.2, 44.6, 62.6, 80.8, 89.6, 102.6, 112.19], [-60, -10, -26, -14, -8, -4, -24, -6, -16, -40]),
           'tension': ([0, 21.0, 33.2, 62.6, 80.8, 89.6, 102.6, 112.19], [-18, -30, -16, -6, -24, -6, -24, -40]),
           'wind': ([0, 112.19], [-24, -24]),
           'drone': ([0, 33.2, 62.6, 80.8, 92.8, 102.6, 107.2], [-40, -18, -8, -30, -8, -26, -30]),
           'roomtone': ([0, 112.19], [-36, -36])},
    heartbeat=([0, 39.2, 62.6, 80.8, 89.6, 102.6, 112.19], [-90, -12, -6, -90, -8, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -16)], 'hit': [('boom', -3)], 'jolt': [('jolt', -2)], 'scrape': [('scrape', -4)], 'creak': [('creak', -4)], 'steps': [('run', -6)],
           'slam': [('slam', -2)], 'switch': [('poweroff', -3)]}
EXTRA = [(0.1, 'hit_low', -4), (9.1, 'hit_low', -3), (19.2, 'sting', -5), (40.8, 'hit_low', 0), (48.4, 'hit_low', -1), (48.4, 'sting', -4), (68.6, 'riser', -7), (72.1, 'hit_low', 0), (74.4, 'riser', -6), (78.3, 'hit_low', 0), (78.3, 'sting', -2), (89.6, 'hit_low', -1), (90.4, 'riser', -5), (93.8, 'hit_low', 0), (93.8, 'sting', -1), (102.2, 'hit_low', 0), (102.2, 'sting', 0), (107.2, 'hit_low', -2), (21.0, 'hit_low', -9), (30.2, 'hit_low', -9), (44.6, 'hit_low', -9), (65.6, 'hit_low', -9), (80.8, 'hit_low', -9), (84.0, 'hit_low', -9), (96.0, 'hit_low', -9)]
