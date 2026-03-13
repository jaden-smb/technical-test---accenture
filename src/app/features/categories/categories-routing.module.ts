import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListPage } from './pages/category-list/category-list.page';
import { CategoryFormPage } from './pages/category-form/category-form.page';

const routes: Routes = [
  { path: '', component: CategoryListPage },
  { path: 'new', component: CategoryFormPage },
  { path: 'edit/:id', component: CategoryFormPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
