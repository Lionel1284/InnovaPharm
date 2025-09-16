import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-terminos-de-uso',
  templateUrl: './terminos-de-uso.page.html',
  styleUrls: ['./terminos-de-uso.page.scss'],
  standalone: false
})
export class TerminosDeUsoPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  volver() {
  this.navCtrl.back();
}

}
