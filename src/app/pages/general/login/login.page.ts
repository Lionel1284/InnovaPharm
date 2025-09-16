import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { LoadingController } from '@ionic/angular';
import { trace } from 'firebase/performance';
import { perf } from 'src/app/firebase-init';

declare var window: any;

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  rut: string = '';
  contrasena: string = '';

  constructor(
    private usuariosService: UsuariosService,
    private authService: AuthService,
    private toastCtrl: ToastController,
    private router: Router,
    private loadingCtrl: LoadingController,
  ) {}

  // 1️⃣ Instrumentación de carga de la vista + pantalla abierta
  async ngOnInit() {
    // 📈 Trazar tiempo de carga
    const traza = trace(perf, 'tiempo_carga_login');
    traza.start();
    await new Promise(resolve => setTimeout(resolve, 1000));
    traza.stop();

    // 📊 Evento de pantalla abierta
    if (window.FirebasePlugin) {
      window.FirebasePlugin.setScreenName("Login");
      window.FirebasePlugin.logEvent("pantalla_abierta", { nombre: "Login" });
    }
  }

  // 2️⃣ Lógica de inicio de sesión con eventos personalizados
  async login(event: Event) {
    event.preventDefault();

    if (!this.rut || !this.contrasena) {
      const toast = await this.toastCtrl.create({
        message: 'Por favor completa todos los campos',
        duration: 2000,
        color: 'warning'
      });
      await toast.present();
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Iniciando sesión...',
      spinner: 'crescent',
      backdropDismiss: false
    });
    await loading.present();

    try {
      // obtenemos el correo asociado al RUT
      const correo = await this.usuariosService.obtenerCorreoPorRut(this.rut);
      if (!correo) {
        throw new Error('no_encontrado');
      }

      // Firebase Auth
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, correo, this.contrasena);

      // Tu lógica de login interno
      const usuario: Usuario | null = await this.usuariosService.loginUsuarioPorRut(this.rut, correo);
      if (!usuario) {
        throw new Error('datos_usuario');
      }

      // Almacenamos en sesión
      this.authService.login(usuario);

      // 🔥 Evento de login exitoso
      if (window.FirebasePlugin) {
        window.FirebasePlugin.logEvent("login_exitoso", {
          rut: this.rut,
          correo: correo
        });
      }

      await loading.dismiss();
      const toast = await this.toastCtrl.create({
        message: `Bienvenido, ${usuario.nombre}`,
        duration: 2000,
        color: 'success'
      });
      await toast.present();

      const ruta = this.authService.getRutaPorRol(usuario.rol);
      this.router.navigate([ruta]);

    } catch (error: any) {
      await loading.dismiss();

      // 🔥 Evento de login fallido
      if (window.FirebasePlugin) {
        window.FirebasePlugin.logEvent("login_fallido", {
          rut: this.rut,
          razon: error.message || 'desconocido'
        });
      }

      const msg = (error.message === 'no_encontrado')
        ? 'No se encontró un usuario con ese RUT'
        : 'RUT o contraseña incorrectos';

      const toast = await this.toastCtrl.create({
        message: msg,
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
      console.error('Error durante login:', error);
    }
  }

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
}
