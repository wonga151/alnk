import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse, } from '@angular/common/http';


import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

import { Link } from './link'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
// @Injectable()
export class LinkService {

  constructor(private http: HttpClient) { }


  createLink(newLink: Link): Observable<Link> {
    return this.http.post<Link>('/url', newLink, httpOptions)
      .pipe(
        map(res => { console.log(res); return res }),
        catchError(this.handleError)
      );
  }

  getLink(linkId: string) {
    return this.http.get('/url/' + linkId)
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }


  // createContact(newLink: Link): Promise<Link> {
  //   return this.http.post('/url', newLink)
  //     .toPromise()
  //     .then(response => response.json() as Link)
  //     .catch(this.handleError);
  // }

  // private handleError(error: any): Promise<any> {
  //   let errMsg = (error.message) ? error.message :
  //     error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  //   console.error(errMsg); // log to console
  //   return Promise.reject(errMsg);
  // }



}
