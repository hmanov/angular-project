import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {
  constructor(private cookie: CookieService, private router: Router) {}
  canActivate(): boolean {
    if (!this.cookie.get('keeperToken')) {
      this.router.navigateByUrl('');
      return false;
    }
    return true;
  }
}
