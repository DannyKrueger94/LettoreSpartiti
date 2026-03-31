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

// ========== FUNZIONI PULIZIA CACHE ==========
async function clearAllCaches() {
    try {
        // Ottieni tutte le cache
        const cacheNames = await caches.keys();
        console.log('🗑️ Cache trovate:', cacheNames);
        
        // Elimina tutte le cache
        await Promise.all(
            cacheNames.map(cacheName => {
                console.log('🗑️ Eliminazione cache:', cacheName);
                return caches.delete(cacheName);
            })
        );
        
        console.log('✅ Tutte le cache eliminate');
        return true;
    } catch (error) {
        console.error('❌ Errore nella pulizia cache:', error);
        return false;
    }
}

async function clearCacheAndReload() {
    Toast.info('🔄 Pulizia cache in corso...');
    
    try {
        // 1. Pulisci tutte le cache
        const cacheCleared = await clearAllCaches();
        
        if (!cacheCleared) {
            Toast.error('❌ Errore durante la pulizia cache');
            return;
        }
        
        // 2. Disregistra e ri-registra il service worker per forzare l'aggiornamento
        if ('serviceWorker' in navigator) {
            const registrations = await navigator.serviceWorker.getRegistrations();
            
            for (const registration of registrations) {
                console.log('🔄 Disregistrazione Service Worker...');
                await registration.unregister();
            }
            
            console.log('✅ Service Worker disregistrato');
        }
        
        // 3. Mostra notifica di successo
        Toast.success('✅ Cache pulita! Ricaricamento in corso...', 2000);
        
        // 4. Attendi 1 secondo e ricarica la pagina (hard reload)
        setTimeout(() => {
            console.log('♻️ Ricaricamento pagina...');
            window.location.reload(true);
        }, 1000);
        
    } catch (error) {
        console.error('❌ Errore:', error);
        Toast.error('❌ Errore durante la pulizia: ' + error.message);
    }
}
let mainContainer = null;       // Riferimento all'elemento main
let scrollAccumulator = 0;      // Accumulatore per decimali (per velocità molto basse)

// ========== ELEMENTI DOM ==========
// Li prendiamo una volta all'inizio per performance
const elements = {
    uploadSection: document.getElementById('uploadSection'),
    pdfContainer: document.getElementById('pdfContainer'),
    controls: document.getElementById('controls'),
    headerTitle: document.getElementById('headerTitle'),
    playPauseBtn: document.getElementById('playPauseBtn'),
    playIcon: document.getElementById('playIcon'),
    speedSlider: document.getElementById('speedSlider'),
    speedValue: document.getElementById('speedValue'),
    resetBtn: document.getElementById('resetBtn'),
    toggleNotesBtn: document.getElementById('toggleNotesBtn'),
    videoBtn: document.getElementById('videoBtn'),
    changeFileBtn: document.getElementById('changeFileBtn'),
    fullscreenBtn: document.getElementById('fullscreenBtn'),
    notesPanel: document.getElementById('notesPanel'),
    sheetPanel: document.getElementById('sheetPanel'),
    clearCacheBtn: document.getElementById('clearCacheBtn')
};

// ========== INIZIALIZZAZIONE ==========
window.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 App inizializzata');
    mainContainer = elements.sheetPanel; // Lo scroll ora è sul pannello spartito
    setupEventListeners();
});

// ========== EVENT LISTENERS ==========
function setupEventListeners() {
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
    
    // Toggle pannello note
    elements.toggleNotesBtn.addEventListener('click', () => {
        elements.notesPanel.classList.toggle('hidden');
        const isHidden = elements.notesPanel.classList.contains('hidden');
        Toast.info(isHidden ? 'Note nascoste' : 'Note visibili', 1500);
    });

    // Pulsante video tutorial
    elements.videoBtn.addEventListener('click', () => {
        if (window.currentSpartitoVideo) {
            window.open(window.currentSpartitoVideo, '_blank');
            Toast.success('Video tutorial aperto!', 2000);
        } else {
            Toast.warning('Nessun video disponibile per questo spartito', 2000);
        }
    });

    // Cambia file
    elements.changeFileBtn.addEventListener('click', () => {
        stopScroll();
        showUploadSection();
    });

    // Fullscreen
    elements.fullscreenBtn.addEventListener('click', toggleFullscreen);

    // Pulizia Cache
    if (elements.clearCacheBtn) {
        elements.clearCacheBtn.addEventListener('click', clearCacheAndReload);
    }

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
    elements.sheetPanel.addEventListener('scroll', () => {
        if (isScrolling) {
            const atBottom = elements.sheetPanel.scrollTop + elements.sheetPanel.clientHeight >= 
                            elements.sheetPanel.scrollHeight - 10;
            
            if (atBottom) {
                stopScroll();
                Toast.success('Fine dello spartito raggiunta', 2000);
            }
        }
    });
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
    // Cambia icona in pausa
    elements.playIcon.innerHTML = '<path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>';
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
    // Cambia icona in play
    elements.playIcon.innerHTML = '<path d="M8 5v14l11-7z"/>';
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
