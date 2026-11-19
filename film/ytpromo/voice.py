"""Lektor do wstawki YouTube (zaproszenie na stronę). Ten sam głos i filtr co w odcinkach."""
import json, urllib.request, subprocess, os
V = 'eodmrbuYw8DsHyDR5b6f'; ST = {'stability': 0.5, 'similarity_boost': 0.85}
F = 'asetrate=48000*0.93,aresample=48000,atempo=1.075,lowpass=f=7500,highpass=f=60,acompressor=threshold=-22dB:ratio=3,aecho=0.7:0.5:70|140:0.22|0.12'
LINES = ['[low, ominous voice, slowly] Myślisz, że przetrwałbyś noc w bloku dziewięćdziesiąt cztery?',
         '[low, ominous voice, slowly] Sprawdź to w naszej grze.',
         '[low, ominous voice, slowly] Wejdź na protokolocaleni kropka online.',
         '[whispering] Link w opisie.']
for i, t in enumerate(LINES):
    raw, out = f'l{i}.mp3', f'l{i}.wav'
    if not os.path.exists(raw):
        req = urllib.request.Request(f'https://api.elevenlabs.io/v1/text-to-speech/{V}?output_format=mp3_44100_128', data=json.dumps({'text': t, 'model_id': 'eleven_v3', 'voice_settings': ST, 'language_code': 'pl'}).encode(), headers={'Content-Type': 'application/json', 'xi-api-key': 'proxy-injected'})
        open(raw, 'wb').write(urllib.request.urlopen(req, timeout=180).read())
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', raw, '-af', F, '-ar', '48000', '-ac', '2', out], check=True)
    print(i, subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', out]).decode().strip())
