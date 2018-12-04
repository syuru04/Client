import { Component, OnInit, Input } from '@angular/core';

import { Doc } from './model/doc.model';
import { DocHttpService} from './doc-http.service';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.css']
})
export class DocComponent implements OnInit {

  docs: Doc[];
  doc: Doc;
  id: number;
  updateId : number;
  docProc: string;  // list, ins, mod

  constructor(private docService: DocHttpService) { }

  ngOnInit() {
    this.docProc = 'list';
    this.docService.get().subscribe(data => {
      this.docs = data;
    });

    // 세션값 가져오기
    const sessionValue = JSON.parse(sessionStorage.getItem('loginData'));
    this.id = sessionValue.id;        
  }

  receive(data):void {
    this.docProc = data.docProc
  }
  
  new(): void {
    this.docProc = 'ins';
    this.updateId = undefined;
  }

  detail(updateId:number): void {
    this.updateId = updateId;
    this.docProc = 'detail';
  }
}
