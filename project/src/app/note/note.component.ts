import { Component, OnInit } from '@angular/core';

import { Note } from './note.model';
import { NoteService } from './note-http.service';
import { NoteBodyComponent} from './note-body/note-body.component';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})

export class NoteComponent implements OnInit {
  newNoteYn="N";
  newBtnYn="Y";

  notes: Note[];

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.noteService.get().subscribe(data => {
      this.notes = data;
    });
  }

  btnNew_click() : void {
    this.newNoteYn="Y";
    this.newBtnYn = "N";
  }

  btnCancel_click() : void {
    this.newNoteYn="N";
    this.newBtnYn = "N";
  }

}

