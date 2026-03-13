import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getRemoteConfig, RemoteConfig, fetchAndActivate, getValue } from 'firebase/remote-config';
import { environment } from '../../../environments/environment';

export interface FeatureFlags {
  enable_task_categories: boolean;
}

const DEFAULT_FLAGS: FeatureFlags = {
  enable_task_categories: true,
};

@Injectable({ providedIn: 'root' })
export class FeatureFlagService {
  private flagsSubject = new BehaviorSubject<FeatureFlags>(DEFAULT_FLAGS);
  readonly flags$: Observable<FeatureFlags> = this.flagsSubject.asObservable();

  private firebaseApp!: FirebaseApp;
  private remoteConfig!: RemoteConfig;

  async initialize(): Promise<void> {
    try {
      this.firebaseApp = initializeApp(environment.firebase);
      this.remoteConfig = getRemoteConfig(this.firebaseApp);
      this.remoteConfig.settings.minimumFetchIntervalMillis = environment.production ? 3600000 : 60000;
      this.remoteConfig.defaultConfig = {
        enable_task_categories: DEFAULT_FLAGS.enable_task_categories,
      };

      await fetchAndActivate(this.remoteConfig);
      this.updateFlags();
    } catch {
      // If Firebase fails, use default flags — app remains functional
      console.warn('Firebase Remote Config unavailable, using defaults');
    }
  }

  private updateFlags(): void {
    const enableCategories = getValue(this.remoteConfig, 'enable_task_categories');
    this.flagsSubject.next({
      enable_task_categories: enableCategories.asBoolean(),
    });
  }

  get categoriesEnabled$(): Observable<boolean> {
    return new Observable<boolean>(subscriber => {
      this.flags$.subscribe(flags => subscriber.next(flags.enable_task_categories));
    });
  }

  get currentFlags(): FeatureFlags {
    return this.flagsSubject.getValue();
  }
}
