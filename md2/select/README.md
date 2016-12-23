# Md2Select
Select allow the user to select option from options.

## `<md2-select>`
### Properties of Select

| Name | Type | Description |
| --- | --- | --- |
| `placeholder` | `string` | hint label |
| `readonly` | `boolean` | Whether or not the select is readonly |
| `required` | `boolean` | Whether or not the select is required |
| `disabled` | `boolean` | Whether or not the select is disabled |
| `multiple` | `boolean` | Whether or not the select is multiple |

### Events of Select

| Name | Type | Description |
| --- | --- | --- |
| `change` | `Event` | Fired when change item |

## `<md2-option>`
### Properties of Select

| Name | Type | Description |
| --- | --- | --- |
| `value` | `any` | Value of selected option |

### Examples
A select would have the following markup.
```html
<md2-select [(ngModel)]="item" (change)="change($event)" [disabled]="disabled">
  <md2-option *ngFor="let i of items" [value]="i.value" [disabled]="i.disabled">{{i.name}}</md2-option>
</md2-select>
```
