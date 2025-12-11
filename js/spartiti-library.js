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
    libraryTitle.innerHTML = `
        <button id="backToCategories" style="background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%); border: none; color: white; cursor: pointer; font-size: 0.9rem; padding: 8px 16px; border-radius: 8px; margin-right: 15px; font-weight: 600;">← Indietro</button>
        ${categoryName}
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
