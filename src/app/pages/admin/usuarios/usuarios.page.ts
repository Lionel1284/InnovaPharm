import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Medico } from 'src/app/models/medico.model';
import { Farmaceutico } from 'src/app/models/farmaceutico.model';
import { Paciente } from 'src/app/models/paciente.model';
import { MedicosService } from 'src/app/services/medicos.service';
import { FarmaceuticosService } from 'src/app/services/farmaceuticos.service';
import { PacientesService } from 'src/app/services/pacientes.service';
import { AlertController } from '@ionic/angular';
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
  standalone: false,
})
export class UsuariosPage implements OnInit {
  cantidadPorPagina = 10;

  // Médicos
  medicos: Medico[] = [];
  medicosFiltrados: Medico[] = [];
  busquedaMedico = '';
  paginaActualMedicos = 1;
  totalPaginasMedicos = 1;
  cursoresMedicos: QueryDocumentSnapshot<DocumentData>[] = [];

  // Farmacéuticos
  farmaceuticos: Farmaceutico[] = [];
  farmaceuticosFiltrados: Farmaceutico[] = [];
  busquedaFarmaceutico = '';
  paginaActualFarmaceuticos = 1;
  totalPaginasFarmaceuticos = 1;
  cursoresFarmaceuticos: QueryDocumentSnapshot<DocumentData>[] = [];

  // Pacientes
  pacientes: Paciente[] = [];
  pacientesFiltrados: Paciente[] = [];
  busquedaPaciente = '';
  paginaActualPacientes = 1;
  totalPaginasPacientes = 1;
  cursoresPacientes: QueryDocumentSnapshot<DocumentData>[] = [];

  constructor(
    private medicosService: MedicosService,
    private farmaceuticosService: FarmaceuticosService,
    private pacientesService: PacientesService,
    private alertController: AlertController,
    private router: Router
  ) {}

  async ngOnInit() {
    const totalMedicos = await this.medicosService.contarMedicos();
    this.totalPaginasMedicos = Math.ceil(totalMedicos / this.cantidadPorPagina);
    this.cargarPaginaMedicos(1);

    const totalFarm = await this.farmaceuticosService.contarFarmaceuticos();
    this.totalPaginasFarmaceuticos = Math.ceil(totalFarm / this.cantidadPorPagina);
    this.cargarPaginaFarmaceuticos(1);

    const totalPaci = await this.pacientesService.contarPacientes();
    this.totalPaginasPacientes = Math.ceil(totalPaci / this.cantidadPorPagina);
    this.cargarPaginaPacientes(1);
  }

  // --- Normalizar texto ---
  normalizarTexto(texto: string): string {
    return texto.toLowerCase().replace(/\./g, '').replace(/\s+/g, ' ').trim();
  }

  // --- MÉDICOS ---
  async cargarPaginaMedicos(numeroPagina: number) {
    const cursor = numeroPagina > 1 ? this.cursoresMedicos[numeroPagina - 2] : undefined;
    const { medicos, lastDoc } = await this.medicosService.obtenerMedicosPaginado(this.cantidadPorPagina, cursor);
    this.medicos = medicos;
    this.paginaActualMedicos = numeroPagina;
    if (lastDoc && !this.cursoresMedicos[numeroPagina - 1]) {
      this.cursoresMedicos[numeroPagina - 1] = lastDoc;
    }
    this.filtrarMedicos();
  }

  filtrarMedicos() {
    const t = this.normalizarTexto(this.busquedaMedico);
    this.medicosFiltrados = this.medicos.filter(m => {
      const nombre = this.normalizarTexto(m.nombre);
      const apellidoP = this.normalizarTexto(m.apellidoPaterno);
      const apellidoM = this.normalizarTexto(m.apellidoMaterno || '');
      const rut = this.normalizarTexto(m.rut);

      const combinaciones = [
        nombre,
        apellidoP,
        apellidoM,
        rut,
        `${nombre} ${apellidoP}`,
        `${nombre} ${apellidoP} ${apellidoM}`,
        `${apellidoP} ${apellidoM}`
      ];

      return combinaciones.some(c => c.includes(t));
    });
  }

  // --- FARMACÉUTICOS ---
  async cargarPaginaFarmaceuticos(numeroPagina: number) {
    const cursor = numeroPagina > 1 ? this.cursoresFarmaceuticos[numeroPagina - 2] : undefined;
    const { farmaceuticos, lastDoc } = await this.farmaceuticosService.obtenerFarmaceuticosPaginado(this.cantidadPorPagina, cursor);
    this.farmaceuticos = farmaceuticos;
    this.paginaActualFarmaceuticos = numeroPagina;
    if (lastDoc && !this.cursoresFarmaceuticos[numeroPagina - 1]) {
      this.cursoresFarmaceuticos[numeroPagina - 1] = lastDoc;
    }
    this.filtrarFarmaceuticos();
  }

  filtrarFarmaceuticos() {
    const t = this.normalizarTexto(this.busquedaFarmaceutico);
    this.farmaceuticosFiltrados = this.farmaceuticos.filter(f => {
      const nombre = this.normalizarTexto(f.nombre);
      const apellidoP = this.normalizarTexto(f.apellidoPaterno);
      const apellidoM = this.normalizarTexto(f.apellidoMaterno || '');
      const rut = this.normalizarTexto(f.rut);

      const combinaciones = [
        nombre,
        apellidoP,
        apellidoM,
        rut,
        `${nombre} ${apellidoP}`,
        `${nombre} ${apellidoP} ${apellidoM}`,
        `${apellidoP} ${apellidoM}`
      ];

      return combinaciones.some(c => c.includes(t));
    });
  }

  // --- PACIENTES ---
  async cargarPaginaPacientes(numeroPagina: number) {
    const cursor = numeroPagina > 1 ? this.cursoresPacientes[numeroPagina - 2] : undefined;
    const { pacientes, lastDoc } = await this.pacientesService.obtenerPacientesPaginado(this.cantidadPorPagina, cursor);
    this.pacientes = pacientes;
    this.paginaActualPacientes = numeroPagina;
    if (lastDoc && !this.cursoresPacientes[numeroPagina - 1]) {
      this.cursoresPacientes[numeroPagina - 1] = lastDoc;
    }
    this.filtrarPacientes();
  }

  filtrarPacientes() {
    const t = this.normalizarTexto(this.busquedaPaciente);
    this.pacientesFiltrados = this.pacientes.filter(p => {
      const nombre = this.normalizarTexto(p.nombre);
      const apellidoP = this.normalizarTexto(p.apellidoPaterno);
      const apellidoM = this.normalizarTexto(p.apellidoMaterno || '');
      const rut = this.normalizarTexto(p.rut);

      const combinaciones = [
        nombre,
        apellidoP,
        apellidoM,
        rut,
        `${nombre} ${apellidoP}`,
        `${nombre} ${apellidoP} ${apellidoM}`,
        `${apellidoP} ${apellidoM}`
      ];

      return combinaciones.some(c => c.includes(t));
    });
  }

  getRangoPaginas(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i + 1);
  }

  async eliminar(tipo: 'medico' | 'farmaceutico' | 'paciente', id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar este usuario?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            switch (tipo) {
              case 'medico':
                await this.medicosService.eliminarMedico(id);
                this.cargarPaginaMedicos(this.paginaActualMedicos);
                break;
              case 'farmaceutico':
                await this.farmaceuticosService.eliminarFarmaceutico(id);
                this.cargarPaginaFarmaceuticos(this.paginaActualFarmaceuticos);
                break;
              case 'paciente':
                await this.pacientesService.eliminarPaciente(id);
                this.cargarPaginaPacientes(this.paginaActualPacientes);
                break;
            }
          }
        }
      ]
    });

    await alert.present();
  }
  editarMedico(medico: Medico) {
    this.router.navigate(['/admin/editar-medico'], { state: { usuario: medico } });
  }

  editarFarmaceutico(farmaceutico: Farmaceutico) {
    this.router.navigate(['/admin/editar-farmaceutico'], { state: { usuario: farmaceutico } });
  }

  editarPaciente(paciente: Paciente) {
    this.router.navigate(['/admin/editar-paciente'], { state: { usuario: paciente } });
  }
  ionViewWillEnter() {
    this.cursoresMedicos = [];
    this.cursoresFarmaceuticos = [];
    this.cursoresPacientes = [];

    this.paginaActualMedicos = 1;
    this.paginaActualFarmaceuticos = 1;
    this.paginaActualPacientes = 1;

    this.ngOnInit();
  }
}
