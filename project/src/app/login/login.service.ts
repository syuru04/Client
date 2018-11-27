import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

// import axios from 'axios';

const URL = 'http://localhost:8080/emps/';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  // auth(user): Promise<any> {
  //   return axios.get(this.URL + user.id)
  //     .then(function(response) {
  //       console.log(response);
  //       return response.data;
  //     });
  // }
  
  pwChk(id:string, pw:string): Observable<any> {
    return this.http.post<Boolean>(URL+'pw', [id, pw], HTTP_OPTIONS).pipe(
      catchError(this.handleError<any>('pwChk'))
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


