import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  templateUrl: './peliculas.html'
})
export class PeliculasComponent {
  private PeliculasService = inject(PeliculasService);

  peliculasResource = rxResource({
    stream: () => this.PeliculasService.getEpisodes()
  });
}