import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
// services
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'vex-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInUp400ms
  ]
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  inputType = 'password';
  visible = false;

  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;

  constructor(
              private _authService: AuthService,
              private router: Router,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: ['45662952', Validators.required],
      password: ['q1w2e3r4', Validators.required]
    });
  }

  send() {
    if (this.form.valid) {
      this._authService.postLogin(this.form.value).then((value: any) => {
        if (value.auth_token) {
          this.router.navigate(['']);
        }
      }).catch((error) => {
        this.snackbar.open('No se puede iniciar sesión con las credenciales proporcionadas.', 'Aviso!', {
          panelClass: 'bg-deep-orange-500',
          duration: 3500
        });
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }
}
