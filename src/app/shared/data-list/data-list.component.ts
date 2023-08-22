import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DataListOption } from '@core/model/shared';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataListComponent {
  @Input({ required: true })
  public options: Array<DataListOption>;

  @Input()
  public unit: string;

  public trackBy(i: number): number {
    return i;
  }
}
