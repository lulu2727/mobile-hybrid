import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { UsersPage } from '../pages/users/users';
import { SessionsPage } from '../pages/sessions/sessions';
import { SpeakersPage } from '../pages/speakers/speakers';
import { WelcomePage } from '../pages/welcome/welcome';
import { AboutPage } from '../pages/about/about';
import { NotesPage } from '../pages/notes/notes';
import { SpeakerDetailsPage } from '../pages/speaker-details/speaker-details';
import { SessionDetailsPage } from '../pages/session-details/session-details';

import { GithubUsers } from '../providers/github-users';
import { SpeakersProvider } from '../providers/devfest-speakers';
import { SessionsProvider } from '../providers/devfest-sessions';

import {UserDetailsPage } from '../pages/user-details/user-details';

@NgModule({
  declarations: [
    MyApp,
    UsersPage,
    SessionsPage,
    SpeakersPage,
    SpeakerDetailsPage,
    SessionDetailsPage,
    WelcomePage,
    UserDetailsPage,
    AboutPage,
    NotesPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    UsersPage,
    SessionsPage,
    SpeakersPage,
    SpeakerDetailsPage,
    SessionDetailsPage,
    WelcomePage,
    UserDetailsPage,
    AboutPage,
    NotesPage    
  ],
  providers: [GithubUsers, SpeakersProvider, SessionsProvider]
})
export class AppModule {}
