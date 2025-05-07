import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassesComponent } from './classes.component';

const routes: Routes = [
  { path: '', component: ClassesComponent },
  { path: 'add', component: ClassesComponent },
  { path: ':id/edit', component: ClassesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassesRoutingModule { }