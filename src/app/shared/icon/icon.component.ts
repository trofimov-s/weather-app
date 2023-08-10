import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  template: `<span class="material-icons" [ngClass]="extendClass">{{ icon }}</span>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  @Input({ required: true }) public icon: string;
  @Input() public extendClass: string;
}
