import { Component, Input } from '@angular/core';
import { Org } from '../org-chart.model';

@Component({
  selector: 'ui-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent {
  @Input() orgs: Org[];
}