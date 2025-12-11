/* ========================================
   APP.JS - Logica principale dell'applicazione
   ======================================== */

// ========== SISTEMA NOTIFICHE TOAST ==========
const Toast = {
    container: null,
    
    init() {
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.className = 'toast-container';
            document.body.appendChild(this.container);
        }
    },
    
    show(message, type = 'info', duration = 3000) {
        this.init();
        
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <span class="toast-icon">${icons[type] || icons.info}</span>
            <span class="toast-message">${message}</span>
        `;
        
        this.container.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, duration);
    },
    
    success(message, duration) { this.show(message, 'success', duration); },
    error(message, duration) { this.show(message, 'error', duration); },
    warning(message, duration) { this.show(message, 'warning', duration); },
    info(message, duration) { this.show(message, 'info', duration); }
};

// ========== VARIABILI GLOBALI ==========
let isScrolling = false;        // Stato play/pause
let scrollSpeed = 0.5;          // Velocità corrente (0.1-1.5x)
let scrollInterval = null;      // Timer per l'auto-scroll
let mainContainer = null;       // Riferimento all'elemento main
let scrollAccumulator = 0;      // Accumulatore per decimali (per velocità molto basse)

// ========== ELEMENTI DOM ==========
// Li prendiamo una volta all'inizio per performance
const elements = {
    uploadSection: document.getElementById('uploadSection'),
    pdfContainer: document.getElementById('pdfContainer'),
    controls: document.getElementById('controls'),
    headerTitle: document.getElementById('headerTitle'),
    fileInput: document.getElementById('fileInput'),
    uploadBtn: document.getElementById('uploadBtn'),
    playPauseBtn: document.getElementById('playPauseBtn'),
    playIcon: document.getElementById('playIcon'),
    speedSlider: document.getElementById('speedSlider'),
    speedValue: document.getElementById('speedValue'),
    resetBtn: document.getElementById('resetBtn'),
    changeFileBtn: document.getElementById('changeFileBtn'),
    fullscreenBtn: document.getElementById('fullscreenBtn'),
    uploadBox: document.querySelector('.upload-box')
};

// ========== INIZIALIZZAZIONE ==========
window.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 App inizializzata');
    mainContainer = document.querySelector('main');
    setupEventListeners();
});

// ========== EVENT LISTENERS ==========
function setupEventListeners() {
    // Click su "Scegli File PDF"
    elements.uploadBtn.addEventListener('click', () => {
        elements.fileInput.click();
    });

    // Quando viene selezionato un file
    elements.fileInput.addEventListener('change', (e) => {
        handleFileSelect(e.target.files[0]);
    });

    // Drag and Drop - quando trascini un file sopra
    elements.uploadBox.addEventListener('dragover', (e) => {
        e.preventDefault();
        elements.uploadBox.classList.add('drag-over');
    });

    elements.uploadBox.addEventListener('dragleave', () => {
        elements.uploadBox.classList.remove('drag-over');
    });

    // Drag and Drop - quando rilasci il file
    elements.uploadBox.addEventListener('drop', (e) => {
        e.preventDefault();
        elements.uploadBox.classList.remove('drag-over');
        
        const file = e.dataTransfer.files[0];
        if (file && file.type === 'application/pdf') {
            handleFileSelect(file);
        } else {
            Toast.error('Per favore, carica solo file PDF');
        }
    });

    // ===== CONTROLLI SCROLL =====
    
    // Play/Pause
    elements.playPauseBtn.addEventListener('click', toggleScroll);

    // Slider velocità
    elements.speedSlider.addEventListener('input', (e) => {
        scrollSpeed = parseFloat(e.target.value);
        elements.speedValue.textContent = 'x' + scrollSpeed.toFixed(1);
        
        // Se lo scroll è attivo, riavvialo con la nuova velocità
        if (isScrolling) {
            stopScroll();
            startScroll();
        }
    });

    // Reset (torna all'inizio)
    elements.resetBtn.addEventListener('click', () => {
        mainContainer.scrollTop = 0;
        stopScroll();
    });

    // Cambia file
    elements.changeFileBtn.addEventListener('click', () => {
        stopScroll();
        showUploadSection();
    });

    // Fullscreen
    elements.fullscreenBtn.addEventListener('click', toggleFullscreen);

    // Gestione tocco su tablet: tocca lo schermo per play/pause
    mainContainer.addEventListener('click', (e) => {
        // Solo se il PDF è caricato e non hai cliccato sui controlli o sullo slider
        if (elements.pdfContainer.style.display !== 'none' && 
            e.target.tagName !== 'BUTTON' && 
            e.target.tagName !== 'INPUT' &&
            e.target.tagName !== 'LABEL' &&
            !e.target.closest('.speed-control')) { // Ignora click sulla sezione velocità
            toggleScroll();
        }
    });

    // Scroll manuale: se arrivi alla fine, ferma lo scroll
    mainContainer.addEventListener('scroll', () => {
        if (isScrolling) {
            const atBottom = mainContainer.scrollTop + mainContainer.clientHeight >= 
                            mainContainer.scrollHeight - 10;
            
            if (atBottom) {
                stopScroll();
                Toast.success('Fine dello spartito raggiunta', 2000);
            }
        }
    });
}

// ========== GESTIONE FILE PDF ==========
async function handleFileSelect(file) {
    if (!file) return;

    if (file.type !== 'application/pdf') {
        Toast.error('Per favore, seleziona un file PDF valido');
        return;
    }
    
    // Validazione dimensione file (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
        Toast.error(`Il file è troppo grande (${(file.size / 1024 / 1024).toFixed(1)}MB). Massimo 10MB.`);
        return;
    }

    console.log(`📂 Caricamento file: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB)`);
    
    // Mostra un messaggio di caricamento
    elements.uploadBox.innerHTML = '<p class="upload-icon">⏳</p><h2>Caricamento in corso...</h2>';
    
    // Carica e renderizza il PDF
    const success = await pdfHandler.loadPDF(file);
    
    if (success) {
        // Nascondi sezione upload, mostra PDF e controlli
        showPDFSection();
    } else {
        // Ripristina l'interfaccia di upload in caso di errore
        resetUploadBox();
    }
}

// ========== UI TRANSITIONS ==========
function showPDFSection() {
    elements.uploadSection.style.display = 'none';
    elements.pdfContainer.style.display = 'flex';
    elements.headerTitle.style.display = 'none';
    elements.controls.style.display = 'flex';
    mainContainer.scrollTop = 0;
}

function showUploadSection() {
    elements.uploadSection.style.display = 'flex';
    elements.pdfContainer.style.display = 'none';
    elements.headerTitle.style.display = 'block';
    elements.controls.style.display = 'none';
    resetUploadBox();
    elements.fileInput.value = ''; // Reset input file
}

function resetUploadBox() {
    elements.uploadBox.innerHTML = `
        <p class="upload-icon">📄</p>
        <h2>Carica il tuo spartito</h2>
        <p>Clicca o trascina qui un file PDF</p>
    `;
    const btn = document.createElement('button');
    btn.id = 'uploadBtn';
    btn.className = 'btn-primary';
    btn.textContent = 'Scegli File PDF';
    btn.addEventListener('click', () => elements.fileInput.click());
    elements.uploadBox.appendChild(btn);
}

// ========== AUTO-SCROLL LOGIC ==========

/**
 * Avvia lo scroll automatico
 * Usa requestAnimationFrame per scroll fluido
 */
function startScroll() {
    // Fix race condition: cancella animazione precedente se esiste
    if (scrollInterval) {
        cancelAnimationFrame(scrollInterval);
        scrollInterval = null;
    }
    
    isScrolling = true;
    elements.playIcon.textContent = '⏸️'; // Cambia icona in pausa
    scrollAccumulator = 0; // Reset accumulatore
    
    console.log(`▶️ Scroll avviato (velocità: x${scrollSpeed.toFixed(1)})`);
    console.log(`📱 Device: ${navigator.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop'}`);

    // Funzione di animazione che viene chiamata ~60 volte al secondo
    function animate() {
        if (!isScrolling) return;

        // Calcola quanto scrollare in base alla velocità
        // scrollSpeed è un moltiplicatore (0.1x - 1.5x)
        // Velocità base: 0.8 pixel per frame a 1.0x
        const pixelsPerFrame = scrollSpeed * 0.8;
        
        // Accumula i pixel (inclusi decimali)
        scrollAccumulator += pixelsPerFrame;
        
        // Scrolla solo quando abbiamo accumulato almeno 1 pixel intero
        if (scrollAccumulator >= 1) {
            const pixelsToScroll = Math.floor(scrollAccumulator);
            mainContainer.scrollTop += pixelsToScroll;
            scrollAccumulator -= pixelsToScroll;
        }

        // Verifica se siamo alla fine
        const atBottom = mainContainer.scrollTop + mainContainer.clientHeight >= 
                        mainContainer.scrollHeight - 5;
        
        if (atBottom) {
            console.log('🏁 Fine spartito raggiunta');
            stopScroll();
            return;
        }

        // Continua l'animazione
        scrollInterval = requestAnimationFrame(animate);
    }

    // Avvia l'animazione
    scrollInterval = requestAnimationFrame(animate);
}

/**
 * Ferma lo scroll automatico
 */
function stopScroll() {
    isScrolling = false;
    elements.playIcon.textContent = '▶️'; // Cambia icona in play
    scrollAccumulator = 0; // Reset accumulatore
    
    if (scrollInterval) {
        cancelAnimationFrame(scrollInterval);
        scrollInterval = null;
    }
    
    console.log('⏸️ Scroll fermato');
}

/**
 * Toggle play/pause
 */
function toggleScroll() {
    if (isScrolling) {
        stopScroll();
    } else {
        startScroll();
    }
}

// ========== FULLSCREEN ==========
function toggleFullscreen() {
    const elem = document.documentElement;
    const isFullscreen = document.fullscreenElement || 
                         document.webkitFullscreenElement || 
                         document.mozFullScreenElement;
    
    if (!isFullscreen) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen().catch(err => console.error('Errore fullscreen:', err));
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
    }
}

// ========== UTILITY ==========

// Previeni zoom accidentale su double-tap (iOS/Android)
document.addEventListener('dblclick', (e) => {
    e.preventDefault();
}, { passive: false });

// Log iniziale
console.log('🎸 Lettore Spartiti - Ready!');
