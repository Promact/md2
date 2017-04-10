import { Component } from '@angular/core';
import { Md2Dialog } from 'md2';

@Component({
  selector: 'dialog-demo',
  templateUrl: '../dialog/dialog-demo.html'
})
export class DialogDemo {
  dialogHeader: string = 'Lorum Ipsum';

  open(dialog: Md2Dialog) {
    dialog.open();
  }

  close(dialog: any) {
    dialog.close();
  }
}
