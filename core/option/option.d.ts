import { ElementRef, EventEmitter, ModuleWithProviders, Renderer } from '@angular/core';
/** Event object emitted by MdOption when selected or deselected. */
export declare class MdOptionSelectionChange {
    source: MdOption;
    isUserInput: boolean;
    constructor(source: MdOption, isUserInput?: boolean);
}
/**
 * Single option inside of a `<md-select>` element.
 */
export declare class MdOption {
    private _element;
    private _renderer;
    _isCompatibilityMode: boolean;
    private _selected;
    private _active;
    /** Whether the option is disabled.  */
    private _disabled;
    private _id;
    /** Whether the wrapping component is in multiple selection mode. */
    multiple: boolean;
    /** The unique ID of the option. */
    readonly id: string;
    /** Whether or not the option is currently selected. */
    readonly selected: boolean;
    /** The form value of the option. */
    value: any;
    /** Whether the option is disabled. */
    disabled: any;
    /** Event emitted when the option is selected or deselected. */
    onSelectionChange: EventEmitter<MdOptionSelectionChange>;
    constructor(_element: ElementRef, _renderer: Renderer, _isCompatibilityMode: boolean);
    /**
     * Whether or not the option is currently active and ready to be selected.
     * An active option displays styles as if it is focused, but the
     * focus is actually retained somewhere else. This comes in handy
     * for components like autocomplete where focus must remain on the input.
     */
    readonly active: boolean;
    /**
     * The displayed value of the option. It is necessary to show the selected option in the
     * select's trigger.
     */
    readonly viewValue: string;
    /** Selects the option. */
    select(): void;
    /** Deselects the option. */
    deselect(): void;
    /** Sets focus onto this option. */
    focus(): void;
    /**
     * This method sets display styles on the option to make it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    setActiveStyles(): void;
    /**
     * This method removes display styles on the option that made it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    setInactiveStyles(): void;
    /** Ensures the option is selected when activated from the keyboard. */
    _handleKeydown(event: KeyboardEvent): void;
    /**
     * Selects the option while indicating the selection came from the user. Used to
     * determine if the select's view -> model callback should be invoked.
     */
    _selectViaInteraction(): void;
    /** Returns the correct tabindex for the option depending on disabled state. */
    _getTabIndex(): string;
    /** Fetches the host DOM element. */
    _getHostElement(): HTMLElement;
    /** Emits the selection change event. */
    private _emitSelectionChangeEvent(isUserInput?);
}
export declare class MdOptionModule {
    static forRoot(): ModuleWithProviders;
}
