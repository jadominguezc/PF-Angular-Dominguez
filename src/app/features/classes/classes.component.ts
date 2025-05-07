import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Class } from 'app/core/models/class.model';
import { ClassService } from './services/class.service';
import { AuthService } from 'app/shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ClassFormComponent } from './components/class-form/class-form.component';
import { ConfirmationDialogComponent } from 'app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css'],
  standalone: false
})
export class ClassesComponent implements OnDestroy, OnInit {
  classes$!: Observable<Class[]>;
  filteredClasses: Class[] = [];
  private destroy$ = new Subject<void>();
  isAdmin: boolean = false;
  searchTerm: string = '';

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  constructor(
    private classService: ClassService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.loadClasses();
  }

  ngOnInit(): void {
    this.updateAdminStatus();
  }

  private updateAdminStatus(): void {
    this.isAdmin = this.authService.getRole() === 'admin';
    console.log('isAdmin (Classes):', this.isAdmin);
  }

  loadClasses(): void {
    this.classes$ = this.classService.getClassesAsObservable();
    this.classes$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(classes => {
      this.filteredClasses = classes || [];
      this.filterClasses(this.searchTerm);
    });
  }

  filterClasses(searchTerm: string): void {
    this.searchTerm = searchTerm;
    if (!searchTerm.trim()) {
      this.classes$.pipe(
        takeUntil(this.destroy$)
      ).subscribe(classes => {
        this.filteredClasses = classes || [];
      });
      return;
    }
    this.classes$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(classes => {
      this.filteredClasses = (classes || []).filter(cls =>
        cls.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }

  openForm(cls?: Class): void {
    if (!this.isAdmin) {
      console.log('No tienes permisos para añadir/editar clases.');
      return;
    }
    const dialogRef = this.dialog.open(ClassFormComponent, {
      width: '400px',
      data: { classToEdit: cls },
      ariaLabel: 'Formulario de clase',
      hasBackdrop: true,
      disableClose: false,
      autoFocus: true
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this.destroy$)
    ).subscribe(result => {
      if (result) {
        this.saveClass(result);
      }
    });
  }

  saveClass(classData: Partial<Class>): void {
    if (!this.isAdmin) return;

    if (!classData.name || !classData.schedule || !classData.teacher) {
      console.error('Nombre, horario y profesor son requeridos');
      return;
    }

    const validatedData: Omit<Class, 'id'> = {
      name: classData.name,
      schedule: classData.schedule,
      teacher: classData.teacher
    };

    if (classData.id) {
      const updatedClass: Class = {
        id: classData.id,
        name: classData.name!,
        schedule: classData.schedule!,
        teacher: classData.teacher!
      };
      this.classService.editClass(updatedClass).pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: () => {
          this.classService.refreshClasses();
          this.loadClasses();
        },
        error: (err) => console.error('Error al editar clase:', err)
      });
    } else {
      this.classService.addClass(validatedData).pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: () => {
          this.classService.refreshClasses();
          this.loadClasses();
        },
        error: (err) => console.error('Error al añadir clase:', err)
      });
    }
  }

  editClass(cls: Class): void {
    if (this.isAdmin) {
      this.openForm(cls);
    } else {
      console.log('No tienes permisos para editar clases.');
    }
  }

  deleteClass(cls: Class): void {
    if (this.isAdmin) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '400px',
        data: { message: `¿Estás seguro de eliminar la clase ${cls.name}?` },
        ariaLabel: 'Confirmar eliminación',
        hasBackdrop: true,
        disableClose: false,
        autoFocus: true
      });

      dialogRef.afterClosed().pipe(
        takeUntil(this.destroy$)
      ).subscribe(result => {
        if (result) {
          this.classService.deleteClass(cls.id).pipe(
            takeUntil(this.destroy$)
          ).subscribe({
            next: () => {
              this.classService.refreshClasses();
              this.loadClasses();
            },
            error: (err) => console.error('Error al eliminar clase:', err)
          });
        }
      });
    } else {
      console.log('No tienes permisos para eliminar clases.');
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}