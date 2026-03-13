import { NgModule } from '@angular/core';
import { provideAppInitializer, inject } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage-angular';
import { FeatureFlagService } from './services';

@NgModule({
  imports: [IonicStorageModule.forRoot()],
  providers: [
    provideAppInitializer(() => inject(FeatureFlagService).initialize()),
  ],
})
export class CoreModule {}
