import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { Task, Category } from '../../../../core/models';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Input() category?: Category;
  @Output() navigate = new EventEmitter<string>();
  @Output() options = new EventEmitter<string>();
}
