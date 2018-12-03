import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { NewDoc } from './new-doc.model';
import { Doc } from '../doc.model';

const URL = 'http://localhost:8080/docs/';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({providedIn: 'root'})
export class NewDocHttpService {

  constructor(private http: HttpClient) { }

  getUpinfo(id:number): Observable<NewDoc> {
    return this.http.post<NewDoc>(URL+'u/', id, HTTP_OPTIONS);
  }

  add(doc: NewDoc): Observable<NewDoc> {
    return this.http.post<NewDoc>(URL, doc, HTTP_OPTIONS).pipe(
      catchError(this.handleError<any>('add'))
    );
  }

  update(doc: NewDoc): Observable<NewDoc> {
    return this.http.put<NewDoc>(URL, doc, HTTP_OPTIONS).pipe(
      catchError(this.handleError<any>('add'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
