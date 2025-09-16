import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecetasFarmaceuticoPage } from './recetas-farmaceutico.page';

const routes: Routes = [
  {
    path: '',
    component: RecetasFarmaceuticoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecetasFarmaceuticoPageRoutingModule {}
