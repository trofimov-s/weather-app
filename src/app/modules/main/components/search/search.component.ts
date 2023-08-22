import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  public value = '';

  @Output()
  public submitValue = new EventEmitter<string>();

  public submit(): void {
    if (this.value.trim()) {
      this.submitValue.emit(this.value.trim());
      this.value = '';
    }
  }
}
