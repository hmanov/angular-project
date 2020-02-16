import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, from } from 'rxjs';
import { Contact } from './Contact';
const url = 'http://localhost:3000/api/contacts';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  constructor(private http: HttpClient, private cookie: CookieService) {}

  private getCredentials = () => {
    return { headers: { 'x-auth-token': this.cookie.get('keeperToken') } };
  };

  createContact(data: any) {
    return this.http.post(url, data, this.getCredentials());
  }

  getAllContacts() {
    return this.http.get(url, this.getCredentials());
  }

  contactDetails(id: string): Observable<Contact> {
    return this.http.get<Contact>(`${url}/${id}`, this.getCredentials());
  }

  deleteContact(id: string) {
    return this.http.delete(`${url}/${id}`, this.getCredentials());
  }
}
