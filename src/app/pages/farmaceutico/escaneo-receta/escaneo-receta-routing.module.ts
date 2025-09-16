import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EscaneoRecetaPage } from './escaneo-receta.page';

const routes: Routes = [
  {
    path: '',
    component: EscaneoRecetaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EscaneoRecetaPageRoutingModule {}
