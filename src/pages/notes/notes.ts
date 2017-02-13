import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import {SQLite} from "ionic-native";

import { Session } from '../../models/session';
import { Note } from '../../models/note';

@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html'
})
export class NotesPage {
  note : Note;
  session : Session;
  database: SQLite;

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform) {
    this.session = navParams.get('session');
    this.note = { id: null, comment: "", sessionId: this.session.id};

    this.platform.ready().then(() => {
      this.database = new SQLite();
      this.database.openDatabase({ name: "data.db", location: "default" }).then(() => {
        console.log("opened");
        this.loadNote();
      }, (error) => {
        console.log("ERROR: ", error);
      });
    });
  }

  saveNote() {
    console.log('saving')
    if(this.note.id){
      //Modification de la note existante pour cette session.
      this.database.executeSql("UPDATE NOTE SET comment = ? WHERE id = ?", [this.note.comment, this.note.id]).then((data) => {
        console.log("Note modifiée: " + JSON.stringify(data));
      }, (error) => {
        console.log("Erreur lors de la modification d'une note : " + JSON.stringify(error));
      });      
    }
    else {
      //Création d'une nouvelle note
      console.log(this.note);
      this.database.executeSql("INSERT INTO NOTE (comment, sessionId) VALUES (?, ?)", [this.note.comment, this.note.sessionId]).then((data) => {
        console.log("Note crée: " + JSON.stringify(data));
      }, (error) => {
        console.log("Erreur lors de la création d'une note : " + JSON.stringify(error));
      });
    }

  }

  loadNote() {
    console.log('loading')
    this.database.executeSql("SELECT * FROM NOTE WHERE sessionId = ?", [this.session.id]).then((data) => {
      console.log(data);
      if (data.rows.length > 0) {
        //Récupération de la première note.
        console.log(data.rows.item(0));
        this.note = { id: data.rows.item(0).id, comment: data.rows.item(0).comment, sessionId: data.rows.item(0).sessionId};
      }
    }, (error) => {
      console.log("Erreur lors de la récupération d'une note : " + JSON.stringify(error));
    });
  }

}
