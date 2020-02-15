import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  @Input() contact;
  @Output() deleted: EventEmitter<any> = new EventEmitter();
  constructor(
    private contactsService: ContactsService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {}
  deleteContact(id: string) {
    if (confirm('Are you sure to delete this contact')) {
      this.contactsService.deleteContact(id).subscribe(
        res => {},
        err => {
          this.toastr.error(err.error.msg);
        },
        () => {
          this.toastr.success(`Contact deleted successfully!`);
          this.router.navigateByUrl('/contacts');
          this.deleted.emit(this.contact._id);
        }
      );
    }
  }
}
