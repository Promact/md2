# md2-dialog

Native Angular2 Material Dialog component

### Selector

```html
<md2-dialog></md2-dialog>
```

## API

Example:
 
 ```html
<md2-dialog #confirm>
	<md2-dialog-title>Confirm Title</md2-dialog-title>
	Body Content...
</md2-dialog>
<button (click)="confirm.show()">Open Confirm Dialog</button>
 ```
main.ts
 ```ts
import {DIALOG_PROVIDERS}from 'md2/dialog'

bootstrap( AppComponent, [
    DIALOG_PROVIDERS,
    ...
]);
```

dialogComponent.ts
```ts
...

import {DIALOG_DIRECTIVES} from 'md2/dialog';

@Component({
    selector: "...",
    directives: [DIALOG_DIRECTIVES]
})

export class ... {
    
    ...

}
 ```


### Properties

  - `[title]` _- string - (Default: `null`)(Optional)_ - The title of the dialog


### Open/Close Dialog
Use the component's `show()` and `close()` method to properly trigger the dialog's display. Reference the dialog using in your view to have access to the method to use.