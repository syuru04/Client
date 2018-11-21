import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Emp } from "./emp.model";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class EmpService {

  constructor(private http: Http) { }

  getIdols(): Promise<Emp[]> {
    return this.http.get('./assets/server/kpop.json')
    .toPromise().then(res => {
      console.log(res);
      return res.json().info.idols;
    });
  }
}
