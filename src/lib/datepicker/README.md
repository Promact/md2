# Md2Datepicker
Datepicker allow the user to select date and time.

## `<md2-datepicker>`
### Properties

| Name | Type | Description |
| --- | --- | --- |
| `type` | `'date' | 'time' | 'datetime'` | The type of the datepicker |
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
- <kbd>SHIFT + PAGE_UP</kbd>: Focus a year backward
- <kbd>SHIFT + PAGE_DOWN</kbd>: Focus a year forward
- <kbd>ENTER</kbd>: Select focused item
