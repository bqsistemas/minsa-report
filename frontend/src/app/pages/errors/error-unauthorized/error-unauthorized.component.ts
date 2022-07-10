import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vex-error-unauthorized',
  templateUrl: './error-unauthorized.component.html',
  styleUrls: ['./error-unauthorized.component.scss']
})
export class ErrorUnauthorizedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  fnReturn() {
    location.href = '/';
  }
}
