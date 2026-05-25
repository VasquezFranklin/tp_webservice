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
        // Usamos el lector para pasar de Blob a Base64
        const reader = new FileReader();
        reader.onloadend = () => {
          // Esto genera el string exacto que pidió tu profesor: "data:image/png;base64,..."
          this.qrBase64.set(reader.result as string);
          this.cargando.set(false);
        };
        reader.readAsDataURL(archivoImagen);
      },
      error: (err) => {
        console.error('Error al generar QR:', err);
        this.mensajeError.set('No se pudo generar el código QR. Revisa tu conexión.');
        this.cargando.set(false);
      }
    });
  }
}