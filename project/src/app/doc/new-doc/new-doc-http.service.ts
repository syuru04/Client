import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { NewDoc } from './new-doc.model';

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

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
