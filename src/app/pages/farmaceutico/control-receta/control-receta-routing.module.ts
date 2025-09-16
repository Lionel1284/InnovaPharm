import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ControlRecetaPage } from './control-receta.page';

const routes: Routes = [
  {
    path: '',
    component: ControlRecetaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ControlRecetaPageRoutingModule {}
