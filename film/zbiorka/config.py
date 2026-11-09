"""BLOK 94 · SPECJAL 11.11 — „Nie otwieraj zbiórce!” (poza sezonem, ok. 2 min)"""
VOICE = 'eodmrbuYw8DsHyDR5b6f'   # lektor: Victor
MODEL = 'eleven_multilingual_v2'
SETTINGS = {'stability': 0.5, 'similarity_boost': 0.8, 'style': 0.2, 'use_speaker_boost': True}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {
    'kuba':     ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3),
    'zdzisiek': ('xsSg7GkDPDhaGZpbKOLn', 'eleven_v3', V3),
    'sasiad':   ('rUOVqZ1ISbf2yl2Vbpwa', 'eleven_v3', V3),   # zbierający — ten sam głos co Kaptur
    'kaptur':   ('rUOVqZ1ISbf2yl2Vbpwa', 'eleven_v3', V3),
}
SQUEEZE = 0.8
SCENES = [('hook', 0, 6), ('intro', 6, 16), ('ring', 16, 26), ('open', 26, 38), ('list', 38, 44), ('zdz', 44, 56),
          ('photo', 56, 66), ('end', 66, 80)]
SEG = [
    ['hook', 0.1, 'Jeśli ktoś zbiera pieniądze pod twoimi drzwiami… nie otwieraj.'],
    ['intro', 0.4, 'Jedenasty listopada. Rodzice pojechali do babci. Ola i Kuba zostają sami.'],
    ['intro', 5.4, 'Mama pisze: wracamy o dwudziestej trzeciej.'],
    ['ring', 0.3, 'Dwudziesta pierwsza. Dzwonek.'],
    ['ring', 4.4, 'W wizjerze dwie osoby. Biało-czerwone opaski. Puszka.'],
    ['ring', 6.6, '[friendly] Dobry wieczór! Zbiórka na znicze dla kombatantów. Wpiszecie się na listę?', 'sasiad'],
    ['open', 0.3, 'Ola otwiera. Przecież to zbiórka.'],
    ['open', 1.6, 'Błąd pierwszy.'],
    ['open', 4.6, 'Dziewięćdziesiąt cztery. Rodzice wracają o dwudziestej trzeciej.', 'kuba'],
    ['open', 8.2, 'Błąd drugi.'],
    ['list', 0.4, 'Na liście są już inne mieszkania. Przy każdym… godzina.'],
    ['zdz', 0.3, 'Po chwili na klatkę wychodzi pan Zdzisiek.'],
    ['zdz', 2.2, '[suspicious] Jaka zbiórka? Nikt tu nic nie zgłaszał.', 'zdzisiek'],
    ['zdz', 6.2, 'Prawdziwą zbiórkę publiczną sprawdzisz na zbiórki kropka gov kropka pl. Nie wpuszczaj obcych. Wesprzeć możesz przez internet.'],
    ['photo', 0.4, 'Ola zrobiła zdjęcie listy.'],
    ['photo', 2.2, 'Wszystkie wpisy z całego bloku… jednym charakterem pisma.'],
    ['photo', 5.0, 'Przy każdym mieszkaniu godzina. Kiedy ktoś zostaje sam.'],
    ['end', 0.3, 'Dwudziesta druga pięćdziesiąt osiem.'],
    ['end', 2.2, 'Ktoś puka. Wizjer jest czarny.'],
    ['end', 7.0, 'Pod drzwi wsuwa się kartka. Ostatnia linijka… dopisana przed chwilą.'],
    ['end', 11.0, '[whispers] Zbiórka.', 'kaptur'],
]
VFILTER = {'kuba': 'highpass=f=100', 'sasiad': 'highpass=f=90,lowpass=f=3800', 'zdzisiek': 'highpass=f=90,aecho=0.6:0.4:40:0.25',
           'kaptur': 'lowpass=f=3200,aecho=0.7:0.6:60:0.35'}
VGAIN = {'kaptur': 1.4}
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 6, 16, 26, 38, 44, 56, 66, 70, 72.4, 72.6, 79.99], [-27, -30, -28, -27, -26, -28, -26, -24, -22, -60, -22, -20]),
    loops={'roomtone': ([0, 79.99], [-40, -40])},
    heartbeat=([0, 56, 60, 66, 79.99], [-90, -90, -26, -22, -18]),
)
REALMAP = {'ring': [('ring', -8)], 'unlock': [('unlock', -8)], 'paper': [('paper', -10)], 'door': [('doorclose', -10)],
           'knock': [('knock', -4)], 'notif': [('notif', -9)], 'whoosh': [('whoosh', -18)]}
# TARGET domyślnie 118 s (ok. 2 min), jak w nowych częściach serii
