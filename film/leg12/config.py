"""POLSKIE LEGENDY GROZY · KOSTUCHA — własna historia na podstawie ludowych wierzeń o śmierci (wzór: BEBOK). Wersja z lektorem."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'  # Victor
MODEL = 'eleven_v3'
SETTINGS = {'stability': 0.4, 'similarity_boost': 0.85}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {'kuba': ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3), 'babcia': ('6qkrzTbAj75WW5U8X5mB', 'eleven_v3', V3), 'kostucha': ('6qkrzTbAj75WW5U8X5mB', 'eleven_v3', V3)}
VFILTER = {'lektor': 'highpass=f=70,acompressor=threshold=-20dB:ratio=2.5,aecho=0.5:0.3:35:0.08', 'kostucha': 'asetrate=48000*0.86,aresample=48000,atempo=1.1,lowpass=f=2600,aecho=0.7:0.6:70|160:0.45|0.3'}
TEMPO = {'lektor': 1.1}
MAXK = 1.6
PREVIEW_NO_VOICE = False
TARGET = 118
SQUEEZE = 0.75
SCENES = [('karta', 0, 4.4), ('kosa', 4.4, 7.6), ('pies', 7.6, 11.0), ('znaki', 11.0, 14.4), ('mowiono', 14.4, 17.8), ('babcia1', 17.8, 21.8), ('ja', 21.8, 25.2), ('trzecia', 25.2, 28.0), ('wycie', 28.0, 31.2), ('spi', 31.2, 33.8), ('kroki', 33.8, 37.0), ('wizjer', 37.0, 40.0), ('postac', 40.0, 43.4), ('puk1', 43.4, 46.8), ('cichnie', 46.8, 49.4), ('krok', 49.4, 52.4), ('pies_zrywa', 52.4, 55.0), ('odsuwa', 55.0, 57.6), ('twarz_okno', 57.6, 59.8), ('puk2', 59.8, 63.0), ('ciemno', 63.0, 66.0), ('swiece', 66.0, 68.6), ('glos', 68.6, 72.2), ('obok', 72.2, 75.2), ('babcia_budzi', 75.2, 78.2), ('klamka', 78.2, 81.6), ('ostrze', 81.6, 84.8), ('kogut', 84.8, 87.6), ('rano', 87.6, 91.0), ('zenek', 91.0, 94.4), ('rysy', 94.4, 98.0), ('babcia2', 98.0, 101.6), ('noc2', 101.6, 104.6), ('okno', 104.6, 108.4), ('szyba', 108.4, 110.2), ('szept', 110.2, 113.2), ('epilog', 113.2, 118.0), ('end', 118.0, 123.0)]
SEG = [
    ['karta', 0.15, '[storytelling, tense, slow] To jest Kostucha.'],
    ['kosa', 0.15, '[storytelling, tense] Biała płachta. Koścista twarz. W ręku kosa.'],
    ['pies', 0.15, '[storytelling, tense] Psy czują ją pierwsze. I zaczynają wyć.'],
    ['znaki', 0.15, '[storytelling, tense] Zegar nagle staje. Na parapecie siada puszczyk.'],
    ['mowiono', 0.15, '[storytelling] Na wsi babcie straszyły dzieci: kiedy pies wyje w nocy, Kostucha chodzi po domach.'],
    ['babcia1', 0.15, '[old woman, serious, warning] Kubuś, jak pies wyje po nocy, nikomu nie otwieraj. Choćby wołał moim głosem.', 'babcia'],
    ['ja', 0.15, '[storytelling] Zostałem na noc u babci. W starym domu na samym końcu wsi.'],
    ['trzecia', 0.15, '[whispering] Obudziłem się równo o trzeciej.'],
    ['wycie', 0.15, '[storytelling, tense] Na podwórku wył Burek. Długo. Przeraźliwie.'],
    ['spi', 0.15, '[whispering] Babcia spała.'],
    ['kroki', 0.15, '[storytelling, tense] Drogą ktoś szedł. Szur. Stuk. Jakby ciągnął coś po ziemi.'],
    ['wizjer', 0.15, '[whispering] Wyjrzałem przez okno.'],
    ['postac', 0.15, '[storytelling, tense, slow] Na środku drogi stała wysoka postać w białej płachcie.'],
    ['puk1', 0.15, '[whispering] Zapukała do drzwi pana Zenka. Puk. Puk. Puk.'],
    ['cichnie', 0.15, '[storytelling, tense] Pies przestał wyć.'],
    ['krok', 0.15, '[whispering] Postać odwróciła się. I ruszyła w stronę naszych drzwi.'],
    ['odsuwa', 0.15, '[storytelling, tense] Odskoczyłem od okna. Serce waliło mi jak młot.'],
    ['puk2', 0.15, '[whispering] Puk. Puk. Puk.'],
    ['glos', 0.15, '[old woman, sweet, slow, eerie] Kubuś… otwórz… to babcia.', 'kostucha'],
    ['obok', 0.15, '[storytelling, tense, slow] Ale babcia spała w pokoju obok.'],
    ['klamka', 0.15, '[storytelling, urgent] Klamka zaczęła się opuszczać. Złapałem ją obiema rękami.'],
    ['ciemno', 0.15, '[whispering] Lampa na ganku zgasła. Cisza.'],
    ['rano', 0.15, '[storytelling] Rano pod domem pana Zenka stała karetka.'],
    ['zenek', 0.15, '[storytelling, tense] Pan Zenek zmarł w nocy. We śnie.'],
    ['rysy', 0.15, '[storytelling, tense, slow] A na naszych drzwiach… były trzy długie rysy. Jak od ostrza.'],
    ['babcia2', 0.15, '[old woman, scared, whispering] Ona tu wróci, Kubuś. Bo nikt jej nie otworzył.', 'babcia'],
    ['noc2', 0.15, '[storytelling, tense] Następnej nocy pies znów zaczął wyć.'],
    ['okno', 0.15, '[whispering] A w sadzie, za oknem babci… ktoś stał.'],
    ['szept', 0.15, '[whispering, eerie, slow] Ktoś… zawsze otwiera.', 'kostucha'],
    ['epilog', 0.15, '[storytelling] Na polskiej wsi wierzono, że wycie psa w nocy zapowiada, że Kostucha przyszła po kogoś.'],
    ['end', 0.15, '[whispering] Puk. Puk. Puk.'],
    ['pies_zrywa', 0.15, '[storytelling, urgent] Burek zerwał się z łańcucha. I z piskiem uciekł w pole.'],
    ['twarz_okno', 0.15, '[whispering] Za szybą mignęła biała twarz.'],
    ['babcia_budzi', 0.15, '[storytelling, urgent] Pobiegłem do babci. Potrząsałem nią. Nie budziła się.'],
    ['swiece', 0.15, '[whispering] Świeczki pod obrazkiem gasły. Jedna po drugiej.'],
    ['ostrze', 0.15, '[storytelling, tense, slow] Przez szparę między deskami przeszło ostrze. I powoli zjechało w dół.'],
    ['kogut', 0.15, '[storytelling, tense] Wtedy na podwórku zapiał kogut. Ostrze zniknęło.'],
]
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 122.99], [-34, -34]),
    loops={'groza': ([0, .2, 21.8, 25.2, 40.0, 59.8, 81.6, 87.6, 101.6, 104.6, 113.2, 122.99], [-60, -10, -26, -14, -8, -5, -3, -24, -12, -4, -16, -40]),
           'tension': ([0, 21.8, 25.2, 59.8, 81.6, 87.6, 101.6, 104.6, 113.2, 122.99], [-18, -30, -16, -7, -5, -24, -12, -6, -24, -40]),
           'wind': ([0, 122.99], [-26, -26]),
           'drone': ([0, 25.2, 59.8, 87.6, 104.6, 113.2, 118.0], [-40, -18, -8, -30, -8, -26, -30]),
           'roomtone': ([0, 122.99], [-36, -36])},
    heartbeat=([0, 33.8, 55.0, 84.8, 101.6, 113.2, 122.99], [-90, -14, -6, -90, -8, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -16)], 'hit': [('boom', -3)], 'jolt': [('jolt', -2)], 'scrape': [('scrape', -5)], 'creak': [('creak', -4)], 'knock': [('knock', -2)], 'handle': [('handle', -3)],
           'slam': [('slam', -2)], 'switch': [('poweroff', -3)], 'siren': [('siren', -14)], 'chain': [('chain', -3)], 'steps': [('run', -6)]}
EXTRA = [(0.1, 'hit_low', -4), (6.0, 'hit_low', -2), (25.2, 'hit_low', -2), (40.4, 'sting', -6), (40.4, 'riser', -8), (52.7, 'hit_low', -2), (57.9, 'hit_low', 0), (57.9, 'sting', -2), (57.8, 'riser', -6), (60.2, 'hit_low', -2), (68.6, 'sting', -5), (72.4, 'hit_low', 0), (72.4, 'sting', -3), (79.0, 'riser', -5), (82.0, 'kamien', -8), (82.0, 'hit_low', -1), (85.1, 'kogut', -6), (95.4, 'hit_low', 0), (95.4, 'sting', -3), (101.6, 'riser', -5), (106.2, 'hit_low', 0), (106.2, 'sting', -1), (108.55, 'hit_low', 0), (108.55, 'sting', 0), (112.8, 'hit_low', 0), (112.8, 'sting', 0), (118.0, 'hit_low', -2), (21.8, 'hit_low', -9), (28.0, 'hit_low', -9), (37.0, 'hit_low', -9), (46.8, 'hit_low', -9), (87.6, 'hit_low', -9), (98.0, 'hit_low', -9), (66.0, 'hit_low', -9), (78.2, 'hit_low', -9)]
