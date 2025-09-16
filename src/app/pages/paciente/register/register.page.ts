import { Component } from '@angular/core';
import { PacientesService } from 'src/app/services/pacientes.service';
import { Paciente } from 'src/app/models/paciente.model';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { trace } from 'firebase/performance';
import { perf } from 'src/app/firebase-init';


declare var window: any;

@Component({
  standalone: false,
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  paciente: Paciente = {
  nombre: '',
  apellidoPaterno: '',
  apellidoMaterno: '',
  correo: '',
  contrasena: '',
  rut: '',
  rol: 'paciente'
};
contrasenaConfirmacion: string = '';
mostrarContrasena: boolean = false;
mostrarContrasenaConfirmacion: boolean = false;
  constructor(
    private pacientesService: PacientesService,
    private toastCtrl: ToastController,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}


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

 async registrar(event: Event) {
  event.preventDefault();

  const loading = await this.loadingCtrl.create({
    message: 'Registrando...',
    spinner: 'crescent',
    backdropDismiss: false
  });

  await loading.present(); // Muestra el loader

  const { nombre, apellidoPaterno, apellidoMaterno, correo, contrasena, rut } = this.paciente;
  if (!nombre || !apellidoPaterno || !correo || !contrasena || !rut) {
    await loading.dismiss(); // Oculta el loader si hay error
    const toast = await this.toastCtrl.create({
      message: 'Por favor completa todos los campos',
      duration: 2000,
      color: 'warning'
    });
    toast.present();
    return;
  }

  const formatoCorreoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formatoCorreoValido.test(correo)) {
    await loading.dismiss();
    const toast = await this.toastCtrl.create({
      message: 'El correo no tiene un formato válido',
      duration: 2000,
      color: 'danger'
    });
    toast.present();
    return;
  }

  if (this.paciente.contrasena !== this.contrasenaConfirmacion) {
    await loading.dismiss();
    const toast = await this.toastCtrl.create({
      message: 'Las contraseñas no coinciden',
      duration: 2000,
      color: 'danger'
    });
    toast.present();
    return;
  }

  const rutLimpio = rut.replace(/[^0-9kK]/g, '').toUpperCase();
  if (rutLimpio.length < 2) {
    await loading.dismiss();
    const toast = await this.toastCtrl.create({
      message: 'RUT inválido',
      duration: 2000,
      color: 'danger'
    });
    toast.present();
    return;
  }

  const cuerpo = rutLimpio.slice(0, -1);
  const dvIngresado = rutLimpio.slice(-1);
  const dvCalculado = this.calcularDV(cuerpo);

  if (dvIngresado !== dvCalculado) {
    await loading.dismiss();
    const toast = await this.toastCtrl.create({
      message: 'Dígito verificador incorrecto',
      duration: 2000,
      color: 'danger'
    });
    toast.present();
    return;
  }

  const existe = await this.pacientesService.existePacientePorRutOCorreo(rut, correo);
  if (existe) {
    await loading.dismiss();
    const toast = await this.toastCtrl.create({
      message: 'Ya existe un usuario con ese RUT o correo',
      duration: 2000,
      color: 'warning'
    });
    toast.present();
    return;
  }

  try {
    await this.pacientesService.registrarPaciente(this.paciente);

    await loading.dismiss(); // Oculta el loader cuando termina correctamente

    if (window.FirebasePlugin) {
    window.FirebasePlugin.logEvent("registro_exitoso", {
      nombre: this.paciente.nombre,
      correo: this.paciente.correo
    });
  }

    const toast = await this.toastCtrl.create({
      message: 'Registro exitoso',
      duration: 2000,
      color: 'success'

    });
    await toast.present();

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  } catch (error) {
    await loading.dismiss();
    const toast = await this.toastCtrl.create({
      message: 'Error al registrar',
      duration: 2000,
      color: 'danger'
    });
    toast.present();
    console.error('Error al registrar:', error);
  }
}


  validarYFormatearRut(event: any) {
    let input = event.detail.value || '';

    // Solo dejamos números y K/k
    const limpio = input.replace(/[^0-9kK]/g, '').toUpperCase();

    // Limitar a 9 caracteres válidos (8 + dígito verificador)
    const truncado = limpio.slice(0, 9);

    this.paciente.rut = this.formatearRut(truncado);
  }

  formatearRut(rut: string): string {
    if (rut.length < 2) return rut;

    const cuerpo = rut.slice(0, -1);
    const dv = rut.slice(-1);

    // Agregar puntos al cuerpo
    const cuerpoFormateado = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return `${cuerpoFormateado}-${dv}`;
  }
  calcularDV(rutSinDv: string): string {
    let suma = 0;
    let multiplicador = 2;

    for (let i = rutSinDv.length - 1; i >= 0; i--) {
      suma += parseInt(rutSinDv.charAt(i), 10) * multiplicador;
      multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }

    const resto = 11 - (suma % 11);
    if (resto === 11) return '0';
    if (resto === 10) return 'K';
    return resto.toString();
  }
}
