import { Component, Input, Output, EventEmitter } from '@angular/core';
import { OrgHttpService } from '../org-http.service';
import { Dept } from '../../Dept/dept.model';
import { OrgChartComponent } from '../org-chart.component'

@Component({
  selector: 'ui-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent {
  constructor(private service: OrgHttpService, private parent: OrgChartComponent) {}
  @Input() orgs: Dept[];
  @Output() onOrgMove = new EventEmitter<{id: number, o: Dept}>();

  drag(e) {
    e.stopPropagation();
    e.dataTransfer.setData("id", e.target.id);
  }

  drop(e, o) {
    e.stopPropagation();
    let id = e.dataTransfer.getData("id");
    var node = document.getElementById(id);
    if (!node.contains(e.target)) {
      e.preventDefault();
      this.service.update({id, upId: e.target.id} as Dept).subscribe(() => 0);
      this.onOrgMove.emit({id, o});
      e.target.getElementsByTagName("UL")[0].appendChild(node);
    }
  }

  allow(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  click(e,o) {
    e.stopPropagation();
    e.preventDefault();
    this.parent.listMembers(o);
  }
}