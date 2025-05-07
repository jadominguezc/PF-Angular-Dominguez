import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './auth/components/login/login.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'students', loadChildren: () => import('./features/students/students.module').then(m => m.StudentsModule), canActivate: [AuthGuard] },
  { path: 'classes', loadChildren: () => import('./features/classes/classes.module').then(m => m.ClassesModule), canActivate: [AuthGuard] },
  { path: 'courses', loadChildren: () => import('./features/courses/courses.module').then(m => m.CoursesModule), canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }