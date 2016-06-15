# md2-tabs

Native Angular2 Material Tabs component

## API

Example:
 
 ```html
<md2-tabs>
  <md2-tab header="title1">Test content 1</md2-tab>
  <md2-tab header="title2">Test content 2</md2-tab>
</md2-tabs>
 ```
 ```ts

...

import {TABS_DIRECTIVES} from 'md2/tabs';

@Component({
    selector: "...",
    directives: [Md2Tabs]
})

export class ... {
    
    ...

}
 ```

### Properties

  - `header` (`?string='text'`) - To set title of a tab.
  - `active` (`?boolean='false'`) - To set as an active a tab.
  - `disabled` (`?boolean='false'`) - To set as an disabled a tab.
  - `header-class` (`?string=''`) - To set class on title of tab.
  - `md-class` (`?string=''`) - To set class on tabset.

### Events

  - `change` - it fires after a tab has been changes; returns object of tab which has been selected.
