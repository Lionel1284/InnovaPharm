import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const usuario = this.authService.getUsuarioActual();
    if (usuario) {
      const ruta = this.authService.getRutaPorRol(usuario.rol);
      this.router.navigateByUrl(ruta);
      return false;
    }
    return true;
  }
}
