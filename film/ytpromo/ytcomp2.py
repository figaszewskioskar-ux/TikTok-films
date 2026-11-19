"""Składanka YouTube 1920x1080: pionowy odcinek na środku, po bokach panele z promocją strony i postaciami (sides.png);
wstawki 1920x1080 (np. insert.mp4) wchodzą bez zmian. Argumenty: out, sides.png, JSON [[plik, tytuł|null], ...]."""
import subprocess, sys, json
out, sides, items = sys.argv[1], sys.argv[2], json.loads(sys.argv[3])
FONT = '/usr/share/fonts/opentype/inter/Inter-Bold.otf'
ins, parts, n = [], [], len(items)
for f, _ in items: ins += ['-i', f]
ins += ['-loop', '1', '-framerate', '30', '-i', sides]
nv = sum(1 for _, t in items if t is not None)
parts.append(f"[{n}:v]format=rgba,split={nv}" + ''.join(f'[s{k}]' for k in range(nv)) + ';')
k = 0
for i, (f, title) in enumerate(items):
    if title is None:
        parts.append(f"[{i}:v]fps=30,scale=1920:1080,setsar=1,format=yuv420p[v{i}];")
    else:
        t = title.replace("'", "’").replace(':', '\\:')
        parts.append(f"[{i}:v]fps=30,scale=608:1080,setsar=1,pad=1920:1080:656:0:black[c{i}];[c{i}][s{k}]overlay=0:0:shortest=1,"
                     f"drawtext=fontfile={FONT}:text='{t}':x=(w-text_w)/2:y=36:fontsize=34:fontcolor=white:enable='lt(t,6)':box=1:boxcolor=0x000000CC:boxborderw=14,format=yuv420p[v{i}];")
        k += 1
    parts.append(f"[{i}:a]aresample=48000,aformat=channel_layouts=stereo[a{i}];")
fc = ''.join(parts) + ''.join(f'[v{i}][a{i}]' for i in range(n)) + f'concat=n={n}:v=1:a=1[v][a]'
subprocess.run(['ffmpeg', '-v', 'error', '-y', *ins, '-filter_complex', fc, '-map', '[v]', '-map', '[a]', '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', out], check=True)
print('ok', out)
