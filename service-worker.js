/* ========================================
   SERVICE WORKER - App Shell Cache Only
   I PDF sono gestiti da IndexedDB, non dalla cache
   ======================================== */

const CACHE_VERSION = 'spartiti-shell-v1';

// Solo i file base dell'app (app shell)
const APP_SHELL = [
    './',
    './index.html',
    './css/style.css',
    './js/app.js',
    './js/pdfHandler.js',
    './js/dbManager.js',
    './js/spartiti-library.js',
    './manifest.json'
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

    // Ignora richieste non-GET e domini esterni
    if (request.method !== 'GET') return;
    if (!request.url.startsWith(self.location.origin)) return;

    // I PDF NON passano più dal Service Worker - gestiti da IndexedDB
    if (request.url.endsWith('.pdf')) {
        return; // Lascia gestire alla app
    }

    event.respondWith(
        caches.match(request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                return fetch(request);
            })
            .catch(() => {
                // Se offline e non in cache, prova a servire index.html
                if (request.destination === 'document') {
                    return caches.match('./index.html');
                }
            })
    );
});

console.log('✅ [SW] Service Worker loaded');
