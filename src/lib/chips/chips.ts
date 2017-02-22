import {
  Component,
  Input,
  forwardRef,
  Output,
  ViewChild,
  NgModule,
  ElementRef,
  ModuleWithProviders,
  EventEmitter,
  AfterContentInit,
  HostListener,
  ViewEncapsulation
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgForm,
  FormsModule
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Md2AutocompleteModule } from '../autocomplete/autocomplete';
import { KeyCodes } from '../core/core';

const noop = () => { };

export class Chip {
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

let nextId = 0;
export const MD2_CHIPS_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Md2Chips),
  multi: true
};

@Component({
  selector: 'md2-chips',
  templateUrl: 'chips.html',
  styleUrls: ['chips.css'],
  providers: [MD2_CHIPS_CONTROL_VALUE_ACCESSOR],

  host: {
    'role': 'chips',
    '[id]': 'id',
    '[tabindex]': 'readonly ? -1 : tabindex',
    '[class.chip-input-focus]': 'inputFocused || selectedChip >= 0',
  },
  encapsulation: ViewEncapsulation.None
})

export class Md2Chips implements ControlValueAccessor, AfterContentInit {
  @Input() tabindex: number = 0;
  @Input() addOnComma: boolean = true;
  @Input() addOnEnter: boolean = true;
  @Input() addOnPaste: boolean = true;
  @Input() addOnSpace: boolean = false;
  @Input() allowedPattern: RegExp = /.+/;
  @Input() ngModel: string[];
  @Input() pasteSplitPattern: string = ',';
  @Input() placeholder: string = 'Add New';
  @Input() autocompleteDataList: string[];
  @Input() isAutoComplete: boolean = false;
  @Input() isRemovable: boolean = true;
  @Input() readonly: boolean = false;
  @Input() minChips: number = 0;
  @Input() maxChips: number = 10000;
  @Input() id: string = 'md2-chips-' + (++nextId);
  @Input('autocomplete-item-text') autocompleteItemText: string = 'text';
  @Input('item-text') textKey: string = 'text';
  @Input('item-value') valueKey: string = null;

  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('chipInputForm') chipInputForm: NgForm;

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  chipItemList: Array<Chip> = [];
  public inputValue: string = '';
  private _value: any = '';
  public selectedChip: number = -1;
  private splitRegExp: RegExp;
  private templateHtmlString: any;
  private item: any;
  inputFocused: boolean = false;
  private isEmptyAutoComplete: boolean = true;
  private isObject: boolean;

  constructor(private elementRef: ElementRef) { }

  get element() {
    const elements: any = { root: this.elementRef.nativeElement, mainDiv: null, template: null };
    elements.mainDiv = elements.root.querySelector('.md2-chips-container');
    elements.template = elements.mainDiv.querySelector('.md2-template');
    return elements;
  }
  @Input()
  get value(): any { return this._value; }
  set value(value: any) { this.setValue(value); }


  /**
   * set value
   * @param value
   */
  set setValue(value: any) {
    if (value !== this._value) {
      this._value = value;
      this.chipItemList = [];
      if (value) {
        if (value && value.length && typeof value[0] === 'object' && Array.isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            this.chipItemList.push(new Chip(value[i], this.textKey, this.valueKey));
          }
          this.isObject = true;
        } else if (value && value.length && typeof value[0] === 'string' && Array.isArray(value)) {
          this.chipItemList = value;
          this.isObject = false;
        }
      }
    }
    this.onChangeCallback(value);
    this.change.emit(this.chipItemList);
  }

  changeAutocomplete(value: any) {
    if (value) {
      let objText = value[this.autocompleteItemText];
      this.addNewChip(objText);
      this.item = null;
    }
  }

  ngAfterContentInit() {
    let elements = this.element;
    this.splitRegExp = new RegExp(this.pasteSplitPattern);
    if (elements.template) {
      this.templateHtmlString = elements.template.innerHTML;
    }
  }

  // check autocomplete input is empty or not
  valueupdate(evt: Event) {
    this.isEmptyAutoComplete = evt ? false : true;
  }

  /**
   * input key listener
   * @param event
   */
  inputChanged(event: KeyboardEvent): void {
    let key = event.keyCode;
    switch (key) {
      // back space
      case KeyCodes.BACKSPACE:
        this.backspaceEvent();
        break;
      // delete
      case KeyCodes.DELETE:
        this.backspaceEvent();
        break;
      // left arrow
      case KeyCodes.LEFT_ARROW:
        if (this.isAutoComplete && this.isEmptyAutoComplete) {
          this.leftArrowKeyEvents();
        } else if (!this.isAutoComplete && !this.inputValue) {
          this.leftArrowKeyEvents();
        }
        break;
      // right arrow
      case KeyCodes.RIGHT_ARROW:
        if (this.isAutoComplete && this.isEmptyAutoComplete) {
          this.rightArrowKeyEvents();
        } else if (!this.isAutoComplete && !this.inputValue) {
          this.rightArrowKeyEvents();
        }
        break;
      // enter
      case KeyCodes.ENTER:
        if (this.addOnEnter) {
          this.addNewChip(this.inputValue);
          event.preventDefault();
        }
        break;
      // comma
      case KeyCodes.COMMA:
        if (this.addOnComma) {
          this.addNewChip(this.inputValue);
          event.preventDefault();
        }
        break;
      // space
      case KeyCodes.SPACE:
        if (this.addOnSpace) {
          this.addNewChip(this.inputValue);
          event.preventDefault();
        }
        break;

      default:
        break;
    }
  }

  @HostListener('focus')
  _handleFocus() {
    if (this.readonly) { return; }
    if (!this.isAutoComplete) {
      this.elementRef.nativeElement.querySelector('input.chip-input').focus();
    }
    this._resetSelected();
  }
  inputBlurred(event: Event): void {
      this.inputFocused = false;     
      this.addNewChip(this.inputValue);
  }

  inputFocus(event: Event): void {
    if (this.readonly) { return; }
    this.inputFocused = true;
  }

  inputPaste(event: any): void {
    let clipboardData = event.clipboardData ||
      (event.originalEvent && event.originalEvent.clipboardData);
    let pastedString = clipboardData.getData('text/plain');
    let chips = this.addRegExpString(pastedString);
    let chipsToAdd = chips.filter((chip) => this._isValid(chip));
    this.addNewChip(chipsToAdd);
    setTimeout(() => this._resetInput());
  }

  leftArrowKeyEvents() {
    event.preventDefault();
    if (this.selectedChip) {
      if (this.selectedChip < 0) {
        this.selectedChip = this.chipItemList.length - 1;
      } else {
        this.selectedChip = this.selectedChip - 1;
      }
    }
  }
  rightArrowKeyEvents() {
    event.preventDefault();
    if (this.selectedChip != -1) {
      if (this.selectedChip >= this.chipItemList.length) {
        this.selectedChip = 0;
      } else {
        this.selectedChip = this.selectedChip + 1;
      }
    }
  }

  private addRegExpString(chipInputString: string): string[] {
    chipInputString = chipInputString.trim();
    let chips = chipInputString.split(this.splitRegExp);
    return chips.filter((chip) => !!chip);
  }

  private _isValid(chipString: any): boolean {
    if (chipString) {
      let isExist: any;
      if (this.isObject) {
        isExist = this.chipItemList.filter((chip) => chip.text === chipString);
        return isExist.length ? false : true;
      } else if (this.chipItemList.indexOf(chipString) === -1) {
        return this.allowedPattern.test(chipString);
      }
    }
  }
  /**
  * add new chip
  * @param chips
  */
  private addNewChip(chips: any): void {
    let validInput = this._isValid(chips);
    if (validInput) {
      if (this.maxChips) {
        if (this.chipItemList.length < this.maxChips) {
          if (this.isObject && this.chipItemList.length > 0) {
            let a: any = {};
            a[this.textKey] = chips;
            this.chipItemList.push(new Chip(a, this.textKey, this.valueKey));
          } else {
            this.chipItemList.push(chips);
          }
        }
      } else {
        this.chipItemList.push(new Chip(chips, this.textKey, this.valueKey));
        this.item = null;
      }
    }
    this._resetSelected();
    this._resetInput();
    this.updateValue();
  }

  /**
 * remove selected chip
 * @param chipIndexToRemove index of selected chip
 */
  private removeSelectedChip(chipIndexToRemove: number): void {
    this.chipItemList.splice(chipIndexToRemove, 1);
    this._resetSelected();
    this.updateValue();
  }

  private backspaceEvent(): void {
    if (!this.inputValue.length && this.chipItemList.length &&
      this.isRemovable && this.isEmptyAutoComplete) {
      if (this.selectedChip != -1) {
        this.removeSelectedChip(this.selectedChip);
        this.selectedChip = this.chipItemList.length - 1;
      } else {
        this.selectedChip = this.chipItemList.length - 1;
      }
    }
  }

  private _resetSelected(): void {
    this.selectedChip = -1;
  }

  private _resetInput(): void {
    if (this.isAutoComplete) {
      this.chipInputForm.controls['autocomplete'].setValue('');
    } else {
      this.chipInputForm.controls['chipInput'].setValue('');
    }
  }
  /**
   * update value
   */
  private updateValue() {
    this._value = new Array<any>();
    for (let i = 0; i < this.chipItemList.length; i++) {
      if (this.isObject) {
        this._value.push(this.chipItemList[i].value);
      } else {
        this._value.push(this.chipItemList[i]);
      }
    }
    this.onChangeCallback(this._value);
    this.change.emit(this._value);
  }

  writeValue(value: any): void {
    if (value !== this._value) {
      this._value = value;
      this.chipItemList = [];
      if (value) {
        if (value && value.length && typeof value[0] === 'object' && Array.isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            this.chipItemList.push(new Chip(value[i], this.textKey, this.valueKey));
          }
          this.isObject = true;
        } else if (value && value.length && typeof value[0] === 'string' && Array.isArray(value)) {
          this.chipItemList = value;
          this.isObject = false;
        }
      }
    }
  }
  registerOnChange(fn: any) { this.onChangeCallback = fn; }
  registerOnTouched(fn: any) { this.onTouchedCallback = fn; }
}

export const MD2_CHIPS_DIRECTIVES: any[] = [Md2Chips];

@NgModule({
  imports: [CommonModule, FormsModule, Md2AutocompleteModule],
  declarations: MD2_CHIPS_DIRECTIVES,
  exports: MD2_CHIPS_DIRECTIVES
})
export class Md2ChipsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: Md2ChipsModule,
      providers: []
    };
  }
}
