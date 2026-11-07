#!/bin/bash
# sklej klatki z out/stills w jeden arkusz (4 w rzędzie)
cd "$(dirname "$0")/${EP:-odc1}/out/stills" && ls *.jpg | sort -V > /tmp/l.txt
n=$(wc -l < /tmp/l.txt); rows=$(( (n+3)/4 ))
ffmpeg -v error -y $(sed 's/^/-i /' /tmp/l.txt | tr '\n' ' ') -filter_complex "$(for i in $(seq 0 $((n-1))); do printf "[$i]scale=360:640[v$i];"; done)$(for i in $(seq 0 $((n-1))); do printf "[v$i]"; done)xstack=inputs=$n:layout=$(for i in $(seq 0 $((n-1))); do c=$((i%4)); r=$((i/4)); printf "%s_%s|" $((c*360)) $((r*640)); done | sed 's/|$//')$( [ $n -lt 4 ] && echo "" )[o]" -map "[o]" ../sheet.jpg
