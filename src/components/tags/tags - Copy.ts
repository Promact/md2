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
        <span *ngFor="let t of selectedValue" class="md2-tag" [class.active]="isActive(t)" (click)="onClickTag($event,t)">
          <span class="md2-tag-text">{{t.text}}</span>
          <span class="md2-remove-icon" (click)="removeTag(t)"></span>
        </span>
        <input [(ngModel)]="inputValue" type="text" tabs="false" tabindex="-1" (click)="onClick()" (keydown)="inputKeydown($event)" [disabled]="disabled" class="md2-tags-input" [placeholder]="placeholder">
      </div>
      <ul *ngIf="isMenuOpened && list && list.length > 0" class="md2-tags-menu">
        <li class="md2-option" *ngFor="let l of list" [class.focused]="isFocus(l)" (click)="selectItemOnMatch(l, $event)">
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
    .md2-tags .md2-tags-container .md2-tag.active { background: #106cc8; color: rgba(255,255,255,0.87); }
    .md2-tags .md2-tags-container .md2-tag .md2-remove-icon { position: absolute; top: 7px; right: 0; cursor: pointer; display: inline-block; width: 18px; height: 18px; margin: 0 4px; overflow: hidden; }
    .md2-tags .md2-tag .md2-remove-icon::before,
    .md2-tags .md2-tag .md2-remove-icon::after { content: ''; position: absolute; height: 2px; width: 100%; top: 50%; left: 0; margin-top: -1px; background: #888; border-radius: 2px; }
    .md2-tags .md2-tag.active .md2-remove-icon::before,
    .md2-tags .md2-tag.active .md2-remove-icon::after { background: rgba(255,255,255,0.87); }
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
  public selectedTag: number = -1;

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
    if (this.list.length) {
      this.focusedTag = this.list[0];
    }
    this.isMenuOpened = true;
    this.element.nativeElement.querySelector('input').focus();
  }

  private onClickTag(e, tag: Tag) {
    e.stopPropagation();
    e.preventDefault();
    if (this.disabled) {
      return;
    }
    this.selectedTag = tag;
  }

  //@HostListener('keydown', ['$event'])
  private onKeyDown = function (e: KeyboardEvent) {
    // check enabled
    if (this.disabled === true) { return; }

    // Backspace / Del Key
    else if (e.keyCode === 8 || e.keyCode === 46) {
      if (this.selectedTag < 0) return;
      e.preventDefault();
      this.removeTag(this.selectedTag);
    }

    // Left Arrow
    else if (e.keyCode === 37 && !this.inputValue.length) {
      e.preventDefault();
      if (this.selectedTag < 0) this.selectedTag = this.selectedValue.length;
      if (this.selectedValue.length) this.selectAndFocusTag(this.selectedTag - 1);
    }

    // Right Arrow
    else if (e.keyCode === 39 && !this.inputValue.length) {
      e.preventDefault();
      this.selectAndFocusTag(this.selectedTag + 1);
    }

    // Escape / Tab Key
    else if (e.keyCode === 27 || e.keyCode === 9) {
      if (this.selectedTag < 0) return;
      e.preventDefault();
      this.onFocus();
    }
  };
  private inputKeydown(e: any) {
    // check enabled
    if (this.disabled === true) { return; }

    if (this.inputValue.length && this.selectedTag) { this.selectedTag = null; }

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

    // Del Arrow
    if (e.keyCode === 46 && !this.inputValue.length) {
      if (this.selectedTag) {
        this.removeTag(this.selectedTag);
      }
      e.stopPropagation();
      e.preventDefault();
      return;
    }

    // Back space Arrow
    if (e.keyCode === 8 && !this.inputValue.length) {
      if (this.selectedTag) {
        this.removeTag(this.selectedTag);
      } else { this.selectedTag = this.selectedValue[this.selectedValue.length - 1]; }
      e.stopPropagation();
      e.preventDefault();
      return;
    }

    // Left Arrow
    if (e.keyCode === 37 && !this.inputValue.length) {
      if (this.selectedTag) {
        let index = this.selectedValue.findIndex(tag => tag.text === this.selectedTag.text);
        if (index === 0) { index = this.selectedValue.length; }
        this.selectedTag = this.selectedValue[index - 1];
      } else {
        this.selectedTag = this.selectedValue[this.selectedValue.length - 1];
      }
      e.stopPropagation();
      e.preventDefault();
      return;
    }

    // Right Arrow
    if (e.keyCode === 39 && !this.inputValue.length) {
      if (this.selectedTag) {
        let index = this.selectedValue.findIndex(tag => tag.text === this.selectedTag.text);
        if (index + 1 === this.selectedValue.length) { index = -1; }
        this.selectedTag = this.selectedValue[index + 1];
      } else {
        this.selectedTag = this.selectedValue[0];
      }
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

    this.selectedValue.push(value);

    this._value = new Array<any>();
    for (let i = 0; i < this.selectedValue.length; i++) {
      this._value.push(this.selectedValue[i].value);
    }

    this.inputValue = '';

    this._onChangeCallback(this._value);
    this.change.emit(this._value);
    this.onBlur();
    this.focusedTag = null;
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
    return this.selectedTag && this.selectedTag.text === value.text ? true : false;
  }

  private isFocus(value: Tag): boolean {
    if (this.focusedTag) { return this.focusedTag.text === value.text; }
    return false;
  }

  private removeTag(tag) {
    let index = this.selectedValue.findIndex(t => t.text === tag.text);
    if (this.selectedTag) {
      let ind = this.selectedValue.findIndex(t => t.text === this.selectedTag.text);
      if (ind === index && this.selectedValue.length > 1) {
        if (ind === this.selectedValue.length - 1) {
          ind = this.selectedValue.length - 3;
        }
        this.selectedTag = this.selectedValue[ind + 1];
      } else { this.selectedTag = null; }
    }
    this.selectedValue.splice(index, 1);
    this._value = new Array<any>();
    for (let i = 0; i < this.selectedValue.length; i++) {
      this._value.push(this.selectedValue[i].value);
    }
    this._onChangeCallback(this._value);
    this.change.emit(this._value);
  }

  private removeAndSelectTag(index: number) {
    var selIndex = this.getAdjacentTagIndex(index);
    this.removeTag(index);
    this.$timeout(angular.bind(this, function () {
      this.selectAndFocusTagSafe(selIndex);
    }));
  };

  private getAdjacentTagIndex(index: number) {
    var len = this.selectedValue.length - 1;
    return (len == 0) ? -1 : (index === len) ? index - 1 : index;
  };

  private selectAndFocusTag(index: number) {
    if (!this.selectedValue.length) {
      //this.selectTag(-1);
      //this.onFocus();
      //return;
    }
    //if (index === this.selectedValue.length) return this.onFocus();
    index = Math.max(index, 0);
    index = Math.min(index, this.selectedValue.length - 1);
    //this.selectTag(index);
    //this.focusTag(index);
  };

















  //=====================================================================================================================================================
  private items: Array<any> = [];

  private selectedTag: number = -1;

  private tagBuffer: string = '';

  private inputKeydown(event: KeyboardEvent) {
    var tagBuffer = this.gettagBuffer();

    // If we have an autocomplete, and it handled the event, we have nothing to do
    if (this.hasAutocomplete && event.isDefaultPrevented && event.isDefaultPrevented()) {
      return;
    }

    if (event.keyCode === this.$mdConstant.KEY_CODE.BACKSPACE) {
      if (tagBuffer) return;
      event.preventDefault();
      event.stopPropagation();
      if (this.items.length) this.selectAndFocusTagSafe(this.items.length - 1);
      return;
    }

    // By default <enter> appends the buffer to the tag list.
    if (!this.separatorKeys || this.separatorKeys.length < 1) {
      this.separatorKeys = [this.$mdConstant.KEY_CODE.ENTER];
    }

    // Support additional separator key codes in an array of `md-separator-keys`.
    if (this.separatorKeys.indexOf(event.keyCode) !== -1) {
      if ((this.hasAutocomplete && this.requireMatch) || !tagBuffer) return;
      event.preventDefault();

      this.appendTag(tagBuffer.trim());
      this.resettagBuffer();
    }
  }


  /**
   * Updates the content of the tag at given index
   * @param tagIndex
   * @param tagContents
   */
  private updateTagContents = function (tagIndex, tagContents) {
    if (tagIndex >= 0 && tagIndex < this.items.length) {
      this.items[tagIndex] = tagContents;
      this.ngModelCtrl.$setDirty();
    }
  };


  private onKeydown(event: KeyboardEvent) {
    if (this.gettagBuffer()) return;
    if (this.isEditingTag()) return;

    switch (event.keyCode) {
      case this.$mdConstant.KEY_CODE.BACKSPACE:
      case this.$mdConstant.KEY_CODE.DELETE:
        if (this.selectedTag < 0) return;
        event.preventDefault();
        this.removeAndSelectAdjacentTag(this.selectedTag);
        break;
      case this.$mdConstant.KEY_CODE.LEFT_ARROW:
        event.preventDefault();
        if (this.selectedTag < 0) this.selectedTag = this.items.length;
        if (this.items.length) this.selectAndFocusTagSafe(this.selectedTag - 1);
        break;
      case this.$mdConstant.KEY_CODE.RIGHT_ARROW:
        event.preventDefault();
        this.selectAndFocusTagSafe(this.selectedTag + 1);
        break;
      case this.$mdConstant.KEY_CODE.ESCAPE:
      case this.$mdConstant.KEY_CODE.TAB:
        if (this.selectedTag < 0) return;
        event.preventDefault();
        this.onFocus();
        break;
    }
  }

  private removeAndSelectAdjacentTag(index: number) {
    var selIndex = this.getAdjacentTagIndex(index);
    this.removeTag(index);
    this.$timeout(angular.bind(this, function () {
      this.selectAndFocusTagSafe(selIndex);
    }));
  }

  private resetselectedTag() {
    this.selectedTag = -1;
  }

  private getAdjacentTagIndex(index: number) {
    var len = this.items.length - 1;
    return (len == 0) ? -1 :
      (index == len) ? index - 1 : index;
  }

  private appendTag(newTag) {

    // If items contains an identical object to newTag, do not append
    if (angular.isObject(newTag)) {
      var identical = this.items.some(function (item) {
        return angular.equals(newTag, item);
      });
      if (identical) return;
    }

    // Check for a null (but not undefined), or existing tag and cancel appending
    if (newTag == null || this.items.indexOf(newTag) + 1) return;

    // Append the new tag onto our list
    var index = this.items.push(newTag);

    // Update model validation
    this.ngModelCtrl.$setDirty();
    this.validateModel();

    // If they provide the md-on-add attribute, notify them of the tag addition
    if (this.useOnAdd && this.onAdd) {
      this.onAdd({ '$tag': newTag, '$index': index });
    }
  }

  private resettagBuffer = function () {
    if (this.userInputElement) {
      if (this.userInputNgModelCtrl) {
        this.userInputNgModelCtrl.$setViewValue('');
        this.userInputNgModelCtrl.$render();
      } else {
        this.userInputElement[0].value = '';
      }
    } else {
      this.tagBuffer = '';
    }
  }


  /**
   * Removes the tag at the given index.
   * @param index
   */
  private removeTag = function (index) {
    var removed = this.items.splice(index, 1);
  };

  private removeTagAndFocusInput = function (index) {
    this.removeTag(index);
    this.onFocus();
  };
  /**
   * Selects the tag at `index`,
   * @param index
   */
  private selectAndFocusTagSafe = function (index) {
    if (!this.items.length) {
      this.selectTag(-1);
      this.onFocus();
      return;
    }
    if (index === this.items.length) return this.onFocus();
    index = Math.max(index, 0);
    index = Math.min(index, this.items.length - 1);
    this.selectTag(index);
    this.focusTag(index);
  };

  private selectTag(index) {
    if (index >= -1 && index <= this.items.length) {
      this.selectedTag = index;
    }
  }

  private selectAndFocusTag(index) {
    this.selectTag(index);
    if (index != -1) {
      this.focusTag(index);
    }
  }

  private focusTag(index) {
    this.$element[0].querySelector('md-tag[index="' + index + '"] ._md-tag-content').focus();
  }

  private onFocus() {
    var input = this.$element[0].querySelector('input');
    input && input.focus();
    this.resetselectedTag();
  }

  private onInputFocus() {
    this.inputHasFocus = true;
    this.resetselectedTag();
  }

  private onInputBlur() {
    this.inputHasFocus = false;
  }


  //private configureUserInput(inputElement) {
  //  this.userInputElement = inputElement;

  //  // Find the NgModelCtrl for the input element
  //  var ngModelCtrl = inputElement.controller('ngModel');
  //  // `.controller` will look in the parent as well.
  //  if (ngModelCtrl != this.ngModelCtrl) {
  //    this.userInputNgModelCtrl = ngModelCtrl;
  //  }

  //  var scope = this.$scope;
  //  var ctrl = this;

  //  // Run all of the events using evalAsync because a focus may fire a blur in the same digest loop
  //  var scopeApplyFn = function (event, fn) {
  //    scope.$evalAsync(angular.bind(ctrl, fn, event));
  //  };

  //  // Bind to keydown and focus events of input
  //  inputElement
  //    .attr({ tabindex: 0 })
  //    .on('keydown', function (event) { scopeApplyFn(event, ctrl.inputKeydown) })
  //    .on('focus', function (event) { scopeApplyFn(event, ctrl.onInputFocus) })
  //    .on('blur', function (event) { scopeApplyFn(event, ctrl.onInputBlur) })
  //}

  private configureAutocomplete(ctrl) {
    if (ctrl) {
      this.hasAutocomplete = true;

      ctrl.registerSelectedItemWatcher(angular.bind(this, function (item) {
        if (item) {
          this.appendTag(item);
          this.resettagBuffer();
        }
      }));

      this.$element.find('input')
        .on('focus', angular.bind(this, this.onInputFocus))
        .on('blur', angular.bind(this, this.onInputBlur));
    }
  }

  //=============================================================================================================================================

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