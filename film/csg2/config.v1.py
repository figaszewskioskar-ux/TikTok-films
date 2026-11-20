"""CO SIĘ STANIE, GDY…? — „Prąd gaśnie o 3:00”. Otwarcie jak we wzorze: twarz z bliska → „Proste.” → 1:00 → blok z jednym oknem. Podgląd bez lektora."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'
MODEL = 'eleven_v3'
SETTINGS = {'stability': 0.5, 'similarity_boost': 0.85}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {'kuba': ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3), 'obcy': ('rUOVqZ1ISbf2yl2Vbpwa', 'eleven_v3', V3), 'mama': ('XrExE9yKIg1WjnnlVkGX', 'eleven_v3', V3),
          'zosia': ('d4Z5Fvjohw3zxGpV8XUV', 'eleven_v3', V3), 'strazak': ('xsSg7GkDPDhaGZpbKOLn', 'eleven_v3', V3), 'admin': ('Xb7hH8MSUJpSbSDYk0k2', 'eleven_v3', V3)}
VFILTER = {'lektor': 'asetrate=48000*0.93,aresample=48000,atempo=1.075,lowpass=f=7500,highpass=f=60,acompressor=threshold=-22dB:ratio=3,aecho=0.7:0.5:70|140:0.22|0.12',
           'obcy': 'lowpass=f=5000,aecho=0.6:0.4:40:0.25', 'admin': 'highpass=f=350,lowpass=f=3200,acompressor', 'zosia': 'highpass=f=150,asetrate=48000*1.08,aresample=48000,atempo=0.93'}
VGAIN = {'obcy': 1.2}
MAXK = 1.6
PREVIEW_NO_VOICE = False
TARGET = None
SQUEEZE = 0.7
SCENES = [('twarz', 0, 4.2), ('proste', 4.2, 5.8), ('minuta', 5.8, 8), ('blok', 8, 10.4), ('okno', 10.4, 12.6), ('nikt', 12.6, 14.4), ('zamek', 14.4, 16.2), ('puk', 16.2, 18), ('glos', 18, 20.6),
          ('mama', 20.6, 22.6), ('z1', 22.6, 24.8), ('admin', 24.8, 27.2), ('nikogo', 27.2, 29.6), ('wizjer', 29.6, 32), ('imiona', 32, 34.6), ('tabliczka', 34.6, 36.6), ('z2', 36.6, 38.6),
          ('tel112', 38.6, 40.6), ('policja10', 40.6, 42.6), ('wytrych', 42.6, 44.6), ('krzeslo', 44.6, 46.8), ('kartka', 46.8, 49), ('gaz', 49, 51.2), ('dym', 51.2, 53.4), ('dymkuba', 53.4, 55),
          ('z5', 55, 57.4), ('swiecicie', 57.4, 59.6), ('na_dole', 59.6, 62), ('zosia', 62, 63.8), ('straz', 63.8, 66), ('strazak', 66, 68.2), ('z6', 68.2, 70.4), ('schody', 70.4, 72.6),
          ('mis', 72.6, 74.4), ('pod_blokiem', 74.4, 76.8), ('widzisz', 76.8, 78.6), ('w_tlumie', 78.6, 81), ('z7', 81, 83.2), ('ucieka', 83.2, 85.4), ('snieg', 85.4, 87.4), ('rano', 87.4, 89.8),
          ('szew', 89.8, 91.8), ('miga', 91.8, 93.8), ('mikrofon', 93.8, 95.8), ('szept', 95.8, 98.4), ('end', 98.4, 104)]
SEG = [
    ['twarz', 0.1, '[low, ominous voice, slowly] Co zrobisz, gdy obcy o trzeciej w nocy zgasi prąd w twoim bloku?'],
    ['proste', 0.1, '[low, ominous voice] Proste.'],
    ['minuta', 0.2, '[low, ominous voice] Masz jedną minutę.'],
    ['blok', 0.1, '[low, ominous voice] Jest trzecia w nocy.'],
    ['okno', 0.1, '[low, ominous voice] W całym bloku nie ma prądu.'],
    ['nikt', 0.1, '[low, ominous voice] Nikt nie śpi.'],
    ['zamek', 0.1, '[low, ominous voice] Drzwi zamknięte. Łańcuch założony.'],
    ['puk', 0.1, '[whispering] Puk. Puk. Puk.'],
    ['glos', 0.2, '[friendly, official] Administracja. Muszę sprawdzić licznik.', 'obcy'],
    ['mama', 0.2, '[suspicious] O trzeciej w nocy?', 'mama'],
    ['z1', 0.1, '[low, ominous voice] Zasada pierwsza. W nocy nie otwierasz nikomu.'],
    ['admin', 0.1, '[low, ominous voice] Mama dzwoni do administracji.'],
    ['nikogo', 0.2, '[calm, on the phone] Nikogo do państwa nie wysyłaliśmy.', 'admin'],
    ['wizjer', 0.1, '[low, ominous voice] Przez wizjer: kamizelka. Napis flamastrem.'],
    ['imiona', 0.3, '[whispers, sweet, creepy] Pani Anno… Kuba… Zosiu…', 'obcy'],
    ['tabliczka', 0.1, '[whispering] Wasze imiona są na drzwiach.'],
    ['z2', 0.1, '[low, ominous voice] Zasada druga. Żadnych imion na drzwiach.'],
    ['tel112', 0.1, '[urgent] Sto dwanaście.'],
    ['policja10', 0.1, '[low, ominous voice] Policja za dziesięć minut.'],
    ['wytrych', 0.1, '[whispering] Chrobot w zamku.'],
    ['krzeslo', 0.2, '[urgent] Krzesło pod klamkę. Oba zamki.'],
    ['kartka', 0.1, '[low, ominous voice] Pod drzwiami kartka. Wyjdźcie. Gaz.'],
    ['gaz', 0.1, '[low, ominous voice] Nie czuć gazu. Zasada czwarta: czujesz gaz, dzwonisz dziewięćset dziewięćdziesiąt dwa.'],
    ['dym', 0.1, '[low, ominous voice] Ale spod drzwi wpełza dym.'],
    ['dymkuba', 0.1, '[panicked] Mamo, dym!', 'kuba'],
    ['z5', 0.1, '[urgent] Zasada piąta. Dym na klatce? Nie wychodzisz. Mokre ręczniki pod drzwi.'],
    ['swiecicie', 0.1, '[urgent] Świecicie telefonem w oknie.'],
    ['na_dole', 0.1, '[whispering] Na dole stoi on. I macha.'],
    ['zosia', 0.1, '[whispering] Zosia płacze.'],
    ['straz', 0.1, '[low, ominous voice] Syreny. Straż pożarna.'],
    ['strazak', 0.2, '[loud] Straż pożarna! Jest ktoś w środku?', 'strazak'],
    ['z6', 0.1, '[low, ominous voice] Zasada szósta. Sprawdzasz przez okno. Wóz stoi pod blokiem.'],
    ['schody', 0.1, '[urgent] Schodzicie w dymie.'],
    ['mis', 0.1, '[whispering] Zosi wypada miś.'],
    ['pod_blokiem', 0.1, '[low, ominous voice] Pod blokiem cała klatka.'],
    ['widzisz', 0.1, '[whispering] I wtedy go widzisz.'],
    ['w_tlumie', 0.1, '[low, ominous voice] Stoi w tłumie. Z misiem Zosi.'],
    ['z7', 0.1, '[urgent] Zasada siódma. Nie podchodzisz. Pokazujesz policji.'],
    ['ucieka', 0.1, '[urgent] Ucieka między garaże.'],
    ['snieg', 0.1, '[low, ominous voice] Zostaje tylko miś. Na śniegu.'],
    ['rano', 0.1, '[low, ominous voice] Rano Zosia śpi z misiem.'],
    ['szew', 0.1, '[whispering] Miś ma nowy szew.'],
    ['miga', 0.1, '[whispering] W środku coś miga.'],
    ['mikrofon', 0.1, '[low, ominous voice] Mikrofon.'],
    ['szept', 0.3, '[whispers, deep] Dobranoc, Kuba.', 'obcy'],
    ['end', 0.3, '[low, ominous voice] Obserwuj… żeby zobaczyć część drugą.'],
]
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 103.99], [-34, -34]),
    loops={'groza': ([0, .2, 4.2, 8, 16.2, 29.6, 42.6, 51.2, 59.6, 63.8, 70.4, 76.8, 87.4, 91.8, 95.8, 98.4, 98.55, 103.99],
                     [-60, -8, -10, -14, -10, -10, -8, -6, -6, -12, -10, -6, -24, -10, -4, -4, -70, -60]),
           'tension': ([0, 8, 29.6, 51.2, 63.8, 76.8, 87.4, 91.8, 98.4, 98.55, 103.99], [-24, -18, -12, -8, -14, -8, -26, -12, -6, -60, -60]),
           'drone': ([0, 8, 42.6, 59.6, 70.4, 87.4, 95.8, 98.4, 98.55, 103.99], [-24, -24, -14, -10, -16, -28, -10, -8, -60, -60]),
           'roomtone': ([0, 103.99], [-38, -38])},
    heartbeat=([0, 14.4, 29.6, 42.6, 53.4, 62, 76.8, 87.4, 91.8, 98.4, 98.5, 103.99], [-90, -12, -10, -8, -6, -10, -6, -90, -10, -5, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -22)], 'hit': [('boom', -3)], 'jolt': [('jolt', -2)], 'knock': [('knock', -1)], 'pick': [('lockpick', -4)], 'paper': [('paper', -4)],
           'water': [('scrape', -14)], 'siren': [('siren', -10)], 'steps': [('run', -5)]}
EXTRA = [(98.4, 'hit_low', 0), (98.4, 'sting', -3), (94.4, 'riser', -6), (2.6, 'sting', -6), (5.8, 'hit_low', -2), (27.5, 'sting', -6), (53.4, 'sting', -5), (78.6, 'sting', -4), (92.1, 'sting', -5)] + \
        [(t, 'hit_low', -9) for t in (0.2, 8, 16.2, 29.6, 38.6, 46.8, 59.6, 66, 74.4, 83.2, 89.8)]
