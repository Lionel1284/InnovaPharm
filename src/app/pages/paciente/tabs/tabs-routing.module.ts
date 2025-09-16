import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'accesibilidad',
        loadChildren: () => import('../accesibilidad/accesibilidad.module').then(m => m.AccesibilidadPageModule),
      },
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule),
      },
      {
        path: 'recetas',
        loadChildren: () => import('../recetas/recetas.module').then(m => m.RecetasPageModule),
      },
      {
        path: 'receta/:id',
        loadComponent: () => import('../receta-detalle/receta-detalle.page').then(m => m.RecetaDetallePage),
      },
      {
        path: 'ajustes',
        loadChildren: () => import('../ajustes/ajustes.module').then(m => m.AjustesPageModule),
      },
      {
        path: 'perfil',
        loadChildren: () => import('../perfil/perfil.module').then(m => m.PerfilPageModule),
      },
       {
        path: 'receta/:id/codigo',
        loadComponent: () => import('../generar-codigo/generar-codigo.page').then(m => m.GenerarCodigoPage),
      },
      {
        path: 'receta/:id/qr',
        loadComponent: () => import('../generar-qr/generar-qr.page').then(m => m.GenerarQrPage),
      },
       {
        path: 'terminos-de-uso',
        loadChildren: () => import('../terminos-de-uso/terminos-de-uso.module').then( m => m.TerminosDeUsoPageModule)
      },
      {
        path: 'ajustesnotificaciones',
        loadChildren: () => import('../ajustesnotificaciones/ajustesnotificaciones.module').then( m => m.AjustesnotificacionesPageModule)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
