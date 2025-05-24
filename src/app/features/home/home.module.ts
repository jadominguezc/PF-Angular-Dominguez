import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: HomeComponent }])
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }