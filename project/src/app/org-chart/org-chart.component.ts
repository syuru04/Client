import { Component, OnInit } from '@angular/core';
import { OrgHttpService } from './org-http.service';
import { Dept } from './Dept.model';
import { Emp } from '../emp/emp.model';

@Component({
  selector: 'app-org-chart',
  templateUrl: './org-chart.component.html',
  styleUrls: ['./org-chart.component.css']
})
export class OrgChartComponent implements OnInit {
  constructor(private service: OrgHttpService) {}
  orgs: Dept[];
  emps: Emp[];
  dept: Dept;
  chief: Emp;

  get(): void {
    this.service.get().subscribe(org => {
      this.orgs = [org];
      this.listMembers(org);
    });
  }

  ngOnInit() {
    this.get();
  }

  orgChange({id, o}): void {
    o.sub.push(OrgChartComponent.removeFrom(this.orgs[0], id));
  }

  private static removeFrom(o: Dept, id: number): Dept {
    let i = o.sub.findIndex(p => p.id == id);
    if (i < 0) {
      return o.sub.splice(i, 1)[0];
    }
    for (let s of o.sub) {
      if (s = this.removeFrom(s, id)) return s;
    }
    return null;
  }

  listMembers(o: Dept) {
     this.service.getMembers(o.id).subscribe(emps => {
      this.dept = o;
      this.emps = emps;
      this.chief = o.chief ? emps.find(e => e.id == o.chief) : null;
      if (!this.chief) {
        this.chief = emps.length ? { name: "", id: 0 } as Emp : null;
      }
    });
  }
  
  appoint(e) {

  }

  relieve(e) {

    // this.service.update({ id, chief } as Dept).subscribe(org => {
    //   this.orgs = [org];
    //   this.listMembers(org);
    // });
  }

  drag(e) {
    e.stopPropagation();
    e.dataTransfer.setData("id", e.target.id);
  }

  allow(e) {
    e.stopPropagation();
    e.preventDefault();
  }
}