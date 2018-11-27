import { Component, OnInit, } from '@angular/core';

import { Note } from './note.model';
import { NoteService } from './note-http.service';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})

export class NoteComponent implements OnInit {

  BodyFormYn = "N";
  ListFormYn = "Y";

  notes: Note[];
  note:Note;
  constructor(private service: NoteService) { }

  ngOnInit() {
    this.service.get().subscribe(data => {
      this.notes = data;
    });
  }
  btnListClick() :void{
    this.BodyFormYn="N"
    this.ListFormYn = "Y";
  }
  btnTitleClick(id): void {
    this.ListFormYn = "N";
    this.BodyFormYn="Y";
    this.service.get2(id).subscribe(data =>this.note = data);
  }

  // add(form: NgForm) {
  //   const todo = Object.assign({ done: false }, form.value);
  //   todo.title = todo.title.trim();
  //   this.todoHttpService.add(todo).subscribe(
  //     todo => {
  //       this.todos.push(todo);
  //       form.reset();
  //     }
  //   );
  // }

  // setDone(todo: Todo) {
  //   todo.done = !todo.done;
  //   this.service.update(todo).subscribe();
  // }

  remove(id: number) {
    alert("Delete ?");
    this.service.remove(id).subscribe(() => this.notes.splice(id, 1));
    this.BodyFormYn="N"
    this.ListFormYn = "Y";
  }
}

