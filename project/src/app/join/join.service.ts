import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Emp } from '../emp/emp.model';

const URL = 'http://localhost:8080/emps/';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({providedIn: 'root'})
export class JoinService {
  constructor(private http: HttpClient) { }

  add(emp: Emp): Observable<Emp> {
    return this.http.post<Emp>(URL, emp, HTTP_OPTIONS).pipe(
      catchError(this.handleError<any>('add'))
    );
  }

  update(emp: Emp): Observable<Emp> {
    return this.http.put<Emp>(URL, emp, HTTP_OPTIONS).pipe(
      catchError(this.handleError<any>('update'))
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
