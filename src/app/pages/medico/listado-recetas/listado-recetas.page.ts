import { Component, OnInit } from '@angular/core';
import { RecetasService } from 'src/app/services/recetas.service';
import { Receta } from 'src/app/models/receta.model';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from 'src/app/firebase-init';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-listado-recetas',
  templateUrl: './listado-recetas.page.html',
  styleUrls: ['./listado-recetas.page.scss'],
  standalone: false
})
export class ListadoRecetasPage implements OnInit {
  // 🔍 Usamos tipo ANY porque estamos agregando "fechaOrden" temporal
  recetas: (Receta & { fechaOrden: number })[] = [];

  constructor(
    private recetasService: RecetasService,
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router,
    private loadingController: LoadingController
  ) {}

  async ngOnInit() {
    console.log('🔄 ngOnInit: entrando a cargarRecetas()...');
    await this.cargarRecetas();
  }

  async cargarRecetas() {
  const loading = await this.loadingController.create({
    message: 'Cargando historial de pacientes...',
    spinner: 'crescent',
  });
  await loading.present();

  try {
    const data = localStorage.getItem('usuario');
    if (!data) {
      console.warn('⚠️ No hay usuario en localStorage');
      await loading.dismiss();
      return;
    }

    const usuario = JSON.parse(data);
    const rutMedico = usuario.rut;

    const recetasRaw = await this.recetasService.obtenerRecetasPorMedico(rutMedico);

    this.recetas = recetasRaw.map(receta => {
      const fechaCompleta = new Date(receta.fecha + 'T08:00:00');
      return {
        ...receta,
        fechaOrden: fechaCompleta.getTime()
      };
    });

    this.recetas.sort((a, b) => b.fechaOrden - a.fechaOrden);
  } catch (error) {
    console.error('❌ Error al cargar recetas:', error);
  }

  await loading.dismiss();
}


  // ✅ Versión segura sin new Date()
  obtenerFechaFormateada(fechaStr: string): string {
    const [anio, mes, dia] = fechaStr.split('-');
    return `${dia}/${mes}/${anio}`;
  }

  async editarReceta(id: string) {
  const loading = await this.loadingController.create({
    message: 'Cargando receta...',
    spinner: 'crescent',
    duration: 1000 // opcional: corta automáticamente
  });

  await loading.present();

  setTimeout(() => {
    this.router.navigate(['/medico/editar-receta', id]);
  }, 500); // puedes ajustar la espera si lo deseas
}


  async confirmarEliminar(id: string) {
    const alert = await this.alertController.create({
      header: '¿Está seguro de eliminar esta receta?',
      buttons: [
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            await this.eliminarReceta(id);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });

    await alert.present();
  }

  async eliminarReceta(id: string) {
  const loading = await this.loadingController.create({
    message: 'Eliminando receta...',
    spinner: 'circles'
  });
  await loading.present();

  try {
    const recetaRef = doc(db, 'recetas_medicas', id);
    await deleteDoc(recetaRef);

    this.recetas = this.recetas.filter(r => r.id !== id);

    const toast = await this.toastController.create({
      message: 'Receta eliminada correctamente',
      duration: 2000,
      color: 'success'
    });
    await toast.present();
  } catch (error) {
    console.error('Error eliminando receta:', error);
    const toast = await this.toastController.create({
      message: 'Error al eliminar receta',
      duration: 2000,
      color: 'danger'
    });
    await toast.present();
  } finally {
    await loading.dismiss();
  }
}

}
