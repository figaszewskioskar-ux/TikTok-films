"""POLSKIE LEGENDY GROZY · SKARBNIK — własna historia na podstawie śląskich wierzeń (schemat haka WZOR_HOOK). Podgląd bez lektora."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'  # Victor
MODEL = 'eleven_v3'
SETTINGS = {'stability': 0.4, 'similarity_boost': 0.85}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {'kuba': ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3), 'przewodnik': ('JxVKcxm9wtnCYEs8V00p', 'eleven_v3', V3), 'skarbnik': ('bX8ZXtFbQtanSpI1KPZ1', 'eleven_v3', V3)}
VFILTER = {'lektor': 'highpass=f=70,acompressor=threshold=-20dB:ratio=2.5,aecho=0.5:0.3:35:0.08', 'przewodnik': 'highpass=f=80,aecho=0.6:0.4:60:0.15',
           'skarbnik': 'asetrate=48000*0.8,aresample=48000,atempo=1.18,aecho=0.7:0.6:80|180:0.45|0.3'}
MAXK = 1.6
PREVIEW_NO_VOICE = True
TARGET = None
SQUEEZE = 0.75
SCENES = [('karta', 0, 4.4), ('gleboko', 4.4, 7.6), ('winda', 7.6, 10.6), ('bateria', 10.6, 13.4), ('godzina', 13.4, 16.2), ('rytm', 16.2, 19.0), ('autobus', 19.0, 22.4), ('klatka', 22.4, 25.4), ('przewodnik', 25.4, 28.8), ('liczy', 28.8, 31.8), ('zasada1', 31.8, 35.2), ('bartek', 35.2, 38.0), ('gwizd', 38.0, 40.6), ('mrug', 40.6, 43.0), ('ciemno', 43.0, 45.4), ('krzyk', 45.4, 48.2), ('zasada2', 48.2, 52.0), ('sam', 52.0, 55.0), ('bateria2', 55.0, 57.6), ('kapanie', 57.6, 60.2), ('lampa', 60.2, 63.2), ('kroki', 63.2, 65.8), ('sylwetka', 65.8, 68.8), ('glos', 68.8, 72.2), ('reka', 72.2, 74.8), ('zasada3', 74.8, 78.4), ('nie', 78.4, 81.0), ('usmiech', 81.0, 83.8), ('latarki', 83.8, 86.8), ('ulga', 86.8, 90.2), ('winda2', 90.2, 93.2), ('liczenie', 93.2, 96.2), ('karta21', 96.2, 100.0), ('kto', 100.0, 103.2), ('autobus2', 103.2, 106.4), ('szept', 106.4, 109.8), ('epilog', 109.8, 114.4), ('end', 114.4, 119.4)]
SEG = [
    ['karta', 0.15, '[storytelling, tense, slow] To jest Skarbnik. Duch kopalni.'],
    ['gleboko', 0.15, '[storytelling, tense] Jesteś trzysta dwadzieścia metrów pod ziemią.'],
    ['winda', 0.15, '[storytelling, tense] Winda na górę przyjedzie za piętnaście minut.'],
    ['bateria', 0.15, '[storytelling, tense] A twoja lampka wytrzyma pięć.'],
    ['godzina', 0.15, '[storytelling, tense] Jest trzynasta zero jeden. Ale tu, na dole, zawsze jest noc.'],
    ['rytm', 0.15, '[whispering] Światło. Bliżej. Krok. Krok.'],
    ['autobus', 0.15, '[storytelling] Zaczęło się od wycieczki klasowej. Do starej kopalni na Śląsku.'],
    ['klatka', 0.15, '[storytelling] Klatka szybowa runęła w dół. Zatkało ci uszy.'],
    ['przewodnik', 0.15, '[serious, old miner, Silesian accent] Słuchejcie. Na dole sie niy gwiżdże. Skarbnik tego niy lubi.', 'przewodnik'],
    ['liczy', 0.15, '[storytelling] Przewodnik policzył was. Dwadzieścioro.'],
    ['zasada1', 0.15, '[storytelling] Szliście chodnikiem gęsiego. Kawałek po kawałku, coraz głębiej.'],
    ['bartek', 0.15, '[storytelling, tense] Bartek się zaśmiał. I zagwizdał.'],
    ['gwizd', 0.15, '[storytelling, tense] Gwizd poniósł się echem w głąb chodnika.'],
    ['mrug', 0.15, '[whispering] Lampy zamrugały.'],
    ['ciemno', 0.15, '[storytelling, tense] I zgasły. Wszystkie naraz.'],
    ['krzyk', 0.15, '[storytelling, urgent] Ktoś krzyknął. Wszyscy rzucili się do biegu.'],
    ['zasada2', 0.15, '[storytelling, tense] A ty stanąłeś jak wryty. Nie widziałeś nawet własnych rąk.'],
    ['sam', 0.15, '[storytelling, tense] Zapalasz lampkę na kasku. Jesteś sam.'],
    ['bateria2', 0.15, '[whispering] Bateria mruga. Dziesięć procent.'],
    ['kapanie', 0.15, '[whispering] Kap. Kap. Gdzieś daleko kapie woda.'],
    ['lampa', 0.15, '[storytelling, tense] W głębi chodnika pojawia się lampa. Stara. Zielona.'],
    ['kroki', 0.15, '[whispering] Zbliża się. Powoli.'],
    ['sylwetka', 0.15, '[storytelling, tense] Wysoki górnik. W czarnym czaku z pióropuszem.'],
    ['glos', 0.15, '[deep, slow, creepy, friendly] Zgubiłeś sie, synku? Pódź. Pokażę ci drogę.', 'skarbnik'],
    ['reka', 0.15, '[whispering] Wyciąga rękę. Długie, czarne palce.'],
    ['zasada3', 0.15, '[whispering] Coś w tym głosie było nie tak. Za stary. Za spokojny.'],
    ['nie', 0.15, '[scared, trying to be brave] Nie. Czekam na przewodnika.', 'kuba'],
    ['usmiech', 0.15, '[whispering] Uśmiechnął się. I jego lampa zgasła.'],
    ['latarki', 0.15, '[shouting, worried] Kuba! Jesteś tu?!', 'przewodnik'],
    ['ulga', 0.15, '[storytelling] Światła wracają. Grupa stała dziesięć metrów dalej.'],
    ['winda2', 0.15, '[storytelling] Winda przyjeżdża punktualnie. Wyjeżdżacie na górę.'],
    ['liczenie', 0.15, '[storytelling, tense] Na górze przewodnik liczy was jeszcze raz.'],
    ['karta21', 0.15, '[storytelling, tense, slow] Zjechało was dwadzieścioro. Wyjechało… dwadzieścia jeden.'],
    ['kto', 0.15, '[whispering] Nikt nie wie, czyje to dziecko.'],
    ['autobus2', 0.15, '[whispering] W autobusie siada tuż za tobą. Cały w węglowym pyle.'],
    ['szept', 0.15, '[whispering, deep, creepy] Teraz ja… pokażę ci drogę.', 'skarbnik'],
    ['epilog', 0.15, '[storytelling] Śląscy górnicy naprawdę wierzyli w Skarbnika. Pod ziemią nie gwizdano, żeby go nie rozgniewać.'],
    ['end', 0.15, '[whispering, deep, creepy] Zagwiżdż… jeszcze raz.', 'skarbnik'],
]
SKIP = ['tik']
AUDIO = {'bed': ([0, 119.39], [-34, -34]),
 'heartbeat': ([0, 48.2, 60.2, 68.8, 83.8, 100.0, 106.4, 109.8, 119.39], [-90, -12, -10, -6, -90, -12, -6, -90, -90]),
 'loops': {'drone': ([0, 43.0, 68.8, 86.8, 96.2, 109.8, 114.4], [-40, -18, -8, -24, -8, -26, -30]),
           'groza': ([0, 0.2, 19.0, 43.0, 60.2, 68.8, 83.8, 93.2, 96.2, 106.4, 109.8, 119.39], [-60, -10, -26, -14, -10, -5, -18, -16, -6, -4, -16, -40]),
           'roomtone': ([0, 119.39], [-36, -36]),
           'tension': ([0, 19.0, 43.0, 68.8, 86.8, 96.2, 109.8, 119.39], [-18, -28, -14, -7, -16, -6, -24, -40]),
           'wind': ([0, 119.39], [-34, -34])}}
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -22)], 'hit': [('boom', -3)], 'jolt': [('jolt', -2)], 'scrape': [('scrape', -4)], 'creak': [('creak', -4)], 'steps': [('run', -6)],
           'slam': [('slam', -2)], 'switch': [('poweroff', -3)]}
EXTRA = [(0.1, 'hit_low', -4), (7.6, 'hit_low', -6), (16.3, 'hit_low', -3), (17.1, 'hit_low', -6), (17.9, 'hit_low', -3), (43.25, 'hit_low', 0), (43.25, 'sting', -3), (65.8, 'hit_low', -3), (68.8, 'sting', -5), (72.2, 'hit_low', -3), (79.0, 'riser', -8), (83.0, 'hit_low', 0), (83.0, 'sting', -4), (95.9, 'riser', -5), (99.9, 'hit_low', 0), (99.9, 'sting', -2), (106.0, 'riser', -6), (109.2, 'hit_low', 0), (109.2, 'sting', 0), (114.4, 'hit_low', -2), (116.9, 'sting', -3), (19.0, 'hit_low', -9), (31.8, 'hit_low', -9), (48.2, 'hit_low', -9), (60.2, 'hit_low', -9), (74.8, 'hit_low', -9), (86.8, 'hit_low', -9), (93.2, 'hit_low', -9)]
