import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false,
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('500ms ease-in-out', style({ opacity: 0 }))
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
    this.startCarousel();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  startCarousel(): void {
    this.subscription = interval(3000).subscribe(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    });
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
  }
}