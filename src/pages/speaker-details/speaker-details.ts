import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Contacts, ContactField, ContactName, ContactOrganization } from 'ionic-native';

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

  saveInContact(){
    var contact = Contacts.create();
    contact.displayName = this.speaker.lastname + ' ' + this.speaker.firstname;
    contact.name = new ContactName(null, this.speaker.lastname, this.speaker.firstname);
    contact.nickname = this.speaker.lastname + ' ' + this.speaker.firstname;
    contact.urls

    contact.organizations = [new ContactOrganization('company', this.speaker.company)];

    var urls = [];
    for(var link in this.speaker.socials){
      urls.push(new ContactField('url', link))
    }

    contact.urls = urls;


    contact.save().then((contact) => {
      alert('Contact ajouté');
    }, (error) => {
      alert(error);
    })
  }

}
