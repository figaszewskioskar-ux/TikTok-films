"""BLOK 94 · „Kto tam?” ODC. 10 — „Nie idź sprawdzać!”. Lektor B + głosy postaci (zaakceptowane)."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'   # lektor: Victor
MODEL = 'eleven_multilingual_v2'
SETTINGS = {'stability': 0.32, 'similarity_boost': 0.85, 'style': 0.55, 'use_speaker_boost': True, 'speed': 0.9}   # lektor B
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {
    'ola':       ('d4Z5Fvjohw3zxGpV8XUV', 'eleven_v3', V3),
    'kuba':      ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3),
    'zdzisiek':  ('xsSg7GkDPDhaGZpbKOLn', 'eleven_v3', V3),
    'kaptur':    ('rUOVqZ1ISbf2yl2Vbpwa', 'eleven_v3', V3),
    'policjant': ('JWUOwsYG4XgR9Od3eeon', 'eleven_v3', V3),
    'dyspozytor': ('JWUOwsYG4XgR9Od3eeon', 'eleven_v3', V3),
}
SCENES = [('hook', 0, 6), ('recap', 6, 11), ('door', 11, 25), ('hall', 25, 40), ('kitchen', 40, 54), ('call', 54, 69),
          ('stairs', 69, 86), ('police', 86, 100), ('end', 100, 120)]
SEG = [
    ['hook', 0.2, 'Zdjęcie zrobione sekundę temu. Z progu jej pokoju.'],
    ['recap', 0.2, 'Poprzednio: ktoś wysłał Oli zdjęcie jej łóżka. Przez Bluetooth. Z bliska.'],
    ['door', 0.2, 'Drzwi są uchylone. W szparze tylko ciemność.'],
    ['door', 3.0, '[whispers] Kuba…? To ty?', 'ola'],
    ['door', 6.4, 'Cisza. A potem… skrzypnięcie w przedpokoju.'],
    ['door', 10.2, 'Błąd pierwszy.'],
    ['hall', 0.2, 'Drzwi wejściowe są otwarte. Łańcuch wisi luźno.'],
    ['hall', 4.2, '[sleepy] Ola? Czemu nie śpisz?', 'kuba'],
    ['hall', 6.8, '[whispers] Drzwi… były otwarte.', 'ola'],
    ['hall', 9.4, '[scared] Zamykałem je! Na klucz, przysięgam!', 'kuba'],
    ['kitchen', 0.2, 'W kuchni świeci otwarta lodówka. Na stole coś leży.'],
    ['kitchen', 4.0, '[shocked] To moje klucze… te, co zgubiłem.', 'kuba'],
    ['kitchen', 6.6, '[whispers] Czyli on ma swoje.', 'ola'],
    ['kitchen', 8.8, '[angry] Dorwę go!', 'kuba'],
    ['kitchen', 10.4, '[shouting] Kuba, nie!', 'ola'],
    ['kitchen', 11.0, 'Błąd drugi.'],
    ['call', 0.2, 'Ola zamyka oba zamki. I dzwoni.'],
    ['call', 2.6, 'Numer alarmowy sto dwanaście. Co się stało?', 'dyspozytor'],
    ['call', 5.4, '[scared] Ktoś był w naszym mieszkaniu. Brat pobiegł za nim na klatkę.', 'ola'],
    ['call', 9.6, 'Zamknij drzwi i nie wychodź. Patrol już jedzie. Zostań ze mną na linii.', 'dyspozytor'],
    ['stairs', 0.2, 'Kuba biegnie po schodach. W górę.'],
    ['stairs', 3.0, 'Światło na klatce gaśnie.'],
    ['stairs', 5.0, '[shouting] Halo?! Wiem, że tu jesteś!', 'kuba'],
    ['stairs', 8.0, 'Dziesiąte piętro. Taśma na drzwiach sto cztery jest przecięta.'],
    ['stairs', 12.2, 'Ktoś łapie go za ramię.'],
    ['stairs', 13.0, 'Chłopcze! Do domu. Ale już.', 'zdzisiek'],
    ['stairs', 15.2, '[scared] On tam jest!', 'kuba'],
    ['police', 0.2, 'Patrol. Policjanci wchodzą do sto cztery.'],
    ['police', 4.4, 'Pusto. Nikogo tu nie ma.', 'policjant'],
    ['police', 9.4, 'Dobrze, że zadzwoniłaś i zostałaś w środku.', 'policjant'],
    ['end', 0.2, 'Za dwadzieścia czwarta. Kuba nie odchodzi od siostry.'],
    ['end', 4.2, 'Bluetooth. Ktoś udostępnia nagranie.'],
    ['end', 6.4, 'Z wnętrza szafy. W sto cztery. Kiedy policja tam była.'],
    ['end', 9.4, '[whispers] To… z szafy w sto cztery.', 'kuba'],
    ['end', 14.6, '[whispers] Tu też jest szafa…', 'kaptur'],
]
VFILTER = {'dyspozytor': 'highpass=f=350,lowpass=f=3200,acompressor', 'ola': 'highpass=f=110', 'kuba': 'highpass=f=100', 'zdzisiek': 'highpass=f=90', 'policjant': 'highpass=f=90', 'kaptur': 'lowpass=f=3400,aecho=0.6:0.4:30:0.3'}
VGAIN = {'kaptur': 1.6}
MAXK = 1.5
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 119.99], [-34, -34]),
    # muzyka grozy: narasta przy akcji, opada w spokojnych chwilach, cisza po uderzeniu
    loops={'groza': ([0, .3, 5.5, 6.5, 11, 16, 18, 21, 25, 26, 29, 33, 40, 43, 45, 49, 52, 54, 56, 63, 69, 72, 74, 79, 81.2, 83, 86,
                      90, 93, 95, 100, 104, 108, 112, 115.9, 116.05, 117, 119.99],
                     [-60, -12, -12, -22, -20, -14, -9, -12, -18, -12, -10, -16, -20, -12, -14, -8, -9, -16, -18, -20, -14, -10, -8, -9, -4, -16, -20,
                      -16, -18, -24, -26, -18, -14, -9, -4, -70, -22, -30]),
           'tension': ([0, 119.99], [-30, -30]),
           'drone': ([0, 100, 115.9, 116.05, 119.99], [-30, -24, -14, -60, -60]),
           'roomtone': ([0, 119.99], [-40, -40])},
    heartbeat=([0, 11, 13, 25, 40, 44, 54, 69, 72, 86, 100, 108, 115.9, 116.0, 119.99], [-90, -90, -18, -20, -90, -16, -90, -90, -14, -90, -90, -16, -6, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -18)], 'creak': [('creak', -8)], 'hit': [('boom', -3)],
           'notif': [('notif', -9)], 'error': [('boom', -8)], 'click': [('tap', -8)], 'slam': [('slam', -5)],
           'knock': [('knock', -5)], 'door': [('doorclose', -10)], 'vib': [('vibrate', -8)]}
EXTRA = [(115.95, 'hit_low', 0), (115.95, 'sting', -3), (111.9, 'riser', -6), (81.2, 'hit_low', -1), (81.2, 'sting', -8),
         (17.4, 'breath', -12), (30.0, 'breath', -12), (75.0, 'breath', -10), (108.0, 'breath', -8)] + \
        [(t, 'hit_low', -6) for t in (0.2, 6, 11, 25, 40, 54, 69, 86, 100)] + [(t, 'hit_low', -3) for t in (21.2, 51.6)]
