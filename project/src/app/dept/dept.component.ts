import { Component, OnInit } from '@angular/core';

import { DeptService } from './dept-http.service';
import { Dept } from './dept.model';

@Component({
  selector: 'app-dept',
  templateUrl: './dept.component.html',
  styleUrls: ['./dept.component.css']
})
export class DeptComponent implements OnInit {
  depts: Dept[];

  constructor(private deptService: DeptService) { }

  ngOnInit() { 
    this.deptService.get().subscribe(response => {
      this.depts = response.data as Dept[];
    });
  } 
}
