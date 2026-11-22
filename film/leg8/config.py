"""POLSKIE LEGENDY GROZY · SKARBNIK — własna historia na podstawie śląskich wierzeń (schemat haka WZOR_HOOK). Podgląd bez lektora."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'  # Victor
MODEL = 'eleven_v3'
SETTINGS = {'stability': 0.4, 'similarity_boost': 0.85}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {'kuba': ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3), 'przewodnik': ('JxVKcxm9wtnCYEs8V00p', 'eleven_v3', V3), 'skarbnik': ('bX8ZXtFbQtanSpI1KPZ1', 'eleven_v3', V3), 'dziadek': ('JWUOwsYG4XgR9Od3eeon', 'eleven_v3', V3)}
VFILTER = {'lektor': 'highpass=f=70,acompressor=threshold=-20dB:ratio=2.5,aecho=0.5:0.3:35:0.08', 'przewodnik': 'highpass=f=80,aecho=0.6:0.4:60:0.15',
           'skarbnik': 'asetrate=48000*0.8,aresample=48000,atempo=1.18,aecho=0.7:0.6:80|180:0.45|0.3'}
MAXK = 1.6
PREVIEW_NO_VOICE = True
TARGET = None
SQUEEZE = 0.75
SCENES = [('karta', 0, 4.4), ('gleboko', 4.4, 7.6), ('winda', 7.6, 10.6), ('bateria', 10.6, 13.4), ('godzina', 13.4, 16.2), ('rytm', 16.2, 19.0), ('dom', 19.0, 22.2), ('dziadek', 22.2, 25.6), ('autobus', 25.6, 29.0), ('klatka', 29.0, 32.0), ('przewodnik', 32.0, 35.4), ('liczy', 35.4, 38.4), ('zasada1', 38.4, 41.8), ('bartek', 41.8, 44.6), ('gwizd', 44.6, 47.2), ('mrug', 47.2, 49.6), ('ciemno', 49.6, 52.0), ('krzyk', 52.0, 54.8), ('zasada2', 54.8, 58.6), ('sam', 58.6, 61.6), ('bateria2', 61.6, 64.2), ('kapanie', 64.2, 66.8), ('lampa', 66.8, 69.8), ('kroki', 69.8, 72.4), ('sylwetka', 72.4, 75.4), ('glos', 75.4, 78.8), ('reka', 78.8, 81.4), ('zasada3', 81.4, 85.0), ('nie', 85.0, 87.6), ('usmiech', 87.6, 90.4), ('latarki', 90.4, 93.4), ('ulga', 93.4, 96.8), ('winda2', 96.8, 99.8), ('liczenie', 99.8, 102.8), ('karta21', 102.8, 106.6), ('kto', 106.6, 109.8), ('autobus2', 109.8, 113.0), ('szept', 113.0, 116.4), ('epilog', 116.4, 121.0), ('end', 121.0, 126.0)]
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
    ['epilog', 0.15, '[storytelling] Na Śląsku dziadkowie naprawdę mówili dzieciom: nie gwiżdż pod ziemią, bo Skarbnik cię zabierze.'],
    ['end', 0.15, '[whispering, deep, creepy] Zagwiżdż… jeszcze raz.', 'skarbnik'],
    ['dom', 0.15, '[storytelling] Twój dziadek trzydzieści lat fedrował na grubie. I zawsze powtarzał jedno.'],
    ['dziadek', 0.15, '[old man, serious, Silesian accent] Pod ziymiom niy gwiżdż, synek. Bo Skarbnik przyjdzie… i weźmie cię ze sobą.', 'dziadek'],
]
SKIP = ['tik']
AUDIO = {'bed': ([0, 125.99], [-34, -34]),
 'heartbeat': ([0, 54.8, 66.8, 75.4, 90.4, 106.6, 113.0, 116.4, 125.99], [-90, -12, -10, -6, -90, -12, -6, -90, -90]),
 'loops': {'drone': ([0, 49.6, 75.4, 93.4, 102.8, 116.4, 121.0], [-40, -18, -8, -24, -8, -26, -30]),
           'groza': ([0, 0.2, 25.6, 49.6, 66.8, 75.4, 90.4, 99.8, 102.8, 113.0, 116.4, 125.99], [-60, -10, -26, -14, -10, -5, -18, -16, -6, -4, -16, -40]),
           'roomtone': ([0, 125.99], [-36, -36]),
           'tension': ([0, 25.6, 49.6, 75.4, 93.4, 102.8, 116.4, 125.99], [-18, -28, -14, -7, -16, -6, -24, -40]),
           'wind': ([0, 125.99], [-34, -34])}}
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -22)], 'hit': [('boom', -3)], 'jolt': [('jolt', -2)], 'scrape': [('scrape', -4)], 'creak': [('creak', -4)], 'steps': [('run', -6)],
           'slam': [('slam', -2)], 'switch': [('poweroff', -3)]}
EXTRA = [(0.1, 'hit_low', -4), (7.6, 'hit_low', -6), (16.3, 'hit_low', -3), (17.1, 'hit_low', -6), (17.9, 'hit_low', -3), (49.85, 'hit_low', 0), (49.85, 'sting', -3), (72.4, 'hit_low', -3), (75.4, 'sting', -5), (78.8, 'hit_low', -3), (85.6, 'riser', -8), (89.6, 'hit_low', 0), (89.6, 'sting', -4), (102.5, 'riser', -5), (106.5, 'hit_low', 0), (106.5, 'sting', -2), (112.6, 'riser', -6), (115.8, 'hit_low', 0), (115.8, 'sting', 0), (121.0, 'hit_low', -2), (123.5, 'sting', -3), (25.6, 'hit_low', -9), (38.4, 'hit_low', -9), (54.8, 'hit_low', -9), (66.8, 'hit_low', -9), (81.4, 'hit_low', -9), (93.4, 'hit_low', -9), (99.8, 'hit_low', -9), (19.0, 'hit_low', -9), (23.4, 'hit_low', -4)]
