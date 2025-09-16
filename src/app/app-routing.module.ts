import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/general/start/start.module').then(m => m.StartPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/paciente/register/register.module').then(m => m.RegisterPageModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/general/login/login.module').then(m => m.LoginPageModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'admin/home',
    loadChildren: () =>
      import('./pages/admin/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'admin/registro-doctor',
    loadChildren: () =>
      import('./pages/admin/registro-doctor/registro-doctor.module').then(m => m.RegistroDoctorPageModule),
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'admin/registro-farmaceutico',
    loadChildren: () =>
      import('./pages/admin/registro-farmaceutico/registro-farmaceutico.module').then(m => m.RegistroFarmaceuticoPageModule),
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'admin/usuarios',
    loadChildren: () => import('./pages/admin/usuarios/usuarios.module').then(m => m.UsuariosPageModule),
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  {
  path: 'admin/editar-paciente',
    loadChildren: () => import('./pages/admin/editar-paciente/editar-paciente.module').then(m => m.EditarPacientePageModule),
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'admin/editar-medico',
    loadChildren: () => import('./pages/admin/editar-medico/editar-medico.module').then(m => m.EditarMedicoPageModule),
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'admin/editar-farmaceutico',
    loadChildren: () => import('./pages/admin/editar-farmaceutico/editar-farmaceutico.module').then(m => m.EditarFarmaceuticoPageModule),
    canActivate: [AuthGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'start',
    loadChildren: () => import('./pages/general/start/start.module').then( m => m.StartPageModule)
  },
  {
    path: 'paciente',
    loadChildren: () =>
      import('./pages/paciente/tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard],
    data: { roles: ['paciente'] }
  },
  {
    path: 'ajustes',
    loadChildren: () => import('./pages/paciente/ajustes/ajustes.module').then( m => m.AjustesPageModule)
  },
  {
    path: 'farmaceutico',
    loadChildren: () => import('./pages/farmaceutico/farmaceutico/farmaceutico.module').then(m => m.FarmaceuticoPageModule),
    canActivate: [AuthGuard],
    data: { roles: ['farmaceutico'] }
  },
  {
    path: 'codigo-acceso',
    loadChildren: () => import('./pages/farmaceutico/codigo-acceso/codigo-acceso.module').then( m => m.CodigoAccesoPageModule)
  },
  {
    path: 'medico',
    loadChildren: () => import('./pages/medico/medico/medico.module').then( m => m.MedicoPageModule),
    canActivate: [AuthGuard],
    data: { roles: ['medico'] }
  },
  {
    path: 'recuperar-contrasena',
    loadChildren: () => import('./pages/general/recuperar-contrasena/recuperar-contrasena.module').then( m => m.RecuperarContrasenaPageModule)
  },
  {
    path: 'paciente/receta/:id/codigo',
    loadComponent: () => import('./pages/paciente/generar-codigo/generar-codigo.page').then(m => m.GenerarCodigoPage),
    canActivate: [AuthGuard],
  },
  {
    path: 'paciente/receta/:id/qr',
    loadComponent: () => import('./pages/paciente/generar-qr/generar-qr.page').then(m => m.GenerarQrPage),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
