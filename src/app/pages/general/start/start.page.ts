import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { trace } from 'firebase/performance';
import { perf } from 'src/app/firebase-init';

declare var window: any;

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
  standalone: false,
})
export class StartPage {
  constructor(private authService: AuthService, private router: Router) {}


  async ngOnInit() {
    const traza = trace(perf, 'tiempo_carga_register');
    traza.start();
    await new Promise(resolve => setTimeout(resolve, 1000));
    traza.stop();

    if (window.FirebasePlugin) {
      window.FirebasePlugin.setScreenName("Register");
      window.FirebasePlugin.logEvent("pantalla_abierta", { nombre: "Register" });
    }
  }


  ionViewWillEnter() {
    const usuario = this.authService.getUsuarioActual();
    const ruta = usuario
      ? this.authService.getRutaPorRol(usuario.rol)
      : '/login';

    this.router.navigateByUrl(ruta);
  }
}
