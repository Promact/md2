# md2-switch

Native Angular2 Material Switch component

### Selector

```html
<md2-switch></md2-switch>
```

## API

Example:
 
 ```html
<md2-switch [(ngModel)]="status"
            [disabled]="disabled"
            [ariaLabel]="ariaLabel"
            [id]="id"
            [tabindex]="tabindex"
            (change)="change($event)">
    Lorum Ipsum Label
</md2-switch>
 ```
```ts

...

import {Md2Switch} from 'md2/switch';

@Component({
    selector: "...",
    directives: [Md2Switch]
})

export class ... {
    
    ...
    
    private status: boolean = false;
    private disabled: boolean = false;
    private ariaLabel: string = 'Lorum Ipsum';
    private id: string = '1';
    private tabindex: string = '2';

    private change(value: any) {
        console.log('Changed value is: ', value);
    }

    ...

}
 ```

### Properties

  - `disabled` (`?boolean=false`) - When `true`, it specifies that the component should be disabled.  
  - `ariaLabel` (`?string=''`) - AreaLabel text should be set.
  - `id` (`?number=autoId`) - Id of switch component should be set.  
  - `tabindex` (`?number=0`) - Tab index of Switch should be set.

### Events

  - `change` - it fires after a chage status of switch; returns object with true/false new status of switch.



### Referenced From
Material2 (see the repo [https://github.com/angular/material2](https://github.com/angular/material2) repository for the angular2 based checkbox component)