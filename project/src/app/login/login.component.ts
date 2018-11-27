import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {
    id:'홍',
    pw:'1234'
  };

  isPwOk: boolean;
  errorMessage = '';


  constructor(
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit() {
  }

  login() {
    
    alert(JSON.stringify(this.user));

    this.loginService.pwChk(this.user.id,this.user.pw).subscribe(
      result => {
        this.isPwOk = result; 
        if(!this.isPwOk) this.errorMessage = 'id 또는 pw 가 일치하지 않습니다.';
      }
    );

  }

}
