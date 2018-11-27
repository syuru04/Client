import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Note } from './note.model';


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
}




