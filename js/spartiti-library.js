/* ========================================
   SPARTITI-LIBRARY.JS - Libreria spartiti organizzati per categoria
   ======================================== */

// Organizzazione spartiti per categorie
const spartitiCategories = {
    "Natale 🎄": {
        icon: "🎄",
        spartiti: [
            { title: "All I Want For Christmas Is You", file: "spartiti/Natale/All I Want For Christmas Is You - Mariah Carey.pdf"},
            { title: "Jingle Bells", file: "spartiti/Natale/Jingle Bells.pdf"}
        ]
    },
    "Classici 🎸": {
        icon: "🎸",
        spartiti: [
            { title: "Stand By Me - Ben E. King", file: "spartiti/Classici/Stand By Me - Ben E. King.pdf"},
            { title: "LadyGaga Shallow", file: "spartiti/Classici/LadyGaga Shallow.pdf"}
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
            <button class="btn-load" data-file="${spartito.file}">Carica</button>
        `;
        
        card.querySelector('.btn-load').addEventListener('click', () => {
            loadSpartitoFromLibrary(spartito.file);
        });
        
        libraryContainer.appendChild(card);
    });
}

// Funzione per caricare uno spartito dalla libreria
async function loadSpartitoFromLibrary(filePath) {
    try {
        console.log(`📂 Caricamento spartito: ${filePath}`);
        
        // Mostra loading
        const uploadBox = document.querySelector('.upload-box');
        uploadBox.innerHTML = '<p class="upload-icon">⏳</p><h2>Caricamento in corso...</h2>';
        
        // Fetch del file PDF
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`File non trovato: ${filePath}`);
        }
        
        // Converti in blob e poi in file
        const blob = await response.blob();
        const file = new File([blob], filePath.split('/').pop(), { type: 'application/pdf' });
        
        // Usa la stessa funzione di caricamento
        const success = await pdfHandler.loadPDF(file);
        
        if (success) {
            showPDFSection();
        } else {
            resetUploadBox();
        }
    } catch (error) {
        console.error('❌ Errore caricamento spartito:', error);
        
        // Distingui tra tipi di errore
        let errorMessage = 'Errore nel caricamento dello spartito.';
        
        if (error.message.includes('404') || error.message.includes('File non trovato')) {
            errorMessage = 'Spartito non trovato. Verifica che il file esista nella cartella spartiti/';
        } else if (error.message.includes('403')) {
            errorMessage = 'Accesso negato al file. Controlla i permessi.';
        } else if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
            errorMessage = 'Errore di rete. Verifica la connessione internet.';
        }
        
        Toast.error(errorMessage, 4000);
        resetUploadBox();
    }
}

// Inizializza la libreria al caricamento
document.addEventListener('DOMContentLoaded', () => {
    showCategories();
});
