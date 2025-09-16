import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RecetasService } from 'src/app/services/recetas.service';
import { Receta } from 'src/app/models/receta.model';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from 'src/app/firebase-init';
import { trace } from 'firebase/performance';
import { perf } from 'src/app/firebase-init';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

declare var window: any;

@Component({
  selector: 'app-receta-detalle',
  templateUrl: './receta-detalle.page.html',
  styleUrls: ['./receta-detalle.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class RecetaDetallePage implements OnInit {
  receta: Receta | null = null;
  firmaBase64: string | null = null;
  cargando = true;
  mostrarDetalles = true;
  especialidad: string | null = null;


  @ViewChild('recetaView', { static: false }) recetaView!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recetasService: RecetasService
  ) {}

  async ngOnInit() {
    const traza = trace(perf, 'tiempo_carga_register');
    traza.start();
    await new Promise(resolve => setTimeout(resolve, 1000));
    traza.stop();

    if (window.FirebasePlugin) {
      window.FirebasePlugin.setScreenName("Register");
      window.FirebasePlugin.logEvent("pantalla_abierta", { nombre: "Register" });
    }

    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/paciente/recetas']);
      return;
    }

    this.receta = await this.recetasService.obtenerRecetaPorId(id);


    if (this.receta?.medicoRut) {
  const q = query(
    collection(db, 'usuarios_medicos'),
    where('rut', '==', this.receta.medicoRut)
  );
  const snapshot = await getDocs(q);
  const medico = snapshot.docs[0]?.data();
  this.firmaBase64 = medico?.['firmaBase64'] || null;
  this.especialidad = medico?.['especialidad'] || 'No especificada';
}
    this.cargando = false;
  }

  volver() {
    this.router.navigate(['/paciente/recetas']);
  }

  async descargarPDF() {
  try {
    const element = this.recetaView?.nativeElement;
    if (!element) throw new Error('Elemento no disponible');

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Receta_${this.receta?.id || 'descarga'}.pdf`);
  } catch (error) {
    console.error('Error al generar PDF:', error);
    alert('Ocurrió un error al generar el PDF. Revisa la consola.');
  }
}

}
