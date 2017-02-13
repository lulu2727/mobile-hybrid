import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar, Splashscreen, SQLite } from 'ionic-native';

import { UsersPage } from '../pages/users/users';
import { SessionsPage } from '../pages/sessions/sessions';
import { SpeakersPage } from '../pages/speakers/speakers';
import { WelcomePage } from '../pages/welcome/welcome';
import { AboutPage } from '../pages/about/about';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

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
      { title: 'A propos du téléphone', component: AboutPage }                     
    ];

    platform.ready().then(() => {
      StatusBar.styleDefault();
      let db = new SQLite();
      db.openDatabase({
        name: "data.db",
        location: "default"
      }).then(() => {
        db.executeSql("CREATE TABLE IF NOT EXISTS NOTE (id integer primary key autoincrement, comment text, sessionId text)", {}).then((data) => {
          console.log("Table Notes initialisée: ", data);
        }, (error) => {
          console.error("Impossible de créer la table NOTES", error);
        })
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
