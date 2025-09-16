import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodigoAccesoPage } from './codigo-acceso.page';

const routes: Routes = [
  {
    path: '',
    component: CodigoAccesoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodigoAccesoPageRoutingModule {}
