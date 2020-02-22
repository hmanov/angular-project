import { Injectable, SkipSelf } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from './Contact';
const url = 'http://localhost:3000/api/contacts';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  constructor(public http: HttpClient) {}

  createContact(data: Contact) {
    return this.http.post(url, data);
  }

  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(url);
  }

  contactDetails(id: string): Observable<Contact> {
    return this.http.get<Contact>(`${url}/${id}`);
  }

  deleteContact(id: string) {
    return this.http.delete(`${url}/${id}`);
  }
  editContact(id: string, data: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${url}/${id}`, data);
  }
}
