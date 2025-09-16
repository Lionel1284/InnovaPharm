import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Medico } from 'src/app/models/medico.model';
import { MedicosService } from 'src/app/services/medicos.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-editar-medico',
  templateUrl: './editar-medico.page.html',
  styleUrls: ['./editar-medico.page.scss'],
  standalone: false,
})
export class EditarMedicoPage implements OnInit {
  medico: Medico = {
    id: '',
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
    private router: Router,
    private medicosService: MedicosService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    const usuario = nav?.extras?.state?.['usuario'];
    if (usuario) {
      this.medico = { ...usuario };
      this.firmaPreview = this.medico.firmaBase64 || null;
    } else {
      this.router.navigate(['/admin/usuarios']);
    }
  }

  async guardarCambios() {
    try {
      await this.medicosService.actualizarMedico(this.medico.id!, this.medico);
      const toast = await this.toastController.create({
        message: 'Médico actualizado correctamente',
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
      console.error('Error al actualizar médico:', error);
    }
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
