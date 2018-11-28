import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Note } from '../note.model';
import { NewNoteService } from './newnote-http.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-newnote',
  templateUrl: './newnote.component.html',
  styleUrls: ['./newnote.component.css']
})
export class NewnoteComponent implements OnInit {




  notes: Note[];
  author = 1;
  ts;


  constructor(private service: NewNoteService) {

  }

  ngOnInit() {
    this.service.get().subscribe(data => {
      this.notes = data;
      var datePipe = new DatePipe("en-US");
      var date2 = datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
      this.ts = date2;
    });
  }
  add(form: NgForm) {


    const note = Object.assign({ done: false }, form.value);
    console.log(note);

    if (note.title === undefined) {
      note.title = "제목없음"
      note.title = note.title.trim();
    }
    if (note.body === undefined) {
      alert("내용을 입력하세요");
      return false;
    }

    this.service.add(note).subscribe(
      note => {
        this.notes.push(note);
        form.reset();
      }
    );

  }
}


