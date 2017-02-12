import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Speaker } from '../../models/speaker';

import { SpeakersProvider } from '../../providers/devfest-speakers';

import { SpeakerDetailsPage } from '../speaker-details/speaker-details';

@Component({
  selector: 'page-speakers',
  templateUrl: 'speakers.html'
})
export class SpeakersPage {
  speakers: Speaker[];

  constructor(public navCtrl: NavController, private speakersProvider: SpeakersProvider) {
    speakersProvider.load().subscribe(speakers => {
      this.speakers = speakers;
      console.log(speakers)
    })
  }

  goToSpeakerDetails(speaker: Object) {
    this.navCtrl.push(SpeakerDetailsPage, {speaker});
  }

}
