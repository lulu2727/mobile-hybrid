import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Session } from '../../models/session';

/*
  Generated class for the Notes page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html'
})
export class NotesPage {
  note : string;
  session : Session;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.session = navParams.get('session');
  }

  saveNote() {
    console.log('saving Note');
  }

}
