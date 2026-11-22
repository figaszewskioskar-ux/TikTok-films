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
SCENES = [('karta', 0, 4.4), ('kosa', 4.4, 7.6), ('pies', 7.6, 11.0), ('znaki', 11.0, 14.4), ('mowiono', 14.4, 17.8), ('babcia1', 17.8, 21.8), ('ja', 21.8, 25.2), ('trzecia', 25.2, 28.0), ('wycie', 28.0, 31.2), ('spi', 31.2, 33.8), ('kroki', 33.8, 37.0), ('wizjer', 37.0, 40.0), ('postac', 40.0, 43.4), ('puk1', 43.4, 46.8), ('cichnie', 46.8, 49.4), ('krok', 49.4, 52.4), ('odsuwa', 52.4, 55.0), ('puk2', 55.0, 58.2), ('glos', 58.2, 61.8), ('obok', 61.8, 64.8), ('klamka', 64.8, 68.2), ('ciemno', 68.2, 71.2), ('rano', 71.2, 74.6), ('zenek', 74.6, 78.0), ('rysy', 78.0, 81.6), ('babcia2', 81.6, 85.2), ('noc2', 85.2, 88.2), ('okno', 88.2, 92.0), ('szept', 92.0, 95.0), ('epilog', 95.0, 99.8), ('end', 99.8, 104.8)]
SEG = [
    ['karta', 0.15, '[storytelling, tense, slow] To jest Kostucha.'],
    ['kosa', 0.15, '[storytelling, tense] Biała płachta. Koścista twarz. W ręku kosa.'],
    ['pies', 0.15, '[storytelling, tense] Psy czują ją pierwsze. I zaczynają wyć.'],
    ['znaki', 0.15, '[storytelling, tense] Zegar nagle staje. Na parapecie siada puszczyk.'],
    ['mowiono', 0.15, '[storytelling] Na wsi babcie straszyły dzieci: kiedy pies wyje w nocy, Kostucha chodzi po domach.'],
    ['babcia1', 0.15, '[old woman, serious, warning] Kubuś, jak pies wyje po nocy, nikomu nie otwieraj. Choćby wołał moim głosem.', 'babcia'],
    ['ja', 0.15, '[storytelling] Zostałem na noc u babci. W starym bloku, na dziesiątym piętrze.'],
    ['trzecia', 0.15, '[whispering] Obudziłem się równo o trzeciej.'],
    ['wycie', 0.15, '[storytelling, tense] Za ścianą wył pies sąsiadów. Długo. Przeraźliwie.'],
    ['spi', 0.15, '[whispering] Babcia spała.'],
    ['kroki', 0.15, '[storytelling, tense] Na klatce ktoś szedł. Szur. Stuk. Jakby ciągnął coś po podłodze.'],
    ['wizjer', 0.15, '[whispering] Spojrzałem przez wizjer.'],
    ['postac', 0.15, '[storytelling, tense, slow] Na końcu korytarza stała wysoka postać w białej płachcie.'],
    ['puk1', 0.15, '[whispering] Zapukała do drzwi pana Zenka. Puk. Puk. Puk.'],
    ['cichnie', 0.15, '[storytelling, tense] Pies przestał wyć.'],
    ['krok', 0.15, '[whispering] Postać odwróciła się. I ruszyła w stronę naszych drzwi.'],
    ['odsuwa', 0.15, '[storytelling, tense] Odsunąłem się od wizjera. Serce waliło mi jak młot.'],
    ['puk2', 0.15, '[whispering] Puk. Puk. Puk.'],
    ['glos', 0.15, '[old woman, sweet, slow, eerie] Kubuś… otwórz… to babcia.', 'kostucha'],
    ['obok', 0.15, '[storytelling, tense, slow] Ale babcia spała w pokoju obok.'],
    ['klamka', 0.15, '[storytelling, urgent] Klamka zaczęła się opuszczać. Złapałem ją obiema rękami.'],
    ['ciemno', 0.15, '[whispering] Światło pod drzwiami zgasło. Cisza.'],
    ['rano', 0.15, '[storytelling] Rano pod klatką stała karetka.'],
    ['zenek', 0.15, '[storytelling, tense] Pan Zenek spod sto jeden zmarł w nocy. We śnie.'],
    ['rysy', 0.15, '[storytelling, tense, slow] A na naszych drzwiach… były trzy długie rysy. Jak od ostrza.'],
    ['babcia2', 0.15, '[old woman, scared, whispering] Ona tu wróci, Kubuś. Bo nikt jej nie otworzył.', 'babcia'],
    ['noc2', 0.15, '[storytelling, tense] Następnej nocy pies znów zaczął wyć.'],
    ['okno', 0.15, '[whispering] Za oknem babci, na dziesiątym piętrze… ktoś stał.'],
    ['szept', 0.15, '[whispering, eerie, slow] Ktoś… zawsze otwiera.', 'kostucha'],
    ['epilog', 0.15, '[storytelling] Na polskiej wsi wierzono, że wycie psa w nocy zapowiada, że Kostucha przyszła po kogoś.'],
    ['end', 0.15, '[whispering] Puk. Puk. Puk.'],
]
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 104.78999999999999], [-34, -34]),
    loops={'groza': ([0, .2, 21.8, 25.2, 40.0, 55.0, 71.2, 85.2, 88.2, 95.0, 104.78999999999999], [-60, -10, -26, -14, -8, -4, -24, -12, -4, -16, -40]),
           'tension': ([0, 21.8, 25.2, 55.0, 71.2, 85.2, 88.2, 95.0, 104.78999999999999], [-18, -30, -16, -6, -24, -12, -6, -24, -40]),
           'wind': ([0, 104.78999999999999], [-30, -30]),
           'drone': ([0, 25.2, 55.0, 71.2, 88.2, 95.0, 99.8], [-40, -18, -8, -30, -8, -26, -30]),
           'roomtone': ([0, 104.78999999999999], [-36, -36])},
    heartbeat=([0, 33.8, 52.4, 71.2, 85.2, 95.0, 104.78999999999999], [-90, -14, -6, -90, -8, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -16)], 'hit': [('boom', -3)], 'jolt': [('jolt', -2)], 'scrape': [('scrape', -5)], 'creak': [('creak', -4)], 'knock': [('knock', -2)], 'handle': [('handle', -3)],
           'slam': [('slam', -2)], 'switch': [('poweroff', -3)], 'siren': [('siren', -14)]}
EXTRA = [(0.1, 'hit_low', -4), (6.0, 'hit_low', -2), (25.2, 'hit_low', -2), (40.4, 'sting', -6), (40.4, 'riser', -8), (52.4, 'riser', -6), (55.4, 'hit_low', -2), (58.2, 'sting', -5), (62.0, 'hit_low', 0), (62.0, 'sting', -3), (79.0, 'hit_low', 0), (79.0, 'sting', -3), (85.2, 'riser', -5), (89.8, 'hit_low', 0), (89.8, 'sting', -1), (94.6, 'hit_low', 0), (94.6, 'sting', 0), (99.8, 'hit_low', -2), (21.8, 'hit_low', -9), (28.0, 'hit_low', -9), (37.0, 'hit_low', -9), (46.8, 'hit_low', -9), (71.2, 'hit_low', -9), (81.6, 'hit_low', -9)]
