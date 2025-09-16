import { Injectable } from '@angular/core';
import {
  collection,
  query,
  where,
  getDoc,
  getDocs,
  updateDoc,
  doc,
  orderBy,
  addDoc
} from 'firebase/firestore';
import { db } from '../firebase-init';
import { Receta } from '../models/receta.model';

@Injectable({
  providedIn: 'root'
})
export class RecetasService {
  private recetasRef = collection(db, 'recetas_medicas'); // nombre sugerido

  async obtenerRecetasPorPaciente(rut: string): Promise<Receta[]> {
    const q = query(
      this.recetasRef,
      where('pacienteId', '==', rut),
      orderBy('fecha', 'desc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Receta));
  }
  async obtenerRecetaPorId(id: string): Promise<Receta | null> {
    const docRef = doc(this.recetasRef, id);
    const snapshot = await getDoc(docRef);
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } as Receta : null;
  }
  async actualizarEstadoReceta(id: string, estado: 'entregada' | 'rechazada'): Promise<void> {
    const ref = doc(db, 'recetas_medicas', id);
    await updateDoc(ref, { estado });
  }
  async crearReceta(receta: Receta): Promise<void> {
    await addDoc(this.recetasRef, receta);
  }
  async obtenerRecetasPorMedico(rut: string): Promise<Receta[]> {
    console.log('🔎 [RecetasService] Rut recibido para consulta:', rut);

    const q = query(
      this.recetasRef,
      where('medicoRut', '==', rut)
    );

    console.log('[RecetasService] Colección ref:', this.recetasRef);
    console.log('[RecetasService] Query generado:', q);

    const snapshot = await getDocs(q);

    console.log('✅ getDocs terminado. Total recetas:', snapshot.size);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Receta));
  }
    async obtenerNombrePacientePorRut(rut: string): Promise<{ nombre: string; apellidoPaterno?: string } | null> {
    const pacientesRef = collection(db, 'usuarios_pacientes');
    const q = query(pacientesRef, where('rut', '==', rut));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.warn(`⚠️ No se encontró paciente con RUT: ${rut}`);
      return null;
    }

    const docSnap = snapshot.docs[0];
    const data = docSnap.data() as any;

    return {
      nombre: data.nombre,
      apellidoPaterno: data.apellidoPaterno || ''
    };
  }
}
