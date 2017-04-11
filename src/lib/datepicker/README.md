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
| `okLabel` | `string` | Datepicker Ok label |
| `cancelLabel` | `string` | Datepicker Cancel label |
| `format` | `string` | The date format of datepicker |
| `tabindex` | `number` | The tabIndex of the datepicker. |
| `openOnFocus` | `boolean` | Opend Calendar Whether or not the datepicker is openOnFocus. |
| `isOpen` | `boolean` | Opend Calendar Whether or not the datepicker is isOpen. |
| `enableDates` | `Array<Date>` | Enable dates. |
| `disableDates` | `Array<Date>` | Disable Dates. |
| `disableWeekDays` | `Array<number>` | Disable Week Days. |
| `mode` | `'auto' | 'portrait' | 'landscape'` | Mode of the Datepicker, default auto. |
| `container` | `'inline' | 'dialog'` | Container of the Datepicker, default inline. |

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
- <kbd>ENTER</kbd> or <kbd>SPACE</kbd>: Select focused item
