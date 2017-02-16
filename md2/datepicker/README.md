# Md2Datepicker
Datepicker allow the user to select date and time.

## `<md2-datepicker>`
### Properties

| Name | Type | Description |
| --- | --- | --- |
| `type` | `'date' | 'time' | 'datetime'` | The type of the datepicker |
| `required` | `boolean` | Whether or not the datepicker is required |
| `disabled` | `boolean` | Whether or not the datepicker is disabled |
| `name` | `number` | Datepicker name. |
| `id` | `number` | The unique ID of this datepicker. |
| `min` | `number` | The min date of Datepicker. |
| `max` | `number` | The max date of Datepicker. |
| `placeholder` | `number` | Datepicker placeholder label |
| `format` | `number` | The date format of datepicker |
| `tabindex` | `number` | The tabIndex of the datepicker. |
| `openOnFocus` | `boolean` | Opend Calendar Whether or not the datepicker is openOnFocus. |
| `isOpen` | `number` | Opend Calendar Whether or not the datepicker is isOpen. |

### Events

| Name | Type | Description |
| --- | --- | --- |
| `change` | `Event` | Fired when change date |

### Examples
A datepicker would have the following markup.
```html
<md2-datepicker [(ngModel)]="date"></md2-datepicker>
```
