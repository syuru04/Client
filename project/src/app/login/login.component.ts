import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { Router } from '@angular/router';

import { Emp } from '../emp/emp.model';
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
  emp: Emp;

  isPwOk: boolean;
  errorMessage = '';
  loginProc = '';

  @Output() outputProperty = new EventEmitter<string>();
   
  constructor(
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.loginService.pwChk(this.user.id,this.user.pw).subscribe(
      result => {
        this.isPwOk = result; 
        if(this.isPwOk) {
          // 세션 처리 로직 필요
          this.loginService.getEmp(this.user.id).subscribe(data => {});          
          this.loginProc = 'loginSuccess';

        } else {
          this.errorMessage = 'id 또는 pw 가 일치하지 않습니다.';
          this.loginProc = 'login';
        }        
        this.outputProperty.emit(this.loginProc);  // 부모 컴포넌트에 값 전달
      }
    );
  }

  join() {
    this.loginProc = 'join';
    this.outputProperty.emit(this.loginProc); 
  }

}
