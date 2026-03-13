import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryListPage } from './pages/category-list/category-list.page';
import { CategoryFormPage } from './pages/category-form/category-form.page';

@NgModule({
  declarations: [CategoryListPage, CategoryFormPage],
  imports: [SharedModule, FormsModule, ReactiveFormsModule, CategoriesRoutingModule],
})
export class CategoriesModule {}
