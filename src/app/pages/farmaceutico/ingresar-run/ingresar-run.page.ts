import { Component } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-ingresar-run',
  templateUrl: './ingresar-run.page.html',
  styleUrls: ['./ingresar-run.page.scss'],
  standalone: false
})
export class IngresarRunPage {
  rut: string = '';

  constructor(
    private usuariosService: UsuariosService,
    private alertCtrl: AlertController,
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}

  validarYFormatearRut(event: any) {
    let input = event.detail.value || '';
    const limpio = input.replace(/[^0-9kK]/g, '').toUpperCase();
    const truncado = limpio.slice(0, 9);
    this.rut = this.formatearRut(truncado);
  }

  formatearRut(rut: string): string {
    if (rut.length < 2) return rut;
    const cuerpo = rut.slice(0, -1);
    const dv = rut.slice(-1);
    const cuerpoFormateado = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${cuerpoFormateado}-${dv}`;
  }

  async validarRut() {
  const limpio = this.rut.trim().replace(/[^0-9kK]/g, '').toUpperCase();
  const truncado = limpio.slice(0, 9);
  const rutFinal = this.formatearRut(truncado);

  const loading = await this.loadingController.create({
    message: 'Validando RUT...',
    spinner: 'crescent',
    duration: 5000 // opcional, se cerrará manualmente
  });

  await loading.present();

  try {
    const existe = await this.usuariosService.existePacientePorRut(rutFinal);

    await loading.dismiss();

    if (!existe) {
      const toast = await this.toastController.create({
        message: 'Este RUT no está registrado como paciente.',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
      return;
    }

    // Redirigir si existe
    this.router.navigate(['/farmaceutico/recetas-farmaceutico', rutFinal]);

  } catch (error) {
    await loading.dismiss();
    const toast = await this.toastController.create({
      message: 'Error al validar el RUT.',
      duration: 2000,
      color: 'danger'
    });
    await toast.present();
  }
}

}
