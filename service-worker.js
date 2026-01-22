/* ========================================
   SERVICE WORKER - App Shell Cache Only
   I PDF sono gestiti da IndexedDB, non dalla cache
   ======================================== */

const CACHE_VERSION = 'spartiti-shell-v4'; // ⬅️ INCREMENTATA per forzare update immediato

// Solo i file base dell'app (app shell)
const APP_SHELL = [
    './',
    './index.html',
    './css/style.css',
    './js/app.js',
    './js/pdfHandler.js',
    './js/dbManager.js',
    './js/spartiti-library.js',
    './manifest.json',
    './icons/icon-192x192.png',
    './icons/icon-512x512.png',
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
];

// ========== INSTALLAZIONE ==========
self.addEventListener('install', (event) => {
    console.log('🔧 [SW] Installing...');
    
    event.waitUntil(
        caches.open(CACHE_VERSION)
            .then(async (cache) => {
                console.log('📦 [SW] Caching app shell');
                for (const url of APP_SHELL) {
                    try {
                        await cache.add(url);
                        console.log('✅ [SW] Cached:', url);
                    } catch (err) {
                        console.warn('⚠️ [SW] Failed to cache:', url);
                    }
                }
            })
            .then(() => {
                console.log('✅ [SW] Installation complete');
                return self.skipWaiting();
            })
    );
});

// ========== MESSAGGI ==========
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        console.log('⚡ [SW] Skip waiting - attivazione immediata');
        self.skipWaiting();
    }
});

// ========== ATTIVAZIONE ==========
self.addEventListener('activate', (event) => {
    console.log('🔄 [SW] Activating...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_VERSION) {
                            console.log('🗑️ [SW] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('✅ [SW] Activated');
                return self.clients.claim();
            })
    );
});

// ========== FETCH - Cache First per app shell ==========
self.addEventListener('fetch', (event) => {
    const { request } = event;

    // Ignora richieste non-GET
    if (request.method !== 'GET') return;
    
    // I PDF NON passano dal Service Worker - gestiti da IndexedDB
    if (request.url.endsWith('.pdf') || request.url.includes('.pdf')) {
        console.log('[Service Worker] Skipping PDF (handled by app):', request.url);
        return; // Lascia gestire alla app senza intercettare
    }
    
    // Gestisci CDN esterni (PDF.js)
    const isCDN = request.url.includes('cdnjs.cloudflare.com');
    if (!isCDN && !request.url.startsWith(self.location.origin)) return;

    event.respondWith(
        caches.match(request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    console.log('[Service Worker] Serving from cache:', request.url);
                    return cachedResponse;
                }
                console.log('[Service Worker] Fetching from network:', request.url);
                return fetch(request);
            })
            .catch((error) => {
                console.error('[Service Worker] Fetch failed:', error);
                // Se offline e non in cache, prova a servire index.html per documenti
                if (request.destination === 'document') {
                    return caches.match('./index.html');
                }
                // Per altre risorse, ritorna una risposta vuota invece di undefined
                return new Response('Offline - Resource not available', {
                    status: 503,
                    statusText: 'Service Unavailable',
                    headers: new Headers({ 'Content-Type': 'text/plain' })
                });
            })
    );
});

console.log('✅ [SW] Service Worker loaded');
