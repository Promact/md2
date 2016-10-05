# Md2Chips
Chips allow the user to add tags.

## `<md2-chips>`
### Properties

| Name | Type | Description |
| --- | --- | --- |
| `ngModel` | `string[]` | A model to bind the list of items to |
| `placeholder` | `string` | Placeholder text that will be forwarded to the input. |
| `readonly` | `boolean` | Whether or not the chips is readonly |
| `isRemovable` | `boolean` | Enables or disables the deletion of chips through the removal icon or the Delete/Backspace key. Defaults to true.|
| `minChips` | `number` | The Minimum number of chips required to add through user input |
| `maxChips` | `number` | The maximum number of chips allowed to add through user input |
| `addOnBlur` | `boolean` | When set to true, remaining text inside of the input will be converted into a new chip on blur. |
| `addOnEnter` | `boolean` | When set to true, remaining text inside of the input will be converted into a new chip when user presses enter. |
| `addOnPaste` | `boolean` | When set to true, to add a chips when the user pastes their clipboard contents. |




### Examples
A chips would have the following markup.
```html
<md2-chips [ngModel]="items"
                  [isRemovable]="true"
                  [readonly]="false" 
                  [minChips]="2"
                  [maxChips]="5"
                  (change)="selected($event)"
                  placeholder="Add">
    <div class="md2-template" [hidden]="true">         
        <em>(data)</em>
    </div>
</md2-chips>    
```
