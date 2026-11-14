"""SKRÓTEM · ODC. 2 — „Nie idź tam sama!”. Lektor B + głosy postaci."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'   # lektor: Victor (ustawienia B)
MODEL = 'eleven_multilingual_v2'
SETTINGS = {'stability': 0.32, 'similarity_boost': 0.85, 'style': 0.55, 'use_speaker_boost': True, 'speed': 0.9}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {
    'maja':      ('cgSgspJ2msm6clMCkdW9', 'eleven_v3', V3),
    'zuzia':     ('d4Z5Fvjohw3zxGpV8XUV', 'eleven_v3', V3),
    'zuzia_tel': ('d4Z5Fvjohw3zxGpV8XUV', 'eleven_v3', V3),
    'obcy':      ('rUOVqZ1ISbf2yl2Vbpwa', 'eleven_v3', V3),
    'mama':      ('XrExE9yKIg1WjnnlVkGX', 'eleven_v3', V3),
    'policjant': ('JWUOwsYG4XgR9Od3eeon', 'eleven_v3', V3),
}
VFILTER = {'maja': 'highpass=f=110', 'zuzia': 'highpass=f=110', 'zuzia_tel': 'highpass=f=350,lowpass=f=3200,acompressor', 'mama': 'highpass=f=120',
           'policjant': 'highpass=f=90', 'obcy': 'lowpass=f=5200,aecho=0.5:0.3:25:0.2'}
VGAIN = {'obcy': 1.3}
SCENES = [('hook', 0, 6), ('recap', 6, 12), ('msg', 12, 26), ('school', 26, 38), ('garage', 38, 56), ('police', 56, 72), ('inside', 72, 86), ('end', 86, 106)]
SEG = [
    ['hook', 0.2, 'Obcy pisze: przyjdź sama i nikomu nie mów. Nie idź tam.'],
    ['recap', 0.2, 'Poprzednio: w torbie Mai klucz z numerem trzynaście. Nie jej.'],
    ['msg', 0.3, 'Pierwsza w nocy. Wiadomość z nieznanego numeru.'],
    ['msg', 10.6, 'Skąd ma jej numer? Z zawieszki na torbie. Imię, numer, klub.'],
    ['school', 0.8, '[shocked] Idziesz tam sama? Zwariowałaś?!', 'zuzia'],
    ['school', 3.8, '[stubborn] Oddam klucz i będzie spokój. Tylko nie mów mamie.', 'maja'],
    ['garage', 0.2, 'Dziewiętnasta. Garaż trzynaście jest uchylony.'],
    ['garage', 3.6, '[soft, creepy] Wejdź, Maja. Połóż klucz na stole.', 'obcy'],
    ['garage', 6.6, 'Dzwoni telefon. Zuzia.'],
    ['garage', 8.0, '[urgent] Nie wchodź! Powiedziałam twojej mamie. Jedzie z policją!', 'zuzia_tel'],
    ['garage', 12.2, 'Z ciemności wysuwa się ręka.'],
    ['garage', 14.8, 'Maja ucieka. Do świateł ulicy.'],
    ['police', 1.0, 'Dobrze, że nie weszłaś. Klucz to dowód.', 'policjant'],
    ['police', 4.0, '[shaky, relieved] Nigdy więcej takich sekretów. Obiecaj.', 'mama'],
    ['police', 7.0, '[quiet] Obiecuję.', 'maja'],
    ['inside', 0.4, 'Garaż trzynaście. Na ścianie zawieszki z torb. Imiona. Numery.'],
    ['inside', 4.4, '[grim] Tu jest więcej imion.', 'policjant'],
    ['inside', 8.4, 'Garaż wynajmuje ktoś z bloku dwanaście.', 'policjant'],
    ['end', 0.4, 'Maja zdejmuje zawieszkę. Wiadomości oddała policji.'],
    ['end', 6.2, 'Pukanie. Maja patrzy przez wizjer.'],
    ['end', 9.2, 'Sąsiad z trzeciego piętra. W kapciach. Z pękiem kluczy.'],
    ['end', 12.6, '[whispers, smiling] Dobry wieczór, sąsiadko. Ja mam zapasowy.', 'obcy'],
]
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 105.99], [-34, -34]),
    loops={'groza': ([0, .3, 5.5, 6.5, 12, 16, 20, 23.4, 26, 32, 38, 42, 46, 50, 52.4, 54, 56, 64, 72, 76, 80, 86, 92, 96, 100, 101.55, 101.7, 103, 105.99],
                     [-60, -12, -12, -22, -20, -14, -12, -10, -22, -22, -16, -12, -10, -8, -6, -10, -18, -22, -18, -14, -12, -18, -14, -10, -7, -4, -70, -22, -30]),
           'tension': ([0, 12, 38, 56, 72, 86, 101.55, 101.7, 105.99], [-32, -26, -18, -24, -22, -20, -14, -60, -60]),
           'drone': ([0, 86, 101.55, 101.7, 105.99], [-30, -24, -14, -60, -60]),
           'wind': ([0, 38, 38.1, 72, 72.1, 105.99], [-90, -90, -28, -28, -90, -90]),
           'roomtone': ([0, 105.99], [-40, -40])},
    heartbeat=([0, 12, 16, 26, 38, 44, 52, 56, 86, 92, 101.5, 101.6, 105.99], [-90, -90, -14, -90, -90, -14, -6, -90, -90, -14, -6, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -18)], 'hit': [('boom', -3)], 'notif': [('notif', -9)], 'creak': [('creak', -6)],
           'dial': [('dial', -12)], 'siren': [('siren', -12)], 'knock': [('knock', -4)]}
EXTRA = [(101.6, 'hit_low', 0), (101.6, 'sting', -3), (97.6, 'riser', -6), (23.4, 'hit_low', -2), (31.0, 'sting', -9), (50.2, 'hit_low', -1), (50.2, 'sting', -6),
         (80.0, 'sting', -8), (92.0, 'breath', -8), (44.0, 'breath', -10)] + [(t, 'hit_low', -6) for t in (0.2, 6, 12, 26, 38, 56, 72, 86)]
MAXK = 1.5
