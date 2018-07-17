import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'cce-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingComponent {
  @Input() center: boolean;
  constructor() {
  }
}
