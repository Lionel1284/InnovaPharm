import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngresarRunPageRoutingModule } from './ingresar-run-routing.module';

import { IngresarRunPage } from './ingresar-run.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngresarRunPageRoutingModule
  ],
  declarations: [IngresarRunPage]
})
export class IngresarRunPageModule {}
