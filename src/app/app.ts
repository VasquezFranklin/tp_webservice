import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // Necesario para el router-outlet
import { NavbarComponent } from './components/navbar/navbar'; // Importas tu componentes

@Component({
  selector: 'app-root',
  standalone: true, // Esto confirma que es un componente Standalone
  imports: [
    RouterOutlet,
    NavbarComponent, // <--- ACÁ LO AGREGÁS // <--- Y ACÁ TAMBIÉN
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'tp-webservice-6172';
}