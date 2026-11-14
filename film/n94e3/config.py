"""NOCNY N94 · ODC. 3 — „Nie zapalaj światła!”. Lektor B + głosy postaci."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'   # lektor: Victor (ustawienia B)
MODEL = 'eleven_multilingual_v2'
SETTINGS = {'stability': 0.32, 'similarity_boost': 0.85, 'style': 0.55, 'use_speaker_boost': True, 'speed': 0.9}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {
    'ola':        ('d4Z5Fvjohw3zxGpV8XUV', 'eleven_v3', V3),
    'pasazer':    ('rUOVqZ1ISbf2yl2Vbpwa', 'eleven_v3', V3),
    'policjant':  ('JWUOwsYG4XgR9Od3eeon', 'eleven_v3', V3),
    'dyspozytor': ('JWUOwsYG4XgR9Od3eeon', 'eleven_v3', V3),
}
VFILTER = {'ola': 'highpass=f=110', 'policjant': 'highpass=f=90', 'dyspozytor': 'highpass=f=350,lowpass=f=3200,acompressor',
           'pasazer': 'lowpass=f=5200,aecho=0.5:0.3:25:0.2'}
VGAIN = {'pasazer': 1.3}
SCENES = [('hook', 0, 6), ('recap', 6, 12), ('bus', 12, 26), ('walk', 26, 42), ('entrance', 42, 54), ('switch', 54, 68),
          ('call', 68, 82), ('police', 82, 96), ('end', 96, 118)]
SEG = [
    ['hook', 0.2, 'Wróciłaś sama w nocy. Nie zapalaj światła.'],
    ['recap', 0.2, 'Poprzednio: on wiedział, którym autobusem wraca Ola.'],
    ['bus', 0.3, 'Następna noc. Ostatni nocny. Z tyłu siedzi on.'],
    ['bus', 5.0, '[whispers] Dobry wieczór… Ola.', 'pasazer'],
    ['bus', 7.8, '[scared, quiet] Tylko nie on…', 'ola'],
    ['bus', 10.2, 'Kasztanowa. Ola wysiada. On też.'],
    ['walk', 0.3, 'Ola idzie szybko. Śnieg skrzypi pod butami.'],
    ['walk', 3.4, 'Odwraca się. On stoi pod wiatą. Nie idzie za nią.'],
    ['walk', 5.6, '[relieved, shaky] Został na przystanku… uff.', 'ola'],
    ['walk', 10.6, 'Nie musiał iść za nią. Wystarczyło patrzeć.'],
    ['entrance', 0.3, 'Kod. Klucz. Drzwi klatki zamykają się za nią.'],
    ['entrance', 6.6, 'Po drugiej stronie ulicy, pod latarnią, staje on.'],
    ['entrance', 8.6, 'Osiemdziesiąt okien. Wszystkie ciemne.'],
    ['switch', 0.3, 'Ola wchodzi do pokoju. Ręka na włączniku.'],
    ['switch', 5.0, 'Jedno okno się zapala.'],
    ['switch', 7.8, '[whispers, pleased] Dziewiąte piętro… piąte okno.', 'pasazer'],
    ['call', 0.3, 'Za firanką, pod latarnią, on macha.'],
    ['call', 2.4, '[panicked whisper] On stoi pod blokiem. Jechał za mną autobusem.', 'ola'],
    ['call', 5.6, 'Zgaś światło, odejdź od okna i nikomu nie otwieraj.', 'dyspozytor'],
    ['call', 8.8, 'Radiowóz już jedzie.', 'dyspozytor'],
    ['police', 0.6, 'Radiowóz. Pod latarnią pusto.'],
    ['police', 4.4, 'Pod latarnią nikogo. Ale są ślady.', 'policjant'],
    ['police', 7.4, '[grim] Prowadzą do klatki. Ktoś go wpuścił.', 'policjant'],
    ['end', 0.4, 'Pierwsza dwadzieścia osiem. Wiadomość. Zdjęcie jej okna.'],
    ['end', 9.2, 'Pukanie. Do drzwi dziewięćdziesiąt cztery.'],
    ['end', 12.2, 'Światło na korytarzu zapala się samo.'],
    ['end', 14.6, '[whispers] Teraz ja zapalę światło… Ola.', 'pasazer'],
]
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 117.99], [-34, -34]),
    loops={'groza': ([0, .3, 5.5, 6.5, 12, 18, 22, 26, 30, 36, 42, 48, 54, 58.6, 60, 64, 68, 74, 79.6, 82, 90, 96, 100, 106, 110, 111.55, 111.7, 113, 117.99],
                     [-60, -12, -12, -20, -20, -12, -10, -18, -16, -14, -14, -12, -12, -10, -7, -10, -12, -10, -8, -18, -16, -14, -12, -9, -7, -4, -70, -22, -30]),
           'tension': ([0, 12, 42, 54, 96, 111.55, 111.7, 117.99], [-32, -26, -22, -18, -20, -14, -60, -60]),
           'drone': ([0, 96, 111.55, 111.7, 117.99], [-30, -24, -14, -60, -60]),
           'wind': ([0, 22, 22.1, 54, 54.1, 82, 82.1, 96, 117.99], [-90, -90, -28, -28, -90, -90, -30, -90, -90]),
           'roomtone': ([0, 117.99], [-40, -40])},
    heartbeat=([0, 12, 16, 26, 54, 58, 68, 82, 96, 104, 111.5, 111.6, 117.99], [-90, -90, -14, -90, -90, -12, -10, -90, -90, -14, -6, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -18)], 'hit': [('boom', -3)], 'notif': [('notif', -9)], 'click': [('tap', -6)],
           'door': [('doorclose', -10)], 'buzz': [('buzz', -8)], 'dial': [('dial', -12)], 'siren': [('siren', -12)], 'knock': [('knock', -4)]}
EXTRA = [(111.6, 'hit_low', 0), (111.6, 'sting', -3), (107.6, 'riser', -6), (19.6, 'hit_low', -2), (31.0, 'sting', -9), (60.2, 'hit_low', -1), (60.2, 'sting', -6),
         (79.6, 'hit_low', -3), (90.0, 'sting', -8), (106.0, 'breath', -8), (16.0, 'breath', -10)] + [(t, 'hit_low', -6) for t in (0.2, 6, 12, 26, 42, 54, 68, 82, 96)]
MAXK = 1.5
