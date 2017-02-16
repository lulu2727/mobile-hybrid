import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { SessionsPage } from '../pages/sessions/sessions';
import { SpeakersPage } from '../pages/speakers/speakers';
import { WelcomePage } from '../pages/welcome/welcome';
import { AboutPage } from '../pages/about/about';
import { PhonePage } from '../pages/phone/phone';
import { NotesPage } from '../pages/notes/notes';
import { SchedulePage } from '../pages/schedule/schedule';
import { SpeakerDetailsPage } from '../pages/speaker-details/speaker-details';
import { SessionDetailsPage } from '../pages/session-details/session-details';

import { SpeakersProvider } from '../providers/devfest-speakers';
import { SessionsProvider } from '../providers/devfest-sessions';
import { HoursProvider } from '../providers/devfest-hours';

@NgModule({
  declarations: [
    MyApp,
    SessionsPage,
    SpeakersPage,
    SpeakerDetailsPage,
    SessionDetailsPage,
    WelcomePage,
    AboutPage,
    NotesPage,
    PhonePage,
    SchedulePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SessionsPage,
    SpeakersPage,
    SpeakerDetailsPage,
    SessionDetailsPage,
    WelcomePage,
    AboutPage,
    NotesPage,
    PhonePage,
    SchedulePage   
  ],
  providers: [SpeakersProvider, SessionsProvider, HoursProvider]
})
export class AppModule {}
