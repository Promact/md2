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
  Output,
  Provider,
  QueryList,
  ViewEncapsulation,
  forwardRef,
  ElementRef,
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

let _uniqueIdCounter = 0;

export const MD2_SELECT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Md2Select),
  multi: true
};

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
  template: `
    <div class="md2-select-container">
      <span class="md2-select-placeholder" [class.has-value]="selectedValue">
        {{placeholder}}
        <span class="md2-placeholder-required" *ngIf="required">*</span>
      </span>
      <span *ngIf="selectedValue" class="md2-select-value" [innerHtml]="selectedValue"></span>
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path d="M7 10l5 5 5-5z" />
      </svg>
    </div>
    <div class="md2-select-menu" [class.open]="isMenuVisible">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    md2-select { position: relative; display: block; margin: 18px 0; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -moz-backface-visibility: hidden; -webkit-backface-visibility: hidden; backface-visibility: hidden; }
    md2-select:focus { outline: none; }
    md2-select.md2-select-disabled { pointer-events: none; cursor: default; }
    md2-select .md2-select-container { position: relative; width: 100%; min-width: 64px; min-height: 30px; align-items: center; padding: 2px 26px 1px 2px; border-bottom: 1px solid rgba(0, 0, 0, 0.12); box-sizing: border-box; cursor: pointer; }
    md2-select:focus .md2-select-container { padding-bottom: 0; border-bottom: 2px solid #106cc8; }
    md2-select.md2-select-disabled .md2-select-container { color: rgba(0,0,0,0.38); border-color: transparent; background-image: linear-gradient(to right, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.38) 33%, transparent 0%); background-position: bottom -1px left 0; background-size: 4px 1px; background-repeat: repeat-x; cursor: default; }
    md2-select.md2-select-disabled:focus .md2-select-container { padding-bottom: 1px; border-bottom: 1px solid transparent; }
    md2-select .md2-select-container .md2-select-placeholder { position: absolute; right: 26px; bottom: 100%; left: 0; color: rgba(0,0,0,0.38); max-width: 100%; padding-left: 3px; padding-right: 0; line-height: 1.4; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; pointer-events: none; z-index: 1; transform: translate3d(0,26px,0) scale(1); transition: transform .4s cubic-bezier(.25,.8,.25,1); transform-origin: left top; color: rgba(0, 0, 0, 0.38); }
    md2-select:focus .md2-select-placeholder { color: #2196f3; }
    md2-select:focus .md2-select-placeholder .md2-placeholder-required { color: #f00; }
    md2-select:focus .md2-select-placeholder,
    md2-select .md2-select-placeholder.has-value { transform: translate3d(0,6px,0) scale(.75); }
    md2-select.md2-select-disabled:focus .md2-select-placeholder,
    md2-select.md2-select-disabled:focus .md2-select-placeholder .md2-placeholder-required { color: rgba(0,0,0,0.38); }
    md2-select .md2-select-container .md2-select-value { display: block; font-size: 15px; line-height: 26px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    md2-select .md2-select-container svg { position: absolute; right: 0; top: 2px; display: block; fill: currentColor; color: rgba(0,0,0,0.54); }
    md2-select .md2-select-menu { position: absolute; left: 0; top: 0; display: none; z-index: 10; -ms-flex-direction: column; -webkit-flex-direction: column; flex-direction: column; width: 100%; margin: 0; padding: 8px 0; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4); max-height: 256px; min-height: 48px; overflow-y: auto; -moz-transform: scale(1); -ms-transform: scale(1); -o-transform: scale(1); -webkit-transform: scale(1); transform: scale(1); background: #fff; }
    md2-select .md2-select-menu.open { display: block; }
  `],
  providers: [MD2_SELECT_CONTROL_VALUE_ACCESSOR],
  host: {
    'role': 'select',
    '[tabindex]': 'disabled ? -1 : tabindex',
    '[attr.aria-disabled]': 'disabled'
  },
  encapsulation: ViewEncapsulation.None
})
export class Md2Select implements AfterContentInit, AfterContentChecked, ControlValueAccessor {

  constructor(public element: ElementRef) { }

  private _value: any = null;
  private _name: string = 'md2-select-' + _uniqueIdCounter++;
  private _readonly: boolean;
  private _required: boolean;
  private _disabled: boolean;
  //private _multiple: boolean;
  private _selected: Md2Option = null;
  private _isInitialized: boolean = false;

  private isOpenable: boolean = true;
  private isMenuVisible: boolean = false;
  private selectedValue: string = '';

  private focusIndex: number = 0;

  private _controlValueAccessorChangeFn: (value: any) => void = (value) => { };
  onTouched: () => any = () => { };

  @Output() change: EventEmitter<Md2SelectChange> = new EventEmitter<Md2SelectChange>();

  @ContentChildren(forwardRef(() => Md2Option))
  public _options: QueryList<Md2Option> = null;

  @Input() get name(): string { return this._name; }
  set name(value: string) {
    this._name = value;
    this._updateOptions();
  }

  @Input() tabindex: number = 0;
  @Input() placeholder: string = '';

  @Input()
  get readonly(): boolean { return this._readonly; }
  set readonly(value) { this._readonly = coerceBooleanProperty(value); }

  @Input()
  get required(): boolean { return this._required; }
  set required(value) { this._required = coerceBooleanProperty(value); }

  @HostBinding('class.md2-select-disabled')
  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value) { this._disabled = coerceBooleanProperty(value); }

  //@Input()
  //get multiple(): boolean { return this._multiple; }
  //set multiple(value) { this._multiple = coerceBooleanProperty(value); }

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
      this.selectedValue = selected.text;
    } else { this.selectedValue = ''; }
  }

  ngAfterContentInit() { this._isInitialized = true; }

  ngAfterContentChecked() {
    let opt = this._options.filter(o => this.equals(o.value, this.value))[0];
    if (opt && !this.equals(this.selected, opt)) {
      this.selectedValue = opt.text;
    }
    if (this.selected && this.selectedValue !== this.selected.text) {
      this.selectedValue = this.selected.text;
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
  private getFocusIndex(): number { return this._options.toArray().findIndex((o: any) => o.focused); }

  /**
   * update focused option
   * @param inc
   */
  private updateFocus(inc: number) {
    let options = this._options.toArray();
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
  private onClick(e: any) {
    if (this.disabled || this.readonly) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    if (this.isOpenable) {
      if (!this.isMenuVisible) {
        this._options.forEach(o => {
          o.focused = false;
          if (o.selected) { o.focused = true; }
        });
        this.focusIndex = this.getFocusIndex();
        this.isMenuVisible = true;
        setTimeout(() => {
          this.updateScroll();
        }, 0);
        this.element.nativeElement.focus();
      }
    }
    this.isOpenable = true;
  }

  @HostListener('keydown', ['$event'])
  private onKeyDown(event: any) {
    if (this.disabled) { return; }

    if (this.isMenuVisible) {
      event.preventDefault();
      event.stopPropagation();

      switch (event.keyCode) {
        case KeyCodes.TAB:
        case KeyCodes.ESCAPE: this.onBlur(); break;
        case KeyCodes.ENTER:
        case KeyCodes.SPACE: this._options.toArray()[this.focusIndex].onOptionClick(event); break;

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
          this.onClick(event);
          break;
      }
    }
  }

  @HostListener('blur')
  public onBlur() {
    this.isMenuVisible = false;
    this.isOpenable = false;
    setTimeout(() => {
      this.isOpenable = true;
    }, 200);
  }

  touch() {
    if (this.onTouched) {
      this.onTouched();
    }
  }

  private _updateOptions(): void {
    if (this._options) {
      this._options.forEach((option: any) => {
        option.name = this.name;
      });
    }
  }

  private _updateSelectedOptionValue(): void {
    let isAlreadySelected = this.selected !== null && this.selected.value === this.value;

    if (this._options !== null && !isAlreadySelected) {
      let matchingOption = this._options.filter((option: any) => option.value === this.value)[0];

      if (matchingOption) {
        this.selected = matchingOption;
      } else {
        this.selected = null;
        this._options.forEach(option => { option.selected = false; });
      }
    }
  }

  private _emitChangeEvent(): void {
    let event = new Md2SelectChange();
    event.source = this;
    event.value = this.value;
    this._controlValueAccessorChangeFn(event.value);
    this.change.emit(event);
  }

  writeValue(value: any) {
    if (this._value !== value) {
      this._value = value;
      this._updateSelectedOptionValue();
    }
  }

  registerOnChange(fn: (value: any) => void) { this._controlValueAccessorChangeFn = fn; }

  registerOnTouched(fn: any) { this.onTouched = fn; }
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
  public onOptionClick(event: Event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    //if (this.select.multiple) {
    //} else {
    this.select.selected = this;
    this.select.touch();
    this.select.onBlur();
    //}
  }
}

export const MD2_SELECT_DIRECTIVES = [Md2Select, Md2Option];

@NgModule({
  declarations: MD2_SELECT_DIRECTIVES,
  imports: [CommonModule, FormsModule],
  exports: MD2_SELECT_DIRECTIVES,
})
export class Md2SelectModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Md2SelectModule,
      providers: [Md2SelectDispatcher]
    };
  }
}