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

  // 1. Carga inicial automática de las marcas
  marcasResource = rxResource({
    stream: () => this.carSpecsService.getBrands()
  });

  // 2. Nuestro "Diccionario" para guardar datos en memoria
  modelosCache: Record<number, CarSpecs[]> = {};

  // 3. Signals para la interfaz del Modal
  modelosDelModal = signal<CarSpecs[]>([]);
  marcaSeleccionada = signal<string>('');
  cargandoModelos = signal<boolean>(false); // Para mostrar un spinner en el modal

  abrirModelos(marca: CarSpecs) {
    // Actualizamos el título del modal
    this.marcaSeleccionada.set(marca.name);

    // Verificamos si ya tenemos los datos guardados
    if (this.modelosCache[marca.id]) {

      // SÍ: Los cargamos instantáneamente desde la memoria local
      this.modelosDelModal.set(this.modelosCache[marca.id]);

    } else {

      // NO: Activamos el spinner, vaciamos la lista y llamamos a la API
      this.cargandoModelos.set(true);
      this.modelosDelModal.set([]);

      this.carSpecsService.getModelsByBrand(marca.id).subscribe({
        next: (modelos) => {
          // Guardamos en nuestro diccionario para no volver a pedirlo
          this.modelosCache[marca.id] = modelos;
          // Actualizamos la vista del modal
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