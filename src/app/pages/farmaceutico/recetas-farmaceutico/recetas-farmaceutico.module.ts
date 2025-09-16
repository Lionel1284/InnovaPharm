import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecetasFarmaceuticoPageRoutingModule } from './recetas-farmaceutico-routing.module';

import { RecetasFarmaceuticoPage } from './recetas-farmaceutico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecetasFarmaceuticoPageRoutingModule
  ],
  declarations: [RecetasFarmaceuticoPage]
})
export class RecetasFarmaceuticoPageModule {}
