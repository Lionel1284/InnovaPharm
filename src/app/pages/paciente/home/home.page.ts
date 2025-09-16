import { Component, OnInit } from '@angular/core';
import { trace } from 'firebase/performance';
import { perf } from 'src/app/firebase-init';

declare var window: any; // Necesario para FirebaseX

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {
  nombreCompleto: string = '';

  async ngOnInit() {
    const data = localStorage.getItem('usuario');
    if (data) {
      const usuario = JSON.parse(data);
      const nombre = usuario.nombre || '';
      const apellido = usuario.apellidoPaterno || '';
      this.nombreCompleto = `${this.capitalizar(nombre)} ${this.capitalizar(apellido)}`;
    }

    // ⏱ Medir tiempo de carga
    const traza = trace(perf, 'tiempo_carga_home');
    traza.start();
    await new Promise(resolve => setTimeout(resolve, 1000));
    traza.stop();

    // Registrar evento en Firebase Analytics (via FirebaseX)
    if (window.FirebasePlugin) {
      window.FirebasePlugin.setScreenName("Home");
      window.FirebasePlugin.logEvent("pantalla_abierta", { nombre: "Home" });
    }
  }

  capitalizar(texto: string): string {
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
  }
}
