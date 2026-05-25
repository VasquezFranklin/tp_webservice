import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConversorService } from '../../services/conversor.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-conversor',
  standalone: true,
  imports: [FormsModule, DecimalPipe],
  templateUrl: './conversor.html'
})
export class ConversorComponent {
  private conversorService = inject(ConversorService);

  cantidad = signal<number>(1);
  monedaOrigen = signal<string>('USD');
  monedaDestino = signal<string>('ARS');

  resultado = signal<number | null>(null);

  convertir() {
    this.conversorService.convertirDivisa(
      this.monedaOrigen(),
      this.monedaDestino(),
      this.cantidad()
    ).subscribe({
      next: (res) => {
        this.resultado.set(res.result);
      },
      error: (err) => console.error('Error en la conversión:', err)
    });
  }
}