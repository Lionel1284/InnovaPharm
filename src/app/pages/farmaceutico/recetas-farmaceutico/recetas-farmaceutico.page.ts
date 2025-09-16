import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecetasService } from 'src/app/services/recetas.service';
import { Receta } from 'src/app/models/receta.model';

@Component({
  selector: 'app-recetas-farmaceutico',
  templateUrl: './recetas-farmaceutico.page.html',
  styleUrls: ['./recetas-farmaceutico.page.scss'],
  standalone: false
})
export class RecetasFarmaceuticoPage implements OnInit {
  recetas: Receta[] = [];
  recetasFiltradas: Receta[] = [];
  cargando = true;
  busqueda = '';
  rutPaciente = '';

  constructor(
    private recetasService: RecetasService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    this.rutPaciente = this.route.snapshot.paramMap.get('rut') ?? '';

    if (this.rutPaciente) {
      const todas = await this.recetasService.obtenerRecetasPorPaciente(this.rutPaciente);
      this.recetas = todas.filter(r => !!r.id);
      this.recetasFiltradas = this.recetas;
    }

    this.cargando = false;
  }

  filtrarRecetas() {
    const texto = this.busqueda.toLowerCase().trim();
    this.recetasFiltradas = this.recetas.filter(r => {
      const descripcion = r.descripcion.toLowerCase();
      const fecha = new Date(r.fecha).toLocaleDateString();
      const medicamentos = r.medicamentos.map(m => `${m.nombre} ${m.instrucciones}`.toLowerCase()).join(' ');
      return descripcion.includes(texto) || fecha.includes(texto) || medicamentos.includes(texto);
    });
  }

  irAControlReceta(id: string) {
    this.router.navigate(['/farmaceutico/control-receta', id]);
  }

  generarCodigoTemporal(id: string) {
    console.log('Generar código temporal para receta', id);
    // Implementación pendiente
  }
}
