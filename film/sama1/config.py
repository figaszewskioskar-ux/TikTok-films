"""SAMA W DOMU · ODC. 1 — „Nie rozmawiaj z »mamą«!” (nowa seria, wg wzoru wirala). Lektor B + głosy postaci."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'   # lektor: Victor (ustawienia B)
MODEL = 'eleven_multilingual_v2'
SETTINGS = {'stability': 0.32, 'similarity_boost': 0.85, 'style': 0.55, 'use_speaker_boost': True, 'speed': 0.9}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
PHONE = 'highpass=f=350,lowpass=f=3200,acompressor'
VOICES = {
    'nina':      ('cgSgspJ2msm6clMCkdW9', 'eleven_v3', V3),
    'nina_tel':  ('cgSgspJ2msm6clMCkdW9', 'eleven_v3', V3),
    'falszywa':  ('XrExE9yKIg1WjnnlVkGX', 'eleven_v3', V3),
    'komisarz':  ('JWUOwsYG4XgR9Od3eeon', 'eleven_v3', V3),
    'mama':      ('XrExE9yKIg1WjnnlVkGX', 'eleven_v3', V3),
    'kurier':    ('rUOVqZ1ISbf2yl2Vbpwa', 'eleven_v3', V3),
}
VFILTER = {'nina': 'highpass=f=110', 'nina_tel': PHONE + ',aecho=0.6:0.4:40:0.25', 'falszywa': PHONE + ',vibrato=f=5:d=0.08', 'komisarz': PHONE,
           'mama': PHONE + ',aecho=0.5:0.3:60:0.2', 'kurier': 'highpass=f=400,lowpass=f=3000,acompressor'}
SCENES = [('hook', 0, 5), ('ctx', 5, 11), ('call', 11, 23), ('cop', 23, 35), ('money', 35, 50), ('test', 50, 62), ('rule', 62, 70), ('door', 70, 88), ('end', 88, 108)]
SEG = [
    ['hook', 0.1, 'Jeśli w nocy dzwoni mama i płacze… rozłącz się.'],
    ['hook', 2.8, 'Ten głos może nie być jej.'],
    ['ctx', 0.3, 'Zero czterdzieści osiem. Nina jest sama w domu.'],
    ['ctx', 2.8, 'Rodzice są na weselu w Radomiu. Kot Pączek śpi w nogach łóżka.'],
    ['call', 0.6, '[crying, panicked] Córcia… to ja… miałam wypadek… potrąciłam kobietę…', 'falszywa'],
    ['call', 6.4, 'Głos jak mamy. Płacz zagłusza resztę.'],
    ['call', 8.6, '[sobbing] Oni mnie zamkną… pomóż mi…', 'falszywa'],
    ['cop', 0.4, '[calm, official] Komisarz Nowak. Mama jest zatrzymana. Potrzebna kaucja, inaczej trafi do aresztu.', 'komisarz'],
    ['cop', 5.4, '[panicked] Mamo?! Gdzie jesteś?!', 'nina'],
    ['cop', 8.0, '[firm] Nie rozłączaj się. I nikomu nie mów, to sprawa w toku.', 'komisarz'],
    ['money', 0.4, 'Kurier będzie za dwadzieścia minut. Przygotuj gotówkę.', 'komisarz'],
    ['money', 4.4, 'W meblościance, w drugiej szufladzie, koperta. Na wakacje.'],
    ['money', 7.0, 'Dwa tysiące czterysta złotych. Nina wkłada je do koperty.'],
    ['test', 0.4, '[shaky] Mamo… jak ma na imię nasz kot?', 'nina'],
    ['test', 3.0, 'Kochanie, nie teraz! Rób, co mówi pan komisarz!', 'falszywa'],
    ['test', 4.6, 'Mama zna imię Pączka. Nina się rozłącza. I dzwoni sama, na zapisany numer.'],
    ['test', 7.0, '[surprised, background music] Nina? Jestem na weselu u cioci, wszystko dobrze! Co się stało?', 'mama'],
    ['rule', 0.4, 'Mama dzwoni na policję. Prawdziwą.'],
    ['door', 0.4, 'Pierwsza dwanaście. Domofon.'],
    ['door', 1.6, 'Kurier. Po kopertę.', 'kurier'],
    ['door', 5.0, '[scared but firm] Nie otworzę. Policja już jedzie.', 'nina'],
    ['door', 9.0, 'Na ekranie domofonu… kurier podnosi głowę. I patrzy prosto w kamerę.'],
    ['door', 13.4, 'Dwie minuty później radiowóz zatrzymuje go pod klatką.'],
    ['end', 0.4, 'Pierwsza trzydzieści jeden. Telefon znowu dzwoni. Mama ❤.'],
    ['end', 3.4, 'Ale mama jest na weselu. Nina nie odbiera.'],
    ['end', 6.4, 'Nowa wiadomość głosowa.'],
    ['end', 8.4, '[crying, whisper] Mamo… pomóż mi… nie rozłączaj się…', 'nina_tel'],
    ['end', 12.4, 'To głos Niny. Nagrali go, kiedy z nimi rozmawiała.'],
]
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 107.99], [-34, -34]),
    loops={'groza': ([0, .3, 4.5, 5.5, 11, 17, 23, 29, 35, 40, 44, 50, 54, 58, 62, 70, 74, 79, 84, 88, 94, 100, 103.55, 103.7, 105, 107.99],
                     [-60, -12, -12, -22, -16, -12, -14, -10, -16, -12, -10, -12, -14, -20, -24, -16, -12, -8, -14, -16, -10, -7, -4, -70, -22, -30]),
           'tension': ([0, 11, 35, 50, 62, 70, 88, 103.55, 103.7, 107.99], [-32, -24, -18, -20, -30, -20, -16, -12, -60, -60]),
           'drone': ([0, 70, 103.55, 103.7, 107.99], [-30, -24, -14, -60, -60]),
           'roomtone': ([0, 107.99], [-38, -38])},
    heartbeat=([0, 11, 14, 35, 40, 50, 62, 70, 76, 88, 96, 103.5, 103.6, 107.99], [-90, -90, -14, -12, -10, -90, -90, -90, -10, -90, -12, -6, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -18)], 'hit': [('boom', -3)], 'notif': [('notif', -9)], 'ring': [('ring', -10)], 'buzz': [('buzz', -8)],
           'click': [('tap', -8)], 'dial': [('dial', -12)], 'drawer': [('door_lock', -10)]}
EXTRA = [(103.6, 'hit_low', 0), (103.6, 'sting', -3), (99.6, 'riser', -6), (29.0, 'hit_low', -2), (44.0, 'sting', -9), (53.0, 'hit_low', -2), (79.0, 'hit_low', -1), (79.0, 'sting', -6),
         (96.0, 'breath', -8), (14.0, 'breath', -10)] + [(t, 'hit_low', -6) for t in (0.2, 5, 11, 23, 35, 50, 62, 70, 88)]
MAXK = 1.5
