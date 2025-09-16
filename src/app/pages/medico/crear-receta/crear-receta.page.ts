import { Component } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { RecetasService } from 'src/app/services/recetas.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Receta } from 'src/app/models/receta.model';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-crear-receta',
  templateUrl: './crear-receta.page.html',
  styleUrls: ['./crear-receta.page.scss'],
  standalone: false,
})
export class CrearRecetaPage {
  rutPaciente: string = '';
  nombrePaciente: string = '';

  descripcion: string = '';
  medicamentos: { nombre: string; instrucciones: string }[] = [];


  constructor(
    private usuariosService: UsuariosService,
    private recetasService: RecetasService,
    private toastController: ToastController,
    private router: Router,
    private loadingController: LoadingController
  ) {}

  // 👉 Formatear input RUT
  validarYFormatearRutPaciente(event: any) {
    let input = event.detail.value || '';
    const limpio = input.replace(/[^0-9kK]/g, '').toUpperCase();
    const truncado = limpio.slice(0, 9);
    this.rutPaciente = this.formatearRut(truncado);
  }

  // 👉 Formatear final para consulta
  formatearRut(rut: string): string {
    if (rut.length < 2) return rut;
    const cuerpo = rut.slice(0, -1);
    const dv = rut.slice(-1);
    const cuerpoFormateado = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${cuerpoFormateado}-${dv}`;
  }

  async validarRutPaciente() {
  const loading = await this.presentLoading('Validando paciente...');

  const limpio = this.rutPaciente.trim().replace(/[^0-9kK]/g, '').toUpperCase();
  const truncado = limpio.slice(0, 9);
  const rutFinal = this.formatearRut(truncado);

  console.log('RUT enviado a consulta:', `"${rutFinal}"`);

  const existe = await this.usuariosService.existePacientePorRut(rutFinal);

  if (!existe) {
    await loading.dismiss();
    const toast = await this.toastController.create({
      message: 'El RUT no corresponde a un paciente registrado.',
      duration: 2000,
      color: 'danger',
    });
    await toast.present();
    this.nombrePaciente = '';
    return;
  }

  const paciente = await this.usuariosService.obtenerPacientePorRut(rutFinal);
  this.nombrePaciente = paciente?.nombre ? `${paciente.nombre} ${paciente.apellidoPaterno || ''}` : '';

  await loading.dismiss();

  const toast = await this.toastController.create({
    message: 'Paciente validado correctamente.',
    duration: 1500,
    color: 'success',
  });
  await toast.present();
}


  agregarMedicamento() {
    this.medicamentos.push({ nombre: '', instrucciones: '' });
  }

  eliminarMedicamento(index: number) {
    this.medicamentos.splice(index, 1);
  }

  async crearReceta() {
  const loading = await this.presentLoading('Creando receta...');

  if (!this.rutPaciente || !this.nombrePaciente || !this.descripcion || this.medicamentos.length === 0) {
    await loading.dismiss();
    const toast = await this.toastController.create({
      message: 'Completa todos los campos antes de crear la receta.',
      duration: 2000,
      color: 'warning',
    });
    await toast.present();
    return;
  }

  const usuario = JSON.parse(localStorage.getItem('usuario')!);

  const receta: Receta = {
    pacienteId: this.rutPaciente,
    fecha: new Date().toISOString().split('T')[0],
    descripcion: this.descripcion,
    medicoNombre: usuario.nombre,
    medicoRut: usuario.rut,
    medicamentos: this.medicamentos,
    estado: 'pendiente',
  };

  await this.recetasService.crearReceta(receta);

  await loading.dismiss();

  const toast = await this.toastController.create({
    message: 'Receta creada correctamente.',
    duration: 2000,
    color: 'success',
  });
  await toast.present();

  this.limpiarFormulario();
  this.router.navigate(['/medico/home']);
}


  async limpiarFormulario() {
  const loading = await this.presentLoading('Limpiando formulario...');

  this.rutPaciente = '';
  this.nombrePaciente = '';
  this.descripcion = '';
  this.medicamentos = [];

  await loading.dismiss();
}




  async presentLoading(message: string = 'Cargando...') {
  const loading = await this.loadingController.create({
    message,
    duration: 2000, // opcional: se puede cerrar automáticamente
    spinner: 'circles'
  });
  await loading.present();
  return loading;
}

}
