"""Story: nasza strona i nowa gra „Telefon o 2:00” — zachęta do zagrania i napisania wyniku. Przerażający lektor."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'
MODEL = 'eleven_v3'
SETTINGS = {'stability': 0.5, 'similarity_boost': 0.85}
VFILTER = {'lektor': 'asetrate=48000*0.93,aresample=48000,atempo=1.075,lowpass=f=7500,highpass=f=60,acompressor=threshold=-22dB:ratio=3,aecho=0.7:0.5:70|140:0.22|0.12'}
MAXK = 2.0
TARGET = None
SCENES = [('s1', 0, 5), ('s2', 5, 11), ('s3', 11, 17), ('s4', 17, 21)]
SEG = [
    ['s1', 0.3, '[low, ominous voice, slowly] Druga w nocy. Dzwoni ktoś, kogo nie znasz.'],
    ['s1', 3.0, '[whispering] Odbierzesz?'],
    ['s2', 0.3, '[low, ominous voice, slowly] Nowa gra na naszej stronie. Telefon o drugiej.'],
    ['s2', 2.8, '[low, ominous voice, slowly] Oszuści, obcy, dziwne wiadomości. Ty decydujesz, co zrobić.'],
    ['s3', 0.3, '[low, ominous voice, slowly] Sprawdź, ile zdobędziesz na dziesięć.'],
    ['s3', 2.6, '[low, ominous voice, slowly] I napisz swój wynik w komentarzu.'],
    ['s4', 0.3, '[whispering] Link w bio. Jeśli odważysz się odebrać.'],
]
SKIP = ['tik']
AUDIO = dict(bed=([0, 20.99], [-30, -30]),
             loops={'tension': ([0, 2.8, 3.0, 11, 20.99], [-22, -12, -28, -24, -30]), 'drone': ([0, 20.99], [-26, -26]), 'roomtone': ([0, 20.99], [-38, -38])},
             heartbeat=([0, 1, 2.8, 2.9, 20.99], [-90, -12, -6, -90, -90]))
REALMAP = {'stab': [('boom', -5)], 'hit': [('boom', -4)], 'jolt': [('jolt', -2)], 'vib': [('ring', -8)], 'tap': [('tap', -6)], 'ok': [('notif', -10)], 'notif': [('notif', -9)]}
EXTRA = [(2.9, 'hit_low', 0), (2.9, 'sting', -4), (0.1, 'hit_low', -4)]
