import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Paciente } from 'src/app/models/paciente.model';
import { PacientesService } from 'src/app/services/pacientes.service';
import { ToastController, LoadingController } from '@ionic/angular';
import { trace } from 'firebase/performance';
import { perf } from 'src/app/firebase-init';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

declare var window: any;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false
})
export class PerfilPage implements OnInit {
  usuario$: Observable<Paciente | null>;
  usuario: Paciente | null = null;

  constructor(
    private router: Router,
    private pacientesService: PacientesService,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private authService: AuthService
  ) {
    this.usuario$ = this.authService.usuario$ as Observable<Paciente | null>;
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
      } else {
        this.usuario = { ...usuario };
      }
    });
  }

  async guardarCambios() {
    if (!this.usuario || !this.usuario.id) return;

    try {
      await this.pacientesService.actualizarPaciente(this.usuario.id, {
        nombre: this.usuario.nombre,
        apellidoPaterno: this.usuario.apellidoPaterno,
        apellidoMaterno: this.usuario.apellidoMaterno
      });

      // ✅ Actualizamos el AuthService
      this.authService.login(this.usuario);

      const toast = await this.toastController.create({
        message: 'Perfil actualizado exitosamente.',
        duration: 1500,
        color: 'success'
      });
      toast.present();

      // ✅ Mostramos loader y redirigimos
      const loading = await this.loadingController.create({
        message: 'Redirigiendo al inicio...',
        duration: 1500,
        spinner: 'circles'
      });

      await loading.present();

      setTimeout(() => {
        this.router.navigate(['/paciente']);
      }, 1500);

    } catch (error) {
      const toast = await this.toastController.create({
        message: 'Error al actualizar el perfil.',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    }
  }
}
