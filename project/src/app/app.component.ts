import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project';
  loginProc = 'login';
  sessionValue;
  user = {
    id: 0    
  };
  constructor(){
    sessionStorage.setItem('loginData',JSON.stringify(this.user));
    this.sessionValue = JSON.parse(sessionStorage.getItem('loginData'));    
    if(this.sessionValue.id >0){
      this.loginProc = 'loginSuccess'
    }else{
      return null;
    }
  }

  logOut(): void {
    sessionStorage.clear();       
    this.loginProc = 'login';
  }

  receive(data): void {
    this.loginProc = data.loginProc
  }

  empMod(): void {
    this.loginProc = 'empMod';
  }
}
