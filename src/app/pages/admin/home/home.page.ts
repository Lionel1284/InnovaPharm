import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage {
  usuario: Usuario | null = null;

  constructor(private authService: AuthService) {
    this.usuario = this.authService.getUsuarioActual();
  }
}