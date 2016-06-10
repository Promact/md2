import { Component, EventEmitter, Input, Output, HostListener, Provider, ViewEncapsulation, forwardRef, ElementRef, AfterContentInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/common';
import {HightlightPipe} from '../autocomplete/autocomplete.pipe';

const noop = () => { };

let nextId = 0;

const MD2_TAGS_CONTROL_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, {
  useExisting: forwardRef(() => Md2Tags),
  multi: true
});

@Component({
  selector: 'md2-tags',
  pipes: [HightlightPipe],
  template: `
    <div class="md2-tags-layout">
      <div class="md2-tags-container">
        <span *ngFor="let t of selectedValue" class="md2-tag">
          <span class="md2-tag-text">{{t.text}}</span>
          <span class="md2-remove-icon" (click)="removeTag(t, $event)"></span>
        </span>
        <input [(ngModel)]="inputValue" type="text" tabs="false" tabindex="-1" (click)="onClick()" (keydown)="onKeyDown($event)" [disabled]="disabled" class="md2-tags-input" [placeholder]="placeholder">
      </div>
      <ul *ngIf="isMenuOpened && list && list.length > 0" class="md2-tags-menu">
        <li class="md2-option" *ngFor="let l of list" [class.active]="isActive(l)" [class.focused]="isFocus(l)" (click)="selectItemOnMatch(l, $event)">
          <div class="md2-option-text" [innerHtml]="l.text | hightlight:inputValue"></div>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .md2-tags { -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }
    .md2-tags:focus { outline: none; }
    .md2-tags .md2-tags-layout { position: relative; display: block; }
    .md2-tags .md2-tags-container { display: block; width: 100%; align-items: center; padding: 2px 3px 8px; border-bottom: 1px solid rgba(0, 0, 0, 0.38); position: relative; -moz-box-sizing: content-box; -webkit-box-sizing: content-box; box-sizing: content-box; min-width: 64px; min-height: 26px; flex-grow: 1; cursor: pointer; }
    .md2-tags .md2-tags-container:before, .md2-tags .md2-tags-container:after { display: table; content: " "; }
    .md2-tags .md2-tags-container:after { clear: both; }
    .md2-tags.focus .md2-tags-container { padding-bottom: 7px; border-bottom: 2px solid #106cc8; }
    .md2-tags.md2-tags-disabled .md2-tags-container { color: rgba(0,0,0,0.38); }
    .md2-tags.md2-tags-disabled.focus .md2-tags-container { padding-bottom: 1px; border-bottom: 1px solid rgba(0, 0, 0, 0.38); }
    .md2-tags .md2-tags-container .md2-tag { cursor: default; border-radius: 16px; display: block; height: 32px; line-height: 32px; margin: 8px 8px 0 0; padding: 0 26px 0 12px; float: left; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; max-width: 100%; position: relative; background: rgb(224,224,224); color: rgb(66,66,66); white-space: nowrap; overflow: hidden; -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; text-overflow: ellipsis; }
    .md2-tags .md2-tags-container .md2-tag .md2-remove-icon { position: absolute; top: 7px; right: 0; cursor: pointer; display: inline-block; width: 18px; height: 18px; margin: 0 4px; overflow: hidden; }
    .md2-tags .md2-tag .md2-remove-icon::before,
    .md2-tags .md2-tag .md2-remove-icon::after { content: ''; position: absolute; height: 2px; width: 100%; top: 50%; left: 0; margin-top: -1px; background: #888; border-radius: 2px; }
    .md2-tags .md2-tag .md2-remove-icon::before { -webkit-transform: rotate(45deg); -moz-transform: rotate(45deg); -ms-transform: rotate(45deg); -o-transform: rotate(45deg); transform: rotate(45deg); }
    .md2-tags .md2-tag .md2-remove-icon::after { -webkit-transform: rotate(-45deg); -moz-transform: rotate(-45deg); -ms-transform: rotate(-45deg); -o-transform: rotate(-45deg); transform: rotate(-45deg); }
    .md2-tags input { border: 0; outline: 0; margin-top: 8px; height: 32px; line-height: 32px; padding: 0; color: rgba(0,0,0,0.87); background: 0 0; }
    .md2-tags .md2-tags-container .md2-tags-placeholder { color: rgba(0, 0, 0, 0.38); }
    .md2-tags .md2-tags-menu { position: absolute; left: 0; top: 100%; display: block; z-index: 10; -ms-flex-direction: column; -webkit-flex-direction: column; flex-direction: column; width: 100%; margin: 0; padding: 8px 0; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12); max-height: 256px; min-height: 48px; overflow-y: auto; -moz-transform: scale(1); -ms-transform: scale(1); -o-transform: scale(1); -webkit-transform: scale(1); transform: scale(1); background: #fff; }
    .md2-tags .md2-tags-menu .md2-option { cursor: pointer; position: relative; display: block; align-items: center; width: auto; -moz-transition: background 0.15s linear; -o-transition: background 0.15s linear; -webkit-transition: background 0.15s linear; transition: background 0.15s linear; padding: 0 16px; height: 48px; line-height: 48px; }
    .md2-tags .md2-tags-menu .md2-option:hover, .md2-tags .md2-tags-menu .md2-option.focused { background: #eeeeee; }
    .md2-tags .md2-tags-menu .md2-option .md2-option-text { width: auto; white-space: nowrap; overflow: hidden; -ms-text-overflow: ellipsis; -o-text-overflow: ellipsis; text-overflow: ellipsis; font-size: 16px; }
    .md2-tags .highlight { color: #757575; }
  `],
  host: {
    'role': 'tags',
    '[id]': 'id',
    '[class.md2-tags]': 'true',
    '[class.focus]': 'focused',
    '[class.md2-tags-disabled]': 'disabled',
    '[tabindex]': 'disabled ? -1 : tabindex',
    '[attr.aria-disabled]': 'disabled'
  },
  providers: [MD2_TAGS_CONTROL_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None
})

export class Md2Tags implements AfterContentInit, ControlValueAccessor {

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

  private _value: any = '';
  private _isInitialized: boolean = false;
  private _onTouchedCallback: () => void = noop;
  private _onChangeCallback: (_: any) => void = noop;

  private selectedValue: Array<Tag> = [];
  private isMenuOpened: boolean = false;
  private behavior: IListsBehavior;
  private _tags: Array<any> = [];
  private offSideClickHandler: any;
  private inputValue: string = '';
  private focused: boolean = false;

  public list: Array<Tag> = [];
  public tempList: Array<Tag> = [];
  public focusedTag: Tag;

  @Input() id: string = 'md2-tags-' + (++nextId);
  @Input() disabled: boolean = false;
  @Input() tabindex: number = 0;
  @Input() placeholder: string = '';
  @Input('md-tag-text') textKey: string = 'text';
  @Input('md-tag-value') valueKey: string = null;

  @Input('md-tags') set tags(value: Array<any>) {
    this._tags = value;
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
      this.selectedValue = [];
      if (value && value.length && typeof value === 'object' && Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          this.selectedValue.push({ text: value[i][this.textKey] });
        }
      }
      if (this._isInitialized) {
        this._onChangeCallback(value);
        this.change.emit(this._value);
      }
    }
  }

  @HostListener('click', ['$event'])
  private onClick(e: any) {
    if (this.disabled) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }

    this.tempList = this._tags.map((tag: any) => new Tag(tag, this.textKey, this.valueKey));
    this.list = this.tempList.filter((option: Tag) => (!this.selectedValue.find((o: Tag) => option.text === o.text)));
    this.tempList = this.list;
    this.isMenuOpened = true;
    this.element.nativeElement.querySelector('input').focus();
  }

  //@HostListener('keydown', ['$event'])
  private onKeyDown(e: any) {
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
        this.selectItemOnMatch(this.focusedTag, e);
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

  @HostListener('focus')
  private onFocus() { this.focused = true; this.element.nativeElement.querySelector('input').focus(); }

  @HostListener('blur')
  private onBlur() { this.isMenuOpened = false; }

  private selectItemOnMatch(value: Tag, e: Event = null) {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    if (this.list.length < 1) { return; }

    //let index = this.selectedValue.findIndex(tag => tag.text === value.text);
    //if (index == -1) {
    this.selectedValue.push(value);
    //this.selectedValue = this.selectedValue.sort((a, b) => { return this.list.findIndex(tag=> tag.text == a.text) - this.list.findIndex(tag=> tag.text == b.text); });
    //} else {
    //  this.selectedValue.splice(index, 1);
    //}

    this._value = new Array<any>();
    for (let i = 0; i < this.selectedValue.length; i++) {
      this._value.push(this._tags.find((tag: any) => tag[this.textKey] === this.selectedValue[i].text));
    }

    this.inputValue = '';

    this._onChangeCallback(this._value);
    this.change.emit(this._value);
    this.onBlur();
    this.element.nativeElement.querySelector('input').focus();
  }

  private getOffSideClickHandler(context: any) {
    return function (e: any) {
      let elem = e.target;
      do {
        if (elem === context.element.nativeElement && elem.className && elem.className.indexOf('md2-tags') < 0) { return; }
        elem = elem.parentNode;
      } while (elem);
      context.isMenuOpened = false;
    };
  }

  private isActive(value: Tag): boolean {
    let index = this.selectedValue.findIndex(tag => tag.text === value.text);
    return index == -1 ? false : true;
  }

  private isFocus(value: Tag): boolean {
    if (this.focusedTag) { return this.focusedTag.text === value.text; }
    return false;
  }

  private removeTag(tag, event) {
    let index = this.selectedValue.findIndex(tag => tag.text === tag.text);
    this.selectedValue.splice(index, 1);
  }

  writeValue(value: any) { this.setValue(value); }

  registerOnChange(fn: any) { this._onChangeCallback = fn; }

  registerOnTouched(fn: any) { this._onTouchedCallback = fn; }
}

export class Tag {
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

class Behavior {
  public listMap: Map<string, number> = new Map<string, number>();

  constructor(public actor: Md2Tags) {
  }

  private getActiveIndex(listMap: Map<string, number> = null): number {
    let ai = this.actor.list.indexOf(this.actor.focusedTag);

    if (ai < 0 && listMap !== null) {
      ai = listMap.get(this.actor.focusedTag.text);
    }

    return ai;
  }

  public ensureHighlightVisible(listMap: Map<string, number> = null) {
    let container = this.actor.element.nativeElement.querySelector('.md2-tags-suggestions');

    if (!container) {
      return;
    }

    let choices = container.querySelectorAll('.md2-tag');
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
  constructor(public actor: Md2Tags) {
    super(actor);
  }

  public first() {
    this.actor.focusedTag = this.actor.list[0];
    super.ensureHighlightVisible();
  }

  public prev() {
    let index: number = this.actor.list.indexOf(this.actor.focusedTag);
    this.actor.focusedTag = this.actor.list[index - 1 < 0 ? this.actor.list.length - 1 : index - 1];
    super.ensureHighlightVisible();
  }

  public next() {
    let index: number = this.actor.list.indexOf(this.actor.focusedTag);
    this.actor.focusedTag = this.actor.list[index + 1 > this.actor.list.length - 1 ? 0 : index + 1];
    super.ensureHighlightVisible();
  }

  public filter(query: RegExp) {
    let list = this.actor.tempList
      .filter(option => query.test(option.text));
    this.actor.list = list;

    if (this.actor.list.length > 0) {
      this.actor.focusedTag = this.actor.list[0];
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