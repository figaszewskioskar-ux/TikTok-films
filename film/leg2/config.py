"""POLSKIE LEGENDY GROZY · BEBOK — własna historia na podstawie śląskich wierzeń. Podgląd bez lektora."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'  # Victor bez filtrów — naturalny opowiadacz
MODEL = 'eleven_v3'
SETTINGS = {'stability': 0.4, 'similarity_boost': 0.85}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {'kuba': ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3), 'zosia': ('d4Z5Fvjohw3zxGpV8XUV', 'eleven_v3', V3), 'wujek': ('JWUOwsYG4XgR9Od3eeon', 'eleven_v3', V3), 'bebok': ('bX8ZXtFbQtanSpI1KPZ1', 'eleven_v3', V3)}
VFILTER = {'lektor': 'highpass=f=70,acompressor=threshold=-20dB:ratio=2.5,aecho=0.5:0.3:35:0.08', 'zosia': 'highpass=f=150,asetrate=48000*1.1,aresample=48000,atempo=0.92,lowpass=f=3000',
           'bebok': 'asetrate=48000*0.78,aresample=48000,atempo=1.2,aecho=0.7:0.6:60|140:0.4|0.25'}
MAXK = 1.6
PREVIEW_NO_VOICE = False
TARGET = None
SQUEEZE = 0.75
SCENES = [('karta', 0, 4.2), ('katy', 4.2, 7.2), ('swiatlo', 7.2, 10.0), ('worek', 10.0, 12.8), ('mowiono', 12.8, 16.0), ('szur', 16.0, 18.8), ('ja', 18.8, 21.6), ('famil', 21.6, 24.2), ('kuchnia', 24.2, 27.0), ('wujek1', 27.0, 29.8), ('kuba1', 29.8, 32.0), ('klodka', 32.0, 34.8), ('noc', 34.8, 37.2), ('szur2', 37.2, 39.6), ('pusto', 39.6, 42.0), ('klapa', 42.0, 44.6), ('drabina', 44.6, 47.0), ('strych', 47.0, 49.8), ('kapec', 49.8, 52.2), ('worki', 52.2, 54.6), ('rusza', 54.6, 57.0), ('zosia_glos', 57.0, 59.4), ('rozwiaz', 59.4, 62.2), ('oddech', 62.2, 64.6), ('oczy', 64.6, 67.2), ('wlecze', 67.2, 69.6), ('ucieczka', 69.6, 72.0), ('trzask', 72.0, 74.2), ('wujku', 74.2, 76.4), ('latarka', 76.4, 78.8), ('pustystrych', 78.8, 81.2), ('kartka', 81.2, 84.0), ('twist', 84.0, 86.6), ('lampka', 86.6, 89.4), ('pod_lozkiem', 89.4, 92.2), ('epilog', 92.2, 95.6), ('end', 95.6, 100.2)]
SEG = [
    ['karta', 0.15, '[storytelling, tense, slow] To jest bebok.'],
    ['katy', 0.15, '[storytelling, tense] Śląski potwór z ciemnych kątów. Ze strychów, piwnic i kominów.'],
    ['swiatlo', 0.15, '[storytelling, tense] Mieszka tam, gdzie nie sięga światło.'],
    ['worek', 0.15, '[storytelling, tense] I nosi wielki worek.'],
    ['mowiono', 0.15, '[storytelling] Na Śląsku mówiono dzieciom: wracaj przed zmrokiem, bo bebok cię weźmie.'],
    ['szur', 0.15, '[whispering] Najpierw go słychać. Szuranie worka po deskach.'],
    ['ja', 0.15, '[storytelling] Myślałem, że to bajka na dobranoc. Do jesieni u wujka na Śląsku.'],
    ['famil', 0.15, '[storytelling] Stary familok z czerwonej cegły. Za oknem szyb kopalni.'],
    ['kuchnia', 0.15, '[storytelling] Wujek Ecik robił najlepsze kakao na świecie.'],
    ['wujek1', 0.15, '[friendly, teasing, Silesian accent] Na strych niy łaźcie. Tam bebok siedzi.', 'wujek'],
    ['kuba1', 0.15, '[laughing a little] Wujku, nie mamy pięciu lat.', 'kuba'],
    ['klodka', 0.15, '[storytelling, tense] Wujek się zaśmiał. Ale klapę na strych zamknął na kłódkę.'],
    ['noc', 0.15, '[storytelling, tense] W nocy obudził mnie dźwięk.'],
    ['szur2', 0.15, '[whispering] Szur. Szur. Nad sufitem.'],
    ['pusto', 0.15, '[storytelling, tense] Łóżko Zosi było puste.'],
    ['klapa', 0.15, '[storytelling, tense] Klapa na strych była otwarta. Kłódka leżała na podłodze.'],
    ['drabina', 0.15, '[storytelling, tense] Wszedłem po drabinie.'],
    ['strych', 0.15, '[storytelling, tense] Na strychu było zimno. Pachniało kurzem i węglem.'],
    ['kapec', 0.15, '[whispering] Na deskach leżał kapeć Zosi.'],
    ['worki', 0.15, '[storytelling, tense] Wszędzie stały worki.'],
    ['rusza', 0.15, '[whispering] Jeden się poruszył.'],
    ['zosia_glos', 0.15, '[muffled, scared, little girl] Kuba…', 'zosia'],
    ['rozwiaz', 0.15, '[storytelling, tense] Rozwiązałem sznurek. W środku spała Zosia.'],
    ['oddech', 0.15, '[whispering] Wtedy za plecami usłyszałem oddech.'],
    ['oczy', 0.15, '[storytelling, tense, slow] Dwoje białych oczu. Wysoko. Pod samym dachem.'],
    ['wlecze', 0.15, '[whispering] I znów: szur. Szur. Worek wlókł się po podłodze.'],
    ['ucieczka', 0.15, '[storytelling, urgent] Złapałem Zosię i rzuciłem się do klapy.'],
    ['trzask', 0.15, '[storytelling, urgent] Zatrzasnąłem ją nad sobą.'],
    ['wujku', 0.15, '[screaming] Wujku! Bebok!', 'kuba'],
    ['latarka', 0.15, '[storytelling] Wujek wbiegł na strych z latarką.'],
    ['pustystrych', 0.15, '[storytelling, tense] Strych był pusty.'],
    ['kartka', 0.15, '[storytelling, tense] Został tylko jeden worek. Z kartką. Było na niej moje imię.'],
    ['twist', 0.15, '[whispering] Bebok nie przyszedł po Zosię. Przyszedł po mnie.'],
    ['lampka', 0.15, '[storytelling, tense] Od tamtej nocy śpię przy zapalonej lampce.'],
    ['pod_lozkiem', 0.15, '[whispering] Ale wczoraj lampka zgasła. A spod łóżka… coś zaszurało.'],
    ['epilog', 0.15, '[storytelling] Na Śląsku bebokiem straszono dzieci jeszcze w czasach naszych dziadków.'],
    ['end', 0.15, '[whispering, deep, creepy] Kuba…', 'bebok'],
]
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 100.19], [-34, -34]),
    loops={'groza': ([0, .2, 18.8, 34.8, 47.0, 64.6, 74.2, 86.6, 89.4, 92.2, 100.19], [-60, -10, -26, -14, -10, -4, -10, -20, -4, -12, -40]),
           'tension': ([0, 18.8, 34.8, 64.6, 78.8, 89.4, 100.19], [-20, -30, -16, -6, -14, -6, -30]),
           'wind': ([0, 34.8, 92.2, 100.19], [-30, -20, -26, -30]),
           'drone': ([0, 34.8, 64.6, 92.2, 95.6], [-40, -18, -8, -26, -30]),
           'roomtone': ([0, 100.19], [-38, -38])},
    heartbeat=([0, 37.2, 64.6, 76.4, 89.4, 92.2, 100.19], [-90, -12, -6, -14, -6, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -22)], 'hit': [('boom', -3)], 'jolt': [('jolt', -2)], 'scrape': [('scrape', -4)], 'creak': [('creak', -4)], 'steps': [('run', -5)],
           'slam': [('slam', -2)], 'switch': [('poweroff', -4)]}
EXTRA = [(64.89999999999999, 'hit_low', 0), (64.89999999999999, 'sting', -3), (84.0, 'sting', -3), (90.80000000000001, 'hit_low', 0), (90.80000000000001, 'sting', -3), (86.80000000000001, 'riser', -6), (0.1, 'hit_low', -4), (55.2, 'sting', -6), (39.9, 'sting', -6), (38.800000000000004, 'hit_low', 0), (38.800000000000004, 'sting', -2), (51.699999999999996, 'sting', -3), (72.25, 'hit_low', 0), (62.7, 'riser', -6), (63.900000000000006, 'sting', -2), (42.8, 'sting', -4), (91.60000000000001, 'hit_low', 0), (91.60000000000001, 'sting', 0)] + [(t, 'hit_low', -9) for t in (18.8, 34.8, 47.0, 74.2, 81.2)]
