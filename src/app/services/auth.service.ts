import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { db, app } from '../firebase-init';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioSubject = new BehaviorSubject<Usuario | null>(this.obtenerUsuarioLocal());
  usuario$ = this.usuarioSubject.asObservable();

  private obtenerUsuarioLocal(): Usuario | null {
    const data = localStorage.getItem('usuario');
    return data ? JSON.parse(data) : null;
  }

  login(usuario: Usuario) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuarioSubject.next(usuario);
  }

  logout() {
    localStorage.removeItem('usuario');
    this.usuarioSubject.next(null);
  }

  getUsuarioActual(): Usuario | null {
    return this.usuarioSubject.value;
  }

  estaLogueado(): boolean {
    return !!this.usuarioSubject.value;
  }

  getRutaPorRol(rol: string): string {
    switch (rol) {
      case 'paciente': return '/paciente';
      case 'medico': return '/medico/home';
      case 'farmaceutico': return '/farmaceutico/home';
      case 'admin': return '/admin/home';
      default: return '/login';
    }
  }



  async resetPasswordSiExiste(correo: string): Promise<void> {
  const correoFormateado = correo.trim().toLowerCase();

  const usuariosRef = collection(db, 'usuarios_pacientes'); // ✅ Cambiado aquí
  const q = query(usuariosRef, where('correo', '==', correoFormateado));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    throw new Error('El correo no está registrado.');
  }

  const auth = getAuth(app);
  await sendPasswordResetEmail(auth, correoFormateado); // ✅ Correo formateado
}

}
