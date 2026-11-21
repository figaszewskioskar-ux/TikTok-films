"""POLSKIE LEGENDY GROZY · STRZYGA — własna historia na podstawie ludowych wierzeń. Podgląd bez lektora."""
VOICE = 'bX8ZXtFbQtanSpI1KPZ1'  # Ksawery
MODEL = 'eleven_v3'
SETTINGS = {'stability': 0.45, 'similarity_boost': 0.85}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {'kuba': ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3), 'babcia': ('d4Z5Fvjohw3zxGpV8XUV', 'eleven_v3', V3), 'strzyga': ('d4Z5Fvjohw3zxGpV8XUV', 'eleven_v3', V3)}
VFILTER = {'lektor': 'asetrate=48000*0.95,aresample=48000,atempo=1.05,lowpass=f=8000,highpass=f=50,acompressor=threshold=-20dB:ratio=3,aecho=0.6:0.4:60|130:0.2|0.1',
           'babcia': 'asetrate=48000*0.9,aresample=48000,atempo=1.08', 'strzyga': 'asetrate=48000*0.84,aresample=48000,atempo=1.12,highpass=f=200,aecho=0.7:0.6:50|110:0.35|0.2'}
MAXK = 1.6
PREVIEW_NO_VOICE = True
TARGET = None
SQUEEZE = 0.75
SCENES = [('karta', 0, 4.2), ('dwie_dusze', 4.2, 7.2), ('zeby', 7.2, 9.8), ('sowa', 9.8, 12.4), ('grob', 12.4, 15.4), ('noc', 15.4, 18.0), ('mak', 18.0, 20.8), ('ja', 20.8, 23.6), ('wies', 23.6, 26.0), ('chata', 26.0, 28.8), ('dzwon', 28.8, 31.4), ('pogrzeb', 31.4, 34.2), ('babcia1', 34.2, 37.0), ('kuba1', 37.0, 39.2), ('babcia2', 39.2, 42.0), ('zamiec', 42.0, 44.4), ('lozko', 44.4, 46.8), ('puk', 46.8, 49.0), ('sowa2', 49.0, 51.0), ('glos', 51.0, 53.8), ('kuba2', 53.8, 56.2), ('twarz', 56.2, 58.8), ('zeby2', 58.8, 60.8), ('jadwiga', 60.8, 63.2), ('zasuwka', 63.2, 65.4), ('budzi', 65.4, 67.6), ('woreczek', 67.6, 70.0), ('sypie', 70.0, 72.6), ('babcia3', 72.6, 75.4), ('liczy', 75.4, 78.4), ('czeka', 78.4, 80.8), ('zegar', 80.8, 83.0), ('kogut', 83.0, 85.4), ('znika', 85.4, 87.8), ('slady', 87.8, 90.4), ('cmentarz_rano', 90.4, 93.0), ('przelicza', 93.0, 95.6), ('twist', 95.6, 98.2), ('epilog', 98.2, 101.6), ('end', 101.6, 106.2)]
SEG = [
    ['karta', 0.15, '[ominous, low voice, slowly] To jest strzyga.'],
    ['dwie_dusze', 0.15, '[ominous, low voice, slowly] Rodzi się z dwiema duszami. I dwoma sercami.'],
    ['zeby', 0.15, '[ominous, low voice, slowly] Ma dwa rzędy zębów.'],
    ['sowa', 0.15, '[ominous, low voice, slowly] Oczy świecą jej jak u sowy.'],
    ['grob', 0.15, '[ominous, low voice, slowly] Kiedy umiera, jedna dusza odchodzi. Druga zostaje.'],
    ['noc', 0.15, '[ominous, low voice, slowly] I nocą wraca do żywych.'],
    ['mak', 0.15, '[ominous, low voice, slowly] Dlatego do trumny kładziono mak. A pod brodę sierp.'],
    ['ja', 0.15, '[low voice] Myślałem, że to bajki. Do tamtej zimy u babci.'],
    ['wies', 0.15, '[low voice] Mała wieś pod lasem.'],
    ['chata', 0.15, '[low voice] Babcia grzała piec do północy.'],
    ['dzwon', 0.15, '[ominous, low voice] Tego dnia dzwonił dzwon. Umarła stara Jadwiga.'],
    ['pogrzeb', 0.15, '[ominous, low voice] Mężczyźni kładli jej sierp pod brodę.'],
    ['babcia1', 0.15, '[whispering, worried] Jadwiga miała dwa rzędy zębów, Kubuś.', 'babcia'],
    ['kuba1', 0.15, '[laughing a little] Babciu, to tylko bajki.', 'kuba'],
    ['babcia2', 0.15, '[serious, quiet] Po zmroku nie otwieraj okna. Choćby nie wiem kto wołał.', 'babcia'],
    ['zamiec', 0.15, '[ominous, low voice] Wieczorem przyszła zamieć.'],
    ['lozko', 0.15, '[ominous, low voice] Babcia zasnęła pierwsza. Ja nie mogłem.'],
    ['puk', 0.15, '[whispering, ominous] Puk. Puk. W okno.'],
    ['sowa2', 0.15, '[whispering, ominous] Na podwórku zahukała sowa.'],
    ['glos', 0.15, '[sweet, weak, old woman, creepy] Kubuś… otwórz… zimno mi…', 'strzyga'],
    ['kuba2', 0.15, '[ominous, low voice] Głos babci. Ale babcia śpi obok mnie.'],
    ['twarz', 0.15, '[whispering, ominous] W oknie… twarz.'],
    ['zeby2', 0.15, '[ominous, low voice] Dwa rzędy zębów. Drapały szybę.'],
    ['jadwiga', 0.15, '[whispering, ominous] To była Jadwiga.'],
    ['zasuwka', 0.15, '[urgent, low voice] Zasuwka zaczęła się przesuwać. Sama.'],
    ['budzi', 0.15, '[panicked, whispering] Babciu! Ona tu jest!', 'kuba'],
    ['woreczek', 0.15, '[tense, urgent, low voice] Babcia sięgnęła po lniany woreczek.'],
    ['sypie', 0.15, '[tense, urgent, low voice] Sypała mak na parapet. I na próg.'],
    ['babcia3', 0.15, '[whispering, serious] Strzyga musi policzyć każde ziarenko. Do świtu.', 'babcia'],
    ['liczy', 0.15, '[whispering, counting, creepy old woman] Jeden… dwa… trzy… cztery…', 'strzyga'],
    ['czeka', 0.15, '[ominous, low voice] Liczyła. Godzinami.'],
    ['zegar', 0.15, '[whispering, ominous] Za dwie szósta.'],
    ['kogut', 0.15, '[low voice] Zapiał kogut.'],
    ['znika', 0.15, '[low voice] I wszystko ucichło.'],
    ['slady', 0.15, '[ominous, low voice] Rano w śniegu były ślady bosych stóp.'],
    ['cmentarz_rano', 0.15, '[ominous, low voice] Prowadziły prosto na cmentarz. Sierp leżał na śniegu.'],
    ['przelicza', 0.15, '[ominous, low voice] Babcia przeliczyła mak. Brakowało jednego ziarenka.'],
    ['twist', 0.15, '[whispering, ominous] Bo strzyga… nie skończyła liczyć.'],
    ['epilog', 0.15, '[ominous, low voice] Tak wierzono na polskich wsiach jeszcze sto lat temu.'],
    ['end', 0.15, '[whispering, counting, creepy old woman] …dziewięćset dziewięćdziesiąt dziewięć…', 'strzyga'],
]
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 106.19], [-34, -34]),
    loops={'groza': ([0, .2, 20.8, 42.0, 46.8, 56.2, 75.4, 83.0, 93.0, 101.6, 106.19], [-60, -10, -24, -14, -8, -4, -8, -24, -10, -6, -40]),
           'tension': ([0, 20.8, 42.0, 56.2, 83.0, 95.6, 106.19], [-20, -30, -18, -6, -28, -8, -30]),
           'wind': ([0, 42.0, 83.0, 106.19], [-30, -14, -30, -24]),
           'roomtone': ([0, 106.19], [-38, -38])},
    heartbeat=([0, 46.8, 56.2, 83.0, 95.6, 106.19], [-90, -12, -6, -90, -8, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -22)], 'hit': [('boom', -3)], 'jolt': [('jolt', -2)], 'knock': [('knock', -1)], 'bell': [('ring', -12)], 'owl': [('wind', -10)],
           'scrape': [('scrape', -6)], 'lock': [('keyturn', -4)], 'seeds': [('paper', -10)], 'rooster': [('notif', -8)]}
EXTRA = [(56.400000000000006, 'hit_low', 0), (56.400000000000006, 'sting', -3), (95.6, 'sting', -3), (101.6, 'hit_low', -2), (0.1, 'hit_low', -4), (7.2, 'sting', -6), (60.8, 'sting', -6)] + [(t, 'hit_low', -9) for t in (20.8, 42.0, 65.4, 87.8)]
