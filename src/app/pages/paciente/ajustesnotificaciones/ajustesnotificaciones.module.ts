import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjustesnotificacionesPageRoutingModule } from './ajustesnotificaciones-routing.module';

import { AjustesnotificacionesPage } from './ajustesnotificaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjustesnotificacionesPageRoutingModule
  ],
  declarations: [AjustesnotificacionesPage]
})
export class AjustesnotificacionesPageModule {}
