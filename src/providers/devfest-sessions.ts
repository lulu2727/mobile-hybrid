import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Session } from '../models/session';

@Injectable()
export class SessionsProvider {
  sessionUrl : string = 'assets/json/devfest-2015.json';
  test : Object;

  constructor(public http: Http) { }

  load(): Observable<Session[]> {
    
    return this.http.get(`${this.sessionUrl}`)
      .map(res => <Session[]>res.json().sessions);
  }

  loadFromSpeaker(speakerId: string): Observable<Session[]> {
    return this.http.get(`${this.sessionUrl}`)
      .map(res => (<Session[]>res.json().sessions).filter(session => {
        if (session.speakers) {
          return session.speakers.indexOf(speakerId) >= 0
        }
        else {
          return false;
        }
      }
      ));
  }
}