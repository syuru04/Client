import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/note/note.model';
import { MNoteService } from './m-note-http.service';

@Component({
  selector: 'app-m-note',
  templateUrl: './m-note.component.html',
  styleUrls: ['./m-note.component.css']
})
export class MNoteComponent implements OnInit {
  notes: Note[];
  constructor(private service: MNoteService) { }
  
  ngOnInit() {
    this.service.pageRange(0,5).subscribe(data => {
      this.notes = data;
    });
  }
}
