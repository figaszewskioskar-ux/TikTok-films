"""POLSKIE LEGENDY GROZY · WILKOŁAK — własna historia na podstawie ludowych wierzeń. Wersja z lektorem."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'  # Victor bez filtrów — naturalny opowiadacz
MODEL = 'eleven_v3'
SETTINGS = {'stability': 0.4, 'similarity_boost': 0.85}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {'tata': ('JWUOwsYG4XgR9Od3eeon', 'eleven_v3', V3), 'wilk': ('JWUOwsYG4XgR9Od3eeon', 'eleven_v3', V3)}
VFILTER = {'lektor': 'highpass=f=70,acompressor=threshold=-20dB:ratio=2.5,aecho=0.5:0.3:35:0.08', 'tata': 'highpass=f=80',
           'wilk': 'asetrate=48000*0.8,aresample=48000,atempo=1.2,highpass=f=90,aecho=0.7:0.6:45|100:0.4|0.25'}
MAXK = 1.6
PREVIEW_NO_VOICE = False
TARGET = None
SQUEEZE = 0.75
SCENES = [('karta', 0, 4.4), ('klatwa', 4.4, 7.4), ('oczy', 7.4, 10.6), ('pelnia', 10.6, 13.6), ('ja', 13.6, 16.8), ('tata', 16.8, 19.8), ('silnik', 19.8, 22.6), ('zasieg', 22.6, 25.2), ('tata1', 25.2, 28.6), ('idzie', 28.6, 31.8), ('czekam', 31.8, 34.8), ('wycie', 34.8, 37.6), ('oczy_las', 37.6, 40.6), ('krazy', 40.6, 43.6), ('lusterko', 43.6, 46.4), ('drapanie', 46.4, 49.2), ('pysk', 49.2, 52.2), ('ludzkie', 52.2, 55.0), ('klakson', 55.0, 58.0), ('zniknal', 58.0, 60.4), ('szyba', 60.4, 63.0), ('biegne', 63.0, 65.6), ('snieg', 65.6, 68.2), ('goni', 68.2, 71.2), ('kapliczka', 71.2, 74.4), ('babcia', 74.4, 77.8), ('wpadam', 77.8, 80.2), ('prog', 80.2, 83.2), ('nie_wszedl', 83.2, 86.0), ('glos', 86.0, 89.2), ('to_tata', 89.2, 92.0), ('swit', 92.0, 95.0), ('policja', 95.0, 98.4), ('nie_pamietam', 98.4, 101.4), ('rece', 101.4, 104.4), ('dom', 104.4, 107.2), ('lusterko2', 107.2, 110.4), ('zolte', 110.4, 113.4), ('dobranoc', 113.4, 116.2), ('wyskok', 116.2, 118.4), ('epilog', 118.4, 122.8), ('end', 122.8, 127.4)]
SEG = [
    ['karta', 0.15, '[storytelling, tense, slow] To jest wilkołak.'],
    ['klatwa', 0.15, '[storytelling, tense, slow] Człowiek, na którego rzucono klątwę.'],
    ['oczy', 0.15, '[storytelling, tense, slow] Poznasz go po jednym. Ma ludzkie oczy.'],
    ['pelnia', 0.15, '[storytelling, tense] W pełnię wychodzi na leśne drogi.'],
    ['ja', 0.15, '[storytelling] Myślałem, że to bajka. Do zimy w Bieszczadach.'],
    ['tata', 0.15, '[storytelling] Wracaliśmy z tatą nocą przez las.'],
    ['silnik', 0.15, '[storytelling, tense] I nagle silnik zgasł.'],
    ['zasieg', 0.15, '[storytelling, tense] Telefon. Zero zasięgu.'],
    ['tata1', 0.15, '[calm but serious, father] Zostań w aucie. Zamknij drzwi. Idę po pomoc.', 'tata'],
    ['idzie', 0.15, '[storytelling, tense] I poszedł w ciemność.'],
    ['czekam', 0.15, '[storytelling, tense] Czekałem. Dziesięć minut. Dwadzieścia.'],
    ['wycie', 0.15, '[whispering] Wtedy usłyszałem wycie.'],
    ['oczy_las', 0.15, '[whispering] Między drzewami zapaliły się oczy.'],
    ['krazy', 0.15, '[storytelling, tense] Coś krążyło wokół auta.'],
    ['lusterko', 0.15, '[whispering] W lusterku przemknął cień.'],
    ['drapanie', 0.15, '[storytelling, tense] Pazury po drzwiach.'],
    ['pysk', 0.15, '[whispering] A potem w szybie pojawił się pysk.'],
    ['ludzkie', 0.15, '[whispering] I oczy. Ludzkie oczy.'],
    ['klakson', 0.15, '[storytelling, urgent] Wcisnąłem klakson. I długie światła.'],
    ['zniknal', 0.15, '[whispering] Zniknął. Na chwilę.'],
    ['szyba', 0.15, '[storytelling, urgent] Szyba pękła.'],
    ['biegne', 0.15, '[storytelling, urgent] Wyskoczyłem drugimi drzwiami. I biegłem.'],
    ['snieg', 0.15, '[storytelling, urgent, breathing] Przez las. Po kolana w śniegu.'],
    ['goni', 0.15, '[storytelling, urgent] Słyszałem go za sobą. Coraz bliżej.'],
    ['kapliczka', 0.15, '[storytelling, urgent] Między drzewami światło. Stara kaplica.'],
    ['babcia', 0.15, '[storytelling, tense] Babcia mówiła: wilkołak nie przekroczy progu świętego miejsca.'],
    ['wpadam', 0.15, '[storytelling, urgent] Wpadłem do środka.'],
    ['prog', 0.15, '[whispering] Stanął w progu.'],
    ['nie_wszedl', 0.15, '[whispering] Ale nie wszedł.'],
    ['glos', 0.15, '[whispering, hoarse, father, pleading] Synku… otwórz… to ja…', 'wilk'],
    ['to_tata', 0.15, '[storytelling, tense] To był głos taty.'],
    ['swit', 0.15, '[storytelling] Stał tak do świtu. Potem zniknął.'],
    ['policja', 0.15, '[storytelling, tense] Rano policja znalazła tatę przy drodze. W samej koszuli.'],
    ['nie_pamietam', 0.15, '[tired, confused, father] Nic nie pamiętam. Szedłem po pomoc…', 'tata'],
    ['rece', 0.15, '[storytelling, tense] Pod paznokciami miał krew. I sierść.'],
    ['dom', 0.15, '[storytelling] Pojechaliśmy do domu.'],
    ['lusterko2', 0.15, '[storytelling, tense] W lusterku tata uśmiechnął się do mnie.'],
    ['zolte', 0.15, '[whispering] A jego oczy… na moment zaświeciły na żółto.'],
    ['dobranoc', 0.15, '[whispering, father, warm but sinister] Dobranoc, synku.', 'tata'],
    ['epilog', 0.15, '[storytelling] Tak wierzono w Polsce. Ale jedno jest prawdą: gdy auto zepsuje się w nocy, zostań w środku, włącz awaryjne i dzwoń pod sto dwanaście.'],
    ['end', 0.15, '[whispering, father, sinister] Dobranoc…', 'tata'],
]
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 127.4], [-34, -34]),
    loops={'groza': ([0, .2, 13.6, 34.8, 49.2, 63.0, 92.0, 107.2, 118.4, 127.4], [-60, -10, -28, -12, -6, -6, -26, -12, -34, -40]),
           'tension': ([0, 13.6, 34.8, 49.2, 63.0, 92.0, 110.4, 116.2, 118.4, 127.4], [-18, -30, -16, -8, -6, -28, -10, -6, -40, -40]),
           'drone': ([0, 34.8, 63.0, 92.0, 110.4, 116.2, 127.4], [-40, -16, -8, -40, -12, -8, -60]),
           'wind': ([0, 127.4], [-24, -28]),
           'roomtone': ([0, 127.4], [-38, -38])},
    heartbeat=([0, 37.6, 63.0, 92.0, 110.4, 116.2, 127.4], [-90, -12, -4, -90, -8, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -18)], 'hit': [('boom', -3)], 'jolt': [('jolt', -2)], 'door': [('doorclose', -6)], 'howl': [('wind', -2), ('drone', -4)], 'scrape': [('scrape', -4)], 'horn': [('buzz', -4)], 'glass': [('bang', -2)], 'run': [('run', -6), ('breath', -8)], 'growl': [('drone', -2)], 'slam': [('slam', -3)], 'siren': [('siren', -14)]}
EXTRA = [(0.1, 'hit_low', -4), (49.95, 'hit_low', 0), (49.95, 'sting', -3), (60.5, 'sting', -4), (80.4, 'sting', -4), (112.2, 'riser', -4), (116.25, 'hit_low', 0), (116.25, 'sting', -2)] + [(t, 'hit_low', -9) for t in (13.6, 19.8, 34.8, 63.0, 95.0, 110.4)]
