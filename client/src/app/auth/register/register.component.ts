import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  register(data: NgForm) {
    console.log(data);
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
      return false;
    }
    return true;
  }
}
