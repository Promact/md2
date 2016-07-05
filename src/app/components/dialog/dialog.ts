import {Component} from '@angular/core';
import {Md2Dialog} from '../../../components/dialog/dialog';

@Component({
  selector: 'dialog-demo',
  templateUrl: './app/components/dialog/dialog.html',
  directives: [Md2Dialog]
})
export class DialogComponent {
  private dialogHeader: string = 'Lorum Ipsum';

  private launchDialog(dialog: any) {
    dialog.show();
  }

  private showAlert(event: Event) { }
  private showConfirm(event: Event) { }
  private showPrompt(event: Event) { }
  private showAdvanced(event: Event) { }
  private showTabDialog(event: Event) { }
}
