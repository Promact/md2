import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'dialog-demo',
  templateUrl: 'dialog-demo.html'
})
export class DialogDemo {
  dialogHeader: string = 'Lorum Ipsum';

  launchDialog(dialog: any) {
    dialog.show();
  }

  show(dialog: any) {
    dialog.show();
  }

  close(dialog: any) {
    dialog.close();
  }

  showAlert(event: Event) { }
  showConfirm(event: Event) { }
  showPrompt(event: Event) { }
  showAdvanced(event: Event) { }
  showTabDialog(event: Event) { }
}
