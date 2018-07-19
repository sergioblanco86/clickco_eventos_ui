import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {UserService} from '../user.service';

@Component({
  selector: 'cce-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditUserComponent implements OnInit {
  updateUserForm: FormGroup;
  loading: boolean;

  constructor(public dialogRef: MatDialogRef<EditUserComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private userService: UserService,
              public snackbar: MatSnackBar,
              private cd: ChangeDetectorRef) {
    this.updateUserForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      cedula: new FormControl('', Validators.required),
      estado: new FormControl('', Validators.required),
      tipo_perfil: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    });
  }

  ngOnInit() {
    this.updateUserForm.patchValue({
      nombre: this.data.user.nombre,
      apellido: this.data.user.apellido,
      cedula: this.data.user.cedula,
      estado: this.data.user.estado,
      tipo_perfil: this.data.user.tipo_perfil,
      email: this.data.user.email
    });
  }

  saveUser(user) {
    this.loading = true;
    const toUpdateUser = {...user, id: this.data.user.id};
    this.userService.updateUser(toUpdateUser).subscribe(res => {
      this.snackbar.open('Usuario editado exitosamente', 'OK', {duration: 4000});
      this.closeDialog(toUpdateUser);
    }, error => {
      this.loading = false;
      this.cd.markForCheck();
      this.snackbar.open(error.error.message, 'OK', {duration: 4000});
    });
  }

  closeDialog(data) {
    this.dialogRef.close(data);
  }
}
