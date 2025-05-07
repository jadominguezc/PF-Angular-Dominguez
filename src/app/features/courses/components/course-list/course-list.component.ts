import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from 'app/core/models/course.model';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
  standalone: false
})
export class CourseListComponent {
  @Input() data: Course[] = [];
  @Input() isAdmin: boolean = false;
  @Output() editCourse = new EventEmitter<Course>();
  @Output() deleteCourse = new EventEmitter<Course>();
  displayedColumns: string[] = ['name', 'description', 'actions'];

  onEdit(course: Course): void {
    this.editCourse.emit(course);
  }

  onDelete(course: Course): void {
    this.deleteCourse.emit(course);
  }
}