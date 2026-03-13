import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListPage } from './pages/task-list/task-list.page';
import { TaskFormPage } from './pages/task-form/task-form.page';
import { TaskDetailPage } from './pages/task-detail/task-detail.page';

const routes: Routes = [
  { path: '', component: TaskListPage },
  { path: 'new', component: TaskFormPage },
  { path: 'edit/:id', component: TaskFormPage },
  { path: ':id', component: TaskDetailPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
