import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Emp } from './emp.model';


const URL = 'http://localhost:8080/emps';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({providedIn: 'root'})
export class EmpService {

  constructor(private http: HttpClient) {}

  get(): Observable<Emp[]> {
    return this.http.get<Emp[]>(URL);
  }
}
