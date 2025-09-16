import { Component, OnInit } from '@angular/core';
import { trace } from 'firebase/performance';
import { perf } from 'src/app/firebase-init';

declare var window: any;

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: false,
})
export class TabsPage implements OnInit {

  constructor() { }

  async ngOnInit() {
    const traza = trace(perf, 'tiempo_carga_register');
    traza.start();
    await new Promise(resolve => setTimeout(resolve, 1000));
    traza.stop();

    if (window.FirebasePlugin) {
      window.FirebasePlugin.setScreenName("Register");
      window.FirebasePlugin.logEvent("pantalla_abierta", { nombre: "Register" });
    }
  }

}
