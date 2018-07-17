import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cce-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlacesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
