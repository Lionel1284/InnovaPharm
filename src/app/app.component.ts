import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './models/usuario.model';
import { AuthService } from './services/auth.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  logueado: boolean = false;
  usuario: Usuario | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private menuCtrl: MenuController //
  ) {}

  ngOnInit() {
    this.authService.usuario$.subscribe(usuario => {
      this.usuario = usuario;
      this.logueado = !!usuario;
    });
  }

  async cerrarSesion() {
    await this.menuCtrl.close(); // cerramos el menú primero
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  async navegar(ruta: string) {
    await this.menuCtrl.close(); // cerrar el menú antes de navegar
    this.router.navigate([ruta]);
  }
}
