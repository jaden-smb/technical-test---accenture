import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-add-fab',
  templateUrl: './add-fab.component.html',
  styleUrls: ['./add-fab.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AddFabComponent {
  @Input() routerLink!: string;
}
