import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  nombreCompleto: string = '';

  ngOnInit() {
    const data = localStorage.getItem('usuario');
    if (data) {
      const usuario = JSON.parse(data);
      const nombre = usuario.nombre || '';
      const apellido = usuario.apellidoPaterno || '';
      this.nombreCompleto = `${this.capitalizar(nombre)} ${this.capitalizar(apellido)}`;
    }
  }

  capitalizar(texto: string): string {
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
  }
}
