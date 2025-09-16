import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroFarmaceuticoPageRoutingModule } from './registro-farmaceutico-routing.module';

import { RegistroFarmaceuticoPage } from './registro-farmaceutico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroFarmaceuticoPageRoutingModule
  ],
  declarations: [RegistroFarmaceuticoPage]
})
export class RegistroFarmaceuticoPageModule {}
