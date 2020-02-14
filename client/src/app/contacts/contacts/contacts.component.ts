import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  OnChanges,
  ChangeDetectorRef,
  DoCheck
} from '@angular/core';
import { ContactsService } from '../contacts.service';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  constructor(
    private contactsService: ContactsService,
    private cd: ChangeDetectorRef
  ) {}
  contacts;
  ngOnInit() {
    this.contactsService.getAllContacts().subscribe(res => {
      this.contacts = res;
    });
  }
}
