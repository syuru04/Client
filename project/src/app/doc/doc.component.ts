import { Component, OnInit } from '@angular/core';

import { Doc } from './doc.model';
import { DocHttpService} from './doc-http.service';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.css']
})
export class DocComponent implements OnInit {

  docs: Doc[];

  constructor(private docService: DocHttpService) { }

  ngOnInit() {
    this.docService.get().subscribe(data => {
      this.docs = data;
    });
  }

}
