import { Component, Input } from '@angular/core';
import { Org } from '../org-chart.model';

@Component({
  selector: 'ui-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent {
  @Input() orgs: Org[];
  @Input() org: Org;

  drag(o, e) {
    e.stopPropagation();
    console.log("drag",o,e);
    e.dataTransfer.setData("text", e.target);
  }

  drop(o, e) {
    e.preventDefault();
    var data = e.dataTransfer.getData("text");
    console.log("drop", data, o, e);
    e.target.appendChild(data);
  }

  allow(o, e) {
    e.preventDefault();
    var data = e.dataTransfer.getData("text");
    console.log("allow","("+data+")", o,e);
  }
}