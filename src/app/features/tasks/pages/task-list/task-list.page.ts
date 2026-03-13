import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { Observable, combineLatest, BehaviorSubject, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Task, Category } from '../../../../core/models';
import { TaskService, CategoryService, FeatureFlagService } from '../../../../core/services';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class TaskListPage implements OnInit, OnDestroy {
  tasks$!: Observable<Task[]>;
  categories$!: Observable<Category[]>;
  categoriesEnabled$!: Observable<boolean>;
  filteredTasks$!: Observable<Task[]>;
  selectedCategoryId$ = new BehaviorSubject<string>('all');
  filterOpen$ = new BehaviorSubject<boolean>(false);

  private categoriesMap = new Map<string, Category>();
  private destroy$ = new Subject<void>();

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService,
    private featureFlagService: FeatureFlagService,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.tasks$ = this.taskService.tasks$;
    this.categories$ = this.categoryService.categories$;
    this.categoriesEnabled$ = this.featureFlagService.categoriesEnabled$;

    this.categories$.pipe(takeUntil(this.destroy$)).subscribe(cats => {
      this.categoriesMap.clear();
      cats.forEach(c => this.categoriesMap.set(c.id, c));
    });

    this.filteredTasks$ = combineLatest([
      this.tasks$,
      this.selectedCategoryId$,
    ]).pipe(
      map(([tasks, categoryId]) => {
        const filtered = categoryId === 'all'
          ? tasks
          : tasks.filter(t => t.categoryId === categoryId);
        return filtered.sort((a, b) => {
          if (a.completed !== b.completed) return a.completed ? 1 : -1;
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
      }),
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  trackTaskById(_: number, task: Task): string {
    return task.id;
  }

  trackCategoryById(_: number, category: Category): string {
    return category.id;
  }

  getCategoryForTask(task: Task): Category | undefined {
    return task.categoryId ? this.categoriesMap.get(task.categoryId) : undefined;
  }

  onAccordionChange(event: any): void {
    this.filterOpen$.next(event.detail.value === 'filter');
  }

  selectCategory(id: string): void {
    this.selectedCategoryId$.next(id);
    this.filterOpen$.next(false);
  }

  getCategoryName(id: string | null): string {
    if (!id || id === 'all') return 'Todas las categorías';
    return this.categoriesMap.get(id)?.name ?? 'All Categories';
  }

  getCategoryColor(id: string | null): string {
    if (!id || id === 'all') return '';
    return this.categoriesMap.get(id)?.color ?? '';
  }

  async onOptions(id: string): Promise<void> {
    const sheet = await this.actionSheetController.create({
      buttons: [
        { text: 'Editar', icon: 'create-outline', handler: () => this.onEdit(id) },
        { text: 'Eliminar', role: 'destructive', icon: 'trash-outline', handler: () => this.onDelete(id) },
        { text: 'Cancelar', role: 'cancel', icon: 'close-outline' },
      ],
    });
    await sheet.present();
  }

  async onDelete(id: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Eliminar tarea',
      message: 'Estás seguro de que quieres eliminar esta tarea?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => this.taskService.deleteTask(id),
        },
      ],
    });
    await alert.present();
  }

  onEdit(id: string): void {
    this.router.navigate(['/tasks/edit', id]);
  }

  onRefresh(event: any): void {
    setTimeout(() => event.target.complete(), 500);
  }
}
