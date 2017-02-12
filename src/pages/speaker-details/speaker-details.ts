import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Speaker } from '../../models/speaker';
import { Session } from '../../models/session';

import { SessionsProvider } from '../../providers/devfest-sessions';

import { SessionDetailsPage } from '../session-details/session-details';

@Component({
  selector: 'page-speaker-details',
  templateUrl: 'speaker-details.html'
})
export class SpeakerDetailsPage {
  speaker: Speaker;
  sessions : Session[]

  constructor(public navCtrl: NavController, private navParams: NavParams, private sessionsProvider: SessionsProvider) {
    this.speaker = navParams.get('speaker');

    sessionsProvider.loadFromSpeaker(this.speaker.id).subscribe(sessions => {
        this.sessions = sessions;
        console.log(sessions);
    });
  }

  goToSessionDetails(session: Object) {
    this.navCtrl.push(SessionDetailsPage, {session});
  }

}
