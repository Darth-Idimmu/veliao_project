import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { PersonFormComponent } from './person-form/person-form.component';

const routes: Routes = [
  { path: 'tasks', component: TaskListComponent },
  { path: 'create-task', component: TaskFormComponent },
  { path: 'create-person', component: PersonFormComponent },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: '**', redirectTo: '/tasks' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
