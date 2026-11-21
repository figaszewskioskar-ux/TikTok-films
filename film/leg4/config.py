"""POLSKIE LEGENDY GROZY · ZMORA — własna historia na podstawie ludowych wierzeń. Wersja z lektorem."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'  # Victor bez filtrów — naturalny opowiadacz
MODEL = 'eleven_v3'
SETTINGS = {'stability': 0.4, 'similarity_boost': 0.85}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {'pani': ('Xb7hH8MSUJpSbSDYk0k2', 'eleven_v3', V3), 'sasiadka': ('6qkrzTbAj75WW5U8X5mB', 'eleven_v3', V3), 'zmora': ('6qkrzTbAj75WW5U8X5mB', 'eleven_v3', V3)}
VFILTER = {'lektor': 'highpass=f=70,acompressor=threshold=-20dB:ratio=2.5,aecho=0.5:0.3:35:0.08', 'pani': 'highpass=f=90', 'sasiadka': 'highpass=f=90',
           'zmora': 'asetrate=48000*0.82,aresample=48000,atempo=1.15,highpass=f=180,aecho=0.7:0.6:50|120:0.4|0.25'}
MAXK = 1.6
PREVIEW_NO_VOICE = False
TARGET = None
SQUEEZE = 0.75
SCENES = [('karta', 0, 4.4), ('nocą', 4.4, 7.4), ('dziurka', 7.4, 10.8), ('piers', 10.8, 14.0), ('ruch', 14.0, 17.0), ('dzis', 17.0, 20.4), ('kamienica', 20.4, 23.8), ('klatka', 23.8, 26.8), ('gospodyni', 26.8, 30.0), ('zatykaj', 30.0, 33.4), ('pokoj', 33.4, 36.6), ('smiech', 36.6, 39.6), ('trzecia', 39.6, 42.4), ('cisza', 42.4, 45.6), ('mgla', 45.6, 48.8), ('ksztalt', 48.8, 52.0), ('idzie', 52.0, 55.2), ('siada', 55.2, 58.0), ('ciezar', 58.0, 61.0), ('oddech', 61.0, 64.4), ('ciii', 64.4, 67.2), ('babcia', 67.2, 70.4), ('palec', 70.4, 73.4), ('znika', 73.4, 76.4), ('rano', 76.4, 79.4), ('sasiadka', 79.4, 82.6), ('sol', 82.6, 85.6), ('legenda', 85.6, 89.2), ('zamknal', 89.2, 92.0), ('wosk', 92.0, 95.2), ('trzecia2', 95.2, 97.8), ('drapanie', 97.8, 101.0), ('oko', 101.0, 104.0), ('sol2', 104.0, 106.6), ('wyskok', 106.6, 108.8), ('epilog', 108.8, 113.2), ('end', 113.2, 117.8)]
SEG = [
    ['karta', 0.15, '[storytelling, tense, slow] To jest zmora.'],
    ['nocą', 0.15, '[storytelling, tense, slow] Przychodzi nocą. Kiedy śpisz.'],
    ['dziurka', 0.15, '[storytelling, tense, slow] Wchodzi przez dziurkę od klucza. Jako mgła.'],
    ['piers', 0.15, '[storytelling, tense, slow] Siada ci na piersi. I pije twój oddech.'],
    ['ruch', 0.15, '[storytelling, tense] Budzisz się. Ale nie możesz się ruszyć.'],
    ['dzis', 0.15, '[storytelling] Dziś lekarze mówią na to: paraliż senny. Moja babcia mówiła: zmora.'],
    ['kamienica', 0.15, '[storytelling] Jesienią wynająłem pokój w starej kamienicy.'],
    ['klatka', 0.15, '[storytelling] Skrzypiące schody. Czwarte piętro.'],
    ['gospodyni', 0.15, '[storytelling] Gospodyni dała mi klucz do bramy. I powiedziała jedno.'],
    ['zatykaj', 0.15, '[serious, quiet, old woman] Na noc zatykaj dziurkę od klucza. Zawsze.', 'pani'],
    ['pokoj', 0.15, '[storytelling] Pokój był piękny. Tylko klucza do drzwi nie było.'],
    ['smiech', 0.15, '[storytelling] Zaśmiałem się. I poszedłem spać.'],
    ['trzecia', 0.15, '[whispering] Obudziłem się o trzeciej.'],
    ['cisza', 0.15, '[whispering] Nie mogłem się ruszyć. Ani krzyknąć.'],
    ['mgla', 0.15, '[whispering] Z dziurki od klucza sączyła się mgła.'],
    ['ksztalt', 0.15, '[storytelling, tense] Mgła urosła. W kształt.'],
    ['idzie', 0.15, '[whispering] Szła do łóżka. Powoli.'],
    ['siada', 0.15, '[whispering] I usiadła mi na piersi.'],
    ['ciezar', 0.15, '[storytelling, tense] Była ciężka. Jak mokry piach.'],
    ['oddech', 0.15, '[whispering] Pochyliła się. I zaczęła wdychać mój oddech.'],
    ['ciii', 0.15, '[whispering, creepy old woman] Ciii… śpij…', 'zmora'],
    ['babcia', 0.15, '[storytelling, tense] Przypomniałem sobie babcię. Rusz małym palcem. Tylko tyle.'],
    ['palec', 0.15, '[whispering, straining] Raz. Drugi. Trzeci.'],
    ['znika', 0.15, '[storytelling] I nagle mogłem oddychać. Zmora rozwiała się jak dym.'],
    ['rano', 0.15, '[storytelling, tense] Rano ktoś zapukał do drzwi.'],
    ['sasiadka', 0.15, '[storytelling, tense] Sąsiadka z dołu. Miła. Uśmiechnięta.'],
    ['sol', 0.15, '[sweet, old woman, too friendly] Pożyczy pan… szczyptę soli?', 'sasiadka'],
    ['legenda', 0.15, '[storytelling, tense] Babcia mówiła: zmora zawsze przychodzi rano. Pożyczyć soli.'],
    ['zamknal', 0.15, '[storytelling, tense] Zamknąłem jej drzwi przed nosem.'],
    ['wosk', 0.15, '[storytelling] Wieczorem zalepiłem dziurkę od klucza woskiem.'],
    ['trzecia2', 0.15, '[whispering] Trzecia w nocy.'],
    ['drapanie', 0.15, '[whispering] Coś zaczęło wypychać wosk. Od drugiej strony.'],
    ['oko', 0.15, '[whispering] Wosk spadł. A w dziurce… było oko.'],
    ['sol2', 0.15, '[whispering, creepy old woman] Soli…', 'zmora'],
    ['epilog', 0.15, '[storytelling] Tak wierzono w Polsce. A paraliż senny jest prawdziwy i niegroźny. Pomaga spokojny oddech i ruch małym palcem.'],
    ['end', 0.15, '[whispering, creepy old woman] Przyjdę… po sól…', 'zmora'],
]
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 117.8], [-34, -34]),
    loops={'groza': ([0, .2, 20.4, 39.6, 55.2, 76.4, 92.0, 108.8, 117.8], [-60, -10, -28, -12, -5, -26, -10, -34, -40]),
           'tension': ([0, 20.4, 39.6, 55.2, 76.4, 95.2, 106.6, 108.8, 117.8], [-18, -30, -16, -7, -26, -12, -6, -40, -40]),
           'drone': ([0, 39.6, 55.2, 76.4, 95.2, 106.6, 117.8], [-40, -18, -10, -40, -14, -8, -60]),
           'wind': ([0, 33.4, 39.6, 117.8], [-26, -40, -28, -30]),
           'roomtone': ([0, 117.8], [-38, -38])},
    heartbeat=([0, 42.4, 55.2, 73.4, 97.8, 106.6, 117.8], [-90, -12, -5, -90, -8, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -22)], 'hit': [('boom', -3)], 'jolt': [('jolt', -2)], 'creak': [('creak', -6)], 'tick': [('timer', -10)], 'knock': [('knock', -1)], 'slam': [('slam', -4)], 'scrape': [('scrape', -6)]}
EXTRA = [(0.1, 'hit_low', -4), (55.300000000000004, 'hit_low', 0), (55.300000000000004, 'sting', -3), (101.8, 'sting', -3), (102.6, 'riser', -4), (106.64999999999999, 'hit_low', 0), (106.64999999999999, 'sting', -2)] + [(t, 'hit_low', -9) for t in (20.4, 39.6, 76.4, 95.2)]
