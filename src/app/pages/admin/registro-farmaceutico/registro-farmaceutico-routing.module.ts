import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroFarmaceuticoPage } from './registro-farmaceutico.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroFarmaceuticoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroFarmaceuticoPageRoutingModule {}
