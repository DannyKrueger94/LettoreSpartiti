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
            }
        ]
    }
};

// Variabile per tracciare la categoria corrente
let currentCategory = null;

// Funzione per mostrare le categorie (pagina principale)
function showCategories() {
    const libraryContainer = document.getElementById('libraryContainer');
    const libraryTitle = document.querySelector('.library-title');
    
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
    
    Object.keys(spartitiCategories).forEach(categoryName => {
        const category = spartitiCategories[categoryName];
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
            loadSpartitoFromLibrary(spartito);
        });
        
        libraryContainer.appendChild(card);
    });
}

// Funzione per caricare uno spartito dalla libreria
async function loadSpartitoFromLibrary(spartito) {
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
        
        // Mostra toast di loading
        Toast.info('Caricamento spartito in corso...', 2000);
        
        // Carica entrambi i PDF
        const success = await pdfHandler.loadDualPDF(spartito.notesFile, spartito.sheetFile);
        
        if (success) {
            showPDFSection();
            Toast.success('Spartito caricato!', 2000);
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

// Inizializza la libreria al caricamento
document.addEventListener('DOMContentLoaded', () => {
    showCategories();
});
