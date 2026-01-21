# 🚀 Deploy su GitHub Pages - Istruzioni

## Prerequisiti
- Account GitHub (crea su https://github.com se non ce l'hai)
- Git installato sul PC (verifica con `git --version`)

## 📝 Passi per il Deploy

### 1. Genera le Icone (SE NON L'HAI GIÀ FATTO!)
```bash
# Apri nel browser:
icons/icon-generator.html

# Scarica TUTTE le 8 icone e salvale in /icons/ con i nomi esatti:
# - icon-72x72.png
# - icon-96x96.png
# - icon-128x128.png
# - icon-144x144.png
# - icon-152x152.png
# - icon-192x192.png
# - icon-384x384.png
# - icon-512x512.png
```

### 2. Crea Repository su GitHub
1. Vai su https://github.com/new
2. Nome repository: `lettore-spartiti-pwa` (o quello che preferisci)
3. Descrizione: "PWA per leggere spartiti musicali con auto-scroll"
4. Lascia **PUBBLICO** (necessario per GitHub Pages gratuito)
5. NON selezionare README, .gitignore, license (li abbiamo già)
6. Click **"Create repository"**

### 3. Inizializza Git e Fai il Push

Apri PowerShell nella cartella `LettoreMusicale_PWA` ed esegui:

```powershell
# 1. Inizializza repository Git
git init

# 2. Aggiungi tutti i file
git add .

# 3. Primo commit
git commit -m "Initial commit - PWA Lettore Spartiti"

# 4. Rinomina branch in main (standard moderno)
git branch -M main

# 5. Collega al tuo repository GitHub
# SOSTITUISCI "TUO_USERNAME" con il tuo username GitHub!
git remote add origin https://github.com/TUO_USERNAME/lettore-spartiti-pwa.git

# 6. Push su GitHub
git push -u origin main
```

**Nota:** Se ti chiede credenziali:
- Username: il tuo username GitHub
- Password: usa un **Personal Access Token** (non la password account)
  - Vai su: GitHub → Settings → Developer settings → Personal access tokens → Generate new token
  - Seleziona: `repo` (Full control of private repositories)
  - Copia il token e usalo come password

### 4. Attiva GitHub Pages

1. Sul tuo repository GitHub vai in: **Settings** (tab in alto)
2. Nel menu laterale sinistro: **Pages**
3. Sotto "Source":
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**
5. Aspetta 1-2 minuti
6. Ricarica la pagina → Vedrai il link: `https://TUO_USERNAME.github.io/lettore-spartiti-pwa`

### 5. Testa l'App Online!

1. Apri l'URL su Chrome (desktop o Android)
2. Verifica funzionamento
3. Su Android/Chrome desktop vedrai "Installa app"
4. Installa e goditi la PWA! 🎉

## 🔄 Aggiornamenti Futuri

Quando modifichi l'app:

```powershell
# 1. Aggiungi modifiche
git add .

# 2. Commit con messaggio descrittivo
git commit -m "Descrivi cosa hai cambiato"

# 3. Push su GitHub
git push

# GitHub Pages si aggiorna automaticamente in 1-2 minuti!
```

## 📱 Condividi l'App

Dopo il deploy, condividi semplicemente l'URL:
`https://TUO_USERNAME.github.io/lettore-spartiti-pwa`

Chiunque può:
- Aprirlo sul browser
- Installarlo come app nativa
- Usarlo offline dopo la prima visita!

## 🆘 Problemi Comuni

### "Permission denied (publickey)"
→ Usa HTTPS invece di SSH: `https://github.com/TUO_USERNAME/repo.git`

### "Authentication failed"
→ Usa Personal Access Token invece della password

### "Updates were rejected"
→ Fai `git pull` prima: `git pull origin main --rebase` poi `git push`

### GitHub Pages non si attiva
→ Verifica che il repo sia pubblico

### Icone non appaiono dopo deploy
→ Controlla che le icone siano committate: `git status`

## ✅ Verifica Deploy Riuscito

- [ ] URL GitHub Pages accessibile
- [ ] Pagina si carica correttamente
- [ ] Console Chrome senza errori
- [ ] Service Worker registrato (F12 → Application → Service Workers)
- [ ] Manifest valido (F12 → Application → Manifest)
- [ ] Pulsante "Installa" appare su Chrome
- [ ] App installabile su Android/Windows

---

**Pronto! Buon deploy! 🚀**

Hai dubbi su qualche passo? Chiedi pure!
