# Md2Autocomplete
Autocomplete allow the user to filter to select item from available list.

## `<md2-autocomplete>`
### Properties

| Name | Type | Description |
| --- | --- | --- |
| `items` | `Array<any>` | List of items |
| `item-text` | `string` | Map property for display text |
| `item-value` | `string` | Map property for return value, by default it returns whole object of selected item |
| `placeholder` | `string` | Hint label |
| `min-length` | `number` | Specifies the minimum length of text before autocomplete will make suggestions |
| `readonly` | `boolean` | Whether or not the autocomplete is readonly |
| `required` | `boolean` | Whether or not the autocomplete is required |
| `disabled` | `boolean` | Whether or not the autocomplete is disabled |

### Events

| Name | Type | Description |
| --- | --- | --- |
| `change` | `Event` | Fired when change item |

### Examples
A autocomplete would have the following markup.
```html
<md2-autocomplete [items]="items"
                  item-text="name"
                  item-value="value"
                  [(ngModel)]="item"
                  (change)="selected($event)"
                  placeholder="Placeholder Text">
</md2-autocomplete>
```
