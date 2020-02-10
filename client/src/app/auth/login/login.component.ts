import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}
  login(data) {
    this.authService.login(data).subscribe(
      res => {
        this.cookieService.set('keeperToken', res['token']);
      },
      err => {
        const errorsToDisplay = err.error.errors.map(e => e.msg).join(', ');
        this.toastr.error(errorsToDisplay);
      },
      () => {
        this.authService.getUser().subscribe(
          res => {
            this.cookieService.set('keeperUser', JSON.stringify(res));
            this.router.navigateByUrl('/');
          },
          err => {
            const errorsToDisplay = err.error.errors.map(e => e.msg).join(', ');
            this.toastr.error(errorsToDisplay);
          },
          () => {
            const name = JSON.parse(this.cookieService.get('keeperUser')).name;
            this.toastr.success(
              `Hello ${name} you have logged in successfully!`
            );
          }
        );
      }
    );
  }
}
