#!/bin/bash

# Parâmetros do vídeo
FRAMES=100          # Número de frames
WIDTH=800           # Largura da imagem
HEIGHT=600          # Altura da imagem
FPS=30              # Frames por segundo do vídeo

# Cria o diretório para salvar os frames
mkdir -p frames2

# Loop para gerar cada frame
for i in $(seq 1 $FRAMES); do
  # Gerar pontos aleatórios
  X1=$(( RANDOM % WIDTH ))
  Y1=$(( RANDOM % HEIGHT ))
  X2=$(( RANDOM % WIDTH ))
  Y2=$(( RANDOM % HEIGHT ))

  # Gerar gradiente e sobrepor texto e pontos aleatórios no frame
  ffmpeg -y -f lavfi -i color=black:s=${WIDTH}x${HEIGHT} \
  -vf "format=rgba,geq=r='p(X,Y)':g='p(X,Y)':b='p(X,Y)':a='255*(1-(Y/H))', \
  drawtext=fontfile='C\\:/Windows/Fonts/arial.ttf':text='Frame $i':fontcolor=white:fontsize=20:x=(w-text_w)/2:y=30, \
  drawtext=fontfile='C\\:/Windows/Fonts/arial.ttf':text='Ponto 1':fontcolor=red:fontsize=20:x=$X1:y=$Y1, \
  [1:v]drawtext=fontfile='C\\:/Windows/Fonts/arial.ttf':text='Ponto 2':fontcolor=blue:fontsize=20:x=$X2:y=$Y2" -frames:v 1 \
  frames2/frame_$i.png
done

# Compilar frames em um vídeo MP4
# ffmpeg -framerate $FPS -i frames/frame_%d.png -c:v libx264 -pix_fmt yuv420p output.mp4
