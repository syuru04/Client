import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { NewDocHttpService } from './new-doc-http.service';
import { NewDoc } from './new-doc.model';
import { Doc } from '../doc.model';

@Component({
  selector: 'app-new-doc',
  templateUrl: './new-doc.component.html',
  styleUrls: ['./new-doc.component.css']
})
export class NewDocComponent implements OnInit {

  @Output() outputProperty: EventEmitter<any> = new EventEmitter();
  @Input() id: number;

  appr: NewDoc;
  doc: Doc;
  docs: Doc[];

  lev1Dept: string;
  lev1Chief: number;
  lev1Name: string;
  lev2Dept: string;
  lev2Chief: number;
  lev2Name: string;
  lev3Dept: string;
  lev3Chief: number;
  lev3Name: string;

  ts: string;
  author: number;

  constructor(private newDocService: NewDocHttpService) { }


  ngOnInit() {    
    const sessionValue = JSON.parse(sessionStorage.getItem('loginData'));

    this.newDocService.getUpinfo(sessionValue.deptId).subscribe(data => {
      this.lev1Dept = data.lev1Dept,
      this.lev1Chief = data.lev1Chief,
      this.lev1Name = data.lev1Name

      this.lev2Dept = data.lev2Dept,
      this.lev2Chief = data.lev2Chief,
      this.lev2Name = data.lev2Name

      this.lev3Dept = data.lev3Dept,
      this.lev3Chief = data.lev3Chief,
      this.lev3Name = data.lev3Name
    });

    this.author = sessionValue.id;
    var datePipe = new DatePipe("en-US");
    var date2 = datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    this.ts = date2;
    
    if (this.id != undefined) {
      this.newDocService.getDetail(this.id).subscribe(data => {
        this.doc = data;
      });
    }     
  }

  f_action(form: NgForm) {
    const docForm = form.value;    
    this.newDocService.add(docForm).subscribe(doc => {
      this.outputProperty.next({docProc:'list'});    
      form.reset();
    });
  }

  cancel(form: NgForm): void {
    form.reset();
    this.outputProperty.next({docProc:'list'});
  }

}
