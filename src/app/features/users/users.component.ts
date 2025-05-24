import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from 'app/core/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from './components/user-form/user-form.component';
import { ConfirmationDialogComponent } from 'app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { Store } from '@ngrx/store';
import { RootState } from 'app/core/store/root-state';
import { selectAllUsers } from './store/user.selectors';
import { loadUsers, editUser, deleteUser, addUser } from './store/user.actions'; 
import { selectUserRole } from 'app/core/store/app.selectors';
import { takeUntil } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  standalone: false
})
export class UsersComponent implements OnInit, OnDestroy {
  users$: Observable<User[]>;
  filteredUsers: User[] = [];
  isAdmin: boolean = false;
  private destroy$ = new Subject<void>();

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  constructor(
    private dialog: MatDialog,
    private store: Store<RootState>
  ) {
    this.users$ = this.store.select(selectAllUsers);
    this.loadUsers();
  }

  ngOnInit(): void {
    this.store.select(selectUserRole).pipe(takeUntil(this.destroy$)).subscribe(role => {
      this.isAdmin = role === 'admin';
    });
    this.users$.pipe(takeUntil(this.destroy$)).subscribe(users => {
      this.filteredUsers = users || [];
    });
  }

  loadUsers(): void {
    this.store.dispatch(loadUsers());
  }

  filterUsers(searchTerm: string): void {
    if (!searchTerm.trim()) {
      this.users$.pipe(takeUntil(this.destroy$)).subscribe(users => {
        this.filteredUsers = users || [];
      });
      return;
    }
    this.users$.pipe(takeUntil(this.destroy$)).subscribe(users => {
      this.filteredUsers = (users || []).filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }

  editUser(user: User): void {
    if (this.isAdmin) {
      const dialogRef = this.dialog.open(UserFormComponent, {
        width: '400px',
        data: { userToEdit: user },
        ariaLabel: 'Formulario de edición de usuario',
        hasBackdrop: true,
        disableClose: false,
        autoFocus: true
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.store.dispatch(editUser({ user: result }));
        }
      });
    }
  }

  deleteUser(user: User): void {
    if (this.isAdmin) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '400px',
        data: { message: `¿Estás seguro de eliminar a ${user.name}?` },
        ariaLabel: 'Confirmar eliminación',
        hasBackdrop: true,
        disableClose: false,
        autoFocus: true
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.store.dispatch(deleteUser({ id: user.id }));
        }
      });
    }
  }

  viewUser(user: User): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        message: `
          <strong>Detalles del Usuario:</strong><br>
          Nombre: ${user.name}<br>
          RUT: ${user.rut}<br>
          Usuario: ${user.username}<br>
          Rol: ${user.role}
        `,
        isDetails: true
      },
      ariaLabel: 'Detalles del usuario',
      hasBackdrop: true,
      disableClose: false,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe();
  }

  openForm(): void {
    if (this.isAdmin) {
      const dialogRef = this.dialog.open(UserFormComponent, {
        width: '400px',
        data: {},
        ariaLabel: 'Formulario de Creación de Usuario',
        hasBackdrop: true,
        disableClose: false,
        autoFocus: true
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.addUser(result); 
        }
      });
    }
  }

  addUser(userData: Omit<User, 'id'>): void {
    if (this.isAdmin) {
      this.store.dispatch(addUser({ user: userData }));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}