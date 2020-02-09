import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {} from 'protractor';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor() {}
  @Input() collapse: boolean = false;
  ngOnInit() {}

  toggleNavbarMenu() {
    this.collapse = !this.collapse;
  }
}
