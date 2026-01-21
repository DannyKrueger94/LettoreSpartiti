# 🎼 Generazione Icone PWA

## Icone Necessarie
Per la PWA hai bisogno di icone in diverse dimensioni:
- 72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, 512x512

## Come Generare le Icone

### Opzione 1: Online (Raccomandato - Veloce)
1. Vai su: **https://realfavicongenerator.net/** oppure **https://www.pwabuilder.com/imageGenerator**
2. Carica il file `icon-template.svg` oppure crea un'immagine 512x512
3. Seleziona "Generate icons for PWA"
4. Scarica il pacchetto e copia i file PNG nella cartella `/icons/`

### Opzione 2: Usa ImageMagick (se installato)
Se hai ImageMagick installato, puoi generare tutte le dimensioni automaticamente:

```bash
# Installa ImageMagick: https://imagemagick.org/script/download.php
# Poi esegui questi comandi nella cartella icons:

magick icon-template.svg -resize 72x72 icon-72x72.png
magick icon-template.svg -resize 96x96 icon-96x96.png
magick icon-template.svg -resize 128x128 icon-128x128.png
magick icon-template.svg -resize 144x144 icon-144x144.png
magick icon-template.svg -resize 152x152 icon-152x152.png
magick icon-template.svg -resize 192x192 icon-192x192.png
magick icon-template.svg -resize 384x384 icon-384x384.png
magick icon-template.svg -resize 512x512 icon-512x512.png
```

### Opzione 3: Usa uno strumento grafico
1. Apri `icon-template.svg` con:
   - **Inkscape** (gratuito): https://inkscape.org/
   - **Adobe Illustrator**
   - **Figma** (online, gratuito)
   
2. Esporta in PNG alle diverse dimensioni

### Opzione 4: Usa un'immagine esistente
Se hai già un logo/immagine quadrata 512x512 (o più grande):
1. Rinominala in `icon-512x512.png`
2. Usa un servizio online per ridimensionarla nelle altre misure

## File da creare:
- `icon-72x72.png`
- `icon-96x96.png`
- `icon-128x128.png`
- `icon-144x144.png`
- `icon-152x152.png`
- `icon-192x192.png`
- `icon-384x384.png`
- `icon-512x512.png`

## Nota
Ho creato un template SVG con:
- 🎵 Pentagramma
- 🎼 Chiave di violino
- 🎶 Note musicali
- ⬇️ Simbolo scroll

Personalizza il design come preferisci! I colori sono coordinati con il tema dell'app.
