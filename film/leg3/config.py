"""POLSKIE LEGENDY GROZY · UTOPIEC — własna historia na podstawie ludowych wierzeń. Wersja z lektorem."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'  # Victor bez filtrów — naturalny opowiadacz
MODEL = 'eleven_v3'
SETTINGS = {'stability': 0.4, 'similarity_boost': 0.85}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {'dziadek': ('JxVKcxm9wtnCYEs8V00p', 'eleven_v3', V3), 'utopiec': ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3)}
VFILTER = {'lektor': 'highpass=f=70,acompressor=threshold=-20dB:ratio=2.5,aecho=0.5:0.3:35:0.08', 'dziadek': 'highpass=f=80',
           'utopiec': 'asetrate=48000*0.9,aresample=48000,atempo=1.08,lowpass=f=2400,aecho=0.8:0.7:40|90:0.5|0.3,tremolo=f=6:d=0.2'}
MAXK = 1.6
PREVIEW_NO_VOICE = False
TARGET = None
SQUEEZE = 0.75
SCENES = [('karta', 0, 4.2), ('dno', 4.2, 7.2), ('garnki', 7.2, 10.4), ('glos', 10.4, 13.4), ('czeka', 13.4, 16.4), ('ja', 16.4, 19.4), ('namiot', 19.4, 22.4), ('dziadek', 22.4, 25.0), ('dziadek1', 25.0, 28.2), ('noc', 28.2, 31.0), ('wola', 31.0, 34.2), ('brat_spi', 34.2, 37.6), ('cien', 37.6, 40.6), ('kap', 40.6, 43.2), ('wychodze', 43.2, 46.2), ('pomost', 46.2, 49.4), ('tafla', 49.4, 52.2), ('twarz', 52.2, 55.4), ('usmiech', 55.4, 58.2), ('kostka', 58.2, 61.0), ('wciaga', 61.0, 63.6), ('cisza', 63.6, 66.6), ('dziesiatki', 66.6, 69.6), ('szept', 69.6, 72.6), ('nowy', 72.6, 75.8), ('swiatlo', 75.8, 78.6), ('wyciaga', 78.6, 81.6), ('nie_patrz', 81.6, 84.4), ('rano', 84.4, 87.6), ('do_namiotu', 87.6, 90.6), ('spiwor', 90.6, 94.0), ('szukaja', 94.0, 97.0), ('zamek', 97.0, 100.0), ('tomek', 100.0, 103.0), ('tomek_glos', 103.0, 106.0), ('twist', 106.0, 109.2), ('wyskok', 109.2, 111.6), ('epilog', 111.6, 115.4), ('end', 115.4, 120.0)]
SEG = [
    ['karta', 0.15, '[storytelling, tense, slow] To jest utopiec.'],
    ['dno', 0.15, '[storytelling, tense, slow] Mieszka na dnie stawów i rzek.'],
    ['garnki', 0.15, '[storytelling, tense, slow] Dusze utopionych trzyma pod dnem. W odwróconych garnkach.'],
    ['glos', 0.15, '[storytelling, tense, slow] Potrafi mówić głosem kogoś, kogo kochasz.'],
    ['czeka', 0.15, '[storytelling, tense, slow] I czeka, aż sam wejdziesz do wody.'],
    ['ja', 0.15, '[storytelling] Myślałem, że to bajki. Do lata u dziadka nad stawem.'],
    ['namiot', 0.15, '[storytelling] Spaliśmy z bratem w namiocie. Tuż przy wodzie.'],
    ['dziadek', 0.15, '[storytelling] Dziadek powiedział tylko jedno.'],
    ['dziadek1', 0.15, '[serious, low, old man] Po zmroku do wody nie wchodźcie. Choćby was wołała matka.', 'dziadek'],
    ['noc', 0.15, '[storytelling, tense] W nocy obudził mnie plusk.'],
    ['wola', 0.15, '[whispering, child, sweet, creepy] Chodź… woda jest ciepła…', 'utopiec'],
    ['brat_spi', 0.15, '[storytelling, tense] To był głos Tomka. Ale Tomek spał obok mnie.'],
    ['cien', 0.15, '[whispering] Na ścianie namiotu pojawił się cień.'],
    ['kap', 0.15, '[whispering] Coś kapało. Kap. Kap.'],
    ['wychodze', 0.15, '[storytelling, tense] Wziąłem latarkę i wyszedłem.'],
    ['pomost', 0.15, '[storytelling, tense] Pomost był mokry. Jakby ktoś przed chwilą z niego zszedł.'],
    ['tafla', 0.15, '[storytelling, tense] Tafla była gładka jak lustro.'],
    ['twarz', 0.15, '[whispering] A pod nią… twarz.'],
    ['usmiech', 0.15, '[whispering] Uśmiechała się.'],
    ['kostka', 0.15, '[storytelling, urgent] Coś złapało mnie za kostkę.'],
    ['wciaga', 0.15, '[storytelling, urgent] I pociągnęło w dół.'],
    ['cisza', 0.15, '[whispering] Pod wodą było cicho.'],
    ['dziesiatki', 0.15, '[whispering] Na dnie stały garnki. Dziesiątki garnków.'],
    ['szept', 0.15, '[whispering] Z każdego coś szeptało. Moim imieniem.'],
    ['nowy', 0.15, '[storytelling, tense] Utopiec trzymał nowy garnek. Pusty.'],
    ['swiatlo', 0.15, '[storytelling, urgent] Wtedy nad wodą zabłysło światło.'],
    ['wyciaga', 0.15, '[storytelling, urgent] Dziadek wyciągnął mnie za kołnierz.'],
    ['nie_patrz', 0.15, '[shouting, panicked, old man] Nie patrz za siebie!', 'dziadek'],
    ['rano', 0.15, '[storytelling, tense] Rano na pomoście były ślady. Z błoną między palcami.'],
    ['do_namiotu', 0.15, '[storytelling, tense] Prowadziły z wody. Prosto do namiotu.'],
    ['spiwor', 0.15, '[storytelling, tense] Śpiwór Tomka był pusty. Mokry. Pełen wodorostów.'],
    ['szukaja', 0.15, '[storytelling, tense] Szukali go do zmroku.'],
    ['zamek', 0.15, '[whispering] W nocy ktoś rozpiął namiot.'],
    ['tomek', 0.15, '[storytelling, tense] To był Tomek. Cały mokry.'],
    ['tomek_glos', 0.15, '[whispering, child, sweet, creepy] Chodź… woda jest ciepła…', 'utopiec'],
    ['twist', 0.15, '[whispering] Tylko że Tomek… nie umiał pływać. I nigdy nie mrugał.'],
    ['epilog', 0.15, '[storytelling, tense] Tak wierzono na polskich wsiach. Dlatego dzieciom nie pozwalano kąpać się po zmroku.'],
    ['end', 0.15, '[whispering, child, sweet, creepy] Chodź…', 'utopiec'],
]
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 120.0], [-34, -34]),
    loops={'groza': ([0, .2, 16.4, 28.2, 52.2, 63.6, 84.4, 97.0, 111.6, 120.0], [-60, -10, -26, -14, -6, -10, -26, -8, -30, -40]),
           'tension': ([0, 16.4, 28.2, 52.2, 84.4, 97.0, 109.2, 111.6, 120.0], [-18, -30, -18, -8, -28, -12, -6, -40, -40]),
           'drone': ([0, 28.2, 63.6, 84.4, 97.0, 109.2, 120.0], [-40, -20, -12, -40, -14, -8, -60]),
           'wind': ([0, 120.0], [-30, -30]),
           'roomtone': ([0, 120.0], [-38, -38])},
    heartbeat=([0, 37.6, 52.2, 63.6, 97.0, 109.2, 120.0], [-90, -12, -6, -90, -8, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -22)], 'hit': [('boom', -3)], 'jolt': [('jolt', -2)], 'splash': [('slam', -8)], 'drip': [('tap', -6)], 'creak': [('creak', -6)], 'zip': [('tape', -6)]}
EXTRA = [(0.1, 'hit_low', -4), (53.400000000000006, 'hit_low', 0), (53.400000000000006, 'sting', -3), (58.800000000000004, 'sting', -4), (105.2, 'riser', -4), (109.25, 'hit_low', 0), (109.25, 'sting', -2)] + [(t, 'hit_low', -9) for t in (16.4, 28.2, 63.6, 84.4, 97.0)]
