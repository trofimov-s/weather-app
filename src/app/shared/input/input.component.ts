import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styles: [
    `
      mat-form-field {
        width: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  @Input()
  public label: string;

  @Input()
  public icon: string;

  @Output()
  public submitEv = new EventEmitter<void>();

  @Input({ required: true })
  public value = '';

  @Output()
  public valueChange = new EventEmitter<string>();
}
