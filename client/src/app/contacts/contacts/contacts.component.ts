import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  constructor(
    private contactsService: ContactsService,
    private router: Router
  ) {}

  contacts: any;

  ngOnInit() {
    this.contactsService.getAllContacts().subscribe(res => {
      this.contacts = res;
    });
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd && e.url === '/contacts') {
        this.contactsService.getAllContacts().subscribe(res => {
          console.log(res);
          Object.assign(this.contacts, res);
          console.log(e);
        });
      }
    });
  }
}
