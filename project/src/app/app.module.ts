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

@NgModule({
  declarations: [
    AppComponent,
    DeptComponent,
    DocComponent,
    NoteComponent,
    EmpComponent,
    OrgChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
