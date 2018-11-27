import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Org } from './org-chart.model';

const URL = 'http://localhost:8080/depts/org';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({providedIn: 'root'})
export class OrgChartService {
  constructor(private http: HttpClient) {}

  get(): Observable<Org> {
    return this.http.get<Org>(URL);
  }
}