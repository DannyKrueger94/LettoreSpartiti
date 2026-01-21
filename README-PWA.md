# 🎼 Lettore Spartiti Musicali - PWA

Progressive Web App per leggere spartiti PDF mentre suoni la chitarra, con auto-scroll a velocità variabile.

## ✨ Novità PWA

### 🚀 Funzionalità Progressive Web App
- ✅ **Installabile** su Android e Windows come app nativa
- ✅ **Funzionamento offline** - accedi agli spartiti anche senza connessione
- ✅ **Cache intelligente** - i PDF visitati vengono salvati automaticamente
- ✅ **Aggiornamenti automatici** - l'app si aggiorna da sola quando online
- ✅ **Icona sulla home** - lancia l'app come una qualsiasi altra app
- ✅ **Modalità standalone** - nessuna barra del browser durante l'uso
- ✅ **Notifiche** (futuro) - ricevi aggiornamenti su nuovi spartiti

## 📦 Installazione

### Su Android (Tablet/Smartphone)

#### Metodo 1: Da Server Locale (Testing)
1. **Sul PC**, nella cartella del progetto, avvia un server HTTPS:
   ```bash
   # Installa http-server globalmente (solo la prima volta)
   npm install -g http-server
   
   # Avvia server HTTPS (PWA richiede HTTPS!)
   http-server -S -C cert.pem -K key.pem -p 8080
   ```
   
   Per generare certificati self-signed:
   ```bash
   # Windows (PowerShell)
   New-SelfSignedCertificate -DnsName "localhost" -CertStoreLocation "cert:\LocalMachine\My"
   
   # Oppure usa OpenSSL
   openssl req -newkey rsa:2048 -new -nodes -x509 -days 365 -keyout key.pem -out cert.pem
   ```

2. **Sul tablet Android** (connesso alla stessa rete WiFi):
   - Trova l'IP del PC: `ipconfig` (Windows) o `ip addr` (Linux)
   - Apri Chrome e vai su `https://IP_DEL_PC:8080`
   - Accetta il certificato self-signed (è sicuro, è solo per testing)
   - Vedrai il banner "Aggiungi a schermata Home" 
   - Clicca "Installa" o "Aggiungi"

#### Metodo 2: Hosting Online (Consigliato per uso reale)
1. **GitHub Pages** (Gratuito):
   ```bash
   # Crea repository GitHub
   git init
   git add .
   git commit -m "PWA Lettore Spartiti"
   git remote add origin https://github.com/TUO_USERNAME/lettore-spartiti-pwa.git
   git push -u origin main
   ```
   
   - Vai su: Settings → Pages → Source: main branch
   - Ottieni URL: `https://tuo_username.github.io/lettore-spartiti-pwa`
   - Apri l'URL su Android/Windows e installa!

2. **Netlify/Vercel** (Alternative gratuite):
   - Trascina la cartella su [Netlify Drop](https://app.netlify.com/drop)
   - Ottieni URL pubblico con HTTPS automatico
   - Installa l'app dall'URL

#### Metodo 3: File Locali (Solo per test, funzionalità limitate)
1. Copia l'intera cartella sul tablet
2. Apri `index.html` con Chrome
3. (Le PWA features non funzioneranno senza HTTPS)

### Su Windows Desktop

#### Installazione da Browser
1. Apri Chrome/Edge
2. Vai su `https://TUO_URL` (da server locale o hosting)
3. Clicca sull'icona "Installa" nella barra degli indirizzi
4. L'app verrà installata come applicazione desktop standalone
5. Trovala nel menu Start di Windows!

#### Alternative
- **PWABuilder**: Genera un installer `.msix` per Microsoft Store
  1. Vai su https://www.pwabuilder.com/
  2. Inserisci l'URL della tua PWA
  3. Scarica il package Windows
  4. Installa come app nativa

## 🛠️ Setup Sviluppo

### Generare le Icone
1. Apri `icons/icon-generator.html` nel browser
2. Carica la tua immagine oppure usa il template default
3. Clicca "Genera Tutte le Icone"
4. Scarica tutte le icone generate
5. Salva i file nella cartella `/icons/` con i nomi corretti

### File Richiesti per PWA
- ✅ `manifest.json` - Metadati dell'app
- ✅ `service-worker.js` - Gestione cache offline
- ✅ `icons/*` - Icone multiple dimensioni
- ✅ `index.html` - Aggiornato con meta tag PWA

### Testing Locale con HTTPS

#### Python (Semplice)
```bash
# Python 3
python -m http.server 8000
```
⚠️ Nota: HTTP semplice NON supporta tutte le PWA features

#### Node.js con HTTPS
```bash
npm install -g http-server
http-server -S -C cert.pem -K key.pem -p 8080
```

#### Live Server (VS Code Extension)
1. Installa "Live Server" extension
2. Click destro su `index.html` → "Open with Live Server"
3. Per HTTPS: Settings → Live Server → HTTPS

## 📱 Requisiti

### Browser Supportati
- ✅ Chrome/Chromium (Android/Windows)
- ✅ Edge (Windows)
- ✅ Samsung Internet (Android)
- ⚠️ Firefox (supporto PWA limitato)
- ❌ Safari iOS (supporto PWA parziale)

### Requisiti Tecnici
- **HTTPS obbligatorio** (anche per localhost in produzione)
- Certificato SSL valido (Let's Encrypt gratuito)
- Service Worker compatibile

## 🎯 Funzionalità

### Già Implementate
- ✅ Libreria spartiti organizzata per categorie
- ✅ Caricamento PDF con rendering ottimizzato
- ✅ Auto-scroll fluido e continuo
- ✅ Velocità regolabile (x0.1 - x1.5)
- ✅ Pannello note laterale (non scrolla)
- ✅ Link a video tutorial YouTube
- ✅ Modalità schermo intero
- ✅ Controlli sempre visibili
- ✅ **PWA: Installabile**
- ✅ **PWA: Funzionamento offline**
- ✅ **PWA: Cache automatica**
- ✅ **PWA: Aggiornamenti automatici**

### In Roadmap
- 🔄 Background sync per sincronizzazione spartiti
- 🔄 Notifiche push per nuovi spartiti
- 🔄 Gesture swipe per cambio spartito
- 🔄 Modalità dark/light
- 🔄 Export spartiti con annotazioni
- 🔄 Condivisione spartiti

## 🔧 Personalizzazione

### Modificare i Colori
Modifica `manifest.json`:
```json
"background_color": "#1a1a2e",
"theme_color": "#16213e"
```

### Modificare il Nome
Modifica `manifest.json`:
```json
"name": "Il Tuo Nome App",
"short_name": "TuaApp"
```

### Aggiungere Spartiti
Modifica `js/spartiti-library.js`:
```javascript
const spartitiCategories = {
    "La Tua Categoria 🎸": {
        icon: "🎸",
        spartiti: [
            {
                title: "Nome Canzone",
                notesFile: "path/note.pdf",
                sheetFile: "path/spartito.pdf",
                videoUrl: "https://youtube.com/..."
            }
        ]
    }
};
```

## 📊 Diagnostica

### Testare la PWA
1. Apri DevTools (F12)
2. Tab "Application"
3. Sezione "Manifest" - verifica metadati
4. Sezione "Service Workers" - verifica stato
5. Sezione "Cache Storage" - verifica file cachati

### Lighthouse Audit
1. DevTools → Tab "Lighthouse"
2. Seleziona "Progressive Web App"
3. Click "Generate report"
4. Ottieni punteggio e suggerimenti

### Debug Service Worker
```javascript
// Console browser
navigator.serviceWorker.getRegistration().then(reg => console.log(reg));

// Forza aggiornamento
navigator.serviceWorker.getRegistration().then(reg => reg.update());

// Cancella cache
caches.keys().then(keys => keys.forEach(key => caches.delete(key)));
```

## 🆘 Risoluzione Problemi

### L'app non si installa
- ✅ Verifica di usare HTTPS
- ✅ Controlla che tutte le icone esistano
- ✅ Verifica manifest.json (usa JSONLint)
- ✅ Controlla console per errori Service Worker

### L'app non funziona offline
- ✅ Apri DevTools → Application → Service Workers
- ✅ Verifica che sia "activated"
- ✅ Controlla Cache Storage per i file cachati
- ✅ Forza aggiornamento Service Worker

### Icone non appaiono
- ✅ Genera tutte le dimensioni richieste
- ✅ Verifica i path nel manifest.json
- ✅ Controlla che siano PNG validi
- ✅ Usa tool online per validare

## 📄 Licenza

Progetto personale - Usa liberamente per scopi non commerciali.

## 🤝 Contributi

Idee per migliorare? Apri una issue o pull request!

---

**Buona musica! 🎸🎵**
