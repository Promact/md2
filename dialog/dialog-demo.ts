import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'dialog-demo',
  templateUrl: 'dialog-demo.html'
})
export class DialogDemo {
  dialogHeader: string = 'Lorum Ipsum';

  launchDialog(dialog: any) {
    dialog.open();
  }

  open(dialog: any) {
    dialog.open();
  }

  close(dialog: any) {
    dialog.close();
  }

  openAlert(event: Event) { }
  openConfirm(event: Event) { }
  openPrompt(event: Event) { }
  openAdvanced(event: Event) { }
  openTabDialog(event: Event) { }
}
