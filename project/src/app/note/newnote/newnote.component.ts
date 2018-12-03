import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Note } from '../note.model';
import { NewNoteService } from './newnote-http.service';
import { DatePipe } from '@angular/common';
import { Note3 } from './newnote.model';

@Component({
  selector: 'app-newnote',
  templateUrl: './newnote.component.html',
  styleUrls: ['./newnote.component.css']
})

export class NewnoteComponent implements OnInit {
  notes: Note[];
  note: Note;
  author = 1;
  ts;
  formStat = "";
  addBtn = "Y";
  updateBtn = "N";
  id : number;
  @Output() outputProperty = new EventEmitter<String>();
  @Input() updateId: number;
  @Input() index: number;

  constructor(private service: NewNoteService) { }
  ngOnInit() {
    
    
    if (this.updateId === undefined) {            
      this.addBtn = "Y";
      this.updateBtn = "N";
      console.log("addBtn Y");

      this.service.get().subscribe(data => {
        this.notes = data;
        var datePipe = new DatePipe("en-US");
        var date2 = datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
        this.ts = date2;
      });
    } else {
      this.addBtn = "N";
      this.updateBtn = "Y";
      console.log("updateBtn Y");
      this.service.get2(this.updateId).subscribe(data => {
        this.note = data;
        var datePipe = new DatePipe("en-US");
        var date2 = datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
        this.ts = date2;
      });
    }
  }

  add(form: NgForm) {
    if (this.updateId === undefined) {
      const sessionValue = JSON.parse(sessionStorage.getItem('loginData'));
      const note = Object.assign({ done: false }, form.value);      
      note.author = sessionValue.id;              
      if (note.title === undefined) {
        note.title = "제목없음"
        note.title = note.title.trim();
      }

      if (note.body === undefined) {
        alert("내용을 입력하세요");
        return false;
      }
      alert(note.author);
      this.service.add(note).subscribe(
        note => {
          this.notes.push(note);
          this.formStat = "list";
          this.outputProperty.emit(this.formStat);
          window.location.reload();
        });
    } return false;
  }

  update(form: NgForm) {
    if (this.updateId === undefined) {
      return false;
    } else {      
      let note = Object.assign({ id: this.updateId }, form.value);     

      this.service.update(note).subscribe(() => {
        this.formStat = "list";
        this.outputProperty.emit(this.formStat);
        window.location.reload();
      });
    }

  }


  btnCancel() {
    this.formStat = "list";
    this.outputProperty.emit(this.formStat);
  }
 
}


