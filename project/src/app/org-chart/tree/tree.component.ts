import { Component, Input } from '@angular/core';
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
}