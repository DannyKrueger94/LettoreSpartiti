/* ========================================
   PDFHANDLER.JS - Gestione caricamento e rendering PDF
   ======================================== */

// Classe che gestisce tutto ciò che riguarda il PDF
class PDFHandler {
    constructor() {
        // Configurazione PDF.js per utilizzare il worker (migliora prestazioni)
        pdfjsLib.GlobalWorkerOptions.workerSrc = 
            'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        
        // Variabili di stato per PDF spartito principale
        this.pdfDoc = null;
        this.currentPage = 1;
        this.totalPages = 0;
        this.scale = 2.0;
        this.canvas = document.getElementById('pdfCanvas');
        this.context = this.canvas.getContext('2d');
        
        // Variabili per PDF note
        this.notesPdfDoc = null;
        this.notesTotalPages = 0;
        this.notesCanvas = document.getElementById('notesCanvas');
        this.notesContext = this.notesCanvas.getContext('2d');
    }

    /**
     * Carica PDF da IndexedDB usando l'ID spartito
     * @param {string} spartitoId - ID dello spartito nel database
     */
    async loadFromDB(spartitoId) {
        try {
            console.log('📂 [PDF] Caricamento da DB:', spartitoId);
            
            // Ottieni spartito dal database
            const spartito = await dbManager.getSpartito(spartitoId);
            if (!spartito) {
                throw new Error('Spartito non trovato nel database');
            }

            // Carica PDF note (se presente)
            if (spartito.notesBlob) {
                try {
                    const notesArrayBuffer = await spartito.notesBlob.arrayBuffer();
                    const notesLoadingTask = pdfjsLib.getDocument({data: notesArrayBuffer});
                    this.notesPdfDoc = await notesLoadingTask.promise;
                    this.notesTotalPages = this.notesPdfDoc.numPages;
                    console.log(`✅ [PDF] Note caricate: ${this.notesTotalPages} pagine`);
                } catch (notesError) {
                    console.warn('⚠️ [PDF] Errore caricamento note:', notesError);
                    this.notesPdfDoc = null;
                }
            } else {
                console.log('ℹ️ [PDF] Nessuna nota disponibile');
                this.notesPdfDoc = null;
            }
            
            // Carica PDF spartito (obbligatorio)
            if (!spartito.sheetBlob) {
                throw new Error('Blob spartito mancante');
            }
            
            const sheetArrayBuffer = await spartito.sheetBlob.arrayBuffer();
            const sheetLoadingTask = pdfjsLib.getDocument({data: sheetArrayBuffer});
            this.pdfDoc = await sheetLoadingTask.promise;
            this.totalPages = this.pdfDoc.numPages;
            console.log(`✅ [PDF] Spartito caricato: ${this.totalPages} pagine`);
            
            // Renderizza entrambi
            await this.renderNotes();
            await this.renderAllPages();
            
            return true;
        } catch (error) {
            console.error('❌ [PDF] Errore caricamento:', error);
            Toast.error('Errore nel caricamento dello spartito');
            return false;
        }
    }

    /**
     * Carica DUE file PDF da URL (fallback se non in DB)
     * @deprecated Usa loadFromDB invece
     */
    async loadDualPDF(notesFilePath, sheetFilePath) {
        try {
            console.log('📂 Caricamento PDF da URL...');
            
            // Carica PDF note (OPZIONALE)
            if (notesFilePath && notesFilePath.trim() !== "") {
                try {
                    const notesResponse = await fetch(notesFilePath);
                    if (!notesResponse.ok) {
                        console.warn(`⚠️ File note non trovato: ${notesFilePath}`);
                        this.notesPdfDoc = null;
                    } else {
                        const notesArrayBuffer = await notesResponse.arrayBuffer();
                        const notesLoadingTask = pdfjsLib.getDocument({data: notesArrayBuffer});
                        this.notesPdfDoc = await notesLoadingTask.promise;
                        this.notesTotalPages = this.notesPdfDoc.numPages;
                        console.log(`✅ PDF Note caricato: ${this.notesTotalPages} pagine`);
                    }
                } catch (notesError) {
                    console.warn('⚠️ Impossibile caricare le note:', notesError);
                    this.notesPdfDoc = null;
                }
            } else {
                console.log('ℹ️ Nessun file note specificato');
                this.notesPdfDoc = null;
            }
            
            // Carica PDF spartito (OBBLIGATORIO)
            const sheetResponse = await fetch(sheetFilePath);
            if (!sheetResponse.ok) {
                throw new Error(`File spartito non trovato: ${sheetFilePath}`);
            }
            const sheetArrayBuffer = await sheetResponse.arrayBuffer();
            const sheetLoadingTask = pdfjsLib.getDocument({data: sheetArrayBuffer});
            this.pdfDoc = await sheetLoadingTask.promise;
            this.totalPages = this.pdfDoc.numPages;
            console.log(`✅ PDF Spartito caricato: ${this.totalPages} pagine`);
            
            // Renderizza entrambi (renderNotes gestisce già il caso null)
            await this.renderNotes();
            await this.renderAllPages();
            
            return true;
        } catch (error) {
            console.error('❌ Errore nel caricamento PDF:', error);
            Toast.error('Errore nel caricamento. Assicurati che i file esistano.');
            return false;
        }
    }
    
    /**
     * Renderizza il PDF delle note (FISSO, non scrolla)
     */
    async renderNotes() {
        if (!this.notesPdfDoc) return;
        
        console.log('🎨 Rendering note...');
        
        // Array per i canvas delle pagine note
        const pageCanvases = [];
        let totalHeight = 0;
        let maxWidth = 0;
        
        // Renderizza tutte le pagine delle note
        for (let pageNum = 1; pageNum <= this.notesTotalPages; pageNum++) {
            const page = await this.notesPdfDoc.getPage(pageNum);
            const viewport = page.getViewport({scale: this.scale});
            
            const tempCanvas = document.createElement('canvas');
            const tempContext = tempCanvas.getContext('2d');
            tempCanvas.width = viewport.width;
            tempCanvas.height = viewport.height;
            
            await page.render({
                canvasContext: tempContext,
                viewport: viewport
            }).promise;
            
            pageCanvases.push(tempCanvas);
            totalHeight += viewport.height;
            maxWidth = Math.max(maxWidth, viewport.width);
        }
        
        // Combina in un unico canvas
        this.notesCanvas.width = maxWidth;
        this.notesCanvas.height = totalHeight;
        
        let currentY = 0;
        for (const pageCanvas of pageCanvases) {
            this.notesContext.drawImage(pageCanvas, 0, currentY);
            currentY += pageCanvas.height;
        }
        
        console.log('✅ Note renderizzate!');
    }

    /**
     * Renderizza TUTTE le pagine del PDF in sequenza
     * Questo crea un'unica lunga immagine con tutto lo spartito
     */
    async renderAllPages() {
        if (!this.pdfDoc) return;

        console.log('🎨 Rendering di tutte le pagine...');

        // Array per salvare i canvas di ogni pagina
        const pageCanvases = [];
        let totalHeight = 0;
        let maxWidth = 0;

        // FASE 1: Renderizza ogni pagina in un canvas separato
        for (let pageNum = 1; pageNum <= this.totalPages; pageNum++) {
            const page = await this.pdfDoc.getPage(pageNum);
            const viewport = page.getViewport({scale: this.scale});
            
            // Crea un canvas temporaneo per questa pagina
            const tempCanvas = document.createElement('canvas');
            const tempContext = tempCanvas.getContext('2d');
            
            tempCanvas.width = viewport.width;
            tempCanvas.height = viewport.height;
            
            // Renderizza la pagina nel canvas temporaneo
            await page.render({
                canvasContext: tempContext,
                viewport: viewport
            }).promise;
            
            pageCanvases.push(tempCanvas);
            totalHeight += viewport.height;
            maxWidth = Math.max(maxWidth, viewport.width);
            
            console.log(`📄 Pagina ${pageNum}/${this.totalPages} renderizzata`);
        }

        // FASE 2: Combina tutti i canvas in uno solo
        this.canvas.width = maxWidth;
        this.canvas.height = totalHeight;
        
        let currentY = 0;
        for (const pageCanvas of pageCanvases) {
            // Disegna ogni pagina sotto la precedente
            this.context.drawImage(pageCanvas, 0, currentY);
            currentY += pageCanvas.height;
        }

        console.log('✅ Tutte le pagine renderizzate!');
    }

    /**
     * Calcola l'altezza totale dello spartito renderizzato
     * @returns {number} Altezza in pixel
     */
    getContentHeight() {
        return this.canvas.height;
    }

    /**
     * Reset del PDF (torna all'inizio)
     */
    reset() {
        this.currentPage = 1;
    }
}

// Esporta l'istanza per usarla in app.js
const pdfHandler = new PDFHandler();
