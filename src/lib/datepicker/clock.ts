import {
  Component,
  ElementRef,
  HostListener,
  Input,
  Output,
  EventEmitter,
  Renderer,
  ViewEncapsulation,
} from '@angular/core';
import { DateLocale } from './date-locale';
import {
  coerceBooleanProperty,
  ENTER,
  SPACE,
  TAB,
  ESCAPE,
  HOME,
  END,
  PAGE_UP,
  PAGE_DOWN,
  LEFT_ARROW,
  RIGHT_ARROW,
  UP_ARROW,
  DOWN_ARROW,
} from '../core';

export const CLOCK_HOURS = 24;
export const CLOCK_MINUTES = 60;

@Component({
  moduleId: module.id,
  selector: 'md2-clock',
  templateUrl: 'clock.html',
  styleUrls: ['clock.css'],
  host: {
    'role': 'clock',
    '(mousedown)': '_handleMousedown($event)',
    '(keydown)': '_handleKeydown($event)',
  },
  //encapsulation: ViewEncapsulation.None
})
export class Md2Clock {

  private mouseMoveListener: any;
  private mouseUpListener: any;

  private _time: string;
  private config: any = {
    dialRadius: 120,
    outerRadius: 99,
    innerRadius: 66,
    tickRadius: 17,
    hand: { x: 0, y: 0 },
    x: 0, y: 0,
    dx: 0, dy: 0,
    moved: false
  };

  _isHoursVisible: boolean = false;

  _hours: Array<Object> = [];
  _minutes: Array<Object> = [];

  _hour: number = 0;
  _minute: number = 0;

  constructor(private _element: ElementRef) {//private _locale: ColorLocale
    this.renderClock();
    this.mouseMoveListener = (event: any) => { this._handleMousemove(event) };
    this.mouseUpListener = (event: any) => { this._handleMouseup(event) };
  }

  @Output() timeChange: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  get time() { return this._time; }
  set time(value: string) {
    if (this._time !== value) {
      this._time = value || '00:00';
    }
  }

  get hand(): any {
    let deg = 0;
    deg = Math.round(this._minute * (360 / 60));
    return {
      'transform': `rotate(${deg}deg)`,
      //'top': `${100 - this.hsva.v * 100}%`,
      //'background-color': `${this._alpha}`
    };
  }

  //_setSaturation(event: any) {//{ [key: string]: string }
  //  this.hsva.s = event.x / event.width;
  //  this.hsva.v = (1 - event.y / event.height);
  //  this.update();
  //}

  _handleMousedown(event: any) {
    this.setTime(event);
    document.addEventListener('mousemove', this.mouseMoveListener);
    document.addEventListener('touchmove', this.mouseMoveListener);
    document.addEventListener('mouseup', this.mouseUpListener);
    document.addEventListener('touchend', this.mouseUpListener);
  }

  _handleMousemove(event: any) {
    event.preventDefault();
    this.setTime(event);
  }

  _handleMouseup(event: any) {
    document.removeEventListener('mousemove', this.mouseMoveListener);
    document.removeEventListener('touchmove', this.mouseMoveListener);
    document.removeEventListener('mouseup', this.mouseUpListener);
    document.removeEventListener('touchend', this.mouseUpListener);
  }

  private setTime(event: any) {
    let trigger = this._element.nativeElement;
    let triggerRect = trigger.getBoundingClientRect();
    let width = trigger.offsetWidth;
    let height = trigger.offsetHeight;
    let pageX = event.pageX ? event.pageX : event.touches[0].pageX;
    let pageY = event.pageY ? event.pageY : event.touches[0].pageY;
    let x = (width / 2) - (pageX - triggerRect.left - window.pageXOffset);
    let y = (height / 2) - (pageY - triggerRect.top - window.pageYOffset);
    //let a = Math.atan2(y, x);
    //console.log(a);
    //let deg = Math.round((Math.atan2(y, x) * (360 / Math.PI)));
    //this._minute = Math.round((deg) * (360 / 60));


    var radian = Math.atan2(x, - y),
      unit = Math.PI / 30,//(isHours || roundBy5 ? 6 : 30),
      z = Math.sqrt(x * x + y * y),
      //inner = isHours && z < (outerRadius + innerRadius) / 2,
      radius = this.config.outerRadius, // inner ? innerRadius: outerRadius,
      value;

    //if (options.twelvehour) {
    //  radius = outerRadius;
    //}

    // Radian should in range [0, 2PI]
    if (radian < 0) {
      radian = Math.PI * 2 + radian;
    }

    // Get the round value
    value = Math.round(radian / unit);

    // Get the round radian
    radian = value * unit;

    // Correct the hours or minutes
    //if (options.twelvehour) {
    //  if (isHours) {
    //    if (value === 0) {
    //      value = 12;
    //    }
    //  } else {
    //    //if (roundBy5) {
    //    //  value *= 5;
    //    //}
    //    if (value === 60) {
    //      value = 0;
    //    }
    //  }
    //} else {
    //if (isHours) {
    //  if (value === 12) {
    //    value = 0;
    //  }
    //  value = inner ? (value === 0 ? 12 : value) : value === 0 ? 0 : value + 12;
    //} else {
    //if (roundBy5) {
    //  value *= 5;
    //}
    if (value === 60) {
      value = 0;
    }
    //}
    //}

    console.log(value);

  }

  //_emitChangeEvent(event: any): void {
  //  let trigger = this._element.nativeElement;
  //  let triggerRect = trigger.getBoundingClientRect();
  //  let width = trigger.offsetWidth;
  //  let height = trigger.offsetHeight;
  //  let x = Math.max(0, Math.min((event.pageX ? event.pageX : event.touches[0].pageX)
  //    - triggerRect.left - window.pageXOffset, width));
  //  let y = Math.max(0, Math.min((event.pageY ? event.pageY : event.touches[0].pageY)
  //    - triggerRect.top - window.pageYOffset, height));
  //  this.slideChange.emit({
  //    e: event,
  //    height: height,
  //    width: width,
  //    x: x,
  //    y: y
  //  });
  //}

  _handleKeydown(event: KeyboardEvent) {
  }

  /** Emits an event when the user selects a time. */
  _emitChangeEvent(): void {
    this.timeChange.emit(this.time);
  }

  /**
   * render Click
   */
  private renderClock() {
    this._hours.length = 0;

    for (let i = 0; i < CLOCK_HOURS; i++) {
      let radian = i / 6 * Math.PI;
      let inner = i > 0 && i < 13,
        radius = inner ? this.config.innerRadius : this.config.outerRadius;
      this._hours.push({
        hour: i === 0 ? '00' : i,
        top: this.config.dialRadius - Math.cos(radian) * radius - this.config.tickRadius,
        left: this.config.dialRadius + Math.sin(radian) * radius - this.config.tickRadius
      });
    }

    for (let i = 0; i < CLOCK_MINUTES; i += 5) {
      let radian = i / 30 * Math.PI;
      this._minutes.push({
        minute: i === 0 ? '00' : i,
        top: this.config.dialRadius - Math.cos(radian) * this.config.outerRadius -
        this.config.tickRadius,
        left: this.config.dialRadius + Math.sin(radian) * this.config.outerRadius -
        this.config.tickRadius
      });
    }
  }

  private setHand(x: number, y: number) {
    //let radian = Math.atan2(x, y),
    //  unit = Math.PI / (this._isHoursVisible ? 6 : 30),
    //  z = Math.sqrt(x * x + y * y),
    //  inner = this._isHoursVisible && z < (this._clock.outerRadius + this._clock.innerRadius) / 2,
    //  radius = inner ? this._clock.innerRadius : this._clock.outerRadius,
    //  value = 0;

    //if (radian < 0) { radian = Math.PI * 2 + radian; }
    //value = Math.round(radian / unit);
    //radian = value * unit;
    //if (this._isHoursVisible) {
    //  if (value === 12) { value = 0; }
    //  value = inner ? (value === 0 ? 12 : value) : value === 0 ? 0 : value + 12;
    //} else {
    //  if (value === 60) { value = 0; }
    //}

    //this._clock.hand = {
    //  x: Math.sin(radian) * radius,
    //  y: Math.cos(radian) * radius
    //};
  }
}
