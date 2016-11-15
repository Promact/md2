import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Optional,
  Output,
  QueryList,
  Renderer,
  ViewEncapsulation,
  ViewChild,
  NgModule,
  ModuleWithProviders
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { transformPlaceholder, transformPanel, fadeInContent } from './select-animations';
import { ENTER, SPACE } from '../core/keyboard/keycodes';
import { coerceBooleanProperty } from '../core/coersion/boolean-property';

@Component({
  moduleId: module.id,
  selector: 'md2-select',
  templateUrl: 'select.html',
  styleUrls: ['select.css'],
  host: {
    'role': 'select',
    '[tabindex]': 'disabled ? -1 : tabindex',
    '[attr.aria-label]': 'placeholder',
    '[attr.aria-required]': 'required.toString()',
    '[attr.aria-disabled]': 'disabled.toString()',
    '[class.md2-select-disabled]': 'disabled',
    '[attr.aria-invalid]': '_control?.invalid || "false"',
    '(keydown)': '_handleKeydown($event)',
    '(blur)': '_onBlur()'
  },
  animations: [
    transformPlaceholder,
    transformPanel,
    fadeInContent
  ],
  encapsulation: ViewEncapsulation.None
})
export class Md2Select implements AfterContentInit, ControlValueAccessor, OnDestroy {

  private _panelOpen = false;
  private _selected: Md2Option;
  private _subscriptions: Subscription[] = [];
  private _changeSubscription: Subscription;
  private _tabSubscription: Subscription;

  private _required: boolean = false;
  private _disabled: boolean = false;

  _onChange: (value: any) => void;
  _onTouched: Function;

  @ContentChildren(Md2Option) options: QueryList<Md2Option>;

  @Input() placeholder: string;

  @Input()
  get disabled() {
    return this._disabled;
  }

  set disabled(value: any) {
    this._disabled = coerceBooleanProperty(value);
  }

  @Input()
  get required() {
    return this._required;
  }

  set required(value: any) {
    this._required = coerceBooleanProperty(value);
  }

  @Output() onOpen = new EventEmitter();
  @Output() onClose = new EventEmitter();

  constructor(private _element: ElementRef, private _renderer: Renderer,
    @Optional() public _control: NgControl) {
    this._control.valueAccessor = this;
  }

  ngAfterContentInit() {
    this._initKeyManager();
    this._listenToOptions();

    this._changeSubscription = this.options.changes.subscribe(() => {
      this._dropSubscriptions();
      this._listenToOptions();
    });
  }

  ngOnDestroy() {
    this._dropSubscriptions();
    this._changeSubscription.unsubscribe();
    this._tabSubscription.unsubscribe();
  }

  /** Toggles the overlay panel open or closed. */
  toggle(): void {
    this.panelOpen ? this.close() : this.open();
  }

  /** Opens the overlay panel. */
  open(): void {
    if (this.disabled) {
      return;
    }
    this._panelOpen = true;
  }

  /** Closes the overlay panel and focuses the host element. */
  close(): void {
    this._panelOpen = false;
    this._focusHost();
  }

  /**
   * Sets the select's value. Part of the ControlValueAccessor interface
   * required to integrate with Angular's core forms API.
   */
  writeValue(value: any): void {
    if (!this.options) { return; }

    this.options.forEach((option: Md2Option) => {
      if (option.value === value) {
        option.select();
      }
    });
  }

  /**
   * Saves a callback function to be invoked when the select's value
   * changes from user input. Part of the ControlValueAccessor interface
   * required to integrate with Angular's core forms API.
   */
  registerOnChange(fn: (value: any) => void): void {
    this._onChange = fn;
  }

  /**
   * Saves a callback function to be invoked when the select is blurred
   * by the user. Part of the ControlValueAccessor interface required
   * to integrate with Angular's core forms API.
   */
  registerOnTouched(fn: Function): void {
    this._onTouched = fn;
  }

  /**
   * Disables the select. Part of the ControlValueAccessor interface required
   * to integrate with Angular's core forms API.
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /** Whether or not the overlay panel is open. */
  get panelOpen(): boolean {
    return this._panelOpen;
  }

  /** The currently selected option. */
  get selected(): Md2Option {
    return this._selected;
  }

  /** The animation state of the placeholder. */
  _getPlaceholderState(): string {
    if (this.panelOpen || this.selected) {
      return 'floating-ltr';
    } else {
      return 'normal';
    }
  }

  /** The animation state of the overlay panel. */
  _getPanelState(): string {
    return 'showing-ltr';
  }

  /** Ensures the panel opens if activated by the keyboard. */
  _handleKeydown(event: KeyboardEvent): void {
    if (event.keyCode === ENTER || event.keyCode === SPACE) {
      this.open();
    }
  }

  /**
   * When the panel is finished animating, emits an event and focuses
   * an option if the panel is open.
   */
  _onPanelDone(): void {
    if (this.panelOpen) {
      this._focusCorrectOption();
      this.onOpen.emit();
    } else {
      this.onClose.emit();
    }
  }

  /**
   * Calls the touched callback only if the panel is closed. Otherwise, the trigger will
   * "blur" to the panel when it opens, causing a false positive.
   */
  _onBlur() {
    if (!this.panelOpen) {
      this._onTouched();
    }
  }

  /** Returns the correct tabindex for the select depending on disabled state. */
  _getTabIndex() {
    return this.disabled ? '-1' : '0';
  }

  /** Sets up a key manager to listen to keyboard events on the overlay panel. */
  private _initKeyManager() {
    //this._keyManager = new ListKeyManager(this.options);
    //this._tabSubscription = this._keyManager.tabOut.subscribe(() => {
    //  this.close();
    //});
  }

  /** Listens to selection events on each option. */
  private _listenToOptions(): void {
    this.options.forEach((option: Md2Option) => {
      const sub = option.onSelect.subscribe((isUserInput: boolean) => {
        if (isUserInput) {
          this._onChange(option.value);
        }
        this._onSelect(option);
      });
      this._subscriptions.push(sub);
    });
  }

  /** Unsubscribes from all option subscriptions. */
  private _dropSubscriptions(): void {
    this._subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
    this._subscriptions = [];
  }

  /** When a new option is selected, deselects the others and closes the panel. */
  private _onSelect(option: Md2Option): void {
    this._selected = option;
    this._updateOptions();
    this.close();
  }

  /** Deselect each option that doesn't match the current selection. */
  private _updateOptions(): void {
    this.options.forEach((option: Md2Option) => {
      if (option !== this.selected) {
        option.deselect();
      }
    });
  }

  /** Focuses the selected item. If no option is selected, it will focus
   * the first item instead.
   */
  private _focusCorrectOption(): void {
    //if (this.selected) {
    //  this._keyManager.setFocus(this._getOptionIndex(this.selected));
    //} else {
    //  this._keyManager.focusFirstItem();
    //}
  }

  /** Focuses the host element when the panel closes. */
  private _focusHost(): void {
    this._renderer.invokeElementMethod(this._element.nativeElement, 'focus');
  }

  /** Gets the index of the provided option in the option list. */
  private _getOptionIndex(option: Md2Option): number {
    return this.options.reduce((result: number, current: Md2Option, index: number) => {
      return result === undefined ? (option === current ? index : undefined) : result;
    }, undefined);
  }





  //constructor(public element: ElementRef, @Optional() public _control: NgControl) {
  //  this._control.valueAccessor = this;
  //}

  //private _value: any = null;
  //private _name: string = 'md2-select-' + _uniqueIdCounter++;
  //private _readonly: boolean = false;
  //private _required: boolean = false;
  //private _disabled: boolean = false;
  ////private _multiple: boolean;
  //private _selected: Md2Option = null;
  //private _isInitialized: boolean = false;

  //private isOpenable: boolean = true;
  //private isMenuVisible: boolean = false;
  //private selectedValue: string = '';

  //private focusIndex: number = 0;

  //_onChange: (value: any) => void;
  //_onTouched: Function;

  //@Output() change: EventEmitter<Md2SelectChange> = new EventEmitter<Md2SelectChange>();

  //@ContentChildren(forwardRef(() => Md2Option))
  //public options: QueryList<Md2Option> = null;

  //@Input() get name(): string { return this._name; }
  //set name(value: string) {
  //  this._name = value;
  //  this._updateOptions();
  //}

  //@Input() tabindex: number = 0;
  //@Input() placeholder: string = '';

  //@Input()
  //get readonly() { return this._readonly; }
  //set readonly(value: any) { this._readonly = coerceBooleanProperty(value); }

  //@Input()
  //get required() { return this._required; }
  //set required(value: any) { this._required = coerceBooleanProperty(value); }

  //@HostBinding('class.md2-select-disabled')
  //@Input()
  //get disabled() { return this._disabled; }
  //set disabled(value: any) { this._disabled = coerceBooleanProperty(value); }

  ////@Input()
  ////get multiple(): boolean { return this._multiple; }
  ////set multiple(value) { this._multiple = coerceBooleanProperty(value); }

  //@Input()
  //get value(): any { return this._value; }
  //set value(value: any) {
  //  if (this._value !== value) {
  //    this._value = value;
  //    this._updateSelectedOptionValue();
  //    if (this._isInitialized) {
  //      this._emitChangeEvent();
  //    }
  //  }
  //}

  //@Input()
  //get selected() { return this._selected; }
  //set selected(selected: Md2Option) {
  //  this._selected = selected;
  //  if (selected) {
  //    this.value = selected.value;
  //    if (!selected.selected) { selected.selected = true; }
  //    this.selectedValue = selected.text;
  //  } else { this.selectedValue = ''; }
  //}

  //ngAfterContentInit() { this._isInitialized = true; }

  //ngAfterContentChecked() {
  //  let opt = this.options.filter(o => this.equals(o.value, this.value))[0];
  //  if (opt && !this.equals(this.selected, opt)) {
  //    this.selectedValue = opt.text;
  //  }
  //  if (this.selected && this.selectedValue !== this.selected.text) {
  //    this.selectedValue = this.selected.text;
  //  }
  //}

  ///**
  // * Compare two vars or objects
  // * @param o1 compare first object
  // * @param o2 compare second object
  // * @return boolean comparation result
  // */
  //private equals(o1: any, o2: any) {
  //  if (o1 === o2) { return true; }
  //  if (o1 === null || o2 === null) { return false; }
  //  if (o1 !== o1 && o2 !== o2) { return true; }
  //  let t1 = typeof o1, t2 = typeof o2, length: any, key: any, keySet: any;
  //  if (t1 === t2 && t1 === 'object') {
  //    keySet = Object.create(null);
  //    for (key in o1) {
  //      if (!this.equals(o1[key], o2[key])) { return false; }
  //      keySet[key] = true;
  //    }
  //    for (key in o2) {
  //      if (!(key in keySet) && key.charAt(0) !== '$' && o2[key]) { return false; }
  //    }
  //    return true;
  //  }
  //  return false;
  //}

  ///**
  // * To update scroll to position of focused option
  // */
  //private updateScroll() {
  //  if (this.focusIndex < 0) { return; }
  //  let menuContainer = this.element.nativeElement.querySelector('.md2-select-menu');
  //  if (!menuContainer) { return; }

  //  let choices = menuContainer.querySelectorAll('md2-option');
  //  if (choices.length < 1) { return; }

  //  let highlighted: any = choices[this.focusIndex];
  //  if (!highlighted) { return; }

  //  let top: number = highlighted.offsetTop + highlighted.clientHeight - menuContainer.scrollTop;
  //  let height: number = menuContainer.offsetHeight;

  //  if (top > height) {
  //    menuContainer.scrollTop += top - height;
  //  } else if (top < highlighted.clientHeight) {
  //    menuContainer.scrollTop -= highlighted.clientHeight - top;
  //  }
  //}

  ///**
  // * get index of focused option
  // */
  //private getFocusIndex(): number { return this.options.toArray().findIndex((o: any) => o.focused); }

  ///**
  // * update focused option
  // * @param inc
  // */
  //private updateFocus(inc: number) {
  //  let options = this.options.toArray();
  //  let index = this.focusIndex;
  //  options.forEach(o => { if (o.focused) { o.focused = false; } });
  //  let option: any;
  //  do {
  //    index += inc;
  //    if (index < 0) { index = options.length - 1; }
  //    if (index > options.length - 1) { index = 0; }
  //    option = options[index];
  //    this.focusIndex = index;
  //    if (option.disabled) { option = undefined; }
  //  } while (!option);
  //  if (option) { option.focused = true; }
  //  this.updateScroll();
  //}

  //@HostListener('click', ['$event'])
  //private onClick(e: any) {
  //  if (this.disabled || this.readonly) {
  //    e.stopPropagation();
  //    e.preventDefault();
  //    return;
  //  }
  //  if (this.isOpenable) {
  //    if (!this.isMenuVisible) {
  //      this.options.forEach(o => {
  //        o.focused = false;
  //        if (o.selected) { o.focused = true; }
  //      });
  //      this.focusIndex = this.getFocusIndex();
  //      this.isMenuVisible = true;
  //      setTimeout(() => {
  //        this.updateScroll();
  //      }, 0);
  //      this.element.nativeElement.focus();
  //    }
  //  }
  //  this.isOpenable = true;
  //}

  //@HostListener('keydown', ['$event'])
  //private onKeyDown(event: any) {
  //  if (this.disabled) { return; }

  //  if (this.isMenuVisible) {
  //    event.preventDefault();
  //    event.stopPropagation();

  //    switch (event.keyCode) {
  //      case KeyCodes.TAB:
  //      case KeyCodes.ESCAPE: this._onBlur(); break;
  //      case KeyCodes.ENTER:
  //      case KeyCodes.SPACE: this.options.toArray()[this.focusIndex].onOptionClick(event); break;

  //      case KeyCodes.DOWN_ARROW: this.updateFocus(1); break;
  //      case KeyCodes.UP_ARROW: this.updateFocus(-1); break;
  //    }
  //  } else {
  //    switch (event.keyCode) {
  //      case KeyCodes.ENTER:
  //      case KeyCodes.SPACE:
  //      case KeyCodes.DOWN_ARROW:
  //      case KeyCodes.UP_ARROW:
  //        event.preventDefault();
  //        event.stopPropagation();
  //        this.onClick(event);
  //        break;
  //    }
  //  }
  //}

  //@HostListener('blur')
  //_onBlur() {
  //  if (this.isMenuVisible) {
  //    this.isMenuVisible = false;
  //    this.isOpenable = false;
  //    setTimeout(() => {
  //      this.isOpenable = true;
  //    }, 200);
  //  } else { this._onTouched(); }
  //}

  //touch() {
  //  if (this._onTouched) {
  //    this._onTouched();
  //  }
  //}

  //private _updateOptions(): void {
  //  if (this.options) {
  //    this.options.forEach((option: any) => {
  //      option.name = this.name;
  //    });
  //  }
  //}

  //private _updateSelectedOptionValue(): void {
  //  let isAlreadySelected = this.selected !== null && this.selected.value === this.value;

  //  if (this.options !== null && !isAlreadySelected) {
  //    let matchingOption = this.options.filter((option: any) => option.value === this.value)[0];

  //    if (matchingOption) {
  //      this.selected = matchingOption;
  //    } else {
  //      this.selected = null;
  //      this.options.forEach(option => { option.selected = false; });
  //    }
  //  }
  //}

  //private _emitChangeEvent(): void {
  //  let event = new Md2SelectChange();
  //  event.source = this;
  //  event.value = this.value;
  //  this._onChange(event.value);
  //  this.change.emit(event);
  //}

  //writeValue(value: any) {
  //  if (!this.options) { return; }
  //  //this.options.forEach((option: Md2Option) => {
  //  //  if (option.value === value) {
  //  //  }
  //  //});
  //  if (this._value !== value) {
  //    this._value = value;
  //    this._updateSelectedOptionValue();
  //  }
  //}

  //registerOnChange(fn: (value: any) => void): void { this._onChange = fn; }

  //registerOnTouched(fn: Function): void { this._onTouched = fn; }

}

@Component({
  moduleId: module.id,
  selector: 'md2-option',
  template: '<ng-content></ng-content>',
  styles: [`
    md2-option { position: relative; display: block; width: 100%; padding: 12px 16px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 16px; cursor: pointer; box-sizing: border-box; transition: background 400ms linear; }
    md2-option.md2-selected { color: #106cc8; }
    md2-option:hover,
    md2-option.md2-focused { background: #eeeeee; }
    md2-option.md2-option-disabled,
    md2-option.md2-option-disabled:hover { color: rgba(189,189,189,0.87); cursor: default; background: transparent; }
    /*md2-select[multiple] md2-option { padding-left: 40px; }
    md2-select[multiple] md2-option:after { content: ''; position: absolute; top: 50%; left: 12px; display: block; width: 16px; height: 16px; margin-top: -8px; border: 2px solid rgba(0,0,0,0.54); border-radius: 2px; box-sizing: border-box; transition: 240ms; }
    md2-select[multiple] md2-option.md2-selected:after { transform: rotate(-45deg); height: 8px; border-width: 0 0 2px 2px; border-color: #106cc8; }
    md2-select[multiple] md2-option.md2-option-disabled:after { border-color: rgba(187,187,187,0.54); }*/
  `],
  host: {
    'role': 'option',
    '[class.md2-selected]': 'selected',
    '[attr.aria-selected]': 'selected.toString()',
    '[attr.aria-disabled]': 'disabled.toString()',
    '[class.md2-option-disabled]': 'disabled',
    '(click)': '_handleClick($event)'
  },
  encapsulation: ViewEncapsulation.None
})
export class Md2Option {

  private _selected: boolean = false;
  private _disabled: boolean = false;

  @Input() value: any;

  @Input()
  get disabled() { return this._disabled; }
  set disabled(value: any) { this._disabled = coerceBooleanProperty(value); }

  @Output() onSelect = new EventEmitter();

  constructor(private _element: ElementRef) { }

  get selected(): boolean {
    return this._selected;
  }

  get viewValue(): string {
    return this._element.nativeElement.textContent.trim();
  }

  select(): void {
    this._selected = true;
    this.onSelect.emit();
  }

  deselect(): void {
    this._selected = false;
  }

  _handleClick(event: MouseEvent): void {
    if (!this.disabled) {
      this._selected = true;
      this.onSelect.emit(true);
    }
  }

}

export const MD2_SELECT_DIRECTIVES = [Md2Select, Md2Option];

@NgModule({
  imports: [CommonModule],
  exports: MD2_SELECT_DIRECTIVES,
  declarations: MD2_SELECT_DIRECTIVES,
})
export class Md2SelectModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Md2SelectModule,
      providers: []
    };
  }
}