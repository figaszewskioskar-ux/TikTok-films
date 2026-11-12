"""NIE OTWIERAJ KURIEROWI! · CZĘŚĆ 2 — dalszy ciąg odcinka 1. Lektor B + głosy postaci."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'   # lektor: Victor (ustawienia B)
MODEL = 'eleven_multilingual_v2'
SETTINGS = {'stability': 0.32, 'similarity_boost': 0.85, 'style': 0.55, 'use_speaker_boost': True, 'speed': 0.9}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {
    'ola':       ('d4Z5Fvjohw3zxGpV8XUV', 'eleven_v3', V3),
    'kuba':      ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3),
    'kurier':    ('rUOVqZ1ISbf2yl2Vbpwa', 'eleven_v3', V3),
    'kurier_dom':('rUOVqZ1ISbf2yl2Vbpwa', 'eleven_v3', V3),
    'halina':    ('XrExE9yKIg1WjnnlVkGX', 'eleven_v3', V3),
    'halina_tel':('XrExE9yKIg1WjnnlVkGX', 'eleven_v3', V3),
    'policjant': ('JWUOwsYG4XgR9Od3eeon', 'eleven_v3', V3),
}
VFILTER = {'kurier_dom': 'highpass=f=350,lowpass=f=3200,acompressor', 'halina_tel': 'highpass=f=350,lowpass=f=3200,acompressor',
           'ola': 'highpass=f=110', 'kuba': 'highpass=f=100', 'kurier': 'highpass=f=90', 'halina': 'highpass=f=120', 'policjant': 'highpass=f=90'}
SCENES = [('hook', 0, 6), ('recap', 6, 12), ('flat', 12, 24), ('halina', 24, 34), ('split', 34, 46), ('lobby', 46, 62),
          ('police', 62, 74), ('home', 74, 86), ('end', 86, 104)]
SEG = [
    ['hook', 0.2, 'Kurier wrócił. Tym razem z paczką dla Kuby.'],
    ['recap', 0.2, 'Poprzednio: fałszywy kurier i Kaptur chcieli wejść do pustego mieszkania. Pani Halina ich przegoniła.'],
    ['flat', 0.3, 'Tydzień później. Dwudziesta druga czternaście. Domofon.'],
    ['flat', 1.0, 'Paczka dla Kuby. Za pobraniem, osiemdziesiąt dziewięć złotych. Zejdzie pan na dół?', 'kurier_dom'],
    ['flat', 4.6, '[worried] Nic nie zamawialiśmy…', 'ola'],
    ['flat', 6.6, '[excited] Może od wujka? Zaraz zejdę!', 'kuba'],
    ['halina', 0.3, 'Siódme piętro. Pani Halina słyszy domofon. Jak zawsze.'],
    ['halina', 1.2, '[suspicious] Ten głos… ja go znam.', 'halina'],
    ['halina', 3.8, '[alarmed] To ten sam kurier co wtedy!', 'halina'],
    ['halina', 6.8, '[urgent] Halo, Ola? Nie puszczaj brata na dół!', 'halina_tel'],
    ['split', 0.3, 'Kuba już jedzie windą. Sam.'],
    ['split', 2.0, '[worried] Pani Halino? Co się stało?', 'ola'],
    ['split', 7.6, '[scared] Kuba! Telefon zostawił na szafce…', 'ola'],
    ['lobby', 0.3, 'Parter. Drzwi windy się otwierają.'],
    ['lobby', 1.6, 'Kuba? Podpis tutaj. I osiemdziesiąt dziewięć złotych.', 'kurier'],
    ['lobby', 3.8, '[confused] Skąd pan zna moje imię?', 'kuba'],
    ['lobby', 6.4, 'A w cieniu schodów ktoś się porusza.'],
    ['lobby', 10.0, '[shouting] Kuba, uciekaj! Policja już jedzie!', 'halina'],
    ['lobby', 12.6, 'Kurier rzuca paczkę. Obaj znikają w ciemności.'],
    ['police', 0.8, 'Nic nie zamawiałeś? To po co schodzisz?', 'policjant'],
    ['police', 4.0, '[ashamed] Myślałem, że to od wujka…', 'kuba'],
    ['police', 6.2, '[stern] Kawalerze, drugi raz mamy tego samego kuriera.', 'halina'],
    ['home', 0.6, '[thinking] Skąd on wiedział, jak mam na imię?', 'kuba'],
    ['home', 3.4, 'Kuba… podpisałeś się na domofonie.', 'ola'],
    ['home', 6.6, 'Na liście lokatorów: Kuba i Ola. Dziewięćdziesiąt cztery.'],
    ['end', 0.4, 'Trzecia w nocy. Domofon dzwoni znowu. Na ekranie… nikogo.'],
    ['end', 2.6, '[whispers] Kuba… paczka już jest na górze.', 'kurier_dom'],
    ['end', 7.2, 'Pukanie. Przez wizjer widać paczkę. Z numerem ich mieszkania.'],
    ['end', 10.4, 'A obok niej… ktoś stoi.'],
]
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 103.99], [-34, -34]),
    loops={'groza': ([0, .3, 5.5, 6.5, 12, 20, 24, 28, 34, 40, 44, 46, 50, 53, 57.4, 60, 62, 70, 74, 80, 86, 90, 94, 96.55, 96.7, 98, 103.99],
                     [-60, -12, -12, -22, -22, -16, -18, -14, -14, -10, -9, -12, -10, -7, -6, -14, -20, -22, -18, -14, -12, -10, -8, -4, -70, -22, -30]),
           'tension': ([0, 24, 46, 86, 96.55, 96.7, 103.99], [-32, -26, -20, -20, -14, -60, -60]),
           'drone': ([0, 86, 96.55, 96.7, 103.99], [-30, -24, -14, -60, -60]),
           'roomtone': ([0, 103.99], [-40, -40])},
    heartbeat=([0, 34, 36, 46, 52, 58, 62, 86, 90, 96.5, 96.6, 103.99], [-90, -90, -18, -14, -10, -8, -90, -90, -14, -6, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -18)], 'hit': [('boom', -3)], 'error': [('boom', -8)], 'buzz': [('buzz', -8)],
           'dial': [('dial', -12)], 'ding': [('elev_ding', -10)], 'siren': [('siren', -10)], 'knock': [('knock', -4)], 'slam': [('slam', -5)]}
EXTRA = [(96.6, 'hit_low', 0), (96.6, 'sting', -3), (92.6, 'riser', -6), (52.6, 'hit_low', -2), (52.6, 'sting', -9), (88.0, 'sting', -10)] + [(t, 'hit_low', -6) for t in (0.2, 6, 12, 24, 34, 46, 62, 74, 86)]
MAXK = 1.5
