import { Subject } from 'rxjs/Subject';
/**
 * Class to be used to power selecting one or more options from a list.
 * @docs-private
 */
export declare class SelectionModel<T> {
    private _isMulti;
    /** Currently-selected values. */
    private _selection;
    /** Keeps track of the deselected options that haven't been emitted by the change event. */
    private _deselectedToEmit;
    /** Keeps track of the selected option that haven't been emitted by the change event. */
    private _selectedToEmit;
    /** Cache for the array value of the selected items. */
    private _selected;
    /** Selected value(s). */
    readonly selected: T[];
    /** Event emitted when the value has changed. */
    onChange: Subject<SelectionChange<T>>;
    constructor(_isMulti?: boolean, initiallySelectedValues?: T[]);
    /**
     * Selects a value or an array of values.
     */
    select(value: T): void;
    /**
     * Deselects a value or an array of values.
     */
    deselect(value: T): void;
    /**
     * Clears all of the selected values.
     */
    clear(): void;
    /**
     * Determines whether a value is selected.
     */
    isSelected(value: T): boolean;
    /**
     * Determines whether the model has a value.
     */
    isEmpty(): boolean;
    /** Emits a change event and clears the records of selected and deselected values. */
    private _emitChangeEvent();
    /** Selects a value. */
    private _markSelected(value);
    /** Deselects a value. */
    private _unmarkSelected(value);
    /** Clears out the selected values. */
    private _unmarkAll();
}
/**
 * Describes an event emitted when the value of a MdSelectionModel has changed.
 * @docs-private
 */
export declare class SelectionChange<T> {
    added: T[];
    removed: T[];
    constructor(added?: T[], removed?: T[]);
}
