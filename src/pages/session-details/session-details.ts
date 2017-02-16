import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { SQLite } from "ionic-native";

import { Session } from '../../models/session';
import { Speaker } from '../../models/speaker';

import { SpeakersProvider } from '../../providers/devfest-speakers';

import { SpeakerDetailsPage } from '../speaker-details/speaker-details';
import { NotesPage } from '../notes/notes';

@Component({
  selector: 'page-session-details',
  templateUrl: 'session-details.html'
})
export class SessionDetailsPage {
  session: Session;
  speakers: Speaker[];
  database: SQLite;
  favorite : boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private speakersProvider: SpeakersProvider, private platform: Platform) {
    this.session = navParams.get('session');
    this.speakers = [];

    for (let speakerId of this.session.speakers) {
      speakersProvider.loadById(speakerId).subscribe(speaker => {
        this.speakers.push(speaker);
      });   
    }

    this.platform.ready().then(() => {
      this.database = new SQLite();
      this.database.openDatabase({ name: "data.db", location: "default" }).then(() => {  
      }, (error) => {
        console.log("ERROR: ", error);
      });
    });
  }

  toggleFavorite(){
    if(this.favorite){
      this.removeToFavorites()
    }
    else{
      this.addToFavorites()
    }   
    this.favorite = !this.favorite; 
  }

  goToSpeakerDetails(speaker: Object) {
    this.navCtrl.push(SpeakerDetailsPage, {speaker});
  }

  goToNotes(session: Object) {
    this.navCtrl.push(NotesPage, {session});
  }  

  addToFavorites() {
      this.database.executeSql("INSERT INTO FAVORITE (sessionId) VALUES (?)", [this.session.id]).then((data) => {
        console.log("Favori crée: " + JSON.stringify(data));
      }, (error) => {
        console.log("Erreur lors de la création d'un favori : " + JSON.stringify(error));
      });
  }  

  removeToFavorites() {
      this.database.executeSql("DELETE FROM FAVORITE WHERE sessionId = ?", [this.session.id]).then((data) => {
        console.log("Favori supprimé: " + JSON.stringify(data));
      }, (error) => {
        console.log("Erreur lors de la suppression d'un favori : " + JSON.stringify(error));
      });
  }    

}
