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
  depts: Dept[];       // 조직도 데이터
  dept: Dept;          // 선택한 부서
  emps: Emp[];         // 선택한 부서 직원 목록
  renaming: boolean;   // 선택한 부서 이름 바꾸는 중
  adding: boolean;     // 새로 만들 부서 이름을 넣는 중
  addSup: Dept;        // 새로 만들 부서의 상위 부서

  ngOnInit() {
    this.get();
  }

  // 조직도 구성
  get(): void {
    this.orgHttp.get().subscribe(org => {
      this.depts = [org];  // 조직도 데이터
      this.getEmps(org);  // 전체 직원 목록 가져오기
    });
  }

  // 선택한 부서 직원 목록 가져오기
  getEmps(d: Dept): void {
    this.orgHttp.getMembers(d.id).subscribe(emps => {
      this.dept = d;     // 클릭하여 선택한 부서
      this.emps = emps;  // 선택한 부서와 하위 부서 직원 목록
    });
  }

  // 부서의 리더로 임명 (리더로 임명된 직원)
  appoint(emp: Emp): void {
    if (emp.id != this.dept.chief) {
      const id = this.dept.id;   // 부서 id
      this.orgHttp.update({ id, chief: emp.id } as Dept).subscribe(() => {
        this.dept.chief = emp.id;        // 리더 id
        this.dept.chiefName = emp.name;  // 리더 이름
      });
    }
  }

  // 부서장 해임
  relieve(): void {
    if (this.dept.chief) {
      this.orgHttp.update({id: this.dept.id, chief: -1} as Dept).subscribe(() => {
        this.dept.chief = 0;
        this.dept.chiefName = "";
      });
    }
  }

  // 직원 부서 이동 -- 드래그
  drag(e): void {
    e.stopPropagation();
    e.dataTransfer.setData("id", e.target.id);
    e.dataTransfer.effectAllowed = "move";
  }

  // 직원 부서 이동 실행 (직원 id, 이동 후 부서, 직원 테이블의 직원 줄 노드)
  transfer(id: number, toDept: Dept, node): void {
    if (this.dept != toDept) {
      this.empHttp.update({id, deptId: toDept.id} as Emp).subscribe(() => {
        const emp = this.emps.find(e => e.id == id);  // 이동하는 직원
        emp.deptId = toDept.id;                // 새 소속 부서
        if (!this.isSub(this.dept, toDept)) {  // 하위 부서로 안가는가?
          node.remove();                       // 화면에서 지운다
          this.deleteFromEmps(id);             // 데이터에서 제거한다
        }
      });
    }
  }

  // 부서 조직 구조 변경 (이동하는 부서 id, 새 상위 부서)
  moveDept(id: number, o: Dept): void {
    this.orgHttp.update({id, upId: o.id} as Dept).subscribe(() => {
      o.sub.push(this.deleteFromDepts(id)[0]);
    });  // 이동하는 부서를 전 소속에서 제거하고 새 상위 부서에 등록한다
  }

  // 폐쇄할 부서를 제거한다
  deleteDept() {
    this.orgHttp.remove(this.dept.id).subscribe(() => {
      this.getEmps(this.deleteFromDepts(this.dept.id)[1]);
    });  // 폐쇄 부서를 제거하고 그 상위 부서 직원 목록을 가져온다
  }

  // 새로 만들 부서 이름 입력 창을 보인다 (상위 부서)
  addDept(d: Dept): void {
    this.addSup = d;     // 새로 만들 부서의 상위 부서
    this.adding = true;  // 새로 만들 부서 이름 입력 중
  }

  // 입력된 이름으로 새 부서를 만든다 (입력 창에서 Enter 키를 누른 이벤트)
  add(e): void {
    const newDept = { name: e.target.value, upId: this.addSup.id } as Dept;
    this.orgHttp.insert(newDept).subscribe(id => {
      newDept.id = id;                // 새로 만든 부서 id
      this.addSup.sub.push(newDept);  // 상위 부서에 하위 부서로 등록한다
      this.adding = false;            // 입력 창을 닫는다
    });
  }

  // 부서 이름 변경 (입력 창에서 Enter 키를 누른 이벤트)
  rename(e): void {
    const name = e.target.value;  // 새로 입력한 부서 이름
    this.orgHttp.update({id: this.dept.id, name} as Dept).subscribe(() => {
      this.dept.name = name;      // 부서 이름을 바꾸어 넣는다
      this.renaming = false;      // 입력 창을 닫는다
    });
  }

  // 사원 제거 (제거 버튼 이벤트, 사원 id)
  deleteEmp(e, id): void {
    this.empHttp.remove(id).subscribe(() => {
      e.target.parentNode.remove();  // 화면에서 지운다
      this.deleteFromEmps(id);       // 데이터에서 제거한다
    });
  }

  // 직원 목록 데이터에서 제거한다 (직원 id)
  deleteFromEmps(id: number): void {
    this.emps.splice(this.emps.findIndex(e => e.id == id), 1);
  }

  // 부서를 제거한다 (제거할 부서 id) --> [제거된 부서, 상위 부서]
  deleteFromDepts(id: number): Dept[] {
    return this.deleteFrom(this.depts[0], id);
  }

  // 부서를 제거한다 (부서 id) --> [제거된 부서, 상위 부서]
  private deleteFrom(sup: Dept, id: number): Dept[] {
    let i = 0;
    for (let d of sup.sub) {
      if (d.id == id) return [sup.sub.splice(i, 1)[0], sup];
      const ds = this.deleteFrom(d, id);
      if (ds) return ds;
      i++;
    }
    return null;
  }

  // sub가 sup의 하위 부서인가?
  private isSub(sup: Dept, sub: Dept): boolean {
    for (let d of sup.sub) {
      if (d == sub || this.isSub(d, sub)) return true;
    }
    return false;
  }
}