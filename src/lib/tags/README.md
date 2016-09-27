# Md2Tags
Tags allow the user to add tag.

## `<md2-tags>`
### Properties

| Name | Type | Description |
| --- | --- | --- |
| `items` | `Array<any>` | List of items |
| `md2-tag-text` | `string` | Map property for display text |
| `md2-tag-value` | `string` | Map property for return value, by default it returns whole object of tag |
| `placeholder` | `string` | Hint label |
| `disabled` | `boolean` | Whether or not the tags is disabled |

### Events

| Name | Type | Description |
| --- | --- | --- |
| `change` | `Event` | Fired when change, add or remove tags |

### Examples
A tags would have the following markup.
```html
<md2-tags [md2-tags]="tags"
          md2-tag-text="name"
          md2-tag-value="value"
          [(ngModel)]="tag"
          (change)="change($event)"
          placeholder="+Tag">
</md2-tags>
```
