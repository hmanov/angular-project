import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit() {}
  register(data) {
    this.authService.register(data).subscribe(
      res => {
        this.cookieService.set('keeperToken', res['token']);
        this.authService.getUser().subscribe(res => {
          this.cookieService.set('keeperUser', JSON.stringify(res));
          this.router.navigateByUrl('/');
        });
      },
      err => {
        console.log(err);
      }
    );
  }
  nameCheck(field) {
    const classes = {
      green: field.value.length > 3,
      red: field.value.length <= 3
    };
    return classes;
  }
  isFormValid(form) {
    const { name, email, password, repeatPassword } = form.value;
    if (name && email && password && repeatPassword) {
      return true;
    }
    return true;
  }
}
