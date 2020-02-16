import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactsService } from '../contacts.service';
import {
  FormControl,
  FormGroup,
  FormControlName,
  Validators
} from '@angular/forms';
import { Contact } from '../Contact';
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
    private contactsService: ContactsService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');

        this.contactsService.contactDetails(id).subscribe(res => {
          this.contactDetails = res;
          const { name, email, phone, type, date } = this.contactDetails;

          this.form = new FormGroup({
            name: new FormControl({ value: name, disabled: true }),
            email: new FormControl({ value: email, disabled: true }),
            phone: new FormControl({ value: phone, disabled: true }),
            type: new FormControl({ value: type, disabled: true }),
            date: new FormControl({ value: date, disabled: true })
          });
          console.log(this.contactDetails);
        });
      },
      err => {
        console.log(err);
      },
      () => {}
    );
  }

  log(): void {
    const { name, email, phone, type, date } = this.contactDetails;
  }
}
