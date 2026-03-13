import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { Task } from '../models';

const TASKS_KEY = 'todo_tasks';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  readonly tasks$: Observable<Task[]> = this.tasksSubject.asObservable();

  constructor(private storageService: StorageService) {
    this.loadTasks();
  }

  private async loadTasks(): Promise<void> {
    const tasks = await this.storageService.get<Task[]>(TASKS_KEY);
    this.tasksSubject.next(tasks ?? []);
  }

  private async persist(tasks: Task[]): Promise<void> {
    await this.storageService.set(TASKS_KEY, tasks);
    this.tasksSubject.next(tasks);
  }

  async createTask(title: string, description?: string, categoryId?: string): Promise<Task> {
    const task: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      categoryId,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    const tasks = [...this.tasksSubject.getValue(), task];
    await this.persist(tasks);
    return task;
  }

  async updateTask(updated: Task): Promise<void> {
    const tasks = this.tasksSubject.getValue().map(task => (task.id === updated.id ? updated : task));
    await this.persist(tasks);
  }

  async toggleComplete(id: string): Promise<void> {
    const tasks = this.tasksSubject.getValue().map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    await this.persist(tasks);
  }

  async deleteTask(id: string): Promise<void> {
    const tasks = this.tasksSubject.getValue().filter(task => task.id !== id);
    await this.persist(tasks);
  }

  async removeCategoryFromTasks(categoryId: string): Promise<void> {
    const tasks = this.tasksSubject.getValue().map(task =>
      task.categoryId === categoryId ? { ...task, categoryId: undefined } : task
    );
    await this.persist(tasks);
  }
}
