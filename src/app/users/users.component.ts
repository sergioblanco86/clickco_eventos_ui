import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {NewUserComponent} from './new-user/new-user.component';
import {UserService} from './user.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {EditUserComponent} from './edit-user/edit-user.component';

@Component({
  selector: 'cce-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'apellido', 'cedula', 'tipo_perfil', 'email', 'estado', 'fecha_creacion', 'fecha_modificacion'];
  dataSource = new MatTableDataSource([]);
  loading: boolean;
  expandedElement: any;

  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private userService: UserService, private cd: ChangeDetectorRef, public snackbar: MatSnackBar) {
  }

  ngOnInit() {
    this.getUsersList();
    this.dataSource.sort = this.sort;
  }

  openNewUser() {
    const dialogRef = this.dialog.open(NewUserComponent, {
      width: '500px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(user => {
      if (user) {
        this.getUsersList();
      }
    });
  }

  getUsersList() {
    this.loading = true;
    this.userService.getUsersList().subscribe((res: any[]) => {
      this.loading = false;
      this.dataSource.data = res[0];
      this.cd.markForCheck();
    });
  }

  selectElement(element) {
    this.expandedElement = element;
  }

  getUserProfileType(profile) {
    switch (profile) {
      case 1:
        return 'Administrador';
      case 2:
        return 'Aprobador';
      case 3:
      default:
        return 'Cliente';
    }
  }

  editUser(editUser) {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '500px',
      disableClose: true,
      data: {user: editUser}
    });

    dialogRef.afterClosed().subscribe(user => {
      if (user) {
        this.getUsersList();
      }
    });
  }

}
