# Md2Collapse
Collapse is a directive, it's allow the user to toggle visiblity of the section.

## `[collapse]`
### Properties

| Name | Type | Description |
| --- | --- | --- |
| `collapse` | `boolean` | toggle the visiblity of the section |

### Events

| Name | Type | Description |
| --- | --- | --- |
| `expanded` | `Event` | Fired when collapse expanded |
| `collapsed` | `Event` | Fired when collapse collapsed |

### Examples
A collapse would have the following markup.
```html
<div [collapse]="isCollapsed">
  Lorum Ipsum Content
</div>
```
