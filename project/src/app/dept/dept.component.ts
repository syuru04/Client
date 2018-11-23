import { Component, OnInit } from '@angular/core';
import { DeptService } from './dept-http.service';
import { Dept } from './dept.model';

@Component({
  selector: 'app-dept',
  templateUrl: './dept.component.html',
  styleUrls: ['./dept.component.css']
})
export class DeptComponent implements OnInit {
  // newFormYn="N";
  // newBtnCloseYn="N";

  newMode = "N";
  updateMode = "N";
  openForm = "N";

  depts: Dept[];
  selectedDept: Dept;

  constructor(private deptService: DeptService) { 
    
  }

  ngOnInit() { 
    this.deptService.get().subscribe(data => {
      this.depts = data;
    });
  } 

  btnNew_click() : void {
    this.openForm = "Y";
    this.newMode = "Y";
  }

  btnCancel_click() : void {
    this.openForm = "N";
    this.newMode = "N";
    this.updateMode = "N";
  }  

  onSelect(dept : Dept): void {
    this.openForm = "Y";
    this.newMode = "N";
    this.updateMode = "Y";
    this.selectedDept = dept;
  }
}
