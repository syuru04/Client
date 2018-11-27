import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Org } from './org.model';
import { Dept } from '../dept/dept.model';

const URL = 'http://localhost:8080/depts/';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({providedIn: 'root'})
export class OrgHttpService {

  constructor(private http: HttpClient) {}

  get(): Observable<Org> {
    return this.http.get<Org>(URL + "org");
  }

  update(dept: Dept): Observable<any> {
    return this.http.put<Dept>(URL, dept, HTTP_OPTIONS);
  }
}