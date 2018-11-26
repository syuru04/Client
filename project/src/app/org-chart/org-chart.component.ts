import { Component, OnInit } from '@angular/core';
import { OrgChartService } from './org-chart-http.service';
import { Org } from './org-chart.model';

@Component({
  selector: 'app-org-chart',
  templateUrl: './org-chart.component.html',
  styleUrls: ['./org-chart.component.css']
})
export class OrgChartComponent implements OnInit {
  org: Org;
  key: string = 'sub';
  data: Array<Org> = [this.org];
  
  constructor(private service: OrgChartService) {}

  ngOnInit() { 
    this.service.get().subscribe(data => this.org = data);


  } 
}