import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarFarmaceuticoPage } from './editar-farmaceutico.page';

const routes: Routes = [
  {
    path: '',
    component: EditarFarmaceuticoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarFarmaceuticoPageRoutingModule {}
