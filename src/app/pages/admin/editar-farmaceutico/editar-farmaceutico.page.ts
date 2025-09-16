import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Farmaceutico } from 'src/app/models/farmaceutico.model';
import { FarmaceuticosService } from 'src/app/services/farmaceuticos.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-editar-farmaceutico',
  templateUrl: './editar-farmaceutico.page.html',
  styleUrls: ['./editar-farmaceutico.page.scss'],
  standalone: false,
})
export class EditarFarmaceuticoPage implements OnInit {
  farmaceutico: Farmaceutico = {
    id: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    correo: '',
    contrasena: '',
    rut: '',
    rol: 'farmaceutico'
  };

  constructor(
    private router: Router,
    private farmaceuticosService: FarmaceuticosService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    const usuario = nav?.extras?.state?.['usuario'];
    if (usuario) {
      this.farmaceutico = { ...usuario };
    } else {
      this.router.navigate(['/admin/usuarios']);
    }
  }

  async guardarCambios() {
    try {
      await this.farmaceuticosService.actualizarFarmaceutico(this.farmaceutico.id!, this.farmaceutico);
      const toast = await this.toastController.create({
        message: 'Farmacéutico actualizado correctamente',
        duration: 2000,
        color: 'success'
      });
      await toast.present();
      this.router.navigate(['/admin/usuarios']);
    } catch (error) {
      const toast = await this.toastController.create({
        message: 'Error al guardar cambios',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
    }
  }
}
