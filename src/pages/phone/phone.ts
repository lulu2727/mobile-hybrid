import { Component } from '@angular/core';
import { Device, Network } from 'ionic-native';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the About page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-phone',
  templateUrl: 'phone.html'
})
export class PhonePage {
  platform: string;
  model: string;
  version: string;
  uuid: string;  
  network: string;    

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.platform = Device.platform;
    this.model = Device.model;
    this.version = Device.version;
    this.uuid = Device.uuid;

    this.network = Network.type;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

}
