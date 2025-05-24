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
    httpMock.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new user', () => {
    const newUser: User = {
      id: '1', 
      name: 'John Doe',
      rut: '12345678-9',
      username: 'johndoe',
      password: 'password123',
      role: 'user'
    };

    service.addUser(newUser).subscribe(user => {
      expect(user).toEqual(newUser);
    });

    const req = httpMock.expectOne('http://localhost:3000/users');
    expect(req.request.method).toBe('POST');
    req.flush(newUser);
  });

  it('should get users by username', () => {
    const username = 'johndoe';
    const mockUsers: User[] = [
      {
        id: '1',
        name: 'John Doe',
        rut: '12345678-9',
        username: 'johndoe',
        password: 'password123',
        role: 'user'
      }
    ];

    service.getUserByUsername(username).subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne(`http://localhost:3000/users?username=${username}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should update a user', () => {
    const updatedUser: User = {
      id: '1',
      name: 'John Updated',
      rut: '12345678-9',
      username: 'johndoe',
      password: 'newpassword',
      role: 'admin'
    };

    service.editUser(updatedUser).subscribe(user => {
      expect(user).toEqual(updatedUser);
    });

    const req = httpMock.expectOne(`http://localhost:3000/users/${updatedUser.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedUser);
  });

  it('should delete a user', () => {
    const userId = '1';

    service.deleteUser(userId).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`http://localhost:3000/users/${userId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});