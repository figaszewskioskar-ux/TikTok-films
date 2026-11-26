"""LEGENDY GROZY · TABLICA OUIJA — własna historia na podstawie miejskiej legendy (wzór: BEBOK). Podgląd bez lektora."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'  # Victor
MODEL = 'eleven_v3'
SETTINGS = {'stability': 0.4, 'similarity_boost': 0.85}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {'kuba': ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3), 'bartek': ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3), 'mama': ('Xb7hH8MSUJpSbSDYk0k2', 'eleven_v3', V3), 'duch': ('bX8ZXtFbQtanSpI1KPZ1', 'eleven_v3', V3)}
VFILTER = {'lektor': 'highpass=f=70,acompressor=threshold=-20dB:ratio=2.5,aecho=0.5:0.3:35:0.08', 'bartek': 'asetrate=48000*0.93,aresample=48000,atempo=1.07',
           'duch': 'asetrate=48000*0.82,aresample=48000,atempo=1.15,aecho=0.7:0.6:80|180:0.45|0.3'}
TEMPO = {'lektor': 1.1}
MAXK = 1.6
PREVIEW_NO_VOICE = False
TARGET = 118
SQUEEZE = 0.75
SCENES = [('karta', 0, 4.4), ('wskaznik', 4.4, 7.6), ('rusza0', 7.6, 11.2), ('zasada', 11.2, 14.8), ('inaczej', 14.8, 17.8), ('mama', 17.8, 21.8), ('ja', 21.8, 25.2), ('strych', 25.2, 28.4), ('swieczki', 28.4, 31.4), ('pyta', 31.4, 34.0), ('cisza', 34.0, 36.6), ('tak', 36.6, 40.0), ('imie', 40.0, 42.4), ('kuba', 42.4, 46.6), ('gdzie', 46.6, 49.0), ('zatoba', 49.0, 53.4), ('gasna', 53.4, 55.8), ('krzyk', 55.8, 58.6), ('swiatlo', 58.6, 61.6), ('zapomnielismy', 61.6, 65.2), ('noc', 65.2, 68.6), ('sunie', 68.6, 71.6), ('szkielko', 71.6, 75.2), ('nikogo', 75.2, 77.8), ('rano', 77.8, 80.8), ('plecak', 80.8, 84.4), ('kartka', 84.4, 87.8), ('dowidzenia', 87.8, 90.2), ('nie', 90.2, 93.8), ('szept', 93.8, 96.8), ('epilog', 96.8, 101.6), ('end', 101.6, 106.6)]
SEG = [
    ['karta', 0.15, '[storytelling, tense, slow] To jest tablica Ouija.'],
    ['wskaznik', 0.15, '[storytelling] Litery. Cyfry. TAK i NIE. I mały wskaźnik ze szkiełkiem.'],
    ['rusza0', 0.15, '[whispering] Kładziesz na nim palce. Pytasz: czy ktoś tu jest? A wskaźnik sam rusza.'],
    ['zasada', 0.15, '[storytelling, serious] Jest tylko jedna zasada. Zanim skończysz, musisz powiedzieć: do widzenia.'],
    ['inaczej', 0.15, '[whispering] Inaczej to, co przyszło, zostaje z tobą.'],
    ['mama', 0.15, '[mother, serious, warning] Kuba, nie baw się tym. A jak już zaczniesz, zawsze powiedz do widzenia.', 'mama'],
    ['ja', 0.15, '[storytelling] Myślałem, że to zabawka. Do piżama party u Bartka.'],
    ['strych', 0.15, '[storytelling] Tablicę znaleźliśmy na strychu jego dziadka.'],
    ['swieczki', 0.15, '[storytelling, tense] Zgasiliśmy światło. Zapaliliśmy świeczki.'],
    ['pyta', 0.15, '[boy, whispering, excited] Czy ktoś tu jest?', 'bartek'],
    ['cisza', 0.15, '[storytelling] Nic. Bartek zaczął się śmiać.'],
    ['tak', 0.15, '[storytelling, tense, slow] Wtedy wskaźnik drgnął. I powoli przesunął się na: TAK.'],
    ['imie', 0.15, '[boy, scared, whispering] Jak masz na imię?', 'kuba'],
    ['kuba', 0.15, '[whispering] K. U. B. A. To było moje imię.'],
    ['gdzie', 0.15, '[boy, scared] Gdzie jesteś?', 'bartek'],
    ['zatoba', 0.15, '[storytelling, tense, slow] Z. A. T. O. B. Ą. Za tobą.'],
    ['gasna', 0.15, '[storytelling, urgent] Wszystkie świeczki zgasły naraz.'],
    ['krzyk', 0.15, '[storytelling, urgent] Ktoś krzyknął. Tablica poleciała na podłogę.'],
    ['swiatlo', 0.15, '[storytelling, tense] Zapaliliśmy światło. Nikogo nie było.'],
    ['zapomnielismy', 0.15, '[storytelling, tense, slow] Dopiero w śpiworze zrozumiałem. Nie powiedzieliśmy do widzenia.'],
    ['noc', 0.15, '[storytelling, tense] W nocy obudził mnie cichy szmer.'],
    ['sunie', 0.15, '[whispering] Wskaźnik sunął po podłodze. Sam.'],
    ['szkielko', 0.15, '[whispering] Spojrzałem przez jego szkiełko. Tuż za mną stał ktoś wysoki.'],
    ['nikogo', 0.15, '[storytelling, urgent] Odwróciłem się. Nikogo.'],
    ['rano', 0.15, '[storytelling] Rano myślałem, że to był tylko sen.'],
    ['plecak', 0.15, '[storytelling, tense, slow] Ale w domu otworzyłem plecak. W środku leżał wskaźnik. Nie zabierałem go.'],
    ['kartka', 0.15, '[storytelling, urgent] Narysowałem litery na kartce. Położyłem na niej wskaźnik.'],
    ['dowidzenia', 0.15, '[boy, shouting, scared] Do widzenia!', 'kuba'],
    ['nie', 0.15, '[storytelling, tense, slow] Wskaźnik sam przesunął się przez kartkę. I zatrzymał na słowie: NIE.'],
    ['szept', 0.15, '[whispering, deep, eerie] Jeszcze… nie skończyliśmy.', 'duch'],
    ['epilog', 0.15, '[storytelling] Mówi się, że kto bawi się tablicą, ten zawsze kończy słowem: do widzenia. Ludzie wierzą w to do dziś.'],
    ['end', 0.15, '[whispering, deep, eerie] Do… zobaczenia.', 'duch'],
]
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 106.58999999999999], [-34, -34]),
    loops={'groza': ([0, .2, 21.8, 28.4, 36.6, 49.0, 58.6, 65.2, 71.6, 77.8, 80.8, 90.2, 96.8, 106.58999999999999], [-60, -10, -26, -16, -10, -5, -20, -12, -4, -24, -10, -4, -16, -40]),
           'tension': ([0, 21.8, 28.4, 49.0, 58.6, 71.6, 77.8, 90.2, 96.8, 106.58999999999999], [-18, -30, -16, -6, -22, -6, -26, -6, -24, -40]),
           'drone': ([0, 28.4, 49.0, 77.8, 80.8, 96.8, 101.6], [-40, -18, -8, -30, -8, -26, -30]),
           'roomtone': ([0, 106.58999999999999], [-36, -36])},
    heartbeat=([0, 36.6, 49.0, 58.6, 68.6, 77.8, 80.8, 96.8, 106.58999999999999], [-90, -14, -6, -90, -8, -90, -10, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -16)], 'hit': [('boom', -3)], 'jolt': [('jolt', -2)], 'scrape': [('scrape', -7)], 'switch': [('poweroff', -3)]}
EXTRA = [(0.1, 'hit_low', -4), (8.2, 'sting', -8), (39.2, 'hit_low', -1), (40.4, 'riser', -8), (45.4, 'hit_low', 0), (45.4, 'sting', -4), (53.0, 'hit_low', 0), (53.0, 'sting', -2), (53.7, 'hit_low', 0), (62.4, 'hit_low', -3), (69.2, 'riser', -6), (72.8, 'hit_low', 0), (72.8, 'sting', -1), (81.8, 'hit_low', -1), (88.2, 'riser', -5), (92.4, 'hit_low', 0), (92.4, 'sting', -2), (96.4, 'hit_low', 0), (96.4, 'sting', 0), (101.6, 'hit_low', -2), (21.8, 'hit_low', -9), (25.2, 'hit_low', -9), (28.4, 'hit_low', -9), (58.6, 'hit_low', -9), (65.2, 'hit_low', -9), (77.8, 'hit_low', -9), (84.4, 'hit_low', -9)]
