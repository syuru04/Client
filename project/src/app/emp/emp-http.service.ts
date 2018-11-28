import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Emp } from './emp.model';

const URL = 'http://localhost:8080/emps/';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({providedIn: 'root'})
export class EmpHttpService {

  constructor(private http: HttpClient) {}

  get(): Observable<Emp[]> {
    return this.http.get<Emp[]>(URL);
  }

  update(emp: Emp): Observable<any> {
    return this.http.put<Emp>(URL, emp, HTTP_OPTIONS).pipe(
      catchError(this.handleError<any>('update'))
    );
  }
  

  remove(id:number): Observable<any> {
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
