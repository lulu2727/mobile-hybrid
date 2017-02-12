import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Speaker } from '../models/speaker';

@Injectable()
export class SpeakersProvider {
  speakerUrl = 'assets/json/devfest-2015.json';

  constructor(public http: Http) { }

  load(): Observable<Speaker[]> {
    return this.http.get(`${this.speakerUrl}`)
      .map(res => <Speaker[]>res.json().speakers);
  }

  loadById(id: string): Observable<Speaker> {  
    return this.http.get(`${this.speakerUrl}`)
      .map(res => (<Speaker[]>res.json().speakers).filter(speaker => speaker.id === id)[0]);
  }
}