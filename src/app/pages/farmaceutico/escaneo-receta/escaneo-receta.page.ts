import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeFormat } from '@zxing/library';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-escaneo-receta',
  templateUrl: './escaneo-receta.page.html',
  styleUrls: ['./escaneo-receta.page.scss'],
  standalone: false,
})
export class EscaneoRecetaPage {
  @ViewChild('scanner') scanner!: ZXingScannerComponent;

  formatsEnabled = [BarcodeFormat.QR_CODE];
  scanning = true;

  availableDevices: MediaDeviceInfo[] = [];
  currentDevice: MediaDeviceInfo | undefined;

  constructor(private router: Router, private loadingController: LoadingController) {}

  ionViewWillEnter() {
    const alreadyReloaded = sessionStorage.getItem('scannerPageReloaded');

    if (!alreadyReloaded) {
      sessionStorage.setItem('scannerPageReloaded', 'true');
      window.location.reload();
    } else {
      // Limpia el flag para que futuras visitas sí recarguen si es necesario
      sessionStorage.removeItem('scannerPageReloaded');
    }
  }

  async onCodeResult(result: string) {
  if (result) {
    this.scanning = false;
    this.detenerCamara();

    const loading = await this.loadingController.create({
      message: 'Cargando receta...',
      spinner: 'crescent',
      duration: 2000
    });

    await loading.present();

    setTimeout(async () => {
      await loading.dismiss();
      this.router.navigate(['/farmaceutico/control-receta', result]);
    }, 1000);
  }
}


  onScanError(error: any) {
    console.error('Error escáner:', error);
    if (error?.name === 'NotReadableError') {
      alert('No se pudo acceder a la cámara. Cierra otras aplicaciones que puedan estar usándola.');
    }
  }

  onCamerasFound(devices: MediaDeviceInfo[]) {
    this.availableDevices = devices;
    const savedDeviceId = localStorage.getItem('selectedCameraId');
    const found = devices.find(d => d.deviceId === savedDeviceId);
    this.currentDevice = found ?? devices[0];
  }

  onDeviceChange(deviceId: string) {
    const selected = this.availableDevices.find(d => d.deviceId === deviceId);
    if (selected) {
      this.currentDevice = selected;
      localStorage.setItem('selectedCameraId', deviceId);
    }
  }

  detenerCamara() {
    try {
      const videoElem = this.scanner?.previewElemRef?.nativeElement;
      const stream = videoElem?.srcObject as MediaStream;
      if (stream?.getTracks) {
        stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
      }
    } catch (e) {
      console.warn('No se pudo detener la cámara:', e);
    }
  }
}
