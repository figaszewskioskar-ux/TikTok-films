"""NOCNY N94 · ODC. 2 — „Nie pisz, gdzie jesteś!”. Lektor B + głosy postaci."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'   # lektor: Victor (ustawienia B)
MODEL = 'eleven_multilingual_v2'
SETTINGS = {'stability': 0.32, 'similarity_boost': 0.85, 'style': 0.55, 'use_speaker_boost': True, 'speed': 0.9}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {
    'ola':       ('d4Z5Fvjohw3zxGpV8XUV', 'eleven_v3', V3),
    'pasazer':   ('rUOVqZ1ISbf2yl2Vbpwa', 'eleven_v3', V3),
    'kasjerka':  ('EXAVITQu4vr4xnSDxMaL', 'eleven_v3', V3),
    'policjant': ('JWUOwsYG4XgR9Od3eeon', 'eleven_v3', V3),
    'mama':      ('XrExE9yKIg1WjnnlVkGX', 'eleven_v3', V3),
}
VFILTER = {'ola': 'highpass=f=110', 'kasjerka': 'highpass=f=120', 'policjant': 'highpass=f=90', 'mama': 'highpass=f=120', 'pasazer': 'lowpass=f=5200,aecho=0.5:0.3:25:0.2'}
VGAIN = {'pasazer': 1.3}
SCENES = [('hook', 0, 6), ('recap', 6, 12), ('turn', 12, 26), ('police', 26, 44), ('story', 44, 60), ('car', 60, 76), ('home', 76, 96), ('end', 96, 120)]
SEG = [
    ['hook', 0.2, 'Jedna relacja. A ktoś już wiedział, gdzie jej szukać.'],
    ['recap', 0.2, 'Poprzednio: na monitorze kamer on stał tuż za Olą.'],
    ['turn', 0.4, 'Ola się odwraca.'],
    ['turn', 2.6, '[scared] Był tu… na monitorze. Tuż za tobą.', 'kasjerka'],
    ['turn', 6.4, '[shaky] Tylne drzwi… były zamknięte.', 'kasjerka'],
    ['turn', 9.6, '[scared] Proszę… niech pani je zamknie.', 'ola'],
    ['police', 0.6, 'Jak wyglądał?', 'policjant'],
    ['police', 2.6, '[shaky] Płaszcz, kapelusz… i ten uśmiech.', 'ola'],
    ['police', 5.6, 'Powiedział twoje imię? Skąd je znał?', 'policjant'],
    ['police', 8.6, 'Ola patrzy na swój plecak.'],
    ['police', 10.4, 'Stąd. Każdy w autobusie to widział.', 'policjant'],
    ['story', 0.3, 'Relacja z przystanku. Wrzucona za dwadzieścia pierwsza.'],
    ['story', 3.4, 'Pierwsze wyświetlenie… minutę później.'],
    ['story', 9.0, '[whispers] On to widział… zanim wsiadł.', 'ola'],
    ['car', 0.8, '[soft] Już dobrze, córcia. Jesteś bezpieczna.', 'mama'],
    ['car', 3.4, 'Następnym razem dzwoń. Przyjadę po ciebie.', 'mama'],
    ['car', 6.0, '[quiet] Dobrze, mamo.', 'ola'],
    ['home', 0.4, 'Kasztanowa dwanaście. Mieszkanie dziewięćdziesiąt cztery.'],
    ['home', 4.4, 'Ola usuwa relację. Ustawia konto prywatne. Blokuje go.'],
    ['end', 0.4, 'Za oknem hamuje autobus.'],
    ['end', 3.4, 'Nocny N94. Na przystanku nikt nie czeka.'],
    ['end', 6.8, 'W oświetlonym oknie stoi on. I macha.'],
    ['end', 10.4, 'Tablica autobusu się zmienia.'],
    ['end', 12.4, '[whispers] Jutro też wracasz nocnym… Ola?', 'pasazer'],
]
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 119.99], [-34, -34]),
    loops={'groza': ([0, .3, 5.5, 6.5, 12, 13, 16, 20, 26, 32, 36.4, 40, 44, 48, 52, 60, 66, 76, 84, 92, 96, 100, 104, 108, 111.55, 111.7, 113, 119.99],
                     [-60, -12, -12, -20, -20, -8, -10, -14, -16, -14, -8, -14, -16, -10, -9, -20, -24, -26, -22, -18, -14, -10, -9, -7, -4, -70, -22, -30]),
           'tension': ([0, 12, 44, 96, 111.55, 111.7, 119.99], [-32, -26, -22, -20, -14, -60, -60]),
           'drone': ([0, 96, 111.55, 111.7, 119.99], [-30, -24, -14, -60, -60]),
           'wind': ([0, 16, 16.1, 24, 24.1, 96, 119.99], [-90, -90, -30, -30, -90, -90, -90]),
           'roomtone': ([0, 119.99], [-40, -40])},
    heartbeat=([0, 12, 14, 26, 44, 48, 60, 96, 104, 111.5, 111.6, 119.99], [-90, -90, -14, -90, -90, -14, -90, -90, -14, -6, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -18)], 'creak': [('creak', -8)], 'hit': [('boom', -3)],
           'notif': [('notif', -9)], 'error': [('boom', -8)], 'click': [('tap', -8)], 'door': [('doorclose', -10)]}
EXTRA = [(111.6, 'hit_low', 0), (111.6, 'sting', -3), (107.6, 'riser', -6), (13.0, 'hit_low', -2), (16.0, 'sting', -9), (36.4, 'hit_low', -2), (48.0, 'sting', -9),
         (105.0, 'hit_low', -2), (14.0, 'breath', -10), (100.0, 'breath', -8)] + [(t, 'hit_low', -6) for t in (0.2, 6, 12, 26, 44, 60, 76, 96)]
MAXK = 1.5
