import { Component, Input, Output, EventEmitter } from '@angular/core';
import { OrgHttpService } from '../org-http.service';
import { Dept } from '../../Dept/dept.model';
import { Org } from '../org-chart.model';

@Component({
  selector: 'ui-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent {
  constructor(private service: OrgHttpService) {}
  @Input() org: Org;
  @Input() orgs: Org[];
  @Output() orgMove = new EventEmitter<{id: number, o: Org}>();

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
      this.orgMove.emit({id, o});
      e.target.getElementsByTagName("UL")[0].appendChild(node);
    }
  }

  allow(e) {
    e.stopPropagation();
    e.preventDefault();
  }
}