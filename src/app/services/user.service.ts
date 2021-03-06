
import {map, catchError} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable ,  Subject ,  throwError } from 'rxjs';

import { APP_SETTINGS } from '@app/app.settings';
import { APP_UTILITIES } from '@app/app.utilities';

import { User } from '@interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: Http) { }

  public getUserDetail(userID): Observable<User[]> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.USERS_URL + userID + '/', options).pipe(
      map((response: Response) => <User[]>response.json()),
      catchError(this.handleError),);
  }

  public queryUserByEmail(emailArray): Observable<any> {

    // add message(?)
    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.post(APP_SETTINGS.USERS_URL + 'verify_email/', emailArray, options).pipe(
      map((response: Response) => <any>response.json()),
      catchError(this.handleError),);
  }

  public updateUser(formValue): Observable<User> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
    });

    return this._http.patch(APP_SETTINGS.USERS_URL + formValue.id + '/', formValue, options).pipe(
      map((response: Response) => <User>response.json()),
      catchError(this.handleError),);

  }

  public createNew(formValue): Observable<User> {

    // add message(?)
    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_JSON_HEADERS
    });

    return this._http.post(APP_SETTINGS.USERS_URL, formValue, options).pipe(
      map((response: Response) => <any>response.json()),
      catchError(this.handleError),);
  }

  public requestNew(formValue): Observable<User> {

    const options = new RequestOptions({
      headers: APP_SETTINGS.MIN_AUTH_TEXT_HEADERS
    });

    // const options = new RequestOptions({
    //   headers: APP_SETTINGS.MIN_JSON_HEADERS
    // });

    return this._http.post(APP_SETTINGS.USERS_URL + 'request_new/', formValue, options).pipe(
      map((response: Response) => <any>response.json()),
      catchError(this.handleError),);
  }

  private handleError(error: Response) {
    console.error(error);
    return throwError(JSON.stringify(error.json()) || 'Server error');
  }
}
