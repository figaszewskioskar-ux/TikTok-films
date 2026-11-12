"""BLOK 94 · „Kto tam?” ODC. 9 — „Nie klikaj w link!”. Wersja do akceptacji: bez lektora (PREVIEW)."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'   # lektor: Victor
MODEL = 'eleven_multilingual_v2'
SETTINGS = {'stability': 0.5, 'similarity_boost': 0.8, 'style': 0.2, 'use_speaker_boost': True}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {
    'ola':       ('d4Z5Fvjohw3zxGpV8XUV', 'eleven_v3', V3),
    'kuba':      ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3),
    'zdzisiek':  ('xsSg7GkDPDhaGZpbKOLn', 'eleven_v3', V3),
    'kaptur':    ('rUOVqZ1ISbf2yl2Vbpwa', 'eleven_v3', V3),
    'policjant': ('JWUOwsYG4XgR9Od3eeon', 'eleven_v3', V3),
}
SCENES = [('hook', 0, 6), ('recap', 6, 12), ('turn', 12, 24), ('reply', 24, 34), ('click', 34, 44), ('ola', 44, 54),
          ('police', 54, 68), ('stairs', 68, 82), ('notif', 82, 98), ('end', 98, 118)]
SEG = [
    ['hook', 0.2, 'Jeśli obcy przysyła ci link… nie klikaj. Nawet jeśli obiecuje odpowiedź.'],
    ['recap', 0.2, 'Poprzednio: kamerka w laptopie zapaliła się sama. Na podglądzie ktoś stał za Kubą.'],
    ['turn', 0.2, 'Kuba odwraca się. W drzwiach nikogo nie ma.'],
    ['turn', 5.6, 'Ale na podglądzie… on wciąż tam stoi.'],
    ['turn', 7.6, 'To nie jest obraz na żywo. To nagranie. Z wczoraj, z trzeciej dwanaście. Był w ich mieszkaniu.'],
    ['reply', 0.2, 'Na laptopie wiadomość od „Kaptur dziewięćdziesiąt cztery”. Link.'],
    ['reply', 3.6, 'Kuba nie wytrzymuje. Odpisuje.'],
    ['reply', 6.0, 'Błąd pierwszy. Teraz on wie, że Kuba czyta. I że się boi.'],
    ['click', 0.2, 'Kuba klika. „Ochrona konta. Pobierz.”'],
    ['click', 2.6, 'Błąd drugi.'],
    ['click', 4.6, 'Kursor zaczyna ruszać się sam. Zdjęcia. Klucze. Grafik rodziców.'],
    ['ola', 0.2, 'Ola zatrzaskuje laptop.'],
    ['ola', 2.4, 'Wyciąga wtyczkę od internetu. I dzwoni do mamy.'],
    ['ola', 5.8, 'Dobrze. Najpierw odłączyć. Potem wezwać dorosłych.'],
    ['police', 0.2, 'Rano przychodzi dzielnicowy.'],
    ['police', 2.2, 'Nie usuwajcie niczego. To są dowody.', 'policjant'],
    ['police', 5.0, 'Ktoś przejął konto? Odłącz urządzenie od internetu. Zmień hasła na innym urządzeniu. Włącz weryfikację dwuetapową. I zgłoś to policji oraz do CERT Polska.'],
    ['stairs', 0.2, 'Mama wynosi laptop do serwisu.'],
    ['stairs', 1.6, 'Na klatce pan Zdzisiek: w nocy ktoś chodził po dachu.'],
    ['stairs', 6.4, 'Dziesiąte piętro. Mieszkanie sto cztery zaplombowane przez policję.'],
    ['stairs', 9.2, 'A pod drzwiami… pali się światło.'],
    ['notif', 0.2, 'Noc. Internet jest wyłączony. Wszyscy śpią. Telefon Oli się zapala.'],
    ['notif', 4.2, 'Bluetooth. „Kaptur dziewięćdziesiąt cztery” chce udostępnić zdjęcie. Bluetooth działa tylko z bliska.'],
    ['notif', 10.2, 'Ola nie powinna tego otwierać. Ale palec sam dotyka ekranu.'],
    ['end', 0.2, 'Zdjęcie. Łóżko Oli. Z perspektywy drzwi. Zrobione… teraz.'],
    ['end', 5.2, 'Ola nie oddycha. Za jej plecami drzwi pokoju powoli się uchylają.'],
    ['end', 13.4, '[whispers] Dobranoc, Ola.', 'kaptur'],
]
VFILTER = {'policjant': 'highpass=f=90', 'kaptur': 'lowpass=f=3400,aecho=0.6:0.4:30:0.3'}
VGAIN = {'kaptur': 1.6}
MAXK = 1.5
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 6, 12, 24, 44, 54, 68, 82, 98, 111, 111.2, 117.99], [-26, -28, -24, -25, -24, -28, -24, -22, -20, -16, -60, -24]),
    loops={'tension': ([0, .5, 12, 24, 34, 44, 54, 68, 82, 98, 106, 111.3, 111.45, 113, 117.99], [-60, -20, -17, -16, -15, -17, -22, -16, -14, -12, -9, -6, -60, -18, -40]),
           'drone': ([0, 1, 12, 24, 34, 44, 54, 68, 82, 98, 104, 111.3, 111.45, 113, 117.99], [-60, -28, -24, -22, -20, -22, -30, -22, -20, -18, -14, -9, -40, -22, -60]),
           'roomtone': ([0, 117.99], [-34, -34])},
    heartbeat=([0, 12, 14, 24, 34, 38, 44, 82, 86, 98, 111.3, 111.4, 117.99], [-90, -90, -18, -16, -90, -16, -90, -90, -16, -14, -6, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -18)], 'creak': [('creak', -10)], 'hit': [('boom', -3)],
           'notif': [('notif', -9)], 'error': [('boom', -8)], 'click': [('tap', -10)], 'slam': [('slam', -5)],
           'knock': [('knock', -5)], 'door': [('doorclose', -10)], 'vib': [('vibrate', -8)]}
EXTRA = [(111.35, 'hit_low', 0), (111.35, 'sting', -3), (107.3, 'riser', -6), (90.0, 'breath', -10), (104.0, 'breath', -8), (0.2, 'hit_low', -6), (6, 'hit_low', -6), (12, 'hit_low', -6), (17.4, 'hit_low', -2), (24, 'hit_low', -6), (29.4, 'hit_low', -6), (34, 'hit_low', -6), (38.6, 'hit_low', -2), (44, 'hit_low', -6), (54, 'hit_low', -6), (63, 'hit_low', -6), (68, 'hit_low', -6), (74.4, 'hit_low', -6), (82, 'hit_low', -6), (88, 'hit_low', -6), (98, 'hit_low', -6), (104, 'hit_low', -6)]
