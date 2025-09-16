import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngresarRunPage } from './ingresar-run.page';

const routes: Routes = [
  {
    path: '',
    component: IngresarRunPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngresarRunPageRoutingModule {}
