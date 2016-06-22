import { Component, ContentChildren, Directive, ElementRef, HostBinding, Input, Output, ViewChildren, EventEmitter, forwardRef, Provider, QueryList, ViewEncapsulation} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/common';

const MD2_SELECT_CONTROL_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, {
  useExisting: forwardRef(() => Md2Select),
  multi: true
});

export class Md2OptionChange {
  value: any;
}

@Component({
  selector: 'md2-option',
  template: '<ng-content></ng-content>',
  styles: [`
    md2-option { cursor: pointer; position: relative; display: block; align-items: center; width: auto; -moz-transition: background 0.15s linear; -o-transition: background 0.15s linear; -webkit-transition: background 0.15s linear; transition: background 0.15s linear; padding: 0 16px; height: 48px; line-height: 48px; 
width: auto; white-space: nowrap; overflow: hidden; -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; text-overflow: ellipsis; font-size: 16px;}
    md2-option.md2-option-selected { color: #106cc8; }
    md2-option:hover, md2-option.md2-option-focused { background: #eeeeee; }
    md2-option.md2-option-disabled, md2-option.md2-option-disabled:hover { color: rgba(189,189,189,0.87); cursor: default; background: transparent; }
  `],
  host: {
    'role': 'option',
    '(click)': 'onClick($event)'
  },
  encapsulation: ViewEncapsulation.None
})

export class Md2Option {

  private _value: any = null;
  private _selected: boolean = false;
  public content: string = null;

  @HostBinding('class.md2-option-focused') focused: boolean = false;

  @HostBinding('class.md2-option-disabled') @Input() disabled: boolean = false;

  @HostBinding('class.md2-option-selected') @Input() get selected(): boolean { return this._selected; }
  set selected(selected: boolean) {
    if (this._selected !== selected) {
      this._selected = selected;
    }
  }

  @Input() get value(): any { return this._value; }
  set value(value: any) {
    if (this._value !== value) {
      this._value = value;
    }
  }

  constructor(private element: ElementRef) { }

  ngAfterViewInit() {
    this.content = this.element.nativeElement.innerHTML;
  }

  public onClick(event: Event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.selected = !this.selected;
  }
}

@Component({
  selector: 'md2-select',
  template: `
    <div class="md2-select-container">
      <span *ngIf="!selectedValue" class="md2-select-placeholder">{{placeholder}}</span>
      <span *ngIf="selectedValue" class="md2-select-value" [innerHtml]="selectedValue"></span>
      <em class="md2-select-icon"></em>
    </div>
    <div class="md2-select-menu" [class.open]="true">
      <ng-content></ng-content>    
    </div>
  `,
  styles: [`
    md2-select { position: relative; display: block; margin: 18px 0; font-size: 16px; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -moz-backface-visibility: hidden; -webkit-backface-visibility: hidden; backface-visibility: hidden; }
    md2-select:focus { outline: none; }
    md2-select .md2-select-container { position: relative; display: block; width: 100%; padding: 2px 20px 1px 0; border-bottom: 1px solid rgba(0, 0, 0, 0.38); -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; min-width: 64px; min-height: 26px; max-height: 90px; overflow-y: auto; cursor: pointer; }
    md2-select:focus .md2-select-container { padding-bottom: 0; border-bottom: 2px solid #106cc8; }
    md2-select.md2-select-disabled .md2-select-container { color: rgba(0,0,0,0.38); }
    md2-select.md2-select-disabled:focus .md2-select-container { padding-bottom: 1px; border-bottom: 1px solid rgba(0, 0, 0, 0.38); }
    md2-select .md2-select-container > span:not(.md2-select-icon) { display: block; max-width: 100%; -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; text-overflow: ellipsis; overflow: hidden; }
    md2-select .md2-select-container .md2-select-icon { position: absolute; top: 50%; right: 0; display: block; width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 6px solid rgba(0, 0, 0, 0.60); margin: -3px 4px 0; }
    md2-select .md2-select-placeholder { position: absolute; top: 0; right: 0; left: 0; display: inline-block; color: rgba(0, 0, 0, 0.38); pointer-events: none; -moz-transition: transform 0.25s, width 0.25s; -o-transition: transform 0.25s, width 0.25s; -webkit-transition: transform 0.25s, width 0.25s; transition: transform 0.25s, width 0.25s; -moz-transform-origin: left top; -ms-transform-origin: left top; -o-transform-origin: left top; -webkit-transform-origin: left top; transform-origin: left top; }
    md2-select .md2-select-menu { position: absolute; left: 0; top: 0; display: none; z-index: 10; width: 100%; margin: 0; padding: 8px 0; background: #fff; max-height: 256px; min-height: 48px; overflow-y: auto; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12); -moz-transform: scale(1); -ms-transform: scale(1); -o-transform: scale(1); -webkit-transform: scale(1); transform: scale(1); }
    md2-select .md2-select-menu.open { display: block; }
  `],
  host: {
    'role': 'select',
    '[tabindex]': 'disabled ? -1 : tabindex',
    '[attr.aria-disabled]': 'disabled'
  },
  providers: [MD2_SELECT_CONTROL_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None
})
export class Md2Select implements ControlValueAccessor {

  private _value: Array<any> = null;
  private _disabled: boolean = false;
  private _isInitialized: boolean = false;
  private selectedValue: string = '';

  private _controlValueAccessorChangeFn: (value: any) => void = (value) => { };
  onTouched: () => any = () => { };

  @Output() change: EventEmitter<Md2OptionChange> = new EventEmitter<Md2OptionChange>();

  @ContentChildren(Md2Option) _options: QueryList<Md2Option>;

  @Input() tabindex: number = 0;
  @Input() placeholder: string = '';

  @HostBinding('class.md2-select-multiple') @Input() multiple: boolean = false;

  @HostBinding('class.md2-select-disabled') @Input() disabled: boolean = false;

  @Input() get value(): Array<any> { return this._value; }
  set value(value: Array<any>) {
    if (this._value !== value) {
      this._value = value;
      this._updateSelectedOptionValue();
      if (this._isInitialized) {
        this._emitChangeEvent();
      }
    }
  }

  ngAfterViewChecked() {
    this._isInitialized = true;
  }
  ngAfterContentChecked() {
    //let opt = this._options.filter(o => this.equals(o.value, this.value))[0];
    //if (opt) {
    //  this.selectedValue = opt.content;
    //}
  }

  private equals(o1, o2) {
    if (o1 === o2) return true;
    if (o1 === null || o2 === null) return false;
    if (o1 !== o1 && o2 !== o2) return true;
    let t1 = typeof o1, t2 = typeof o2, length, key, keySet;
    if (t1 === t2 && t1 === 'object') {
      keySet = Object.create(null);
      for (key in o1) {
        if (!this.equals(o1[key], o2[key])) return false;
        keySet[key] = true;
      }
      for (key in o2) {
        if (!(key in keySet) && key.charAt(0) !== '$' && o2[key]) return false;
      }
      return true;
    }
    return false;
  }

  private _updateSelectedOptionValue(): void {
    if (this._options) {
      this._options.forEach(o => {
        let matchingOption = this._value.filter(i => this.equals(i, o.value));
        if (matchingOption) {
          o.selected = true;
        } else {
          o.selected = false;
        }
      });
    }
  }

  private _emitChangeEvent(): void {
    let event = new Md2OptionChange();
    event.value = this._value;
    this._controlValueAccessorChangeFn(event.value);
    //this.change.emit(event);
  }

  writeValue(value: any) { this.value = value; }

  registerOnChange(fn: (value: any) => void) { this._controlValueAccessorChangeFn = fn; }

  registerOnTouched(fn: any) { this.onTouched = fn; }
}

export const SELECT_DIRECTIVES = [Md2Select, Md2Option];