import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router'; // Añadimos esta importación

import { NavbarComponent } from './components/navbar/navbar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { FullNamePipe } from './pipes/full-name.pipe';
import { TitleSizeDirective } from './directives/title-size.directive';

@NgModule({
  declarations: [
    NavbarComponent,
    ToolbarComponent,
    ConfirmationDialogComponent,
    FullNamePipe,
    TitleSizeDirective
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    ToolbarComponent,
    ConfirmationDialogComponent,
    FullNamePipe,
    TitleSizeDirective,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule
  ]
})
export class SharedModule { }