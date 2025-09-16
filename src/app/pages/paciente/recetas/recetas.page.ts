import { Component, OnInit } from '@angular/core';
import { Receta } from 'src/app/models/receta.model';
import { RecetasService } from 'src/app/services/recetas.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { doc, setDoc, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { db } from 'src/app/firebase-init';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { trace } from 'firebase/performance';
import { perf } from 'src/app/firebase-init';
import { LoadingController } from '@ionic/angular';

declare var window: any;

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.page.html',
  styleUrls: ['./recetas.page.scss'],
  standalone: false,
})
export class RecetasPage implements OnInit {
  recetas: Receta[] = [];
  recetasFiltradas: Receta[] = [];
  cargando = true;
  busqueda = '';

  constructor(
    private recetasService: RecetasService,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  async ngOnInit() {
  const loading = await this.loadingController.create({
    message: 'Cargando recetas...',
    spinner: 'crescent',
    duration: 1500 // opcional: cierra automáticamente después de 1.5s
  });

  await loading.present();

  const usuario = this.authService.getUsuarioActual();
  const rut = usuario?.rut;

  if (rut) {
    const todas = await this.recetasService.obtenerRecetasPorPaciente(rut);
    this.recetas = todas.filter(r => !!r.id);
    this.recetasFiltradas = this.recetas;
  }

  this.cargando = false;

  loading.dismiss(); // por si se quiere cerrar manualmente antes del duration

  const traza = trace(perf, 'tiempo_carga_register');
  traza.start();
  await new Promise(resolve => setTimeout(resolve, 1000));
  traza.stop();

  if (window.FirebasePlugin) {
    window.FirebasePlugin.setScreenName("Register");
    window.FirebasePlugin.logEvent("pantalla_abierta", { nombre: "Register" });
  }
}


  filtrarRecetas() {
    const texto = this.busqueda.toLowerCase().trim();
    this.recetasFiltradas = this.recetas.filter(r => {
      const descripcion = r.descripcion.toLowerCase();
      const fecha = new Date(r.fecha).toLocaleDateString();
      const medicamentos = r.medicamentos.map(m => `${m.nombre} ${m.instrucciones}`.toLowerCase()).join(' ');
      return descripcion.includes(texto) || fecha.includes(texto) || medicamentos.includes(texto);
    });
  }

  async verReceta(id: string) {
  const loading = await this.loadingController.create({
    message: 'Cargando receta...',
    spinner: 'crescent',
    duration: 1500 // lo puedes quitar si prefieres cerrarlo manualmente
  });

  await loading.present();

  // Espera un pequeño tiempo antes de redirigir (opcional, para mejor UX)
  setTimeout(async () => {
    await loading.dismiss();
    this.router.navigate(['/paciente/receta', id]);
  }, 800); // puedes ajustar este tiempo si quieres que cargue más rápido o más lento
}


  async generarCodigoTemporal(recetaId: string) {
    const codigo = Math.floor(1000 + Math.random() * 9000).toString(); // 4 dígitos

    const codigoRef = doc(db, 'codigos_temporales', codigo);
    await setDoc(codigoRef, {
      recetaId,
      creadoEn: serverTimestamp()
    });

    const alert = await this.alertController.create({
      header: 'Código generado',
      message: `Código: ${codigo}\n\nCompártelo con tu médico.\nEste código expirará automáticamente en unos minutos.`,
      buttons: ['Cerrar'],
    });

    await alert.present();

    // Eliminar automáticamente después de 1 minuto
    setTimeout(async () => {
      try {
        await deleteDoc(codigoRef);
        console.log(`Código ${codigo} eliminado automáticamente.`);
      } catch (error) {
        console.error(`Error al eliminar el código ${codigo}:`, error);
      }
    }, 60000);
  }



  mostrarQR(recetaId: string) {
  const qrData = recetaId;
  const qrURL = `https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=${encodeURIComponent(qrData)}`;

  this.alertController.create({
    header: 'Código QR de la receta',
    message: `<img src="${qrURL}" alt="QR" style="display:block; margin:auto;" />`,
    buttons: ['Cerrar'],
  }).then(alert => alert.present());
}


async irACodigo(id: string) {
  const loading = await this.loadingController.create({
    message: 'Generando código...',
    spinner: 'crescent',
    duration: 1500
  });

  await loading.present();

  setTimeout(async () => {
    await loading.dismiss();
    this.router.navigate([`/paciente/receta/${id}/codigo`]);
  }, 800); // tiempo opcional para mejorar UX
}

async irAQR(id: string) {
  const loading = await this.loadingController.create({
    message: 'Generando QR...',
    spinner: 'crescent',
    duration: 1500
  });

  await loading.present();

  setTimeout(async () => {
    await loading.dismiss();
    this.router.navigate([`/paciente/receta/${id}/qr`]);
  }, 800); // igual que arriba
}


get darkMode() {
  return document.body.classList.contains('dark-mode');
}


}
