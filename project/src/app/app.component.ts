import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project';
  loginProc = 'login';

  outputEvent(active: string) {
    this.loginProc = active
  }

  logOut() {
    this.loginProc = 'login';
  }
}
