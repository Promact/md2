import {
  Component,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';

export const CLOCK_HOURS = 24;
export const CLOCK_MINUTES = 60;
export const CLOCK_RADIUS = 120;
export const CLOCK_INNER_RADIUS = 66;
export const CLOCK_OUTER_RADIUS = 99;
export const CLOCK_TICK_RADIUS = 17;

@Component({
  moduleId: module.id,
  selector: 'md2-calendar',
  templateUrl: 'calendar.html',
  styleUrls: ['calendar.css'],
  host: {
    'role': 'calendar'
  },
  //encapsulation: ViewEncapsulation.None
})
export class Md2Clock {

  private _selected: Date;

  constructor(private _element: ElementRef) {
    this.renderCalendar();
  }

  @Output() selectedChange: EventEmitter<Date> = new EventEmitter<Date>();

  @Input()
  get selected() { return this._selected; }
  set selected(value: Date) {
    if (this._selected !== value) {
      this._selected = value || new Date();
    }
  }

  /** Emits an event when the user selects a time. */
  _emitChangeEvent(): void {
    this.selectedChange.emit(this.selected);
  }

  /**
   * render Calendar
   */
  private renderCalendar() {

  }

}
