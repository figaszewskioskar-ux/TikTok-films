"""BLOK 94 · „Kto tam?” ODC. 9 — „Nie klikaj w link!”. Wersja do akceptacji: bez lektora (PREVIEW)."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'   # lektor: Victor
MODEL = 'eleven_multilingual_v2'
SETTINGS = {'stability': 0.32, 'similarity_boost': 0.85, 'style': 0.55, 'use_speaker_boost': True, 'speed': 0.9}   # lektor B (wybrany przez użytkownika)
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {
    'ola':       ('d4Z5Fvjohw3zxGpV8XUV', 'eleven_v3', V3),
    'kuba':      ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3),
    'zdzisiek':  ('xsSg7GkDPDhaGZpbKOLn', 'eleven_v3', V3),
    'kaptur':    ('rUOVqZ1ISbf2yl2Vbpwa', 'eleven_v3', V3),
    'policjant': ('JWUOwsYG4XgR9Od3eeon', 'eleven_v3', V3),
    'mama':      ('EXAVITQu4vr4xnSDxMaL', 'eleven_v3', V3),
    'mama_tel':  ('EXAVITQu4vr4xnSDxMaL', 'eleven_v3', V3),
}
SCENES = [('hook', 0, 6), ('recap', 6, 12), ('turn', 12, 24), ('reply', 24, 34), ('click', 34, 44), ('ola', 44, 54),
          ('police', 54, 68), ('stairs', 68, 82), ('notif', 82, 98), ('end', 98, 118)]
SEG = [
    # wersja 2: więcej dialogów; lektor nie czyta zasad ani błędów (są tylko na kartach)
    ['hook', 0.2, 'Obcy obiecuje odpowiedź. Wystarczy kliknąć.'],
    ['recap', 0.2, 'Poprzednio: kamerka w laptopie zapaliła się sama. Na podglądzie ktoś stał za Kubą.'],
    ['turn', 0.3, '[shouting] Ola! Chodź tu! Szybko!', 'kuba'],
    ['turn', 3.6, '[scared] Kuba?! Co się stało?', 'ola'],
    ['turn', 5.6, '[scared] Na kamerce… ktoś stoi za mną.', 'kuba'],
    ['turn', 7.6, '[whispers] Kuba… tam nikogo nie ma.', 'ola'],
    ['turn', 9.4, '[shocked] To nagranie… z wczoraj. Trzecia dwanaście.', 'kuba'],
    ['turn', 11.0, '[whispers] On był… w naszym domu?', 'ola'],
    ['reply', 0.2, 'Na laptopie wiadomość od „Kaptur dziewięćdziesiąt cztery”. Link.'],
    ['reply', 2.0, 'Nie odpisuj mu!', 'ola'],
    ['reply', 3.2, '[angry] Muszę wiedzieć, kim on jest!', 'kuba'],
    ['reply', 6.4, '[whispers] Teraz wie, że się boisz.', 'ola'],
    ['click', 0.3, 'Ochrona konta… to może pomóc.', 'kuba'],
    ['click', 1.7, '[shouting] Kuba, to pułapka!', 'ola'],
    ['click', 5.0, '[scared] Ja tego nie robię! Kursor rusza się sam!', 'kuba'],
    ['ola', 0.5, '[angry] Kuba, zostaw to! Nie klikaj!', 'ola'],
    ['ola', 2.4, 'Wyciąga wtyczkę od internetu. I dzwoni do mamy.'],
    ['ola', 2.8, '[crying] Mamo, ktoś jest w naszym laptopie. Wróć, proszę.', 'ola'],
    ['ola', 6.0, 'Nic nie ruszajcie. Już jadę.', 'mama_tel'],
    ['police', 0.2, 'Rano przychodzi dzielnicowy.'],
    ['police', 1.0, 'Nie usuwajcie niczego. To są dowody.', 'policjant'],
    ['police', 4.6, 'Co mamy teraz zrobić?', 'mama'],
    ['police', 6.4, 'Hasła zmieńcie na innym urządzeniu. I włączcie weryfikację dwuetapową.', 'policjant'],
    ['police', 10.4, '[sad] To przeze mnie… kliknąłem.', 'kuba'],
    ['stairs', 0.2, 'Mama wynosi laptop do serwisu.'],
    ['stairs', 1.2, 'Na klatce pan Zdzisiek.'],
    ['stairs', 1.6, 'W nocy ktoś chodził po dachu. Słyszałem.', 'zdzisiek'],
    ['stairs', 4.0, 'Po dachu? Przecież wyjście jest zamknięte.', 'ola'],
    ['stairs', 5.3, 'Na kłódkę. Od lat.', 'zdzisiek'],
    ['stairs', 6.4, 'Dziesiąte piętro. Mieszkanie sto cztery zaplombowane przez policję.'],
    ['stairs', 9.2, 'A pod drzwiami… pali się światło.'],
    ['notif', 0.2, 'Noc. Internet jest wyłączony. Wszyscy śpią. Telefon Oli się zapala.'],
    ['notif', 4.2, 'Bluetooth. „Kaptur dziewięćdziesiąt cztery” chce udostępnić zdjęcie.'],
    ['notif', 10.2, 'Ola nie powinna tego otwierać. Ale palec sam dotyka ekranu.'],
    ['end', 0.2, 'Zdjęcie. Łóżko Oli. Z perspektywy drzwi. Zrobione… teraz.'],
    ['end', 5.2, 'Ola nie oddycha. Za jej plecami drzwi pokoju powoli się uchylają.'],
    ['end', 13.4, '[whispers] Dobranoc, Ola.', 'kaptur'],
]
VFILTER = {'mama': 'highpass=f=120', 'mama_tel': 'highpass=f=350,lowpass=f=3200,acompressor', 'ola': 'highpass=f=110', 'zdzisiek': 'highpass=f=90', 'policjant': 'highpass=f=90', 'kaptur': 'lowpass=f=3400,aecho=0.6:0.4:30:0.3'}
VGAIN = {'kaptur': 1.6}
MAXK = 1.5
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 117.99], [-34, -34]),
    # muzyka grozy (cache/sfx/groza.wav): narasta przy akcji, opada po niej, cisza po uderzeniu
    loops={'groza': ([0, .3, 5.5, 6.5, 12, 15.5, 17.6, 20, 24, 28, 30.2, 33, 34, 37, 39.5, 43.5, 44.5, 50, 54, 60, 68, 72, 76.5, 80.5, 82.5,
                      86, 92, 96.5, 98, 103, 107.3, 111.3, 111.45, 112.5, 117.99],
                     [-60, -12, -12, -22, -22, -14, -7, -16, -22, -18, -9, -18, -18, -12, -9, -7, -18, -26, -30, -30, -28, -20, -14, -9, -24,
                      -22, -16, -9, -14, -12, -8, -4, -70, -20, -30]),
           'tension': ([0, 117.99], [-30, -30]),
           'drone': ([0, 98, 111.3, 111.45, 117.99], [-30, -24, -14, -60, -60]),
           'roomtone': ([0, 117.99], [-40, -40])},
    heartbeat=([0, 12, 14, 24, 34, 38, 44, 82, 86, 98, 111.3, 111.4, 117.99], [-90, -90, -18, -16, -90, -16, -90, -90, -16, -14, -6, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -18)], 'creak': [('creak', -10)], 'hit': [('boom', -3)],
           'notif': [('notif', -9)], 'error': [('boom', -8)], 'click': [('tap', -10)], 'slam': [('slam', -5)],
           'knock': [('knock', -5)], 'door': [('doorclose', -10)], 'vib': [('vibrate', -8)]}
EXTRA = [(111.35, 'hit_low', 0), (111.35, 'sting', -3), (107.3, 'riser', -6), (90.0, 'breath', -10), (104.0, 'breath', -8), (0.2, 'hit_low', -6), (6, 'hit_low', -6), (12, 'hit_low', -6), (17.4, 'hit_low', -2), (24, 'hit_low', -6), (29.4, 'hit_low', -6), (34, 'hit_low', -6), (38.6, 'hit_low', -2), (44, 'hit_low', -6), (54, 'hit_low', -6), (63, 'hit_low', -6), (68, 'hit_low', -6), (74.4, 'hit_low', -6), (82, 'hit_low', -6), (88, 'hit_low', -6), (98, 'hit_low', -6), (104, 'hit_low', -6)]
