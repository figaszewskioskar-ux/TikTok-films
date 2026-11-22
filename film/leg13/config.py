"""POLSKIE LEGENDY GROZY · KRWAWA MARY — własna historia na podstawie szkolnej legendy (wzór: BEBOK). Wersja z lektorem."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'  # Victor
MODEL = 'eleven_v3'
SETTINGS = {'stability': 0.4, 'similarity_boost': 0.85}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {'kuba': ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3), 'bartek': ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3), 'wozna': ('6qkrzTbAj75WW5U8X5mB', 'eleven_v3', V3), 'mary': ('d4Z5Fvjohw3zxGpV8XUV', 'eleven_v3', V3)}
VFILTER = {'lektor': 'highpass=f=70,acompressor=threshold=-20dB:ratio=2.5,aecho=0.5:0.3:35:0.08', 'bartek': 'asetrate=48000*0.93,aresample=48000,atempo=1.07', 'kuba': 'aecho=0.6:0.4:40:0.2',
           'mary': 'asetrate=48000*0.9,aresample=48000,atempo=1.08,highpass=f=200,aecho=0.7:0.6:60|140:0.5|0.35'}
TEMPO = {'lektor': 1.1}
MAXK = 1.6
PREVIEW_NO_VOICE = False
TARGET = 118
SQUEEZE = 0.75
SCENES = [('karta', 0, 4.4), ('lustro', 4.4, 7.6), ('trzyrazy', 7.6, 11.0), ('odbicie', 11.0, 14.0), ('mowiono', 14.0, 17.6), ('wozna1', 17.6, 21.6), ('ja', 21.6, 24.8), ('koledzy', 24.8, 28.2), ('kuba_nie', 28.2, 30.6), ('wepchneli', 30.6, 33.8), ('gasnie', 33.8, 36.4), ('wyjscie', 36.4, 39.4), ('raz', 39.4, 41.6), ('dwa', 41.6, 44.0), ('trzy', 44.0, 46.6), ('cisza', 46.6, 49.2), ('ramie', 49.2, 52.6), ('kran', 52.6, 55.4), ('nie_mruga', 55.4, 58.4), ('usmiech', 58.4, 61.4), ('reka', 61.4, 64.6), ('peka', 64.6, 67.0), ('mary', 67.0, 70.6), ('wychodzi', 70.6, 73.8), ('upada', 73.8, 76.0), ('drzwi', 76.0, 79.0), ('smiech', 79.0, 81.6), ('wozna2', 81.6, 84.6), ('swiatlo', 84.6, 88.0), ('dom', 88.0, 91.0), ('zeby', 91.0, 94.4), ('napis', 94.4, 98.0), ('odwraca', 98.0, 101.6), ('szept', 101.6, 104.6), ('epilog', 104.6, 109.2), ('end', 109.2, 114.2)]
SEG = [
    ['karta', 0.15, '[storytelling, tense, slow] To jest Krwawa Mary.'],
    ['lustro', 0.15, '[storytelling, tense] Mieszka po drugiej stronie lustra.'],
    ['trzyrazy', 0.15, '[whispering] Wystarczy zgasić światło i powiedzieć jej imię trzy razy.'],
    ['odbicie', 0.15, '[storytelling, tense] Wtedy twoje odbicie przestaje cię słuchać.'],
    ['mowiono', 0.15, '[storytelling] W każdej szkole ktoś o niej słyszał. Starsi straszyli nią pierwszaków.'],
    ['wozna1', 0.15, '[old woman, serious, warning] Do łazienki na drugim piętrze nie wchodźcie. Tamto lustro pamięta za dużo.', 'wozna'],
    ['ja', 0.15, '[storytelling] Myślałem, że to bajka dla pierwszaków. Do ostatniej przerwy przed feriami.'],
    ['koledzy', 0.15, '[boy, teasing, mocking] Zakład, że się boisz? Powiedz trzy razy, cykorze.', 'bartek'],
    ['kuba_nie', 0.15, '[boy, defiant] Nie boję się.', 'kuba'],
    ['wepchneli', 0.15, '[storytelling, urgent] Wepchnęli mnie do łazienki na drugim piętrze. I przytrzymali drzwi.'],
    ['gasnie', 0.15, '[storytelling, tense] Ktoś zgasił światło z korytarza.'],
    ['wyjscie', 0.15, '[whispering] Zostało tylko zielone światło nad drzwiami.'],
    ['raz', 0.15, '[whispering, scared] Krwawa Mary.', 'kuba'],
    ['dwa', 0.15, '[whispering, scared] Krwawa Mary.', 'kuba'],
    ['trzy', 0.15, '[whispering, terrified] Krwawa… Mary.', 'kuba'],
    ['cisza', 0.15, '[storytelling, tense] Nic. Cisza.'],
    ['kran', 0.15, '[whispering] Tylko z kranu zaczęła kapać woda. Czerwona.'],
    ['nie_mruga', 0.15, '[storytelling, tense, slow] Wtedy zobaczyłem, że moje odbicie… nie mruga.'],
    ['usmiech', 0.15, '[whispering] I uśmiecha się. Choć ja się nie uśmiechałem.'],
    ['reka', 0.15, '[storytelling, tense] Podniosło rękę. I przyłożyło ją do szkła. Od środka.'],
    ['peka', 0.15, '[storytelling, urgent] Lustro pękło.'],
    ['mary', 0.15, '[storytelling, tense, slow] Za moim odbiciem stała dziewczyna. Mokre czarne włosy. Krwawe łzy.'],
    ['drzwi', 0.15, '[storytelling, urgent] Rzuciłem się do drzwi. Waliłem pięściami.'],
    ['smiech', 0.15, '[storytelling, tense] Za drzwiami śmiechy nagle ucichły.'],
    ['wozna2', 0.15, '[old woman, shocked, angry] Coście wy zrobili?!', 'wozna'],
    ['swiatlo', 0.15, '[storytelling, tense] Światło wróciło. A lustro… było całe. Bez jednej rysy.'],
    ['dom', 0.15, '[storytelling] Wieczorem w domu długo nie mogłem się uspokoić.'],
    ['zeby', 0.15, '[storytelling, tense] Myłem zęby. Moje odbicie skończyło… sekundę po mnie.'],
    ['napis', 0.15, '[whispering] Na zaparowanym lustrze pojawił się napis. Dziękuję, Kuba.'],
    ['odwraca', 0.15, '[storytelling, tense, slow] Odwróciłem się do wyjścia. Ale w lustrze zostałem ja. I krzyczałem.'],
    ['szept', 0.15, '[whispering, girl, eerie] Dziękuję… że mnie wypuściłeś.', 'mary'],
    ['epilog', 0.15, '[storytelling] W Krwawą Mary bawiły się dzieci w szkołach na całym świecie. Także w Polsce.'],
    ['end', 0.15, '[whispering, girl, eerie] Krwawa… Mary.', 'mary'],
    ['ramie', 0.15, '[whispering] Coś zimnego dotknęło mojego ramienia. Odwróciłem się. Nikogo.'],
    ['wychodzi', 0.15, '[storytelling, urgent] Jej ręka przeszła przez lustro. Prosto do mnie.'],
    ['upada', 0.15, '[storytelling, urgent] Upadłem na mokrą podłogę.'],
]
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 114.19], [-34, -34]),
    loops={'groza': ([0, .2, 21.6, 30.6, 39.4, 55.4, 64.6, 84.6, 91.0, 98.0, 104.6, 114.19], [-60, -10, -26, -14, -8, -5, -3, -20, -12, -4, -16, -40]),
           'tension': ([0, 21.6, 30.6, 55.4, 64.6, 84.6, 91.0, 98.0, 104.6, 114.19], [-18, -30, -16, -7, -5, -22, -12, -6, -24, -40]),
           'kapanie': ([0, 30.6, 84.6, 114.19], [-90, -20, -90, -90]),
           'drone': ([0, 33.8, 64.6, 84.6, 98.0, 104.6, 109.2], [-40, -16, -8, -28, -8, -26, -30]),
           'roomtone': ([0, 114.19], [-36, -36])},
    heartbeat=([0, 33.8, 55.4, 84.6, 91.0, 104.6, 114.19], [-90, -12, -6, -90, -8, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -16)], 'hit': [('boom', -3)], 'jolt': [('jolt', -2)], 'slam': [('slam', -2)], 'door_lock': [('doorlock', -4)], 'bang': [('bang', -3)], 'unlock': [('unlock', -4)], 'switch': [('poweroff', -3)]}
EXTRA = [(0.1, 'hit_low', -4), (5.6, 'hit_low', -3), (31.5, 'hit_low', -4), (34.8, 'hit_low', 0), (39.6, 'hit_low', -6), (41.8, 'hit_low', -3), (44.2, 'hit_low', 0), (44.2, 'sting', -4), (50.6, 'hit_low', 0), (50.6, 'sting', -3), (53.8, 'sting', -6), (53.4, 'riser', -7), (59.2, 'hit_low', -2), (62.7, 'hit_low', -2), (62.0, 'riser', -5), (64.8, 'kamien', -2), (64.8, 'hit_low', 0), (64.8, 'sting', -1), (67.4, 'syk', -12), (71.4, 'hit_low', 0), (71.4, 'kamien', -4), (74.1, 'hit_low', -1), (86.0, 'sting', -5), (92.4, 'riser', -6), (96.8, 'hit_low', 0), (96.8, 'sting', -2), (100.4, 'hit_low', 0), (104.2, 'hit_low', 0), (104.2, 'sting', 0), (109.2, 'hit_low', -2), (21.6, 'hit_low', -9), (30.6, 'hit_low', -9), (46.6, 'hit_low', -9), (76.0, 'hit_low', -9), (88.0, 'hit_low', -9), (91.0, 'hit_low', -9)]
