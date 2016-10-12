import {
  AfterContentInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  Output,
  Provider,
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
import { HightlightPipe } from './autocomplete.pipe';
import {
  coerceBooleanProperty,
  KeyCodes
} from '../core/core';

class Item {
  public text: string;
  public value: string;

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

export const MD2_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Md2Autocomplete),
  multi: true
};

@Component({
  moduleId: module.id,
  selector: 'md2-autocomplete',
  template: `
    <div class="md2-autocomplete-wrap" [class.is-focused]="inputFocused || isMenuVisible">
      <input [(ngModel)]="inputBuffer" type="text" tabs="false" autocomplete="off" [readonly]="readonly" [tabindex]="disabled ? -1 : tabindex" [disabled]="disabled" class="md2-autocomplete-input" (focus)="onInputFocus()" (blur)="onInputBlur()" (keydown)="inputKeydown($event)" (change)="$event.stopPropagation()" />
      <span class="md2-autocomplete-placeholder" [class.has-value]="inputBuffer">
        {{placeholder}}
        <span class="md2-placeholder-required" *ngIf="required">*</span>
      </span>
      <svg *ngIf="inputBuffer" (click)="onClear()" width="24" height="24" viewBox="0 0 24 24">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
      </svg>
    </div>
    <ul *ngIf="isMenuVisible" class="md2-autocomplete-menu" (mouseenter)="listEnter()" (mouseleave)="listLeave()">
      <li class="md2-option" *ngFor="let l of list; let i = index;" [class.focus]="focusedOption === i" (click)="select($event, i)">
        <div class="md2-text" [innerHtml]="l.text | hightlight:inputBuffer"></div>
      </li>
    </ul>
  `,
  styles: [`
    md2-autocomplete { position: relative; display: block; margin: 18px 0; outline: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -moz-backface-visibility: hidden; -webkit-backface-visibility: hidden; backface-visibility: hidden; }
    md2-autocomplete.md2-autocomplete-disabled { pointer-events: none; cursor: default; }
    md2-autocomplete .md2-autocomplete-wrap { position: relative; display: block; width: 100%; padding: 2px 2px 1px; border-bottom: 1px solid rgba(0, 0, 0, 0.12); box-sizing: border-box; min-width: 64px; min-height: 26px; cursor: pointer; }
    .md2-autocomplete-wrap.is-focused { padding-bottom: 0; border-bottom: 2px solid #106cc8; }
    md2-autocomplete.md2-autocomplete-disabled .md2-autocomplete-wrap { color: rgba(0,0,0,0.38); border-color: transparent; background-image: linear-gradient(to right, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.38) 33%, transparent 0%); background-position: bottom -1px left 0; background-size: 4px 1px; background-repeat: repeat-x; cursor: default; cursor: default; }
    md2-autocomplete.md2-autocomplete-disabled .md2-autocomplete-wrap.is-focused { padding-bottom: 1px; border-bottom: 1px solid transparent; }
    .md2-autocomplete-wrap .md2-autocomplete-input { width: 100%; height: 26px; font-size: 15px; outline: none; background: transparent; border: 0; box-sizing: border-box; }
    md2-autocomplete.md2-autocomplete-disabled .md2-autocomplete-input { color: rgba(0,0,0,0.38); }
    md2-autocomplete .md2-autocomplete-placeholder { color: rgba(0, 0, 0, 0.38); position: absolute; right: 26px; bottom: 100%; left: 0; color: rgba(0,0,0,0.38); max-width: 100%; padding-left: 3px; padding-right: 0; line-height: 1.4; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; pointer-events: none; z-index: 1; transform: translate3d(0,26px,0) scale(1); transition: transform .4s cubic-bezier(.25,.8,.25,1); transform-origin: left top; color: rgba(0, 0, 0, 0.38); }
    .md2-autocomplete-wrap.is-focused .md2-autocomplete-placeholder { color: #2196f3; }
    .md2-autocomplete-wrap.is-focused .md2-autocomplete-placeholder .md2-placeholder-required { color: #f00; }
    .md2-autocomplete-wrap.is-focused .md2-autocomplete-placeholder,
    md2-autocomplete .md2-autocomplete-placeholder.has-value { transform: translate3d(0,6px,0) scale(.75); }
    .md2-autocomplete-wrap svg { position: absolute; right: 0; top: 0; display: block; height: 100%; background: #fff; fill: currentColor; color: rgba(0,0,0,0.54); }
    .md2-autocomplete-menu { position: absolute; left: 0; top: 100%; display: block; z-index: 10; width: 100%; margin: 0; padding: 8px 0; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12); max-height: 256px; min-height: 48px; overflow-y: auto; background: #fff; }
    .md2-autocomplete-menu .md2-option { position: relative; display: block; color: #212121; cursor: pointer; width: auto; padding: 0 16px; height: 48px; line-height: 48px; -moz-transition: background 0.15s linear; -o-transition: background 0.15s linear; -webkit-transition: background 0.15s linear; transition: background 0.15s linear; }
    .md2-autocomplete-menu .md2-option:hover,
    .md2-autocomplete-menu .md2-option.focus { background: #eeeeee; }
    .md2-autocomplete-menu .md2-option .md2-text { width: auto; white-space: nowrap; overflow: hidden; -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; text-overflow: ellipsis; font-size: 16px; }
    .md2-autocomplete-menu .highlight { color: #757575; }
  `],
  providers: [MD2_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR],
  host: {
    'role': 'autocomplete',
    '[id]': 'id',
    '[class.md2-autocomplete-disabled]': 'disabled',
    '[attr.aria-disabled]': 'disabled'
  },
  encapsulation: ViewEncapsulation.None
})

export class Md2Autocomplete implements AfterContentInit, ControlValueAccessor {

  constructor(private element: ElementRef) { }

  ngAfterContentInit() { this._isInitialized = true; }

  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  private _value: any = '';
  private _readonly: boolean;
  private _required: boolean;
  private _disabled: boolean = false;
  private _isInitialized: boolean = false;
  private _onTouchedCallback: () => void = noop;
  private _onChangeCallback: (_: any) => void = noop;

  private _items: Array<any> = [];
  private list: Array<Item> = [];

  private focusedOption: number = 0;
  private inputBuffer: string = '';
  private selectedItem: Item = null;
  private inputFocused: boolean = false;
  private noBlur: boolean = true;

  @Input() id: string = 'md2-autocomplete-' + (++nextId);
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

  @Input()
  set items(value: Array<any>) { this._items = value; }

  @Input()
  get value(): any { return this._value; }
  set value(value: any) {
    if (value !== this._value) {
      this._value = value;
      this.inputBuffer = '';
      if (value) {
        let selItm = this._items.find((i: any) => this.equals(this.valueKey ? i[this.valueKey] : i, value));
        this.selectedItem = new Item(selItm, this.textKey, this.valueKey);
        if (this.selectedItem) { this.inputBuffer = this.selectedItem.text; }
      }
      if (!this.inputBuffer) { this.inputBuffer = ''; }
      if (this._isInitialized) {
        this._onChangeCallback(value);
        this.change.emit(value);
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
    let t1 = typeof o1, t2 = typeof o2, length: any, key: any, keySet: any;
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
    return ((this.inputFocused || this.noBlur) && this.list && this.list.length && !this.selectedItem) && !this.readonly ? true : false;
  }

  /**
   * update scroll of suggestion menu
   */
  private updateScroll() {
    if (this.focusedOption < 0) { return; }
    let menuContainer = this.element.nativeElement.querySelector('.md2-autocomplete-menu');
    if (!menuContainer) { return; }

    let choices = menuContainer.querySelectorAll('.md2-option');
    if (choices.length < 1) { return; }

    let highlighted: any = choices[this.focusedOption];
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
  private inputKeydown(event: KeyboardEvent) {
    if (this.disabled) { return; }
    switch (event.keyCode) {
      case KeyCodes.TAB: this.listLeave(); break;
      case KeyCodes.ESCAPE:
        event.stopPropagation();
        event.preventDefault();
        if (this.inputBuffer) {
          this.onClear();
        }
        break;

      case KeyCodes.ENTER:
        event.preventDefault();
        event.stopPropagation();
        if (this.isMenuVisible) {
          this.select(event, this.focusedOption);
        }
        break;

      case KeyCodes.DOWN_ARROW:
        event.preventDefault();
        event.stopPropagation();
        if (this.isMenuVisible) {
          this.focusedOption = (this.focusedOption === this.list.length - 1) ? 0 : Math.min(this.focusedOption + 1, this.list.length - 1);
          this.updateScroll();
        }
        break;
      case KeyCodes.UP_ARROW:
        event.preventDefault();
        event.stopPropagation();
        if (this.isMenuVisible) {
          this.focusedOption = (this.focusedOption === 0) ? this.list.length - 1 : Math.max(0, this.focusedOption - 1);
          this.updateScroll();
        }
        break;
      default:
        setTimeout(() => {
          this.updateItems(new RegExp(this.inputBuffer, 'ig'));
        }, 10);
    }
  }

  /**
   * select option
   * @param event
   * @param index of selected item
   */
  private select(event: Event, index: number) {
    event.preventDefault();
    event.stopPropagation();
    this.selectedItem = this.list[index];
    this.inputBuffer = this.list[index].text;
    this.updateValue();
  }

  /**
   * clear selected suggestion
   */
  private onClear() {
    if (this.disabled) { return; }
    this.inputBuffer = '';
    this.selectedItem = null;
    this.updateItems(new RegExp(this.inputBuffer, 'ig'));
    this._value = this.selectedItem ? this.selectedItem.value : this.selectedItem;
    this.updateValue();
  }

  /**
   * update value
   */
  private updateValue() {
    this._value = this.selectedItem ? this.selectedItem.value : this.selectedItem;
    this._onChangeCallback(this._value);
    this.change.emit(this._value);
    this.onFocus();
  }

  /**
   * component focus listener
   */
  private onFocus() {
    if (this.disabled) { return; }
    this.element.nativeElement.querySelector('input').focus();
  }

  /**
   * input focus listener
   */
  private onInputFocus() {
    this.inputFocused = true;
    this.updateItems(new RegExp(this.inputBuffer, 'ig'));
    this.focusedOption = 0;
  }

  /**
   * input blur listener
   */
  private onInputBlur() {
    this.inputFocused = false;
  }

  /**
   * suggestion menu mouse enter listener
   */
  private listEnter() { this.noBlur = true; }

  /**
   * suggestion menu mouse leave listener
   */
  private listLeave() { this.noBlur = false; }

  /**
   * Update suggestion to filter the query
   * @param query
   */
  private updateItems(query: RegExp) {
    this.list = this._items.map((i: any) => new Item(i, this.textKey, this.valueKey)).filter(i => query.test(i.text));
    if (this.list.length && this.list[0].text !== this.inputBuffer) {
      this.selectedItem = null;
    }
  }

  writeValue(value: any) {
    if (value !== this._value) {
      this._value = value;
      this.inputBuffer = '';
      if (value) {
        let selItm = this._items.find((i: any) => this.equals(this.valueKey ? i[this.valueKey] : i, value));
        this.selectedItem = new Item(selItm, this.textKey, this.valueKey);
        if (this.selectedItem) { this.inputBuffer = this.selectedItem.text; }
      }
      if (!this.inputBuffer) { this.inputBuffer = ''; }
    }
  }

  registerOnChange(fn: any) { this._onChangeCallback = fn; }

  registerOnTouched(fn: any) { this._onTouchedCallback = fn; }
}

export const MD2_AUTOCOMPLETE_DIRECTIVES = [Md2Autocomplete, HightlightPipe];

@NgModule({
  declarations: MD2_AUTOCOMPLETE_DIRECTIVES,
  imports: [CommonModule, FormsModule],
  exports: MD2_AUTOCOMPLETE_DIRECTIVES,
})
export class Md2AutocompleteModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Md2AutocompleteModule,
      providers: []
    };
  }
}