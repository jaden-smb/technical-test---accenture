import {
  Component,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class EmptyStateComponent {
  @Input() icon = 'clipboard-outline';
  @Input() title = 'Sin contenido';
  @Input() message = '';
}
