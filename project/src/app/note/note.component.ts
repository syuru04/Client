import { Component, OnInit, } from '@angular/core';

import { Note } from './note.model';
import { NoteService } from './note-http.service';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})

export class NoteComponent implements OnInit {

  BodyFormYn = "N";

  notes: Note[];
  note:Note;
  constructor(private service: NoteService) { }

  ngOnInit() {
    this.service.get().subscribe(data => {
      this.notes = data;
    });
  }
  btnListClick() :void{
    this.BodyFormYn="N"
  }
  btnTitleClick(id): void {

    this.BodyFormYn="Y";
    this.service.get2(id).subscribe(data =>this.note = data);
  }
}

