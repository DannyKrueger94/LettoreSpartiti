/* ========================================
   PDFHANDLER.JS - Gestione caricamento e rendering PDF
   ======================================== */

// Classe che gestisce tutto ciò che riguarda il PDF
class PDFHandler {
    constructor() {
        // Configurazione PDF.js per utilizzare il worker (migliora prestazioni)
        pdfjsLib.GlobalWorkerOptions.workerSrc = 
            'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        
        // Variabili di stato
        this.pdfDoc = null;        // Documento PDF caricato
        this.currentPage = 1;       // Pagina corrente
        this.totalPages = 0;        // Numero totale di pagine
        this.scale = 2.0;          // Scala di rendering (2.0 = alta qualità)
        this.canvas = document.getElementById('pdfCanvas');
        this.context = this.canvas.getContext('2d');
    }

    /**
     * Carica un file PDF
     * @param {File} file - File PDF da caricare
     * @returns {Promise} - Promise che si risolve quando il PDF è caricato
     */
    async loadPDF(file) {
        try {
            // Legge il file come ArrayBuffer (dati binari)
            const arrayBuffer = await file.arrayBuffer();
            
            // PDF.js carica e interpreta il PDF
            const loadingTask = pdfjsLib.getDocument({data: arrayBuffer});
            this.pdfDoc = await loadingTask.promise;
            
            // Salva il numero totale di pagine
            this.totalPages = this.pdfDoc.numPages;
            
            console.log(`✅ PDF caricato: ${this.totalPages} pagine`);
            
            // Renderizza la prima pagina
            await this.renderAllPages();
            
            return true;
        } catch (error) {
            console.error('❌ Errore nel caricamento PDF:', error);
            alert('Errore nel caricamento del PDF. Assicurati che sia un file valido.');
            return false;
        }
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
