import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { EmpHttpService } from './emp-http.service';
import { Emp } from './emp.model';
import { DeptService } from '../dept/dept-http.service';
import { Dept } from '../dept/dept.model';

@Component({
  selector: 'app-emp',
  templateUrl: './emp.component.html',
  styleUrls: ['./emp.component.css']
})
export class EmpComponent implements OnInit {
  newFormYn="N";
  newBtnCloseYn="N";

  openForm = "N";

  emps: Emp[];
  depts: Dept[];
  selectedEmp: Emp;

  index: number;

  constructor(
    private deptService: DeptService,
    private empService: EmpHttpService
  ) { }

  ngOnInit() {
    this.deptService.get().subscribe(data => {
      this.depts = data;
    });

    this.empService.get().subscribe(data => {
      this.emps = data;
    });
  }

  onSelect(emp : Emp, i: number): void {
    this.openForm = "Y";
    this.selectedEmp = emp;
    this.index = i;
   
    
  }

  btnCancel_click() : void {
    this.openForm = "N";
  }  

  remove(id: number) {
    this.empService.remove(id).subscribe(() => this.emps.splice(this.index, 1));
    this.openForm = "N";
  }

  update(form: NgForm) {    
    let emp = Object.assign({ id: this.selectedEmp.id }, form.value);
    this.empService.update(emp).subscribe(() => this.emps[this.index]=emp);
    
    this.openForm = "N";
  }
}
