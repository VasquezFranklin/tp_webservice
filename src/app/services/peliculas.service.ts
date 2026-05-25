import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { PeliculasSeason, PeliculasEpisode } from '../interfaces/peliculas.interface';

@Injectable({
    providedIn: 'root'
})
export class PeliculasService {
    private http = inject(HttpClient);
    private apiUrl = 'https://netflix54.p.rapidapi.com/season/episodes/';

    getEpisodes(): Observable<PeliculasEpisode[]> {
        const headers = new HttpHeaders({
            'x-rapidapi-key': '8690b2c45cmsh70a87c0be77ca55p1f5d52jsna1a16c769e64',
            'x-rapidapi-host': 'netflix54.p.rapidapi.com'
        });

        const params = new HttpParams()
            .set('ids', '80077209,80117715')
            .set('offset', '0')
            .set('limit', '25')
            .set('lang', 'en');

        return this.http.get<PeliculasSeason[]>(this.apiUrl, { headers, params }).pipe(
            map(seasons => seasons.flatMap(season => season.episodes))
        );
    }
}