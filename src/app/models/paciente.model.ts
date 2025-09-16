export interface Paciente {
  id?: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno?: string;
  correo: string;
  contrasena: string;
  rut: string;
  rol: 'paciente';
}