import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit() {}
  login(data) {
    this.authService.login(data).subscribe(res => {
      this.cookieService.set('keeperToken', res['token']);
      this.authService.getUser().subscribe(res => {
        this.cookieService.set('keeperUser', JSON.stringify(res));
        this.router.navigateByUrl('/');
      }),
        err => {
          console.log(err.error);
        };
    });
  }
}
