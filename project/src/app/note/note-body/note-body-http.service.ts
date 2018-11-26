import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Note } from './note-body.model';


const URL = 'http://localhost:8080/notes/';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({providedIn: 'root'})
export class NotebodyService {

  constructor(private http: HttpClient) {}
  
  get(id): Observable<Note[]> {        
    return this.http.get<Note[]>(URL+id);
  }
  
}
