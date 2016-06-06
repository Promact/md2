# md2-dialog

Native Angular2 Material Dialog component

### Selector

```html
<md2-dialog></md2-dialog>
```

## API

Example:
 
 ```html
<button type="button" (click)="launchDialog(dialog)">Launch Dialog</button>

<button type="button" (click)="launchDialog(dialog2)">Launch Dialog 2</button>

<md2-dialog #dialog [dialog-header]="dialogHeader">
    <div class="md2-dialog-body">
        <p>Body of Dialog...</p>
    </div>
    <div class="md2-dialog-footer">
        <button type="button" class="btn btn-primary" (click)="dialog.hide()">Close</button>
    </div>
</md2-dialog>

...

<md2-dialog #dialog2>
    <dialog-header>
      <strong>Lorum</strong> Ipsum Dialog Header
    </dialog-header>
    <div class="md2-dialog-body">
      <p>Lorum Ipsum Dummy body content for modal dialog of Material design with Angular2 made by Dharmesh Pipariya.</p>
    </div>
    <div class="md2-dialog-footer">
      <button type="button" class="btn btn-primary" (click)="dialog2.hide()">Close</button>
    </div>
  </md2-dialog>
 ```
 ```ts

...

import {Md2Dialog} from 'md2/dialog';

@Component({
    selector: "...",
    directives: [Md2Dialog]
})

export class ... {
    
    ...
    
    private dialogHeader: string = 'Lorum Ipsum';
    
    private launchDialog(dialog: any) {
        dialog.show();
    }

    ...

}
 ```


### Properties

  - `[close-button]` _- boolean - (Default: `true`)(Optional)_ Takes a boolean that causes the close button to be displayed in the top right corner
  - `[close-on-unfocus]` _- boolean - (Default: `true`)(Optional)_- Takes a boolean that causes the dialog to close when a user clicks outside of the dialog
  - `[dialog-header]` _- string - (Default: `null`)(Optional)_ - The heading of the dialog


### Open/Close Dialog
Use the component's `show()`, `hide()` and `toggle(visible: boolean)` method to properly trigger the dialog's display. Reference the dialog using in your view to have access to the method to use.
