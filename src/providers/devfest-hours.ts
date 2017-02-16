import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Hour } from '../models/hour';

@Injectable()
export class HoursProvider {
  sessionUrl = 'assets/json/devfest-2015.json';

  constructor(public http: Http) { }

  load(): Observable<Hour[]> {
    return this.http.get(`${this.sessionUrl}`)
      .map(res => <Hour[]>res.json().hours);
  }
}