import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EscaneoRecetaPageRoutingModule } from './escaneo-receta-routing.module';

import { EscaneoRecetaPage } from './escaneo-receta.page';

import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EscaneoRecetaPageRoutingModule,
    ZXingScannerModule
  ],
  declarations: [EscaneoRecetaPage]
})
export class EscaneoRecetaPageModule {}
