import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { CategoryService } from '../../../../core/services';

const PRESET_COLORS = [
  '#ef4444', '#f97316', '#eab308', '#22c55e',
  '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899',
];

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.page.html',
  styleUrls: ['./category-form.page.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class CategoryFormPage implements OnInit {
  form!: FormGroup;
  isEdit = false;
  presetColors = PRESET_COLORS;
  private categoryId?: string;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      color: [PRESET_COLORS[0], Validators.required],
    });

    this.categoryId = this.route.snapshot.paramMap.get('id') ?? undefined;
    if (this.categoryId) {
      this.isEdit = true;
      this.categoryService.categories$.pipe(first()).subscribe(categories => {
        const cat = categories.find(c => c.id === this.categoryId);
        if (cat) {
          this.form.patchValue({ name: cat.name, color: cat.color });
        }
      });
    }
  }

  selectColor(color: string): void {
    this.form.patchValue({ color });
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) return;

    const { name, color } = this.form.value;

    if (this.isEdit && this.categoryId) {
      const categories = await this.categoryService.categories$.pipe(first()).toPromise();
      const existing = categories?.find(c => c.id === this.categoryId);
      if (existing) {
        await this.categoryService.updateCategory({ ...existing, name, color });
      }
    } else {
      await this.categoryService.createCategory(name, color);
    }

    this.router.navigate(['/categories']);
  }
}
