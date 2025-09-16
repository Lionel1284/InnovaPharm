import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { MedicoPage } from './medico.page';

const routes: Routes = [
  {
    path: '',
    component: MedicoPage,
    canActivate: [AuthGuard],
    data: { roles: ['medico'] },
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule),
      },
      {
        path: 'crear-receta',
        loadChildren: () => import('../crear-receta/crear-receta.module').then(m => m.CrearRecetaPageModule),
      },
      {
        path: 'listado-recetas',
        loadChildren: () => import('../listado-recetas/listado-recetas.module').then(m => m.ListadoRecetasPageModule),
      },
      {
        path: 'editar-receta/:id',
        loadChildren: () => import('../editar-receta/editar-receta.module').then(m => m.EditarRecetaPageModule),
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
export class MedicoPageRoutingModule {}
