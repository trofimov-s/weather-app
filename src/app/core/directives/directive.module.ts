import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgVarDirective } from './ng-var/ng-var.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [NgVarDirective],
  exports: [NgVarDirective],
})
export class DirectiveModule {}
