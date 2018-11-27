import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Note } from '../note.model';
import { NewNoteService } from './newnote-http.service';

@Component({
  selector: 'app-newnote',
  templateUrl: './newnote.component.html',
  styleUrls: ['./newnote.component.css']
})
export class NewnoteComponent implements OnInit {
 notes : Note[];
 note : Note;
 
  constructor(private service : NewNoteService) { }

  ngOnInit() {
    this.service.get().subscribe(data => {
    this.notes = data;
  });
  }

  add(form : NgForm) {    
      const note = Object.assign({ done: false }, form.value);
      note.title = note.title.trim();      
      this.service.add(note.title,note.body,note.name,note.ts).subscribe(
        notes => {
          this.notes.push(note);
          form.reset();
        }
      );
  }

  
  

}
