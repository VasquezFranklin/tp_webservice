import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class QrService {
    private http = inject(HttpClient);
    private baseUrl = 'https://api.qrserver.com/v1/create-qr-code/';

    generarQr(texto: string): Observable<Blob> {
        const params = new HttpParams()
            .set('data', texto)
            .set('size', '250x250') // Tamaño por defecto
            .set('format', 'png');

        // Retornamos un Blob porque el servidor escupe una imagen PNG cruda
        return this.http.get(this.baseUrl, {
            params: params,
            responseType: 'blob'
        });
    }
}