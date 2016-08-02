import { AfterContentInit, ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, Output, Provider, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

let nextId = 0;

const MD2_SWITCH_CONTROL_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, {
  useExisting: forwardRef(() => Md2Switch),
  multi: true
});

@Component({
  selector: 'md2-switch',
  template: `
    <div class="md2-switch-layout">
      <div class="md2-switch-container">
        <div class="md2-switch-bar"></div>
        <div class="md2-switch-thumb-container">
          <div class="md2-switch-thumb"></div>
        </div>
      </div>
      <label [id]="labelId">
        <ng-content></ng-content>
      </label>
    </div>
  `,
  styles: [`
    .md2-switch-layout { margin: 16px; margin-left: inherit; white-space: nowrap; cursor: pointer; outline: 0; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; min-height: 30px; line-height: 28px; -webkit-align-items: center; -ms-flex-align: center; align-items: center; display: -webkit-flex; display: -ms-flexbox; display: flex; }
    .md2-switch-layout label { border-color: transparent; border-width: 0; cursor: pointer; float: left; -ms-word-wrap: break-word; word-wrap: break-word; max-width: 100%; white-space: normal; line-height: normal; }
    .md2-switch:focus { outline: none; }
    .md2-switch .md2-switch-container { display: inline-block; cursor: pointer; width: 36px; min-width: 36px; height: 24px; position: relative; -moz-user-select: none; -ms-user-select: none; -webkit-user-select: none; user-select: none; margin-right: 8px; }
    .md2-switch .md2-switch-bar { left: 1px; width: 34px; top: 5px; height: 14px; border-radius: 8px; position: absolute; background-color: #9e9e9e; }
    .md2-switch .md2-switch-thumb-container { top: 2px; left: 0; width: 16px; position: absolute; -moz-transform: translate3d(0, 0, 0); -ms-transform: translate3d(0, 0, 0); -o-transform: translate3d(0, 0, 0); -webkit-transform: translate3d(0, 0, 0); transform: translate3d(0, 0, 0); z-index: 1; }
    .md2-switch .md2-switch-thumb { position: absolute; margin: 0; left: 0; top: 0; outline: none; height: 20px; width: 20px; border-radius: 50%; box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26); background-color: #fafafa; }
    .md2-switch.md2-switch-checked .md2-switch-bar { background-color: rgba(33, 150, 243, 0.5); }
    .md2-switch.md2-switch-checked .md2-switch-thumb-container { -moz-transform: translate3d(100%, 0, 0); -ms-transform: translate3d(100%, 0, 0); -o-transform: translate3d(100%, 0, 0); -webkit-transform: translate3d(100%, 0, 0); transform: translate3d(100%, 0, 0); }
    .md2-switch.md2-switch-checked .md2-switch-thumb { background-color: #2196f3; }
    .md2-switch.md2-switch-disabled .md2-switch-layout, .md2-switch.md2-switch-disabled label, .md2-switch.md2-switch-disabled .md2-switch-container { cursor: not-allowed; }
    .md2-switch.md2-switch-disabled .md2-switch-bar { background-color: rgba(0, 0, 0, 0.12); }
    .md2-switch.md2-switch-disabled .md2-switch-thumb { background-color: #bdbdbd; }
    .md2-switch:not(.md2-switch-dragging) .md2-switch-bar { -moz-transition-delay: 0.05s; -o-transition-delay: 0.05s; -webkit-transition-delay: 0.05s; transition-delay: 0.05s; -moz-transition: all 0.08s linear; -o-transition: all 0.08s linear; -webkit-transition: all 0.08s linear; transition: all 0.08s linear; -moz-transition-property: transform, background-color; -o-transition-property: transform, background-color; -webkit-transition-property: transform, background-color; transition-property: transform, background-color; }
    .md2-switch:not(.md2-switch-dragging) .md2-switch-thumb { -moz-transition-delay: 0.05s; -o-transition-delay: 0.05s; -webkit-transition-delay: 0.05s; transition-delay: 0.05s; -moz-transition: all 0.08s linear; -o-transition: all 0.08s linear; -webkit-transition: all 0.08s linear; transition: all 0.08s linear; -moz-transition-property: transform, background-color; -o-transition-property: transform, background-color; -webkit-transition-property: transform, background-color; transition-property: transform, background-color; }
    .md2-switch:not(.md2-switch-dragging) .md2-switch-thumb-container { -moz-transition: all 0.08s linear; -o-transition: all 0.08s linear; -webkit-transition: all 0.08s linear; transition: all 0.08s linear; -moz-transition-property: transform, background-color; -o-transition-property: transform, background-color; -webkit-transition-property: transform, background-color; transition-property: transform, background-color; }
  `],
  host: {
    'role': 'checkbox',
    '[id]': 'id',
    '[class.md2-switch]': 'true',
    '[class.md2-switch-checked]': 'checked',
    '[class.md2-switch-disabled]': 'disabled',
    '[tabindex]': 'disabled ? -1 : tabindex',
    '[attr.aria-label]': 'ariaLabel',
    '[attr.aria-labelledby]': 'labelId',
    '[attr.aria-checked]': 'getAriaChecked()',
    '[attr.aria-disabled]': 'disabled',
    '(click)': 'onInteractionEvent($event)',
    '(keyup.space)': 'onInteractionEvent($event)',
    '(blur)': 'onTouched()'
  },
  providers: [MD2_SWITCH_CONTROL_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Md2Switch implements AfterContentInit, ControlValueAccessor {

  @Input('aria-label') ariaLabel: string = '';

  @Input() id: string = 'md2-switch-' + (++nextId);

  @Input() disabled: boolean = false;

  @Input() tabindex: number = 0;

  @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>();

  onTouched: () => any = () => { };

  private _checked: boolean = false;
  private _isInitialized: boolean = false;
  private _changeSubscription: { unsubscribe: () => any } = null;

  @Input() get checked() { return this._checked; }
  set checked(checked: boolean) {
    if (checked !== this._checked) {
      this._checked = checked;
      if (this._isInitialized) {
        this.change.emit(this._checked);
      }
    }
  }

  ngAfterContentInit() {
    this._isInitialized = true;
  }

  get labelId() { return this.id + '-label'; }

  /**
   * get checked status
   */
  getAriaChecked() { return this.checked ? 'true' : 'false'; }

  /**
   * toggle switch
   */
  toggle() { this.checked = !this.checked; }

  onInteractionEvent(event: Event) {
    if (this.disabled) {
      event.stopPropagation();
      return;
    }
    this.toggle();
  }

  writeValue(value: any) { this.checked = !!value; }

  registerOnChange(fn: any) {
    if (this._changeSubscription) {
      this._changeSubscription.unsubscribe();
    }
    this._changeSubscription = <{ unsubscribe: () => any }>this.change.subscribe(fn);
  }

  registerOnTouched(fn: any) { this.onTouched = fn; }

}