import { Component, Input, Output, EventEmitter } from '@angular/core';
import { OrgChartComponent } from '../org-chart.component'
import { Dept } from '../../Dept/dept.model';

@Component({
  selector: 'ui-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent {
  constructor(private parent: OrgChartComponent) {}
  @Input() depts: Dept[];

  drag(e): void {
    e.stopPropagation();
    e.dataTransfer.setData("id", e.target.id);
    e.dataTransfer.effectAllowed = "move"; 
  }

  allow(e): void {
    e.stopPropagation();
    e.preventDefault();
  }

  // 받는다 (이벤트, 받는 부서)
  drop(e, d: Dept): void {
    e.stopPropagation();
    const nodeId = e.dataTransfer.getData("id");
    const node = document.getElementById(nodeId);  // 움직이는 노드
    const id = nodeId.substr(2) as number;   // 부서 id
    if (nodeId[0] == 'e') {                  // 직원을 끌어왔나?
      e.preventDefault();
      this.parent.transfer(id, d, node);     // 직원 부서 이동
    } else if (!node.contains(e.target)) {   // 하위 부서로 안가는가?
      e.preventDefault();
      this.parent.moveDept(id, d);           // 부서 조직 변경
    }
  }

  // 클릭한 부서의 직원 목록을 만든다
  click(e, d: Dept): void {
    e.stopPropagation();
    this.parent.getEmps(d);
  }

  // 부서를 새로 만든다
  addDept(e, d: Dept): void {
    e.stopPropagation();
    this.parent.addDept(d);
  }
}