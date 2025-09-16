import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarFarmaceuticoPageRoutingModule } from './editar-farmaceutico-routing.module';

import { EditarFarmaceuticoPage } from './editar-farmaceutico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarFarmaceuticoPageRoutingModule
  ],
  declarations: [EditarFarmaceuticoPage]
})
export class EditarFarmaceuticoPageModule {}
