import {
  AfterContentInit,
  Injectable,
  AfterContentChecked,
  Component,
  ContentChildren,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Optional,
  Output,
  QueryList,
  ViewEncapsulation,
  forwardRef,
  ElementRef,
  NgModule,
  ModuleWithProviders
} from '@angular/core';
import {
  ControlValueAccessor,
  NgControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  coerceBooleanProperty,
  KeyCodes
} from '../core/core';

let _uniqueIdCounter = 0;

export type Md2SelectDispatcherListener = (id: string, name: string) => void;

@Injectable()
export class Md2SelectDispatcher {
  private _listeners: Md2SelectDispatcherListener[] = [];

  notify(id: string, name: string) {
    for (let listener of this._listeners) {
      listener(id, name);
    }
  }

  listen(listener: Md2SelectDispatcherListener) {
    this._listeners.push(listener);
  }
}

export class Md2SelectChange {
  source: Md2Select;
  value: any;
}

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
    '[attr.aria-invalid]': '_control?.invalid || "false"',
  },
  encapsulation: ViewEncapsulation.None
})
export class Md2Select implements AfterContentInit, AfterContentChecked, ControlValueAccessor {

  constructor(public element: ElementRef, @Optional() public _control: NgControl) {
    if (this._control) {
      this._control.valueAccessor = this;
    }
  }

  private _value: any = null;
  private _name: string = 'md2-select-' + _uniqueIdCounter++;
  private _readonly: boolean = false;
  private _required: boolean = false;
  private _disabled: boolean = false;
  // private _multiple: boolean;
  private _selected: Md2Option = null;
  private _isInitialized: boolean = false;

  private isOpenable: boolean = true;
  _isMenuVisible: boolean = false;
  _selectedValue: string = '';

  private focusIndex: number = 0;

  _onChange = (value: any) => { };
  _onTouched = () => { };

  @Output() change: EventEmitter<Md2SelectChange> = new EventEmitter<Md2SelectChange>();

  @ContentChildren(forwardRef(() => Md2Option))
  public options: QueryList<Md2Option> = null;

  @Input() get name(): string { return this._name; }
  set name(value: string) {
    this._name = value;
    this._updateOptions();
  }

  @Input() tabindex: number = 0;
  @Input() placeholder: string = '';

  @Input()
  get readonly() { return this._readonly; }
  set readonly(value: any) { this._readonly = coerceBooleanProperty(value); }

  @Input()
  get required() { return this._required; }
  set required(value: any) { this._required = coerceBooleanProperty(value); }

  @HostBinding('class.md2-select-disabled')
  @Input()
  get disabled() { return this._disabled; }
  set disabled(value: any) { this._disabled = coerceBooleanProperty(value); }

  // @Input()
  // get multiple(): boolean { return this._multiple; }
  // set multiple(value) { this._multiple = coerceBooleanProperty(value); }

  @Input()
  get value(): any { return this._value; }
  set value(value: any) {
    if (this._value !== value) {
      this._value = value;
      this._updateSelectedOptionValue();
      if (this._isInitialized) {
        this._emitChangeEvent();
      }
    }
  }

  @Input()
  get selected() { return this._selected; }
  set selected(selected: Md2Option) {
    this._selected = selected;
    if (selected) {
      this.value = selected.value;
      if (!selected.selected) { selected.selected = true; }
      this._selectedValue = selected.text;
    } else { this._selectedValue = ''; }
  }

  ngAfterContentInit() { this._isInitialized = true; }

  ngAfterContentChecked() {
    let opt = this.options.filter(o => this.equals(o.value, this.value))[0];
    if (opt && !this.equals(this.selected, opt)) {
      this._selectedValue = opt.text;
    }
    if (this.selected && this._selectedValue !== this.selected.text) {
      this._selectedValue = this.selected.text;
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

  /**
   * To update scroll to position of focused option
   */
  private updateScroll() {
    if (this.focusIndex < 0) { return; }
    let menuContainer = this.element.nativeElement.querySelector('.md2-select-menu');
    if (!menuContainer) { return; }

    let choices = menuContainer.querySelectorAll('md2-option');
    if (choices.length < 1) { return; }

    let highlighted: any = choices[this.focusIndex];
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
   * get index of focused option
   */
  private getFocusIndex(): number { return this.options.toArray().findIndex((o: any) => o.focused); }

  /**
   * update focused option
   * @param inc
   */
  private updateFocus(inc: number) {
    let options = this.options.toArray();
    let index = this.focusIndex;
    options.forEach(o => { if (o.focused) { o.focused = false; } });
    let option: any;
    do {
      index += inc;
      if (index < 0) { index = options.length - 1; }
      if (index > options.length - 1) { index = 0; }
      option = options[index];
      this.focusIndex = index;
      if (option.disabled) { option = undefined; }
    } while (!option);
    if (option) { option.focused = true; }
    this.updateScroll();
  }

  @HostListener('click', ['$event'])
  _handleClick(e: any) {
    if (this.disabled || this.readonly) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    if (this.isOpenable) {
      if (!this._isMenuVisible) {
        this.options.forEach(o => {
          o.focused = false;
          if (o.selected) { o.focused = true; }
        });
        this.focusIndex = this.getFocusIndex();
        this._isMenuVisible = true;
        setTimeout(() => {
          this.updateScroll();
        }, 0);
        this.element.nativeElement.focus();
      }
    }
    this.isOpenable = true;
  }

  @HostListener('keydown', ['$event'])
  _handleKeydown(event: any) {
    if (this.disabled) { return; }

    if (this._isMenuVisible) {
      event.preventDefault();
      event.stopPropagation();

      switch (event.keyCode) {
        case KeyCodes.TAB:
        case KeyCodes.ESCAPE: this._onBlur(); break;
        case KeyCodes.ENTER:
        case KeyCodes.SPACE: this.options.toArray()[this.focusIndex].onOptionClick(event); break;

        case KeyCodes.DOWN_ARROW: this.updateFocus(1); break;
        case KeyCodes.UP_ARROW: this.updateFocus(-1); break;
      }
    } else {
      switch (event.keyCode) {
        case KeyCodes.ENTER:
        case KeyCodes.SPACE:
        case KeyCodes.DOWN_ARROW:
        case KeyCodes.UP_ARROW:
          event.preventDefault();
          event.stopPropagation();
          this._handleClick(event);
          break;
      }
    }
  }

  @HostListener('blur')
  _onBlur() {
    if (this._isMenuVisible) {
      this._isMenuVisible = false;
      this.isOpenable = false;
      setTimeout(() => {
        this.isOpenable = true;
      }, 200);
    }
    this._onTouched();
  }

  touch() {
    if (this._onTouched) {
      this._onTouched();
    }
  }

  private _updateOptions(): void {
    if (this.options) {
      this.options.forEach((option: any) => {
        option.name = this.name;
      });
    }
  }

  private _updateSelectedOptionValue(): void {
    let isAlreadySelected = this.selected !== null && this.selected.value === this.value;

    if (this.options !== null && !isAlreadySelected) {
      let matchingOption = this.options.filter((option: any) => option.value === this.value)[0];

      if (matchingOption) {
        this.selected = matchingOption;
      } else {
        this.selected = null;
        this.options.forEach(option => { option.selected = false; });
      }
    }
  }

  private _emitChangeEvent(): void {
    let event = new Md2SelectChange();
    event.source = this;
    event.value = this.value;
    if (this._control) {
      this._onChange(event.value);
    }
    this.change.emit(event);
  }

  writeValue(value: any) {
    if (!this.options) { return; }
    // this.options.forEach((option: Md2Option) => {
    //  if (option.value === value) {
    //  }
    // });
    if (this._value !== value) {
      this._value = value;
      this._updateSelectedOptionValue();
    }
  }

  registerOnChange(fn: (value: any) => void): void { this._onChange = fn; }

  registerOnTouched(fn: () => {}): void { this._onTouched = fn; }

}

@Component({
  moduleId: module.id,
  selector: 'md2-option',
  template: '<ng-content></ng-content>',
  styles: [`
    md2-option { position: relative; display: block; width: 100%; padding: 12px 16px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 16px; cursor: pointer; box-sizing: border-box; transition: background 400ms linear; }
    md2-option.md2-option-selected { color: #106cc8; }
    md2-option:hover,
    md2-option.md2-option-focused { background: #eeeeee; }
    md2-option.md2-option-disabled,
    md2-option.md2-option-disabled:hover { color: rgba(189,189,189,0.87); cursor: default; background: transparent; }
    /*md2-select[multiple] md2-option { padding-left: 40px; }
    md2-select[multiple] md2-option:after { content: ''; position: absolute; top: 50%; left: 12px; display: block; width: 16px; height: 16px; margin-top: -8px; border: 2px solid rgba(0,0,0,0.54); border-radius: 2px; box-sizing: border-box; transition: 240ms; }
    md2-select[multiple] md2-option.md2-option-selected:after { transform: rotate(-45deg); height: 8px; border-width: 0 0 2px 2px; border-color: #106cc8; }
    md2-select[multiple] md2-option.md2-option-disabled:after { border-color: rgba(187,187,187,0.54); }*/
  `],
  host: {
    'role': 'option',
    '(click)': 'onOptionClick($event)'
  },
  encapsulation: ViewEncapsulation.None
})
export class Md2Option implements OnInit {

  private _value: any = null;
  private _selected: boolean;
  private _disabled: boolean;

  public text: string;
  name: string;
  select: Md2Select;

  @HostBinding('class.md2-option-focused') focused: boolean = false;

  @Input() label: boolean;

  @HostBinding()
  @Input() id: string = 'md2-option-' + _uniqueIdCounter++;

  @HostBinding('class.md2-option-selected')
  @Input()
  get selected(): boolean { return this._selected; }
  set selected(selected: boolean) {
    if (selected) { this.selectDispatcher.notify(this.id, this.name); }
    this._selected = selected;
    if (selected && this.select.value !== this.value) {
      this.select.selected = this;
    }
  }

  @Input()
  get value(): any { return this._value; }
  set value(value: any) {
    if (this._value !== value) {
      if (this.selected) {
        this.select.value = value;
      }
      this._value = value;
    }
  }

  @HostBinding('class.md2-option-disabled')
  @Input()
  get disabled(): boolean { return this._disabled || this.select.disabled; }
  set disabled(value) { this._disabled = coerceBooleanProperty(value); }

  constructor(select: Md2Select, private selectDispatcher: Md2SelectDispatcher, private _elementRef: ElementRef) {
    this.select = select;
    selectDispatcher.listen((id: string, name: string) => {
      if (id !== this.id && name === this.name) {
        this.selected = false;
      }
    });
  }

  ngOnInit() {
    this.selected = this.value ? this.select.value === this.value : false;
    this.name = this.select.name;
  }

  ngAfterViewChecked() {
    this.text = !!this.label ? this.label : this._elementRef.nativeElement.textContent.trim();
    if (this.value === null) { this.value = this.text; }
  }

  /**
   * on click to select option
   * @param event
   */
  onOptionClick(event: Event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    // if (this.select.multiple) {
    // } else {
    this.select.selected = this;
    this.select.touch();
    this.select._onBlur();
    // }
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
      providers: [Md2SelectDispatcher]
    };
  }
}
