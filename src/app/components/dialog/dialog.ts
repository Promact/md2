import {Component} from '@angular/core';

@Component({
  selector: 'dialog-demo',
  templateUrl: './app/components/dialog/dialog.html'
})
export class DialogComponent {
  private dialogHeader: string = 'Lorum Ipsum';

  private launchDialog(dialog: any) {
    dialog.show();
  }

  private show(dialog: any) {
    dialog.show();
  }

  private showAlert(event: Event) { }
  private showConfirm(event: Event) { }
  private showPrompt(event: Event) { }
  private showAdvanced(event: Event) { }
  private showTabDialog(event: Event) { }
}
