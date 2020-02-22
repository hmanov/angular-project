import { Injectable } from '@angular/core';
import { CanLoad, Router, Route } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ContactsGuard implements CanLoad {
  constructor(private cookie: CookieService, private router: Router) {}
  canLoad(route: Route): boolean {
    if (!this.cookie.get('keeperToken')) {
      this.router.navigateByUrl('');
      return false;
    }
    return true;
  }
}
