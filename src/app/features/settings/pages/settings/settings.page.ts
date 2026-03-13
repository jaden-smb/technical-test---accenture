import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FeatureFlagService } from '../../../../core/services';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SettingsPage implements OnInit {
  categoriesEnabled$!: Observable<boolean>;

  constructor(private featureFlagService: FeatureFlagService) {}

  ngOnInit(): void {
    this.categoriesEnabled$ = this.featureFlagService.categoriesEnabled$;
  }
}
