# Md2Select
Select allow the user to select option from options.

## `<md2-select>`
### Properties of Select

| Name | Type | Description |
| --- | --- | --- |
| `placeholder` | `string` | hint label |
| `required` | `boolean` | Whether or not the select is required |
| `disabled` | `boolean` | Whether or not the select is disabled |
| `multiple` | `boolean` | Whether or not the select is multiple |
| `tabindex` | `number` | The tabIndex of the select. |

### Events of Select

| Name | Type | Description |
| --- | --- | --- |
| `change` | `Event` | Fired when change item |
| `onOpen` | `Event` | Fired when open the Panel |
| `onClose` | `Event` | Fired when close the Panel |


## `<md2-option>`
### Properties of Option

| Name | Type | Description |
| --- | --- | --- |
| `value` | `any` | Value of selected option |


## `<md2-select-header>`
When a developer needs to put more than just a text label in the md2-select, they should use the md2-select-header.
The user can put custom HTML inside of the header and style it to their liking. One common use case of this would be a sticky search bar.


### Examples
A select would have the following markup.
```html
<md2-select [(ngModel)]="item" (change)="change($event)" [disabled]="disabled">
  <md2-option *ngFor="let i of items" [value]="i.value" [disabled]="i.disabled">{{i.name}}</md2-option>
</md2-select>
```

#### Keyboard interaction:
- <kbd>DOWN_ARROW</kbd>: Focus next option
- <kbd>UP_ARROW</kbd>: Focus previous option
- <kbd>ENTER</kbd> or <kbd>SPACE</kbd>: Select focused item