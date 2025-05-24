import { Component, OnDestroy, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Class } from 'app/core/models/class.model';
import { MatDialog } from '@angular/material/dialog';
import { ClassFormComponent } from './components/class-form/class-form.component';
import { ConfirmationDialogComponent } from 'app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { Store } from '@ngrx/store';
import { RootState } from 'app/core/store/root-state';
import { selectAllClasses } from './store/class.selectors';
import { loadClasses, addClass, editClass, deleteClass } from './store/class.actions';
import { selectUserRole } from 'app/core/store/app.selectors';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css'],
  standalone: false
})
export class ClassesComponent implements OnDestroy, OnInit {
  classes$: Observable<Class[]>;
  filteredClasses: Class[] = [];
  private destroy$ = new Subject<void>();
  isAdmin: boolean = false;
  displayedColumns: string[] = ['name', 'schedule', 'teacher', 'actions'];
  dataSource = new MatTableDataSource<Class>([]);

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  constructor(
    private dialog: MatDialog,
    private store: Store<RootState>
  ) {
    this.classes$ = this.store.select(selectAllClasses);
    this.loadClasses();
  }

  ngOnInit(): void {
    this.store.select(selectUserRole).subscribe(role => {
      this.isAdmin = role === 'admin';
    });
    this.classes$.subscribe(classes => {
      this.filteredClasses = classes || [];
      this.dataSource.data = this.filteredClasses;
    });
  }

  loadClasses(): void {
    this.store.dispatch(loadClasses());
  }

  filterClasses(searchTerm: string): void {
    if (!searchTerm.trim()) {
      this.classes$.subscribe(classes => {
        this.filteredClasses = classes || [];
        this.dataSource.data = this.filteredClasses;
      });
      return;
    }
    this.classes$.subscribe(classes => {
      this.filteredClasses = (classes || []).filter(cls =>
        cls.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      this.dataSource.data = this.filteredClasses;
    });
  }

  addClass(classData: Omit<Class, 'id'>): void {
    if (this.isAdmin) {
      this.store.dispatch(addClass({ classData }));
    }
  }

  editClass(cls: Class): void {
    if (this.isAdmin) {
      const dialogRef = this.dialog.open(ClassFormComponent, {
        width: '400px',
        data: { classToEdit: cls },
        ariaLabel: 'Formulario de edición de clase',
        hasBackdrop: true,
        disableClose: false,
        autoFocus: true
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.store.dispatch(editClass({ classData: result }));
        }
      });
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

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.store.dispatch(deleteClass({ id: cls.id }));
        }
      });
    }
  }

  viewClass(cls: Class): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        message: `
          <strong>Detalles de la Clase:</strong><br>
          Nombre: ${cls.name}<br>
          Horario: ${cls.schedule}<br>
          Profesor: ${cls.teacher}
        `,
        isDetails: true
      },
      ariaLabel: 'Detalles de la clase',
      hasBackdrop: true,
      disableClose: false,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe();
  }

  openForm(): void {
    if (this.isAdmin) {
      const dialogRef = this.dialog.open(ClassFormComponent, {
        width: '400px',
        data: {},
        ariaLabel: 'Formulario de nueva clase',
        hasBackdrop: true,
        disableClose: false,
        autoFocus: true
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.addClass(result);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}