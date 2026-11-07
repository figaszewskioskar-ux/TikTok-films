"""Konfiguracja BLOK 94 · „Kto tam?” CZĘŚĆ 4 — „Nie czekaj do rana!”"""
VOICE = 'eodmrbuYw8DsHyDR5b6f'   # lektor: Victor
MODEL = 'eleven_multilingual_v2'
SETTINGS = {'stability': 0.5, 'similarity_boost': 0.8, 'style': 0.2, 'use_speaker_boost': True}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {
    'ola':      ('d4Z5Fvjohw3zxGpV8XUV', 'eleven_v3', V3),   # Maria
    'kuba':     ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3),   # Kamil
    'zdzisiek': ('xsSg7GkDPDhaGZpbKOLn', 'eleven_v3', V3),   # Tomasz Z - Expressive and Deep (starszy)
    'kaptur':   ('rUOVqZ1ISbf2yl2Vbpwa', 'eleven_v3', V3),   # Ryszard
}
SQUEEZE = 0.8
SCENES = [('hook', 0, 6), ('recap', 6, 12), ('decide', 12, 22), ('night', 22, 30), ('locks', 30, 40), ('chain', 40, 48),
          ('zdz', 48, 58), ('chase', 58, 66), ('up', 66, 74), ('end', 74, 84)]
SEG = [
    ['hook', 0.1, 'Jeśli ktoś ma klucze do twojego mieszkania… nie czekaj do rana z wymianą zamka.'],
    ['hook', 3.6, 'Noc jest dla niego.'],
    ['recap', 0.2, 'Część czwarta. Kaptur ma klucze Kuby. Z numerem mieszkania na breloczku.'],
    ['decide', 0.4, '[worried] Zadzwońmy na policję…', 'ola'],
    ['decide', 3.4, '[annoyed] I co powiemy? Że zgubiłem klucze? Rano wymienimy zamek.', 'kuba'],
    ['decide', 6.6, 'Mamy łańcuch. Nic się nie stanie.', 'kuba'],
    ['decide', 8.8, 'Błąd pierwszy. Ktoś ma ich klucze… a oni czekają do rana.'],
    ['night', 0.3, 'Trzecia dwanaście.'],
    ['night', 1.6, 'Ola budzi się od dźwięku, którego nie da się pomylić. Metal w zamku.'],
    ['locks', 0.3, 'Górny zamek przekręca się sam.'],
    ['locks', 2.6, 'Klucz pasuje. Kuba stoi w przedpokoju. Nie oddycha.'],
    ['locks', 4.6, 'Drugi zamek. Też.'],
    ['chain', 0.3, 'Drzwi się uchylają. Łańcuch trzyma. Na razie.'],
    ['chain', 2.0, 'Ręka w rękawiczce znowu szuka łańcucha.'],
    ['chain', 3.8, 'Kuba rzuca się na drzwi i dociska je barkiem.'],
    ['zdz', 0.3, 'I nagle klatkę zalewa światło latarki.'],
    ['zdz', 2.2, '[shouting] Ej, ty! Ja tu znam wszystkich. Ciebie też poznam!', 'zdzisiek'],
    ['zdz', 6.0, 'Pan Zdzisiek pilnował klatki od dwóch nocy.'],
    ['chase', 0.2, 'Kuba otwiera drzwi. Chce gonić.'],
    ['chase', 1.2, '[shouting] Kuba, stój! Nie goń!', 'zdzisiek'],
    ['chase', 2.6, 'Błąd drugi. Nie gonisz obcego po ciemnej klatce.'],
    ['chase', 4.8, 'Ktoś ma twoje klucze? Zamek wymieniasz tej samej nocy. A do tego czasu dzwonisz na sto dwanaście.'],
    ['up', 0.3, 'Ale Kaptur nie uciekł na dół.'],
    ['up', 1.6, 'Pobiegł w górę. Na dziesiąte piętro.'],
    ['up', 4.2, 'Drzwi sto cztery zamknęły się cicho. Mieszkanie dokładnie nad pokojem Oli.'],
    ['end', 0.3, 'Policja przeszukuje klatkę do rana. Nikogo nie znajduje.'],
    ['end', 3.0, 'A w nocy Ola słyszy pukanie. Z sufitu.'],
    ['end', 6.4, '[whispers] Dobranoc, sąsiadko.', 'kaptur'],
]
VFILTER = {'kaptur': 'lowpass=f=3200,aecho=0.7:0.6:60:0.35', 'ola': 'highpass=f=110', 'kuba': 'highpass=f=100',
           'zdzisiek': 'highpass=f=90,aecho=0.6:0.4:40:0.25'}
VGAIN = {'kaptur': 1.3, 'ola': 0.95}
SFX = {
    'keyturn':   (2,  False, 'key slowly turning inside an apartment door lock at night, metallic clicks, lock opening'),
    'scrape':    (3,  False, 'metal key scraping inside a lock, quiet, night'),
    'stairsup':  (3,  False, 'someone running fast up concrete stairs in apartment stairwell, echo'),
    'doorclose': (2,  False, 'apartment door upstairs closing quietly, soft click, echo in stairwell'),
    'ceiling':   (6,  False, 'slow heavy footsteps on the floor of the apartment above, heard through ceiling, muffled'),
}
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 6, 12, 22, 30, 40, 44.4, 44.6, 48, 58, 66, 74, 76.8, 77.0, 80, 83.99],
         [-27, -29, -32, -28, -24, -21, -20, -30, -26, -28, -24, -27, -23, -60, -24, -22]),
    loops={'roomtone': ([0, 83.99], [-40, -40])},
    heartbeat=([0, 22, 24, 40, 44.4, 44.6, 74, 76, 83.99], [-90, -90, -27, -20, -18, -90, -90, -25, -20]),
)
REALMAP = {
    'keyturn': [('keyturn', -5)], 'scrape': [('scrape', -10)], 'chain': [('chain', -6)], 'slam': [('slam', -2), ('boom', -8)],
    'doorlock': [('doorlock', -9)], 'stairsup': [('stairsup', -10)], 'doorclose': [('doorclose', -9)],
    'knock': [('knock', -4)], 'boom': [('boom', -6)], 'stab': [('boom', -5)], 'whoosh': [('whoosh', -18)],
    'error': [('boom', -7)], 'hit': [('boom', -1)],
}
EXTRA = [(75.0, 'ceiling', -14), (43.0, 'breath', -16)]
