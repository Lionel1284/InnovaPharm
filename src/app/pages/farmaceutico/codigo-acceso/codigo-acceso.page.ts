import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { doc, getDoc, deleteDoc, Timestamp } from 'firebase/firestore';
import { db } from 'src/app/firebase-init';
import { AlertController, LoadingController } from '@ionic/angular';




@Component({
  selector: 'app-codigo-acceso',
  templateUrl: './codigo-acceso.page.html',
  styleUrls: ['./codigo-acceso.page.scss'],
  standalone: false
})
export class CodigoAccesoPage {
  codigo: string[] = ['', '', '', ''];

  constructor(
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  manejarInput(event: any) {
    const input = event.target;
    const valor = input.value.replace(/\D/g, ''); // solo dígitos
    const index = parseInt(input.dataset['index'], 10);

    if (valor) {
      this.codigo[index] = valor[0]; // solo el primer dígito
      input.value = valor[0];

      const siguiente = input.nextElementSibling;
      if (siguiente) siguiente.focus();
    } else {
      this.codigo[index] = '';
    }
  }

  manejarTecla(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const index = parseInt(input.dataset['index'] || '0', 10);

    if (event.key === 'Backspace' && !input.value && index > 0) {
      const anterior = input.previousElementSibling as HTMLInputElement;
      if (anterior) {
        anterior.focus();
        event.preventDefault(); // prevenir que borre dos veces
      }
    }
  }

  async validarCodigo() {
  const codigoFinal = this.codigo.join('');
  if (codigoFinal.length !== 4) {
    this.mostrarAlerta('Código inválido', 'Debes ingresar los 4 dígitos.');
    return;
  }

  const loading = await this.loadingController.create({
    message: 'Validando código...',
    spinner: 'crescent',
    duration: 5000 // como respaldo, aunque lo cerraremos manualmente
  });

  await loading.present();

  try {
    const codigoRef = doc(db, 'codigos_temporales', codigoFinal);
    const snapshot = await getDoc(codigoRef);

    if (!snapshot.exists()) {
      await loading.dismiss();
      this.mostrarAlerta('Código no encontrado', 'Este código no es válido o ya expiró.');
      return;
    }

    const data = snapshot.data();
    const creadoEn = data['creadoEn'] as Timestamp;
    const ahora = new Date();
    const tiempoCreado = creadoEn?.toDate?.() ?? new Date();
    const diferenciaMinutos = (ahora.getTime() - tiempoCreado.getTime()) / 60000;

    if (diferenciaMinutos > 5) {
      await deleteDoc(codigoRef);
      await loading.dismiss();
      this.mostrarAlerta('Código expirado', 'Este código ya ha expirado.');
      return;
    }

    const recetaId = data['recetaId'];
    await deleteDoc(codigoRef);

    await loading.dismiss();
    this.router.navigate(['/farmaceutico/control-receta', recetaId]);

  } catch (error) {
    await loading.dismiss();
    this.mostrarAlerta('Error', 'Ocurrió un problema al validar el código.');
  }
}

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['Cerrar']
    });
    await alert.present();
  }
}
