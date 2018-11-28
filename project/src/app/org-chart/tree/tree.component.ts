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
    let id = e.dataTransfer.getData("id");
    var node = document.getElementById(id);
    if (!node.contains(e.target)) {
      e.preventDefault();
      if (id[0] == 'm') {
        this.parent.transfer(id.substr(2), o, node);
      } else {
        this.parent.moveDept(id, o, node, e.target.getElementsByTagName("UL")[0]);
      }
    }
  }

  click(e,o) {
    e.stopPropagation();
    e.preventDefault();
    this.parent.getEmps(o);
  }
}