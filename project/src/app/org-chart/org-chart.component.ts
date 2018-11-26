import { Component, OnInit } from '@angular/core';
import { OrgChartService } from './org-chart-http.service';
import { Org } from './org-chart.model';

@Component({
  selector: 'app-org-chart',
  templateUrl: './org-chart.component.html',
  styleUrls: ['./org-chart.component.css']
})
export class OrgChartComponent implements OnInit {
  orgs: Org[];
  org: Org;

  ngOnInit() { 
    this.service.get().subscribe(org => this.orgs = [this.org = org]);
  }
  constructor(private service: OrgChartService) {}
}