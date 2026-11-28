"""LEGENDY GROZY · DUCH Z LUNAPARKU — własna historia: paczka detektywów z psem, zamknięty lunapark (klimat bajek z dzieciństwa, postacie wymyślone od nowa)."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'  # Victor
MODEL = 'eleven_v3'
SETTINGS = {'stability': 0.4, 'similarity_boost': 0.85}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {'bartek': ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3), 'zosia': ('d4Z5Fvjohw3zxGpV8XUV', 'eleven_v3', V3), 'waldek': ('JxVKcxm9wtnCYEs8V00p', 'eleven_v3', V3), 'duch': ('bX8ZXtFbQtanSpI1KPZ1', 'eleven_v3', V3)}
VFILTER = {'lektor': 'highpass=f=70,acompressor=threshold=-20dB:ratio=2.5,aecho=0.5:0.3:35:0.08', 'bartek': 'asetrate=48000*0.93,aresample=48000,atempo=1.07', 'zosia': 'asetrate=48000*1.08,aresample=48000,atempo=0.94',
           'duch': 'asetrate=48000*0.84,aresample=48000,atempo=1.15,aecho=0.7:0.6:80|180:0.45|0.3'}
TEMPO = {'lektor': 1.1}
MAXK = 1.6
PREVIEW_NO_VOICE = True
TARGET = 118
SQUEEZE = 0.75
SCENES = [('karta', 0, 4.4), ('plotka', 4.4, 8.2), ('maska', 8.2, 11.4), ('paczka', 11.4, 15.2), ('zosia', 15.2, 18.2), ('kapselpod', 18.2, 21.0), ('plot', 21.0, 24.4), ('brama', 24.4, 27.6), ('karuzela', 27.6, 31.2), ('duch', 31.2, 34.4), ('bartek', 34.4, 36.8), ('lustra', 36.8, 40.4), ('plan', 40.4, 43.6), ('pulapka', 43.6, 47.0), ('zdejmij', 47.0, 50.0), ('waldek', 50.0, 53.2), ('waldek2', 53.2, 57.2), ('policja', 57.2, 60.6), ('radiowoz', 60.6, 64.0), ('waldek3', 64.0, 67.6), ('warczy', 67.6, 70.6), ('rusza', 70.6, 73.8), ('bezmaski', 73.8, 77.6), ('szept', 77.6, 80.6), ('epilog', 80.6, 85.8), ('end', 85.8, 90.8)]
SEG = [
    ['karta', 0.15, '[storytelling, tense, slow] To jest Duch z Lunaparku.'],
    ['plotka', 0.15, '[storytelling, tense] Za naszym miastem stał zamknięty lunapark. Mówiło się, że nocą sama kręci się tam karuzela.'],
    ['maska', 0.15, '[whispering] I że po alejkach chodzi ktoś w białej masce.'],
    ['paczka', 0.15, '[storytelling, playful] Ja, Bartek, Zosia i mój pies Kapsel. Detektywi z osiedla.'],
    ['zosia', 0.15, '[girl, excited, confident] Dziś w nocy to sprawdzimy.', 'zosia'],
    ['kapselpod', 0.15, '[storytelling, playful] Kapsel jako jedyny miał rozum. Schował się pod ławkę.'],
    ['plot', 0.15, '[storytelling, tense] O północy przeszliśmy przez dziurę w płocie.'],
    ['brama', 0.15, '[whispering] Napis nad bramą mrugał. Choć prądu nie było tu od lat.'],
    ['karuzela', 0.15, '[storytelling, tense, slow] Wtedy karuzela ruszyła. Sama. Z muzyczką.'],
    ['duch', 0.15, '[whispering] A między konikami stał on. W białej masce.'],
    ['bartek', 0.15, '[boy, scared, shouting] Uciekamy!', 'bartek'],
    ['lustra', 0.15, '[storytelling, urgent] Wpadliśmy do gabinetu luster. A w lustrach było go coraz więcej.'],
    ['plan', 0.15, '[girl, whispering, determined] Siatka z kortu. Zwabimy go tutaj.', 'zosia'],
    ['pulapka', 0.15, '[storytelling, urgent] Kapsel zaszczekał. Duch ruszył za nim. Prosto w siatkę.'],
    ['zdejmij', 0.15, '[storytelling, tense] Zdjęliśmy mu maskę.'],
    ['waldek', 0.15, '[storytelling, surprised] To był pan Waldek. Stróż lunaparku.'],
    ['waldek2', 0.15, '[old man, angry, grumpy] Straszyłem, żeby nikt nie kupił terenu. To mój lunapark!', 'waldek'],
    ['policja', 0.15, '[storytelling, playful] Przyjechała policja. Sprawa rozwiązana. Śmialiśmy się.'],
    ['radiowoz', 0.15, '[storytelling, tense, slow] Ale pan Waldek w radiowozie był biały jak ściana.'],
    ['waldek3', 0.15, '[old man, scared, whispering] Ja tylko udawałem jego. On tu był pierwszy.', 'waldek'],
    ['warczy', 0.15, '[storytelling, tense] Kapsel zaczął warczeć na karuzelę.'],
    ['rusza', 0.15, '[whispering] I karuzela znów ruszyła. Sama.'],
    ['bezmaski', 0.15, '[storytelling, tense, slow] Na koniku siedział duch. Bez maski. I machał do nas.'],
    ['szept', 0.15, '[whispering, creepy, slow] Zostańcie… na jeszcze jedną rundkę.', 'duch'],
    ['epilog', 0.15, '[storytelling] Rok później lunapark rozebrano. Wszystko wywieziono. Oprócz karuzeli. Tej nikt nigdy nie znalazł.'],
    ['end', 0.15, '[whispering, creepy] Kręcimy się… dalej?', 'duch'],
]
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 90.78999999999999], [-34, -34]),
    loops={'groza': ([0, .2, 11.4, 21.0, 27.6, 36.8, 47.0, 60.6, 73.8, 80.6, 90.78999999999999], [-60, -10, -30, -16, -8, -5, -26, -14, -3, -16, -40]),
           'tension': ([0, 11.4, 21.0, 31.2, 47.0, 60.6, 73.8, 80.6, 90.78999999999999], [-18, -34, -18, -5, -30, -12, -4, -24, -40]),
           'drone': ([0, 21.0, 31.2, 47.0, 60.6, 73.8, 80.6, 85.8], [-40, -20, -6, -32, -12, -5, -26, -30]),
           'wind': ([0, 21.0, 47.0, 67.6, 80.6, 90.78999999999999], [-30, -22, -26, -20, -60, -60]),
           'roomtone': ([0, 90.78999999999999], [-36, -36])},
    heartbeat=([0, 27.6, 36.8, 57.2, 70.6, 80.6, 90.78999999999999], [-90, -12, -6, -90, -6, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'hit': [('boom', -3)], 'jolt': [('jolt', -2)], 'fence': [('chain', -8)], 'music': [('tape', -10)], 'run': [('run', -6)], 'bark': [('bang', -14)], 'siren': [('siren', -10)], 'growl': [('breath', -6)]}
EXTRA = [(0.1, 'hit_low', -4), (25.4, 'hit_low', -3), (28.4, 'hit_low', -2), (31.6, 'hit_low', 0), (31.6, 'sting', -3), (36.8, 'hit_low', -3), (45.2, 'hit_low', -1), (47.8, 'hit_low', -4), (59.6, 'riser', -8), (64.3, 'hit_low', -2), (69.1, 'riser', -6), (75.4, 'hit_low', 0), (75.4, 'sting', -1), (80.0, 'hit_low', 0), (80.0, 'sting', 0), (85.8, 'hit_low', -2), (11.4, 'hit_low', -9), (21.0, 'hit_low', -9), (40.4, 'hit_low', -9), (57.2, 'hit_low', -9), (67.6, 'hit_low', -9)]
