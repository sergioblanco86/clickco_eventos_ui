import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {Subscription} from 'rxjs';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'cce-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  userLogin: FormGroup;
  loading: boolean;
  subs: Subscription[] = [];

  constructor(private router: Router, private authService: AuthService, public snackBar: MatSnackBar) {
    this.userLogin = new FormGroup({
      email: new FormControl('', Validators.required),
      contrasena: new FormControl('', Validators.required)
    });
  }

  login(user) {
    this.loading = true;
    this.subs.push(this.authService.login(user)
      .subscribe((res: any) => {
        this.loading = false;
        if (res.token) {
          this.router.navigate(['main']);
        }
      }, err => {
        this.snackBar.open('Email o contraseña incorrectos', 'OK', {duration: 4000});
        this.loading = false;
      }));
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
