import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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
  note:Note;
  author = 1;
  ts;
  formStat = "";

  @Output() outputProperty = new EventEmitter<String>();
  @Input() updateId: Number;
  constructor(private service: NewNoteService) { }
  ngOnInit() {
    if (this.updateId===0) {
      this.service.get().subscribe(data => {
        this.notes = data;
        var datePipe = new DatePipe("en-US");
        var date2 = datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
        this.ts = date2;
      });      
    } else {
      console.log(this.updateId);           
      this.service.get2(this.updateId).subscribe(data =>{
        this.note = data;        
        var datePipe = new DatePipe("en-US");
        var date2 = datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
        this.ts = date2;
      }); 
    }
  }

  add(form: NgForm) {
    const note = Object.assign({ done: false }, form.value);    
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
        this.formStat = "list";
        this.outputProperty.emit(this.formStat);
        window.location.reload();
      });
  }

  btnCancel() {
    this.formStat = "list";
    this.outputProperty.emit(this.formStat);
  }
}


