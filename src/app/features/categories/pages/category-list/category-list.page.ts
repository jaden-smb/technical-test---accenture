import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Category } from '../../../../core/models';
import { CategoryService, TaskService } from '../../../../core/services';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.page.html',
  styleUrls: ['./category-list.page.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class CategoryListPage implements OnInit {
  categories$!: Observable<Category[]>;

  constructor(
    private categoryService: CategoryService,
    private taskService: TaskService,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.categories$;
  }

  trackById(_: number, cat: Category): string {
    return cat.id;
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

  onEdit(id: string): void {
    this.router.navigate(['/categories/edit', id]);
  }

  async onDelete(id: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Eliminar categoría',
      message: '¿Estás seguro? Las tareas con esta categoría quedarán sin categoría.',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            await this.taskService.removeCategoryFromTasks(id);
            await this.categoryService.deleteCategory(id);
          },
        },
      ],
    });
    await alert.present();
  }
}
