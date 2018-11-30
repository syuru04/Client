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
  orgs: Dept[];        // 조직도
  dept: Dept;          // 선택한 부서
  emps: Emp[];         // 선택한 부서 직원 목록
  renaming: boolean;   // 선택한 부서 이름 바꾸는 중
  adding: boolean;     // 새 부서 이름 넣는 중
  addSup: Dept;        // 새 부서의 상위 부서

  ngOnInit() {
    this.get();
  }

  // 조직도 구성
  get(): void {
    this.orgHttp.get().subscribe(org => {
      this.orgs = [org];
      this.getEmps(this.orgs[0]);
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
    e.dataTransfer.effectAllowed = "move";
  }

  // 직원 부서 이동 실행
  transfer(id: number, toDept: Dept, node): void {
    if (this.dept != toDept) {
      this.empHttp.update({id, deptId: toDept.id} as Emp).subscribe(() => {
        const emp = this.emps.find(e => e.id == id);
        emp.deptId = toDept.id;
        if (!this.isSub(this.dept, toDept)) {
          node.remove();
          this.deleteFromEmps(id);
        }
      });
    }
  }

  // 부서 조직 구조 변경
  moveDept(id: number, o: Dept): void {
    this.orgHttp.update({id, upId: o.id} as Dept).subscribe(() => {
      o.sub.push(this.deleteFromDepts(id)[0]);
    });
  }

  // 부서 제거
  deleteDept() {
    this.orgHttp.remove(this.dept.id).subscribe(() => {
      this.getEmps(this.deleteFromDepts(this.dept.id)[1]);
    });
  }

  addDept(o: Dept) {
    this.addSup = o;
    this.adding = true;
    // document.getElementById("add").focus();
  }

  add(e) {
    const newDept = { name: e.target.value, upId: this.addSup.id } as Dept;
    this.orgHttp.insert(newDept).subscribe(() => {
      this.addSup.sub.push(newDept);
    });
  }
  
  rename(e) {
    this.renaming = false;
    const name = e.target.value; 
    this.orgHttp.update({id: this.dept.id, name} as Dept).subscribe(() => {
      this.dept.name = name;
    });
  }

  // 사원 제거 (제거 버튼 이벤트, 사원 id)
  deleteEmp(e, id) {
    this.empHttp.remove(id).subscribe(() => {
      e.target.parentNode.remove();
      this.deleteFromEmps(id);
    });
  }

  deleteFromDepts(id: number): Dept[] {
    return this.deleteFrom(this.orgs[0], id);
  }

  deleteFromEmps(id: number): void {
    const i = this.emps.findIndex(e => e.id == id);
    this.emps.splice(i, 1);
  }

  // sup의 하위 부서에서 부서 id를 찾아 제거하고 그것을 넘긴다
  private deleteFrom(sup: Dept, id: number): Dept[] {
    let i = 0;
    for (let d of sup.sub) {
      let o: Dept[];
      if (d.id == id) return (o = sup.sub.splice(i, 1)).push(sup), o;
      if (o = this.deleteFrom(d, id)) return o;
      i++;
    }
    return null;
  }

  // sub이 sup의 하위 부서인가?
  private isSub(sup: Dept, sub: Dept): boolean {
    for (let d of sup.sub) {
      if (d == sub || this.isSub(d, sub)) return true;
    }
    return false;
  }
}