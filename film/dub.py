"""Dubbing ElevenLabs dla BLOK 94 · ODC. 1.
Generuje każdą kwestię do out/voice/<id>.mp3 (z pamięcią podręczną) i zapisuje out/voice/lines.json
z czasem startu i długością. Klucz API wstrzykuje proxy środowiska (nagłówek xi-api-key);
jeśli uruchamiasz lokalnie, ustaw zmienną ELEVEN_API_KEY."""
import json, os, subprocess, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, 'out', 'voice')
os.makedirs(OUT, exist_ok=True)

# Głosy wbudowane (działają na darmowym planie). Na płatnym planie można podmienić na polskie
# głosy z biblioteki — propozycje w komentarzach.
VOICES = {
    'lektor':   'nPczCjzI2devNBz1zQrb',  # Brian (biblioteka PL: Ryszard - Sinister Storyteller rUOVqZ1ISbf2yl2Vbpwa)
    'kuba':     'TX3LPaxmHKxFdv7VOQHJ',  # Liam (PL: Kamil - Expressive, Joyful mr1ubFaLs5xVrh1EqWtc)
    'kurier':   'iP95p4xoKVk53GoZ742B',  # Chris (PL: Marek - Conversational Tq9w09mAjuFKRAZRcBR5)
    'zdzisiek': 'pqHfZKP75CvOlQylNhV4',  # Bill (PL: Dziadek Wiktor GYIFzZqrrlcE48raxPZg)
    'halina':   'pFZP5JQG7iQjIQuC4Bku',  # Lily (PL: Babcia Bożenka 6qkrzTbAj75WW5U8X5mB)
    'kaptur':   'N2lVS1w4EtoT3dr4eOWO',  # Callum
}
MODEL = 'eleven_v3'

# [id, start (s), koniec okna (s), kto, tekst]
LINES = [
    ['l01', 0.30, 2.0, 'lektor', '[serious] Nie otwieraj kurierowi.'],
    ['l02', 1.95, 5.7, 'lektor', 'Kuba zrobi trzy błędy. [pause] Znajdziesz wszystkie?'],
    ['l03', 12.0, 16.0, 'kurier', '[friendly] Paczka do siedemdziesiąt jeden. Nikt nie otwiera. Wpuści pan?'],
    ['l04', 17.6, 19.4, 'kuba', '[casual] Dobra, otwieram.'],
    ['l05', 24.7, 27.7, 'kurier', '[cheerful] Dzięki, szefie! Ciężkie to.'],
    ['l06', 38.4, 40.0, 'kaptur', '[whispers] Przytrzymasz?'],
    ['l07', 40.05, 41.8, 'kuba', 'Jasne!'],
    ['l08', 48.2, 51.3, 'zdzisiek', '[curious] Kuba! A ten w kapturze to do kogo?'],
    ['l09', 51.5, 54.0, 'kuba', '[unsure] Nie wiem… kurierowi otworzyłem.'],
    ['l10', 54.2, 57.4, 'zdzisiek', '[proudly] Ja tu znam wszystkich. Jego nie znam.'],
    ['l11', 57.3, 59.7, 'kurier', 'Pani z siedemdziesiąt jeden… kiedy wraca?'],
    ['l12', 59.75, 62.6, 'kuba', '[carelessly] Nie ma jej, wyjechała do córki! Do niedzieli.'],
    ['l13', 63.4, 66.0, 'zdzisiek', '[suspicious] Kurier bez paczki? I schodami?'],
    ['l14', 76.4, 78.5, 'kurier', '[whispers] Pusto. Dawaj.'],
    ['l15', 89.7, 94.3, 'halina', '[angry] Kawalerze… ja słyszę WSZYSTKO przez domofon!'],
    ['l16', 94.6, 97.9, 'halina', '[shouting] I nie wracajcie! A ty, Kuba, też dostaniesz!'],
    ['l17', 99.0, 102.0, 'zdzisiek', '[laughs] Do widzenia panom kurierom!'],
    ['l18', 102.4, 105.1, 'lektor', 'Błąd pierwszy: wpuścił obcego.'],
    ['l18b', 105.2, 107.3, 'lektor', 'Drugi: przytrzymał drzwi.'],
    ['l18c', 107.35, 110.2, 'lektor', 'Trzeci: zdradził, że sąsiadki nie ma.'],
    ['l18d', 110.25, 113.0, 'lektor', 'A czwarty? Napisz w komentarzu.'],
    ['l19', 113.2, 116.4, 'lektor', 'Kurier dzwoni do adresata. Nie do ciebie.'],
    ['l20', 116.5, 118.6, 'lektor', '[intrigued] A ty… otworzyłbyś?'],
]


def tts(text, voice, path):
    body = json.dumps({'text': text, 'model_id': MODEL, 'language_code': 'pl',
                       'voice_settings': {'stability': 0.5, 'similarity_boost': 0.75}}).encode()
    req = urllib.request.Request(
        f'https://api.elevenlabs.io/v1/text-to-speech/{voice}?output_format=mp3_44100_128', data=body,
        headers={'Content-Type': 'application/json', 'xi-api-key': os.environ.get('ELEVEN_API_KEY', 'proxy-injected')})
    with urllib.request.urlopen(req, timeout=120) as r:
        open(path, 'wb').write(r.read())


def duration(path):
    return float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', path]))


out = []
for lid, start, end, who, text in LINES:
    p = os.path.join(OUT, f'{lid}_{who}.mp3')
    meta = p + '.txt'
    if not (os.path.exists(p) and os.path.exists(meta) and open(meta).read() == text + VOICES[who]):
        tts(text, VOICES[who], p)
        open(meta, 'w').write(text + VOICES[who])
    w = p[:-4] + '.wav'
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', p, '-af',
                    'silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse,apad=pad_dur=0.05',
                    '-ar', '48000', '-ac', '1', w], check=True)
    p = w
    d = duration(p)
    out.append({'id': lid, 't': start, 'end': end, 'who': who, 'file': p, 'dur': d})
    print(f'{lid} {who:9s} {start:6.2f}  okno {end - start:4.1f}s  nagranie {d:4.2f}s {"⚠️ ZA DŁUGIE" if d > (end - start) + .4 else ""}')
json.dump(out, open(os.path.join(OUT, 'lines.json'), 'w'), indent=1)
