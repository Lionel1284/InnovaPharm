import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { trace } from 'firebase/performance';
import { perf } from 'src/app/firebase-init';
import { Observable, firstValueFrom } from 'rxjs';

declare var window: any;

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
  standalone: false,
})
export class AjustesPage implements OnInit {
  usuario$: Observable<Usuario | null>;
  nombreCompleto: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {
    this.usuario$ = this.authService.usuario$;
  }

  async ngOnInit() {
    const traza = trace(perf, 'tiempo_carga_register');
    traza.start();
    await new Promise(resolve => setTimeout(resolve, 1000));
    traza.stop();

    if (window.FirebasePlugin) {
      window.FirebasePlugin.setScreenName("Register");
      window.FirebasePlugin.logEvent("pantalla_abierta", { nombre: "Register" });
    }

    this.usuario$.subscribe(usuario => {
      if (!usuario) {
        this.router.navigate(['/login']);
        return;
      }

      const nombre = usuario?.nombre || '';
      const apellido = (usuario as any)?.apellidoPaterno || '';
      this.nombreCompleto = `${this.capitalizar(nombre)} ${this.capitalizar(apellido)}`;
    });
  }

  capitalizar(texto: string): string {
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
  }

  async irAPerfil() {
  const loading = await this.loadingController.create({
    message: 'Cargando perfil...',
    spinner: 'crescent',
    duration: 1000 // Puedes ajustar el tiempo si quieres más o menos
  });

  await loading.present();

  // Esperamos un poco antes de redirigir
  setTimeout(() => {
    this.router.navigate(['/paciente/perfil']);
  }, 500); // Redirige antes de que se cierre si deseas una navegación más fluida
}


  async cerrarSesion() {
    const alert = await this.alertController.create({
      header: '¿Cerrar sesión?',
      message: '¿Estás seguro que deseas cerrar tu sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Sí, cerrar',
          handler: async () => {
            const loading = await this.loadingController.create({
              message: 'Cerrando sesión...',
              duration: 1500,
              spinner: 'crescent'
            });

            await loading.present();

            const usuario = await firstValueFrom(this.usuario$);

            if (window.FirebasePlugin) {
              window.FirebasePlugin.logEvent("cerrar_sesion", {
                usuario: usuario?.correo || 'desconocido'
              });
            }

            setTimeout(() => {
              this.authService.logout();
              this.router.navigateByUrl('/login', { replaceUrl: true });
            }, 1500);
          }
        }
      ]
    });

    await alert.present();
  }

  irAccesibilidad() {
    this.router.navigate(['/paciente', 'accesibilidad']);
  }

  irTerminosUso() {
    this.router.navigate(['/paciente', 'terminos-de-uso']);
  }

  irAjustesNotificaciones() {
    this.router.navigate(['/paciente', 'ajustesnotificaciones']);
  }
}
