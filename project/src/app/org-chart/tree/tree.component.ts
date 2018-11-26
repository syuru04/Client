import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent {
  @Input('key') key: string;
  @Input('data') items: object[];
}
