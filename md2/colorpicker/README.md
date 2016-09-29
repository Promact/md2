# Md2Colorpicker
Colorpicker allow the user to select color.

## `<md2-colorpicker>`
### Properties

| Name | Type | Description |
| --- | --- | --- |
| `disabled` | `boolean` | Whether or not the colorpicker is disabled |
| `id` | `number` | The unique ID of this colorpicker. |
| `tabindex` | `number` | The tabIndex of the colorpicker. |

### Events

| Name | Type | Description |
| --- | --- | --- |
| `change` | `Event` | Fired when change color |

### Examples
A colorpicker would have the following markup.
```html
<md2-colorpicker [(ngModel)]="color"></md2-colorpicker>
```
