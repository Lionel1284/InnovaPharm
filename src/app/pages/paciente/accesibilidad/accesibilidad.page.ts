import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-accesibilidad',
  templateUrl: './accesibilidad.page.html',
  styleUrls: ['./accesibilidad.page.scss'],
  standalone: false
})
export class AccesibilidadPage implements OnInit {

  darkMode: boolean = false;
  fontSizeStep: number = 1;
  currentFontSize: number = 18;
  maxFontSize: number = 20;
  minFontSize: number = 14;


  constructor(private navCtrl: NavController, private toastController: ToastController) {}

 ngOnInit() {
  const savedSize = localStorage.getItem('fontSize');
  if (savedSize) {
    this.currentFontSize = parseInt(savedSize, 10);
    document.documentElement.style.setProperty('--accesibilidad-font-size', `${this.currentFontSize}px`);
  }
}

  toggleDarkMode(event: CustomEvent) {
  this.darkMode = event.detail.checked;

  if (this.darkMode) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }

  localStorage.setItem('darkMode', this.darkMode.toString());
}



aumentarLetra() {
  if (this.currentFontSize < this.maxFontSize) {
    this.currentFontSize += this.fontSizeStep;
    document.documentElement.style.setProperty('--accesibilidad-font-size', `${this.currentFontSize}px`);
    localStorage.setItem('fontSize', this.currentFontSize.toString());
  } else {
    this.presentToast('Ya alcanzaste el tamaño máximo de letra.');
  }
}

disminuirLetra() {
  if (this.currentFontSize > this.minFontSize) {
    this.currentFontSize -= this.fontSizeStep;
    document.documentElement.style.setProperty('--accesibilidad-font-size', `${this.currentFontSize}px`);
    localStorage.setItem('fontSize', this.currentFontSize.toString());
  } else {
    this.presentToast('Ya alcanzaste el tamaño mínimo de letra.');
  }
}


async presentToast(message: string) {
  const toast = await this.toastController.create({
    message: message,
    duration: 2000,
    position: 'bottom',
    color: 'warning'
  });
  toast.present();
}



}
