/* ========================================
   SERVICE WORKER - Gestione cache e funzionamento offline
   ======================================== */

const CACHE_NAME = 'spartiti-app-v3';
const STATIC_CACHE = 'spartiti-static-v3';
const DYNAMIC_CACHE = 'spartiti-dynamic-v3';

// File da cachare immediatamente (shell dell'app)
const STATIC_FILES = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/app.js',
    '/js/pdfHandler.js',
    '/js/spartiti-library.js',
    '/manifest.json'
];

// ========== INSTALLAZIONE ==========
// Quando il Service Worker viene installato, carica i file statici
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing...');
    
    event.waitUntil(
        Promise.all([
            // Cache file statici
            caches.open(STATIC_CACHE).then((cache) => {
                console.log('[Service Worker] Caching static files');
                return Promise.allSettled(
                    STATIC_FILES.map(url => 
                        cache.add(url).catch(err => {
                            console.warn('[Service Worker] Failed to cache:', url, err);
                            return null;
                        })
                    )
                );
            }),
            // Pre-cache tutti i PDF dalla libreria
            fetch('/js/spartiti-library.js')
                .then(response => response.text())
                .then(text => {
                    // Estrai tutti i percorsi PDF dal file spartiti-library.js
                    const pdfFiles = [];
                    const notesRegex = /notesFile:\s*["']([^"']+\.pdf)["']/g;
                    const sheetRegex = /sheetFile:\s*["']([^"']+\.pdf)["']/g;
                    
                    let match;
                    while ((match = notesRegex.exec(text)) !== null) {
                        if (match[1] && match[1].trim() !== "") {
                            pdfFiles.push('/' + match[1]);
                        }
                    }
                    while ((match = sheetRegex.exec(text)) !== null) {
                        if (match[1] && match[1].trim() !== "") {
                            pdfFiles.push('/' + match[1]);
                        }
                    }
                    
                    console.log('[Service Worker] Found', pdfFiles.length, 'PDFs to cache');
                    
                    // Cache tutti i PDF
                    return caches.open(DYNAMIC_CACHE).then((cache) => {
                        return Promise.allSettled(
                            pdfFiles.map(pdfUrl => 
                                cache.add(pdfUrl)
                                    .then(() => console.log('[Service Worker] Cached:', pdfUrl))
                                    .catch(err => console.warn('[Service Worker] Failed to cache PDF:', pdfUrl, err))
                            )
                        );
                    });
                })
                .catch(err => {
                    console.error('[Service Worker] Failed to load spartiti library:', err);
                })
        ])
        .then(() => {
            console.log('[Service Worker] Installation complete - All PDFs cached!');
            return self.skipWaiting();
        })
        .catch((error) => {
            console.error('[Service Worker] Installation failed:', error);
        })
    );
});

// ========== ATTIVAZIONE ==========
// Pulisce le vecchie cache
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('[Service Worker] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('[Service Worker] Activation complete');
                return self.clients.claim(); // Prende controllo di tutte le pagine
            })
    );
});

// ========== STRATEGIA DI CACHING ==========
// Cache First per i file statici, Network First per i PDF dinamici
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Ignora richieste non-GET
    if (request.method !== 'GET') return;

    // Ignora richieste a domini esterni (eccetto PDF.js CDN)
    if (url.origin !== location.origin && 
        !url.href.includes('cdnjs.cloudflare.com/ajax/libs/pdf.js')) {
        return;
    }

    event.respondWith(
        caches.match(request)
            .then((cachedResponse) => {
                // Se è in cache, restituiscilo
                if (cachedResponse) {
                    console.log('[Service Worker] Serving from cache:', request.url);
                    return cachedResponse;
                }

                // Altrimenti, scaricalo dalla rete
                console.log('[Service Worker] Fetching from network:', request.url);
                return fetch(request)
                    .then((networkResponse) => {
                        // Se è un PDF o un file importante, salvalo nella cache dinamica
                        if (request.url.endsWith('.pdf') || 
                            request.url.includes('/spartiti/') ||
                            request.url.includes('/js/') ||
                            request.url.includes('/css/')) {
                            
                            return caches.open(DYNAMIC_CACHE)
                                .then((cache) => {
                                    cache.put(request, networkResponse.clone());
                                    return networkResponse;
                                });
                        }
                        
                        return networkResponse;
                    })
                    .catch((error) => {
                        console.error('[Service Worker] Fetch failed:', error);
                        
                        // Pagina offline personalizzata (opzionale)
                        if (request.destination === 'document') {
                            return caches.match('./index.html');
                        }
                    });
            })
    );
});

// ========== BACKGROUND SYNC (opzionale) ==========
// Per eventuali funzionalità future come sincronizzazione dati
self.addEventListener('sync', (event) => {
    console.log('[Service Worker] Background sync:', event.tag);
    
    if (event.tag === 'sync-spartiti') {
        event.waitUntil(
            // Logica di sincronizzazione qui
            Promise.resolve()
        );
    }
});

// ========== NOTIFICHE PUSH (opzionale) ==========
// Per eventuali funzionalità future di notifiche
self.addEventListener('push', (event) => {
    console.log('[Service Worker] Push notification received');
    
    const options = {
        body: event.data ? event.data.text() : 'Nuovo aggiornamento disponibile!',
        icon: './icons/icon-192x192.png',
        badge: './icons/icon-72x72.png',
        vibrate: [200, 100, 200]
    };
    
    event.waitUntil(
        self.registration.showNotification('Lettore Spartiti', options)
    );
});

// ========== GESTIONE AGGIORNAMENTI ==========
// Notifica l'app quando c'è un nuovo Service Worker disponibile
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        console.log('[Service Worker] Skipping waiting...');
        self.skipWaiting();
    }
});

console.log('[Service Worker] Loaded successfully');
