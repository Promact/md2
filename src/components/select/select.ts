import { Component, EventEmitter, Input, Output, HostListener, Provider, ViewEncapsulation, forwardRef, ElementRef, AfterContentInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/common';

const noop = () => { };

let nextId = 0;

const MD2_SELECT_CONTROL_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, {
  useExisting: forwardRef(() => Md2Select),
  multi: true
});

@Component({
  selector: 'md2-select',
  template: `
    <div class="md2-select-layout">
      <div class="md2-select-container">
        <span *ngIf="selectedValue.length < 1" class="md2-select-placeholder">{{placeholder}}</span>
        <span *ngIf="selectedValue.length > 0" class="md2-select-value">{{selectedValue}}</span>
        <i class="md2-select-icon"></i>
      </div>
      <ul *ngIf="isMenuOpened && list && list.length > 0" class="md2-select-menu">
        <li class="md2-option" *ngFor="let l of list" [class.active]="isActive(l)" [class.focus]="isFocus(l)" (click)="selectItemOnMatch(l, $event)">
          <div class="md2-option-text" [innerHtml]="l.text"></div>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .md2-select { -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }
    .md2-select:focus { outline: none; }
    .md2-select .md2-select-layout { position: relative; display: block; }
    .md2-select .md2-select-container { display: flex; width: 100%; align-items: center; padding: 2px 0 1px; border-bottom: 1px solid rgba(0, 0, 0, 0.38); position: relative; -moz-box-sizing: content-box; -webkit-box-sizing: content-box; box-sizing: content-box; min-width: 64px; min-height: 26px; flex-grow: 1; cursor: pointer; }
    .md2-select:focus .md2-select-container { padding-bottom: 0; border-bottom: 2px solid #106cc8; }
    .md2-select.md2-select-disabled .md2-select-container { color: rgba(0,0,0,0.38); }
    .md2-select.md2-select-disabled:focus .md2-select-container { padding-bottom: 1px; border-bottom: 1px solid rgba(0, 0, 0, 0.38); }
    .md2-select .md2-select-container > span:not(.md2-select-icon) { max-width: 100%; -ms-flex: 1 1 auto; -webkit-flex: 1 1 auto; flex: 1 1 auto; -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; text-overflow: ellipsis; overflow: hidden; }
    .md2-select .md2-select-container .md2-select-icon { display: block; -webkit-align-items: flex-end; -ms-flex-align: end; align-items: flex-end; text-align: end; width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 6px solid rgba(0, 0, 0, 0.60); margin: 0 4px; }
    .md2-select .md2-select-container .md2-select-placeholder { color: rgba(0, 0, 0, 0.38); }
    .md2-select .md2-select-container .md2-select-value { white-space: nowrap; }
    .md2-select .md2-select-menu { position: absolute; left: 0; top: 0; display: block; z-index: 10; -ms-flex-direction: column; -webkit-flex-direction: column; flex-direction: column; width: 100%; margin: 0; padding: 8px 0; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12); max-height: 256px; min-height: 48px; overflow-y: auto; -moz-transform: scale(1); -ms-transform: scale(1); -o-transform: scale(1); -webkit-transform: scale(1); transform: scale(1); background: #fff; }
    .md2-select .md2-select-menu .md2-option { cursor: pointer; position: relative; display: block; align-items: center; width: auto; -moz-transition: background 0.15s linear; -o-transition: background 0.15s linear; -webkit-transition: background 0.15s linear; transition: background 0.15s linear; padding: 0 16px; height: 48px; line-height: 48px; }
    .md2-select .md2-select-menu .md2-option.active { color: #106cc8; }
    .md2-select .md2-select-menu .md2-option:hover, .md2-select .md2-select-menu .md2-option.focus { background: #eeeeee; }
    .md2-select .md2-select-menu .md2-option .md2-option-text { width: auto; white-space: nowrap; overflow: hidden; -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; text-overflow: ellipsis; font-size: 16px; }
  `],
  host: {
    'role': 'select',
    '[id]': 'id',
    '[class.md2-select]': 'true',
    '[class.md2-select-disabled]': 'disabled',
    '[tabindex]': 'disabled ? -1 : tabindex',
    '[attr.aria-disabled]': 'disabled'
  },
  providers: [MD2_SELECT_CONTROL_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None
})

export class Md2Select implements AfterContentInit, ControlValueAccessor {

  constructor(public element: ElementRef) { }

  ngOnInit() {
    this.behavior = new GenericBehavior(this);
  }

  ngAfterContentInit() {
    this._isInitialized = true;
  }

  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  private _value: any = '';
  private _isInitialized: boolean = false;
  private _onTouchedCallback: () => void = noop;
  private _onChangeCallback: (_: any) => void = noop;

  private isOpenable: boolean = true;
  private selectedValue: string = '';
  private isMenuOpened: boolean = false;
  private behavior: IListsBehavior;
  private _items: Array<any> = [];

  public list: Array<Item> = [];
  public currentItem: Item;

  @Input() id: string = 'md2-select-' + (++nextId);
  @Input() disabled: boolean = false;
  @Input() tabindex: number = 0;
  @Input() placeholder: string = '';
  @Input('item-text') itemText: string = 'text';

  @Input() set items(value: Array<any>) {
    this._items = value;
  }

  get value(): any {
    return this._value;
  }
  @Input() set value(value: any) {
    this.setValue(value);
  }

  public setValue(value: any) {
    if (value !== this._value) {
      this._value = value;
      this.selectedValue = '';
      if (value && typeof value === 'string') {
        this.selectedValue = value;
      }
      if (value && typeof value === 'object') {
        if (value.length && Array.isArray(value)) {
          this.selectedValue = value[0][this.itemText];
        } else {
          this.selectedValue = value[this.itemText];
        }
      }
      if (this._isInitialized) {
        this._onChangeCallback(value);
        this.change.emit(this._value);
      }
    }
  }

  @HostListener('click', ['$event'])
  public onClick(e: any) {
    if (this.disabled) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    this.list = this._items.map((item: any) => new Item(item, this.itemText));
    if (this.list.length > 0 && this.isOpenable) {
      if (this.selectedValue.length > 0) {
        this.currentItem = this.list.find((item: any) => item.text === this.selectedValue);
      }
      this.isMenuOpened = true;
    }
    this.isOpenable = true;
  }

  @HostListener('keydown', ['$event'])
  public onKeyDown(e: any) {
    // check enabled
    if (this.disabled === true) { return; }

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
      this.behavior.prev();
      if (!this.isMenuOpened) {
        this.onClick(e);
      }
      e.stopPropagation();
      e.preventDefault();
      return;
    }

    // Down Arrow
    if (e.keyCode === 40) {
      this.behavior.next();
      if (!this.isMenuOpened) {
        this.onClick(e);
      }
      e.stopPropagation();
      e.preventDefault();
      return;
    }

    // Enter / Space
    if (e.keyCode === 13 || e.keyCode === 32) {
      if (this.isMenuOpened) {
        this.selectItemOnMatch(this.currentItem, e);
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

  private openMenu() {
    this.list = this._items.map((item: any) => new Item(item, this.itemText));
    if (this.list.length > 0 && this.isOpenable) {
      if (this.selectedValue.length > 0) {
        this.currentItem = this.list.find((item: any) => item.text === this.selectedValue);
      }
      this.isMenuOpened = true;
      setTimeout(() => { this.behavior.next(); }, 0);
    }
    this.isOpenable = true;
  }

  private selectItemOnMatch(value: Item, e: Event = null) {
    if (e) { e.preventDefault(); }
    if (this.list.length <= 0) { return; }

    this.selectedValue = value.text;
    if (typeof this._value === 'string') {
      this._value = this.selectedValue;
    }
    if (typeof this._value === 'object') {
      if (Array.isArray(this._value)) {
        this._value = new Array<any>();
        this._value.push(this._items.find((item: any) => item[this.itemText] == value.text));
      } else {
        this._value = new Object();
        let itm = this._items.find((item: any) => item[this.itemText] == value.text);
        for (let i in itm) {
          this._value[i] = itm[i];
        }
      }
    }
    this._onChangeCallback(this._value);
    this.change.emit(this._value);
    this.onBlur();
  }

  private isActive(value: Item): boolean {
    return this.selectedValue === value.text ? true : false;
  }

  private isFocus(value: Item): boolean {
    if (this.currentItem) { return this.currentItem.text === value.text; }
    return false;
  }

  writeValue(value: any) { this.setValue(value); }

  registerOnChange(fn: any) { this._onChangeCallback = fn; }

  registerOnTouched(fn: any) { this._onTouchedCallback = fn; }

}

export class Item {
  public text: string;

  constructor(source: any, itemText: string) {
    if (typeof source === 'string') {
      this.text = source;
    }
    if (typeof source === 'object') {
      this.text = source[itemText];
    }
  }
}

class Behavior {
  public listMap: Map<string, number> = new Map<string, number>();

  constructor(public actor: Md2Select) {
  }

  private getActiveIndex(listMap: Map<string, number> = null): number {
    let ai = this.actor.list.indexOf(this.actor.currentItem);

    if (ai < 0 && listMap !== null) {
      ai = listMap.get(this.actor.currentItem.text);
    }

    return ai;
  }

  public ensureHighlightVisible(listMap: Map<string, number> = null) {
    let container = this.actor.element.nativeElement.querySelector('.md2-select-menu');

    if (!container) {
      return;
    }

    let choices = container.querySelectorAll('.md2-option');
    if (choices.length < 1) {
      return;
    }

    let activeIndex = this.getActiveIndex(listMap);
    if (activeIndex < 0) {
      return;
    }

    let highlighted: any = choices[activeIndex];
    if (!highlighted) {
      return;
    }

    let posY: number = highlighted.offsetTop + highlighted.clientHeight - container.scrollTop;
    let height: number = container.offsetHeight;

    if (posY > height) {
      container.scrollTop += posY - height;
    } else if (posY < highlighted.clientHeight) {
      container.scrollTop -= highlighted.clientHeight - posY;
    }
  }
}

class GenericBehavior extends Behavior implements IListsBehavior {
  constructor(public actor: Md2Select) {
    super(actor);
  }

  public first() {
    this.actor.currentItem = this.actor.list[0];
    super.ensureHighlightVisible();
  }

  public prev() {
    let index: number = this.actor.list.indexOf(this.actor.currentItem);
    this.actor.currentItem = this.actor.list[index - 1 < 0 ? this.actor.list.length - 1 : index - 1];
    super.ensureHighlightVisible();
  }

  public next() {
    let index: number = this.actor.list.indexOf(this.actor.currentItem);
    this.actor.currentItem = this.actor.list[index + 1 > this.actor.list.length - 1 ? 0 : index + 1];
    super.ensureHighlightVisible();
  }
}

interface IListsBehavior {
  first(): any;
  prev(): any;
  next(): any;
}