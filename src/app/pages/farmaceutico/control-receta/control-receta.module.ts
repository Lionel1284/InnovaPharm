import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ControlRecetaPageRoutingModule } from './control-receta-routing.module';

import { ControlRecetaPage } from './control-receta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ControlRecetaPageRoutingModule
  ],
  declarations: [ControlRecetaPage]
})
export class ControlRecetaPageModule {}
