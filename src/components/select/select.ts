import { Injectable, AfterContentInit, AfterContentChecked, Component, ContentChildren, EventEmitter, HostBinding, HostListener, Input, OnInit, Optional, Output, Provider, QueryList, ViewEncapsulation, forwardRef, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/common';

const MD2_SELECT_CONTROL_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, {
  useExisting: forwardRef(() => Md2Select),
  multi: true
});

var _uniqueIdCounter = 0;

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

export class Md2OptionChange {
  source: Md2Option;
  value: any;
}

@Component({
  selector: 'md2-select',
  template: `
    <div class="md2-select-container">
      <span *ngIf="selectedValue.length < 1" class="md2-select-placeholder">{{placeholder}}</span>
      <span *ngIf="selectedValue.length > 0" class="md2-select-value" [innerHtml]="selectedValue"></span>
      <i class="md2-select-icon"></i>
    </div>
    <div class="md2-select-menu" [class.open]="isMenuOpened">
      <ng-content></ng-content>    
    </div>
  `,
  styles: [`
    md2-select { position: relative; display: block; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }
    md2-select:focus { outline: none; }
    md2-select .md2-select-container { display: flex; width: 100%; align-items: center; padding: 2px 0 1px; border-bottom: 1px solid rgba(0, 0, 0, 0.38); position: relative; -moz-box-sizing: content-box; -webkit-box-sizing: content-box; box-sizing: content-box; min-width: 64px; min-height: 26px; flex-grow: 1; cursor: pointer; }
    md2-select:focus .md2-select-container { padding-bottom: 0; border-bottom: 2px solid #106cc8; }
    md2-select.md2-select-disabled .md2-select-container { color: rgba(0,0,0,0.38); }
    md2-select.md2-select-disabled:focus .md2-select-container { padding-bottom: 1px; border-bottom: 1px solid rgba(0, 0, 0, 0.38); }
    md2-select .md2-select-container > span:not(.md2-select-icon) { max-width: 100%; -ms-flex: 1 1 auto; -webkit-flex: 1 1 auto; flex: 1 1 auto; -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; text-overflow: ellipsis; overflow: hidden; }
    md2-select .md2-select-container .md2-select-icon { display: block; -webkit-align-items: flex-end; -ms-flex-align: end; align-items: flex-end; text-align: end; width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 6px solid rgba(0, 0, 0, 0.60); margin: 0 4px; }
    md2-select .md2-select-container .md2-select-placeholder { color: rgba(0, 0, 0, 0.38); }
    md2-select .md2-select-container .md2-select-value { white-space: nowrap; }
    md2-select .md2-select-menu { position: absolute; left: 0; top: 100%; display: none; z-index: 10; -ms-flex-direction: column; -webkit-flex-direction: column; flex-direction: column; width: 100%; margin: 0; padding: 8px 0; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12); max-height: 256px; min-height: 48px; overflow-y: auto; -moz-transform: scale(1); -ms-transform: scale(1); -o-transform: scale(1); -webkit-transform: scale(1); transform: scale(1); background: #fff; }
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
export class Md2Select implements AfterContentInit, AfterContentChecked, ControlValueAccessor {

  private _value: any = null;
  private _name: string = 'md2-select-' + _uniqueIdCounter++;
  private _disabled: boolean = false;
  private _selected: Md2Option = null;
  private _isInitialized: boolean = false;

  private isOpenable: boolean = true;
  private isMenuOpened: boolean = false;
  private selectedValue: string = '';
  private menu: IListsMenu;

  private _controlValueAccessorChangeFn: (value: any) => void = (value) => { };
  onTouched: () => any = () => { };

  @Output() change: EventEmitter<Md2OptionChange> = new EventEmitter<Md2OptionChange>();

  @ContentChildren(forwardRef(() => Md2Option))
  public _options: QueryList<Md2Option> = null;

  @Input() get name(): string { return this._name; }
  set name(value: string) {
    this._name = value;
    this._updateOptions();
  }

  @Input() tabindex: number = 0;
  @Input() placeholder: string = '';

  @HostBinding('class.md2-select-disabled')
  @Input() get disabled(): boolean { return this._disabled; }
  set disabled(value) {
    this._disabled = (value != null && value !== false) ? true : null;
  }

  @Input() get value(): any { return this._value; }
  set value(newValue: any) {
    if (this._value != newValue) {
      this._value = newValue;
      this._updateSelectedOptionValue();
      if (this._isInitialized) {
        this._emitChangeEvent();
      }
    }
  }

  @Input() get selected() { return this._selected; }
  set selected(selected: Md2Option) {
    this._selected = selected;
    this.value = selected ? selected.value : null;
    if (selected) {
      if (!selected.selected) { selected.selected = true; }
      this.selectedValue = document.getElementById(selected.id).innerHTML;
    }
  }

  constructor(public element: ElementRef) { }

  ngOnInit() {
    this.menu = new ListsMenu(this);
  }

  ngAfterContentInit() {
    this._isInitialized = true;
  }

  ngAfterContentChecked() {
    let opt = this._options.filter((o) => {
      //let o1 = o.value, o2 = this.value;
      //if (o.value == this.value) return true;
      //if (o1 === null || o2 === null) return false;
      //if (o1 !== o1 && o2 !== o2) return true;
      //let t1 = typeof o1, t2 = typeof o2;
      //if (t1 === t2 && t1 === 'object') {
      //  if (JSON.stringify(o1) === JSON.stringify(o2)) return true;
      //  else return false;
      //}
      //return false;
      return this.equals(o.value, this.value);
    })[0];
    if (opt) {
      this.selectedValue = document.getElementById(opt.id).innerHTML;
    }
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

  @HostListener('click', ['$event'])
  public onClick(e: any) {
    if (this.disabled) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    if (this.isOpenable) {
      if (!this.isMenuOpened) {
        this._options.forEach(o => {
          o.focused = false;
          if (o.selected) { o.focused = true; }
        });
        this.isMenuOpened = true;
        setTimeout(() => {
          this.menu.updateScroll();
        }, 100);
      }
    }
    this.isOpenable = true;
  }

  @HostListener('keydown', ['$event'])
  public onKeyDown(e: any) {
    if (this.disabled) { return; }

    // Tab Key
    if (e.keyCode === 9) {
      if (this.isMenuOpened) {
        this.onBlur();
        e.preventDefault();
      }
      return;
    }

    // Escape Key
    if (e.keyCode === 27) {
      this.onBlur();
      e.stopPropagation();
      e.preventDefault();
      return;
    }

    // Up Arrow
    if (e.keyCode === 38) {
      if (this.isMenuOpened) {
        this.menu.prev();
      } else {
        this.onClick(e);
      }
      e.stopPropagation();
      e.preventDefault();
      return;
    }

    // Down Arrow
    if (e.keyCode === 40) {
      if (this.isMenuOpened) {
        this.menu.next();
      } else {
        this.onClick(e);
      }
      e.stopPropagation();
      e.preventDefault();
      return;
    }

    // Enter / Space
    if (e.keyCode === 13 || e.keyCode === 32) {
      if (this.isMenuOpened) {
        let opt = this._options.filter(o => o.focused)[0];
        opt.onClick(e);
      } else {
        this.onClick(e);
      }
      e.preventDefault();
      return;
    }
  }

  @HostListener('blur')
  public onBlur() {
    this.isMenuOpened = false;
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
    (this._options || []).forEach(option => {
      option.name = this.name;
    });
  }

  private _updateSelectedOptionValue(): void {
    let isAlreadySelected = this._selected != null && this._selected.value == this._value;

    if (this._options != null && !isAlreadySelected) {
      let matchingOption = this._options.filter(option => option.value == this._value)[0];

      if (matchingOption) {
        this.selected = matchingOption;
      } else if (this.value == null) {
        this.selected = null;
        this._options.forEach(option => { option.selected = false; });
      }
    }
  }

  private _emitChangeEvent(): void {
    let event = new Md2OptionChange();
    event.source = this._selected;
    event.value = this._value;
    this._controlValueAccessorChangeFn(event.value);
    this.change.emit(event);
  }

  writeValue(value: any) { this.value = value; }

  registerOnChange(fn: (value: any) => void) { this._controlValueAccessorChangeFn = fn; }

  registerOnTouched(fn: any) { this.onTouched = fn; }
}


@Component({
  selector: 'md2-option',
  template: '<div class="md2-option-text"><ng-content></ng-content></div>',
  styles: [`
    md2-option { cursor: pointer; position: relative; display: block; align-items: center; width: auto; -moz-transition: background 0.15s linear; -o-transition: background 0.15s linear; -webkit-transition: background 0.15s linear; transition: background 0.15s linear; padding: 0 16px; height: 48px; line-height: 48px; }
    md2-option.md2-option-selected { color: #106cc8; }
    md2-option:hover, md2-option.md2-option-focused { background: #eeeeee; }
    md2-option.md2-option-disabled, md2-option.md2-option-disabled:hover { color: rgba(189,189,189,0.87); cursor: default; background: transparent; }
    md2-option .md2-option-text { width: auto; white-space: nowrap; overflow: hidden; -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; text-overflow: ellipsis; font-size: 16px; }
  `],
  host: {
    'role': 'select-option',
    '(click)': 'onClick($event)'
  },
  encapsulation: ViewEncapsulation.None
})
export class Md2Option implements OnInit {

  @HostBinding('class.md2-option-focused') focused: boolean = false;

  private _selected: boolean = false;

  @HostBinding('id') @Input() id: string = `md2-option-${_uniqueIdCounter++}`;

  name: string;

  private _disabled: boolean;
  private _value: any = null;

  select: Md2Select;

  @Output() change: EventEmitter<Md2OptionChange> = new EventEmitter<Md2OptionChange>();

  constructor(select: Md2Select, public selectDispatcher: Md2SelectDispatcher) {
    this.select = select;
    selectDispatcher.listen((id: string, name: string) => {
      if (id != this.id && name == this.name) {
        this.selected = false;
      }
    });
  }

  @HostBinding('class.md2-option-selected') @Input() get selected(): boolean { return this._selected; }
  set selected(newSelectedState: boolean) {
    if (newSelectedState) {
      this.selectDispatcher.notify(this.id, this.name);
    }

    this._selected = newSelectedState;

    if (newSelectedState && this.select.value != this.value) {
      this.select.selected = this;
    }
  }

  @Input() get value(): any { return this._value; }
  set value(value: any) {
    if (this._value != value) {
      if (this.selected) {
        this.select.value = value;
      }
      this._value = value;
    }
  }

  @HostBinding('class.md2-option-disabled')
  @Input() get disabled(): boolean {
    return this._disabled || (this.select.disabled);
  }

  set disabled(value: boolean) {
    this._disabled = (value != null && value !== false) ? true : null;
  }

  ngOnInit() {
    this.selected = this.select.value == this._value;
    this.name = this.select.name;
  }

  public onClick(event: Event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.select.selected = this;
    this.select.touch();
    this.select.onBlur();
  }
}

class Menu {
  constructor(public list: Md2Select) { }

  private getActiveIndex(): number {
    return this.list._options.toArray().findIndex(o => o.focused);
  }

  public updateScroll() {
    let container = this.list.element.nativeElement.querySelector('.md2-select-menu');

    if (!container) { return; }

    let options = container.querySelectorAll('md2-option');
    if (options.length < 1) { return; }

    let index = this.getActiveIndex();
    if (index < 0) { return; }

    let selected: any = options[index];
    if (!selected) { return; }

    let posY: number = selected.offsetTop + selected.clientHeight - container.scrollTop;
    let height: number = container.offsetHeight;

    if (posY > height) {
      container.scrollTop += posY - height;
    } else if (posY < selected.clientHeight) {
      container.scrollTop -= selected.clientHeight - posY;
    }
  }

  public focusOption(direction: string): void {
    let options = this.list._options.toArray();
    let index = this.getActiveIndex();
    options.forEach(o => {
      if (o.focused) { o.focused = false; }
    });
    let option;
    do {
      if (index === -1 || direction === 'first') {
        index = 0;
      } else if (direction === 'next' && index < options.length - 1) {
        index++;
      } else if (direction === 'next' && index > options.length - 2) {
        index = 0;
      } else if (direction === 'prev' && index > 0) {
        index--;
      } else if ((direction === 'prev' && index < 1) || direction === 'last') {
        index = options.length - 1;
      }
      option = options[index];
      if (option.disabled) { option = undefined; }
    } while (!option);
    if (option) { option.focused = true; }
    this.updateScroll();
  }
}

class ListsMenu extends Menu implements IListsMenu {
  constructor(public list: Md2Select) { super(list); }

  public prev() { super.focusOption('prev'); }

  public next() { super.focusOption('next'); }

  public updateScroll() { super.updateScroll(); }
}

interface IListsMenu { prev(): any; next(): any; updateScroll(): any; }

export const SELECT_DIRECTIVES = [Md2Select, Md2Option];