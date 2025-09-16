import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TerminosDeUsoPageRoutingModule } from './terminos-de-uso-routing.module';

import { TerminosDeUsoPage } from './terminos-de-uso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TerminosDeUsoPageRoutingModule
  ],
  declarations: [TerminosDeUsoPage]
})
export class TerminosDeUsoPageModule {}
