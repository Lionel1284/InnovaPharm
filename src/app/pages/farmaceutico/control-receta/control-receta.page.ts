import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Receta } from 'src/app/models/receta.model';
import { RecetasService } from 'src/app/services/recetas.service';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from 'src/app/firebase-init';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController, LoadingController } from '@ionic/angular'; // Agregado LoadingController

@Component({
  selector: 'app-control-receta',
  templateUrl: './control-receta.page.html',
  styleUrls: ['./control-receta.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class ControlRecetaPage implements OnInit {
  receta: Receta | null = null;
  firmaBase64: string | null = null;
  cargando = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recetasService: RecetasService,
    private toastController: ToastController,
    private loadingController: LoadingController // Inyectado
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/farmaceutico/escaneo']);
      return;
    }

    this.receta = await this.recetasService.obtenerRecetaPorId(id);

    if (this.receta?.medicoRut) {
      const q = query(
        collection(db, 'usuarios_medicos'),
        where('rut', '==', this.receta.medicoRut)
      );
      const snapshot = await getDocs(q);
      const medico = snapshot.docs[0]?.data();
      this.firmaBase64 = medico?.['firmaBase64'] || null;
    }

    this.cargando = false;
  }

  async marcarEntregada() {
    if (!this.receta?.id) return;

    const loading = await this.loadingController.create({
      message: 'Marcando como entregada...',
      duration: 2000,
      spinner: 'crescent'
    });

    await loading.present();

    await this.recetasService.actualizarEstadoReceta(this.receta.id, 'entregada');
    this.receta.estado = 'entregada';

    await loading.dismiss();
    await this.mostrarToast('Receta marcada como entregada');
    this.router.navigate(['/farmaceutico/ver-receta']);
  }

  async rechazarReceta() {
    if (!this.receta?.id) return;

    const loading = await this.loadingController.create({
      message: 'Rechazando receta...',
      duration: 2000,
      spinner: 'crescent'
    });

    await loading.present();

    await this.recetasService.actualizarEstadoReceta(this.receta.id, 'rechazada');
    this.receta.estado = 'rechazada';

    await loading.dismiss();
    await this.mostrarToast('Receta rechazada');
    this.router.navigate(['/farmaceutico/ver-receta']);
  }

  private async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }
}
