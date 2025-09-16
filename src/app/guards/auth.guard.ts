import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const usuario = this.authService.getUsuarioActual();

    // Si no está logueado, redirige a login
    if (!usuario) {
      return this.router.createUrlTree(['/login']);
    }

    // Verifica si el rol del usuario está permitido para esta ruta
    const rolesPermitidos = route.data['roles'] as string[];
    if (rolesPermitidos && !rolesPermitidos.includes(usuario.rol)) {
      return this.router.createUrlTree(['/login']);
    }

    // Todo bien, permite el acceso
    return true;
  }
}
