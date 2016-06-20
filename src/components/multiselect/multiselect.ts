import { Component, ContentChildren, Directive, ElementRef, HostBinding, Input, Output, ViewChildren, EventEmitter} from '@angular/core';
import {QueryList} from '@angular/core';
import {} from '@angular/core';
import {Observable} from 'rxjs/Observable';

let nextId = 0;

/** A simple change event emitted on focus or selection changes. */
export class Md2OptionChangeEvent {
  index: number;
  option: Md2Option;
}

@Component({
  selector: 'md2-option',
  template: '<ng-content></ng-content>',
  host: {
    'role': 'option',
    '(click)': 'onClick($event)'
  }
})
export class Md2Option {
  @HostBinding('class.md2-option-focused') focused: boolean = false;

  @HostBinding('class.md2-option-disabled') @Input() disabled: boolean = false;

  private _value: any = null;
  private _selected: boolean = false;
  public content: any = null;

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
  template: 'select:<ng-content></ng-content>',
  styles: [''],
  host: {
    'role': 'select'
  }
})
export class Md2Select {
  /** @internal */
  @ContentChildren(Md2Option) options: QueryList<Md2Option>;

  private _isInitialized: boolean = false;

  private _selectedIndex: number = 0;
  @Input()
  set selectedIndex(value: number) {
    this._selectedIndex = value;

    if (this._isInitialized) {
      this._onSelectChange.emit(this._createChangeEvent(value));
    }
  }
  get selectedIndex(): number {
    return this._selectedIndex;
  }

  private _onFocusChange: EventEmitter<Md2OptionChangeEvent> = new EventEmitter<Md2OptionChangeEvent>();
  @Output('focusChange') get focusChange(): Observable<Md2OptionChangeEvent> {
    return this._onFocusChange.asObservable();
  }

  private _onSelectChange: EventEmitter<Md2OptionChangeEvent> = new EventEmitter<Md2OptionChangeEvent>();
  @Output('selectChange') get selectChange(): Observable<Md2OptionChangeEvent> {
    return this._onSelectChange.asObservable();
  }

  ngAfterViewChecked(): void {
    this._zone.runOutsideAngular(() => {
      window.requestAnimationFrame(() => {
      });
    });
    this._isInitialized = true;
  }

  //this._onFocusChange.emit(this._createChangeEvent(value));

  private _createChangeEvent(index: number): Md2OptionChangeEvent {
    const event = new Md2OptionChangeEvent;
    event.index = index;
    if (this.options && this.options.length) {
      event.option = this.options.toArray()[index];
    }
    return event;
  }

  /**
   * Returns a unique id for each option label element
   * @internal
   */
}

export const SELECT_DIRECTIVES = [Md2Select, Md2Option];