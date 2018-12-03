import { Component, OnInit, } from '@angular/core';
import { Note, NotePage } from './note.model';
import { NoteService } from './note-http.service';
import { TouchSequence, Alert } from 'selenium-webdriver';
import { ArrayType } from '@angular/compiler';


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
  id : number;
  
  notes: Note[];
  note : Note;
  pageTotalRange : number;
  pageArray;  
  i:number;
  j:number;
  
  constructor(private service: NoteService) { 
  }
  
  ngOnInit() {
    this.start = 0;
    this.range = 15;
    this.j = 1;
    this.service.pageCount().subscribe(data=>{
      this.pageTotalRange = data;
      this.page = Math.floor(this.pageTotalRange/this.range)+1;    
      if(this.page<=5){
        this.pageArray = new Array(this.page);                   
      }else {
        this.pageArray = new Array(5);
      }

      for (let index = 0; index < this.pageArray.length; index++) {
        this.pageArray[index] = this.j;
        this.j ++;                
      }      
    })    
    this.service.pageRange(this.start,this.range).subscribe(data => {
      this.notes = data;
    });

  }
  outputEvent(formStat: string) {
    this.formStat = formStat;
  }

  pageBtnClick(id){   
    if(id===1){      
      this.start = 0;    
    }else if(id > 1 ){           
      this.start = (id-1)* this.range;
    }  
    if(id<=this.page){  
      if(id==2){
        id=id-1;
        for (let index = 0; index < this.pageArray.length; index++) {
            this.pageArray[index] = id;
            id++;                          
        }     
      }else if(id >=3){      
        id=id-2;
        for (let index = 0; index < this.pageArray.length; index++) {
            this.pageArray[index] = id;
            id++;                          
        }     
      }
      this.service.pageRange(this.start,this.range).subscribe(data => {
        this.notes = data;
      });
    }
  }
  goupdate(id){
    const sessionValue = JSON.parse(sessionStorage.getItem('loginData'));
    if(id === sessionValue.id){   
    this.formStat="input";   
    this.updateId=id; 
    }else{
      alert("작성자만 수정이 가능합니다.")
    }
  }
  
  btnListClick() :void{    
    this.formStat="list"
  }
  
  btnNewClick(): void {  
    this.formStat="input"
    this.updateId = undefined;
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

