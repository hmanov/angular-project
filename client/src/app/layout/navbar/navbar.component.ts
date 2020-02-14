import { Component, OnInit, Input, DoCheck } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, DoCheck {
  constructor(
    private cookieService: CookieService,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) {}
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
    this.authService.logout();
  }
}
