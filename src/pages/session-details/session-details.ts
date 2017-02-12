import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private speakersProvider: SpeakersProvider) {
    this.session = navParams.get('session');
    this.speakers = [];

    for (let speakerId of this.session.speakers) {
      speakersProvider.loadById(speakerId).subscribe(speaker => {
        this.speakers.push(speaker);
      });   
    }
  }

  goToSpeakerDetails(speaker: Object) {
    this.navCtrl.push(SpeakerDetailsPage, {speaker});
  }

  goToNotes(session: Object) {
    this.navCtrl.push(NotesPage, {session});
  }  

}
