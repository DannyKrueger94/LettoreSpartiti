# 🚀 Guida Caricamento su GitHub

## Passo 1: Prepara i tuoi spartiti

1. Copia i file PDF nella cartella `spartiti/`
2. Apri `js/spartiti-library.js`
3. Aggiungi i tuoi spartiti:

```javascript
const spartitiLibrary = [
    { title: "Nome Canzone 1", file: "spartiti/canzone1.pdf" },
    { title: "Nome Canzone 2", file: "spartiti/canzone2.pdf" },
    // Aggiungi tutti i tuoi...
];
```

## Passo 2: Crea Repository GitHub

1. Vai su [github.com](https://github.com) e fai login
2. Click su "**+**" in alto a destra → "**New repository**"
3. Nome repository: `lettore-spartiti` (o quello che vuoi)
4. Lascia **Public** (necessario per GitHub Pages gratis)
5. **NON** aggiungere README/gitignore (li abbiamo già!)
6. Click "**Create repository**"

## Passo 3: Carica i file

### Opzione A: Via Browser (più semplice)

1. Nella pagina del repository, click "**uploading an existing file**"
2. Trascina **TUTTA** la cartella `LettoreMusica` (o seleziona tutti i file)
3. Aspetta il caricamento dei PDF (può richiedere tempo)
4. Scrivi un messaggio: "Primo caricamento"
5. Click "**Commit changes**"

### Opzione B: Via Git (se lo usi già)

Nella cartella del progetto apri PowerShell:

```powershell
# Inizializza Git
git init

# Aggiungi tutti i file
git add .

# Primo commit
git commit -m "Primo caricamento lettore spartiti"

# Collega al repository (sostituisci TUONOME con il tuo username)
git remote add origin https://github.com/TUONOME/lettore-spartiti.git

# Carica su GitHub
git branch -M main
git push -u origin main
```

## Passo 4: Attiva GitHub Pages

1. Nel tuo repository, vai su "**Settings**" (in alto)
2. Nella barra laterale, click "**Pages**"
3. Sotto "Source":
   - Branch: seleziona **main**
   - Folder: `/root`
   - Click "**Save**"
4. Aspetta 1-2 minuti
5. Aggiorna la pagina - vedrai il link!

**Il tuo link sarà:**
```
https://TUONOME.github.io/lettore-spartiti
```

## Passo 5: Usa su Tablet/iPhone

1. Apri il browser sul dispositivo
2. Vai al link di GitHub Pages
3. **Safari (iOS):** Condividi → "Aggiungi a Home"
4. **Chrome (Android):** Menu → "Aggiungi a Home"
5. Ora hai un'icona come un'app! 🎸

---

## 🔄 Come Aggiornare gli Spartiti

### Via Browser:
1. Vai al repository su GitHub
2. Entra nella cartella `spartiti/`
3. Click "**Add file**" → "**Upload files**"
4. Carica nuovi PDF
5. Aggiorna `js/spartiti-library.js` aggiungendo i nuovi spartiti
6. Commit
7. Aspetta 1-2 minuti → il sito si aggiorna automaticamente!

### Via Git:
```powershell
# Aggiungi nuovi file
git add .
git commit -m "Aggiunti nuovi spartiti"
git push
```

---

## ⚠️ Note Importanti

- **PDF pubblici:** I tuoi spartiti saranno visibili a chiunque abbia il link
- **Limite dimensioni:** GitHub ha limite di 100MB per file
- **Consiglio:** Non caricare spartiti protetti da copyright
- **Alternativa privata:** Usa Netlify/Vercel per repository privati

---

## 🐛 Problemi Comuni

**Il sito non si aggiorna:**
- Aspetta 2-3 minuti dopo il push
- Svuota cache del browser (Ctrl+Shift+R)
- Verifica che GitHub Pages sia attivo in Settings

**PDF non si caricano:**
- Verifica il percorso in `spartiti-library.js`
- Deve essere: `spartiti/nomefile.pdf` (tutto minuscolo)
- Controlla che il file sia stato caricato su GitHub

**Errore 404:**
- Verifica che `index.html` sia nella root del repository
- Controlla che il branch sia `main` (non `master`)

---

**Hai bisogno di aiuto?** Scrivimi! 🎵
