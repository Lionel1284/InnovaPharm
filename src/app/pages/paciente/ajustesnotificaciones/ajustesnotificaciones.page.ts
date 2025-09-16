import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ajustesnotificaciones',
  templateUrl: './ajustesnotificaciones.page.html',
  styleUrls: ['./ajustesnotificaciones.page.scss'],
  standalone: false
})
export class AjustesnotificacionesPage implements OnInit {

  notificacionesActivas: boolean = false;
  modoDescanso: boolean = false;
  horaInicio: string = '23:00';
  horaFin: string = '7:00';

  dias = [
    { letra: 'L', nombre: 'Lunes', activo: false },
    { letra: 'M', nombre: 'Martes', activo: false },
    { letra: 'X', nombre: 'Miércoles', activo: false },
    { letra: 'J', nombre: 'Jueves', activo: false },
    { letra: 'V', nombre: 'Viernes', activo: false },
    { letra: 'S', nombre: 'Sábado', activo: false },
    { letra: 'D', nombre: 'Domingo', activo: false }
  ];

  constructor() { }

  ngOnInit() {
  }

  toggleDia(dia: any) {
    dia.activo = !dia.activo;
  }

}
