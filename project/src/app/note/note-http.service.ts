import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Note, NotePage } from './note.model';
import { catchError } from 'rxjs/operators';



const URL = 'http://localhost:8080/notes/';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })

export class NoteService {
  notes: Note[];
  constructor(private http: HttpClient) { }

  get(): Observable<Note[]> {
    return this.http.get<Note[]>(URL);
  }

  get2(id): Observable<Note> {
    return this.http.get<Note>(URL + id);
  }
  remove(id: number): Observable<any> {
    return this.http.delete(URL + id).pipe(
      catchError(this.handleError<any>('delete'))
    );
  }

  pageRange(id:number, range:number): Observable<any> {
    return this.http.post<any>(URL+'range/', [id, range], HTTP_OPTIONS).pipe(
      catchError(this.handleError<any>('pageRange'))
    );
  }
  
  pageCount(): Observable<any> {        
    return this.http.post<any>(URL+'count/', HTTP_OPTIONS).pipe(
      catchError(this.handleError<any>('pageCount'))
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




