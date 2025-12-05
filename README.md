# 🎸 Lettore Spartiti con Auto-Scroll

App web per leggere spartiti PDF mentre suoni la chitarra, con scroll automatico a velocità variabile.

## 📋 Caratteristiche

✅ **Libreria spartiti integrata** - Carica i tuoi PDF nel progetto e scegli dalla collezione  
✅ Carica spartiti in formato PDF (drag & drop o selezione file)  
✅ Auto-scroll fluido e continuo  
✅ Velocità regolabile da x0.1 a x1.5 (formato moltiplicatore)  
✅ Play/Pause con tap sullo schermo  
✅ Modalità schermo intero  
✅ Ottimizzato per tablet e touch  
✅ Interfaccia scura moderna con gradienti  

## 🚀 Come Usare

### Aggiungi i tuoi spartiti alla libreria:

1. **Copia i PDF** nella cartella `spartiti/`
2. **Apri** `js/spartiti-library.js`
3. **Aggiungi** i tuoi spartiti all'array:
   ```javascript
   const spartitiLibrary = [
       { title: "Wonderwall", file: "spartiti/wonderwall.pdf" },
       { title: "Hotel California", file: "spartiti/hotel-california.pdf" },
       // Aggiungi i tuoi qui...
   ];
   ```
4. **Refresh** la pagina - gli spartiti appaiono nella libreria! 🎵

### Su PC (per testare):

1. **Apri il file** `index.html` con un browser moderno (Chrome, Firefox, Edge)
2. **Scegli uno spartito**:
   - Dalla libreria precaricata (se hai aggiunto PDF)
   - Oppure carica un nuovo file PDF (drag & drop o selezione)
3. **Controlla lo scroll**:
   - ▶️ Play/Pause: avvia o ferma lo scroll
   - Slider: regola la velocità (0-10)
   - ⟲ Reset: torna all'inizio
   - 📁 Cambia spartito
   - ⛶ Schermo intero
4. **Tocca lo schermo** in qualsiasi punto per play/pause rapido

### Su Tablet:

#### Metodo 1: Copia locale (consigliato per uso offline)
1. Copia l'intera cartella `LettoreMusica` sul tablet
2. Apri il file `index.html` con un browser
3. Aggiungi alla home screen (Chrome: Menu → "Aggiungi a schermata Home")

#### Metodo 2: Server locale
1. Sul PC, nella cartella del progetto, avvia un server HTTP:
   ```bash
   python -m http.server 8000
   ```
2. Sul tablet (connesso alla stessa rete WiFi):
   - Trova l'IP del PC (es: `ipconfig` su Windows)
   - Apri browser e vai su `http://IP_DEL_PC:8000`

#### Metodo 3: Hosting online (GitHub Pages)
Carica il progetto su GitHub Pages per accesso da ovunque!

**Passi:**
1. Crea repository GitHub
2. Carica tutti i file (inclusa cartella `spartiti/` con i PDF)
3. Settings → Pages → Source: `main` branch
4. Ottieni link tipo: `https://tuonome.github.io/lettore-spartiti`
5. Accedi da qualsiasi dispositivo! 🌍

## 📁 Struttura Progetto

```
LettoreMusica/
├── index.html              # Pagina principale
├── css/
│   └── style.css          # Stili e layout
├── js/
│   ├── app.js             # Logica principale
│   ├── pdfHandler.js      # Gestione PDF
│   └── spartiti-library.js # Libreria spartiti
├── spartiti/              # 📚 Metti qui i tuoi PDF!
│   ├── README.md
│   └── (i tuoi PDF)
├── .gitignore
└── README.md              # Questa guida
```

## 🛠️ Tecnologie Utilizzate

- **HTML5**: Struttura semantica
- **CSS3**: Layout responsive con Flexbox
- **JavaScript ES6+**: Logica applicazione
- **PDF.js**: Libreria Mozilla per rendering PDF
- **Canvas API**: Rendering grafico degli spartiti

## 💡 Tips

- **Velocità ideale**: Parti da 2-3 e regola in base al tempo del brano
- **Schermo intero**: Essenziale su tablet per massimizzare lo spazio
- **Multi-pagina**: Il PDF viene renderizzato come unico scroll continuo
- **Touch**: Tocca ovunque sullo schermo per play/pause veloce

## 🔧 Personalizzazioni Future

Idee per espandere il progetto:
- 🎵 Caricamento playlist di spartiti
- 🔖 Segnalibri e annotazioni
- 🎨 Temi colore (chiaro/scuro/seppia)
- ⏱️ Sincronizzazione con metronomo
- 📊 Zoom spartito
- 🔄 Rotazione schermo automatica

## 📝 Note Tecniche

### Perché Web App e non app nativa?
- ✅ Funziona su qualsiasi dispositivo senza installazione
- ✅ Aggiornamenti istantanei (basta ricaricare la pagina)
- ✅ Sviluppo più rapido e manutenzione semplice
- ✅ Portabile: copia la cartella e funziona ovunque

### Come funziona lo scroll?
Usa `requestAnimationFrame()` per animazioni fluide a 60 FPS. Ogni frame scrolla di `velocità × 0.5` pixel.

### Perché tutte le pagine in un'unica immagine?
Rende lo scroll continuo senza interruzioni tra le pagine - esperienza più naturale durante l'esecuzione.

## 🐛 Risoluzione Problemi

**Il PDF non si carica:**
- Assicurati che sia un PDF valido
- Alcuni PDF protetti potrebbero non funzionare

**Lo scroll è troppo veloce/lento:**
- Usa lo slider per regolare (valori bassi 1-3 per brani lenti)
- Il fattore di calibrazione è in `app.js` (riga ~220): `scrollSpeed * 0.5`

**Non funziona su tablet:**
- Verifica che il browser supporti JavaScript
- Prova con Chrome o Safari aggiornati

## 📜 Licenza

Progetto personale - Uso libero per scopi educativi e personali.

---

**Buona musica! 🎵🎸**
