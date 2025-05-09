import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { AuthService } from 'app/shared/services/auth.service';
import { User } from 'app/core/models/user.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'app/shared/shared.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: any;
  let routerMock: any;
  let dialogMock: any;

  beforeEach(async () => {
    authServiceMock = {
      login: jasmine.createSpy('login').and.returnValue(of([])),
      resetTimer: jasmine.createSpy('resetTimer')
    };
    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };
    dialogMock = {
      open: jasmine.createSpy('open').and.returnValue({
        afterClosed: () => of(null)
      })
    };

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        SharedModule
      ],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: MatDialog, useValue: dialogMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the login form', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.get('username')).toBeDefined();
    expect(component.loginForm.get('password')).toBeDefined();
  });

  it('should show error message if form is invalid on submit', () => {
    component.onLogin();
    expect(component.submitted).toBeTrue();
    expect(component.loginForm.valid).toBeFalse();
    expect(authServiceMock.login).not.toHaveBeenCalled();
  });

  it('should call AuthService.login on valid form submission', () => {
    const user: User[] = [{
      id: '1',
      name: 'Test User',
      rut: '12345678-0',
      username: 'testuser',
      password: 'password123',
      role: 'user'
    }];
    authServiceMock.login.and.returnValue(of(user));

    component.loginForm.setValue({ username: 'testuser', password: 'password123' });
    component.onLogin();

    expect(authServiceMock.login).toHaveBeenCalledWith('testuser', 'password123');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
    expect(authServiceMock.resetTimer).toHaveBeenCalled();
  });

  it('should show error message on failed login', () => {
    authServiceMock.login.and.returnValue(throwError(() => new Error('Invalid credentials')));

    component.loginForm.setValue({ username: 'wronguser', password: 'wrongpass' });
    component.onLogin();

    expect(authServiceMock.login).toHaveBeenCalledWith('wronguser', 'wrongpass');
    expect(component.errorMessage).toBe('Usuario o contraseña incorrectos');
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should open register dialog when clicking register link', () => {
    component.openRegisterDialog();
    expect(dialogMock.open).toHaveBeenCalled();
  });
});