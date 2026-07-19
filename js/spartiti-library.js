/* ========================================
   SPARTITI-LIBRARY.JS - Libreria spartiti organizzati per categoria
   Struttura:
    "Nome Cartella 😉": {
        icon: "😉",
        spartiti: [
            {
                title: "Titolo della canzone", 
                notesFile: "path/path2/Titolo canzone - Notes.pdf", // Inserisci qui le note della canzone che appariranno a lato
                sheetFile: "path/path2/Titolo canzone.pdf", // Inserisci qui il testo, ci sarà lo scorrimento
                videoUrl: "https://www.youtube.com/watch?v=EXAMPLE1" // Inserisci qui il link al tutorial
            }
        ]
    },
   ======================================== */

const spartitiCategories = {
    "Classici 🎸": {
        icon: "🎸",
        spartiti: [
            { 
                title: "Stand By Me - Ben E. King",
                notesFile: "spartiti/Classici/Stand By Me - Ben E. King - Notes.pdf",
                sheetFile: "spartiti/Classici/Stand By Me - Ben E. King.pdf",
                videoUrl: "https://www.youtube.com/watch?v=6Nwfdn2kSfs"
            },
            { 
                title: "Shallow - LadyGaga",
                notesFile: "spartiti/Classici/Shallow - LadyGaga - Notes.pdf",
                sheetFile: "spartiti/Classici/Shallow - LadyGaga.pdf",
                videoUrl: "https://www.youtube.com/watch?v=Z3LzCJlSEfQ"
            },
            { 
                title: "Lonely Day - System of a Down",
                notesFile: "spartiti/Classici/Lonely Day - System of a Down - Notes.pdf",
                sheetFile: "spartiti/Classici/Lonely Day - System of a Down.pdf",
                videoUrl: "https://www.youtube.com/watch?v=szOVjZQuUuo&t"
            }
        ]
    },
    "Arpeggio 🎻": {
        icon: "🎻",
        spartiti: [
            {
                title: "Always With Me - Spirited Away",
                sheetFile: "spartiti/Arpeggio/Always With Me - Spirited Away.pdf",
                videoUrl: "https://www.youtube.com/watch?v=LUSKQqCmBVU&list=WL&index=13"
            },
            { 
                title: "Merry Go Round of Life - Howl's Moving Castle",
                sheetFile: "spartiti/Arpeggio/Merry Go Round of Life - Howl's Moving Castle.pdf",
                videoUrl: "https://www.youtube.com/watch?v=mB3lWr6iYmI&list=WL&index=17"
            },
            { 
                title: "Misty Mountains - The Hobbit",
                sheetFile: "spartiti/Arpeggio/Misty Mountains - The Hobbit.pdf",
                videoUrl: "https://www.youtube.com/watch?v=8AqCwoRINgo&list=WL&index=14"
            },
            { 
                title: "One Summer's Day - Spirited Away",
                sheetFile: "spartiti/Arpeggio/One Summer's Day - Spirited Away.pdf",
                videoUrl: "https://www.youtube.com/watch?v=D2Vx3U09_hw&list=WL&index=18"
            },
            { 
                title: "Pokemon -Littleroot Town",
                sheetFile: "spartiti/Arpeggio/Pokemon -Littleroot Town.pdf",
                videoUrl: "https://www.youtube.com/watch?v=ZDYyDP6VX2A&list=WL&index=12"
            },
            { 
                title: "Binks' Sake - One Piece",
                sheetFile: "spartiti/Arpeggio/Binks' Sake - One Piece.pdf",
                videoUrl: "https://www.youtube.com/watch?v=xQY_Vg3kHLw&list=WL&index=9"
            },
            { 
                title: "Gladiator - Now we are Free",
                sheetFile: "spartiti/Arpeggio/Gladiator - Now we are Free.pdf",
                videoUrl: "https://www.youtube.com/watch?v=OhQiWMyR0lM&list=WL&index=10"
            },
            { 
                title: "He's a Pirate - Pirates of the Caribbean",
                sheetFile: "spartiti/Arpeggio/He's a Pirate - Pirates of the Caribbean.pdf",
                videoUrl: "https://www.youtube.com/watch?v=4BfWjydfxws&list=WL&index=8"
            },
            { 
                title: "I'll Make a Man out of you - Mulan",
                sheetFile: "spartiti/Arpeggio/I'll Make a Man out of you - Mulan.pdf",
                videoUrl: "https://www.youtube.com/watch?v=8shBuGwWWbM&list=WL&index=19"
            },
            { 
                title: "The Godfather - Main Theme",
                sheetFile: "spartiti/Arpeggio/The Godfather - Main Theme.pdf",
                videoUrl: "https://www.youtube.com/watch?v=YRbW6mXvxPw&list=WL&index=16"
            },
            { 
                title: "The Godfather - Main Theme",
                sheetFile: "spartiti/Arpeggio/The Godfather - Main Theme.pdf",
                videoUrl: "https://www.youtube.com/watch?v=YRbW6mXvxPw&list=WL&index=16"
            },
            { 
                title: "Down by the River - Baldur's Gate",
                sheetFile: "spartiti/Arpeggio/Down by the River - Baldur's Gate.pdf",
                videoUrl: "https://www.youtube.com/watch?v=G3l01W0RLPQ"
            },
            { 
                title: "Game of Thrones - Main Theme",
                sheetFile: "spartiti/Arpeggio/Game of Thrones - Main Theme.pdf",
                videoUrl: "https://www.youtube.com/watch?v=TW_a50asAPs"
            },
            { 
                title: "Sparkle - Your Name",
                sheetFile: "spartiti/Arpeggio/Sparkle - Your Name.pdf",
                videoUrl: "https://www.youtube.com/watch?v=FHmjcAqZX_k"
            }
        ]
    },
    "Corso Arpeggio 🎼": {
        icon: "🎸",
        spartiti: [
            {
                title: "Faded - Alan Walker",
                notesFile: "",
                sheetFile: "spartiti/Corso Arpeggio/Faded.pdf",
                videoUrl: ""
            },
            {
                title: "Feel Good Inc - Gorillaz",
                notesFile: "",
                sheetFile: "spartiti/Corso Arpeggio/Feel Good Inc.pdf",
                videoUrl: ""
            },
            {
                title: "River Travel",
                notesFile: "",
                sheetFile: "spartiti/Corso Arpeggio/River Travel.pdf",
                videoUrl: ""
            },
            {
                title: "Seven Nation Army",
                notesFile: "",
                sheetFile: "spartiti/Corso Arpeggio/Seven Nation Army.pdf",
                videoUrl: ""
            },
            {
                title: "Smoke on the Water",
                notesFile: "",
                sheetFile: "spartiti/Corso Arpeggio/Smoke on the Water.pdf",
                videoUrl: ""
            },
            {
                title: "Sweet Dreams",
                notesFile: "",
                sheetFile: "spartiti/Corso Arpeggio/Sweet Dreams.pdf",
                videoUrl: ""
            },
            {
                title: "House of the Rising Sun",
                notesFile: "",
                sheetFile: "spartiti/Corso Arpeggio/House of the Rising Sun.pdf",
                videoUrl: ""
            },
            {
                title: "Shape of My Heart",
                notesFile: "",
                sheetFile: "spartiti/Corso Arpeggio/Shape of My Heart.pdf",
                videoUrl: ""
            },
            {
                title: "Boulevard of Broken Dreams",
                notesFile: "",
                sheetFile: "spartiti/Corso Arpeggio/Boulevard of Broken Dreams.pdf",
                videoUrl: ""
            },
            {
                title: "Dust in the Wind",
                notesFile: "",
                sheetFile: "spartiti/Corso Arpeggio/Dust in the Wind.pdf",
                videoUrl: ""
            },
            {
                title: "Let It Be",
                notesFile: "",
                sheetFile: "spartiti/Corso Arpeggio/Let it Be.pdf",
                videoUrl: ""
            },
            {
                title: "Nothing Else Matters",
                notesFile: "",
                sheetFile: "spartiti/Corso Arpeggio/Nothing Else Matters.pdf",
                videoUrl: ""
            },
            {
                title: "Right Here Waiting",
                notesFile: "",
                sheetFile: "spartiti/Corso Arpeggio/Right Here Waiting.pdf",
                videoUrl: ""
            }
        ]
    },
    "Natale 🎄": {
        icon: "🎄",
        spartiti: [
            { 
                title: "All I Want For Christmas Is You", 
                notesFile: "spartiti/Natale/All I Want For Christmas Is You - Mariah Carey - Notes.pdf",
                sheetFile: "spartiti/Natale/All I Want For Christmas Is You - Mariah Carey.pdf",
                videoUrl: "https://www.youtube.com/watch?v=2PZGR5vRDFE"
            },
            { 
                title: "Jingle Bells", 
                notesFile: "spartiti/Natale/Jingle Bells - Notes.pdf",
                sheetFile: "spartiti/Natale/Jingle Bells.pdf",
                videoUrl: "https://www.youtube.com/watch?v=LrVe8FmY3-o"
            }
        ]
    }
};

// Variabile per tracciare la categoria corrente
let currentCategory = null;

// Funzione per mostrare le categorie (pagina principale)
function showCategories() {
    console.log('🏠 [showCategories] Inizio rendering categorie');
    
    const libraryContainer = document.getElementById('libraryContainer');
    const libraryTitle = document.querySelector('.library-title');
    const syncBtn = document.getElementById('syncBtn');
    
    console.log('📦 [showCategories] libraryContainer:', libraryContainer);
    console.log('📝 [showCategories] libraryTitle:', libraryTitle);
    
    if (!libraryContainer) {
        console.error('❌ [showCategories] libraryContainer non trovato!');
        return;
    }
    
    if (!libraryTitle) {
        console.error('❌ [showCategories] libraryTitle non trovato!');
        return;
    }
    
    // Mostra pulsante sincronizza solo nella schermata principale
    if (syncBtn) syncBtn.style.display = 'flex';
    
    // Ripristina TUTTI gli stili CSS originali
    libraryTitle.style.background = '';
    libraryTitle.style.webkitBackgroundClip = '';
    libraryTitle.style.webkitTextFillColor = '';
    libraryTitle.style.backgroundClip = '';
    libraryTitle.style.display = '';
    libraryTitle.style.alignItems = '';
    libraryTitle.style.justifyContent = '';
    libraryTitle.style.gap = '';
    
    libraryTitle.textContent = 'La mia libreria';
    currentCategory = null;
    
    libraryContainer.innerHTML = '';
    
    console.log('📚 [showCategories] Numero categorie:', Object.keys(spartitiCategories).length);
    
    Object.keys(spartitiCategories).forEach(categoryName => {
        const category = spartitiCategories[categoryName];
        console.log(`📁 [showCategories] Creando card per: ${categoryName}`);
        
        const card = document.createElement('div');
        card.className = 'spartito-card category-card';
        card.innerHTML = `
            <div class="spartito-title" style="font-size: 1.4rem; font-weight: 700;">${categoryName}</div>
            <button class="btn-load">Apri</button>
        `;
        
        card.querySelector('.btn-load').addEventListener('click', () => {
            showCategoryContent(categoryName);
        });
        
        libraryContainer.appendChild(card);
    });
    
    console.log(`✅ [showCategories] Rendering completato. ${libraryContainer.children.length} card create`);
}

// Funzione per mostrare gli spartiti di una categoria
function showCategoryContent(categoryName) {
    const libraryContainer = document.getElementById('libraryContainer');
    const libraryTitle = document.querySelector('.library-title');
    const syncBtn = document.getElementById('syncBtn');
    const category = spartitiCategories[categoryName];
    
    currentCategory = categoryName;
    
    // Nascondi pulsante sincronizza quando non sei nella schermata principale
    if (syncBtn) syncBtn.style.display = 'none';
    
    // SOLUZIONE: Rimuovo gli stili problematici dal library-title
    libraryTitle.style.background = 'none';
    libraryTitle.style.webkitBackgroundClip = 'unset';
    libraryTitle.style.webkitTextFillColor = 'unset';
    libraryTitle.style.backgroundClip = 'unset';
    libraryTitle.style.display = 'flex';
    libraryTitle.style.alignItems = 'center';
    libraryTitle.style.justifyContent = 'center';
    libraryTitle.style.gap = '15px';
    
    // Separa il testo dall'emoji per evitare che l'emoji diventi trasparente
    const categoryText = categoryName.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim();
    const categoryEmoji = categoryName.match(/[\u{1F300}-\u{1F9FF}]/gu);
    
    libraryTitle.innerHTML = `
        <button id="backToCategories" style="background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%); border: none; color: white !important; cursor: pointer; font-size: 0.95rem; padding: 10px 20px; border-radius: 50px; font-weight: 600; box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3); transition: all 0.3s ease; display: inline-flex; align-items: center; gap: 8px; -webkit-text-fill-color: white !important;">← Indietro</button>
        <span style="display: flex; align-items: center; gap: 10px; font-size: 1.8rem; font-weight: 600;">
            <span style="background: linear-gradient(135deg, #818cf8 0%, #ec4899 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">${categoryText}</span>
            ${categoryEmoji ? `<span style="font-size: 1.8rem;">${categoryEmoji.join('')}</span>` : ''}
        </span>
    `;
    
    // Event listener per tornare alle categorie
    setTimeout(() => {
        const backBtn = document.getElementById('backToCategories');
        if (backBtn) {
            backBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                showCategories();
            });
            
            // Hover effect
            backBtn.addEventListener('mouseenter', () => {
                backBtn.style.transform = 'translateY(-2px)';
                backBtn.style.boxShadow = '0 4px 16px rgba(99, 102, 241, 0.5)';
            });
            backBtn.addEventListener('mouseleave', () => {
                backBtn.style.transform = 'translateY(0)';
                backBtn.style.boxShadow = '0 2px 8px rgba(99, 102, 241, 0.3)';
            });
        }
    }, 100);
    
    libraryContainer.innerHTML = '';
    
    category.spartiti.forEach((spartito) => {
        const card = document.createElement('div');
        card.className = 'spartito-card';
        card.innerHTML = `
            <div class="spartito-title">${spartito.title}</div>
            <button class="btn-load">Carica</button>
        `;
        
        card.querySelector('.btn-load').addEventListener('click', () => {
            loadSpartitoFromLibrary(spartito, categoryName);
        });
        
        libraryContainer.appendChild(card);
    });
}

// Funzione per caricare uno spartito dalla libreria
async function loadSpartitoFromLibrary(spartito, categoryName) {
    try {
        console.log(`📂 Caricamento spartito: ${spartito.title}`);
        
        // Salva il link video nello spartito corrente
        window.currentSpartitoVideo = spartito.videoUrl || null;
        
        // Salva se ci sono note disponibili
        window.hasNotesFile = spartito.notesFile && spartito.notesFile.trim() !== "";
        
        // Mostra/nascondi pulsante video in base alla disponibilità
        const videoBtn = document.getElementById('videoBtn');
        if (videoBtn) {
            if (window.currentSpartitoVideo) {
                videoBtn.style.display = 'flex';
            } else {
                videoBtn.style.display = 'none';
            }
        }
        
        // Mostra/nascondi pulsante toggle note e pannello note
        const toggleNotesBtn = document.getElementById('toggleNotesBtn');
        const notesPanel = document.getElementById('notesPanel');
        if (toggleNotesBtn && notesPanel) {
            if (window.hasNotesFile) {
                toggleNotesBtn.style.display = 'flex';
                notesPanel.classList.remove('hidden');
            } else {
                toggleNotesBtn.style.display = 'none';
                notesPanel.classList.add('hidden');
            }
        }
        
        // Genera ID univoco per lo spartito
        const spartitoId = `${categoryName}_${spartito.title}`.replace(/[^a-zA-Z0-9_-]/g, '_');
        
        // Mostra toast di loading
        Toast.info('Caricamento spartito in corso...', 2000);
        
        let success = false;
        
        // STRATEGIA 1: Prova a caricare da IndexedDB (se DBManager è inizializzato)
        if (dbManager) {
            const cachedData = await dbManager.getSpartito(spartitoId);
            if (cachedData) {
                console.log('💾 Caricamento da IndexedDB');
                success = await pdfHandler.loadFromDB(spartitoId);
                if (success) {
                    Toast.success('Spartito caricato (offline)!', 2000);
                }
            }
        }
        
        // STRATEGIA 2: Se non è in cache, scarica da rete e salva in IndexedDB
        if (!success) {
            console.log('🌐 Caricamento da rete');
            
            // Carica da rete usando il metodo legacy (fallback)
            success = await pdfHandler.loadDualPDF(spartito.notesFile, spartito.sheetFile);
            
            if (success && window.dbManager) {
                // Salva in IndexedDB per uso futuro
                try {
                    await window.dbManager.downloadAndSaveSpartito({
                        id: spartitoId,
                        category: categoryName,
                        title: spartito.title,
                        notesFile: spartito.notesFile,
                        sheetFile: spartito.sheetFile,
                        videoUrl: spartito.videoUrl
                    });
                    console.log('💾 Spartito salvato in IndexedDB per uso offline');
                    
                    // Aggiorna badge - verifica se serve ancora sincronizzare
                    const stats = await window.dbManager.getStats();
                    const totalSpartiti = Object.values(spartitiCategories).reduce((sum, cat) => sum + cat.spartiti.length, 0);
                    updateSyncBadge(stats.totalSpartiti < totalSpartiti);
                } catch (saveError) {
                    console.warn('⚠️ Errore salvataggio in IndexedDB:', saveError);
                    // Non bloccare l'utente se il salvataggio fallisce
                }
            }
            
            if (success) {
                Toast.success('Spartito caricato (online)!', 2000);
            }
        }
        
        if (success) {
            showPDFSection();
        } else {
            Toast.error('Errore nel caricamento del PDF');
        }
    } catch (error) {
        console.error('❌ Errore caricamento spartito:', error);
        
        // Distingui tra tipi di errore
        let errorMessage = 'Errore nel caricamento dello spartito.';
        
        if (error.message.includes('404') || error.message.includes('File non trovato')) {
            errorMessage = 'Spartito non trovato. Verifica che i file esistano nella cartella spartiti/';
        } else if (error.message.includes('403')) {
            errorMessage = 'Accesso negato ai file. Controlla i permessi.';
        } else if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
            errorMessage = 'Errore di rete. Verifica la connessione internet.';
        }
        
        Toast.error(errorMessage, 4000);
    }
}

// ========== INDEXEDDB MANAGER ==========
// dbManager è già dichiarato globalmente in dbManager.js

// Inizializza DBManager
async function initializeDB() {
    try {
        if (!window.dbManager) {
            window.dbManager = new DBManager();
        }
        await window.dbManager.init();
        console.log('✅ DBManager inizializzato');
        
        // Mostra statistiche storage
        const stats = await window.dbManager.getStats();
        console.log(`📊 Storage: ${stats.totalSpartiti} spartiti (${stats.totalSizeMB} MB)`);
        
        // Controlla se ci sono spartiti da sincronizzare
        const totalSpartiti = Object.values(spartitiCategories).reduce((sum, cat) => sum + cat.spartiti.length, 0);
        const needsSync = stats.totalSpartiti < totalSpartiti;
        
        updateSyncBadge(needsSync);
    } catch (error) {
        console.error('❌ Errore inizializzazione DBManager:', error);
        Toast.error('Errore inizializzazione storage offline', 3000);
    }
}

// Aggiorna badge sincronizzazione (mostra solo se ci sono spartiti da sincronizzare)
function updateSyncBadge(needsSync) {
    const badge = document.getElementById('syncBadge');
    if (badge) {
        // needsSync = true se ci sono spartiti non sincronizzati
        badge.style.display = needsSync ? 'flex' : 'none';
    }
}

// Funzione per sincronizzare tutti gli spartiti
async function syncAllSpartiti() {
    if (!window.dbManager) {
        Toast.error('DBManager non inizializzato', 2000);
        return;
    }
    
    const syncBtn = document.getElementById('syncBtn');
    const syncProgress = document.getElementById('syncProgress');
    const progressBar = document.getElementById('syncProgressBar');
    const progressText = document.getElementById('syncProgressText');
    
    try {
        // Disabilita pulsante
        if (syncBtn) syncBtn.disabled = true;
        if (syncProgress) syncProgress.style.display = 'block';
        
        // CONTROLLO VERSIONE APP (Service Worker)
        if ('serviceWorker' in navigator) {
            console.log('🔄 Controllo aggiornamenti app...');
            const registration = await navigator.serviceWorker.getRegistration();
            if (registration) {
                await registration.update();
                console.log('✅ Controllo versione app completato');
                
                // Se c'è un nuovo worker in attesa, attivalo
                if (registration.waiting) {
                    console.log('🆕 Nuova versione app disponibile!');
                    Toast.info('Nuova versione app trovata! Aggiornamento in corso...', 3000);
                    registration.waiting.postMessage({ type: 'SKIP_WAITING' });
                    
                    // Ricarica la pagina dopo l'attivazione
                    navigator.serviceWorker.addEventListener('controllerchange', () => {
                        setTimeout(() => {
                            window.location.reload();
                        }, 500);
                    });
                    return; // Esce dalla funzione, la pagina si ricaricherà
                }
            }
        }
        
        Toast.info('Sincronizzazione avviata...', 2000);
        
        let completed = 0;
        let total = 0;
        
        // Conta totale spartiti
        for (const categoryName in spartitiCategories) {
            total += spartitiCategories[categoryName].spartiti.length;
        }
        
        // Progress callback
        const onProgress = (current, totalCount, spartitoTitle) => {
            completed = current;
            const percent = Math.round((current / totalCount) * 100);
            if (progressBar) progressBar.style.width = `${percent}%`;
            if (progressText) progressText.textContent = `${current}/${totalCount} - ${spartitoTitle}`;
        };
        
        // Sincronizza
        const result = await window.dbManager.syncAllFromLibrary(spartitiCategories, onProgress);
        
        // Aggiorna badge - nascondi se tutto sincronizzato
        const stats = await window.dbManager.getStats();
        const totalSpartiti = Object.values(spartitiCategories).reduce((sum, cat) => sum + cat.spartiti.length, 0);
        updateSyncBadge(stats.totalSpartiti < totalSpartiti);
        
        // Mostra risultato con dettagli errori se presenti
        if (result.failed > 0) {
            console.error('❌ Errori durante la sincronizzazione:');
            result.errors.forEach(err => {
                console.error(`  - ${err.category} / ${err.title}: ${err.error}`);
            });
            Toast.error(`Sincronizzazione completata con ${result.failed} errori. Controlla la console per i dettagli.`, 5000);
        } else {
            Toast.success(`Sincronizzazione completata! ${result.success} scaricati`, 3000);
        }
        
    } catch (error) {
        console.error('❌ Errore sincronizzazione:', error);
        Toast.error('Errore durante la sincronizzazione', 3000);
    } finally {
        // Riabilita pulsante
        if (syncBtn) syncBtn.disabled = false;
        if (syncProgress) {
            setTimeout(() => {
                syncProgress.style.display = 'none';
            }, 2000);
        }
    }
}

// Inizializza la libreria al caricamento
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 [DOMContentLoaded] Inizializzazione spartiti-library.js');
    console.log('📚 [DOMContentLoaded] spartitiCategories:', spartitiCategories);
    console.log('📦 [DOMContentLoaded] Chiamata initializeDB()');
    initializeDB();
    console.log('🏠 [DOMContentLoaded] Chiamata showCategories()');
    showCategories();
    console.log('✅ [DOMContentLoaded] Inizializzazione completata');
    
    // Event listener per il pulsante sincronizza
    const syncBtn = document.getElementById('syncBtn');
    if (syncBtn) {
        syncBtn.addEventListener('click', syncAllSpartiti);
        console.log('🔗 [DOMContentLoaded] Event listener sincronizzazione aggiunto');
    }
});
