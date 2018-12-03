import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Doc } from './doc.model';

const URL = 'http://localhost:8080/docs/';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({providedIn: 'root'})
export class DocHttpService {

  constructor(private http: HttpClient) {}

  get(): Observable<Doc[]> {
    return this.http.get<Doc[]>(URL);
  }

  getDetail(id): Observable<Doc> {
    return this.http.get<Doc>(URL + id);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
