import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Category } from '../../../../core/models';
import { TaskService, CategoryService, FeatureFlagService } from '../../../../core/services';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.page.html',
  styleUrls: ['./task-form.page.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class TaskFormPage implements OnInit {
  form!: FormGroup;
  isEdit = false;
  categories$!: Observable<Category[]>;
  categoriesEnabled$!: Observable<boolean>;
  private taskId?: string;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private categoryService: CategoryService,
    private featureFlagService: FeatureFlagService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.categories$;
    this.categoriesEnabled$ = this.featureFlagService.categoriesEnabled$;

    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(1)]],
      description: [''],
      categoryId: [null],
    });

    this.taskId = this.route.snapshot.paramMap.get('id') ?? undefined;
    if (this.taskId) {
      this.isEdit = true;
      this.taskService.tasks$.pipe(first()).subscribe(tasks => {
        const task = tasks.find(t => t.id === this.taskId);
        if (task) {
          this.form.patchValue({
            title: task.title,
            description: task.description ?? '',
            categoryId: task.categoryId ?? null,
          });
        }
      });
    }
  }

  trackByCategoryId(_: number, cat: Category): string {
    return cat.id;
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) return;

    const { title, description, categoryId } = this.form.value;

    if (this.isEdit && this.taskId) {
      const tasks = await this.taskService.tasks$.pipe(first()).toPromise();
      const existing = tasks?.find(t => t.id === this.taskId);
      if (existing) {
        await this.taskService.updateTask({
          ...existing,
          title,
          description: description || undefined,
          categoryId: categoryId || undefined,
        });
      }
    } else {
      await this.taskService.createTask(title, description || undefined, categoryId || undefined);
    }

    this.router.navigate(['/tasks']);
  }
}
