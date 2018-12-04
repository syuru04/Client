import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError }  from 'rxjs/operators';

import { Doc } from '../model/doc.model';
import { Approver } from '../model/approver.model';
import { DocAppr } from '../model/doc-appr.model';

const URL = 'http://localhost:8080/docs/';
const URLAppr = 'http://localhost:8080/appr/';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({providedIn: 'root'})
export class NewDocHttpService {

  constructor(private http: HttpClient) { }

  getUpinfo(id:number): Observable<DocAppr> {
    return this.http.post<DocAppr>(URL+'u/', id, HTTP_OPTIONS);
  }

  add(doc: Doc): Observable<any> {
    return this.http.post<number>(URL, doc, HTTP_OPTIONS).pipe(
      catchError(this.handleError<any>('add'))
    );
  }

  update(doc: Doc): Observable<Doc> {
    return this.http.put<Doc>(URL, doc, HTTP_OPTIONS).pipe(
      catchError(this.handleError<any>('add'))
    );
  }

  addAppr(approver:Approver): Observable<Approver> {
    return this.http.post<Approver>(URLAppr, approver, HTTP_OPTIONS).pipe(
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
