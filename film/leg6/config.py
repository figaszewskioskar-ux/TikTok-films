"""POLSKIE LEGENDY GROZY · POŁUDNICA — własna historia na podstawie ludowych wierzeń; ilustracje z generatora AI (Pollinations)."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'  # Victor bez filtrów — naturalny opowiadacz
MODEL = 'eleven_v3'
SETTINGS = {'stability': 0.4, 'similarity_boost': 0.85}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {'babcia': ('6qkrzTbAj75WW5U8X5mB', 'eleven_v3', V3), 'poludnica': ('Xb7hH8MSUJpSbSDYk0k2', 'eleven_v3', V3)}
VFILTER = {'lektor': 'highpass=f=70,acompressor=threshold=-20dB:ratio=2.5,aecho=0.5:0.3:35:0.08', 'babcia': 'highpass=f=90',
           'poludnica': 'asetrate=48000*0.86,aresample=48000,atempo=1.12,highpass=f=150,aecho=0.7:0.6:60|140:0.45|0.3'}
MAXK = 1.6
PREVIEW_NO_VOICE = True
TARGET = None
SQUEEZE = 0.75
SCENES = [('karta', 0, 4.4), ('upal', 4.4, 7.4), ('sierp', 7.4, 10.4), ('twarz', 10.4, 13.6), ('kark', 13.6, 16.8), ('cien', 16.8, 20.0), ('wies', 20.0, 23.2), ('babcia', 23.2, 26.0), ('babcia1', 26.0, 29.4), ('smiech', 29.4, 32.2), ('pilka', 32.2, 35.0), ('zegar', 35.0, 37.6), ('zboze', 37.6, 40.6), ('cisza', 40.6, 43.6), ('dzwon', 43.6, 46.4), ('idzie', 46.4, 49.6), ('stoi', 49.6, 52.8), ('pyta', 52.8, 56.2), ('zasada', 56.2, 59.8), ('gadam', 59.8, 63.0), ('blizej', 63.0, 66.0), ('chusta', 66.0, 68.8), ('sierp2', 68.8, 71.8), ('pierwsza', 71.8, 74.8), ('kolo', 74.8, 78.2), ('lustro', 78.2, 81.6), ('noc', 81.6, 84.8), ('stoi_noc', 84.8, 88.0), ('szyba', 88.0, 90.8), ('twist', 90.8, 94.0), ('epilog', 94.0, 98.6), ('end', 98.6, 103.2)]
SEG = [
    ['karta', 0.15, '[storytelling, tense, slow] To jest południca.'],
    ['upal', 0.15, '[storytelling, tense, slow] Przychodzi w samo południe. Gdy upał jest nie do zniesienia.'],
    ['sierp', 0.15, '[storytelling, tense, slow] Wysoka kobieta w bieli. Z sierpem w dłoni.'],
    ['twarz', 0.15, '[storytelling, tense, slow] Zadaje pytania. Jedna zła odpowiedź…'],
    ['kark', 0.15, '[storytelling, tense] …i skręca ci kark. Albo zabiera rozum.'],
    ['cien', 0.15, '[storytelling] Dlatego na wsiach nikt nie pracował w polu w południe.'],
    ['wies', 0.15, '[storytelling] W lipcu pojechałem do dziadków na wieś.'],
    ['babcia', 0.15, '[storytelling] Babcia powiedziała mi tylko jedno.'],
    ['babcia1', 0.15, '[serious, quiet, old woman] O dwunastej siedzisz w domu. Południca chodzi po polu.', 'babcia'],
    ['smiech', 0.15, '[storytelling] Zaśmiałem się. Kto się boi w biały dzień?'],
    ['pilka', 0.15, '[storytelling] Następnego dnia piłka wpadła w żyto.'],
    ['zegar', 0.15, '[storytelling, tense] Była za pięć dwunasta.'],
    ['zboze', 0.15, '[storytelling, tense] Wszedłem w zboże.'],
    ['cisza', 0.15, '[whispering] Nagle ucichło wszystko. Ptaki. Świerszcze. Wiatr.'],
    ['dzwon', 0.15, '[storytelling, tense] Dzwon w kościele wybił południe.'],
    ['idzie', 0.15, '[whispering] Kłosy zaszeleściły. Ktoś szedł w moją stronę.'],
    ['stoi', 0.15, '[whispering] Wysoka. W białej sukni. Twarz zakryta chustą.'],
    ['pyta', 0.15, '[whispering, creepy, slow, old woman] Ile ziaren jest w kłosie, chłopcze?', 'poludnica'],
    ['zasada', 0.15, '[storytelling, tense] Babcia mówiła: odpowiadaj jej. Mów cokolwiek. Aż wybije pierwsza.'],
    ['gadam', 0.15, '[storytelling, urgent] Więc mówiłem. O szkole. O piłce. O babci.'],
    ['blizej', 0.15, '[whispering] A ona pytała dalej. Coraz bliżej.'],
    ['chusta', 0.15, '[whispering] Chusta się zsunęła.'],
    ['sierp2', 0.15, '[storytelling, urgent] Podniosła sierp.'],
    ['pierwsza', 0.15, '[storytelling, urgent] I wtedy dzwon wybił pierwszą.'],
    ['kolo', 0.15, '[storytelling, tense] Zniknęła. Zostało tylko wypalone koło w życie.'],
    ['lustro', 0.15, '[storytelling, tense] Babcia nic nie powiedziała. Tylko zasłoniła lustro.'],
    ['noc', 0.15, '[whispering] W nocy obudził mnie szelest zboża.'],
    ['stoi_noc', 0.15, '[whispering] W polu stała kobieta w bieli. I patrzyła w moje okno.'],
    ['szyba', 0.15, '[whispering, creepy, old woman] Nie skończyliśmy rozmowy…', 'poludnica'],
    ['twist', 0.15, '[whispering] Przecież południca przychodzi tylko w dzień… prawda?'],
    ['epilog', 0.15, '[storytelling] Tak dawniej tłumaczono udar słoneczny. Dziś wiemy: w upał unikaj słońca w południe, noś czapkę i pij dużo wody.'],
    ['end', 0.15, '[whispering, creepy, old woman] Ile ziaren jest w kłosie…?', 'poludnica'],
]
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 103.2], [-34, -34]),
    loops={'groza': ([0, .2, 20.0, 37.6, 49.6, 66.0, 74.8, 81.6, 94.0, 103.2], [-60, -10, -30, -14, -8, -4, -26, -10, -34, -40]),
           'tension': ([0, 20.0, 40.6, 49.6, 66.0, 74.8, 81.6, 88.0, 94.0, 103.2], [-18, -32, -16, -10, -6, -28, -14, -6, -40, -40]),
           'drone': ([0, 40.6, 66.0, 74.8, 81.6, 88.0, 103.2], [-40, -16, -8, -40, -14, -8, -60]),
           'wind': ([0, 40.6, 74.8, 81.6, 103.2], [-26, -60, -30, -26, -30]),
           'roomtone': ([0, 103.2], [-38, -38])},
    heartbeat=([0, 46.4, 66.0, 74.8, 81.6, 88.0, 103.2], [-90, -12, -4, -90, -10, -6, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -18)], 'hit': [('boom', -3)], 'jolt': [('jolt', -2)], 'tick': [('timer', -8)], 'rustle': [('paper', -6), ('wind', -10)], 'bell': [('ring', -10), ('boom', -8)]}
EXTRA = [(0.1, 'hit_low', -4), (66.25, 'hit_low', 0), (66.25, 'sting', -3), (84.0, 'riser', -4), (88.1, 'hit_low', 0), (88.1, 'sting', -2)] + [(t, 'hit_low', -9) for t in (20.0, 37.6, 43.6, 74.8, 81.6)]
