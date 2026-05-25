import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QrService } from '../../services/mi-api.service';

@Component({
  selector: 'app-qr',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './mi-api.html'
})
export class QrComponent {
  private qrService = inject(QrService);

  textoIngresado = signal<string>('');
  qrBase64 = signal<string | null>(null);
  cargando = signal<boolean>(false);
  mensajeError = signal<string | null>(null);

  crearQr() {
    if (this.textoIngresado().trim() === '') return;

    this.cargando.set(true);
    this.qrBase64.set(null);
    this.mensajeError.set(null);

    this.qrService.generarQr(this.textoIngresado()).subscribe({
      next: (archivoImagen: Blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.qrBase64.set(reader.result as string);
          this.cargando.set(false);
        };
        reader.readAsDataURL(archivoImagen);
      },
      error: (err) => {
        console.error('Error al generar QR:', err);
        this.mensajeError.set('No se pudo generar el código QR');
        this.cargando.set(false);
      }
    });
  }
}