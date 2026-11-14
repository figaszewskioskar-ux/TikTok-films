"""SKRÓTEM · ODC. 2 — „Nie odpisuj!” (wg wzoru wirala odc. 2 BLOK 94). Lektor B + głosy postaci."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'   # lektor: Victor (ustawienia B)
MODEL = 'eleven_multilingual_v2'
SETTINGS = {'stability': 0.32, 'similarity_boost': 0.85, 'style': 0.55, 'use_speaker_boost': True, 'speed': 0.9}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {
    'maja':     ('cgSgspJ2msm6clMCkdW9', 'eleven_v3', V3),
    'mama':     ('XrExE9yKIg1WjnnlVkGX', 'eleven_v3', V3),
    'obcy':     ('rUOVqZ1ISbf2yl2Vbpwa', 'eleven_v3', V3),
}
VFILTER = {'maja': 'highpass=f=110', 'mama': 'highpass=f=350,lowpass=f=3200,acompressor', 'obcy': 'lowpass=f=5200,aecho=0.5:0.3:25:0.2'}
VGAIN = {'obcy': 1.3}
SCENES = [('hook', 0, 5), ('ctx', 5, 11), ('msg', 11, 19), ('reply', 19, 27), ('window', 27, 35), ('bait', 35, 47), ('call', 47, 60),
          ('tag', 60, 72), ('wait', 72, 88), ('end', 88, 104)]
SEG = [
    ['hook', 0.1, 'Jeśli w nocy pisze obcy numer… nie odpisuj. Nawet: kto to?'],
    ['hook', 3.2, 'On właśnie sprawdza, czy nie śpisz.'],
    ['ctx', 0.3, 'Pierwsza dwanaście. Mama ma nocną zmianę.'],
    ['ctx', 2.8, 'Maja jest sama. Za oknem garaże.'],
    ['msg', 0.3, 'Masz coś mojego.'],
    ['msg', 3.0, 'Klucz. Z garażu trzynaście.'],
    ['msg', 5.6, 'Skąd on wie o kluczu?'],
    ['reply', 0.3, 'Maja odpisuje. Kto to?'],
    ['reply', 1.6, 'Wyświetlono. W sekundę.'],
    ['reply', 2.6, 'Wiedziałem, że nie śpisz. Widzę światło z twojego telefonu.'],
    ['window', 0.4, 'Maja podchodzi do okna.'],
    ['window', 2.2, 'W garażu trzynaście pali się światło. Ktoś stoi w środku. I macha.'],
    ['bait', 0.4, 'Nowa wiadomość.'],
    ['bait', 1.6, 'Twoja mama miała wypadek. Prosiła, żebym cię odebrał.'],
    ['bait', 6.2, 'Maja sięga po kurtkę. Ręce się trzęsą.'],
    ['bait', 9.4, 'A potem robi to, co powinna od początku. Dzwoni do mamy.'],
    ['call', 1.6, '[panicked] Mamo? Miałaś wypadek?!', 'maja'],
    ['call', 4.0, '[alarmed] Jestem w pracy! Nikogo nie wysyłałam. Nie otwieraj i nie odpisuj!', 'mama'],
    ['call', 7.8, 'Dzwonię na policję.', 'mama'],
    ['tag', 0.4, 'Skąd zna jej imię i numer? Z zawieszki na torbie. Imię. Numer. Klub.'],
    ['tag', 5.4, 'Nie odpisujesz? Szkoda. Mam twój adres.'],
    ['wait', 0.4, 'Policja: osiem minut. Maja stoi w przedpokoju.'],
    ['wait', 5.6, 'Na klatce zapala się światło.'],
    ['wait', 7.4, 'Pod drzwiami… dwa cienie.'],
    ['wait', 9.6, 'A potem cichy zgrzyt. Ktoś wkłada klucz do zamka.'],
    ['end', 0.4, 'Maja patrzy przez wizjer.'],
    ['end', 2.6, 'Sąsiad z trzeciego piętra. W kapciach. Z pękiem kluczy.'],
    ['end', 7.2, '[whispers, smiling] Nie odpisałaś, Maja… więc przyszedłem.', 'obcy'],
]
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 103.99], [-34, -34]),
    loops={'groza': ([0, .3, 4.5, 5.5, 11, 17, 19, 23, 27, 31, 35, 40, 44, 47, 52, 55, 60, 66, 72, 78, 82, 84, 88, 94, 98, 99.55, 99.7, 101, 103.99],
                     [-60, -12, -12, -22, -20, -14, -16, -10, -16, -10, -14, -10, -8, -16, -14, -12, -18, -14, -16, -12, -9, -7, -14, -10, -8, -4, -70, -22, -30]),
           'tension': ([0, 11, 27, 47, 72, 88, 99.55, 99.7, 103.99], [-32, -26, -20, -22, -16, -14, -12, -60, -60]),
           'drone': ([0, 72, 99.55, 99.7, 103.99], [-30, -22, -14, -60, -60]),
           'roomtone': ([0, 103.99], [-38, -38])},
    heartbeat=([0, 19, 22, 27, 35, 40, 47, 72, 80, 88, 99.5, 99.6, 103.99], [-90, -90, -14, -90, -90, -12, -90, -90, -10, -12, -6, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -18)], 'hit': [('boom', -3)], 'notif': [('notif', -9)], 'buzz': [('vibrate', -6)],
           'click': [('tap', -8)], 'dial': [('dial', -12)], 'keys': [('keys', -4)], 'knock': [('knock', -4)]}
EXTRA = [(99.6, 'hit_low', 0), (99.6, 'sting', -3), (95.6, 'riser', -6), (23.0, 'hit_low', -2), (31.0, 'sting', -9), (42.0, 'hit_low', -2), (55.0, 'sting', -10),
         (84.0, 'hit_low', -1), (84.0, 'sting', -6), (80.0, 'breath', -8)] + [(t, 'hit_low', -6) for t in (0.2, 5, 11, 19, 27, 35, 47, 60, 72, 88)]
MAXK = 1.5
