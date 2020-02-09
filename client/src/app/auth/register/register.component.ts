import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private cookieService: CookieService
  ) {}

  ngOnInit() {}
  register(data) {
    console.log(data);
    this.authService.register(data).subscribe(
      res => {
        console.log(res);
        this.cookieService.set('name', res['token']);
        const user = this.authService.getUser().subscribe(res => {
          console.log(res);
        });
      },
      err => {
        console.log(err.error);
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
