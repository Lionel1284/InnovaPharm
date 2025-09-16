import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroDoctorPage } from './registro-doctor.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroDoctorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroDoctorPageRoutingModule {}
