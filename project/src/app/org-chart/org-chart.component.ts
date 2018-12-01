import { Component, OnInit } from '@angular/core';
import { DeptHttpService } from './dept-http.service';
import { EmpHttpService } from '../emp/emp-http.service';
import { Dept } from './Dept.model';
import { Emp } from '../emp/emp.model';

@Component({
  selector: 'app-org-chart',
  templateUrl: './org-chart.component.html',
  styleUrls: ['./org-chart.component.css']
})
export class OrgChartComponent implements OnInit {
  constructor(private deptHttp: DeptHttpService,
              private empHttp: EmpHttpService) {}
  
  private depts: Dept[];      // 조직도 root
  private dept: Dept;         // 부서
  private emps: Emp[];        // 부서 직원 목록
  private renaming: boolean;  // 부서 이름을 바꾸어 넣는 중
  private adding: boolean;    // 새로 만들 부서 이름을 넣는 중
  private toDept: Dept;       // 새로 만들 부서의 상위 부서
  private dragId: string;     // 끌려가는 노드 id

  ngOnInit() {
    this.deptHttp.get().subscribe(dept => {
      this.depts = [dept];  // 조직도 root
      this.setDept(dept);   // 부서를 root 부서로 초기화
    });
  }

  // 부서 선택 (조직도에서 클릭 이벤트, 클릭한 부서)
  private selectDept(e, dept: Dept): void {
    e.stopPropagation();
    this.setDept(dept);
  }

  // 부서를 넣고 부서 직원 목록을 읽어 넣는다 (부서)
  private setDept(dept: Dept): void {
    this.dept = dept;
    this.deptHttp.getMembers(dept.id).subscribe(emps => this.emps = emps);
  }

  // 부서 리더 임명 (임명할 직원)
  private appoint(emp: Emp): void {
    if (emp.id != this.dept.chief) {
      const id = this.dept.id;
      this.deptHttp.update({ id, chief: emp.id } as Dept).subscribe(() => {
        this.dept.chief = emp.id;
        this.dept.chiefName = emp.name;
      });
    }
  }

  // 부서 리더 해임
  private dismiss(): void {
    if (this.dept.chief) {
      const id = this.dept.id;
      this.deptHttp.update({ id, chief: -1 } as Dept).subscribe(() => {
        this.dept.chief = 0;
        this.dept.chiefName = "";
      });
    }
  }

  // 드래그 시작 (드래그 시작 이벤트)
  private drag(e): void {
    e.stopPropagation();
    this.dragId = e.target.id;  // 끌려가는 노드 id
    e.dataTransfer.effectAllowed = "move";
  }

  // 드래그 중 또는 드롭 (드롭인가?, 드래그 중/드롭 이벤트, 받는 부서)
  private drop(isDrop: boolean, e, dept: Dept): void {
    e.stopPropagation();
    const id = parseInt(this.dragId.substr(2));  // id: 직원 또는 부서
    if (this.dragId[0] == 'e') {    // 직원인가?
      if (this.dept != dept) {
        e.preventDefault();         // 직원이 이동할 곳은 다른 부서
        if (isDrop) {
          this.moveEmp(id, dept);   // 직원 부서 이동
        }
      }
    } else {  // 부서는 자기 부서 이하와 자기 상위 부서로는 들어가지 않는다
      const node = document.getElementById(this.dragId);
      if (!node.contains(e.target) && node.parentNode != e.target
             && node.parentNode.parentNode.parentNode != e.target) {
        e.preventDefault();
        if (isDrop) {
          this.moveDept(id, dept);  // 부서 조직 변경
        }
      }
    }
  }

  // 직원 부서 이동 (직원 id, 이동 후 부서)
  private moveEmp(id: number, dept: Dept): void {
    this.empHttp.update({id, deptId: dept.id} as Emp).subscribe(() => {
      this.emps.find(e => e.id == id).deptId = dept.id;  // 새 소속 부서
      if (!this.isSub(this.dept, dept)) {  // 하위 부서가 아닌 곳으로
        this.deleteFromEmps(id);           // 이동할 때는 이 부서에서 제거한다
      }
    });
  }

  // dept 부서가 sup 부서의 하위 부서인가?
  private isSub(sup: Dept, dept: Dept): boolean {
    for (let s of sup.sub) {
      if (s == dept || this.isSub(s, dept)) return true;
    }
    return false;
  }

  // 사원 제거 (클릭한 사원 id)
  private deleteEmp(id: number): void {
    this.empHttp.remove(id).subscribe(() => this.deleteFromEmps(id));
  }

  // 직원 목록 배열에서 제거한다 (직원 id)
  private deleteFromEmps(id: number): void {
    this.emps.splice(this.emps.findIndex(e => e.id == id), 1);
  }

  // 부서 조직 구조 변경 (이동하는 부서 id, 받는 부서)
  private moveDept(id: number, dept: Dept): void {
    this.deptHttp.update({ id, upId: dept.id } as Dept).subscribe(() => {
      this.insertOrdered(this.deleteFrom(id, this.depts[0])[0], dept);
      this.setDept(this.dept);  // 부서 직원 목록 배열을 다시 만든다
    });  // 이동하는 부서를 전 소속에서 제거하고 새 상위 부서에 등록한다
  }

  // 상위 부서에 부서 이름 순으로 넣는다 (넣을 부서, 상위 부서)
  private insertOrdered(d, dept): void {
    let i = 0;
    for (let s of dept.sub) {
      if (d.name.localeCompare(s.name) < 0) break;
      i++;
    }
    dept.sub.splice(i, 0, d);
  }

  // 폐쇄되는 부서를 제거한다
  private deleteDept(): void {
    this.deptHttp.delete(this.dept.id).subscribe(() => {
      this.setDept(this.deleteFrom(this.dept.id, this.depts[0])[1]);
    });  // 폐쇄되는 부서를 제거하고 그 상위 부서로 이동한다
  }

  // id로 부서를 찾아 제거한다 (id, 찾을 곳) --> [제거된 부서, 그 상위 부서]
  private deleteFrom(id: number, dept: Dept): Dept[] {
    let i = 0;
    for (let d of dept.sub) {
      if (d.id == id) return [dept.sub.splice(i, 1)[0], dept];
      const ds = this.deleteFrom(id, d);
      if (ds) return ds;
      i++;
    }
    return null;
  }

  // 새 부서 이름 입력 창을 연다 (새 부서를 받을 상위 부서)
  private addDept(e, dept: Dept): void {
    e.stopPropagation();
    this.toDept = dept;  // 새 부서를 받을 상위 부서
    this.adding = true;  // 새 부서 이름 입력 창을 연다
  }

  // 입력한 이름으로 새 부서를 만든다 (입력 창에서 Enter 키를 누른 이벤트)
  private add(e): void {
    const dept = { name: e.target.value, upId: this.toDept.id } as Dept;
    this.deptHttp.insert(dept).subscribe(id => {
      dept.id = id;
      dept.sub = [];
      this.adding = false;  // 입력 창을 닫는다
      this.insertOrdered(dept, this.toDept);
    });
  }

  // 부서 이름 변경 (입력 창에서 Enter 키를 누른 이벤트)
  private rename(e): void {
    const name = e.target.value;  // 새로 입력한 부서 이름
    this.deptHttp.update({id: this.dept.id, name} as Dept).subscribe(() => {
      this.dept.name = name;      // 부서 이름을 바꾸어 넣는다
      this.renaming = false;      // 입력 창을 닫는다
    });
  }
}