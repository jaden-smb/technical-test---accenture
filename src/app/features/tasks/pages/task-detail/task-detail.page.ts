import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { Task, Category } from '../../../../core/models';
import { TaskService, CategoryService } from '../../../../core/services';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.page.html',
  styleUrls: ['./task-detail.page.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class TaskDetailPage implements OnInit {
  task$!: Observable<Task | undefined>;
  category$!: Observable<Category | undefined>;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.task$ = this.taskService.tasks$.pipe(
      map(tasks => tasks.find(t => t.id === id)),
    );

    this.category$ = combineLatest([this.task$, this.categoryService.categories$]).pipe(
      map(([task, cats]) => task?.categoryId ? cats.find(c => c.id === task.categoryId) : undefined),
    );
  }

  onToggle(task: Task): void {
    this.taskService.toggleComplete(task.id);
  }
}
