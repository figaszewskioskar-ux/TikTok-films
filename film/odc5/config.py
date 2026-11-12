"""Konfiguracja BLOK 94 · „Kto tam?” CZĘŚĆ 4 — „Nie czekaj do rana!”"""
VOICE = 'eodmrbuYw8DsHyDR5b6f'   # lektor: Victor
MODEL = 'eleven_multilingual_v2'
SETTINGS = {'stability': 0.32, 'similarity_boost': 0.85, 'style': 0.55, 'use_speaker_boost': True, 'speed': 0.9}   # lektor B
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
    # wersja 2: więcej dialogów; lektor nie czyta zasad ani błędów (są tylko na kartach)
    ['hook', 0.2, 'Trzecia dwanaście. Ktoś przekręca klucz w twoich drzwiach.'],
    ['recap', 0.2, 'Poprzednio: Kaptur ma klucze Kuby. Z numerem mieszkania na breloczku.'],
    ['decide', 0.4, '[worried] Kuba, on ma nasze klucze. Z numerem mieszkania.', 'ola'],
    ['decide', 2.1, '[worried] Zadzwońmy na policję…', 'ola'],
    ['decide', 3.4, '[annoyed] I co powiemy? Że zgubiłem klucze? Rano wymienimy zamek.', 'kuba'],
    ['decide', 6.6, 'Mamy łańcuch. Nic się nie stanie.', 'kuba'],
    ['night', 0.3, 'Trzecia dwanaście.'],
    ['night', 1.6, 'Ola budzi się od dźwięku, którego nie da się pomylić. Metal w zamku.'],
    ['locks', 0.3, 'Górny zamek przekręca się sam.'],
    ['locks', 2.2, '[whispers] Kuba… to nasz klucz.', 'ola'],
    ['locks', 4.6, 'Drugi zamek. Też.'],
    ['locks', 6.0, '[whispers, scared] Ola, dzwoń na sto dwanaście. Już!', 'kuba'],
    ['chain', 0.3, 'Drzwi się uchylają. Łańcuch trzyma. Na razie.'],
    ['chain', 2.0, 'Ręka w rękawiczce szuka łańcucha. Kuba dociska drzwi barkiem.'],
    ['chain', 5.0, '[scared] Halo, sto dwanaście? Ktoś otwiera nasze drzwi kluczem!', 'ola'],
    ['zdz', 0.3, 'I nagle klatkę zalewa światło latarki.'],
    ['zdz', 2.2, '[shouting] Ej, ty! Ja tu znam wszystkich. Ciebie też poznam!', 'zdzisiek'],
    ['chase', 0.2, '[angry] Puść mnie! Dorwę go!', 'kuba'],
    ['chase', 1.3, '[shouting] Kuba, stój! Nie goń!', 'zdzisiek'],
    ['chase', 4.0, 'Policja już jedzie. Wracaj do siostry.', 'zdzisiek'],
    ['up', 0.3, 'Ale Kaptur nie uciekł na dół.'],
    ['up', 1.6, 'Pobiegł w górę. Na dziesiąte piętro.'],
    ['up', 4.2, 'Drzwi sto cztery zamknęły się cicho. Dokładnie nad pokojem Oli.'],
    ['end', 0.3, 'Policja przeszukuje klatkę do rana. Nikogo nie znajduje.'],
    ['end', 3.0, 'A w nocy… pukanie. Z sufitu.'],
    ['end', 4.6, '[whispers] Ola… to z mieszkania nad nami.', 'kuba'],
    ['end', 7.4, '[whispers] Dobranoc, sąsiadko.', 'kaptur'],
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
    bed=([0, 83.99], [-34, -34]),
    loops={'groza': ([0, .3, 5.5, 6.5, 12, 18, 22, 25, 30, 33, 37, 40, 43, 44.6, 48, 50, 56, 58, 62, 66, 70, 74, 77, 81.55, 81.7, 82.5, 83.99],
                     [-60, -12, -12, -22, -22, -20, -18, -12, -10, -8, -8, -7, -6, -10, -12, -9, -14, -12, -16, -14, -10, -16, -9, -4, -70, -22, -30]),
           'tension': ([0, 22, 40, 66, 81.55, 81.7, 83.99], [-32, -26, -20, -20, -14, -60, -60]),
           'drone': ([0, 70, 81.55, 81.7, 83.99], [-30, -24, -14, -60, -60]),
           'roomtone': ([0, 83.99], [-40, -40])},
    heartbeat=([0, 22, 24, 30, 40, 44.4, 44.6, 74, 77, 81.5, 81.6, 83.99], [-90, -90, -18, -14, -10, -8, -90, -90, -14, -6, -90, -90]),
)
REALMAP = {
    'keyturn': [('keyturn', -5)], 'scrape': [('scrape', -10)], 'chain': [('chain', -6)], 'slam': [('slam', -2), ('boom', -8)],
    'doorlock': [('doorlock', -9)], 'stairsup': [('stairsup', -10)], 'doorclose': [('doorclose', -9)],
    'knock': [('knock', -4)], 'boom': [('boom', -6)], 'stab': [('boom', -5)], 'whoosh': [('whoosh', -18)],
    'error': [('boom', -7)], 'hit': [('boom', -1)],
}
EXTRA = [(81.6, 'hit_low', 0), (81.6, 'sting', -3), (77.6, 'riser', -6), (31.0, 'hit_low', -2), (34.6, 'hit_low', -2), (44.6, 'hit_low', -1), (48.6, 'sting', -8), (70.0, 'sting', -9)] + [(t, 'hit_low', -6) for t in (0.2, 6, 12, 22, 30, 40, 48, 58, 66, 74)]

# przerobiony na prośbę użytkownika (wersja 2): wydłużony do ok. 2 minut
MAXK = 1.5
