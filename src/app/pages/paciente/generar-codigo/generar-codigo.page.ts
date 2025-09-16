import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { doc, setDoc, getDoc, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { db } from 'src/app/firebase-init';

@Component({
  selector: 'app-generar-codigo',
  templateUrl: './generar-codigo.page.html',
  styleUrls: ['./generar-codigo.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class GenerarCodigoPage implements OnInit {
  codigo: string[] = [];
  recetaId: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    this.recetaId = this.route.snapshot.paramMap.get('id') || '';

    if (!this.recetaId) {
      this.router.navigate(['/paciente/recetas']);
      return;
    }

    // Genera un código único
    const codigoGenerado = await this.generarCodigoUnico();
    this.codigo = codigoGenerado.split('');

    // Guarda el código en Firebase
    const codigoRef = doc(db, 'codigos_temporales', codigoGenerado);
    await setDoc(codigoRef, {
      recetaId: this.recetaId,
      creadoEn: serverTimestamp()
    });

    // Elimina automáticamente después de 3 minutos
    setTimeout(async () => {
      try {
        await deleteDoc(codigoRef);
        console.log(`Código ${codigoGenerado} eliminado automáticamente.`);
      } catch (error) {
        console.error(`Error al eliminar el código ${codigoGenerado}:`, error);
      }
    }, 3 * 60 * 1000); // 3 minutos
  }

  async generarCodigoUnico(): Promise<string> {
    let codigo: string;
    let exists = true;

    do {
      codigo = Math.floor(1000 + Math.random() * 9000).toString();
      const ref = doc(db, 'codigos_temporales', codigo);
      const snapshot = await getDoc(ref);
      exists = snapshot.exists();
    } while (exists);

    return codigo;
  }

  volver() {
    this.router.navigate(['/paciente/recetas']);
  }
}
