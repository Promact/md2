import {
  AfterContentInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  Output,
  ViewEncapsulation,
  NgModule,
  ModuleWithProviders
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  coerceBooleanProperty,
  KeyCodes
} from '../core/core';

export class Option {
  text: string;
  value: string;

  constructor(source: any, textKey: string, valueKey: string) {
    if (typeof source === 'string') {
      this.text = this.value = source;
    }
    if (typeof source === 'object') {
      this.text = source[textKey];
      this.value = valueKey ? source[valueKey] : source;
    }
  }
}

const noop = () => { };

let nextId = 0;

export const MD2_MULTISELECT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Md2Multiselect),
  multi: true
};

@Component({
  moduleId: module.id,
  selector: 'md2-multiselect',
  template: `
    <div class="md2-multiselect-container">
      <span class="md2-multiselect-placeholder" [class.has-value]="_items.length">
        {{placeholder}}
        <span class="md2-placeholder-required" *ngIf="required">*</span>
      </span>
      <div class="md2-multiselect-value">
        <div *ngFor="let v of _items; let last = last" class="md2-multiselect-value-item">
          <span class="md2-multiselect-text">{{v.text}}</span><span *ngIf="!last">,&nbsp;</span>
        </div>
      </div>
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path d="M7 10l5 5 5-5z" />
      </svg>
    </div>
    <ul *ngIf="isMenuVisible" class="md2-multiselect-menu">
      <li class="md2-option" *ngFor="let l of _list; let i = index;" [class.active]="_isActive(i)" [class.focus]="focusedOption === i" (click)="_handleOptionClick($event, i)">
        <div class="md2-option-icon"></div>
        <div class="md2-option-text" [innerHtml]="l.text"></div>
      </li>
    </ul>
  `,
  styleUrls: ['multiselect.css'],
  providers: [MD2_MULTISELECT_CONTROL_VALUE_ACCESSOR],
  host: {
    'role': 'select',
    '[id]': 'id',
    '[class.md2-multiselect-disabled]': 'disabled',
    '[tabindex]': 'disabled ? -1 : tabindex',
    '[attr.aria-disabled]': 'disabled'
  },
  encapsulation: ViewEncapsulation.None
})

export class Md2Multiselect implements AfterContentInit, ControlValueAccessor {

  constructor(private element: ElementRef) { }

  ngAfterContentInit() { this._isInitialized = true; }

  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  private _value: any = '';
  private _readonly: boolean;
  private _required: boolean;
  private _disabled: boolean;
  private _isInitialized: boolean;
  private _onTouchedCallback: () => void = noop;
  private _onChangeCallback: (_: any) => void = noop;

  private _options: Array<any> = [];
  _list: Array<Option> = [];
  _items: Array<Option> = [];

  _focusedOption: number = 0;
  private isFocused: boolean = false;

  @Input() id: string = 'md2-multiselect-' + (++nextId);
  @Input() tabindex: number = 0;
  @Input() placeholder: string = '';
  @Input('item-text') textKey: string = 'text';
  @Input('item-value') valueKey: string = null;

  @Input()
  get readonly(): boolean { return this._readonly; }
  set readonly(value) { this._readonly = coerceBooleanProperty(value); }

  @Input()
  get required(): boolean { return this._required; }
  set required(value) { this._required = coerceBooleanProperty(value); }

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value) { this._disabled = coerceBooleanProperty(value); }

  @Input('items')
  set options(value: Array<any>) { this._options = value; }

  @Input()
  get value(): any { return this._value; }
  set value(value: any) { this.setValue(value); }

  /**
   * set value
   * @param value
   */
  private setValue(value: any) {
    if (value !== this._value) {
      this._value = value;
      this._items = [];
      if (value && value.length && typeof value === 'object' && Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          let selItm = this._options.find((itm: any) => this.equals(this.valueKey ? itm[this.valueKey] : itm, value[i]));
          if (selItm) { this._items.push(new Option(selItm, this.textKey, this.valueKey)); }
        }
      }
      if (this._isInitialized) {
        this._onChangeCallback(value);
        this.change.emit(this._value);
      }
    }
  }

  /**
   * Compare two vars or objects
   * @param o1 compare first object
   * @param o2 compare second object
   * @return boolean comparation result
   */
  private equals(o1: any, o2: any) {
    if (o1 === o2) { return true; }
    if (o1 === null || o2 === null) { return false; }
    if (o1 !== o1 && o2 !== o2) { return true; }
    let t1 = typeof o1, t2 = typeof o2, key: any, keySet: any;
    if (t1 === t2 && t1 === 'object') {
      keySet = Object.create(null);
      for (key in o1) {
        if (!this.equals(o1[key], o2[key])) { return false; }
        keySet[key] = true;
      }
      for (key in o2) {
        if (!(key in keySet) && key.charAt(0) !== '$' && o2[key]) { return false; }
      }
      return true;
    }
    return false;
  }

  get isMenuVisible(): boolean {
    return (this.isFocused && this._list && this._list.length) && !this.readonly ? true : false;
  }

  /**
   * to update scroll of options
   */
  private updateScroll() {
    if (this._focusedOption < 0) { return; }
    let menuContainer = this.element.nativeElement.querySelector('.md2-multiselect-menu');
    if (!menuContainer) { return; }

    let choices = menuContainer.querySelectorAll('.md2-option');
    if (choices.length < 1) { return; }

    let highlighted: any = choices[this._focusedOption];
    if (!highlighted) { return; }

    let top: number = highlighted.offsetTop + highlighted.clientHeight - menuContainer.scrollTop;
    let height: number = menuContainer.offsetHeight;

    if (top > height) {
      menuContainer.scrollTop += top - height;
    } else if (top < highlighted.clientHeight) {
      menuContainer.scrollTop -= highlighted.clientHeight - top;
    }
  }

  @HostListener('click', ['$event'])
  private _handleClick(event: MouseEvent) {
    if (this.disabled) {
      event.stopPropagation();
      event.preventDefault();
      return;
    }
    this.updateOptions();
    this.element.nativeElement.focus();
  }

  @HostListener('keydown', ['$event'])
  private _handleKeydown(event: KeyboardEvent) {
    if (this.disabled) { return; }

    if (this.isMenuVisible) {
      event.preventDefault();
      event.stopPropagation();

      switch (event.keyCode) {
        case KeyCodes.TAB:
        case KeyCodes.ESCAPE: this.onBlur(); break;
        case KeyCodes.ENTER:
        case KeyCodes.SPACE: this._handleOptionClick(event, this._focusedOption); break;

        case KeyCodes.DOWN_ARROW:
          this._focusedOption = (this._focusedOption === this._list.length - 1) ? 0 : Math.min(this._focusedOption + 1, this._list.length - 1);
          this.updateScroll();
          break;
        case KeyCodes.UP_ARROW:
          this._focusedOption = (this._focusedOption === 0) ? this._list.length - 1 : Math.max(0, this._focusedOption - 1);
          this.updateScroll();
          break;
      }
    } else {
      switch (event.keyCode) {
        case KeyCodes.ENTER:
        case KeyCodes.SPACE:
        case KeyCodes.DOWN_ARROW:
        case KeyCodes.UP_ARROW:
          event.preventDefault();
          event.stopPropagation();
          this.updateOptions();
          break;
      }
    }
  }

  /**
   * on focus current component
   */
  private onFocus() {
    this.isFocused = true;
    this._focusedOption = 0;
  }

  @HostListener('blur')
  private onBlur() { this.isFocused = false; }

  /**
   * to check current option is active or not
   * @param index
   * @return boolean the item is active or not
   */
  _isActive(index: number): boolean {
    return this._items.map(i => i.text).indexOf(this._list[index].text) < 0 ? false : true;
  }

  /**
   * to toggle option to select/deselect option
   * @param event
   * @param index
   */
  _handleOptionClick(event: Event, index: number) {
    event.preventDefault();
    event.stopPropagation();

    let ind = this._items.map(i => i.text).indexOf(this._list[index].text);
    if (ind < 0) {
      this._items.push(this._list[index]);
      this._items = this._items.sort((a, b) => { return this._list.findIndex((i: any) => i.text === a.text) - this._list.findIndex((i: any) => i.text === b.text); });
    } else {
      this._items.splice(ind, 1);
    }

    this._value = new Array<any>();
    for (let i = 0; i < this._items.length; i++) {
      this._value.push(this._items[i].value);
    }
    this._onChangeCallback(this._value);
    this.change.emit(this._value);
  }

  /**
   * update options
   */
  private updateOptions() {
    this._list = this._options.map((item: any) => new Option(item, this.textKey, this.valueKey));
    if (this._list.length > 0) {
      this.onFocus();
    }
  }

  /**
   * Implemented as part of ControlValueAccessor.
   * TODO: internal
   */
  writeValue(value: any) {
    if (value !== this._value) {
      this._value = value;
      this._items = [];
      if (value && value.length && typeof value === 'object' && Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          let selItm = this._options.find((itm: any) => this.equals(this.valueKey ? itm[this.valueKey] : itm, value[i]));
          if (selItm) { this._items.push(new Option(selItm, this.textKey, this.valueKey)); }
        }
      }
    }
  }

  /**
   * Implemented as part of ControlValueAccessor.
   * TODO: internal
   */
  registerOnChange(fn: any) { this._onChangeCallback = fn; }

  /**
   * Implemented as part of ControlValueAccessor.
   * TODO: internal
   */
  registerOnTouched(fn: any) { this._onTouchedCallback = fn; }
}

export const MD2_MULTISELECT_DIRECTIVES = [Md2Multiselect];

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: MD2_MULTISELECT_DIRECTIVES,
  declarations: MD2_MULTISELECT_DIRECTIVES,
})
export class Md2MultiselectModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Md2MultiselectModule,
      providers: []
    };
  }
}
