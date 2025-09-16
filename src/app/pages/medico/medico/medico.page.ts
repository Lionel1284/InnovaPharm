import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController, LoadingController } from '@ionic/angular'; // <-- Agregamos LoadingController

@Component({
  selector: 'app-medico',
  templateUrl: './medico.page.html',
  styleUrls: ['./medico.page.scss'],
  standalone: false,
})
export class MedicoPage {
  constructor(
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController,
    private loadingController: LoadingController // <-- Lo inyectamos
  ) {}

  async cerrarSesion() {
    const alerta = await this.alertController.create({
      header: '¿Cerrar sesión?',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Cerrar sesión',
          handler: async () => {
            const loading = await this.loadingController.create({
              message: 'Cerrando sesión...',
              spinner: 'circles',
              duration: 2000 // puedes ajustar el tiempo (ms)
            });

            await loading.present();

            setTimeout(() => {
              localStorage.removeItem('usuario');
              this.authService.logout();
              this.router.navigateByUrl('/login', { replaceUrl: true });
            }, 2000); // debe coincidir con el duration del loading
          }
        }
      ]
    });

    await alerta.present();
  }
}
