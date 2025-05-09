import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false,
  animations: [
    trigger('slideAnimation', [
      transition('* => *', [
        style({ transform: 'translateX(100%)' }),
        animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  images = [
    'assets/images/Estudiantes-chile1.jpg',
    'assets/images/Estudiantes-chile2.jpg',
    'assets/images/Estudiantes-chile3.jpg',
    'assets/images/Estudiantes-chile4.jpg',
    'assets/images/Estudiantes-chile.jpeg'
  ];
  currentIndex = 0;
  private subscription!: Subscription;

  ngOnInit(): void {
    console.log('HomeComponent inicializado');
    this.subscription = interval(2000).subscribe(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}