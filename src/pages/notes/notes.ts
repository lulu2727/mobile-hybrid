import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import {SQLite, Camera} from "ionic-native";

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
  newImages: string[];
  savedImages: string[];  

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform) {
    this.session = navParams.get('session');
    this.note = { id: null, comment: "", sessionId: this.session.id};
    this.newImages = [];
    this.savedImages = [];    

    this.platform.ready().then(() => {
      this.database = new SQLite();
      this.database.openDatabase({ name: "data.db", location: "default" }).then(() => {
        console.log("opened");
        this.loadNote();
        this.loadImages();        
      }, (error) => {
        console.log("ERROR: ", error);
      });
    });
  }

  loadNote() {
    this.database.executeSql("SELECT * FROM NOTE WHERE sessionId = ?", [this.session.id]).then((data) => {
      if (data.rows.length > 0) {
        //Récupération de la première note.
        this.note = { id: data.rows.item(0).id, comment: data.rows.item(0).comment, sessionId: data.rows.item(0).sessionId};
      }
    }, (error) => {
      console.log("Erreur lors de la récupération d'une note : " + JSON.stringify(error));
    });
  }

  loadImages() {
    this.database.executeSql("SELECT * FROM IMAGE WHERE sessionId = ?", [this.session.id]).then((data) => {
      for(let i = 0; i < data.rows.length; i++){
        console.log(data.rows.item(i));
        this.savedImages.push(data.rows.item(i).data);
      }
    }, (error) => {
      console.log("Erreur lors de la récupération d'une note : " + JSON.stringify(error));
    });
  }


  saveNote() {
    this.saveImages();

    if (this.note.id) {
      //Modification de la note existante pour cette session.
      this.database.executeSql("UPDATE NOTE SET comment = ? WHERE id = ?", [this.note.comment, this.note.id]).then((data) => {
        console.log("Note modifiée: " + JSON.stringify(data));
      }, (error) => {
        console.log("Erreur lors de la modification d'une note : " + JSON.stringify(error));
      });
    }
    else {
      //Création d'une nouvelle note
      this.database.executeSql("INSERT INTO NOTE (comment, sessionId) VALUES (?, ?)", [this.note.comment, this.note.sessionId]).then((data) => {
        console.log("Note crée: " + JSON.stringify(data));
      }, (error) => {
        console.log("Erreur lors de la création d'une note : " + JSON.stringify(error));
      });
    }
  }

  saveImages() {
    //Enregistrement des nouvelles images

    for(let image of this.newImages){
      console.log(image)
      this.database.executeSql("INSERT INTO IMAGE (data, sessionId) VALUES (?, ?)", [image, this.note.sessionId]).then((data) => {
        console.log("Image crée: " + JSON.stringify(data));
      }, (error) => {
        console.log("Erreur lors de la création d'une image : " + JSON.stringify(error));
      });      
    }

  }

  takePicture(){
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL
    }).then((imageData) => {
        this.newImages.push("data:image/jpeg;base64," + imageData);
        console.log(this.newImages);
    }, (err) => {
        console.log(err);
    });
  }

  retrieveImageFromGallery(){
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType : Camera.PictureSourceType.PHOTOLIBRARY
    }).then((imageData) => {
        this.newImages.push("data:image/jpeg;base64," + imageData);
        console.log(this.newImages);
    }, (err) => {
        console.log(err);
    });
  }

}
