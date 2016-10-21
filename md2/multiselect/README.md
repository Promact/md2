# Md2Multiselect
Multiselect allow the user to select multiple options to the select option list.

## `<md2-multiselect>`
### Properties

| Name | Type | Description |
| --- | --- | --- |
| `items` | `Array<any>` | List of options |
| `item-text` | `string` | Map property for display text |
| `item-value` | `string` | Map property for return value, by default it returns whole object of selected options |
| `placeholder` | `string` | Hint label |
| `readonly` | `boolean` | Whether or not the multiselect is readonly |
| `required` | `boolean` | Whether or not the multiselect is required |
| `disabled` | `boolean` | Whether or not the multiselect is disabled |

### Events

| Name | Type | Description |
| --- | --- | --- |
| `change` | `Event` | Fired when changed options |

### Examples
A multiselect would have the following markup.
```html
<md2-multiselect [items]="items"
                 item-text="name"
                 item-value="value"
                 [(ngModel)]="item"
                 (change)="selected($event)"
                 placeholder="Placeholder Text">
</md2-multiselect>
```
