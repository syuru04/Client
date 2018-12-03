import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project';
  loginProc = 'login';
  
  logOut():void {
    this.loginProc = 'login';
    sessionStorage.removeItem;
  }

  receive(data):void {
    this.loginProc = data.loginProc
  }

  empMod():void {
    this.loginProc = 'empMod';
  }
}
