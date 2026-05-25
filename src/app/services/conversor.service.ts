import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConversorResponse } from '../interfaces/conversor.interface'; // Ajusta la ruta

@Injectable({
    providedIn: 'root'
})
export class ConversorService {
    private http = inject(HttpClient);
    private baseUrl = 'https://api.apilayer.com/currency_data';

    private getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'apikey': '7TS137Q9xYGqyLWozlRU1DO264XoTdtM'
        });
    }

    // Este es el método que debes implementar
    convertirDivisa(de: string, a: string, monto: number): Observable<ConversorResponse> {

        // Armamos la URL final con los Query Params dinámicos
        const params = new HttpParams()
            .set('from', de)
            .set('to', a)
            .set('amount', monto.toString()); // Convertimos el número a string para la petición HTTP

        return this.http.get<ConversorResponse>(`${this.baseUrl}/convert`, {
            headers: this.getHeaders(),
            params: params
        });
    }
}