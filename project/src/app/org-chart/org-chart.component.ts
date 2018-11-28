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

  // 조직도 구성
  get(): void {
    this.orgHttp.get().subscribe(org => {
      this.orgs = [org];
      this.getEmps(org);
    });
  }

  // 선택한 부서 직원 목록 가져오기
  getEmps(o: Dept) {
    this.orgHttp.getMembers(o.id).subscribe(emps => {
      this.dept = o;
      this.emps = emps;
    });
  }

  // 부서장 임명
  appoint(emp: Emp) {
    if (emp.id != this.dept.chief) {
      const id = this.dept.id;
      this.orgHttp.update({ id, chief: emp.id } as Dept).subscribe(() => {
        this.dept.chief = emp.id;
        this.dept.chiefName = emp.name;
      });
    }
  }

  // 부서장 해임
  relieve() {
    if (this.dept.chief) {
      this.orgHttp.update({id: this.dept.id, chief: -1} as Dept).subscribe(() => {
        this.dept.chief = 0;
        this.dept.chiefName = "";
      });
    }
  }

  // 직원 부서 이동 -- 드래그
  drag(e) {
    e.stopPropagation();
    e.dataTransfer.setData("id", e.target.id);
  }

  // 직원 부서 이동 실행
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

  // 부서 조직 구조 변경
  moveDept(id: number, o: Dept, node, target): void {
    this.orgHttp.update({id, upId: o.id} as Dept).subscribe(() => {
      o.sub.push(OrgChartComponent.removeFrom(id, this.orgs[0]));
      target.appendChild(node);
    });
  }

  // o의 하위 부서들에서 부서 id를 찾아 그 부서를 제거하고 제거한 것을 넘긴다
  private static removeFrom(id: number, o: Dept): Dept {
    let i = 0;
    for (let s of o.sub) {
      if (s.id == id) return o.sub.splice(i, 1)[0];
      if (s = this.removeFrom(id, s)) return s;
      i++;
    }
    return null;
  }

  // x가 y의 상위 부서인가?
  private static isSub(x: Dept, y: Dept): boolean {
    for (let s of x.sub) {
      if (s == y || this.isSub(s, y)) return true;
    }
    return false;
  }

  // private static removeFrom(id: number, o: Dept): Dept {
  //   const i = o.sub.findIndex(s => s.id == id);
  //   if (0 <= i) {
  //     return o.sub.splice(i, 1)[0];
  //   }
  //   for (let s of o.sub) {
  //     if (s = this.removeFrom(id, s)) return s;
  //   }
  //   return null;
  // }
}