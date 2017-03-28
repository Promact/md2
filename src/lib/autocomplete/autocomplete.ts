import {
  AfterContentInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
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
import { HighlightPipe } from './autocomplete-pipe';
import {
  coerceBooleanProperty,
  UP_ARROW,
  DOWN_ARROW,
  ENTER,
  ESCAPE,
  TAB
} from '../core/core';

export class Item {
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

let nextId = 0;

export const MD2_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Md2Autocomplete),
  multi: true
};

/** Change event object emitted by Md2Autocomplete. */
export class Md2AutocompleteChange {
  source: Md2Autocomplete;
  value: any;
}

@Component({
  moduleId: module.id,
  selector: 'md2-autocomplete',
  templateUrl: 'autocomplete.html',
  styleUrls: ['autocomplete.css'],
  providers: [MD2_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR],
  host: {
    'role': 'autocomplete',
    '[id]': 'id',
    '[attr.aria-label]': 'placeholder',
    '[attr.aria-required]': 'required.toString()',
    '[attr.aria-disabled]': 'disabled.toString()',
    '[class.md2-autocomplete-disabled]': 'disabled',
  },
  encapsulation: ViewEncapsulation.None,
  exportAs: 'md2Autocomplete'
})

export class Md2Autocomplete implements AfterContentInit, ControlValueAccessor {

  constructor(private _element: ElementRef) { }

  ngAfterContentInit() { this._isInitialized = true; }

  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  @Output() textChange = new EventEmitter();

  private _value: any = '';
  private _readonly: boolean = false;
  private _required: boolean = false;
  private _disabled: boolean = false;
  private _isInitialized: boolean = false;

  _onChange = (value: any) => { };
  _onTouched = () => { };

  private _items: Array<any> = [];
  _list: Array<Item> = [];

  private selectedItem: Item = null;
  private noBlur: boolean = false;
  _focusedOption: number = 0;
  _inputValue: string = '';
  _inputFocused: boolean = false;

  @Input() id: string = 'md2-autocomplete-' + (++nextId);
  @Input() tabindex: number = 0;
  @Input() placeholder: string = '';
  @Input('item-text') textKey: string = 'text';
  @Input('item-value') valueKey: string = null;
  @Input('min-length') minLength: number = 1;

  @Input()
  get readonly(): boolean { return this._readonly; }
  set readonly(value) { this._readonly = coerceBooleanProperty(value); }

  @Input()
  get required(): boolean { return this._required; }
  set required(value) { this._required = coerceBooleanProperty(value); }

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value) { this._disabled = coerceBooleanProperty(value); }

  @Input()
  set items(value: Array<any>) { this._items = value; }

  @Input()
  get value(): any { return this._value; }
  set value(value: any) {
    if (value !== this._value) {
      this._value = value;
      this._inputValue = '';
      if (value) {
        let selItm = this._items.find((i: any) => this.equals(this.valueKey ?
          i[this.valueKey] : i, value));
        this.selectedItem = new Item(selItm, this.textKey, this.valueKey);
        if (this.selectedItem) { this._inputValue = this.selectedItem.text; }
      }
      if (!this._inputValue) { this._inputValue = ''; }
      if (this._isInitialized) {
        this._emitChangeEvent();
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
    return ((this._inputFocused || this.noBlur) && this._list && this._list.length &&
      !this.selectedItem) && !this.readonly ? true : false;
  }

  /**
   * update scroll of suggestion menu
   */
  private updateScroll() {
    if (this._focusedOption < 0) { return; }
    let menuContainer = this._element.nativeElement.querySelector('.md2-autocomplete-menu');
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

  /**
   * input event listner
   * @param event
   */
  _handleKeydown(event: KeyboardEvent) {
    if (this.disabled) { return; }
    this.textChange.emit(this._inputValue);
    switch (event.keyCode) {
      case TAB: this._handleMouseLeave(); break;
      case ESCAPE:
        event.stopPropagation();
        event.preventDefault();
        if (this._inputValue) {
          this._onClear();
        }
        break;

      case ENTER:
        event.preventDefault();
        event.stopPropagation();
        if (this.isMenuVisible) {
          this._selectOption(event, this._focusedOption);
        }
        break;

      case DOWN_ARROW:
        event.preventDefault();
        event.stopPropagation();
        if (this.isMenuVisible) {
          this._focusedOption = (this._focusedOption === this._list.length - 1) ? 0 :
            Math.min(this._focusedOption + 1, this._list.length - 1);
          this.updateScroll();
        }
        break;
      case UP_ARROW:
        event.preventDefault();
        event.stopPropagation();
        if (this.isMenuVisible) {
          this._focusedOption = (this._focusedOption === 0) ? this._list.length - 1 :
            Math.max(0, this._focusedOption - 1);
          this.updateScroll();
        }
        break;
      default:
        setTimeout(() => {
          this.updateItems();
        }, 10);
    }
  }

  /**
   * select option
   * @param event
   * @param index of selected item
   */
  _selectOption(event: Event, index: number) {
    event.preventDefault();
    event.stopPropagation();
    this.selectedItem = this._list[index];
    this._inputValue = this._list[index].text;
    this.updateValue();
    this._handleMouseLeave();
  }

  /**
   * clear selected suggestion
   */
  _onClear() {
    if (this.disabled) { return; }
    this._inputValue = '';
    this.selectedItem = null;
    this.updateItems();
    this._value = this.selectedItem ? this.selectedItem.value : this.selectedItem;
    this.updateValue();
  }

  /**
   * update value
   */
  private updateValue() {
    this._value = this.selectedItem ? this.selectedItem.value : this.selectedItem;
    this._emitChangeEvent();
    this.onFocus();
  }

  /**
   * component focus listener
   */
  private onFocus() {
    if (this.disabled) { return; }
    this._element.nativeElement.querySelector('input').focus();
  }

  /**
   * input focus listener
   */
  _handleFocus() {
    this._inputFocused = true;
    this.updateItems();
    this._focusedOption = 0;
  }

  /**
   * input blur listener
   */
  _handleBlur() {
    this._inputFocused = false;
    this._onTouched();
  }

  /**
   * suggestion menu mouse enter listener
   */
  _handleMouseEnter() { this.noBlur = true; }

  /**
   * suggestion menu mouse leave listener
   */
  _handleMouseLeave() { this.noBlur = false; }

  /**
   * Update suggestion to filter the query
   * @param query
   */
  private updateItems() {
    if (this._inputValue.length < this.minLength) {
      this._list = [];
    } else {
      this._list = this._items.map((i: any) => new Item(i, this.textKey,
        this.valueKey)).filter(i => new RegExp(this._inputValue, 'ig').test(i.text));
      if (this._list.length && this._list[0].text !== this._inputValue) {
        this.selectedItem = null;
      }
    }
  }

  _emitChangeEvent(): void {
    let event = new Md2AutocompleteChange();
    event.source = this;
    event.value = this._value;
    this._onChange(event.value);
    this.change.emit(event);
  }

  writeValue(value: any): void {
    if (value !== this._value) {
      this._value = value;
      this._inputValue = '';
      if (value) {
        let selItm = this._items.find((i: any) => this.equals(this.valueKey ?
          i[this.valueKey] : i, value));
        this.selectedItem = new Item(selItm, this.textKey, this.valueKey);
        if (this.selectedItem) { this._inputValue = this.selectedItem.text; }
      }
      if (!this._inputValue) { this._inputValue = ''; }
    }
  }

  registerOnChange(fn: (value: any) => void): void { this._onChange = fn; }

  registerOnTouched(fn: () => {}): void { this._onTouched = fn; }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}

export const MD2_AUTOCOMPLETE_DIRECTIVES = [Md2Autocomplete, HighlightPipe];

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: MD2_AUTOCOMPLETE_DIRECTIVES,
  declarations: MD2_AUTOCOMPLETE_DIRECTIVES,
})
export class Md2AutocompleteModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Md2AutocompleteModule,
      providers: []
    };
  }
}
