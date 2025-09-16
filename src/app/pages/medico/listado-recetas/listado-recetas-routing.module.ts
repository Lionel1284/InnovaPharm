import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoRecetasPage } from './listado-recetas.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoRecetasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoRecetasPageRoutingModule {}
