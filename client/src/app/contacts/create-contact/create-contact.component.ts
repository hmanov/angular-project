import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss']
})
export class CreateContactComponent implements OnInit {
  constructor(
    private contactsService: ContactsService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}
  register(data) {
    this.contactsService.createContact(data).subscribe(
      res => {
        this.router.navigateByUrl('/contacts');
      },
      err => {
        console.log(err);
        this.toastr.error(`You must be signed in to create contacts`);
      },
      () => {
        this.toastr.success('Contact Created successfully!');
      }
    );
  }
}
