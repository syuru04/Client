import { Component, OnInit, Input } from '@angular/core';

import { Doc } from './doc.model';
import { DocHttpService} from './doc-http.service';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.css']
})
export class DocComponent implements OnInit {

  docs: Doc[];

  id:number;

  constructor(private docService: DocHttpService) { }

  ngOnInit() {
    this.docService.get().subscribe(data => {
      this.docs = data;
    });

    // 세션값 가져오기
    const sessionValue = JSON.parse(sessionStorage.getItem('loginData'));
    this.id = sessionValue.id;    
    console.log('session ID : '+this.id);
    
  }
}
