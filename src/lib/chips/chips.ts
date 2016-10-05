import {
  Component,
  HostBinding,
  Input,
  forwardRef,
  OnInit,
  ViewChild,
  NgModule,
  ElementRef,
  ViewContainerRef,
  ModuleWithProviders
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgForm,
  FormsModule
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { isBlank } from '@angular/common/src/facade/lang';
import { KeyCodes } from '../core/core';

export const MD2_CHIPS_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Md2Chips),
  multi: true
};

@Component({
  selector: 'md2-chips',
  template:
  `<div class="chip-div">
        <span *ngFor="let chip of chipItemList; let i = index" class="md2-chip" [class.chip-input-selected]="selectedChip === i">
            <span>{{chip}}</span>
            <span [innerHTML]="theHtmlString"></span>
            <span class="chip-remove" (click)="removeSelectedChip(i)" *ngIf="isRemovable || !readonly">&times;</span>
        </span>
        <ng-content select=".md2-template"></ng-content>      
        <form #chipInputForm="ngForm" class="chip-input-form" *ngIf="!readonly">
            <input class="chip-input" type="text" [(ngModel)]="inputValue" name="chipInput" [placeholder]="placeholder" (paste)="inputPaste($event)" (keydown)="inputChanged($event)" (blur)="inputBlurred($event)" (focus)="inputFocused()"/>
            <ng-content select=".auto-complete"></ng-content>
        </form>
    </div>
    <div class="chip-error" *ngIf="this.chipItemList.length<this.minChips">Minimum {{minChips}} chip required.</div>
    <div class="chip-error" *ngIf="this.chipItemList.length>=this.maxChips">You are able to add Maximum {{maxChips}} chip.</div>
`,
  styles: [`
    .template-content{display:inline;}
    :host{outline:none;}
    :host .chip-div{display: block;box-shadow: 0 1px #ccc;padding: 5px 0;margin-bottom:10px;}
    :host.chip-input-focus .chip-div{box-shadow: 0 2px #0d8bff;}
    :host.md2-chip-disabled{pointer-events: none;cursor: default;}
    .md2-template{display:none;}
    .chip-input-disabled{pointer-events: none;cursor: default;}
    .md2-chip{display: inline-block;background: #e0e0e0;padding: 6px;margin: 8px 8px 0 0;border-radius: 90px;line-height: 22px;height: 32px;box-sizing: border-box;font-size: 16px;}
    .chip-input-selected {color: white;background: #0d8bff;}    
    .chip-input-form {display: inline-block;height:32px;margin: 8px 8px 0 0;}
    .chip-remove {cursor: pointer;display: inline-block;padding: 0 3px;color: #616161;font-size: 30px;vertical-align: top;line-height: 21px;font-family: serif;}
    .chip-input {display: inline-block;width: auto;box-shadow: one;border: 0;outline:none;height: 32px;line-height: 32px;font-size: 16px;}
    .chip-error{font-size:13px;color:#fd0f0f;}
  `],
  providers: [MD2_CHIPS_CONTROL_VALUE_ACCESSOR],
  host: {
    'role': 'chips',
    '[id]': 'id',
    '[tabindex]': 'readonly ? -1 : tabindex',
    '[class.md2-chip-disabled]': 'readonly',
  },
})

export class Md2Chips implements ControlValueAccessor, OnInit {
  @Input() addOnBlur: boolean = true;
  @Input() addOnComma: boolean = true;
  @Input() addOnEnter: boolean = true;
  @Input() addOnPaste: boolean = true;
  @Input() addOnSpace: boolean = false;
  @Input() allowedPattern: RegExp = /.+/;
  @Input() ngModel: string[];
  @Input() pasteSplitPattern: string = ',';
  @Input() placeholder: string = 'Add New';
  @HostBinding('class.chip-input-focus') isFocused: boolean;
  @ViewChild('chipInputForm') chipInputForm: NgForm;
  @Input() isRemovable: boolean = true;
  @Input() readonly: boolean = false;
  @Input() minChips: number;
  @Input() maxChips: number;

  public chipItemList: string[] = [];
  public inputValue: string = '';
  public selectedChip: number;
  private splitRegExp: RegExp;
  private theHtmlString: any;

  constructor(private elementRef: ElementRef) { }
  get element() {
    const elements: any = { root: this.elementRef.nativeElement, mainDiv: null, template: null };
    elements.mainDiv = elements.root.querySelector('.chip-div');
    elements.template = elements.mainDiv.querySelector('.md2-template');
    return elements;
  }

  ngOnInit() {
    let elements = this.element;
    if (this.ngModel) { this.chipItemList = this.ngModel; }
    this.onChange(this.chipItemList);
    this.splitRegExp = new RegExp(this.pasteSplitPattern);
    this.theHtmlString = elements.template.innerHTML;
  }

  inputChanged(event: KeyboardEvent): void {
    let key = event.keyCode;
    switch (key) {

      case KeyCodes.BACKSPACE:
        this.backspaceEvent();
        break;

      case KeyCodes.DELETE:
        this.backspaceEvent();
        break;

      case KeyCodes.ENTER:
        if (this.addOnEnter) {
          this.addNewChip([this.inputValue]);
          event.preventDefault();
        }
        break;

      case KeyCodes.COMMA:
        if (this.addOnComma) {
          this.addNewChip([this.inputValue]);
          event.preventDefault();
        }
        break;

      case KeyCodes.SPACE:
        if (this.addOnSpace) {
          this.addNewChip([this.inputValue]);
          event.preventDefault();
        }
        break;

      default:
        break;
    }
  }

  inputBlurred(event: Event): void {
    if (this.addOnBlur) { this.addNewChip([this.inputValue]); }
    this.isFocused = false;
  }

  inputFocused(event: Event): void {
    this.isFocused = true;
  }

  inputPaste(event: any): void {
    let clipboardData = event.clipboardData || (event.originalEvent && event.originalEvent.clipboardData);
    let pastedString = clipboardData.getData('text/plain');
    let chips = this.addRegExpString(pastedString);
    let chipsToAdd = chips.filter((chip) => this._isValid(chip));
    this.addNewChip(chipsToAdd);
    setTimeout(() => this._resetInput());
  }

  private addRegExpString(chipInputString: string): string[] {
    chipInputString = chipInputString.trim();
    let chips = chipInputString.split(this.splitRegExp);
    return chips.filter((chip) => !!chip);
  }

  private _isValid(chipString: string): boolean {
    if (this.chipItemList.indexOf(chipString) === -1)
      return this.allowedPattern.test(chipString);
  }

  private addNewChip(chips: string[]): void {
    let validInput = chips.filter((chip) => this._isValid(chip));
    if (this.maxChips) {
      if (this.chipItemList.length < this.maxChips) {
        this.chipItemList = this.chipItemList.concat(validInput.map(chip => chip.trim()));
      }
    }
    else {
      this.chipItemList = this.chipItemList.concat(validInput.map(chip => chip.trim()));
    }
    this._resetSelected();
    this._resetInput();
    this.onChange(this.chipItemList);
  }

  private removeSelectedChip(chipIndexToRemove: number): void {
    this.chipItemList.splice(chipIndexToRemove, 1);
    this._resetSelected();
    this.onChange(this.chipItemList);
  }

  private backspaceEvent(): void {
    if (!this.inputValue.length && this.chipItemList.length && this.isRemovable) {
      if (this.selectedChip || this.chipItemList.length == 1) {
        this.removeSelectedChip(this.selectedChip);
      } else {
        this.selectedChip = this.chipItemList.length - 1;
      }
    }
  }

  private _resetSelected(): void {
    this.selectedChip = null;
  }

  private _resetInput(): void {
    this.chipInputForm.controls['chipInput'].setValue('');
  }

  onChange: (value: any) => any = () => { };
  onTouched: () => any = () => { };
  writeValue(value: any) { }
  registerOnChange(fn: any) { this.onChange = fn; }
  registerOnTouched(fn: any) { this.onTouched = fn; }
}

export const MD2_CHIPS_DIRECTIVES: any[] = [Md2Chips];

@NgModule({
  imports: [CommonModule, FormsModule],
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