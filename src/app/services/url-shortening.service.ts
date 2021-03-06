
import {catchError, map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable ,  Subject ,  throwError } from 'rxjs';

import { APP_SETTINGS } from '@app/app.settings';

@Injectable({
  providedIn: 'root'
})
export class UrlShorteningService {

  constructor(
    private http: Http
  ) { }

  public generateShortURL(): Observable<any> {

    const encodedLongURL = encodeURIComponent(window.location.href);

    // Temporary, for testing
    // const encodedLongURL = encodeURIComponent('https://test.wim.usgs.gov/whispersdev/event/160587');

    const options = new RequestOptions({
      headers: APP_SETTINGS.GO_USA_GOV_JSON_HEADERS
    });

    return this.http.get(APP_SETTINGS.GO_USA_GOV_SHORTEN_URL + '?login=' +
      APP_SETTINGS.GO_USA_GOV_USER + '&apiKey=' +
      APP_SETTINGS.GO_USA_GOV_API_KEY + '&longUrl=' + encodedLongURL, options
    ).pipe(
      map((response: Response) => <any>response.json()),
      catchError(this.handleError),);
  }

  private handleError(error: Response) {
    console.error(error);
    return throwError(JSON.stringify(error.json()) || 'Server error');
  }


}
