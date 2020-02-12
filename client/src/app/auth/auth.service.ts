import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterUserData } from './User';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private cookie: CookieService) {}

  register(userData: RegisterUserData) {
    return this.http.post('http://localhost:3000/api/users', userData);
  }

  getUser() {
    const token = this.cookie.get('keeperToken');

    return this.http.get('http://localhost:3000/api/auth', {
      headers: { 'x-auth-token': token }
    });
  }
  login(userData) {
    return this.http.post('http://localhost:3000/api/auth', userData);
  }
}
