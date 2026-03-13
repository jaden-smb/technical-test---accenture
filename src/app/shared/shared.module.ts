import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RelativeTimePipe } from './pipes/relative-time.pipe';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { BackHeaderComponent } from './components/back-header/back-header.component';
import { AddFabComponent } from './components/add-fab/add-fab.component';
import { FormErrorComponent } from './components/form-error/form-error.component';

@NgModule({
  declarations: [
    RelativeTimePipe,
    EmptyStateComponent,
    BackHeaderComponent,
    AddFabComponent,
    FormErrorComponent,
  ],
  imports: [CommonModule, RouterModule, IonicModule],
  exports: [
    RelativeTimePipe,
    EmptyStateComponent,
    BackHeaderComponent,
    AddFabComponent,
    FormErrorComponent,
    CommonModule,
    RouterModule,
    IonicModule,
  ],
})
export class SharedModule {}
