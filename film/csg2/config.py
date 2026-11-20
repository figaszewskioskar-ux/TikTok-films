"""CO SIĘ STANIE, GDY…? — „Prąd gaśnie o 3:00”. Otwarcie jak we wzorze: twarz z bliska → „Proste.” → 1:00 → blok z jednym oknem. Podgląd bez lektora."""
VOICE = 'bX8ZXtFbQtanSpI1KPZ1'  # Ksawery — chłodny, gardłowy lektor grozy
MODEL = 'eleven_v3'
SETTINGS = {'stability': 0.45, 'similarity_boost': 0.85}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {'kuba': ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3), 'obcy': ('rUOVqZ1ISbf2yl2Vbpwa', 'eleven_v3', V3), 'mama': ('XrExE9yKIg1WjnnlVkGX', 'eleven_v3', V3),
          'zosia': ('d4Z5Fvjohw3zxGpV8XUV', 'eleven_v3', V3), 'strazak': ('xsSg7GkDPDhaGZpbKOLn', 'eleven_v3', V3), 'admin': ('Xb7hH8MSUJpSbSDYk0k2', 'eleven_v3', V3)}
VFILTER = {'lektor': 'asetrate=48000*0.95,aresample=48000,atempo=1.05,lowpass=f=8000,highpass=f=50,acompressor=threshold=-20dB:ratio=3,aecho=0.6:0.4:60|130:0.2|0.1',
           'obcy': 'lowpass=f=5000,aecho=0.6:0.4:40:0.25', 'admin': 'highpass=f=350,lowpass=f=3200,acompressor', 'zosia': 'highpass=f=150,asetrate=48000*1.08,aresample=48000,atempo=0.93'}
VGAIN = {'obcy': 1.2}
MAXK = 1.6
PREVIEW_NO_VOICE = False
TARGET = None
SQUEEZE = 0.7
SCENES = [('twarz', 0, 4.2), ('proste', 4.2, 5.8), ('minuta', 5.8, 8.0), ('blok', 8.0, 10.4), ('okno', 10.4, 12.6), ('nikt', 12.6, 14.8), ('zamek', 14.8, 17.0), ('puk', 17.0, 19.2), ('glos', 19.2, 21.4), ('mama', 21.4, 23.6), ('czarny', 23.6, 25.8), ('oko', 25.8, 28.0), ('admin', 28.0, 30.2), ('nikogo', 30.2, 32.4), ('wizjer', 32.4, 34.6), ('imiona', 34.6, 36.8), ('tabliczka', 36.8, 39.0), ('tel112', 39.0, 41.2), ('policja10', 41.2, 43.4), ('wytrych', 43.4, 45.6), ('krzeslo', 45.6, 47.8), ('cien', 47.8, 50.0), ('kartka', 50.0, 52.2), ('gaz', 52.2, 54.4), ('dym', 54.4, 56.6), ('dymkuba', 56.6, 58.8), ('z5', 58.8, 61.0), ('swiecicie', 61.0, 63.2), ('na_dole', 63.2, 65.4), ('zosia', 65.4, 67.6), ('straz', 67.6, 69.8), ('strazak', 69.8, 72.0), ('z6', 72.0, 74.2), ('schody', 74.2, 76.4), ('mis', 76.4, 78.6), ('pod_blokiem', 78.6, 80.8), ('widzisz', 80.8, 83.0), ('w_tlumie', 83.0, 85.2), ('ciii', 85.2, 87.4), ('z7', 87.4, 89.6), ('ucieka', 89.6, 91.8), ('snieg', 91.8, 94.0), ('rano', 94.0, 96.2), ('szew', 96.2, 98.4), ('miga', 98.4, 100.6), ('mikrofon', 100.6, 102.8), ('szept', 102.8, 105.0), ('drzwi_pokoju', 105.0, 107.2), ('end', 107.2, 112.8)]
SEG = [
    ['twarz', 0.1, '[ominous, menacing, slowly] Co zrobisz, gdy obcy o trzeciej w nocy zgasi prąd w twoim bloku?'],
    ['proste', 0.1, '[ominous, calm] Proste.'],
    ['minuta', 0.2, '[ominous, menacing] Masz jedną minutę.'],
    ['blok', 0.1, '[ominous, low voice, slowly] Jest trzecia w nocy.'],
    ['okno', 0.1, '[ominous, low voice, slowly] Cały blok tonie w ciemności.'],
    ['nikt', 0.1, '[ominous, low voice, slowly] Nikt nie śpi. Wszyscy czekacie.'],
    ['zamek', 0.1, '[ominous, low voice, slowly] Drzwi zamknięte. Łańcuch założony.'],
    ['puk', 0.1, '[whispering, ominous] Wtedy ktoś puka.'],
    ['glos', 0.2, '[friendly, official] Administracja. Muszę sprawdzić licznik.', 'obcy'],
    ['mama', 0.2, '[suspicious] O trzeciej w nocy?', 'mama'],
    ['czarny', 0.1, '[ominous, low voice, slowly] Patrzysz przez wizjer. Ciemność.'],
    ['oko', 0.15, '[whispering, ominous] I nagle… oko.'],
    ['admin', 0.1, '[tense, urgent, low voice] Mama dzwoni do administracji.'],
    ['nikogo', 0.2, '[calm, on the phone] Nikogo do państwa nie wysyłaliśmy.', 'admin'],
    ['wizjer', 0.1, '[ominous, low voice, slowly] Kamizelka. Napis zrobiony flamastrem.'],
    ['imiona', 0.3, '[whispers, sweet, creepy] Pani Anno… Kuba… Zosiu…', 'obcy'],
    ['tabliczka', 0.1, '[whispering, ominous] Zna wasze imiona. Są na drzwiach.'],
    ['tel112', 0.1, '[tense, urgent, low voice] Mama dzwoni na sto dwanaście.'],
    ['policja10', 0.1, '[ominous, low voice, slowly] Policja za dziesięć minut. Za długo.'],
    ['wytrych', 0.1, '[whispering, ominous] Chrobot w zamku. On próbuje wejść.'],
    ['krzeslo', 0.1, '[tense, urgent, low voice] Wciskasz krzesło pod klamkę.'],
    ['cien', 0.2, '[whispering, ominous] Pod drzwiami… jego cień.'],
    ['kartka', 0.1, '[ominous, low voice, slowly] Spod drzwi wysuwa się kartka. Wyjdźcie. Gaz.'],
    ['gaz', 0.1, '[ominous, low voice, slowly] Mama wącha powietrze. Gazu nie ma. To pułapka.'],
    ['dym', 0.1, '[ominous, low voice, slowly] Ale po chwili spod drzwi wpełza dym.'],
    ['dymkuba', 0.1, '[panicked] Mamo, dym!', 'kuba'],
    ['z5', 0.1, '[tense, urgent, low voice] Mokre ręczniki pod drzwi. Nie wychodzicie.'],
    ['swiecicie', 0.1, '[tense, urgent, low voice] Świecicie telefonem w oknie.'],
    ['na_dole', 0.1, '[whispering, ominous] Na dole stoi on. Patrzy prosto na ciebie.'],
    ['zosia', 0.1, '[whispering, ominous] Zosia płacze.'],
    ['straz', 0.1, '[ominous, low voice, slowly] Syreny. Straż pożarna.'],
    ['strazak', 0.2, '[loud] Straż pożarna! Jest ktoś w środku?', 'strazak'],
    ['z6', 0.1, '[ominous, low voice, slowly] Wóz stoi pod blokiem. To naprawdę oni.'],
    ['schody', 0.1, '[tense, urgent, low voice] Schodzicie w dymie.'],
    ['mis', 0.1, '[whispering, ominous] Zosi wypada miś.'],
    ['pod_blokiem', 0.1, '[ominous, low voice, slowly] Pod blokiem cała klatka.'],
    ['widzisz', 0.1, '[whispering, ominous] I wtedy go widzisz.'],
    ['w_tlumie', 0.1, '[ominous, low voice, slowly] Stoi w tłumie. Z misiem Zosi.'],
    ['ciii', 0.2, '[whispering, ominous] Przykłada palec do ust.'],
    ['z7', 0.2, '[shouting] To on! Przy drzwiach!', 'kuba'],
    ['ucieka', 0.1, '[tense, urgent, low voice] Ucieka między garaże.'],
    ['snieg', 0.1, '[ominous, low voice, slowly] Zostaje tylko miś. Na śniegu.'],
    ['rano', 0.1, '[ominous, low voice, slowly] Rano Zosia śpi z misiem.'],
    ['szew', 0.1, '[whispering, ominous] Miś ma nowy szew.'],
    ['miga', 0.1, '[whispering, ominous] W środku coś miga.'],
    ['mikrofon', 0.1, '[ominous, low voice, slowly] Mikrofon. Słyszał każde słowo.'],
    ['szept', 0.3, '[whispers, deep] Dobranoc, Kuba.', 'obcy'],
    ['end', 0.4, '[ominous, low voice, slowly] Obserwuj… żeby zobaczyć część drugą.'],
]
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 112.78999999999999], [-34, -34]),
    loops={'groza': ([0, .2, 4.2, 8, 17.0, 25.8, 43.4, 54.4, 63.2, 67.6, 74.2, 80.8, 94.0, 98.4, 105.0, 107.2, 107.35000000000001, 112.78999999999999],
                     [-60, -8, -10, -14, -10, -8, -8, -6, -6, -12, -10, -6, -24, -10, -4, -4, -70, -60]),
           'tension': ([0, 8, 25.8, 54.4, 67.6, 80.8, 94.0, 98.4, 107.2, 107.35000000000001, 112.78999999999999], [-24, -18, -12, -8, -14, -8, -26, -12, -6, -60, -60]),
           'drone': ([0, 8, 43.4, 63.2, 74.2, 94.0, 102.8, 107.2, 107.35000000000001, 112.78999999999999], [-24, -24, -14, -10, -16, -28, -10, -8, -60, -60]),
           'roomtone': ([0, 112.78999999999999], [-38, -38])},
    heartbeat=([0, 14.8, 23.6, 43.4, 56.6, 65.4, 80.8, 94.0, 98.4, 107.2, 107.3, 112.78999999999999], [-90, -12, -8, -8, -6, -10, -6, -90, -10, -5, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -22)], 'hit': [('boom', -3)], 'jolt': [('jolt', -2)], 'knock': [('knock', -1)], 'pick': [('lockpick', -4)], 'paper': [('paper', -4)],
           'water': [('scrape', -14)], 'siren': [('siren', -10)], 'steps': [('run', -5)], 'creak': [('creak', -4)]}
EXTRA = [(107.2, 'hit_low', 0), (107.2, 'sting', -3), (103.2, 'riser', -6), (2.6, 'sting', -6), (5.8, 'hit_low', -2), (25.95, 'sting', -3), (30.5, 'sting', -6), (56.6, 'sting', -5), (80.8, 'sting', -4), (85.2, 'sting', -5), (98.7, 'sting', -5), (105.8, 'hit_low', 0)] + [(t, 'hit_low', -9) for t in (8.0, 17.0, 32.4, 39.0, 50.0, 63.2, 69.8, 78.6, 89.6, 96.2)]