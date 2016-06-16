import { Component, EventEmitter, Input, Output, HostListener, Provider, ViewEncapsulation, forwardRef, ElementRef, AfterContentInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/common';
import {HightlightPipe} from './autocomplete.pipe';

const noop = () => { };

let nextId = 0;

const MD2_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, {
  useExisting: forwardRef(() => Md2Autocomplete),
  multi: true
});

@Component({
  selector: 'md2-autocomplete',
  pipes: [HightlightPipe],
  template: `
    <div class="md2-autocomplete-container">
      <div class="md2-autocomplete-value">
        <input [(ngModel)]="inputValue" type="text" autocomplete="false" tabindex="0" (click)="onClick()" (keydown)="onKeyDown($event)" [disabled]="disabled" class="md2-autocomplete-input" [placeholder]="placeholder">
        <em *ngIf="inputValue.length" (click)="clear(currentItem)" class="md2-autocomplete-icon-clear"></em>
      </div>
      <ul *ngIf="isMenuOpened && list && list.length > 0" class="md2-autocomplete-suggestions">
        <li class="md2-item" *ngFor="let l of list" [class.active]="isActive(l)" [class.focus]="isFocus(l)" (click)="selectItemOnMatch(l, $event)">
          <div class="md2-text" [innerHtml]="l.text | hightlight:inputValue"></div>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .md2-autocomplete-container { position: relative; display: block; outline: none; -moz-backface-visibility: hidden; -webkit-backface-visibility: hidden; backface-visibility: hidden; }
    .md2-autocomplete-container .md2-autocomplete-value { display: flex; width: 100%; outline: none; align-items: center; padding: 2px 0 1px; border-bottom: 1px solid rgba(0, 0, 0, 0.38); position: relative; -moz-box-sizing: content-box; -webkit-box-sizing: content-box; box-sizing: content-box; min-width: 64px; min-height: 26px; flex-grow: 1; cursor: pointer; }
    .md2-autocomplete-container:focus .md2-autocomplete-value { padding-bottom: 0; border-bottom: 2px solid #106cc8; }
    .md2-autocomplete-container.disabled .md2-autocomplete-value { color: rgba(0,0,0,0.38); }
    .md2-autocomplete-container.disabled:focus .md2-autocomplete-value { padding-bottom: 1px; border-bottom: 1px solid rgba(0, 0, 0, 0.38); }
    .md2-autocomplete-container .md2-autocomplete-value .md2-autocomplete-input { width: 100%; height: 26px; outline: none; background: transparent; border: 0; -moz-box-sizing: content-box; -webkit-box-sizing: content-box; box-sizing: content-box;}
    .md2-autocomplete-container .md2-autocomplete-value .md2-autocomplete-icon-clear { position: relative; display: inline-block; width: 18px; height: 18px; margin: 0 4px; overflow: hidden; }
    .md2-autocomplete-container .md2-autocomplete-value .md2-autocomplete-icon-clear::before,
    .md2-autocomplete-container .md2-autocomplete-value .md2-autocomplete-icon-clear::after { content: ''; position: absolute; height: 2px; width: 100%; top: 50%; left: 0; margin-top: -1px; background: #888; border-radius: 2px; height: 2px; }
    .md2-autocomplete-container .md2-autocomplete-value .md2-autocomplete-icon-clear::before { -webkit-transform: rotate(45deg); -moz-transform: rotate(45deg); -ms-transform: rotate(45deg); -o-transform: rotate(45deg); transform: rotate(45deg); }
    .md2-autocomplete-container .md2-autocomplete-value .md2-autocomplete-icon-clear::after { -webkit-transform: rotate(-45deg); -moz-transform: rotate(-45deg); -ms-transform: rotate(-45deg); -o-transform: rotate(-45deg); transform: rotate(-45deg); }
    .md2-autocomplete-container .md2-autocomplete-suggestions { position: absolute; left: 0; top: 100%; display: block; z-index: 10; padding: 0; -ms-flex-direction: column; -webkit-flex-direction: column; flex-direction: column; width: 100%; margin: 0; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12); max-height: 256px; min-height: 48px; overflow-y: auto; -moz-transform: scale(1); -ms-transform: scale(1); -o-transform: scale(1); -webkit-transform: scale(1); transform: scale(1); background: #fff; }
    .md2-autocomplete-container .md2-autocomplete-suggestions .md2-item { cursor: pointer; position: relative; display: block; align-items: center; color: #212121; width: auto; -moz-transition: background 0.15s linear; -o-transition: background 0.15s linear; -webkit-transition: background 0.15s linear; transition: background 0.15s linear; padding: 0 16px; height: 48px; line-height: 48px; }
    .md2-autocomplete-container .md2-autocomplete-suggestions .md2-item:hover, .md2-autocomplete-container .md2-autocomplete-suggestions .md2-item.active, .md2-autocomplete-container .md2-autocomplete-suggestions .md2-item.focus { background: #eeeeee; }
    .md2-autocomplete-container .md2-autocomplete-suggestions .md2-item .md2-text { width: auto; white-space: nowrap; overflow: hidden; -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; text-overflow: ellipsis; font-size: 16px; }
    .md2-autocomplete-container .md2-autocomplete-suggestions .highlight{color: #757575;}
  `],
  providers: [MD2_AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None
})

export class Md2Autocomplete implements AfterContentInit, ControlValueAccessor {

  constructor(public element: ElementRef) { }

  ngOnInit() {
    this.behavior = new GenericBehavior(this);
    this.offSideClickHandler = this.getOffSideClickHandler(this);
    document.addEventListener('click', this.offSideClickHandler);
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.offSideClickHandler);
    this.offSideClickHandler = null;
  }

  ngAfterContentInit() {
    this._isInitialized = true;
  }

  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  @Output() cleared: EventEmitter<any> = new EventEmitter<any>();

  private _value: any = '';
  private _isInitialized: boolean = false;
  private _onTouchedCallback: () => void = noop;
  private _onChangeCallback: (_: any) => void = noop;

  private selectedValue: string = '';
  private isMenuOpened: boolean = false;
  private behavior: IListsBehavior;
  private _items: Array<any> = [];
  private offSideClickHandler: any;
  private inputValue: string = '';

  public list: Array<ListItem> = [];
  public tempList: Array<ListItem> = [];
  public currentItem: ListItem;

  @Input() id: string = 'md2-autocomplete-' + (++nextId);
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
      if (!this.selectedValue) { this.selectedValue = ''; }
      this.inputValue = this.selectedValue;
      if (this._isInitialized) {
        this._onChangeCallback(value);
        this.change.emit(this._value);
      }
    }
  }

  public onClick(e: any) {
    if (this.disabled) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    this.tempList = this.list = this._items.map((item: any) => new ListItem(item, this.itemText));
    if (this.selectedValue.length > 0) {
      this.currentItem = this.list.find((item: any) => item.text === this.selectedValue);
    }
    this.isMenuOpened = true;
    setTimeout(() => { this.behavior.next(); }, 0);
    this.behavior.filter(new RegExp(this.inputValue, 'ig'));
  }

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

    //filter
    if (e.srcElement) {
      setTimeout(() => {
        if (!this.isMenuOpened) { this.onClick(e); }
        this.behavior.filter(new RegExp(this.inputValue, 'ig'));
      }, 100);
    }
  }

  private onBlur() { this.isMenuOpened = false; }

  private openMenu() {
    this.list = this._items.map((item: any) => new ListItem(item, this.itemText));
    if (this.selectedValue.length > 0) {
      this.currentItem = this.list.find((item: any) => item.text === this.selectedValue);
    }
    this.isMenuOpened = true;
    setTimeout(() => { this.behavior.next(); }, 0);
  }

  private selectItemOnMatch(value: ListItem, e: Event = null) {
    if (e) { e.preventDefault(); }
    if (this.list.length <= 0) { return; }

    this.inputValue = this.selectedValue = value.text;
    if (typeof this._value === 'string') {
      this._value = this.selectedValue;
    }
    if (typeof this._value === 'object') {
      if (Array.isArray(this._value)) {
        this._value = new Array<any>();
        this._value.push(this._items.find((item: any) => item[this.itemText] === value.text));
      } else {
        this._value = new Object();
        let itm = this._items.find((item: any) => item[this.itemText] === value.text);
        for (let i in itm) {
          this._value[i] = itm[i];
        }
      }
    }
    this._onChangeCallback(this._value);
    this.change.emit(this._value);
    this.onBlur();
    this.element.nativeElement.querySelector('.md2-autocomplete-container input').focus();
  }

  private getOffSideClickHandler(context: any) {
    return function (e: any) {
      let elem = e.target;
      do {
        if (elem === context.element.nativeElement && elem.className && elem.className.indexOf('md2-autocomplete') < 0) { return; }
        elem = elem.parentNode;
      } while (elem);
      context.isMenuOpened = false;
    };
  }

  private clear(item: ListItem) {
    if (this.disabled) { return; }
    this.selectedValue = this.inputValue = '';
    if (typeof this._value === 'string') {
      this._value = this.selectedValue;
    }
    if (typeof this._value === 'object') {
      if (Array.isArray(this._value)) {
        this._value = new Array<any>();
      } else {
        this._value = new Object();;
      }
    }




    this._onChangeCallback(this._value);
    this.change.emit(this._value);
    this.cleared.emit(item);
  }

  private isActive(value: ListItem): boolean {
    return this.selectedValue === value.text ? true : false;
  }

  private isFocus(value: ListItem): boolean {
    if (this.currentItem) { return this.currentItem.text === value.text; }
    return false;
  }

  writeValue(value: any) { this.setValue(value); }

  registerOnChange(fn: any) { this._onChangeCallback = fn; }

  registerOnTouched(fn: any) { this._onTouchedCallback = fn; }
}

export class ListItem {
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

  constructor(public actor: Md2Autocomplete) {
  }

  private getActiveIndex(listMap: Map<string, number> = null): number {
    let ai = this.actor.list.indexOf(this.actor.currentItem);

    if (ai < 0 && listMap !== null) {
      ai = listMap.get(this.actor.currentItem.text);
    }

    return ai;
  }

  public ensureHighlightVisible(listMap: Map<string, number> = null) {
    let container = this.actor.element.nativeElement.querySelector('.md2-autocomplete-suggestions');

    if (!container) {
      return;
    }

    let choices = container.querySelectorAll('.md2-item');
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
  constructor(public actor: Md2Autocomplete) {
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

  public filter(query: RegExp) {
    let list = this.actor.tempList
      .filter(option => query.test(option.text));
    this.actor.list = list;

    if (this.actor.list.length > 0) {
      this.actor.currentItem = this.actor.list[0];
      super.ensureHighlightVisible();
    }
  }
}

interface IListsBehavior {
  first(): any;
  prev(): any;
  next(): any;
  filter(query: RegExp): any;
}