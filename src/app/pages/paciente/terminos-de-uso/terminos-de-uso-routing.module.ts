import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TerminosDeUsoPage } from './terminos-de-uso.page';

const routes: Routes = [
  {
    path: '',
    component: TerminosDeUsoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TerminosDeUsoPageRoutingModule {}
