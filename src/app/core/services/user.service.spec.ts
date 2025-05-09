import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../models/user.model';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no queden solicitudes HTTP pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a new user via POST', () => {
    const newUser: User = {
      name: 'Juan Pérez',
      rut: '12345678-0',
      username: '12345678',
      password: 'password123',
      role: 'user'
    };

    service.registerUser(newUser).subscribe(user => {
      expect(user).toEqual({ ...newUser, id: '1' });
    });

    const req = httpMock.expectOne('http://localhost:3000/users');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newUser);
    req.flush({ ...newUser, id: '1' }); 
  });

  it('should get users by username via GET', () => {
    const username = '12345678';
    const mockUsers: User[] = [
      {
        id: '1',
        name: 'Juan Pérez',
        rut: '12345678-0',
        username: '12345678',
        password: 'password123',
        role: 'user'
      }
    ];

    service.getUserByUsername(username).subscribe(users => {
      expect(users.length).toBe(1);
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne(`http://localhost:3000/users?username=${username}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers); 
  });
});