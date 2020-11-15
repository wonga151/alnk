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

export class LinkService {

  searchedLinks: Link[] = [];

  constructor(private http: HttpClient) { }


  createLink(newLink: Link): Observable<Link> {
    return this.http.post<Link>('/url', newLink, httpOptions)
      .pipe(
        map(res => res),
        catchError(this.handleError)
      );
  }

  getLink(linkId: string) {
    return this.http.get('/url/' + linkId)
  }

  searchBySlug(slug: string) {
    this.http.get<Link[]>('/search/' + slug).subscribe((data: Link[]) => {
      this.searchedLinks = [...data]
    })
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
        `body was: ${error.error.message}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(error.error.message);
  }

}
