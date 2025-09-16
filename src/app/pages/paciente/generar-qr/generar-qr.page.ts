import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { QRCodeComponent } from 'angularx-qrcode';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.page.html',
  styleUrls: ['./generar-qr.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, QRCodeComponent],
})
export class GenerarQrPage implements OnInit {
  recetaId: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private loadingController: LoadingController) {}

  ngOnInit() {
    this.recetaId = this.route.snapshot.paramMap.get('id') || '';
    if (!this.recetaId) {
      this.router.navigate(['/paciente/recetas']);
    }
  }

  volver() {
    this.router.navigate(['/paciente/recetas']);
  }
}
