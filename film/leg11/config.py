"""POLSKIE LEGENDY GROZY · BAZYLISZEK — własna historia na podstawie warszawskiej legendy (wzór: BEBOK). Wersja z lektorem."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'  # Victor
MODEL = 'eleven_v3'
SETTINGS = {'stability': 0.4, 'similarity_boost': 0.85}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {'kuba': ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3), 'mama': ('Xb7hH8MSUJpSbSDYk0k2', 'eleven_v3', V3), 'babcia': ('6qkrzTbAj75WW5U8X5mB', 'eleven_v3', V3)}
VFILTER = {'lektor': 'highpass=f=70,acompressor=threshold=-20dB:ratio=2.5,aecho=0.5:0.3:35:0.08'}
TEMPO = {'lektor': 1.1}
MAXK = 1.6
PREVIEW_NO_VOICE = False
TARGET = 118
SQUEEZE = 0.75
SCENES = [('karta', 0, 4.4), ('jajo', 4.4, 7.8), ('spojrzenie', 7.8, 11.2), ('krzywe', 11.2, 14.8), ('lustro', 14.8, 18.4), ('babcia', 18.4, 22.0), ('ja', 22.0, 25.2), ('mama1', 25.2, 28.6), ('kuba1', 28.6, 30.8), ('drzwi', 30.8, 33.6), ('schody', 33.6, 36.6), ('korytarz', 36.6, 39.6), ('siedem', 39.6, 42.4), ('gasnie', 42.4, 45.0), ('szur', 45.0, 48.0), ('latarka', 48.0, 50.8), ('figurki', 50.8, 54.2), ('kot', 54.2, 57.2), ('pianie', 57.2, 60.4), ('cien', 60.4, 63.4), ('niepatrz', 63.4, 66.6), ('lusterko', 66.6, 70.0), ('wystawia', 70.0, 73.0), ('syk', 73.0, 75.8), ('trzask', 75.8, 78.6), ('wraca', 78.6, 81.2), ('kamienny', 81.2, 84.6), ('ucieka', 84.6, 87.4), ('mama2', 87.4, 90.4), ('noc', 90.4, 93.4), ('rower', 93.4, 96.4), ('koszyk', 96.4, 99.8), ('oko', 99.8, 102.8), ('reka', 102.8, 106.4), ('epilog', 106.4, 111.0), ('end', 111.0, 116.0)]
SEG = [
    ['karta', 0.15, '[storytelling, tense, slow] To jest bazyliszek.'],
    ['jajo', 0.15, '[storytelling, tense] Wykluł się z jajka zniesionego przez koguta. Wysiedziała je ropucha.'],
    ['spojrzenie', 0.15, '[storytelling, tense] Kto spojrzy mu w oczy… zamienia się w kamień.'],
    ['krzywe', 0.15, '[storytelling] W Warszawie, przy ulicy Krzywe Koło, mieszkał w piwnicy starej kamienicy.'],
    ['lustro', 0.15, '[storytelling, tense] Pokonał go dopiero człowiek z lustrem. Bazyliszek zobaczył własne odbicie.'],
    ['babcia', 0.15, '[old woman, serious, warning] Do piwnicy sam nie chodź, Kubuś. Tam jeszcze coś siedzi.', 'babcia'],
    ['ja', 0.15, '[storytelling] Myślałem, że to bajka dla turystów. Do ferii u babci na Starówce.'],
    ['mama1', 0.15, '[mother, warm] Kuba, skocz po rower do piwnicy. Tylko szybko.', 'mama'],
    ['kuba1', 0.15, '[boy, slightly annoyed] Dobra, mamo.', 'kuba'],
    ['drzwi', 0.15, '[storytelling] Światło na schodach zapala się tylko na minutę.'],
    ['schody', 0.15, '[storytelling, tense] Stare schody w dół. Zapach wilgoci i kurzu.'],
    ['korytarz', 0.15, '[storytelling, tense] Długi korytarz. Drewniane komórki z kłódkami.'],
    ['siedem', 0.15, '[storytelling] Nasza była pod numerem siedem. Na samym końcu.'],
    ['gasnie', 0.15, '[whispering] Wtedy światło zgasło.'],
    ['szur', 0.15, '[whispering] W ciemności coś zaszurało. Jak łuski po kamieniu.'],
    ['latarka', 0.15, '[storytelling, tense] Włączyłem latarkę w telefonie.'],
    ['figurki', 0.15, '[storytelling, tense] Na podłodze stały kamienne figurki. Szczur. Gołąb. Kot.'],
    ['kot', 0.15, '[whispering] Kot miał otwarty pysk. Jakby krzyczał.'],
    ['pianie', 0.15, '[storytelling, tense, slow] Wtedy usłyszałem pianie koguta. Tu, pod ziemią.'],
    ['cien', 0.15, '[whispering] Na ścianie pojawił się cień. Kogucia głowa. Korona. I wężowe cielsko.'],
    ['niepatrz', 0.15, '[whispering, scared] Nie patrz mu w oczy. Tylko nie patrz.'],
    ['lusterko', 0.15, '[storytelling, urgent] Odkręciłem lusterko od roweru.'],
    ['wystawia', 0.15, '[storytelling, tense] Wystawiłem je przed siebie. Z zamkniętymi oczami.'],
    ['syk', 0.15, '[whispering] Usłyszałem syk.'],
    ['trzask', 0.15, '[storytelling, tense] A potem trzask. Jak pękający kamień.'],
    ['wraca', 0.15, '[storytelling] Światło wróciło.'],
    ['kamienny', 0.15, '[storytelling, tense, slow] Na środku piwnicy stał kamienny bazyliszek. Z otwartym dziobem.'],
    ['ucieka', 0.15, '[storytelling, urgent] Złapałem rower i pobiegłem na górę.'],
    ['mama2', 0.15, '[mother, worried] Co tak długo? Jesteś cały blady.', 'mama'],
    ['noc', 0.15, '[storytelling, tense] W nocy obudziło mnie ciche stukanie. Z przedpokoju.'],
    ['rower', 0.15, '[whispering] Tam, gdzie stał mój rower.'],
    ['koszyk', 0.15, '[storytelling, tense] W koszyku leżało jajko. Ciepłe. I pękało.'],
    ['oko', 0.15, '[whispering] Ze środka patrzyło na mnie żółte oko.'],
    ['reka', 0.15, '[whispering, terrified] Spojrzałem mu w oczy. Moje palce zrobiły się zimne. I szare.'],
    ['epilog', 0.15, '[storytelling] Legenda o bazyliszku z ulicy Krzywe Koło to jedna z najstarszych legend Warszawy.'],
    ['end', 0.15, '[whispering] Nie patrz mu w oczy.'],
]
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 115.99], [-34, -34]),
    loops={'groza': ([0, .2, 22.0, 33.6, 42.4, 57.2, 73.0, 78.6, 90.4, 96.4, 106.4, 115.99], [-60, -10, -26, -16, -10, -6, -3, -18, -14, -4, -16, -40]),
           'tension': ([0, 22.0, 33.6, 57.2, 78.6, 90.4, 96.4, 106.4, 115.99], [-18, -30, -18, -7, -20, -14, -6, -24, -40]),
           'kapanie': ([0, 33.6, 84.6, 115.99], [-90, -22, -90, -90]),
           'drone': ([0, 42.4, 57.2, 78.6, 96.4, 106.4, 111.0], [-40, -18, -8, -26, -8, -26, -30]),
           'roomtone': ([0, 115.99], [-36, -36])},
    heartbeat=([0, 42.4, 63.4, 78.6, 96.4, 106.4, 115.99], [-90, -12, -6, -90, -8, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -16)], 'hit': [('boom', -3)], 'jolt': [('jolt', -2)], 'scrape': [('scrape', -5)], 'creak': [('creak', -4)], 'steps': [('stairsup', -5)],
           'slam': [('slam', -2)], 'switch': [('poweroff', -3)]}
EXTRA = [(0.1, 'hit_low', -4), (5.2, 'jajko', -6), (9.2, 'kamien', -4), (9.2, 'hit_low', -2), (16.2, 'kamien', -6), (31.0, 'timer', -8), (43.4, 'hit_low', -1), (57.6, 'kogut', -1), (57.6, 'hit_low', -3), (60.7, 'syk', -8), (62.4, 'riser', -7), (73.2, 'syk', 0), (73.3, 'hit_low', 0), (76.3, 'kamien', 0), (76.3, 'sting', -3), (81.2, 'hit_low', -2), (97.0, 'jajko', -2), (93.4, 'riser', -6), (99.8, 'hit_low', 0), (99.8, 'sting', -1), (103.4, 'kamien', -3), (105.8, 'hit_low', 0), (111.2, 'syk', -4), (111.0, 'hit_low', -2), (22.0, 'hit_low', -9), (30.8, 'hit_low', -9), (36.6, 'hit_low', -9), (50.8, 'hit_low', -9), (66.6, 'hit_low', -9), (87.4, 'hit_low', -9), (90.4, 'hit_low', -9)]
