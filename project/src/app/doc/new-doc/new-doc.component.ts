import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { NewDocHttpService } from './new-doc-http.service';
import { DocHttpService } from '../doc-http.service';
import { Doc } from '../model/doc.model';
import { Approver } from '../model/approver.model';
import { DocAppr } from '../model/doc-appr.model';

@Component({
  selector: 'app-new-doc',
  templateUrl: './new-doc.component.html',
  styleUrls: ['./new-doc.component.css']
})
export class NewDocComponent implements OnInit {

  @Output() outputProperty: EventEmitter<any> = new EventEmitter();
  @Input() updateId: number;

  doc: Doc;
  docs: Doc[];

  lev1Dept: string;   lev1Chief: number;    lev1Name: string;
  lev2Dept: string;   lev2Chief: number;    lev2Name: string;
  lev3Dept: string;   lev3Chief: number;    lev3Name: string;

  ts: string;
  author: number;
  docProc: string;
  docId: number;

  chief1: number;     chief2: number;       chief3: number;

  constructor(
    private newDocService: NewDocHttpService,
    private docService: DocHttpService
    ) { }


  ngOnInit() {    
    const sessionValue = JSON.parse(sessionStorage.getItem('loginData'));

    this.newDocService.getUpinfo(sessionValue.deptId).subscribe(data => {
      this.lev1Dept = data.lev1Dept,
      this.lev1Chief = data.lev1Chief,
      this.lev1Name = data.lev1Name,
      this.lev2Dept = data.lev2Dept,
      this.lev2Chief = data.lev2Chief,
      this.lev2Name = data.lev2Name,
      this.lev3Dept = data.lev3Dept,
      this.lev3Chief = data.lev3Chief,
      this.lev3Name = data.lev3Name,
      this.chief1 = data.lev1Chief
    });

    this.author = sessionValue.id;
    var datePipe = new DatePipe("en-US");
    var date2 = datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    this.ts = date2;
    
    if (this.updateId != undefined) {
      this.docService.getDetail(this.updateId).subscribe(data => {
        this.doc = data;
        this.docProc = 'detail';
      });
    }   
  }

  f_action(form: NgForm) {

    // 수정시 데이터 가져오기
    if(this.docProc=='detail') {
      this.newDocService.update(form.value).subscribe(doc => {
        this.outputProperty.next({docProc:'list'});  
      }); 
      
    // 등록
    } else {
      const doc = Object.assign({ done: false }, form.value);          
      this.newDocService.add(doc).subscribe(result => {        
        this.docId = result;
        
        // approve: 결재자저장          
        this.appr_lev1();

        if(this.chief2!=0) {
          this.appr_lev2();
        }

        if(this.chief3!=0) {
          this.appr_lev3();
        }

        this.outputProperty.next({docProc:'list'});  
        window.location.reload();   
      }); 
    }     
  }

  cancel(form: NgForm): void {
    this.outputProperty.next({docProc:'list'});
  }

  private appr_lev1(): void {
    const appr = { docId:this.docId, approver:this.chief1, ts:this.ts} as Approver;    
    this.newDocService.addAppr(appr).subscribe(data => {  
    });
  }

  private appr_lev2(): void {
    const appr = { docId:this.docId, approver:this.chief2, ts:this.ts} as Approver;    
    this.newDocService.addAppr(appr).subscribe(data => {});
  }

  private appr_lev3(): void {
    const appr = { docId:this.docId, approver:this.chief3, ts:this.ts} as Approver;    
    this.newDocService.addAppr(appr).subscribe(data => {});
  }

  rdo1Click(lev1Chief) {
    this.chief1 = lev1Chief;
    this.chief2 = 0;
    this.chief3 = 0;
  }

  rdo2Click(lev1Chief,lev2Chief) {
    this.chief1 = lev1Chief;
    this.chief2 = lev2Chief;
    this.chief3 = 0;
  }

  rdo3Click(lev1Chief,lev2Chief,lev3Chief) {
    this.chief1 = lev1Chief;
    this.chief2 = lev2Chief;
    this.chief3 = lev3Chief
    ;
  }


}
