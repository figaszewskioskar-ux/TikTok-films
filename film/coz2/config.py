"""CO ZROBISZ? · ODC. 2 — „Obcy ma klucze do twojego domu”. Tylko postacie HD, szybkie cięcia (1,6–2,5 s), napisy słowo po słowie."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'
MODEL = 'eleven_v3'
SETTINGS = {'stability': 0.5, 'similarity_boost': 0.85}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {
    'kuba': ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3),
    'obcy': ('rUOVqZ1ISbf2yl2Vbpwa', 'eleven_v3', V3),
    'mama': ('XrExE9yKIg1WjnnlVkGX', 'eleven_v3', V3),
    'zosia': ('d4Z5Fvjohw3zxGpV8XUV', 'eleven_v3', V3),
    'policjant': ('xsSg7GkDPDhaGZpbKOLn', 'eleven_v3', V3),
}
VFILTER = {'lektor': 'asetrate=48000*0.93,aresample=48000,atempo=1.075,lowpass=f=7500,highpass=f=60,acompressor=threshold=-22dB:ratio=3,aecho=0.7:0.5:70|140:0.22|0.12',
           'obcy': 'lowpass=f=5000,aecho=0.6:0.4:40:0.25', 'kuba': 'highpass=f=100', 'mama': 'highpass=f=100', 'zosia': 'highpass=f=150,asetrate=48000*1.08,aresample=48000,atempo=0.93',
           'policjant': 'lowpass=f=5000,aecho=0.5:0.3:30:0.2'}
VGAIN = {'obcy': 1.2}
MAXK = 1.6
PREVIEW_NO_VOICE = False
TARGET = None
SQUEEZE = 0.7
SCENES = [('hook', 0, 3), ('zegar', 3, 4.8), ('zamek', 4.8, 6.6), ('uchyl', 6.6, 8.4), ('lancuch', 8.4, 10.2), ('szpara', 10.2, 12.6), ('kuba1', 12.6, 14.4), ('bieg', 14.4, 16.2),
          ('mama', 16.2, 18.4), ('kuba2', 18.4, 20.4), ('dial', 20.4, 22.4), ('polaczono', 22.4, 24.4), ('klamka', 24.4, 26.2), ('napina', 26.2, 28), ('zosia', 28, 30), ('zosia2', 30, 32),
          ('glos', 32, 34.5), ('idzie', 34.5, 36.3), ('stop', 36.3, 38.3), ('lazienka', 38.3, 40.3), ('zamykacie', 40.3, 42.3), ('trojka', 42.3, 44.5), ('cisza', 44.5, 46.5), ('cien', 46.5, 48.5),
          ('gasnie', 48.5, 50.3), ('szept', 50.3, 52.8), ('lzy', 52.8, 54.6), ('syreny', 54.6, 56.6), ('kroki', 56.6, 58.4), ('pukanie', 58.4, 60.6), ('wizjer', 60.6, 63), ('policjant', 63, 65.5),
          ('klucze', 65.5, 67.5), ('zasada', 67.5, 71.5), ('czwarta', 71.5, 74), ('end', 74, 96)]
SEG = [
    ['hook', 0.1, '[low, ominous voice, slowly] Co się stanie, gdy obcy ma klucze do twojego domu?'],
    ['zegar', 0.1, '[low, ominous voice] Dwudziesta trzecia trzydzieści dwa.'],
    ['zamek', 0.1, '[low, ominous voice] Zamek przekręca się do końca.'],
    ['uchyl', 0.1, '[whispering] Drzwi się uchylają…'],
    ['lancuch', 0.1, '[low, ominous voice] …i stają na łańcuchu.'],
    ['szpara', 0.3, '[whispers, deep] Kuba… otwórz.', 'obcy'],
    ['kuba1', 0.1, '[low, ominous voice] Łańcuch zostaje.'],
    ['bieg', 0.1, '[urgent] Biegniesz do mamy.'],
    ['mama', 0.2, '[sleepy, scared] Kuba? Co się dzieje?', 'mama'],
    ['kuba2', 0.2, '[panicked] Ktoś ma nasze klucze!', 'kuba'],
    ['dial', 0.1, '[urgent] Mama dzwoni na sto dwanaście.'],
    ['polaczono', 0.1, '[low, ominous voice] Policja będzie za dziesięć minut.'],
    ['klamka', 0.1, '[low, ominous voice] Klamka szarpie.'],
    ['napina', 0.1, '[low, ominous voice] Łańcuch się napina.'],
    ['zosia', 0.1, '[low, ominous voice] Budzi się Zosia. Twoja siostra.'],
    ['zosia2', 0.2, '[sleepy, small girl] Kuba? Kto tam jest?', 'zosia'],
    ['glos', 0.3, '[whispers, sweet, creepy] Zosiu… mam dla ciebie prezent. Otwórz.', 'obcy'],
    ['idzie', 0.1, '[whispering] Zosia idzie do drzwi.'],
    ['stop', 0.2, '[shouting] Zosia, stój!', 'kuba'],
    ['lazienka', 0.2, '[urgent, firm] Do łazienki. Szybko!', 'mama'],
    ['zamykacie', 0.1, '[low, ominous voice] Zamykacie się od środka.'],
    ['trojka', 0.1, '[low, ominous voice] Mama nie rozłącza się z dyspozytorem.'],
    ['cisza', 0.3, '[whispering] Cisza.'],
    ['cien', 0.2, '[whispering] Pod drzwiami… cień.'],
    ['gasnie', 0.3, '[low, ominous voice] Gaśnie światło.'],
    ['szept', 0.3, '[whispers, deep] Kuba… wiem, gdzie jesteś.', 'obcy'],
    ['lzy', 0.1, '[whispering] Zosia płacze.'],
    ['syreny', 0.2, '[low, ominous voice] Syreny.'],
    ['kroki', 0.1, '[urgent] Kroki zbiegają po schodach.'],
    ['pukanie', 0.2, '[loud, firm] Policja! Proszę otworzyć!', 'policjant'],
    ['wizjer', 0.1, '[low, ominous voice] Mama sprawdza przez wizjer. I pyta dyspozytora.'],
    ['policjant', 0.2, '[serious] Uciekł. Ale to leżało na wycieraczce.', 'policjant'],
    ['klucze', 0.2, '[whispering] Twoje klucze.'],
    ['czwarta', 0.1, '[low, ominous voice] Czwarta dziesięć. Policja odjechała.'],
    ['end', 0.2, '[whispering, small girl] Kuba… ten pan był u nas już wcześniej.', 'zosia'],
    ['end', 2.8, '[scared] Kiedy?', 'kuba'],
    ['end', 4.8, '[whispering, small girl] W nocy. Stał przy twoim łóżku.', 'zosia'],
    ['end', 8.0, '[whispering] Na poduszce leży zdjęcie. Śpisz na nim.'],
    ['end', 11.2, '[whispering] A ty… co zrobisz?'],
]
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 95.99], [-34, -34]),
    loops={'groza': ([0, .3, 3, 10.2, 24.4, 32, 38.3, 44.5, 48.5, 50.3, 54.6, 58.4, 63, 67.5, 74, 79, 84, 84.15, 86, 95.99],
                     [-60, -10, -16, -8, -10, -6, -10, -14, -6, -4, -10, -12, -20, -26, -18, -8, -4, -70, -30, -36]),
           'tension': ([0, 10.2, 24.4, 36.3, 48.5, 54.6, 63, 74, 82, 84, 84.15, 95.99], [-26, -14, -12, -8, -6, -14, -24, -22, -9, -6, -60, -60]),
           'drone': ([0, 10, 32, 48.5, 54.6, 67.5, 74, 84, 84.15, 95.99], [-30, -20, -14, -8, -18, -28, -20, -10, -60, -60]),
           'roomtone': ([0, 95.99], [-38, -38])},
    heartbeat=([0, 10, 24.4, 36.3, 44.5, 50.3, 54.6, 74, 79, 84, 84.1, 95.99], [-90, -12, -10, -6, -8, -5, -12, -90, -10, -5, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -22)], 'hit': [('boom', -3)], 'jolt': [('jolt', -2)], 'lock': [('keyturn', -2)], 'creak': [('creak', -6)], 'chain': [('chain', -2)],
           'steps': [('run', -5)], 'dial': [('dial', -10)], 'handle': [('handle', -2)], 'click': [('unlock', -3)], 'switch': [('poweroff', -3)], 'siren': [('siren', -10)], 'knock': [('knock', -1)], 'keys': [('keys', -4)]}
EXTRA = [(84.0, 'hit_low', 0), (84.0, 'sting', -3), (80.0, 'riser', -6), (8.6, 'sting', -5), (10.4, 'sting', -6), (32.2, 'sting', -5), (48.8, 'hit_low', -2), (50.4, 'sting', -4), (76.6, 'hit_low', -3)] + \
        [(t, 'hit_low', -9) for t in (0.2, 6.6, 14.4, 20.4, 28, 36.3, 42.3, 54.6, 58.4, 65.5, 74)]
