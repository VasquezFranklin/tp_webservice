import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- 1. Importa esto
import { ConversorService } from '../../services/conversor.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-conversor',
  standalone: true,
  imports: [FormsModule, DecimalPipe], // <-- 2. Agrégalo aquí
  templateUrl: './conversor.html'
})
export class ConversorComponent {
  private conversorService = inject(ConversorService);

  // 3. Creas las variables (Signals) que van a "escuchar" al HTML
  // Les ponemos valores por defecto para que los selects arranquen con algo
  cantidad = signal<number>(1);
  monedaOrigen = signal<string>('USD');
  monedaDestino = signal<string>('ARS');

  // Variable para guardar el resultado de la API
  resultado = signal<number | null>(null);

  // 4. El método que se ejecuta al hacer clic en el botón
  convertir() {
    // Al llamar a cantidad(), monedaOrigen() y monedaDestino(), 
    // ya tienes los datos que el usuario escribió en el HTML, sin hacer ningún "get" extra.
    this.conversorService.convertirDivisa(
      this.monedaOrigen(),
      this.monedaDestino(),
      this.cantidad()
    ).subscribe({
      next: (res) => {
        // Guardas el resultado matemático exacto que viene dentro del objeto JSON
        this.resultado.set(res.result);
      },
      error: (err) => console.error('Error en la conversión:', err)
    });
  }
}