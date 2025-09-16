export interface Medico {
  id?: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno?: string;
  correo: string;
  contrasena: string;
  rut: string;
  especialidad: string;
  rol: 'medico';
  firmaBase64?: string; // Firma en formato base64
}