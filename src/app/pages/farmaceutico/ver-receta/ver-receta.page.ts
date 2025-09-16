import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-ver-receta',
  templateUrl: './ver-receta.page.html',
  styleUrls: ['./ver-receta.page.scss'],
  standalone: false,
})
export class VerRecetaPage implements OnInit {

  constructor(
    private router: Router,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {}

  async irAEscanearQR() {
    await this.mostrarLoaderYRedirigir('/farmaceutico/escaneo-receta', 'Abriendo escáner...');
  }

  async irACodigoAcceso() {
    await this.mostrarLoaderYRedirigir('/farmaceutico/codigo-acceso', 'Abriendo ingreso de código...');
  }

  async irAIngresarRUN() {
    await this.mostrarLoaderYRedirigir('/farmaceutico/ingresar-run', 'Abriendo ingreso de RUN...');
  }

  private async mostrarLoaderYRedirigir(ruta: string, mensaje: string) {
    const loading = await this.loadingController.create({
      message: mensaje,
      spinner: 'crescent',
      duration: 1500
    });

    await loading.present();

    setTimeout(async () => {
      await loading.dismiss();
      this.router.navigate([ruta]);
    }, 800); // Puedes ajustar el tiempo según prefieras
  }
}
