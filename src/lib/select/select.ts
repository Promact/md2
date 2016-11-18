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
  ViewChild
} from '@angular/core';
import { Md2Option } from './option';
import { ENTER, SPACE } from '../core/keyboard/keycodes';
import { Subscription } from 'rxjs/Subscription';
import { transformPlaceholder, transformPanel, fadeInContent } from './select-animations';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { coerceBooleanProperty } from '../core/coersion/boolean-property';

@Component({
  moduleId: module.id,
  selector: 'md2-select',
  templateUrl: 'select.html',
  styleUrls: ['select.css'],
  encapsulation: ViewEncapsulation.None,
  host: {
    'role': 'listbox',
    '[attr.tabindex]': '_getTabIndex()',
    '[attr.aria-label]': 'placeholder',
    '[attr.aria-required]': 'required.toString()',
    '[attr.aria-disabled]': 'disabled.toString()',
    '[attr.aria-invalid]': '_control?.invalid || "false"',
    '[attr.aria-owns]': '_optionIds',
    '[class.md2-select-disabled]': 'disabled',
    '(keydown)': '_handleKeydown($event)',
    '(blur)': '_onBlur()'
  },
  animations: [
    transformPlaceholder,
    transformPanel,
    fadeInContent
  ],
  exportAs: 'md2Select',
})
export class Md2Select implements AfterContentInit, ControlValueAccessor, OnDestroy {
  /** Whether or not the overlay panel is open. */
  private _panelOpen = false;

  /** The currently selected option. */
  private _selected: Md2Option;

  /** Subscriptions to option events. */
  private _subscriptions: Subscription[] = [];

  /** Subscription to changes in the option list. */
  private _changeSubscription: Subscription;

  /** Subscription to tab events while overlay is focused. */
  private _tabSubscription: Subscription;

  /** Whether filling out the select is required in the form.  */
  private _required: boolean = false;

  /** Whether the select is disabled.  */
  private _disabled: boolean = false;

  /** View -> model callback called when value changes */
  _onChange: (value: any) => void;

  /** View -> model callback called when select has been touched */
  _onTouched = () => { };

  /** The IDs of child options to be passed to the aria-owns attribute. */
  _optionIds: string = '';

  /** The value of the select panel's transform-origin property. */
  _transformOrigin: string = 'top';

  @ViewChild('trigger') trigger: ElementRef;
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
    if (this._control) {
      this._control.valueAccessor = this;
    }
  }

  ngAfterContentInit() {
    this._initKeyManager();
    this._resetOptions();
    this._changeSubscription = this.options.changes.subscribe(() => this._resetOptions());
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
  registerOnTouched(fn: () => {}): void {
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
    return `${this._transformOrigin}-ltr`;
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
    } else {
      this.close();
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

  /** Drops current option subscriptions and IDs and resets from scratch. */
  private _resetOptions(): void {
    this._dropSubscriptions();
    this._listenToOptions();
    this._setOptionIds();
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

  /** Records option IDs to pass to the aria-owns property. */
  private _setOptionIds() {
    this._optionIds = this.options.map(option => option.id).join(' ');
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

  /** Gets the index of the provided option in the option list. */
  private _getOptionIndex(option: Md2Option): number {
    return this.options.reduce((result: number, current: Md2Option, index: number) => {
      return result === undefined ? (option === current ? index : undefined) : result;
    }, undefined);
  }

}
