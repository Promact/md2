# Md2Tooltip
Tooltip is a directive, it allows the user to show hint text while the user mouse hover over an element.

### Properties

| Name | Type | Description |
| --- | --- | --- |
| `tooltip` | `string` | The message of the Tooltip |
| `tooltip-position` | `'above'|'below'|'before'|'after'` | The position of the Tooltip |
| `tooltip-delay` | `number` | The delay of the Tooltip |

### Examples
A tooltip would have the following markup.
```html
<span tooltip-direction="left" tooltip="On the Left!">Left</span>
<button tooltip="some message" 
        tooltip-position="below"
        tooltip-delay="1000">Hover Me</button>
```
