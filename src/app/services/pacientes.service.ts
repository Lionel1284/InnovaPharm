import { onSnapshot } from 'firebase/firestore';
import { Injectable } from '@angular/core';
import {
  collection,
  deleteDoc,
  doc,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  updateDoc,
  DocumentData
} from 'firebase/firestore';
import { getCountFromServer } from 'firebase/firestore';
import { db } from '../firebase-init';
import { Paciente } from '../models/paciente.model';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';



@Injectable({
  providedIn: 'root'
})
export class PacientesService {
  private pacientesRef = collection(db, 'usuarios_pacientes');


  registrarPaciente(paciente: Paciente): Promise<any> {
  const auth = getAuth();

  return createUserWithEmailAndPassword(auth, paciente.correo, paciente.contrasena)
    .then(userCredential => {
      const { contrasena, ...pacienteSinContrasena } = paciente;

      return addDoc(this.pacientesRef, {
        ...pacienteSinContrasena,
        uid: userCredential.user.uid
      });
    });
}


  async existePacientePorRutOCorreo(rut: string, correo: string): Promise<boolean> {
    const q = query(this.pacientesRef, where('rut', '==', rut));
    const q2 = query(this.pacientesRef, where('correo', '==', correo));

    const [rutSnapshot, correoSnapshot] = await Promise.all([
      getDocs(q),
      getDocs(q2)
    ]);

    return !rutSnapshot.empty || !correoSnapshot.empty;
  }
  // metodo para obtener todos los pacientes
  obtenerPacientesTiempoReal(callback: (data: Paciente[]) => void) {
    return onSnapshot(this.pacientesRef, snapshot => {
      const pacientes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Paciente));
      callback(pacientes);
    });
  }

  async obtenerPacientesPaginado(
    cantidad: number,
    cursor?: QueryDocumentSnapshot<DocumentData>
  ): Promise<{ pacientes: Paciente[]; lastDoc?: QueryDocumentSnapshot<DocumentData> }> {
    let q = query(this.pacientesRef, orderBy('nombre'), limit(cantidad));
    if (cursor) {
      q = query(this.pacientesRef, orderBy('nombre'), startAfter(cursor), limit(cantidad));
    }

    const snapshot = await getDocs(q);
    const pacientes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Paciente));
    const lastDoc = snapshot.docs[snapshot.docs.length - 1];

    return { pacientes, lastDoc };
  }

  async contarPacientes(): Promise<number> {
    const snapshot = await getCountFromServer(this.pacientesRef);
    return snapshot.data().count;
  }

  // metodo para eliminar pacientes
  async eliminarPaciente(id: string): Promise<void> {
    const docRef = doc(db, 'usuarios_pacientes', id);
    await deleteDoc(docRef);
  }
  async actualizarPaciente(id: string, data: Partial<Paciente>): Promise<void> {
    const docRef = doc(db, 'usuarios_pacientes', id);
    await updateDoc(docRef, data);
  }
}
