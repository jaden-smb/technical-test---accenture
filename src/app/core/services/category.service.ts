import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { Category } from '../models';

const CATEGORIES_KEY = 'todo_categories';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  readonly categories$: Observable<Category[]> = this.categoriesSubject.asObservable();

  constructor(private storageService: StorageService) {
    this.loadCategories();
  }

  private async loadCategories(): Promise<void> {
    const categories = await this.storageService.get<Category[]>(CATEGORIES_KEY);
    this.categoriesSubject.next(categories ?? []);
  }

  private async persist(categories: Category[]): Promise<void> {
    await this.storageService.set(CATEGORIES_KEY, categories);
    this.categoriesSubject.next(categories);
  }

  async createCategory(name: string, color: string): Promise<Category> {
    const category: Category = {
      id: crypto.randomUUID(),
      name,
      color,
      createdAt: new Date().toISOString(),
    };
    const categories = [...this.categoriesSubject.getValue(), category];
    await this.persist(categories);
    return category;
  }

  async updateCategory(updated: Category): Promise<void> {
    const categories = this.categoriesSubject.getValue().map(category =>
      category.id === updated.id ? updated : category
    );
    await this.persist(categories);
  }

  async deleteCategory(id: string): Promise<void> {
    const categories = this.categoriesSubject.getValue().filter(category => category.id !== id);
    await this.persist(categories);
  }

  getCategoryById(id: string): Category | undefined {
    return this.categoriesSubject.getValue().find(category => category.id === id);
  }
}
