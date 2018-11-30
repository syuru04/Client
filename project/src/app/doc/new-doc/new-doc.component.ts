import { Component, OnInit } from '@angular/core';

import { NewDocHttpService } from './new-doc-http.service';
import { NewDoc } from './new-doc.model';

@Component({
  selector: 'app-new-doc',
  templateUrl: './new-doc.component.html',
  styleUrls: ['./new-doc.component.css']
})
export class NewDocComponent implements OnInit {

  appr: NewDoc;
  lev1Dept: string;
  lev1Chief: number;
  lev1Name: string;
  lev2Dept: string;
  lev2Chief: number;
  lev2Name: string;
  lev3Dept: string;
  lev3Chief: number;
  lev3Name: string;

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
  }

}
