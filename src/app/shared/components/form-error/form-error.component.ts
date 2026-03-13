import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class FormErrorComponent {
  @Input() message!: string;
  @Input() visible = false;
}
