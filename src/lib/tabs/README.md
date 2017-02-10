# Md2Tabs
Tabs allow the user to organize their content by labels such that only one tab is visible at any given time.

## `<md2-tabs>`
### Properties of Tabs

| Name | Type | Description |
| --- | --- | --- |
| `selectedIndex` | `number` | Whether or not the tab is selected |

### Events of Tabs

| Name | Type | Description |
| --- | --- | --- |
| `change` | `Event` | Fired when changed tab |
| `selectedIndexChange` | `Event` | Fired when changed tab with number of selected tab index |

## `<md2-tab>`
### Properties of Tab

| Name | Type | Description |
| --- | --- | --- |
| `label` | `string` | Label of tab |
| `active` | `boolean` | Whether or not the tab is selected |
| `disabled` | `boolean` | Whether or not the tab is disabled |


### Examples
A tabs would have the following markup.
```html
<md2-tabs selectedIndex="0">
  <md2-tab label="title1">Test content 1</md2-tab>
  <md2-tab label="title2">Test content 2</md2-tab>
  <md2-tab>
    <template md2-tab-label>title3</template>
    Test content 3
  </md2-tab>
</md2-tabs>
```
