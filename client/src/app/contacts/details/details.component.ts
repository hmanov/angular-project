import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts.service';
import { FormControl, FormGroup, FormControlName, Validators } from '@angular/forms';
import { Contact } from '../Contact';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  contactDetails: Contact;

  form: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private contactsService: ContactsService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  edit: string = 'Save';
  id: string;
  validForm: boolean = true;
  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        this.id = params.get('id');

        this.contactsService.contactDetails(this.id).subscribe(res => {
          this.contactDetails = res;
          let { name, email, phone, type, date } = this.contactDetails;
          const pipe = new DatePipe('en-US');
          date = pipe.transform(date, 'dd-MM-yyyy hh:mm:ss');

          this.form = new FormGroup({
            name: new FormControl(name),
            email: new FormControl(email),
            phone: new FormControl(phone),
            type: new FormControl(type)
          });
          // this.form.controls['save'].disable;
          this.form.valueChanges.subscribe(change => {
            this.validForm = false;
          });
        });
      },
      err => {
        console.log(err);
      }
    );
  }

  editContact(): void {
    this.contactsService.editContact(this.id, this.form.value).subscribe(
      res => {},
      err => {},
      () => {
        this.toastr.success('Contact edited Successfully!');
      }
    );
  }
  delete() {
    if (confirm('Are you sure to delete this contact')) {
      this.contactsService.deleteContact(this.id).subscribe(
        res => {},
        err => {
          this.toastr.error(err.error);
        },
        () => {
          this.toastr.success('Contact deleted successfully!');
          this.router.navigateByUrl('/contacts');
        }
      );
    }
  }
}
