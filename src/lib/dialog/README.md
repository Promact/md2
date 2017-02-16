# Md2Dialog
Dialog allow the user to display content in popup.

## `<md2-dialog>`
### Properties

| Name | Type | Description |
| --- | --- | --- |
| `title` | `string` | Title of Dialog |

### Methods

| Name | Description |
| --- | --- |
| `open()`/`show()` | Open a Dialog. |
| `close()` | Close a Dialog. |

### Events

| Name | Type | Description |
| --- | --- | --- |
| `onOpen` | `Event` | Fired when open the dialog |
| `onClose` | `Event` | Fired when close the dialog |

### Examples
A dialog would have the following markup.
```html
<md2-dialog #confirm>
	<md2-dialog-title>Confirm Title</md2-dialog-title>
	Body Content...
</md2-dialog>
<button (click)="confirm.show()">Open Confirm Dialog</button>
```
