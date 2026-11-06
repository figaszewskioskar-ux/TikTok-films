"""Efekty dźwiękowe z ElevenLabs Sound Effects (w stylu oryginału: niski narastający podkład,
głuche uderzenia, realistyczne odgłosy windy, kluczy, domofonu). Wynik: out/sfx/<nazwa>.wav (48 kHz mono)."""
import json, os, subprocess, urllib.request, urllib.error

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, 'out', 'sfx')
os.makedirs(OUT, exist_ok=True)

SFX = {
    'bed':        (22, True,  'dark ominous low drone, deep sub-bass rumble, slow evolving horror tension ambience, no melody'),
    'wind':       (12, True,  'cold winter night wind outdoors near apartment block, soft snow ambience'),
    'boom':       (3,  False, 'deep cinematic low boom impact hit, dark trailer hit with long sub tail'),
    'whoosh':     (1.2, False, 'short dark swoosh transition'),
    'elev_ding':  (1.5, False, 'old elevator arrival ding bell, single chime'),
    'elev_doors': (3,  False, 'old metal elevator doors sliding open, mechanical rumble'),
    'buzz':       (2,  False, 'old apartment block intercom door release electric buzzer'),
    'ring':       (2,  False, 'apartment intercom handset ringing, two tone electronic ring'),
    'door_lock':  (3,  False, 'key turning in apartment block entrance door lock, heavy metal door opening'),
    'keys':       (1.5, False, 'bunch of keys jingling in hand'),
    'stairs':     (4,  False, 'footsteps walking up concrete stairwell in apartment block, echo'),
    'box_kick':   (1.5, False, 'kicking an empty cardboard box, it falls over on tiled floor'),
    'lockpick':   (5,  False, 'quiet lock picking, small metal clicks and scraping inside a door lock'),
    'vibrate':    (3,  False, 'mobile phone vibrating on silent, buzzing'),
    'heartbeat':  (8,  True,  'tense slow heartbeat, deep thumping, suspense'),
    'door_bang':  (1.5, False, 'apartment door swung open forcefully from inside'),
    'run':        (3,  False, 'two people running away fast down stairwell, hurried footsteps fading'),
    'tv':         (8,  True,  'football match on TV in another room, muffled commentator and stadium crowd'),
    'sting':      (4,  False, 'dark cinematic ending sting, eerie low hit with reverse swell'),
}


def gen(name, dur, loop, prompt):
    mp3 = os.path.join(OUT, name + '.mp3'); wav = os.path.join(OUT, name + '.wav')
    if not os.path.exists(mp3):
        body = {'text': prompt, 'duration_seconds': dur, 'prompt_influence': 0.45}
        if loop:
            body['loop'] = True
        req = urllib.request.Request('https://api.elevenlabs.io/v1/sound-generation?output_format=mp3_44100_128',
                                     data=json.dumps(body).encode(),
                                     headers={'Content-Type': 'application/json', 'xi-api-key': os.environ.get('ELEVEN_API_KEY', 'proxy-injected')})
        try:
            with urllib.request.urlopen(req, timeout=180) as r:
                open(mp3, 'wb').write(r.read())
        except urllib.error.HTTPError as e:
            if loop and e.code in (400, 422):  # model bez pętli — spróbuj bez niej
                return gen_noloop(name, dur, prompt)
            raise SystemExit(f'{name}: HTTP {e.code} {e.read()[:300]}')
    subprocess.run(['ffmpeg', '-y', '-v', 'error', '-i', mp3, '-ar', '48000', '-ac', '1', wav], check=True)
    print('ok', name)


def gen_noloop(name, dur, prompt):
    return gen(name, dur, False, prompt)


for n, (d, lp, pr) in SFX.items():
    gen(n, d, lp, pr)
