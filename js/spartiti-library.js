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
    },
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
    const category = spartitiCategories[categoryName];
    
    currentCategory = categoryName;
    
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
                    await window.dbManager.downloadAndSaveSpartito(
                        spartitoId,
                        categoryName,
                        spartito.title,
                        spartito.notesFile,
                        spartito.sheetFile,
                        spartito.videoUrl
                    );
                    console.log('💾 Spartito salvato in IndexedDB per uso offline');
                    
                    // Aggiorna badge
                    const stats = await window.dbManager.getStats();
                    updateSyncBadge(stats.totalSpartiti);
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
        
        // Aggiorna UI badge se necessario
        updateSyncBadge(stats.totalSpartiti);
    } catch (error) {
        console.error('❌ Errore inizializzazione DBManager:', error);
        Toast.error('Errore inizializzazione storage offline', 3000);
    }
}

// Aggiorna badge contatore spartiti scaricati
function updateSyncBadge(count) {
    const badge = document.getElementById('syncBadge');
    if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
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
        
        // Aggiorna badge
        const stats = await window.dbManager.getStats();
        updateSyncBadge(stats.totalSpartiti);
        
        Toast.success(`Sincronizzazione completata! ${result.success} scaricati, ${result.failed} errori`, 3000);
        
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
