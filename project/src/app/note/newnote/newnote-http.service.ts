import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Note } from './newnote.model';
import { catchError } from 'rxjs/operators';



const URL = 'http://localhost:8080/notes/';


const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })

export class NewNoteService {
  notes: Note[];
  note : Note;
  constructor(private http: HttpClient) { }
  
  get(): Observable<Note[]> {
    return this.http.get<Note[]>(URL);
  }
  
  add(title:string,body:string,name:string,ts:string): Observable<Note[]> {   
    return this.http.post<Note[]>(URL, this.notes, HTTP_OPTIONS).pipe(
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




