import { Component, OnInit } from '@angular/core';
import { OrgHttpService } from './org-http.service';
import { Org } from './org-chart.model';

@Component({
  selector: 'app-org-chart',
  templateUrl: './org-chart.component.html',
  styleUrls: ['./org-chart.component.css']
})
export class OrgChartComponent implements OnInit {
  orgs: Org[];

  constructor(private service: OrgHttpService) {}

  get(): void {
    this.service.get().subscribe(org => this.orgs = [org]);
  }

  ngOnInit() {
    this.get();
  }

  orgChange({id, o}): void {
    o.sub.push(OrgChartComponent.removeFrom(this.orgs[0], id));
    console.log("--------------");
    
  }

  private static removeFrom(o: Org, id: number): Org {
    let i = o.sub.findIndex(p => p.id == id);
    if (i < 0) {
      return o.sub.splice(i, 1)[0];
    }
    for (let s of o.sub) {
      if (s = this.removeFrom(s, id)) return s;
    }
    return null;
  }
}