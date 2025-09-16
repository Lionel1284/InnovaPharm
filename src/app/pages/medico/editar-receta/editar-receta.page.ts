import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecetasService } from 'src/app/services/recetas.service';
import { ToastController, LoadingController } from '@ionic/angular'; // <-- Agregamos LoadingController
import { Receta } from 'src/app/models/receta.model';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from 'src/app/firebase-init';

@Component({
  selector: 'app-editar-receta',
  templateUrl: './editar-receta.page.html',
  styleUrls: ['./editar-receta.page.scss'],
  standalone: false
})
export class EditarRecetaPage implements OnInit {
  recetaId: string = '';

  rutPaciente: string = '';
  nombrePaciente: string = '';
  descripcion: string = '';
  medicamentos: { nombre: string; instrucciones: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private recetasService: RecetasService,
    private toastController: ToastController,
    private router: Router,
    private loadingController: LoadingController   // <-- Inyectamos LoadingController
  ) {}

  async ngOnInit() {
    this.recetaId = this.route.snapshot.paramMap.get('id') || '';
    console.log('📝 Editando receta ID:', this.recetaId);

    if (this.recetaId) {
      await this.cargarReceta();
    }
  }

  async cargarReceta() {
    const receta = await this.recetasService.obtenerRecetaPorId(this.recetaId);

    if (!receta) {
      const toast = await this.toastController.create({
        message: 'Error: No se pudo cargar la receta.',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
      this.router.navigate(['/medico/home']);
      return;
    }

    // Cargamos los campos
    this.rutPaciente = receta.pacienteId;
    this.nombrePaciente = await this.obtenerNombrePaciente(receta.pacienteId);
    this.descripcion = receta.descripcion;
    this.medicamentos = receta.medicamentos;

    console.log('✅ Receta cargada:', receta);
  }

  async obtenerNombrePaciente(rut: string): Promise<string> {
    // Usamos el RecetasService para obtener el nombre del paciente
    const paciente = await this.recetasService.obtenerNombrePacientePorRut(rut);
    return paciente ? `${paciente.nombre} ${paciente.apellidoPaterno || ''}` : '';
  }

  agregarMedicamento() {
    this.medicamentos.push({ nombre: '', instrucciones: '' });
  }

  eliminarMedicamento(index: number) {
    this.medicamentos.splice(index, 1);
  }

  async guardarCambios() {
    if (!this.descripcion || this.medicamentos.length === 0) {
      const toast = await this.toastController.create({
        message: 'Completa la descripción y al menos un medicamento.',
        duration: 2000,
        color: 'warning'
      });
      await toast.present();
      return;
    }

    // Creamos y mostramos el loading spinner
    const loading = await this.loadingController.create({
      message: 'Guardando cambios...',
      spinner: 'circles'
    });
    await loading.present();

    try {
      const recetaRef = doc(db, 'recetas_medicas', this.recetaId);

      await updateDoc(recetaRef, {
        descripcion: this.descripcion,
        medicamentos: this.medicamentos
      });

      await loading.dismiss(); // Ocultamos el loader al finalizar

      const toast = await this.toastController.create({
        message: 'Receta actualizada correctamente.',
        duration: 2000,
        color: 'success'
      });
      await toast.present();

      this.router.navigate(['/medico/home']);
    } catch (error) {
      await loading.dismiss(); // Aseguramos el dismiss en caso de error
      console.error('Error actualizando receta:', error);
      const toast = await this.toastController.create({
        message: 'Error al guardar los cambios.',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
    }
  }
}
