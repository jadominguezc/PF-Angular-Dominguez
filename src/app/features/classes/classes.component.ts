import { Component } from '@angular/core';
import { Class } from 'app/core/models/class.model';
import { ClassService } from './services/class.service';
import { MatDialog } from '@angular/material/dialog';
import { ClassFormComponent } from 'app/features/classes/class-form/class-form.component';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css'],
  standalone: false
})
export class ClassesComponent {
  displayedColumns: string[] = ['className', 'schedule', 'teacher', 'actions'];
  classes: Class[] = [];
  filteredClasses: Class[] = [];
  searchTerm: string = ''; // Añadimos esta propiedad

  constructor(private classService: ClassService, private dialog: MatDialog) {
    this.loadClasses();
  }

  loadClasses(): void {
    try {
      this.classService.getClassesAsObservable().subscribe({
        next: (classes) => {
          this.classes = classes;
          this.filteredClasses = [...this.classes];
        },
        error: (err) => {
          console.error('Error al cargar clases:', err);
        }
      });
    } catch (error) {
      console.error('Error inesperado al cargar clases:', error);
    }
  }

  filterClasses(searchTerm: string): void {
    if (!searchTerm) {
      this.filteredClasses = [...this.classes];
      return;
    }
    this.filteredClasses = this.classes.filter(cls =>
      cls.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  openForm(classToEdit?: Class): void {
    const dialogRef = this.dialog.open(ClassFormComponent, {
      width: '400px',
      data: { classToEdit },
      ariaLabel: `Formulario de ${classToEdit ? 'edición' : 'nueva'} clase`,
      hasBackdrop: true,
      disableClose: false,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        try {
          if (classToEdit) {
            this.classService.editClass(result);
          } else {
            this.classService.addClass(result);
          }
          this.loadClasses();
        } catch (error) {
          console.error('Error al guardar clase:', error);
        }
      }
    });
  }

  deleteClass(classId: number): void {
    try {
      this.classService.deleteClass(classId);
      this.loadClasses();
    } catch (error) {
      console.error('Error al eliminar clase:', error);
    }
  }
}