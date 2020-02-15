import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactsService } from '../contacts.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  id: string;
  constructor(
    private route: ActivatedRoute,
    private contactsService: ContactsService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        this.id = params.get('id');
        this.contactsService.contactDetails(this.id).subscribe(res => {
          console.log(res);
        });
      },
      err => {
        console.log(err);
      },
      () => {}
    );
  }
}
