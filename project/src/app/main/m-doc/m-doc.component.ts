import { Component, OnInit } from '@angular/core';
import { Doc } from 'src/app/doc/doc.model';
import { MDocHttpService } from './m-doc-http.service';

@Component({
  selector: 'app-m-doc',
  templateUrl: './m-doc.component.html',
  styleUrls: ['./m-doc.component.css']
})
export class MDocComponent implements OnInit {
  docs : Doc[]
  constructor(private docService: MDocHttpService) { }

  ngOnInit() {
    this.docService.get().subscribe(data => {
      this.docs = data;
    });
    // this.docService.pageRange(0,5).subscribe(data => {
    //   this.docs = data;
    // });
  }

}
