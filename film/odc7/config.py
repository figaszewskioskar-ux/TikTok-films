"""Konfiguracja BLOK 94 · „Kto tam?” CZĘŚĆ 6 — „Zamknij balkon na noc!”"""
VOICE = 'eodmrbuYw8DsHyDR5b6f'   # lektor: Victor
MODEL = 'eleven_multilingual_v2'
SETTINGS = {'stability': 0.32, 'similarity_boost': 0.85, 'style': 0.55, 'use_speaker_boost': True, 'speed': 0.9}   # lektor B
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {
    'zdzisiek':   ('xsSg7GkDPDhaGZpbKOLn', 'eleven_v3', V3),
    'kaptur':     ('rUOVqZ1ISbf2yl2Vbpwa', 'eleven_v3', V3),
    'zadrzwiami': ('rUOVqZ1ISbf2yl2Vbpwa', 'eleven_v3', V3),
    'ola':        ('d4Z5Fvjohw3zxGpV8XUV', 'eleven_v3', V3),
    'kuba':       ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3),
    'policjant':  ('JWUOwsYG4XgR9Od3eeon', 'eleven_v3', V3),
    'dyspozytor': ('JWUOwsYG4XgR9Od3eeon', 'eleven_v3', V3),
}
SQUEEZE = 0.8
SCENES = [('hook', 0, 6), ('recap', 6, 11), ('zdz', 11, 20), ('knock', 20, 28), ('curtain', 28, 38), ('call', 38, 46),
          ('run', 46, 54), ('police', 54, 62), ('note', 62, 66), ('back', 66, 76), ('end', 76, 86)]
SEG = [
    # wersja 2: więcej dialogów; lektor nie czyta zasad ani błędów (są tylko na kartach)
    ['hook', 0.1, 'Drugie piętro. Balkon uchylony. Ktoś to zauważył.'],
    ['recap', 0.2, 'Poprzednio: na ścianie w pustym mieszkaniu wisiało zdjęcie drzwi pana Zdziśka. Podpis: sam.'],
    ['zdz', 0.3, 'Pan Zdzisiek wie o zdjęciu. Nie śpi. Czeka.'],
    ['zdz', 2.7, 'Duszno jak w piecu…', 'zdzisiek'],
    ['zdz', 6.2, '[grumbling] Niech no tylko przyjdzie.', 'zdzisiek'],
    ['knock', 0.4, 'Za dwie dwunasta. Pukanie.'],
    ['knock', 1.4, '[whispers] Panie Zdzisiu… to ja, sąsiad. Otworzy pan?', 'zadrzwiami'],
    ['knock', 5.4, 'Pan Zdzisiek nie wstaje. Nie odzywa się.'],
    ['curtain', 0.4, 'Cisza. A potem… firanka się porusza.'],
    ['curtain', 4.4, 'Ktoś stoi na balkonie. Tuż za szybą.'],
    ['curtain', 7.0, '[whispers] Matko jedyna…', 'zdzisiek'],
    ['call', 0.2, 'Pan Zdzisiek zamyka się w łazience.'],
    ['call', 1.0, '[whispering, scared] Halo, sto dwanaście? Ktoś jest na moim balkonie!', 'zdzisiek'],
    ['call', 3.8, 'Patrol jedzie. Proszę się zamknąć i czekać.', 'dyspozytor'],
    ['call', 5.8, '[whispering, scared] Ola? Zamknijcie się! Ktoś jest u mnie na balkonie!', 'zdzisiek'],
    ['run', 0.1, '[shouting] Pan Zdzisiek ma kłopoty! Lecimy!', 'kuba'],
    ['run', 0.9, '[scared] Kuba, czekaj! Drzwi!', 'ola'],
    ['run', 1.5, '[shouting] Nie ma czasu!', 'kuba'],
    ['run', 4.8, 'Drzwi mieszkania zostają otwarte.'],
    ['police', 0.4, 'Policja jest po czterech minutach. Balkon jest pusty.'],
    ['police', 2.8, 'Pusto. Tylko ślady butów na barierce. I kartka.', 'policjant'],
    ['note', 0.6, '[whispers] Nie ciebie… szukałem.', 'zdzisiek'],
    ['note', 2.2, '[scared] To kogo szukał?', 'ola'],
    ['note', 3.2, '[scared] Ola… nasze drzwi!', 'kuba'],
    ['back', 0.1, 'Ola i Kuba wracają na dziewiąte.'],
    ['back', 1.5, '[scared] Kuba… nie zamknąłeś?', 'ola'],
    ['back', 2.0, '[whispers] Myślałem, że ty…', 'kuba'],
    ['back', 4.6, 'W pokoju Oli, na szybie, od środka… karteczka.'],
    ['back', 5.0, '[whispers] Dobranoc… sąsiadko.', 'ola'],
    ['end', 0.4, 'A szafa… jest uchylona.'],
    ['end', 6.6, '[whispers] Cześć, Ola.', 'kaptur'],
]
VFILTER = {'zdzisiek': 'highpass=f=120,lowpass=f=6000,aecho=0.6:0.4:20:0.3', 'kaptur': 'lowpass=f=3400,aecho=0.6:0.4:30:0.3', 'zadrzwiami': 'lowpass=f=1400,aecho=0.6:0.5:40:0.35', 'dyspozytor': 'highpass=f=350,lowpass=f=3200,acompressor', 'ola': 'highpass=f=110', 'kuba': 'highpass=f=100', 'policjant': 'highpass=f=90'}
VGAIN = {'kaptur': 1.5, 'zadrzwiami': 1.6}
SFX = {'tap': (2, False, 'fingernail slowly tapping on a window glass at night, three taps, close')}
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 85.99], [-34, -34]),
    # muzyka grozy (cache/sfx/groza.wav): narasta przy akcji, opada po niej, cisza po uderzeniu
    loops={'groza': ([0, .3, 6, 11, 18.5, 20, 20.6, 24, 28, 31.4, 34, 38, 42, 46, 50, 54, 58, 62, 66, 70, 76, 79, 82.55, 82.7, 84, 85.99],
                     [-60, -12, -22, -22, -14, -18, -10, -14, -16, -6, -9, -14, -12, -12, -8, -20, -22, -14, -10, -8, -12, -9, -4, -70, -22, -30]),
           'tension': ([0, 20, 28, 46, 66, 82.55, 82.7, 85.99], [-30, -24, -20, -22, -18, -14, -60, -60]),
           'drone': ([0, 72, 78, 82.55, 82.7, 84, 85.99], [-60, -30, -20, -12, -60, -60, -60]),
           'roomtone': ([0, 85.99], [-40, -40]),
           'wind': ([0, 27.9, 28, 37.9, 38, 85.99], [-90, -90, -36, -36, -90, -90])},
    heartbeat=([0, 20, 22, 28, 30, 38, 46, 54, 66, 76, 82.5, 82.6, 85.99], [-90, -90, -18, -16, -12, -12, -14, -90, -14, -10, -4, -90, -90]),
)
REALMAP = {'knock': [('knock', -4)], 'tap': [('tap', -6)], 'doorlock': [('doorlock', -8)], 'dial': [('dial', -12)], 'run': [('run', -9)],
           'siren': [('siren', -10)], 'paper': [('paper', -9)], 'creak': [('creak', -10)], 'boom': [('boom', -6)], 'stab': [('boom', -5)],
           'whoosh': [('whoosh', -18)], 'error': [('boom', -7)], 'hit': [('boom', -1)]}
EXTRA = [(82.6, 'hit_low', 0), (82.6, 'sting', -3), (78.6, 'riser', -6), (34.0, 'breath', -15), (78.5, 'breath', -13)] + [(t, 'hit_low', -6) for t in (0.2, 6, 11, 20, 28, 38, 46, 54, 62, 66, 76)] + [(t, 'hit_low', -2) for t in (31.4, 18.4, 51.4)] + [(20.4, 'hit_low', -2), (23.2, 'sting', -9), (31.4, 'sting', -5), (44.4, 'hit_low', -2), (44.4, 'sting', -10), (68.6, 'hit_low', -3), (70.6, 'sting', -9)]

# poprawiony na prośbę użytkownika: ok. 2 minut (TARGET domyślnie 118 s)
MAXK = 1.5
