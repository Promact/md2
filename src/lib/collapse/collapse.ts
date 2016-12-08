import {
  Directive,
  Input,
  NgModule,
  ModuleWithProviders
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Directive({
  selector: '[collapse]',
  host: {
    '[class.in]': '_isExpanded',
    '[class.collapse]': 'true',
    '[class.collapsing]': '_isCollapsing',
    '[attr.aria-expanded]': '_isExpanded',
    '[attr.aria-hidden]': '!_isExpanded',
  }
})

export class Md2Collapse {
  _isExpanded: boolean = true;
  _isCollapsing: boolean = false;

  @Input()
  get collapse(): boolean { return this._isExpanded; }
  set collapse(value: boolean) {
    this._isExpanded = value;
    this.toggle();
  }

  /**
   * toggle collapse
   */
  toggle() {
    if (this._isExpanded) { this.hide(); } else { this.show(); }
  }

  /**
   * hide collapse
   */
  hide() {
    this._isCollapsing = true;
    this._isExpanded = false;
    setTimeout(() => {
      this._isCollapsing = false;
    }, 4);
  }

  /**
   * show collapse
   */
  show() {
    this._isCollapsing = true;
    this._isExpanded = true;
    setTimeout(() => {
      this._isCollapsing = false;
    }, 4);
  }
}

export const MD2_COLLAPSE_DIRECTIVES: any[] = [Md2Collapse];

@NgModule({
  imports: [CommonModule],
  exports: MD2_COLLAPSE_DIRECTIVES,
  declarations: MD2_COLLAPSE_DIRECTIVES,
})
export class Md2CollapseModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Md2CollapseModule,
      providers: []
    };
  }
}
