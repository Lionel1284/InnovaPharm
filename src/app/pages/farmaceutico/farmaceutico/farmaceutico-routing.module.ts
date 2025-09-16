import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { FarmaceuticoPage } from './farmaceutico.page';

const routes: Routes = [
  {
    path: '',
    component: FarmaceuticoPage,
    canActivate: [AuthGuard],
    data: { roles: ['farmaceutico'] },
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule),
      },
      {
        path: 'ver-receta',
        loadChildren: () => import('../ver-receta/ver-receta.module').then(m => m.VerRecetaPageModule),
      },
      {
        path: 'escaneo-receta',
        loadChildren: () => import('../escaneo-receta/escaneo-receta.module').then(m => m.EscaneoRecetaPageModule),
      },
      {
        path: 'control-receta/:id',
        loadComponent: () => import('../control-receta/control-receta.page').then(m => m.ControlRecetaPage),
      },
      {
        path: 'codigo-acceso',
        loadChildren: () => import('../codigo-acceso/codigo-acceso.module').then(m => m.CodigoAccesoPageModule)
      },
      {
      path: 'ingresar-run',
        loadChildren: () => import('../ingresar-run/ingresar-run.module').then( m => m.IngresarRunPageModule)
      },
      {
        path: 'recetas-farmaceutico/:rut',
        loadChildren: () => import('../recetas-farmaceutico/recetas-farmaceutico.module').then(m => m.RecetasFarmaceuticoPageModule)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      }
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmaceuticoPageRoutingModule {}
