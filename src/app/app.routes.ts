import { Routes } from '@angular/router';
import { PeliculasComponent } from './components/peliculas/peliculas';
import { CarSpecsComponent } from './components/autos/autos';
import { ConversorComponent } from './components/conversor/conversor';
import { TextToAudioComponent } from './components/textToAudio/textToAudio';
import { QrComponent } from './components/mi-api/mi-api';
import { MenuComponent } from './components/menu/menu';

export const routes: Routes = [
    { path: 'peliculas', component: PeliculasComponent },
    { path: 'autos', component: CarSpecsComponent },
    { path: 'conversor', component: ConversorComponent },
    { path: 'texto-a-voz', component: TextToAudioComponent },
    { path: 'mi-api', component: QrComponent },
    { path: 'menu', component: MenuComponent },
    { path: '', redirectTo: '/menu', pathMatch: 'full' }, // Redirección por defecto
];
