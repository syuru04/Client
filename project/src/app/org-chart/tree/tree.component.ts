import { Component, Input, Output, EventEmitter } from '@angular/core';
import { OrgChartComponent } from '../org-chart.component'
import { OrgHttpService } from '../org-http.service';
import { Dept } from '../../Dept/dept.model';

@Component({
  selector: 'ui-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent {
  constructor(private orgHttp: OrgHttpService,
              private parent: OrgChartComponent) {}
  @Input() orgs: Dept[];

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
      if (id[0] == 'm') {
        this.parent.transfer(id.substr(2), o, node);
      } else {
        this.orgHttp.update({id, upId: o.id} as Dept).subscribe(() => {
          this.parent.moveDept(id, o);
          e.target.getElementsByTagName("UL")[0].appendChild(node);
        });
  // moveDept(id: number, o: Dept, node, target): void {
  //   this.orgHttp.update({id, upId: o.id} as Dept).subscribe(() => {
  //     o.sub.push(OrgChartComponent.removeFrom(this.orgs[0], id));
  //     target.appendChild(node);
  //   });    
  // }

        // this.parent.moveDept(id, o, node, e.target.getElementsByTagName("UL")[0]);
      }
    }
  }

  allow(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  click(e,o) {
    e.stopPropagation();
    e.preventDefault();
    this.parent.getEmps(o);
  }
}