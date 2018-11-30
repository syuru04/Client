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
  emps: Emp[];

  isPwOk: boolean;
  errorMessage = '';
  loginProc = '';

  id: number;
  deptId: number;
  name: string;
  code: string;

  @Output() outputProperty: EventEmitter<any> = new EventEmitter();
   
  constructor(
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit() { }

  login() {
    this.loginService.pwChk(this.user.id,this.user.pw).subscribe(
      result => {
        this.isPwOk = result; 
        if(this.isPwOk) {
          // 세션 처리 로직 필요
          this.loginService.getEmp(this.user.id).subscribe(data => {
            this.emp = data;
            
            // 세션에 넣기
            sessionStorage.setItem('loginData',JSON.stringify(this.emp));
            
            this.outputProperty.next({
              loginProc:'loginSuccess'
            });
          });          

        } else {
          this.errorMessage = 'id 또는 pw 가 일치하지 않습니다.';
          this.outputProperty.next({loginProc:'login'});
        }        
      }
    );
  }

  join() {
    this.outputProperty.next({loginProc:'join'});
  }

}
