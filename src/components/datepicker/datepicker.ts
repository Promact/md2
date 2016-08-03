import {Component, Self, Input, ViewEncapsulation} from '@angular/core';
import {FORM_DIRECTIVES, ControlValueAccessor, NgModel} from '@angular/forms';
import {DatePickerInnerComponent} from './datepickerinner.component';
import {DayPickerComponent} from './daypicker.component';

@Component({
  selector: 'md2-datepicker[ngModel]',
  template: `
  <div class="md2-datepicker-block" (click)="onFieldFocus()" (blur)="onFieldBlur()" (keydown)="inputKeydown($event)" tabindex="0">
    <div class="md2-datepicker-container">
      <div class="md2-datepicker-btn"></div>
      <div class="md2-datepicker-input">
        <span class="md2-datepicker-value">{{ activeDate | date:'shortDate'}}</span>
        <span class="md2-datepicker-triangle-btn"></span>
      </div>
    </div>
    <div class="md2-datepicker" *ngIf="isDatepickerVisible">
        <datepicker-inner [activeDate]="activeDate"
                      (update)="onUpdate($event)"
                      [initDate]="initDate"
                      [minDate]="minDate"
                      [maxDate]="maxDate"
                      [showWeeks]="showWeeks"
                      [dateDisabled]="dateDisabled"
                      [onlyCurrentMonth]="onlyCurrentMonth">
          <daypicker></daypicker>
        </datepicker-inner>
    </div>
  </div>
  `,
  styles: [`
              .md2-datepicker-block { display: inline-block; position: relative; }
              .md2-datepicker-block:focus, .md2-datepicker .dp-well .md2-dp-body td .dp-btn:focus, .md2-datepicker .dp-well .md2-dp-header th .dp-btn:focus { outline: none; }
              .md2-datepicker-container { cursor: pointer; }
              .md2-datepicker-btn { display: inline-block; background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHMAAACACAYAAAA4RVZRAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAA0BJREFUeJzt3L9rE3EcxvH3XRRKBbVYRIyIggWHDlKtKDo4CA6CPyZXBwdxdNbVxb/A/6Ag2LrqqBWhqKiV+qMgCEIHsVVaLJpSh0tMkJztmct9L0+fF3wgNEnvE94khGsTyNdbYDXDLOR8/NAWyfb4p/M8eJznL7OwHFOIYwpxTCGOKcQxhTimEMcU4phCHFOIYwrZlPH2g8AuoC/l+rSfp6kARzLep8yyPjn6SH/8NeAb8AlY6WSphkHgGvAA+EG2k8iefGYZeARcr/fIrB+4AXwvwYPxNGcJuFXvsy5DwEwJFvekzztgOC1gwzHgawmW9aw9C8Dx1nhRy+W9wBSwE+sV88BRYBaa774qwDgO2WsGgDGSfn9iXgZGAi1knTkMXIXkZXYz8BGohtzIOvIZ2BcDp3DIXlcFzsTAhdCbWC7OxsBo6C0sF6MxsDv0FpaL/RHwi+wn3K18fkYkZxOs963475lCHFOIYwpxTCGOKcQxhTimEMcU4phCHFOIYwpxTCGOKcQxhTimEMcU4phC/uffRRZJPrhi3XUQ2JL1Tlk/sPI4p2Xt356SrUvNL7NCHFOIYwpxTCGOKcQxhTimEMcU4phCHFOIYwop6nOZh0i+MCqUKeBZwOMXoqiYp4HbBR2rnZtsgJh+mRXimEIcU4hjCnFMIY4pxDGFOKYQxxTimEIcU4hjCnFMIY4pxDGFOKYQxxTimEIcU4hjCnFMIY4pxDGFOKYQxxTimEIcU4hjCnFMIY4ppKiP9L0E7hR0rHaeBzx2YYqK+bA+1kV+mRXimEIcU4hjCnFMIY4pxDGFOKYQxxTimEIcU4hjCnFMIY4pxDGFOKYQxxTimEIcU4hjCnFMIY4pxDGFOKaQCKgBlQz3WQJmu7OOtRgC+jPcfjkCvgA7urOPFWguBj6E3sJy8T4GJkNvYbl4EgP3Q29huZiI6hdeA8MhN7GOvABGGu9i54BLAZexzlzhr/c+94BVT8/NGG0MADMlWM6z/pkGtraLCbAHB+2VeQNU22ds2g6Ml2BZT/rcBbalBWznIsm73NCLe5rzCjiXFixKu6Ll+pPAeeAEcIDkmVvUF1tsZDVgnuQ8+CQwwRoneH4D6vQQ4bZhiMMAAAAASUVORK5CYII='); background-repeat: no-repeat; background-size: 26px 28px; background-position: center; width: 50px; height: 50px; vertical-align: middle; }
              .md2-datepicker-input { display: inline-block; padding-bottom: 5px; border-bottom: 1px solid #E0E0E0; }
              .md2-datepicker-input span.md2-datepicker-value { padding-right: 10px; }
              .md2-datepicker-input .md2-datepicker-triangle-btn { display: inline-block; background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAh0lEQVQ4T93TMQrCUAzG8V9x8QziiYSuXdzFC7h4AcELOPQAdXYovZCHEATlgQV5GFTe1ozJlz/kS1IpjKqw3wQBVyy++JI0y1GTe7DCBbMAckeNIQKk/BanALBB+16LtnDELoMcsM/BESDlz2heDR3WePwKSLo5eoxz3z6NNcFD+vu3ij14Aqz/DxGbKB7CAAAAAElFTkSuQmCC'); background-repeat: no-repeat; background-position: center; width: 30px; height: 30px; vertical-align: bottom; margin-bottom: -3px; border-radius: 50%; }
              .md2-datepicker-block:focus .md2-datepicker-input .md2-datepicker-triangle-btn { background-color: rgba(158,158,158,0.2); }
              .md2-datepicker { position: absolute; left: 50px; top: 8px; z-index: 99; }
              .md2-datepicker .dp-well { background-color: #fff; border: 1px solid #E0E0E0; box-shadow: 0 1px 3px 0 rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12); }
              .md2-datepicker .dp-well table { border-collapse: collapse; }
              .md2-datepicker .dp-well .md2-dp-weekdays { background: rgb(224,224,224); color: rgba(0,0,0,0.87); }
              .md2-datepicker .dp-well .md2-dp-weekdays th { padding: 15px 0; }
              .md2-datepicker .dp-well .md2-dp-body td { padding: 5px; font-size: 14px; }
              .md2-datepicker .dp-well .md2-dp-body tr:first-child > td { padding-top: 15px; }
              .md2-datepicker .dp-well .md2-dp-body tr:last-child > td { padding-bottom: 15px; }
              .md2-datepicker .dp-well .md2-dp-body td.h6 { font-weight: bold; }
              .md2-datepicker .dp-well .md2-dp-body td .dp-btn { border-radius: 0; border: 0; font-size: 14px; padding: 0; background: none; cursor: pointer; }
              .md2-datepicker .dp-well .md2-dp-body td .dp-btn span { padding: 12px; border-radius: 50%; display: inline-block; }
              .md2-datepicker .dp-well .md2-dp-body td .dp-btn:hover span { background-color: #E6E6E6; }
              .md2-datepicker .dp-well .md2-dp-body td .dp-btn span.text-info { border-color: #106CC8; color: #333; }
              .md2-datepicker .dp-well .md2-dp-body td .dp-btn span.text-muted { color: rgba(0,0,0,0.36); }
              .md2-datepicker .dp-well .md2-dp-body td .dp-btn.active span { background-color: #106CC8; border-color: #106CC8; color: #fff; }
              .md2-datepicker .dp-well .md2-dp-body td .dp-btn.disabled { cursor: not-allowed; opacity: .65; }
              .md2-datepicker .dp-well .md2-dp-header th { padding: 8px; }
              .md2-datepicker .dp-well .md2-dp-header th .dp-btn { border-radius: 50%; cursor: pointer; }
              .md2-datepicker .dp-well .md2-dp-header th .dp-btn:hover { background-color: #e6e6e6; }
              .md2-datepicker .dp-well .md2-dp-header th .dp-btn.left-arrow { padding: 10px 11px 10px 9px; float: left; }
              .md2-datepicker .dp-well .md2-dp-header th .dp-btn.right-arrow { padding: 10px 9px 10px 11px; float: right; }
              .md2-datepicker .dp-well .md2-dp-header th .dp-btn .arrow-icon.left { display: inline-block; width: 16px; height: 16px; background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDMwNiAzMDYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDMwNiAzMDY7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8ZyBpZD0ia2V5Ym9hcmQtYXJyb3ctbGVmdCI+CgkJPHBvbHlnb24gcG9pbnRzPSIyNDcuMzUsMjcwLjMgMTMwLjA1LDE1MyAyNDcuMzUsMzUuNyAyMTEuNjUsMCA1OC42NSwxNTMgMjExLjY1LDMwNiAgICIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=) }
              .md2-datepicker .dp-well .md2-dp-header th .dp-btn .arrow-icon.right { display: inline-block; width: 16px; height: 16px; background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDMwNiAzMDYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDMwNiAzMDY7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8ZyBpZD0iY2hldnJvbi1yaWdodCI+CgkJPHBvbHlnb24gcG9pbnRzPSI5NC4zNSwwIDU4LjY1LDM1LjcgMTc1Ljk1LDE1MyA1OC42NSwyNzAuMyA5NC4zNSwzMDYgMjQ3LjM1LDE1MyAgICIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=) }
              .md2-datepicker .dp-well .md2-dp-header th .dp-btn .arrow-icon.left:before, .md2-datepicker .dp-well .md2-dp-header th .dp-btn .arrow-icon.right:before { content: ""; }
              .md2-datepicker .dp-well .md2-dp-header th:nth-child(2) .dp-btn { border-radius: 0; background: none; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; cursor: inherit; text-align: center; }
  `],
  directives: [DatePickerInnerComponent, DayPickerComponent, FORM_DIRECTIVES],
  encapsulation: ViewEncapsulation.None
})

export class Md2Datepicker implements ControlValueAccessor {
  @Input() public datepickerMode:string;
  @Input() public initDate:Date;
  @Input() public minDate:Date;
  @Input() public maxDate:Date;
  @Input() public minMode:string;
  @Input() public maxMode:string;
  @Input() public showWeeks:boolean;
  @Input() public formatDay:string;
  @Input() public formatMonth:string;
  @Input() public formatYear:string;
  @Input() public formatDayHeader:string;
  @Input() public formatDayTitle:string;
  @Input() public formatMonthTitle:string;
  @Input() public startingDay:number;
  @Input() public yearRange:number;
  @Input() public onlyCurrentMonth:boolean;
  @Input() public shortcutPropagation:boolean;
  @Input() public customClass:Array<{date:Date, mode:string, clazz:string}>;

  @Input() public dateDisabled:any;

  public onChange:any = Function.prototype;
  public onTouched:any = Function.prototype;

  public cd:NgModel;
  private _now:Date = new Date();
  private _activeDate:Date;

  @Input()
  /**
   * Active Date
   */
  public get activeDate():Date {
    return this._activeDate || this._now;
  }

  public constructor(@Self() cd:NgModel) {
    this.cd = cd;
    cd.valueAccessor = this;
  }

  public set activeDate(value:Date) {
    this._activeDate = value;
  }

  /**
   * Update Date
   */
  public onUpdate(event:any):void {
    this.writeValue(event);
    this.cd.viewToModelUpdate(event);
  }

  public writeValue(value:any):void {

    if (value === this._activeDate) {
      return;
    }
    if (value && value instanceof Date) {
      this.activeDate = value;
      return;
    }

    this.activeDate = value ? new Date(value) : void 0;
  }

  public registerOnChange(fn:(_:any) => {}):void { this.onChange = fn; }

  public registerOnTouched(fn:() => {}):void { this.onTouched = fn; }

  /**
   * Datepicker show/hide
   */
  get isDatepickerVisible(): boolean {
    return (this.fieldFocused) ? true : false;
  }

  private fieldFocused: boolean;

  private onFieldFocus() {
    this.fieldFocused = true;
  }

  private onFieldBlur() {
  	setTimeout(()=>{
  		this.fieldFocused = false;
  	},200)
  }

  /**
   * Key events
   */
  private inputKeydown(event: KeyboardEvent) {
  	// Escape Key
    if (event.keyCode === 27) {
      event.stopPropagation();
      event.preventDefault();
      this.fieldFocused = false;
      return;
    }
    // Enter Key & Space Key
    if (event.keyCode === 13 || event.keyCode === 32) {
      event.stopPropagation();
      event.preventDefault();
      this.fieldFocused = true;
      return;
    }
  }

}