import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import {UserService} from '../user.service';

@Component({
  selector: 'cce-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewUserComponent {

  userForm: FormGroup;
  loading: boolean;

  constructor(public snackBar: MatSnackBar, public dialogRef: MatDialogRef<NewUserComponent>, private userApi: UserService, private cd: ChangeDetectorRef) {
    this.userForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      cedula: new FormControl('', Validators.required),
      tipo_perfil: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      contrasena: new FormControl('', Validators.required)
    });
  }

  createUser(user, confirmation) {
    if (user.contrasena !== confirmation) {
      this.snackBar.open('Las contraseñas deben coincidir', 'OK', {duration: 4000});
      return;
    }
    this.loading = true;
    this.userApi.newUser(user).subscribe(res => {
      this.loading = false;
      this.closeDialog(user);
    }, err => {
      this.loading = false;
      this.cd.markForCheck();
      this.snackBar.open(err.error.message, 'OK', {duration: 4000});
    });
  }

  closeDialog(data) {
    this.dialogRef.close(data);
  }

}
