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
import {CommonModule} from '@angular/common';

class Option {
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
      <span class="md2-multiselect-placeholder" [class.has-value]="items.length">{{placeholder}}</span>
      <div class="md2-multiselect-value">
        <div *ngFor="let v of items; let last = last" class="md2-multiselect-value-item">
          <span class="md2-multiselect-text">{{v.text}}</span><span *ngIf="!last">,&nbsp;</span>
        </div>
      </div>
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path d="M7 10l5 5 5-5z" />
      </svg>
    </div>
    <ul *ngIf="isMenuVisible" class="md2-multiselect-menu">
      <li class="md2-option" *ngFor="let l of list; let i = index;" [class.active]="isActive(i)" [class.focus]="focusedOption === i" (click)="toggleOption($event, i)">
        <div class="md2-option-icon"></div>
        <div class="md2-option-text" [innerHtml]="l.text"></div>
      </li>
    </ul>
  `,
  styles: [`
    md2-multiselect { position: relative; display: block; margin: 18px 0; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -moz-backface-visibility: hidden; -webkit-backface-visibility: hidden; backface-visibility: hidden; }
    md2-multiselect:focus { outline: none; }
    md2-multiselect .md2-multiselect-container { position: relative; width: 100%; min-width: 64px; min-height: 30px; align-items: center; padding: 2px 2px 1px; border-bottom: 1px solid rgba(0, 0, 0, 0.38); box-sizing: border-box; cursor: pointer; }
    md2-multiselect:focus .md2-multiselect-container { padding-bottom: 0; border-bottom: 2px solid #106cc8; }
    md2-multiselect.md2-multiselect-disabled .md2-multiselect-container { color: rgba(0,0,0,0.38); border-color: transparent; background-image: linear-gradient(to right, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.38) 33%, transparent 0%); background-position: bottom -1px left 0; background-size: 4px 1px; background-repeat: repeat-x; }
    md2-multiselect.md2-multiselect-disabled:focus .md2-multiselect-container { padding-bottom: 1px; border-bottom: 1px solid transparent; }
    md2-multiselect .md2-multiselect-placeholder { color: rgba(0, 0, 0, 0.38); position: absolute; right: 26px; bottom: 100%; left: 0; color: rgba(0,0,0,0.38); max-width: 100%; padding-left: 3px; padding-right: 0; line-height: 1.4; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; pointer-events: none; z-index: 1; transform: translate3d(0,26px,0) scale(1); transition: transform .4s cubic-bezier(.25,.8,.25,1); transform-origin: left top; color: rgba(0, 0, 0, 0.38); }
    md2-multiselect:focus .md2-multiselect-placeholder { color: #2196f3; }
    md2-multiselect:focus .md2-multiselect-placeholder,
    md2-multiselect .md2-multiselect-placeholder.has-value { transform: translate3d(0,6px,0) scale(.75); }
    md2-multiselect.md2-multiselect-disabled:focus .md2-multiselect-placeholder { color: rgba(0,0,0,0.38); }
    md2-multiselect .md2-multiselect-container .md2-multiselect-value { display: block; max-height: 80px; padding-right: 26px; overflow-y: auto; font-size: 15px; line-height: 26px; }
    md2-multiselect .md2-multiselect-container .md2-multiselect-value-item { word-wrap: break-word; }
    md2-multiselect .md2-multiselect-container svg { position: absolute; right: 0; top: 0; display: block; height: 100%; background: #fff; fill: currentColor; color: rgba(0,0,0,0.54); }
    md2-multiselect .md2-multiselect-menu { position: absolute; left: 0; top: 0; display: block; z-index: 10; width: 100%; margin: 0; padding: 8px 0; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12); max-height: 256px; min-height: 48px; overflow-y: auto; -moz-transform: scale(1); -ms-transform: scale(1); -o-transform: scale(1); -webkit-transform: scale(1); transform: scale(1); background: #fff; }
    md2-multiselect .md2-multiselect-menu .md2-option { position: relative; display: block; cursor: pointer; width: auto; -moz-transition: background 0.15s linear; -o-transition: background 0.15s linear; -webkit-transition: background 0.15s linear; transition: background 0.15s linear; padding: 0 16px 0 40px; height: 48px; line-height: 48px; }
    md2-multiselect .md2-multiselect-menu .md2-option.active { color: #106cc8; }
    md2-multiselect .md2-multiselect-menu .md2-option:hover, .md2-multiselect .md2-multiselect-menu .md2-option.focus { background: #eeeeee; }
    md2-multiselect .md2-multiselect-menu .md2-option .md2-option-text { width: auto; white-space: nowrap; overflow: hidden; -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; text-overflow: ellipsis; font-size: 16px; }
    md2-multiselect .md2-option .md2-option-icon { position: absolute; top: 14px; left: 12px; width: 16px; height: 16px; border: 2px solid rgba(0,0,0,0.54); border-radius: 2px; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; -moz-transition: 240ms; -o-transition: 240ms; -webkit-transition: 240ms; transition: 240ms; }
    md2-multiselect .md2-option.active .md2-option-icon { -moz-transform: rotate(-45deg); -ms-transform: rotate(-45deg); -o-transform: rotate(-45deg); -webkit-transform: rotate(-45deg); transform: rotate(-45deg); height: 8px; top: 17px; border-color: #106cc8; border-top-style: none; border-right-style: none; }
  `],
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

  /** TODO: internal */
  ngAfterContentInit() {
    this._isInitialized = true;
  }

  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  private _value: any = '';
  private _isInitialized: boolean = false;
  private _onTouchedCallback: () => void = noop;
  private _onChangeCallback: (_: any) => void = noop;

  private _options: Array<any> = [];
  private list: Array<Option> = [];
  private items: Array<Option> = [];

  private focusedOption: number = 0;
  private isFocused: boolean = false;

  @Input() id: string = 'md2-multiselect-' + (++nextId);
  @Input() disabled: boolean = false;
  @Input() tabindex: number = 0;
  @Input() placeholder: string = '';
  @Input('item-text') textKey: string = 'text';
  @Input('item-value') valueKey: string = null;

  @Input('items') set options(value: Array<any>) {
    this._options = value;
  }
  get value(): any {
    return this._value;
  }
  @Input() set value(value: any) {
    this.setValue(value);
  }

  /**
   * set value
   * @param value
   */
  private setValue(value: any) {
    if (value !== this._value) {
      this._value = value;
      this.items = [];
      if (value && value.length && typeof value === 'object' && Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          let selItm = this._options.find((itm: any) => this.equals(this.valueKey ? itm[this.valueKey] : itm, value[i]));
          if (selItm) { this.items.push(new Option(selItm, this.textKey, this.valueKey)); }
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
    return (this.isFocused && this.list && this.list.length) ? true : false;
  }

  /**
   * to update scroll of options
   */
  private updateScroll() {
    if (this.focusedOption < 0) { return; }
    let menuContainer = this.element.nativeElement.querySelector('.md2-multiselect-menu');
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

  @HostListener('click', ['$event'])
  private onClick(event: MouseEvent) {
    if (this.disabled) {
      event.stopPropagation();
      event.preventDefault();
      return;
    }
    this.updateOptions();
  }

  @HostListener('keydown', ['$event'])
  private onKeyDown(event: KeyboardEvent) {
    // check enabled
    if (this.disabled) { return; }

    // Tab Key
    if (event.keyCode === 9) {
      if (this.isMenuVisible) {
        this.onBlur();
        event.preventDefault();
      }
      return;
    }

    // Escape Key
    if (event.keyCode === 27) {
      this.onBlur();
      event.stopPropagation();
      event.preventDefault();
      return;
    }

    // Down Arrow
    if (event.keyCode === 40) {
      if (this.isMenuVisible) {
        this.focusedOption = (this.focusedOption === this.list.length - 1) ? 0 : Math.min(this.focusedOption + 1, this.list.length - 1);
        this.updateScroll();
      } else {
        this.updateOptions();
      }
      event.stopPropagation();
      event.preventDefault();
      return;
    }

    // Up Arrow
    if (event.keyCode === 38) {
      if (this.isMenuVisible) {
        this.focusedOption = (this.focusedOption === 0) ? this.list.length - 1 : Math.max(0, this.focusedOption - 1);
        this.updateScroll();
      } else {
        this.updateOptions();
      }
      event.stopPropagation();
      event.preventDefault();
      return;
    }

    // Enter / Space
    if (event.keyCode === 13 || event.keyCode === 32) {
      if (this.isMenuVisible) {
        this.toggleOption(event, this.focusedOption);
      } else {
        this.updateOptions();
      }
      event.preventDefault();
      return;
    }
  }

  /**
   * on focus current component
   */
  private onFocus() {
    this.isFocused = true;
    this.focusedOption = 0;
  }

  @HostListener('blur')
  private onBlur() { this.isFocused = false; }

  /**
   * to check current option is active or not
   * @param index
   * @return boolean the item is active or not
   */
  private isActive(index: number): boolean {
    return this.items.map(i => i.text).indexOf(this.list[index].text) < 0 ? false : true;
  }

  /**
   * to toggle option to select/deselect option
   * @param event
   * @param index
   */
  private toggleOption(event: Event, index: number) {
    event.preventDefault();
    event.stopPropagation();

    let ind = this.items.map(i => i.text).indexOf(this.list[index].text);
    if (ind < 0) {
      this.items.push(this.list[index]);
      this.items = this.items.sort((a, b) => { return this.list.findIndex((i: any) => i.text === a.text) - this.list.findIndex((i: any) => i.text === b.text); });
    } else {
      this.items.splice(ind, 1);
    }

    this._value = new Array<any>();
    for (let i = 0; i < this.items.length; i++) {
      this._value.push(this.items[i].value);
    }
    this._onChangeCallback(this._value);
    this.change.emit(this._value);
  }

  /**
   * update options
   */
  private updateOptions() {
    this.list = this._options.map((item: any) => new Option(item, this.textKey, this.valueKey));
    if (this.list.length > 0) {
      this.onFocus();
    }
  }

  /**
   * Implemented as part of ControlValueAccessor.
   * TODO: internal
   */
  writeValue(value: any) { this.setValue(value); }

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
  declarations: MD2_MULTISELECT_DIRECTIVES,
  imports: [CommonModule, FormsModule],
  exports: MD2_MULTISELECT_DIRECTIVES,
})
export class Md2MultiselectModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Md2MultiselectModule,
      providers: []
    };
  }
}