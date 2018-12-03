import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

import { JoinService } from './join.service';
import { DeptService } from '../dept/dept-http.service';
import { Dept } from '../dept/dept.model';
import { Emp } from '../emp/emp.model';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {

  @Output() outputProperty: EventEmitter<any> = new EventEmitter();
  @Input() proc: string;

  loginProc = 'join';
  code: string;

  depts: Dept[];  
  emp: Emp;

  constructor(
    private deptService: DeptService,
    private joinService: JoinService,
    private loginService: LoginService
  ) { }

  ngOnInit() { 
    this.deptService.get().subscribe(data => {
      this.depts = data;
    });

    if(this.proc=='empMod') {
      this.code = JSON.parse(sessionStorage.getItem('loginData')).code;
      this.loginService.getEmp(this.code).subscribe(data => {
        this.emp = data;
      })
    }
  }

  cancel(): void {
    this.outputProperty.next({loginProc:'login'});
  }

  f_submit(form: NgForm) {
    const emp = Object.assign({ done: false }, form.value);

    // 회원가입
    if(this.proc=='join') {
      this.joinService.add(emp).subscribe(emp => {
        this.outputProperty.next({loginProc:'login'});
      });

    // 회원정보수정
    } else if(this.proc=='empMod') {
      this.joinService.update(emp).subscribe(emp => {
        this.outputProperty.next({loginProc:'login'});
      });
    }    
  }
}