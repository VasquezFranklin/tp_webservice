import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextToAudioService } from '../../services/textToAudio.service';

@Component({
  selector: 'app-tts',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './textToAudio.html'
})
export class TextToAudioComponent {
  private textToAudioService = inject(TextToAudioService);

  texto = signal<string>('');
  vozSeleccionada = signal<string>('alloy');

  audioUrl = signal<string | null>(null);
  cargando = signal<boolean>(false);
  mensajeError = signal<string | null>(null);

  generarVoz() {
    if (this.texto().trim() === '') return;

    this.cargando.set(true);
    this.audioUrl.set(null);
    this.mensajeError.set(null);

    this.textToAudioService.convertirTexto(this.texto(), this.vozSeleccionada()).subscribe({
      next: (archivoBinario: Blob) => {

        const reader = new FileReader();

        reader.onloadend = () => {
          const base64data = reader.result as string;
          this.audioUrl.set(base64data);
          this.cargando.set(false);
        };

        const audioMp3 = new Blob([archivoBinario], { type: 'audio/mpeg' });
        reader.readAsDataURL(audioMp3);

      },
      error: (err) => {
        console.error('Error al generar:', err);
        this.mensajeError.set('Ocurrió un error al generar el audio');
        this.cargando.set(false);
      }
    });
  }
}