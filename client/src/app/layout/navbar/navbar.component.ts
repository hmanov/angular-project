import {
  Component,
  OnInit,
  Input,
  DoCheck,
  ViewContainerRef
} from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, DoCheck {
  constructor(
    private cookieService: CookieService,
    private toastr: ToastrService,
    private router: Router
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
    this.cookieService.delete('keeperUser');
    this.cookieService.delete('keeperToken');
    this.toastr.success(`You have logged out successfully`);
    this.router.navigateByUrl('/');
  }
}
