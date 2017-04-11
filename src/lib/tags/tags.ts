import {
  AfterContentInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  Output,
  ViewEncapsulation,
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
  LEFT_ARROW,
  RIGHT_ARROW,
  BACKSPACE,
  DELETE,
  TAB,
  ESCAPE
} from '../core/core';
import { Md2AutocompleteModule } from '../autocomplete/autocomplete';

const noop = () => { };

let nextId = 0;

export class Tag {
  text: string;
  value: string;

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

export const MD2_TAGS_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Md2Tags),
  multi: true
};

@Component({
  moduleId: module.id,
  selector: 'md2-tags',
  templateUrl: 'tags.html',
  styleUrls: ['tags.css'],
  host: {
    'role': 'tags',
    '[id]': 'id',
    '[class.focus]': '_inputFocused || _selectedTag >= 0',
    '[class.md2-tags-disabled]': 'disabled',
    '[tabindex]': 'disabled ? -1 : tabindex',
    '[attr.aria-disabled]': 'disabled'
  },
  providers: [MD2_TAGS_CONTROL_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None,
  exportAs: 'md2Tags'
})

export class Md2Tags implements AfterContentInit, ControlValueAccessor {

  constructor(private _element: ElementRef) { }

  ngAfterContentInit() { this._isInitialized = true; }

  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  private _value: any = '';
  private _disabled: boolean = false;
  private _isInitialized: boolean = false;
  private _onTouchedCallback: () => void = noop;
  private _onChangeCallback: (_: any) => void = noop;

  private _tags: Array<any> = [];
  _list: Array<Tag> = [];
  _items: Array<Tag> = [];

  _focusedTag: number = 0;
  _selectedTag: number = -1;
  _inputValue: string = '';
  _inputFocused: boolean = false;
  private noBlur: boolean = true;

  @Input() id: string = 'md2-tags-' + (++nextId);
  @Input() tabindex: number = 0;
  @Input() placeholder: string = '';
  @Input('md2-tag-text') textKey: string = 'text';
  @Input('md2-tag-value') valueKey: string = null;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value) { this._disabled = coerceBooleanProperty(value); }

  @Input('md2-tags')
  set tags(value: Array<any>) { this._tags = value; }

  @Input()
  get value(): any { return this._value; }
  set value(value: any) { this.setValue(value); }

  /**
   * setup value
   * @param value
   */
  private setValue(value: any) {
    if (value !== this._value) {
      this._value = value;
      this._items = [];
      if (value && value.length && typeof value === 'object' && Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          let selItm = this._tags.find((t: any) => this.equals(this.valueKey ?
            t[this.valueKey] : t, value[i]));
          if (selItm) { this._items.push(new Tag(selItm, this.textKey, this.valueKey)); }
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

  get isMenuVisible(): boolean {
    return ((this._inputFocused || this.noBlur) && this._inputValue &&
      this._list && this._list.length) ? true : false;
  }

  /**
   * update scroll of tags suggestion menu
   */
  private updateScroll() {
    if (this._focusedTag < 0) { return; }
    let menuContainer = this._element.nativeElement.querySelector('.md2-tags-menu');
    if (!menuContainer) { return; }

    let choices = menuContainer.querySelectorAll('.md2-option');
    if (choices.length < 1) { return; }

    let highlighted: any = choices[this._focusedTag];
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
   * input key listener
   * @param event
   */
  _handleInputKeydown(event: KeyboardEvent) {
    // Backspace
    if (event.keyCode === 8 && !this._inputValue) {
      event.preventDefault();
      event.stopPropagation();
      if (this._items.length && this._selectedTag < 0) {
        this.selectAndFocusTagSafe(this._items.length - 1);
      }
      if (this._items.length && this._selectedTag > -1) {
        this.removeAndSelectAdjacentTag(this._selectedTag);
      }
      return;
    }
    // Del Key
    if (event.keyCode === 46 && !this._inputValue) { return; }
    // Left / Right Arrow
    if ((event.keyCode === 37 || event.keyCode === 39) && !this._inputValue) { return; }
    // Down Arrow
    if (event.keyCode === 40) {
      if (!this.isMenuVisible) { return; }
      event.stopPropagation();
      event.preventDefault();
      this._focusedTag = (this._focusedTag === this._list.length - 1) ?
        0 : Math.min(this._focusedTag + 1, this._list.length - 1);
      this.updateScroll();
      return;
    }
    // Up Arrow
    if (event.keyCode === 38) {
      if (!this.isMenuVisible) { return; }
      event.stopPropagation();
      event.preventDefault();
      this._focusedTag = (this._focusedTag === 0) ?
        this._list.length - 1 : Math.max(0, this._focusedTag - 1);
      this.updateScroll();
      return;
    }
    // Tab Key
    if (event.keyCode === 9) { return; }
    // Enter / Space
    if (event.keyCode === 13 || event.keyCode === 32) {
      if (!this._inputValue || !this.isMenuVisible) { event.preventDefault(); return; }
      event.preventDefault();
      this._addTag(event, this._focusedTag);
      return;
    }
    // Escape Key
    if (event.keyCode === 27) {
      event.stopPropagation();
      event.preventDefault();
      if (this._inputValue) { this._inputValue = ''; }
      if (this._selectedTag >= 0) { this._handleFocus(); }
      return;
    }
    // reset selected tag
    if (this._selectedTag >= 0) { this.resetselectedTag(); }
    // filter
    setTimeout(() => {
      this.filterMatches();
    }, 10);
  }

  @HostListener('keydown', ['$event'])
  _handleKeydown(event: KeyboardEvent) {
    if (this.disabled || this._inputValue) { return; }
    switch (event.keyCode) {
      case BACKSPACE:
      case DELETE:
        if (this._selectedTag < 0) { return; }
        event.preventDefault();
        this.removeAndSelectAdjacentTag(this._selectedTag);
        break;

      case TAB:
      case ESCAPE:
        if (this._selectedTag < 0) { return; }
        event.preventDefault();
        this._handleFocus();
        break;

      case LEFT_ARROW:
        event.preventDefault();
        if (this._selectedTag < 0) { this._selectedTag = this._items.length; }
        if (this._items.length) { this.selectAndFocusTagSafe(this._selectedTag - 1); }
        break;
      case RIGHT_ARROW:
        event.preventDefault();
        if (this._selectedTag >= this._items.length) { this._selectedTag = -1; }
        this.selectAndFocusTagSafe(this._selectedTag + 1);
        break;
    }
  }

  private removeAndSelectAdjacentTag(index: number) {
    let selIndex = this.getAdjacentTagIndex(index);
    this.removeTag(index);
    this.selectAndFocusTagSafe(selIndex);
  }

  private resetselectedTag() {
    this._selectedTag = -1;
  }

  private getAdjacentTagIndex(index: number) {
    let len = this._items.length - 1;
    return (len === 0) ? -1 :
      (index === len) ? index - 1 : index;
  }

  /**
   * add tag
   * @param event
   * @param index index of the specific tag
   */
  _addTag(event: Event, index: number) {
    event.preventDefault();
    event.stopPropagation();
    this._items.push(this._list[index]);
    this._inputValue = '';
    this.updateValue();
  }

  _removeTagAndFocusInput(index: number) {
    this.removeTag(index);
    this._handleFocus();
  }

  /**
   * remove tag
   * @param index
   */
  private removeTag(index: number) {
    this._items.splice(index, 1);
    this.updateValue();
  }

  /**
   * update value
   */
  private updateValue() {
    this._value = new Array<any>();
    for (let i = 0; i < this._items.length; i++) {
      this._value.push(this._items[i].value);
    }
    this._onChangeCallback(this._value);
    this.change.emit(this._value);
  }

  private selectAndFocusTagSafe = function (index: number) {
    if (!this._items.length) {
      this._selectTag(-1);
      this._handleFocus();
      return;
    }
    if (index === this._items.length) { return this._handleFocus(); }
    index = Math.max(index, 0);
    index = Math.min(index, this._items.length - 1);
    this._selectTag(index);
  };

  /**
   * select tag
   * @param index of select tag
   */
  _selectTag(index: number) {
    if (index >= -1 && index <= this._items.length) {
      this._selectedTag = index;
    }
  }

  @HostListener('focus')
  _handleFocus() {
    this._element.nativeElement.querySelector('input').focus();
    this.resetselectedTag();
  }

  _onInputFocus() {
    this._inputFocused = true;
    this.resetselectedTag();
  }

  _onInputBlur() {
    this._inputFocused = false;
  }

  _listEnter() { this.noBlur = true; }

  _listLeave() { this.noBlur = false; }

  /**
   * update suggestion menu with filter
   * @param query
   */
  private filterMatches() {
    let tempList = this._tags.map((tag: any) => new Tag(tag, this.textKey, this.valueKey));
    this._list = tempList.filter((t: Tag) =>
      (new RegExp(this._inputValue, 'ig').test(t.text) &&
        !this._items.find((i: Tag) => t.text === i.text)));
    if (this._list.length > 0) {
      this._focusedTag = 0;
    }
  }

  writeValue(value: any) {
    if (value !== this._value) {
      this._value = value;
      this._items = [];
      if (value && value.length && typeof value === 'object' && Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          let selItm = this._tags.find((t: any) => this.equals(this.valueKey ?
            t[this.valueKey] : t, value[i]));
          if (selItm) { this._items.push(new Tag(selItm, this.textKey, this.valueKey)); }
        }
      }
    }
  }

  registerOnChange(fn: any) { this._onChangeCallback = fn; }

  registerOnTouched(fn: any) { this._onTouchedCallback = fn; }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}

export const MD2_TAGS_DIRECTIVES = [Md2Tags];

@NgModule({
  imports: [CommonModule, FormsModule, Md2AutocompleteModule],
  exports: MD2_TAGS_DIRECTIVES,
  declarations: MD2_TAGS_DIRECTIVES,
})
export class Md2TagsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Md2TagsModule,
      providers: []
    };
  }
}
