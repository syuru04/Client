import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dept',
  templateUrl: './dept.component.html',
  styleUrls: ['./dept.component.css']
})
export class DeptComponent implements OnInit {
  depts: any = [
    { id:1, name:'개발부', chief:2, up_id:3},
    { id:10, name:'마케팅부', chief:20, up_id:30}
  ];

  newBtnClick = false;

  constructor() { }

  ngOnInit() { } 
}
