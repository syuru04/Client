import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Dept } from './dept.model';

const URL = 'http://localhost:8080/depts';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({providedIn: 'root'})
export class DeptService {
  constructor(private http: HttpClient) {}

  get(): Observable<Dept[]> {
    return this.http.get<Dept[]>(URL);
  }

  add(dept: Dept): Observable<Dept> {
    return this.http.post<Dept>(URL, dept, HTTP_OPTIONS).pipe(
      catchError(this.handleError<any>('add'))
    );
  }

  update(dept: Dept): Observable<any> {
    return this.http.patch<Dept>(URL + dept.id, dept, HTTP_OPTIONS).pipe(
      catchError(this.handleError<any>('update'))
    );
  }

  remove(id: number): Observable<any> {
    return this.http.delete(URL + id).pipe(
      catchError(this.handleError<any>('delete'))
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
