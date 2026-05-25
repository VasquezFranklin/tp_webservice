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
            .set('size', '250x250')
            .set('format', 'png');

        return this.http.get(this.baseUrl, {
            params: params,
            responseType: 'blob'
        });
    }
}