import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducer } from './core/store/app.reducer';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { StudentsModule } from './features/students/students.module';
import { ClassesModule } from './features/classes/classes.module';
import { CoursesModule } from './features/courses/courses.module';
import { HomeModule } from './features/home/home.module';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { StudentEffects } from './features/students/store/student.effects';
import { ClassEffects } from './features/classes/store/class.effects';
import { CourseEffects } from './features/courses/store/course.effects';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    CoreModule,
    SharedModule,
    StudentsModule,
    ClassesModule,
    CoursesModule,
    HomeModule,
    AuthModule,
    AppRoutingModule,
    StoreModule.forRoot({ app: appReducer }, {}),
    EffectsModule.forRoot([StudentEffects, ClassEffects, CourseEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent],
})
export class AppModule {}