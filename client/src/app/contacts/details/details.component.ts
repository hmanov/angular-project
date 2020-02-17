import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactsService } from '../contacts.service';
import { FormControl, FormGroup, FormControlName, Validators } from '@angular/forms';
import { Contact } from '../Contact';
import { formatDate, DatePipe } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  contactDetails: Contact;

  form: FormGroup;
  constructor(private route: ActivatedRoute, private contactsService: ContactsService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');

        this.contactsService.contactDetails(id).subscribe(res => {
          this.contactDetails = res;
          let { name, email, phone, type, date } = this.contactDetails;
          const pipe = new DatePipe('en-US');
          date = pipe.transform(date, 'dd-MM-yyyy hh:mm:ss');
          console.log(date);
          this.form = new FormGroup({
            name: new FormControl(name),
            email: new FormControl(email),
            phone: new FormControl(phone),
            type: new FormControl(type),
            date: new FormControl(date)
          });
        });
      },
      err => {
        console.log(err);
      },
      () => {}
    );
  }

  log(): void {
    let test = true;
    console.log(Object.entries(this.form.controls));
  }
}
