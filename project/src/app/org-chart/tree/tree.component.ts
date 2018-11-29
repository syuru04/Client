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
  @Input() orgs: Dept[];

  drag(e) {
    e.stopPropagation();
    e.dataTransfer.setData("id", e.target.id);
    e.dataTransfer.effectAllowed = "move"; 
  }

  allow(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  drop(e, o) {
    e.stopPropagation();
    const nodeId = e.dataTransfer.getData("id");
    const node = document.getElementById(nodeId);
    const id = nodeId.substr(2) as number;
    if (nodeId[0] == 'e') {
      e.preventDefault();
      this.parent.transfer(id, o, node);
    } else if (!node.contains(e.target)) {
      e.preventDefault();
      this.parent.moveDept(id, o);
    }
  }

  click(e, o) {
    e.stopPropagation();
    this.parent.getEmps(o);
  }

  addDept(e, o) {
    e.stopPropagation();
    this.parent.addDept(o);
  }
}