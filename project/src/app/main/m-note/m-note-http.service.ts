import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Note } from 'src/app/note/note.model';
import { catchError } from 'rxjs/operators';



const URL = 'http://localhost:8080/notes/';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })

export class MNoteService {
  notes: Note[];
  constructor(private http: HttpClient) { }
  

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




