import { Injectable } from '@angular/core';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getCountFromServer,
  onSnapshot,
  orderBy,
  limit,
  startAfter,
  query,
  QueryDocumentSnapshot,
  DocumentData
} from 'firebase/firestore';
import { db } from '../firebase-init';
import { Farmaceutico } from '../models/farmaceutico.model';

@Injectable({
  providedIn: 'root'
})
export class FarmaceuticosService {
  private farmaceuticosRef = collection(db, 'usuarios_farmaceuticos');

  registrarFarmaceutico(farmaceutico: Farmaceutico): Promise<any> {
    return addDoc(this.farmaceuticosRef, farmaceutico);
  }

  obtenerFarmaceuticosTiempoReal(callback: (data: Farmaceutico[]) => void) {
    return onSnapshot(this.farmaceuticosRef, (snapshot) => {
      const farmaceuticos = snapshot.docs.map(doc =>
        ({ id: doc.id, ...doc.data() } as Farmaceutico)
      );
      callback(farmaceuticos);
    });
  }

  async obtenerFarmaceuticosPaginado(
    cantidad: number,
    cursor?: QueryDocumentSnapshot<DocumentData>
  ): Promise<{ farmaceuticos: Farmaceutico[]; lastDoc?: QueryDocumentSnapshot<DocumentData> }> {
    let q = query(this.farmaceuticosRef, orderBy('nombre'), limit(cantidad));
    if (cursor) {
      q = query(this.farmaceuticosRef, orderBy('nombre'), startAfter(cursor), limit(cantidad));
    }

    const snapshot = await getDocs(q);
    const farmaceuticos = snapshot.docs.map(doc =>
      ({ id: doc.id, ...doc.data() } as Farmaceutico)
    );
    const lastDoc = snapshot.docs[snapshot.docs.length - 1];

    return { farmaceuticos, lastDoc };
  }

  async contarFarmaceuticos(): Promise<number> {
    const snapshot = await getCountFromServer(this.farmaceuticosRef);
    return snapshot.data().count;
  }

  async eliminarFarmaceutico(id: string): Promise<void> {
    const docRef = doc(db, 'usuarios_farmaceuticos', id);
    await deleteDoc(docRef);
  }
  async actualizarFarmaceutico(id: string, data: Partial<Farmaceutico>): Promise<void> {
    const docRef = doc(db, 'usuarios_farmaceuticos', id);
    await updateDoc(docRef, data);
  }
}
