import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../users/user.service';
import {ArrayUpdate} from '../../shared/inmutable-array-update';
import {ArrayInsert} from '../../shared/inmutable-array-add';
import {ArrayDelete} from '../../shared/inmutable-array-delete';

@Component({
  selector: 'cce-new-place',
  templateUrl: './new-place.component.html',
  styleUrls: ['./new-place.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewPlaceComponent implements OnInit {
  newPlace: FormGroup;
  approvers: any[] = [];
  weekDaysHours: any[] = [
    {name: 'Lunes', value: 0, hours: [{min: 8, max: 18}]},
    {name: 'Martes', value: 1, hours: [{min: 8, max: 18}]},
    {name: 'Miércoles', value: 2, hours: [{min: 8, max: 18}]},
    {name: 'Jueves', value: 3, hours: [{min: 8, max: 18}]},
    {name: 'Viernes', value: 4, hours: [{min: 8, max: 18}]},
    {name: 'Sábado', value: 5, hours: [{min: 8, max: 18}]},
    {name: 'Domingo', value: 6, hours: [{min: 8, max: 18}]}
  ];

  constructor(private userApi: UserService) {
    this.newPlace = new FormGroup({
      nombre: new FormControl('', Validators.required),
      ubicacion: new FormControl('', Validators.required),
      dias_disponibles: new FormControl([], Validators.required)
    });
  }

  ngOnInit() {
    this.userApi.getUsersList().subscribe(users => {
      console.log('users', users);
    });
  }

  updateHours(day, range, value) {
    const toUpdateDayIndex = this.weekDaysHours.findIndex(day_ => day_.value === day);
    const dayObject = this.weekDaysHours[toUpdateDayIndex];
    this.weekDaysHours = ArrayUpdate(this.weekDaysHours, toUpdateDayIndex, {
      ...dayObject,
      hours: ArrayUpdate(dayObject.hours, range, {min: value.from, max: value.to})
    });
  }

  addRange(day, index) {
    const toUpdateDayIndex = this.weekDaysHours.findIndex(day_ => day_.value === day);
    const dayObject = this.weekDaysHours[toUpdateDayIndex];
    this.weekDaysHours = ArrayUpdate(this.weekDaysHours, toUpdateDayIndex, {
      ...dayObject,
      hours: ArrayInsert(dayObject.hours, {min: 8, max: 18}, index)
    });
  }

  removeRange(day, index) {
    const toUpdateDayIndex = this.weekDaysHours.findIndex(day_ => day_.value === day);
    const dayObject = this.weekDaysHours[toUpdateDayIndex];
    this.weekDaysHours = ArrayUpdate(this.weekDaysHours, toUpdateDayIndex, {
      ...dayObject,
      hours: ArrayDelete(dayObject.hours, index)
    });
  }
}
