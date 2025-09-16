import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.page.html',
  standalone: false
})
export class RecuperarContrasenaPage {
  correo: string = '';

  constructor(private authService: AuthService, private toastController: ToastController, private loadingController: LoadingController) {}

 async onSubmit() {
  const loading = await this.loadingController.create({
    message: 'Verificando correo...',
    spinner: 'crescent',
    duration: 10000,
  });
  await loading.present();

  try {
    await this.authService.resetPasswordSiExiste(this.correo);

    await loading.dismiss();

    const toast = await this.toastController.create({
      message: 'Correo de recuperación enviado. Revisa tu bandeja de entrada.',
      duration: 3000,
      color: 'success',
    });
    toast.present();
  } catch (error: any) {
    await loading.dismiss();

    const toast = await this.toastController.create({
      message: error.message || 'Error al enviar el correo.',
      duration: 3000,
      color: 'danger',
    });
    toast.present();
  }
}



}
