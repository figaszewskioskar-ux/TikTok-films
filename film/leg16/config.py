"""LEGENDY GROZY · KLAUN Z KOSZALINA — własna historia na podstawie polskiej miejskiej legendy (wzór: BEBOK)."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'  # Victor
MODEL = 'eleven_v3'
SETTINGS = {'stability': 0.4, 'similarity_boost': 0.85}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {'kuba': ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3), 'bartek': ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3), 'mama': ('Xb7hH8MSUJpSbSDYk0k2', 'eleven_v3', V3), 'pani': ('6qkrzTbAj75WW5U8X5mB', 'eleven_v3', V3), 'klaun': ('bX8ZXtFbQtanSpI1KPZ1', 'eleven_v3', V3)}
VFILTER = {'lektor': 'highpass=f=70,acompressor=threshold=-20dB:ratio=2.5,aecho=0.5:0.3:35:0.08', 'bartek': 'asetrate=48000*0.93,aresample=48000,atempo=1.07',
           'klaun': 'asetrate=48000*1.12,aresample=48000,atempo=0.92,aecho=0.7:0.6:70|160:0.45|0.3'}
TEMPO = {'lektor': 1.1}
MAXK = 1.6
PREVIEW_NO_VOICE = False
TARGET = 118
SQUEEZE = 0.75
SCENES = [('karta', 0, 4.4), ('park0', 4.4, 8.0), ('macha', 8.0, 11.4), ('blizej', 11.4, 15.2), ('mama', 15.2, 19.4), ('kuba0', 19.4, 22.2), ('trening', 22.2, 25.4), ('bartek', 25.4, 28.2), ('alejka', 28.2, 31.6), ('ktos', 31.6, 34.8), ('zoom', 34.8, 38.2), ('zart', 38.2, 40.8), ('gasnie', 40.8, 43.8), ('nikogo', 43.8, 47.0), ('skrzyp', 47.0, 50.2), ('zanami', 50.2, 53.8), ('balonika', 53.8, 56.4), ('ucieczka', 56.4, 59.6), ('sklep', 59.6, 63.0), ('pani', 63.0, 66.0), ('policja', 66.0, 69.6), ('balon', 69.6, 73.4), ('mamaodb', 73.4, 76.2), ('okno', 76.2, 79.4), ('pod', 79.4, 82.8), ('machal', 82.8, 85.8), ('sms', 85.8, 89.2), ('jutro', 89.2, 92.6), ('epilog', 92.6, 98.6), ('end', 98.6, 103.6)]
SEG = [
    ['karta', 0.15, '[storytelling, tense, slow] To jest Klaun z Koszalina.'],
    ['park0', 0.15, '[storytelling, tense] Mówi się, że w Koszalinie nocą po parkach chodził klaun.'],
    ['macha', 0.15, '[whispering] Stał pod latarnią. Z czerwonym balonikiem. I tylko machał.'],
    ['blizej', 0.15, '[whispering] Kto podszedł bliżej, już go nie widział. A klaun był wtedy tuż za nim.'],
    ['mama', 0.15, '[mother, serious, warning] Kuba, po treningu wracaj ulicą. Nie skrótem przez park. Tam łazi ten klaun.', 'mama'],
    ['kuba0', 0.15, '[boy, laughing] Mamo, to tylko filmiki z internetu.', 'kuba'],
    ['trening', 0.15, '[storytelling] Po treningu było już ciemno. Padał śnieg.'],
    ['bartek', 0.15, '[boy, excited] Przez park będziemy w pięć minut.', 'bartek'],
    ['alejka', 0.15, '[storytelling, tense] Alejka była pusta. Połowa latarni nie działała.'],
    ['ktos', 0.15, '[storytelling, tense, slow] Na końcu alejki, pod ostatnią latarnią, ktoś stał.'],
    ['zoom', 0.15, '[whispering] Klaun. Z czerwonym balonikiem. Machał do nas.'],
    ['zart', 0.15, '[boy, nervous laugh] Spoko, to pewnie jakiś żart.', 'bartek'],
    ['gasnie', 0.15, '[storytelling, tense] Latarnia zamrugała. I zgasła.'],
    ['nikogo', 0.15, '[storytelling, tense, slow] Kiedy znowu się zapaliła, pod latarnią nikogo nie było.'],
    ['skrzyp', 0.15, '[whispering] Za nami coś zaskrzypiało. Jak wielkie buty na śniegu.'],
    ['zanami', 0.15, '[storytelling, urgent] Odwróciliśmy się. Stał trzy metry od nas. I się uśmiechał.'],
    ['balonika', 0.15, '[whispering, creepy, slow] Chcecie… balonika?', 'klaun'],
    ['ucieczka', 0.15, '[storytelling, urgent] Uciekaliśmy przez krzaki, aż do świateł osiedla.'],
    ['sklep', 0.15, '[storytelling, urgent] Wpadliśmy do nocnego sklepu.'],
    ['pani', 0.15, '[woman, serious, calm] Zostańcie tutaj. Dzwonię na sto dwanaście.', 'pani'],
    ['policja', 0.15, '[storytelling] Policja przeszukała park. Znaleźli tylko ślady wielkich butów.'],
    ['balon', 0.15, '[storytelling, tense, slow] I czerwony balonik przywiązany do ławki. Ktoś napisał na nim: Kuba.'],
    ['mamaodb', 0.15, '[storytelling] Mama odebrała nas spod sklepu.'],
    ['okno', 0.15, '[storytelling, tense] W nocy nie mogłem spać. Podszedłem do okna.'],
    ['pod', 0.15, '[whispering] Pod blokiem, pod latarnią, ktoś stał.'],
    ['machal', 0.15, '[whispering] Machał. Do mojego okna. Na czwartym piętrze.'],
    ['sms', 0.15, '[storytelling, tense] Telefon zawibrował. Nieznany numer.'],
    ['jutro', 0.15, '[whispering, creepy, slow] Do jutra, Kuba. Pobawimy się… jutro?', 'klaun'],
    ['epilog', 0.15, '[storytelling] Mówi się, że nigdy go nie złapali. Jeśli nocą zaczepia cię ktoś obcy, nie podchodź. Idź tam, gdzie są ludzie i światło, i dzwoń na sto dwanaście.'],
    ['end', 0.15, '[whispering, creepy] Chcesz… balonika?', 'klaun'],
]
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 103.58999999999999], [-34, -34]),
    loops={'groza': ([0, .2, 15.2, 28.2, 31.6, 50.2, 59.6, 76.2, 89.2, 92.6, 103.58999999999999], [-60, -10, -26, -14, -8, -4, -20, -10, -3, -16, -40]),
           'tension': ([0, 15.2, 28.2, 47.0, 59.6, 76.2, 89.2, 92.6, 103.58999999999999], [-18, -30, -16, -6, -24, -14, -5, -24, -40]),
           'drone': ([0, 28.2, 50.2, 59.6, 76.2, 92.6, 98.6], [-40, -18, -6, -28, -8, -26, -30]),
           'wind': ([0, 15.2, 22.2, 59.6, 66.0, 73.4, 76.2, 92.6, 103.58999999999999], [-28, -60, -22, -60, -24, -40, -30, -60, -60]),
           'roomtone': ([0, 103.58999999999999], [-36, -36])},
    heartbeat=([0, 31.6, 50.2, 59.6, 79.4, 92.6, 103.58999999999999], [-90, -14, -5, -90, -8, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'hit': [('boom', -3)], 'jolt': [('jolt', -2)], 'switch': [('poweroff', -4)], 'snow': [('stairs', -10)], 'run': [('run', -6)], 'buzz': [('vibrate', -6)]}
EXTRA = [(0.1, 'hit_low', -4), (13.2, 'hit_low', -1), (13.2, 'sting', -5), (32.8, 'hit_low', -3), (42.5, 'hit_low', -1), (46.0, 'riser', -7), (50.4, 'hit_low', 0), (50.4, 'sting', -1), (71.6, 'hit_low', -1), (71.6, 'sting', -4), (81.8, 'riser', -6), (82.8, 'hit_low', -2), (87.7, 'riser', -5), (91.8, 'hit_low', 0), (91.8, 'sting', 0), (98.6, 'hit_low', -2), (15.2, 'hit_low', -9), (22.2, 'hit_low', -9), (28.2, 'hit_low', -9), (59.6, 'hit_low', -9), (66.0, 'hit_low', -9), (76.2, 'hit_low', -9)]
