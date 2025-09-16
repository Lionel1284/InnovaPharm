export interface UsuarioBase {
  id?: string;
  nombre: string;
  correo: string;
  contrasena: string;
  rol: 'paciente' | 'medico' | 'farmaceutico' | 'admin';
  rut?: string;
}

export type Usuario = UsuarioBase;
