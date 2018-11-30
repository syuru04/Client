import { Component, OnInit, } from '@angular/core';
import { Note, NotePage } from './note.model';
import { NoteService } from './note-http.service';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})

export class NoteComponent implements OnInit {
  today = new Date();
  formStat = "list";
  updateId : number;
  index : number;
  start : number;
  range : number;
  page : number;

  
  notes: Note[];
  note : Note;
  pageTotalRange : number;
  fakeArray;
  
  constructor(private service: NoteService) { 
  }
  
  ngOnInit() {
    this.start = 0;
    this.range = 15;
    this.service.pageCount().subscribe(data=>{
      this.pageTotalRange = data;
      this.page = (this.range/this.pageTotalRange)               
      this.fakeArray = new Array(this.pageTotalRange);
      // 고쳐야할 부분
    })    
    this.service.pageRange(this.start,this.range).subscribe(data => {
      this.notes = data;
    });
  }
  outputEvent(formStat: string) {
    this.formStat = formStat;
  }

  pageBtnClick(){
    
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
  
  btnTitleClick(id : number ,i : number): void {
    this.index=i;      
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

