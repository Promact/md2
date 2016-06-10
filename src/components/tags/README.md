# md2-tags

Native Angular2 Material Tags component

## API

Example:
 
 ```html
<md2-tags [md-tags]="tags"
          md-tag-text="name"
          md-tag-value="value"
          [(ngModel)]="tag"
          (change)="change($event)"
          placeholder="+Tag">
</md2-tags>
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
