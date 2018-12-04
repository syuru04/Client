import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project';
  loginProc = 'login';

  constructor(){
    const sessionValue = JSON.parse(sessionStorage.getItem('loginData'));    
    if(sessionValue.id >0){
      this.loginProc = 'loginSuccess'
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
