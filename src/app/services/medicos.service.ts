import { onSnapshot } from 'firebase/firestore';
import { Injectable } from '@angular/core';
import { deleteDoc, doc, updateDoc, collection, addDoc, getDocs } from 'firebase/firestore';
import {
  query,
  orderBy,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  DocumentData
} from 'firebase/firestore';
import { getCountFromServer } from 'firebase/firestore';
import { db } from '../firebase-init';
import { Medico } from '../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {
  private medicosRef = collection(db, 'usuarios_medicos');

  registrarMedico(medico: Medico): Promise<any> {
    return addDoc(this.medicosRef, medico);
  }
  //metodo para obtener todos los médicos
  obtenerMedicosTiempoReal(callback: (data: Medico[]) => void) {
    return onSnapshot(this.medicosRef, snapshot => {
      const medicos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Medico));
      callback(medicos);
    });
  }

  // Paginación ordenada
  async obtenerMedicosPaginado(
    cantidad: number,
    cursor?: QueryDocumentSnapshot<DocumentData>
  ): Promise<{ medicos: Medico[]; lastDoc?: QueryDocumentSnapshot<DocumentData> }> {
    let q = query(this.medicosRef, orderBy('nombre'), limit(cantidad));
    if (cursor) {
      q = query(this.medicosRef, orderBy('nombre'), startAfter(cursor), limit(cantidad));
    }

    const snapshot = await getDocs(q);
    const medicos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Medico));
    const lastDoc = snapshot.docs[snapshot.docs.length - 1];

    return { medicos, lastDoc };
  }
  async contarMedicos(): Promise<number> {
    const snapshot = await getCountFromServer(this.medicosRef);
    return snapshot.data().count;
  }

  //metodo para eliminar medico
  async eliminarMedico(id: string): Promise<void> {
    const docRef = doc(db, 'usuarios_medicos', id);
    await deleteDoc(docRef);
  }
  async actualizarMedico(id: string, data: Partial<Medico>): Promise<void> {
    const docRef = doc(db, 'usuarios_medicos', id);
    await updateDoc(docRef, data);
  }
}