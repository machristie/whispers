
import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable ,  Subject ,  throwError } from 'rxjs';

import { APP_SETTINGS } from '@app/app.settings';
import { APP_UTILITIES } from '@app/app.utilities';

import { EventDiagnosis } from '@interfaces/event-diagnosis';

@Injectable({
  providedIn: 'root'
})
export class EventDiagnosisService {

  constructor(private _http: Http) { }

  public getEventDiagnoses(): Observable<EventDiagnosis[]> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.EVENT_DIAGNOSES_URL + '?no_page', options).pipe(
      map((response: Response) => <EventDiagnosis[]>response.json()),
      catchError(this.handleError),);
  }

  public create(formValue): Observable<EventDiagnosis> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.AUTH_JSON_HEADERS
    });

    return this._http.post(APP_SETTINGS.EVENT_DIAGNOSES_URL, formValue, options).pipe(
      map((response: Response) => <EventDiagnosis>response.json()),
      catchError(this.handleError),);

  }

  public update(formValue): Observable<EventDiagnosis> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.put(APP_SETTINGS.EVENT_DIAGNOSES_URL + formValue.id + '/', formValue, options).pipe(
      map((response: Response) => <EventDiagnosis>response.json()),
      catchError(this.handleError),);
  }

  public delete(id): Observable<any> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.delete(APP_SETTINGS.EVENT_DIAGNOSES_URL + id + '/', options).pipe(
      map((response: Response) => <any>response.json()),
      catchError(this.handleError),);
  }

  private handleError(error: Response) {
    console.error(error);
    return throwError(JSON.stringify(error.json()) || 'Server error');
  }

}
