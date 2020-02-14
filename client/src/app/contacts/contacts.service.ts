import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  constructor(private http: HttpClient, private cookie: CookieService) {}
  token = this.cookie.get('keeperToken');
  createContact(data): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/contacts', data, {
      headers: { 'x-auth-token': this.token }
    });
  }
  getAllContacts() {
    return this.http.get('http://localhost:3000/api/contacts', {
      headers: { 'x-auth-token': this.token }
    });
  }
}
