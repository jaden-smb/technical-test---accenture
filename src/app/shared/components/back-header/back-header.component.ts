import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-back-header',
  templateUrl: './back-header.component.html',
  styleUrls: ['./back-header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class BackHeaderComponent {
  @Input() title!: string;
  @Input() defaultHref = '/';
}
