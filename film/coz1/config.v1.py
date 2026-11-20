"""CO ZROBISZ? · ODC. 1 — „Obcy w aucie zna twoje imię”. Narracja w 2. osobie, szybkie cięcia, napisy słowo po słowie."""
VOICE = 'eodmrbuYw8DsHyDR5b6f'
MODEL = 'eleven_v3'
SETTINGS = {'stability': 0.5, 'similarity_boost': 0.85}
V3 = {'stability': 0.5, 'similarity_boost': 0.8}
VOICES = {
    'kuba': ('mr1ubFaLs5xVrh1EqWtc', 'eleven_v3', V3),
    'obcy': ('rUOVqZ1ISbf2yl2Vbpwa', 'eleven_v3', V3),
    'pani': ('Xb7hH8MSUJpSbSDYk0k2', 'eleven_v3', V3),
    'mama': ('XrExE9yKIg1WjnnlVkGX', 'eleven_v3', V3),
}
VFILTER = {'lektor': 'asetrate=48000*0.93,aresample=48000,atempo=1.075,lowpass=f=7500,highpass=f=60,acompressor=threshold=-22dB:ratio=3,aecho=0.7:0.5:70|140:0.22|0.12',
           'obcy': 'lowpass=f=6000,aecho=0.5:0.3:40:0.2', 'kuba': 'highpass=f=100', 'pani': 'highpass=f=100', 'mama': 'highpass=f=350,lowpass=f=3200,acompressor'}
VGAIN = {'obcy': 1.2}
MAXK = 1.6
PREVIEW_NO_VOICE = True
TARGET = None
SCENES = [('hook', 0, 3.5), ('trening', 3.5, 6), ('torba', 6, 8.5), ('tel', 8.5, 11), ('ulica', 11, 14), ('swiatla', 14, 16.5), ('obok', 16.5, 19), ('szyba', 19, 21.5),
          ('podwioze', 21.5, 24.5), ('imie', 24.5, 27), ('mama1', 27, 30), ('gdzie', 30, 32.5), ('blad1', 32.5, 36), ('klik', 36, 38.5), ('krok', 38.5, 41.5), ('tyl', 41.5, 44),
          ('zdjecie', 44, 46.5), ('cofasz', 46.5, 49), ('usmiech', 49, 51.5), ('wsiadaj', 51.5, 54), ('haslo', 54, 57), ('cisza', 57, 59.5), ('drzwi', 59.5, 61.5), ('ucieczka', 61.5, 64),
          ('poscig', 64, 67), ('sklep', 67, 69.5), ('pani', 69.5, 72.5), ('zasada', 72.5, 77.5), ('okno', 77.5, 80.5), ('mama2', 80.5, 84), ('syreny', 84, 87), ('dom', 87, 92), ('end', 92, 122)]
SEG = [
    ['hook', 0.1, '[low, ominous voice, slowly] Co się stanie, gdy obcy w aucie zna twoje imię?'],
    ['trening', 0.1, '[low, ominous voice] Wracasz z treningu. Sam.'],
    ['torba', 0.1, '[low, ominous voice] Na torbie przywieszka z twoim imieniem.'],
    ['tel', 0.1, '[low, ominous voice] Mama pracuje do dwudziestej trzeciej. Telefon: dwa procent.'],
    ['ulica', 0.1, '[low, ominous voice] Do domu masz sześć minut.'],
    ['swiatla', 0.1, '[low, ominous voice] Nagle za tobą zwalnia auto.'],
    ['obok', 0.1, '[low, ominous voice] Jedzie obok. Krok w krok.'],
    ['szyba', 0.1, '[low, ominous voice] Szyba zjeżdża w dół.'],
    ['podwioze', 0.2, '[friendly, smiling] Kuba? Zimno dziś, co? Podwiozę cię.', 'obcy'],
    ['imie', 0.1, '[whispering] Zna twoje imię.'],
    ['mama1', 0.2, '[friendly] Znam twoją mamę. Pracujemy razem.', 'obcy'],
    ['gdzie', 0.2, '[casual] Gdzie teraz mieszkacie?', 'obcy'],
    ['blad1', 0.2, '[unsure, quietly] Na Kwiatowej…', 'kuba'],
    ['klik', 0.6, '[low, ominous voice] Klik. Drzwi się odblokowują.'],
    ['krok', 0.1, '[low, ominous voice] Robisz krok w stronę auta.'],
    ['tyl', 0.1, '[low, ominous voice] Na tylnym siedzeniu… zdjęcia.'],
    ['zdjecie', 0.3, '[whispering] Twoje. Z każdego treningu.'],
    ['cofasz', 0.1, '[low, ominous voice] Cofasz się.'],
    ['usmiech', 0.1, '[low, ominous voice] Uśmiech znika.'],
    ['wsiadaj', 0.2, '[cold, slow] Wsiadaj, Kuba. Mama prosiła.', 'obcy'],
    ['haslo', 0.2, '[scared but firm] Jakie jest nasze hasło?', 'kuba'],
    ['cisza', 0.3, '[whispering] Cisza.'],
    ['drzwi', 0.2, '[low, ominous voice] Drzwi auta się otwierają.'],
    ['ucieczka', 0.1, '[urgent] Uciekasz. Torba zostaje na chodniku.'],
    ['poscig', 0.1, '[urgent] Auto rusza za tobą.'],
    ['sklep', 0.1, '[urgent] Przed tobą sklep całodobowy.'],
    ['pani', 0.2, '[panicked, out of breath] Proszę pani! Jakiś pan mnie goni!', 'kuba'],
    ['zasada', 0.2, '[firm, calm] Chodź za ladę. Dzwonię na sto dwanaście.', 'pani'],
    ['okno', 0.2, '[low, ominous voice] Auto staje przed sklepem. Światła gasną.'],
    ['mama2', 0.2, '[worried] Kuba? Ja z nikim takim nie pracuję. Nie wychodź stamtąd!', 'mama'],
    ['syreny', 0.2, '[low, ominous voice] Syreny. Auto odjeżdża.'],
    ['dom', 0.2, '[low, ominous voice] Policja odwozi cię do domu.'],
    ['dom', 2.4, '[whispering] Ale torba… została na ulicy.'],
    ['end', 0.3, '[low, ominous voice] Dwudziesta trzecia trzydzieści jeden. Mama już jest.'],
    ['end', 3.8, '[whispering] Domofon.'],
    ['end', 5.4, '[friendly, smiling] Dobry wieczór. Znalazłem torbę Kuby.', 'obcy'],
    ['end', 9.8, '[screaming] Mamo, nie!', 'kuba'],
    ['end', 13.8, '[low, ominous voice, slowly] Skąd obcy znał imię Kuby? Z torby? Spod szkoły, gdzie stał co tydzień? A może naprawdę z pracy mamy?'],
    ['end', 21.4, '[whispering] Typuj w komentarzu. Odpowiedź… w odcinku drugim.'],
]
SKIP = ['tik']
AUDIO = dict(
    bed=([0, 121.99], [-34, -34]),
    loops={'groza': ([0, .3, 3.5, 14, 36, 41.5, 59.5, 61.5, 67, 72.5, 84, 92, 95.6, 102, 104, 104.15, 106, 121.99],
                     [-60, -12, -20, -14, -12, -10, -6, -8, -12, -20, -18, -24, -12, -6, -4, -70, -26, -34]),
           'tension': ([0, 14, 36, 59.5, 67, 72.5, 92, 100, 104, 104.15, 121.99], [-30, -22, -16, -9, -14, -24, -26, -12, -7, -60, -60]),
           'drone': ([0, 14, 41.5, 59.5, 72.5, 92, 104, 104.15, 121.99], [-32, -24, -18, -12, -26, -26, -10, -60, -60]),
           'roomtone': ([0, 121.99], [-38, -38])},
    heartbeat=([0, 24.5, 41.5, 57, 61.5, 67, 95.6, 100, 104, 104.1, 121.99], [-90, -14, -10, -6, -10, -90, -90, -8, -5, -90, -90]),
)
REALMAP = {'stab': [('boom', -6)], 'whoosh': [('whoosh', -20)], 'hit': [('boom', -3)], 'jolt': [('jolt', -2)], 'engine': [('whoosh', -8)], 'window': [('scrape', -12)], 'click': [('unlock', -3)],
           'door': [('handle', -4)], 'steps': [('run', -5)], 'bell': [('notif', -12)], 'dial': [('dial', -10)], 'brake': [('scrape', -10)], 'siren': [('siren', -10)], 'buzz': [('buzz', -4)]}
EXTRA = [(104.0, 'hit_low', 0), (104.0, 'sting', -3), (100.0, 'riser', -6), (36.6, 'sting', -6), (44.3, 'sting', -5), (59.8, 'sting', -4), (95.6, 'hit_low', -3)] + \
        [(t, 'hit_low', -8) for t in (0.2, 14, 24.5, 41.5, 49, 57, 61.5, 67, 77.5, 92)]
