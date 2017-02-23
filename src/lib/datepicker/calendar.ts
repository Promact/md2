import {
  Component,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';

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

  _view: boolean = true;

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

  @Input()
  set view(value: string) {
    if (value === 'years') { this._view = false; }
    else { this._view = true; }
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
