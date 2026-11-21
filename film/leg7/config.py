"""POLSKIE LEGENDY GROZY · BABA JAGA — własna historia (styl: czysta animacja 2D). Wersja z lektorem."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'  # Victor bez filtrów — naturalny opowiadacz
MODEL = 'eleven_v3'
SETTINGS = {'stability': 0.4, 'similarity_boost': 0.85}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {'jaga': ('6qkrzTbAj75WW5U8X5mB', 'eleven_v3', V3), 'ola': ('d4Z5Fvjohw3zxGpV8XUV', 'eleven_v3', V3), 'dziadek': ('JxVKcxm9wtnCYEs8V00p', 'eleven_v3', V3)}
VFILTER = {'lektor': 'highpass=f=70,acompressor=threshold=-20dB:ratio=2.5,aecho=0.5:0.3:35:0.08', 'dziadek': 'highpass=f=80', 'ola': 'highpass=f=150,asetrate=48000*1.08,aresample=48000,atempo=0.93',
           'jaga': 'asetrate=48000*0.9,aresample=48000,atempo=1.08,highpass=f=120,aecho=0.6:0.5:40|90:0.3|0.2'}
MAXK = 1.6
PREVIEW_NO_VOICE = False
TARGET = None
SQUEEZE = 0.75
SCENES = [('karta', 0, 4.6), ('chatka', 4.6, 7.8), ('plot', 7.8, 11.0), ('zeby', 11.0, 14.0), ('glodna', 14.0, 17.0), ('dzieci', 17.0, 20.6), ('ola', 20.6, 23.8), ('dziadek1', 23.8, 27.2), ('grzyby', 27.2, 30.2), ('zniknal', 30.2, 33.4), ('woła', 33.4, 36.2), ('zmrok', 36.2, 39.2), ('swiatlo', 39.2, 42.0), ('nozka', 42.0, 45.2), ('czaszki', 45.2, 48.4), ('drzwi', 48.4, 51.2), ('zaprasza', 51.2, 54.8), ('glodna_ola', 54.8, 57.6), ('weszla', 57.6, 60.2), ('sloje', 60.2, 63.4), ('piec', 63.4, 66.2), ('lopata', 66.2, 69.8), ('zelazne', 69.8, 72.6), ('sprytna', 72.6, 75.8), ('pochyla', 75.8, 78.6), ('pcha', 78.6, 81.4), ('ucieka', 81.4, 84.6), ('latarka', 84.6, 87.6), ('dziadek2', 87.6, 90.4), ('noc', 90.4, 93.4), ('skrob', 93.4, 96.4), ('slady', 96.4, 99.8), ('pierogi', 99.8, 102.8), ('wyskok', 102.8, 105.0), ('epilog', 105.0, 109.6), ('end', 109.6, 114.2)]
SEG = [
    ['karta', 0.15, '[storytelling, tense, slow] To jest Baba Jaga.'],
    ['chatka', 0.15, '[storytelling, tense] Mieszka w głębi puszczy. W chatce na kurzej nóżce.'],
    ['plot', 0.15, '[storytelling, tense] Płot ma z ludzkich kości. Na każdym palu czaszka.'],
    ['zeby', 0.15, '[storytelling, tense] Ma żelazne zęby.'],
    ['glodna', 0.15, '[storytelling, tense] I zawsze jest głodna.'],
    ['dzieci', 0.15, '[storytelling, tense] Zaprasza dzieci do środka. Na ciepły posiłek. I nikt ich więcej nie widzi.'],
    ['ola', 0.15, '[storytelling] Ola pojechała z dziadkiem na grzyby. Do starej puszczy.'],
    ['dziadek1', 0.15, '[warm, old man, serious] Trzymaj się blisko, Olu. Puszcza lubi zabierać dzieci.', 'dziadek'],
    ['grzyby', 0.15, '[storytelling] Ale Ola zobaczyła prawdziwki. Całą gromadę.'],
    ['zniknal', 0.15, '[storytelling, tense] Gdy podniosła głowę… dziadka nie było.'],
    ['woła', 0.15, '[shouting, scared, girl] Dziadku?! Dziadku!', 'ola'],
    ['zmrok', 0.15, '[storytelling, tense] Zapadał zmrok. Mgła wpełzała między drzewa.'],
    ['swiatlo', 0.15, '[whispering] Między drzewami mrugnęło światło.'],
    ['nozka', 0.15, '[storytelling, tense] Chatka. Na ogromnej kurzej nóżce.'],
    ['czaszki', 0.15, '[whispering] Płot z kości. A czaszki… odwróciły się w jej stronę.'],
    ['drzwi', 0.15, '[storytelling, tense] Drzwi skrzypnęły.'],
    ['zaprasza', 0.15, '[sweet, old woman, too kind] Zmarzłaś, dziecko? Wejdź. Mam ciepłe pierogi.', 'jaga'],
    ['glodna_ola', 0.15, '[storytelling] Pachniało pięknie. A Ola była taka głodna.'],
    ['weszla', 0.15, '[storytelling, tense] Weszła.'],
    ['sloje', 0.15, '[whispering] Na półkach stały słoje. W słojach coś pływało. I patrzyło.'],
    ['piec', 0.15, '[storytelling, tense] Piec był rozpalony do czerwoności.'],
    ['lopata', 0.15, '[sweet, old woman, creepy] Usiądź na łopacie, kochanie. Pokażę ci piec od środka.', 'jaga'],
    ['zelazne', 0.15, '[whispering] Wtedy Ola zobaczyła jej zęby. Żelazne.'],
    ['sprytna', 0.15, '[trembling, girl, clever] A jak się siada, babciu? Pokaż mi.', 'ola'],
    ['pochyla', 0.15, '[storytelling, tense] Baba Jaga pochyliła się nad łopatą…'],
    ['pcha', 0.15, '[storytelling, urgent] Ola pchnęła łopatę z całej siły. I uciekła.'],
    ['ucieka', 0.15, '[storytelling, urgent] Biegła przez las. A za plecami słyszała tupot. Ogromny. Kurzy.'],
    ['latarka', 0.15, '[storytelling] Aż w ciemności zobaczyła latarkę dziadka.'],
    ['dziadek2', 0.15, '[shouting, relieved, old man] Olu! Gdzie ty byłaś?!', 'dziadek'],
    ['noc', 0.15, '[storytelling, tense] W domu Ola długo nie mogła zasnąć.'],
    ['skrob', 0.15, '[whispering] Nad ranem coś zaskrobało w okno.'],
    ['slady', 0.15, '[storytelling, tense] Pod oknem, w błocie, były ślady. Ogromne. Trójpalczaste.'],
    ['pierogi', 0.15, '[whispering, creepy, old woman] Pierogi stygną, Olu…', 'jaga'],
    ['epilog', 0.15, '[storytelling] Baba Jaga to postać ze słowiańskich wierzeń. A jeśli zgubisz się w lesie naprawdę: zostań w miejscu i dzwoń pod sto dwanaście.'],
    ['end', 0.15, '[whispering, creepy, old woman] Ola… pierogi…', 'jaga'],
]
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 114.2], [-34, -34]),
    loops={'groza': ([0, .2, 20.6, 36.2, 45.2, 69.8, 84.6, 90.4, 105.0, 114.2], [-60, -10, -30, -14, -8, -5, -26, -10, -34, -40]),
           'tension': ([0, 20.6, 30.2, 45.2, 69.8, 84.6, 93.4, 102.8, 105.0, 114.2], [-18, -32, -18, -10, -6, -28, -12, -6, -40, -40]),
           'drone': ([0, 36.2, 69.8, 84.6, 93.4, 102.8, 114.2], [-40, -16, -8, -40, -12, -8, -60]),
           'wind': ([0, 14.0, 20.6, 36.2, 51.2, 81.4, 90.4, 114.2], [-26, -40, -32, -22, -40, -22, -30, -30]),
           'roomtone': ([0, 114.2], [-38, -38])},
    heartbeat=([0, 39.2, 69.8, 84.6, 93.4, 102.8, 114.2], [-90, -12, -4, -90, -8, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -18)], 'hit': [('boom', -3)], 'jolt': [('jolt', -2)], 'creak': [('creak', -4)], 'stomp': [('bang', -6), ('boom', -8)], 'slam': [('slam', -3)], 'run': [('run', -6), ('breath', -8)], 'scrape': [('scrape', -4)]}
EXTRA = [(0.1, 'hit_low', -4), (70.0, 'hit_low', 0), (70.0, 'sting', -3), (46.6, 'sting', -4), (98.8, 'riser', -4), (102.85, 'hit_low', 0), (102.85, 'sting', -2)] + [(t, 'hit_low', -9) for t in (20.6, 36.2, 42.0, 81.4, 90.4)]
