# Md2Dialog
Dialog allow the user to display content in popup.

## `<md2-dialog>`
### Properties

| Name | Type | Description |
| --- | --- | --- |
| `title` | `string` | Title of Dialog |

### Methods
| Name | Argument Type | Description |
| --- | --- | --- |
| `open(config?)` | `Md2DialogConfig` | Open a Dialog, config is optional. |
| `close()` | - | Close a Dialog. |

### Events

| Name | Type | Description |
| --- | --- | --- |
| `onOpen` | `Event` | Fired when open the dialog |
| `onClose` | `Event` | Fired when close the dialog |

## Directives

| Name | Description |
| --- | --- |
| `<md2-dialog-title>` | Title of Dialog. |
| `<md2-dialog-content>` | Content of Dialog. |
| `<md2-dialog-content>` | Content of Dialog. |
| `<md2-dialog-footer> or <md2-dialog-actions>` | Footer of Dialog. |


### `Md2DialogConfig`

Configuration for opening a modal dialog with the Md2Dialog service.

| Name | Description |
| --- | --- |
| `role` | The ARIA role of the dialog element. |
| `disableClose` | Whether the user can use escape or clicking outside to close a modal. |


### Examples
A dialog would have the following markup.
```html
<md2-dialog #confirm>
	<md2-dialog-title>Confirm Title</md2-dialog-title>
	Body Content...
</md2-dialog>
<button (click)="confirm.show()">Open Confirm Dialog</button>
```
