import { Component, OnInit } from '@angular/core';

import { DeptService } from './dept-http.service';
import { Dept } from './dept.model';

@Component({
  selector: 'app-dept',
  templateUrl: './dept.component.html',
  styleUrls: ['./dept.component.css']
})
export class DeptComponent implements OnInit {
  newFormYn="N";
  newBtnCloseYn="N";

  depts: Dept[];

  constructor(private deptService: DeptService) { 
    
  }

  ngOnInit() { 
    this.deptService.get().subscribe(response => {
      this.depts = response.data as Dept[];
    });
  } 

  btnNew_click() : void {
    this.newFormYn="Y";
    this.newBtnCloseYn = "Y";
  }

  btnCancel_click() : void {
    this.newFormYn="N";
    this.newBtnCloseYn = "N";
  }
}
