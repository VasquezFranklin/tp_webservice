import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarSpecs } from '../interfaces/car-specs.interface';

@Injectable({
    providedIn: 'root'
})
export class CarSpecsService {
    private http = inject(HttpClient);
    private baseUrl = 'https://car-specs.p.rapidapi.com/v2/cars';
    private getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'x-rapidapi-key': '8690b2c45cmsh70a87c0be77ca55p1f5d52jsna1a16c769e64',
            'x-rapidapi-host': 'car-specs.p.rapidapi.com'
        });
    }

    getBrands(): Observable<CarSpecs[]> {
        return this.http.get<CarSpecs[]>(`${this.baseUrl}/makes`, {  //https://car-specs.p.rapidapi.com/v2/cars/makes
            headers: this.getHeaders()
        });
    }

    getModelsByBrand(brandId: number): Observable<CarSpecs[]> {

        return this.http.get<CarSpecs[]>(`${this.baseUrl}/makes/${brandId}/models`, {
            headers: this.getHeaders(),
        });
    }
}