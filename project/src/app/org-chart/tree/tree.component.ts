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
  }

  allow(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  drop(e, o) {
    e.stopPropagation();
    e.preventDefault();
    const nodeId = e.dataTransfer.getData("id");
    const node = document.getElementById(nodeId);
    const id = nodeId.substr(2) as number;
    if (nodeId[0] == 'e') {
      this.parent.transfer(id, o, node);
    } else if (!node.contains(e.target)) {
      this.parent.moveDept(id, o, node, e.target.lastChild.lastChild);
    }
  }

  click(e, o) {
    e.stopPropagation();
    e.preventDefault();
    this.parent.getEmps(o);
  }
}