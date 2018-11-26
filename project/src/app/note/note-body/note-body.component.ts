import { Component, OnInit, Input } from '@angular/core';
import { NoteService } from '../note-http.service';
import { Note } from './note-body.model';
import { NoteComponent } from '../note.component';

@Component({
  selector: 'app-note-body',
  templateUrl: './note-body.component.html',
  styleUrls: ['./note-body.component.css']
})

export class NoteBodyComponent implements OnInit {
  
  id: Number;
  constructor(private noteService: NoteService) {
  }
  notes: Note[];
  
  ngOnInit() {
    
  }
}
