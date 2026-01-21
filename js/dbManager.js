/* ========================================
   DBMANAGER.JS - IndexedDB Manager per PDF Storage
   Database persistente per spartiti musicali
   ======================================== */

class DBManager {
    constructor() {
        this.dbName = 'SpartitiDB';
        this.dbVersion = 1;
        this.db = null;
    }

    /**
     * Inizializza il database
     */
    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onerror = () => {
                console.error('❌ [DB] Errore apertura database:', request.error);
                reject(request.error);
            };

            request.onsuccess = () => {
                this.db = request.result;
                console.log('✅ [DB] Database aperto');
                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                console.log('🔧 [DB] Creazione/Aggiornamento schema');
                const db = event.target.result;

                // Store per spartiti PDF
                if (!db.objectStoreNames.contains('spartiti')) {
                    const spartitiStore = db.createObjectStore('spartiti', { keyPath: 'id' });
                    spartitiStore.createIndex('category', 'category', { unique: false });
                    spartitiStore.createIndex('title', 'title', { unique: false });
                    console.log('📦 [DB] Object store "spartiti" creato');
                }

                // Store per metadata
                if (!db.objectStoreNames.contains('metadata')) {
                    db.createObjectStore('metadata', { keyPath: 'key' });
                    console.log('📦 [DB] Object store "metadata" creato');
                }
            };
        });
    }

    /**
     * Salva uno spartito nel database
     * @param {Object} spartito - { id, category, title, notesBlob, sheetBlob, videoUrl }
     */
    async saveSpartito(spartito) {
        if (!this.db) await this.init();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['spartiti'], 'readwrite');
            const store = transaction.objectStore('spartiti');
            
            const data = {
                id: spartito.id,
                category: spartito.category,
                title: spartito.title,
                notesBlob: spartito.notesBlob || null,
                sheetBlob: spartito.sheetBlob,
                videoUrl: spartito.videoUrl || '',
                savedAt: new Date().toISOString()
            };

            const request = store.put(data);

            request.onsuccess = () => {
                console.log('✅ [DB] Spartito salvato:', spartito.title);
                resolve();
            };

            request.onerror = () => {
                console.error('❌ [DB] Errore salvataggio:', request.error);
                reject(request.error);
            };
        });
    }

    /**
     * Ottieni uno spartito dal database
     * @param {string} id - ID dello spartito
     */
    async getSpartito(id) {
        if (!this.db) await this.init();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['spartiti'], 'readonly');
            const store = transaction.objectStore('spartiti');
            const request = store.get(id);

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = () => {
                console.error('❌ [DB] Errore lettura:', request.error);
                reject(request.error);
            };
        });
    }

    /**
     * Ottieni tutti gli spartiti
     */
    async getAllSpartiti() {
        if (!this.db) await this.init();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['spartiti'], 'readonly');
            const store = transaction.objectStore('spartiti');
            const request = store.getAll();

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = () => {
                console.error('❌ [DB] Errore lettura tutti:', request.error);
                reject(request.error);
            };
        });
    }

    /**
     * Ottieni spartiti per categoria
     * @param {string} category - Nome categoria
     */
    async getSpartitiByCategory(category) {
        if (!this.db) await this.init();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['spartiti'], 'readonly');
            const store = transaction.objectStore('spartiti');
            const index = store.index('category');
            const request = index.getAll(category);

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = () => {
                console.error('❌ [DB] Errore lettura categoria:', request.error);
                reject(request.error);
            };
        });
    }

    /**
     * Elimina uno spartito
     * @param {string} id - ID dello spartito
     */
    async deleteSpartito(id) {
        if (!this.db) await this.init();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['spartiti'], 'readwrite');
            const store = transaction.objectStore('spartiti');
            const request = store.delete(id);

            request.onsuccess = () => {
                console.log('🗑️ [DB] Spartito eliminato:', id);
                resolve();
            };

            request.onerror = () => {
                console.error('❌ [DB] Errore eliminazione:', request.error);
                reject(request.error);
            };
        });
    }

    /**
     * Scarica e salva uno spartito da URL
     * @param {Object} spartito - { id, category, title, notesFile, sheetFile, videoUrl }
     */
    async downloadAndSaveSpartito(spartito) {
        try {
            console.log('⬇️ [DB] Downloading:', spartito.title);

            // Scarica il PDF dello spartito
            const sheetResponse = await fetch(spartito.sheetFile);
            if (!sheetResponse.ok) throw new Error(`HTTP error! status: ${sheetResponse.status}`);
            const sheetBlob = await sheetResponse.blob();

            // Scarica il PDF delle note (se presente)
            let notesBlob = null;
            if (spartito.notesFile && spartito.notesFile.trim() !== '') {
                try {
                    const notesResponse = await fetch(spartito.notesFile);
                    if (notesResponse.ok) {
                        notesBlob = await notesResponse.blob();
                    }
                } catch (err) {
                    console.warn('⚠️ [DB] Note non disponibili:', err);
                }
            }

            // Salva nel database
            await this.saveSpartito({
                id: spartito.id,
                category: spartito.category,
                title: spartito.title,
                notesBlob: notesBlob,
                sheetBlob: sheetBlob,
                videoUrl: spartito.videoUrl
            });

            return true;
        } catch (error) {
            console.error('❌ [DB] Errore download spartito:', error);
            throw error;
        }
    }

    /**
     * Sincronizza tutti gli spartiti dalla libreria
     */
    async syncAllFromLibrary() {
        console.log('🔄 [DB] Inizio sincronizzazione...');
        
        const stats = {
            total: 0,
            success: 0,
            failed: 0,
            skipped: 0
        };

        try {
            // Ottieni spartiti esistenti
            const existing = await this.getAllSpartiti();
            const existingIds = new Set(existing.map(s => s.id));

            // Conta totale spartiti
            for (const categoryName in spartitiCategories) {
                stats.total += spartitiCategories[categoryName].spartiti.length;
            }

            // Scarica ogni spartito
            for (const categoryName in spartitiCategories) {
                const category = spartitiCategories[categoryName];
                
                for (const spartito of category.spartiti) {
                    const id = `${categoryName}_${spartito.title}`;
                    
                    // Skip se già presente
                    if (existingIds.has(id)) {
                        console.log('⏭️ [DB] Già presente:', spartito.title);
                        stats.skipped++;
                        continue;
                    }

                    try {
                        await this.downloadAndSaveSpartito({
                            id: id,
                            category: categoryName,
                            title: spartito.title,
                            notesFile: spartito.notesFile,
                            sheetFile: spartito.sheetFile,
                            videoUrl: spartito.videoUrl
                        });
                        stats.success++;
                    } catch (error) {
                        console.error('❌ [DB] Fallito:', spartito.title, error);
                        stats.failed++;
                    }
                }
            }

            console.log('✅ [DB] Sincronizzazione completata:', stats);
            return stats;
        } catch (error) {
            console.error('❌ [DB] Errore sincronizzazione:', error);
            throw error;
        }
    }

    /**
     * Salva metadata
     */
    async saveMetadata(key, value) {
        if (!this.db) await this.init();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['metadata'], 'readwrite');
            const store = transaction.objectStore('metadata');
            const request = store.put({ key, value, updatedAt: new Date().toISOString() });

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Ottieni metadata
     */
    async getMetadata(key) {
        if (!this.db) await this.init();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['metadata'], 'readonly');
            const store = transaction.objectStore('metadata');
            const request = store.get(key);

            request.onsuccess = () => resolve(request.result?.value);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Cancella tutto il database (per debug)
     */
    async clearAll() {
        if (!this.db) await this.init();

        const transaction = this.db.transaction(['spartiti', 'metadata'], 'readwrite');
        await Promise.all([
            transaction.objectStore('spartiti').clear(),
            transaction.objectStore('metadata').clear()
        ]);
        console.log('🗑️ [DB] Database pulito');
    }

    /**
     * Ottieni statistiche database
     */
    async getStats() {
        if (!this.db) await this.init();

        const spartiti = await this.getAllSpartiti();
        const categories = new Set(spartiti.map(s => s.category));
        
        const totalSize = spartiti.reduce((sum, s) => {
            return sum + (s.sheetBlob?.size || 0) + (s.notesBlob?.size || 0);
        }, 0);

        return {
            totalSpartiti: spartiti.length,
            categories: categories.size,
            totalSize: totalSize,
            totalSizeMB: (totalSize / 1024 / 1024).toFixed(2)
        };
    }
}

// Esporta istanza globale
const dbManager = new DBManager();

// Inizializza al caricamento
if (typeof window !== 'undefined') {
    window.addEventListener('load', async () => {
        try {
            await dbManager.init();
            console.log('💾 [DB] Manager inizializzato');
        } catch (error) {
            console.error('❌ [DB] Errore inizializzazione:', error);
        }
    });
}
