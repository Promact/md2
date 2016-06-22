//import {Component, ViewEncapsulation, Attribute, OnChanges, OnInit, Output, Input, OnDestroy, Injectable, EventEmitter} from "@angular/core";

//@Injectable()
//export class Md2MultiselectDispatcher {
//  public listeners_: Function[] = [];
//  notify(name: string) {
//    this.listeners_.forEach(listener => listener(name));
//  }
//  listen(listener) {
//    this.listeners_.push(listener);
//  }
//}


//var _uniqueIdCounter: number = 0;

//@Component({
//  selector: 'md2-select',
//  inputs: ['disabled', 'value'],
//  host: {
//    'role': 'select',
//    '[attr.aria-disabled]': 'disabled',
//    '[attr.aria-activedescendant]': 'activedescendant',
//    '(keydown)': 'onKeydown($event)',
//    '[tabindex]': 'tabindex',
//  },
//  template: `<ng-content></ng-content>`,
//  encapsulation: ViewEncapsulation.None
//})
//export class Md2Select implements OnChanges {

//  @Output('valueChange')
//  change: EventEmitter<any> = new EventEmitter(false);

//  /** The selected value for the option group. The value comes from the options. */
//  @Input('value')
//  value_: any;

//  get value(): any {
//    return this.value_;
//  }

//  set value(value: any) {
//    this.value_ = value;
//    this._setChildValue(value);
//  }

//  /** The HTML name attribute applied to option buttons in this group. */
//  name_: string = `md2-select-${_uniqueIdCounter++}`;

//  /** Dispatcher for coordinating option unique-selection by name. */
//  selectDispatcher: Md2MultiselectDispatcher;

//  /** Array of child option buttons. */
//  options_: Md2Option[] = [];

//  activedescendant: any;

//  disabled_: boolean = false;

//  /** The ID of the selected option button. */
//  selectedOptionId: string = '';


//  tabindex: number;

//  constructor( @Attribute('tabindex') tabindex: number,
//    @Attribute('disabled') disabled: boolean,
//    selectDispatcher: Md2MultiselectDispatcher) {
//    this.selectDispatcher = selectDispatcher;

//    // The simple presence of the `disabled` attribute dictates disabled state.
//    this.disabled = disabled;

//    // If the user has not set a tabindex, default to zero (in the normal document flow).
//    this.tabindex = tabindex;
//  }

//  /** Gets the name of this group, as to be applied in the HTML 'name' attribute. */
//  getName(): string {
//    return this.name_;
//  }

//  get disabled() {
//    return this.disabled_;
//  }

//  set disabled(value) {
//    this.disabled_ = value && value !== false;
//  }

//  /** Change handler invoked when bindings are resolved or when bindings have changed. */
//  ngOnChanges(_) {
//    // If the component has a disabled attribute with no value, it will set disabled = ''.
//    this.disabled = this.disabled && this.disabled !== false;

//    // If the value of this option-group has been set or changed, we have to look through the
//    // child option buttons and select the one that has a corresponding value (if any).
//    if (this.value && this.value !== '') {
//      this.selectDispatcher.notify(this.name_);
//      this._setChildValue(this.value);
//    }
//  }

//  private _setChildValue(value: any) {
//    let button = this.getChildByValue(value);
//    if (button) {
//      this.selectedOptionId = button.id;
//      this.activedescendant = button.id;
//      button.checked = true;
//    }
//  }

//  /** Update the value of this option group from a child md-option being selected. */
//  updateValue(value: any, id: string) {
//    this.value = value;
//    this.selectedOptionId = id;
//    this.activedescendant = id;
//    //ObservableWrapper.callEmit(this.change, value);
//  }

//  /** Registers a child option button with this group. */
//  register(option: Md2Option) {
//    this.options_.push(option);
//  }

//  /** Unregister a child option button with this group. */
//  unregister(option: Md2Option) {
//    this.options_ = this.options_.filter(r => r.id !== option.id);
//  }

//  /** Handles up and down arrow key presses to change the selected child option. */
//  onKeydown(event: KeyboardEvent) {
//    if (this.disabled) {
//      return;
//    }

//    switch (event.keyCode) {
//      case 38://KeyCodes.UP:
//        this.stepSelectedOption(-1);
//        event.preventDefault();
//        break;
//      case 40://KeyCodes.DOWN:
//        this.stepSelectedOption(1);
//        event.preventDefault();
//        break;
//    }
//  }

//  // TODO(jelbourn): Replace this with a findIndex method in the collections facade.
//  getSelectedOptionIndex(): number {
//    for (let i = 0; i < this.options_.length; i++) {
//      if (this.options_[i].id === this.selectedOptionId) {
//        return i;
//      }
//    }

//    return -1;
//  }

//  /**
//   * Return a child option by its value.
//   */
//  getChildByValue(value: any): Md2Option {
//    for (let i = 0; i < this.options_.length; i++) {
//      if (this.options_[i].value === value) {
//        return this.options_[i];
//      }
//    }
//    return null;
//  }

//  /** Steps the selected option based on the given step value (usually either +1 or -1). */
//  stepSelectedOption(step) {
//    let index = this.getSelectedOptionIndex() + step;
//    if (index < 0 || index >= this.options_.length) {
//      return;
//    }

//    let option = this.options_[index];

//    // If the next option is line is disabled, skip it (maintaining direction).
//    if (option.disabled) {
//      this.stepSelectedOption(step + (step < 0 ? -1 : 1));
//      return;
//    }

//    this.updateValue(option.value, option.id);
//    option.checked = true;
//  }
//}


//@Component({
//  selector: 'md2-option',
//  inputs: ['id', 'name', 'value', 'checked', 'disabled'],
//  host: {
//    'role': 'option',
//    '[id]': 'id',
//    '[attr.aria-checked]': 'checked',
//    '[attr.disabled]': 'disabled ? "" : undefined',
//    '[attr.aria-disabled]': 'disabled',
//    '(keydown)': 'onKeydown($event)',
//    '(click)': 'select($event)'
//  },
//  template: `
//    <label role="option" class="md-option-root" [class.md-option-checked]="checked">
//      <div class="md-option-container">
//        <div class="md-option-off"></div>
//        <div class="md-option-on"></div>
//      </div>
//      <div class="md-option-label">
//        <ng-content></ng-content>
//      </div>
//    </label>`,
//  directives: [],
//  encapsulation: ViewEncapsulation.None
//})
//export class Md2Option implements OnInit, OnDestroy {
//  /** Whether this option is checked. */
//  checked: boolean;

//  /** Whether the option is disabled. */
//  disabled_: boolean;

//  /** The unique ID for the option button. */
//  id: string;

//  /** Analog to HTML 'name' attribute used to group options for unique selection. */
//  name: string;

//  /** Value assigned to this option. Used to assign the value to the parent Md2Select. */
//  value: any;

//  /** The parent option group. May or may not be present. */
//  optionGroup: Md2Select;

//  /** Dispatcher for coordinating option unique-selection by name. */
//  selectDispatcher: Md2MultiselectDispatcher;


//  constructor(optionGroup: Md2Select,
//    @Attribute('id') id: string,
//    @Attribute('value') value: string,
//    @Attribute('checked') checked: string,
//    selectDispatcher: Md2MultiselectDispatcher) {
//    // Assertions. Ideally these should be stripped out by the compiler.
//    // TODO(jelbourn): Assert that there's no name binding AND a parent option group.

//    this.optionGroup = optionGroup;
//    this.selectDispatcher = selectDispatcher;
//    this.value = value ? value : null;
//    this.checked = checked ? true : false;

//    this.id = id ? id : `md-option-${_uniqueIdCounter++}`;

//    // Whenever a option button with the same name is checked, uncheck this option button.
//    selectDispatcher.listen((name) => {
//      if (name === this.name) {
//        this.checked = false;
//      }
//    });

//    // When this option-button is inside of a option-group, the group determines the name.
//    if (optionGroup) {
//      this.name = optionGroup.getName();
//      this.optionGroup.register(this);
//      if (this.checked) {
//        this.optionGroup.updateValue(this.value, this.id);
//      }
//    }
//  }

//  /** Change handler invoked when bindings are resolved or when bindings have changed. */
//  ngOnInit() {
//    if (this.optionGroup) {
//      this.name = this.optionGroup.getName();
//    }
//  }

//  ngOnDestroy(): any {
//    if (this.optionGroup) {
//      this.optionGroup.unregister(this);
//    }
//  }


//  /** Whether this option button is disabled, taking the parent group into account. */
//  isDisabled(): boolean {
//    // Here, this.disabled may be true/false as the result of a binding, may be the empty string
//    // if the user just adds a `disabled` attribute with no value, or may be absent completely.
//    // TODO(jelbourn): If someone sets `disabled="disabled"`, will this work in dart?
//    return this.disabled || (this.disabled) ||
//      (this.optionGroup && this.optionGroup.disabled);
//  }

//  get disabled(): any {
//    // True if self or parent group are disabled.
//    return this.disabled_ || (this.optionGroup && this.optionGroup.disabled);
//  }

//  set disabled(value: any) {
//    this.disabled_ = value && value !== false;
//  }

//  /** Select this option button. */
//  select(event: Event) {
//    if (this.isDisabled()) {
//      event.stopPropagation();
//      return;
//    }

//    // Notifiy all option buttons with the same name to un-check.
//    this.selectDispatcher.notify(this.name);

//    this.checked = true;

//    if (this.optionGroup) {
//      this.optionGroup.updateValue(this.value, this.id);
//    }
//  }

//  /** Handles pressing the space key to select this focused option button. */
//  onKeydown(event: KeyboardEvent) {
//    if (event.keyCode === 36) {//KeyCodes.SPACE
//      event.preventDefault();
//      this.select(event);
//    }
//  }
//}


//export const MULTISELECT_DIRECTIVES = [Md2Select, Md2Option];