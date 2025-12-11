/* ========================================
   SPARTITI-LIBRARY.JS - Libreria spartiti precaricati
   ======================================== */

// Lista dei tuoi spartiti (aggiungi qui i nomi dei file PDF che carichi nella cartella spartiti/)
const spartitiLibrary = [
    // Esempio: { title: "Wonderwall", file: "spartiti/wonderwall.pdf" },
    // Aggiungi i tuoi spartiti qui sotto:
    { title: "LadyGaga Shallow", file: "spartiti/LadyGaga Shallow.pdf"},
    { title: "Stand By Me - Ben E. King", file: "spartiti/Stand By Me - Ben E. King.pdf"},
    { title: "The Nightmare Before Christmas", file: "spartiti/The Nightmare Before Christmas.pdf"},
    { title: "All I Want For Christmas Is You", file: "spartiti/All I Want For Christmas Is You - Mariah Carey.pdf"}
    

    
];

// Funzione per caricare la libreria nell'interfaccia
function loadSpartitiLibrary() {
    const libraryContainer = document.getElementById('libraryContainer');
    
    if (spartitiLibrary.length === 0) {
        libraryContainer.innerHTML = `
            <p class="library-empty">
                📚 Nessuno spartito caricato ancora.<br>
                <small>Carica PDF nella cartella "spartiti/" e aggiungili in <code>js/spartiti-library.js</code></small>
            </p>
        `;
        return;
    }
    
    libraryContainer.innerHTML = '';
    
    spartitiLibrary.forEach((spartito, index) => {
        const card = document.createElement('div');
        card.className = 'spartito-card';
        card.innerHTML = `
            <div class="spartito-icon">🎵</div>
            <div class="spartito-title">${spartito.title}</div>
            <button class="btn-load" data-file="${spartito.file}">Carica</button>
        `;
        
        // Click sul pulsante carica
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
        alert('Errore nel caricamento dello spartito. Verifica che il file esista nella cartella spartiti/');
        resetUploadBox();
    }
}

// Inizializza la libreria al caricamento
document.addEventListener('DOMContentLoaded', () => {
    loadSpartitiLibrary();
});
