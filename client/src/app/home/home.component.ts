import { Component, OnInit, DoCheck } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, DoCheck {
  constructor(private cookieService: CookieService) {}
  user: any;
  ngOnInit() {}
  ngDoCheck() {
    this.user = this.cookieService.get('keeperUser');
    if (this.user) {
      this.user = JSON.parse(this.user);
    }
  }
}
