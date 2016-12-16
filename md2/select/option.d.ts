import { ElementRef, EventEmitter, Renderer } from '@angular/core';
export declare class Md2Option {
    private _element;
    private _renderer;
    private _selected;
    /** Whether the option is disabled.  */
    private _disabled;
    private _id;
    /** The unique ID of the option. */
    readonly id: string;
    /** The form value of the option. */
    value: any;
    disabled: any;
    /** Event emitted when the option is selected. */
    onSelect: EventEmitter<{}>;
    constructor(_element: ElementRef, _renderer: Renderer);
    /** Whether or not the option is currently selected. */
    readonly selected: boolean;
    /**
     * The displayed value of the option. It is necessary to show the selected option in the
     * select's trigger.
     * TODO(kara): Add input property alternative for node envs.
     */
    readonly viewValue: string;
    /** Selects the option. */
    select(): void;
    /** Deselects the option. */
    deselect(): void;
    /** Sets focus onto this option. */
    focus(): void;
    /** Ensures the option is selected when activated from the keyboard. */
    _handleKeydown(event: KeyboardEvent): void;
    /**
     * Selects the option while indicating the selection came from the user. Used to
     * determine if the select's view -> model callback should be invoked.
     */
    _selectViaInteraction(): void;
    /** Returns the correct tabindex for the option depending on disabled state. */
    _getTabIndex(): string;
    _getHostElement(): HTMLElement;
}
