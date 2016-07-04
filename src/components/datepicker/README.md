# md2-datepicker

Native Angular2 Material Datepicker component

## API

Example:
 
 ```html
<md2-datepicker [(ngModel)]="dt" 
                [minDate]="minDate" 
                [maxDate]="maxDate" 
                [showWeeks]="false">
</md2-datepicker>
 ```
 ```ts

...

import {Md2Datepicker} from 'md2/datepicker';

@Component({
    selector: "...",
    directives: [Md2Datepicker]
})

export class ... {
    
    ...
    
    public dt:Date = new Date();
    public minDate:Date;
    public maxDate:Date;

    public constructor() {
      (this.minDate = new Date()).setDate(this.minDate.getDate() - 8);
      (this.maxDate = new Date()).setDate(this.maxDate.getDate() + 8);
    }

    public getDate():number {
      return this.dt && this.dt.getTime() || new Date().getTime();
    }

    ...

}
 ```

### Properties

  - `initDate` - (`?Date`) - Default date to show if `ngModel` value is not specified.
  - `ngModel` (`:Date`) - Binds to date.
  - `minDate` (`?Date=null`) - Oldest selectable date.
  - `maxDate` (`?Date=null`) - Latest Selectable date.
  - `showWeeks` (`?boolean=true`) - If `false` week numbers will be hidden.
  - `dateDisabled` (`?Array<{date:Date, mode:string}>`) - Disabled dates.
  - `onlyCurrentMonth' (`?boolean=false`) - If `true` only dates from the currently displayed month will be shown.