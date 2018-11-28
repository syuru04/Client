import { Component, OnInit } from '@angular/core';
import { OrgHttpService } from './org-http.service';
import { EmpHttpService } from '../emp/emp-http.service';
import { Dept } from './Dept.model';
import { Emp } from '../emp/emp.model';

@Component({
  selector: 'app-org-chart',
  templateUrl: './org-chart.component.html',
  styleUrls: ['./org-chart.component.css']
})
export class OrgChartComponent implements OnInit {
  constructor(private orgHttp: OrgHttpService,
              private empHttp: EmpHttpService) {}
  orgs: Dept[];  // 조직도
  dept: Dept;    // 선택한 부서
  emps: Emp[];   // 선택한 부서 직원 목록

  ngOnInit() {
    this.get();
  }

  get(): void {
    this.orgHttp.get().subscribe(org => {
      this.orgs = [org];
      this.getEmps(org);
    });
  }

  moveDept(id: number, o: Dept): void {
     o.sub.push(OrgChartComponent.removeFrom(this.orgs[0], id));
  }
  //     target.appendChild(node);
  //   });    
  // }

    // moveDept(id: number, o: Dept, node, target): void {
  //   this.orgHttp.update({id, upId: o.id} as Dept).subscribe(() => {
  //     o.sub.push(OrgChartComponent.removeFrom(this.orgs[0], id));
  //     target.appendChild(node);
  //   });    
  // }

  private static removeFrom(o: Dept, id: number): Dept {
    let i = o.sub.findIndex(p => p.id == id);
    if (0 <= i) {
      return o.sub.splice(i, 1)[0];
    }
    for (let s of o.sub) {
      if (s = this.removeFrom(s, id)) return s;
    }
    return null;
  }

  getEmps(o: Dept) {
     this.orgHttp.getMembers(o.id).subscribe(emps => {
      this.dept = o;
      this.emps = emps;
    });
  }

  appoint(emp: Emp) {
    if (emp.id != this.dept.chief) {
      this.orgHttp.update({id: this.dept.id, chief: emp.id} as Dept).subscribe(() => {
        this.dept.chief = emp.id;
        this.dept.chiefName = emp.name;
      });
    }
  }

  relieve() {
    if (this.dept.chief) {
      this.orgHttp.update({id: this.dept.id, chief: -1} as Dept).subscribe(() => {
        this.dept.chief = 0;
        this.dept.chiefName = "";
      });
    }
  }

  drag(e) {
    e.stopPropagation();
    e.dataTransfer.setData("id", e.target.id);
  }

  transfer(id: number, toDept: Dept, node): void {
    if (this.dept != toDept) {
      this.empHttp.update({id, deptId: toDept.id} as Emp).subscribe(() => {
        const emp = this.emps.find(e => e.id == id);
        emp.deptId = toDept.id;
        if (!OrgChartComponent.isSub(this.dept, toDept)) {
          node.remove();
        }
      });
    }
  }

  private static isSub(x: Dept, y: Dept): boolean {
    for (let z of x.sub) {
      if (z == y) return true;
      const u = this.isSub(z, y);
      if (u) return true;
    }
    return false;
  }
}