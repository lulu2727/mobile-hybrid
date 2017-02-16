import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { SQLite, Camera, ActionSheet, SocialSharing } from "ionic-native";

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

  onImageClick(image : string, added : boolean) {
    let buttonLabels = ['Supprimer', 'Partager'];
    ActionSheet.show({
      'title': 'Que faire avec l\'image ?',
      'buttonLabels': buttonLabels,
      androidEnableCancelButton : true,
      'addCancelButtonWithLabel': 'Annuler'
    }).then((buttonIndex: number) => {
      if (buttonIndex === 1) {
        this.deleteImage(image, added);
      }
      else if (buttonIndex === 2) {
        this.shareImage(image);
      }
    });
  }

  loadImages() {
    this.database.executeSql("SELECT * FROM IMAGE WHERE sessionId = ?", [this.session.id]).then((data) => {
      for(let i = 0; i < data.rows.length; i++){
        this.savedImages.push(data.rows.item(i).data);
      }
    }, (error) => {
      console.log("Erreur lors de la récupération d'une note : " + JSON.stringify(error));
    });
  }

  deleteImage(image : string, added : boolean) {
    if(!added){
      var index = this.newImages.indexOf(image, 0);
      if (index > -1) {
        this.newImages.splice(index, 1);
      }
    }
    else{
      var index = this.savedImages.indexOf(image, 0);
      if (index > -1) {
        this.savedImages.splice(index, 1);
      }
    }

    this.database.executeSql("DELETE FROM IMAGE WHERE data = ? AND sessionId = ?", [image, this.note.sessionId]).then((data) => {
      console.log("Image supprimée: " + JSON.stringify(data));
    }, (error) => {
      console.log("Erreur lors de la suppression d'une image : " + JSON.stringify(error));
    });
  }

  shareImage(image : string) {
    SocialSharing.share(this.note.comment, this.note.sessionId, null, "").then(()=>{

      },
      (err)=>{
         console.log(err)
      })
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
    }, (err) => {
        console.log(err);
    });
  }

}
