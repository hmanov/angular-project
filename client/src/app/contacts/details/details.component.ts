import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactsService } from '../contacts.service';
import { FormControl, FormGroup, FormControlName } from '@angular/forms';
import { Contact } from '../Contact';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  id: string;
  contactDetails: Contact;

  form: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private contactsService: ContactsService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        this.id = params.get('id');
        this.contactsService.contactDetails(this.id).subscribe(res => {
          this.contactDetails = res;
          const { name, email, phone, type, date } = this.contactDetails;

          this.form = new FormGroup({
            name: new FormControl(name),
            email: new FormControl(email),
            phone: new FormControl(phone),
            type: new FormControl(type),
            date: new FormControl(date)
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
    console.log(this.form);
  }
}
