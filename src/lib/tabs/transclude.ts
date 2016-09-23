import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

@Directive({ selector: '[transclude]' })
export class Md2Transclude {

  private _md2Transclude: TemplateRef<any>;

  constructor(public viewRef: ViewContainerRef) { }

  @Input()
  private set md2Transclude(templateRef: TemplateRef<any>) {
    this._md2Transclude = templateRef;
    if (templateRef) {
      this.viewRef.createEmbeddedView(templateRef);
    }
  }

  private get md2Transclude() {
    return this._md2Transclude;
  }

}
