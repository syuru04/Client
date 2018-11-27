import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Dept } from './dept.model';
import { Emp } from '../emp/emp.model';

const URL = 'http://localhost:8080/depts/';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({providedIn: 'root'})
export class OrgHttpService {
  constructor(private http: HttpClient) {}

  get(): Observable<Dept> {
    return this.http.get<Dept>(URL + "org");
  }

  update(dept: Dept): Observable<any> {
    return this.http.put<Dept>(URL, dept, HTTP_OPTIONS);
  }

  getMembers(id: number): Observable<Emp[]> {
    return this.http.get<Emp[]>('http://localhost:8080/emps/m/'+id);
  }
}