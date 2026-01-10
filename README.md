## Come aggiungere spartiti:

1. Copia i file PDF nella cartella /spartiti/path
2. Aggiungi il nome del file nella lista in `js/spartiti-library.js`
3. Fare il push su GIT


# 🎸 Lettore Spartiti con Auto-Scroll

App web per leggere spartiti PDF mentre suoni la chitarra, con scroll automatico a velocità variabile.

## 📋 Caratteristiche

✅ **Libreria spartiti organizzata per categorie** - Naviga tra categorie e scegli lo spartito  
✅ **Sistema a cartelle** - Organizza i tuoi spartiti in categorie personalizzate  
✅ Carica spartiti in formato PDF (drag & drop o selezione file)  
✅ Auto-scroll fluido e continuo  
✅ Velocità regolabile da x0.1 a x1.5 (formato moltiplicatore)  
✅ Controlli sempre visibili in alto durante la lettura  
✅ Modalità schermo intero  
✅ Ottimizzato per tablet Android  
✅ Interfaccia scura moderna con gradienti  

## 🚀 Come Usare

### Aggiungi spartiti alla libreria per categorie:

1. **Crea cartelle** in `spartiti/` per organizzare i tuoi PDF:
   ```
   spartiti/
   ├── Natale/
   │   ├── Jingle Bells.pdf
   │   └── All I Want For Christmas.pdf
   ├── Classici/
   │   ├── Stand By Me.pdf
   │   └── Shallow.pdf
   └── Rock/
       └── ...
   ```

2. **Apri** `js/spartiti-library.js` e aggiungi le tue categorie:
   ```javascript
   const spartitiCategories = {
       "Natale 🎄": {
           icon: "🎄",
           spartiti: [
               { title: "Jingle Bells", file: "spartiti/Natale/Jingle Bells.pdf"}
           ]
       },
       "Rock 🎸": {
           icon: "🤘",
           spartiti: [
               { title: "Highway to Hell", file: "spartiti/Rock/Highway to Hell.pdf"}
           ]
       }
   };
   ```

3. **Refresh** la pagina - vedi le categorie come card, clicca per aprire! 🎵

### Su PC (per testare):

1. **Apri il file** `index.html` con un browser moderno (Chrome, Firefox, Edge)
2. **Naviga nella libreria**:
   - Vedi le categorie nella pagina principale
   - Clicca su una categoria per vedere gli spartiti
   - Usa 🔙 per tornare alle categorie
   - Oppure carica un nuovo file PDF (drag & drop)
3. **Controlla lo scroll** (quando lo spartito è aperto):
   - ▶️ Play/Pause: avvia o ferma lo scroll
   - Slider: regola la velocità (x0.1 - x1.5)
   - ⟲ Reset: torna all'inizio
   - 🔙 Torna al menu
   - ⛶ Schermo intero

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
│   └── spartiti-library.js # Libreria spartiti con categorie
├── spartiti/              # 📚 Organizza i tuoi PDF in cartelle!
│   ├── Natale/
│   │   ├── Jingle Bells.pdf
│   │   └── All I Want For Christmas.pdf
│   ├── Classici/
│   │   ├── Stand By Me.pdf
│   │   └── Shallow.pdf
│   └── README.md
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

- **Velocità ideale**: Parti da x0.5 e regola in base al tempo del brano
- **Organizzazione**: Crea categorie logiche (Natale, Rock, Pop, Difficili, Facili, ecc.)
- **Navigazione**: Usa il pulsante 🔙 per tornare sempre alla vista categorie
- **Tablet**: Funziona perfettamente su Android, iOS non supportato
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

## 📜 Licenza

Progetto personale - Uso libero per scopi educativi e personali.

---

**Buona musica! 🎵🎸**
