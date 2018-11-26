import { Component, OnInit } from '@angular/core';
import { NoteComponent } from '../note.component'
@Component({
  selector: 'app-note-body',
  templateUrl: './note-body.component.html',
  styleUrls: ['./note-body.component.css']
})
export class NoteBodyComponent implements OnInit {
  newNoteYn="Y";
  newBtnYn="N";

  constructor() { }

  ngOnInit() {
  }

  btnCancel_click() : void {
    this.newNoteYn="N";
    this.newBtnYn ="Y";
  }

}
