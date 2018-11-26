import { Component, OnInit } from '@angular/core';

import { EmpService } from './emp-http.service';
import { Emp } from './emp.model';

@Component({
  selector: 'app-emp',
  templateUrl: './emp.component.html',
  styleUrls: ['./emp.component.css']
})
export class EmpComponent implements OnInit {
  newFormYn="N";
  newBtnCloseYn="N";

  emps: Emp[];
  constructor(private empService: EmpService) { }

  ngOnInit() {
    this.empService.get().subscribe(data => {
      this.emps = data;
    });
  }

  updateInfo(): void {    
    this.newFormYn="Y";
    this.newBtnCloseYn = "Y";
  }

  btnCancel_click() : void {
    this.newFormYn="N";
    this.newBtnCloseYn = "N";
  }
}
