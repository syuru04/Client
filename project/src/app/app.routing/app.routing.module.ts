import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DeptComponent } from '../dept/dept.component';
import { DocComponent } from '../doc/doc.component';
import { EmpComponent } from '../emp/emp.component';
import { NoteComponent } from '../note/note.component';
import { OrgChartComponent } from '../org-chart/org-chart.component';

const routes: Routes = [
  { path: 'dept', component: DeptComponent },
  { path: 'doc', component: DocComponent },
  { path: 'emp', component: EmpComponent },
  { path: 'note', component: NoteComponent },
  { path: 'org-chart', component: OrgChartComponent }
  ];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
