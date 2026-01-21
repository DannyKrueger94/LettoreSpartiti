# ⚡ Quick Start - Lettore Spartiti PWA

## 🎯 Passi Immediati

### 1️⃣ Genera le Icone (IMPORTANTE!)
```bash
# Apri nel browser:
icons/icon-generator.html

# Clicca "Usa Template SVG Default" o carica la tua immagine
# Scarica tutte le 8 icone generate e salvale nella cartella /icons/
```

**File richiesti:**
- `icon-72x72.png`
- `icon-96x96.png`
- `icon-128x128.png`
- `icon-144x144.png`
- `icon-152x152.png`
- `icon-192x192.png`
- `icon-384x384.png`
- `icon-512x512.png`

### 2️⃣ Testa in Locale
```bash
# Avvia server (Python)
cd LettoreMusicale_PWA
python -m http.server 8080

# Oppure (Node.js)
npx http-server -p 8080
```

Apri: http://localhost:8080

⚠️ **Nota:** HTTP semplice limita alcune funzioni PWA. Per il test completo usa HTTPS.

### 3️⃣ Deploy Online (Consigliato)

#### Opzione A: GitHub Pages (Gratuito)
```bash
# 1. Crea repo su GitHub
# 2. Nella cartella LettoreMusicale_PWA:

git init
git add .
git commit -m "PWA Lettore Spartiti"
git branch -M main
git remote add origin https://github.com/TUO_USERNAME/spartiti-pwa.git
git push -u origin main

# 3. Settings → Pages → Source: main branch → Save
# 4. URL: https://TUO_USERNAME.github.io/spartiti-pwa
```

#### Opzione B: Netlify Drop (Super Veloce!)
1. Vai su: https://app.netlify.com/drop
2. Trascina la cartella `LettoreMusicale_PWA`
3. Ottieni URL pubblico con HTTPS in 10 secondi!

### 4️⃣ Installa su Dispositivi

#### Su Android:
1. Apri Chrome e vai all'URL della PWA
2. Vedrai banner "Aggiungi alla schermata Home"
3. Tap "Installa" → L'app appare nella home!

#### Su Windows:
1. Apri Chrome/Edge e vai all'URL
2. Clicca icona ⊕ "Installa" nella barra indirizzi
3. Conferma → L'app appare nel menu Start!

## ✅ Checklist Pre-Deploy

- [ ] Icone generate e salvate in `/icons/`
- [ ] `manifest.json` configurato (nome, colori)
- [ ] `service-worker.js` presente
- [ ] Tutti gli spartiti PDF nella cartella `/spartiti/`
- [ ] `spartiti-library.js` aggiornato con i tuoi spartiti
- [ ] Testato in locale (http://localhost:8080)
- [ ] Nessun errore in console DevTools

## 🔍 Test PWA Checklist

Apri DevTools (F12) e verifica:

### Tab "Console"
- [ ] Nessun errore rosso
- [ ] Messaggio "Service Worker registrato"
- [ ] Messaggio "App può essere installata"

### Tab "Application"
- [ ] Manifest → Vedi nome app e icone
- [ ] Service Workers → Status "activated"
- [ ] Cache Storage → Vedi "spartiti-static-v1"

### Test Lighthouse
- [ ] DevTools → Lighthouse → Progressive Web App
- [ ] Score PWA > 90/100

## 🚀 Prossimi Passi

1. **Personalizza**:
   - Cambia colori in `manifest.json`
   - Aggiungi i tuoi spartiti in `js/spartiti-library.js`
   - Personalizza icone

2. **Condividi**:
   - Invia URL agli amici
   - Possono installare come app nativa!

3. **Migliora**:
   - Aggiungi più spartiti
   - Implementa gesture swipe
   - Aggiungi notifiche

## 🆘 Problemi Comuni

### "Service Worker registration failed"
→ Serve HTTPS (usa GitHub Pages o Netlify)

### "Add to Home Screen" non appare
→ Verifica icone presenti e manifest.json valido

### App non funziona offline
→ Visita almeno una volta online, poi funzionerà offline

### Icone mancanti
→ Usa `icon-generator.html` per generarle

## 📱 URL Testing

- **Locale:** http://localhost:8080
- **LAN (altri dispositivi):** http://TUO_IP:8080
- **Online:** Dopo deploy su GitHub/Netlify

Trova il tuo IP:
```bash
# Windows
ipconfig

# Mac/Linux
ip addr
```

## 🎸 Enjoy!

Ora hai una **vera app installabile** su Android e Windows!

Domande? Consulta `README-PWA.md` per dettagli completi.
