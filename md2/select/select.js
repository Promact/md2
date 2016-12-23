var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, ContentChildren, ElementRef, EventEmitter, Input, Optional, Output, QueryList, Renderer, ViewEncapsulation, ViewChild } from '@angular/core';
import { Md2Option } from './option';
import { ENTER, SPACE } from '../core/keyboard/keycodes';
import { ListKeyManager } from '../core/a11y/list-key-manager';
import { Dir } from '../core/rtl/dir';
import { transformPlaceholder, transformPanel, fadeInContent } from './select-animations';
import { NgControl } from '@angular/forms';
import { coerceBooleanProperty } from '../core/coercion/boolean-property';
import { ConnectedOverlayDirective } from '../core/overlay/overlay-directives';
import { ViewportRuler } from '../core/overlay/position/viewport-ruler';
/**
 * The following style constants are necessary to save here in order
 * to properly calculate the alignment of the selected option over
 * the trigger element.
 */
/** The fixed height of every option element. */
export var SELECT_OPTION_HEIGHT = 48;
/** The max height of the select's overlay panel */
export var SELECT_PANEL_MAX_HEIGHT = 256;
/** The max number of options visible at once in the select panel. */
export var SELECT_MAX_OPTIONS_DISPLAYED = 5;
/** The fixed height of the select's trigger element. */
export var SELECT_TRIGGER_HEIGHT = 30;
/**
 * Must adjust for the difference in height between the option and the trigger,
 * so the text will align on the y axis.
 * (SELECT_OPTION_HEIGHT (48) - SELECT_TRIGGER_HEIGHT (30)) / 2 = 9
 */
export var SELECT_OPTION_HEIGHT_ADJUSTMENT = 9;
/** The panel's padding on the x-axis */
export var SELECT_PANEL_PADDING_X = 16;
/**
 * The panel's padding on the y-axis. This padding indicates there are more
 * options available if you scroll.
 */
export var SELECT_PANEL_PADDING_Y = 16;
/**
 * The select panel will only "fit" inside the viewport if it is positioned at
 * this value or more away from the viewport boundary.
 */
export var SELECT_PANEL_VIEWPORT_PADDING = 8;
/** Change event object emitted by Md2Select. */
export var Md2SelectChange = (function () {
    function Md2SelectChange() {
    }
    return Md2SelectChange;
}());
export var Md2Select = (function () {
    function Md2Select(_element, _renderer, _viewportRuler, _dir, _control) {
        this._element = _element;
        this._renderer = _renderer;
        this._viewportRuler = _viewportRuler;
        this._dir = _dir;
        this._control = _control;
        /** Whether or not the overlay panel is open. */
        this._panelOpen = false;
        /** The currently selected option. */
        this._selected = [];
        /** Subscriptions to option events. */
        this._subscriptions = [];
        /** Whether filling out the select is required in the form.  */
        this._required = false;
        /** Whether the select is disabled.  */
        this._disabled = false;
        /** Whether the select is multiple.  */
        this._multiple = false;
        /** The scroll position of the overlay panel, calculated to center the selected option. */
        this._scrollTop = 0;
        /** The animation state of the placeholder. */
        this._placeholderState = '';
        /** View -> model callback called when value changes */
        this._onChange = function (value) { };
        /** View -> model callback called when select has been touched */
        this._onTouched = function () { };
        /** The IDs of child options to be passed to the aria-owns attribute. */
        this._optionIds = '';
        /** The value of the select panel's transform-origin property. */
        this._transformOrigin = 'top';
        /**
         * The x-offset of the overlay panel in relation to the trigger's top start corner.
         * This must be adjusted to align the selected option text over the trigger text when
         * the panel opens. Will change based on LTR or RTL text direction.
         */
        this._offsetX = 0;
        /**
         * The y-offset of the overlay panel in relation to the trigger's top start corner.
         * This must be adjusted to align the selected option text over the trigger text.
         * when the panel opens. Will change based on the y-position of the selected option.
         */
        this._offsetY = 0;
        /**
         * This position config ensures that the top "start" corner of the overlay
         * is aligned with with the top "start" of the origin by default (overlapping
         * the trigger completely). If the panel cannot fit below the trigger, it
         * will fall back to a position above the trigger.
         */
        this._positions = [
            {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'top',
            },
            {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'bottom',
            },
        ];
        this.change = new EventEmitter();
        this.onOpen = new EventEmitter();
        this.onClose = new EventEmitter();
        if (this._control) {
            this._control.valueAccessor = this;
        }
    }
    Object.defineProperty(Md2Select.prototype, "placeholder", {
        get: function () {
            return this._placeholder;
        },
        set: function (value) {
            var _this = this;
            this._placeholder = value;
            // Must wait to record the trigger width to ensure placeholder width is included.
            Promise.resolve(null).then(function () { return _this._triggerWidth = _this._getWidth(); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Select.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            this._disabled = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Select.prototype, "multiple", {
        get: function () {
            return this._multiple;
        },
        set: function (value) {
            this._multiple = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Select.prototype, "required", {
        get: function () {
            return this._required;
        },
        set: function (value) {
            this._required = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Md2Select.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._initKeyManager();
        this._resetOptions();
        this._changeSubscription = this.options.changes.subscribe(function () { return _this._resetOptions(); });
    };
    Md2Select.prototype.ngOnDestroy = function () {
        this._dropSubscriptions();
        this._changeSubscription.unsubscribe();
        this._tabSubscription.unsubscribe();
    };
    /** Toggles the overlay panel open or closed. */
    Md2Select.prototype.toggle = function () {
        this.panelOpen ? this.close() : this.open();
    };
    /** Opens the overlay panel. */
    Md2Select.prototype.open = function () {
        if (this.disabled) {
            return;
        }
        this._calculateOverlayPosition();
        this._placeholderState = this._isRtl() ? 'floating-rtl' : 'floating-ltr';
        this._panelOpen = true;
    };
    /** Closes the overlay panel and focuses the host element. */
    Md2Select.prototype.close = function () {
        this._panelOpen = false;
        if (!this._selected.length) {
            this._placeholderState = '';
        }
        this._focusHost();
    };
    /** Dispatch change event with current select and value. */
    Md2Select.prototype._emitChangeEvent = function () {
        var event = new Md2SelectChange();
        event.source = this;
        if (this.multiple) {
            event.value = this._selected.map(function (option) { return option.value; });
        }
        else {
            event.value = this._selected[0].value;
        }
        this._onChange(event.value);
        this.change.emit(event);
    };
    /**
     * Sets the select's value. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     */
    Md2Select.prototype.writeValue = function (value) {
        var _this = this;
        if (!this.options) {
            // In reactive forms, writeValue() will be called synchronously before
            // the select's child options have been created. It's necessary to call
            // writeValue() again after the options have been created to ensure any
            // initial view value is set.
            Promise.resolve(null).then(function () { return _this.writeValue(value); });
            return;
        }
        this._setSelectionByValue(value);
    };
    /**
     * Saves a callback function to be invoked when the select's value
     * changes from user input. Part of the ControlValueAccessor interface
     * required to integrate with Angular's core forms API.
     */
    Md2Select.prototype.registerOnChange = function (fn) {
        this._onChange = fn;
    };
    /**
     * Saves a callback function to be invoked when the select is blurred
     * by the user. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     */
    Md2Select.prototype.registerOnTouched = function (fn) {
        this._onTouched = fn;
    };
    /**
     * Disables the select. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     */
    Md2Select.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    Object.defineProperty(Md2Select.prototype, "panelOpen", {
        /** Whether or not the overlay panel is open. */
        get: function () {
            return this._panelOpen;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Md2Select.prototype, "selected", {
        /** The currently selected option. */
        get: function () {
            return this._selected;
        },
        enumerable: true,
        configurable: true
    });
    Md2Select.prototype._isRtl = function () {
        return this._dir ? this._dir.value === 'rtl' : false;
    };
    /** The width of the trigger element. This is necessary to match
     * the overlay width to the trigger width.
     */
    Md2Select.prototype._getWidth = function () {
        return this._getTriggerRect().width;
    };
    /** Ensures the panel opens if activated by the keyboard. */
    Md2Select.prototype._handleKeydown = function (event) {
        if (event.keyCode === ENTER || event.keyCode === SPACE) {
            this.open();
        }
    };
    /**
     * When the panel is finished animating, emits an event and focuses
     * an option if the panel is open.
     */
    Md2Select.prototype._onPanelDone = function () {
        if (this.panelOpen) {
            this._focusCorrectOption();
            this.onOpen.emit();
        }
        else {
            this.onClose.emit();
        }
    };
    /**
     * Calls the touched callback only if the panel is closed. Otherwise, the trigger will
     * "blur" to the panel when it opens, causing a false positive.
     */
    Md2Select.prototype._onBlur = function () {
        if (!this.panelOpen) {
            this._onTouched();
        }
    };
    /** Returns the correct tabindex for the select depending on disabled state. */
    Md2Select.prototype._getTabIndex = function () {
        return this.disabled ? '-1' : '0';
    };
    /**
     * Sets the scroll position of the scroll container. This must be called after
     * the overlay pane is attached or the scroll container element will not yet be
     * present in the DOM.
     */
    Md2Select.prototype._setScrollTop = function () {
        var scrollContainer = this.overlayDir.overlayRef.overlayElement.querySelector('.md2-select-panel');
        scrollContainer.scrollTop = this._scrollTop;
    };
    /**
     * Sets the selected option based on a value. If no option can be
     * found with the designated value, the select trigger is cleared.
     */
    Md2Select.prototype._setSelectionByValue = function (value) {
        var options = this.options.toArray();
        if (this.multiple) {
            this._selected = [];
            value = Array.isArray(value) ? value : [];
            for (var i = 0; i < this.options.length; i++) {
                if (value.indexOf(options[i].value) > -1) {
                    options[i].select();
                }
            }
            this._updateOptions();
        }
        else {
            for (var i = 0; i < this.options.length; i++) {
                if (options[i].value === value) {
                    options[i].select();
                    return;
                }
            }
            // Clear selection if no item was selected.
            this._clearSelection();
        }
    };
    /** Clears the select trigger and deselects every option in the list. */
    Md2Select.prototype._clearSelection = function () {
        this._selected = [];
        this._updateOptions();
    };
    Md2Select.prototype._getTriggerRect = function () {
        return this.trigger.nativeElement.getBoundingClientRect();
    };
    /** Sets up a key manager to listen to keyboard events on the overlay panel. */
    Md2Select.prototype._initKeyManager = function () {
        var _this = this;
        this._keyManager = new ListKeyManager(this.options);
        this._tabSubscription = this._keyManager.tabOut.subscribe(function () {
            _this.close();
        });
    };
    /** Drops current option subscriptions and IDs and resets from scratch. */
    Md2Select.prototype._resetOptions = function () {
        this._dropSubscriptions();
        this._listenToOptions();
        this._setOptionIds();
    };
    /** Listens to selection events on each option. */
    Md2Select.prototype._listenToOptions = function () {
        var _this = this;
        this.options.forEach(function (option) {
            var sub = option.onSelect.subscribe(function (isUserInput) {
                if (_this.multiple) {
                    var ind = _this._selected.indexOf(option);
                    if (ind < 0) {
                        _this._selected.push(option);
                        _this._selected = _this._selected.sort(function (a, b) {
                            return _this.options.toArray().indexOf(a) - _this.options.toArray().indexOf(b);
                        });
                    }
                    else {
                        _this._selected.splice(ind, 1);
                    }
                }
                else {
                    _this._selected[0] = option;
                    if (_this.panelOpen) {
                        _this.close();
                    }
                }
                if (isUserInput) {
                    _this._emitChangeEvent();
                }
                _this._updateOptions();
                _this._setValueWidth();
                _this._placeholderState = '';
            });
            _this._subscriptions.push(sub);
        });
    };
    /** Unsubscribes from all option subscriptions. */
    Md2Select.prototype._dropSubscriptions = function () {
        this._subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
        this._subscriptions = [];
    };
    /** Records option IDs to pass to the aria-owns property. */
    Md2Select.prototype._setOptionIds = function () {
        this._optionIds = this.options.map(function (option) { return option.id; }).join(' ');
    };
    /** Deselect each option that doesn't match the current selection. */
    Md2Select.prototype._updateOptions = function () {
        var _this = this;
        this.options.forEach(function (option) {
            if (_this.multiple) {
                if (_this._selected.indexOf(option) < 0) {
                    option.deselect();
                }
            }
            else {
                if (option !== _this.selected[0]) {
                    option.deselect();
                }
            }
        });
    };
    /**
     * Must set the width of the selected option's value programmatically
     * because it is absolutely positioned and otherwise will not clip
     * overflow. The selection arrow is 9px wide, add 4px of padding = 13
     */
    Md2Select.prototype._setValueWidth = function () {
        this._selectedValueWidth = this._triggerWidth - 13;
    };
    /** Focuses the selected item. If no option is selected, it will focus
     * the first item instead.
     */
    Md2Select.prototype._focusCorrectOption = function () {
        if (this.selected.length) {
            this._keyManager.setFocus(this._getOptionIndex(this.selected[0]));
        }
        else {
            this._keyManager.focusFirstItem();
        }
    };
    /** Focuses the host element when the panel closes. */
    Md2Select.prototype._focusHost = function () {
        this._renderer.invokeElementMethod(this._element.nativeElement, 'focus');
    };
    /** Gets the index of the provided option in the option list. */
    Md2Select.prototype._getOptionIndex = function (option) {
        return this.options.reduce(function (result, current, index) {
            return result === undefined ? (option === current ? index : undefined) : result;
        }, undefined);
    };
    /** Calculates the scroll position and x- and y-offsets of the overlay panel. */
    Md2Select.prototype._calculateOverlayPosition = function () {
        this._offsetX = this._isRtl() ? SELECT_PANEL_PADDING_X : -SELECT_PANEL_PADDING_X;
        var panelHeight = Math.min(this.options.length * SELECT_OPTION_HEIGHT, SELECT_PANEL_MAX_HEIGHT);
        var scrollContainerHeight = this.options.length * SELECT_OPTION_HEIGHT;
        // The farthest the panel can be scrolled before it hits the bottom
        var maxScroll = scrollContainerHeight - panelHeight;
        if (this.selected) {
            var selectedIndex = this._getOptionIndex(this.selected[0]);
            // We must maintain a scroll buffer so the selected option will be scrolled to the
            // center of the overlay panel rather than the top.
            var scrollBuffer = panelHeight / 2;
            this._scrollTop = this._calculateOverlayScroll(selectedIndex, scrollBuffer, maxScroll);
            this._offsetY = this._calculateOverlayOffset(selectedIndex, scrollBuffer, maxScroll);
        }
        else {
            // If no option is selected, the panel centers on the first option. In this case,
            // we must only adjust for the height difference between the option element
            // and the trigger element, then multiply it by -1 to ensure the panel moves
            // in the correct direction up the page.
            this._offsetY = (SELECT_OPTION_HEIGHT - SELECT_TRIGGER_HEIGHT) / 2 * -1;
        }
        this._checkOverlayWithinViewport(maxScroll);
    };
    /**
     * Calculates the scroll position of the select's overlay panel.
     *
     * Attempts to center the selected option in the panel. If the option is
     * too high or too low in the panel to be scrolled to the center, it clamps the
     * scroll position to the min or max scroll positions respectively.
     */
    Md2Select.prototype._calculateOverlayScroll = function (selectedIndex, scrollBuffer, maxScroll) {
        var optionOffsetFromScrollTop = SELECT_OPTION_HEIGHT * selectedIndex;
        var halfOptionHeight = SELECT_OPTION_HEIGHT / 2;
        // Starts at the optionOffsetFromScrollTop, which scrolls the option to the top of the
        // scroll container, then subtracts the scroll buffer to scroll the option down to
        // the center of the overlay panel. Half the option height must be re-added to the
        // scrollTop so the option is centered based on its middle, not its top edge.
        var optimalScrollPosition = optionOffsetFromScrollTop - scrollBuffer + halfOptionHeight;
        return clampValue(0, optimalScrollPosition, maxScroll);
    };
    /**
     * Calculates the y-offset of the select's overlay panel in relation to the
     * top start corner of the trigger. It has to be adjusted in order for the
     * selected option to be aligned over the trigger when the panel opens.
     */
    Md2Select.prototype._calculateOverlayOffset = function (selectedIndex, scrollBuffer, maxScroll) {
        var optionOffsetFromPanelTop;
        if (this._scrollTop === 0) {
            optionOffsetFromPanelTop = selectedIndex * SELECT_OPTION_HEIGHT;
        }
        else if (this._scrollTop === maxScroll) {
            var firstDisplayedIndex = this.options.length - SELECT_MAX_OPTIONS_DISPLAYED;
            var selectedDisplayIndex = selectedIndex - firstDisplayedIndex;
            // Because the panel height is longer than the height of the options alone,
            // there is always extra padding at the top or bottom of the panel. When
            // scrolled to the very bottom, this padding is at the top of the panel and
            // must be added to the offset.
            optionOffsetFromPanelTop =
                selectedDisplayIndex * SELECT_OPTION_HEIGHT + SELECT_PANEL_PADDING_Y;
        }
        else {
            // If the option was scrolled to the middle of the panel using a scroll buffer,
            // its offset will be the scroll buffer minus the half height that was added to
            // center it.
            optionOffsetFromPanelTop = scrollBuffer - SELECT_OPTION_HEIGHT / 2;
        }
        // The final offset is the option's offset from the top, adjusted for the height
        // difference, multiplied by -1 to ensure that the overlay moves in the correct
        // direction up the page.
        return optionOffsetFromPanelTop * -1 - SELECT_OPTION_HEIGHT_ADJUSTMENT;
    };
    /**
     * Checks that the attempted overlay position will fit within the viewport.
     * If it will not fit, tries to adjust the scroll position and the associated
     * y-offset so the panel can open fully on-screen. If it still won't fit,
     * sets the offset back to 0 to allow the fallback position to take over.
     */
    Md2Select.prototype._checkOverlayWithinViewport = function (maxScroll) {
        var viewportRect = this._viewportRuler.getViewportRect();
        var triggerRect = this._getTriggerRect();
        var topSpaceAvailable = triggerRect.top - SELECT_PANEL_VIEWPORT_PADDING;
        var bottomSpaceAvailable = viewportRect.height - triggerRect.bottom - SELECT_PANEL_VIEWPORT_PADDING;
        var panelHeightTop = Math.abs(this._offsetY);
        var totalPanelHeight = Math.min(this.options.length * SELECT_OPTION_HEIGHT, SELECT_PANEL_MAX_HEIGHT);
        var panelHeightBottom = totalPanelHeight - panelHeightTop - triggerRect.height;
        if (panelHeightBottom > bottomSpaceAvailable) {
            this._adjustPanelUp(panelHeightBottom, bottomSpaceAvailable);
        }
        else if (panelHeightTop > topSpaceAvailable) {
            this._adjustPanelDown(panelHeightTop, topSpaceAvailable, maxScroll);
        }
        else {
            this._transformOrigin = this._getOriginBasedOnOption();
        }
    };
    /** Adjusts the overlay panel up to fit in the viewport. */
    Md2Select.prototype._adjustPanelUp = function (panelHeightBottom, bottomSpaceAvailable) {
        var distanceBelowViewport = panelHeightBottom - bottomSpaceAvailable;
        // Scrolls the panel up by the distance it was extending past the boundary, then
        // adjusts the offset by that amount to move the panel up into the viewport.
        this._scrollTop -= distanceBelowViewport;
        this._offsetY -= distanceBelowViewport;
        this._transformOrigin = this._getOriginBasedOnOption();
        // If the panel is scrolled to the very top, it won't be able to fit the panel
        // by scrolling, so set the offset to 0 to allow the fallback position to take
        // effect.
        if (this._scrollTop <= 0) {
            this._scrollTop = 0;
            this._offsetY = 0;
            this._transformOrigin = "50% bottom 0px";
        }
    };
    /** Adjusts the overlay panel down to fit in the viewport. */
    Md2Select.prototype._adjustPanelDown = function (panelHeightTop, topSpaceAvailable, maxScroll) {
        var distanceAboveViewport = panelHeightTop - topSpaceAvailable;
        // Scrolls the panel down by the distance it was extending past the boundary, then
        // adjusts the offset by that amount to move the panel down into the viewport.
        this._scrollTop += distanceAboveViewport;
        this._offsetY += distanceAboveViewport;
        this._transformOrigin = this._getOriginBasedOnOption();
        // If the panel is scrolled to the very bottom, it won't be able to fit the
        // panel by scrolling, so set the offset to 0 to allow the fallback position
        // to take effect.
        if (this._scrollTop >= maxScroll) {
            this._scrollTop = maxScroll;
            this._offsetY = 0;
            this._transformOrigin = "50% top 0px";
            return;
        }
    };
    /** Sets the transform origin point based on the selected option. */
    Md2Select.prototype._getOriginBasedOnOption = function () {
        var originY = Math.abs(this._offsetY) - SELECT_OPTION_HEIGHT_ADJUSTMENT + SELECT_OPTION_HEIGHT / 2;
        return "50% " + originY + "px 0px";
    };
    __decorate([
        ViewChild('trigger'), 
        __metadata('design:type', ElementRef)
    ], Md2Select.prototype, "trigger", void 0);
    __decorate([
        ViewChild(ConnectedOverlayDirective), 
        __metadata('design:type', ConnectedOverlayDirective)
    ], Md2Select.prototype, "overlayDir", void 0);
    __decorate([
        ContentChildren(Md2Option), 
        __metadata('design:type', QueryList)
    ], Md2Select.prototype, "options", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', EventEmitter)
    ], Md2Select.prototype, "change", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Md2Select.prototype, "placeholder", null);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Md2Select.prototype, "disabled", null);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Md2Select.prototype, "multiple", null);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Md2Select.prototype, "required", null);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], Md2Select.prototype, "onOpen", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], Md2Select.prototype, "onClose", void 0);
    Md2Select = __decorate([
        Component({selector: 'md2-select, mat-select',
            template: "<div class=\"md2-select-trigger\" cdk-overlay-origin (click)=\"toggle()\" #origin=\"cdkOverlayOrigin\" #trigger> <span class=\"md2-select-placeholder\" [class.md2-floating-placeholder]=\"this.selected.length\" [@transformPlaceholder]=\"_placeholderState\" [style.width.px]=\"_selectedValueWidth\">{{ placeholder }}</span> <span class=\"md2-select-value\"> <span class=\"md2-select-value-text\" *ngFor=\"let option of selected\"> {{ option.viewValue }} </span> </span> <span class=\"md2-select-arrow\"></span> </div> <template cdk-connected-overlay [origin]=\"origin\" [open]=\"panelOpen\" hasBackdrop (backdropClick)=\"close()\" backdropClass=\"cdk-overlay-transparent-backdrop\" [positions]=\"_positions\" [minWidth]=\"_triggerWidth\" [offsetY]=\"_offsetY\" [offsetX]=\"_offsetX\" (attach)=\"_setScrollTop()\"> <div class=\"md2-select-panel\" [@transformPanel]=\"'showing'\" (@transformPanel.done)=\"_onPanelDone()\" (keydown)=\"_keyManager.onKeydown($event)\" [style.transformOrigin]=\"_transformOrigin\"  [attr.multiple]=\"multiple\"> <div class=\"md2-select-content\" [@fadeInContent]=\"'showing'\"> <ng-content></ng-content> </div> </div> </template> ",
            styles: ["md2-select { display: block; outline: none; } .md2-select-trigger { color: rgba(0, 0, 0, 0.38); border-bottom: 1px solid rgba(0, 0, 0, 0.12); display: flex; justify-content: space-between; align-items: center; height: 30px; min-width: 112px; cursor: pointer; position: relative; box-sizing: border-box; } [aria-disabled='true'] .md2-select-trigger { background-image: linear-gradient(to right, rgba(0, 0, 0, 0.26) 0, rgba(0, 0, 0, 0.26) 33%, transparent 0); background-size: 4px 1px; background-repeat: repeat-x; border-bottom: transparent; background-position: 0 bottom; cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } md2-select:focus:not(.md2-select-disabled) .md2-select-trigger { color: #106cc8; border-bottom: 1px solid #106cc8; } md2-select.ng-invalid.ng-touched:not(.md2-select-disabled) .md2-select-trigger { color: #f44336; border-bottom: 1px solid #f44336; } .md2-select-placeholder { position: relative; padding: 0 2px; transform-origin: left top; } .md2-select-placeholder.md2-floating-placeholder { top: -22px; left: -2px; transform: scale(0.75); } [dir='rtl'] .md2-select-placeholder { transform-origin: right top; } [dir='rtl'] .md2-select-placeholder.md2-floating-placeholder { left: 2px; } [aria-required=true] .md2-select-placeholder::after { content: '*'; } .md2-select-value { position: absolute; top: 6px; right: 18px; left: 0; white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; color: rgba(0, 0, 0, 0.87); } .md2-select-disabled .md2-select-value { color: rgba(0, 0, 0, 0.38); } [dir='rtl'] .md2-select-value { left: auto; right: 0; } .md2-select-value-text:not(:last-child)::after { content: ','; margin-left: -2px; } .md2-select-arrow { width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 5px solid; margin: 0 4px; color: rgba(0, 0, 0, 0.38); } md2-select:focus:not(.md2-select-disabled) .md2-select-arrow { color: #106cc8; } md2-select.ng-invalid.ng-touched:not(.md2-select-disabled) .md2-select-arrow { color: #f44336; } .md2-select-panel { box-shadow: 0 0 3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12); min-width: 112px; max-width: 280px; overflow: auto; -webkit-overflow-scrolling: touch; padding-top: 0; padding-bottom: 0; max-height: 256px; background: white; } md2-option { white-space: nowrap; overflow-x: hidden; text-overflow: ellipsis; display: flex; flex-direction: row; align-items: center; height: 48px; padding: 0 16px; font-size: 16px; font-family: Roboto, 'Helvetica Neue', sans-serif; text-align: start; text-decoration: none; position: relative; cursor: pointer; outline: none; } md2-option[aria-disabled='true'] { cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } md2-option:hover:not(.md2-option-disabled), md2-option:focus:not(.md2-option-disabled) { background: rgba(0, 0, 0, 0.04); } md2-option.md2-selected { color: #106cc8; } md2-option.md2-option-disabled { color: rgba(0, 0, 0, 0.38); } [multiple='true'] md2-option { padding-left: 40px; } [multiple='true'] md2-option::after { content: ''; position: absolute; top: 50%; left: 12px; display: block; width: 16px; height: 16px; margin-top: -8px; border: 2px solid; border-radius: 2px; box-sizing: border-box; transition: 240ms; } [multiple='true'] md2-option.md2-selected::after { transform: rotate(-45deg); height: 8px; border-width: 0 0 2px 2px; } .cdk-overlay-container, .cdk-global-overlay-wrapper { pointer-events: none; top: 0; left: 0; height: 100%; width: 100%; } .cdk-overlay-container { position: fixed; z-index: 1000; } .cdk-overlay-pane { position: absolute; pointer-events: auto; box-sizing: border-box; z-index: 1000; } .cdk-overlay-backdrop { position: absolute; top: 0; bottom: 0; left: 0; right: 0; z-index: 1; pointer-events: auto; transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1); opacity: 0; } .cdk-overlay-transparent-backdrop { background: none; } .cdk-overlay-backdrop.cdk-overlay-backdrop-showing { opacity: 0.48; } /*# sourceMappingURL=select.css.map */ "],
            encapsulation: ViewEncapsulation.None,
            host: {
                'role': 'listbox',
                '[attr.tabindex]': '_getTabIndex()',
                '[attr.aria-label]': 'placeholder',
                '[attr.aria-required]': 'required.toString()',
                '[attr.aria-disabled]': 'disabled.toString()',
                '[attr.aria-invalid]': '_control?.invalid || "false"',
                '[attr.aria-owns]': '_optionIds',
                '[class.md2-select-disabled]': 'disabled',
                '(keydown)': '_handleKeydown($event)',
                '(blur)': '_onBlur()'
            },
            animations: [
                transformPlaceholder,
                transformPanel,
                fadeInContent
            ],
            exportAs: 'md2Select',
        }),
        __param(3, Optional()),
        __param(4, Optional()), 
        __metadata('design:paramtypes', [ElementRef, Renderer, ViewportRuler, Dir, NgControl])
    ], Md2Select);
    return Md2Select;
}());
/** Clamps a value n between min and max values. */
function clampValue(min, n, max) {
    return Math.min(Math.max(min, n), max);
}

//# sourceMappingURL=select.js.map
