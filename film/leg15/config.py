"""LEGENDY GROZY · AUTOSTOPOWICZKA — własna historia na podstawie miejskiej legendy (wzór: BEBOK)."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'  # Victor
MODEL = 'eleven_v3'
SETTINGS = {'stability': 0.4, 'similarity_boost': 0.85}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {'dziadek': ('JWUOwsYG4XgR9Od3eeon', 'eleven_v3', V3), 'tata': ('JxVKcxm9wtnCYEs8V00p', 'eleven_v3', V3), 'pani': ('6qkrzTbAj75WW5U8X5mB', 'eleven_v3', V3), 'ona': ('d4Z5Fvjohw3zxGpV8XUV', 'eleven_v3', V3)}
VFILTER = {'lektor': 'highpass=f=70,acompressor=threshold=-20dB:ratio=2.5,aecho=0.5:0.3:35:0.08', 'tata': 'aecho=0.5:0.3:30:0.1',
           'ona': 'asetrate=48000*0.92,aresample=48000,atempo=1.06,highpass=f=200,aecho=0.7:0.6:60|140:0.5|0.35'}
TEMPO = {'lektor': 1.1, 'dziadek': 1.05}
MAXK = 1.6
PREVIEW_NO_VOICE = False
TARGET = 118
SQUEEZE = 0.75
SCENES = [('karta', 0, 4.4), ('droga0', 4.4, 8.0), ('macha', 8.0, 11.0), ('kto', 11.0, 14.6), ('dziadek', 14.6, 19.0), ('ja', 19.0, 22.4), ('wyjazd', 22.4, 25.6), ('znak', 25.6, 28.8), ('ona', 28.8, 32.2), ('tata', 32.2, 35.2), ('wsiada', 35.2, 38.4), ('adres', 38.4, 41.0), ('zimno', 41.0, 44.4), ('reka', 44.4, 47.6), ('lusterko', 47.6, 51.6), ('zwolnij', 51.6, 54.2), ('hamuje', 54.2, 57.0), ('pusto', 57.0, 60.8), ('lipowa', 60.8, 63.8), ('kobieta', 63.8, 66.6), ('zdjecie', 66.6, 70.8), ('corka', 70.8, 75.0), ('corok', 75.0, 78.2), ('powrot', 78.2, 81.0), ('szyba', 81.0, 85.0), ('nizej', 85.0, 88.4), ('nastepnym', 88.4, 91.8), ('lustro2', 91.8, 95.2), ('epilog', 95.2, 100.2), ('end', 100.2, 105.2)]
SEG = [
    ['karta', 0.15, '[storytelling, tense, slow] To jest Autostopowiczka.'],
    ['droga0', 0.15, '[storytelling, tense] Stoi nocą przy pustej drodze przez las. W deszczu. W białej sukience.'],
    ['macha', 0.15, '[whispering] I macha do każdego auta.'],
    ['kto', 0.15, '[whispering] Mówią, że kto ją zabierze, ten nigdy nie dowiezie jej do domu.'],
    ['dziadek', 0.15, '[old man, serious, warning] Nie stawajcie w lesie. I nikogo nie bierzcie z drogi. Słyszysz, Kuba?', 'dziadek'],
    ['ja', 0.15, '[storytelling] Wracaliśmy z tatą od dziadka. Tuż przed północą.'],
    ['wyjazd', 0.15, '[storytelling, tense] Droga przez las. Deszcz walił w szyby.'],
    ['znak', 0.15, '[storytelling, tense] Przy zakręcie stał mały krzyż. I palił się znicz.'],
    ['ona', 0.15, '[whispering] A obok stała ona. Mokra. Bez butów.'],
    ['tata', 0.15, '[serious, calm] Nie zostawię dziecka na takim deszczu.', 'tata'],
    ['wsiada', 0.15, '[storytelling, tense] Usiadła z tyłu. Obok mnie.'],
    ['adres', 0.15, '[whispering, eerie, slow] Lipowa… siedem.', 'ona'],
    ['zimno', 0.15, '[storytelling, tense] Od razu zrobiło się zimno. Z jej włosów kapała woda.'],
    ['reka', 0.15, '[whispering] Dotknęła mojej ręki. Była lodowata.'],
    ['lusterko', 0.15, '[storytelling, tense, slow] Tata spojrzał w lusterko. I zbladł. W lusterku byłem tylko ja.'],
    ['zwolnij', 0.15, '[whispering, eerie] Zwolnij. Tu jest zakręt.', 'ona'],
    ['hamuje', 0.15, '[storytelling, urgent] Tata zahamował. Tuż przed drzewem.'],
    ['pusto', 0.15, '[storytelling, tense, slow] Odwróciłem się. Siedzenie było puste. Mokre. I leżała na nim biała wstążka.'],
    ['lipowa', 0.15, '[storytelling] Pojechaliśmy na Lipową siedem.'],
    ['kobieta', 0.15, '[storytelling] Drzwi otworzyła starsza pani.'],
    ['zdjecie', 0.15, '[storytelling, tense, slow] Na ścianie wisiało zdjęcie. Ta sama dziewczyna. Z czarną wstążką.'],
    ['corka', 0.15, '[old woman, sad, quiet] To moja córka. Zginęła na tym zakręcie. Dzisiaj mija dwadzieścia lat.', 'pani'],
    ['corok', 0.15, '[whispering] Co roku ktoś przywozi ją pod te drzwi.'],
    ['powrot', 0.15, '[storytelling] Wracaliśmy w ciszy.'],
    ['szyba', 0.15, '[storytelling, tense] Szyba obok mnie zaparowała. I ktoś napisał palcem: dziękuję.'],
    ['nizej', 0.15, '[whispering] A pod spodem pojawiły się nowe litery.'],
    ['nastepnym', 0.15, '[whispering, eerie, slow] Następnym razem… zostanę.', 'ona'],
    ['lustro2', 0.15, '[storytelling, urgent] Spojrzałem w lusterko. Siedziała obok mnie.'],
    ['epilog', 0.15, '[storytelling] Mówi się, że wciąż stoi przy tamtym zakręcie. Dlatego nocą nigdy nie zabieraj nikogo z pustej drogi.'],
    ['end', 0.15, '[whispering, eerie] Podwieziesz… mnie?', 'ona'],
]
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 105.19], [-34, -34]),
    loops={'groza': ([0, .2, 14.6, 22.4, 28.8, 47.6, 60.8, 66.6, 78.2, 88.4, 95.2, 105.19], [-60, -10, -26, -16, -10, -5, -20, -8, -18, -4, -16, -40]),
           'tension': ([0, 14.6, 22.4, 47.6, 60.8, 66.6, 78.2, 91.8, 95.2, 105.19], [-18, -30, -18, -6, -24, -10, -22, -6, -24, -40]),
           'drone': ([0, 22.4, 47.6, 60.8, 81.0, 95.2, 100.2], [-40, -20, -8, -28, -8, -26, -30]),
           'rain': ([0, 14.6, 19.0, 60.8, 70.8, 75.0, 95.2, 105.19], [-26, -60, -20, -22, -40, -22, -40, -60]),
           'roomtone': ([0, 105.19], [-36, -36])},
    heartbeat=([0, 28.8, 47.6, 60.8, 81.0, 95.2, 105.19], [-90, -14, -6, -90, -8, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -16)], 'hit': [('boom', -3)], 'jolt': [('jolt', -2)], 'door': [('doorclose', -8)], 'creak': [('creak', -6)]}
EXTRA = [(0.1, 'hit_low', -4), (13.4, 'hit_low', -1), (13.4, 'sting', -5), (28.8, 'hit_low', -2), (46.6, 'riser', -7), (49.4, 'hit_low', 0), (49.4, 'sting', -3), (54.45, 'hit_low', 0), (57.6, 'hit_low', -1), (69.0, 'hit_low', -1), (69.0, 'sting', -4), (86.4, 'riser', -6), (90.8, 'hit_low', 0), (90.8, 'sting', -2), (93.0, 'hit_low', 0), (93.0, 'sting', 0), (94.4, 'hit_low', 0), (100.2, 'hit_low', -2), (19.0, 'hit_low', -9), (22.4, 'hit_low', -9), (35.2, 'hit_low', -9), (60.8, 'hit_low', -9), (78.2, 'hit_low', -9), (75.0, 'hit_low', -9)]
