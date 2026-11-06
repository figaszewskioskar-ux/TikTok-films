"""Narracja lektora (styl oryginału: jeden głos opowiada całą historię).
1) generuje każdy fragment głosem z ElevenLabs (cache w out/narr),
2) liczy, ile trzeba rozciągnąć każdą scenę, żeby narracja się zmieściła,
3) zapisuje timeline.js (czytany przez film.js) i out/narr/lines.json (czytany przez audio.py)."""
import json, os, subprocess, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, 'out', 'narr')
os.makedirs(OUT, exist_ok=True)
VOICE = 'eodmrbuYw8DsHyDR5b6f'   # Victor - Warm, Engaging Narrator (biblioteka ElevenLabs, najbliższy oryginałowi)
MODEL = 'eleven_multilingual_v2'
SETTINGS = {'stability': 0.5, 'similarity_boost': 0.8, 'style': 0.15, 'use_speaker_boost': True}

# sceny w „starym” czasie (tak jak są zapisane w film.js)
SCENES = [('hook', 0, 5), ('ext', 5, 11), ('flat', 11, 21.5), ('lobby1', 21.5, 34), ('door', 34, 45),
          ('lobby2', 45, 66), ('section', 66, 74), ('floor7', 74, 88), ('twist', 88, 98), ('zdz', 98, 102),
          ('reveal', 102, 119), ('end', 119, 124)]
# [scena, moment w scenie (stary czas), tekst]
SEG = [
    ['hook', 0.1, 'Kurier dzwoni do ciebie z paczką dla sąsiada? Nie otwieraj.'],
    ['hook', 2.0, 'Kuba zrobi dziś trzy błędy. Znajdziesz wszystkie?'],
    ['ext', 0.3, 'Dwudziesta pierwsza czterdzieści siedem. Kasztanowa dwanaście. Kuba jest w domu, na dziewiątym piętrze.'],
    ['ext', 3.6, 'Na dole ktoś czeka z paczką.'],
    ['flat', 0.5, 'Dzwoni domofon. Na ekranie: kurier.'],
    ['flat', 1.0, '„Paczka do siedemdziesiąt jeden. Nikt nie otwiera. Wpuści pan?”'],
    ['flat', 5.4, 'Kuba nie myśli długo. Za dwie minuty zaczyna się mecz.'],
    ['flat', 8.0, 'Wciska klucz.'],
    ['lobby1', 0.3, 'Zjeżdża na dół wyrzucić śmieci.'],
    ['lobby1', 1.6, 'Przy windzie stoi ten sam kurier. „Dzięki, szefie. Ciężkie to.”'],
    ['lobby1', 6.6, 'Ale do windy nie wsiada. Idzie schodami. Z ciężką paczką. Na siódme piętro.'],
    ['door', 0.2, 'Kuba wraca od śmietnika, wyciąga klucze.'],
    ['door', 2.8, 'Ktoś idzie tuż za nim. Kaptur, ręce w kieszeniach.'],
    ['door', 4.4, '„Przytrzymasz?”'],
    ['door', 5.9, '„Jasne.” Kuba przytrzymuje drzwi.'],
    ['door', 7.0, 'Obcy nie ma kluczy. Nie mówi nawet „dobry wieczór”.'],
    ['lobby2', 0.4, 'Przy skrzynkach pan Zdzisiek z drugiego piętra.'],
    ['lobby2', 3.2, '„Kuba, a ten w kapturze to do kogo?”'],
    ['lobby2', 6.5, '„Nie wiem. Kurierowi otworzyłem.”'],
    ['lobby2', 9.2, '„Ja tu znam wszystkich. Jego nie znam.”'],
    ['lobby2', 10.7, 'Kurier schodzi. Już bez paczki.'],
    ['lobby2', 12.3, '„Pani z siedemdziesiąt jeden nie otwiera. Kiedy wraca?”'],
    ['lobby2', 14.75, '„Nie ma jej. Wyjechała do córki. Do niedzieli.”'],
    ['lobby2', 17.2, 'Kaptur na schodach słyszy każde słowo.'],
    ['lobby2', 18.4, 'Zdzisiek mruży oczy. Kurier bez paczki? I schodami?'],
    ['section', 0.3, 'Kuba jedzie na dziewiąte. Tamci dwaj idą schodami. Na siódme. Do mieszkania, które przecież jest puste.'],
    ['section', 4.2, 'A Zdzisiek do kogoś dzwoni.'],
    ['floor7', 0.3, 'Siódme piętro. Kurier kopie karton. Pusty.'],
    ['floor7', 2.4, '„Pusto. Dawaj.”'],
    ['floor7', 4.2, 'Kaptur wyciąga wytrych.'],
    ['floor7', 5.4, 'Minuta.'],
    ['floor7', 9.0, 'Dwie.'],
    ['floor7', 11.4, 'Wizjer w drzwiach siedemdziesiąt jeden… ciemnieje.'],
    ['twist', 0.25, 'Drzwi otwierają się od środka.'],
    ['twist', 1.6, 'Pani Halina nigdzie nie wyjechała. „Kawalerze, ja słyszę wszystko przez domofon!”'],
    ['twist', 5.0, 'Uciekają szybciej, niż przyszli.'],
    ['twist', 6.6, '„I nie wracajcie! A ty, Kuba, też dostaniesz!”'],
    ['zdz', 0.6, 'A Zdzisiek macha im na pożegnanie. „Do widzenia panom kurierom!”'],
    ['reveal', 0.4, 'Błąd pierwszy: wpuścił obcego do cudzego mieszkania.'],
    ['reveal', 3.2, 'Drugi: przytrzymał drzwi komuś bez kluczy.'],
    ['reveal', 5.35, 'Trzeci: powiedział na głos, że sąsiadki nie ma.'],
    ['reveal', 8.25, 'A czwarty? Był na samym początku. Napisz w komentarzu.'],
    ['reveal', 11.2, 'Zapamiętaj: kurier dzwoni do adresata. Nie do ciebie.'],
    ['reveal', 14.5, 'A ty… otworzyłbyś?'],
    ['end', 1.3, 'Tej nocy w oknie Kuby gaśnie światło.'],
    ['end', 2.7, 'A kaptur… wciąż stoi pod blokiem.'],
]


def tts(text, prev, nxt, path):
    body = {'text': text, 'model_id': MODEL, 'voice_settings': SETTINGS, 'language_code': 'pl'}
    if prev: body['previous_text'] = prev
    if nxt: body['next_text'] = nxt
    req = urllib.request.Request(f'https://api.elevenlabs.io/v1/text-to-speech/{VOICE}?output_format=mp3_44100_128',
                                 data=json.dumps(body).encode(),
                                 headers={'Content-Type': 'application/json', 'xi-api-key': os.environ.get('ELEVEN_API_KEY', 'proxy-injected')})
    with urllib.request.urlopen(req, timeout=180) as r:
        open(path, 'wb').write(r.read())


def dur(p):
    return float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p]))


segs = []
for i, (sc, a, text) in enumerate(SEG):
    mp3 = os.path.join(OUT, f'n{i:02d}.mp3'); meta = mp3 + '.txt'; wav = mp3[:-4] + '.wav'
    key = text + VOICE + MODEL + json.dumps(SETTINGS)
    if not (os.path.exists(mp3) and os.path.exists(meta) and open(meta).read() == key):
        tts(text, SEG[i - 1][2] if i else None, SEG[i + 1][2] if i + 1 < len(SEG) else None, mp3)
        open(meta, 'w').write(key)
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', mp3, '-af',
                    'silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse',
                    '-ar', '48000', '-ac', '1', wav], check=True)
    segs.append({'scene': sc, 'a': a, 'text': text, 'file': wav, 'dur': dur(wav)})

# rozciąganie scen odcinkami: każdy odcinek między kolejnymi wejściami lektora dostaje tyle czasu,
# ile trwa jego kwestia; odcinki bez narracji są lekko przyspieszane
SQUEEZE = 0.75
timeline, t = [], 0.0
for name, s0, s1 in SCENES:
    L = s1 - s0
    ss = sorted([x for x in segs if x['scene'] == name], key=lambda x: x['a'])
    olds = [0.0] + [x['a'] for x in ss] + [L]
    news = [0.0]
    for j in range(len(olds) - 1):
        o = olds[j + 1] - olds[j]
        if j == 0:
            n = o if o <= 1.5 else max(o * SQUEEZE, 1.5)
        else:
            x = ss[j - 1]
            n = max(o * SQUEEZE, x['dur'] + (0.5 if j == len(olds) - 2 else 0.22))
        news.append(news[-1] + n)
    knots = [[round(o, 4), round(n, 4)] for o, n in zip(olds, news)]
    timeline.append({'name': name, 'oStart': s0, 'oEnd': s1, 'start': round(t, 3), 'end': round(t + news[-1], 3), 'knots': knots})
    for j, x in enumerate(ss):
        x['t'] = round(t + news[j + 1], 3)
    t += news[-1]
for x in timeline:
    print(f"{x['name']:8s} {x['oEnd'] - x['oStart']:5.1f}s -> {x['end'] - x['start']:5.1f}s")
print(f'RAZEM {t:.1f} s')
json.dump(segs, open(os.path.join(OUT, 'lines.json'), 'w'), indent=1, ensure_ascii=False)
open(os.path.join(HERE, 'timeline.js'), 'w').write('window.TIMELINE = ' + json.dumps(timeline) + ';\n')
