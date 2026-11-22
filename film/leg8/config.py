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
SCENES = [('karta', 0, 3.4), ('gleboko', 3.4, 6.6), ('winda', 6.6, 9.6), ('bateria', 9.6, 12.4), ('godzina', 12.4, 15.2), ('rytm', 15.2, 18.0), ('autobus', 18.0, 21.4), ('klatka', 21.4, 24.4), ('przewodnik', 24.4, 27.8), ('liczy', 27.8, 30.8), ('zasada1', 30.8, 34.2), ('bartek', 34.2, 37.0), ('gwizd', 37.0, 39.6), ('mrug', 39.6, 42.0), ('ciemno', 42.0, 44.4), ('krzyk', 44.4, 47.2), ('zasada2', 47.2, 51.0), ('sam', 51.0, 54.0), ('bateria2', 54.0, 56.6), ('kapanie', 56.6, 59.2), ('lampa', 59.2, 62.2), ('kroki', 62.2, 64.8), ('sylwetka', 64.8, 67.8), ('glos', 67.8, 71.2), ('reka', 71.2, 73.8), ('zasada3', 73.8, 77.4), ('nie', 77.4, 80.0), ('usmiech', 80.0, 82.8), ('latarki', 82.8, 85.8), ('ulga', 85.8, 89.2), ('winda2', 89.2, 92.2), ('liczenie', 92.2, 95.2), ('karta21', 95.2, 99.0), ('kto', 99.0, 102.2), ('autobus2', 102.2, 105.4), ('szept', 105.4, 108.8), ('epilog', 108.8, 113.4), ('end', 113.4, 118.4)]
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
    ['zasada1', 0.15, '[storytelling, serious] Zasada pierwsza. Pod ziemią trzymasz się grupy. Zawsze.'],
    ['bartek', 0.15, '[storytelling, tense] Bartek się zaśmiał. I zagwizdał.'],
    ['gwizd', 0.15, '[storytelling, tense] Gwizd poniósł się echem w głąb chodnika.'],
    ['mrug', 0.15, '[whispering] Lampy zamrugały.'],
    ['ciemno', 0.15, '[storytelling, tense] I zgasły. Wszystkie naraz.'],
    ['krzyk', 0.15, '[storytelling, urgent] Ktoś krzyknął. Wszyscy rzucili się do biegu.'],
    ['zasada2', 0.15, '[storytelling, serious] Zasada druga. Gdy gaśnie światło, stoisz w miejscu. Bieg po ciemku kończy się upadkiem.'],
    ['sam', 0.15, '[storytelling, tense] Zapalasz lampkę na kasku. Jesteś sam.'],
    ['bateria2', 0.15, '[whispering] Bateria mruga. Dziesięć procent.'],
    ['kapanie', 0.15, '[whispering] Kap. Kap. Gdzieś daleko kapie woda.'],
    ['lampa', 0.15, '[storytelling, tense] W głębi chodnika pojawia się lampa. Stara. Zielona.'],
    ['kroki', 0.15, '[whispering] Zbliża się. Powoli.'],
    ['sylwetka', 0.15, '[storytelling, tense] Wysoki górnik. W czarnym czaku z pióropuszem.'],
    ['glos', 0.15, '[deep, slow, creepy, friendly] Zgubiłeś sie, synku? Pódź. Pokażę ci drogę.', 'skarbnik'],
    ['reka', 0.15, '[whispering] Wyciąga rękę. Długie, czarne palce.'],
    ['zasada3', 0.15, '[storytelling, serious] Zasada trzecia. Nigdy nie idziesz z obcym. Nawet jeśli mówi, że zna drogę.'],
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
AUDIO = dict(
    bed=([0, 118.39], [-34, -34]),
    loops={'groza': ([0, .2, 18.0, 42.0, 59.2, 67.8, 82.8, 92.2, 95.2, 105.4, 108.8, 118.39], [-60, -10, -26, -14, -10, -5, -18, -16, -6, -4, -16, -40]),
           'tension': ([0, 18.0, 42.0, 67.8, 85.8, 95.2, 108.8, 118.39], [-18, -28, -14, -7, -16, -6, -24, -40]),
           'wind': ([0, 118.39], [-34, -34]),
           'drone': ([0, 42.0, 67.8, 85.8, 95.2, 108.8, 113.4], [-40, -18, -8, -24, -8, -26, -30]),
           'roomtone': ([0, 118.39], [-36, -36])},
    heartbeat=([0, 47.2, 59.2, 67.8, 82.8, 99.0, 105.4, 108.8, 118.39], [-90, -12, -10, -6, -90, -12, -6, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -22)], 'hit': [('boom', -3)], 'jolt': [('jolt', -2)], 'scrape': [('scrape', -4)], 'creak': [('creak', -4)], 'steps': [('run', -6)],
           'slam': [('slam', -2)], 'switch': [('poweroff', -3)]}
EXTRA = [(0.1, 'hit_low', -4), (6.6, 'hit_low', -6), (15.3, 'hit_low', -3), (16.1, 'hit_low', -6), (16.9, 'hit_low', -3), (42.25, 'hit_low', 0), (42.25, 'sting', -3),
         (64.8, 'hit_low', -3), (67.8, 'sting', -5), (71.2, 'hit_low', -3), (78.0, 'riser', -8), (82.0, 'hit_low', 0), (82.0, 'sting', -4),
         (94.9, 'riser', -5), (98.9, 'hit_low', 0), (98.9, 'sting', -2), (105.0, 'riser', -6), (108.2, 'hit_low', 0), (108.2, 'sting', 0), (113.4, 'hit_low', -2), (115.9, 'sting', -3)] + [(t, 'hit_low', -9) for t in (18.0, 30.8, 47.2, 59.2, 73.8, 85.8, 92.2)]
