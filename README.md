# 🎼 Lettore Spartiti Musicali PWA

Progressive Web App per leggere spartiti PDF con auto-scroll e funzionalità offline.

## 🚀 Deployment su GitHub Pages

### Configurazione Attuale
- **Repository**: https://github.com/DannyKrueger94/LettoreSpartiti
- **Branch**: `pwa`
- **URL Deployato**: https://dannykrueger94.github.io/LettoreSpartiti/

### Passi per il Deployment

1. **Verifica che GitHub Pages sia abilitato**:
   - Vai su Settings → Pages
   - Source: Deploy from a branch
   - Branch: `pwa` (root folder)
   - Salva

2. **Commit e Push delle modifiche**:
   ```bash
   git add .
   git commit -m "Fix: Corretto manifest e service worker per GitHub Pages"
   git push origin pwa
   ```

3. **Aspetta 1-2 minuti** per il deployment automatico

4. **Verifica il deployment**:
   - Visita: https://dannykrueger94.github.io/LettoreSpartiti/
   - Apri DevTools (F12) → Console per vedere eventuali errori

## 🔍 Come Testare

### Test da Desktop
1. Apri Chrome/Edge
2. Vai su: https://dannykrueger94.github.io/LettoreSpartiti/
3. Apri DevTools (F12)
4. Vai su **Application** → Service Workers
   - Verifica che il Service Worker sia registrato e attivo
5. Vai su **Application** → Manifest
   - Verifica che il manifest sia caricato correttamente
6. Prova a caricare uno spartito dalla libreria

### Test Offline
1. Con DevTools aperto, vai su **Network**
2. Seleziona "Offline" dal dropdown
3. Ricarica la pagina (F5)
4. L'app dovrebbe caricarsi anche offline

### Test su Mobile (Installazione PWA)
1. Apri il sito su Chrome Android
2. Menu (⋮) → "Installa app" o "Aggiungi a Home"
3. L'app verrà installata come app nativa
4. Apri l'app dalla home screen

## ⚠️ Problemi Comuni e Soluzioni

### ❌ Problema: "Service Worker registration failed"
**Causa**: GitHub Pages non è abilitato o il branch è sbagliato  
**Soluzione**: Verifica Settings → Pages e che il branch sia `pwa`

### ❌ Problema: "Failed to load manifest"
**Causa**: Path non corretto nel manifest.json  
**Soluzione**: Già corretto con `start_url: "/LettoreSpartiti/"`

### ❌ Problema: "PDF.js non si carica offline"
**Causa**: CDN esterno non cacheato  
**Soluzione**: Già corretto, PDF.js è ora nell'APP_SHELL del Service Worker

### ❌ Problema: "Icone non si caricano"
**Causa**: Icone non nella cache  
**Soluzione**: Già corretto, icone principali aggiunte all'APP_SHELL

### ❌ Problema: "Spartiti non si caricano"
**Causa**: File PDF non pushati su GitHub  
**Soluzione**:
```bash
# Verifica che i PDF siano tracciati
git status
# Se sono ignorati, rimuovi dal .gitignore e aggiungi
git add spartiti/
git commit -m "Aggiunti spartiti PDF"
git push origin pwa
```

## 🛠️ Debug in Produzione

Per vedere i log del Service Worker in produzione:

1. Apri DevTools → **Application** → Service Workers
2. Clicca su "sw.js" per vedere i log
3. Cerca messaggi tipo:
   - ✅ `[SW] Installation complete`
   - ✅ `[SW] Activated`
   - ❌ `Failed to cache: <file>`

## 📦 Struttura File Critici

```
LettoreMusicale_PWA/
├── index.html              # Entry point
├── manifest.json           # PWA manifest (CONFIGURATO PER GITHUB PAGES)
├── service-worker.js       # Service Worker (CACHE PDF.JS E ICONE)
├── js/
│   ├── app.js             # Logica principale
│   ├── pdfHandler.js      # Gestione PDF
│   ├── dbManager.js       # IndexedDB storage
│   └── spartiti-library.js # Catalogo spartiti
├── spartiti/              # File PDF (DEVONO ESSERE SU GIT!)
│   ├── Natale/
│   ├── Classici/
│   └── Corso Arpeggio/
└── icons/                 # Icone PWA
```

## 🔧 Modifiche Applicate

### ✅ Correzioni Effettuate
- [x] Manifest.json: `start_url` e `scope` aggiornati per GitHub Pages (`/LettoreSpartiti/`)
- [x] Service Worker: Aggiunte icone principali alla cache
- [x] Service Worker: Aggiunto caching di PDF.js CDN per offline
- [x] Service Worker: Gestione richieste CDN esterni

### 🚧 Da Verificare
- [ ] Tutti i file PDF degli spartiti sono pushati su GitHub
- [ ] GitHub Pages è abilitato sul branch `pwa`
- [ ] L'URL https://dannykrueger94.github.io/LettoreSpartiti/ è accessibile

## 📝 Prossimi Passi

1. **Commit e push delle modifiche**
2. **Verifica GitHub Pages settings**
3. **Aspetta deployment automatico**
4. **Testa l'URL pubblico**
5. **Verifica installazione PWA su mobile**

## 📞 Supporto

Se l'app ancora non funziona dopo questi fix:
1. Condividi gli errori dalla Console (F12)
2. Verifica che GitHub Pages sia attivo
3. Controlla che i PDF siano nel repository remoto
