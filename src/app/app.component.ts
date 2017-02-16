import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar, Splashscreen, SQLite } from 'ionic-native';

import { UsersPage } from '../pages/users/users';
import { SessionsPage } from '../pages/sessions/sessions';
import { SpeakersPage } from '../pages/speakers/speakers';
import { WelcomePage } from '../pages/welcome/welcome';
import { AboutPage } from '../pages/about/about';
import { PhonePage } from '../pages/phone/phone';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

private createImages = "CREATE TABLE IF NOT EXISTS IMAGE (id integer primary key autoincrement, data text, sessionID text)";
private createNotes = "CREATE TABLE IF NOT EXISTS NOTE (id integer primary key autoincrement, comment text, sessionId text)"

  // make HelloIonicPage the root (or first) page
  rootPage: any = WelcomePage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Accueil', component: WelcomePage },
      { title: 'Sessions', component: SessionsPage },
      { title: 'Présentateurs', component: SpeakersPage }, 
      { title: 'Mon téléphone', component: PhonePage },   
      { title: 'A propos', component: AboutPage }                             
    ];

    platform.ready().then(() => {
      StatusBar.styleDefault();
      let db = new SQLite();
      db.openDatabase({
        name: "data.db",
        location: "default"
      }).then(() => {
        db.executeSql(this.createNotes, {}).then((data) => {
          console.log("Table NOTE initialisée: ", data);
        }, (error) => {
          console.error("Impossible de créer la table NOTE", error);
        });
        db.executeSql(this.createImages, {}).then((data) => {
          console.log("Table IMAGE initialisée: ", data);
        }, (error) => {
          console.error("Impossible de créer la table IMAGE", error);
        });
      }, (error) => {
        console.error("Impossible d'ouvrir la base de données SQLite", error);
      });
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
