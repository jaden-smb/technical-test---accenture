import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { TasksRoutingModule } from './tasks-routing.module';
import { TaskListPage } from './pages/task-list/task-list.page';
import { TaskFormPage } from './pages/task-form/task-form.page';
import { TaskDetailPage } from './pages/task-detail/task-detail.page';
import { TaskItemComponent } from './components/task-item/task-item.component';

@NgModule({
  declarations: [TaskListPage, TaskFormPage, TaskDetailPage, TaskItemComponent],
  imports: [SharedModule, FormsModule, ReactiveFormsModule, TasksRoutingModule],
})
export class TasksModule {}
