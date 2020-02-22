import { Component, OnInit, SkipSelf } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ContactsService } from '../contacts/contacts.service';
import { Contact } from '../contacts/Contact';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private contactService: ContactsService
  ) {}
  user;
  contacts: Contact[];
  ngOnInit(): void {
    this.authService.getUser().subscribe(
      res => {
        this.user = res;
      },
      err => {
        this.toastr.error(err.error);
      },
      () => {}
    );
    this.contactService.getAllContacts().subscribe(res => {
      this.contacts = res;
    });
  }
  logout() {
    this.authService.logout();
  }
}
