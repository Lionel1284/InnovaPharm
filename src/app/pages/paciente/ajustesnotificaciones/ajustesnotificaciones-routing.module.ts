import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjustesnotificacionesPage } from './ajustesnotificaciones.page';

const routes: Routes = [
  {
    path: '',
    component: AjustesnotificacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjustesnotificacionesPageRoutingModule {}
