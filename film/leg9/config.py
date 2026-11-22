"""POLSKIE LEGENDY GROZY · LICHO — własna historia na podstawie słowiańskich wierzeń (wzór: BEBOK). Wersja z lektorem."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'  # Victor
MODEL = 'eleven_v3'
SETTINGS = {'stability': 0.4, 'similarity_boost': 0.85}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {'kuba': ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3), 'zosia': ('d4Z5Fvjohw3zxGpV8XUV', 'eleven_v3', V3), 'babcia': ('6qkrzTbAj75WW5U8X5mB', 'eleven_v3', V3), 'licho': ('bX8ZXtFbQtanSpI1KPZ1', 'eleven_v3', V3)}
VFILTER = {'lektor': 'atempo=1.1,highpass=f=70,acompressor=threshold=-20dB:ratio=2.5,aecho=0.5:0.3:35:0.08', 'zosia': 'highpass=f=150,asetrate=48000*1.1,aresample=48000,atempo=0.92,lowpass=f=3000',
           'licho': 'asetrate=48000*1.15,aresample=48000,atempo=0.85,aecho=0.7:0.6:50|120:0.4|0.25,highpass=f=200'}
MAXK = 1.6
PREVIEW_NO_VOICE = False
TARGET = 118
SQUEEZE = 0.75
SCENES = [('karta', 0, 4.4), ('katy', 4.4, 7.6), ('psuje', 7.6, 10.8), ('mowiono', 10.8, 14.4), ('niespi', 14.4, 17.2), ('ja', 17.2, 20.4), ('chata', 20.4, 23.4), ('babcia1', 23.4, 26.8), ('kuba1', 26.8, 29.2), ('zgasila', 29.2, 32.0), ('noc', 32.0, 34.8), ('zart', 34.8, 37.2), ('wolanie', 37.2, 40.4), ('cisza', 40.4, 42.6), ('kukulka', 42.6, 45.8), ('zarowka', 45.8, 48.4), ('stuk', 48.4, 51.4), ('zosia', 51.4, 53.8), ('latarka', 53.8, 56.6), ('slady', 56.6, 59.6), ('sciana', 59.6, 62.6), ('sufit', 62.6, 65.0), ('oko', 65.0, 67.8), ('zeby', 67.8, 70.4), ('skok', 70.4, 72.4), ('babcia2', 72.4, 75.2), ('nikogo', 75.2, 78.2), ('babcia3', 78.2, 81.6), ('rano', 81.6, 84.6), ('radio', 84.6, 87.6), ('lusterko', 87.6, 90.0), ('twist', 90.0, 93.6), ('szept', 93.6, 96.6), ('epilog', 96.6, 101.0), ('end', 101.0, 106.0)]
SEG = [
    ['karta', 0.15, '[storytelling, tense, slow] To jest Licho.'],
    ['katy', 0.15, '[storytelling, tense] Małe. Chude. Z jednym okiem. Siedzi za piecem i czeka.'],
    ['psuje', 0.15, '[storytelling, tense] Gdzie wejdzie, tam wszystko się psuje.'],
    ['mowiono', 0.15, '[storytelling] Na wsi babcie straszyły dzieci: nie wołaj licha, bo przyjdzie. I już nie odejdzie.'],
    ['niespi', 0.15, '[whispering] Bo licho… nie śpi.'],
    ['ja', 0.15, '[storytelling] Myślałem, że to takie powiedzonko. Do ferii u babci na wsi.'],
    ['chata', 0.15, '[storytelling] Stary dom. Piec kaflowy. Zegar z kukułką.'],
    ['babcia1', 0.15, '[old woman, warm but serious] Tylko po nocy licha nie wołajcie. Ono słucha.', 'babcia'],
    ['kuba1', 0.15, '[laughing a little] Babciu, to tylko bajka.', 'kuba'],
    ['zgasila', 0.15, '[storytelling, tense] Babcia się przeżegnała. I zgasiła światło.'],
    ['noc', 0.15, '[storytelling, tense] W nocy nie mogłem zasnąć.'],
    ['zart', 0.15, '[storytelling] Dla żartu szepnąłem w ciemność.'],
    ['wolanie', 0.15, '[whispering, teasing] Licho… Licho… chodź tu.', 'kuba'],
    ['cisza', 0.15, '[whispering] Cisza.'],
    ['kukulka', 0.15, '[storytelling, tense] Wtedy zegar stanął. Równo o trzeciej.'],
    ['zarowka', 0.15, '[storytelling, tense] Żarówka w kuchni pękła sama.'],
    ['stuk', 0.15, '[whispering] Za piecem coś zastukało. Puk. Puk. Puk.'],
    ['zosia', 0.15, '[scared, whispering, little girl] Kuba… tam ktoś jest.', 'zosia'],
    ['latarka', 0.15, '[storytelling, tense] Wziąłem latarkę i poświeciłem za piec.'],
    ['slady', 0.15, '[storytelling, tense] Nic. Tylko małe ślady bosych stóp.'],
    ['sciana', 0.15, '[whispering] Ślady szły po ścianie. Coraz wyżej.'],
    ['sufit', 0.15, '[whispering] Aż na sufit.'],
    ['oko', 0.15, '[storytelling, tense, slow] Patrzyło na mnie jedno, wielkie oko.'],
    ['zeby', 0.15, '[whispering] Uśmiechnęło się. Miało za dużo zębów.'],
    ['skok', 0.15, '[storytelling, urgent] I skoczyło.'],
    ['babcia2', 0.15, '[old woman, scared, angry] Coś ty zrobił?!', 'babcia'],
    ['nikogo', 0.15, '[storytelling, tense] Nikogo nie było. Tylko zegar znowu tykał.'],
    ['babcia3', 0.15, '[old woman, whispering, grim] Zawołałeś je. Teraz będzie chodzić za tobą.', 'babcia'],
    ['rano', 0.15, '[storytelling] Rano wyjechaliśmy. Odetchnąłem.'],
    ['radio', 0.15, '[storytelling, tense] W aucie tata włączył radio. Same trzaski.'],
    ['lusterko', 0.15, '[whispering] Spojrzałem w lusterko.'],
    ['twist', 0.15, '[storytelling, tense, slow] Między mną a Zosią… siedziało Licho.'],
    ['szept', 0.15, '[whispering, creepy, raspy] Wołałeś… to jestem.', 'licho'],
    ['epilog', 0.15, '[storytelling] Mówi się: licho nie śpi. Dlatego na wsi nikt nie wołał go po imieniu.'],
    ['end', 0.15, '[whispering, creepy, raspy] Licho… nie śpi.', 'licho'],
]
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 105.99], [-34, -34]),
    loops={'groza': ([0, .2, 17.2, 32.0, 42.6, 65.0, 72.4, 81.6, 87.6, 96.6, 105.99], [-60, -10, -26, -16, -10, -4, -18, -26, -6, -16, -40]),
           'tension': ([0, 17.2, 32.0, 65.0, 72.4, 87.6, 96.6, 105.99], [-18, -30, -16, -6, -18, -6, -24, -40]),
           'wind': ([0, 105.99], [-28, -28]),
           'drone': ([0, 32.0, 65.0, 81.6, 90.0, 96.6, 101.0], [-40, -18, -8, -30, -8, -26, -30]),
           'roomtone': ([0, 105.99], [-36, -36])},
    heartbeat=([0, 48.4, 65.0, 72.4, 87.6, 96.6, 105.99], [-90, -12, -6, -90, -8, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -22)], 'hit': [('boom', -3)], 'jolt': [('jolt', -2)], 'scrape': [('scrape', -4)], 'creak': [('creak', -3)], 'steps': [('run', -6)],
           'slam': [('slam', -2)], 'switch': [('poweroff', -3)]}
EXTRA = [(0.1, 'hit_low', -4), (8.8, 'hit_low', -2), (15.0, 'sting', -5), (43.4, 'hit_low', 0), (46.8, 'hit_low', -2), (61.2, 'riser', -6), (65.3, 'hit_low', 0), (65.3, 'sting', -2), (70.8, 'hit_low', 0), (86.8, 'riser', -5), (90.8, 'hit_low', 0), (90.8, 'sting', -2), (96.2, 'hit_low', 0), (96.2, 'sting', 0), (101.0, 'hit_low', -2), (17.2, 'hit_low', -9), (20.4, 'hit_low', -9), (32.0, 'hit_low', -9), (48.4, 'hit_low', -9), (53.8, 'hit_low', -9), (72.4, 'hit_low', -9), (81.6, 'hit_low', -9), (84.6, 'hit_low', -9)]
