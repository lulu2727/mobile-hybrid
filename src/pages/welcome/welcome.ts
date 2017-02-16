import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SessionsPage } from '../sessions/sessions';
import { SpeakersPage } from '../speakers/speakers';

/*
  Generated class for the Welcome page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  goToSessions() {
    this.navCtrl.setRoot(SessionsPage)
  }

  goToSpeakers() {
    this.navCtrl.setRoot(SpeakersPage)
  }    

}
