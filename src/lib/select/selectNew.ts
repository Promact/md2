import {
  Component,
  Directive,
  ElementRef,
  HostListener,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  ViewEncapsulation,
  NgModule,
  ModuleWithProviders
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { KeyCodes } from '../core/core';

const noop = () => { };

let nextId = 0;

export const MD2_SELECT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Md2Select),
  multi: true
};

@Component({
  moduleId: module.id,
  selector: 'md2-select',
  template: 'I am a select',
  styles: [''],
  providers: [MD2_SELECT_CONTROL_VALUE_ACCESSOR],
  host: {
    'role': 'select',
    '[id]': 'id',
    '[class.md2-select-disabled]': 'disabled',
    '[tabindex]': 'disabled ? -1 : tabindex',
  },
  encapsulation: ViewEncapsulation.None
})
export class Md2Select implements ControlValueAccessor {

  constructor() { }

  private _value: Date = null;
  private _disabled: boolean = false;
  private _onTouchedCallback: () => void = noop;
  private _onChangeCallback: (_: any) => void = noop;

  private isMenuVisible: boolean = false;

  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value) {
    this._disabled = (value !== null && value !== false) ? true : null;
  }
  @Input() id: string = 'md2-select-' + (++nextId);
  @Input() placeholder: string;
  @Input() tabindex: number = 0;

  @Input()
  get value(): any { return this._value; }
  set value(value: any) {
    if (value !== this._value) {
      this._value = value;
      this._onChangeCallback(value);
      this.change.emit(value);
    }
  }

  @HostListener('click', ['$event'])
  private onClick(event: MouseEvent) {
    if (this.disabled) {
      event.stopPropagation();
      event.preventDefault();
      return;
    }
  }

  @HostListener('keydown', ['$event'])
  private onKeyDown(event: KeyboardEvent) {
    if (this.disabled) { return; }

    if (this.isMenuVisible) {
      event.preventDefault();
      event.stopPropagation();

      switch (event.keyCode) {
        case KeyCodes.TAB:
        case KeyCodes.ESCAPE: this.onBlur(); break;
      }
      //  switch (event.keyCode) {
      //    case KeyCodes.ENTER:
      //    case KeyCodes.SPACE: this.setDate(this.displayDate); break;

      //    case KeyCodes.RIGHT_ARROW: this.displayDate = this.dateUtil.incrementDays(displayDate, 1); break;
      //    case KeyCodes.LEFT_ARROW: this.displayDate = this.dateUtil.incrementDays(displayDate, -1); break;

      //    case KeyCodes.PAGE_DOWN: this.displayDate = this.dateUtil.incrementMonths(displayDate, 1); break;
      //    case KeyCodes.PAGE_UP: this.displayDate = this.dateUtil.incrementMonths(displayDate, -1); break;

      //    case KeyCodes.DOWN_ARROW: this.displayDate = this.dateUtil.incrementDays(displayDate, 7); break;
      //    case KeyCodes.UP_ARROW: this.displayDate = this.dateUtil.incrementDays(displayDate, -7); break;

      //    case KeyCodes.HOME: this.displayDate = this.dateUtil.getFirstDateOfMonth(displayDate); break;
      //    case KeyCodes.END: this.displayDate = this.dateUtil.getLastDateOfMonth(displayDate); break;
      //}
    }
  }

  @HostListener('blur')
  private onBlur() { this.isMenuVisible = false; }

  writeValue(value: any): void { this.value = value; }

  registerOnChange(fn: any) { this._onChangeCallback = fn; }

  registerOnTouched(fn: any) { this._onTouchedCallback = fn; }

}

@Component({
  moduleId: module.id,
  selector: 'md2-optgroup',
  template: `<ng-content></ng-content>`,
  styles: [''],
  host: {
  },
  encapsulation: ViewEncapsulation.None
})
export class Md2Optgroup {

  private _disabled: any;

  @Input() label: string;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value) {
    this._disabled = (value !== null && value !== false) ? true : null;
  }
}

@Directive({ selector: 'md2-option' })
export class Md2Option {
  constructor() { }

  private _value: any;
  private _disabled: any;
  private _selected: any;

  @Input() label: string;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value) {
    this._disabled = (value !== null && value !== false) ? true : null;
  }

  @Input()
  get selected(): boolean { return this._selected; }
  set selected(value) {
    this._selected = (value !== null && value !== false) ? true : null;
  }

  @Input()
  get value(): any { return this._value; }
  set value(value: any) {
    if (value !== this._value) {
      this._value = value;
    }
  }
}

export const MD2_SELECT_DIRECTIVES = [Md2Select, Md2Optgroup, Md2Option];

@NgModule({
  declarations: MD2_SELECT_DIRECTIVES,
  imports: [CommonModule, FormsModule],
  exports: MD2_SELECT_DIRECTIVES,
})
export class Md2SelectModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Md2SelectModule,
      providers: []
    };
  }
}
