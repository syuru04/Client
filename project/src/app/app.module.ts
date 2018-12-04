import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing/app.routing.module';

import { AppComponent } from './app.component';
import { DeptComponent } from './dept/dept.component';
import { DocComponent } from './doc/doc.component';
import { NoteComponent } from './note/note.component';
import { EmpComponent } from './emp/emp.component';
import { OrgChartComponent } from './org-chart/org-chart.component';
import { TreeComponent } from './org-chart/tree/tree.component';
import { NewnoteComponent } from './note/newnote/newnote.component';
import { NoteService } from './note/note-http.service';
import { NewDocComponent } from './doc/new-doc/new-doc.component';
import { LoginComponent } from './login/login.component';
import { JoinComponent } from './join/join.component';
import { DetailDocComponent } from './doc/detail-doc/detail-doc.component';
import { MainComponent } from './main/main.component';
import { MNoteComponent } from './main/m-note/m-note.component';
import { MDocComponent } from './main/m-doc/m-doc.component';

@NgModule({
  declarations: [
    AppComponent,
    DeptComponent,
    DocComponent,
    NoteComponent,
    NewnoteComponent,
    EmpComponent,
    TreeComponent,
    OrgChartComponent,
    NewDocComponent,
    LoginComponent,
    JoinComponent,
    DetailDocComponent,
    MainComponent,
    MNoteComponent,
    MDocComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [NoteService],
  bootstrap: [AppComponent]
})
export class AppModule {}