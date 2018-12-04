import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DocHttpService } from '../doc-http.service';
import { DetailDocHttpService } from './detail-doc-http.service';
import { Doc } from '../model/doc.model';
import { DocApprDetail } from '../model/doc-appr-detail.model';

@Component({
  selector: 'app-detail-doc',
  templateUrl: './detail-doc.component.html',
  styleUrls: ['./detail-doc.component.css']
})
export class DetailDocComponent implements OnInit {

  @Output() outputProperty: EventEmitter<any> = new EventEmitter();
  @Input() updateId: number;

  doc: Doc;
  docProc: string;
  docApprs: DocApprDetail[];

  constructor(
    private detailDocService: DetailDocHttpService,
    private docService: DocHttpService) { }

  ngOnInit() {
    this.docService.getDetail(this.updateId).subscribe(data => {
      this.doc = data;      
    });

    this.detailDocService.getApproverList(this.updateId).subscribe(data => {
      console.log(data);
      this.docApprs = data;      
    });
  }

  docList() {
    this.outputProperty.next({docProc:'list'});  
  }

  mod(id:number): void {
    this.updateId = id;
    this.outputProperty.next({docProc:'mod'});  
  }

  remove(updateId:number): void {
    this.docProc = 'list';
    // 수정중
  }

     

}
