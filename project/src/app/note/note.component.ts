import { Component, OnInit ,Output ,EventEmitter } from '@angular/core';

import { Note } from './note.model';
import { NoteService } from './note-http.service';
import { NoteBodyComponent} from './note-body/note-body.component';



@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})

export class NoteComponent implements OnInit {    
  notes: Note[];
  constructor(private noteService: NoteService) { }  
  id : Number;  
  btnTitle_click(id: Number) {    
    this.id = id;        
    console.log(id);    
  }
  ngOnInit() {
    this.noteService.get("").subscribe(data => {
      this.notes = data;      
    });
  }  
}

