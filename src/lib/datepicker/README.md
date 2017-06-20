# Md2Datepicker
Datepicker allow the user to select date and time.

## `<md2-datepicker>`
### Properties

| Name | Type | Description |
| --- | --- | --- |
| `type` | `'date'` &#124; `'time'` &#124; `'month'` &#124; `'datetime'` | The type of the datepicker |
| `required` | `boolean` | Whether or not the datepicker is required |
| `disabled` | `boolean` | Whether or not the datepicker is disabled |
| `min` | `date` | The min date of Datepicker. |
| `max` | `date` | The max date of Datepicker. |
| `placeholder` | `string` | Datepicker placeholder label |
| `format` | `string` | The date format of datepicker |
| `tabindex` | `number` | The tabIndex of the datepicker. |
| `timeInterval` | `number` | Select minutes in specific time interval, default is 1. |
| `openOnFocus` | `boolean` | Opend Calendar Whether or not the datepicker is openOnFocus. |
| `isOpen` | `boolean` | Opend Calendar Whether or not the datepicker is isOpen. |
| `dateFilter` | `(Date|null) => boolean` | Filter Dates for enabled with return boolean. |
| `mode` | `'auto'` &#124; `'portrait'` &#124; `'landscape'` | Mode of the Datepicker, default auto. |
| `touchUi` | `boolean` | Whether the calendar UI is in touch mode. In touch mode the calendar opens in a dialog rather than a popup and elements have more padding to allow for bigger touch targets. |
| `startAt` | `Date` | The date to open the calendar to initially. |
| `startView` | `'clock'` &#124; `'month'` &#124; `'year'` | The view that the calendar should start in. Default 'month' |


### Events

| Name | Type | Description |
| --- | --- | --- |
| `change` | `Event` | Fired when change date |
| `onOpen` | `Event` | Fired when open the Datepicker Panel |
| `onClose` | `Event` | Fired when close the Datepicker Panel |

### Examples
A datepicker would have the following markup.
```html
<md2-datepicker [(ngModel)]="date"></md2-datepicker>
```

## md2DatepickerToggle

#### Selector: button\[md2DatepickerToggle]

| Name | Description |
| --- | --- |
| `md2DatepickerToggle` | Datepicker instance that the button will toggle. |

### Examples
A datepicker toggle button would have the following markup.
```html
<md2-datepicker #birthday></md2-datepicker>
<button [md2DatepickerToggle]="birthday"></button>
```

## Datepicker Locale Service
This `DateLocale` service that allows the user to specify months, daysOfWeek, dates, hours, minutes and firstDayOfWeek internationalization. The `DateLocale` service itself is consumed by `Md2Datepicker` component that deal with dates.

import { DateLocale } from 'md2';

| Name | Type | Description |
| --- | --- | --- |
| `months` | `Months = { long: Array<string>, short: Array<string>, narrow: Array<string> }` | Month Object with property long, short and narrow along with Array of month names (in order). |
| `daysOfWeek` | `DaysOfWeek = { long: Array<string>, short: Array<string>, narrow: Array<string> }` | DaysOfWeek Object with property long, short and narrow along with Array of the days of the week (in order). |
| `dates` | `Array<string>` | Array of dates of the month. Only necessary for locales using a numeral system other than ['1', '2', '3', ..., '31']. |
| `hours` | `Array<string>` | Array of hours of the clock. Only necessary for locales using a numeral system other than ['0', '1', '2', ..., '23']. |
| `minutes` | `Array<string>` | Array of minutes of the clock. Only necessary for locales using a numeral system other than ['0', '1', '2', ..., '59']. |
| `firstDayOfWeek` | `number` | The first day of the week. Sunday = 0, Monday = 1, etc. |

### Date Format

| COMPONENT | SYMBOL | NARROW | SHORT FORM | LONG FORM        | NUMERIC | 2-DIGIT |
| --------- | ------ | ------ | ---------- | ---------------- | ------- | ------- |
| year      | `y`    | -      | -          | -                | y(2017) | yy(17)  |
| month     | `M`    | -      | MMM (Feb)  | MMMM (February)  | M(2)    | MM(02)  |
| day       | `d`    | -      | -          | -                | d(3)    | dd(03)  |
| hour      | `H`    | -      | -          | -                | H(13)   | HH(13)  |
| minute    | `m`    | -      | -          | -                | m(5)    | mm(05)  |
| second    | `s`    | -      | -          | -                | s(5)    | ss(05)  |
| am/pm     | `a`    | -      | -          | -                | -       | -       |
| AM/PM     | `A`    | -      | -          | -                | -       | -       |


#### Keyboard interaction:
- <kbd>LEFT_ARROW</kbd>: Focus a day backward
- <kbd>RIGHT_ARROW</kbd>: Focus a day forward
- <kbd>UP_ARROW</kbd>: Focus a week backward
- <kbd>DOWN_ARROW</kbd>: Focus a week forward
- <kbd>HOME</kbd>: Focus first day of the month
- <kbd>END</kbd>: Focus last day of the month
- <kbd>PAGE_UP</kbd>: Focus a month backward
- <kbd>PAGE_DOWN</kbd>: Focus a month forward
- <kbd>ALT + PAGE_UP</kbd>: Focus a year backward
- <kbd>ALT + PAGE_DOWN</kbd>: Focus a year forward
- <kbd>ENTER</kbd>: Select focused item
