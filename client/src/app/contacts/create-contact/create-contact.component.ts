import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss']
})
export class CreateContactComponent implements OnInit {
  constructor(
    private contactsService: ContactsService,
    private router: Router
  ) {}

  ngOnInit() {}
  register(data) {
    this.contactsService.createContact(data).subscribe(
      res => {
        this.router.navigateByUrl('/contacts');
      },
      err => {},
      () => {}
    );
  }
}
