import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FarmaceuticoPageRoutingModule } from './farmaceutico-routing.module';

import { FarmaceuticoPage } from './farmaceutico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FarmaceuticoPageRoutingModule
  ],
  declarations: [FarmaceuticoPage]
})
export class FarmaceuticoPageModule {}
