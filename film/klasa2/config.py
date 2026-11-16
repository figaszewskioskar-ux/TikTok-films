"""GRUPA KLASOWA · ODC. 2 — „Nie kasuj dowodów!” (Kuba, Zuzia, Bartek, Lena, p. Wiśniewska, dyrektorka, rodzice). Przerażający lektor + głosy."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'
MODEL = 'eleven_v3'
SETTINGS = {'stability': 0.5, 'similarity_boost': 0.85}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {
    'kuba': ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3),
    'obcy': ('rUOVqZ1ISbf2yl2Vbpwa', 'eleven_v3', V3),
    'zuzia': ('d4Z5Fvjohw3zxGpV8XUV', 'eleven_v3', V3),
    'lena': ('cgSgspJ2msm6clMCkdW9', 'eleven_v3', V3),
    'bartek': ('TX3LPaxmHKxFdv7VOQHJ', 'eleven_v3', V3),
    'mama': ('XrExE9yKIg1WjnnlVkGX', 'eleven_v3', V3),            # mama Kuby
    'pani': ('Xb7hH8MSUJpSbSDYk0k2', 'eleven_v3', V3),            # p. Wiśniewska
    'dyrektorka': ('hpp4J3VqNfWAUOO0d1Us', 'eleven_v3', V3),      # Bella — chłodna, urzędowa
    'mbartka': ('8EWWaNTDrqObI22Gvo1q', 'eleven_v3', V3),         # mama Bartka
    'tzuzi': ('JWUOwsYG4XgR9Od3eeon', 'eleven_v3', V3),           # tata Zuzi
    'mmaji': ('FGY2WhTYpPnrIDTdsKH5', 'eleven_v3', V3),           # mama Maji
    'mleny': ('EXAVITQu4vr4xnSDxMaL', 'eleven_v3', V3),           # mama Leny
}
VFILTER = {'lektor': 'asetrate=48000*0.93,aresample=48000,atempo=1.075,lowpass=f=7500,highpass=f=60,acompressor=threshold=-22dB:ratio=3,aecho=0.7:0.5:70|140:0.22|0.12',
           'obcy': 'lowpass=f=5200,aecho=0.5:0.3:25:0.2', 'kuba': 'highpass=f=100', 'dyrektorka': 'aecho=0.6:0.4:40:0.15'}
VGAIN = {'obcy': 1.3}
MAXK = 1.6
SCENES = [('hook', 0, 5), ('morning', 5, 13), ('bartek', 13, 24), ('director', 24, 37), ('parents', 37, 49), ('delete', 49, 58), ('lena', 58, 69), ('rule', 69, 82), ('end', 82, 108)]
SEG = [
    ['hook', 0.3, '[cold, strict] Skasujcie te wiadomości. Żadnej policji.', 'dyrektorka'],
    ['hook', 4.4, '[whispering] Nie kasuj.'],
    ['morning', 0.3, '[low, ominous voice, slowly] Wtorek. Za pięć ósma.'],
    ['morning', 1.8, '[worried] Bartek nie przyszedł…', 'zuzia'],
    ['morning', 4.8, '[worried] Nie odpisuje od wczoraj.', 'kuba'],
    ['bartek', 1.6, '[cocky, laughing] Co się gapicie? Żyję! Telefon mi padł.', 'bartek'],
    ['bartek', 5.0, 'A zdjęcie twoich drzwi?', 'kuba'],
    ['bartek', 7.6, '[confused, scared] …jakie zdjęcie?', 'bartek'],
    ['bartek', 10.0, '[low, ominous voice, slowly] Bartek nic nie widział.'],
    ['director', 0.4, '[dismissive] To głupi żart któregoś z was. Skasujcie wiadomości.', 'dyrektorka'],
    ['director', 4.4, '[nervous] Pani dyrektor, ja już to zgłosiłam…', 'pani'],
    ['director', 7.4, '[cold] To pani to odwoła. Nie robimy szkole złej opinii.', 'dyrektorka'],
    ['director', 11.6, '[low, ominous voice, slowly] Dyrektorka każe kasować dowody.'],
    ['parents', 0.1, '[angry] Od kiedy przyszła ta nowa, same problemy.', 'mbartka'],
    ['parents', 1.9, '[stern] Trzeba sprawdzić tę rodzinę.', 'tzuzi'],
    ['parents', 3.8, '[upset] Moja córka boi się chodzić do szkoły!', 'mmaji'],
    ['parents', 5.7, '[firm] To dziecko nic nie zrobiło. Opamiętajcie się.', 'mama'],
    ['parents', 7.6, '[sad, holding back tears] Moja córka płacze co wieczór.', 'mleny'],
    ['parents', 9.6, '[low, ominous voice, slowly] Rodzice oskarżają nową.'],
    ['delete', 0.3, '[low, ominous voice, slowly] Cała klasa kasuje czat.'],
    ['delete', 5.8, '[low, ominous voice, slowly] Kuba nie kasuje. Ma zrzuty.'],
    ['lena', 1.0, '[softly] Lena… przepraszam.', 'zuzia'],
    ['lena', 3.8, '[crying, whispering] On do mnie pisze. Od tygodnia. Kazał nic nie mówić.', 'lena'],
    ['rule', 0.6, '[warm, firm] Dobrze, że ich nie skasowałeś. Idziemy na policję. Dziś.', 'pani'],
    ['rule', 4.4, 'A pani dyrektor?', 'kuba'],
    ['rule', 6.8, '[firm] Bezpieczeństwo jest ważniejsze niż opinia.', 'pani'],
    ['end', 0.2, '[low, ominous voice, slowly] Dwudziesta druga dziesięć. Pisze Lena.'],
    ['end', 1.6, '[whispering, terrified] Kuba, on stoi pod moim oknem.', 'lena'],
    ['end', 3.0, '[shouting, scared] Dzwoń na sto dwanaście!', 'kuba'],
    ['end', 5.6, '[crying] Nie mogę… powiedział, że jak zadzwonię…', 'lena'],
    ['end', 9.6, '[whispers, amused] Lena już śpi. Teraz ty, Kuba.', 'obcy'],
    ['end', 11.8, '[low, ominous voice, slowly] Nowy Uczeń zmienia zdjęcie profilowe.'],
    ['end', 13.6, '[whispering] Czerwona czapka z daszkiem…'],
    ['end', 20.0, '[whispering] Bartek… czy nie?'],
]
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 107.99], [-34, -34]),
    loops={'groza': ([0, .3, 4.5, 5.5, 13, 24, 37, 49, 58, 69, 82, 91.6, 94.6, 99.75, 99.9, 102, 107.99],
                     [-60, -14, -14, -26, -22, -18, -16, -14, -14, -24, -12, -8, -6, -4, -70, -26, -34]),
           'tension': ([0, 24, 37, 58, 69, 82, 99.75, 99.9, 107.99], [-34, -24, -20, -16, -26, -14, -9, -60, -60]),
           'drone': ([0, 49, 69, 82, 99.75, 99.9, 107.99], [-34, -26, -32, -18, -10, -60, -60]),
           'roomtone': ([0, 107.99], [-38, -38])},
    heartbeat=([0, 82, 91.6, 99.7, 99.8, 107.99], [-90, -90, -8, -5, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -18)], 'hit': [('boom', -3)], 'jolt': [('jolt', -2)], 'tap': [('tap', -6)], 'notif': [('notif', -9)], 'bell': [('ring', -10)], 'door': [('doorclose', -12)]}
EXTRA = [(99.8, 'hit_low', 0), (99.8, 'sting', -3), (95.8, 'riser', -6), (91.6, 'sting', -5), (31.4, 'sting', -7)] + [(t, 'hit_low', -6) for t in (0.2, 5, 13, 24, 37, 49, 58, 69, 82)]
