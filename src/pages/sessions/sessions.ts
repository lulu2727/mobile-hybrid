import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Session } from '../../models/session';

import { SessionsProvider } from '../../providers/devfest-sessions';

import { SessionDetailsPage } from '../session-details/session-details';

@Component({
  selector: 'page-sessions',
  templateUrl: 'sessions.html'
})
export class SessionsPage {
  sessions: Session[];

  constructor(public navCtrl: NavController, private sessionsProvider: SessionsProvider) {
    sessionsProvider.load().subscribe(sessions => {
      this.sessions = sessions;
    });
  }

  goToSessionDetails(session: Session) {
    this.navCtrl.push(SessionDetailsPage, {session});
  }

}
