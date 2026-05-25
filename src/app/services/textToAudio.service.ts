import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TextToAudioService {
    private http = inject(HttpClient);

    // URL exacta que sacamos del cURL
    private apiUrl = 'https://open-ai-text-to-speech1.p.rapidapi.com/';

    private getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'x-rapidapi-host': 'open-ai-text-to-speech1.p.rapidapi.com',
            // Pega tu llave de RapidAPI aquí (la que funciona)
            'x-rapidapi-key': '8690b2c45cmsh70a87c0be77ca55p1f5d52jsna1a16c769e64'
        });
    }

    // Método ajustado a los requerimientos de la API
    convertirTexto(texto: string, voz: string): Observable<Blob> { // <-- Nota que ahora retorna un Blob
        const body = {
            model: "tts-1",
            input: texto,
            instructions: "Speak clearly.",
            voice: voz
        };

        // El error tuyo probablemente está aquí. DEBE tener responseType: 'blob'
        return this.http.post(this.apiUrl, body, {
            headers: this.getHeaders(),
            responseType: 'blob' // <-- ¡CRÍTICO! Si falta esto, Angular rompe el audio.
        });
    }
}