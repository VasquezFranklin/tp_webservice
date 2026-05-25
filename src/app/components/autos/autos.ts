import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { CarSpecsService } from '../../services/car-specs.service';
import { CarSpecs } from '../../interfaces/car-specs.interface';

@Component({
  selector: 'app-autos',
  standalone: true,
  templateUrl: './autos.html'
})
export class CarSpecsComponent {
  private carSpecsService = inject(CarSpecsService);

  marcasResource = rxResource({
    stream: () => this.carSpecsService.getBrands()
  });

  modelosCache: Record<number, CarSpecs[]> = {};

  modelosDelModal = signal<CarSpecs[]>([]);
  marcaSeleccionada = signal<string>('');
  cargandoModelos = signal<boolean>(false);

  abrirModelos(marca: CarSpecs) {
    this.marcaSeleccionada.set(marca.name);

    if (this.modelosCache[marca.id]) {

      this.modelosDelModal.set(this.modelosCache[marca.id]);

    } else {

      this.cargandoModelos.set(true);
      this.modelosDelModal.set([]);

      this.carSpecsService.getModelsByBrand(marca.id).subscribe({
        next: (modelos) => {
          this.modelosCache[marca.id] = modelos;
          this.modelosDelModal.set(modelos);
          this.cargandoModelos.set(false);
        },
        error: (err) => {
          console.error('Error al traer los modelos:', err);
          this.cargandoModelos.set(false);
        }
      });
    }
  }
}