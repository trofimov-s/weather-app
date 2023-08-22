import {
  Directive,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ngVar]',
})
export class NgVarDirective implements OnInit, OnChanges {
  private templateContext: any = {};

  @Input()
  public ngVar: any;

  constructor(
    private vcRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if ('ngVar' in changes) {
      if (this.templateContext.ngVar !== this.ngVar) {
        this.templateContext.$implicit = this.templateContext.ngVar = this.ngVar;
      }
    }
  }

  public ngOnInit(): void {
    this.vcRef.createEmbeddedView(this.templateRef, this.templateContext);
  }
}
