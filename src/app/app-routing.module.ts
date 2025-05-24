import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/shared/guards/auth.guard';

const routes: Routes = [
  { path: 'students', loadChildren: () => import('./features/students/students.module').then(m => m.StudentsModule), canActivate: [AuthGuard] },
  { path: 'classes', loadChildren: () => import('./features/classes/classes.module').then(m => m.ClassesModule), canActivate: [AuthGuard] },
  { path: 'courses', loadChildren: () => import('./features/courses/courses.module').then(m => m.CoursesModule), canActivate: [AuthGuard] },
  { path: 'home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) },
  { path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'users', loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule), canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }