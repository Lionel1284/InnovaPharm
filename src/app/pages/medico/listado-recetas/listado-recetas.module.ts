import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoRecetasPageRoutingModule } from './listado-recetas-routing.module';

import { ListadoRecetasPage } from './listado-recetas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoRecetasPageRoutingModule
  ],
  declarations: [ListadoRecetasPage]
})
export class ListadoRecetasPageModule {}
