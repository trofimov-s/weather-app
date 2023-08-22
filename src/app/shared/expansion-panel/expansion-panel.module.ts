import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { ExpandionPanelComponent } from './expansion-panel.component';

@NgModule({
  imports: [CommonModule, MatExpansionModule],
  declarations: [ExpandionPanelComponent],
  exports: [ExpandionPanelComponent],
})
export class ExpansionPanelModule {}
