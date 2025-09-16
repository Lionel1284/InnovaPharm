import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FarmaceuticosService } from 'src/app/services/farmaceuticos.service';
import { Farmaceutico } from 'src/app/models/farmaceutico.model';

@Component({
  selector: 'app-registro-farmaceutico',
  templateUrl: './registro-farmaceutico.page.html',
  styleUrls: ['./registro-farmaceutico.page.scss'],
  standalone: false,
})
export class RegistroFarmaceuticoPage {
  farmaceutico: Farmaceutico = {
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    correo: '',
    contrasena: '',
    rut: '',
    rol: 'farmaceutico'
  };

  constructor(
    private farmaceuticosService: FarmaceuticosService,
    private toastCtrl: ToastController
  ) {}

  async registrar(event: Event) {
    event.preventDefault();

    const { nombre, apellidoPaterno, correo, contrasena, rut } = this.farmaceutico;
    if (!nombre || !apellidoPaterno || !correo || !contrasena || !rut) {
      const toast = await this.toastCtrl.create({
        message: 'Por favor completa todos los campos obligatorios',
        duration: 2000,
        color: 'warning'
      });
      toast.present();
      return;
    }

    try {
      await this.farmaceuticosService.registrarFarmaceutico(this.farmaceutico);
      const toast = await this.toastCtrl.create({
        message: 'Farmacéutico registrado correctamente',
        duration: 2000,
        color: 'success'
      });
      toast.present();

      this.farmaceutico = {
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        correo: '',
        contrasena: '',
        rut: '',
        rol: 'farmaceutico'
      };
    } catch (error) {
      const toast = await this.toastCtrl.create({
        message: 'Error al registrar el farmacéutico',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
      console.error('Error al registrar farmacéutico:', error);
    }
  }

  validarYFormatearRut(event: any) {
    let input = event.detail.value || '';
    const limpio = input.replace(/[^0-9kK]/g, '').toUpperCase();
    const truncado = limpio.slice(0, 9);
    this.farmaceutico.rut = this.formatearRut(truncado);
  }

  formatearRut(rut: string): string {
    if (rut.length < 2) return rut;
    const cuerpo = rut.slice(0, -1);
    const dv = rut.slice(-1);
    const cuerpoFormateado = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${cuerpoFormateado}-${dv}`;
  }
}
