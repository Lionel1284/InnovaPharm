import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { MedicosService } from 'src/app/services/medicos.service';
import { Medico } from 'src/app/models/medico.model';

@Component({
  selector: 'app-registro-doctor',
  templateUrl: './registro-doctor.page.html',
  styleUrls: ['./registro-doctor.page.scss'],
  standalone: false,
})
export class RegistroDoctorPage {
  medico: Medico = {
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    correo: '',
    contrasena: '',
    rut: '',
    especialidad: '',
    rol: 'medico',
    firmaBase64: ''
  };

  firmaPreview: string | null = null;

  constructor(
    private medicosService: MedicosService,
    private toastCtrl: ToastController
  ) {}

  async registrar(event: Event) {
    event.preventDefault();

    const { nombre, apellidoPaterno, correo, contrasena, rut, especialidad, firmaBase64 } = this.medico;
    if (!nombre || !apellidoPaterno || !correo || !contrasena || !rut || !especialidad || !firmaBase64) {
      const toast = await this.toastCtrl.create({
        message: 'Por favor completa todos los campos obligatorios (incluye firma)',
        duration: 2000,
        color: 'warning'
      });
      toast.present();
      return;
    }

    try {
      await this.medicosService.registrarMedico(this.medico);
      const toast = await this.toastCtrl.create({
        message: 'Doctor registrado correctamente',
        duration: 2000,
        color: 'success'
      });
      toast.present();

      this.medico = {
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        correo: '',
        contrasena: '',
        rut: '',
        especialidad: '',
        rol: 'medico',
        firmaBase64: ''
      };
      this.firmaPreview = null;
    } catch (error) {
      const toast = await this.toastCtrl.create({
        message: 'Error al registrar el doctor',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
      console.error('Error al registrar doctor:', error);
    }
  }

  validarYFormatearRut(event: any) {
    let input = event.detail.value || '';
    const limpio = input.replace(/[^0-9kK]/g, '').toUpperCase();
    const truncado = limpio.slice(0, 9);
    this.medico.rut = this.formatearRut(truncado);
  }

  formatearRut(rut: string): string {
    if (rut.length < 2) return rut;
    const cuerpo = rut.slice(0, -1);
    const dv = rut.slice(-1);
    const cuerpoFormateado = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${cuerpoFormateado}-${dv}`;
  }

  procesarFirma(event: any) {
    const archivo: File = event.target.files[0];
    if (!archivo) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      this.firmaPreview = base64;
      this.medico.firmaBase64 = base64;
    };
    reader.readAsDataURL(archivo);
  }
}
