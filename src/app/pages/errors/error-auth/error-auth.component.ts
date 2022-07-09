import { Component, OnInit } from '@angular/core';
import icSearch from '@iconify/icons-ic/twotone-search';

import { environment } from './../../../../environments/environment';
// services
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'vex-error-auth',
  templateUrl: './error-auth.component.html',
  styleUrls: ['./error-auth.component.scss']
})
export class ErrorAuthComponent implements OnInit {

  form: FormGroup;

  environment = environment;

  icSearch = icSearch;

  constructor(
    private _authService: AuthService,
    private router: Router
  ) {
    this.form = this.createFormTemp();
  }

  ngOnInit() {
  }
  createFormTemp(): FormGroup {
    return new FormGroup({
      user: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  fnLogin() {
    if (this.form.valid) {
      this._authService.postLogin(this.form.value).then((value: any) => {
        if (value.success) {
          this.router.navigate(['']);
        }
      }).catch((error) => {
        console.log(error);
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}