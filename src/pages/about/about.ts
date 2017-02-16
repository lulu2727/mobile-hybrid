import { Component } from '@angular/core';
import { InAppBrowser } from 'ionic-native';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  description: string = "Cette application est le résultat du module Programmation multiplateforme à l'école des Mines de Nantes de la promotion FIL 2017";
  version: string = "0.0.1";
  author: string = "Ludovic Sinquin";
  authorUrl : string = "http://fr.viadeo.com/fr/profile/ludovic.sinquin";

  constructor(public navCtrl: NavController) {
  }

  gotoDetails() {
    console.log('hello');
    open(this.authorUrl, "_blank", "location=no");
  }
}
