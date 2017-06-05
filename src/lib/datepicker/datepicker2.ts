import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  EventEmitter,
  Input,
  OnDestroy,
  Optional,
  Output,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  NgZone,
} from '@angular/core';
import { Overlay } from '../core/overlay/overlay';
import { OverlayRef } from '../core/overlay/overlay-ref';
import { ComponentPortal } from '../core/portal/portal';
import { OverlayState } from '../core/overlay/overlay-state';
import { Dir } from '../core/rtl/dir';
import { PositionStrategy } from '../core/overlay/position/position-strategy';
import { RepositionScrollStrategy, ScrollDispatcher } from '../core/overlay/index';
import { Md2DatepickerInput } from './datepicker-input';
import { Subscription } from 'rxjs/Subscription';
import { DateAdapter } from '../core/datetime/index';
import { ESCAPE } from '../core/keyboard/keycodes';
import { Md2Calendar } from './calendar';
import 'rxjs/add/operator/first';


/** Used to generate a unique ID for each datepicker instance. */
let datepickerUid = 0;


/**
 * Component used as the content for the datepicker dialog and popup. We use this instead of using
 * Md2Calendar directly as the content so we can control the initial focus. This also gives us a
 * place to put additional features of the popup that are not part of the calendar itself in the
 * future. (e.g. confirmation buttons).
 * @docs-private
 */
@Component({
  moduleId: module.id,
  selector: 'md2-datepicker-content',
  templateUrl: 'datepicker-content.html',
  styleUrls: ['datepicker-content.css'],
  host: {
    'class': 'md2-datepicker-content',
    '[class.md2-datepicker-content-touch]': 'datepicker.touchUi',
    '(keydown)': '_handleKeydown($event)',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Md2DatepickerContent<D> implements AfterContentInit {
  datepicker: Md2Datepicker2<D>;

  @ViewChild(Md2Calendar) _calendar: Md2Calendar<D>;

  ngAfterContentInit() {
    this._calendar._focusActiveCell();
  }

  /**
   * Handles keydown event on datepicker content.
   * @param event The event.
   */
  _handleKeydown(event: KeyboardEvent): void {
    switch (event.keyCode) {
      case ESCAPE:
        this.datepicker.close();
        break;
      default:
        // Return so that we don't preventDefault on keys that are not explicitly handled.
        return;
    }

    event.preventDefault();
  }
}


// TODO(mmalerba): We use a component instead of a directive here so the user can use implicit
// template reference variables (e.g. #d vs #d="md2Datepicker"). We can change this to a directive if
// angular adds support for `exportAs: '$implicit'` on directives.
/** Component responsible for managing the datepicker popup/dialog. */
@Component({
  moduleId: module.id,
  selector: 'md2-datepicker2',
  template: '<ng-content></ng-content>',
})
export class Md2Datepicker2<D> implements OnDestroy {
  /** The date to open the calendar to initially. */
  @Input()
  get startAt(): D {
    // If an explicit startAt is set we start there, otherwise we start at whatever the currently
    // selected value is.
    return this._startAt || (this._datepickerInput ? this._datepickerInput.value : null);
  }
  set startAt(date: D) { this._startAt = date; }
  private _startAt: D;

  /** The view that the calendar should start in. */
  @Input() startView: 'month' | 'year' = 'month';

  /**
   * Whether the calendar UI is in touch mode. In touch mode the calendar opens in a dialog rather
   * than a popup and elements have more padding to allow for bigger touch targets.
   */
  @Input() touchUi = false;

  /** Emits new selected date when selected date changes. */
  @Output() selectedChanged = new EventEmitter<D>();

  /** Whether the calendar is open. */
  opened = false;

  /** The id for the datepicker calendar. */
  id = `md2-datepicker-${datepickerUid++}`;

  /** The currently selected date. */
  _selected: D = null;

  /** The minimum selectable date. */
  get _minDate(): D {
    return this._datepickerInput && this._datepickerInput.min;
  }

  /** The maximum selectable date. */
  get _maxDate(): D {
    return this._datepickerInput && this._datepickerInput.max;
  }

  get _dateFilter(): (date: D | null) => boolean {
    return this._datepickerInput && this._datepickerInput._dateFilter;
  }

  /** A reference to the overlay when the calendar is opened as a popup. */
  private _pickerRef: OverlayRef;

  /** A portal containing the calendar for this datepicker. */
  private _calendarPortal: ComponentPortal<Md2DatepickerContent<D>>;

  /** The input element this datepicker is associated with. */
  private _datepickerInput: Md2DatepickerInput<D>;

  private _inputSubscription: Subscription;

  constructor(private _overlay: Overlay,
    private _ngZone: NgZone,
    private _viewContainerRef: ViewContainerRef,
    private _scrollDispatcher: ScrollDispatcher,
    @Optional() private _dateAdapter: DateAdapter<D>,
    @Optional() private _dir: Dir) {
    if (!this._dateAdapter) {
      throw Error('DateAdapter');
    }

  }

  ngOnDestroy() {
    this.close();
    if (this._pickerRef) {
      this._pickerRef.dispose();
    }
    if (this._inputSubscription) {
      this._inputSubscription.unsubscribe();
    }
  }

  /** Selects the given date and closes the currently open popup or dialog. */
  _selectAndClose(date: D): void {
    let oldValue = this._selected;
    this._selected = date;
    if (!this._dateAdapter.sameDate(oldValue, this._selected)) {
      this.selectedChanged.emit(date);
    }
    this.close();
  }

  /**
   * Register an input with this datepicker.
   * @param input The datepicker input to register with this datepicker.
   */
  _registerInput(input: Md2DatepickerInput<D>): void {
    if (this._datepickerInput) {
      throw new Error('An Md2Datepicker can only be associated with a single input.');
    }
    this._datepickerInput = input;
    this._inputSubscription =
      this._datepickerInput._valueChange.subscribe((value: D) => this._selected = value);
  }

  /** Open the calendar. */
  open(): void {
    if (this.opened) {
      return;
    }
    if (!this._datepickerInput) {
      throw new Error('Attempted to open an Md2Datepicker with no associated input.');
    }

    // this.touchUi ? this._openAsDialog() :
    this._openAsPopup();
    this.opened = true;
  }

  /** Close the calendar. */
  close(): void {
    if (!this.opened) {
      return;
    }
    if (this._pickerRef && this._pickerRef.hasAttached()) {
      this._pickerRef.detach();
    }
    if (this._calendarPortal && this._calendarPortal.isAttached) {
      this._calendarPortal.detach();
    }
    this.opened = false;
  }

  /** Open the calendar as a popup. */
  private _openAsPopup(): void {
    if (!this._calendarPortal) {
      this._calendarPortal = new ComponentPortal(Md2DatepickerContent, this._viewContainerRef);
    }

    if (!this._pickerRef) {
      this._createPopup();
    }

    if (!this._pickerRef.hasAttached()) {
      let componentRef: ComponentRef<Md2DatepickerContent<D>> =
        this._pickerRef.attach(this._calendarPortal);
      componentRef.instance.datepicker = this;

      // Update the position once the calendar has rendered.
      this._ngZone.onStable.first().subscribe(() => this._pickerRef.updatePosition());
    }

    this._pickerRef.backdropClick().first().subscribe(() => this.close());
  }

  /** Create the popup. */
  private _createPopup(): void {
    const overlayState = new OverlayState();
    overlayState.positionStrategy = this._createPopupPositionStrategy();
    overlayState.hasBackdrop = true;
    overlayState.backdropClass = 'md2-overlay-transparent-backdrop';
    overlayState.direction = this._dir ? this._dir.value : 'ltr';
    overlayState.scrollStrategy = new RepositionScrollStrategy(this._scrollDispatcher);

    this._pickerRef = this._overlay.create(overlayState);
  }

  /** Create the popup PositionStrategy. */
  private _createPopupPositionStrategy(): PositionStrategy {
    return this._overlay.position()
      .connectedTo(this._datepickerInput.getPopupConnectionElementRef(),
      { originX: 'start', originY: 'bottom' },
      { overlayX: 'start', overlayY: 'top' }
      )
      .withFallbackPosition(
      { originX: 'start', originY: 'top' },
      { overlayX: 'start', overlayY: 'bottom' }
      )
      .withFallbackPosition(
      { originX: 'end', originY: 'bottom' },
      { overlayX: 'end', overlayY: 'top' }
      )
      .withFallbackPosition(
      { originX: 'end', originY: 'top' },
      { overlayX: 'end', overlayY: 'bottom' }
      );
  }
}
