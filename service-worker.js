/* ========================================
   SERVICE WORKER - App Shell con aggiornamento automatico
   I PDF sono gestiti da IndexedDB, non dalla cache
   ======================================== */

// Versione cache con timestamp - si aggiorna automaticamente ad ogni modifica
const CACHE_VERSION = 'spartiti-shell-v7-20260331'; // ⬅️ Cambia questa data quando modifichi i file

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

// File dell'app che devono essere sempre aggiornati (Network-First)
const NETWORK_FIRST_RESOURCES = [
    './js/app.js',
    './js/pdfHandler.js',
    './js/dbManager.js',
    './js/spartiti-library.js',
    './css/style.css',
    './index.html'
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

// ========== FETCH - Network First per app, Cache First per CDN ==========
self.addEventListener('fetch', (event) => {
    const { request } = event;

    // Ignora richieste non-GET
    if (request.method !== 'GET') return;
    
    // I PDF NON passano dal Service Worker - gestiti da IndexedDB
    if (request.url.endsWith('.pdf') || request.url.includes('.pdf')) {
        console.log('[Service Worker] Skipping PDF (handled by app):', request.url);
        return; // Lascia gestire alla app senza intercettare
    }
    
    // Gestisci CDN esterni (PDF.js) con Cache-First
    const isCDN = request.url.includes('cdnjs.cloudflare.com');
    
    // Verifica se è una risorsa dell'app che deve usare Network-First
    const isAppResource = NETWORK_FIRST_RESOURCES.some(resource => 
        request.url.includes(resource)
    );
    
    if (isAppResource) {
        // NETWORK-FIRST per file dell'app (sempre aggiornati)
        event.respondWith(
            fetch(request)
                .then((networkResponse) => {
                    // Aggiorna la cache con la nuova versione
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_VERSION).then((cache) => {
                        cache.put(request, responseClone);
                    });
                    console.log('[Service Worker] Network-First (updated):', request.url);
                    return networkResponse;
                })
                .catch(() => {
                    // Se offline, usa la cache come fallback
                    return caches.match(request).then((cachedResponse) => {
                        if (cachedResponse) {
                            console.log('[Service Worker] Network failed, using cache:', request.url);
                            return cachedResponse;
                        }
                        // Se non c'è nemmeno in cache, ritorna errore
                        return new Response('Offline - Resource not available', {
                            status: 503,
                            statusText: 'Service Unavailable',
                            headers: new Headers({ 'Content-Type': 'text/plain' })
                        });
                    });
                })
        );
    } else if (isCDN || request.url.startsWith(self.location.origin)) {
        // CACHE-FIRST per CDN e icone (risorse statiche)
        event.respondWith(
            caches.match(request)
                .then((cachedResponse) => {
                    if (cachedResponse) {
                        console.log('[Service Worker] Cache-First:', request.url);
                        return cachedResponse;
                    }
                    console.log('[Service Worker] Fetching from network:', request.url);
                    return fetch(request).then((networkResponse) => {
                        // Salva in cache per uso futuro
                        const responseClone = networkResponse.clone();
                        caches.open(CACHE_VERSION).then((cache) => {
                            cache.put(request, responseClone);
                        });
                        return networkResponse;
                    });
                })
                .catch((error) => {
                    console.error('[Service Worker] Fetch failed:', error);
                    // Se offline e non in cache, prova a servire index.html per documenti
                    if (request.destination === 'document') {
                        return caches.match('./index.html');
                    }
                    return new Response('Offline - Resource not available', {
                        status: 503,
                        statusText: 'Service Unavailable',
                        headers: new Headers({ 'Content-Type': 'text/plain' })
                    });
                })
        );
    }
});

console.log('✅ [SW] Service Worker loaded');
