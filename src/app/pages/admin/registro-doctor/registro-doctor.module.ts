import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroDoctorPageRoutingModule } from './registro-doctor-routing.module';

import { RegistroDoctorPage } from './registro-doctor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroDoctorPageRoutingModule
  ],
  declarations: [RegistroDoctorPage]
})
export class RegistroDoctorPageModule {}
