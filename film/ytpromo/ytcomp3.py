"""Składanka YouTube 1920x1080 po kawałku (mało pamięci): każdy element osobno, potem concat bez rekompresji.
Pionowe odcinki: na środku, po bokach panele (sides.png) + tytuł przez 6 s. Wstawki 1920x1080 (tytuł null) bez zmian.
Argumenty: out, sides.png, JSON [[plik, tytuł|null], ...]."""
import subprocess, sys, json, os, tempfile
out, sides, items = sys.argv[1], sys.argv[2], json.loads(sys.argv[3])
FONT = '/usr/share/fonts/opentype/inter/Inter-Bold.otf'
tmp = tempfile.mkdtemp(dir=os.path.dirname(os.path.abspath(out)))
enc = ['-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-pix_fmt', 'yuv420p', '-r', '30', '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-ac', '2']
parts = []
for i, (f, title) in enumerate(items):
    p = os.path.join(tmp, f'p{i}.mp4')
    if title is None:
        vf = ['-i', f, '-vf', 'fps=30,scale=1920:1080,setsar=1']
    else:
        t = title.replace("'", "’").replace(':', '\\:')
        vf = ['-i', f, '-loop', '1', '-framerate', '30', '-i', sides, '-filter_complex',
              f"[0:v]fps=30,scale=608:1080,setsar=1,pad=1920:1080:656:0:black[c];[1:v]format=rgba[s];[c][s]overlay=0:0:shortest=1,"
              f"drawtext=fontfile={FONT}:text='{t}':x=(w-text_w)/2:y=36:fontsize=34:fontcolor=white:enable='lt(t,6)':box=1:boxcolor=0x000000CC:boxborderw=14[v]", '-map', '[v]', '-map', '0:a']
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-threads', '4', *vf, *enc, p], check=True); parts.append(p); print('part', i, flush=True)
lst = os.path.join(tmp, 'list.txt'); open(lst, 'w').write(''.join(f"file '{p}'\n" for p in parts))
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', lst, '-c', 'copy', '-movflags', '+faststart', out], check=True)
for p in parts: os.remove(p)
os.remove(lst); os.rmdir(tmp); print('ok', out)
