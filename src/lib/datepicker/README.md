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


### Keyboard Navigation

Focus can be moved with the following keys:

| Key | Description |
| --- | --- |
| LEFT_ARROW | a day backward |
| RIGHT_ARROW | a day forward |
| UP_ARROW | a week backward |
| DOWN_ARROW | a week forward |
| HOME | focus first day of the month |
| END | focus last day of the month |
| PAGE_UP | a month backward |
| PAGE_DOWN | a month forward |
| SHIFT + PAGE_UP | a year backward |
| SHIFT + PAGE_DOWN | a year forward |
