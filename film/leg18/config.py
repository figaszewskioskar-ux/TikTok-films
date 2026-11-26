"""LEGENDY GROZY · ZIELONA NOC — własna historia na podstawie kolonijnej legendy (letnie domki nad jeziorem)."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'  # Victor
MODEL = 'eleven_v3'
SETTINGS = {'stability': 0.4, 'similarity_boost': 0.85}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {'kuba': ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3), 'bartek': ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3), 'marek': ('JxVKcxm9wtnCYEs8V00p', 'eleven_v3', V3), 'duch': ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3)}
VFILTER = {'lektor': 'highpass=f=70,acompressor=threshold=-20dB:ratio=2.5,aecho=0.5:0.3:35:0.08', 'bartek': 'asetrate=48000*0.93,aresample=48000,atempo=1.07',
           'duch': 'asetrate=48000*0.84,aresample=48000,atempo=1.12,highpass=f=150,aecho=0.7:0.6:70|160:0.5|0.35'}
TEMPO = {'lektor': 1.1}
MAXK = 1.6
PREVIEW_NO_VOICE = False
TARGET = 118
SQUEEZE = 0.75
SCENES = [('karta', 0, 4.4), ('tradycja', 4.4, 7.8), ('pasta', 7.8, 11.4), ('zasada', 11.4, 14.6), ('marek', 14.6, 19.0), ('kuba0', 19.0, 21.6), ('marek2', 21.6, 24.4), ('polnoc', 24.4, 27.8), ('czworka', 27.8, 31.2), ('smiech', 31.2, 33.8), ('swiatlo', 33.8, 37.2), ('deski', 37.2, 40.4), ('bartek2', 40.4, 43.0), ('srodek', 43.0, 46.6), ('lezy', 46.6, 50.0), ('reka', 50.0, 53.4), ('odwraca', 53.4, 56.4), ('kolej', 56.4, 59.2), ('uciekamy', 59.2, 62.4), ('zamek', 62.4, 65.6), ('rano', 65.6, 68.8), ('puste', 68.8, 72.6), ('kronika', 72.6, 76.0), ('zdjecie96', 76.0, 80.4), ('lustro', 80.4, 83.8), ('terazty', 83.8, 87.2), ('trwa', 87.2, 90.6), ('epilog', 90.6, 96.2), ('end', 96.2, 101.2)]
SEG = [
    ['karta', 0.15, '[storytelling, tense, slow] To jest zielona noc.'],
    ['tradycja', 0.15, '[storytelling] Ostatnia noc kolonii. Nikt nie śpi.'],
    ['pasta', 0.15, '[storytelling, playful] Śpiących smaruje się pastą do zębów. Taka tradycja.'],
    ['zasada', 0.15, '[storytelling, tense] Ale na naszych koloniach była jedna zasada.'],
    ['marek', 0.15, '[man, serious, warning] Smarujcie się do woli. Ale do trzynastki nie wchodzicie. Nigdy.', 'marek'],
    ['kuba0', 0.15, '[boy, curious] A co tam jest?', 'kuba'],
    ['marek2', 0.15, '[man, cold, quiet] Nic. Dlatego nie wchodzicie.', 'marek'],
    ['polnoc', 0.15, '[storytelling] O północy wyszliśmy z latarkami. Ja, Bartek i tubka pasty.'],
    ['czworka', 0.15, '[whispering] Najpierw dziewczyny z czwórki. Spały jak kamienie.'],
    ['smiech', 0.15, '[boy, whispering, laughing] Ale będą miały wąsy!', 'bartek'],
    ['swiatlo', 0.15, '[storytelling, tense] Wtedy Bartek zobaczył światło w trzynastce.'],
    ['deski', 0.15, '[storytelling, tense, slow] Domek był zabity deskami. Ale drzwi były uchylone.'],
    ['bartek2', 0.15, '[boy, whispering, excited] Ktoś tam śpi. Smarujemy.', 'bartek'],
    ['srodek', 0.15, '[whispering] W środku pachniało kurzem. Plakaty z dziewięćdziesiątego szóstego.'],
    ['lezy', 0.15, '[storytelling, tense, slow] Na łóżku ktoś leżał. Odwrócony do ściany.'],
    ['reka', 0.15, '[whispering] Bartek posmarował mu rękę. Była zimna jak lód.'],
    ['odwraca', 0.15, '[storytelling, tense, slow] Wtedy on powoli się odwrócił.'],
    ['kolej', 0.15, '[whispering, creepy, slow] Teraz… moja kolej.', 'duch'],
    ['uciekamy', 0.15, '[storytelling, urgent] Latarka zgasła. Uciekaliśmy do siódemki.'],
    ['zamek', 0.15, '[storytelling, tense] Zamknęliśmy drzwi na klucz. Bartek zasnął pierwszy.'],
    ['rano', 0.15, '[storytelling] Rano wszyscy mieli twarze w paście. Śmiali się.'],
    ['puste', 0.15, '[storytelling, tense, slow] Ale łóżko Bartka było puste. Na poduszce ktoś napisał pastą: trzynaście.'],
    ['kronika', 0.15, '[storytelling, tense] Pan Marek zaprowadził mnie do świetlicy. Do starej kroniki.'],
    ['zdjecie96', 0.15, '[storytelling, tense, slow] Na zdjęciu z dziewięćdziesiątego szóstego stał tamten chłopiec. A obok niego… Bartek.'],
    ['lustro', 0.15, '[storytelling, tense] Poszedłem umyć twarz. Spojrzałem w lustro.'],
    ['terazty', 0.15, '[whispering] Na moim czole ktoś napisał pastą: teraz ty.'],
    ['trwa', 0.15, '[whispering, creepy, slow] Zielona noc… jeszcze trwa.', 'duch'],
    ['epilog', 0.15, '[storytelling] Mówi się, że w każdą zieloną noc w domku trzynaście ktoś czeka. Aż ktoś go posmaruje.'],
    ['end', 0.15, '[whispering, creepy] Posmarujesz… mnie?', 'duch'],
]
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 101.19], [-34, -34]),
    loops={'groza': ([0, .2, 4.4, 21.6, 33.8, 46.6, 59.2, 65.6, 68.8, 83.8, 90.6, 101.19], [-60, -10, -30, -16, -10, -4, -10, -30, -8, -3, -16, -40]),
           'tension': ([0, 4.4, 14.6, 33.8, 53.4, 65.6, 68.8, 87.2, 90.6, 101.19], [-18, -34, -22, -10, -4, -30, -10, -4, -24, -40]),
           'drone': ([0, 14.6, 33.8, 46.6, 65.6, 68.8, 90.6, 96.2], [-40, -26, -14, -6, -34, -8, -26, -30]),
           'wind': ([0, 4.4, 7.8, 24.4, 27.8, 33.8, 43.0, 59.2, 62.4, 101.19], [-40, -26, -50, -26, -50, -24, -50, -22, -60, -60]),
           'roomtone': ([0, 101.19], [-34, -34])},
    heartbeat=([0, 33.8, 46.6, 62.4, 68.8, 90.6, 101.19], [-90, -16, -5, -90, -8, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'hit': [('boom', -3)], 'jolt': [('jolt', -2)], 'creak': [('creak', -6)], 'run': [('run', -6)], 'lock': [('doorlock', -6)]}
EXTRA = [(0.1, 'hit_low', -4), (21.9, 'hit_low', -3), (34.8, 'hit_low', -2), (38.6, 'hit_low', -3), (45.1, 'riser', -7), (47.8, 'hit_low', -1), (51.4, 'hit_low', -2), (54.4, 'hit_low', 0), (54.4, 'sting', -1), (70.6, 'hit_low', -1), (70.6, 'sting', -4), (75.0, 'riser', -6), (78.4, 'hit_low', 0), (78.4, 'sting', -2), (85.4, 'hit_low', -1), (86.2, 'riser', -5), (88.1, 'hit_low', 0), (88.1, 'sting', 0), (89.9, 'hit_low', 0), (96.2, 'hit_low', -2), (14.6, 'hit_low', -9), (24.4, 'hit_low', -9), (43.0, 'hit_low', -9), (62.4, 'hit_low', -9), (65.6, 'hit_low', -9), (72.6, 'hit_low', -9)]
