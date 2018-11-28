import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Note, Note2 } from './newnote.model';
import { catchError } from 'rxjs/operators';



const URL = 'http://localhost:8080/notes/';


const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })

export class NewNoteService {
    
  constructor(private http: HttpClient) { }
  
  get(): Observable<Note[]> {
    return this.http.get<Note[]>(URL);
  }
  get2(id): Observable<Note> {
    return this.http.get<Note>(URL + id);
  }
  
  add(note: Note2): Observable<any> {
    return this.http.post<Note2>(URL, note, HTTP_OPTIONS).pipe(
      catchError(this.handleError<any>('insert'))
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




