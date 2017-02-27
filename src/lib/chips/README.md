# Md2Chips
Chips allow the user to add tags.

## `<md2-chips>`
### Properties

| Name | Type | Description |
| --- | --- | --- |
| `ngModel` | `Array<any>` | A model to bind the list of items to |
| `item-text` | `string` | Map property for display text |
| `autocomplete-item-text` | `string` | Map property for display text in auto complete|
| `placeholder` | `string` | Placeholder text that will be forwarded to the input. |
| `readonly` | `boolean` | Whether or not the chips is readonly |
| `isRemovable` | `boolean` | Enables or disables the deletion of chips through the removal icon or the Delete/Backspace key. Defaults to true.|
| `minChips` | `number` | The Minimum number of chips required to add through user input |
| `maxChips` | `number` | The maximum number of chips allowed to add through user input |
| `allowedPattern` | `RegExp` | RegExp that must match for a chip to be added.|
| `isAutoComplete` | `boolean` | When set to true,User able to select chips from autocomplete.|
| `autocompleteDataList` | `Array<any>` | List of items.|

### Examples
A chips would have the following markup.
```html
<md2-chips [ngModel]="items"
                  [isRemovable]="true"
                  [readonly]="false" 
                  item-text="name"
                  [minChips]="2"
                  [maxChips]="5"
                  (change)="selected($event)"
                  placeholder="Add"
                  [allowedPattern]="onlyTextPattern"
                  [isAutoComplete]="true"
                  [autocompleteDataList]="itemList"
                  autocomplete-item-text="data">    
</md2-chips>    
```
