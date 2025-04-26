import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav; 
  isSidenavOpen = false; 

  toggleSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
    this.sidenav.toggle();
    console.log('Sidenav toggled:', this.isSidenavOpen);
  }

  closeSidenav(): void {
    this.isSidenavOpen = false;
    this.sidenav.close();
    console.log('Sidenav closed');
  }
}