import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

/**
 * Component used as the panel for the datepicker dialog and popup.
 * @docs-internal
 */
@Component({
  moduleId: module.id,
  selector: 'md2-datepicker-panel',
  templateUrl: 'datepicker-panel.html',
  styleUrls: ['datepicker-panel.css'],
  host: {
    '[class.md2-datepicker-panel]': 'true',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Md2DatepickerPanel implements AfterContentInit {

  constructor(private _elementRef: ElementRef) { }

  ngAfterContentInit() {
    //this._elementRef.nativeElement.querySelector('.md2-calendar-body').focus();
  }
}