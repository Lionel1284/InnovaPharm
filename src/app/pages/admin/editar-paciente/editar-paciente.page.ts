import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Paciente } from 'src/app/models/paciente.model';
import { PacientesService } from 'src/app/services/pacientes.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-editar-paciente',
  templateUrl: './editar-paciente.page.html',
  styleUrls: ['./editar-paciente.page.scss'],
  standalone: false,
})
export class EditarPacientePage implements OnInit {
  paciente: Paciente = {
  id: '',
  nombre: '',
  apellidoPaterno: '',
  apellidoMaterno: '',
  correo: '',
  contrasena: '',
  rut: '',
  rol: 'paciente'
};

  constructor(
    private router: Router,
    private pacientesService: PacientesService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    const usuario = nav?.extras?.state?.['usuario'];
    if (usuario) {
      this.paciente = { ...usuario };
    } else {
      // Si no hay datos, vuelve a la página anterior
      this.router.navigate(['/admin/usuarios']);
    }
  }

  async guardarCambios() {
    try {
      await this.pacientesService.actualizarPaciente(this.paciente.id!, this.paciente);
      const toast = await this.toastController.create({
        message: 'Paciente actualizado correctamente',
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
