import { Component, OnInit, OnChanges, OnDestroy, Input } from '@angular/core';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  constructor(private contactsService: ContactsService) {}

  contacts;
  baseContacts;
  ngOnInit() {
    this.contactsService.getAllContacts().subscribe(e => {
      this.contacts = e;
      this.baseContacts = e;
    });
  }
  del(contact) {
    this.contacts = this.contacts.filter(e => e !== contact);
  }
  s(value) {
    this.contacts = this.baseContacts.filter(e => {
      for (let field of Object.values(e)) {
        if (field.toString().includes(value)) {
          return true;
        }
      }
    });
  }
}
