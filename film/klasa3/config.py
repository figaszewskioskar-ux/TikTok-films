"""GRUPA KLASOWA · ODC. 3 — „Nie otwieraj znajomemu głosowi!” (wzór wirala BLOK 94 odc. 2). Przerażający lektor + głosy."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'
MODEL = 'eleven_v3'
SETTINGS = {'stability': 0.5, 'similarity_boost': 0.85}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {
    'kuba': ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3),
    'obcy': ('rUOVqZ1ISbf2yl2Vbpwa', 'eleven_v3', V3),
    'lena': ('cgSgspJ2msm6clMCkdW9', 'eleven_v3', V3),
    'mleny': ('EXAVITQu4vr4xnSDxMaL', 'eleven_v3', V3),
}
VFILTER = {'lektor': 'asetrate=48000*0.93,aresample=48000,atempo=1.075,lowpass=f=7500,highpass=f=60,acompressor=threshold=-22dB:ratio=3,aecho=0.7:0.5:70|140:0.22|0.12',
           'lena': 'highpass=f=300,lowpass=f=4200,aecho=0.6:0.5:35:0.25',  # zza drzwi, przytłumiony (i z nagrania)
           'mleny': 'highpass=f=350,lowpass=f=3200,acompressor', 'obcy': 'lowpass=f=5200,aecho=0.5:0.3:25:0.2', 'kuba': 'highpass=f=100'}
VGAIN = {'obcy': 1.3, 'lena': 1.2}
MAXK = 1.6
SCENES = [('hook', 0, 5), ('ctx', 5, 12), ('knock', 12, 20), ('peep', 20, 27), ('voice', 27, 38), ('call', 38, 47), ('trap', 47, 57), ('mom', 57, 67), ('rule', 67, 76), ('szatnia', 76, 88), ('czat', 88, 95), ('pov', 95, 104), ('note', 104, 113), ('end', 113, 144)]
SEG = [
    ['hook', 0.1, '[low, ominous voice, slowly] Jeśli w nocy za drzwiami słyszysz znajomy głos…'],
    ['hook', 2.8, '[whispering] nie otwieraj.'],
    ['ctx', 0.3, '[low, ominous voice, slowly] Pierwsza dwanaście. Kuba jest sam.'],
    ['ctx', 2.6, '[low, ominous voice, slowly] Mama ma nocną zmianę.'],
    ['knock', 2.0, '[low, ominous voice, slowly] Domofon nie dzwonił.'],
    ['knock', 4.6, '[whispering] On już jest na klatce.'],
    ['peep', 0.4, '[low, ominous voice, slowly] Wizjer. Czarno.'],
    ['peep', 3.4, '[low, ominous voice, slowly] Ktoś zakleił go od zewnątrz.'],
    ['voice', 0.4, '[crying, panicked] Kuba! To ja, Lena! Uciekłam mu! Otwórz, proszę!', 'lena'],
    ['voice', 5.0, '[shocked] Lena?!', 'kuba'],
    ['call', 0.3, '[low, ominous voice, slowly] Kuba dzwoni do Leny.'],
    ['call', 3.4, '[whispering] Jej telefon dzwoni… za drzwiami.'],
    ['trap', 0.4, '[crying, panicked] Kuba! To ja, Lena! Uciekłam mu! Otwórz, proszę!', 'lena'],
    ['trap', 4.8, '[low, ominous voice, slowly] To samo zdanie. Ta sama intonacja.'],
    ['trap', 6.8, '[whispering] To nagranie.'],
    ['rule', 0.3, '[low, ominous voice, slowly] Kuba dzwoni na sto dwanaście.'],
    ['mom', 2.4, '[sleepy, worried] Lena śpi obok mnie. Telefon zgubiła wczoraj w szkole.', 'mleny'],
    ['mom', 7.4, '[low, ominous voice, slowly] Ktoś ma telefon Leny.'],
    ['note', 0.3, '[low, ominous voice, slowly] Cienie wracają.'],
    ['note', 4.8, '[low, ominous voice, slowly] Pod drzwiami wsuwa się kartka.'],
    ['note', 6.6, '[whispering] Wiem, że słuchasz.'],
    ['end', 0.6, '[low, ominous voice, slowly] Wizjer jaśnieje.'],
    ['end', 7.4, '[whispering] Dobranoc, Kuba.', 'lena'],
    ['end', 9.6, '[whispers, deep] Dobranoc.', 'obcy'],
    ['end', 15.0, '[whispering] Kto ma telefon Leny?'],
    ['end', 19.6, '[low, ominous voice, slowly] Ktoś miał telefon Leny… i nagrał jej głos. Bartek? Obcy z klatki? A może ktoś z klasy, kto tylko udaje, że się boi?'],
    ['end', 25.6, '[whispering] Typuj w komentarzu. Odpowiedź… w odcinku czwartym.'],
    ['mom', 0.3, '[low, ominous voice, slowly] Kuba dzwoni do mamy Leny.'],
    ['szatnia', 0.3, '[low, ominous voice, slowly] Wczoraj. Szkolna szatnia.'],
    ['szatnia', 1.4, '[low, ominous voice, slowly] Telefon Leny został w kurtce.'],
    ['szatnia', 9.0, '[whispering] Ktoś go zabrał.'],
    ['pov', 0.3, '[low, ominous voice, slowly] W telefonie były jej wiadomości głosowe.'],
    ['pov', 2.4, '[whispering] Wystarczyło je pociąć… i skleić.'],
    ['pov', 4.8, '[low, ominous voice, slowly] Kilka minut przed pukaniem… stał już pod drzwiami Kuby.'],
    ['szatnia', 4.4, '[low, ominous voice, slowly] Dzwonek. Wszyscy wychodzą.'],
    ['szatnia', 6.2, '[whispering] Prawie wszyscy.'],
    ['czat', 0.2, '[low, ominous voice, slowly] Za dwadzieścia pierwsza. Z telefonu Leny ktoś pisze na grupie.'],
    ['czat', 5.2, '[whispering] I Kuba odpisał.'],
]
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 143.99], [-34, -34]),
    loops={'groza': ([0, 0.3, 4.5, 5.5, 12, 20, 27, 38, 41.4, 47, 52.6, 57, 67, 76, 80, 100.2, 104, 113, 120, 126.55, 126.7, 128, 143.99],
                     [-60, -12, -12, -22, -16, -12, -12, -10, -6, -10, -6, -16, -22, -16, -12, -8, -12, -10, -6, -4, -70, -26, -34]),
           'tension': ([0, 12, 27, 47, 57, 67, 104, 126.55, 126.7, 143.99], [-32, -22, -16, -12, -22, -24, -14, -9, -60, -60]),
           'drone': ([0, 20, 57, 104, 126.55, 126.7, 143.99], [-32, -22, -28, -16, -10, -60, -60]),
           'roomtone': ([0, 143.99], [-38, -38])},
    heartbeat=([0, 12, 20, 41.4, 52.6, 57, 104, 120, 126.5, 126.6, 143.99], [-90, -12, -10, -6, -5, -14, -10, -6, -5, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -18)], 'hit': [('boom', -3)], 'jolt': [('jolt', -2)], 'knock': [('knock', -1)], 'creak': [('creak', -8)], 'dial': [('dial', -10)],
           'ring': [('ring', -6)], 'lock': [('keyturn', -6)], 'paper': [('paper', -4)], 'tape': [('tape', -4)], 'notif': [('notif', -10)]}
EXTRA = [(126.6, 'hit_low', 0), (126.6, 'sting', -3), (122.6, 'riser', -6), (41.4, 'sting', -5), (52.6, 'sting', -5), (120.0, 'hit_low', -2), (85.4, 'sting', -5), (81.6, 'hit_low', -4), (102.2, 'hit_low', -2), (102.2, 'sting', -5)] + [(t, 'hit_low', -6) for t in (0.2, 5, 12, 20, 27, 38, 47, 57, 67, 76, 88, 95, 104, 113)]
