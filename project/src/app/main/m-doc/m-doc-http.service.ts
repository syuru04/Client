import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Doc } from 'src/app/doc/doc.model';



const URL = 'http://localhost:8080/docs/';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({providedIn: 'root'})
export class MDocHttpService {

  constructor(private http: HttpClient) {}

  get(): Observable<Doc[]> {
    return this.http.get<Doc[]>(URL);
  }
  pageRange(id:number, range:number): Observable<any> {
    return this.http.post<any>(URL+'range/', [id, range], HTTP_OPTIONS).pipe(
      catchError(this.handleError<any>('pageRange'))
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
