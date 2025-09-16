import { Injectable } from '@angular/core';
import {
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { db } from '../firebase-init';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private colecciones = [
    { ref: collection(db, 'usuarios_pacientes'), rol: 'paciente' },
    { ref: collection(db, 'usuarios_medicos'), rol: 'medico' },
    { ref: collection(db, 'usuarios_farmaceuticos'), rol: 'farmaceutico' },
    { ref: collection(db, 'usuarios_admin'), rol: 'admin' }
  ];

  // ✅ Ya no valida la contraseña aquí, solo busca por RUT y correo
  async loginUsuarioPorRut(rut: string, correo: string): Promise<Usuario | null> {
    for (const coleccion of this.colecciones) {
      const q = query(
        coleccion.ref,
        where('rut', '==', rut),
        where('correo', '==', correo)
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const docSnap = snapshot.docs[0];
        return {
          id: docSnap.id,
          ...docSnap.data(),
          rol: coleccion.rol
        } as Usuario;
      }
    }
    return null;
  }

  async obtenerCorreoPorRut(rut: string): Promise<string | null> {
    for (const coleccion of this.colecciones) {
      const q = query(coleccion.ref, where('rut', '==', rut));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const data = snapshot.docs[0].data();
        return data['correo'] ?? null;
      }
    }
    return null;
  }

  async existePacientePorRut(rut: string): Promise<boolean> {
    const ref = collection(db, 'usuarios_pacientes');
    const q = query(ref, where('rut', '==', rut));
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  }

  async obtenerPacientePorRut(rut: string): Promise<any | null> {
    const ref = collection(db, 'usuarios_pacientes');
    const q = query(ref, where('rut', '==', rut));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    return snapshot.docs[0].data();
  }
}
