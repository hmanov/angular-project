import { Component, OnInit, Input, DoCheck } from '@angular/core';
import {} from 'protractor';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, DoCheck {
  constructor(private cookieService: CookieService) {}
  @Input() collapse: boolean = false;
  user: any;
  ngOnInit() {}
  ngDoCheck() {
    this.user = this.cookieService.get('keeperUser');
    if (this.user) {
      this.user = JSON.parse(this.user);
    }
  }
  toggleNavbarMenu() {
    this.collapse = !this.collapse;
  }
  logout() {
    this.cookieService.delete('keeperUser');
    this.cookieService.delete('keepertoken');
  }
}
