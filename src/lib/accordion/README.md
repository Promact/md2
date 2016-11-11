# Md2Accordion
Accordion it's allow the user to toggle visiblity of the multiple sections.

## `<md2-accordion>`
### Properties of Accordion

| Name | Type | Description |
| --- | --- | --- |
| `multiple` | `boolean` | Whether or not the accordion is multiple |

### Events of Accordion

| Name | Type | Description |
| --- | --- | --- |
| `open` | `Event` | Fired when open accordion |
| `close` | `Event` | Fired when close accordion |

## `<md2-accordion-tab>`
### Properties of AccordionTab

| Name | Type | Description |
| --- | --- | --- |
| `header` | `string` | Label of accordion |
| `active` | `boolean` | Whether or not the accordion is selected |
| `disabled` | `boolean` | Whether or not the accordion is disabled |

## `<md2-accordion-header>`

### Examples
A accordion would have the following markup.
```html
<md2-accordion [multiple]="multiple">
  <md2-accordion-tab *ngFor="let tab of accordions" 
                     [header]="tab.title" 
                     [active]="tab.active" 
                     [disabled]="tab.disabled">
    {{tab.content}}
  </md2-accordion-tab>
  <md2-accordion-tab>
    <md2-accordion-header>Custom Header</md2-accordion-header>
    test content
  </md2-accordion-tab>
</md2-accordion>
```
