import { Component, OnInit, } from '@angular/core';
import { Note } from './note.model';
import { NoteService } from './note-http.service';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})

export class NoteComponent implements OnInit {
  today = new Date();
  formStat = "list";
  updateId=0;
  
  notes: Note[];
  note:Note;

  constructor(private service: NoteService) { 
  }
  
  ngOnInit() {
    this.service.get().subscribe(data => {
      this.notes = data;
    });
  }
  outputEvent(formStat: string) {
    this.formStat = formStat;
  }

  goupdate(id){
    this.formStat="input";   
    this.updateId=id; 
  }

  btnListClick() :void{
    this.formStat="list"
  }

  btnNewClick(): void {
    this.formStat="input"
  }

  btnTitleClick(id): void {
    this.formStat="detail"
    this.service.get2(id).subscribe(data =>this.note = data);    
  }

  remove(id: number) {    
    if(window.confirm("Delete ?")){
      this.service.remove(id).subscribe(() => this.notes.splice(id, 1));
      this.formStat="list"
      window.location.reload();
    }else{
      return false;
    }
  }
}

