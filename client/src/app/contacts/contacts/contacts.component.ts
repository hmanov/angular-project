import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  constructor(private contactsService: ContactsService) {}

  contacts = this.contactsService.getAllContacts();

  ngOnInit() {}
}
