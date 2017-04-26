import { AfterContentInit, ElementRef, EventEmitter, OnDestroy, QueryList, Renderer, ChangeDetectorRef } from '@angular/core';
import { Md2Option, Md2OptionSelectionChange } from './option';
import { FocusKeyManager } from '../core/a11y/focus-key-manager';
import { Dir } from '../core/rtl/dir';
import { Observable } from 'rxjs/Observable';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { ConnectedOverlayDirective } from '../core/overlay/overlay-directives';
import { ViewportRuler } from '../core/overlay/position/viewport-ruler';
import { SelectionModel } from '../core/selection/selection';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/startWith';
/**
 * The following style constants are necessary to save here in order
 * to properly calculate the alignment of the selected option over
 * the trigger element.
 */
/** The fixed height of every option element. */
export declare const SELECT_OPTION_HEIGHT = 48;
/** The max height of the select's overlay panel */
export declare const SELECT_PANEL_MAX_HEIGHT = 256;
/** The max number of options visible at once in the select panel. */
export declare const SELECT_MAX_OPTIONS_DISPLAYED = 5;
/** The fixed height of the select's trigger element. */
export declare const SELECT_TRIGGER_HEIGHT = 30;
/**
 * Must adjust for the difference in height between the option and the trigger,
 * so the text will align on the y axis.
 * (SELECT_OPTION_HEIGHT (48) - SELECT_TRIGGER_HEIGHT (30)) / 2 = 9
 */
export declare const SELECT_OPTION_HEIGHT_ADJUSTMENT = 9;
/** The panel's padding on the x-axis */
export declare const SELECT_PANEL_PADDING_X = 16;
/**
 * Distance between the panel edge and the option text in
 * multi-selection mode.
 *
 * (SELECT_PADDING * 1.75) + 20 = 48
 * The padding is multiplied by 1.75 because the checkbox's margin is half the padding, and
 * the browser adds ~4px, because we're using inline elements.
 * The checkbox width is 20px.
 */
export declare const SELECT_MULTIPLE_PANEL_PADDING_X: number;
/**
 * The panel's padding on the y-axis. This padding indicates there are more
 * options available if you scroll.
 */
export declare const SELECT_PANEL_PADDING_Y = 16;
/**
 * The select panel will only "fit" inside the viewport if it is positioned at
 * this value or more away from the viewport boundary.
 */
export declare const SELECT_PANEL_VIEWPORT_PADDING = 8;
/** Change event object that is emitted when the select value has changed. */
export declare class Md2SelectChange {
    source: Md2Select;
    value: any;
    constructor(source: Md2Select, value: any);
}
/** Allowed values for the floatPlaceholder option. */
export declare type Md2SelectFloatPlaceholderType = 'always' | 'never' | 'auto';
export declare class Md2Select implements AfterContentInit, ControlValueAccessor, OnDestroy {
    private _element;
    private _renderer;
    private _viewportRuler;
    private _changeDetectorRef;
    private _dir;
    _control: NgControl;
    /** Whether or not the overlay panel is open. */
    private _panelOpen;
    /** Subscriptions to option events. */
    private _optionSubscription;
    /** Subscription to changes in the option list. */
    private _changeSubscription;
    /** Subscription to tab events while overlay is focused. */
    private _tabSubscription;
    /** Whether filling out the select is required in the form.  */
    private _required;
    /** Whether the select is disabled.  */
    private _disabled;
    /** The scroll position of the overlay panel, calculated to center the selected option. */
    private _scrollTop;
    /** The placeholder displayed in the trigger of the select. */
    private _placeholder;
    /** Whether the component is in multiple selection mode. */
    private _multiple;
    /** Deals with the selection logic. */
    _selectionModel: SelectionModel<Md2Option>;
    /** The animation state of the placeholder. */
    private _placeholderState;
    /** Tab index for the element. */
    private _tabIndex;
    /**
     * The width of the trigger. Must be saved to set the min width of the overlay panel
     * and the width of the selected value.
     */
    _triggerWidth: number;
    /**
     * The width of the selected option's value. Must be set programmatically
     * to ensure its overflow is clipped, as it's absolutely positioned.
     */
    _selectedValueWidth: number;
    /** Manages keyboard events for options in the panel. */
    _keyManager: FocusKeyManager;
    /** View -> model callback called when value changes */
    _onChange: (value: any) => void;
    /** View -> model callback called when select has been touched */
    _onTouched: () => void;
    /** The IDs of child options to be passed to the aria-owns attribute. */
    _optionIds: string;
    /** The value of the select panel's transform-origin property. */
    _transformOrigin: string;
    /** Whether the panel's animation is done. */
    _panelDoneAnimating: boolean;
    /**
     * The x-offset of the overlay panel in relation to the trigger's top start corner.
     * This must be adjusted to align the selected option text over the trigger text when
     * the panel opens. Will change based on LTR or RTL text direction.
     */
    _offsetX: number;
    /**
     * The y-offset of the overlay panel in relation to the trigger's top start corner.
     * This must be adjusted to align the selected option text over the trigger text.
     * when the panel opens. Will change based on the y-position of the selected option.
     */
    _offsetY: number;
    /**
     * This position config ensures that the top "start" corner of the overlay
     * is aligned with with the top "start" of the origin by default (overlapping
     * the trigger completely). If the panel cannot fit below the trigger, it
     * will fall back to a position above the trigger.
     */
    _positions: {
        originX: string;
        originY: string;
        overlayX: string;
        overlayY: string;
    }[];
    /** Trigger that opens the select. */
    trigger: ElementRef;
    /** Overlay pane containing the options. */
    overlayDir: ConnectedOverlayDirective;
    /** All of the defined select options. */
    options: QueryList<Md2Option>;
    /** Placeholder to be shown if no value has been selected. */
    placeholder: string;
    /** Whether the component is disabled. */
    disabled: any;
    /** Whether the component is required. */
    required: any;
    /** Whether the user should be allowed to select multiple options. */
    multiple: boolean;
    /** Whether to float the placeholder text. */
    floatPlaceholder: Md2SelectFloatPlaceholderType;
    private _floatPlaceholder;
    /** Tab index for the select element. */
    tabIndex: number;
    /** Aria label of the select. If not specified, the placeholder will be used as label. */
    ariaLabel: string;
    /** Input that can be used to specify the `aria-labelledby` attribute. */
    ariaLabelledby: string;
    /** Combined stream of all of the child options' change events. */
    readonly optionSelectionChanges: Observable<Md2OptionSelectionChange>;
    /** Event emitted when the select has been opened. */
    onOpen: EventEmitter<void>;
    /** Event emitted when the select has been closed. */
    onClose: EventEmitter<void>;
    /** Event emitted when the selected value has been changed by the user. */
    change: EventEmitter<Md2SelectChange>;
    constructor(_element: ElementRef, _renderer: Renderer, _viewportRuler: ViewportRuler, _changeDetectorRef: ChangeDetectorRef, _dir: Dir, _control: NgControl, tabIndex: string);
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    /** Toggles the overlay panel open or closed. */
    toggle(): void;
    /** Opens the overlay panel. */
    open(): void;
    /** Closes the overlay panel and focuses the host element. */
    close(): void;
    /**
     * Sets the select's value. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param value New value to be written to the model.
     */
    writeValue(value: any): void;
    /**
     * Saves a callback function to be invoked when the select's value
     * changes from user input. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     *
     * @param fn Callback to be triggered when the value changes.
     */
    registerOnChange(fn: (value: any) => void): void;
    /**
     * Saves a callback function to be invoked when the select is blurred
     * by the user. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param fn Callback to be triggered when the component has been touched.
     */
    registerOnTouched(fn: () => {}): void;
    /**
     * Disables the select. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param isDisabled Sets whether the component is disabled.
     */
    setDisabledState(isDisabled: boolean): void;
    /** Whether or not the overlay panel is open. */
    readonly panelOpen: boolean;
    /** The currently selected option. */
    readonly selected: Md2Option | Md2Option[];
    /** The value displayed in the trigger. */
    readonly triggerValue: string;
    /** Whether the element is in RTL mode. */
    _isRtl(): boolean;
    /** The width of the trigger element. This is necessary to match
     * the overlay width to the trigger width.
     */
    _getWidth(): number;
    /** Ensures the panel opens if activated by the keyboard. */
    _handleKeydown(event: KeyboardEvent): void;
    /**
     * When the panel element is finished transforming in (though not fading in), it
     * emits an event and focuses an option if the panel is open.
     */
    _onPanelDone(): void;
    /**
     * When the panel content is done fading in, the _panelDoneAnimating property is
     * set so the proper class can be added to the panel.
     */
    _onFadeInDone(): void;
    /**
     * Calls the touched callback only if the panel is closed. Otherwise, the trigger will
     * "blur" to the panel when it opens, causing a false positive.
     */
    _onBlur(): void;
    /**
     * Sets the scroll position of the scroll container. This must be called after
     * the overlay pane is attached or the scroll container element will not yet be
     * present in the DOM.
     */
    _setScrollTop(): void;
    /**
     * Sets the selected option based on a value. If no option can be
     * found with the designated value, the select trigger is cleared.
     */
    private _setSelectionByValue(value);
    /**
     * Finds and selects and option based on its value.
     * @returns Option that has the corresponding value.
     */
    private _selectValue(value);
    /**
     * Compare two vars or objects
     * @param o1 compare first object
     * @param o2 compare second object
     * @return boolean comparation result
     */
    private equals(o1, o2);
    /**
     * Clears the select trigger and deselects every option in the list.
     * @param skip Option that should not be deselected.
     */
    private _clearSelection(skip?);
    private _getTriggerRect();
    /** Sets up a key manager to listen to keyboard events on the overlay panel. */
    private _initKeyManager();
    /** Drops current option subscriptions and IDs and resets from scratch. */
    private _resetOptions();
    /** Listens to user-generated selection events on each option. */
    private _listenToOptions();
    /** Invoked when an option is clicked. */
    private _onSelect(option);
    /**
     * Sorts the model values, ensuring that they keep the same
     * order that they have in the panel.
     */
    private _sortValues();
    /** Unsubscribes from all option subscriptions. */
    private _dropSubscriptions();
    /** Emits change event to set the model value. */
    private _propagateChanges();
    /** Records option IDs to pass to the aria-owns property. */
    private _setOptionIds();
    /**
     * Sets the `multiple` property on each option. The promise is necessary
     * in order to avoid Angular errors when modifying the property after init.
     * TODO: there should be a better way of doing this.
     */
    private _setOptionMultiple();
    /**
     * Must set the width of the selected option's value programmatically
     * because it is absolutely positioned and otherwise will not clip
     * overflow. The selection arrow is 9px wide, add 4px of padding = 13
     */
    private _setValueWidth();
    /**
     * Focuses the selected item. If no option is selected, it will focus
     * the first item instead.
     */
    private _focusCorrectOption();
    /** Focuses the host element when the panel closes. */
    private _focusHost();
    /** Gets the index of the provided option in the option list. */
    private _getOptionIndex(option);
    /** Calculates the scroll position and x- and y-offsets of the overlay panel. */
    private _calculateOverlayPosition();
    /**
     * Calculates the scroll position of the select's overlay panel.
     *
     * Attempts to center the selected option in the panel. If the option is
     * too high or too low in the panel to be scrolled to the center, it clamps the
     * scroll position to the min or max scroll positions respectively.
     */
    _calculateOverlayScroll(selectedIndex: number, scrollBuffer: number, maxScroll: number): number;
    /**
     * Figures out the appropriate animation state for the placeholder.
     */
    _getPlaceholderAnimationState(): string;
    /**
     * Determines the CSS `visibility` of the placeholder element.
     */
    _getPlaceholderVisibility(): 'visible' | 'hidden';
    /** Returns the aria-label of the select component. */
    readonly _ariaLabel: string;
    /**
     * Calculates the y-offset of the select's overlay panel in relation to the
     * top start corner of the trigger. It has to be adjusted in order for the
     * selected option to be aligned over the trigger when the panel opens.
     */
    private _calculateOverlayOffset(selectedIndex, scrollBuffer, maxScroll);
    /**
     * Checks that the attempted overlay position will fit within the viewport.
     * If it will not fit, tries to adjust the scroll position and the associated
     * y-offset so the panel can open fully on-screen. If it still won't fit,
     * sets the offset back to 0 to allow the fallback position to take over.
     */
    private _checkOverlayWithinViewport(maxScroll);
    /** Adjusts the overlay panel up to fit in the viewport. */
    private _adjustPanelUp(panelHeightBottom, bottomSpaceAvailable);
    /** Adjusts the overlay panel down to fit in the viewport. */
    private _adjustPanelDown(panelHeightTop, topSpaceAvailable, maxScroll);
    /** Sets the transform origin point based on the selected option. */
    private _getOriginBasedOnOption();
    /** Figures out the floating placeholder state value. */
    private _floatPlaceholderState();
}
