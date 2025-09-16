export interface Receta {
  id?: string;
  pacienteId: string;
  fecha: string;
  descripcion: string;
  medicoNombre: string;
  medicoRut: string;
  medicamentos: {
    nombre: string;
    instrucciones: string;
  }[];
  estado?: 'pendiente' | 'entregada' | 'rechazada';
}
