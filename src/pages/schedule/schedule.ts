import { Component } from '@angular/core';
import { NavController, AlertController, Platform } from 'ionic-angular';
import { SQLite, DeviceMotion } from "ionic-native";

import { Hour } from '../../models/hour';
import { Session } from '../../models/session';

import { HoursProvider } from '../../providers/devfest-hours';
import { SessionsProvider } from '../../providers/devfest-sessions';

import { SessionDetailsPage } from '../session-details/session-details';

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {
  private hours : Hour[];
  private planning = [];
  private favorites = [];
  private database: SQLite;
  private sessions : Session[];

  private lastX:number;
  private lastY:number;
  private lastZ:number;
  private moveCounter:number = 0;

  constructor(public navCtrl: NavController, private hoursProvider: HoursProvider, private platform: Platform, private alertCtrl: AlertController, private sessionsProvider: SessionsProvider) {
    this.setUpShakeRecognition()

    this.hours = [];
    hoursProvider.load().subscribe(hours => {
      for (let key in hours) {
        this.hours.push(hours[key])
      }
      sessionsProvider.load().subscribe(sessions => {
        this.sessions = sessions;
        this.database = new SQLite();
        this.database.openDatabase({ name: "data.db", location: "default" }).then(() => {
          this.loadFavorites();
        }, (error) => {
          console.log("ERROR: ", error);
        });
      });
    });
  }

  setUpShakeRecognition(){
    this.platform.ready().then(() => {
      DeviceMotion.watchAcceleration({ frequency: 200 }).subscribe(acc => {
        let deltaX: number, deltaY: number, deltaZ: number;
        deltaX = Math.abs(acc.x - this.lastX);
        deltaY = Math.abs(acc.y - this.lastY);
        deltaZ = Math.abs(acc.z - this.lastZ);

        if (deltaX + deltaY + deltaZ > 4) {
          this.moveCounter++;
        } else {
          this.moveCounter = Math.max(0, --this.moveCounter);
        }

        if (this.moveCounter > 5) {
          this.findNextSessions();
          this.moveCounter = 0;
        }

        this.lastX = acc.x;
        this.lastY = acc.y;
        this.lastZ = acc.z;

      });
    });
  }

  findNextSessions(){
    let now = new Date();
    let time = now.getHours() + 'h' + now.getMinutes();
    
    var i = 0;
    while(i < this.planning.length && this.planning[i].time < time){
      i++;
    }

    if(i < this.planning.length){
      var alertMessage : string = "";

      for(let session of this.planning[i].sessions){
        alertMessage += '- ' + session.title + ' - ' + session.confRoom + '<br>';
      }

      let alert = this.alertCtrl.create({
      title: 'Prochaines sessions',
      subTitle: alertMessage,
      buttons: ['OK']
    });
      alert.present();
    }
  }


  loadFavorites(){
    this.database.executeSql("SELECT * FROM FAVORITE", []).then((data) => {
        for(let i = 0; i < data.rows.length; i++){
          this.favorites.push(data.rows.item(i).sessionId);
        }
        this.buildScheduleObject()
      }, (error) => {
        console.log("Erreur lors de la récupération d'une note : " + JSON.stringify(error));
    });
  }

  buildScheduleObject(){
    for (let hour of this.hours) {
      var hourSessions: Session[] = [];
      this.sessions.map(session => {
        if (session.hour === hour.id) {
          session.favorite = this.favorites.indexOf(session.id) >= 0;
          hourSessions.push(session);
        }
      });
      var time = hour.hourStart + 'h' + hour.minStart + ' - ' + hour.hourEnd + 'h' + hour.minEnd;
      this.planning.push({ time: time, sessions: hourSessions })
    }
    this.planning.sort((h1, h2) => {
      if (h1.time > h2.time) {
        return 1;
      }

      if (h1.time < h2.time) {
        return -1;
      }

      return 0;
    });
  }

  toggleFavorite(session : Session){
    if(session.favorite){
      this.removeToFavorites(session)
    }
    else{
      this.addToFavorites(session)
    } 
    session.favorite = !session.favorite;
  }

  addToFavorites(session : Session) {
      this.database.executeSql("INSERT INTO FAVORITE (sessionId) VALUES (?)", [session.id]).then((data) => {
        console.log("Favori crée: " + JSON.stringify(data));
      }, (error) => {
        console.log("Erreur lors de la création d'un favori : " + JSON.stringify(error));
      });
  }  

  removeToFavorites(session : Session) {
      this.database.executeSql("DELETE FROM FAVORITE WHERE sessionId = ?", [session.id]).then((data) => {
        console.log("Favori supprimé: " + JSON.stringify(data));
      }, (error) => {
        console.log("Erreur lors de la suppression d'un favori : " + JSON.stringify(error));
      });
  }  

  goToSessionDetails(session: Session) {
    this.navCtrl.push(SessionDetailsPage, {session});
  }


}
