import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TextToAudioService {
    private http = inject(HttpClient);

    private apiUrl = 'https://open-ai-text-to-speech1.p.rapidapi.com/';

    private getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'x-rapidapi-host': 'open-ai-text-to-speech1.p.rapidapi.com',
            'x-rapidapi-key': '8690b2c45cmsh70a87c0be77ca55p1f5d52jsna1a16c769e64'
        });
    }

    // Método ajustado a los requerimientos de la API
    convertirTexto(texto: string, voz: string): Observable<Blob> {
        const body = {
            model: "tts-1",
            input: texto,
            instructions: "Speak clearly.",
            voice: voz
        };

        return this.http.post(this.apiUrl, body, {
            headers: this.getHeaders(),
            responseType: 'blob'
        });
    }
}