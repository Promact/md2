import {
  Directive,
  EventEmitter,
  Input,
  Output,
  NgModule,
  ModuleWithProviders
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Directive({
  selector: '[collapse]',
  host: {
    'role': 'collapse',
    '[class.in]': '_collapse',
    '[class.collapse]': 'true',
    '[class.collapsing]': '_collapsing',
    '[attr.aria-expanded]': '_collapse',
    '[attr.aria-hidden]': '!_collapse'
  },
  exportAs: 'md2Collapse'
})
export class Md2Collapse {
  _collapse: boolean = true;
  _collapsing: boolean = false;

  @Output() collapsed: EventEmitter<void> = new EventEmitter<void>();
  @Output() expanded: EventEmitter<void> = new EventEmitter<void>();

  @Input()
  get collapse(): boolean { return this._collapse; }
  set collapse(value: boolean) {
    this._collapse = value;
    this.toggle();
  }

  /**
   * toggle collapse
   */
  toggle() {
    if (this._collapse) { this.hide(); } else { this.show(); }
  }

  /**
  * show collapse
  */
  show() {
    this._collapsing = true;
    this._collapse = true;
    setTimeout(() => {
      this._collapsing = false;
    }, 4);
    this.expanded.emit();
  }

  /**
   * hide collapse
   */
  hide() {
    this._collapsing = true;
    this._collapse = false;
    setTimeout(() => {
      this._collapsing = false;
    }, 4);
    this.collapsed.emit();
  }

}

export const MD2_COLLAPSE_DIRECTIVES = [Md2Collapse];

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
