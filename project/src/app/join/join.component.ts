import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { JoinService } from './join.service';
import { DeptService } from '../dept/dept-http.service';
import { Dept } from '../dept/dept.model';
import { Emp } from '../emp/emp.model';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {

  @Output() outputProperty = new EventEmitter<string>();
  loginProc = '';
  depts: Dept[];  
  emps: Emp[];

  constructor(
    private deptService: DeptService,
    private joinService: JoinService
  ) { }

  ngOnInit() { 
    this.deptService.get().subscribe(data => {
      this.depts = data;
    });
  }

  cancel(): void {
    this.loginProc = 'login';
    this.outputProperty.emit(this.loginProc); 
  }

  add(form: NgForm) {
    const emp = Object.assign({ done: false }, form.value);
    this.joinService.add(emp).subscribe(
      emp => {}
    );
  }
}